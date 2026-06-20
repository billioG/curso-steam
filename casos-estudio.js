// casos-estudio.js
// Branching Case Studies — Formación Docente en Pedagogía Innovadora
// 1bot - edoo · Guatemala 2026

const CASE_STUDIES = [

  // ─────────────────────────────────────────────────────────────────────────
  // CASO 1: "El aula de Mariana" — STEAM
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cs1',
    title: 'El aula de Mariana',
    course: 'STEAM',
    color: '#07B0E4',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
    duration: '20-25 min',
    description: 'Mariana quiere hacer su primer proyecto STEAM en una escuela rural de Guatemala sin tecnología ni materiales comerciales. Acompáñala a tomar decisiones pedagógicas que transforman las limitaciones en oportunidades.',
    start: 'cs1_n1',
    nodes: {

      // ── LEVEL 1: Choose the project ──────────────────────────────────────
      'cs1_n1': {
        type: 'scenario',
        text: 'Mariana enseña cuarto grado en la Escuela Oficial Rural Mixta Cantón El Quetzal, en Chiquimula. Tiene 28 estudiantes, ninguna computadora, y un presupuesto mensual de Q40 para materiales. Esta semana escuchó sobre STEAM y se emocionó — pero al revisar su aula, ve pupitres de madera, tres marcadores y una ventana que da al monte. Quiere hacer un proyecto auténtico, no un experimento de ciencias de diez minutos.',
        context: 'El director le ha dado tres semanas para presentar algo ante los padres de familia. Los estudiantes viven en comunidades cafetaleras y maiceras. Tienen acceso al río, al bosque, y a las tradiciones de sus abuelos.',
        choices: [
          {
            text: 'Proponer un proyecto de purificación de agua usando materiales locales: arena, piedrín, carbón vegetal y telas.',
            next: 'cs1_n2a',
            isCorrect: true
          },
          {
            text: 'Pedir a los padres que compren un kit de robótica básica de internet para que los niños aprendan tecnología "de verdad".',
            next: 'cs1_n2b',
            isCorrect: false
          },
          {
            text: 'Recrear el Popol Vuh a través del arte y la ciencia: ilustrar los elementos naturales usando propiedades físicas y químicas reales.',
            next: 'cs1_n2c',
            isCorrect: false
          }
        ]
      },

      // LEVEL 2 branch A (correct path)
      'cs1_n2a': {
        type: 'feedback_correct',
        text: 'Excelente elección. Al anclar el proyecto en el agua — un recurso vital, presente, y problemático en la comunidad — Mariana conecta el STEAM con la realidad inmediata de sus estudiantes. El problema es auténtico: muchas familias del cantón no tienen acceso a agua purificada. Esto convierte el proyecto en algo con propósito real, no solo académico.',
        tip: 'Principio pedagógico: El aprendizaje STEAM más poderoso ocurre cuando el problema a resolver existe en el mundo real del estudiante. La "T" de tecnología no requiere dispositivos electrónicos — es la aplicación de conocimiento para resolver problemas.',
        next: 'cs1_n3a',
        xp: 10
      },

      // LEVEL 2 branch B (wrong path)
      'cs1_n2b': {
        type: 'feedback_wrong',
        text: 'Este camino tiene varios problemas. Primero, los kits de robótica cuestan entre Q800 y Q3,000 — muy fuera del alcance de las familias. Segundo, pedir ese gasto a padres cafetaleros en época de baja cosecha crea tensión entre la escuela y la comunidad. Tercero, y más importante: reduce la "T" de STEAM a gadgets electrónicos, ignorando que la tecnología es cualquier solución humana a un problema. Mariana necesita replantear su concepción del proyecto.',
        tip: 'Error común: confundir "tecnología" con "dispositivos digitales". En contextos rurales de Guatemala, un sistema de filtración de agua construido con materiales locales ES tecnología — y un proyecto STEAM más auténtico que un kit importado.',
        next: 'cs1_n3b',
        xp: 0
      },

      // LEVEL 2 branch C (partial path)
      'cs1_n2c': {
        type: 'feedback_wrong',
        text: 'La idea tiene valor cultural y puede ser hermosa, pero tiene una debilidad pedagógica: la conexión entre arte, ciencia y el Popol Vuh requiere una cuidadosa ingeniería curricular para no quedarse en decoración temática. Si no se diseña con rigor, los estudiantes aprenden sobre el Popol Vuh pero no integran realmente las disciplinas STEAM. Mariana necesita pensar si puede construir esa conexión profunda en tres semanas sin apoyo adicional.',
        tip: 'Considerar: los proyectos interdisciplinarios necesitan que cada disciplina aporte de forma genuina, no decorativa. ¿Qué preguntas científicas específicas respondería este proyecto? ¿Qué problema resuelve?',
        next: 'cs1_n3c',
        xp: 0
      },

      // ── LEVEL 3 branches ─────────────────────────────────────────────────

      // Path A: Good project, now faces parent complaint
      'cs1_n3a': {
        type: 'scenario',
        text: 'El proyecto de purificación de agua arranca bien. Los estudiantes están divididos en equipos y construyendo filtros con botellas plásticas, arena gruesa, piedrín y carbón de la cocina de leña. Pero al tercer día, el papá de uno de los estudiantes —Don Rigoberto, vocal de la junta escolar— se presenta en el aula y dice en voz alta frente a los niños: "Señorita, esto no es escuela. Mis hijos necesitan aprender matemáticas y gramática, no jugar con piedras."',
        context: 'Los estudiantes se detienen. Algunos miran a Mariana con incertidumbre. Don Rigoberto es respetado en la comunidad y su opinión pesa.',
        choices: [
          {
            text: 'Invitar a Don Rigoberto a quedarse y mostrarle cómo los estudiantes están usando fracciones para calcular las proporciones de los materiales y redactando hipótesis escritas.',
            next: 'cs1_n4a',
            isCorrect: true
          },
          {
            text: 'Disculparse y decirle que tiene razón — parar el proyecto y volver a los libros de texto para el resto de la semana.',
            next: 'cs1_n4b',
            isCorrect: false
          },
          {
            text: 'Pedirle que hable con el director y continuar la clase como si nada — los padres no deben interrumpir.',
            next: 'cs1_n4c',
            isCorrect: false
          }
        ]
      },

      // Path B: Had to reconceive project, now starting late
      'cs1_n3b': {
        type: 'scenario',
        text: 'Tras reflexionar, Mariana descarta el kit de robótica y vuelve a la comunidad como fuente. Habla con doña Eulalia, una abuela que sabe tejer huipiles, y nota que los patrones geométricos del tejido son matemática pura. Propone un proyecto STEAM alternativo: documentar y analizar los patrones geométricos del tejido maya local. Pero ahora perdió cinco días y solo tiene dos semanas. Los estudiantes están algo confundidos por el cambio de planes.',
        context: 'Mariana necesita reconstruir el entusiasmo del grupo y ajustar el alcance del proyecto para ser realista con el tiempo restante.',
        choices: [
          {
            text: 'Ser honesta con los estudiantes: explicar que cambió de dirección porque encontró algo más valioso, y pedirles que le ayuden a diseñar el nuevo proyecto juntos.',
            next: 'cs1_n4d',
            isCorrect: true
          },
          {
            text: 'Simplemente cambiar de tema sin explicar — los niños son pequeños y no necesitan saber el porqué de las decisiones del docente.',
            next: 'cs1_n4e',
            isCorrect: false
          }
        ]
      },

      // Path C: Popol Vuh project, needs to add rigor
      'cs1_n3c': {
        type: 'scenario',
        text: 'Mariana decide continuar con el proyecto del Popol Vuh pero lo rediseña con más profundidad. Ahora los estudiantes deben identificar elementos naturales del relato (agua, fuego, maíz, viento) e investigar sus propiedades físicas y químicas reales. Están documentando hallazgos en un "libro científico del Popol Vuh". Sin embargo, al llegar al tercer nivel de profundidad, nota que varios estudiantes están decorando más que investigando.',
        context: 'El proyecto tiene potencial pero algunos equipos lo están convirtiendo en un proyecto de arte sin contenido científico.',
        choices: [
          {
            text: 'Detener la clase y establecer una "pregunta científica obligatoria" que cada equipo debe responder con evidencia antes de continuar decorando.',
            next: 'cs1_n4f',
            isCorrect: true
          },
          {
            text: 'Dejar que cada equipo siga su propio camino — la creatividad es más importante que el rigor científico en primaria.',
            next: 'cs1_n4g',
            isCorrect: false
          }
        ]
      },

      // ── LEVEL 4 branches ─────────────────────────────────────────────────

      'cs1_n4a': {
        type: 'feedback_correct',
        text: 'Mariana hace algo brillante: convierte la interrupción en una oportunidad de visibilizar el aprendizaje. Toma el cuaderno de un estudiante y muestra a Don Rigoberto las fracciones escritas (1/4 de arena, 1/4 de carbón...), el vocabulario nuevo en las hipótesis, y el problema real que están resolviendo. Don Rigoberto se sienta, escucha, y termina ayudando a un niño a calcular el caudal del filtro. Al salir, dice: "No sabía que así se enseñaba."',
        tip: 'Principio: La comunicación con familias sobre metodologías activas requiere hacer visible el aprendizaje disciplinar que está ocurriendo. Los padres no rechazan la innovación — rechazan lo que perciben como pérdida de rigor. La solución es demostrar el rigor, no eliminarlo.',
        next: 'cs1_n5a',
        xp: 10
      },

      'cs1_n4b': {
        type: 'feedback_wrong',
        text: 'Detener el proyecto envía un mensaje poderoso y dañino a los estudiantes: que la opinión de un adulto externo vale más que su proceso de aprendizaje, y que los proyectos complejos se abandonan ante la primera crítica. También refuerza la idea de Don Rigoberto de que el proyecto era "solo juego". Mariana pierde una oportunidad de demostrar el valor del enfoque y de construir confianza con la comunidad.',
        tip: 'Reflexión: Ceder ante la presión sin diálogo no es humildad — es una forma de privar a los estudiantes de una experiencia valiosa. El docente tiene la responsabilidad de defender el aprendizaje con argumentos, no solo con autoridad.',
        next: 'cs1_n5b',
        xp: 0
      },

      'cs1_n4c': {
        type: 'feedback_wrong',
        text: 'Ignorar a Don Rigoberto y enviarlo al director genera conflicto institucional innecesario. En comunidades rurales de Guatemala, la relación entre docente y familia es fundamental. Una respuesta defensiva puede convertir a un padre curioso en un oponente activo del proyecto — y del docente. Además, el director ahora enfrenta una queja sin contexto.',
        tip: 'Considerar: La participación de padres en el aula, aunque incómoda, puede convertirse en un recurso. La clave está en transformar la interrupción en colaboración, no en conflicto.',
        next: 'cs1_n5c',
        xp: 0
      },

      'cs1_n4d': {
        type: 'feedback_correct',
        text: 'La transparencia de Mariana tiene un efecto inesperado: los estudiantes se sienten respetados como participantes del proceso, no solo receptores. Cuando ella dice "cometí un error al elegir algo fuera de nuestro alcance — ¿qué piensan de este nuevo camino?", los niños se involucran inmediatamente. Diseñan juntos el alcance reducido: cada equipo documentará los patrones de un tejido diferente y presentará sus hallazgos matemáticos.',
        tip: 'Principio: Modelar la metacognición y la honestidad intelectual enseña más que pretender que todo fue planificado. Los docentes que muestran cómo ajustan su pensamiento enseñan a los estudiantes a hacer lo mismo.',
        next: 'cs1_n5d',
        xp: 10
      },

      'cs1_n4e': {
        type: 'feedback_wrong',
        text: 'Cambiar de tema sin explicación crea confusión y erosiona la confianza. Los niños de cuarto grado notan perfectamente cuando algo cambia sin razón — y aprenden que los adultos no explican sus decisiones. Esto además pierde una oportunidad de modelar flexibilidad y aprendizaje reflexivo.',
        tip: 'Los niños aprenden metacognición cuando ven a adultos pensar en voz alta sobre sus propias decisiones. Ocultar los cambios de rumbo priva a los estudiantes de ese modelo.',
        next: 'cs1_n5e',
        xp: 0
      },

      'cs1_n4f': {
        type: 'feedback_correct',
        text: 'Al establecer que cada equipo debe responder una pregunta científica específica — "¿Por qué el maíz se endurece cuando se seca?" o "¿Qué hace que el fuego necesite aire?" — Mariana rescata el rigor sin matar la creatividad. Los estudiantes que estaban decorando ahora buscan respuestas antes de continuar. El proyecto se transforma en una investigación ilustrada, que es exactamente lo que debería ser.',
        tip: 'Principio: En proyectos interdisciplinarios, la pregunta es el andamio. Una buena pregunta científica dentro de un proyecto artístico garantiza que el arte no desplace el pensamiento — sino que lo exprese.',
        next: 'cs1_n5f',
        xp: 10
      },

      'cs1_n4g': {
        type: 'feedback_wrong',
        text: 'Dejar que la creatividad reemplace el rigor convierte el proyecto STEAM en un proyecto de manualidades temáticas. Al final, los estudiantes habrán producido algo visualmente hermoso pero sin haber ejercitado el pensamiento científico. La integración disciplinar requiere que cada disciplina aporte con su propia lógica, no solo con su estética.',
        tip: 'STEAM no significa que las artes suplantan a las ciencias — significa que se integran. Un docente STEAM mantiene el rigor científico mientras abre espacio para la expresión creativa.',
        next: 'cs1_n5g',
        xp: 0
      },

      // ── LEVEL 5 branches ─────────────────────────────────────────────────

      'cs1_n5a': {
        type: 'scenario',
        text: 'La presentación final se acerca. Los filtros de agua están construidos y los equipos han probado su eficacia con agua del río. Pero Mariana nota que Tomás, un estudiante con dislexia que lucha para leer y escribir, se ha quedado callado durante los ensayos de presentación oral. Su equipo habla por él. Tomás sabe perfectamente cómo funciona el filtro — lo construyó casi solo — pero en el momento de presentar frente a los padres, se paraliza.',
        context: 'La presentación es en dos días. Hay 40 padres invitados. Tomás tiene mucho que decir pero le aterroriza hacerlo con palabras.',
        choices: [
          {
            text: 'Trabajar con Tomás para que presente usando el filtro físico como guía: que demuestre el proceso en lugar de recitar, señalando cada capa mientras su compañero lee la explicación.',
            next: 'cs1_outcome_success',
            isCorrect: true
          },
          {
            text: 'Dejar que su equipo presente por él para no causarle estrés — a veces es mejor proteger a los estudiantes que exponerlos.',
            next: 'cs1_outcome_partial',
            isCorrect: false
          },
          {
            text: 'Pedirle a Tomás que practique más y que supere su timidez — todos los estudiantes deben presentar de la misma forma.',
            next: 'cs1_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs1_n5b': {
        type: 'scenario',
        text: 'Mariana detuvo el proyecto y volvió al libro de texto. Pero después de dos días de lecciones tradicionales, nota algo: los estudiantes están desmotivados y Don Rigoberto, cuando se enteró, le preguntó al director por qué pararon "ese proyecto tan bonito de los filtros". La situación se invirtió — ahora el padre que protestó quiere que sigan. El director le da a Mariana la opción de retomarlo.',
        context: 'Tiene una semana para recuperar el proyecto. Los estudiantes han perdido el ritmo pero no el interés.',
        choices: [
          {
            text: 'Retomar el proyecto y usarlo como oportunidad para hablar con los estudiantes sobre resiliencia: los buenos proyectos merecen ser defendidos.',
            next: 'cs1_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Negarse a retomarlo — ya es muy tarde y es mejor terminar el trimestre con calificaciones claras.',
            next: 'cs1_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs1_n5c': {
        type: 'scenario',
        text: 'El director medió entre Mariana y Don Rigoberto, y se organizó una reunión. La conversación fue incómoda pero abrió un diálogo sobre qué significa aprender en la escuela. Al final, Don Rigoberto pidió ver el proyecto. Mariana lo invitó. Cuando vio a su hijo explicar fracciones con el filtro en la mano, se emocionó visiblemente. Ahora hay una oportunidad de presentación pública más grande de lo que Mariana planeó.',
        context: 'El conflicto se convirtió en una plataforma. Pero Mariana está nerviosa — la presentación ahora tiene más presión.',
        choices: [
          {
            text: 'Usar la mayor audiencia como motivación adicional para los estudiantes: explicarles que su trabajo importa tanto que más personas quieren verlo.',
            next: 'cs1_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Simplificar la presentación para reducir riesgos — con más gente es mejor hacer algo seguro y breve.',
            next: 'cs1_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs1_n5d': {
        type: 'scenario',
        text: 'El proyecto de tejidos matemáticos llega a su presentación. Cada equipo tiene un huipil o tela prestada por una abuela de la comunidad, y ha documentado los patrones geométricos con mediciones y clasificaciones. Pero la estudiante más brillante del grupo, Lucía, quiere ir más lejos: quiere probar que los patrones del tejido siguen secuencias de Fibonacci. Tiene intuición pero no sabe cómo demostrarlo formalmente.',
        context: 'La presentación es mañana. No hay tiempo para enseñar Fibonacci desde cero, pero la observación de Lucía es matemáticamente interesante.',
        choices: [
          {
            text: 'Ayudar a Lucía a formular su observación como una hipótesis abierta: "creemos que hay un patrón numérico, queremos investigarlo más" — honrar la curiosidad sin fingir certeza.',
            next: 'cs1_outcome_success',
            isCorrect: true
          },
          {
            text: 'Decirle a Lucía que eso es muy avanzado y que mejor presente solo lo que ya aprendió el grupo.',
            next: 'cs1_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs1_n5e': {
        type: 'scenario',
        text: 'El proyecto de tejidos avanza pero sin el entusiasmo del inicio. Los estudiantes lo hacen porque Mariana lo pide, no porque les importe. Durante la presentación ante los padres, los equipos recitan datos sin convicción. Una madre pregunta: "¿Por qué estudiaron esto?" y ningún estudiante tiene una respuesta clara. Mariana se da cuenta de que le faltó conectar el proyecto con el "para qué".',
        context: 'La presentación terminó. Mariana tiene que reflexionar sobre qué cambiaría.',
        choices: [
          {
            text: 'Hacer una clase de cierre donde los estudiantes identifiquen qué aprendieron y por qué importó — aunque sea tarde, el procesamiento metacognitivo tiene valor.',
            next: 'cs1_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Pasar a la siguiente unidad — el proyecto terminó y hay que avanzar con el curriculum.',
            next: 'cs1_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs1_n5f': {
        type: 'scenario',
        text: 'El "Libro Científico del Popol Vuh" está casi terminado. Cada equipo tiene páginas ilustradas con explicaciones científicas reales. Pero Mariana enfrenta el momento de evaluación: ¿cómo califica esto? No hay respuestas correctas únicas, cada libro es diferente, y el director espera ver notas numéricas en el boletín.',
        context: 'Mariana tiene que traducir un proceso de aprendizaje rico y complejo a una calificación que el sistema escolar reconozca.',
        choices: [
          {
            text: 'Crear una rúbrica simple con criterios científicos (¿tiene hipótesis?, ¿tiene evidencia?, ¿explica el fenómeno?) y criterios de proceso (participación, revisión), y compartirla con los estudiantes antes de calificar.',
            next: 'cs1_outcome_success',
            isCorrect: true
          },
          {
            text: 'Calificar basándose en qué tan bonitos quedaron los libros — si se esforzaron en la presentación visual, merecen buena nota.',
            next: 'cs1_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs1_n5g': {
        type: 'scenario',
        text: 'Los libros finales son visualmente impresionantes pero superficiales en contenido científico. Al presentarlos, los padres los celebran por lo bonitos. Pero cuando el director revisa el trabajo, pregunta: "¿Qué ciencia aprendieron exactamente?" Mariana no tiene una respuesta clara. Ha producido un proyecto artístico con temática científica, no un proyecto verdaderamente interdisciplinar.',
        context: 'El director no está conforme pero tampoco quiere desacreditar el esfuerzo. Le pide a Mariana que reflexione.',
        choices: [
          {
            text: 'Aceptar la crítica y diseñar una actividad complementaria de una semana donde los estudiantes profundicen en la ciencia detrás de sus ilustraciones.',
            next: 'cs1_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Defender el proyecto tal como está — la creatividad importa y el director no entiende la pedagogía moderna.',
            next: 'cs1_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      // ── OUTCOMES ─────────────────────────────────────────────────────────

      'cs1_outcome_success': {
        type: 'outcome',
        outcome: 'success',
        title: 'Mariana: Docente STEAM auténtica',
        text: 'Mariana demostró que STEAM no requiere tecnología cara ni laboratorios equipados — requiere problemas reales, pensamiento disciplinar genuino y flexibilidad pedagógica. Sus estudiantes presentaron filtros funcionales, explicaron propiedades físicas y químicas, usaron fracciones con propósito, y aprendieron que la ciencia puede nacer del monte y el río de su propia comunidad. Tomás presentó con su cuerpo lo que no pudo con palabras — y fue el momento más aplaudido de la tarde.',
        badge: 'Docente STEAM Contextualizada',
        xpReward: 50
      },
      'cs1_outcome_partial': {
        type: 'outcome',
        outcome: 'partial',
        title: 'Mariana: En camino, con lecciones',
        text: 'El proyecto tuvo valor real, pero algunas decisiones limitaron su potencial. Mariana aprendió algo fundamental: los proyectos STEAM viven y mueren por las decisiones que el docente toma en los momentos de presión — ante un padre que protesta, ante un estudiante que no puede presentar como los demás, ante un proyecto que pierde rumbo. Cada una de esas decisiones es una lección para el próximo proyecto.',
        badge: 'Docente Reflexiva',
        xpReward: 25
      },
      'cs1_outcome_struggle': {
        type: 'outcome',
        outcome: 'struggle',
        title: 'Mariana: Primer intento, primeras lecciones',
        text: 'El primer proyecto STEAM de Mariana no salió como esperaba. Pero el fracaso pedagógico honesto es más valioso que el éxito superficial. Las decisiones que tomó — aunque imperfectas — le revelan algo sobre sus supuestos como docente: sobre la autoridad, sobre la evaluación, sobre quién "puede" presentar y cómo. El siguiente proyecto de Mariana será mejor porque este existió.',
        badge: 'Docente en Proceso',
        xpReward: 10
      }
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CASO 2: "El proyecto que no funcionó" — ABP
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cs2',
    title: 'El proyecto que no funcionó',
    course: 'ABP',
    color: '#F59E0B',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    duration: '20-25 min',
    description: 'El proyecto ABP de Carlos sobre problemas urbanos de Guatemala City se ha estancado. Los estudiantes están desconectados, hay conflicto entre compañeros, y el plazo vence en dos semanas. ¿Puede salvarlo?',
    start: 'cs2_n1',
    nodes: {

      'cs2_n1': {
        type: 'scenario',
        text: 'Carlos es docente de Ciencias Sociales en un instituto de secundaria en la zona 6 de Guatemala City. Hace tres semanas lanzó un proyecto ABP sobre "problemas urbanos de nuestra ciudad" con gran entusiasmo. Hoy, semana cuatro de seis, la realidad es dura: tres de cinco equipos no han avanzado más allá de buscar imágenes en internet, un equipo tiene dos estudiantes que no se hablan, y cuando Carlos pregunta "¿cómo va su investigación?", los estudiantes lo miran con indiferencia o con el teléfono en la mano.',
        context: 'Faltan dos semanas para la presentación final ante una audiencia externa (la municipalidad de la zona). Carlos siente que algo falló desde el inicio pero no sabe exactamente qué.',
        choices: [
          {
            text: 'Reiniciar el proyecto desde cero con un nuevo tema y estructura — con dos semanas es mejor empezar limpio.',
            next: 'cs2_n2a',
            isCorrect: false
          },
          {
            text: 'Pausar el trabajo de los equipos e investigar la causa real de la desconexión antes de tomar cualquier decisión.',
            next: 'cs2_n2b',
            isCorrect: true
          },
          {
            text: 'Reducir el alcance del proyecto para que sea manejable: cancelar la presentación ante la municipalidad y convertirlo en una tarea individual escrita.',
            next: 'cs2_n2c',
            isCorrect: false
          }
        ]
      },

      'cs2_n2a': {
        type: 'feedback_wrong',
        text: 'Reiniciar con dos semanas es casi garantía de un segundo fracaso. El problema no es el tema — es algo más profundo en cómo está diseñado el proyecto. Si Carlos no diagnostica la causa real antes de actuar, va a repetir los mismos errores. Además, cancelar el trabajo de los equipos sin razón clara destruye aún más la motivación.',
        tip: 'En ABP, cuando un proyecto se estanca, el diagnóstico debe preceder a la intervención. Actuar antes de entender la causa convierte la solución en otro problema.',
        next: 'cs2_n3a',
        xp: 0
      },

      'cs2_n2b': {
        type: 'feedback_correct',
        text: 'Carlos hace algo valioso: reconoce que no puede resolver lo que no entiende. Dedica la siguiente clase a escuchar. Hace entrevistas rápidas con cada equipo (5 minutos por grupo) y hace una sola pregunta: "¿Qué tiene que ver este proyecto con tu vida real?" Las respuestas son reveladoras: "No sé", "Nada", "Los problemas de la zona 6 no me afectan a mí". La pregunta motriz — demasiado genérica — no conectó con las vidas reales de los estudiantes.',
        tip: 'Principio ABP: La pregunta motriz es el corazón del proyecto. Si los estudiantes no pueden conectarla con algo que les importa personalmente, el proyecto nunca generará motivación intrínseca. La autenticidad del problema no la define el docente — la define el estudiante.',
        next: 'cs2_n3b',
        xp: 10
      },

      'cs2_n2c': {
        type: 'feedback_wrong',
        text: 'Reducir a tarea individual elimina todo lo que hace al ABP valioso: la colaboración, la audiencia real, la resolución de problemas auténticos. Carlos estaría convirtiendo un proyecto en un ensayo — y enviando el mensaje de que cuando algo es difícil, se simplifica hasta que ya no importa.',
        tip: 'Cuando un proyecto ABP enfrenta dificultades, la respuesta raramente es eliminarlo. Generalmente requiere un ajuste quirúrgico — al problema, al proceso, o a las estructuras de apoyo — no una amputación.',
        next: 'cs2_n3c',
        xp: 0
      },

      // LEVEL 3

      'cs2_n3a': {
        type: 'scenario',
        text: 'Carlos reinicia el proyecto con un nuevo tema: "el transporte público en Guatemala City". Los equipos arrancan con algo más de energía inicial, pero en dos días el patrón se repite: los estudiantes buscan información sin propósito claro. Carlos nota que la "pregunta motriz" del nuevo proyecto tiene el mismo problema que el anterior: "¿Cómo podemos mejorar el transporte de nuestra ciudad?" es demasiado amplia y no conecta con su experiencia diaria.',
        context: 'Carlos está en el mismo punto, ahora con menos tiempo. Pero ha identificado el patrón: la pregunta es el problema.',
        choices: [
          {
            text: 'Reformular la pregunta con los estudiantes usando sus experiencias reales: "¿Por qué el camión que tomas todos los días llega tarde o no llega?" como punto de partida.',
            next: 'cs2_n4a',
            isCorrect: true
          },
          {
            text: 'Dejar la pregunta como está y aumentar la estructura: dar a los estudiantes una lista de pasos exactos a seguir cada día.',
            next: 'cs2_n4b',
            isCorrect: false
          }
        ]
      },

      'cs2_n3b': {
        type: 'scenario',
        text: 'Armado con este diagnóstico, Carlos toma una decisión valiente: va a reconstruir la pregunta motriz en medio del proyecto. En lugar de cambiar el tema, va a hacerlo más personal. Convoca a los estudiantes y les dice: "Tienen razón — la pregunta que puse no conecta con ustedes. Quiero que me ayuden a arreglarla." Pero antes de continuar, enfrenta el conflicto en el equipo 3: Andrea y Sebastián no se dirigen la palabra desde hace una semana.',
        context: 'El conflicto interpersonal es urgente — si no se resuelve, el equipo no puede funcionar y la nueva pregunta motriz no importará.',
        choices: [
          {
            text: 'Hablar con Andrea y Sebastián por separado primero — escuchar cada perspectiva individualmente antes de juntarlos.',
            next: 'cs2_n4c',
            isCorrect: true
          },
          {
            text: 'Juntar a Andrea y Sebastián frente al equipo y pedirles que resuelvan su conflicto ahora — el grupo necesita ver que los problemas se enfrentan directamente.',
            next: 'cs2_n4d',
            isCorrect: false
          },
          {
            text: 'Ignorar el conflicto por ahora — con la nueva pregunta motriz, la energía del proyecto resolverá la tensión naturalmente.',
            next: 'cs2_n4e',
            isCorrect: false
          }
        ]
      },

      'cs2_n3c': {
        type: 'scenario',
        text: 'La tarea individual escrita produce resultados previsibles: párrafos copiados de internet sobre "problemas del tráfico en Guatemala" sin análisis propio. Algunos estudiantes copian textualmente de Wikipedia. Carlos califica y saca a flote las notas, pero sabe que nadie aprendió nada significativo. El director nota que la presentación ante la municipalidad fue cancelada y pregunta por qué.',
        context: 'Carlos tiene que explicar la decisión y enfrentar la pregunta implícita: ¿podría haber hecho algo diferente?',
        choices: [
          {
            text: 'Reconocer honestamente con el director que tomó una decisión de gestión (reducir el alcance) cuando necesitaba una decisión pedagógica (rediseñar el problema).',
            next: 'cs2_n4f',
            isCorrect: true
          },
          {
            text: 'Explicar que los estudiantes no estaban listos para ABP y que necesitan más años de preparación antes de intentarlo.',
            next: 'cs2_n4g',
            isCorrect: false
          }
        ]
      },

      // LEVEL 4

      'cs2_n4a': {
        type: 'feedback_correct',
        text: 'Cuando Carlos reformula la pregunta usando las experiencias concretas de los estudiantes — sus rutas diarias, sus esperas reales, sus frustraciones vividas — algo cambia en la sala. Un estudiante que no había hablado en semanas dice: "El 65 me dejó tirado ayer y llegué tarde al examen." Ese comentario se convierte en el centro del proyecto. La investigación ahora tiene urgencia personal.',
        tip: 'Principio ABP: La pregunta motriz más poderosa es la que el estudiante podría haber formulado él mismo si hubiera tenido el andamio para hacerlo. El docente no impone el problema — ayuda al estudiante a articular el que ya está viviendo.',
        next: 'cs2_n5a',
        xp: 10
      },

      'cs2_n4b': {
        type: 'feedback_wrong',
        text: 'Aumentar la estructura sin cambiar la pregunta es darle a un paciente más ibuprofeno sin tratar la causa de su dolor. Los estudiantes seguirán los pasos mecánicamente pero sin motivación real. El andamio procedimental no reemplaza la relevancia del problema.',
        tip: 'En ABP, la estructura y los andamios deben servir a una pregunta que importe. Si la pregunta no importa, los andamios solo producen cumplimiento sin aprendizaje.',
        next: 'cs2_n5b',
        xp: 0
      },

      'cs2_n4c': {
        type: 'feedback_correct',
        text: 'Al hablar por separado, Carlos descubre que el conflicto no es personal — es sobre la dirección del proyecto. Andrea quiere investigar el transporte en buses urbanos; Sebastián quiere enfocarse en el tráfico de motocicletas, porque su hermano tuvo un accidente. Ambas perspectivas son válidas y complementarias. Carlos les propone integrar ambos enfoques en un solo análisis del riesgo vial. La conversación individual permitió escuchar lo que el grupo nunca habría revelado.',
        tip: 'Principio: El conflicto en equipos de trabajo raramente es solo interpersonal — generalmente refleja una diferencia de visión o de prioridades. El docente que escucha antes de mediar transforma el conflicto en información valiosa sobre el proyecto.',
        next: 'cs2_n5c',
        xp: 10
      },

      'cs2_n4d': {
        type: 'feedback_wrong',
        text: 'Resolver conflictos interpersonales en público rara vez funciona y frecuentemente empeora la situación. Andrea y Sebastián se sienten expuestos ante sus compañeros, se ponen a la defensiva, y el grupo observa cómo dos personas son confrontadas — no cómo dos personas resuelven algo. El conflicto se intensifica y el resto del equipo se incomoda.',
        tip: 'Los conflictos interpersonales necesitan privacidad para resolverse. La mediación pública convierte el problema en espectáculo y activa la vergüenza, que cierra el diálogo en lugar de abrirlo.',
        next: 'cs2_n5d',
        xp: 0
      },

      'cs2_n4e': {
        type: 'feedback_wrong',
        text: 'Los conflictos no resueltos no desaparecen — se agravan. Andrea y Sebastián continúan sin comunicarse, y cuando la nueva pregunta motriz revitaliza al resto del grupo, el equipo 3 sigue paralizado. El entusiasmo general hace que su estancamiento sea más visible y más humillante para ambos.',
        tip: 'En proyectos colaborativos, un conflicto interpersonal no resuelto bloquea el trabajo del equipo completo. El docente debe intervenir — no para imponer una solución, sino para crear las condiciones en que los estudiantes puedan encontrarla.',
        next: 'cs2_n5d',
        xp: 0
      },

      'cs2_n4f': {
        type: 'feedback_correct',
        text: 'La honestidad de Carlos ante el director crea algo inesperado: una conversación real sobre qué significa el ABP y por qué falla cuando se implementa sin formación suficiente. El director, en lugar de criticar, propone que Carlos lidere una sesión de reflexión con otros docentes sobre lo que aprendió. El fracaso se convierte en un recurso institucional.',
        tip: 'La reflexión honesta sobre el fracaso pedagógico — especialmente ante superiores — es una forma de liderazgo. Los docentes que aprenden en voz alta crean culturas escolares donde el aprendizaje es posible para todos, incluyendo los adultos.',
        next: 'cs2_n5e',
        xp: 10
      },

      'cs2_n4g': {
        type: 'feedback_wrong',
        text: 'Culpar a los estudiantes de la falla del proyecto es la respuesta más común y la más dañina. No solo es imprecisa — el problema era el diseño, no los estudiantes — sino que también cierra la posibilidad de aprender de la experiencia y de mejorar el próximo diseño.',
        tip: 'Cuando un proyecto ABP falla, la primera pregunta debe ser sobre el diseño, no sobre los estudiantes. ¿La pregunta motriz era auténtica? ¿El problema era relevante? ¿Había andamios suficientes? Estas son las variables que controla el docente.',
        next: 'cs2_n5f',
        xp: 0
      },

      // LEVEL 5

      'cs2_n5a': {
        type: 'scenario',
        text: 'La audiencia ante la municipalidad fue reprogramada. Los equipos han trabajado con la nueva pregunta y tienen hallazgos reales: encuestas a vecinos, mapas de rutas problemáticas, testimonios. Pero tres días antes de la presentación, el funcionario municipal que coordinaba la visita cancela — "agenda apretada", dice el correo. Los estudiantes, que por primera vez estaban comprometidos, reciben la noticia con desolación.',
        context: 'La audiencia real era parte del corazón del proyecto. Su cancelación amenaza con confirmar la sospecha de los estudiantes de que "esto no importa a nadie".',
        choices: [
          {
            text: 'Reencuadrar la audiencia: presentar ante la comunidad escolar (padres, otros docentes, vecinos) y documentar la presentación en video para enviarla al funcionario municipal con una carta firmada por los estudiantes.',
            next: 'cs2_outcome_success',
            isCorrect: true
          },
          {
            text: 'Presentar de todas formas en el salón de clases ante Carlos solamente — el aprendizaje tiene valor aunque no haya audiencia.',
            next: 'cs2_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs2_n5b': {
        type: 'scenario',
        text: 'Los estudiantes siguen los pasos pero sin energía. Producen presentaciones con datos de internet bien organizadas pero sin perspectiva propia. Cuando Carlos les pregunta "¿qué proponen ustedes?", los estudiantes quedan en silencio. Han investigado el problema pero no se sienten capaces de proponer soluciones.',
        context: 'La presentación ante la municipalidad es en dos días. El trabajo es técnicamente aceptable pero vacío de voz propia.',
        choices: [
          {
            text: 'Dedicar las dos últimas clases exclusivamente a que cada equipo articule UNA propuesta concreta basada en su investigación, aunque sea pequeña e imperfecta.',
            next: 'cs2_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Presentar lo que hay — la investigación tiene valor y el tiempo no alcanza para más.',
            next: 'cs2_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs2_n5c': {
        type: 'scenario',
        text: 'El equipo de Andrea y Sebastián produce el trabajo más rico: un análisis del riesgo vial que integra datos de accidentes, testimonios personales y propuestas de señalización. Cuando presentan ante la municipalidad, el funcionario les hace preguntas reales y toma nota. Al final del evento, un estudiante que al inicio decía "esto no me importa" pregunta: "¿Podemos dar seguimiento a esto el próximo año?" Carlos tiene que decidir cómo cerrar el proyecto con intención.',
        context: 'El proyecto funcionó. Pero el cierre importa tanto como la ejecución.',
        choices: [
          {
            text: 'Hacer una sesión de reflexión final donde cada estudiante escribe qué cambiaría de su proceso y qué aprendió que pueda aplicar fuera del aula.',
            next: 'cs2_outcome_success',
            isCorrect: true
          },
          {
            text: 'Celebrar el éxito y pasar directamente a la siguiente unidad — el proyecto habló por sí mismo.',
            next: 'cs2_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs2_n5d': {
        type: 'scenario',
        text: 'La presentación del equipo 3 es el punto débil del evento. Andrea y Sebastián presentan por separado, casi sin mirarse, con diapositivas que duplican información sin integrarse. El funcionario municipal nota la incomodidad. Después, Carlos reflexiona: una intervención a tiempo habría cambiado el resultado para ambos estudiantes y para el equipo.',
        context: 'El proyecto terminó pero la lección sobre manejo de conflictos sigue presente.',
        choices: [
          {
            text: 'Usar el cierre del proyecto para tener una conversación explícita sobre colaboración: qué hace que un equipo funcione y qué lo rompe.',
            next: 'cs2_outcome_partial',
            isCorrect: true
          },
          {
            text: 'No mencionar lo sucedido — señalar públicamente que un equipo tuvo problemas sería perjudicial para Andrea y Sebastián.',
            next: 'cs2_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs2_n5e': {
        type: 'scenario',
        text: 'Carlos da la sesión de reflexión con sus colegas. Al compartir lo que aprendió, tres docentes reconocen que sus propios proyectos "activos" tienen el mismo problema: preguntas motrices que no conectan con las vidas reales de los estudiantes. Se forma un pequeño grupo de mejora pedagógica. Un fracaso se convierte en el inicio de algo más grande. Al final, un estudiante de Carlos le escribe un mensaje: "Profe, aunque el proyecto tuvo problemas, aprendí más que en cualquier otro."',
        context: 'El aprendizaje de Carlos ha tenido impacto más allá de su aula.',
        choices: [
          {
            text: 'Responder al estudiante con honestidad: "Yo también aprendí más en este proyecto que en muchos anteriores. Gracias por aguantar el proceso."',
            next: 'cs2_outcome_success',
            isCorrect: true
          },
          {
            text: 'Agradecer al estudiante pero no profundizar — compartir las dificultades del docente puede disminuir su autoridad.',
            next: 'cs2_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs2_n5f': {
        type: 'scenario',
        text: 'Carlos termina el semestre con la certeza de que sus estudiantes no aprendieron lo que él esperaba — pero sin haber cambiado nada en su comprensión del por qué. Cuando el director le pregunta si quiere intentar ABP el próximo año, Carlos dice "sí" por compromiso institucional, no por convicción. El próximo intento tiene muchas probabilidades de repetir los mismos errores.',
        context: 'Sin reflexión, el ciclo continúa.',
        choices: [
          {
            text: 'Antes de comenzar el próximo año, buscar formación específica en diseño de preguntas motrices y gestión de equipos en ABP.',
            next: 'cs2_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Confiar en que la experiencia acumulada bastará para mejorar naturalmente.',
            next: 'cs2_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs2_outcome_success': {
        type: 'outcome',
        outcome: 'success',
        title: 'Carlos: Del fracaso al aprendizaje real',
        text: 'Carlos aprendió que un proyecto ABP salvado a la mitad puede ser más poderoso que uno que salió bien desde el inicio. Al diagnosticar antes de actuar, al reformular la pregunta con los estudiantes, y al convertir el conflicto en información pedagógica, demostró que el ABP no es un método que se ejecuta — es una forma de pensar sobre el aprendizaje que se practica y se afina. Sus estudiantes llegaron a la presentación no con respuestas perfectas, sino con preguntas propias.',
        badge: 'Docente ABP Reflexivo',
        xpReward: 50
      },
      'cs2_outcome_partial': {
        type: 'outcome',
        outcome: 'partial',
        title: 'Carlos: Progreso real, camino pendiente',
        text: 'El proyecto de Carlos tuvo momentos valiosos y momentos perdidos. Aprendió algo sobre preguntas motrices, algo sobre conflictos en equipos, y algo sobre su propia tendencia a tomar decisiones de gestión cuando necesita decisiones pedagógicas. Ese aprendizaje vale, aunque el proyecto no alcanzó su potencial completo.',
        badge: 'Docente en Construcción',
        xpReward: 25
      },
      'cs2_outcome_struggle': {
        type: 'outcome',
        outcome: 'struggle',
        title: 'Carlos: El ciclo sin romper',
        text: 'El proyecto terminó sin que Carlos comprendiera del todo qué lo hizo fallar. Sin ese diagnóstico, el próximo proyecto ABP enfrenta los mismos riesgos. La buena noticia: las condiciones para aprender están todas ahí — la experiencia, los estudiantes, la institución. Solo falta la reflexión deliberada que convierte la experiencia en aprendizaje.',
        badge: 'Docente con Experiencia Pendiente de Procesar',
        xpReward: 10
      }
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CASO 3: "La estudiante invisible" — Conoce a Quien Enseñas
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cs3',
    title: 'La estudiante invisible',
    course: 'Conoce a Quien Enseñas',
    color: '#10B981',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    duration: '20-25 min',
    description: 'Ana es docente de primer año. Sofía (9 años) nunca participa, mira por la ventana, y está reprobando — aunque es claramente inteligente. ¿Cómo puede Ana ver a quien tiene enfrente?',
    start: 'cs3_n1',
    nodes: {

      'cs3_n1': {
        type: 'scenario',
        text: 'Ana lleva seis semanas en su primer año como docente en una escuela primaria urbana de Quetzaltenango. Tiene 30 estudiantes. Uno de ellos, Sofía, de 9 años, ha llamado su atención de una forma que la preocupa: nunca levanta la mano, rara vez mira al frente, y pasa los recreos dibujando sola en su cuaderno en lugar de jugar. Sus calificaciones están por debajo del promedio, aunque cuando Ana la observa dibujando, los detalles son extraordinarios — capta perspectiva, sombras, proporciones. En conversación directa, Sofía habla de forma sofisticada y articulada.',
        context: 'El boletín trimestral se entrega en dos semanas. Sofía está reprobando Matemáticas y Comunicación y Lenguaje. La madre de Sofía aún no ha sido contactada.',
        choices: [
          {
            text: 'Llamar a los padres inmediatamente para informar las notas bajas y preguntar si hay algo "en casa" que explique el comportamiento.',
            next: 'cs3_n2a',
            isCorrect: false
          },
          {
            text: 'Observar a Sofía durante una semana con atención deliberada: cuándo participa, qué la activa, qué la cierra, cómo aprende cuando nadie la observa.',
            next: 'cs3_n2b',
            isCorrect: true
          },
          {
            text: 'Preguntar a la docente del año anterior qué "problema tiene" Sofía y qué estrategias usó con ella.',
            next: 'cs3_n2c',
            isCorrect: false
          }
        ]
      },

      'cs3_n2a': {
        type: 'feedback_wrong',
        text: 'Llamar a los padres para reportar notas bajas sin haber investigado el contexto convierte a la familia en receptora de un problema, no en aliada de una solución. Además, la pregunta "¿hay algo en casa?" puede leerse como una atribución de culpa sin evidencia. Ana aún no sabe por qué Sofía no está participando — y sin ese diagnóstico, la conversación con los padres no tiene dirección.',
        tip: 'El primer contacto con familias sobre dificultades académicas debe ocurrir después del diagnóstico docente, no antes. La familia es un aliado, no un receptor de reportes de falla.',
        next: 'cs3_n3a',
        xp: 0
      },

      'cs3_n2b': {
        type: 'feedback_correct',
        text: 'La semana de observación deliberada de Ana produce hallazgos que ningún test podría dar. Sofía participa activamente cuando la clase hace algo manual: doblar papel, construir, dibujar un mapa. Se paraliza cuando se le pide responder en voz alta sin preparación previa. Entiende las instrucciones verbales solo cuando van acompañadas de demostración visual. Sus cuadernos están llenos de esquemas y diagramas que nadie pidió — es su forma de procesar.',
        tip: 'Principio: La observación sistemática es la herramienta diagnóstica más poderosa que tiene un docente. No requiere psicólogo ni especialista — requiere atención intencionada y un registro honesto de patrones.',
        next: 'cs3_n3b',
        xp: 10
      },

      'cs3_n2c': {
        type: 'feedback_wrong',
        text: 'Consultar a la docente anterior puede parecer sensato, pero tiene un riesgo alto: recibir una narrativa ya formada sobre Sofía que puede contaminar la observación de Ana con prejuicios previos. Si la docente anterior decía "es floja" o "tiene problemas en casa", Ana podría empezar a confirmar esa interpretación en lugar de construir la propia.',
        tip: 'El sesgo de confirmación es especialmente peligroso con estudiantes que ya tienen una reputación formada. El docente nuevo tiene la ventaja única de mirar sin historia — esa ventaja debe protegerse.',
        next: 'cs3_n3c',
        xp: 0
      },

      // LEVEL 3

      'cs3_n3a': {
        type: 'scenario',
        text: 'La madre de Sofía llega a la reunión a la defensiva — alguien le dijo que Sofía "tenía problemas". La conversación es tensa. Ana no tiene suficiente información sobre Sofía para proponer nada concreto, y la madre siente que la están culpando. Al final, la madre dice: "Lo mismo de siempre. Nunca entienden a mi hija." La reunión termina sin plan de acción.',
        context: 'Ana ha perdido la confianza de la madre antes de haber construido ninguna relación. Necesita recuperarla.',
        choices: [
          {
            text: 'Llamar a la madre una semana después, esta vez con observaciones específicas y positivas sobre Sofía: qué hace bien, qué la activa, qué le sorprendió descubrir.',
            next: 'cs3_n4a',
            isCorrect: true
          },
          {
            text: 'Esperar a que la madre tome la iniciativa — la relación está tensa y es mejor no presionar.',
            next: 'cs3_n4b',
            isCorrect: false
          }
        ]
      },

      'cs3_n3b': {
        type: 'scenario',
        text: 'Con los hallazgos de la semana de observación, Ana tiene claridad: Sofía es una aprendiz kinestésica y visual que está atrapada en un aula diseñada para aprendices auditivos y verbales. No es que no pueda aprender — es que la forma en que Ana enseña no llega a ella. Ana decide hacer cambios. Pero tiene 29 estudiantes más y tiempo limitado.',
        context: 'Ana enfrenta el dilema clásico: ¿cómo diferencia sin que el aula se vuelva imposible de manejar?',
        choices: [
          {
            text: 'Incorporar elementos visuales y kinestésicos en las actividades de todo el grupo — no como "adaptación para Sofía" sino como enriquecimiento general: mapas conceptuales, manipulativos, demostraciones con objetos.',
            next: 'cs3_n4c',
            isCorrect: true
          },
          {
            text: 'Darle a Sofía una hoja diferente con actividades visuales mientras el resto trabaja normalmente — es la forma más eficiente de atender sus necesidades.',
            next: 'cs3_n4d',
            isCorrect: false
          },
          {
            text: 'Hablar con el orientador escolar para que Sofía sea evaluada por un especialista — esto requiere apoyo profesional más allá del aula.',
            next: 'cs3_n4e',
            isCorrect: false
          }
        ]
      },

      'cs3_n3c': {
        type: 'scenario',
        text: 'La docente anterior le dice a Ana que Sofía "tiene problemas de atención" y "probablemente TDAH, aunque nunca la diagnosticaron", y que lo mejor es "sentarla al frente y repetirle las instrucciones más veces". Ana sigue el consejo. Sofía, al frente, se siente vigilada y se cierra más. El rendimiento no mejora. Ana está perpleja — hizo lo que le dijeron.',
        context: 'Ana se da cuenta de que está siguiendo un protocolo diseñado para otro estudiante imaginario, no para Sofía.',
        choices: [
          {
            text: 'Empezar de cero con observación propia: apartar el consejo previo y observar a Sofía durante tres días como si fuera la primera vez que la ve.',
            next: 'cs3_n4f',
            isCorrect: true
          },
          {
            text: 'Buscar más consejos de más colegas — cuantas más perspectivas tenga, mejor entenderá a Sofía.',
            next: 'cs3_n4g',
            isCorrect: false
          }
        ]
      },

      // LEVEL 4

      'cs3_n4a': {
        type: 'feedback_correct',
        text: 'El segundo contacto cambia el tono de la relación. Cuando Ana llama y le dice a la madre: "Noté que cuando Sofía puede dibujar o construir algo, entiende en seguida — sus cuadernos tienen esquemas que ningún otro estudiante hizo", la madre se queda en silencio un momento y luego dice: "Siempre ha sido así. En casa aprende todo tocando." La conversación da un giro completo. La madre se convierte en aliada informada y agradecida.',
        tip: 'La alianza familia-docente se construye cuando el docente demuestra que ve al estudiante completo — sus fortalezas, no solo sus déficits. La primera conversación sobre un estudiante con dificultades debe incluir siempre lo que ese estudiante hace bien.',
        next: 'cs3_n5a',
        xp: 10
      },

      'cs3_n4b': {
        type: 'feedback_wrong',
        text: 'Esperar a que la madre tome la iniciativa después de una reunión difícil es abandonar la responsabilidad de reconstruir la relación. En contextos donde las familias ya tienen historias de malentendidos con la escuela, esperar es equivalente a confirmar sus sospechas: que la escuela no cambia, que sus hijos no son vistos.',
        tip: 'Reconstruir la confianza con una familia requiere que el docente dé el primer paso, especialmente después de un primer contacto que no funcionó. La proactividad del docente es la señal de que algo diferente está pasando.',
        next: 'cs3_n5b',
        xp: 0
      },

      'cs3_n4c': {
        type: 'feedback_correct',
        text: 'La decisión de Ana de hacer las clases más visuales y kinestésicas para todos tiene un efecto inesperado: cinco estudiantes más que también estaban en silencio empiezan a participar. Sofía, al hacer un mapa conceptual con colores en lugar de responder preguntas orales, produce el análisis más rico del grupo. Ana se da cuenta de que estaba enseñando para un tipo de estudiante imaginario, no para sus 30 estudiantes reales.',
        tip: 'Principio del Diseño Universal para el Aprendizaje (DUA): cuando adaptamos para el estudiante que menos encaja con el modelo estándar, frecuentemente mejoramos la experiencia de todos. La diferenciación más efectiva no es la que aísla — es la que enriquece el espacio común.',
        next: 'cs3_n5c',
        xp: 10
      },

      'cs3_n4d': {
        type: 'feedback_wrong',
        text: 'Dar a Sofía una hoja diferente mientras todos trabajan igual la señala como "diferente" ante sus compañeros — algo que a los 9 años puede ser socialmente costoso y que puede hacer que Sofía rechace precisamente las adaptaciones que la ayudan. La diferenciación visible y aislante puede hacer más daño que el problema que intenta resolver.',
        tip: 'La diferenciación más poderosa es la que no se nota como tal — cuando el docente diseña actividades con múltiples formas de participación, todos los estudiantes pueden elegir el modo que les funciona sin sentirse señalados.',
        next: 'cs3_n5d',
        xp: 0
      },

      'cs3_n4e': {
        type: 'feedback_wrong',
        text: 'Derivar a Sofía a un especialista antes de haber agotado las adaptaciones pedagógicas básicas es un error frecuente de docentes nuevos que equiparan "diferencia de aprendizaje" con "condición clínica". Sofía puede estar necesitando solo un cambio en cómo se le enseña — y ese cambio está dentro del alcance de Ana.',
        tip: 'La derivación a especialistas es valiosa cuando se han implementado adaptaciones pedagógicas y no han funcionado. Hacerlo como primer paso medicaliza diferencias que son primariamente pedagógicas y puede estigmatizar al estudiante innecesariamente.',
        next: 'cs3_n5d',
        xp: 0
      },

      'cs3_n4f': {
        type: 'feedback_correct',
        text: 'Al observar a Sofía desde cero, Ana descubre algo que el consejo anterior ocultó: Sofía presta atención perfectamente — pero a los objetos, no a las palabras. Cuando Ana pone una regla sobre el escritorio para explicar fracciones, Sofía la mira con intensidad y resuelve el problema. Cuando Ana solo habla, Sofía mira por la ventana buscando algo concreto que ancle el concepto.',
        tip: 'La observación directa sin hipótesis previas es el método más honesto de conocer a un estudiante. Las etiquetas heredadas (TDAH, lento, difícil) son hipótesis que deben ser probadas, no verdades que deben ser administradas.',
        next: 'cs3_n5e',
        xp: 10
      },

      'cs3_n4g': {
        type: 'feedback_wrong',
        text: 'Acumular opiniones de colegas sobre un estudiante no produce conocimiento — produce un mosaico de interpretaciones que se contradicen y que comparten el problema de estar basadas en las mismas limitaciones pedagógicas. Ana necesita datos primarios, no más segundas opiniones.',
        tip: 'El conocimiento de un estudiante específico requiere observación directa de ese estudiante específico. Las narrativas colectivas sobre un estudiante tienden a ser más reveladoras de las limitaciones del sistema que del estudiante en sí.',
        next: 'cs3_n5f',
        xp: 0
      },

      // LEVEL 5

      'cs3_n5a': {
        type: 'scenario',
        text: 'Sofía ha mejorado notablemente. Pasa las matemáticas y sus textos escritos, aunque cortos, son cuidadosos y originales. Pero llega fin de año y Ana nota que Diego, un niño que hasta ahora pasaba desapercibido porque cumplía con todo lo que se pedía, está sacando notas bajas en comprensión lectora. Diego es completamente diferente a Sofía: muy verbal, muy social, siempre en movimiento. Las notas bajas no tienen sentido hasta que Ana revisa sus respuestas: son correctas en contenido pero muy breves, como si Diego no pudiera o no quisiera profundizar.',
        context: 'Ana enfrenta el reto de aplicar lo que aprendió con Sofía a un perfil completamente diferente, en menos tiempo y con más experiencia.',
        choices: [
          {
            text: 'Aplicar el mismo método: observar durante una semana sin hipótesis previas, esta vez buscando cuándo Diego profundiza y cuándo se detiene.',
            next: 'cs3_outcome_success',
            isCorrect: true
          },
          {
            text: 'Asumir que Diego es un "estudiante social" que necesita más trabajo en equipo — el perfil verbal y social suena a aprendiz auditivo-social.',
            next: 'cs3_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs3_n5b': {
        type: 'scenario',
        text: 'La madre de Sofía nunca más se comunicó con Ana. Sofía pasó el trimestre con adaptaciones mínimas — Ana la sentó cerca del pizarrón y le dio más tiempo en los exámenes. Al final del año, Sofía aprueba con lo mínimo. Sigue sin participar. Sigue dibujando en su cuaderno. La historia no cambió — solo mejoró lo suficiente para no alarmar a nadie.',
        context: 'Ana siente que algo quedó incompleto. Tiene razón.',
        choices: [
          {
            text: 'Escribir una nota detallada sobre las observaciones de Sofía para la docente del próximo año — al menos la cadena de conocimiento no se romperá.',
            next: 'cs3_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Aceptar que hizo lo que pudo en las circunstancias — no todos los casos tienen solución completa en un año.',
            next: 'cs3_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs3_n5c': {
        type: 'scenario',
        text: 'El cambio en el aula de Ana ha sido notable. Pero algunos estudiantes empiezan a comentar entre ellos que "Sofía siempre hace cosas diferentes" — se refieren a que ella a veces entrega mapas en lugar de textos escritos. Un estudiante pregunta directamente en clase: "¿Por qué a Sofía le valen los dibujos y a nosotros no?" La pregunta es legítima y merece una respuesta honesta.',
        context: 'La equidad en el aula requiere que los estudiantes entiendan que "igual" no significa "idéntico".',
        choices: [
          {
            text: 'Abrir la conversación al grupo: explicar que diferentes formas de mostrar lo que se sabe son igualmente válidas, y preguntar qué formas les gustarían a ellos.',
            next: 'cs3_outcome_success',
            isCorrect: true
          },
          {
            text: 'Responder que "cada quien tiene sus propias necesidades" y cerrar el tema — los estudiantes no necesitan entender las razones pedagógicas.',
            next: 'cs3_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs3_n5d': {
        type: 'scenario',
        text: 'Sofía termina el año con notas suficientes pero sin haber encontrado su lugar en el aula. La adaptación que recibió fue correcta en concepto pero incómoda en implementación — ser la única con hoja diferente la hizo sentir señalada. En la última semana, Sofía le da a Ana un dibujo: un aula llena de niños mirando al frente, y ella sentada sola con una hoja diferente. Ana lo recibe como lo que es: información pedagógica.',
        context: 'El dibujo de Sofía es la evaluación más honesta que Ana ha recibido.',
        choices: [
          {
            text: 'Agradecer el dibujo a Sofía y decirle: "Este dibujo me enseña algo importante. El próximo año, la docente que te tenga va a saber esto sobre ti."',
            next: 'cs3_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Guardar el dibujo y no comentarlo — ya terminó el año y reabrir la conversación podría hacer que Sofía se sienta peor.',
            next: 'cs3_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs3_n5e': {
        type: 'scenario',
        text: 'Con las adaptaciones visuales y kinestésicas, Sofía florece en el segundo semestre. En la clase de Ciencias, construye un modelo del sistema solar con arcilla y palitos que es tan preciso que Ana lo usa para enseñar a los demás. Llega el examen estandarizado departamental — formato de respuestas orales y escritas, sin opción visual. Sofía se paraliza. Ana necesita preparar a Sofía para un sistema que aún no está diseñado para ella.',
        context: 'El examen estandarizado es obligatorio. Ana no puede cambiarlo pero sí puede preparar a Sofía para navegarlo.',
        choices: [
          {
            text: 'Preparar a Sofía con simulaciones del examen, pero también enseñarle a traducir sus ideas visuales a palabras escritas paso a paso — darle herramientas para el formato, no solo para el contenido.',
            next: 'cs3_outcome_success',
            isCorrect: true
          },
          {
            text: 'Hablar con el director para solicitar una adaptación formal al examen — Sofía tiene el derecho a ser evaluada de forma justa.',
            next: 'cs3_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs3_n5f': {
        type: 'scenario',
        text: 'Sofía termina el año sin mayores cambios. Ana aplicó el consejo de múltiples colegas — sentarla al frente, repetirle instrucciones, darle más tiempo — pero ninguna de estas medidas tocó la causa real. Al escribir el informe final, Ana nota que no puede describir cómo aprende Sofía. Solo puede describir lo que Sofía no hace.',
        context: 'Un informe docente que solo describe déficits es una señal de que el diagnóstico fue insuficiente.',
        choices: [
          {
            text: 'Tomarse media hora para observar a Sofía una última vez y escribir aunque sea tres cosas que ella SÍ hace bien y cómo las hace.',
            next: 'cs3_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Completar el informe con los datos disponibles — observar a Sofía ahora, al final del año, es demasiado tarde para cambiar algo.',
            next: 'cs3_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs3_outcome_success': {
        type: 'outcome',
        outcome: 'success',
        title: 'Ana: La docente que aprendió a ver',
        text: 'Ana llegó a su primer año con la habilidad más importante que puede tener un docente: la disposición a mirar antes de concluir. Al observar a Sofía sin hipótesis previas, descubrió no solo cómo aprende Sofía — descubrió cómo enseñaba ella misma, y lo que su enseñanza asumía sobre quién es "un buen estudiante". Esa segunda lección es la que transformó su aula para todos. Y cuando Diego apareció con sus propios enigmas, Ana ya sabía qué hacer.',
        badge: 'Docente Observadora',
        xpReward: 50
      },
      'cs3_outcome_partial': {
        type: 'outcome',
        outcome: 'partial',
        title: 'Ana: Pasos en la dirección correcta',
        text: 'Ana hizo algo importante: vio a Sofía cuando otros no lo habían hecho. Aunque algunas de sus decisiones tuvieron consecuencias no previstas — y aunque el proceso no fue tan elegante como podría haber sido — el impulso de comprender antes de calificar es la base de todo lo demás. Ese impulso, cultivado, la convertirá en la docente que sus estudiantes necesitan.',
        badge: 'Docente Empática',
        xpReward: 25
      },
      'cs3_outcome_struggle': {
        type: 'outcome',
        outcome: 'struggle',
        title: 'Ana: Sofía seguirá esperando ser vista',
        text: 'Sofía pasó por el aula de Ana sin ser comprendida del todo. Eso no la define a ella ni define a Ana permanentemente — pero sí señala algo que vale la pena nombrar: conocer a quien enseñamos requiere más que buenas intenciones. Requiere métodos, tiempo, y la disposición de cuestionar lo que creemos saber. Ana tiene las intenciones. El próximo paso es desarrollar los métodos.',
        badge: 'Docente con Intención',
        xpReward: 10
      }
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CASO 4: "La evaluación que asusta" — Evaluación Formativa
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cs4',
    title: 'La evaluación que asusta',
    course: 'Evaluación Formativa',
    color: '#8B5CF6',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
    duration: '20-25 min',
    description: 'Roberto lleva 15 años evaluando con exámenes tradicionales. Su escuela exige "evaluación auténtica" y un supervisor llegará en 3 semanas. ¿Cómo transita del miedo al cambio genuino?',
    start: 'cs4_n1',
    nodes: {

      'cs4_n1': {
        type: 'scenario',
        text: 'Roberto tiene 15 años de experiencia como docente de Matemáticas en un instituto de secundaria en Escuintla. Es respetado, sus estudiantes aprueban, y sus exámenes son conocidos por ser rigurosos. Pero en la última jornada pedagógica, la directora presentó un plan de "evaluación auténtica y formativa" para toda la escuela. Roberto no sabe exactamente qué significa, pero sabe que implica cambiar algo que le ha funcionado por años. Y para colmo, un supervisor del distrito viene a observar en tres semanas.',
        context: 'Roberto tiene miedo —no a enseñar, sino a ser evaluado como docente bajo criterios que no entiende del todo. Ese miedo es útil: es el mismo miedo que sienten sus estudiantes ante cada examen.',
        choices: [
          {
            text: 'Crear rúbricas detalladas para cada actividad esta semana — si va a implementar evaluación auténtica, mejor hacerlo completamente desde ya.',
            next: 'cs4_n2a',
            isCorrect: false
          },
          {
            text: 'Empezar con una sola técnica formativa pequeña esta semana: las tarjetas de salida (exit tickets) al final de cada clase para saber qué entendieron los estudiantes.',
            next: 'cs4_n2b',
            isCorrect: true
          },
          {
            text: 'Hablar con la directora para que su clase sea una excepción temporal — Matemáticas es diferente y necesita exámenes para verificar procedimientos.',
            next: 'cs4_n2c',
            isCorrect: false
          }
        ]
      },

      'cs4_n2a': {
        type: 'feedback_wrong',
        text: 'Crear rúbricas para todo en una semana sin formación en evaluación auténtica es como construir una casa empezando por el techo. Las rúbricas creadas apresuradamente tienden a ser listas de verificación disfrazadas, no herramientas de retroalimentación genuina. Roberto se agotará, las rúbricas serán de baja calidad, y el cambio se sentirá como una carga burocrática en lugar de una transformación pedagógica.',
        tip: 'El cambio pedagógico sostenible es gradual y reflexivo. Empezar con una sola técnica, implementarla bien, y aprender de ella es más poderoso que implementar diez técnicas superficialmente.',
        next: 'cs4_n3a',
        xp: 0
      },

      'cs4_n2b': {
        type: 'feedback_correct',
        text: 'Las tarjetas de salida son la elección perfecta para un inicio: simples, rápidas, informativas y de bajo riesgo para los estudiantes. Roberto decide que al final de cada clase pedirá a los estudiantes que respondan una pregunta en un papel: "¿Qué entendiste hoy?" y "¿Qué te quedó confuso?" En tres días tiene 90 papelitos con datos reales sobre lo que está y no está llegando. Por primera vez, tiene evidencia de aprendizaje entre examen y examen.',
        tip: 'Principio de evaluación formativa: la diferencia entre evaluación sumativa y formativa no es el instrumento — es el uso que se hace de los datos. Las tarjetas de salida son formativas porque Roberto va a usar lo que lee para cambiar lo que hace mañana.',
        next: 'cs4_n3b',
        xp: 10
      },

      'cs4_n2c': {
        type: 'feedback_wrong',
        text: 'Pedir una excepción para Matemáticas perpetúa el mito de que las ciencias exactas son incompatibles con la evaluación formativa. Es precisamente en Matemáticas donde la evaluación formativa es más poderosa: identificar en qué paso del procedimiento se pierde cada estudiante es información que ningún examen final puede dar con suficiente detalle.',
        tip: 'Matemáticas no es el obstáculo para la evaluación formativa — es el terreno donde más se necesita. Los errores matemáticos tienen patrones identificables, y la evaluación formativa permite intervenir sobre esos patrones antes del examen final.',
        next: 'cs4_n3c',
        xp: 0
      },

      // LEVEL 3

      'cs4_n3a': {
        type: 'scenario',
        text: 'Roberto terminó la semana con rúbricas para cada actividad pero los estudiantes no las entienden bien y él tampoco sabe cómo usarlas para retroalimentar. Las rúbricas tienen criterios como "excelente comprensión" sin definir qué significa eso. Algunos estudiantes preguntan: "¿Esto cuenta para la nota?" — y Roberto no sabe qué responder. La directora le pregunta cómo va y Roberto dice "bien" pero siente que todo es más complicado de lo que esperaba.',
        context: 'Roberto tiene instrumentos sin propósito claro. Necesita simplificar antes de poder avanzar.',
        choices: [
          {
            text: 'Elegir UNA de las rúbricas que hizo, la que considera más importante, y compartirla con los estudiantes antes de la próxima actividad para que sepan exactamente por qué criterios serán evaluados.',
            next: 'cs4_n4a',
            isCorrect: true
          },
          {
            text: 'Mantener todas las rúbricas pero explicarlas mejor — la evaluación auténtica requiere más criterios, no menos.',
            next: 'cs4_n4b',
            isCorrect: false
          }
        ]
      },

      'cs4_n3b': {
        type: 'scenario',
        text: 'Después de una semana con tarjetas de salida, Roberto tiene un problema que no esperaba: casi todos los estudiantes escriben "entendí todo" o "no tengo dudas". Las tarjetas no están dando información real. Roberto sospecha que los estudiantes temen que decir "no entendí" tenga consecuencias negativas. Necesita rediseñar la técnica para que sea psicológicamente segura.',
        context: 'El problema no es la técnica — es el ambiente. Los estudiantes no sienten que es seguro decir que no entendieron.',
        choices: [
          {
            text: 'Cambiar el formato de la tarjeta: hacerla anónima, y añadir la pregunta "¿Qué pregunta tendrías si pudieras preguntar sin que nadie supiera que eres tú?"',
            next: 'cs4_n4c',
            isCorrect: true
          },
          {
            text: 'Leer algunas tarjetas en voz alta y comentar las que dicen "no entendí" de forma positiva — para que los estudiantes vean que es seguro ser honesto.',
            next: 'cs4_n4d',
            isCorrect: false
          },
          {
            text: 'Abandonar las tarjetas de salida y probar con otra técnica — si los estudiantes no cooperan, la técnica no funciona.',
            next: 'cs4_n4e',
            isCorrect: false
          }
        ]
      },

      'cs4_n3c': {
        type: 'scenario',
        text: 'La directora no acepta la excepción. Le explica a Roberto con paciencia que la evaluación formativa no reemplaza los exámenes — los complementa. Le pide que pruebe algo pequeño antes de la visita del supervisor. Roberto lo ve como una tarea más, no como una oportunidad. Busca en internet "evaluación formativa ejemplos" y copia un formato de otra escuela sin adaptarlo.',
        context: 'Roberto está en modo de cumplimiento, no de aprendizaje. Necesita algo que lo mueva de la resistencia a la curiosidad.',
        choices: [
          {
            text: 'Probar el formato copiado pero observar honestamente qué pasa: ¿los estudiantes lo toman en serio? ¿Da información útil? Usar la observación para ajustar.',
            next: 'cs4_n4f',
            isCorrect: true
          },
          {
            text: 'Implementar el formato sin observar su efecto — cumplió con lo pedido, eso es suficiente por ahora.',
            next: 'cs4_n4g',
            isCorrect: false
          }
        ]
      },

      // LEVEL 4

      'cs4_n4a': {
        type: 'feedback_correct',
        text: 'Al compartir la rúbrica antes de la actividad, algo inesperado ocurre: los estudiantes empiezan a hacer mejores preguntas durante la tarea. Saben qué se espera de ellos y pueden auto-regularse. Uno de los estudiantes dice: "Profe, en el criterio de \'justificación\' — ¿cuenta si uso el procedimiento que vimos ayer o solo el nuevo?" Roberto se da cuenta de que la rúbrica compartida se convirtió en una herramienta de aprendizaje, no solo de calificación.',
        tip: 'Principio: La rúbrica compartida antes de la tarea es una herramienta de aprendizaje. La rúbrica usada solo para calificar después es solo burocracia. El momento en que se comparte lo cambia todo.',
        next: 'cs4_n5a',
        xp: 10
      },

      'cs4_n4b': {
        type: 'feedback_wrong',
        text: 'Mantener muchas rúbricas confusas no produce más evaluación auténtica — produce más confusión para todos. La complejidad de los instrumentos no garantiza la calidad de la evaluación. Un solo criterio claro y bien usado vale más que diez criterios que nadie entiende.',
        tip: 'Menos es más en evaluación formativa, especialmente al inicio. La claridad de los criterios es más importante que su cantidad. Un estudiante que entiende perfectamente un criterio puede autorregularse; uno que enfrenta diez criterios vagos solo puede adivinar.',
        next: 'cs4_n5b',
        xp: 0
      },

      'cs4_n4c': {
        type: 'feedback_correct',
        text: 'Las tarjetas anónimas con la pregunta reformulada producen información que Roberto no esperaba. Una tarjeta dice: "¿Por qué dividimos el denominador y no el numerador?" — una confusión conceptual que Roberto nunca habría detectado con un examen porque los estudiantes aprenden a hacer el procedimiento sin entenderlo. Otra dice: "Nunca entendí por qué en el libro dice X pero usted explicó Y." Roberto usa esa información al día siguiente y dedica diez minutos a la confusión más frecuente.',
        tip: 'El anonimato en la evaluación formativa reduce el filtro del miedo y produce datos más honestos. La pregunta reformulada ("si pudieras preguntar sin que nadie supiera...") hace explícita la seguridad psicológica que normalmente está ausente.',
        next: 'cs4_n5c',
        xp: 10
      },

      'cs4_n4d': {
        type: 'feedback_wrong',
        text: 'Leer tarjetas en voz alta, aunque sea con intención positiva, elimina el anonimato y confirma el miedo: los estudiantes pueden reconocer la escritura, el contenido, o la forma en que Roberto lo comenta puede señalar indirectamente al autor. Incluso si Roberto lo hace bien, el riesgo percibido es suficiente para que los estudiantes sigan escribiendo "todo bien".',
        tip: 'La seguridad psicológica en el aula no se construye diciendo "es seguro cometer errores" — se construye con estructuras que hacen imposible o innecesaria la exposición. El anonimato es una estructura, no solo un gesto.',
        next: 'cs4_n5d',
        xp: 0
      },

      'cs4_n4e': {
        type: 'feedback_wrong',
        text: 'El problema no era la técnica — era el ambiente de seguridad. Cambiar de técnica sin entender por qué la anterior no funcionó lleva a repetir el mismo error con un instrumento diferente. Roberto perdería tiempo y acumularía frustración sin aprender nada sobre evaluación formativa.',
        tip: 'Cuando una técnica de evaluación formativa "no funciona", la primera pregunta es sobre el ambiente, no sobre la técnica. ¿Los estudiantes sienten que es seguro ser honestos? ¿Entienden para qué sirve la información que dan?',
        next: 'cs4_n5d',
        xp: 0
      },

      'cs4_n4f': {
        type: 'feedback_correct',
        text: 'Al observar el formato copiado en acción, Roberto nota algo interesante: el formato pide a los estudiantes que "evalúen su confianza en el tema" en una escala de 1 a 5. Los estudiantes que marcan 5 (muy seguros) cometen los mismos errores en el ejercicio siguiente. Roberto se da cuenta de que la metacognición de sus estudiantes está descalibrada — creen que entienden cuando no entienden. Ese dato es oro pedagógico.',
        tip: 'Incluso una herramienta copiada, observada con curiosidad, puede revelar información valiosa. La actitud investigativa convierte cualquier instrumento en una oportunidad de aprendizaje. El problema no era el formato — era la ausencia de observación.',
        next: 'cs4_n5e',
        xp: 10
      },

      'cs4_n4g': {
        type: 'feedback_wrong',
        text: 'Implementar sin observar produce datos que no se usan — y datos que no se usan no son evaluación formativa, son papeleo. El ciclo de la evaluación formativa requiere: recoger datos, analizarlos, ajustar la enseñanza. Roberto completó el primero pero omitió los otros dos.',
        tip: 'La evaluación formativa no es un instrumento — es un ciclo. Recoger datos sin analizarlos es como medir la temperatura de un paciente y no leer el termómetro.',
        next: 'cs4_n5f',
        xp: 0
      },

      // LEVEL 5

      'cs4_n5a': {
        type: 'scenario',
        text: 'El supervisor llega y observa la clase. Roberto está en medio de ajustar su explicación porque las tarjetas de la clase anterior mostraron que el 60% no entendió la factorización por agrupación. En lugar de seguir su plan original, Roberto dice en voz alta: "Ayer revisé sus tarjetas y vi que este paso confundió a muchos — así que hoy vamos a dedicar más tiempo aquí antes de avanzar." El supervisor toma nota. Después de la clase, el supervisor le pregunta: "¿Dónde está su libro de calificaciones?" Roberto no sabe cómo responder.',
        context: 'El supervisor está buscando un sistema de calificación numérica. Roberto ha estado usando datos de proceso, no notas numéricas, para informar su enseñanza.',
        choices: [
          {
            text: 'Explicar al supervisor el ciclo que ha establecido: tarjetas de salida informan la clase siguiente, el ajuste es visible y documentado, y los datos de proceso se convierten en evidencia de aprendizaje antes del examen final.',
            next: 'cs4_outcome_success',
            isCorrect: true
          },
          {
            text: 'Mostrarle su libro de calificaciones tradicional y decirle que la evaluación formativa es "adicional" — no quiere complicar la conversación.',
            next: 'cs4_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs4_n5b': {
        type: 'scenario',
        text: 'El supervisor llega y ve rúbricas en las paredes, en los cuadernos y en los escritorios de los estudiantes. Pero cuando le pregunta a un estudiante "¿qué significa este criterio?", el estudiante no puede explicarlo. El supervisor nota la cantidad de instrumentos pero la ausencia de comprensión. Roberto se siente expuesto — invirtió mucho tiempo en crear documentos que nadie entiende.',
        context: 'Roberto tiene la forma pero no el fondo. Necesita una forma de reconocerlo sin desacreditar todo su esfuerzo.',
        choices: [
          {
            text: 'Reconocer honestamente con el supervisor que está en proceso de aprendizaje y que el próximo paso es simplificar y trabajar los criterios con los estudiantes antes de aplicarlos.',
            next: 'cs4_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Defenderle al supervisor que los estudiantes sí entienden y que la observación fue muy corta para evaluar el proceso.',
            next: 'cs4_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs4_n5c': {
        type: 'scenario',
        text: 'Con las tarjetas anónimas bien implementadas, Roberto tiene datos valiosos y los ha estado usando para ajustar sus clases. El supervisor observa que Roberto cambia su plan a mitad de clase basándose en las respuestas de los estudiantes. Lo que el supervisor ve lo sorprende: un docente que usa evidencia en tiempo real. Al final del año, Roberto necesita convertir todo este proceso en calificaciones para el sistema oficial.',
        context: 'El sistema escolar sigue requiriendo números en el boletín. Roberto necesita puentes entre sus datos formativos y las calificaciones sumativas.',
        choices: [
          {
            text: 'Diseñar un examen final que recoja los conceptos más frecuentemente confundidos según sus tarjetas — así el examen sumativo está informado por el proceso formativo.',
            next: 'cs4_outcome_success',
            isCorrect: true
          },
          {
            text: 'Usar el promedio de las participaciones y tarjetas como nota — si el estudiante participó, merece una buena calificación.',
            next: 'cs4_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs4_n5d': {
        type: 'scenario',
        text: 'La visita del supervisor ocurre en un día en que Roberto está usando el formato copiado de internet. El supervisor lo reconoce — es un formato del Ministerio de Educación que fue distribuido hace dos años. Le pregunta a Roberto si lo adaptó. Roberto dice que lo está probando. El supervisor acepta eso como una respuesta honesta y le pregunta qué ha aprendido de usarlo.',
        context: 'El supervisor no busca perfección — busca reflexión. Roberto tiene una oportunidad.',
        choices: [
          {
            text: 'Compartir honestamente lo que observó: que los estudiantes que dicen tener alta confianza cometen los mismos errores, y que está pensando en qué hacer con eso.',
            next: 'cs4_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Decir que el formato funciona bien y que los estudiantes están respondiendo positivamente — no quiere que el supervisor piense que tiene dificultades.',
            next: 'cs4_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs4_n5e': {
        type: 'scenario',
        text: 'Roberto ha descubierto que sus estudiantes tienen baja metacognición: no saben lo que no saben. Eso explica por qué siempre se sorprenden al ver sus notas de examen. Con tres semanas antes de fin de curso, Roberto diseña actividades de metacognición: antes de cada ejercicio, los estudiantes predicen qué tan bien lo harán y después comparan con el resultado real. La calibración mejora visiblemente. Ahora Roberto necesita comunicar a los padres este enfoque.',
        context: 'Los padres están acostumbrados a recibir notas numéricas como única información. Roberto quiere darles algo más.',
        choices: [
          {
            text: 'Enviar junto con el boletín una nota que explique qué encontró sobre el aprendizaje de su hijo/a y qué hicieron para mejorarlo — un párrafo por estudiante.',
            next: 'cs4_outcome_success',
            isCorrect: true
          },
          {
            text: 'Usar el boletín estándar — los padres no están preparados para recibir información pedagógica detallada.',
            next: 'cs4_outcome_partial',
            isCorrect: false
          }
        ]
      },

      'cs4_n5f': {
        type: 'scenario',
        text: 'Roberto llega a fin de año con datos sin procesar y un libro de calificaciones en el que los números no reflejan lo que él sabe sobre el aprendizaje de sus estudiantes. Hay estudiantes con nota alta que conceptualmente están perdidos, y estudiantes con nota baja que demostraron comprensión real pero fallaron en los exámenes por ansiedad. Roberto lo sabe — pero sus datos no están organizados para probarlo.',
        context: 'La brecha entre lo que Roberto sabe pedagógicamente y lo que puede demostrar institucionalmente es el problema central.',
        choices: [
          {
            text: 'Documentar el próximo trimestre con mayor rigor: guardar las tarjetas, anotar los ajustes que hizo, registrar las mejoras observadas — para construir evidencia del proceso.',
            next: 'cs4_outcome_partial',
            isCorrect: true
          },
          {
            text: 'Aceptar que el sistema de calificaciones y la evaluación formativa son mundos separados — uno para cumplir, otro para enseñar de verdad.',
            next: 'cs4_outcome_struggle',
            isCorrect: false
          }
        ]
      },

      'cs4_outcome_success': {
        type: 'outcome',
        outcome: 'success',
        title: 'Roberto: El docente que cerró el ciclo',
        text: 'Roberto aprendió que la evaluación formativa no es un formato ni una rúbrica — es un ciclo de escucha, ajuste y evidencia. Al empezar con algo pequeño (las tarjetas de salida), al crear seguridad para la honestidad, al usar los datos para ajustar antes del examen y no solo para calificar después, demostró ante el supervisor algo que los 15 años de exámenes rigurosos nunca habían mostrado: que sabía qué estaban aprendiendo sus estudiantes en tiempo real, y que hacía algo con esa información. Eso es enseñar.',
        badge: 'Docente Formativo',
        xpReward: 50
      },
      'cs4_outcome_partial': {
        type: 'outcome',
        outcome: 'partial',
        title: 'Roberto: La transición en proceso',
        text: 'Roberto dio pasos reales hacia un enfoque más formativo. No todo funcionó perfectamente — algunos instrumentos fueron demasiado complejos, algunos datos quedaron sin usar, algunas conversaciones se evitaron. Pero el movimiento fue real. Y lo más importante: Roberto ya no ve la evaluación formativa como una amenaza a su forma de enseñar. La ve como información que no tenía antes.',
        badge: 'Docente en Transición',
        xpReward: 25
      },
      'cs4_outcome_struggle': {
        type: 'outcome',
        outcome: 'struggle',
        title: 'Roberto: El cambio que no ocurrió todavía',
        text: 'Roberto terminó el año con más papeles y menos claridad que al inicio. La evaluación auténtica sigue siendo una demanda externa, no una convicción interna. Pero hay algo valioso en este punto: Roberto sabe que algo no está funcionando. Esa incomodidad — si no se evita — es el inicio del cambio. La pregunta es si Roberto puede convertirla en curiosidad en lugar de resistencia.',
        badge: 'Docente ante el Umbral',
        xpReward: 10
      }
    }
  }

];

// Export for module environments; also available as global for browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CASE_STUDIES };
}
