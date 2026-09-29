# Todo: hallazgos "Alto" del code review

Ver `tasks/plan.md` para contexto completo, criterios de aceptación y verificación de cada tarea.

## Fase 1: Eliminar duplicación de totalCards/IDs de tarjeta

- [x] Tarea 1: `coordinator.html` deriva `COURSES` desde `data.js` en runtime
- [x] Tarea 2: Confirmar si la tabla `courses` refleja `data.js` (spike) — resuelto por inspección de código: `admin.js:990-996` combina `courses` como cursos *adicionales* del CMS, distintos de `STATIC_COURSES`; no espeja los 26 cursos estáticos. Se descarta como fuente de verdad.
- [x] Tarea 3: Script `scripts/sync-course-totals.mjs` para `weekly-stats`
- [x] Tarea 4: Aplicar el script y marcar los límites de sync en `weekly-stats/index.ts` + `CLAUDE.md`

### Checkpoint: Fase 1
- [x] `coordinator.html` muestra los mismos totales que `data.js`/`admin.js` (verificado: los 26 cursos dan `moduleCardIds` y `totalCards` idénticos al array hardcodeado que reemplazaron)
- [x] `node scripts/sync-course-totals.mjs --check` pasa en verde
- [x] `weekly-stats` devuelve los mismos números que antes del cambio (verificado: drift simulado detectado y corregido, diff contra el original da 0 diferencias)
- [ ] Revisión con el usuario antes de continuar a Fase 2

## Fase 2: Endurecer la integridad de `progress` a nivel de base de datos — ✅ COMPLETA

- [x] Tarea 5: Migración SQL — trigger de validación de rango en `progress` (`migrations/progress-value-guard.sql`). Decisiones: salto de XP máximo 1000/escritura; usuario nuevo no puede empezar con más de 1000 XP; `completed_cards` valida formato (`^[a-zA-Z0-9_-]{1,60}$`), no contra IDs reales de `data.js`.
- [x] Tarea 6: Manejar en `app.js` el rechazo del trigger (`syncWithSupabase`, distingue `error.code === 'P0001'` de un error de conexión real — toast + log en vez de tratarlo como "sin conexión")
- [x] Tarea 7: Documentar el riesgo residual (examen calificado en cliente) en `CLAUDE.md`

### Checkpoint: Fase 2 — ✅ verificado (Postgres local, ver detalle abajo)
- [x] `UPDATE`/upsert de prueba con `xp: 999999` o `examScores: {steam: 150}` es rechazado
- [x] El flujo normal de la app (upsert legítimo, incluso con XP acumulado alto) sigue guardando sin errores — **se encontró y corrigió un bug real en la primera versión del trigger**: Postgres dispara el trigger `BEFORE INSERT` (con `OLD` nulo) antes de resolver el `ON CONFLICT DO UPDATE` que usa `app.js` en cada guardado, así que comparar contra `COALESCE(OLD.xp,0)` habría rechazado el upsert de CUALQUIER usuario con más de 1000 XP acumulado — o sea, prácticamente todos después de un par de semanas. Se corrigió buscando la fila existente con un `SELECT` propio en vez de depender de `OLD`. Probado con 8 casos (upsert legítimo con XP alto, upsert malicioso, usuario nuevo legítimo/malicioso, examScores fuera de rango, XSS en completed_cards, xp negativo, secuencia de updates legítimos cruzando el umbral de 1000) contra un Postgres 16 local — todos se comportan como se espera.
- [x] Decisión sobre la Pregunta Abierta 1: **no se persigue** la calificación server-side de exámenes por ahora (documentado en `CLAUDE.md`, sección "Integridad de progress — riesgo conocido y aceptado"). Revisar si aparece evidencia de abuso real.

## Preguntas abiertas — resueltas

- [x] ¿Se justifica mover la calificación de exámenes al servidor? **No por ahora** — el valor económico (Q10-Q50/certificado) no justifica el esfuerzo (nueva Edge Function + reescribir 26 cursos + `app.js`). Riesgo aceptado y documentado en `CLAUDE.md`.
- [x] ¿Cuál es el salto de XP máximo razonable por escritura? **1000** (el combo legítimo más alto hoy ronda 200-500 XP agrupados por el debounce de `saveProgress`).
- [x] ¿Vale la pena validar `completed_cards` contra IDs reales o alcanza con validar tipo/formato? **Solo formato** (`^[a-zA-Z0-9_-]{1,60}$`) — validar contra IDs reales reintroduciría el problema de sincronización que la Fase 1 eliminó.
