# Auditoría pedagógica de los cursos de Yo Aprendo

Perspectiva: pedagogía y andragogía (Knowles), gamificación, metodologías activas, diseño de talleres y recursos.
Fecha: octubre de 2026. Método: métricas calculadas sobre `data.js` (27 cursos) y `recursos/`, más lectura de contenido por muestreo y de los pasajes revisados en la auditoría de contenidos. Las valoraciones de impacto son juicio experto, no medición con estudiantes.

## Criterio de impacto (1–5)
Potencial de cambiar la práctica real del docente, según cinco ejes: relevancia para el docente adulto, profundidad y rigor, aplicabilidad (práctica real), validez de la evaluación y recursos de taller.

## Hallazgos transversales (con evidencia)
1. **22 de 27 cursos no tienen examen propio.** El "examen final" se arma con las mismas tarjetas quiz ya respondidas (`getCourseExam`): entre 4 y 16 preguntas. Tres cursos (TEA, Down/TDAH, Lengua de Señas) tienen 4 preguntas: aprobar exige 3 de 4. Solo STEAM, ABP, Design Thinking, Evaluación y Tipos de estudiantes tienen examen dedicado (20–30 preguntas).
2. **Sesgo de posición.** La respuesta correcta es la opción B en más del 90 % de las preguntas (Design Thinking y Evaluación: 20/20; examen maestro: 33/34). Las tarjetas quiz mezclan las opciones, pero los exámenes no. Elegir siempre B aprueba.
3. **Sesgo de longitud.** La respuesta correcta es la más larga en 80–100 % de las preguntas de la mayoría de los cursos.
4. **Horas declaradas infladas.** Estimación de tiempo real (lectura a 180 palabras/min, 45 s por quiz, 90 s por simulación, 10 min por proyecto) de 1,0 a 2,1 horas por curso frente a 3–5 h declaradas. La cifra aparece en el certificado.
5. **Evaluación de bajo nivel cognitivo.** Preguntas basadas en escenarios: 0–20 % en la mayoría de los cursos. Los proyectos de cierre se autorreportan: no hay evidencia, retroalimentación ni revisión entre pares.
6. **Brecha de riqueza entre cursos.** Solo los 5 cursos iniciales (y Storytelling) incluyen "actividad" y "consejo" por tarjeta (37–55 por curso); los otros 21 tienen 0. Cuatro cursos de IA y los cinco de convivencia comparten la misma plantilla (≈48 tarjetas, 4 módulos, 4 proyectos, 4 simulaciones, 4 cierres).
7. **Gamificación desalineada.** XP, racha y ranking premian completar tarjetas, no aplicar en el aula, y el ranking es competitivo. El curso de Disciplina Positiva advierte contra las recompensas externas (efecto de sobrejustificación): el producto debería ser coherente con lo que enseña.
8. **Andragogía.** Fuerte en relevancia y experiencia previa (casos, "aplícalo mañana", proyectos). Débil en autodirección por curso (solo hay diagnóstico inicial), aprendizaje social (no hay comunidad ni revisión entre colegas) y repaso espaciado fuera de Micro-learning.
9. **Recursos.** 22 cursos tienen 3 plantillas imprimibles; 5 no tienen ninguna (Educación inclusiva, TEA, Down/TDAH, Lengua de Señas, PISA), justo los temas donde más se necesitan instrumentos prácticos. Los recursos son plantillas individuales: no hay guía de facilitación de taller (agenda, tiempos, materiales, cierre).

## Tabla de impacto por curso
Leyenda de evaluación: **D** examen dedicado · **R** examen reciclado de los quiz. Tarjetas: total / % interactivas (quiz, simulación, proyecto, cierre).

