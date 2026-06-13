// data.js - Cursos para docentes - Profe Billy

const allCourses = [
{
    id: 'steam',
    title: 'Metodología STEAM 2.0',
    subtitle: 'Ciencia, Tecnología, Ingeniería, Arte y Matemáticas integrados en tu aula',
    icon: '🔬',
    color: '#07B0E4',
    gradient: 'linear-gradient(135deg, #1A6B68, #07B0E4)',
    status: 'available',
    durationHours: 10,
    totalCards: 73,
    modules: [
        // MÓDULO 1: ¿Qué es STEAM? (13 tarjetas)
        {
            id: 1,
            title: "🔍 ¿Qué es STEAM? Origen y evolución",
            cards: [
                { id: 1, type: "content", title: "🧩 ¿Qué significa STEAM?", content: "STEAM es el acrónimo de Science, Technology, Engineering, Arts and Mathematics. Es un enfoque educativo que integra estas disciplinas para resolver problemas del mundo real.", extra: "No son materias separadas como en la escuela tradicional. Se enseñan de forma interconectada." },
                { id: 2, type: "content", title: "📅 El origen: STEM (1990s)", content: "La National Science Foundation de EE.UU. creó STEM para impulsar carreras científico-técnicas. Detectaron que pocos estudiantes elegían estas áreas.", extra: "El foco era exclusivamente la lógica y la solución técnica. Faltaba algo importante..." },
                { id: 3, type: "content", title: "🎨 La revolución: Georgette Yakman (2006)", content: "Yakman propuso añadir la 'A' de Artes. Su argumento: la innovación real necesita creatividad y diseño, no solo datos fríos. Nace STEAM.", extra: "De paso, el acrónimo se volvió más fácil de recordar y pronunciar." },
                { id: 4, type: "quiz", title: "✅ Comprobemos lo aprendido", question: "¿Qué significa la 'A' en STEAM?", options: ["Arquitectura", "Artes", "Astronomía", "Algoritmos"], correct: 1, explanation: "La 'A' representa Arts (Artes), que incluye diseño, creatividad, expresión visual, música y humanidades." },
                { id: 5, type: "content", title: "⚡ ¿Por qué surgió STEAM?", content: "Porque los problemas reales no son solo de ciencia o solo de arte. El cambio climático, la movilidad urbana o la salud requieren equipos multidisciplinarios.", extra: "Un ingeniero sin creatividad construye puentes feos. Un artista sin ciencia no entiende por qué se cae su escultura." },
                { id: 6, type: "content", title: "🧠 Habilidades del siglo XXI", content: "Pensamiento crítico, creatividad, colaboración, comunicación. STEAM las desarrolla todas simultáneamente.", extra: "Estas habilidades no se aprenden con un examen de opción múltiple. Se practican resolviendo retos reales." },
                { id: 7, type: "quiz", title: "🎯 Identifica la habilidad", question: "De las siguientes opciones, ¿cuál NO es una habilidad clave del siglo XXI que desarrolla STEAM?", options: ["Memorización de datos", "Pensamiento crítico", "Colaboración", "Creatividad"], correct: 0, explanation: "La memorización es importante, pero STEAM prioriza aplicar el conocimiento, no solo repetirlo." },
                { id: 8, type: "content", title: "🏫 STEM vs STEAM: la diferencia clave", content: "STEM busca la solución técnica. STEAM busca la solución técnica + experiencia humana + estética + significado.", extra: "Un puente STEM es fuerte. Un puente STEAM es fuerte, bonito y la comunidad se siente orgullosa de él." },
                { id: 9, type: "content", title: "📱 Ejemplo concreto: Una app", content: "STEM: que funcione rápido y sin errores. STEAM: que funcione rápido, sea fácil de usar, tenga colores agradables y cuente una historia.", extra: "Por eso Apple ganó, no solo por tecnología, sino por diseño y emoción." },
                { id: 10, type: "quiz", title: "🧪 Aplicando el concepto", question: "Un estudiante diseña un filtro de agua con botellas recicladas. Decora el filtro con dibujos de animales locales y escribe instrucciones claras. ¿Esto es STEM o STEAM?", options: ["STEM puro", "STEAM (incluye Artes)", "No es ninguno", "Solo es Arte"], correct: 1, explanation: "Al decorar y comunicar visualmente, está integrando Artes. Resuelve un problema científico-técnico con creatividad y diseño." },
                { id: 11, type: "content", title: "🌍 ¿STEAM es solo para ricos?", content: "No. STEAM no requiere equipos caros. Cartón, ligas, botellas, papel aluminio y creatividad son suficientes para proyectos de alto impacto. Incorporar robots, sensores o impresoras 3D enriquece la experiencia y prepara a los estudiantes para los trabajos del futuro — pero no son un requisito.", extra: "Lo más valioso en STEAM es un docente bien formado. Y usted, Profe Billy, ya lo es." },
                { id: 12, type: "content", title: "🎯 El para qué final", content: "STEAM prepara a los estudiantes para trabajos que aún no existen, para resolver problemas que aún no conocemos, usando herramientas que aún no se inventan.", extra: "El mundo cambia rápido. Los sistemas educativos, lento. STEAM es un puente entre ambos." },
                { id: 13, type: "content", title: "📐 STEAM no es solo tecnología", content: "Lo más importante que debe recordar: STEAM es una forma de pensar, no una lista de equipos caros. Un proyecto STEAM de alto impacto puede ser un sistema de riego con botellas recicladas o un juego de mesa de cartón.", extra: "La creatividad y el tinkering (indagar, explorar, experimentar) valen más que el presupuesto. Usted puede hacer STEAM hoy, ahora, con lo que tiene." }
            ]
        },
        // MÓDULO 2: Las 6 disciplinas STEEAM (16 tarjetas)
        {
            id: 2,
            title: "🔧 Las 6 disciplinas STEEAM",
            cards: [
                { id: 14, type: "content", title: "🧪 Science (Ciencia)", content: "Hacer preguntas, formular hipótesis, experimentar, observar fenómenos, registrar datos, sacar conclusiones.", extra: "Ejemplo: '¿Qué pasa con una semilla si le doy diferente cantidad de agua?'" },
                { id: 15, type: "content", title: "💻 Technology (Tecnología)", content: "Usar herramientas digitales o análogas para crear soluciones. No es solo computadoras: una regla, un compás o un martillo son tecnología.", extra: "La tecnología es cualquier herramienta que extiende nuestra capacidad." },
                { id: 16, type: "content", title: "🔨 Engineering (Ingeniería)", content: "Diseñar, construir, probar, fallar, rediseñar, mejorar. Es el ciclo de creación. Los estudiantes aprenden que está bien equivocarse.", extra: "En ingeniería, el fracaso es una lección, no una derrota." },
                { id: 17, type: "quiz", title: "🔍 Distingue las disciplinas", question: "Un grupo de estudiantes mide la altura de una planta cada día y anota los datos. ¿Qué disciplina STEAM están aplicando principalmente?", options: ["Arte", "Ingeniería", "Ciencia", "Tecnología"], correct: 2, explanation: "Observar, medir y registrar datos es el método científico. Están haciendo ciencia." },
                { id: 18, type: "content", title: "💼 Entrepreneurship (Emprendimiento)", content: "Identificar problemas del entorno y crear soluciones con valor. No es solo vender cosas, es tener iniciativa y responsabilidad.", extra: "Un emprendedor STEAM ve un problema y dice: '¿cómo puedo ayudar?'" },
                { id: 19, type: "content", title: "🎨 Arts (Artes)", content: "Comunicar, narrar, diseñar con estética y emoción. Incluye artes visuales, música, teatro, danza y literatura.", extra: "El arte hace que una solución sea deseable, no solo funcional." },
                { id: 20, type: "content", title: "📐 Mathematics (Matemáticas)", content: "Medir, calcular, analizar datos, reconocer patrones, usar geometría, estimar, comparar cantidades.", extra: "La matemática es el lenguaje de las otras disciplinas. Sin números, no hay ingeniería." },
                { id: 21, type: "quiz", title: "🧮 ¿Dónde están las mates?", question: "Un niño diseña un semáforo de cartón. Para decidir el tamaño, mide el ancho del pasillo y calcula que debe medir 30 cm. ¿Qué disciplina usa?", options: ["Solo Arte", "Solo Tecnología", "Matemáticas (medición y cálculo)", "Emprendimiento"], correct: 2, explanation: "Medir y calcular dimensiones es matemática aplicada. La geometría y la medición son mates en acción." },
                { id: 22, type: "content", title: "🔄 Ejemplo integrador: El semáforo del patio", content: "Problema: niños corren peligro en un cruce del patio. Ciencia: ¿cómo viaja la luz? Tecnología: cartulinas y linterna. Ingeniería: semáforo mecánico giratorio. Arte: señales grandes y coloridas. Matemáticas: ángulo de visión, altura ideal. Emprendimiento: manual de uso para otros grados.", extra: "Un solo proyecto toca las 6 disciplinas. Así se hace STEAM real.", project: { title: "Semáforo del patio", duration: "2 períodos (90 min)", difficulty: "Nivel medio", materials: ["Cartulinas rojo, amarillo y verde", "Tubo de cartón o palitos gruesos", "Pegamento y tijeras", "Marcadores gruesos", "Cinta adhesiva o masking tape"], steps: ["Identifica con tus estudiantes un cruce o zona de riesgo en el patio o pasillo.", "Forma equipos de 4-5 estudiantes. Cada equipo dibuja su diseño de semáforo en papel antes de construir.", "Distribuye los materiales: cartulinas de colores, tubo de cartón, pegamento y tijeras.", "Construyen el semáforo: base con tubo de cartón, círculos de colores recortados y pegados.", "Diseñan señales con instrucciones claras y letras grandes (Arte + comunicación visual).", "Prueban el semáforo en el patio real: ¿se ve bien desde lejos? ¿funciona en la zona de riesgo?", "Presentan su solución a otro grado: explican el problema detectado, el diseño y los resultados obtenidos."], disciplines: ["Ciencia (propagación de la luz)", "Ingeniería (diseño y construcción)", "Arte (señalización visual)", "Matemáticas (medidas y ángulos)", "Emprendimiento (presentación y manual de uso)"],
                        think: [
                            "Observen el cruce problemático 5 minutos. ¿Cuántos casi-accidentes ven? Anótenlo en la bitácora.",
                            "Busquen imágenes de semáforos reales: ¿qué altura tienen? ¿por qué esos colores? ¿qué tamaño tienen los círculos?",
                            "Cada equipo dibuja 2 diseños distintos en papel antes de construir. Argumenten cuál resuelve mejor el problema."
                        ],
                        make: [
                            "Construyan el primer prototipo con cartulinas y tubo de cartón. No busquen perfección — construyan rápido y prueben.",
                            "Lleven el prototipo al cruce real. ¿Se ve desde lejos? ¿Los colores son claros con la luz del sol o de las lámparas?",
                            "Si algo no funciona, ajústenlo: tamaño, ubicación, colores. El primer intento casi nunca es el mejor — eso está bien."
                        ],
                        improve: [
                            "¿Qué falló en la primera prueba? Ese fracaso es exactamente la información que necesitan para mejorar.",
                            "Pidan a un estudiante de otro grado que use el semáforo sin instrucciones. ¿Lo entiende solo? Si no, hay que mejorar el diseño.",
                            "Escriban instrucciones de 1 página para que otro grupo pueda replicar su semáforo en otra escuela. Eso es emprendimiento real."
                        ]
                    } },
                { id: 23, type: "content", title: "🔄 Integración real: El filtro de agua", content: "Ciencia (¿cómo filtra el carbón?), Tecnología (embudo, botella), Ingeniería (diseño estable), Arte (decoración), Mates (medir capas).", extra: "Una misma actividad puede cubrir 4 o 5 disciplinas si la planeamos bien.", project: { title: "Filtro de agua casero", duration: "2 períodos (90 min)", difficulty: "Nivel fácil", materials: ["Botellas plásticas grandes (2 por equipo)", "Algodón o tela", "Arena limpia", "Grava o piedritas pequeñas", "Carbón activado (opcional)", "Agua con colorante o tierra para simular agua sucia"], steps: ["Pregunta problematizadora: '¿Qué pasaría si no tuviéramos agua limpia?' Discute 5 minutos en grupo.", "Corta la botella por la mitad. La parte superior (boca abajo) será el filtro; la inferior, el recipiente.", "Coloca capas en orden dentro de la botella-filtro: algodón en el fondo, luego arena, luego grava, luego carbón si hay.", "Prepara agua sucia con tierra o colorante en la otra mitad de la botella.", "Vierte el agua sucia por el filtro y observa cómo cambia. Compara el color antes y después.", "Mide y registra: ¿cuántos ml entran sucios? ¿cuántos salen más limpios? Completa la tabla de datos.", "Decora el filtro y crea una etiqueta con instrucciones claras. Presenta el diseño a la clase."], disciplines: ["Ciencia (filtración y propiedades del agua)", "Ingeniería (diseño por capas)", "Matemáticas (medición en ml)", "Arte (decoración y diseño gráfico)", "Emprendimiento (instrucciones y presentación)"],
                        think: [
                            "Investiguen: ¿cómo filtra el carbón el agua? ¿Por qué el algodón atrapa partículas? Busquen en libros o pregunten a alguien mayor.",
                            "Observen agua limpia y agua sucia. Describan diferencias: color, olor, partículas visibles. Registren todo en la bitácora.",
                            "Diseñen en papel el orden de las capas antes de construir. ¿Qué material va primero? ¿Por qué ese orden y no otro?"
                        ],
                        make: [
                            "Construyan el filtro siguiendo su diseño. Primer intento: sigan el plan. Anoten cualquier problema que encuentren en el camino.",
                            "Viertan agua sucia y midan cuántos ml entran y cuántos salen. Comparen el color antes y después. Registren los datos.",
                            "Si el agua sigue sucia, cambien el orden de las capas o agreguen más material. Inténtenlo otra vez — cada intento enseña algo."
                        ],
                        improve: [
                            "Comparen su filtro con el de otro equipo. ¿Cuál funcionó mejor? ¿Por qué? No se trata de ganar, sino de aprender del contraste.",
                            "¿Qué harían diferente si tuvieran más material? ¿Y si tuvieran menos? Registren ambas respuestas en la bitácora.",
                            "Diseñen una etiqueta con instrucciones claras para que alguien en casa pueda replicarlo. ¿Puede ser su familia el próximo beneficiario?"
                        ]
                    } },
                { id: 24, type: "content", title: "🏫 Proyecto integrador: La huerta escolar", content: "Ciencia (crecimiento plantas), Mates (medir área riego), Ingeniería (sistema riego), Arte (señalización), Emprendimiento (vender excedentes).", extra: "Una huerta es un laboratorio STEAM al aire libre.", project: { title: "Huerta escolar STEAM", duration: "Proyecto de 2 semanas", difficulty: "Nivel fácil", materials: ["Botellas plásticas o cajitas de cartón resistente", "Tierra preparada o sustrato", "Semillas (frijol, rábano, hierbas aromáticas)", "Palitos de madera o popotes para el sistema de riego", "Cartulina y marcadores para señalización"], steps: ["Identifica un espacio disponible en el patio, ventana o pasillo. Puede ser en cajitas recicladas.", "Diseña el plano de la huerta: ¿qué plantas? ¿dónde va cada una? Cada equipo dibuja su diseño.", "Construye el sistema de riego por goteo: perfora el fondo de una botella pequeña para que gotee lentamente.", "Planta las semillas y etiqueta cada una con su nombre científico, común y fecha de siembra.", "Lleva un registro diario de crecimiento: altura en cm, número de hojas, color. Usa tabla de datos.", "Crea señales artísticas decoradas para identificar cada planta. Pueden tener ilustraciones hechas a mano.", "Al final del proyecto: planea qué hacer con los excedentes. ¿Donarlos? ¿Venderlos? ¿Hacer una feria STEAM?"], disciplines: ["Ciencia (biología vegetal y fotosíntesis)", "Ingeniería (sistema de riego por goteo)", "Matemáticas (medición del crecimiento)", "Arte (señalización e ilustración)", "Emprendimiento (plan para los excedentes)"],
                        think: [
                            "Investiguen qué necesita una planta para crecer: luz, agua, tierra, espacio. ¿Qué tiene su escuela disponible ahora mismo?",
                            "Planifiquen el diseño de la huerta en papel: ¿cuántas plantas caben en el espacio? ¿Cuánto espacio necesita cada una? Usen medidas reales.",
                            "Diseñen el sistema de riego por goteo antes de construirlo. ¿Cómo hará el agua para llegar lentamente a las raíces sin desperdiciar?"
                        ],
                        make: [
                            "Construyan el sistema de riego: perforen el fondo de una botella pequeña. Pruébenlo con agua sola antes de plantar — ¿gotea o sale a chorros?",
                            "Planten las semillas y configuren el riego. Primer día: ¿funciona el sistema? Ajústen si es necesario antes de que las plantas lo necesiten.",
                            "Registren el crecimiento cada día: altura en cm, número de hojas, color. La tabla de datos es su herramienta científica más importante."
                        ],
                        improve: [
                            "Semana 2: ¿qué plantas crecieron más? ¿Cuáles no? ¿A qué creen que se debe? Ajusten el riego de las que van mal y registren el cambio.",
                            "Comparen su diseño de riego con el de otro equipo. ¿Cuál usó menos agua con mejor resultado? ¿Qué pueden copiar del otro diseño?",
                            "Al final del proyecto, planeen el destino de las plantas: ¿donarlas, venderlas, hacer una feria STEAM? Ese plan es emprendimiento real."
                        ]
                    } },
                { id: 25, type: "quiz", title: "🌱 Identifica el proyecto integrador", question: "En una huerta escolar, los estudiantes diseñan un sistema de riego por goteo con botellas. Pintan las botellas y las decoran. ¿Qué disciplinas se integran?", options: ["Solo Ingeniería", "Ingeniería + Arte", "Ingeniería + Arte + Emprendimiento", "Todas las anteriores"], correct: 3, explanation: "Ingeniería (diseño del sistema), Arte (decoración), Emprendimiento (podrían vender el sistema a otras escuelas). Es STEAM completo." },
                { id: 26, type: "content", title: "⚠️ Error común: separar las disciplinas", content: "Un error frecuente es hacer 'hora de ciencia', luego 'hora de arte', sin conexión. Eso no es STEAM. La magia está en la integración.", extra: "STEAM no es una ensalada de materias. Es un batido: todo mezclado." },
                { id: 27, type: "content", title: "🗺️ Mapa de integración (para planificar)", content: "Antes de un proyecto, pregúntese: ¿Qué ciencia hay? ¿Qué mates? ¿Qué arte? ¿Qué ingeniería? Si falta una, ¿podemos agregarla fácilmente?", extra: "Un buen proyecto STEAM toca al menos 4 de las 6 disciplinas." },
                { id: 28, type: "quiz", title: "🎯 Planificación STEAM", question: "Si un proyecto tiene mucha ciencia y matemática, pero ningún elemento artístico, ¿qué le hace falta para ser STEAM?", options: ["Nada, ya es STEAM", "Agregar diseño o expresión creativa", "Más tecnología", "Más emprendimiento"], correct: 1, explanation: "Sin la 'A', sería solo STEM. Para ser STEAM, necesita un componente artístico, aunque sea pequeño." },
                { id: 29, type: "content", title: "📝 Resumen del módulo", content: "STEEAM = Science, Technology, Engineering, Entrepreneurship, Arts, Mathematics. Integrarlas es el desafío y la belleza de STEAM.", extra: "No todas las actividades deben tener las 6. Pero intente que cada proyecto tenga al menos 3-4." }
            ]
        },
        // MÓDULO 3: Metodologías Activas (16 tarjetas)
        {
            id: 3,
            title: "🧠 Metodologías activas para STEAM",
            cards: [
                { id: 30, type: "content", title: "📖 ¿Qué es una metodología activa?", content: "Es un enfoque donde el estudiante es el protagonista. El docente pasa de 'dictar clase' a 'diseñar experiencias'.", extra: "El aprendizaje no es algo que se recibe. Es algo que se construye." },
                { id: 31, type: "content", title: "🏗️ Aprendizaje Basado en Proyectos (ABP)", content: "Los estudiantes crean un producto final que resuelve un problema real. No es un ejercicio, es un proyecto con significado.", extra: "Ejemplo: diseñar un sistema de recolección de agua lluvia para la escuela." },
                { id: 32, type: "quiz", title: "🔍 Identifica ABP", question: "Un docente pide a sus estudiantes que hagan una maqueta de una célula con plastilina. ¿Es ABP?", options: ["Sí, porque construyen algo", "No, porque no resuelve un problema real", "Sí, porque usan arte", "Depende del color de plastilina"], correct: 1, explanation: "ABP requiere resolver un problema real. Una maqueta de célula es un ejercicio, no un proyecto con impacto real." },
                { id: 33, type: "content", title: "💡 Design Thinking (5 fases)", content: "1. Empatizar (entender al usuario) → 2. Definir el problema → 3. Idear soluciones → 4. Prototipar → 5. Evaluar.", extra: "Es un ciclo, no una línea recta. Se puede volver atrás y mejorar." },
                { id: 34, type: "content", title: "🧑‍🤝‍🧑 Ejemplo de Design Thinking", content: "Problema: los niños pequeños pierden sus loncheras. Fase 1: entrevistar a niños de kinder. Fase 2: 'necesitan un identificador personal'. Fase 3: etiquetas con sonido, colores, imanes. Fase 4: etiqueta de cartón. Fase 5: funciona el 80%.", extra: "Dato simulado: 80% de efectividad en una prueba con 25 niños." },
                { id: 35, type: "quiz", title: "🎨 Fases de Design Thinking", question: "Un equipo de estudiantes entrevista a sus compañeros para entender por qué se acumula basura en el patio. ¿En qué fase están?", options: ["Idear", "Prototipar", "Empatizar", "Evaluar"], correct: 2, explanation: "Entrevistar para entender las necesidades de los usuarios es la fase de EMPATIZAR." },
                { id: 36, type: "content", title: "🔧 Tinkering (Indagar, Explorar, Experimentar)", content: "Aprender tocando, probando, fallando, sin instrucciones paso a paso. El error es parte del proceso, no un fracaso.", extra: "Se dice que el tinkering es el método científico con las mangas arremangadas: indagar, explorar y experimentar sin miedo." },
                { id: 37, type: "content", title: "🧩 Ejemplo de Tinkering", content: "Dar a los estudiantes un motor, una pila, cinta, cartón y papel aluminio. Reto: 'Hagan que algo se mueva'. No se dan instrucciones. Cada equipo encuentra su camino.", extra: "Resultado: algunos logran un ventilador, otros un carro, otros nada. Pero todos aprendieron algo." },
                { id: 38, type: "quiz", title: "🎮 ¿Qué metodología es?", question: "Un docente da a sus estudiantes una caja con materiales variados y un reto abierto: 'Construyan algo que sirva para transportar un huevo sin que se rompa'. No da instrucciones. ¿Qué metodología usa?", options: ["Clase magistral", "Tinkering", "Gamificación", "Design Thinking sin empatizar"], correct: 1, explanation: "El reto abierto, sin instrucciones paso a paso, y el aprendizaje por exploración es la esencia del Tinkering." },
                { id: 39, type: "content", title: "🎲 Gamificación", content: "Usar elementos de juegos (puntos, niveles, insignias, retos, tablas de clasificación) en contextos no lúdicos, como el aula.", extra: "No es jugar por jugar. Es usar la motivación del juego para aprender." },
                { id: 40, type: "content", title: "🏆 Ejemplo de Gamificación", content: "Misión STEAM: 'Salvar el ecosistema del patio'. Cada tarea completada da una insignia: Biólogo (identificar 5 plantas), Ingeniero (diseñar comedero), Artista (cartel).", extra: "Los estudiantes pueden subir de nivel: Explorador → Especialista → Maestro STEAM." },
                { id: 41, type: "quiz", title: "🎯 Elementos de gamificación", question: "En una clase, el docente da puntos por cada problema resuelto y al final de la semana hay un podio con los 3 puntajes más altos. ¿Qué elemento de gamificación NO está presente?", options: ["Puntos", "Niveles", "Tabla de clasificación", "Insignias"], correct: 3, explanation: "No se mencionan insignias (logros visuales). Puntos, niveles (implícitos) y tabla de clasificación sí están." },
                { id: 42, type: "content", title: "🔄 Combinando metodologías", content: "Puede usar Design Thinking para definir el proyecto, ABP para la estructura general, Tinkering para explorar materiales y Gamificación para motivar.", extra: "Las metodologías son herramientas. Usted elige cuál usar según el momento." },
                { id: 43, type: "content", title: "📊 Datos simulados: efectividad comparada", content: "En un estudio con 120 estudiantes (datos simulados por Profe Billy): Clase tradicional: retención 28%. ABP: 62%. ABP + Gamificación: 79%. ABP + Gamificación + Tinkering: 91%.", extra: "La combinación de metodologías activas multiplica el aprendizaje." },
                { id: 44, type: "quiz", title: "📈 Interpreta los datos", question: "Según los datos simulados, ¿qué combinación da la retención más alta (91%)?", options: ["Solo ABP", "ABP + Gamificación", "ABP + Gamificación + Tinkering", "Clase tradicional"], correct: 2, explanation: "La combinación de tres metodologías (ABP, Gamificación y Tinkering) alcanza 91% de retención según los datos del ejemplo." },
                { id: 45, type: "content", title: "📝 Resumen del módulo", content: "ABP (problemas reales), Design Thinking (fases centradas en usuario), Tinkering (indagar, explorar, experimentar), Gamificación (motivación con elementos de juego).", extra: "No necesita aplicarlas todas. Empiece con una, domínela, luego agregue otra." }
            ]
        },
        // MÓDULO 4: Evaluación en STEAM (15 tarjetas)
        {
            id: 4,
            title: "📊 Evaluación en STEAM",
            cards: [
                { id: 46, type: "content", title: "❌ Error común: evaluar STEAM con examen", content: "Poner un examen de opción múltiple para evaluar un proyecto STEAM es como evaluar una obra de teatro con un cuestionario escrito.", extra: "Se evalúa el proceso, no solo el producto final." },
                { id: 47, type: "content", title: "📋 Tipos de evaluación en STEAM", content: "Diagnóstica (antes), Formativa (durante), Sumativa (al final). Las tres son necesarias.", extra: "No es solo poner nota al final. Es acompañar todo el camino." },
                { id: 48, type: "quiz", title: "🔍 Tipo de evaluación", question: "Al inicio de un proyecto, el docente pregunta: '¿Qué saben sobre los filtros de agua?' y los estudiantes dibujan lo que imaginan. ¿Qué tipo de evaluación es?", options: ["Sumativa", "Formativa", "Diagnóstica", "Sorpresiva"], correct: 2, explanation: "Es diagnóstica porque se aplica al inicio para conocer los conocimientos previos." },
                { id: 49, type: "content", title: "📝 Rúbricas: el mejor aliado", content: "Una rúbrica es una tabla con criterios y niveles de logro. Permite evaluar de forma clara y objetiva.", extra: "Los estudiantes deben conocer la rúbrica ANTES de empezar el proyecto. Así saben qué se espera de ellos." },
                { id: 50, type: "content", title: "📊 Ejemplo de rúbrica (filtro de agua)", content: "Criterios: Investigación (1-4), Prototipo (1-4), Creatividad (1-4), Trabajo en equipo (1-4), Explicación oral (1-4). Máximo 20 puntos.", extra: "Un filtro que funciona y está bien documentado obtiene 18-20." },
                { id: 51, type: "quiz", title: "📏 Aplicando la rúbrica", question: "Un filtro de agua funciona perfectamente, pero el equipo no puede explicar cómo lo hicieron ni usaron fuentes externas. Según la rúbrica de ejemplo, ¿qué criterios serían bajos?", options: ["Solo Prototipo", "Investigación y Explicación oral", "Creatividad y Arte", "Ninguno, funciona perfecto"], correct: 1, explanation: "La investigación (por no usar fuentes) y la explicación oral (por no poder explicarlo) serían bajos, aunque el prototipo funcione." },
                { id: 52, type: "content", title: "📓 Bitácora o diario de aprendizaje", content: "Los estudiantes escriben cada día: ¿Qué hice? ¿Qué falló? ¿Qué aprendí? ¿Qué haré mañana diferente?", extra: "La bitácora permite evaluar el proceso, no solo el producto." },
                { id: 53, type: "content", title: "📸 Portafolio STEAM", content: "Colección de evidencias: fotos del proceso, prototipos fallidos, versiones mejoradas, reflexiones escritas, videos cortos.", extra: "El portafolio muestra el viaje, no solo el destino." },
                { id: 54, type: "quiz", title: "🎒 Evidencias de aprendizaje", question: "¿Cuál de los siguientes NO es una evidencia útil en un portafolio STEAM?", options: ["Foto del primer prototipo (feo pero funcional)", "Un dibujo de cómo imaginaban la solución al inicio", "La nota del examen de ciencias", "Una reflexión escrita: 'Fallé porque no medí bien'"], correct: 2, explanation: "El examen de ciencias tradicional no muestra el proceso STEAM. Las fotos, dibujos y reflexiones sí." },
                { id: 55, type: "content", title: "📊 Datos simulados de evaluación (20 estudiantes)", content: "Proyecto 'Semáforo del patio'. Promedios: Investigación 3.2, Prototipo 3.1, Creatividad 3.4, Trabajo equipo 3.3, Explicación 3.0. Total promedio: 16/20.", extra: "Fortaleza: creatividad. Área de mejora: explicación oral. Próximo paso: practicar presentaciones." },
                { id: 56, type: "quiz", title: "📈 Analiza los datos", question: "En los datos simulados, el criterio con menor puntaje promedio (3.0) fue 'Explicación oral'. ¿Qué acción sería más adecuada?", options: ["Repetir todo el proyecto", "Practicar cómo presentar y explicar el proceso", "Eliminar ese criterio de la rúbrica", "Poner más notas de examen"], correct: 1, explanation: "Si la explicación oral es baja, se debe entrenar esa habilidad específica, no eliminar el criterio ni repetir todo el proyecto." },
                { id: 57, type: "content", title: "🗣️ Evaluación entre pares (coevaluación)", content: "Los estudiantes evalúan el trabajo de otros equipos usando la misma rúbrica. Desarrolla pensamiento crítico y empatía.", extra: "Regla de oro: la crítica debe ser constructiva. 'Me gustó...', 'Podrían mejorar...'" },
                { id: 58, type: "content", title: "🪞 Autoevaluación", content: "El estudiante reflexiona sobre su propio trabajo. Preguntas clave: ¿Qué hice bien? ¿Qué fue difícil? ¿Qué haría diferente la próxima vez?", extra: "La autoevaluación no es para poner nota, es para tomar conciencia del propio aprendizaje." },
                { id: 59, type: "quiz", title: "🤝 Tipos de evaluación", question: "Un estudiante escribe en su bitácora: 'Ayudé a mi compañero a entender cómo funciona el sensor. La próxima vez quiero probar un diseño diferente'. ¿Qué está haciendo?", options: ["Coevaluación", "Autoevaluación", "Evaluación diagnóstica", "Examen sorpresa"], correct: 1, explanation: "Está reflexionando sobre su propio desempeño (autoevaluación), aunque también menciona trabajo en equipo." },
                { id: 60, type: "content", title: "📝 Resumen del módulo", content: "Use rúbricas, portafolios, bitácoras, autoevaluación y coevaluación. Evite los exámenes tradicionales como única herramienta.", extra: "Evalúe el proceso, la creatividad, la resiliencia ante el error y el trabajo en equipo." }
            ]
        },
        // MÓDULO 5: Retos en Guatemala y adaptación (13 tarjetas)
        {
            id: 5,
            title: "🇬🇹 STEAM en Guatemala: retos y soluciones",
            cards: [
                { id: 61, type: "content", title: "🌎 Contexto guatemalteco", content: "Guatemala ocupa el puesto #134 en calidad de educación STEM (referencia). 1bot trabaja para llevarnos al top 10 en 2050.", extra: "El camino es largo, pero cada maestro que aplica STEAM acorta la distancia." },
                { id: 62, type: "content", title: "📉 Reto 1: Brecha digital y de recursos", content: "Muchas escuelas no tienen internet o computadoras. ¿Solución? Proyectos STEAM de bajo costo y sin tecnología. Cartón, botellas, ligas, creatividad.", extra: "Usar robots y kits tecnológicos enriquece la experiencia y desarrolla habilidades del futuro; sin embargo, los proyectos más creativos nacen de materiales simples y problemas reales del entorno." },
                { id: 63, type: "quiz", title: "🧩 Resuelve el reto", question: "Una escuela rural no tiene computadoras ni internet. El docente quiere hacer un proyecto STEAM sobre comunicación. ¿Qué podría hacer?", options: ["Cancelar STEAM hasta que llegue internet", "Usar un sistema de banderas y silbatos (tecnología análoga)", "Pedir que los padres compren tabletas", "Solo hacer dibujos"], correct: 1, explanation: "La tecnología no es solo digital. Un sistema de banderas o silbatos es tecnología de comunicación válida y de bajo costo." },
                { id: 64, type: "content", title: "📉 Reto 2: Currículum rígido y materias separadas", content: "El horario escolar separa matemáticas, ciencias y arte. ¿Solución? Proyectos pequeños que integren 2-3 materias en una misma semana.", extra: "Empiece con un proyecto de 3 horas que integre dos materias. Cada pequeño paso construye un currículo STEAM que prepara a sus estudiantes para los trabajos del futuro." },
                { id: 65, type: "content", title: "📉 Reto 3: Falta de tiempo para planificar", content: "Los maestros tienen horas saturadas. Planificar un proyecto STEAM lleva tiempo. ¿Solución? Banco de proyectos listos (como los ejemplos de este curso).", extra: "Comparta sus proyectos con otros docentes. La colaboración multiplica el impacto y reduce la carga individual." },
                { id: 66, type: "quiz", title: "⏱️ Optimización de tiempo", question: "Un docente tiene poco tiempo para planificar. ¿Cuál es la estrategia más eficiente según el curso?", options: ["Dejar de hacer STEAM", "Usar un banco de proyectos STEAM ya diseñados", "Planificar desde cero cada semana", "Copiar proyectos de internet sin adaptarlos"], correct: 1, explanation: "Usar proyectos ya diseñados (como los de este curso) ahorra tiempo y garantiza calidad." },
                { id: 67, type: "content", title: "📉 Reto 4: Miedo al error (docentes y estudiantes)", content: "La educación tradicional castiga el error. En STEAM, el error es bienvenido. ¿Solución? Modelar la actitud: muestre sus propios errores y cómo aprende de ellos.", extra: "Diga: 'Miren, esto me salió mal hoy. ¿Qué creen que puedo cambiar?'" },
                { id: 68, type: "content", title: "📉 Reto 5: Estereotipos de género", content: "Algunos creen que la robótica es 'para niños'. ¿Solución? Proyectos que interesen a todas: moda con tecnología, arte cinético, biología creativa.", extra: "Invite explícitamente a las niñas a liderar proyectos técnicos. Nombres de equipos mixtos ayudan." },
                { id: 69, type: "quiz", title: "👧 Rompiendo estereotipos", question: "¿Qué acción concreta ayuda a que más niñas participen en proyectos de robótica?", options: ["Separar niños y niñas", "Poner ejemplos de mujeres inventoras y roboteras", "Hacer robótica obligatoria solo para niños", "Usar solo colores rosados en los materiales"], correct: 1, explanation: "Visibilizar referentes mujeres en tecnología rompe el estereotipo de que la robótica es solo para hombres." },
                { id: 70, type: "content", title: "🇬🇹 Caso real adaptado: Escuela rural de San Juan Sacatepéquez", content: "Sin internet, con 30 estudiantes y pocos materiales. Proyecto: 'Alerta de lluvia para el techo roto'. Usaron una lata, una piedra y un hilo. Cuando llueve, la piedra golpea la lata y avisa. Ciencia (sonido), Ingeniería (mecanismo), Arte (pintaron la lata), Emprendimiento (lo replicaron en otra aula).", extra: "STEAM sí se puede en Guatemala. No necesita robots. Necesita creatividad." },
                { id: 71, type: "content", title: "✅ STEAM sí se puede en Guatemala", content: "Usted ya tiene ejemplos, metodologías, rúbricas y soluciones a los retos. El único ingrediente que falta es su compromiso.", extra: "Profe Billy, usted ya está cambiando la educación en Guatemala. Este curso es una herramienta más en su caja." },
                { id: 72, type: "content", title: "🎓 ¿Qué sigue después del curso?", content: "1. Aplique un proyecto STEAM en su salón. 2. Documente el proceso con fotos. 3. Comparta su experiencia con otros docentes. 4. Regrese al curso para repasar lo que necesite.", extra: "El certificado es el inicio, no el final. La práctica hace al maestro STEAM." },
                { id: 73, type: "content", title: "🎉 Fin del contenido teórico", content: "Ha completado las 73 tarjetas. Ahora realice el examen final (20 preguntas) para obtener su certificado.", extra: "El examen está disponible con el botón verde 'Examen' en la parte superior. ¡Mucha suerte!" }
            ]
        }
    ],
    
    // EXAMEN FINAL — banco de 30 preguntas, se eligen 20 al azar cada intento
    finalExam: {
        title: "📝 Examen Final - Certificación STEAM",
        passingScore: 70,
        questions: [
            { id: 1,  text: "¿Qué significa la 'A' en STEAM?", options: ["Arquitectura", "Artes", "Astronomía", "Algoritmos"], correct: 1, explanation: "La 'A' representa Arts (Artes), que incluye diseño, creatividad, música y expresión visual. Sin ella sería solo STEM." },
            { id: 2,  text: "¿Quién propuso añadir la 'A' a STEM en 2006?", options: ["Seymour Papert", "Georgette Yakman", "Bill Gates", "Un ministro de educación"], correct: 1, explanation: "Georgette Yakman argumentó que la innovación real necesita creatividad y diseño, no solo datos técnicos." },
            { id: 3,  text: "¿Cuál es la principal diferencia entre STEM y STEAM?", options: ["STEAM incluye Artes (creatividad y diseño)", "STEM es más fácil", "STEAM no usa matemáticas", "STEM es solo para niños"], correct: 0, explanation: "STEAM = STEM + Artes. La 'A' añade creatividad, diseño y pensamiento estético a las disciplinas técnicas." },
            { id: 4,  text: "¿Cuál NO es una habilidad del siglo XXI que desarrolla STEAM?", options: ["Pensamiento crítico", "Colaboración", "Memorización de datos", "Creatividad"], correct: 2, explanation: "STEAM prioriza aplicar el conocimiento. La memorización sola no desarrolla las habilidades que el mundo actual requiere." },
            { id: 5,  text: "¿Qué disciplina STEAM se enfoca en diseñar, construir, probar y mejorar?", options: ["Ciencia", "Tecnología", "Ingeniería", "Artes"], correct: 2, explanation: "Ingeniería es el ciclo de creación: diseñar → construir → probar → fallar → rediseñar → mejorar." },
            { id: 6,  text: "¿Cuál es la primera fase del Design Thinking?", options: ["Idear", "Prototipar", "Empatizar", "Evaluar"], correct: 2, explanation: "EMPATIZAR es entender al usuario: observar, escuchar, ponerse en sus zapatos. Sin empatía, las soluciones no conectan." },
            { id: 7,  text: "¿Qué metodología activa se basa en indagar, explorar y experimentar sin instrucciones paso a paso?", options: ["ABP", "Design Thinking", "Tinkering", "Gamificación"], correct: 2, explanation: "Tinkering (indagar, explorar, experimentar) es aprender tocando y probando. El error es parte del proceso, no un fracaso." },
            { id: 8,  text: "¿Qué herramienta de evaluación es una tabla con criterios y niveles de logro?", options: ["Examen", "Bitácora", "Rúbrica", "Lista de cotejo simple"], correct: 2, explanation: "La rúbrica define criterios y niveles (inicio/proceso/logro), dando retroalimentación objetiva y justa al estudiante." },
            { id: 9,  text: "En un proyecto STEAM, ¿qué se debe evaluar principalmente?", options: ["Solo el producto final", "El proceso completo (incluyendo errores)", "La ortografía", "La rapidez"], correct: 1, explanation: "En STEAM los errores son aprendizajes. Evaluar solo el producto ignora el proceso de pensamiento más valioso." },
            { id: 10, text: "¿Qué reto guatemalteco se menciona como barrera para STEAM?", options: ["Sobran recursos tecnológicos", "Brecha digital y falta de conectividad", "Los estudiantes son muy creativos", "El currículum es muy flexible"], correct: 1, explanation: "La brecha digital limita el acceso. Por eso STEAM en Guatemala enfatiza proyectos de bajo costo sin depender de tecnología cara." },
            { id: 11, text: "¿Cuál es un ejemplo de proyecto STEAM de bajo costo?", options: ["Robot de $500", "Semáforo de cartón con colores", "Impresora 3D", "Tablet por estudiante"], correct: 1, explanation: "Un semáforo de cartón integra ciencia, arte, ingeniería y matemáticas sin costo. STEAM no requiere equipos caros." },
            { id: 12, text: "¿Qué tipo de evaluación se aplica al inicio del proyecto para conocer saberes previos?", options: ["Sumativa", "Formativa", "Diagnóstica", "Meta-evaluación"], correct: 2, explanation: "La evaluación diagnóstica revela lo que los estudiantes ya saben ANTES de enseñar, para partir de ahí." },
            { id: 13, text: "¿Qué elemento NO pertenece a la gamificación?", options: ["Puntos", "Niveles", "Exámenes sorpresa", "Insignias"], correct: 2, explanation: "Los exámenes sorpresa generan ansiedad. La gamificación usa puntos, niveles e insignias para motivar, no para sorprender negativamente." },
            { id: 14, text: "¿Cómo se llama el diario donde los estudiantes registran sus avances, errores y reflexiones?", options: ["Bitácora", "Cuaderno de caligrafía", "Registro de asistencia", "Libro de texto"], correct: 0, explanation: "La bitácora de aprendizaje documenta el proceso: qué intenté, qué falló, qué descubrí. Es metacognición en acción." },
            { id: 15, text: "¿Qué porcentaje de aprobación se necesita para obtener el certificado?", options: ["50%", "60%", "70%", "90%"], correct: 2, explanation: "El 70% es el umbral de aprobación. Significa dominar al menos 14 de 20 preguntas del examen." },
            { id: 16, text: "¿Qué disciplina STEAM se relaciona con identificar problemas del entorno y crear soluciones con valor?", options: ["Emprendimiento", "Artes", "Matemáticas", "Ciencia"], correct: 0, explanation: "Entrepreneurship (Emprendimiento) no es solo vender: es tener iniciativa para resolver problemas con impacto real." },
            { id: 17, text: "¿Cuál es un ejemplo de tecnología análoga válida en STEAM?", options: ["Un iPhone", "Un sistema de banderas para comunicarse", "Un dron", "Un proyector"], correct: 1, explanation: "Tecnología es cualquier herramienta que extiende nuestra capacidad. Un sistema de banderas es tecnología de comunicación." },
            { id: 18, text: "En la rúbrica de ejemplo, ¿cuántos puntos máximos puede obtener un proyecto?", options: ["10", "20", "50", "100"], correct: 1, explanation: "La rúbrica del curso tiene 5 criterios × 4 puntos máximo cada uno = 20 puntos totales posibles." },
            { id: 19, text: "¿Qué acción ayuda a romper estereotipos de género en STEAM?", options: ["Separar niños y niñas", "Mostrar ejemplos de mujeres inventoras", "Prohibir que niñas usen herramientas", "Usar solo colores rosados"], correct: 1, explanation: "Mostrar referentes femeninos en ciencia e ingeniería demuestra que STEAM no tiene género. Todos pueden innovar." },
            { id: 20, text: "¿Cuál es el objetivo final de STEAM según el curso?", options: ["Comprar robots caros", "Preparar estudiantes para resolver problemas reales con creatividad", "Aprobar exámenes internacionales", "Reemplazar a los docentes"], correct: 1, explanation: "STEAM prepara para un futuro incierto: trabajos que no existen, problemas que no conocemos, herramientas que aún no se inventan." },
            { id: 21, text: "¿Qué hace un docente STEAM frente al error de un estudiante?", options: ["Lo penaliza con una nota baja", "Lo ignora para no desmotivar", "Lo convierte en oportunidad de aprendizaje", "Lo corrige inmediatamente"], correct: 2, explanation: "En STEAM el error es datos, no fracaso. '¿Qué aprendiste de lo que no funcionó?' es la pregunta correcta." },
            { id: 22, text: "Un estudiante diseña una maqueta de acueducto para su comunidad. ¿Cuántas disciplinas STEAM activa?", options: ["Solo una (ingeniería)", "Dos (ingeniería y arte)", "Al menos cuatro", "Ninguna, es solo manualidad"], correct: 2, explanation: "Activa: Ciencia (agua, fluidos), Ingeniería (diseño/construcción), Matemáticas (medidas), Arte (presentación) y Emprendimiento (impacto social)." },
            { id: 23, text: "¿Qué es ABP (Aprendizaje Basado en Proyectos)?", options: ["Un examen de fin de año", "Un enfoque donde los estudiantes resuelven un problema real creando algo", "Una lista de tareas del libro de texto", "Trabajo en grupos sin objetivo definido"], correct: 1, explanation: "ABP tiene un producto final con impacto real. No es un ejercicio, es un proyecto con significado para la comunidad." },
            { id: 24, text: "¿Cuál de estas NO es una fase del Design Thinking?", options: ["Empatizar", "Memorizar", "Prototipar", "Evaluar"], correct: 1, explanation: "Las 5 fases son: Empatizar → Definir → Idear → Prototipar → Evaluar. Memorizar no es parte del proceso creativo." },
            { id: 25, text: "¿Qué tipo de evaluación acompaña el proceso durante el proyecto?", options: ["Diagnóstica", "Formativa", "Sumativa", "Cuantitativa"], correct: 1, explanation: "La evaluación FORMATIVA ocurre DURANTE el proceso. Retroalimenta y permite ajustar antes de que sea demasiado tarde." },
            { id: 26, text: "¿Por qué STEAM integra las disciplinas en lugar de enseñarlas por separado?", options: ["Porque es más fácil para el docente", "Porque los problemas reales son multidisciplinarios", "Porque así lo exige el currículum", "Para reducir tiempo de clase"], correct: 1, explanation: "Los problemas reales—cambio climático, salud, movilidad—no son solo de ciencia o solo de arte. Requieren todo a la vez." },
            { id: 27, text: "¿Qué significa que un proyecto STEAM sea 'de bajo umbral y alto techo'?", options: ["Que cualquiera puede empezar y puede llegar muy lejos", "Que es fácil y no tiene retos", "Que solo lo hacen los avanzados", "Que tiene pocas preguntas y muchas respuestas"], correct: 0, explanation: "Bajo umbral: todos pueden participar desde donde están. Alto techo: los más avanzados pueden profundizar sin límite." },
            { id: 28, text: "¿Cuál es el rol del docente en un aula STEAM?", options: ["Dar clases magistrales", "Diseñar experiencias y guiar el aprendizaje", "Calificar tareas del libro", "Controlar que no haya ruido"], correct: 1, explanation: "El docente STEAM pasa de 'sabio en el escenario' a 'guía en el lado'. Diseña contextos donde el estudiante construye." },
            { id: 29, text: "¿Cómo se conecta la matemática con los otros componentes STEAM?", options: ["No se conecta, va aparte", "Es el lenguaje de medición de las otras disciplinas", "Solo se usa en el componente de ingeniería", "La matemática reemplaza a la ciencia"], correct: 1, explanation: "Matemática es el lenguaje de STEAM: mide, calcula, modela y predice para ciencia, ingeniería, tecnología y emprendimiento." },
            { id: 30, text: "¿Qué es la metacognición y por qué importa en STEAM?", options: ["Memorizar hechos científicos", "Pensar sobre cómo aprendemos y mejorar nuestro propio proceso", "Calcular el promedio de calificaciones", "Usar tecnología avanzada"], correct: 1, explanation: "Metacognición = pensar sobre el propio pensamiento. En STEAM los estudiantes reflexionan qué funcionó y qué cambiarían." }
        ]
    }
} // end steam course
,
{
    id: 'abp',
    title: 'Aprendizaje Basado en Proyectos',
    subtitle: 'Diseña proyectos con impacto real en tu comunidad educativa',
    icon: '🏗️',
    color: '#2BA848',
    gradient: 'linear-gradient(135deg, #1a4a2e, #2BA848)',
    status: 'coming',
    durationHours: 8,
    totalCards: 60,
    modules: [],
    finalExam: null
},
{
    id: 'design-thinking',
    title: 'Design Thinking para Docentes',
    subtitle: 'Resuelve problemas del aula con empatía y creatividad',
    icon: '💡',
    color: '#E83C8D',
    gradient: 'linear-gradient(135deg, #6b1a47, #E83C8D)',
    status: 'coming',
    durationHours: 6,
    totalCards: 45,
    modules: [],
    finalExam: null
},
{
    id: 'evaluacion',
    title: 'Herramientas de Evaluación',
    subtitle: 'Rúbricas, portafolios y evaluación auténtica para el siglo XXI',
    icon: '📊',
    color: '#E9A037',
    gradient: 'linear-gradient(135deg, #6b4a1a, #E9A037)',
    status: 'coming',
    durationHours: 5,
    totalCards: 35,
    modules: [],
    finalExam: null
}
]; // end allCourses

const courseData = allCourses[0]; // backward compat — STEAM es el curso por defecto