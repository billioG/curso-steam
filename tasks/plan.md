# Plan de implementación: hallazgos "Alto" del code review (agente `code-reviewer`)

## Resumen

El agente `code-reviewer` revisó toda la app y ya se corrigieron los 2 hallazgos
**Críticos** (XSS en `admin.js`, bypass de certificados en `app.js`, commit
`ed27559`). Este plan cubre los 2 hallazgos **Altos** restantes:

1. Duplicación de `totalCards`/IDs de tarjeta entre `data.js`, `coordinator.html`
   y `supabase-functions/weekly-stats` (sin auto-sincronización, a diferencia de
   `admin.js`).
2. Falta de validación server-side en la tabla `progress` (RLS solo verifica
   propiedad, no valores) — un usuario puede falsear XP/examScores/tarjetas
   completadas desde la consola del navegador.

## Hallazgos de la investigación (solo lectura)

- `admin.js:68-86` ya resuelve el problema para sí mismo: como `admin.html`
  carga `data.js`, calcula `COURSE_MODULE_IDS`/`COURSE_CARD_IDS` en tiempo de
  ejecución a partir de `allCourses` y **sobreescribe** `totalCards` en
  `STATIC_COURSES` con los valores reales. Este es el patrón a replicar.
- `coordinator.html` **no carga `data.js`** (solo Tailwind CDN, Supabase JS y
  Chart.js) — por eso tiene un array `COURSES` de ~963 líneas con
  `moduleCardIds` completos hardcodeados a mano para 20+ cursos
  (`coordinator.html:308-338`). Es standalone por diseño, no por necesidad:
  puede cargar `data.js` igual que `admin.html` sin cambiar su despliegue.
- `supabase-functions/weekly-stats/index.ts:19-41` es una Edge Function Deno
  que corre aislada — **no puede** cargar `data.js` tal cual (es un script de
  navegador con `var allCourses = [...]`, no un módulo ESM), así que necesita
  su propia estrategia de sincronización, no la misma que `coordinator.html`.
- La tabla `courses` en Supabase (`supabase_schema.sql:162-172`, columna
  `content jsonb`) existe pero no hay evidencia de que espeje el contenido de
  `data.js` para los 20+ cursos estáticos — parece pensada para cursos
  creados desde el panel de admin, no como fuente de verdad de éstos. No se
  usa como solución en este plan sin confirmarlo primero (ver Fase 1, Tarea 2).
- `progress` RLS (`supabase_schema.sql:242-243`): `FOR ALL USING (auth.uid() =
  user_id)` — sin `WITH CHECK`, así que cualquier valor es aceptable mientras
  el `user_id` sea el propio.
- **Hallazgo nuevo relevante:** las respuestas correctas de cada examen viven
  en texto plano en `data.js` (campo `correct`, ej. línea 24), que se sirve
  tal cual al navegador. Esto significa que la integridad *real* de un examen
  (evitar que alguien vea las respuestas o fabrique un `examScores` sin
  rendirlo) requeriría mover la calificación al servidor y dejar de enviar
  las respuestas correctas al cliente — un cambio de arquitectura grande, no
  una validación puntual. Ver "Preguntas abiertas" — no se planifica en este
  documento como tarea ejecutable, solo se documenta el riesgo.

## Decisiones de arquitectura

- **Coordinator.html**: cargar `data.js` y derivar `COURSES`/`moduleCardIds`
  en runtime, igual que `admin.js`. Elimina la copia hardcodeada por completo
  (no un script de sync — una fuente de verdad real, ya que ambos corren en
  el navegador).
- **weekly-stats**: como es una Edge Function Deno sin acceso a `data.js`,
  no se puede unificar en runtime sin más trabajo (empaquetar `data.js` como
  módulo compartido, o consultar la tabla `courses`). Para este plan se opta
  por un **script de sincronización** (`scripts/sync-course-totals.mjs`) que
  lee `allCourses` de `data.js` (vía regex/parse simple, ya que no es un
  módulo ESM) y regenera el bloque `COURSES` de `weekly-stats/index.ts`,
  más un modo `--check` que falla si el archivo está desactualizado. Sigue
  siendo un paso manual (correr el script), pero ya no es copiar/pegar a
  mano ni queda en silencio si se olvida — igual que ya pide el propio
  CLAUDE.md ("actualiza los cuatro"), pero ahora con una herramienta que lo
  hace por vos y puede verificarse.
- **progress**: en vez de reescribir la calificación de exámenes al servidor
  (fuera de alcance, ver Preguntas abiertas), se agrega una validación de
  *rango plausible* a nivel de base de datos (trigger `BEFORE UPDATE/INSERT`)
  que rechaza valores imposibles: `xp` negativo o con saltos absurdos,
  `examScores` fuera de 0-100, `completed_cards` con IDs que no existen en
  ningún curso. Esto no impide que alguien "apruebe" un examen que no rindió
  (eso requiere el cambio de arquitectura grande), pero sí cierra la
  manipulación más burda y barata (poner `xp: 999999` o `examScores: 150`
  desde la consola), que es la que hoy funciona sin ninguna fricción.

