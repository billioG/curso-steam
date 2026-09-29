# Todo: hallazgos "Alto" del code review

Ver `tasks/plan.md` para contexto completo, criterios de aceptación y verificación de cada tarea.

## Fase 1: Eliminar duplicación de totalCards/IDs de tarjeta

- [ ] Tarea 1: `coordinator.html` deriva `COURSES` desde `data.js` en runtime
- [ ] Tarea 2: Confirmar si la tabla `courses` refleja `data.js` (spike)
- [ ] Tarea 3: Script `scripts/sync-course-totals.mjs` para `weekly-stats`
- [ ] Tarea 4: Aplicar el script y marcar los límites de sync en `weekly-stats/index.ts` + `CLAUDE.md`

### Checkpoint: Fase 1
- [ ] `coordinator.html` muestra los mismos totales que `data.js`/`admin.js`
- [ ] `node scripts/sync-course-totals.mjs --check` pasa en verde
- [ ] `weekly-stats` devuelve los mismos números que antes del cambio
- [ ] Revisión con el usuario antes de continuar a Fase 2

## Fase 2: Endurecer la integridad de `progress` a nivel de base de datos

- [ ] Tarea 5: Migración SQL — trigger de validación de rango en `progress` (requiere resolver primero: límite de salto de XP, y si se valida `completed_cards` contra IDs reales)
- [ ] Tarea 6: Manejar en `app.js` el rechazo del trigger (toast + log, no fallar en silencio)
- [ ] Tarea 7: Documentar el riesgo residual (examen calificado en cliente) en `CLAUDE.md`

### Checkpoint: Fase 2
- [ ] `UPDATE` de prueba con `xp: 999999` o `examScores: {steam: 150}` es rechazado
- [ ] El flujo normal de la app (completar tarjetas, rendir examen) sigue guardando sin errores
- [ ] Revisión con el usuario — decidir si la Pregunta Abierta 1 se agenda como proyecto aparte

## Preguntas abiertas (bloquean decisiones de diseño, no tareas en sí)

- [ ] ¿Se justifica mover la calificación de exámenes al servidor? (ver Pregunta Abierta 1 en plan.md — cambio de arquitectura grande, fuera de alcance de este plan)
- [ ] ¿Cuál es el salto de XP máximo razonable por escritura? (bloquea Tarea 5)
- [ ] ¿Vale la pena validar `completed_cards` contra IDs reales o alcanza con validar tipo/formato? (bloquea Tarea 5)