| Curso | Tarjetas | Eval. | Fortaleza principal | Debilidad principal | Impacto | Mejora prioritaria |
|---|---|---|---|---|---|---|
| Metodología STEAM 2.0 | 127 / 30 % | D (30) | Retos de bajo costo (puente, algoritmo del sándwich), plantillas, 5 proyectos | Curso muy largo y 70 % lectura; sin actividad/consejo por tarjeta; 5 h declaradas vs ≈1,9 h | 4,0 | Reducir a la mitad el contenido pasivo y convertirlo en retos |
| Aprendizaje Basado en Proyectos | 105 / 33 % | D (25) | Mapa del proyecto, rúbricas, 55 tarjetas con actividad, 3 recursos | Ponderaciones de nota distintas entre tarjetas (30/40/20/10 vs 30/30/25/15) | 4,8 | Unificar rúbrica y añadir entrega de evidencia del proyecto |
| Design Thinking | 80 / 34 % | D (20) | Empatía con familias, sensibilidad cultural, 4 proyectos | Examen con respuesta B en 20/20 | 4,3 | Mezclar opciones y añadir caso de entrevista real |
| Herramientas de Evaluación | 73 / 33 % | D (20) | Rúbricas, portafolio, retroalimentación (eje de la práctica docente) | Examen con respuesta B en 20/20 y la más larga en 95 % | 4,6 | Banco de preguntas con casos de calificación |
| Conoce a Quien Enseñas | 65 / 32 % | D (20) | 10 simulaciones con casos (método de casos), muy alto en empatía | Sin proyecto de cierre; contenido denso (102 palabras por tarjeta) | 4,3 | Proyecto "ficha de mi grupo" con evidencia |
| Storytelling para Docentes | 64 / 39 % | R (11) | 3 recursos, técnica transferible y práctica | Examen de 11 preguntas, 9 con B | 4,0 | Producir y compartir una historia propia (portafolio) |
| Despertando la Creatividad | 65 / 46 % | R (15) | Retos en aula, bajo costo | Quiz de recuerdo (0 % escenarios) | 3,6 | Preguntas de caso y retos con producto |
| Herramientas Tecnológicas | 57 / 49 % | R (16) | Marco SAMR/TPACK, ejemplos prácticos | Alta obsolescencia por herramientas concretas | 3,0 | Enfocar en criterios de elección; revisión anual de vigencia |
| Mobile Learning | 52 / 40 % | R (9) | Realismo para contextos con poca conectividad | Pocas preguntas de aplicación | 3,6 | Micro-retos con evidencia por foto/audio |
| Flipped Classroom | 52 / 40 % | R (9) | Estructura clara y casos con baja conectividad | Examen de 9 preguntas | 3,9 | Planificador de clase invertida como entregable |
| Aprendizaje Basado en Videos | 47 / 43 % | R (8) | Criterios de calidad de video, base en aprendizaje multimedia | Examen de 8 preguntas | 3,5 | Rúbrica de video y práctica de edición |
| Micro-learning | 47 / 43 % | R (8) | Coherente con repaso espaciado y recuperación | No aplica repaso espaciado al propio curso | 3,7 | Repaso espaciado en la app (tarjetas de repaso) |
| Docente y la IA | 47 / 45 % | R (9) | Muy relevante, ética y verificación | Cambia rápido; poca práctica guiada | 4,1 | Laboratorio de prompts con evaluación por rúbrica |
| IA para Ahorrar Tiempo | 48 / 35 % | R (5) | Beneficio inmediato y medible | Examen de 5 preguntas (aprobar = 4/5) | 3,9 | Medir horas ahorradas antes/después |
| Herramientas de IA Gratuitas | 48 / 35 % | R (5) | Catálogo útil | Dependiente de herramientas que cambian | 3,2 | Criterios de selección y ficha de evaluación de herramienta |
| IA e Inclusión Educativa | 48 / 35 % | R (5) | DUA + IA, apoyo a diversidad | Examen de 5 preguntas | 4,0 | Casos con adaptaciones reales del propio grupo |
| Ciudadanía Digital con IA | 48 / 35 % | R (5) | Verificación, privacidad, integridad académica | 0 % de preguntas de caso | 4,0 | Unidad lista para llevar al aula con evaluación |
| Manejo de Conductas Desafiantes | 48 / 42 % | R (8) | Enfoque no punitivo, alta necesidad docente | Sin práctica de roles guiada | 4,5 | Role-play con retroalimentación entre pares |
| Aprendizaje Socioemocional (SEL) | 48 / 42 % | R (8) | Marco CASEL, modelado docente | 100 % de respuestas B y 0 % de casos | 4,0 | Rutina semanal de aula con seguimiento |
| Comunicación Asertiva | 48 / 42 % | R (8) | Guiones (DEEC) transferibles | Quiz de recuerdo | 4,0 | Simulaciones con réplica oral |
| Disciplina Positiva | 48 / 42 % | R (8) | Teoría de la autodeterminación aplicada | Incoherente con el sistema de XP/ranking de la app | 4,1 | Alinear gamificación con motivación intrínseca |
| Bienestar Docente | 48 / 42 % | R (8) | Pertinencia andragógica (el adulto cuida de sí) | Sin seguimiento del hábito | 4,0 | Chequeo semanal con recordatorio |
| Educación Inclusiva | 42 / 48 % | R (5) | Fundamentos y DUA, 5 módulos | Sin recursos descargables; examen de 5 | 4,0 | Plantilla de plan DUA y ficha de barreras |
| TEA en el Aula | 32 / 50 % | R (4) | Estrategias específicas | 4 preguntas de examen; sin recursos | 3,4 | Recursos (horario visual, historia social) y examen ampliado |
| Síndrome de Down y TDAH | 32 / 50 % | R (4) | Estrategias específicas por perfil | 4 preguntas de examen; sin recursos | 3,4 | Fichas de adaptación y examen ampliado |
| Lengua de Señas para Docentes | 32 / 50 % | R (4) | Cultura Sorda, vocabulario de aula | Una lengua visual enseñada con texto/ilustraciones, sin video ni práctica con retroalimentación | 3,0 | Videos con personas sordas y práctica con auto/coevaluación |
| Fundamentos que Todo Estudiante Necesita (PISA) | 49 / 35 % | R (5) | Estrategias de lectura, matemática y motivación | Riesgo de "enseñar para la prueba"; sin recursos | 3,7 | Plantillas de comprensión lectora y estimación; foco en transferencia |