## Lista de tareas

### Fase 1: Eliminar duplicación de totalCards/IDs de tarjeta

- [ ] Tarea 1: `coordinator.html` deriva `COURSES` desde `data.js` en runtime
- [ ] Tarea 2: Confirmar si la tabla `courses` refleja `data.js` (spike corto)
- [ ] Tarea 3: Script `scripts/sync-course-totals.mjs` para `weekly-stats`
- [ ] Tarea 4: Aplicar el script y actualizar `weekly-stats/index.ts`

### Checkpoint: Fase 1
- [ ] `coordinator.html` muestra los mismos totales que `data.js`/`admin.js` para los 3 cursos con más y menos tarjetas
- [ ] `node scripts/sync-course-totals.mjs --check` pasa en verde contra el `weekly-stats/index.ts` actualizado
- [ ] `supabase-functions/weekly-stats` devuelve los mismos números que antes del cambio (no debería haber cambiado ningún total real)
- [ ] Revisión con el usuario antes de continuar a Fase 2

### Fase 2: Endurecer la integridad de `progress` a nivel de base de datos

- [ ] Tarea 5: Migración SQL con trigger de validación de rango en `progress`
- [ ] Tarea 6: Manejar en el cliente el error si el trigger rechaza un guardado
- [ ] Tarea 7: Documentar el riesgo residual (examen calificado en cliente) en CLAUDE.md

### Checkpoint: Fase 2
- [ ] Un `UPDATE` manual con `xp: 999999` o `examScores: {steam: 150}` es rechazado por Postgres
- [ ] El flujo normal de completar tarjetas/exámenes en la app sigue guardando sin errores
- [ ] Revisión con el usuario — decidir si se agenda la Pregunta Abierta como proyecto aparte

## Detalle de tareas

## Tarea 1: `coordinator.html` deriva `COURSES` desde `data.js`

**Descripción:** Agregar `<script src="./data.js"></script>` a `coordinator.html`
(antes del `<script>` inline que define `COURSES`) y reemplazar el array
hardcodeado de 20+ cursos por un cálculo en runtime a partir de `allCourses`,
replicando la lógica de normalización de IDs que ya usa `admin.js:68-86`
(prefijo `${course.id}-${card.id}` para IDs numéricos en cursos que no son
`steam`).

**Criterios de aceptación:**
- [ ] `coordinator.html` ya no contiene el array literal de `moduleCardIds` por curso — se calcula de `allCourses`
- [ ] Los `totalCards` resultantes coinciden exactamente con los que hoy están hardcodeados (para no romper el dashboard existente)
- [ ] El dashboard de coordinador carga y muestra progreso igual que antes para al menos un colegio de prueba

**Verificación:**
- [ ] Manual: abrir `coordinator.html` en el navegador, comparar visualmente los totales por curso contra `data.js` antes/después
- [ ] Manual: `node -e "..."` o consola del navegador comparando el nuevo `COURSES` calculado vs. el array viejo (diff de `totalCards` y de `moduleCardIds.flat().length` por curso, debe dar 0 diferencias)
- [ ] No hay build/test automatizado en el repo para este archivo — la verificación es manual

**Dependencias:** Ninguna

**Archivos:**
- `coordinator.html`

**Alcance estimado:** M (1 archivo, pero reemplaza ~30 líneas densas por lógica nueva — requiere cuidado)

---

## Tarea 2: Confirmar si la tabla `courses` refleja `data.js` (spike)

**Descripción:** Antes de invertir en el script de sync de la Tarea 3,
confirmar con una consulta rápida a Supabase (`select id, jsonb_array_length(content->'modules') from courses`)
si la tabla `courses` ya tiene contenido para los 20+ cursos estáticos. Si sí,
la alternativa más limpia para `weekly-stats` es consultar esa tabla en vez
de mantener un script de sync — cambiaría el diseño de la Tarea 3/4.

**Criterios de aceptación:**
- [ ] Se sabe con certeza si `courses` contiene o no el contenido de los cursos estáticos de `data.js`
- [ ] Se documenta la decisión resultante en este plan (actualizar la sección "Decisiones de arquitectura" si cambia)

**Verificación:**
- [ ] Consulta SQL ejecutada contra la base real (o confirmación del usuario de que la tabla está vacía/no se usa para esto)

**Dependencias:** Ninguna (puede hacerse en paralelo a la Tarea 1)

**Archivos:** Ninguno (solo investigación)

**Alcance estimado:** XS

---

## Tarea 3: Script `scripts/sync-course-totals.mjs`

**Descripción:** Script Node (sin dependencias externas, el repo no tiene
`package.json`) que:
1. Lee `data.js`, extrae `allCourses` (puede requerir un parse simple tipo
   `vm.Script` ejecutando el archivo en un sandbox, ya que no es un módulo
   ESM — igual que hace `admin.js` en el navegador, pero en Node).
2. Calcula `{ id, title, prefix, totalCards }` por curso con la misma
   normalización de IDs que `admin.js`.
3. En modo normal, reescribe el bloque `const COURSES = [...]` dentro de
   `supabase-functions/weekly-stats/index.ts` (entre marcadores de
   comentario `// SYNC:START` / `// SYNC:END` a agregar en la Tarea 4).
4. En modo `--check`, compara el bloque generado contra el actual y termina
   con código de salida distinto de 0 si difieren (para poder correrlo antes
   de un deploy o commit).

**Criterios de aceptación:**
- [ ] `node scripts/sync-course-totals.mjs --check` falla si `weekly-stats/index.ts` está desactualizado respecto a `data.js`
- [ ] `node scripts/sync-course-totals.mjs` (sin `--check`) reescribe el bloque correctamente y deja el resto del archivo intacto
- [ ] El script no tiene dependencias externas (usa solo el runtime de Node)

**Verificación:**
- [ ] Correr el script contra el estado actual de `data.js` y confirmar que el bloque generado es idéntico en totales al hardcodeado hoy (antes de la Tarea 4)
- [ ] Modificar `totalCards` de un curso de prueba en una copia de `data.js`, correr el script, confirmar que el cambio se refleja

**Dependencias:** Tarea 2 (si `courses` ya refleja `data.js`, esta tarea se reemplaza por una consulta a esa tabla en su lugar)

**Archivos:**
- `scripts/sync-course-totals.mjs` (nuevo)

**Alcance estimado:** M

---

## Tarea 4: Aplicar el script y marcar los límites de sync en `weekly-stats`

**Descripción:** Agregar los comentarios marcadores `// SYNC:START` /
`// SYNC:END` alrededor del array `COURSES` en
`supabase-functions/weekly-stats/index.ts`, correr el script de la Tarea 3
para generarlo desde `data.js`, y agregar un comentario explicando que ese
bloque ya no se edita a mano.

**Criterios de aceptación:**
- [ ] El array `COURSES` generado tiene exactamente los mismos valores que el actual (no debe cambiar el comportamiento de la función)
- [ ] El comentario en el archivo indica correr `node scripts/sync-course-totals.mjs` tras cualquier cambio en `data.js`
- [ ] `CLAUDE.md` se actualiza para reemplazar la instrucción manual de "actualiza los cuatro" por "corré el script de sync" en lo que respecta a `weekly-stats`

**Verificación:**
- [ ] Diff de `weekly-stats/index.ts` antes/después: solo cambian los marcadores de comentario, ningún `totalCards` real cambia de valor
- [ ] (Si hay forma de invocar la función localmente/en staging) confirmar que devuelve las mismas estadísticas que antes del cambio

**Dependencias:** Tarea 3

**Archivos:**
- `supabase-functions/weekly-stats/index.ts`
- `CLAUDE.md`

**Alcance estimado:** S

---

## Tarea 5: Migración SQL — trigger de validación de rango en `progress`

**Descripción:** Nueva migración (`migrations/progress-value-guard.sql`) que
agrega una función `plpgsql` y un trigger `BEFORE INSERT OR UPDATE ON
progress` que valida:
- `xp >= 0` y `xp` no aumenta más de un salto máximo razonable por escritura
  (ej. +500, a definir con el usuario según cómo se otorga XP hoy)
- Cada valor dentro de `daily_missions->'examScores'` está en el rango
  [0, 100]
- Cada elemento de `completed_cards` existe en el conjunto conocido de IDs
  de tarjeta válidos (requiere pasarle la lista de IDs válidos a la función,
  ej. como una tabla `valid_card_ids` poblada desde `data.js`, o
  simplemente validar que sea string/number sin más — a decidir con el
  usuario, ya que mantener esa lista en Postgres reintroduce el problema de
  sincronización de la Fase 1)
- Si algún valor es inválido, el trigger lanza una excepción (`RAISE
  EXCEPTION`), lo que hace fallar el `UPDATE`/`INSERT` desde el cliente

**Criterios de aceptación:**
- [ ] Un `UPDATE` de prueba con `xp: 999999` falla con un error claro
- [ ] Un `UPDATE` de prueba con `examScores: {steam: 150}` falla
- [ ] Un `UPDATE` normal (los valores que ya genera hoy `app.js`) se guarda sin error