## Prioridades (impacto / esfuerzo)
1. Mezclar las opciones en los exámenes y revisar la longitud de las respuestas (esfuerzo bajo, impacto alto en credibilidad del certificado).
2. Ampliar los exámenes de los cursos con 4–9 preguntas a un mínimo de 15, con al menos 40 % de preguntas de caso.
3. Recalcular las horas declaradas (o contar las horas de práctica en el aula) y mostrarlas con honestidad en el certificado.
4. Añadir "actividad" y "consejo" a los cursos de la plantilla corta, y una guía de facilitación de taller por ruta.
5. Alinear la gamificación con la aplicación real: insignias por evidencia ("Lo apliqué en mi aula"), metas cooperativas y menos énfasis en el ranking competitivo.
6. Crear recursos para los cinco cursos sin ellos.

## Estado de implementación (octubre de 2026)
| # | Prioridad | Estado | Qué se hizo / qué falta |
|---|---|---|---|
| 1 | Mezclar opciones y revisar longitud | Hecho (parcial en longitud) | Los exámenes (`startExam`, `retryExam`, examen maestro) mezclan las opciones al presentarlas; en las preguntas nuevas la posición correcta queda repartida (≈26 %/21 %/25 %/27 % en A/B/C/D). La respuesta correcta sigue siendo la más larga en ≈50 % de las preguntas nuevas (azar: 25 %); las preguntas antiguas no se reescribieron. |
| 2 | Ampliar exámenes a ≥ 15 preguntas con ≥ 40 % de caso | Hecho | 22 cursos tienen `examExtra` (165 preguntas de caso en total); `getCourseExam` las suma a las tarjetas quiz. Ahora todos los cursos con examen reciclado tienen 15 o más preguntas. Creatividad y Herramientas Tecnológicas quedan en 32–33 % de casos porque ya tenían 15–16 preguntas de recuerdo. |
| 3 | Horas honestas | Hecho | `durationHours` recalculado con el método de la auditoría más 1 min por pregunta de examen (0,5 h de granularidad): de 1 a 2 h por curso. El certificado muestra «Horas de estudio» (tiempo de estudio en la plataforma, no incluye la práctica en el aula). |
| 4 | «Actividad» y «consejo» en los cursos de plantilla corta, guía de facilitación por ruta | Pendiente | Requiere redacción de contenido nuevo para ≈21 cursos. |
| 5 | Gamificación alineada con la aplicación | Parcial | «Lo apliqué en clase» ya existía: ahora otorga 40 XP (antes 15), hay nueva insignia a las 15 aplicaciones y el ranking se presenta como opcional. Pendiente: meta cooperativa (requiere un agregado en el servidor) y revisión de «Campeón semanal». |
| 6 | Recursos para los cinco cursos sin ellos | Pendiente | Plantilla de plan DUA, horario visual e historia social, fichas de adaptación, plantillas de comprensión lectora. |