**Verificación:**
- [ ] Ejecutar los 3 casos de arriba directamente en el SQL editor de Supabase (o vía `supabase` CLI local si está disponible) antes de aplicar a producción
- [ ] Revisar manualmente el flujo completo en la app (completar una tarjeta, rendir un examen, ver que XP sube) después de aplicar la migración

**Dependencias:** Ninguna (independiente de la Fase 1)

**Archivos:**
- `migrations/progress-value-guard.sql` (nuevo)

**Alcance estimado:** L — requiere decisiones de producto (¿cuál es el salto de XP máximo razonable? ¿vale la pena validar `completed_cards` contra IDs reales o alcanza con tipo/rango?) antes de escribir el trigger final. **Recomendación: resolver esas 2 preguntas con el usuario antes de implementar esta tarea.**

---

## Tarea 6: Manejar el rechazo del trigger en el cliente

**Descripción:** `app.js` guarda `progress` en varios puntos (ej. línea 4085
al calificar un examen). Si el trigger de la Tarea 5 rechaza un `UPDATE`
legítimo por un bug en los límites elegidos, hoy ese error probablemente se
pierde en un `catch` genérico o ni se loguea. Agregar manejo explícito: si
Supabase devuelve un error en el guardado de `progress`, mostrar un toast de
error al usuario en vez de fallar en silencio, y loguearlo (via
`console.error` como mínimo, para poder diagnosticar límites mal calibrados
tras el deploy).

**Criterios de aceptación:**
- [ ] Un guardado de `progress` que falla (simulado, ej. apagando temporalmente el trigger para forzar otro tipo de error, o con datos fuera de rango a propósito en un entorno de prueba) muestra feedback visible al usuario
- [ ] El error queda en la consola/logs, no se traga silenciosamente

**Verificación:**
- [ ] Prueba manual forzando un error de guardado y confirmando el toast + el log

**Dependencias:** Tarea 5

**Archivos:**
- `app.js`

**Alcance estimado:** S

---

## Tarea 7: Documentar el riesgo residual en CLAUDE.md

**Descripción:** Agregar una sección breve a `CLAUDE.md` explicando que la
calificación de exámenes ocurre en el cliente (respuestas correctas
visibles en `data.js`) y que el trigger de la Tarea 5 solo evita
manipulación burda de valores, no evita fabricar un `examScores` aprobado
sin haber rendido el examen. Referenciar este plan como el lugar donde se
evaluó la alternativa de calificación server-side y por qué se dejó fuera
de alcance.

**Criterios de aceptación:**
- [ ] `CLAUDE.md` menciona explícitamente esta limitación conocida

**Verificación:**
- [ ] Revisión de lectura

**Dependencias:** Tarea 5

**Archivos:**
- `CLAUDE.md`

**Alcance estimado:** XS

## Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El trigger de la Tarea 5 rechaza guardados legítimos por límites mal calibrados | Alto (usuarios pierden progreso real) | Probar exhaustivamente en un entorno de prueba antes de aplicar en producción; Tarea 6 da visibilidad si pasa |
| El parser del script de sync (Tarea 3) interpreta mal `data.js` si cambia su formato | Medio (weekly-stats con números incorrectos, silenciosamente) | Modo `--check` que se corre antes de cada deploy de `weekly-stats`; comparar contra los valores actuales como smoke test en la Tarea 4 |
| El cambio en `coordinator.html` (Tarea 1) introduce una regresión visual/funcional en el dashboard del coordinador | Medio | Verificación manual explícita antes/después en la Tarea 1; es la única forma de probar este archivo dado que no hay tests automatizados |

## Preguntas abiertas

1. **Calificación de exámenes en el servidor.** El fix de certificados
   (commit `ed27559`) ahora confía en `progress.daily_missions.examScores`
   como "la nota real" del usuario. Pero como el trigger de la Tarea 5 solo
   valida *rango*, no *autenticidad*, alguien todavía podría poner
   `examScores.steam = 95` sin haber rendido el examen, y comprar un diploma
   barato para obtener un certificado con esa nota falsa. Cerrar esto de
   verdad requiere: (a) dejar de enviar el campo `correct` al cliente, (b)
   una Edge Function que reciba las respuestas del usuario y califique
   server-side, y (c) migrar el contenido de examen de los 20+ cursos a ese
   flujo. Es un cambio de arquitectura grande (toca `data.js`, `app.js`,
   nueva Edge Function, y cómo se sirven las preguntas) que no se planifica
   aquí — **decisión pendiente del usuario:** ¿vale la pena ese esfuerzo
   dado el valor de Q10-Q50 por certificado, o se acepta el riesgo?
2. **Límite de salto de XP y validación de `completed_cards`** (bloquea el
   diseño final de la Tarea 5) — ver esa tarea.
3. **Resultado de la Tarea 2** puede cambiar el diseño de las Tareas 3-4 si
   la tabla `courses` ya sirve como fuente de verdad.
