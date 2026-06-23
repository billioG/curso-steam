// data.js - Cursos para docentes - Profe Billy

const allCourses = [
{
    id: 'steam',
    title: 'Metodología STEAM 2.0',
    subtitle: 'Ciencia, Tecnología, Ingeniería, Arte y Matemáticas integrados en tu aula',
    icon: '🔬',
    color: '#07B0E4',
    prerequisite: ['abp'],
    status: 'available',
    durationHours: 5,
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
                { id: 4, type: "quiz", reviewCard: 3, title: "✅ Comprobemos lo aprendido", question: "¿Qué significa la 'A' en STEAM?", options: ["Arquitectura", "Artes", "Astronomía", "Algoritmos"], correct: 1, explanation: "La 'A' representa Arts (Artes), que incluye diseño, creatividad, expresión visual, música y humanidades." },
                { id: 5, type: "content", title: "⚡ ¿Por qué surgió STEAM?", content: "Porque los problemas reales no son solo de ciencia o solo de arte. El cambio climático, la movilidad urbana o la salud requieren equipos multidisciplinarios.", extra: "Un ingeniero sin creatividad construye puentes feos. Un artista sin ciencia no entiende por qué se cae su escultura." },
                { id: 6, type: "content", title: "🧠 Habilidades del siglo XXI", content: "Pensamiento crítico, creatividad, colaboración, comunicación. STEAM las desarrolla todas simultáneamente.", extra: "Estas habilidades no se aprenden con un examen de opción múltiple. Se practican resolviendo retos reales." },
                { id: 7, type: "quiz", reviewCard: 6, title: "🎯 Identifica la habilidad", question: "De las siguientes opciones, ¿cuál NO es una habilidad clave del siglo XXI que desarrolla STEAM?", options: ["Memorización de datos", "Pensamiento crítico", "Colaboración", "Creatividad"], correct: 0, explanation: "La memorización es importante, pero STEAM prioriza aplicar el conocimiento, no solo repetirlo." },
                { id: 8, type: "content", title: "🏫 STEM vs STEAM: la diferencia clave", content: "STEM busca la solución técnica. STEAM busca la solución técnica + experiencia humana + estética + significado.", extra: "Un puente STEM es fuerte. Un puente STEAM es fuerte, bonito y la comunidad se siente orgullosa de él." },
                { id: 9, type: "content", title: "📱 Ejemplo concreto: Una app", content: "STEM: que funcione rápido y sin errores. STEAM: que funcione rápido, sea fácil de usar, tenga colores agradables y cuente una historia.", extra: "Las empresas tecnológicas más exitosas no ganan solo por tecnología, sino por diseño y emoción." },
                { id: 10, type: "quiz", reviewCard: 8, title: "🧪 Aplicando el concepto", question: "Un estudiante diseña un filtro de agua con botellas recicladas. Decora el filtro con dibujos de animales locales y escribe instrucciones claras. ¿Esto es STEM o STEAM?", options: ["STEM puro", "STEAM (incluye Artes)", "No es ninguno", "Solo es Arte"], correct: 1, explanation: "Al decorar y comunicar visualmente, está integrando Artes. Resuelve un problema científico-técnico con creatividad y diseño." },
                { id: 11, type: "content", title: "🌍 ¿STEAM es solo para ricos?", content: "No. STEAM no requiere equipos caros. Cartón, ligas, botellas, papel aluminio y creatividad son suficientes para proyectos de alto impacto. Incorporar robots, sensores o impresoras 3D enriquece la experiencia y prepara a los estudiantes para los trabajos del futuro — pero no son un requisito.", extra: "Lo más valioso en STEAM es un docente bien formado. Y usted, Profe Billy, ya lo es." },
                { id: 12, type: "content", title: "🎯 El para qué final", content: "STEAM prepara a los estudiantes para trabajos que aún no existen, para resolver problemas que aún no conocemos, usando herramientas que aún no se inventan.", extra: "El mundo cambia rápido. Los sistemas educativos, lento. STEAM es un puente entre ambos." },
                { id: 13, type: "content", title: "📐 STEAM no es solo tecnología", content: "Lo más importante que debe recordar: STEAM es una forma de pensar, no una lista de equipos caros. Un proyecto STEAM de alto impacto puede ser un sistema de riego con botellas recicladas o un juego de mesa de cartón.", extra: "La creatividad y el tinkering (indagar, explorar, experimentar) valen más que el presupuesto. Usted puede hacer STEAM hoy, ahora, con lo que tiene." },
                { id: 74, type: "content", title: "⚡ Aplícalo mañana: tu primera clase STEAM", content: "No necesitas un proyecto de semanas para empezar. Aquí tienes una actividad de **20 minutos** que puedes hacer mañana:\n\n**🌉 El reto del puente:**\n1. Forma equipos de 3-4 estudiantes.\n2. Materiales: 10 palitos de paleta, 1 metro de cinta adhesiva, 5 hojas de papel.\n3. Reto: *construyan el puente más largo posible que sostenga un borrador sin caerse.*\n4. Tienen 12 minutos para construir y 3 para presentar.\n\n**Lo que aparece solo, sin que lo planifiques:**\n• Ingeniería: diseñan y construyen\n• Matemáticas: miden la longitud\n• Ciencia: prueban resistencia\n• Arte: lo hacen visualmente llamativo (verás que lo harán sin que lo pidas)\n• Emprendimiento: cada equipo 'vende' su diseño\n\n**Al final, pregunta:** *¿Qué materias usaron sin darse cuenta?* No expliques STEAM antes — déjalos descubrirlo solos.", extra: "Guarda una foto del puente más raro. Ese diseño imperfecto es la prueba de que STEAM sí ocurre en su aula con lo que hay." },
                { id: 75, type: "content", title: "📊 Antes / Después: Ciencias Naturales con STEAM", content: "**❌ Clase tradicional — Fotosíntesis:**\nLa docente explica 35 minutos desde la pizarra. Los estudiantes copian el diagrama del libro. Tarea: responder 5 preguntas al final del capítulo.\n\nResultado: el 60% aprueba el examen. Una semana después, el 80% ya olvidó el proceso.\n\n---\n\n**✅ Clase STEAM — Mismo tema, misma hora:**\n• *Ciencia:* hipótesis en 3 min: '¿Qué necesita una planta para vivir?'\n• *Ingeniería:* equipos diseñan un mini-invernadero con bolsa plástica y botella.\n• *Matemáticas:* miden y registran el crecimiento cada 3 días en tabla de datos.\n• *Arte:* ilustran su planta con nombre científico y dibujo detallado.\n• *Emprendimiento:* planean qué harán con las plantas al final del mes.\n\nResultado: los estudiantes recuerdan la fotosíntesis porque la *vivieron*, no porque la copiaron.", extra: "El contenido es exactamente el mismo. Lo que cambia es si el cerebro lo recibe pasivamente o lo construye con sus manos." },
                { id: 76, type: "content", title: "📋 Plantilla: Reto STEAM de 20 minutos (copia y usa mañana)", content: "**Adapta esta plantilla para cualquier tema de tu planificación:**\n\n---\n🎯 **RETO:** *(una oración que describa el desafío)*\n___________________________________\n\n⏱ **Tiempo:** 20 minutos | 👥 **Equipos de:** 3-4 personas\n\n**🧰 Materiales disponibles:**\n• Papel / cartón reciclado\n• Tijeras y pegamento\n• Marcadores\n• *(agrega lo que tu tema necesite)*\n\n**📌 Reglas (importantes):**\n1. No pueden preguntar cómo hacerlo — eso lo deciden ellos.\n2. Deben poder explicar UNA decisión de diseño que tomaron.\n3. Todos en el equipo deben poder presentar.\n\n**🔍 Preguntas al finalizar (elige 2):**\n• ¿Qué funcionó? ¿Qué cambiarían si tuvieran 5 minutos más?\n• ¿Qué materias usaron sin darse cuenta?\n• ¿Qué harían diferente con más materiales? ¿Y con menos?\n---\n\n**Funciona para:** puentes, filtros de agua, semáforos, comederos de aves, sistemas de riego, alarmas sonoras, mapas táctiles... cualquier problema tiene versión STEAM.", extra: "La primera vez que uses esta plantilla, tú también estarás aprendiendo junto a los estudiantes. Eso está bien — es exactamente la mentalidad STEAM." }
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
                { id: 17, type: "quiz", reviewCard: 14, title: "🔍 Distingue las disciplinas", question: "Un grupo de estudiantes mide la altura de una planta cada día y anota los datos. ¿Qué disciplina STEAM están aplicando principalmente?", options: ["Arte", "Ingeniería", "Ciencia", "Tecnología"], correct: 2, explanation: "Observar, medir y registrar datos es el método científico. Están haciendo ciencia." },
                { id: 18, type: "content", title: "💼 Entrepreneurship (Emprendimiento)", content: "Identificar problemas del entorno y crear soluciones con valor. No es solo vender cosas, es tener iniciativa y responsabilidad.", extra: "Un emprendedor STEAM ve un problema y dice: '¿cómo puedo ayudar?'" },
                { id: 19, type: "content", title: "🎨 Arts (Artes)", content: "Comunicar, narrar, diseñar con estética y emoción. Incluye artes visuales, música, teatro, danza y literatura.", extra: "El arte hace que una solución sea deseable, no solo funcional." },
                { id: 20, type: "content", title: "📐 Mathematics (Matemáticas)", content: "Medir, calcular, analizar datos, reconocer patrones, usar geometría, estimar, comparar cantidades.", extra: "La matemática es el lenguaje de las otras disciplinas. Sin números, no hay ingeniería." },
                { id: 21, type: "quiz", reviewCard: 20, title: "🧮 ¿Dónde están las mates?", question: "Un niño diseña un semáforo de cartón. Para decidir el tamaño, mide el ancho del pasillo y calcula que debe medir 30 cm. ¿Qué disciplina usa?", options: ["Solo Arte", "Solo Tecnología", "Matemáticas (medición y cálculo)", "Emprendimiento"], correct: 2, explanation: "Medir y calcular dimensiones es matemática aplicada. La geometría y la medición son mates en acción." },
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
                { id: 25, type: "quiz", reviewCard: 24, title: "🌱 Identifica el proyecto integrador", question: "En una huerta escolar, los estudiantes diseñan un sistema de riego por goteo con botellas. Pintan las botellas y las decoran. ¿Qué disciplinas se integran?", options: ["Solo Ingeniería", "Ingeniería + Arte", "Ingeniería + Arte + Emprendimiento", "Todas las anteriores"], correct: 3, explanation: "Ingeniería (diseño del sistema), Arte (decoración), Emprendimiento (podrían vender el sistema a otras escuelas). Es STEAM completo." },
                { id: 26, type: "content", title: "⚠️ Error común: separar las disciplinas", content: "Un error frecuente es hacer 'hora de ciencia', luego 'hora de arte', sin conexión. Eso no es STEAM. La magia está en la integración.", extra: "STEAM no es una ensalada de materias. Es un batido: todo mezclado." },
                { id: 27, type: "content", title: "🗺️ Mapa de integración (para planificar)", content: "Antes de un proyecto, pregúntese: ¿Qué ciencia hay? ¿Qué mates? ¿Qué arte? ¿Qué ingeniería? Si falta una, ¿podemos agregarla fácilmente?", extra: "Un buen proyecto STEAM toca al menos 4 de las 6 disciplinas." },
                { id: 28, type: "quiz", reviewCard: 27, title: "🎯 Planificación STEAM", question: "Si un proyecto tiene mucha ciencia y matemática, pero ningún elemento artístico, ¿qué le hace falta para ser STEAM?", options: ["Nada, ya es STEAM", "Agregar diseño o expresión creativa", "Más tecnología", "Más emprendimiento"], correct: 1, explanation: "Sin la 'A', sería solo STEM. Para ser STEAM, necesita un componente artístico, aunque sea pequeño." },
                { id: 29, type: "content", title: "📝 Resumen del módulo", content: "STEEAM = Science, Technology, Engineering, Entrepreneurship, Arts, Mathematics. Integrarlas es el desafío y la belleza de STEAM.", extra: "No todas las actividades deben tener las 6. Pero intente que cada proyecto tenga al menos 3-4." },
                { id: 77, type: "content", title: "⚡ Aplícalo mañana: audita tu próxima actividad", content: "Toma la actividad que tienes planificada para mañana y hazte estas 6 preguntas en 10 minutos:\n\n| Disciplina | ¿Ya está? | ¿Cómo agregarla fácilmente? |\n|---|---|---|\n| 🧪 Ciencia | ¿Observan o prueban algo? | Agrega una hipótesis de 2 min antes |\n| 💻 Tecnología | ¿Usan alguna herramienta? | Regla, tijeras, calculadora → cuenta |\n| 🔨 Ingeniería | ¿Diseñan o construyen? | Pídeles dibujar el proceso en papel |\n| 🎨 Arte | ¿Hay expresión creativa? | Un cartel, ilustración o nombre creativo |\n| 📐 Matemáticas | ¿Miden, calculan o registran? | Agrega: ¿cuánto / cuántos / qué tamaño? |\n| 💼 Emprendimiento | ¿Tiene impacto fuera del aula? | ¿A quién le serviría este trabajo? |\n\n**Meta:** que tu actividad toque al menos 4 de 6 disciplinas sin cambiarla por completo.", extra: "Con UNA pregunta extra o UN paso adicional, una clase tradicional puede convertirse en STEAM. El cambio es más pequeño de lo que parece." },
                { id: 78, type: "content", title: "📊 Antes / Después: Matemáticas — Fracciones con STEAM", content: "**❌ Clase tradicional:**\n30 min de explicación en pizarra. 15 ejercicios del libro. Los que terminan esperan. Los que no entienden quedan atrás.\n\n---\n\n**✅ Con STEAM — mismo tema, misma hora:**\n\n**Problema real:** *'La huerta del patio tiene 12 parcelas. ¿Cómo la dividimos justamente entre los 4 grados de la escuela?'*\n\n• Equipos dibujan la división en papel (Matemáticas + Arte)\n• Marcan la división real en el patio con palitos (Ingeniería + Mates)\n• Cada grado decide qué sembrará en su fracción (Emprendimiento)\n• Registran el área de cada parcela en una tabla (Ciencia + Mates)\n• Presentan su propuesta de división ante la clase (Comunicación)\n\n**¿Cuál versión recuerdan mejor?** La que vivieron en el patio — porque las fracciones dejaron de ser abstractas y se convirtieron en tierra real.", extra: "El teorema se aprende dos veces: cuando se escucha, y cuando se necesita para resolver algo que importa." },
                { id: 79, type: "content", title: "📋 Plantilla: Mapa de Integración STEAM (10 minutos de planificación)", content: "**Llena este mapa antes de tu próximo proyecto:**\n\n---\n📌 **Tema / problema:** ___________________________\n❓ **Pregunta central:** ___________________________\n\n| Disciplina | ¿Qué harán los estudiantes? |\n|---|---|\n| 🧪 Ciencia | _________________________ |\n| 💻 Tecnología | _________________________ |\n| 🔨 Ingeniería | _________________________ |\n| 💼 Emprendimiento | _________________________ |\n| 🎨 Arte | _________________________ |\n| 📐 Matemáticas | _________________________ |\n\n🏆 **Producto final:** ___________________________\n👥 **Audiencia real** (quién verá el trabajo): ___________________________\n⏱ **Duración estimada:** ___________________________\n\n---\n**Regla:** Si 2 o más casillas quedan completamente vacías, reformula el proyecto o busca una forma creativa de incluirlas. Un mapa completo es un proyecto STEAM real.", extra: "Imprime esta plantilla. La primera vez tardarás 20 min. La décima vez, 5. Y cada proyecto será mejor que el anterior." }
            ]
        },
        // MÓDULO 3: Metodologías Activas (16 tarjetas)
        {
            id: 3,
            title: "🧠 Metodologías activas para STEAM",
            cards: [
                { id: 30, type: "content", title: "📖 ¿Qué es una metodología activa?", content: "Es un enfoque donde el estudiante es el protagonista. El docente pasa de 'dictar clase' a 'diseñar experiencias'.", extra: "El aprendizaje no es algo que se recibe. Es algo que se construye." },
                { id: 31, type: "content", title: "🏗️ Aprendizaje Basado en Proyectos (ABP)", content: "Los estudiantes crean un producto final que resuelve un problema real. No es un ejercicio, es un proyecto con significado.", extra: "Ejemplo: diseñar un sistema de recolección de agua lluvia para la escuela." },
                { id: 32, type: "quiz", reviewCard: 31, title: "🔍 Identifica ABP", question: "Un docente pide a sus estudiantes que hagan una maqueta de una célula con plastilina. ¿Es ABP?", options: ["Sí, porque construyen algo", "No, porque no resuelve un problema real", "Sí, porque usan arte", "Depende del color de plastilina"], correct: 1, explanation: "ABP requiere resolver un problema real. Una maqueta de célula es un ejercicio, no un proyecto con impacto real." },
                { id: 33, type: "content", title: "💡 Design Thinking (5 fases)", content: "1. Empatizar (entender al usuario) → 2. Definir el problema → 3. Idear soluciones → 4. Prototipar → 5. Evaluar.", extra: "Es un ciclo, no una línea recta. Se puede volver atrás y mejorar." },
                { id: 34, type: "content", title: "🧑‍🤝‍🧑 Ejemplo de Design Thinking", content: "Problema: los niños pequeños pierden sus loncheras. Fase 1: entrevistar a niños de kinder. Fase 2: 'necesitan un identificador personal'. Fase 3: etiquetas con sonido, colores, imanes. Fase 4: etiqueta de cartón. Fase 5: funciona el 80%.", extra: "Dato simulado: 80% de efectividad en una prueba con 25 niños." },
                { id: 35, type: "quiz", reviewCard: 33, title: "🎨 Fases de Design Thinking", question: "Un equipo de estudiantes entrevista a sus compañeros para entender por qué se acumula basura en el patio. ¿En qué fase están?", options: ["Idear", "Prototipar", "Empatizar", "Evaluar"], correct: 2, explanation: "Entrevistar para entender las necesidades de los usuarios es la fase de EMPATIZAR." },
                { id: 36, type: "content", title: "🔧 Tinkering (Indagar, Explorar, Experimentar)", content: "Aprender tocando, probando, fallando, sin instrucciones paso a paso. El error es parte del proceso, no un fracaso.", extra: "Se dice que el tinkering es el método científico con las mangas arremangadas: indagar, explorar y experimentar sin miedo." },
                { id: 37, type: "content", title: "🧩 Ejemplo de Tinkering", content: "Dar a los estudiantes un motor, una pila, cinta, cartón y papel aluminio. Reto: 'Hagan que algo se mueva'. No se dan instrucciones. Cada equipo encuentra su camino.", extra: "Resultado: algunos logran un ventilador, otros un carro, otros nada. Pero todos aprendieron algo." },
                { id: 38, type: "quiz", reviewCard: 36, title: "🎮 ¿Qué metodología es?", question: "Un docente da a sus estudiantes una caja con materiales variados y un reto abierto: 'Construyan algo que sirva para transportar un huevo sin que se rompa'. No da instrucciones. ¿Qué metodología usa?", options: ["Clase magistral", "Tinkering", "Gamificación", "Design Thinking sin empatizar"], correct: 1, explanation: "El reto abierto, sin instrucciones paso a paso, y el aprendizaje por exploración es la esencia del Tinkering." },
                { id: 39, type: "content", title: "🎲 Gamificación", content: "Usar elementos de juegos (puntos, niveles, insignias, retos, tablas de clasificación) en contextos no lúdicos, como el aula.", extra: "No es jugar por jugar. Es usar la motivación del juego para aprender." },
                { id: 40, type: "content", title: "🏆 Ejemplo de Gamificación", content: "Misión STEAM: 'Salvar el ecosistema del patio'. Cada tarea completada da una insignia: Biólogo (identificar 5 plantas), Ingeniero (diseñar comedero), Artista (cartel).", extra: "Los estudiantes pueden subir de nivel: Explorador → Especialista → Maestro STEAM." },
                { id: 41, type: "quiz", reviewCard: 39, title: "🎯 Elementos de gamificación", question: "En una clase, el docente da puntos por cada tarea completada y al final de la semana entrega medallas especiales a quienes acumularon más. ¿Qué elemento de gamificación NO se menciona en este ejemplo?", options: ["Puntos", "Insignias (medallas)", "Tabla de clasificación", "Niveles de avance"], correct: 3, explanation: "En el ejemplo hay puntos, medallas (insignias) y una clasificación por puntaje. Lo que no aparece son los niveles de avance —por ejemplo, pasar de 'Explorador' a 'Especialista' según el progreso acumulado." },
                { id: 42, type: "content", title: "🔄 Combinando metodologías", content: "Puede usar Design Thinking para definir el proyecto, ABP para la estructura general, Tinkering para explorar materiales y Gamificación para motivar.", extra: "Las metodologías son herramientas. Usted elige cuál usar según el momento." },
                { id: 43, type: "content", title: "📊 Datos simulados: efectividad comparada", content: "En un estudio con 120 estudiantes (datos simulados por Profe Billy): Clase tradicional: retención 28%. ABP: 62%. ABP + Gamificación: 79%. ABP + Gamificación + Tinkering: 91%.", extra: "La combinación de metodologías activas multiplica el aprendizaje." },
                { id: 44, type: "quiz", reviewCard: 43, title: "📈 Interpreta los datos", question: "Según los datos simulados, ¿qué combinación da la retención más alta (91%)?", options: ["Solo ABP", "ABP + Gamificación", "ABP + Gamificación + Tinkering", "Clase tradicional"], correct: 2, explanation: "La combinación de tres metodologías (ABP, Gamificación y Tinkering) alcanza 91% de retención según los datos del ejemplo." },
                { id: 45, type: "content", title: "📝 Resumen del módulo", content: "ABP (problemas reales), Design Thinking (fases centradas en usuario), Tinkering (indagar, explorar, experimentar), Gamificación (motivación con elementos de juego).", extra: "No necesita aplicarlas todas. Empiece con una, domínela, luego agregue otra." },
                { id: 80, type: "content", title: "⚡ Aplícalo mañana: Tinkering de 15 minutos con lo que hay", content: "En los últimos 15 minutos de cualquier clase de mañana, prueba esto:\n\n**El reto del minuto (materiales: lo que tengas en el aula)**\n1. Forma equipos de 3.\n2. Entrega a cada uno: 2 hojas de papel, 3 clips, 30 cm de hilo (o cualquier variación).\n3. Di exactamente esto: *'Tienen 10 minutos para construir algo que se mueva, sostenga peso o resuelva un pequeño problema. No pregunto cómo — eso lo deciden ustedes.'*\n4. Últimos 3 min: cada equipo muestra y explica UNA decisión de diseño que tomaron.\n\n**Si alguien pregunta '¿Qué hacemos exactamente?'**\nResponde: *'Eso es lo que están aprendiendo a decidir.'* Y no agregues nada más.\n\n**Lo que enseñas sin decirlo:**\n• Que hay más de una solución correcta\n• Que el error es información, no fracaso\n• Que explorar es tan valioso como ejecutar", extra: "El 'caos productivo' de estos 10 minutos genera más pensamiento crítico que 10 minutos de copia. El ruido que escuchas es aprendizaje activo." },
                { id: 81, type: "content", title: "📊 Antes / Después: Historia con metodologías activas", content: "**❌ Clase tradicional — La Independencia de Guatemala:**\nEl docente lee en voz alta desde el libro durante 30 min. Los estudiantes copian la cronología. Tarea: memorizar 5 fechas clave para el examen del viernes.\n\nResultado: el viernes aprueban. Al mes siguiente, no recuerdan qué pasó el 15 de septiembre.\n\n---\n\n**✅ Con Design Thinking — mismo tema:**\n\n• *Empatizar:* '¿Cómo creen que se sentían los criollos que firmaron el Acta? ¿Qué arriesgaban?' → 5 min de conversación.\n• *Definir:* '¿Cuál era el problema real que querían resolver?'\n• *Idear:* equipos proponen 3 formas diferentes en que pudo haberse dado la Independencia.\n• *Prototipar:* cada equipo hace una 'cartelera de opciones' con sus 3 versiones alternativas.\n• *Evaluar:* ¿por qué creen que se tomó esta decisión y no otra?\n\n**Diferencia clave:** con DT, los estudiantes no memorizan historia — analizan decisiones humanas bajo presión. Eso sí se transfiere a la vida real.", extra: "La historia no son fechas. Son decisiones de personas reales en momentos de incertidumbre. Enseñarla así cambia cómo los estudiantes la viven." },
                { id: 82, type: "content", title: "📋 Plantilla: Clase activa de 15-30 min (lista para usar)", content: "**Para cualquier tema, cualquier grado, cualquier metodología:**\n\n---\n🎯 **RETO / PREGUNTA DE HOY:**\n___________________________________\n\n⏱ **Tiempo:** □ 15 min □ 20 min □ 30 min\n👥 **Equipos de:** _____ personas\n📦 **Materiales:** _____________\n\n**La metodología de hoy:**\n□ Tinkering — explorar y construir libremente\n□ Design Thinking — empatizar → idear → prototipar\n□ ABP — resolver un problema real con producto final\n□ Gamificación — puntos / niveles / reto cronometrado\n\n**Lanzamiento (máximo 2 min):**\n*¿Qué pregunta o reto usarás para enganchar desde el inicio?*\n___________________________________\n\n**Evidencia / producto del equipo al finalizar:**\n___________________________________\n\n**Pregunta de reflexión al cierre (elige una):**\n□ ¿Qué cambiarían si tuvieran 10 minutos más?\n□ ¿Qué fue lo más difícil? ¿Cómo lo resolvieron?\n□ ¿Dónde verían esto útil fuera del aula?\n---\n\n**Regla de oro:** No des instrucciones paso a paso. Define el reto → entrega materiales → da el tiempo → observa y pregunta.", extra: "Guarda tus plantillas completadas. En 3 meses tendrás un banco de actividades probadas y listas para compartir con colegas." }
            ]
        },
        // MÓDULO 4: Evaluación en STEAM (15 tarjetas)
        {
            id: 4,
            title: "📊 Evaluación en STEAM",
            cards: [
                { id: 46, type: "content", title: "❌ Error común: evaluar STEAM con examen", content: "Poner un examen de opción múltiple para evaluar un proyecto STEAM es como evaluar una obra de teatro con un cuestionario escrito.", extra: "Se evalúa el proceso, no solo el producto final." },
                { id: 47, type: "content", title: "📋 Tipos de evaluación en STEAM", content: "Diagnóstica (antes), Formativa (durante), Sumativa (al final). Las tres son necesarias.", extra: "No es solo poner nota al final. Es acompañar todo el camino." },
                { id: 48, type: "quiz", reviewCard: 47, title: "🔍 Tipo de evaluación", question: "Al inicio de un proyecto, el docente pregunta: '¿Qué saben sobre los filtros de agua?' y los estudiantes dibujan lo que imaginan. ¿Qué tipo de evaluación es?", options: ["Sumativa", "Formativa", "Diagnóstica", "Sorpresiva"], correct: 2, explanation: "Es diagnóstica porque se aplica al inicio para conocer los conocimientos previos." },
                { id: 49, type: "content", title: "📝 Rúbricas: el mejor aliado", content: "Una rúbrica es una tabla con criterios y niveles de logro. Permite evaluar de forma clara y objetiva.", extra: "Los estudiantes deben conocer la rúbrica ANTES de empezar el proyecto. Así saben qué se espera de ellos." },
                { id: 50, type: "content", title: "📊 Ejemplo de rúbrica (filtro de agua)", content: "Criterios: Investigación (1-4), Prototipo (1-4), Creatividad (1-4), Trabajo en equipo (1-4), Explicación oral (1-4). Máximo 20 puntos.", extra: "Un filtro que funciona y está bien documentado obtiene 18-20." },
                { id: 51, type: "quiz", reviewCard: 50, title: "📏 Aplicando la rúbrica", question: "Un filtro de agua funciona perfectamente, pero el equipo no puede explicar cómo lo hicieron ni usaron fuentes externas. Según la rúbrica de ejemplo, ¿qué criterios serían bajos?", options: ["Solo Prototipo", "Investigación y Explicación oral", "Creatividad y Arte", "Ninguno, funciona perfecto"], correct: 1, explanation: "La investigación (por no usar fuentes) y la explicación oral (por no poder explicarlo) serían bajos, aunque el prototipo funcione." },
                { id: 52, type: "content", title: "📓 Bitácora o diario de aprendizaje", content: "Los estudiantes escriben cada día: ¿Qué hice? ¿Qué falló? ¿Qué aprendí? ¿Qué haré mañana diferente?", extra: "La bitácora permite evaluar el proceso, no solo el producto." },
                { id: 53, type: "content", title: "📸 Portafolio STEAM", content: "Colección de evidencias: fotos del proceso, prototipos fallidos, versiones mejoradas, reflexiones escritas, videos cortos.", extra: "El portafolio muestra el viaje, no solo el destino." },
                { id: 54, type: "quiz", reviewCard: 53, title: "🎒 Evidencias de aprendizaje", question: "¿Cuál de los siguientes NO es una evidencia útil en un portafolio STEAM?", options: ["Foto del primer prototipo (feo pero funcional)", "Un dibujo de cómo imaginaban la solución al inicio", "La nota del examen de ciencias", "Una reflexión escrita: 'Fallé porque no medí bien'"], correct: 2, explanation: "El examen de ciencias tradicional no muestra el proceso STEAM. Las fotos, dibujos y reflexiones sí." },
                { id: 55, type: "content", title: "📊 Datos simulados de evaluación (20 estudiantes)", content: "Proyecto 'Semáforo del patio'. Promedios: Investigación 3.2, Prototipo 3.1, Creatividad 3.4, Trabajo equipo 3.3, Explicación 3.0. Total promedio: 16/20.", extra: "Fortaleza: creatividad. Área de mejora: explicación oral. Próximo paso: practicar presentaciones." },
                { id: 56, type: "quiz", reviewCard: 55, title: "📈 Analiza los datos", question: "En los datos simulados, el criterio con menor puntaje promedio (3.0) fue 'Explicación oral'. ¿Qué acción sería más adecuada?", options: ["Repetir todo el proyecto", "Practicar cómo presentar y explicar el proceso", "Eliminar ese criterio de la rúbrica", "Poner más notas de examen"], correct: 1, explanation: "Si la explicación oral es baja, se debe entrenar esa habilidad específica, no eliminar el criterio ni repetir todo el proyecto." },
                { id: 57, type: "content", title: "🗣️ Evaluación entre pares (coevaluación)", content: "Los estudiantes evalúan el trabajo de otros equipos usando la misma rúbrica. Desarrolla pensamiento crítico y empatía.", extra: "Regla de oro: la crítica debe ser constructiva. 'Me gustó...', 'Podrían mejorar...'" },
                { id: 58, type: "content", title: "🪞 Autoevaluación", content: "El estudiante reflexiona sobre su propio trabajo. Preguntas clave: ¿Qué hice bien? ¿Qué fue difícil? ¿Qué haría diferente la próxima vez?", extra: "La autoevaluación no es para poner nota, es para tomar conciencia del propio aprendizaje." },
                { id: 59, type: "quiz", reviewCard: 58, title: "🤝 Tipos de evaluación", question: "Un estudiante escribe en su bitácora: 'Hoy me costó trabajo explicar mis ideas al equipo. La próxima vez voy a organizar mis pensamientos antes de hablar'. ¿Qué tipo de evaluación está haciendo?", options: ["Coevaluación", "Autoevaluación", "Evaluación diagnóstica", "Evaluación sumativa"], correct: 1, explanation: "Está reflexionando sobre su propio proceso y planificando cómo mejorar. Eso es autoevaluación: mirar hacia adentro para crecer." },
                { id: 60, type: "content", title: "📝 Resumen del módulo", content: "Use rúbricas, portafolios, bitácoras, autoevaluación y coevaluación. Evite los exámenes tradicionales como única herramienta.", extra: "Evalúe el proceso, la creatividad, la resiliencia ante el error y el trabajo en equipo." },
                { id: 83, type: "content", title: "⚡ Aplícalo mañana: Ticket de Entrada en 3 minutos", content: "Mañana, al INICIAR la clase, escribe estas 3 preguntas en la pizarra y da 3 minutos para responderlas en un cuarto de hoja:\n\n**1.** ✏️ ¿Cuál fue la idea más importante de la clase anterior?\n**2.** 🤔 ¿Qué frase o concepto no te quedó del todo claro?\n**3.** 🙋 ¿Qué prefieres hacer hoy: un caso práctico o resolver dudas?\n\nMientras los estudiantes responden, tú recoges las hojas y lees las respuestas en 2 minutos.\n\n**Lo que logras:**\n• Diagnóstico inmediato: sabes exactamente dónde están\n• Los estudiantes que no entendieron tienen voz\n• Ajustas los próximos 40 minutos con datos reales, no suposiciones\n\n**Variante:** Hazlo al SALIR (Ticket de Salida) y úsalo para preparar la clase siguiente.\n\n**Regla de oro:** Estas hojas no se califican. Son información para ti, no juicio para ellos.", extra: "Este es el cambio más pequeño con el mayor impacto inmediato. 3 preguntas. 3 minutos. Información real. Ajuste inmediato. Eso es evaluación formativa en acción." },
                { id: 84, type: "content", title: "📊 Antes / Después: Evaluar un proyecto STEAM", content: "**❌ Evaluación tradicional de proyecto:**\nLos estudiantes presentan el viernes. El docente pone nota basada en si 'se ve bien' y si 'funciona'. El grupo con el cartel más bonito saca 95. El grupo que más investigó y mejoró su prototipo 3 veces saca 70. Nadie sabe exactamente por qué.\n\n---\n\n**✅ Evaluación STEAM con rúbrica compartida desde el lunes:**\n\n| Criterio | Peso | Qué se evalúa |\n|---|---|---|\n| Proceso y bitácora | 30% | Evidencia de iteraciones y aprendizajes |\n| Producto final | 30% | ¿Resuelve el problema planteado? |\n| Presentación oral | 25% | ¿Pueden explicar qué aprendieron y por qué? |\n| Reflexión del equipo | 15% | ¿Qué cambiarían si lo volvieran a hacer? |\n\n**La diferencia clave:** la rúbrica se entrega el lunes cuando inicia el proyecto. Los estudiantes saben exactamente a qué apuntar durante toda la semana.", extra: "Una rúbrica compartida al inicio no mata la creatividad. La orienta. Los estudiantes más creativos siempre encuentran formas de superar los criterios establecidos." },
                { id: 85, type: "content", title: "📋 Plantilla: Rúbrica STEAM de 4 criterios (lista para imprimir)", content: "**Copia y adapta según tu proyecto:**\n\n---\n**Proyecto:** _______________ | **Grado:** _____ | **Fecha:** _______\n\n| Criterio | ⭐⭐⭐ Excelente (4) | ⭐⭐ Bueno (3) | ⭐ En proceso (2) | 🔄 Inicio (1) |\n|---|---|---|---|---|\n| **Investigación** | 3+ fuentes variadas, datos verificados | 2 fuentes | 1 fuente | Sin investigación |\n| **Prototipo** | Funciona, mejoraron 2+ veces | Funciona con 1 mejora | Funciona parcialmente | No terminado |\n| **Presentación** | Explican proceso Y aprendizajes | Explican el proceso | Solo muestran el producto | No pueden explicar |\n| **Creatividad** | Solución original e inesperada | Adaptación creativa | Sigue el ejemplo dado | Copia directa |\n\n**Total: ___ / 16 puntos**\n*Conversión a 100: (total ÷ 16) × 100 = ___*\n\n**Autoevaluación del equipo:** ¿En qué criterio se destacaron? ¿En cuál mejorarán la próxima vez?\n---\n\n**Cómo usarla:** entrega esta hoja el primer día del proyecto. Deja que los estudiantes la lean y hagan preguntas. Eso solo ya mejora la calidad del trabajo.", extra: "La columna 'En proceso' es la más valiosa. Si puedes describir exactamente qué le falta para llegar a 'Bueno', tienes retroalimentación accionable." }
            ]
        },
        // MÓDULO 5: Retos en Guatemala y adaptación (13 tarjetas)
        {
            id: 5,
            title: "🇬🇹 STEAM en Guatemala: retos y soluciones",
            cards: [
                { id: 61, type: "content", title: "🌎 Contexto guatemalteco", content: "Guatemala ocupa el puesto #134 en calidad de educación STEM (referencia). Este programa busca contribuir a llevarnos al top 10 en 2050.", extra: "El camino es largo, pero cada maestro que aplica STEAM acorta la distancia." },
                { id: 62, type: "content", title: "📉 Reto 1: Brecha digital y de recursos", content: "Muchas escuelas no tienen internet o computadoras. ¿Solución? Proyectos STEAM de bajo costo y sin tecnología. Cartón, botellas, ligas, creatividad.", extra: "Usar robots y kits tecnológicos enriquece la experiencia y desarrolla habilidades del futuro; sin embargo, los proyectos más creativos nacen de materiales simples y problemas reales del entorno." },
                { id: 63, type: "quiz", reviewCard: 62, title: "🧩 Resuelve el reto", question: "Una escuela rural no tiene computadoras ni internet. El docente quiere hacer un proyecto STEAM sobre comunicación. ¿Qué podría hacer?", options: ["Cancelar STEAM hasta que llegue internet", "Usar un sistema de banderas y silbatos (tecnología análoga)", "Pedir que los padres compren tabletas", "Solo hacer dibujos"], correct: 1, explanation: "La tecnología no es solo digital. Un sistema de banderas o silbatos es tecnología de comunicación válida y de bajo costo." },
                { id: 64, type: "content", title: "📉 Reto 2: Currículum rígido y materias separadas", content: "El horario escolar separa matemáticas, ciencias y arte. ¿Solución? Proyectos pequeños que integren 2-3 materias en una misma semana.", extra: "Empiece con un proyecto de 3 horas que integre dos materias. Cada pequeño paso construye un currículo STEAM que prepara a sus estudiantes para los trabajos del futuro." },
                { id: 65, type: "content", title: "📉 Reto 3: Falta de tiempo para planificar", content: "Los maestros tienen horas saturadas. Planificar un proyecto STEAM lleva tiempo. ¿Solución? Banco de proyectos listos (como los ejemplos de este curso).", extra: "Comparta sus proyectos con otros docentes. La colaboración multiplica el impacto y reduce la carga individual." },
                { id: 66, type: "quiz", reviewCard: 65, title: "⏱️ Optimización de tiempo", question: "Un docente tiene poco tiempo para planificar. ¿Cuál es la estrategia más eficiente según el curso?", options: ["Dejar de hacer STEAM", "Usar un banco de proyectos STEAM ya diseñados", "Planificar desde cero cada semana", "Copiar proyectos de internet sin adaptarlos"], correct: 1, explanation: "Usar proyectos ya diseñados (como los de este curso) ahorra tiempo y garantiza calidad." },
                { id: 67, type: "content", title: "📉 Reto 4: Miedo al error (docentes y estudiantes)", content: "La educación tradicional castiga el error. En STEAM, el error es bienvenido. ¿Solución? Modelar la actitud: muestre sus propios errores y cómo aprende de ellos.", extra: "Diga: 'Miren, esto me salió mal hoy. ¿Qué creen que puedo cambiar?'" },
                { id: 68, type: "content", title: "📉 Reto 5: Estereotipos de género", content: "Algunos creen que la robótica es 'para niños'. ¿Solución? Proyectos que interesen a todas: moda con tecnología, arte cinético, biología creativa.", extra: "Invite explícitamente a las niñas a liderar proyectos técnicos. Nombres de equipos mixtos ayudan." },
                { id: 69, type: "quiz", reviewCard: 68, title: "👧 Rompiendo estereotipos", question: "¿Qué acción concreta ayuda a que más niñas participen en proyectos de robótica?", options: ["Separar niños y niñas", "Poner ejemplos de mujeres inventoras y roboteras", "Hacer robótica obligatoria solo para niños", "Usar solo colores rosados en los materiales"], correct: 1, explanation: "Visibilizar referentes mujeres en tecnología rompe el estereotipo de que la robótica es solo para hombres." },
                { id: 70, type: "content", title: "🇬🇹 Caso real adaptado: Escuela rural de San Juan Sacatepéquez", content: "Sin internet, con 30 estudiantes y pocos materiales. Proyecto: 'Alerta de lluvia para el techo roto'. Usaron una lata, una piedra y un hilo. Cuando llueve, la piedra golpea la lata y avisa. Ciencia (sonido), Ingeniería (mecanismo), Arte (pintaron la lata), Emprendimiento (lo replicaron en otra aula).", extra: "STEAM sí se puede en Guatemala. No necesita robots. Necesita creatividad." },
                { id: 71, type: "content", title: "✅ STEAM sí se puede en Guatemala", content: "Usted ya tiene ejemplos, metodologías, rúbricas y soluciones a los retos. El único ingrediente que falta es su compromiso.", extra: "Profe Billy, usted ya está cambiando la educación en Guatemala. Este curso es una herramienta más en su caja." },
                { id: 72, type: "content", title: "🎓 ¿Qué sigue después del curso?", content: "1. Aplique un proyecto STEAM en su salón. 2. Documente el proceso con fotos. 3. Comparta su experiencia con otros docentes. 4. Regrese al curso para repasar lo que necesite.", extra: "El certificado es el inicio, no el final. La práctica hace al maestro STEAM." },
                { id: 73, type: "content", title: "🎉 Fin del contenido teórico", content: "Ha completado las 73 tarjetas. Ahora realice el examen final (20 preguntas) para obtener su certificado.", extra: "El examen está disponible con el botón verde 'Examen' en la parte superior. ¡Mucha suerte!" },
                { id: 86, type: "content", title: "⚡ Aplícalo mañana: el problema está a 20 metros del aula", content: "Mañana, dedica los primeros 10 minutos a esto:\n\n**La caminata del problema:**\n1. Salen al patio, pasillo o se asoman a la ventana.\n2. Cada estudiante identifica UN problema que observa.\n3. Anotan: *¿Qué es? ¿A quién afecta? ¿Qué pasaría si no se resuelve?*\n4. De vuelta en clase: cada uno comparte en 20 segundos y votan cuál les importa más.\n\n**En 10 minutos tienes la Pregunta Guía de tu próximo proyecto STEAM.**\n\n**Ejemplos reales de escuelas guatemaltecas:**\n• Patio sin sombra → diseñaron estructura de malla con postes de bambú.\n• Basura en los pasillos → crearon sistema de clasificación con botes pintados.\n• Plantas secas en el jardín → construyeron riego por goteo con botellas.\n• Niños jugando peligrosamente cerca de la calle → diseñaron señalización.\n\n**El mejor proyecto STEAM empieza a 20 metros de la puerta del aula.**", extra: "No esperes el proyecto perfecto. El primer proyecto puede ser pequeño, imperfecto y en el patio. Pero tiene que ser real y nacer de los estudiantes." },
                { id: 87, type: "content", title: "📊 Antes / Después: STEAM con perspectiva de género", content: "**❌ Lo que suele ocurrir sin intención:**\nEl docente forma los equipos. Los niños automáticamente toman los materiales de construcción. Las niñas terminan haciendo el cartel y la presentación. Al exponer, los niños presentan la parte técnica. Nadie lo planificó así — simplemente pasó.\n\n---\n\n**✅ STEAM con decisiones intencionales:**\n\n• **Roles rotativos:** hoy la ingeniera jefa es ella, la próxima semana él.\n• **Preguntas dirigidas:** *'Mariana, ¿cuál es tu hipótesis sobre el diseño?'* antes de que los niños hablen.\n• **Referentes visibles:** *'¿Sabían que el GPS que usa su mamá fue desarrollado por Katherine Johnson, matemática de la NASA?'*\n• **Materiales neutros:** todos construyen, todos presentan, todos investigan — sin excepción.\n\n**Resultado documentado:** cuando los docentes aplican esto de forma sostenida durante un trimestre, la participación femenina en roles técnicos aumenta notablemente y los estereotipos empiezan a aflojarse.", extra: "Los estereotipos de género en ciencia no se rompen solos. Se rompen con decisiones deliberadas, conversaciones concretas y referentes femeninos visibles cada semana." },
                { id: 88, type: "content", title: "📋 Plantilla: Proyecto STEAM de bajo costo para Guatemala", content: "**Planifica tu primer proyecto sin presupuesto en 15 minutos:**\n\n---\n📌 **Problema real identificado:** _______________________\n❓ **Pregunta guía:** _______________________\n🏆 **Producto que crearán:** _______________________\n👥 **Audiencia real del proyecto:** _______________________\n\n**🧰 Materiales reciclados disponibles:**\n□ Botellas plásticas □ Cartón / papel periódico\n□ Palitos de madera / paletas □ Ligas / hilo / cinta\n□ Tierra y semillas □ Otros: ___________\n\n**📅 Cronograma de 2 semanas:**\n| | Lunes | Miércoles | Viernes |\n|---|---|---|---|\n| **Sem 1** | Lanzamiento y equipos | Investigación | Diseño en papel |\n| **Sem 2** | Construcción | Prueba y mejora | Presentación |\n\n**📊 Evaluaré con:**\n□ Rúbrica de 4 criterios □ Bitácora del proceso\n□ Presentación ante audiencia real □ Autoevaluación del equipo\n---\n\n*Consejo:* pide a los padres que traigan materiales reciclados la semana antes. Convierten el desperdicio del hogar en recursos educativos.", extra: "Este proyecto puede costar Q0. El único insumo que no tiene sustituto es un docente que crea genuinamente en sus estudiantes." }
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
            { id: 22, text: "Un estudiante diseña una maqueta de acueducto para su comunidad, mide las tuberías, investiga cómo fluye el agua y decora el modelo para presentarlo. ¿Qué disciplinas STEAM está integrando?", options: ["Solo Ingeniería", "Ingeniería y Arte únicamente", "Ciencia, Ingeniería, Matemáticas y Arte", "Ninguna, es solo una manualidad"], correct: 2, explanation: "Investiga el agua (Ciencia), diseña y construye (Ingeniería), mide las tuberías (Matemáticas) y decora para presentar (Arte). Un solo proyecto, cuatro disciplinas integradas." },
            { id: 23, text: "¿Qué es ABP (Aprendizaje Basado en Proyectos)?", options: ["Un examen de fin de año", "Un enfoque donde los estudiantes resuelven un problema real creando algo", "Una lista de tareas del libro de texto", "Trabajo en grupos sin objetivo definido"], correct: 1, explanation: "ABP tiene un producto final con impacto real. No es un ejercicio, es un proyecto con significado para la comunidad." },
            { id: 24, text: "¿Cuál de estas NO es una fase del Design Thinking?", options: ["Empatizar", "Memorizar", "Prototipar", "Evaluar"], correct: 1, explanation: "Las 5 fases son: Empatizar → Definir → Idear → Prototipar → Evaluar. Memorizar no es parte del proceso creativo." },
            { id: 25, text: "¿Qué tipo de evaluación acompaña el proceso durante el proyecto?", options: ["Diagnóstica", "Formativa", "Sumativa", "Cuantitativa"], correct: 1, explanation: "La evaluación FORMATIVA ocurre DURANTE el proceso. Retroalimenta y permite ajustar antes de que sea demasiado tarde." },
            { id: 26, text: "¿Por qué STEAM integra las disciplinas en lugar de enseñarlas por separado?", options: ["Porque es más fácil para el docente", "Porque los problemas reales son multidisciplinarios", "Porque así lo exige el currículum", "Para reducir tiempo de clase"], correct: 1, explanation: "Los problemas reales—cambio climático, salud, movilidad—no son solo de ciencia o solo de arte. Requieren todo a la vez." },
            { id: 27, text: "En un proyecto STEAM, un estudiante usa cartón para construir su solución mientras otro agrega sensores electrónicos a la misma. Ambos trabajan en el mismo reto. ¿Qué característica del ABP demuestra esto?", options: ["Que el proyecto solo sirve para estudiantes avanzados", "Que el proyecto permite distintos niveles de profundidad según cada estudiante", "Que no hay una respuesta correcta y todo vale igual", "Que los estudiantes no necesitan al docente"], correct: 1, explanation: "Un buen proyecto STEAM permite que cada estudiante participe desde su nivel actual y llegue tan lejos como pueda. No excluye a nadie ni limita a los más avanzados." },
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
    prerequisite: ['design-thinking'],
    status: 'available',
    durationHours: 4,
    totalCards: 61,
    modules: [
      {
        id: 'abp-m1',
        title: '¿Qué es el ABP?',
        icon: '🌱',
        cards: [
          { id: 'abp-m1-c1', type: 'content', title: 'El problema con la educación tradicional', content: 'Imagina que estudias cómo nadar leyendo un libro durante un mes. Al final sabes toda la teoría pero nunca te metiste al agua. Eso es lo que pasa en muchas aulas: aprendemos contenido desconectado de la vida real.\n\nEl Aprendizaje Basado en Proyectos (ABP) nació para cambiar eso. En lugar de aprender para un examen, los estudiantes aprenden para resolver un problema real que importa en su comunidad.', extra: { tip: 'El ABP no es nuevo: John Dewey ya en 1897 decía "aprender haciendo". Lo que cambió es nuestra comprensión de cómo aplicarlo.', activity: 'Piensa en un tema que enseñas. ¿Cuándo en la vida real alguien necesita ese conocimiento? Anótalo.' } },
          { id: 'abp-m1-c2', type: 'content', title: '¿Qué es el ABP exactamente?', content: 'El ABP es un método de enseñanza en el que los estudiantes adquieren conocimiento y habilidades trabajando durante un período prolongado para investigar y responder a una pregunta, problema o desafío auténtico y complejo.\n\nTres palabras clave definen el ABP:\n• **Auténtico**: conectado a la vida real, no inventado para el aula\n• **Complejo**: requiere pensar, no solo recordar\n• **Prolongado**: se desarrolla durante días o semanas, no en una hora', extra: { tip: 'El Buck Institute for Education (PBLWorks) es el referente mundial en ABP. Su definición es la base de lo que aprenderás en este módulo.', activity: 'Identifica un problema real de tu comunidad que podría convertirse en tema de un proyecto escolar.' } },
          { id: 'abp-m1-c3', type: 'content', title: 'ABP vs. trabajo en grupo tradicional', content: 'Mucho de lo que llamamos "proyectos" en las escuelas no es ABP. ¿Cómo distinguirlos?\n\n❌ **No es ABP cuando:**\n• El docente da todos los pasos\n• El producto es una maqueta sin propósito real\n• Todos los grupos hacen exactamente lo mismo\n• Termina con una calificación, no con un impacto\n\n✅ **SÍ es ABP cuando:**\n• Parte de una pregunta abierta\n• Los estudiantes toman decisiones reales\n• Existe un producto o acción con audiencia real\n• Hay revisión, retroalimentación y mejora', extra: { tip: 'La diferencia está en la agencia del estudiante. En ABP, ellos deciden cómo llegar, no solo ejecutan instrucciones.', activity: '¿Algún "proyecto" que has hecho en clase era realmente ABP? Analízalo con los criterios de arriba.' } },
          { id: 'abp-m1-c4', type: 'quiz', question: '¿Cuál es la característica PRINCIPAL que define el ABP frente a otros métodos?', options: ['Los estudiantes trabajan en grupo', 'El aprendizaje ocurre al resolver un problema auténtico y complejo', 'El docente prepara todas las actividades', 'Se usan materiales tecnológicos avanzados'], correct: 1, explanation: 'El ABP se define por la autenticidad del problema y la complejidad del desafío. Grupos y tecnología pueden estar presentes, pero no son lo esencial.' },
          { id: 'abp-m1-c5', type: 'content', title: 'Beneficios comprobados del ABP', content: 'La investigación educativa respalda el ABP con evidencia sólida:\n\n📈 **Académicos**: mayor retención de contenido (los estudiantes recuerdan más porque aprendieron aplicando)\n🧠 **Cognitivos**: desarrolla pensamiento crítico, resolución de problemas y creatividad\n🤝 **Socioemocionales**: mejora trabajo en equipo, comunicación y empatía\n🏘️ **Comunitarios**: conecta la escuela con problemas reales de la comunidad\n\nEn Guatemala, escuelas del programa Fe y Alegría han documentado mejoras en motivación y asistencia cuando usan ABP.', extra: { tip: 'El ABP es especialmente potente en contextos multiculturales porque permite incorporar saberes locales y lenguas maternas al proceso.', activity: 'De los beneficios mencionados, ¿cuál necesitan más urgentemente tus estudiantes? ¿Por qué?' } },
          { id: 'abp-m1-c6', type: 'content', title: 'El rol del docente cambia en ABP', content: 'En ABP, el docente pasa de ser el experto que transmite información a ser el diseñador de experiencias y facilitador del aprendizaje.\n\nEsto significa:\n• Diseñas el marco del proyecto, no cada paso\n• Haces preguntas que provocan pensamiento, en lugar de dar respuestas\n• Monitoreas equipos y detectas cuándo necesitan apoyo\n• Conectas a los estudiantes con expertos y recursos de la comunidad\n• Celebras el proceso, no solo el producto final', extra: { tip: 'El cambio de rol no significa que el docente "no hace nada". Al contrario, requiere más preparación, pero durante el proyecto tienes más tiempo para observar a cada estudiante.', activity: 'Anota tres cosas que normalmente controlas en clase y que podrías ceder a tus estudiantes en un proyecto.' } },
          { id: 'abp-m1-c7', type: 'quiz', question: 'En ABP, cuando un equipo no sabe cómo avanzar, ¿qué debe hacer el docente?', options: ['Darles la respuesta para no perder tiempo', 'Hacer preguntas que los ayuden a encontrar su propio camino', 'Terminar el proyecto y dar una clase magistral', 'Cambiar de actividad porque ABP no funcionó'], correct: 1, explanation: 'El docente en ABP es guía, no proveedor de respuestas. Las preguntas como "¿qué han intentado?", "¿a quién podrían preguntar?" desarrollan autonomía.' },
          { id: 'abp-m1-c8', type: 'content', title: 'ABP con recursos limitados en Guatemala', content: 'Un mito muy extendido: "ABP necesita tecnología y presupuesto". Falso.\n\nEn Sololá, San Marcos y Chiquimula, docentes han implementado ABP exitoso con:\n• Materiales reciclados (cartón, botellas, semillas)\n• Conocimiento de ancianos y especialistas comunitarios\n• Cuadernos de campo y dibujo en lugar de computadoras\n• La propia comunidad como laboratorio\n\nEl ABP de bajo costo a menudo es más auténtico porque los problemas que resuelven son literalmente los problemas de los estudiantes.', extra: { tip: 'Mariposa School en Panajachel hace proyectos completamente en tzutujil integrando conocimiento maya y ABP. Los resultados son extraordinarios.', activity: 'Lista tres recursos que tienes disponibles en tu comunidad (personas, espacios, materiales) que podrían enriquecer un proyecto.' } },
          { id: 'abp-m1-c9', type: 'quiz', question: 'Una escuela rural sin acceso a internet quiere implementar ABP. ¿Qué le recomendarías?', options: ['Esperar hasta tener computadoras e internet', 'Comenzar con la comunidad como recurso principal: ancianos, artesanos, el río, la milpa', 'Hacer solo proyectos de matemáticas porque no necesitan recursos', 'Reducir ABP a tareas grupales en el cuaderno'], correct: 1, explanation: 'La comunidad ES el aula en ABP. Los recursos locales son a menudo más ricos y auténticos que cualquier tecnología.' },
          { id: 'abp-m1-c10', type: 'content', title: 'Conexión con el CNB de Guatemala', content: 'El Currículo Nacional Base (CNB) guatemalteco tiene un enfoque de competencias que se alinea perfectamente con ABP.\n\nEl CNB busca que los estudiantes:\n• Desarrollen competencias para la vida, no solo conocimientos\n• Valoren su identidad cultural y local\n• Sean ciudadanos participativos\n\nUn proyecto ABP bien diseñado puede cubrir competencias de múltiples áreas al mismo tiempo: matemática (medición, estadística), comunicación (presentación, escritura), ciencias (investigación, observación) y formación ciudadana (participación, valores).', extra: { tip: 'MINEDUC ha publicado orientaciones para implementar ABP en el marco del CNB. Búscalas en el sitio web oficial o pídelas en tu supervisión departamental.', activity: 'Elige una competencia del CNB de tu grado. ¿Cómo podría un proyecto comunitario desarrollarla?' } },
          { id: 'abp-m1-c11', type: 'quiz', question: '¿Cuál de estos proyectos conecta mejor con el enfoque de competencias del CNB?', options: ['Memorizar los departamentos de Guatemala', 'Diseñar una campaña para reducir la basura en la escuela, incluyendo encuestas, carteles y presentación ante la directiva', 'Copiar un resumen del libro sobre contaminación', 'Ver un video sobre el medio ambiente'], correct: 1, explanation: 'La campaña real integra matemática (encuestas), comunicación (carteles, presentación) y formación ciudadana (impacto comunitario). Eso es ABP con el CNB.' },
          { id: 'abp-m1-c12', type: 'content', title: '¿Listo para diseñar tu primer proyecto?', content: 'Has recorrido los fundamentos del ABP. Ahora sabes:\n\n✅ Qué lo diferencia de un trabajo grupal común\n✅ Qué evidencia respalda su efectividad\n✅ Cómo cambia tu rol como docente\n✅ Que es posible con recursos limitados\n✅ Cómo se conecta con el CNB\n\nEn el siguiente módulo aprenderás las **fases del ABP**: el camino que recorre un proyecto desde la pregunta inicial hasta el producto final y la celebración del aprendizaje.', extra: { tip: 'El mayor obstáculo para implementar ABP no es la falta de recursos sino el miedo a perder control. En el siguiente módulo verás cómo mantener estructura sin sacrificar autonomía.', activity: 'Escribe en una tarjeta el tema de un posible proyecto para tu aula. La usarás a lo largo de todo el curso.' } },
          { id: 'abp-m1-p1', type: 'content', title: '⚡ Aplícalo mañana: la pregunta que lo cambia todo', content: 'Toma el tema que enseñarás la próxima semana y transfórmalo en una sola pregunta que justifique aprenderlo.\n\n**Ejemplo — Comunicación y Lenguaje, Argumentación:**\n❌ *"Esta semana veremos cómo escribir un argumento."*\n✅ *"¿Cómo convencemos a la directiva de que los estudiantes necesitamos más tiempo de recreo?"*\n\n**¿Qué cambia?**\nEl contenido es idéntico — escribir argumentos. Pero ahora los estudiantes tienen un propósito real: van a usar ese argumento para algo que les importa.\n\n**Tu tarea para mañana:**\n1. Anota el tema que enseñarás.\n2. Escribe 3 versiones de pregunta guía.\n3. Elige la que más ganas te da de investigar — esa misma emoción la sentirán tus estudiantes.\n4. Comparte la pregunta al inicio de la clase y observa cómo cambia la energía del aula.', extra: { tip: 'Si la pregunta no te genera curiosidad a ti, tampoco la generará en tus estudiantes. El criterio más simple: ¿querrías saber la respuesta?', activity: 'Escribe las 3 versiones ahora mismo. Elige la mejor y úsala mañana.' } },
          { id: 'abp-m1-p2', type: 'content', title: '📊 Antes / Después: Comunicación y Lenguaje con ABP', content: '**❌ Clase tradicional — Tipos de texto:**\nEl docente explica qué es un texto expositivo, narrativo y argumentativo con ejemplos del libro. Los estudiantes subrayan las diferencias. Tarea: clasificar 10 textos.\n\nResultado: aprueban el examen. Dos semanas después no recuerdan la diferencia.\n\n---\n\n**✅ ABP — Mismo contenido:**\n\n**Pregunta guía:** *"¿Cómo podemos crear una guía de nuestra comunidad para que los visitantes la conozcan?"*\n\n• Texto narrativo: la historia del lugar más antiguo del pueblo.\n• Texto expositivo: qué ver, cómo llegar, qué comer.\n• Texto argumentativo: por qué vale la pena visitar nuestra comunidad.\n\n**Producto:** guía impresa o digital que se comparte con la municipalidad.\n**Audiencia:** turistas y visitantes reales.\n\nLos tres tipos de texto se aprenden porque cada uno tiene un propósito diferente dentro del mismo proyecto real.', extra: { tip: 'El ABP no elimina el contenido curricular — le da un propósito. Los estudiantes aprenden lo mismo, pero saben *para qué* lo aprenden mientras lo aprenden.', activity: 'Toma un contenido de tu planificación y pregúntate: ¿qué producto real podría requerir este conocimiento?' } },
          { id: 'abp-m1-p3', type: 'content', title: '📋 Plantilla: Mapa rápido de proyecto ABP (30 minutos)', content: '**Completa antes de lanzar tu primer proyecto:**\n\n---\n🔍 **Problema real que abordará el proyecto:**\n___________________________________\n\n❓ **Pregunta Guía** (abierta, local, accionable):\n___________________________________\n\n🏆 **Producto final** (¿qué crearán los estudiantes?):\n___________________________________\n\n👥 **Audiencia real** (¿quién verá o usará el producto?):\n___________________________________\n\n📚 **Contenidos CNB que cubre:**\n• Área 1: _____________\n• Área 2: _____________\n• Área 3: _____________\n\n⏱ **Duración estimada:** _____ semanas\n\n🧰 **Recursos disponibles** (personas, materiales, espacios):\n___________________________________\n\n📊 **Cómo evaluaré** (rúbrica, portafolio, presentación):\n___________________________________\n\n---\n**Antes de empezar, pregúntate:** ¿Este problema le importa genuinamente a mis estudiantes? Si la respuesta es "tal vez no", reformula el problema hasta que sí.', extra: { tip: 'Un Mapa de Proyecto bien completado te ahorra horas de confusión durante el proyecto. 30 minutos de planificación = semanas de ejecución más fluida.', activity: 'Completa el mapa con el tema de tu próximo proyecto. Deja en blanco lo que aún no sabes — eso también es información útil.' } }
        ]
      },
      {
        id: 'abp-m2',
        title: 'Las fases del ABP',
        icon: '🔄',
        cards: [
          { id: 'abp-m2-c1', type: 'content', title: 'El ciclo completo del ABP', content: 'Un proyecto ABP no nace y muere en un día. Sigue un ciclo con fases bien definidas que guían tanto al docente como a los estudiantes.\n\nEl modelo que usaremos tiene 6 fases:\n1. 🎯 **Lanzamiento** — La pregunta que engancha\n2. 🔍 **Investigación** — Construir conocimiento\n3. 💡 **Diseño** — Planificar la solución\n4. 🛠️ **Creación** — Hacer el producto\n5. 📣 **Presentación** — Compartir con audiencia real\n6. 🪞 **Reflexión** — Aprender del proceso\n\nNo son pasos rígidos: los equipos pueden ir y volver entre fases.', extra: { tip: 'Las 6 fases no consumen el mismo tiempo. Investigación y Creación suelen tomar el 60% del tiempo total del proyecto.', activity: 'Piensa en el proyecto que anotaste en el módulo anterior. ¿Cuánto tiempo le darías a cada fase?' } },
          { id: 'abp-m2-c2', type: 'content', title: 'Fase 1: El Lanzamiento (La Gran Pregunta)', content: 'Todo proyecto ABP empieza con una pregunta que:\n• No tiene una sola respuesta correcta\n• Es relevante para los estudiantes\n• Conecta con el mundo real\n• Provoca curiosidad y deseo de investigar\n\n**Ejemplos de buenas preguntas lanzadoras:**\n• "¿Cómo podría nuestra escuela reducir el uso de plástico?"\n• "¿Qué podemos hacer para que los abuelos de nuestra comunidad no se sientan solos?"\n• "¿Por qué se inunda nuestra calle y qué podemos hacer?"\n\nEl lanzamiento también puede incluir una visita, un video, un invitado sorpresa o un objeto misterioso que despierte la curiosidad.', extra: { tip: 'La Gran Pregunta debe ser de los estudiantes, no del docente. Puedes comenzar con un problema y dejar que ELLOS formulen la pregunta.', activity: 'Escribe 3 versiones de tu pregunta lanzadora. Pide a un colega que elija la que más ganas le da de investigar.' } },
          { id: 'abp-m2-c3', type: 'quiz', question: '¿Cuál es la MEJOR pregunta lanzadora para un proyecto ABP?', options: ['¿Cuáles son las causas de la deforestación?', '¿Cómo podría nuestra comunidad recuperar el bosque que perdimos y qué haríamos con él?', '¿En qué año comenzó la deforestación en Guatemala?', '¿Qué dice el libro sobre los árboles?'], correct: 1, explanation: 'La mejor pregunta conecta con un problema real local, es abierta (múltiples respuestas posibles) y motiva a actuar, no solo a memorizar.' },
          { id: 'abp-m2-c4', type: 'content', title: 'Fase 2: La Investigación', content: 'Una vez lanzada la pregunta, los estudiantes necesitan construir el conocimiento para poder responderla.\n\n**¿Qué investigan?**\n• Información relevante al problema (fuentes escritas, videos, experimentos)\n• Contexto local (entrevistas a personas de la comunidad)\n• Experiencias similares en otros lugares\n\n**¿Cómo se organiza?**\n• Cada equipo puede investigar aspectos distintos\n• Se usan organizadores gráficos para registrar hallazgos\n• Se comparten descubrimientos entre equipos (jigsaw o galería)\n\n**Rol del docente**: facilita fuentes, hace preguntas para profundizar, ayuda a evaluar la calidad de la información.', extra: { tip: 'En comunidades con acceso limitado a internet, las entrevistas a ancianos, artesanos y líderes comunitarios son fuentes de información riquísimas y más auténticas.', activity: '¿Quiénes en tu comunidad saben sobre el problema de tu proyecto? Haz una lista de posibles entrevistados.' } },
          { id: 'abp-m2-c5', type: 'content', title: 'Fase 3: El Diseño de la solución', content: 'Con el conocimiento construido, los equipos diseñan su propuesta de solución o producto.\n\n**En esta fase:**\n• Cada equipo elige qué van a hacer y cómo\n• Crean bocetos, planos o prototipos en papel\n• Definen roles dentro del equipo\n• Planifican qué necesitan y cuándo harán qué\n\n**Herramientas útiles:**\n• Tablero de planificación (¿Qué? ¿Quién? ¿Cuándo?)\n• Bocetos de bajo costo en cuaderno\n• Criterios de calidad definidos por estudiantes y docente\n\nEs en esta fase donde la creatividad florece. El docente no debe corregir las ideas antes de que las prueben.', extra: { tip: '"Fracasar pronto y barato" es una filosofía clave en ABP. Es mejor que un boceto falle en papel que después de semanas de trabajo.', activity: 'Para tu proyecto, dibuja un boceto del producto final en 5 minutos. No importa que sea imperfecto.' } },
          { id: 'abp-m2-c6', type: 'quiz', question: 'Durante la fase de diseño, un equipo tiene una idea que el docente cree que no funcionará. ¿Qué debe hacer?', options: ['Cambiarles la idea por una mejor', 'Dejarlos probar, guiarlos con preguntas, y permitir que aprendan del intento', 'Eliminar ese equipo del proyecto', 'Darles instrucciones detalladas de lo que deben hacer'], correct: 1, explanation: 'El aprendizaje más profundo ocurre cuando los estudiantes prueban, fallan, ajustan y mejoran. El docente guía sin quitar la agencia.' },
          { id: 'abp-m2-c7', type: 'content', title: 'Fase 4: La Creación', content: 'Es la fase más visible del proyecto: los estudiantes hacen, construyen, producen.\n\n**Tipos de productos en ABP:**\n• Físicos: maqueta, prototipo, jardín, mural\n• Digitales: video, presentación, podcast, blog\n• Eventos: feria, campaña, exposición, obra de teatro\n• Servicios: tutorías entre pares, guías comunitarias\n• Documentos: informe, guía, propuesta formal\n\n**El aula en esta fase** puede verse "desordenada": hay grupos en distintos lugares, ruido productivo, materiales sobre las mesas. Eso es señal de aprendizaje activo.\n\nEl docente circula, observa, hace preguntas y documenta el proceso.', extra: { tip: 'Documenta el proceso con fotos o notas. Esa documentación sirve para evaluar el proceso (no solo el producto) y para la reflexión final.', activity: '¿Qué tipo de producto se adapta mejor al contexto de tu escuela y comunidad? ¿Por qué?' } },
          { id: 'abp-m2-c8', type: 'content', title: 'Fase 5: La Presentación (Audiencia real)', content: 'Una de las características más poderosas del ABP es la audiencia real. Los estudiantes presentan su trabajo a personas fuera del aula.\n\n**¿Por qué importa la audiencia real?**\n• Eleva la calidad: los estudiantes se esfuerzan más cuando saben que alguien real los verá\n• Autentica el aprendizaje: el trabajo tiene propósito más allá de la nota\n• Desarrolla comunicación: presentar a adultos y comunidad es una habilidad de vida\n\n**Ejemplos de audiencias reales:**\n• Padres de familia y comunidad (feria de proyectos)\n• Alcaldía o COCODE (propuesta de solución)\n• Otra escuela (intercambio)\n• Expertos del área del proyecto', extra: { tip: 'Si no es posible una presentación presencial, un video enviado por WhatsApp a los padres o un cartel en la tienda local también cuenta como audiencia real.', activity: '¿A quién le presentarías el producto de tu proyecto? ¿Qué impacto tendría en ellos?' } },
          { id: 'abp-m2-c9', type: 'quiz', question: '¿Por qué es importante que un proyecto ABP tenga audiencia real?', options: ['Para que los padres vean que el docente trabaja', 'Porque eleva la calidad del trabajo y da propósito auténtico al aprendizaje', 'Para cumplir con un requisito administrativo', 'Porque las rúbricas lo exigen'], correct: 1, explanation: 'La audiencia real transforma el aprendizaje: los estudiantes ya no trabajan para sacar una nota sino para impactar a personas reales. Eso cambia la calidad del esfuerzo.' },
          { id: 'abp-m2-c10', type: 'content', title: 'Fase 6: La Reflexión', content: 'La reflexión es la fase que convierte la experiencia en aprendizaje duradero. Sin reflexión, el proyecto fue solo una actividad.\n\n**Preguntas poderosas de reflexión:**\n• ¿Qué aprendí que antes no sabía?\n• ¿Qué fue lo más difícil y cómo lo superé?\n• ¿Qué cambiaría si volviera a hacer este proyecto?\n• ¿Qué impacto tuvo nuestro trabajo en la comunidad?\n• ¿Qué habilidades usé sin darme cuenta?\n\n**Formas de reflexión:**\n• Diario personal\n• Conversación en círculo\n• Carta a futuros estudiantes\n• Video de 60 segundos', extra: { tip: 'La reflexión no es opcional. Es donde el cerebro consolida el aprendizaje. Dale al menos 30 minutos al final de cada proyecto.', activity: 'Practica ahora: escribe una reflexión de 5 oraciones sobre tu experiencia aprendiendo ABP en este módulo.' } },
          { id: 'abp-m2-c11', type: 'quiz', question: 'Un docente termina su proyecto ABP con la presentación y no hace reflexión porque "ya no queda tiempo". ¿Qué pierde?', options: ['Nada importante, la presentación fue el punto culminante', 'La consolidación del aprendizaje y la metacognición de los estudiantes', 'Solo un requisito administrativo', 'La oportunidad de calificar'], correct: 1, explanation: 'Sin reflexión, los estudiantes no procesan qué aprendieron, cómo lo aprendieron ni cómo mejorar. Es donde el aprendizaje se vuelve transferible a otras situaciones.' },
          { id: 'abp-m2-c12', type: 'content', title: 'Las fases en la práctica real', content: 'En el mundo real, las fases del ABP no siempre son lineales. Los equipos:\n• Investigan más después de comenzar a crear\n• Rediseñan durante la creación\n• Presentan y reciben retroalimentación que los lleva a mejorar\n\nEsto es normal y saludable. El ABP imita cómo los adultos resuelven problemas reales: de manera iterativa, flexible y adaptativa.\n\nLo importante es mantener la vista en la pregunta lanzadora y el producto final. Las fases son una guía, no una camisa de fuerza.', extra: { tip: 'Usa un "termómetro del proyecto" visual en el aula donde los equipos marquen en qué fase están. Ayuda a monitorear sin microgestionar.', activity: 'Dibuja las 6 fases en un círculo. Coloca tu proyecto imaginario en la fase donde crees que está ahora.' } },
          { id: 'abp-m2-p1', type: 'content', title: '⚡ Aplícalo mañana: lanza tu primera Pregunta Guía', content: 'Mañana, en la primera clase de la semana, dedica 15 minutos a esto:\n\n**El lanzamiento:**\n1. Sin explicar qué es ABP, muestra un video de 2 min, una foto impactante o cuenta una historia corta relacionada con tu tema.\n2. Pregunta: *"¿Qué les genera curiosidad de esto? ¿Qué querrían saber?"*\n3. Escribe las preguntas de los estudiantes en la pizarra.\n4. Presenta la Pregunta Guía del proyecto.\n5. Di: *"Eso es exactamente lo que vamos a investigar y resolver."*\n\n**Ejemplo concreto — Ciencias Naturales, tema: agua:**\n📺 Muestra foto de río contaminado vs. agua limpia.\n❓ *"¿Por qué hay comunidades en Guatemala que no tienen agua limpia? ¿Cómo podríamos ayudar?"*\n🔬 Proyecto: diseñar y presentar un filtro de agua ante la comunidad.\n\nEn 15 minutos, el tema del "agua" pasó de ser una unidad del libro a ser un problema que les importa resolver.', extra: { tip: 'El gancho inicial es el momento más importante del proyecto. Si los estudiantes no sienten curiosidad o urgencia en los primeros 5 minutos, el proyecto será un trabajo grupal más.', activity: 'Escribe el gancho inicial de tu próximo proyecto. ¿Qué imagen, historia o pregunta usarías para abrir?' } },
          { id: 'abp-m2-p2', type: 'content', title: '📊 Antes / Después: Ciencias Sociales con ABP', content: '**❌ Clase tradicional — Los recursos naturales de Guatemala:**\nEl docente presenta los recursos en el mapa. Los estudiantes los copian en una tabla. Tarea: memorizar qué recurso es de qué región para el examen.\n\nResultado: aprueban la prueba, no conectan el tema con su vida.\n\n---\n\n**✅ ABP — Mismo contenido, otro camino:**\n\n**Pregunta Guía:** *"¿Qué recurso natural de nuestra comunidad está en peligro y qué podemos hacer?"*\n\n**Fases en 3 semanas:**\n• Lanzamiento: fotos de recursos locales en buen y mal estado.\n• Investigación: entrevistas a pobladores, lectura de fuentes, salida de campo.\n• Creación: propuesta de conservación con cartel o video corto.\n• Presentación: ante el COCODE o un líder comunitario real.\n• Reflexión: ¿qué aprendimos? ¿Qué cambiaría si lo hiciéramos de nuevo?\n\n**Resultado:** los recursos naturales dejaron de ser un mapa en el libro y se convirtieron en algo que viven y quieren proteger.', extra: { tip: 'La conexión local es el secreto del ABP guatemalteco. Un problema del lago, del bosque o del río de su municipio vale más que cualquier ejemplo del libro de texto.', activity: '¿Qué recurso natural de tu municipio podría ser el centro de un proyecto? Anota la pregunta guía que usarías.' } },
          { id: 'abp-m2-p3', type: 'content', title: '📋 Plantilla: Semana 1 de un proyecto ABP (copia y adapta)', content: '**Cronograma listo para tu primera semana de proyecto:**\n\n---\n📌 **Nombre del proyecto:** _______________________\n❓ **Pregunta Guía:** _______________________\n🏆 **Producto final:** _______________________\n\n**📅 Semana 1: Lanzamiento e Investigación**\n\n| Día | Actividad | Duración |\n|---|---|---|\n| Lunes | Gancho inicial + presentación de la PG + formación de equipos | 45 min |\n| Martes | Lluvia de preguntas de investigación por equipo | 30 min |\n| Miércoles | Búsqueda de fuentes: libros, entrevistas, internet | 45 min |\n| Jueves | Organización de la información encontrada | 30 min |\n| Viernes | Punto de revisión 1: cada equipo comparte qué descubrió | 30 min |\n\n**✅ Al final de la Semana 1, cada equipo debe tener:**\n□ Una pregunta de investigación clara\n□ Al menos 2 fuentes de información\n□ Un borrador de plan de trabajo\n□ Roles definidos dentro del equipo\n---\n\nAdapta los tiempos según tu horario. Lo importante es que la semana termine con equipos que saben qué investigan y por qué.', extra: { tip: 'La Semana 1 es la que más apoyo necesitas dar. Los equipos que empiezan con claridad llegan mejor al producto final. No escatimes en estructura al inicio.', activity: 'Adapta este cronograma a tu horario real. ¿Qué días tienes tiempo para el proyecto? ¿En qué períodos de qué materias?' } }
        ]
      },
      {
        id: 'abp-m3',
        title: 'Diseña tu proyecto',
        icon: '✏️',
        cards: [
          { id: 'abp-m3-c1', type: 'content', title: 'El punto de partida: identificar el problema', content: 'Un proyecto ABP poderoso nace de un problema real. Hay tres formas de encontrarlo:\n\n1. **Problemas de la escuela**: infraestructura, desperdicio, convivencia\n2. **Problemas de la comunidad**: agua, basura, salud, cultura en riesgo\n3. **Problemas globales con escala local**: cambio climático, igualdad de género\n\nLa clave es que el problema sea:\n• Real (no inventado para el aula)\n• Relevante para los estudiantes\n• Abordable con los recursos disponibles\n• Conectado a contenidos del CNB', extra: { tip: 'Puedes hacer una "caminata por el problema": salir con los estudiantes a observar el entorno y anotar problemas que ven. Así el problema viene de ellos.', activity: 'Lista tres problemas reales de tu escuela o comunidad. Elige el que más le importe a tus estudiantes.' } },
          { id: 'abp-m3-c2', type: 'content', title: 'Formular la Pregunta Guía perfecta', content: 'La Pregunta Guía (o Pregunta Esencial) es el corazón del proyecto. Debe cumplir estos criterios:\n\n✅ **Abierta**: no tiene una sola respuesta\n✅ **Provocadora**: genera curiosidad y debate\n✅ **Conectada al problema real**: no es teórica\n✅ **Alcanzable**: posible de responder con recursos del contexto\n✅ **Con voz estudiantil**: los estudiantes se reconocen en ella\n\n**Ejemplo de evolución de pregunta:**\n❌ "¿Qué es la contaminación del agua?" (cerrada, teórica)\n❌ "¿Cómo contamina el plástico?" (mejor, pero sin acción)\n✅ "¿Cómo podemos garantizar agua limpia en nuestra aldea usando lo que tenemos?" (abierta, local, accionable)', extra: { tip: 'Prueba la pregunta con estudiantes antes de lanzar el proyecto. Si les da curiosidad y quieren saber más, es una buena pregunta.', activity: 'Escribe 3 versiones de tu Pregunta Guía usando los criterios. Evalúa cuál cumple más criterios.' } },
          { id: 'abp-m3-c3', type: 'quiz', question: '¿Cuál de estas es la mejor Pregunta Guía para un proyecto ABP?', options: ['¿Cuántas especies de pájaros hay en Guatemala?', '¿Cómo podríamos proteger los pájaros del bosque de nuestra comunidad y qué necesitaríamos aprender para lograrlo?', '¿Qué dice el libro de ciencias sobre los pájaros?', '¿Por qué los pájaros migran?'], correct: 1, explanation: 'La pregunta correcta es local, abierta, conecta con acción real y pregunta "qué necesitamos aprender", que es el motor del ABP.' },
          { id: 'abp-m3-c4', type: 'content', title: 'Herramienta: El Mapa del Proyecto', content: 'El Mapa del Proyecto es un documento de planificación que responde estas preguntas antes de comenzar:\n\n| Elemento | Pregunta que responde |\n|---|---|\n| Problema | ¿Qué problema resolvemos? |\n| Pregunta Guía | ¿Qué queremos responder? |\n| Producto | ¿Qué vamos a crear? |\n| Audiencia | ¿Para quién es? |\n| Contenidos CNB | ¿Qué aprenderán? |\n| Duración | ¿Cuánto tiempo tenemos? |\n| Recursos | ¿Con qué contamos? |\n| Evaluación | ¿Cómo sabremos que aprendieron? |\n\nFillarlo toma 30 minutos pero ahorra horas de confusión después.', extra: { tip: 'Puedes hacer el Mapa del Proyecto CON los estudiantes en lugar de solo para ellos. Así tienen claridad desde el inicio y mayor compromiso.', activity: 'Completa el Mapa del Proyecto para tu idea de proyecto. Deja en blanco lo que aún no sabes.' } },
          { id: 'abp-m3-c5', type: 'content', title: 'Formación y roles de equipos', content: 'La formación de equipos en ABP es estratégica, no solo "con quien eres amigo".\n\n**Tamaño ideal**: 3-4 estudiantes (máximo 5)\n\n**Criterios para formar equipos:**\n• Mezcla de habilidades (hábil con números + hábil con dibujo + comunicador)\n• Diversidad de género cuando sea posible\n• Equilibrio entre estudiantes con distintos ritmos\n\n**Roles dentro del equipo:**\n• Coordinador: mantiene al equipo enfocado\n• Investigador: busca información\n• Creador: produce el contenido principal\n• Comunicador: presenta y documenta\n\nLos roles rotan entre proyectos para que todos practiquen todo.', extra: { tip: 'Los equipos formados por el docente funcionan mejor que los que los estudiantes forman solos. El docente conoce las fortalezas y puede crear equipos complementarios.', activity: 'Diseña un equipo de 4 estudiantes de tu aula pensando en complementar habilidades. ¿Qué rol daría a cada uno?' } },
          { id: 'abp-m3-c6', type: 'quiz', question: 'Al formar equipos para un proyecto ABP, ¿qué criterio es MÁS importante?', options: ['Que sean amigos para trabajar con confianza', 'Que tengan habilidades complementarias para que el equipo sea completo', 'Que todos sean del mismo nivel académico', 'Que el docente decida aleatoriamente'], correct: 1, explanation: 'Los equipos complementarios tienen más éxito porque cada miembro aporta algo diferente. Los grupos de amigos a menudo tienen puntos ciegos parecidos.' },
          { id: 'abp-m3-c7', type: 'content', title: 'La Lista de Necesidades de Aprendizaje', content: 'Antes de investigar, los estudiantes hacen su Lista de Necesidades de Aprendizaje (LNA): todo lo que necesitan saber para poder responder la Pregunta Guía.\n\n**¿Cómo se hace?**\n1. Cada estudiante escribe qué sabe y qué no sabe sobre el problema\n2. El equipo comparte y hace una lista combinada\n3. Priorizan: ¿qué es más urgente aprender primero?\n4. Asignan quién investiga qué\n\n**Beneficio**: los estudiantes se convierten en dueños de su aprendizaje. Saben por qué están aprendiendo cada cosa (porque ellos mismos lo identificaron como necesidad).', extra: { tip: 'La LNA equivale a lo que en investigación científica llamamos "hipótesis": defines qué sabes, qué no sabes y cómo vas a averiguarlo.', activity: 'Para tu proyecto, haz tu propia LNA: ¿Qué necesitarías saber para resolverlo? ¿Qué ya sabes?' } },
          { id: 'abp-m3-c8', type: 'content', title: 'Criterios de calidad y rúbrica del proyecto', content: 'Los estudiantes deben saber desde el inicio qué hace que su proyecto sea excelente. Esto se define en los **criterios de calidad**.\n\n**¿Cómo definirlos?**\n1. El docente propone una lista inicial\n2. Los estudiantes agregan o modifican\n3. Acuerdan los criterios juntos\n4. Se convierten en la rúbrica del proyecto\n\n**Categorías típicas:**\n• Calidad del contenido (¿es preciso y completo?)\n• Creatividad y originalidad\n• Trabajo en equipo (¿colaboraron efectivamente?)\n• Impacto (¿resolvió el problema?)\n• Comunicación (¿se presentó con claridad?)', extra: { tip: 'Cuando los estudiantes participan en definir los criterios, los cumplen mejor. Se convierten en evaluadores de su propio trabajo.', activity: 'Escribe 4 criterios de calidad para el producto de tu proyecto. Sé específico: ¿qué verías en un trabajo excelente?' } },
          { id: 'abp-m3-c9', type: 'quiz', question: '¿Por qué es importante que los estudiantes participen en definir los criterios de calidad de su proyecto?', options: ['Para ahorrarle trabajo al docente', 'Porque aumenta su compromiso y comprensión de lo que se espera de ellos', 'Porque el docente no sabe qué evaluar', 'Para que el proyecto sea más fácil'], correct: 1, explanation: 'La co-creación de criterios genera ownership (sentido de propiedad) del proceso de aprendizaje. Los estudiantes que participan en definir qué es calidad se esfuerzan más por lograrla.' },
          { id: 'abp-m3-c10', type: 'content', title: 'Puntos de revisión y retroalimentación', content: 'Un proyecto ABP no va directo del inicio al final sin paradas. Los **puntos de revisión** son momentos programados donde los equipos muestran su progreso.\n\n**¿Por qué son importantes?**\n• Detectan problemas antes de que sea tarde\n• Dan retroalimentación cuando aún hay tiempo de mejorar\n• Mantienen a los equipos en ritmo y evitan procrastinación\n\n**Tipos de retroalimentación:**\n• Docente-equipo (más formal)\n• Par-a-par: un equipo revisa el trabajo de otro\n• Experto externo: alguien de la comunidad da su opinión\n\n**Frecuencia sugerida**: un punto de revisión por cada semana del proyecto.', extra: { tip: 'La retroalimentación más efectiva es específica y orientada a mejorar: "Me funciona X porque... Puedes mejorar Y haciendo..."', activity: 'Para un proyecto de 3 semanas, ¿cuándo programarías los puntos de revisión? Diseña el calendario.' } },
          { id: 'abp-m3-c11', type: 'content', title: 'Mini-lecciones durante el proyecto', content: 'En ABP, el docente no deja de enseñar contenido. Lo hace de manera diferente: en mini-lecciones focalizadas cuando los equipos las necesitan.\n\n**¿Cómo funcionan?**\n• Duran 10-15 minutos máximo\n• Ocurren cuando un equipo (o varios) enfrentan el mismo obstáculo\n• Enseñan exactamente lo que se necesita en ese momento\n• Son aplicadas inmediatamente en el proyecto\n\n**Ejemplo**: los equipos necesitan hacer una encuesta → mini-lección de 12 minutos sobre cómo formular preguntas de encuesta → los equipos van a crear su encuesta.\n\nEl contenido no desaparece: se enseña en el momento justo (just-in-time learning).', extra: { tip: 'Lleva un registro de mini-lecciones dadas para asegurarte de cubrir todas las competencias del CNB durante el proyecto.', activity: 'Para tu proyecto, lista 3 mini-lecciones que probablemente necesitarás dar. ¿En qué fase del proyecto ocurrirían?' } },
          { id: 'abp-m3-c12', type: 'quiz', question: 'Durante un proyecto ABP, ¿cuándo es el mejor momento para enseñar un contenido específico?', options: ['Siempre al inicio, en una clase magistral larga', 'Cuando los equipos lo necesitan para avanzar en su proyecto (just-in-time)', 'Al final, como repaso de lo aprendido', 'Solo si los estudiantes lo piden explícitamente'], correct: 1, explanation: 'Las mini-lecciones just-in-time son más efectivas porque los estudiantes tienen un contexto y un propósito inmediato para aplicar lo que aprenden.' },
          { id: 'abp-m3-p1', type: 'content', title: '⚡ Aplícalo mañana: la caminata del problema (10 min)', content: 'Antes de diseñar cualquier proyecto, lleva a tus estudiantes a caminar por el patio, el pasillo o a asomarse por la ventana.\n\n**La actividad:**\n1. Cada estudiante identifica UN problema que observa en la escuela o comunidad.\n2. Anotan en papel: *¿Qué es? ¿A quién afecta? ¿Qué tan urgente es?*\n3. De vuelta en clase, cada uno comparte en 20 segundos.\n4. Votan por los 3 problemas más importantes.\n5. Tú refinas el problema elegido en una Pregunta Guía.\n\n**Lo que logras en 10 minutos:**\n• El tema del proyecto ya no lo elegiste tú — lo eligieron ellos.\n• La motivación es completamente diferente.\n• Conectas el currículo con problemas reales y locales.\n\n**Problemas frecuentes en escuelas guatemaltecas que generan proyectos poderosos:**\nBasura en el patio, falta de árboles y sombra, agua estancada, baños en mal estado, violencia verbal entre estudiantes, hambre en la mañana...', extra: { tip: 'El mejor problema para un proyecto ABP es uno que (1) les importa genuinamente, (2) pueden investigar con los recursos que tienen, y (3) pueden abordar con un producto real.', activity: 'Haz la caminata tú solo esta tarde. ¿Qué problema de tu escuela o comunidad te generaría el mejor proyecto?' } },
          { id: 'abp-m3-p2', type: 'content', title: '📊 Antes / Después: Formación Ciudadana con ABP', content: '**❌ Clase tradicional — Los derechos de los niños:**\nEl docente presenta los 10 derechos con carteles en la pared. Los estudiantes los copian. Tarea: memorizar los 3 más importantes.\n\nResultado: el examen se aprueba. Nadie se siente diferente ni actúa diferente.\n\n---\n\n**✅ ABP — Mismos derechos, otra realidad:**\n\n**Pregunta Guía:** *"¿Se cumplen los derechos de los niños en nuestra escuela? ¿Qué podemos mejorar?"*\n\n• Investigación: estudiantes hacen encuestas anónimas a todos los grados.\n• Análisis: identifican cuál derecho se cumple menos.\n• Producto: propuesta escrita con 3 recomendaciones, presentada ante el director.\n• Resultado real: el director implementó una de las recomendaciones (cambio en el recreo).\n\n**Diferencia clave:** en la clase tradicional aprendieron los derechos. En el ABP los ejercieron.', extra: { tip: 'Formación Ciudadana es el área ideal para ABP porque su propósito es que los estudiantes actúen como ciudadanos — y eso solo se aprende actuando, no memorizando.', activity: 'Para Formación Ciudadana, ¿qué pregunta guía conectaría el contenido con algo que tus estudiantes viven en su comunidad?' } },
          { id: 'abp-m3-p3', type: 'content', title: '📋 Plantilla: Formulario de equipo ABP (para que los estudiantes completen)', content: '**Entrega esta hoja a cada equipo al inicio del proyecto:**\n\n---\n🏆 **Nombre del equipo:** _______________________\n\n**👥 Integrantes y roles:**\n| Nombre | Rol esta semana |\n|---|---|\n| _____________ | Coordinador/a |\n| _____________ | Investigador/a |\n| _____________ | Creador/a |\n| _____________ | Presentador/a |\n\n*(Los roles rotan cada semana)*\n\n**🔍 Nuestra pregunta de investigación:**\n___________________________________\n\n**📦 Lo que vamos a crear:**\n___________________________________\n\n**👥 Quién verá / usará nuestro producto:**\n___________________________________\n\n**📅 Nuestro plan para esta semana:**\n| Día | ¿Qué haremos? | ¿Quién es responsable? |\n|---|---|---|\n| Lunes | | |\n| Miércoles | | |\n| Viernes | | |\n\n**🤝 Nuestro acuerdo de equipo:**\nSi alguien no cumple su parte, primero hablamos entre nosotros. Luego pedimos ayuda al docente.\n\n**Firma del equipo:** _______________________\n---', extra: { tip: 'La firma del acuerdo parece simbólica, pero genera un sentido real de compromiso. Los equipos que firman acuerdos cumplen más.', activity: 'Personaliza este formulario para tu contexto. ¿Qué agregarías o cambiarías según la edad de tus estudiantes?' } }
        ]
      },
      {
        id: 'abp-m4',
        title: 'Evaluación en ABP',
        icon: '📋',
        cards: [
          { id: 'abp-m4-c1', type: 'content', title: 'Evaluar en ABP: más allá del examen final', content: 'En ABP, la evaluación no ocurre solo al final: ocurre durante todo el proceso. Esto refleja cómo funciona el aprendizaje real.\n\n**Tres tipos de evaluación en ABP:**\n1. **Diagnóstica**: al inicio, ¿qué saben ya?\n2. **Formativa**: durante el proyecto, ¿cómo van? ¿qué necesitan?\n3. **Sumativa**: al final, ¿qué lograron?\n\nEn el ABP tradicional, la evaluación sumativa vale menos que en la escuela tradicional porque el proceso de aprendizaje (formativa) tiene el mayor peso educativo.', extra: { tip: 'El mayor error en ABP es evaluar solo el producto final. Un producto hermoso puede haber sido hecho por los padres. El proceso no miente.', activity: '¿Qué porcentaje le darías a cada tipo de evaluación en tu proyecto? (deben sumar 100%)' } },
          { id: 'abp-m4-c2', type: 'content', title: 'Rúbricas en ABP: el mapa de la calidad', content: 'Una rúbrica es una tabla que describe distintos niveles de calidad para cada criterio del proyecto.\n\n**Estructura básica:**\n| Criterio | Excelente | Bueno | En progreso | Inicio |\n|---|---|---|---|---|\n| Investigación | Usa 3+ fuentes variadas | 2 fuentes | 1 fuente | Sin fuentes |\n| Presentación | Clara, completa, impacta | Clara, completa | Parcial | Sin claridad |\n\n**Lo que hace efectiva una rúbrica en ABP:**\n• Los estudiantes la conocen ANTES de empezar\n• Los descriptores son observables (no "bueno" sino qué hace "bueno")\n• Puede usarse para autoevaluación y coevaluación', extra: { tip: 'Las mejores rúbricas de ABP incluyen criterios de proceso (colaboración, perseverancia) además de producto (calidad, precisión).', activity: 'Crea una rúbrica de 3 criterios para el producto de tu proyecto. Incluye 3 niveles de desempeño.' } },
          { id: 'abp-m4-c3', type: 'quiz', question: 'Un estudiante hizo un mural hermoso para el proyecto pero no colaboró con su equipo. ¿Cómo deberías evaluarlo?', options: ['Con una nota alta porque el producto es excelente', 'Separando la calidad del producto de la colaboración en equipo, evaluando ambas dimensiones', 'No evaluarlo porque no colaboró', 'Solo con nota numérica al final'], correct: 1, explanation: 'En ABP se evalúan múltiples dimensiones. Un producto excelente con trabajo en equipo pobre no es un logro completo del ABP.' },
          { id: 'abp-m4-c4', type: 'content', title: 'Autoevaluación: el estudiante como evaluador', content: 'La autoevaluación desarrolla metacognición: los estudiantes piensan sobre su propio aprendizaje y lo evalúan honestamente.\n\n**Herramientas de autoevaluación:**\n• Rúbrica donde el estudiante se califica a sí mismo\n• Diario de proyecto (reflexión escrita al final de cada sesión)\n• "Dos estrellas y un deseo": dos cosas que hicieron bien, una que mejorarían\n• Semáforo: rojo (no entiendo), amarillo (voy entendiendo), verde (lo dominé)\n\n**¿Por qué funciona?** Los estudiantes que se autoevalúan con honestidad aprenden a regularse, detectar sus vacíos y buscar ayuda proactivamente.', extra: { tip: 'La autoevaluación debe tener consecuencias. Si el estudiante se califica bajo, el docente ayuda a mejorar. Si se califica alto pero no lo evidencia, hay una conversación.', activity: 'Diseña una pregunta de autoevaluación para cada fase del proyecto (6 preguntas).' } },
          { id: 'abp-m4-c5', type: 'content', title: 'Coevaluación: aprender a evaluar a otros', content: 'La coevaluación es cuando los estudiantes evalúan el trabajo de sus compañeros. En ABP es especialmente valiosa en los puntos de revisión.\n\n**Protocolo de coevaluación efectiva:**\n1. Cada equipo presenta su trabajo en progreso\n2. El equipo revisor usa una guía de preguntas:\n   • "Lo que me funcionó fue..."\n   • "Me pregunto si..."\n   • "Una sugerencia sería..."\n3. El equipo presentador escucha sin interrumpir\n4. Luego tiene 5 minutos para responder preguntas\n\n**Regla de oro**: la retroalimentación entre pares debe ser específica, amable y orientada a mejorar.', extra: { tip: 'Practica la coevaluación con temas no sensibles primero (un texto, un dibujo) antes de usarla para evaluar proyectos completos.', activity: 'Escribe 3 preguntas que usarías como guía para que estudiantes evalúen el proyecto de otro equipo.' } },
          { id: 'abp-m4-c6', type: 'quiz', question: 'Durante la coevaluación, un equipo recibe críticas duras de sus compañeros. ¿Cómo debe manejar esto el docente?', options: ['Cancelar la coevaluación para proteger a los estudiantes', 'Haber enseñado previamente cómo dar retroalimentación específica y constructiva, y intervenir si el tono no es respetuoso', 'Ignorarlo porque es parte del aprendizaje', 'Solo permitir elogios durante la coevaluación'], correct: 1, explanation: 'La coevaluación debe ser enseñada explícitamente. El docente modela cómo dar retroalimentación útil antes de pedir a los estudiantes que lo hagan.' },
          { id: 'abp-m4-c7', type: 'content', title: 'Documentar el proceso de aprendizaje', content: 'En ABP, la documentación del proceso es evidencia de aprendizaje tan válida como el producto final.\n\n**¿Qué documentar?**\n• Primeras ideas y bocetos (antes)\n• Cambios y ajustes (durante)\n• Versiones mejoradas (proceso)\n• Reflexiones escritas (metacognición)\n• Fotos del trabajo en progreso\n\n**¿Cómo documentar sin tecnología?**\n• Portafolio en carpeta de papel\n• Cuaderno de proyecto\n• Línea de tiempo en papel bond pegada en la pared\n\nLa documentación tiene doble valor: evidencia el aprendizaje para el docente y ayuda al estudiante a ver su propia evolución.', extra: { tip: 'Muestra a los estudiantes la documentación de proyectos anteriores al inicio de uno nuevo. Ver que otros avanzaron "paso a paso" normaliza el proceso y reduce la ansiedad.', activity: '¿Cómo documentarías el proceso de tu proyecto dado el contexto de recursos de tu escuela?' } },
          { id: 'abp-m4-c8', type: 'content', title: 'La nota en ABP: ¿cómo traducir a calificación?', content: 'El sistema guatemalteco requiere calificaciones numéricas. ¿Cómo traducir el aprendizaje ABP a notas?\n\n**Distribución sugerida:**\n• 30% — Proceso (cuaderno, participación, puntos de revisión)\n• 40% — Producto final (rúbrica)\n• 20% — Presentación (comunicación, audiencia)\n• 10% — Reflexión (autoevaluación, diario)\n\n**Importante:** Separar la nota individual de la grupal. Cada estudiante tiene su componente individual dentro del trabajo grupal.\n\nComenta con la dirección de tu escuela esta distribución antes de implementarla para alinear expectativas.', extra: { tip: 'Algunos docentes en Guatemala complementan la nota numérica con una "nota narrativa": un párrafo describiendo los logros de cada estudiante. Esto da información mucho más útil que un número.', activity: 'Diseña tu sistema de evaluación numérica para el proyecto. Que sume 100 puntos.' } },
          { id: 'abp-m4-c9', type: 'quiz', question: 'Al evaluar un proyecto ABP, ¿qué peso debería tener el proceso vs. el producto final?', options: ['Solo el producto final importa (100%)', 'El proceso debería tener un peso significativo porque es donde ocurre la mayor parte del aprendizaje', 'Solo el proceso importa (100%)', 'Ambos deben pesar igual siempre (50/50)'], correct: 1, explanation: 'El proceso es donde se desarrollan las competencias más valiosas del ABP. Ignorarlo para evaluar solo el producto no refleja lo que realmente aprendieron los estudiantes.' },
          { id: 'abp-m4-c10', type: 'content', title: 'Evaluación de habilidades del siglo XXI', content: 'El ABP es un contexto ideal para evaluar habilidades que los exámenes tradicionales no pueden medir:\n\n• **Colaboración**: ¿trabajó efectivamente con otros?\n• **Comunicación**: ¿presentó sus ideas con claridad?\n• **Pensamiento crítico**: ¿analizó información y tomó decisiones fundamentadas?\n• **Creatividad**: ¿propuso soluciones originales?\n• **Ciudadanía**: ¿el proyecto tuvo impacto real en la comunidad?\n\nEstas son las habilidades que los empleadores en Guatemala reportan como las más escasas y más valiosas en los jóvenes.', extra: { tip: 'USAID y el Banco Mundial han identificado estas habilidades como prioridad para el desarrollo de Guatemala. Los docentes que las evalúan en ABP están preparando a los ciudadanos que el país necesita.', activity: 'Para tu proyecto, elige 2 habilidades del siglo XXI para evaluar. ¿Cómo las observarías en acción?' } },
          { id: 'abp-m4-c11', type: 'quiz', question: '¿Por qué los exámenes tradicionales no son suficientes para evaluar el aprendizaje en ABP?', options: ['Porque los estudiantes de ABP son más inteligentes', 'Porque el ABP desarrolla habilidades como colaboración y creatividad que un examen escrito no puede medir', 'Porque los exámenes son difíciles de calificar', 'Porque en ABP no se aprende contenido académico'], correct: 1, explanation: 'Los exámenes miden conocimiento declarativo. El ABP desarrolla habilidades procedimentales y disposicionales que requieren observación, rúbricas y evidencia de proceso para ser evaluadas.' },
          { id: 'abp-m4-c12', type: 'content', title: 'Retroalimentación efectiva al final del proyecto', content: 'Al terminar un proyecto, el docente puede dar retroalimentación más profunda porque tiene toda la evidencia del proceso.\n\n**Estructura de retroalimentación ABP al cierre:**\n1. **Reconocer**: menciona logros específicos y concretos del equipo\n2. **Reflexionar**: qué decisiones tomaron que marcaron diferencia\n3. **Proyectar**: qué haría a este equipo aún más efectivo en el próximo proyecto\n\nEvita: "buen trabajo" (demasiado genérico) o "faltó más esfuerzo" (sin especificidad).\n\nLa retroalimentación al cierre informa el siguiente proyecto y cierra el ciclo de aprendizaje de manera digna.', extra: { tip: 'Considera una "ceremonia de cierre" del proyecto: reconocimiento público de logros, compartir reflexiones en círculo, archivar el proyecto para que sirva de inspiración a futuros estudiantes.', activity: 'Escribe la retroalimentación que darías a un equipo imaginario que completó un proyecto sobre agua limpia en su comunidad.' } },
          { id: 'abp-m4-p1', type: 'content', title: '⚡ Aplícalo mañana: Ticket de Salida en 3 preguntas', content: 'Al FINALIZAR la clase de mañana, en los últimos 5 minutos, escribe estas 3 preguntas en la pizarra y da una hoja pequeña a cada estudiante:\n\n**1.** ✅ ¿Qué aprendí hoy que antes no sabía?\n**2.** 🤔 ¿Qué pregunta me quedó sin responder?\n**3.** 🌟 ¿Cómo usaré lo que aprendí en el proyecto de mi equipo?\n\nRecoge las hojas. Léelas esa tarde en 10 minutos.\n\n**Lo que obtienes:**\n• Saber exactamente qué entendieron y qué no.\n• Identificar a quién necesitas apoyar mañana.\n• Evidencia real del aprendizaje (útil para tu portafolio docente).\n\n**Variante para ABP:** en la pregunta 3, pide que escriban el PRÓXIMO PASO concreto que dará su equipo. Eso activa la planificación y la responsabilidad individual dentro del equipo.\n\n**No califiques estas hojas.** Son información de diagnóstico, no nota.', extra: { tip: 'Guarda los Tickets de Salida de la primera y la última semana del proyecto. La diferencia en las respuestas es la evidencia más poderosa del aprendizaje que ocurrió.', activity: 'Imprime o escribe 30 tarjetitas para tu próxima clase. Mañana prueba el Ticket de Salida y comparte qué descubriste.' } },
          { id: 'abp-m4-p2', type: 'content', title: '📊 Antes / Después: Evaluar un proyecto ABP', content: '**❌ Evaluación tradicional de proyecto:**\nLos equipos presentan el viernes. El docente pone nota basada en "qué tan bonito quedó". El equipo que hizo el mejor cartel saca 95. El equipo que investigó más, iteró más y aprendió más saca 70. Nadie sabe exactamente por qué.\n\nLos estudiantes aprenden: "lo que importa es el producto final y que se vea bien."\n\n---\n\n**✅ ABP con evaluación auténtica:**\n\n*La rúbrica se entrega el primer día del proyecto.*\n\n| Criterio | Peso | Qué evidencia se evalúa |\n|---|---|---|\n| Proceso y bitácora | 30% | Registro de decisiones, errores y mejoras |\n| Producto final | 30% | ¿Responde la Pregunta Guía? ¿Impacta a la audiencia? |\n| Presentación | 25% | ¿Explican qué aprendieron, no solo qué hicieron? |\n| Reflexión | 15% | ¿Qué cambiarían? ¿Qué aprendieron sobre sí mismos? |\n\nLos estudiantes aprenden: "el proceso importa tanto como el resultado."', extra: { tip: 'Cuando compartes la rúbrica al inicio, los equipos toman mejores decisiones durante todo el proyecto. La claridad sobre los criterios aumenta la calidad del trabajo.', activity: 'Adapta esta rúbrica a tu próximo proyecto. ¿Cambiarías los pesos? ¿Agregarías o quitarías algún criterio?' } },
          { id: 'abp-m4-p3', type: 'content', title: '📋 Plantilla: Rúbrica ABP básica (lista para imprimir y personalizar)', content: '**Para cualquier proyecto ABP, en cualquier grado:**\n\n---\n**Proyecto:** _______________ | **Grado:** _____ | **Equipo:** _______________\n\n| Criterio | ⭐⭐⭐ Destacado (4) | ⭐⭐ Competente (3) | ⭐ En desarrollo (2) | 🔄 Inicio (1) |\n|---|---|---|---|---|\n| **Investigación y fuentes** | Varias fuentes, información verificada y bien organizada | Dos fuentes, info. organizada | Una fuente, info. básica | Sin investigación |\n| **Proceso y bitácora** | Registro claro de decisiones, cambios y aprendizajes | Registro parcial | Solo el producto final registrado | Sin bitácora |\n| **Producto final** | Responde la PG, impacta a la audiencia real | Responde la PG parcialmente | Producto incompleto | Sin producto |\n| **Presentación oral** | Explican aprendizajes Y proceso con claridad | Explican el proceso | Solo muestran el producto | No pueden presentar |\n| **Reflexión** | Específica: qué cambiarían, qué aprendieron de sí mismos | Reflexión general | Una oración de reflexión | Sin reflexión |\n\n**Total: ___ / 20 puntos** | *A nota: (total ÷ 20) × 100 = ___*\n\n**Autoevaluación del equipo:** ¿En qué criterio se destacaron? ¿En cuál mejorarían?\n---', extra: { tip: 'La columna "En desarrollo" es la más útil para dar retroalimentación específica. Si puedes decirle al equipo exactamente qué le falta para llegar a "Competente", tienes retroalimentación accionable.', activity: 'Imprime esta rúbrica. La próxima vez que lances un proyecto, dásela a los equipos el primer día y explica cada criterio con ejemplos.' } }
        ]
      },
      {
        id: 'abp-m5',
        title: 'ABP en el aula guatemalteca',
        icon: '🇬🇹',
        cards: [
          { id: 'abp-m5-c1', type: 'content', title: 'ABP en contextos multilingües', content: 'Guatemala tiene 22 idiomas mayas además del español. ABP no solo tolera esta diversidad: la celebra.\n\n**ABP multilingüe en práctica:**\n• Entrevistas a ancianos en lengua materna (tz\'utujil, k\'iche\', kaqchikel, etc.)\n• Documentación del proyecto bilingüe\n• Problemas definidos desde la cosmovisión local\n• Estudiantes como traductores e investigadores de su propio conocimiento\n\nEsto invierte el modelo tradicional donde el español es el idioma de poder y el idioma maya queda en casa. En ABP, los saberes en lengua materna tienen valor académico real.', extra: { tip: 'Conecta el ABP con el Programa Nacional de Educación Bilingüe Intercultural (DIGEBI) del MINEDUC. Existen recursos y acompañamiento pedagógico para docentes.', activity: 'Si enseñas en una comunidad con lengua materna distinta al español, ¿cómo incorporarías ese idioma en tu proyecto?' } },
          { id: 'abp-m5-c2', type: 'content', title: 'Problemas reales para proyectos reales en Guatemala', content: 'Guatemala ofrece contextos ricos para ABP auténtico. Problemas que los estudiantes pueden abordar:\n\n🌿 **Medio ambiente**: deforestación, agua contaminada, basura en ríos\n🏥 **Salud**: desnutrición, acceso a agua potable, plantas medicinales\n🌽 **Seguridad alimentaria**: la milpa, diversificación de cultivos\n🏗️ **Infraestructura**: caminos, escuelas, vivienda\n🎨 **Cultura**: tradiciones en riesgo, artesanías, idiomas\n👶 **Primera infancia**: apoyo a madres, salud materno-infantil\n\nCada uno de estos temas puede conectarse con contenidos del CNB de primaria, básico y diversificado.', extra: { tip: 'Los proyectos sobre seguridad alimentaria son especialmente poderosos en Guatemala porque conectan con el conocimiento ancestral de la milpa y el calendario maya agrícola.', activity: 'Elige uno de estos problemas. ¿Qué Pregunta Guía formularías para estudiantes de tu grado?' } },
          { id: 'abp-m5-c3', type: 'quiz', question: 'Una maestra quiere hacer ABP sobre la milpa con estudiantes de 4to primaria en una comunidad k\'iche\'. ¿Qué fuente de conocimiento sería MÁS valiosa?', options: ['Un libro de texto de ciencias naturales en español', 'Agricultores de la comunidad que practican la milpa y conocen el calendario agrícola', 'Un video de YouTube sobre agricultura', 'El cuaderno de trabajo del MINEDUC'], correct: 1, explanation: 'Los agricultores locales tienen conocimiento especializado, contextualizado y en la lengua materna. Eso es auténtico en ABP. Los libros son complemento, no la fuente principal.' },
          { id: 'abp-m5-c4', type: 'content', title: 'ABP y las comunidades de aprendizaje', content: 'En Guatemala, la tradición comunitaria es un activo para el ABP. Conceptos como:\n• **Tz\'utujil y K\'iche\'**: el trabajo colectivo como práctica cultural\n• **El COCODE**: estructura de participación comunitaria\n• **Los principales**: líderes de conocimiento local\n\n...todos son recursos que el ABP puede integrar naturalmente.\n\nInvitar a la comunidad al aula (como expertos, revisores, audiencia) y llevar el aula a la comunidad (visitas, investigación de campo) transforma la relación escuela-comunidad.', extra: { tip: 'Solicita apoyo de los COCODES locales para que los proyectos estudiantiles tengan canales reales de impacto. Un COCODE que adopta una propuesta estudiantil eleva enormemente la motivación de los estudiantes.', activity: '¿Quién en tu comunidad podría ser invitado al aula como experto o revisor de proyectos? Haz una lista de 5 personas.' } },
          { id: 'abp-m5-c5', type: 'content', title: 'Superar obstáculos comunes en Guatemala', content: 'Docentes guatemaltecos reportan estos obstáculos para implementar ABP. Aquí las soluciones:\n\n❌ **"El programa es muy extenso"** → ABP cubre múltiples competencias a la vez. Un proyecto bien diseñado puede cubrir lo de 3 semanas de clases tradicionales.\n\n❌ **"No tengo materiales"** → El primer proyecto puede ser con cuaderno, lápiz y la comunidad como recurso.\n\n❌ **"Los padres no entienden"** → Hacer una reunión de lanzamiento donde los padres ven la Pregunta Guía y el plan. Muchos se convierten en aliados.\n\n❌ **"La dirección quiere exámenes"** → Mostrar los resultados del primer proyecto. Los números (participación, calificaciones) suelen hablar solos.', extra: { tip: 'El primer proyecto ABP no tiene que ser perfecto. Un proyecto modesto que funciona es mejor que un proyecto ambicioso que se abandona.', activity: '¿Cuál de estos obstáculos es el que más te preocupa? ¿Qué podrías hacer esta semana para comenzar a superarlo?' } },
          { id: 'abp-m5-c6', type: 'quiz', question: 'Una directora le dice a la docente que el ABP no le parece porque "pierden tiempo". ¿Cuál es la mejor respuesta?', options: ['Dejar de implementar ABP para evitar conflicto', 'Proponer hacer un proyecto piloto de 2 semanas y mostrarle los resultados de aprendizaje al finalizar', 'Hacer ABP a escondidas de la directora', 'Explicarle que el CNB lo exige aunque no sea verdad'], correct: 1, explanation: 'Un piloto bien documentado es el mejor argumento. Los resultados visibles (motivación, presentación, calidad del trabajo) convencen más que cualquier argumento teórico.' },
          {
            id: 'abp-m5-p1',
            type: 'project',
            title: 'Mi Primer Proyecto ABP',
            description: 'Diseña un proyecto ABP completo para tu aula usando los elementos aprendidos en el curso.',
            objective: 'Crear un plan de proyecto ABP auténtico, listo para implementar, conectado a un problema real de tu comunidad.',
            materials: ['Papel o cuaderno', 'Lápices de colores', 'CNB de tu grado', 'Lista de personas de la comunidad'],
            steps: [
              'Identifica un problema real de tu escuela o comunidad',
              'Formula una Pregunta Guía abierta y provocadora',
              'Define el producto final y la audiencia real',
              'Completa el Mapa del Proyecto',
              'Diseña el cronograma con las 6 fases',
              'Crea la rúbrica de evaluación'
            ],
            think: [
              '¿Este problema realmente le importa a mis estudiantes?',
              '¿La Pregunta Guía tiene múltiples respuestas posibles?',
              '¿Con qué recursos cuento realmente?',
              '¿Cómo se conecta esto con el CNB?'
            ],
            make: [
              'Escribe el Mapa del Proyecto completo',
              'Dibuja el cronograma visual del proyecto',
              'Crea la rúbrica con criterios de calidad',
              'Prepara el plan de lanzamiento (¿cómo engancharás a los estudiantes?)'
            ],
            improve: [
              'Comparte tu plan con un colega y pide retroalimentación',
              '¿Qué haría a este proyecto más auténtico o relevante?',
              '¿Cómo podrías involucrar más a la comunidad?',
              'Identifica el mayor riesgo de tu proyecto y cómo lo manejarías'
            ]
          },
          { id: 'abp-m5-c7', type: 'content', title: 'ABP y las alianzas estratégicas', content: 'Los proyectos ABP más poderosos ocurren cuando el docente teje alianzas antes de comenzar.\n\n**Aliados valiosos:**\n• **ONG locales**: a menudo tienen recursos, expertos y redes de impacto\n• **Municipalidades**: pueden dar seguimiento a propuestas estudiantiles\n• **Empresas locales**: pueden donar materiales o ser audiencia\n• **Universidades**: estudiantes universitarios como mentores\n• **Medios locales**: radio, periódico pueden cubrir el proyecto\n\nUna llamada telefónica antes del proyecto puede abrir puertas que transforman la experiencia de los estudiantes.', extra: { tip: 'Plan International Guatemala, USAID-Crecer Bien, y Fundación Castillo Córdoba tienen programas de apoyo a escuelas. Vale la pena investigar si operan en tu departamento.', activity: 'Identifica 2 organizaciones o instituciones en tu municipio que podrían ser aliadas para un proyecto escolar.' } },
          { id: 'abp-m5-c8', type: 'content', title: 'Ejemplos inspiradores de ABP en Guatemala', content: '**Proyecto: El río que nos da vida (San Lucas Tolimán, Sololá)**\nEstudiantes de 5to primaria documentaron la contaminación del Lago Atitlán con entrevistas, mediciones y fotos. Presentaron ante la municipalidad. Resultado: un acuerdo municipal sobre manejo de residuos.\n\n**Proyecto: La radio de la escuela (Chiquimula)**\nEstudiantes de básico crearon un programa de radio en ch\'orti\' sobre historia local. La radio comunitaria lo transmite cada sábado.\n\n**Proyecto: Guardianes de semillas (Alta Verapaz)**\nEstudiantes documentaron variedades de maíz criollo con los ancianos. Publicaron una guía que el MAGA distribuyó en la región.', extra: { tip: 'Estos proyectos no requirieron tecnología sofisticada. Requirieron una pregunta poderosa, un docente valiente y una comunidad dispuesta a participar.', activity: 'Diseña el "cartel de proyecto" de uno de estos ejemplos: título, pregunta guía, producto y audiencia en un cartel de media página.' } },
          { id: 'abp-m5-c9', type: 'quiz', question: '¿Cuál de estos ejemplos guatemaltecos demuestra mejor los principios del ABP?', options: ['Hacer una maqueta de un volcán con pasta de dientes', 'Documentar variedades de maíz criollo con ancianos y publicar una guía distribuida por el MAGA', 'Estudiar los departamentos de Guatemala en el libro', 'Ver un documental sobre agricultura'], correct: 1, explanation: 'El proyecto de semillas tiene problema real, fuentes auténticas (ancianos), producto tangible (guía) y audiencia real e impacto (distribución por el MAGA). Es ABP completo.' },
          { id: 'abp-m5-c10', type: 'content', title: 'Construyendo una cultura ABP en tu escuela', content: 'Un proyecto es un comienzo. Una cultura ABP es cuando toda la escuela aprende así.\n\n**Señales de cultura ABP:**\n• Los estudiantes preguntan "¿para qué sirve esto en la vida real?"\n• Los pasillos muestran productos de proyectos anteriores\n• Los docentes comparten proyectos entre grados\n• La comunidad conoce y valora lo que aprenden los niños\n• Los padres quieren saber del proyecto, no solo de la nota\n\n**Tu rol como agente de cambio**: cada proyecto exitoso que documentas y compartes con colegas es un paso hacia esa cultura.', extra: { tip: 'Propón a tu director una "Feria de Proyectos" anual donde todas las aulas presenten a la comunidad. Ese evento puede transformar la percepción de la escuela en el municipio.', activity: '¿Qué cambio pequeño pero concreto podrías proponer esta semana en tu escuela para empezar a construir cultura ABP?' } },
          { id: 'abp-m5-c11', type: 'quiz', question: '¿Cuál es la señal más clara de que una escuela está desarrollando una cultura ABP?', options: ['Tienen tablets y conexión a internet en todas las aulas', 'Los estudiantes preguntan "para qué sirve esto" y la comunidad participa en los proyectos', 'El director conoce el método ABP teóricamente', 'Todos los docentes leyeron el mismo libro sobre ABP'], correct: 1, explanation: 'La cultura ABP se ve en el comportamiento de los estudiantes (curiosidad, preguntas) y en la relación escuela-comunidad. La tecnología y el conocimiento teórico son medios, no fines.' },
          { id: 'abp-m5-c12', type: 'content', title: '¡Felicitaciones! Eres un diseñador de proyectos', content: 'Has completado el curso de Aprendizaje Basado en Proyectos. Ahora tienes:\n\n✅ Comprensión sólida de qué es y para qué sirve el ABP\n✅ Conocimiento de las 6 fases del ciclo ABP\n✅ Herramientas concretas: Mapa del Proyecto, rúbricas, puntos de revisión\n✅ Estrategias de evaluación formativa y sumativa\n✅ Ejemplos y recursos contextualizados para Guatemala\n\nEl siguiente paso es **hacer**: lanza un proyecto, aunque sea pequeño. El aprendizaje real del ABP ocurre cuando lo practicas.\n\n¡Tu comunidad espera los proyectos de tus estudiantes!', extra: { tip: 'Comparte tu proyecto con otros docentes en tu red. El ABP crece cuando los docentes aprenden juntos, igual que sus estudiantes.', activity: 'Completa esta frase: "El lunes voy a dar el primer paso hacia mi proyecto ABP haciendo..."' } },
          { id: 'abp-m5-p1', type: 'content', title: '⚡ Aplícalo mañana: invita a un anciano al aula', content: 'Una de las formas más poderosas de conectar ABP con el contexto guatemalteco es traer la sabiduría comunitaria al aula.\n\n**Esta semana:**\n1. Identifica un conocedor local en tu comunidad: un anciano, una comadrona, un agricultor, un artesano, un líder comunitario.\n2. Invítalo a pasar 30 minutos con tus estudiantes.\n3. Los estudiantes preparan 5 preguntas de entrevista sobre el tema de estudio.\n4. Graban o anotan las respuestas.\n5. Eso se convierte en la fuente primaria más valiosa de su investigación.\n\n**Por qué funciona en Guatemala:**\n• La cultura oral maya y garífuna guarda conocimiento que no está en ningún libro.\n• Los ancianos están disponibles y, si se les explica bien el propósito, participan con gusto.\n• Los estudiantes aprenden a valorar el conocimiento de su propia comunidad.\n\n**Temas donde funciona perfectamente:**\nAgricultura, medicina natural, historia local, artesanías, idiomas mayas, ciclos climáticos, agua, tierra...', extra: { tip: 'Antes de la visita, habla con los padres y pide permiso para grabar. Y al finalizar, haz que los estudiantes escriban una carta de agradecimiento — eso refuerza valores y relaciones comunitarias.', activity: '¿A quién invitarías la próxima semana? Escribe el nombre y el tema sobre el que hablaría. Ese es tu primer paso.' } },
          { id: 'abp-m5-p2', type: 'content', title: '📊 Antes / Después: La cultura maya en el aula', content: '**❌ Lo que suele ocurrir:**\nLa cultura maya aparece en una unidad del libro, en páginas de texto y fotos. Se estudia como algo del pasado. Los estudiantes mayas del aula no se ven reflejados como productores de conocimiento — solo como sujetos de estudio.\n\n---\n\n**✅ ABP con identidad cultural integrada:**\n\n**Ejemplo — Matemáticas y cultura:**\n**Pregunta Guía:** *"¿Qué conocimientos matemáticos usaban los mayas y cómo se comparan con los que usamos hoy?"*\n\n• Investigación con el abuelo del estudiante sobre el calendario agrícola.\n• Comparación del sistema vigesimal maya con el decimal.\n• Creación de un "libro cartonero" bilingüe (español + idioma maya local) con los hallazgos.\n• Presentación en la comunidad durante una actividad cultural.\n\n**Lo que cambia:** el estudiante maya pasa de ser "estudiado" a ser portador de conocimiento relevante y fuente de aprendizaje para todos.', extra: { tip: 'El ABP con identidad cultural no es solo "relevante" — es reparador. Devuelve dignidad y visibilidad a conocimientos que el sistema educativo ha ignorado históricamente.', activity: '¿Qué conocimiento de la cultura local de tu comunidad podría ser el centro de un proyecto? ¿Quién sería el experto comunitario que invitarías?' } },
          { id: 'abp-m5-p3', type: 'content', title: '📋 Plantilla: Plan de alianza comunitaria para un proyecto ABP', content: '**Antes de lanzar un proyecto con impacto real, identifica tus aliados:**\n\n---\n📌 **Proyecto:** _______________________\n🎯 **Propósito de la alianza:** ¿Por qué necesito un aliado comunitario?\n___________________________________\n\n**👥 Posibles aliados y su aporte:**\n\n| Aliado | ¿Qué puede aportar? | ¿Cómo contactarlo? |\n|---|---|---|\n| Municipalidad / COCODE | Validar propuestas, dar seguimiento | Visita personal |\n| ONG local (Cruz Roja, Plan Int., etc.) | Recursos, expertos, red | Llamada / email |\n| Anciano / líder comunitario | Conocimiento oral, legitimidad | Visita con los estudiantes |\n| Empresa o comercio local | Materiales, audiencia, recursos | Carta formal |\n| Escuela vecina | Audiencia, intercambio, co-creación | Contacto entre directores |\n\n**✅ Mi aliado principal para este proyecto:**\n- **Nombre / Institución:** _____________\n- **Lo que aportará:** _____________\n- **Mi primer contacto será:** _____________\n- **Fecha:** _____________\n\n---\n\n*Nota:* una alianza no tiene que ser compleja. A veces es solo una llamada: "Hola, soy docente de la escuela X. Mis estudiantes están haciendo un proyecto sobre Y. ¿Podría venir 30 minutos a compartir su experiencia?"', extra: { tip: 'La primera alianza siempre es la más difícil. La segunda es mucho más fácil porque ya tienes la historia de lo que funcionó antes. Documenta todo para la próxima vez.', activity: 'Completa la fila "Mi aliado principal" ahora mismo. Eso es el 80% del trabajo de construir una alianza.' } }
        ]
      }
    ],
    finalExam: {
        title: 'Examen Final: Aprendizaje Basado en Proyectos',
        passingScore: 70,
        questions: [
            { id: 1, text: '¿Cuál es la característica que distingue el ABP de un trabajo grupal convencional?', options: ['El trabajo en equipo', 'Un problema auténtico y complejo como punto de partida', 'Usar tecnología en el aula', 'El docente diseña todos los pasos'], correct: 1, explanation: 'El ABP se define por la autenticidad del problema, no por el formato grupal.' },
            { id: 2, text: '¿Cuál es la primera fase del ciclo ABP?', options: ['La investigación', 'La creación del producto', 'El lanzamiento con la Pregunta Guía', 'La evaluación'], correct: 2, explanation: 'El lanzamiento con la Pregunta Guía es el punto de partida que genera curiosidad y compromiso.' },
            { id: 3, text: '¿Qué hace que una Pregunta Guía sea efectiva en ABP?', options: ['Que tenga una respuesta correcta clara', 'Que sea abierta, conectada a la realidad y provoque curiosidad', 'Que venga del libro de texto', 'Que el docente conozca la respuesta'], correct: 1, explanation: 'Una buena Pregunta Guía no tiene respuesta única, es relevante y genera deseo de investigar.' },
            { id: 4, text: '¿En qué fase los estudiantes definen qué harán y cómo lo harán?', options: ['Investigación', 'Reflexión', 'Diseño', 'Presentación'], correct: 2, explanation: 'La fase de diseño es donde los equipos planifican su solución, crean bocetos y asignan roles.' },
            { id: 5, text: '¿Por qué la audiencia real es importante en el ABP?', options: ['Para cumplir con un requisito administrativo', 'Porque eleva la calidad del trabajo y autentica el propósito del aprendizaje', 'Para calificar más fácilmente', 'Porque los padres deben ver el trabajo'], correct: 1, explanation: 'La audiencia real transforma la motivación: los estudiantes trabajan para impactar personas reales, no para sacar una nota.' },
            { id: 6, text: '¿Cuál es el rol del docente durante la fase de creación del proyecto?', options: ['Dar instrucciones detalladas paso a paso', 'Observar, hacer preguntas, documentar y apoyar cuando sea necesario', 'Calificar el producto final', 'Hacer el trabajo junto a los estudiantes'], correct: 1, explanation: 'El docente circula, observa, hace preguntas guía y apoya estratégicamente sin quitar la agencia a los estudiantes.' },
            { id: 7, text: '¿Qué son las mini-lecciones en el contexto del ABP?', options: ['Exámenes cortos durante el proyecto', 'Instrucción directa de 10-15 min sobre contenido que los equipos necesitan justo en ese momento', 'Actividades de calentamiento', 'Tareas para la casa'], correct: 1, explanation: 'Las mini-lecciones just-in-time enseñan el contenido cuando los estudiantes lo necesitan para avanzar en su proyecto.' },
            { id: 8, text: '¿Qué porcentaje del total debería representar la evaluación del PROCESO en ABP?', options: ['0% (solo cuenta el producto final)', 'Un porcentaje significativo, típicamente 30-50%', '100% (solo cuenta el proceso)', 'Exactamente 10%'], correct: 1, explanation: 'El proceso merece un peso significativo porque es donde ocurre la mayor parte del aprendizaje y el desarrollo de competencias.' },
            { id: 9, text: '¿Qué es la Lista de Necesidades de Aprendizaje (LNA)?', options: ['Una lista de materiales para el proyecto', 'Lo que los estudiantes identifican que necesitan saber para responder la Pregunta Guía', 'La lista de calificaciones del grupo', 'Los libros que el docente recomienda'], correct: 1, explanation: 'La LNA convierte a los estudiantes en dueños de su aprendizaje al identificar sus propios vacíos de conocimiento.' },
            { id: 10, text: '¿Cuándo deben conocer los estudiantes los criterios de evaluación del proyecto?', options: ['Al final, para no condicionar su creatividad', 'Al inicio, antes de comenzar a trabajar', 'Solo cuando el docente los necesite calificar', 'No es necesario que los conozcan'], correct: 1, explanation: 'Los criterios deben conocerse desde el inicio para que sirvan como guía de calidad durante todo el proceso.' },
            { id: 11, text: '¿Cómo puede el ABP implementarse exitosamente en una escuela rural sin internet?', options: ['No puede implementarse sin tecnología', 'Usando la comunidad como recurso: ancianos, artesanos, espacios naturales, entrevistas', 'Esperando a tener recursos tecnológicos', 'Solo con proyectos de matemáticas'], correct: 1, explanation: 'La comunidad es el recurso más auténtico del ABP. Las escuelas sin tecnología a menudo producen proyectos más genuinos.' },
            { id: 12, text: '¿Qué herramienta resume todos los elementos de un proyecto antes de comenzar?', options: ['La rúbrica', 'El diario del proyecto', 'El Mapa del Proyecto', 'La Lista de Necesidades de Aprendizaje'], correct: 2, explanation: 'El Mapa del Proyecto responde: problema, pregunta guía, producto, audiencia, contenidos, duración, recursos y evaluación.' },
            { id: 13, text: '¿Cuál es la fase final del ciclo ABP?', options: ['La presentación', 'La reflexión', 'La evaluación sumativa', 'La investigación'], correct: 1, explanation: 'La reflexión es la última fase y la que consolida el aprendizaje. Sin reflexión, el proyecto fue solo una actividad.' },
            { id: 14, text: 'En un proyecto ABP, ¿qué deben hacer los equipos cuando encuentran un obstáculo durante la creación?', options: ['Pedir al docente que lo resuelva inmediatamente', 'Identificar qué necesitan aprender, ajustar su plan y seguir avanzando', 'Abandonar el proyecto y empezar uno más fácil', 'Esperar al siguiente punto de revisión sin hacer nada'], correct: 1, explanation: 'Encontrar y superar obstáculos es parte del aprendizaje en ABP. El docente apoya con preguntas, no con respuestas.' },
            { id: 15, text: 'Un proyecto ABP exitoso en Guatemala debería:', options: ['Usar tecnología de punta obligatoriamente', 'Conectar con problemas reales de la comunidad e incorporar saberes locales y culturales', 'Seguir exactamente el modelo de países desarrollados', 'Evitar temas culturales para no generar controversia'], correct: 1, explanation: 'El ABP guatemalteco es más poderoso cuando incorpora la riqueza cultural, lingüística y comunitaria del contexto local.' },
            { id: 16, text: '¿Qué diferencia a los puntos de revisión de una evaluación sumativa?', options: ['Los puntos de revisión solo los hace el docente', 'Los puntos de revisión ocurren durante el proceso y sirven para mejorar, no para calificar definitivamente', 'Los puntos de revisión son más difíciles', 'No hay diferencia significativa'], correct: 1, explanation: 'Los puntos de revisión son formativos: sirven para retroalimentar y mejorar mientras aún hay tiempo de hacerlo.' },
            { id: 17, text: '¿Qué es la coevaluación?', options: ['El docente evalúa dos veces el mismo trabajo', 'Los estudiantes evalúan el trabajo de sus compañeros usando criterios acordados', 'Una evaluación grupal donde todos reciben la misma nota', 'Un examen hecho en colaboración'], correct: 1, explanation: 'La coevaluación desarrolla pensamiento crítico y capacidad de dar retroalimentación constructiva, habilidades valiosas para la vida.' },
            { id: 18, text: '¿Cómo se conecta el ABP con el Currículo Nacional Base (CNB) de Guatemala?', options: ['No se conecta, son enfoques opuestos', 'El ABP puede cubrir competencias de múltiples áreas del CNB simultáneamente a través de un solo proyecto', 'El ABP reemplaza completamente el CNB', 'Solo se conecta con el área de Ciencias Naturales'], correct: 1, explanation: 'Un proyecto bien diseñado integra competencias de matemática, comunicación, ciencias y formación ciudadana del CNB al mismo tiempo.' },
            { id: 19, text: '¿Qué debe hacer el docente si un equipo tiene una idea que cree que no funcionará?', options: ['Cambiarles la idea por una más correcta', 'Dejarles probar con apoyo de preguntas guía, y aprender del intento', 'Eliminar la idea del proyecto', 'Dar instrucciones detalladas de lo que deben hacer'], correct: 1, explanation: 'El fracaso controlado es parte del aprendizaje en ABP. Los estudiantes que prueban, fallan y ajustan aprenden más que los que solo ejecutan instrucciones.' },
            { id: 20, text: '¿Cuál es el indicador más claro de que un proyecto ABP fue exitoso?', options: ['Todos los estudiantes obtuvieron calificación perfecta', 'Los estudiantes pueden explicar qué aprendieron, por qué importa y cómo lo usarían en otro contexto', 'El producto final fue visualmente impresionante', 'El proyecto terminó a tiempo'], correct: 1, explanation: 'El éxito en ABP se mide por la transferencia del aprendizaje: los estudiantes pueden aplicar lo que aprendieron más allá del proyecto específico.' },
            { id: 21, text: '¿Por qué la reflexión es indispensable en el ABP?', options: ['Para cumplir con un requisito burocrático', 'Porque transforma la experiencia en aprendizaje duradero y desarrolla metacognición', 'Para que el docente pueda calificar más fácilmente', 'No es indispensable, es opcional'], correct: 1, explanation: 'Sin reflexión, el cerebro no consolida el aprendizaje. La reflexión es donde los estudiantes procesan qué aprendieron y cómo pueden mejorarlo.' },
            { id: 22, text: '¿Cómo puede el ABP fortalecer la identidad cultural en comunidades mayas de Guatemala?', options: ['Eliminando el idioma maya de los proyectos', 'Incorporando lenguas maternas, saberes ancestrales y expertos locales como parte del proceso de investigación', 'Enseñando solo en español para que los estudiantes aprendan el idioma nacional', 'Evitando temas culturales en los proyectos'], correct: 1, explanation: 'El ABP otorga valor académico real al conocimiento en lenguas maternas y saberes ancestrales, fortaleciendo la identidad cultural.' },
            { id: 23, text: '¿Cuál es el tamaño ideal de un equipo en ABP?', options: ['Parejas (2 estudiantes)', '3-4 estudiantes', 'Grupos grandes de 8-10', 'Todo el salón trabajando junto'], correct: 1, explanation: 'Equipos de 3-4 permiten división de roles, diversidad de perspectivas y comunicación manejable sin que nadie se pierda.' },
            { id: 24, text: '¿Qué información debe incluir el Mapa del Proyecto?', options: ['Solo el nombre del proyecto y la fecha', 'Problema, pregunta guía, producto, audiencia, contenidos CNB, duración, recursos y evaluación', 'Solo la rúbrica de evaluación', 'Los nombres de los estudiantes y sus roles'], correct: 1, explanation: 'El Mapa del Proyecto es el documento de planificación completo que responde todos los "qué, quién, cuándo y para qué" del proyecto.' },
            { id: 25, text: 'Un docente hace ABP por primera vez. ¿Cuál es el mejor consejo?', options: ['Diseñar el proyecto más ambicioso posible para motivar a los estudiantes', 'Comenzar con un proyecto pequeño y manejable, documentar los resultados y aprender de la experiencia', 'Esperar a tener capacitación perfecta antes de intentarlo', 'Copiar exactamente un proyecto de otro contexto sin adaptarlo'], correct: 1, explanation: 'Un proyecto modesto que se completa y se documenta enseña más que un proyecto ambicioso que se abandona. La experiencia es el mejor maestro en ABP.' }
        ]
    }
},
{
    id: 'design-thinking',
    title: 'Design Thinking para Docentes',
    subtitle: 'Resuelve problemas del aula con empatía y creatividad',
    icon: '💡',
    color: '#E83C8D',
    prerequisite: null,
    status: 'available',
    durationHours: 3,
    totalCards: 46,
    modules: [
      {
        id: 'dt-m1',
        title: '¿Qué es Design Thinking?',
        icon: '🔭',
        cards: [
          { id: 'dt-m1-c1', type: 'content', title: 'El origen del Design Thinking', content: 'Design Thinking nació en Stanford (IDEO, d.school) como un proceso para resolver problemas complejos desde la perspectiva de las personas que los viven, no desde la perspectiva del experto.\n\nA diferencia de los enfoques tradicionales que parten del problema abstracto, el Design Thinking parte de la **empatía**: entender profundamente a las personas afectadas antes de proponer cualquier solución.\n\nHoy se usa en hospitales, empresas, gobiernos y cada vez más en escuelas de todo el mundo, incluyendo Guatemala.', extra: { tip: 'Tim Brown (IDEO) y el Instituto de Diseño de Stanford popularizaron el DT. Pero sus raíces están en el "pensamiento del diseño" de arquitectos y artistas del siglo XX.', activity: 'Piensa en un problema de tu aula. ¿Lo has intentado resolver partiendo de TU perspectiva o de la perspectiva de tus estudiantes?' } },
          { id: 'dt-m1-c2', type: 'content', title: 'Las 5 fases del Design Thinking', content: 'El proceso de Design Thinking tiene 5 fases que no son lineales sino iterativas:\n\n1. 🤝 **Empatizar** — Entender a las personas\n2. 🎯 **Definir** — Enunciar el problema real\n3. 💡 **Idear** — Generar muchas soluciones\n4. 📦 **Prototipar** — Hacer versiones rápidas\n5. 🧪 **Evaluar** — Probar con personas reales\n\nLo poderoso es que puedes volver a cualquier fase. Después de evaluar, quizás necesitas empatizar de nuevo. El proceso responde a lo que vas descubriendo.', extra: { tip: 'DT no es una receta de cocina. Es un mapa flexible. La regla de oro: siempre vuelve a las personas cuando te pierdas.', activity: 'Escribe las 5 fases en tarjetas. En los próximos días, identifica en qué fase estás cuando enfrentas un problema real.' } },
          { id: 'dt-m1-c3', type: 'quiz', question: '¿Cuál es el principio fundamental que distingue al Design Thinking de otros métodos de resolución de problemas?', options: ['Usa tecnología avanzada para encontrar soluciones', 'Parte de la empatía profunda con las personas que viven el problema', 'Tiene siempre una solución correcta y predecible', 'Lo aplican solo diseñadores y artistas'], correct: 1, explanation: 'La empatía es el corazón del DT. Sin entender profundamente a las personas, cualquier solución es una suposición.' },
          { id: 'dt-m1-c4', type: 'content', title: 'Design Thinking vs. pensamiento tradicional', content: '**Pensamiento tradicional:**\n• Define el problema primero\n• Busca UNA solución correcta\n• El experto sabe la respuesta\n• El proceso es lineal\n• El fracaso es un error\n\n**Design Thinking:**\n• Empatiza antes de definir el problema\n• Genera MUCHAS posibles soluciones\n• Las personas afectadas son expertas en su experiencia\n• El proceso es circular e iterativo\n• El fracaso es información\n\nEsta diferencia cambia radicalmente cómo nos acercamos a los problemas del aula.', extra: { tip: '"Fracasa pronto, fracasa barato" es el lema del DT. Un prototipo fallido en papel es mil veces mejor que un programa escolar fallido después de un año.', activity: '¿Puedes recordar un momento en que resolviste un problema de manera lineal y no funcionó? ¿Cómo hubiera ayudado el DT?' } },
          { id: 'dt-m1-c5', type: 'content', title: 'Design Thinking en la educación', content: 'En el ámbito educativo, el Design Thinking se usa de dos formas:\n\n1. **Como herramienta del docente**: para resolver problemas de tu práctica educativa (motivación, convivencia, aprendizaje)\n\n2. **Como metodología para los estudiantes**: los estudiantes usan DT para resolver problemas de su comunidad\n\nAmbos usos son válidos y complementarios. Un docente que practica DT enseña DT con su ejemplo.\n\nEn este curso aprenderás ambas perspectivas, con énfasis en cómo llevar DT al aula guatemalteca.', extra: { tip: 'El Stanford d.school tiene un "K12 Lab" con recursos gratuitos para docentes. Están en inglés, pero hay traducciones no oficiales en español.', activity: '¿En cuál de los dos usos te interesa más profundizar? ¿Por qué?' } },
          { id: 'dt-m1-c6', type: 'quiz', question: '¿Cuál de estas situaciones es un buen candidato para usar Design Thinking?', options: ['Calcular cuánto tiza necesito para el mes', 'Entender por qué varios estudiantes tienen miedo de leer en voz alta y diseñar una solución', 'Copiar la solución de otra escuela sin adaptarla', 'Hacer el horario del semestre'], correct: 1, explanation: 'El DT brilla con problemas que involucran personas, comportamiento y contexto complejo. El miedo a leer en voz alta es exactamente ese tipo de problema.' },
          { id: 'dt-m1-c7', type: 'content', title: 'La mentalidad del Design Thinker', content: 'Más que seguir un proceso, el Design Thinking es una mentalidad. Implica:\n\n• **Curiosidad por las personas**: genuino interés en cómo viven y sienten\n• **Optimismo**: creer que siempre hay una mejor solución\n• **Tolerancia a la ambigüedad**: estar bien con no saber todavía\n• **Experimentación**: probar ideas antes de comprometerse con una\n• **Colaboración**: las mejores ideas emergen de equipos diversos\n• **Empatía radical**: ponerse en los zapatos de los demás de verdad\n\nEsta mentalidad es también lo que queremos desarrollar en nuestros estudiantes.', extra: { tip: 'La mentalidad del DT se desarrolla con práctica. No esperes tenerla perfecta antes de empezar. El proceso te la va desarrollando.', activity: '¿Cuál de estos elementos de la mentalidad es el que más te cuesta? ¿Cuál tienes más desarrollado?' } },
          { id: 'dt-m1-c8', type: 'content', title: 'DT y la cosmovisión maya: conexiones inesperadas', content: 'El pensamiento maya tiene conexiones profundas con los principios del DT:\n\n🌀 **Circularidad**: el tiempo y el conocimiento son cíclicos, no lineales (como el DT)\n🤝 **Colectividad**: "Nosotros" sobre "yo" — el DT es fundamentalmente colaborativo\n🌱 **Relación con el entorno**: conocer profundamente el contexto antes de actuar\n♻️ **Iteración**: el maíz se siembra, se aprende, se mejora la próxima cosecha\n\nEn comunidades indígenas de Guatemala, el DT puede enriquecerse enormemente incorporando estos principios y evitando imponer un modelo externo sin adaptación.', extra: { tip: 'El DT occidental puede aprender del pensamiento maya tanto como el DT puede aportar a las escuelas guatemaltecas. La adaptación bidireccional es la clave.', activity: '¿Hay algún principio de la cultura de tu comunidad que conecte con el DT? ¿Cómo lo integrarías en tu práctica?' } },
          { id: 'dt-m1-c9', type: 'quiz', question: 'Una docente dice "el Design Thinking no aplica aquí porque es un método occidental". ¿Cuál es la mejor respuesta?', options: ['Tiene razón, el DT no sirve en Guatemala', 'El DT puede adaptarse e incluso enriquecerse con principios de la cosmovisión local, como la circularidad y el trabajo colectivo', 'El DT es universal y no necesita adaptación', 'La docente debe seguir el método exactamente como lo inventaron en Stanford'], correct: 1, explanation: 'El DT es un proceso, no un dogma. Se adapta a cada contexto. En Guatemala, puede enriquecerse con principios mayas de circularidad y colectividad.' },
          { id: 'dt-m1-c10', type: 'content', title: '¿Cuándo usar Design Thinking?', content: 'El DT es especialmente útil cuando:\n\n✅ El problema involucra personas con necesidades complejas\n✅ No sabes exactamente cuál es el problema real\n✅ Hay múltiples soluciones posibles\n✅ Necesitas involucrar a los afectados en la solución\n✅ El contexto es ambiguo o cambiante\n\n❌ No es tan útil cuando:\n• El problema tiene una solución técnica clara\n• El tiempo es crítico y no hay margen de iteración\n• Las personas involucradas no pueden participar\n\nEn el aula, el DT es ideal para problemas de convivencia, motivación, aprendizaje diferenciado y relación con la comunidad.', extra: { tip: 'El DT no es la herramienta para todo. Aprender a reconocer cuándo aplicarlo es parte de la competencia del Design Thinker.', activity: 'Lista 3 problemas de tu aula que podrían abordarse con DT y 3 que no lo necesitan.' } },
          { id: 'dt-m1-c11', type: 'quiz', question: '¿Cuál de estos problemas se beneficiaría MÁS del Design Thinking?', options: ['Calcular la nota promedio del grupo', 'Entender por qué las niñas de 4to primaria dejaron de participar en clase y diseñar una solución', 'Ordenar los libros de texto por apellido', 'Decorar el aula para el Día del Maestro'], correct: 1, explanation: 'El problema de participación involucra personas, contexto social complejo y no tiene una solución obvia. Es exactamente el tipo de problema para el que DT fue creado.' },
          { id: 'dt-m1-p1', type: 'content', title: '⚡ Aplícalo mañana: la entrevista de 10 minutos', content: 'Mañana, durante el recreo o al final de la clase, siéntate con 2 estudiantes y hazles exactamente estas preguntas (sin cambiarlas):\n\n1. *"¿Cuál es la parte de la escuela que más disfrutas? ¿Por qué?"*\n2. *"¿Hay algo que te cuesta mucho en la escuela? ¿Qué es?"*\n3. *"Si pudieras cambiar UNA cosa de cómo aprendemos aquí, ¿qué sería?"*\n\n**Reglas importantes:**\n• No expliques nada — solo escucha.\n• No valides ni invalides ninguna respuesta.\n• Escribe lo que dicen con sus palabras exactas.\n• Haz esto: *"Cuéntame más sobre eso."* si algo te llama la atención.\n\n**Lo que tienes al final:** dos perspectivas reales de tus estudiantes que probablemente no escuchas normalmente.\n\nEso es empatía. Y es el primer paso del Design Thinking.', extra: { tip: 'La diferencia entre "preguntar" y "escuchar con empatía" es que en la segunda no tienes nada que defender ni probar. Solo tienes curiosidad genuina por la experiencia del otro.', activity: '¿Con qué 2 estudiantes harás la entrevista mañana? Anota sus nombres y a qué hora los encontrarás.' } },
          { id: 'dt-m1-p2', type: 'content', title: '📊 Antes / Después: resolver un problema del aula con y sin DT', content: '**❌ Sin Design Thinking — Problema: estudiantes distraídos:**\nLa docente decide que el problema es el celular. Prohíbe los celulares. Los estudiantes buscan otras formas de distraerse. El problema persiste. La docente se frustra porque "ya tomé medidas".\n\n---\n\n**✅ Con Design Thinking — Mismo problema:**\n\n*Empatizar:* entrevista a 5 estudiantes: "¿Cuándo te distraes más y por qué?"\n\n*Hallazgo real:* se distraen principalmente en los primeros 10 minutos (aún no están "en modo aula") y cuando la actividad no tiene un propósito claro para ellos.\n\n*Definir:* "Los estudiantes necesitan señales claras de qué se espera de ellos y por qué importa lo que van a aprender."\n\n*Idear:* gancho inicial de 3 minutos con pregunta provocadora + propósito visible en pizarra todo el tiempo.\n\n*Resultado:* distracción bajó notablemente. El problema no era el celular — era la falta de propósito visible.', extra: { tip: 'La solución que parece obvia casi nunca es la correcta. El DT te lleva a la solución que sí funciona, porque parte de entender el problema real.', activity: '¿Hay algún problema de tu aula que llevas tiempo tratando de resolver sin éxito? Ese es el candidato perfecto para DT.' } },
          { id: 'dt-m1-p3', type: 'content', title: '📋 Plantilla: Mapa de Empatía rápido (para imprimir o dibujar)', content: '**Dibuja un cuadrado dividido en 4 partes. En el centro: el nombre o descripción de la persona. En cada cuadrante:**\n\n---\n**Nombre / descripción de la persona:** _______________\n\n| 🗣️ DICE | 🏃 HACE |\n|---|---|\n| *¿Qué palabras usa para describir su experiencia?* | *¿Qué hace realmente? ¿Cómo se comporta?* |\n| _________________ | _________________ |\n\n| 💭 PIENSA | 💙 SIENTE |\n|---|---|\n| *¿Qué cree o supone? ¿Qué le preocupa?* | *¿Qué emociones expresa o parece tener?* |\n| _________________ | _________________ |\n\n---\n\n**Después de completarlo, responde:**\n• ¿Qué me sorprendió?\n• ¿Hay una contradicción entre lo que dice y lo que hace?\n• ¿Qué necesita esta persona que aún no tiene?\n\n**Usa este mapa con:** tus estudiantes, sus familias, o cualquier persona cuyo problema quieras entender mejor antes de proponer soluciones.', extra: { tip: 'La casilla "Siente" es la más importante y la más difícil de completar. Las emociones rara vez se dicen directamente — las percibes en el tono, la postura y lo que NO se dice.', activity: 'Llena este mapa con la información de la entrevista que hiciste. ¿Qué patrón emerge entre los 4 cuadrantes?' } }
        ]
      },
      {
        id: 'dt-m2',
        title: 'Empatizar y Definir',
        icon: '🤝',
        cards: [
          { id: 'dt-m2-c1', type: 'content', title: 'Fase 1: Empatizar — la base de todo', content: 'Empatizar es la fase más importante del DT porque define la calidad de todo lo que viene después.\n\nEmpatizar significa:\n• **Observar**: ver cómo las personas se comportan en su contexto real\n• **Escuchar**: preguntas abiertas que invitan a contar historias\n• **Experimentar**: si es posible, vivir la experiencia del otro\n• **Sentir**: conectar emocionalmente, no solo intelectualmente\n\nLa empatía no es asumir que sabes cómo se siente el otro. Es descubrirlo activamente.', extra: { tip: 'La empatía que necesita el DT va más allá de la compasión. Es curiosidad genuina por la experiencia del otro sin juzgarla.', activity: 'Elige un estudiante que te preocupa. Esta semana, dedica 10 minutos a observarlo sin intervenir. ¿Qué descubres?' } },
          { id: 'dt-m2-c2', type: 'content', title: 'Herramientas de empatía: la entrevista', content: 'La entrevista de empatía es diferente a una encuesta o cuestionario. Su objetivo no es datos numéricos sino comprender profundamente.\n\n**Principios de la entrevista de empatía:**\n• Preguntas abiertas: "¿Cómo te sientes cuando...?" no "¿Te gusta o no te gusta?"\n• Escuchar más que hablar (80/20)\n• Pedir que cuenten historias específicas: "¿Cuéntame de la última vez que..."\n• Preguntar el "por qué" detrás de las respuestas\n• No interrumpir ni juzgar\n• Tomar notas literales (sus palabras, no tu interpretación)\n\n**Con estudiantes guatemaltecos**: considera barreras de idioma, de confianza y culturales. A veces los dibujos o el juego son mejores entrevistas que las palabras.', extra: { tip: 'La pregunta "¿cuéntame de la última vez que..." es mágica porque obliga a hablar de experiencias concretas, no de generalizaciones.', activity: 'Practica: entrevista a un estudiante o colega usando 3 preguntas abiertas. ¿Qué aprendiste que no sabías?' } },
          { id: 'dt-m2-c3', type: 'quiz', question: 'En una entrevista de empatía, un estudiante dice "no me gusta la escuela". ¿Qué pregunta haces a continuación?', options: ['¿Por qué no te gusta?', 'Cuéntame de un día en que fuiste a la escuela y estuvo especialmente mal. ¿Qué pasó?', '¿Prefieres quedarte en casa entonces?', '¿Has hablado con tus papás?'], correct: 1, explanation: 'Pedir una historia concreta y específica revela detalles reales. "¿Por qué no te gusta?" puede llevarte a respuestas genéricas. La historia específica muestra la experiencia real.' },
          { id: 'dt-m2-c4', type: 'content', title: 'El mapa de empatía', content: 'El Mapa de Empatía es una herramienta visual que organiza lo que aprendes sobre una persona en 4 cuadrantes:\n\n| Dice | Hace |\n|---|---|\n| Palabras literales que usa | Comportamientos observables |\n| **Piensa** | **Siente** |\n| Creencias, opiniones | Emociones, frustraciones, aspiraciones |\n\nAl completarlo, emergen patrones y contradicciones que revelan las necesidades reales, que a menudo son distintas a lo que la persona dice explícitamente.\n\nEjemplo: Un estudiante DICE "no entiendo la tarea" pero HACE: evita trabajar en grupo y SIENTE: miedo a equivocarse públicamente. La necesidad real: un espacio seguro para cometer errores.', extra: { tip: 'El cuadrante más valioso suele ser "Siente". Las necesidades emocionales impulsan el comportamiento más que cualquier otra cosa.', activity: 'Completa un Mapa de Empatía para un estudiante que te preocupa. Primero solo con lo que ya sabes, luego con lo que investigues.' } },
          { id: 'dt-m2-c5', type: 'content', title: 'Fase 2: Definir — el problema real', content: 'Después de empatizar, tienes mucha información. La fase de Definir convierte esa información en un enunciado claro del problema REAL.\n\n**El enunciado del problema en DT tiene esta forma:**\n[Persona] necesita [necesidad/deseo] porque [razón/insight]\n\n**Ejemplo:** "Miguel (9 años) necesita sentirse seguro para equivocarse en clase porque creció en un ambiente donde los errores se castigan, y por eso prefiere no intentar."\n\nEste enunciado es mucho más rico que "Miguel no participa en clase" porque incluye la perspectiva de Miguel y la razón real.', extra: { tip: 'El enunciado del problema debe orientarse a la persona, no a la tecnología o el método. No "necesitamos un nuevo sistema de evaluación" sino "los estudiantes necesitan..."', activity: 'Escribe un enunciado de problema en formato DT para un problema real de tu aula.' } },
          { id: 'dt-m2-c6', type: 'quiz', question: '¿Cuál de estos enunciados sigue mejor el formato del Design Thinking?', options: ['El problema es que los estudiantes no hacen tareas', 'Necesitamos implementar una política de tareas más estricta', 'Los estudiantes de 3ro necesitan sentir que las tareas tienen propósito porque actualmente perciben que son repetitivas y no conectan con su vida', 'Las familias no apoyan la educación en casa'], correct: 2, explanation: 'El tercer enunciado centra la perspectiva en los estudiantes, identifica la necesidad (propósito) y el insight (percepción de repetición sin conexión). Eso orienta las soluciones correctamente.' },
          { id: 'dt-m2-c7', type: 'content', title: 'El "¿Por qué?" como herramienta de definición', content: 'Antes de definir el problema, hay que llegar a su raíz. La técnica de los **5 Por Qués** (originalmente de Toyota) ayuda:\n\nProblema observable: "Los niños no llegan a tiempo a la escuela"\n→ ¿Por qué? Porque salen tarde de su casa\n→ ¿Por qué? Porque tienen responsabilidades antes de salir (animales, hermanos menores)\n→ ¿Por qué? Porque los padres trabajan desde temprano\n→ ¿Por qué? La economía familiar requiere múltiples trabajos\n→ ¿Por qué? Falta de acceso a empleo formal en la comunidad\n\nEl problema real no es la puntualidad: es la estructura económica familiar. Las soluciones cambian radicalmente.', extra: { tip: 'No siempre son exactamente 5 "por qués". A veces son 3, a veces son 7. El objetivo es llegar a una causa que puedas realmente abordar.', activity: 'Aplica los 5 Por Qués a un problema observable de tu aula. ¿Dónde llega tu cadena de preguntas?' } },
          { id: 'dt-m2-c8', type: 'content', title: 'Empatía con las familias guatemaltecas', content: 'Para muchos problemas del aula, las familias son parte del contexto. Empatizar con ellas es tan importante como empatizar con los estudiantes.\n\n**Realidades que necesitan empatía:**\n• Padres que trabajan en el campo o en fábricas y no pueden acompañar tareas\n• Mamás que asumen solas la crianza mientras el papá trabaja en México\n• Hogares donde se habla lengua materna y el niño estudia en español\n• Pobreza que hace que la escuela compita con el trabajo de los niños\n• Desconfianza histórica de comunidades indígenas hacia instituciones del Estado\n\nEntender estos contextos sin juzgarlos es empatía real.', extra: { tip: 'Las reuniones de padres tradicionales son un monólogo del docente. Conviértelas en conversaciones de empatía: pregunta más de lo que informa.', activity: 'En tu próxima comunicación con padres, practica la escucha activa. ¿Qué descubres que no sabías sobre sus realidades?' } },
          { id: 'dt-m2-c9', type: 'quiz', question: 'Una docente aplica los 5 Por Qués al problema "los niños no desayunan antes de clase" y descubre que varias familias no tienen alimentos en casa por la mañana. ¿Qué debe hacer?', options: ['Castigar a los niños por llegar sin desayunar', 'Usar este insight para diseñar una solución que aborde la necesidad real, posiblemente involucrando a la comunidad o al MIDES', 'Ignorarlo porque es un problema familiar, no escolar', 'Informar a los padres que deben dar desayuno a sus hijos'], correct: 1, explanation: 'El DT lleva a soluciones sistémicas. Si la causa raíz es inseguridad alimentaria, la solución debe abordar eso, involucrando redes de apoyo comunitario.' },
          { id: 'dt-m2-c10', type: 'content', title: 'Sintetizar los hallazgos', content: 'Después de múltiples entrevistas y observaciones, tienes una gran cantidad de información. La síntesis la organiza:\n\n**Herramienta: Saturación y agrupación**\n1. Escribe cada hallazgo en una tarjeta o post-it\n2. Pégalos todos en la pared\n3. Agrúpalos por temas emergentes\n4. Nombra cada grupo\n5. Identifica el insight más poderoso de cada grupo\n\n**¿Qué buscas en los patrones?**\n• Contradicciones (dicen X pero hacen Y)\n• Frustraciones repetidas\n• Deseos no satisfechos\n• Momentos de alegría o energía\n\nEl enunciado del problema surge de los insights más poderosos.', extra: { tip: 'Sin post-its, usa tarjetas de papel. Sin pared, usa el suelo. La síntesis es un proceso físico y visual, no solo mental.', activity: 'Practica la síntesis con las notas de una observación o conversación reciente. ¿Qué grupos emergen?' } },
          { id: 'dt-m2-c11', type: 'quiz', question: 'Después de entrevistar a 8 estudiantes sobre por qué no participan en clase, la docente tiene 40 notas. ¿Cuál es el siguiente paso?', options: ['Promediar las respuestas matemáticamente', 'Agrupar los hallazgos por temas para encontrar patrones e insights', 'Elegir la respuesta más común como "la verdad"', 'Hacer una gráfica de barras con los datos'], correct: 1, explanation: 'La síntesis en DT es cualitativa, no cuantitativa. Buscamos patrones, contradicciones e insights, no promedios.' },
          { id: 'dt-m2-c12', type: 'content', title: 'De la empatía al problema: el salto creativo', content: 'El momento de pasar de Empatizar a Definir es un salto creativo: tienes que interpretar los datos, no solo reportarlos.\n\nTres preguntas que guían ese salto:\n1. ¿Qué está pasando REALMENTE? (más allá de la superficie)\n2. ¿Por qué está pasando? (causas profundas)\n3. ¿Qué necesitan las personas? (no lo que dicen que quieren, sino lo que realmente necesitan)\n\n**Ejemplo:** Los estudiantes dicen que quieren más recreo (deseo). Pero lo que realmente necesitan es más movimiento y autonomía durante el aprendizaje (necesidad profunda).\n\nUn buen enunciado de problema abre posibilidades de solución. Un enunciado pobre las cierra.', extra: { tip: 'Si tu enunciado del problema ya implica la solución (ej: "Necesitamos más tabletas"), vuelve a empezar. Un buen enunciado describe necesidades, no soluciones.', activity: 'Revisa el enunciado de problema que escribiste antes. ¿Describe una necesidad o ya implica una solución?' } },
          { id: 'dt-m2-p1', type: 'content', title: '⚡ Aplícalo mañana: los 5 Por Qués en 10 minutos', content: 'Toma UN problema visible de tu aula y aplica la técnica de los 5 Por Qués ahora mismo:\n\n**Ejemplo guiado — "Los niños no hacen la tarea":**\n\n¿Por qué? → No tienen tiempo en casa.\n¿Por qué? → Ayudan con quehaceres o cuidan hermanos menores.\n¿Por qué? → Los padres trabajan hasta tarde.\n¿Por qué? → No hay alternativa de empleo local que permita horarios más cortos.\n¿Por qué? → Estructura económica familiar que prioriza sobrevivencia sobre apoyo escolar.\n\n**El hallazgo:** el problema no es flojera ni falta de interés — es una estructura familiar real.\n**La solución cambia completamente:** en lugar de insistir con la tarea, diseña actividades de consolidación para los últimos 10 minutos de clase.\n\n**Tu turno:** escoge un problema de tu aula y aplica los 5 Por Qués. ¿Adónde llega tu cadena?', extra: { tip: 'La cadena de Por Qués puede ser de 3 o de 7 — no importa el número exacto. Lo importante es llegar a una causa que PUEDAS abordar, no solo diagnosticar.', activity: 'Aplica los 5 Por Qués al problema que más te preocupa de tu aula ahora mismo. Escribe cada nivel.' } },
          { id: 'dt-m2-p2', type: 'content', title: '📊 Antes / Después: Definir el problema correcto', content: '**❌ Enunciado de problema débil:**\n*"Necesitamos más materiales didácticos para mejorar el aprendizaje de matemáticas."*\n\n¿Por qué es débil?\n• Ya implica la solución (materiales).\n• No describe la necesidad real de los estudiantes.\n• Cierra posibilidades creativas antes de explorarlas.\n\n---\n\n**✅ Enunciado DT poderoso:**\n*"Los estudiantes de 4to primaria necesitan ver la utilidad de las fracciones en situaciones cotidianas porque actualmente las perciben como algo abstracto que no tiene aplicación en su vida."*\n\n¿Por qué es poderoso?\n• Centra a las personas (estudiantes de 4to).\n• Describe la necesidad real (ver utilidad).\n• Incluye el insight (las perciben como abstractas).\n• Abre múltiples soluciones posibles (no dice cómo resolverlo).\n\n**La diferencia:** el primero te lleva a pedir presupuesto. El segundo te lleva a encontrar la solución más creativa y efectiva.', extra: { tip: 'Formato para recordar: *"[Persona] necesita [necesidad] porque [insight]."* Cuando lo tienes bien escrito, la solución suele ser más obvia de lo que parecía.', activity: 'Escribe el enunciado DT del problema que identificaste con los 5 Por Qués. ¿Incluye persona, necesidad e insight?' } },
          { id: 'dt-m2-p3', type: 'content', title: '📋 Plantilla: Guía de entrevista de empatía (lista para usar)', content: '**Imprime o copia esta guía antes de tus entrevistas:**\n\n---\n**Persona a entrevistar:** _______________ | **Fecha:** _______________\n**Contexto / tema de investigación:** _______________\n\n**Preguntas de apertura (elige 1-2):**\n• "¿Puedes contarme cómo es un día típico para ti en la escuela?"\n• "¿Qué es lo que más disfrutas de aprender? ¿Y lo que más te cuesta?"\n• "Si pudieras cambiar una cosa de tu experiencia aquí, ¿qué sería?"\n\n**Preguntas de profundidad (úsalas cuando quieras saber más):**\n• "¿Puedes contarme más sobre eso?"\n• "¿Qué sentiste en ese momento?"\n• "¿Puedes darme un ejemplo concreto?"\n• "¿Qué pasaría si eso no existiera?"\n\n**Preguntas de cierre:**\n• "¿Hay algo que yo no te pregunté y que crees que debería saber?"\n• "¿Cómo te imaginas que podría ser diferente?"\n\n**Durante la entrevista:**\n□ No interrumpir □ No juzgar □ Escribir con sus palabras □ Notar lenguaje corporal\n\n**Notas de la entrevista:** _______________\n---\n\n*Duración ideal:* 10-15 minutos por persona. Suficiente para profundizar, no tanto como para cansar.', extra: { tip: 'La mejor entrevista de empatía se siente como una conversación, no como un cuestionario. Si estás mirando mucho el papel, practica las preguntas hasta memorizarlas.', activity: 'Haz tu primera entrevista usando esta guía. Después, ¿qué pregunta generó la respuesta más reveladora? Esa es la que debes usar siempre.' } }
        ]
      },
      {
        id: 'dt-m3',
        title: 'Idear y Prototipar',
        icon: '💭',
        cards: [
          { id: 'dt-m3-c1', type: 'content', title: 'Fase 3: Idear — la explosión creativa', content: 'Idear es la fase donde generas la mayor cantidad posible de soluciones, sin juzgar ninguna todavía.\n\n**La regla número uno de Ideación:** cantidad antes que calidad. En esta fase, una idea "mala" puede inspirar la idea brillante que sigue.\n\n**Principios de la ideación:**\n• Aplaza el juicio (no "eso no va a funcionar")\n• Construye sobre las ideas de otros ("sí, y además...")\n• Busca la cantidad (mínimo 20-30 ideas antes de filtrar)\n• Acepta las ideas locas (a menudo tienen el germen de algo valioso)\n• Sé visual (dibuja, no solo escribe)', extra: { tip: 'El "brainstorming" mal hecho es una persona que domina la conversación. Un buen brainstorming tiene reglas claras, silencio individual primero, y construcción colectiva después.', activity: 'Haz un brainstorming de 3 minutos solo para el problema de tu aula. Escribe sin detenerte. No borres nada.' } },
          { id: 'dt-m3-c2', type: 'content', title: 'Técnicas de ideación para el aula', content: '**Brainstorming clásico**: todos gritan ideas, alguien las anota. Funciona con equipos extrovertidos.\n\n**Brainwriting**: cada uno escribe ideas en silencio 3 minutos, luego rota la hoja y construye sobre las ideas del anterior. Más equitativo.\n\n**Crazy 8s**: dobla una hoja en 8 partes. En 8 minutos, dibuja 8 ideas distintas (1 minuto por idea). La velocidad fuerza creatividad.\n\n**"¿Cómo podríamos...?"**: convierte el enunciado del problema en múltiples preguntas "¿Cómo podríamos...?" y responde cada una con ideas.\n\n**Peor idea posible**: genera deliberadamente las peores soluciones imaginables, luego inviértelas. A veces la inversión es brillante.', extra: { tip: 'Con estudiantes guatemaltecos, las técnicas visuales (Crazy 8s, dibujo) funcionan especialmente bien porque la expresión gráfica no requiere dominio del español escrito.', activity: 'Prueba Crazy 8s con un problema de tu aula. ¿Cuál de las 8 ideas te sorprendió más?' } },
          { id: 'dt-m3-c3', type: 'quiz', question: 'Durante una sesión de ideación, un colega dice "esa idea es imposible". ¿Cómo responde el facilitador?', options: ['Acepta la crítica porque es importante ser realista', 'Recuerda la regla: no juzgar durante ideación. Todas las ideas se escriben. La evaluación viene después', 'Elimina al colega negativo de la sesión', 'Para la sesión y debate la viabilidad de esa idea'], correct: 1, explanation: 'Durante ideación, el juicio está suspendido. Las ideas "imposibles" a menudo contienen el germen de soluciones innovadoras cuando se las toma como punto de partida.' },
          { id: 'dt-m3-c4', type: 'content', title: 'Seleccionar ideas: de muchas a una', content: 'Después de generar 20-30+ ideas, es momento de seleccionar. No eliminas las demás: las guardas para futuros proyectos.\n\n**Métodos de selección:**\n\n🗳️ **Votación de puntos**: cada persona tiene 3 puntos (pegatinas o marcas) y los distribuye entre las ideas que más le gustan. Las más votadas siguen.\n\n⚖️ **Matriz de impacto/esfuerzo**: dibuja ejes (impacto vs. esfuerzo). Ubica cada idea. Las de alto impacto y bajo esfuerzo son las primeras a prototipar.\n\n🎯 **Mejor-Peor-Más loca**: selecciona la más prometedora, la más segura, y la más radical para prototipar las tres.\n\nNo elijas la más "razonable" automáticamente. A veces la más loca es la más creativa.', extra: { tip: 'La matriz impacto/esfuerzo es especialmente útil en contextos con recursos limitados: maximiza el impacto con lo que tienes disponible.', activity: 'Toma las ideas de tu brainstorming. Dibuja la matriz impacto/esfuerzo y ubica al menos 5 ideas en ella.' } },
          { id: 'dt-m3-c5', type: 'content', title: 'Fase 4: Prototipar — hacer para pensar', content: 'Un prototipo en DT no es el producto final. Es una versión rápida y barata de una idea para aprender de ella.\n\n**Principios del prototipado:**\n• Rápido: en horas, no semanas\n• Barato: materiales básicos\n• Evocador: debe comunicar la idea, no ser perfecto\n• Descartable: si falla, no importa, eso es información\n\n**Tipos de prototipos para docentes:**\n• Boceto en papel (para flujos de actividades)\n• Juego de roles (para prototipar interacciones)\n• Maqueta física (con cartón, plasticina)\n• Guion gráfico (storyboard para secuencias)\n• Prototipo de papel (para apps o materiales impresos)', extra: { tip: '"Si vale la pena prototipar, vale la pena hacerlo mal." Un prototipo imperfecto que puedes probar hoy vale más que un diseño perfecto que probarás en 6 meses.', activity: 'Elige tu mejor idea de la fase anterior. Haz un prototipo en 15 minutos con papel, lápiz y lo que tengas a mano.' } },
          { id: 'dt-m3-c6', type: 'quiz', question: '¿Cuánto tiempo y recursos debería tomar crear un prototipo en Design Thinking?', options: ['Semanas de trabajo cuidadoso para que sea perfecto', 'El menor tiempo y recursos posibles que permitan comunicar la idea y probarla', 'Exactamente 1 mes de desarrollo', 'Solo debe hacerlo un experto en diseño'], correct: 1, explanation: 'Un prototipo es para aprender, no para impresionar. La rapidez y el bajo costo son funciones, no descuidos. Un buen prototipo falla pronto y barato.' },
          { id: 'dt-m3-c7', type: 'content', title: 'Prototipos educativos: ejemplos prácticos', content: '¿Qué aspecto de tu práctica docente quieres mejorar? Aquí ejemplos de prototipos educativos:\n\n**Problema**: estudiantes no participan en discusiones\n**Prototipo**: cambia el arreglo de asientos a círculo por una semana y observa qué pasa\n\n**Problema**: tareas no se entregan\n**Prototipo**: durante 2 semanas, cambia las tareas por preguntas de reflexión de 3 minutos al final de clase\n\n**Problema**: niños que no leen\n**Prototipo**: crea una "caja de libros de libre elección" con materiales donados y observa si cambia la actitud lectora\n\nCada uno de estos es un prototipo: rápido, barato, aprendemos de él.', extra: { tip: 'Los mejores prototipos educativos duran 1-2 semanas. Suficiente para observar, insuficiente para comprometerte irreversiblemente.', activity: 'Para tu problema de aula, diseña un prototipo que puedas probar esta semana. Escribe qué observarás para saber si funciona.' } },
          { id: 'dt-m3-c8', type: 'content', title: 'Fase 5: Evaluar — aprender del prototipo', content: 'Evaluar en DT no es pasar o reprobar el prototipo. Es extraer aprendizaje para mejorar.\n\n**Las 4 preguntas de la evaluación:**\n1. ¿Qué funcionó mejor? (guardar esto)\n2. ¿Qué no funcionó como esperaba? (información valiosa)\n3. ¿Qué preguntas nuevas emergieron? (para el siguiente ciclo)\n4. ¿Qué cambiamos en la siguiente versión?\n\n**¿Con quién evaluamos?**\n• Con las personas para quienes diseñamos (estudiantes, familias)\n• Con colegas que pueden dar perspectiva externa\n• Con nosotros mismos (autoevaluación honesta)\n\nLa evaluación lleva al siguiente ciclo: empatizar de nuevo, redefinir si es necesario, idear nuevas variantes.', extra: { tip: 'La evaluación más honesta viene de las personas que usaron el prototipo. Sus reacciones espontáneas valen más que sus respuestas a preguntas directas.', activity: 'Después de probar tu prototipo, responde las 4 preguntas de evaluación. ¿Qué harías diferente en la versión 2?' } },
          { id: 'dt-m3-c9', type: 'quiz', question: 'Una docente prueba un nuevo sistema de evaluación (prototipo) y 6 de 10 estudiantes lo encuentran confuso. ¿Qué concluye?', options: ['El prototipo falló y hay que abandonar la idea', 'Tiene información valiosa: 6 estudiantes sintieron confusión, lo que orienta específicamente qué mejorar en la versión 2', 'La culpa es de los estudiantes que no se adaptan', 'El sistema de evaluación original era mejor'], correct: 1, explanation: 'En DT, un prototipo que "falla" da información específica sobre qué mejorar. El fracaso es datos, no un veredicto final.' },
          { id: 'dt-m3-c10', type: 'content', title: 'El ciclo de iteración', content: 'Después de evaluar, el proceso regresa. No al inicio, sino al punto donde el aprendizaje indica que debes volver.\n\n**Si descubriste que no entendías bien el problema** → vuelve a Empatizar\n**Si el enunciado del problema no era preciso** → vuelve a Definir\n**Si la idea no era la correcta** → vuelve a Idear\n**Si el prototipo comunicó mal la idea** → mejora el Prototipo\n\nCada ciclo hace la solución más robusta porque incorpora aprendizaje real.\n\n**En la educación**: este ciclo puede durar desde 2 semanas (una práctica de aula) hasta un año escolar completo (rediseño curricular).', extra: { tip: 'El DT es paciente pero no infinito. Define cuántos ciclos harás antes de comprometerte con una solución. Demasiada iteración sin cierre también es un problema.', activity: '¿Cuántos ciclos le darías al problema de tu aula? ¿Cuándo dirías "esta es la solución suficientemente buena"?' } },
          { id: 'dt-m3-c11', type: 'quiz', question: 'Después de 3 iteraciones, el prototipo educativo funciona bien para el 75% de los estudiantes pero no para el 25%. ¿Qué haces?', options: ['Abandonar el proyecto porque no funciona para todos', 'Empatizar específicamente con el 25% para entender qué necesitan diferente y diseñar una variante', 'Declarar el proyecto exitoso e ignorar al 25%', 'Volver completamente al inicio'], correct: 1, explanation: 'El DT nunca abandona a las personas. El 25% no atendido es la nueva oportunidad de empatía y rediseño. Las soluciones raramente son universales al primer intento.' },
          { id: 'dt-m3-p1', type: 'content', title: '⚡ Aplícalo mañana: Crazy 8s en 10 minutos', content: 'Esta técnica funciona para resolver cualquier problema — de aula, de práctica docente, de convivencia. Hazla ahora mismo:\n\n**Instrucciones:**\n1. Dobla una hoja en 8 partes iguales (4 arriba, 4 abajo).\n2. Pon un temporizador en 8 minutos.\n3. En cada cuadro, dibuja o escribe UNA idea diferente para resolver tu problema.\n4. 1 minuto por cuadro — cuando se acaba, pasa al siguiente aunque no hayas terminado.\n\n**El truco:** La velocidad te impide criticarte. Tienes que poner algo, lo que sea. Eso activa la creatividad.\n\n**Al terminar, mira tus 8 ideas y marca:**\n⭐ La que más te emociona aunque parezca loca.\n✅ La que podrías probar esta semana.\n🔄 La que podrías combinar con otra.\n\n**Mañana en clase:** haz lo mismo con tus estudiantes para el proyecto de ellos. 8 minutos, 8 ideas, todos en silencio.', extra: { tip: 'La idea número 7 u 8 suele ser la más creativa porque para entonces ya agotaste las "obvias" y tu cerebro busca alternativas. No te detengas antes de llegar ahí.', activity: 'Haz Crazy 8s ahora mismo con el problema de tu aula. Tienes 8 minutos. ¿Qué idea te sorprendió?' } },
          { id: 'dt-m3-p2', type: 'content', title: '📊 Antes / Después: Prototipar una práctica de aula', content: '**❌ Cambio sin prototipo:**\nLa docente decide que desde el primer día del mes nuevo va a cambiar completamente cómo hace las evaluaciones: exámenes fuera, portafolios digitales dentro. Compra materiales, rediseña su sistema de calificación, lo anuncia a los padres.\n\nTres semanas después: los estudiantes están confundidos, los padres preguntan por las notas, y la docente está exhausta y sin certeza de si funciona.\n\n---\n\n**✅ Con prototipo rápido:**\n\nSemana 1: *"Voy a probar el portafolio con UN grado durante 2 semanas. Solo 5 evidencias. Sin cambiar nada más."*\n\nSemana 2: Observa qué funciona, qué confunde, qué preguntan los estudiantes.\n\nSemana 3: Ajusta 2 cosas específicas basadas en lo observado.\n\nSemana 4: Decide si escalar al resto de grados, con qué ajustes.\n\n**Lo que evitó:** agotamiento, confusión generalizada, retroceso forzado.\n**Lo que ganó:** evidencia real de si funciona antes de comprometerse completamente.', extra: { tip: 'La regla del prototipo educativo: no cambies TODO al mismo tiempo. Un cambio pequeño bien observado enseña más que un cambio total mal implementado.', activity: '¿Hay algo de tu práctica que quieres cambiar? Diseña el prototipo: ¿qué cambiarías, con quién, por cuánto tiempo, y cómo sabrás si funcionó?' } },
          { id: 'dt-m3-p3', type: 'content', title: '📋 Plantilla: Diseño de prototipo educativo (15 minutos)', content: '**Antes de probar cualquier cambio en tu práctica, completa esto:**\n\n---\n🎯 **La idea que voy a prototipar:**\n___________________________________\n\n👥 **Con quién lo probaré:**\n□ Un grupo pequeño □ Un grado completo □ Con mis colegas □ Solo\n\n⏱ **Por cuánto tiempo:**\n□ 1 clase □ 1 semana □ 2 semanas □ 1 mes\n\n📦 **Qué necesito para hacerlo:**\n___________________________________\n\n**🔍 Qué observaré para saber si funciona:**\n(sé específico — no "si les gusta" sino "si participan más en los primeros 10 minutos")\n___________________________________\n\n**✅ Señales de que va bien:**\n___________________________________\n\n**⚠️ Señales de que necesito ajustar:**\n___________________________________\n\n**📝 Después del prototipo, responderé:**\n1. ¿Qué funcionó exactamente?\n2. ¿Qué no funcionó y por qué (hipótesis)?\n3. ¿Qué cambiaría en la versión 2?\n4. ¿Vale la pena escalar? ¿Cómo y cuándo?\n---', extra: { tip: 'El paso más importante de esta plantilla es "Qué observaré". Sin criterios claros de éxito definidos ANTES, cualquier resultado se puede interpretar como éxito. La claridad previa evita el autoengaño.', activity: 'Completa esta plantilla para la próxima práctica que quieras probar. La semana que viene compártela con un colega y comparen notas.' } }
        ]
      },
      {
        id: 'dt-m4',
        title: 'DT en el aula guatemalteca',
        icon: '🏫',
        cards: [
          { id: 'dt-m4-c1', type: 'content', title: 'Design Thinking como herramienta estudiantil', content: 'Cuando los estudiantes usan DT (no solo el docente), el aprendizaje se multiplica.\n\n**¿Desde qué edad?**\n• Preprimaria: versión simplificada con "Siente, Imagina, Haz, Comparte"\n• Primaria (1-3): empatía visual (dibujar a alguien con un problema), ideas en dibujos\n• Primaria (4-6): proceso completo simplificado con entrevistas entre compañeros\n• Básico y diversificado: proceso completo con herramientas avanzadas\n\nLos niños son naturalmente curiosos y empáticos. DT los enfrenta a pensar sistemáticamente de una manera que ya hacen intuitivamente.', extra: { tip: 'El primer proyecto de DT con estudiantes debería resolver un problema de ELLOS (algo del aula o escuela) antes de abordar problemas comunitarios.', activity: '¿Cuál sería el primer problema que le presentarías a tus estudiantes para resolver con DT? ¿Por qué ese?' } },
          { id: 'dt-m4-c2', type: 'content', title: 'Proyectos DT para distintos niveles en Guatemala', content: '**Preprimaria**: ¿Cómo hacemos que el rincón de juego sea mejor para todos?\n\n**Primaria 1-3**: ¿Cómo podemos hacer que la hora del recreo sea más divertida y justa?\n\n**Primaria 4-6**: ¿Cómo podría nuestra escuela ayudar a las familias a saber qué aprenden sus hijos?\n\n**Básico**: ¿Cómo podría la biblioteca de nuestra aldea atraer a más jóvenes?\n\n**Diversificado**: ¿Cómo puede nuestra comunidad reducir la migración hacia Estados Unidos atendiendo las necesidades reales de los jóvenes?\n\nCada pregunta parte de la realidad guatemalteca e invita a empatizar con personas del entorno.', extra: { tip: 'Empieza con el problema más pequeño y concreto posible. "Mejorar el recreo" es mejor primer proyecto DT que "resolver la migración".', activity: 'Adapta una de estas preguntas al nivel y contexto específico de tu escuela.' } },
          { id: 'dt-m4-c3', type: 'quiz', question: 'Para implementar Design Thinking con niños de 2do primaria, ¿cuál es el mejor punto de partida?', options: ['El proceso de 5 fases completo con todas las herramientas', 'Un problema simple y cercano (ej: el rincón de lectura) con herramientas visuales adaptadas a su edad', 'Primero leer varios libros sobre DT', 'Esperar hasta que estén en básico'], correct: 1, explanation: 'Con niños pequeños, el DT se simplifica y se hace visual y físico. El problema debe ser de su entorno inmediato y las herramientas deben ser concretas.' },
          { id: 'dt-m4-c4', type: 'content', title: 'DT para resolver problemas reales del aula', content: 'Como docente, puedes usar DT para resolver tus propios problemas pedagógicos:\n\n**Proceso de 4 semanas:**\n• Semana 1: Observa y entrevista (empatiza con tus estudiantes sobre el problema)\n• Semana 2: Define el problema real y genera ideas en 30 min\n• Semana 3: Prototipa y prueba la mejor idea\n• Semana 4: Evalúa, ajusta y decide si continuar o iterar\n\n**Problemas que docentes guatemaltecos han resuelto así:**\n• Deserción escolar en período de cosecha\n• Estudiantes bilingües que se avergüenzan de hablar en su lengua materna\n• Falta de materiales para ciencias naturales\n• Conflictos de convivencia en recreo', extra: { tip: 'Documenta tu proceso en un cuaderno. Cuando funcione, tu documentación se convierte en un caso de estudio que puede ayudar a otros docentes.', activity: 'Elige un problema de tu práctica docente y planifica las 4 semanas del proceso DT.' } },
          { id: 'dt-m4-c5', type: 'content', title: 'Empatía con comunidades indígenas: sensibilidades culturales', content: 'Al implementar DT en comunidades indígenas guatemaltecas, hay sensibilidades importantes:\n\n⚠️ **El extractivismo de conocimiento**: llegar a preguntar y luego no devolver nada es una práctica colonial. El DT debe beneficiar a la comunidad.\n\n🤝 **La reciprocidad**: en muchas culturas mayas, el conocimiento se comparte con reciprocidad. Considera cómo la escuela puede retribuir.\n\n👵 **Quién tiene autoridad para hablar**: en algunas comunidades, los ancianos deben ser consultados antes que los padres o jóvenes.\n\n🌿 **El conocimiento ceremonial**: algunas cosas no son para compartir públicamente. Respetar esos límites es empatía.\n\n🌍 **El idioma**: entrevistar en lengua materna produce respuestas más ricas y verdaderas.', extra: { tip: 'Antes de implementar DT en una comunidad indígena, conversa con el COCODE y con ancianos sobre el proceso. Su validación abre puertas que ninguna metodología puede abrir sola.', activity: '¿Hay alguna sensibilidad cultural específica de tu comunidad que deberías tener en cuenta al hacer entrevistas de empatía?' } },
          { id: 'dt-m4-c6', type: 'quiz', question: 'Un equipo de docentes va a entrevistar familias mayas para entender por qué los niños dejan la escuela. ¿Cuál es el primer paso?', options: ['Ir directamente a las casas a hacer las entrevistas', 'Presentar el proceso al COCODE y pedir orientación sobre cómo acercarse a la comunidad con respeto', 'Hacer las entrevistas en español para que sea más eficiente', 'Enviar un cuestionario escrito a las familias'], correct: 1, explanation: 'En comunidades indígenas, el protocolo comunitario precede cualquier acción. El COCODE es la instancia de validación que abre puertas y garantiza relaciones respetuosas.' },
          {
            id: 'dt-m4-p1',
            type: 'project',
            title: 'Rediseña una experiencia del aula',
            description: 'Aplica el proceso completo de Design Thinking para mejorar una experiencia de aprendizaje en tu aula.',
            objective: 'Desarrollar una solución prototipada basada en empatía real con tus estudiantes para resolver un problema concreto de tu práctica docente.',
            materials: ['Papel bond y cartulinas', 'Marcadores de colores', 'Post-its o tarjetas de papel', 'Cámara o cuaderno para documentar'],
            steps: [
              'Define el problema a resolver en tu aula',
              'Conduce 3 entrevistas de empatía con estudiantes',
              'Completa un Mapa de Empatía',
              'Escribe el enunciado del problema en formato DT',
              'Haz una sesión de ideación (Crazy 8s)',
              'Crea un prototipo rápido de tu mejor idea',
              'Pruébalo con 3-5 estudiantes y documenta sus reacciones'
            ],
            think: [
              '¿Realmente entiendo la perspectiva de mis estudiantes o estoy asumiendo?',
              '¿Mi enunciado del problema describe una necesidad o ya implica una solución?',
              '¿Qué me sorprendió durante las entrevistas de empatía?',
              '¿Cómo sabré si el prototipo funcionó?'
            ],
            make: [
              'Mapa de empatía completo de al menos 2 estudiantes',
              'Enunciado del problema en formato [Persona] necesita [necesidad] porque [insight]',
              '8 ideas en formato Crazy 8s',
              'Prototipo físico o de proceso de tu mejor idea',
              'Nota de evaluación con las 4 preguntas de evaluación DT'
            ],
            improve: [
              '¿Qué haría diferente en la fase de empatía si tuvieras más tiempo?',
              '¿Tu solución funcionaría para todos los estudiantes o solo para algunos?',
              '¿Cómo podrías involucrar a las familias en el proceso?',
              'Planifica la versión 2 del prototipo con los aprendizajes de la prueba'
            ]
          },
          { id: 'dt-m4-c7', type: 'content', title: 'Herramientas DT sin tecnología', content: 'El Design Thinking no necesita tecnología. Aquí las herramientas en versión sin internet:\n\n📝 **Post-it** → tarjetas de papel\n🖥️ **Miro** → papel bond en la pared\n📊 **Google Forms** → hojas de preguntas a mano\n🎨 **Canva** → dibujo en papel\n🗂️ **Notion** → cuaderno de proyecto\n📷 **Cámara** → dibujos o descripción escrita\n\nEn comunidades con recursos limitados, un juego de marcadores de colores, papel bond y mucha curiosidad es suficiente para todo el proceso DT.', extra: { tip: 'Algunos de los proyectos DT más innovadores del mundo se hicieron con lápiz y papel. La creatividad no requiere tecnología, la tecnología puede potenciarla.', activity: 'Adapta tu kit DT al contexto de tu escuela. ¿Con qué materiales disponibles puedes hacer cada fase del proceso?' } },
          { id: 'dt-m4-c8', type: 'content', title: 'DT y el trabajo colaborativo entre docentes', content: 'El DT es aún más poderoso cuando lo practican equipos de docentes juntos.\n\n**Comunidad de Aprendizaje DT:**\n• Reuniones mensuales de 90 minutos\n• Cada docente comparte un problema de práctica\n• El grupo aplica empatía colectiva e ideación\n• Se diseñan prototipos juntos\n• Se documentan y comparten los aprendizajes\n\n**Beneficios:**\n• Perspectivas diversas enriquecen el proceso\n• Los docentes se apoyan mutuamente en la implementación\n• Crea cultura de mejora continua en la escuela\n• Rompe el aislamiento de "mi salón es mi isla"', extra: { tip: 'El CTA (Centro Técnico de Apoyo) de tu municipio puede ser el espacio para estas comunidades de aprendizaje DT. Propón el modelo a tu supervisor educativo.', activity: '¿Qué colegas de tu escuela o zona se unirían a una comunidad de aprendizaje DT? ¿Cuándo podrían reunirse?' } },
          { id: 'dt-m4-c9', type: 'quiz', question: '¿Cuál es el mayor beneficio de implementar DT en equipos de docentes en lugar de individualmente?', options: ['Es más rápido porque hay más personas', 'La diversidad de perspectivas enriquece la empatía y la ideación, y el apoyo mutuo facilita la implementación', 'Los docentes aprenden menos porque dependen de otros', 'Requiere menos preparación individual'], correct: 1, explanation: 'Los equipos de docentes tienen perspectivas diversas sobre los mismos estudiantes y contextos. Esa diversidad hace el DT más rico y las soluciones más robustas.' },
          { id: 'dt-m4-c10', type: 'content', title: '¡Felicitaciones! Eres un Design Thinker', content: 'Has completado el curso de Design Thinking para Docentes. Ahora tienes:\n\n✅ Comprensión del proceso de 5 fases (Empatizar, Definir, Idear, Prototipar, Evaluar)\n✅ Herramientas de empatía: entrevistas, mapa de empatía, síntesis\n✅ Técnicas de ideación: brainstorming, brainwriting, Crazy 8s\n✅ Habilidades de prototipado rápido con recursos mínimos\n✅ Sensibilidades culturales para aplicar DT en contextos guatemaltecos\n\nEl Design Thinking, como el ABP, se aprende haciéndolo. El siguiente paso es elegir UN problema de tu práctica y comenzar.\n\n¡El cambio en tu aula comienza con una pregunta y la curiosidad de escuchar!', extra: { tip: 'Comparte este curso con un colega. El DT practicado en comunidad de docentes tiene 3x más impacto que practicado en solitario.', activity: '¿Cuál es el primer problema de tu aula que vas a abordar con Design Thinking? Anótalo y compártelo con alguien.' } },
          { id: 'dt-m4-p1b', type: 'content', title: '⚡ Aplícalo mañana: DT para resolver el recreo', content: 'El recreo es uno de los mejores contextos para practicar DT con estudiantes porque el problema les importa genuinamente.\n\n**El proceso en 5 días (15 min por día):**\n\n**Lunes — Empatizar:**\nCada estudiante observa el recreo con un cuaderno. ¿Quién participa? ¿Quién no? ¿Dónde se agrupan? ¿Qué conflictos ves?\n\n**Martes — Definir:**\nEn equipos: "¿Cuál es el problema real del recreo para alguien que no la pasa bien?" Escriben 1 enunciado.\n\n**Miércoles — Idear:**\nCrazy 8s: 8 ideas en 8 minutos para mejorar el recreo para esa persona.\n\n**Jueves — Prototipar:**\nEligen 1 idea y la prueban mañana durante el recreo mismo.\n\n**Viernes — Evaluar:**\n¿Funcionó? ¿Qué cambiarían? ¿Lo proponen a la directora?\n\n**Resultado:** los estudiantes aprendieron DT y mejoraron algo real de su escuela en una semana.', extra: { tip: 'El recreo funciona porque todos tienen opinión y todos se ven afectados. Un proyecto sobre "algo que nos importa" siempre genera más compromiso que "algo que el docente eligió".', activity: 'Adapta esta secuencia de 5 días a la problemática específica que más afecta a tus estudiantes. ¿Qué usarías en lugar del recreo?' } },
          { id: 'dt-m4-p2b', type: 'content', title: '📊 Antes / Después: Reunión de padres con DT', content: '**❌ Reunión de padres tradicional:**\nEl docente habla 45 minutos sobre los contenidos del bimestre, las notas y las normas. Los padres escuchan o se duermen. Se van sin haber aportado nada. El docente no sabe nada nuevo sobre las familias.\n\nResultado: los mismos problemas siguen el próximo bimestre porque nadie los abordó realmente.\n\n---\n\n**✅ Reunión de padres con herramientas DT:**\n\n*Primeros 15 min — Empatizar:*\nEn mesas de 5: "¿Cuál es el mayor reto de su hijo/a en la escuela? ¿Qué les preocupa más?"\nTú escuchas. Anotas. No respondes aún.\n\n*20 min — Sintetizar colectivamente:*\nEn plenaria: "Lo que más escuché fue..." y escribes los temas en la pizarra.\n\n*15 min — Idear juntos:*\n"¿Qué podríamos hacer — escuela y familias — para abordar esto?"\n\n*5 min — Compromisos concretos:*\nCada quien sale con UNA acción específica.\n\n**Lo que cambia:** los padres se sienten escuchados. El docente tiene información real. Y hay compromisos, no solo información.', extra: { tip: 'La reunión de padres con DT puede ser incómoda la primera vez porque cambia quién habla más. Vale la pena el incómodo — la información que obtienes no la conseguirías de otra forma.', activity: '¿Cuándo es tu próxima reunión de padres? Adapta este formato y prueba aunque sea las primeras 2 fases.' } },
          { id: 'dt-m4-p3b', type: 'content', title: '📋 Plantilla: Proceso DT completo en 4 semanas (para docentes)', content: '**Usa esta guía para tu primer proyecto DT real:**\n\n---\n🔍 **El problema que voy a abordar:**\n___________________________________\n\n**📅 Semana 1 — EMPATIZAR**\n□ Identificar a quién voy a entrevistar (mín. 3 personas)\n□ Preparar guía de entrevista\n□ Hacer las entrevistas y documentar\n□ Completar Mapas de Empatía\n\n**📅 Semana 2 — DEFINIR + IDEAR**\n□ Sintetizar hallazgos (agrupar insights)\n□ Escribir enunciado DT: "[Persona] necesita [necesidad] porque [insight]"\n□ Sesión de Crazy 8s (al menos 8 ideas)\n□ Seleccionar 1-2 ideas para prototipar (matriz impacto/esfuerzo)\n\n**📅 Semana 3 — PROTOTIPAR + EVALUAR**\n□ Crear prototipo rápido de la idea elegida\n□ Probar con 3-5 personas reales\n□ Documentar reacciones (no opiniones — observaciones)\n□ Completar las 4 preguntas de evaluación DT\n\n**📅 Semana 4 — ITERAR O IMPLEMENTAR**\n□ Ajustar el prototipo con los aprendizajes\n□ Decidir: ¿segunda iteración o escalamiento?\n□ Documentar el proceso para compartir con colegas\n\n---\n\n**Al finalizar:** tienes un caso de estudio real de DT en tu aula. Eso ya es innovación educativa documentada.', extra: { tip: 'No necesitas hacer las 4 semanas perfectamente. Incluso una semana de empatía real ya cambia cómo percibes el problema. El proceso te transforma aunque no lo termines.', activity: 'Escribe la fecha de inicio de tu Semana 1. Ese compromiso es el primer paso.' } }
        ]
      }
    ],
    finalExam: {
        title: 'Examen Final: Design Thinking para Docentes',
        passingScore: 70,
        questions: [
            { id: 1, text: '¿Cuál es el principio fundamental del Design Thinking?', options: ['Usar tecnología para resolver problemas', 'Partir de la empatía con las personas que viven el problema', 'Encontrar la solución más lógica', 'Seguir un proceso lineal rígido'], correct: 1, explanation: 'La empatía es el corazón del DT. Sin entender genuinamente a las personas, cualquier solución es una suposición.' },
            { id: 2, text: '¿Cuáles son las 5 fases del Design Thinking en orden?', options: ['Planificar, Diseñar, Construir, Probar, Entregar', 'Empatizar, Definir, Idear, Prototipar, Evaluar', 'Investigar, Analizar, Proponer, Implementar, Evaluar', 'Observar, Diseñar, Hacer, Presentar, Calificar'], correct: 1, explanation: 'Empatizar → Definir → Idear → Prototipar → Evaluar son las 5 fases del DT, aunque se pueden recorrer de manera no lineal.' },
            { id: 3, text: '¿Qué herramienta organiza los hallazgos de la empatía en 4 cuadrantes (Dice, Hace, Piensa, Siente)?', options: ['La rúbrica de evaluación', 'El Mapa de Empatía', 'El Mapa del Proyecto', 'La matriz FODA'], correct: 1, explanation: 'El Mapa de Empatía organiza los datos de la investigación de empatía para revelar patrones y necesidades profundas.' },
            { id: 4, text: '¿Cuál es el formato correcto del enunciado del problema en Design Thinking?', options: ['El problema es que los estudiantes no participan', '[Persona] necesita [necesidad] porque [insight]', 'Debemos implementar [solución]', 'La causa del problema es [factor externo]'], correct: 1, explanation: 'El formato [Persona] necesita [necesidad] porque [insight] centra la perspectiva en las personas y abre posibilidades de solución.' },
            { id: 5, text: '¿Cuál es la regla más importante durante la fase de ideación?', options: ['Solo proponer ideas que seguramente funcionarán', 'Aplazar el juicio: generar cantidad antes que calidad', 'El docente elige las ideas que se van a desarrollar', 'Buscar la idea más lógica y racional'], correct: 1, explanation: 'Aplazar el juicio durante la ideación permite que emerjan ideas creativas que de otro modo serían silenciadas prematuramente.' },
            { id: 6, text: '¿Qué es un prototipo en el contexto del Design Thinking?', options: ['El producto final perfecto y terminado', 'Una versión rápida y barata de una idea para aprender de ella', 'Un modelo a escala exacta del producto', 'Solo aplica a productos físicos, no a prácticas educativas'], correct: 1, explanation: 'Un prototipo es para aprender, no para impresionar. Debe ser rápido, barato y descartable si es necesario.' },
            { id: 7, text: 'Después de probar un prototipo que no funcionó como esperabas, ¿qué haces?', options: ['Abandonar la idea y buscar una completamente diferente', 'Extraer el aprendizaje específico del fracaso y usarlo para mejorar la siguiente versión', 'Continuar implementándolo porque ya invertiste tiempo', 'Volver al inicio del proceso desde cero'], correct: 1, explanation: 'En DT, el fracaso es información valiosa. Lo que no funcionó te dice exactamente qué mejorar en la siguiente iteración.' },
            { id: 8, text: '¿Por qué el DT no necesita ser lineal?', options: ['Porque los docentes no tienen tiempo para seguir el orden', 'Porque el proceso responde a lo que vas descubriendo; a veces necesitas volver a empatizar o redefinir', 'Porque el orden de las fases no importa', 'Porque la tecnología lo hace automáticamente'], correct: 1, explanation: 'El DT es iterativo: cada ciclo aporta aprendizaje que puede llevarte a ajustar cualquier fase anterior. La flexibilidad es una fortaleza, no una debilidad.' },
            { id: 9, text: '¿Qué diferencia una entrevista de empatía de una encuesta?', options: ['La entrevista es más rápida', 'La entrevista busca comprender la experiencia y los sentimientos, no datos numéricos; usa preguntas abiertas y escucha activa', 'La encuesta es más confiable', 'No hay diferencia significativa'], correct: 1, explanation: 'La empatía requiere historias y profundidad, no estadísticas. La entrevista de empatía es conversacional y centrada en la experiencia subjetiva.' },
            { id: 10, text: '¿Qué debe hacer el facilitador si alguien critica una idea durante la ideación?', options: ['Aceptar la crítica porque el grupo necesita ser realista', 'Recordar la regla de no juzgar y pedir que todas las ideas se registren primero', 'Eliminar la idea criticada inmediatamente', 'Debatir la viabilidad de la idea en ese momento'], correct: 1, explanation: 'Durante la ideación, todas las ideas tienen valor. El juicio llega después, en la fase de selección de ideas.' },
            { id: 11, text: '¿Cómo se adapta el DT para niños de primaria baja?', options: ['No se puede aplicar con niños pequeños', 'Con herramientas visuales y concretas, problemas de su entorno inmediato y versiones simplificadas del proceso', 'Exactamente igual que con adultos', 'Solo usando tecnología interactiva'], correct: 1, explanation: 'Con niños pequeños el DT se hace visual, físico y con problemas concretos cercanos. La curiosidad y empatía infantil son recursos naturales.' },
            { id: 12, text: '¿Qué es el Crazy 8s?', options: ['Un juego de cartas para equipos', 'Una técnica de ideación donde se generan 8 ideas diferentes en 8 minutos mediante dibujos', 'Un método de evaluación de prototipos', 'Un tipo de entrevista de empatía grupal'], correct: 1, explanation: 'Crazy 8s usa la velocidad (1 minuto por idea) para forzar la creatividad. La presión de tiempo impide la autocrítica y genera variedad.' },
            { id: 13, text: 'Al implementar DT en comunidades indígenas guatemaltecas, ¿cuál es el primer paso?', options: ['Iniciar las entrevistas inmediatamente para no perder tiempo', 'Consultar con el COCODE y líderes comunitarios para entender el protocolo cultural', 'Hacer las entrevistas en español para mayor eficiencia', 'Aplicar el proceso exactamente como en otros contextos'], correct: 1, explanation: 'El respeto a los protocolos comunitarios es empatía en acción. Sin la validación comunitaria, el DT se convierte en extractivismo de conocimiento.' },
            { id: 14, text: '¿Cuál es la técnica de los 5 Por Qués?', options: ['Un examen de 5 preguntas para los estudiantes', 'Preguntar "por qué" sucesivamente para llegar a la causa raíz de un problema', 'Un método de evaluación de 5 criterios', 'Cinco preguntas de ideación'], correct: 1, explanation: 'Preguntar "¿por qué?" sucesivamente revela las causas profundas de los problemas, evitando soluciones superficiales que no resuelven la raíz.' },
            { id: 15, text: '¿Qué es el brainwriting?', options: ['Escribir un ensayo sobre ideas de negocio', 'Cada persona escribe ideas en silencio y luego pasa la hoja para que otros construyan sobre ellas', 'Un diario de reflexión personal', 'Una técnica para evaluar prototipos'], correct: 1, explanation: 'El brainwriting es más equitativo que el brainstorming oral porque todos participan simultáneamente y en silencio, evitando que los más extrovertidos dominen.' },
            { id: 16, text: '¿Por qué es importante que el enunciado del problema NO implique ya la solución?', options: ['Para que el proceso sea más largo', 'Para mantener abierto el espacio de soluciones posibles y no llegar sesgados a la ideación', 'Porque las soluciones son responsabilidad de los estudiantes', 'No importa si implica la solución o no'], correct: 1, explanation: 'Un enunciado que ya implica la solución cierra el espacio creativo. "Necesitamos tabletas" no es un problema, es ya una solución no verificada.' },
            { id: 17, text: '¿Qué beneficio tiene usar DT en equipos de docentes?', options: ['Reduce el trabajo individual de cada docente', 'La diversidad de perspectivas enriquece la empatía e ideación, y el apoyo mutuo facilita la implementación', 'Permite que los directores controlen mejor el proceso', 'Es más rápido que hacerlo individualmente'], correct: 1, explanation: 'Los equipos de docentes tienen perspectivas complementarias sobre los mismos estudiantes. Esa diversidad produce insights y soluciones más ricas.' },
            { id: 18, text: '¿Cuál es el indicador de que la fase de empatía fue exitosa?', options: ['Se entrevistaron muchas personas', 'Se descubrieron necesidades o insights que no eran evidentes al inicio', 'El proceso fue rápido y eficiente', 'Todos los entrevistados dieron la misma respuesta'], correct: 1, explanation: 'La empatía exitosa revela lo no evidente: contradicciones, necesidades implícitas, patrones ocultos que cambian la comprensión del problema.' },
            { id: 19, text: 'Una docente usa DT para entender por qué los niños no leen. Después de entrevistar a 6 niños, descubre que la mayoría siente vergüenza de leer en voz alta. ¿Cuál es el próximo paso?', options: ['Comprar más libros para la biblioteca', 'Formular un enunciado del problema centrado en la vergüenza y generar ideas que aborden esa necesidad emocional', 'Castigar a los niños que no leen', 'Informar a los padres del problema'], correct: 1, explanation: 'El insight (vergüenza de leer) es la base del enunciado del problema. Las soluciones deben abordar esa barrera emocional, no el síntoma superficial.' },
            { id: 20, text: '¿Cuál es la diferencia entre empatía y compasión en el contexto del DT?', options: ['Son exactamente lo mismo', 'La compasión es sentir lástima; la empatía es curiosidad activa por entender la experiencia del otro para diseñar mejores soluciones', 'La compasión es más útil en DT', 'La empatía solo aplica con adultos'], correct: 1, explanation: 'La empatía del DT va más allá de la lástima: es investigación activa de la experiencia subjetiva del otro para informar el diseño de soluciones efectivas.' }
        ]
    }
},
{
    id: 'evaluacion',
    title: 'Herramientas de Evaluación',
    subtitle: 'Rúbricas, portafolios y evaluación auténtica para el siglo XXI',
    icon: '📊',
    color: '#E9A037',
    prerequisite: ['abp', 'steam'],
    status: 'available',
    durationHours: 3,
    totalCards: 37,
    modules: [
      {
        id: 'ev-m1',
        title: 'Evaluación auténtica',
        icon: '🔍',
        cards: [
          { id: 'ev-m1-c1', type: 'content', title: '¿Qué mide realmente un examen?', content: 'Los exámenes tradicionales miden principalmente una cosa: la capacidad de recordar información en un momento específico bajo presión.\n\nPero los docentes queremos saber algo más complejo:\n• ¿Puede aplicar este conocimiento en situaciones nuevas?\n• ¿Puede resolver problemas reales?\n• ¿Colabora efectivamente con otros?\n• ¿Persiste cuando enfrenta dificultades?\n• ¿Puede comunicar lo que sabe?\n\nPara medir estas cosas necesitamos herramientas de evaluación distintas a los exámenes de opción múltiple.', extra: { tip: 'Esto no significa que los exámenes sean malos. Significa que son una herramienta entre muchas. El problema es cuando son la ÚNICA herramienta.', activity: 'Piensa en el último examen que aplicaste. ¿Qué midió realmente? ¿Qué NO pudo medir?' } },
          { id: 'ev-m1-c2', type: 'content', title: 'Evaluación auténtica: definición y principios', content: 'La evaluación auténtica es aquella que pide a los estudiantes demostrar su aprendizaje a través de tareas significativas, similares a las que realizan personas en el mundo real.\n\n**Principios de la evaluación auténtica:**\n• **Relevancia**: la tarea tiene propósito más allá de la nota\n• **Complejidad**: requiere pensar, no solo recordar\n• **Integración**: combina múltiples conocimientos y habilidades\n• **Audiencia**: alguien más allá del docente ve el trabajo\n• **Reflexión**: el estudiante piensa sobre su proceso\n\nEjemplo auténtico: diseñar una campaña real para mejorar la higiene escolar (vs. escribir un ensayo sobre higiene).', extra: { tip: 'Grant Wiggins (Understanding by Design) define la autenticidad como "tener propósito y audiencia real". Esas dos palabras cambian todo.', activity: '¿Cuál de los proyectos de tus estudiantes tiene el mayor nivel de autenticidad? ¿Por qué?' } },
          { id: 'ev-m1-c3', type: 'quiz', question: '¿Cuál de estas tareas es la MÁS auténtica?', options: ['Escribir un resumen del capítulo 3', 'Hacer un examen de 20 preguntas sobre el tema', 'Diseñar una solución real para un problema de la escuela y presentarla ante la directiva', 'Subrayar las ideas principales del libro'], correct: 2, explanation: 'La tarea auténtica tiene propósito real (resolver un problema), audiencia real (directiva) y requiere aplicar conocimiento, no solo recordarlo.' },
          { id: 'ev-m1-c4', type: 'content', title: 'Los tres tipos de evaluación y cuándo usarlos', content: '**1. Evaluación diagnóstica** (¿dónde están al inicio?)\n• Cuándo: antes de comenzar una unidad\n• Para qué: conocer conocimientos previos y ajustar la enseñanza\n• Herramientas: pregunta abierta, mapa mental inicial, conversación\n\n**2. Evaluación formativa** (¿cómo van en el camino?)\n• Cuándo: durante el proceso de aprendizaje\n• Para qué: retroalimentar y ajustar antes de que sea tarde\n• Herramientas: semáforo, ticket de salida, observación, rúbrica de proceso\n\n**3. Evaluación sumativa** (¿qué lograron al final?)\n• Cuándo: al terminar una unidad o período\n• Para qué: medir el logro de competencias\n• Herramientas: proyecto, presentación, examen, portafolio', extra: { tip: 'La evaluación formativa es la más poderosa pedagógicamente porque permite corregir el rumbo mientras aún hay tiempo. La sumativa solo constata.', activity: 'En tu última unidad, ¿qué porcentaje del tiempo de evaluación fue formativo y cuánto sumativo?' } },
          { id: 'ev-m1-c5', type: 'content', title: 'El problema de evaluar solo al final', content: 'Imagina que eres piloto de avión. Solo verificas los instrumentos al aterrizar. ¿Suena seguro?\n\nEso es lo que ocurre en muchos salones: se evalúa al final de la unidad, cuando ya no hay tiempo de corregir si el aprendizaje no ocurrió.\n\n**Consecuencias de evaluar solo al final:**\n• Los errores se acumulan sin corrección\n• Los estudiantes no saben cómo mejorar\n• Los rezagados quedan cada vez más atrás\n• La evaluación se convierte en juicio, no en apoyo\n\n**La solución**: evaluación como práctica continua, integrada en cada clase.', extra: { tip: 'Dylan Wiliam, investigador líder en evaluación formativa, documentó que los docentes que implementan evaluación formativa consistente ven ganancias de aprendizaje equivalentes a un año adicional de escolaridad.', activity: '¿En tu práctica actual, qué porcentaje de las evaluaciones son formativas (durante el proceso)?' } },
          { id: 'ev-m1-c6', type: 'quiz', question: 'La evaluación formativa se diferencia de la sumativa principalmente en que:', options: ['Es más fácil de calificar', 'Ocurre durante el proceso y sirve para mejorar, no solo para calificar al final', 'Solo la hace el docente', 'Vale más en la nota final'], correct: 1, explanation: 'La evaluación formativa retroalimenta el aprendizaje en tiempo real. Su valor está en orientar mejoras, no en registrar logros definitivos.' },
          { id: 'ev-m1-c7', type: 'content', title: 'Evaluación auténtica en el contexto guatemalteco', content: 'El CNB de Guatemala tiene un enfoque de competencias, lo que lo hace compatible con la evaluación auténtica.\n\n**Herramientas del MINEDUC que ya existen:**\n• La ficha de desempeño por competencias\n• La carpeta de evidencias\n• La evaluación de proceso\n\n**Desafíos reales en Guatemala:**\n• El sistema de calificación numérica (0-100) presiona hacia exámenes\n• Los padres esperan "resultados" numéricos\n• El tiempo de clase es limitado\n• No todos los docentes conocen alternativas a los exámenes\n\nEste curso te da herramientas concretas para implementar evaluación auténtica dentro del sistema existente.', extra: { tip: 'No necesitas reemplazar todo el sistema. Puedes añadir una rúbrica a un proyecto que ya hacías, o convertir un examen en un ticket de salida. Los cambios graduales son más sostenibles.', activity: '¿Cuáles de las herramientas del MINEDUC mencionadas usas actualmente? ¿Cuáles podrías empezar a usar?' } },
          { id: 'ev-m1-c8', type: 'content', title: 'Retroalimentación efectiva vs. calificación', content: 'Hay una diferencia fundamental entre **calificar** y **retroalimentar**:\n\n📊 **Calificar**: asignar un número o letra que dice cuánto logró el estudiante\n\n💬 **Retroalimentar**: dar información específica que le ayuda a mejorar\n\nLa investigación de John Hattie muestra que la retroalimentación específica tiene el mayor impacto en el aprendizaje de todos los factores que puede controlar el docente.\n\n**Retroalimentación efectiva:**\n• Es específica: dice exactamente qué mejorar y cómo\n• Es oportuna: llega cuando aún se puede hacer algo\n• Es orientada al futuro: "la próxima vez, prueba..."\n• No compara con otros estudiantes', extra: { tip: '"Buen trabajo" no es retroalimentación. "Tu introducción engancha bien. En el desarrollo, explica más por qué esto importa para tu comunidad" SÍ lo es.', activity: 'Escribe una retroalimentación específica y orientada al futuro para un trabajo reciente de uno de tus estudiantes.' } },
          { id: 'ev-m1-c9', type: 'quiz', question: 'Un estudiante entrega un proyecto. ¿Cuál es la retroalimentación MÁS útil?', options: ['10 puntos. Bien hecho.', 'Tu investigación sobre la contaminación fue sólida. Para la próxima, agrega datos específicos de tu comunidad para hacerlo más local e impactante.', 'Mejorable. Faltó esfuerzo.', 'Igual que los demás del grupo.'], correct: 1, explanation: 'La retroalimentación útil es específica (qué fue bien), orientada al futuro (qué mejorar la próxima vez) y contextualizada (conecta con el aprendizaje real).' },
          { id: 'ev-m1-p1', type: 'content', title: '⚡ Aplícalo mañana: Semáforo de comprensión en 2 minutos', content: 'Al finalizar la clase de mañana, dedica los últimos 2 minutos a esto:\n\n**La actividad:**\nDibuja un semáforo en la pizarra (o muestra tres papeles de colores).\nPide que cada estudiante levante la mano o muestre un papel según cómo se siente con el tema de hoy:\n\n🔴 **Rojo**: no entendí. Necesito explicación.\n🟡 **Amarillo**: entendí algo pero tengo dudas.\n🟢 **Verde**: entendí bien. Podría explicarlo a alguien.\n\n**Lo que obtienes en 2 minutos:**\n• Un diagnóstico visual instantáneo de comprensión.\n• Sabes exactamente a quién apoyar mañana.\n• Los estudiantes tienen voz para decir que no entendieron sin vergüenza.\n\n**Variante alternativa:** entrega 3 tarjetas de color a cada estudiante al inicio del año. Al final de cada clase, cada uno levanta la suya. Se vuelve un ritual de 30 segundos.', extra: { tip: 'El semáforo funciona porque es anónimo colectivamente: todos levantan al mismo tiempo. Nadie queda señalado por no entender. Eso genera honestidad.', activity: '¿Cómo adaptarías el semáforo a tu contexto? ¿Con colores en papel, con gestos, con tarjetas? Planifica cómo lo harás mañana.' } },
          { id: 'ev-m1-p2', type: 'content', title: '📊 Antes / Después: Dar retroalimentación', content: '**❌ Retroalimentación tradicional:**\nLa docente devuelve los cuadernos con una nota numérica: "7.5". Los estudiantes miran el número y lo copian en su agenda. Nadie sabe qué estuvo bien, qué estuvo mal, ni qué hacer diferente la próxima vez.\n\nResultado: el error se repite en la siguiente tarea porque nadie lo identificó específicamente.\n\n---\n\n**✅ Retroalimentación formativa — mismo cuaderno, otra respuesta:**\n\nLa docente escribe en el margen:\n*"Tu argumento en el párrafo 2 está claro y bien apoyado. En el párrafo 3, falta la evidencia que sostenga tu afirmación. La próxima vez, pregúntate: ¿tengo un ejemplo concreto para cada afirmación que hago?"*\n\n**Lo que cambia:** el estudiante sabe exactamente qué hizo bien, qué mejorar y cómo hacerlo. La retroalimentación se convierte en instrucción personalizada, no en juicio.', extra: { tip: 'La retroalimentación más eficiente es la que escribes mientras lees, no la que escribes al final. Una nota específica en el margen vale más que un párrafo genérico al pie.', activity: 'Toma el último trabajo que calificaste. ¿Qué retroalimentación específica le darías ahora a cada estudiante? Practica el formato: "Esto funcionó... Para la próxima, prueba..."' } },
          { id: 'ev-m1-p3', type: 'content', title: '📋 Plantilla: Sistema de evaluación de una unidad (vista completa)', content: '**Planifica los 3 tipos de evaluación antes de comenzar tu próxima unidad:**\n\n---\n📌 **Unidad:** _______________ | **Grado:** _____ | **Área:** _______________\n**Duración:** _______________\n\n**🔍 Evaluación DIAGNÓSTICA** (inicio — semana 1):\n*¿Qué herramienta usaré para saber qué saben al inicio?*\n□ 3 preguntas abiertas en papel □ Mapa mental □ Conversación en círculo □ Otra: ___\n\n**📈 Evaluación FORMATIVA** (durante — semanas 2-3):\n*¿Cómo sabré cómo van en el proceso?*\n□ Semáforo de comprensión □ Ticket de salida □ Observación con lista □ Revisión de borrador\n*¿Cuándo? (días / momentos específicos):* _______________\n\n**🏆 Evaluación SUMATIVA** (cierre — semana final):\n*¿Cómo demostrarán lo que aprendieron?*\n□ Proyecto con audiencia □ Presentación oral □ Portafolio □ Examen auténtico □ Otra: ___\n\n**🔄 Autoevaluación incluida:**\n□ Sí → ¿con qué herramienta? _______________\n□ No (¿por qué? _______________)\n\n**📊 Ponderación:**\nDiagnóstica: ___% | Formativa: ___% | Sumativa: ___%\n---\n\n*Consejo:* la evaluación formativa debería representar al menos el 30% de la nota. Si es 0%, los estudiantes aprenderán que solo importa el examen final.', extra: { tip: 'Comparte este mapa con tus estudiantes el primer día de la unidad. Que sepan cómo y cuándo serán evaluados reduce la ansiedad y aumenta el compromiso.', activity: 'Completa este mapa para la próxima unidad que iniciarás. Guárdalo — es el diseño más importante de tu planificación.' } }
        ]
      },
      {
        id: 'ev-m2',
        title: 'Rúbricas',
        icon: '📏',
        cards: [
          { id: 'ev-m2-c1', type: 'content', title: '¿Qué es una rúbrica y para qué sirve?', content: 'Una rúbrica es una tabla que describe niveles de desempeño para distintos criterios de evaluación.\n\n**¿Para qué sirve?**\n• Para el docente: evaluar de manera consistente y transparente\n• Para el estudiante: saber exactamente qué se espera ANTES de comenzar\n• Para los padres: entender qué significa la calificación\n\n**Estructura básica:**\n| Criterio | Excelente | Bueno | En desarrollo | Inicio |\n|---|---|---|---|---|\n| Claridad | Muy claro | Claro | Parcialmente claro | Confuso |\n\nLo que hace diferente a una rúbrica de una lista de requisitos es que describe NIVELES de calidad para cada criterio.', extra: { tip: 'Una rúbrica bien hecha elimina la subjetividad de la calificación y la ansiedad del estudiante sobre "qué quiere el profe". Todos saben exactamente a qué apuntar.', activity: 'Busca una rúbrica que hayas usado o visto. ¿Cumple la estructura básica? ¿Qué mejorarías?' } },
          { id: 'ev-m2-c2', type: 'content', title: 'Tipos de rúbricas', content: '**Rúbrica holística:**\nEvalúa el trabajo en su totalidad con una sola escala\n✅ Más rápida de usar\n❌ Menos útil para retroalimentar específicamente\n\n**Rúbrica analítica:**\nEvalúa cada criterio por separado con su propia escala\n✅ Retroalimentación específica por dimensión\n❌ Toma más tiempo completar\n\n**Rúbrica de único punto:**\nSolo describe el nivel esperado (sin columnas de más o menos)\n✅ Simple, evita efectos de halo negativos\n❌ Menos detallada para quienes están muy abajo o muy arriba\n\n**Recomendación para Guatemala**: rúbrica analítica con 3-4 criterios y 3 niveles. Manageable y útil.', extra: { tip: 'Para proyectos complejos, usa analítica. Para reflexiones y participación, usa holística. Para portafolios, experimenta con la de único punto.', activity: '¿Qué tipo de rúbrica usas actualmente? ¿Cuál probarías para un tipo de evaluación diferente?' } },
          { id: 'ev-m2-c3', type: 'quiz', question: 'Un docente quiere dar retroalimentación detallada sobre distintos aspectos de un proyecto. ¿Qué tipo de rúbrica le recomendarías?', options: ['Rúbrica holística (una sola escala para todo)', 'Rúbrica analítica (criterios evaluados por separado)', 'Sin rúbrica, solo nota numérica', 'Rúbrica de único punto para cada criterio'], correct: 1, explanation: 'La rúbrica analítica evalúa cada dimensión (investigación, presentación, trabajo en equipo) por separado, permitiendo retroalimentación específica por área.' },
          { id: 'ev-m2-c4', type: 'content', title: 'Cómo crear una rúbrica en 5 pasos', content: '**Paso 1**: Identifica qué competencias o habilidades quieres evaluar\n\n**Paso 2**: Define 3-4 criterios que reflejen esas competencias\n(ejemplo: investigación, argumentación, presentación, trabajo en equipo)\n\n**Paso 3**: Describe el nivel excelente para cada criterio (¿qué se VE en un trabajo excepcional?)\n\n**Paso 4**: Describe los niveles inferiores en relación al excelente\n(¿qué le falta al nivel bueno? ¿qué más le falta al que está en desarrollo?)\n\n**Paso 5**: Prueba la rúbrica con un trabajo real. ¿Funciona? ¿Es clara para los estudiantes?\n\n⚠️ El error más común: describir niveles con palabras vagas ("bien", "regular", "mal") en lugar de evidencias observables.', extra: { tip: 'Involucra a los estudiantes en crear la rúbrica. Si ellos la diseñan, la entienden mejor y se comprometen más con los criterios.', activity: 'Crea una rúbrica de 3 criterios para una tarea que asignarás próximamente. Compártela con un estudiante y pregúntale si la entiende.' } },
          { id: 'ev-m2-c5', type: 'content', title: 'Errores comunes al crear rúbricas', content: '❌ **Demasiados criterios**: más de 5 es difícil de usar consistentemente\n❌ **Descriptores vagos**: "buen trabajo" no dice nada. "Usa 3 fuentes distintas y cita correctamente" sí\n❌ **Solo el producto, no el proceso**: no mide colaboración, perseverancia, pensamiento crítico\n❌ **Los estudiantes no la conocen hasta el final**: debe darse ANTES de comenzar\n❌ **Nunca se revisa**: una rúbrica debe mejorarse después de cada uso\n❌ **Todos los criterios valen lo mismo**: algunos aspectos son más importantes. Úsalos diferente peso.\n\nLas rúbricas, como los proyectos, mejoran con iteración.', extra: { tip: 'Después de calificar con una rúbrica, pregúntate: "¿Hubo algo que el estudiante hizo extraordinariamente bien que la rúbrica no capturó?" Si la respuesta es sí, mejora la rúbrica.', activity: 'Revisa una rúbrica que hayas creado antes. ¿Cuál de estos errores encuentras? ¿Cómo la mejorarías?' } },
          { id: 'ev-m2-c6', type: 'quiz', question: 'Un estudiante ve su rúbrica al recibir el trabajo calificado y no entiende por qué está en el nivel "en desarrollo". ¿Cuál fue el error del docente?', options: ['Calificó muy estrictamente', 'El estudiante no había visto la rúbrica antes de comenzar el trabajo', 'La rúbrica tenía muchos criterios', 'El estudiante no estudió suficiente'], correct: 1, explanation: 'La rúbrica debe compartirse ANTES de que los estudiantes comiencen. Es un mapa de destino, no un veredicto al llegar.' },
          { id: 'ev-m2-c7', type: 'content', title: 'Rúbricas de proceso vs. de producto', content: 'La mayoría de las rúbricas evalúan el PRODUCTO. Pero las competencias más valiosas ocurren en el PROCESO.\n\n**Rúbrica de proceso evalúa:**\n• Colaboración con el equipo\n• Perseverancia ante dificultades\n• Capacidad de ajustar y mejorar\n• Uso de retroalimentación\n• Organización y planificación\n\n**¿Cómo evaluar el proceso?**\n• Observación sistemática con lista de verificación\n• Diarios de proyecto o cuadernos de reflexión\n• Autoevaluación del estudiante\n• Puntos de revisión con mini-rúbricas\n\nLos estudiantes que son evaluados en el proceso aprenden que el esfuerzo importa tanto como el resultado.', extra: { tip: 'Una rúbrica de proceso puede ser tan simple como 3 preguntas al final de cada sesión: "¿Qué hicimos hoy? ¿Qué funcionó? ¿Qué mejoraremos mañana?"', activity: 'Diseña una mini-rúbrica de proceso de 3 criterios para evaluar colaboración durante un proyecto.' } },
          { id: 'ev-m2-c8', type: 'content', title: 'Rúbricas culturalmente sensibles en Guatemala', content: 'Una rúbrica debe reflejar los valores y contexto de quien la usa. En Guatemala, considera:\n\n🌿 **Incorporar saberes locales**: si el proyecto incluye conocimiento indígena, la rúbrica debe valorarlo igual que el conocimiento académico\n\n🗣️ **Evaluar en la lengua materna**: si un estudiante puede explicar mejor en k\'iche\' que en español, ¿por qué evaluamos solo en español?\n\n🤝 **Valorar la dimensión comunitaria**: proyectos que impactan la comunidad merecen un criterio que lo reconozca\n\n🎨 **Formas de expresión diversas**: el arte, la narrativa oral, la música y el tejido son formas legítimas de demostrar aprendizaje\n\nUna rúbrica que ignora estas dimensiones puede estar evaluando la capacidad de adaptarse al sistema, no el aprendizaje real.', extra: { tip: 'Pregunta a tus estudiantes "¿cómo les gustaría mostrar lo que aprendieron?" Sus respuestas revelan formas de evaluación más auténticas para su contexto.', activity: '¿Tu rúbrica actual valora formas de expresión culturalmente relevantes para tus estudiantes? ¿Qué agregarías?' } },
          { id: 'ev-m2-c9', type: 'quiz', question: 'Un estudiante k\'iche\' puede explicar perfectamente un concepto de ciencias en su lengua materna pero se le dificulta en español. ¿Qué indica esto sobre la evaluación?', options: ['El estudiante necesita más clases de español', 'La evaluación debe contemplar la posibilidad de demostrar aprendizaje en la lengua más fuerte del estudiante', 'El estudiante no aprendió el concepto', 'No hay problema, así funciona el sistema'], correct: 1, explanation: 'La evaluación auténtica mide el aprendizaje real, no la competencia lingüística en el idioma de instrucción. Un bilingüe que demuestra dominio en su lengua materna debe ser reconocido.' },
          { id: 'ev-m2-p1', type: 'content', title: '⚡ Aplícalo mañana: crea tu primera rúbrica en 15 min', content: 'Elige la próxima tarea o actividad que vas a asignar y crea una rúbrica en 15 minutos siguiendo estos pasos:\n\n**Paso 1 (3 min):** Anota 3 cosas que querías que los estudiantes demostraran con esta tarea.\nEsos son tus criterios.\n\n**Paso 2 (8 min):** Para CADA criterio, describe el nivel "Excelente" primero.\n*(Pregúntate: ¿Qué VEO en un trabajo que claramente logró esto?)*\nLuego describe el nivel "En proceso": ¿qué le falta al excelente?\nY el nivel "Inicio": ¿qué veo en quien apenas comienza?\n\n**Paso 3 (4 min):** Lee la rúbrica completa y pregúntate: ¿Un estudiante que la vea sabe exactamente a qué apuntar? Si la respuesta es sí, está lista.\n\n**Comparte la rúbrica ANTES de que los estudiantes comiencen la tarea.** Eso es lo que la convierte en herramienta de aprendizaje, no solo de calificación.', extra: { tip: 'No busques la rúbrica perfecta en el primer intento. Una rúbrica usada es siempre mejor que una rúbrica perfecta en el cajón. Mejórala después de calificar con ella la primera vez.', activity: 'Abre una hoja ahora mismo. En 15 minutos, escribe la rúbrica para tu próxima tarea. Ya tienes suficiente información para hacerlo.' } },
          { id: 'ev-m2-p2', type: 'content', title: '📊 Antes / Después: Calificar un proyecto con y sin rúbrica', content: '**❌ Sin rúbrica:**\nLa docente revisa 30 proyectos el domingo. Pone notas basadas en la impresión general. El grupo con mejor presentación visual saca 95. El que investigó más pero presentó de forma más sencilla saca 70. Al lunes, algunos estudiantes preguntan por qué sacaron esa nota. La docente no puede explicar con precisión.\n\n---\n\n**✅ Con rúbrica compartida desde el inicio:**\n\nLa rúbrica tiene 4 criterios: Investigación (30%), Producto (30%), Presentación (25%), Reflexión (15%).\n\nSe entregó el lunes antes de comenzar el proyecto.\n\nEl domingo la docente tarda la mitad del tiempo porque solo aplica los criterios ya definidos.\n\nEl lunes, cuando un estudiante pregunta "¿por qué saqué esta nota?", la docente señala la rúbrica: "Tu investigación fue excelente (4/4). Tu reflexión necesita más especificidad (2/4). La próxima vez, explica qué cambiarías y por qué."\n\nEl estudiante entiende exactamente qué mejorar. Y la próxima vez lo hace.', extra: { tip: 'La rúbrica no solo facilita la calificación del docente — convierte la retroalimentación en conversación concreta. El criterio específico reemplaza la vaguedad de "necesitas mejorar".', activity: 'Revisa la nota de un trabajo que calificaste recientemente. ¿Podrías convertirla en retroalimentación específica usando los criterios de una rúbrica? Intenta escribirla.' } },
          { id: 'ev-m2-p3', type: 'content', title: '📋 Plantilla: Rúbrica de proceso para trabajo en equipo (lista para usar)', content: '**Úsala durante cualquier proyecto o actividad colaborativa:**\n\n---\n**Nombre del estudiante:** _______________ | **Proyecto:** _______________\n\n| Criterio | ⭐⭐⭐ Destacado (4) | ⭐⭐ Competente (3) | ⭐ En desarrollo (2) | 🔄 Inicio (1) |\n|---|---|---|---|---|\n| **Participación** | Aporta ideas, toma iniciativa, involucra a todos | Participa cuando se le pide | Participa poco, se distrae | No participa |\n| **Colaboración** | Escucha, adapta sus ideas, ayuda a resolver conflictos | Trabaja bien la mayoría del tiempo | Trabaja solo o crea conflictos | No trabaja con el equipo |\n| **Responsabilidad** | Cumple su parte antes del tiempo, avisa si hay problemas | Cumple su parte a tiempo | Cumple parcialmente | No cumple su parte |\n| **Comunicación** | Explica ideas con claridad, hace preguntas que ayudan | Comunica sus ideas | Le cuesta expresar ideas | No comunica con el equipo |\n\n**Total: ___ / 16** | **Autoevaluación del estudiante: ___ / 16**\n\n**¿Hay diferencia entre tu nota y la del docente? Si sí, ¿por qué crees que ocurre?**\n___________________________________\n---\n\n*Cómo usarla:* la docente y el estudiante la completan por separado. Luego la comparan y conversan. La conversación sobre la diferencia es donde ocurre el aprendizaje más profundo.', extra: { tip: 'La autoevaluación con criterios reduce el autoengaño. Los estudiantes que sobrestiman su participación son más receptivos a la retroalimentación cuando tienen criterios concretos frente a ellos.', activity: 'Imprime esta rúbrica para tu próximo trabajo en equipo. La primera vez que la uses, entregala también a los estudiantes para que se autoevalúen.' } }
        ]
      },
      {
        id: 'ev-m3',
        title: 'Portafolios de aprendizaje',
        icon: '📁',
        cards: [
          { id: 'ev-m3-c1', type: 'content', title: '¿Qué es un portafolio de aprendizaje?', content: 'Un portafolio de aprendizaje es una colección deliberada de trabajos que muestra el crecimiento del estudiante a lo largo del tiempo.\n\nLa palabra clave es **deliberada**: no es juntar todo, sino seleccionar con propósito piezas que muestren:\n• Lo mejor del estudiante\n• La evolución desde el inicio hasta ahora\n• La reflexión del estudiante sobre su propio aprendizaje\n\nUn portafolio responde a la pregunta que un examen no puede: "¿Cómo has crecido como aprendiz?"', extra: { tip: 'El portafolio más básico posible es una carpeta de papel con trabajos fechados y una nota del estudiante explicando por qué los eligió.', activity: '¿Guardas evidencias del progreso de tus estudiantes a lo largo del año? ¿De qué forma?' } },
          { id: 'ev-m3-c2', type: 'content', title: 'Tipos de portafolio', content: '**Portafolio de trabajo**: colección de todo lo producido (borrador, versión final, notas)\n→ Útil para ver el proceso completo\n\n**Portafolio de presentación**: los mejores trabajos seleccionados por el estudiante\n→ Útil para mostrar logros a padres, escuelas secundarias\n\n**Portafolio de evaluación**: trabajos específicos elegidos para demostrar competencias del CNB\n→ Útil para evidenciar logros de aprendizaje formalmente\n\n**Portafolio de aprendizaje (reflexivo)**: incluye reflexión del estudiante sobre cada pieza\n→ El más poderoso para desarrollar metacognición\n\nNo tienes que elegir uno solo. Puedes mezclar elementos de varios tipos.', extra: { tip: 'Para comenzar, elige el tipo más simple: portafolio de presentación. El estudiante elige 3-5 trabajos que muestren lo mejor de sí mismo. Simple y poderoso.', activity: '¿Qué tipo de portafolio se adapta mejor a tu contexto y nivel educativo? ¿Por qué?' } },
          { id: 'ev-m3-c3', type: 'quiz', question: '¿Cuál es el elemento que diferencia un portafolio de aprendizaje de simplemente guardar trabajos en una carpeta?', options: ['La carpeta debe ser de colores brillantes', 'La selección deliberada y la reflexión del estudiante sobre por qué eligió cada pieza', 'Incluir todos los trabajos sin excepción', 'Que el docente elija qué incluir'], correct: 1, explanation: 'La selección deliberada y la reflexión son el corazón del portafolio. Sin ellas, es solo un archivo. Con ellas, es evidencia de aprendizaje y metacognición.' },
          { id: 'ev-m3-c4', type: 'content', title: 'Cómo implementar portafolios sin tecnología', content: 'Un portafolio no necesita plataformas digitales. En Guatemala, donde el acceso a tecnología es desigual:\n\n**Portafolio en carpeta física:**\n• Carpeta de papel (o fólder reutilizado)\n• Trabajos con fecha\n• Tarjeta de reflexión grapada a cada pieza\n• Índice al inicio\n• Guardado en un lugar seguro en el aula\n\n**Portafolio fotográfico:**\n• Fotos del proceso impresas o en WhatsApp del padre\n• Útil para trabajos 3D que no caben en carpeta\n\n**Portafolio de cuaderno:**\n• Un cuaderno dedicado como portafolio\n• Más fácil de transportar y cuidar', extra: { tip: 'La primera vez que implementes portafolios, empieza con solo 3 piezas por estudiante por trimestre. La simplicidad garantiza que lo harás realmente.', activity: 'Diseña cómo sería un portafolio de tu aula con los materiales que tienes actualmente disponibles.' } },
          { id: 'ev-m3-c5', type: 'content', title: 'La tarjeta de reflexión: el corazón del portafolio', content: 'Cada pieza del portafolio debe ir acompañada de una reflexión del estudiante. Esta puede ser tan simple como responder 2-3 preguntas:\n\n**Para primaria baja** (con dibujo o una oración):\n• "Elegí este trabajo porque..."\n• "Me siento orgulloso/a de..."\n\n**Para primaria alta:**\n• "Elegí este trabajo porque muestra que aprendí a..."\n• "Lo más difícil fue..."\n• "Si lo hiciera de nuevo, cambiaría..."\n\n**Para básico y diversificado:**\n• "Esta pieza demuestra la competencia ___ porque..."\n• "La evolución que veo desde el inicio del año es..."\n• "Lo que quiero mejorar en el próximo trimestre es..."', extra: { tip: 'La reflexión no necesita ser larga para ser poderosa. Dos oraciones genuinas valen más que un párrafo copiado del compañero.', activity: 'Escribe cómo adaptarías la tarjeta de reflexión para el nivel educativo de tus estudiantes.' } },
          { id: 'ev-m3-c6', type: 'quiz', question: 'Un docente implementa portafolios pero elige los trabajos él mismo y no pide reflexión. ¿Qué pierde?', options: ['Nada, los portafolios son solo archivos', 'La metacognición del estudiante y el sentido de propiedad del aprendizaje', 'Solo pierde tiempo de calificación', 'La posibilidad de compartirlos con los padres'], correct: 1, explanation: 'La selección y reflexión del estudiante son lo que convierte un archivo en un portafolio. Sin eso, el docente tiene una evidencia pero el estudiante no desarrolla metacognición.' },
          { id: 'ev-m3-c7', type: 'content', title: 'Las conferencias de portafolio', content: 'Las conferencias de portafolio son reuniones de 10-15 minutos donde el estudiante presenta su portafolio.\n\n**Dos formatos:**\n\n🧑‍🏫 **Docente-estudiante**: conversación privada donde el estudiante presenta, el docente pregunta y juntos establecen metas.\n\n👨‍👩‍👧 **Estudiante-padres** (Student-Led Conferences): el estudiante presenta su portafolio a sus padres mientras el docente facilita. Este formato revoluciona la relación familia-escuela.\n\n**Por qué las Student-Led Conferences son poderosas:**\n• El estudiante es responsable de comunicar su aprendizaje\n• Los padres ven los trabajos y escuchan al estudiante, no al docente\n• El estudiante practica comunicación y autorregulación', extra: { tip: 'Las Student-Led Conferences funcionan incluso con padres que no saben leer. El estudiante puede mostrar, explicar oralmente y los padres pueden hacer preguntas. El idioma puede ser la lengua materna.', activity: '¿Podría funcionar en tu contexto una conferencia de portafolio con familias? ¿Qué adaptaciones necesitarías?' } },
          { id: 'ev-m3-c8', type: 'content', title: 'Evaluando el portafolio: ¿cómo calificar?', content: 'Evaluar un portafolio es diferente a calificar un examen. El foco es el crecimiento y la reflexión, no la perfección.\n\n**Criterios de evaluación de portafolio:**\n• Completitud: ¿incluye las piezas requeridas?\n• Selección: ¿las piezas elegidas son representativas del aprendizaje?\n• Reflexión: ¿las reflexiones son genuinas y específicas?\n• Crecimiento: ¿se puede ver evolución entre las piezas?\n• Organización: ¿está presentado de manera clara?\n\n**Importante:** No compares portafolios entre estudiantes. Compara cada portafolio consigo mismo (el estudiante ahora vs. antes).', extra: { tip: 'Un portafolio donde el estudiante honestamente identifica sus debilidades y tiene un plan para mejorar es más valioso que uno lleno de trabajos perfectos sin reflexión.', activity: 'Crea una rúbrica de 3 criterios para evaluar portafolios en tu grado.' } },
          { id: 'ev-m3-c9', type: 'quiz', question: '¿Cómo debe compararse el portafolio de un estudiante para evaluarlo?', options: ['Con el portafolio del mejor estudiante del grupo', 'Consigo mismo: el estudiante ahora vs. el estudiante al inicio del período', 'Con un estándar nacional uniforme', 'Con el portafolio del docente'], correct: 1, explanation: 'El portafolio evidencia crecimiento individual. La comparación relevante es el progreso del estudiante respecto a sí mismo, no respecto a sus pares.' },
          { id: 'ev-m3-p1', type: 'content', title: '⚡ Aplícalo mañana: el portafolio más simple del mundo', content: 'Mañana, entrega a cada estudiante UN fólder o carpeta reciclada y diles exactamente esto:\n\n*"Esta es tu carpeta de crecimiento. Al final de cada semana van a guardar aquí el trabajo del que se sientan más orgullosos. Y van a escribir detrás por qué lo eligieron."*\n\n**Nada más.** Eso ya es un portafolio.\n\n**Las dos reglas:**\n1. El estudiante elige qué guardar — no el docente.\n2. Toda pieza lleva detrás una oración explicando por qué la eligieron.\n\n**Al final del bimestre:**\nDedica 30 minutos a que cada estudiante revise su carpeta.\nPregúntales: "¿Qué trabajo es el que más te sorprende ahora? ¿En cuál ves más diferencia entre lo que eras al inicio y lo que eres ahora?"\n\nEsa conversación es evaluación auténtica en su forma más pura.', extra: { tip: 'No esperes el "portafolio perfecto" para empezar. La carpeta con fólder reciclado que comienzas mañana es infinitamente mejor que el sistema digital que planeas hacer "algún día".', activity: 'Consigue 30 fólders o carpetas (pueden ser de cartón reciclado). El lunes, el portafolio más simple del mundo comienza en tu aula.' } },
          { id: 'ev-m3-p2', type: 'content', title: '📊 Antes / Después: La reunión de padres con portafolios', content: '**❌ Reunión de padres tradicional — reporte de notas:**\nLa docente habla 20 minutos. Lee las notas de cada área. Los padres asienten. Se van con un papel de números. Nadie sabe qué significa "8.5 en Comunicación y Lenguaje" en términos de lo que el niño realmente puede hacer.\n\n---\n\n**✅ Conferencia de portafolio liderada por el estudiante:**\n\n• El estudiante abre su carpeta frente a sus papás.\n• Presenta 3 trabajos: "Este lo elegí porque..."\n• Explica lo que aprendió y lo que quiere mejorar.\n• Los papás hacen preguntas al estudiante, no al docente.\n• La docente facilita solo si es necesario.\n\n**Duración:** 10-15 minutos por familia.\n\n**Lo que cambia por completo:**\n• Los padres ven el trabajo real de su hijo, no un número.\n• El estudiante practica comunicación y autorregulación.\n• Los padres escuchan de su hijo, no de la maestra.\n• La relación familia-escuela se transforma.', extra: { tip: 'Los padres que no saben leer participan igual en esta conferencia porque su hijo les habla y les muestra. El idioma puede ser la lengua materna. El portafolio rompe barreras que los reportes de notas mantienen.', activity: '¿Cuándo es tu próxima reunión de padres? Planifica incorporar aunque sea 5 minutos de "el estudiante presenta un trabajo". Ese pequeño cambio produce un gran impacto.' } },
          { id: 'ev-m3-p3', type: 'content', title: '📋 Plantilla: Tarjeta de reflexión del portafolio (3 versiones por nivel)', content: '**Imprime y recorta — una tarjeta por pieza del portafolio:**\n\n---\n**✂️ VERSIÓN 1 — Primaria baja (1°-3°)**\n*(El estudiante puede dibujar o dictarle a un compañero)*\n\nElegí este trabajo porque: _______________\nMe siento orgulloso/a de: _______________\nLa próxima vez quiero: _______________\n\n---\n**✂️ VERSIÓN 2 — Primaria alta (4°-6°)**\n\nElegí este trabajo porque muestra que aprendí a: _______________\nLo más difícil fue: _______________\nSi lo hiciera de nuevo, cambiaría: _______________\nMi calificación para mí mismo en este trabajo: ___/10 porque: _______________\n\n---\n**✂️ VERSIÓN 3 — Básico y Diversificado**\n\nEsta pieza demuestra la competencia ________ porque: _______________\nLa evolución que veo entre mi trabajo del inicio y este es: _______________\nEn el próximo trimestre quiero mejorar en: _______________\nUna pregunta que aún tengo sobre este tema: _______________\n\n---\n\n*Cómo usarlas:* imprime la versión adecuada para tu nivel. Los estudiantes llenan una tarjeta cada vez que agregan una pieza al portafolio. Se grapan juntas.', extra: { tip: 'La versión más simple (Versión 1) es suficiente para comenzar con cualquier nivel. Agrega complejidad gradualmente. Un portafolio con tarjetas simples usadas consistentemente es mejor que uno con tarjetas complejas abandonadas.', activity: 'Imprime la versión que corresponde a tu nivel. Esta semana, entrégala a los estudiantes con la primera pieza del portafolio.' } }
        ]
      },
      {
        id: 'ev-m4',
        title: 'Coevaluación y autoevaluación',
        icon: '🔁',
        cards: [
          { id: 'ev-m4-c1', type: 'content', title: 'El estudiante como evaluador', content: 'En la evaluación tradicional, el docente evalúa y el estudiante es evaluado. En la evaluación para el aprendizaje, el estudiante también es evaluador: de sí mismo y de sus compañeros.\n\n**¿Por qué esto importa?**\n• Desarrolla pensamiento crítico y metacognición\n• Transfiere responsabilidad del aprendizaje al estudiante\n• Prepara para la vida adulta donde nadie siempre dice qué tan bien lo hiciste\n• Profundiza el aprendizaje (enseñar a otros requiere entender profundamente)\n\nLa investigación confirma que los estudiantes que se autoevalúan aprenden más que los que solo son evaluados por el docente.', extra: { tip: 'La autoevaluación y coevaluación deben enseñarse explícitamente, no solo pedirse. Los estudiantes necesitan aprender qué significa evaluar bien.', activity: 'Piensa en cómo introduces la autoevaluación en tu clase. ¿Les enseñas cómo hacerla o solo les dices que se evalúen?' } },
          { id: 'ev-m4-c2', type: 'content', title: 'Herramientas de autoevaluación', content: '**Semáforo de aprendizaje:**\nRojo (no entiendo), Amarillo (voy entendiendo), Verde (lo domino). Simple, rápido, al final de cada tema.\n\n**Ticket de salida:**\n2-3 minutos al final de clase. Estudiante escribe: "Hoy aprendí... / Todavía tengo dudas sobre..."\n\n**Dos estrellas y un deseo:**\nDos cosas que hice bien + una que mejoraría.\n\n**Escala del 1 al 4:**\nEl estudiante se ubica en 1 (inicio), 2 (en proceso), 3 (logrado), 4 (domino y puedo enseñar)\n\n**Cuaderno de reflexión:**\nEscritura regular (2-3 veces por semana) sobre el proceso de aprendizaje.', extra: { tip: 'El ticket de salida es la herramienta más fácil de implementar mañana mismo. Toma 3 minutos, da información valiosa sobre dónde están los estudiantes y crea hábito reflexivo.', activity: 'Elige una de estas herramientas. ¿Cómo la implementarías en tu clase esta semana?' } },
          { id: 'ev-m4-c3', type: 'quiz', question: '¿Cuál es el principal beneficio pedagógico de la autoevaluación?', options: ['Le ahorra tiempo al docente', 'Desarrolla metacognición y responsabilidad sobre el propio aprendizaje', 'Reemplaza la calificación del docente', 'Hace que los exámenes sean más fáciles'], correct: 1, explanation: 'La metacognición (pensar sobre el propio aprendizaje) es una de las habilidades más correlacionadas con el éxito académico. La autoevaluación la desarrolla sistemáticamente.' },
          { id: 'ev-m4-c4', type: 'content', title: 'Coevaluación: evaluar el trabajo de compañeros', content: 'La coevaluación es cuando los estudiantes evalúan el trabajo de sus compañeros usando criterios acordados.\n\n**¿Cuándo usarla?**\n• Después de completar un borrador (antes del producto final)\n• Durante puntos de revisión en proyectos\n• Al finalizar presentaciones\n\n**Protocolo efectivo de coevaluación:**\n1. Definir criterios juntos antes de la evaluación\n2. Cada revisor usa la rúbrica o guía acordada\n3. La retroalimentación es escrita, no solo oral\n4. El formato: "Me funciona X porque... / Puedes mejorar Y haciendo..."\n5. El autor escucha primero, luego puede responder preguntas\n\n**Regla de oro**: enseñar cómo dar retroalimentación ANTES de pedir que lo hagan.', extra: { tip: 'La primera coevaluación siempre es torpe. Los estudiantes tienden a ser muy benévolos o muy duros. Con práctica, se vuelven evaluadores calibrados y valiosos.', activity: 'Diseña una guía de coevaluación para una actividad que harán pronto tus estudiantes.' } },
          { id: 'ev-m4-c5', type: 'content', title: 'Calibración: aprender a evaluar bien', content: 'Los estudiantes deben aprender a evaluar antes de que sus evaluaciones sean confiables.\n\n**Ejercicio de calibración:**\n1. Muestra ejemplos de trabajos anónimos (de años anteriores o inventados)\n2. Pide a los estudiantes que los evalúen con la rúbrica individualmente\n3. Comparte las evaluaciones y discute las diferencias\n4. Lleguen a consenso sobre qué nivel corresponde a cada ejemplo\n5. Ahora están "calibrados" y pueden evaluar con más consistencia\n\nEste ejercicio toma 30 minutos y transforma la calidad de la coevaluación.', extra: { tip: 'La calibración también sirve para el docente. Si tienes dudas sobre cómo usar una rúbrica, hacer el ejercicio contigo mismo con trabajos de años anteriores aclara los criterios.', activity: '¿Tienes trabajos de años anteriores que podrías usar como ejemplos para calibrar a tus estudiantes actuales?' } },
          { id: 'ev-m4-c6', type: 'quiz', question: 'Una coevaluación donde todos los estudiantes dan calificaciones máximas a sus compañeros indica:', options: ['Que todos hicieron un trabajo excelente', 'Que los estudiantes no han aprendido a evaluar con criterios y necesitan calibración', 'Que la rúbrica es demasiado fácil', 'Que el grupo tiene buena relación'], correct: 1, explanation: 'La tendencia a dar calificaciones máximas por amistad o para no herir indica falta de calibración. Los estudiantes necesitan práctica con ejemplos concretos para aprender a evaluar honestamente.' },
          {
            id: 'ev-m4-p1',
            type: 'project',
            title: 'Sistema de Evaluación Auténtica',
            description: 'Diseña un sistema completo de evaluación auténtica para una unidad de tu área y grado.',
            objective: 'Crear un sistema de evaluación que incluya diagnóstica, formativa y sumativa con herramientas concretas adaptadas a tu contexto.',
            materials: ['Papel y bolígrafo', 'CNB de tu grado y área', 'Trabajos de estudiantes de años anteriores (para calibración)', 'Carpetas para portafolios'],
            steps: [
              'Elige una unidad de tu CNB que enseñarás próximamente',
              'Define 3 competencias que quieres desarrollar y evaluar',
              'Diseña una evaluación diagnóstica (¿qué saben al inicio?)',
              'Crea 2 herramientas de evaluación formativa para usar durante la unidad',
              'Diseña la evaluación sumativa auténtica (proyecto, presentación, o portafolio)',
              'Crea la rúbrica de la evaluación sumativa',
              'Planifica cómo incorporar autoevaluación y coevaluación'
            ],
            think: [
              '¿Esta evaluación mide lo que realmente quiero que aprendan mis estudiantes?',
              '¿Los criterios son observables y comprensibles para los estudiantes?',
              '¿El sistema completo es manejable dado mi tiempo y recursos?',
              '¿Cómo se conecta con el enfoque de competencias del CNB?'
            ],
            make: [
              'Mapa de evaluación de la unidad (qué se evalúa, cuándo y cómo)',
              'Herramienta de diagnóstico (preguntas, mapa mental o conversación)',
              'Al menos 2 herramientas formativas (ticket de salida, semáforo, observación)',
              'Rúbrica analítica de 3-4 criterios para la evaluación sumativa',
              'Guía de autoevaluación para los estudiantes'
            ],
            improve: [
              '¿El sistema refleja los valores culturales de tu comunidad?',
              '¿Hay formas de expresión alternativas (oral, visual, artística) que podrías incluir?',
              '¿Cómo involucrarías a los estudiantes en co-crear los criterios?',
              '¿Cómo comunicarías este sistema a las familias?'
            ]
          },
          { id: 'ev-m4-c7', type: 'content', title: 'Evaluación entre pares en lengua materna', content: 'En comunidades bilingües de Guatemala, la coevaluación en lengua materna puede revelar comprensión que la evaluación en español oculta.\n\n**Estrategias:**\n• Permitir que las reflexiones del portafolio se escriban en lengua materna\n• Usar pares bilingües como mediadores en coevaluaciones\n• Diseñar rúbricas con descriptores en lengua materna\n• Valorar explícitamente la demostración de aprendizaje en cualquier idioma\n\nEsto no es "bajar el estándar": es reconocer que el conocimiento existe más allá del idioma en que fue evaluado.', extra: { tip: 'DIGEBI (Dirección General de Educación Bilingüe) tiene materiales en 12 lenguas mayas. Estos pueden servir como base para adaptar herramientas de evaluación a lenguas locales.', activity: '¿Cómo podrías incorporar la lengua materna de tus estudiantes en al menos una herramienta de evaluación este año?' } },
          { id: 'ev-m4-c8', type: 'content', title: 'Evaluación y equidad: preguntas clave', content: 'La evaluación puede perpetuar inequidades o reducirlas. Hazte estas preguntas:\n\n⚖️ **¿Evalúo la misma competencia o el contexto socioeconómico?**\n(Un trabajo más elaborado puede significar más recursos en casa, no más aprendizaje)\n\n🌍 **¿La tarea favorece a quienes viven en zonas urbanas?**\n(Temas de ciudades, tecnología o cultura urbana desventajan a estudiantes rurales)\n\n🗣️ **¿La barrera del idioma afecta la evaluación?**\n(Estudiantes con español como segunda lengua pueden saber pero no poder expresarlo en español)\n\n👨‍👩‍👧 **¿El apoyo familiar desigual afecta las calificaciones?**\n(Tareas que requieren materiales o ayuda adulta favorecen a familias con más recursos)', extra: { tip: 'La evaluación más equitativa ocurre en el aula, observando directamente. Las tareas para casa introducen variables de contexto que el docente no controla.', activity: 'Elige una evaluación que hayas aplicado. Analízala con estas 4 preguntas de equidad. ¿Qué encuentras?' } },
          { id: 'ev-m4-c9', type: 'quiz', question: 'Dos estudiantes obtienen la misma calificación en un proyecto pero uno lo hizo con la ayuda de sus padres universitarios y el otro lo hizo solo. ¿Qué indica esto sobre la evaluación?', options: ['La evaluación fue completamente justa', 'La evaluación puede estar midiendo el apoyo familiar disponible, no solo el aprendizaje del estudiante', 'El segundo estudiante es más inteligente', 'No hay problema si el resultado fue el mismo'], correct: 1, explanation: 'La equidad en evaluación requiere considerar qué mide realmente la tarea. Si el acceso a recursos o apoyo adulto influye más que el propio aprendizaje, hay un problema de diseño.' },
          { id: 'ev-m4-c10', type: 'content', title: '¡Felicitaciones! Eres un evaluador auténtico', content: 'Has completado el curso de Herramientas de Evaluación. Ahora tienes:\n\n✅ Comprensión de la evaluación auténtica y sus principios\n✅ Dominio de los tres tipos de evaluación y cuándo usar cada uno\n✅ Habilidades para crear rúbricas efectivas y culturalmente sensibles\n✅ Herramientas de portafolio adaptables a contextos sin tecnología\n✅ Estrategias de autoevaluación y coevaluación para el aula\n✅ Perspectiva de equidad para diseñar evaluaciones más justas\n\nEl siguiente paso: elige UNA herramienta nueva de este curso e impleméntala la próxima semana. No intentes cambiar todo a la vez.\n\n¡Tus estudiantes merecen evaluaciones que midan su aprendizaje real!', extra: { tip: 'Comparte lo que aprendiste con un colega. La evaluación auténtica es más poderosa cuando se implementa en comunidad de docentes.', activity: '¿Cuál es la herramienta de evaluación que implementarás primero? ¿Cuándo exactamente lo harás?' } },
          { id: 'ev-m4-p1b', type: 'content', title: '⚡ Aplícalo mañana: Dos Estrellas y Un Deseo', content: 'Esta técnica de autoevaluación y coevaluación funciona con cualquier trabajo, en cualquier nivel, y toma 5 minutos.\n\n**La actividad:**\nDespués de que los estudiantes terminen un trabajo o presentación:\n\n1. Cada estudiante (o un compañero evaluador) escribe:\n⭐ **Estrella 1:** una cosa que funcionó bien y por qué.\n⭐ **Estrella 2:** otra cosa que funcionó bien y por qué.\n🌙 **Deseo:** una cosa específica que mejoraría y cómo la mejoraría.\n\n2. Si es coevaluación, el evaluado lee primero en silencio y luego puede hacer UNA pregunta de clarificación.\n\n**Por qué funciona:**\n• La obligación de identificar 2 cosas buenas primero evita la crítica destructiva.\n• El "Deseo" con "cómo" convierte la crítica en propuesta concreta.\n• Los estudiantes aprenden a evaluar y a recibir evaluación — ambas habilidades vitales.\n\n**Úsalo para:** presentaciones orales, proyectos, escritura, diseños, prototipos, ensayos.', extra: { tip: 'La primera vez que uses esta técnica, modela tú mismo las dos estrellas y el deseo sobre un trabajo tuyo inventado. Ver al docente autoevaluarse honestamente cambia la cultura del aula.', activity: 'Elige la próxima presentación o entrega de trabajo. Anota cómo introducirás las Dos Estrellas y Un Deseo. ¿Será autoevaluación o coevaluación?' } },
          { id: 'ev-m4-p2b', type: 'content', title: '📊 Antes / Después: Autoevaluación en el aula', content: '**❌ Sin autoevaluación:**\nLos estudiantes entregan la tarea sin pensar si está completa, si es su mejor trabajo, ni qué podrían mejorar. El docente califica. Los estudiantes reciben la nota y la archivan. El ciclo se repite sin reflexión.\n\nResultado: los mismos errores se repiten porque nadie los procesó conscientemente.\n\n---\n\n**✅ Con autoevaluación sistemática:**\n\nAntes de entregar cualquier trabajo, los estudiantes responden en 3 minutos:\n\n*"¿Esto es realmente mi mejor trabajo? ¿Revisé [criterio 1], [criterio 2] y [criterio 3]? Si pudiera cambiar algo antes de entregarlo, ¿qué sería?"*\n\n**Tres semanas después:** la calidad promedio de los trabajos mejora. Los estudiantes empiezan a corregir errores antes de entregar porque desarrollaron el hábito de mirarse a sí mismos como evaluadores.\n\n**Seis semanas después:** algunos estudiantes hacen la autoevaluación solos, sin que nadie se las pida. Eso es metacognición en acción.', extra: { tip: 'La autoevaluación no reemplaza la evaluación del docente — la enriquece. Cuando hay diferencia entre la autoevaluación y tu calificación, la conversación sobre esa diferencia produce más aprendizaje que la nota misma.', activity: '¿En qué momento de tu próxima clase podrías incluir 3 minutos de autoevaluación antes de entregar un trabajo? Planifica el momento exacto.' } },
          { id: 'ev-m4-p3b', type: 'content', title: '📋 Plantilla: Guía completa de autoevaluación por nivel', content: '**Tres versiones listas para usar — copia la que corresponde a tu nivel:**\n\n---\n**📝 VERSIÓN PRIMARIA BAJA (1°-3°) — Dibujo o dictado**\nMi trabajo hoy: □ Lo hice solo □ Con ayuda\nEstoy contento/a con: _______________\nLa próxima vez quiero: _______________\nEn semáforo, hoy aprendí: 🔴 □ 🟡 □ 🟢 □\n\n---\n**📝 VERSIÓN PRIMARIA ALTA (4°-6°)**\nAl revisar mi trabajo:\n□ Completé todo lo que se pedía\n□ Revisé la ortografía y redacción\n□ Incluí ejemplos o evidencias\n□ Es realmente mi mejor esfuerzo\n\nLo que más me costó fue: _______________\nSi tuviera 10 minutos más, mejoraría: _______________\nMe pongo una nota de ___ /10 porque: _______________\n\n---\n**📝 VERSIÓN BÁSICO Y DIVERSIFICADO**\nEsta tarea demuestra mi competencia en ________ porque: _______________\nLo que haría diferente con más tiempo: _______________\nUna duda que me queda sobre este tema: _______________\nMi calificación propuesta: ___ porque: _______________\n¿En qué criterio creo que el docente verá diferente a mí? _______________\n\n---\n\n*Usa la autoevaluación ANTES de entregar (no después). El propósito es mejorar el trabajo, no justificar la nota.*', extra: { tip: 'Si los estudiantes siempre se ponen la nota máxima, introduce calibración: comparte ejemplos de trabajos pasados y practiquen juntos cómo se evaluarían con la guía. La calibración transforma la calidad de la autoevaluación.', activity: 'Imprime la versión que corresponde a tu nivel. Úsala en la próxima entrega de trabajo. Después, compara las autoevaluaciones con tus calificaciones. ¿Qué encuentras?' } }
        ]
      }
    ],
    finalExam: {
        title: 'Examen Final: Herramientas de Evaluación',
        passingScore: 70,
        questions: [
            { id: 1, text: '¿Qué es la evaluación auténtica?', options: ['Un examen muy difícil', 'Una evaluación donde los estudiantes demuestran su aprendizaje a través de tareas significativas similares a situaciones reales', 'La evaluación que hace el director', 'Un examen sin trampa'], correct: 1, explanation: 'La evaluación auténtica tiene propósito real, audiencia más allá del docente y requiere aplicar conocimiento, no solo recordarlo.' },
            { id: 2, text: '¿Cuáles son los tres tipos de evaluación y en qué momento se aplica cada uno?', options: ['Fácil, medio, difícil — al inicio, mitad y final', 'Diagnóstica (al inicio), formativa (durante) y sumativa (al final)', 'Oral, escrita y práctica — en distintos períodos', 'Individual, grupal y de proyecto — según el tema'], correct: 1, explanation: 'Diagnóstica al inicio (¿qué saben?), formativa durante el proceso (¿cómo van?) y sumativa al final (¿qué lograron?) forman el sistema completo de evaluación.' },
            { id: 3, text: '¿Por qué la evaluación formativa es la más poderosa pedagógicamente?', options: ['Porque vale más en la nota final', 'Porque ocurre durante el proceso y permite corregir el rumbo cuando aún hay tiempo', 'Porque es más fácil de aplicar', 'Porque los padres la prefieren'], correct: 1, explanation: 'La evaluación formativa retroalimenta cuando aún se puede mejorar. La sumativa solo constata lo que ya ocurrió.' },
            { id: 4, text: '¿Qué es una rúbrica?', options: ['Una lista de temas que se estudiarán', 'Una tabla que describe niveles de desempeño para distintos criterios de evaluación', 'El promedio de calificaciones del período', 'Un tipo de examen de opción múltiple'], correct: 1, explanation: 'La rúbrica es el mapa de calidad: describe qué se ve en distintos niveles de desempeño para cada criterio evaluado.' },
            { id: 5, text: '¿Cuándo deben conocer los estudiantes la rúbrica?', options: ['Al recibir el trabajo calificado', 'Antes de comenzar el trabajo que será evaluado', 'A la mitad del proceso', 'Solo los estudiantes con problemas de aprendizaje'], correct: 1, explanation: 'La rúbrica es un mapa de destino, no un veredicto. Compartirla al inicio permite que los estudiantes apunten a la calidad desde el comienzo.' },
            { id: 6, text: '¿Cuál es la diferencia entre la rúbrica holística y la analítica?', options: ['La holística es más difícil', 'La holística evalúa el trabajo en conjunto; la analítica evalúa cada criterio por separado', 'La analítica es solo para proyectos', 'No hay diferencia significativa'], correct: 1, explanation: 'La rúbrica analítica da retroalimentación específica por dimensión. La holística es más rápida pero menos útil para orientar mejoras.' },
            { id: 7, text: '¿Qué hace diferente a un portafolio de aprendizaje de simplemente guardar trabajos?', options: ['Usa fundas plásticas de colores', 'La selección deliberada y la reflexión del estudiante sobre su propio crecimiento', 'El docente elige qué incluir', 'Solo incluye los trabajos perfectos'], correct: 1, explanation: 'La selección con propósito y la reflexión del estudiante son lo que convierte una carpeta en un portafolio de aprendizaje.' },
            { id: 8, text: '¿Qué es la tarjeta de reflexión en un portafolio?', options: ['Una calificación del docente', 'Una nota del estudiante explicando por qué eligió cada pieza y qué aprendió', 'Un registro de asistencia', 'La portada del portafolio'], correct: 1, explanation: 'La tarjeta de reflexión es el elemento metacognitivo del portafolio. El estudiante explica su selección y su proceso de aprendizaje.' },
            { id: 9, text: '¿Qué son las conferencias de portafolio lideradas por el estudiante?', options: ['Exámenes orales', 'Reuniones donde el estudiante presenta su portafolio a sus padres, comunicando su propio aprendizaje', 'Presentaciones para el director', 'Clases donde el estudiante enseña a otros'], correct: 1, explanation: 'Las Student-Led Conferences invierten la relación tradicional: el estudiante comunica su aprendizaje a los padres, desarrollando responsabilidad y comunicación.' },
            { id: 10, text: '¿Cuál es el principal beneficio de la autoevaluación?', options: ['Le ahorra tiempo al docente', 'Desarrolla metacognición y responsabilidad del estudiante sobre su propio aprendizaje', 'Reemplaza la calificación del docente', 'Hace que los exámenes sean más fáciles'], correct: 1, explanation: 'La metacognición (pensar sobre el propio aprendizaje) es una habilidad fundamental para el aprendizaje autónomo de por vida.' },
            { id: 11, text: '¿Qué es el "ticket de salida"?', options: ['El permiso para salir del aula', 'Una reflexión breve de 2-3 minutos al final de la clase donde el estudiante escribe qué aprendió y qué dudas tiene', 'El examen final del período', 'Una actividad de inicio de clase'], correct: 1, explanation: 'El ticket de salida es evaluación formativa simple y efectiva: da información sobre el estado de comprensión de cada estudiante en 3 minutos.' },
            { id: 12, text: '¿Qué es la coevaluación?', options: ['El docente evalúa dos veces el mismo trabajo', 'Los estudiantes evalúan el trabajo de sus compañeros usando criterios acordados', 'Una evaluación grupal donde todos reciben la misma nota', 'Un examen hecho en colaboración'], correct: 1, explanation: 'La coevaluación desarrolla pensamiento crítico y la capacidad de dar retroalimentación constructiva, habilidades valiosas para la vida.' },
            { id: 13, text: '¿Por qué es importante "calibrar" a los estudiantes antes de hacer coevaluación?', options: ['Para que el proceso sea más rápido', 'Para que aprendan a aplicar los criterios de manera consistente y no evalúen solo por amistad', 'Para que evalúen exactamente igual que el docente', 'No es necesario calibrar'], correct: 1, explanation: 'Sin calibración, los estudiantes evalúan con subjetividad. La calibración con ejemplos concretos alinea la comprensión de los criterios.' },
            { id: 14, text: '¿Cuál es la retroalimentación MÁS efectiva?', options: ['"Muy bien hecho"', '"Tu análisis de las causas fue sólido. Para la próxima, agrega evidencias específicas de tu comunidad para hacerlo más convincente"', '"Regular, puede mejorar"', '"Igual que el año pasado"'], correct: 1, explanation: 'La retroalimentación efectiva es específica (qué estuvo bien y por qué), orientada al futuro (qué mejorar) y contextualizada (conecta con el aprendizaje real).' },
            { id: 15, text: 'Al evaluar un portafolio, ¿con qué debe compararse el trabajo del estudiante?', options: ['Con el portafolio del mejor estudiante del grupo', 'Con su propio trabajo del inicio del período para medir crecimiento', 'Con estándares internacionales', 'Con el portafolio ideal que el docente imaginó'], correct: 1, explanation: 'El portafolio es evidencia de crecimiento individual. La comparación relevante es el progreso del estudiante respecto a sí mismo.' },
            { id: 16, text: '¿Por qué los exámenes de opción múltiple no son suficientes para evaluar en un enfoque de competencias?', options: ['Porque son muy fáciles de hacer trampa', 'Porque miden memorización, no la capacidad de aplicar conocimiento en situaciones complejas y reales', 'Porque los estudiantes los odian', 'Porque toman mucho tiempo calificar'], correct: 1, explanation: 'Las competencias implican aplicación en contextos reales. Los exámenes de opción múltiple miden el conocimiento declarativo pero no cómo se usa en situaciones auténticas.' },
            { id: 17, text: 'Una evaluación equitativa debe:', options: ['Dar las mismas tareas exactamente a todos los estudiantes', 'Considerar las barreras de idioma, acceso a recursos y contexto socioeconómico en el diseño de las tareas', 'Favorecer a los estudiantes que tienen más apoyo en casa', 'Ser siempre un examen escrito'], correct: 1, explanation: 'La equidad en evaluación requiere que todos los estudiantes tengan la oportunidad real de demostrar su aprendizaje, sin ser obstaculizados por barreras ajenas al conocimiento.' },
            { id: 18, text: '¿Cómo puede la evaluación ser culturalmente sensible en contextos indígenas guatemaltecos?', options: ['Ignorar las diferencias culturales y aplicar el mismo método a todos', 'Valorar la demostración de conocimiento en lengua materna, formas de expresión diversas (oral, artística) y saberes locales', 'Evaluar solo en español para que sea "oficial"', 'Usar solo evaluaciones numéricas'], correct: 1, explanation: 'La evaluación culturalmente sensible reconoce que el conocimiento existe en múltiples formas y lenguas. Limitar la evaluación al español o formatos occidentales puede ocultar aprendizajes reales.' },
            { id: 19, text: '¿Cuál de estos es un error común al crear rúbricas?', options: ['Tener muy pocos criterios', 'Usar descriptores vagos como "bien" o "regular" en lugar de evidencias observables', 'Compartirlas con los estudiantes antes del trabajo', 'Incluir criterios de proceso además de producto'], correct: 1, explanation: 'Los descriptores vagos no sirven de guía ni para el estudiante ni para el docente. Los descriptores observables ("usa 3 fuentes") son específicos y aplicables.' },
            { id: 20, text: 'Un sistema de evaluación auténtico incluye:', options: ['Solo exámenes finales por trimestre', 'Evaluación diagnóstica, herramientas formativas durante el proceso, evaluación sumativa auténtica, auto y coevaluación', 'Solo proyectos, sin ningún examen', 'Lo que el libro de texto indique'], correct: 1, explanation: 'Un sistema completo de evaluación auténtica integra múltiples tipos de evidencia, herramientas formativas continuas y la voz del estudiante como evaluador.' }
        ]
    }
}
,
{
  id: 'tipos-estudiantes',
  title: 'Conoce a Quien Enseñas',
  subtitle: 'Tipos de estudiantes, casos de estudio y estrategias diferenciadas para el aula guatemalteca',
  icon: '👥',
  color: '#7C3AED',
  prerequisite: null,
  status: 'available',
  durationHours: 5,
  totalCards: 60,
  modules: [
    // MÓDULO 1: El Mapa del Aula (12 tarjetas)
    {
      id: 1,
      title: '🗺️ El Mapa del Aula: ¿A quién enseñas?',
      cards: [
        { id: 'te-m1-c1', type: 'content', title: '👥 Conocer a tus estudiantes: la habilidad #1', content: 'Puedes dominar tu materia, planificar lecciones perfectas y tener recursos excelentes. Pero si no conoces a quien tienes enfrente, enseñas al vacío.\n\nLas investigaciones de John Hattie (Visible Learning, 2009) analizaron más de 800 meta-estudios con millones de estudiantes. **La relación docente-estudiante aparece entre los 10 factores más influyentes en el rendimiento**, por encima del tamaño del grupo, la tecnología o el currículo.\n\n• Un estudiante que se siente visto aprende más\n• Un estudiante que se siente invisible desaparece\n• Un estudiante que se siente incomprendido resiste', extra: { tip: 'En contextos guatemaltecos, conocer a tus estudiantes incluye entender su idioma materno, su realidad familiar, su trabajo fuera del horario escolar y los roles que cumple en casa.', activity: '¿Cuántos de tus estudiantes actuales conoces más allá de su nombre y calificación? Haz mentalmente la cuenta.' } },
        { id: 'te-m1-c2', type: 'content', title: '🔍 Los cuatro grandes perfiles del aula', content: 'En toda aula coexisten al menos cuatro grandes tipos de estudiante. No son categorías rígidas — un mismo niño puede moverse entre ellas según el día, la materia o lo que está viviendo en casa.\n\n**Perfil 1 — El Comprometido:** Activo, curioso, participa, entrega puntual.\n\n**Perfil 2 — El Conformista:** Hace lo mínimo para pasar. No molesta pero tampoco brilla.\n\n**Perfil 3 — El Invisible:** Silencioso, pasa desapercibido. Puede estar bien o puede estar sufriendo en silencio.\n\n**Perfil 4 — El Desafiante:** Interrumpe, discute, se niega. Su conducta es comunicación.', extra: { tip: 'El Perfil 4 (Desafiante) es el que más energía consume del docente, pero generalmente esconde una necesidad no satisfecha: atención, pertenencia, control o alivio del miedo al fracaso.', activity: '¿Cuántos estudiantes tienes en cada perfil ahora mismo? Anota los números aproximados.' } },
        { id: 'te-m1-c3', type: 'content', title: '👤 El estudiante invisible: el mayor riesgo', content: 'El estudiante conformista o invisible es el más peligroso de ignorar. No pide ayuda. No llama la atención. No tiene "problemas de conducta".\n\nPero puede estar:\n• Completamente perdido en la materia\n• Viviendo una situación difícil en casa\n• Experimentando depresión o ansiedad\n• Creyendo que nadie en la escuela lo nota\n\n**Un estudio de la UNESCO (2021) sobre América Latina encontró que los estudiantes en riesgo de abandono escolar raramente son los más "problemáticos" — son los que nunca se quejan.**', extra: { tip: 'Regla de los 20 segundos: si en una clase de 45 minutos no interactuaste directamente con un estudiante específico, ese estudiante fue invisible para ti esa clase.', activity: 'Esta semana, identifica a tus 3 estudiantes más "invisibles". Habla con ellos 1 a 1 antes o después de clase.' } },
        { id: 'te-m1-c4', type: 'quiz', title: '✅ Comprueba tu comprensión', question: '¿Cuál de estos estudiantes representa el mayor riesgo de abandono escolar según la investigación?', options: ['El estudiante que discute con el docente', 'El estudiante que nunca entrega tareas pero sí viene a clase', 'El estudiante silencioso que siempre aprueba con notas mínimas y nunca pide ayuda', 'El estudiante que llora cuando saca mala nota'], correct: 2, explanation: 'El estudiante invisible —silencioso, con notas mínimas, que nunca pide ayuda— es el de mayor riesgo porque su señal de alerta no activa la respuesta del sistema. No "molesta" y por eso no recibe atención.' },
        { id: 'te-m1-c5', type: 'content', title: '👁️ El poder de la observación sistemática', content: 'Conocer a tus estudiantes no depende solo de la intuición. Requiere observación activa y sistemática.\n\n**¿Qué observar?**\n• ¿Con quién se sienta voluntariamente?\n• ¿Qué hace cuando termina una tarea antes que los demás?\n• ¿Cómo reacciona cuando comete un error?\n• ¿Qué tema del currículo ilumina sus ojos?\n• ¿Qué días llega cansado o sin comer?\n• ¿Cómo es su caligrafía y organización del cuaderno?\n\n**Los primeros 10 días de clases son una mina de oro** si los usas para observar sistemáticamente, no solo para cubrir contenido.', extra: { tip: 'Lleva un cuaderno pequeño o usa el reverso de tu planificación. Anota 2-3 observaciones por estudiante durante la primera semana. No hace falta ser exhaustivo — lo que notas es más de lo que crees.', activity: 'Elige un estudiante que "no terminas de entender". Obsérv alo en silencio por 10 minutos mañana. ¿Qué aprendes?' } },
        { id: 'te-m1-c6', type: 'content', title: '📋 La ficha de perfil del estudiante', content: 'Una ficha simple puede transformar tu relación con cada estudiante. No necesita ser digital ni complicada.\n\n**Datos básicos:**\n• Nombre completo y cómo le gusta que le llamen\n• Idioma materno\n• Vive con: (ambos padres / mamá / papá / abuelos / otro)\n• ¿Trabaja fuera del horario escolar? ¿En qué?\n• Distancia y transporte hasta la escuela\n\n**Datos académicos:**\n• Materia favorita y por qué\n• Materia más difícil\n• Estilo de trabajo preferido (solo / en grupo)\n\n**Datos socioemocionales:**\n• Un sueño o meta que tiene\n• Algo que le preocupa de la escuela', extra: { tip: 'Esta ficha se puede completar como actividad de inicio de año: "Cuéntame sobre ti". Los estudiantes de primaria adoran sentirse escuchados. Los de secundaria suelen sorprenderte si el ambiente es seguro.', activity: 'Descarga o dibuja una versión simple de esta ficha. ¿Podrías completarla con 5 estudiantes esta semana?' } },
        { id: 'te-m1-c7', type: 'simulation', title: '🎭 Sofía en el primer día', scenario: '**Sofía**, 9 años, se sienta sola al fondo del aula el primer día. No habla con nadie. Cuando le preguntas su nombre, responde en voz muy baja y mira al suelo. En el recreo, se queda en el aula en lugar de salir a jugar.\n\nUna colega te dice: "No te preocupes, esa niña siempre ha sido tímida, es normal en ella."', statement: 'Debo respetar la timidez de Sofía y no presionarla. Con el tiempo, ella sola se integrará al grupo.', correctSwipe: 'left', rightOutcome: 'La timidez extrema puede ser una señal de algo más: ansiedad social, bullying previo, situación difícil en casa o dificultades de aprendizaje. "Dejar que pase sola" ignora una oportunidad de intervención temprana. Sofía puede pasar todo el año invisible si nadie actúa.', leftOutcome: '✅ ¡Decisión acertada! La timidez no debe ignorarse, pero tampoco debe presionarse públicamente. El siguiente paso es una conversación privada y tranquila, una actividad de dibujo o escritura para conocerla sin presión grupal, y contactar a la familia para entender si hay algo que necesitas saber.', extra: { tip: 'La diferencia entre timidez saludable y ansiedad que requiere apoyo: la timidez disminuye con el tiempo y en ambientes seguros. La ansiedad persiste o aumenta. Si a la semana 3 Sofía sigue exactamente igual, hay que actuar.', activity: '¿Tienes un "Sofía" en tu aula? ¿Qué has hecho hasta ahora para conocerla mejor?' } },
        { id: 'te-m1-c8', type: 'content', title: '👨‍👩‍👧 Las familias como fuente de información', content: 'La familia conoce a tu estudiante hace años. Tú apenas lo ves unas horas al día. **Aprovechar ese conocimiento es inteligencia pedagógica, no debilidad.**\n\n**Preguntas clave para padres en la primera reunión:**\n• ¿Cómo describe su hijo/a la escuela cuando llega a casa?\n• ¿Hay algo que debería saber para apoyarle mejor?\n• ¿Cuándo está más concentrado/a: mañana o tarde?\n• ¿Tiene alguna situación de salud que afecte su aprendizaje?\n• ¿Qué es lo que más le gusta hacer fuera de la escuela?\n\n**Importante:** Escucha sin juzgar. Las familias de contextos vulnerables a veces no acuden por miedo a ser criticadas.', extra: { tip: 'En comunidades indígenas guatemaltecas, la reunión con familias puede necesitar un intérprete o realizarse en lengua materna. Quien traduce no debe ser el propio estudiante — eso invierte el rol de poder de forma inapropiada.', activity: 'En tu próxima reunión de padres, prueba hacer UNA pregunta abierta sobre el hijo/a antes de hablar de notas. ¿Qué descubres?' } },
        { id: 'te-m1-c9', type: 'content', title: '🇬🇹 El contexto guatemalteco cambia todo', content: 'El aula guatemalteca es una de las más diversas del mundo. En una misma sección puedes tener:\n\n• Estudiantes que hablan español como segunda lengua\n• Niños que cuidan hermanos menores o trabajan por las tardes\n• Estudiantes que caminan 2 horas para llegar a la escuela\n• Niños con acceso a internet y otros sin luz eléctrica en casa\n• Estudiantes con desnutrición crónica que afecta su concentración\n• Jóvenes en riesgo de abandono por presión económica familiar\n\n**Este contexto no es un obstáculo a lamentar. Es la realidad desde la cual diseñas.** El docente que ignora el contexto diseña para un estudiante que no existe.', extra: { tip: 'La desnutrición crónica en Guatemala afecta la memoria de trabajo, la concentración y el tiempo de reacción. Un estudiante que "no presta atención" puede estar experimentando los efectos de una nutrición insuficiente — no falta de voluntad.', activity: '¿Cuántos de tus estudiantes trabajan fuera del horario escolar? ¿Cómo afecta eso a la tarea que les pides para casa?' } },
        { id: 'te-m1-c10', type: 'quiz', title: '🔍 Analizando el contexto', question: 'Una docente asigna tarea de investigación que requiere internet. Al día siguiente, 8 de 30 estudiantes la entregaron. ¿Cuál es la lectura más pedagógicamente responsable?', options: ['Los 22 restantes son flojos y desinteresados', 'La tarea reveló una brecha de acceso tecnológico que la docente no había considerado', 'El tema de la tarea no era interesante', 'Los padres no apoyaron en casa'], correct: 1, explanation: 'Antes de concluir sobre la motivación del estudiante, el docente debe verificar si la tarea era accesible para TODOS. Una tarea que solo el 27% puede completar revela un problema de diseño, no de los estudiantes.' },
        { id: 'te-m1-c11', type: 'content', title: '⚠️ El juicio prematuro: el error más costoso', content: 'El juicio prematuro es cuando formamos una opinión sobre un estudiante antes de conocerlo realmente. Se nutre de:\n\n• Comentarios de docentes anteriores ("ese niño es imposible")\n• Calificaciones del año pasado\n• El comportamiento de un hermano mayor\n• El nivel socioeconómico de la familia\n• Estereotipos culturales o étnicos\n\n**El efecto Pigmalión (Rosenthal y Jacobson, 1968):** Las expectativas del docente se convierten en profecías autocumplidas. Si esperas poco de un estudiante, obtendrás poco. Si esperas mucho, obtendrás más.\n\nCada nuevo año escolar es una hoja en blanco. **Cada estudiante merece ser visto fresco.**', extra: { tip: 'Antes de leer el expediente de un estudiante, conoce a la persona. El expediente puede contaminar tu percepción antes de que tengas tu propia evidencia.', activity: '¿Has heredado algún juicio sobre algún estudiante de un colega o del expediente? ¿Cómo puedes "resetear" esa percepción?' } },
        { id: 'te-m1-c12', type: 'content', title: '📐 Proyecto: Mi mapa del aula', content: 'Has completado el módulo 1. Ahora aplica lo aprendido con este proyecto.\n\n**Tu misión:** Crear el mapa de tu aula real, identificando al menos 3 perfiles distintos y diseñando una acción concreta para cada uno.\n\nUsa lo que ya sabes de tus estudiantes y lo que observarás esta semana.', extra: { tip: 'No necesitas identificar a todos los estudiantes a la vez. Empieza con los 5 que más te generan duda o preocupación.', activity: '¿Qué perfil de estudiante te resulta más difícil de conectar? ¿Por qué crees que es así?' },
          project: {
            title: 'Mi Mapa del Aula',
            duration: '1 semana de observación + 1 hora de sistematización',
            difficulty: 'Nivel reflexivo',
            materials: ['Cuaderno o hoja de observación', 'Lista de estudiantes', 'Ficha de perfil (puedes dibujarla)', 'Tiempo de conversación con al menos 3 estudiantes'],
            steps: [
              'Escribe los nombres de todos tus estudiantes. Junto a cada nombre, anota el perfil principal que percibes: Comprometido, Conformista, Invisible o Desafiante.',
              'Durante 3 días, observa activamente 5 estudiantes que elegiste. Anota 1-2 observaciones por día por cada uno.',
              'Completa una ficha de perfil básica para esos 5 estudiantes usando observación y una conversación breve.',
              'Identifica: ¿qué perfiles predominan en tu aula? ¿Hay algún grupo de estudiantes que estás ignorando involuntariamente?',
              'Diseña UNA acción concreta para cada perfil identificado: ¿Qué cambiarás esta semana en cómo te relacionas con cada tipo?',
              'Comparte tu mapa con un colega de confianza. El intercambio mejora la observación.'
            ],
            disciplines: ['Observación pedagógica', 'Perfil del estudiante', 'Planificación diferenciada', 'Relación docente-estudiante'],
            think: ['¿Qué perfiles no habías nombrado antes de este módulo?', '¿Qué estudiante te sorprendió al observarlo más detenidamente?', '¿Qué supuestos tenías que la observación confirmó o desafió?'],
            make: ['La ficha de perfil de 5 estudiantes', 'El mapa visual del aula con los cuatro perfiles coloreados', 'Una tabla de acciones: perfil → estrategia específica para tu aula'],
            improve: ['¿Cómo actualizarás el mapa a mitad del año?', '¿Puedes invitar a tus estudiantes a reflexionar sobre su propio perfil de aprendizaje?', '¿Cómo compartirías este mapa con la familia de forma útil y no estigmatizante?']
          }
        }
      ]
    },
    // MÓDULO 2: Estilos y Ritmos de Aprendizaje (12 tarjetas)
    {
      id: 2,
      title: '🧠 Estilos y Ritmos de Aprendizaje',
      cards: [
        { id: 'te-m2-c1', type: 'content', title: '📡 Los cuatro canales de aprendizaje (VARK)', content: 'No todos aprendemos de la misma manera. El modelo VARK de Neil Fleming identifica cuatro canales principales por los que preferimos recibir y procesar la información:\n\n**V — Visual:** Aprenden mejor con imágenes, diagramas, mapas, colores y organizadores gráficos.\n\n**A — Auditivo:** Aprenden mejor escuchando, hablando, discutiendo y explicando en voz alta.\n\n**R — Lector/Escritor (Reading):** Aprenden mejor leyendo textos y tomando notas escritas.\n\n**K — Kinestésico:** Aprenden mejor moviéndose, tocando, construyendo y experimentando con el cuerpo.', extra: { tip: 'La mayoría de los sistemas educativos tradicionales privilegian el canal Lector/Escritor. Esto explica por qué muchos estudiantes "brillantes" que no encajan en ese canal son subestimados.', activity: '¿Cuál es tu canal de aprendizaje dominante? ¿Cómo afecta eso a cómo enseñas?' } },
        { id: 'te-m2-c2', type: 'content', title: '👁️ El estudiante visual', content: '**¿Cómo lo reconoces?**\n• Dibuja en los márgenes del cuaderno\n• Prefiere los mapas conceptuales a los resúmenes escritos\n• Dice "¿puedes mostrármelo?" más que "¿puedes explicármelo?"\n• Recuerda mejor lo que vio que lo que escuchó\n• Le cuesta seguir instrucciones orales largas\n\n**¿Cómo apoyarlo?**\n• Usa la pizarra activamente con diagramas y colores\n• Pide que representen conceptos en dibujos o esquemas\n• Usa líneas de tiempo visuales, mapas mentales y tablas comparativas\n• Permite que su cuaderno tenga color y elementos gráficos', extra: { tip: 'El 65% de la población humana tiene preferencia visual como canal primario. Esto no significa que los otros canales sean menos importantes — significa que el canal visual es un buen punto de entrada para la mayoría.', activity: 'En tu próxima clase, incluye UN elemento visual que no usarías normalmente. Observa quién responde distinto.' } },
        { id: 'te-m2-c3', type: 'content', title: '🎵 El estudiante auditivo', content: '**¿Cómo lo reconoces?**\n• Repite en voz baja lo que lee o escucha\n• Aprende mejor las canciones y los ritmos\n• Le encanta discutir y debatir en clase\n• Se distrae con ruidos pero también se activa con sonidos\n• Prefiere que le expliquen a que le muestren\n\n**¿Cómo apoyarlo?**\n• Usa el debate y la discusión como herramienta de aprendizaje\n• Permite que repita en voz alta antes de escribir\n• Usa canciones o rimas para memorizar conceptos\n• Dale roles de explicador en trabajo en grupo\n• Permite que grabe notas de voz como alternativa a escribirlas', extra: { tip: 'Los estudiantes auditivos a menudo "interrumpen" porque necesitan procesar verbalmente. Canalizar esa energía (turno de hablar, rol de explicador) es más efectivo que silenciarlos.', activity: '¿Cuántos de tus estudiantes son claramente auditivos? ¿Cuánto espacio para hablar tienen en tus clases?' } },
        { id: 'te-m2-c4', type: 'content', title: '🤸 El estudiante kinestésico', content: '**¿Cómo lo reconoces?**\n• No puede estar quieto — se mueve, toca, manipula objetos\n• Aprende haciendo, no oyendo ni leyendo\n• Parece "distraído" pero si le das algo en las manos, se concentra\n• Recuerda mejor lo que hizo que lo que oyó o leyó\n• Le frustra la instrucción pasiva larga\n\n**¿Cómo apoyarlo?**\n• Incorpora movimiento: girar en la clase, representar con el cuerpo\n• Usa materiales manipulativos: fichas, objetos, modelos\n• Permite que construyan en lugar de solo describir\n• Los proyectos manuales (tinkering) son su lenguaje natural\n• STEAM es el paraíso de los estudiantes kinestésicos', extra: { tip: 'El sistema escolar tradicional es el peor ambiente posible para el estudiante kinestésico: sentado 6 horas, sin moverse, copiando. Su "mala conducta" frecuentemente es frustración de un cuerpo que necesita moverse para aprender.', activity: '¿Cuántos de tus estudiantes diagnosticados con "problemas de conducta" son en realidad kinestésicos sin suficiente movimiento?' } },
        { id: 'te-m2-c5', type: 'quiz', title: '🔍 Identifica el estilo', question: 'Sebastián memoriza las tablas de multiplicar más rápido si las canta con una melodía. Cuando estudia, repite en voz alta lo que lee. ¿Cuál es su canal de aprendizaje dominante?', options: ['Visual', 'Kinestésico', 'Auditivo', 'Lector/Escritor'], correct: 2, explanation: 'Sebastián aprende mejor a través del sonido: canciones, repetición oral y escucha activa. Esto es característico del canal auditivo. El docente puede aprovecharlo usando rimas, debates y explicaciones en voz alta como herramientas de aprendizaje.' },
        { id: 'te-m2-c6', type: 'content', title: '🌟 Las 8 Inteligencias de Gardner', content: 'Howard Gardner (1983) propuso que la inteligencia no es única ni medible con un solo número. Existen al menos **8 tipos de inteligencia**, cada una con su propio perfil de fortalezas:\n\n1. **Lingüística:** Facilidad con el lenguaje, escritura, narración\n2. **Lógico-matemática:** Razonamiento, números, patrones\n3. **Espacial:** Imágenes, mapas, diseño, orientación\n4. **Musical:** Melodía, ritmo, tonalidad\n5. **Corporal-kinestésica:** Movimiento, coordinación, habilidades manuales\n6. **Naturalista:** Observación del mundo natural, clasificación\n7. **Interpersonal:** Empatía, liderazgo, relaciones sociales\n8. **Intrapersonal:** Autoconocimiento, reflexión, autonomía', extra: { tip: 'El sistema educativo tradicional evalúa principalmente inteligencia lingüística y lógico-matemática. Los estudiantes con inteligencias predominantes en otros tipos son sistemáticamente subvalorados.', activity: '¿Cuál es tu inteligencia dominante? ¿Cuál es la menos desarrollada? ¿Cómo influye eso en tu práctica docente?' } },
        { id: 'te-m2-c7', type: 'content', title: '🗣️ Inteligencias lingüística y lógico-matemática', content: '**Inteligencia Lingüística en el aula:**\n• El estudiante que escribe cartas, poemas o cuentos espontáneamente\n• Aprende vocabulario nuevo rápidamente\n• Cuenta historias con detalle y estructura\n\n*Estrategias:* Narrativa, debate, escritura creativa, periodismo escolar\n\n**Inteligencia Lógico-Matemática en el aula:**\n• El estudiante que busca patrones en todo\n• Hace preguntas de "¿por qué funciona así?"\n• Disfruta puzzles, secuencias y clasificaciones\n• Puede parecer aburrido si el ritmo es lento\n\n*Estrategias:* Resolución de problemas, codificación, experimentos con hipótesis, juegos de lógica', extra: { tip: 'En Guatemala, hay comunidades donde la inteligencia lingüística se expresa en idiomas mayas con estructuras muy distintas al español. Respetar esa riqueza lingüística es reconocer la inteligencia del estudiante.', activity: '¿Tienes estudiantes que destacan en narrativa oral pero no en escritura? ¿Cómo los estás valorando?' } },
        { id: 'te-m2-c8', type: 'content', title: '🎨 Inteligencias espacial, musical y naturalista', content: '**Inteligencia Espacial:**\n• Piensa en imágenes, diseña con facilidad\n• Excelente sentido de orientación\n• Estrategia: mapas mentales, infografías, diseño gráfico\n\n**Inteligencia Musical:**\n• Detecta el ritmo en todo, compone melodías espontáneamente\n• Aprende mejor con fondo musical\n• Estrategia: canciones educativas, ritmos para memorizar\n\n**Inteligencia Naturalista:**\n• Observa el entorno con detalle extraordinario\n• Clasifica, categoriza, distingue diferencias mínimas en plantas y animales\n• Estrategia: salidas al campo, proyectos de medio ambiente, jardinería escolar\n\nEstas tres inteligencias raramente se evalúan en el sistema tradicional, pero son fundamentales en contextos rurales guatemaltecos.', extra: { tip: 'La inteligencia naturalista es particularmente prevalente en comunidades indígenas con fuerte conexión con la tierra. Proyectos de agricultura escolar, conservación del agua y biodiversidad local activan esta inteligencia.', activity: '¿Tienes estudiantes que "saben todo" sobre plantas, animales o el clima local? Esa es inteligencia naturalista en acción. ¿Cómo la aprovechas?' } },
        { id: 'te-m2-c9', type: 'content', title: '🤝 Inteligencias interpersonal e intrapersonal', content: '**Inteligencia Interpersonal:**\n• Lee las emociones de los demás con facilidad\n• Es el mediador natural de los conflictos del grupo\n• Lidera sin necesidad de imposición\n• Estrategia: trabajo cooperativo, roles de liderazgo, mediación de pares\n\n**Inteligencia Intrapersonal:**\n• Se conoce a sí mismo con profundidad\n• Necesita tiempo para reflexionar antes de actuar\n• Puede parecer "distante" pero está procesando\n• Estrategia: diarios de aprendizaje, portafolios reflexivos, tiempo para procesar antes de responder públicamente\n\n**Ojo:** El estudiante intrapersonal en un aula muy grupal puede agotarse y retraerse. No es arrogancia — es diferencia de procesamiento.', extra: { tip: 'El liderazgo estudiantil frecuentemente va a los estudiantes con inteligencia interpersonal alta. Pero el estudiante intrapersonal puede ser un líder silencioso igualmente valioso, especialmente en procesos de toma de decisiones reflexivas.', activity: '¿Cuánto espacio de reflexión individual ofreces en tu clase? ¿Alguna vez das tiempo para pensar antes de pedir respuestas públicas?' } },
        { id: 'te-m2-c10', type: 'simulation', title: '🎭 Diego no quiere leer', scenario: '**Diego**, 11 años, es uno de los estudiantes más brillantes cuando habla. Puede explicar conceptos complejos verbalmente con claridad y usa vocabulario sofisticado. Sin embargo, cada vez que le pides que lea en voz alta o que complete ejercicios escritos, se niega, se distrae o entrega páginas en blanco.\n\nSu nota en "Comprensión Lectora" es 45. Pero sus respuestas orales en clase son de nivel avanzado.', statement: 'Diego tiene dificultades de aprendizaje que requieren evaluación especializada antes de que yo pueda hacer algo diferente.', correctSwipe: 'left', rightOutcome: 'Antes de derivar a evaluación especializada (que en muchos contextos guatemaltecos no está disponible rápidamente), el docente puede hacer muchísimo. La discrepancia entre el desempeño oral y escrito puede ser dislexia, pero también puede ser preferencia auditiva extrema, dificultad con la mecánica de la escritura, o simplemente que Diego nunca ha sido enseñado desde su canal de fortaleza. La evaluación especializada es valiosa pero no es prerrequisito para actuar.', leftOutcome: '✅ Acertado. El docente puede actuar AHORA: evaluar oralmente a Diego, pedirle que dicte sus respuestas, usar el texto a voz, o permitirle demostrar comprensión de formas alternativas. Documentar las observaciones ayudará si eventualmente se necesita derivación, pero el estudiante no debe esperar que el "sistema" lo atienda para recibir apoyo adaptado.', extra: { tip: 'La diferencia entre dislexia y preferencia auditiva es clínica y requiere evaluación. Pero la respuesta pedagógica inmediata es similar: usar el canal de fortaleza del estudiante mientras se trabaja el canal débil gradualmente.', activity: '¿Tienes un "Diego" en tu aula? ¿Cómo estás evaluando su aprendizaje real versus su desempeño escrito?' } },
        { id: 'te-m2-c11', type: 'quiz', title: '🎯 Gardner en el aula', question: 'Una estudiante destaca por mediar conflictos entre compañeros, entender las emociones de los demás y organizar al grupo. ¿Qué inteligencia predomina en ella?', options: ['Intrapersonal', 'Lingüística', 'Interpersonal', 'Espacial'], correct: 2, explanation: 'La inteligencia interpersonal implica la capacidad de entender las emociones, motivaciones y perspectivas de otras personas, y de relacionarse con ellas de manera efectiva. Esta estudiante es una líder social natural.' },
        { id: 'te-m2-c12', type: 'content', title: '⏱️ Ritmos de aprendizaje: lento no es malo', content: 'Dentro de un mismo canal y una misma inteligencia, los estudiantes procesan a velocidades distintas.\n\n**Procesamiento rápido:**\n• Termina antes que los demás\n• Puede aburrirse y distraer a otros\n• Necesita extensiones, no repetición\n\n**Procesamiento lento:**\n• Necesita más tiempo para conectar la información nueva con lo que ya sabe\n• El sistema escolar lo penaliza constantemente (exámenes con tiempo fijo, avance grupal)\n• **Importante:** procesamiento lento NO equivale a menor capacidad. Algunos de los pensadores más profundos procesan lento porque conectan más antes de responder.\n\n**La velocidad no es el objetivo. La comprensión sí.**', extra: { tip: 'Albert Einstein no habló hasta los 4 años y fue expulsado de la escuela por "lento". Charles Darwin era considerado alumno mediocre. El ritmo de aprendizaje no predice el techo del aprendizaje.', activity: '¿Tienes estudiantes que necesitan más tiempo y los estás "esperando" o los estás dejando atrás? ¿Qué cambiarías?' } }
      ]
    },
    // MÓDULO 3: Perfiles Emocionales y Motivacionales (12 tarjetas)
    {
      id: 3,
      title: '❤️ Perfiles Emocionales y Motivacionales',
      cards: [
        { id: 'te-m3-c1', type: 'content', title: '🔥 Motivación intrínseca vs. extrínseca', content: 'La motivación es el motor del aprendizaje. Sin ella, ningún método funciona.\n\n**Motivación extrínseca:** El estudiante actúa para obtener una recompensa o evitar un castigo.\n• "Si saco 100, mi papá me compra algo"\n• "Si no entrego la tarea, me bajan la nota"\n\n**Motivación intrínseca:** El estudiante actúa porque le importa genuinamente.\n• "Quiero aprender a programar porque quiero crear videojuegos"\n• "Leer me lleva a mundos que me fascinan"\n\n**El problema:** El sistema escolar está casi completamente diseñado para motivación extrínseca (notas, premios, castigos). Esto funciona a corto plazo pero **destruye la curiosidad natural a largo plazo.**', extra: { tip: 'Edward Deci y Richard Ryan (Teoría de la Autodeterminación, 1985) demostraron que agregar recompensas externas a actividades ya motivadas intrínsecamente REDUCE la motivación. Las calcomanías por leer convierten la lectura en trabajo.', activity: '¿Cuáles de tus actividades actuales generan motivación intrínseca? ¿Cuáles se basan solo en la nota?' } },
        { id: 'te-m3-c2', type: 'content', title: '⭐ El estudiante estrella vs. el conformista', content: '**El Estudiante Estrella:**\n• Alta motivación, altas calificaciones, alta participación\n• Riesgo: puede aprender solo para el docente, no para sí mismo\n• Puede ser ansioso ante el error\n• Necesita desafío genuino y autonomía\n\n**El Estudiante Conformista:**\n• Hace lo mínimo para pasar. No molesta.\n• Motivación completamente extrínseca (la nota, no el aprendizaje)\n• Altamente en riesgo de abandono si la situación cambia\n• Necesita conexión personal con el contenido\n\n**El error común:** Dedicar toda la energía al estrella y ninguna al conformista porque "ya está pasando".', extra: { tip: 'El estudiante conformista que pasa con 60 año tras año puede estar ocultando una dificultad real (de comprensión, socioemocional o de contexto) que el sistema nunca detectó porque "no estaba reprobando".', activity: '¿Cuántos de tus estudiantes conformistas conoces personalmente? ¿Sabes qué les importa fuera de la escuela?' } },
        { id: 'te-m3-c3', type: 'content', title: '😰 El estudiante perfeccionista', content: 'El perfeccionismo parece una virtud. En exceso, es un obstáculo al aprendizaje.\n\n**Señales:**\n• Se niega a entregar si no está "perfecto"\n• Borra y reescribe varias veces la misma oración\n• Llora o se paraliza ante una calificación de 85/100\n• Evita actividades nuevas por miedo a hacerlo mal\n• Le cuesta trabajar en grupo porque "los demás no lo hacen bien"\n\n**La raíz:** El perfeccionismo generalmente viene del miedo al juicio externo. "Si cometo un error, soy un fracaso."\n\n**La intervención:** Crear una cultura de aula donde el error es información, no vergüenza. Modelar públicamente los propios errores.', extra: { tip: '"En mi clase, los errores tienen nombre: los llamamos datos." Esta frase simple, dicha en los primeros días, puede cambiar la relación del estudiante perfeccionista con el aprendizaje.', activity: '¿Cómo reaccionas TÚ cuando cometes un error frente a tus estudiantes? Ese modelo importa más que cualquier discurso.' } },
        { id: 'te-m3-c4', type: 'simulation', title: '🎭 María se paraliza ante el error', scenario: '**María**, 12 años, es tu mejor estudiante. Calificaciones perfectas, tareas impecables. Hoy, durante una presentación oral, se equivoca en una fecha. Se detiene, sus ojos se llenan de lágrimas, y dice "no puedo continuar". El grupo la observa en silencio.\n\nTienes 30 segundos para reaccionar.', statement: 'Lo más útil es animar a María públicamente: "¡Tú puedes! No pasa nada, sigue adelante, todos estamos aquí para apoyarte."', correctSwipe: 'left', rightOutcome: 'El ánimo público en este momento puede empeorar la situación. María ya está en el centro de atención — que 30 estudiantes la observen mientras ella llora amplifica exactamente lo que le aterra. La presión social del "tú puedes" puede sentirse como presión adicional para "componerse rápido", que es justamente lo que no puede hacer en este momento.', leftOutcome: '✅ Correcto. La respuesta más efectiva es reducir la presión pública inmediatamente. Opciones: continuar con la clase brevemente mientras ella se recupera ("Gracias María, continuemos, volvemos a ti en un momento"), acercarte en voz baja sin hacer del momento un espectáculo, y luego hablar con ella a solas. El mensaje clave que María necesita: el error no la define, y tú como docente no la estás juzgando.', extra: { tip: 'El perfeccionismo extremo en adolescentes guatemaltecas puede estar ligado a presión familiar intensa o a ser la "primera de la familia en llegar a la secundaria". Ese peso es real y el docente no lo creó, pero sí puede aliviarlo.', activity: '¿Cómo celebras en tu clase el proceso de aprendizaje, no solo el resultado? ¿Cuándo fue la última vez que mostraste públicamente tu propio error?' } },
        { id: 'te-m3-c5', type: 'content', title: '🌋 El estudiante desafiante', content: 'El estudiante que desafía, interrumpe, discute y se niega es el que más energia consume. Y también el más incomprendido.\n\n**Su conducta es comunicación. El mensaje puede ser:**\n• "Tengo miedo de fracasar y prefiero boicotear antes de intentar"\n• "Nadie me escucha, esto es lo único que me da poder"\n• "Estoy pasando algo difícil y no tengo palabras para decirlo"\n• "El trabajo no tiene sentido para mí"\n• "Fui humillado antes en este espacio y no confío"\n\n**Lo que NO funciona:** Confrontación pública, castigos repetidos, expulsiones del aula.\n\n**Lo que SÍ funciona:** Relación 1 a 1, encontrar SU área de competencia, darle rol de responsabilidad, conversación privada sobre lo que necesita.', extra: { tip: '"El estudiante más difícil es el que más necesita un adulto que no se rinda con él." Esta frase de Ross Greene resume la neurociencia de la conducta desafiante: viene de déficits en habilidades, no de mala voluntad.', activity: '¿Cuál es tu estudiante más desafiante? ¿Cuántas conversaciones privadas (no relacionadas con disciplina) has tenido con esa persona este mes?' } },
        { id: 'te-m3-c6', type: 'content', title: '😟 El estudiante ansioso', content: '**Señales de ansiedad escolar:**\n• Dolores de estómago o cabeza frecuentes que desaparecen los fines de semana\n• Pide ir al baño repetidamente en momentos de evaluación\n• Olvida lo que sabe cuando está frente a un examen\n• Evita situaciones de exposición: leer en voz alta, salir a la pizarra\n• Llega tarde regularmente o finge estar enfermo\n\n**La ansiedad escolar afecta entre el 5% y 20% de los estudiantes** (APA, 2019). En contextos de alta incertidumbre económica o familiar, puede ser mayor.\n\n**La intervención no es psicológica necesariamente.** A veces basta con: avisar con anticipación cuándo les tocará exponer, permitir respuestas escritas como alternativa, y reducir el factor sorpresa.', extra: { tip: 'Los exámenes sorpresa aumentan la ansiedad sin mejorar la comprensión. Si el objetivo es medir aprendizaje (no atrapar al estudiante sin preparar), avisa siempre con anticipación qué se evaluará.', activity: '¿Cuántos de tus estudiantes reconocerías como ansiosos? ¿Qué ajuste pequeño podrías hacer esta semana para reducir su ansiedad?' } },
        { id: 'te-m3-c7', type: 'content', title: '🐚 El estudiante retraído', content: 'Distinto al tímido (que quiere conectar pero le cuesta), el estudiante **retraído** puede haber tomado la decisión activa de no conectar con el entorno escolar.\n\n**Señales de alarma mayores:**\n• Cambia bruscamente de ser sociable a aislarse\n• No conecta con ningún par en el aula\n• Respuestas monosilábicas constantes\n• Pérdida de interés en actividades que antes disfrutaba\n• Se sienta siempre solo, incluso en trabajo grupal\n\n**Posibles causas:**\n• Bullying (incluyendo bullying digital)\n• Situación de violencia en casa\n• Depresión\n• Duelo (pérdida de familiar o amigo)\n• Acoso sexual\n\n**Acción mínima:** Una conversación privada y genuina. "Te he notado más callado últimamente. ¿Estás bien?"', extra: { tip: 'Preguntar "¿estás bien?" directamente es mejor que rodear el tema. Los jóvenes frecuentemente ESPERAN que alguien pregunte directamente. La pregunta en sí es ya una intervención.', activity: '¿Hay algún estudiante en tu aula que en los últimos 2-3 semanas se ha "desaparecido socialmente"? ¿Has preguntado directamente?' } },
        { id: 'te-m3-c8', type: 'quiz', title: '✅ Identificando la motivación', question: 'Rodrigo estudia muy duro cada noche porque quiere ser médico y "eso requiere buenas notas". Su motivación es principalmente:', options: ['Intrínseca pura', 'Extrínseca pura', 'Una combinación: intrínseca (ser médico) e instrumental (las notas como medio)', 'Ninguna de las anteriores'], correct: 2, explanation: 'La motivación de Rodrigo es instrumental: las notas son un medio para un fin que genuinamente le importa. Esta es una forma saludable de motivación extrínseca — orientada a metas propias, no a evitar castigos o buscar aprobación externa.' },
        { id: 'te-m3-c9', type: 'content', title: '💔 El estudiante que "odia la escuela"', content: '"Odio la escuela" es una de las frases más informativas que un docente puede escuchar — si decide escucharla.\n\n**¿Qué está diciendo realmente?**\n• "Me siento incompetente en este espacio"\n• "Nadie aquí me conoce ni le importo"\n• "Lo que aprendo no tiene ninguna conexión con mi vida"\n• "Fui humillado aquí y no lo olvidé"\n• "Tengo miedo y prefiero el rechazo al fracaso"\n\n**El error:** Responder con argumento racional ("la escuela es importante para tu futuro"). El problema no es cognitivo — es relacional y emocional.\n\n**La respuesta:** "¿Qué parte es la que más odias? Cuéntame." Escuchar sin defender al sistema. Esa conversación es el primer paso real.', extra: { tip: 'Un estudiante que dice "odio la escuela" frente al docente está tomando un riesgo. Podría estar callado. Si elige decirlo, está (inconscientemente) invitando a una respuesta humana.', activity: '¿Cuándo fue la última vez que un estudiante te dijo algo similar? ¿Cómo respondiste? ¿Cómo responderías ahora?' } },
        { id: 'te-m3-c10', type: 'content', title: '🚨 Señales de trauma en el aula', content: 'El trauma — por violencia, pérdida, abuso o experiencias de vida extremas — afecta directamente la capacidad de aprender. El cerebro en estado de alerta no puede acceder a las funciones cognitivas superiores.\n\n**Señales en el aula:**\n• Hiper-vigilancia (saltan ante ruidos, miran constantemente hacia la puerta)\n• Dificultad para concentrarse aunque quieran\n• Reacciones desproporcionadas ante situaciones pequeñas\n• Flashbacks o "ausencias" durante la clase\n• Comportamiento regresivo (actúan más jóvenes que su edad)\n\n**El docente no es terapeuta.** Pero puede:\n• Crear ambientes predecibles y seguros\n• No reaccionar con castigo ante conductas derivadas del trauma\n• Hacer derivación a orientador o psicólogo cuando existe\n• Mantener la relación aun cuando el estudiante se comporta difícil', extra: { tip: 'La educación informada por el trauma (Trauma-Informed Education) no requiere que el docente conozca el detalle del trauma. Requiere que sepa que PUEDE EXISTIR y adapte su respuesta en consecuencia.', activity: '¿Tu escuela tiene un protocolo para manejar indicios de violencia o trauma en estudiantes? ¿Sabes cómo derivar?' } },
        { id: 'te-m3-c11', type: 'simulation', title: '🎭 Carlos lleva tres semanas sin entregar tareas', scenario: '**Carlos**, 10 años, solía ser un estudiante regular. En las últimas tres semanas no ha entregado ninguna tarea. En clase parece cansado, a veces se duerme, y cuando le preguntas dice "no sé" o "me olvidé". Hoy su cuaderno está vacío.\n\nUna colega dice: "Carlos siempre fue flojo. Hay que llamar a los padres ya para que lo pongan a trabajar."', statement: 'Lo correcto es llamar a los padres inmediatamente y comunicarles que Carlos está incumpliendo con sus responsabilidades escolares.', correctSwipe: 'left', rightOutcome: 'Llamar a los padres sin investigar primero puede empeorar la situación: si Carlos tiene problemas en casa, alertar a sus padres sin conocer el contexto puede aumentar su riesgo. Además, el reporte negativo puede fortalecer la etiqueta de "flojo" sin abordar la causa real del cambio de conducta.', leftOutcome: '✅ Antes de llamar a los padres, el paso correcto es una conversación privada con Carlos. Preguntas clave: "¿Has comido hoy?", "¿Estás durmiendo bien?", "¿Algo está pasando en casa?". El cambio brusco de comportamiento en tres semanas raramente es flojera — es señal de algo. Investiga antes de reportar.', extra: { tip: 'El cambio brusco de comportamiento en un periodo de 2-4 semanas es una bandera roja pedagógica. La "flojera" es rara — los cambios tienen causas. Las más frecuentes en contextos guatemaltecos: trabajo infantil aumentado, problema familiar, inicio de bullying, o problema de salud.', activity: '¿Has tenido un estudiante con cambio brusco de comportamiento? ¿Qué encontraste cuando indagaste?' } },
        { id: 'te-m3-c12', type: 'content', title: '📋 Síntesis: Los cinco perfiles emocionales', content: 'Antes de pasar a los casos de estudio, sistematicemos los cinco perfiles emocionales principales:\n\n**1. Comprometido motivado:** Alto desempeño, motivación intrínseca. Necesita: desafío y autonomía.\n\n**2. Perfeccionista ansioso:** Alto desempeño, miedo al error. Necesita: cultura de error positivo.\n\n**3. Conformista desconectado:** Desempeño mínimo, motivación extrínseca débil. Necesita: conexión con propósito.\n\n**4. Desafiante comunicativo:** Conducta difícil como lenguaje. Necesita: relación 1a1 y rol de responsabilidad.\n\n**5. Retraído en riesgo:** Aislamiento progresivo. Necesita: intervención activa y derivación si persiste.\n\nEn el siguiente módulo, verás estos perfiles en acción con casos reales del aula guatemalteca.', extra: { tip: 'Un estudiante puede moverse entre perfiles según el tema, el docente o el momento del año. Los perfiles son un mapa orientativo, no una etiqueta permanente.', activity: '¿Cuántos estudiantes de cada perfil tienes en tu aula ahora mismo? Haz la cuenta mentalmente.' } }
      ]
    },
    // MÓDULO 4: Casos de Estudio: Escenas del Aula Real (12 tarjetas)
    {
      id: 4,
      title: '🎬 Casos de Estudio: Escenas del Aula Real',
      cards: [
        { id: 'te-m4-c1', type: 'content', title: '📖 Cómo leer un caso de estudio', content: 'Un caso de estudio pedagógico es una descripción de una situación real (o basada en situaciones reales) que te invita a analizar, decidir y reflexionar sobre tu práctica.\n\n**Cómo aprovechar los casos:**\n• Primero, lee sin juzgar al estudiante ni al docente\n• Identifica qué información tienes y qué falta\n• Considera múltiples interpretaciones antes de concluir\n• Piensa qué harías TÚ en esa situación\n• Reflexiona sobre qué perfiles emocionales, estilos de aprendizaje o inteligencias reconoces\n\n**Los casos que siguen están basados en situaciones reales** del aula guatemalteca, con nombres y detalles modificados. La realidad de cada aula es más compleja que cualquier caso — úsalos como punto de partida, no como recetas.', extra: { tip: 'Los mejores casos pedagógicos son los que no tienen una respuesta perfecta. Si ves una respuesta obvia, probablemente estás leyendo el caso superficialmente.', activity: 'Mientras lees cada caso, pregúntate: ¿he tenido un estudiante así? ¿Qué hice? ¿Lo haría diferente hoy?' } },
        { id: 'te-m4-c2', type: 'content', title: '📚 Caso: Lucía, 9 años, zona rural', content: '**Lucía** estudia en una escuela primaria en un municipio del Altiplano guatemalteco. Su idioma materno es Kaqchikel; habla español con acento y a veces mezcla estructuras gramaticales de ambas lenguas.\n\nEn clase de Lenguaje, Lucía no participa voluntariamente. Cuando la docente le pregunta directamente, responde correctamente pero en voz muy baja y con una sola frase. En trabajos escritos, su caligrafía es cuidadosa pero sus textos son muy cortos comparados con los de sus compañeros.\n\nSu expediente dice: "Estudiante tímida, participación baja, comprensión lectora por debajo del nivel."\n\n**Datos adicionales:** La madre de Lucía informa que en casa, Lucía cuenta historias largas y elaboradas en Kaqchikel, ayuda a sus hermanos menores con sus tareas y organiza juegos complejos con los niños de la comunidad.', extra: { tip: 'El expediente de Lucía evalúa su desempeño en español, no su capacidad cognitiva real. La discrepancia entre el rendimiento escolar y el desempeño en casa es una señal de que el instrumento de medición, no el estudiante, tiene el problema.', activity: '¿Qué cambiarías en cómo evalúas a Lucía si pudieras hacerlo en su idioma materno o con modalidades distintas?' } },
        { id: 'te-m4-c3', type: 'simulation', title: '🎭 Lucía no habla en clase', scenario: 'Es la tercera semana de clases con Lucía. Sigues sin escuchar su voz en discusiones grupales. Los demás niños ya participan activamente. Lucía hace sus tareas, nunca molesta, pero parece no estar presente emocionalmente.\n\nTu coordinadora te sugiere: "Llámala todos los días a responder preguntas frente al grupo. Si la presionas un poco, pierde el miedo."', statement: 'Llamar a Lucía a responder frente al grupo diariamente es la estrategia correcta para que pierda la timidez.', correctSwipe: 'left', rightOutcome: 'La exposición forzada puede funcionar con timidez leve en ambientes de alta seguridad. Pero para Lucía — cuyo desafío puede ser lingüístico-cultural además de emocional — la exposición pública forzada en un idioma que no es el suyo puede consolidar la ansiedad, no reducirla. El aula puede convertirse en un espacio de vergüenza, no de aprendizaje.', leftOutcome: '✅ Correcto. Las estrategias efectivas para Lucía incluyen: participación en parejas o pequeños grupos antes que frente al grupo grande, preguntas que se le comparten con anticipación para que pueda preparar su respuesta, permitir respuestas escritas como alternativa a orales, y buscar temas conectados con su cultura donde ella tiene autoridad de conocimiento. El objetivo es crear experiencias de éxito pequeñas que construyan confianza gradualmente.', extra: { tip: 'La investigación sobre adquisición de lengua adicional muestra que el "período silencioso" (silent period) es normal y necesario. Forzar producción oral prematura puede interferir con la adquisición. Lucía puede estar en ese período respecto al español académico.', activity: '¿Cómo diferencias en tu clase entre el silencio por desenganche y el silencio por procesamiento o barrera lingüística?' } },
        { id: 'te-m4-c4', type: 'content', title: '📚 Caso: Marcos, 11 años, muy disruptivo', content: '**Marcos** lleva tres años siendo "el problema del aula". Los expedientes de primero, segundo y tercero primaria dicen: "conducta disruptiva", "no respeta la autoridad", "distrae a los compañeros".\n\nEn tu clase de Ciencias, Marcos interrumpe con preguntas inesperadas, a veces fuera del tema, a veces brillantemente conectadas. Un día preguntó cómo funciona un motor de cohete después de ver una foto del sistema solar. Cuando le diste 5 minutos para explicarle, estuvo completamente quieto y absorbido.\n\nSus notas son irregulares: 90 en algunos temas, 40 en otros. Las notas bajas coinciden con temas de memorización. Las altas coinciden con temas que involucran razonamiento o experimentos.\n\n**En el recreo:** Marcos organiza juegos elaborados con reglas complejas que todos siguen voluntariamente.', extra: { tip: 'El perfil de Marcos es clásico de inteligencia lógico-matemática alta con baja tolerancia a la instrucción pasiva. Su conducta "disruptiva" en clase magistral se convierte en liderazgo en el recreo — mismo niño, distinto diseño.', activity: '¿Cuántos "Marcos" has tenido? ¿Los recordaste como "problemas" o como estudiantes mal ubicados en un sistema que no los aprovecha?' } },
        { id: 'te-m4-c5', type: 'simulation', title: '🎭 Marcos interrumpe constantemente', scenario: '**Marcos** interrumpió 4 veces en la última clase con preguntas sobre temas distintos al que estabas enseñando. La clase perdió el hilo varias veces. Otros estudiantes se quejan de que Marcos los distrae.\n\nUn colega sugiere: "Deberías hacer un contrato conductual con Marcos: si interrumpe más de 2 veces, sale del aula. Necesita consecuencias claras."', statement: 'El contrato conductual con consecuencia de salida del aula es la estrategia más efectiva para manejar las interrupciones de Marcos.', correctSwipe: 'left', rightOutcome: 'Los contratos conductuales con castigo (salida del aula) pueden reducir la conducta visible pero no la causa subyacente. Marcos interrumpe porque su ritmo de procesamiento es más rápido que el ritmo de la clase. Sacarlo del aula le priva del aprendizaje que le falta y confirma la narrativa de que él es "el problema". A largo plazo, aumenta el riesgo de desenganche escolar.', leftOutcome: '✅ Correcto. Las estrategias más efectivas con Marcos: darle un rol de "experto" en temas de su interés (presenta 3 minutos al inicio de clase), establecer una señal pactada privadamente para cuando quiera preguntar algo fuera del tema, usar sus preguntas como conectores ("qué buena pregunta Marcos, eso lo veremos en el módulo 3 — anótala aquí"), y ofrecer extensiones intelectuales cuando termine antes. El objetivo es canalizar, no suprimir.', extra: { tip: 'Un estudiante con alta necesidad de estimulación intelectual en una clase de ritmo promedio experimenta algo similar al adulto que asiste a una conferencia que ya conoce: no puede apagar su cerebro, y la energía restante busca salida.', activity: '¿Tienes un espacio en tu clase para las preguntas "fuera del tema"? ¿Podría crearlo? ¿Cómo funcionaría?' } },
        { id: 'te-m4-c6', type: 'content', title: '📚 Caso: Andrea, 13 años, sobre-exigida', content: '**Andrea** es la mejor estudiante de segundo básico. Primera de la clase desde primaria. Su familia habla con orgullo de ella: "Va a ser la primera universitaria de la familia."\n\nEste año, Andrea pasó de una escuela pequeña del interior a un colegio más grande en la capital. Sus notas bajaron de 95 promedio a 82 — todavía excelentes, pero por debajo de su expectativa.\n\nAndrea llora regularmente después de los exámenes, dice que "no sirve para nada", y ha dejado de levantar la mano en clase "para no equivocarse". Perdió 4 kilos en dos meses. Su mamá dice que come poco y a veces no duerme antes de los exámenes.\n\nHace dos semanas entregó una tarea incompleta por primera vez en su vida. Dijo que "se le olvidó", pero tú notaste que evitó tu mirada durante una semana.', extra: { tip: 'El cuadro de Andrea incluye señales físicas (pérdida de peso, insomnio), cognitivas (evitación de participación) y conductuales (tarea incompleta, evitar contacto visual). Tomadas juntas, son señales de que el peso de la expectativa está afectando su salud, no solo su rendimiento.', activity: '¿Qué harías si fueras el docente de Andrea? ¿A quién involucrarías? ¿Cuál sería tu primera conversación con ella?' } },
        { id: 'te-m4-c7', type: 'simulation', title: '🎭 Andrea llora cuando comete errores', scenario: 'Devuelves un examen. Andrea saca 78/100 — su nota más baja del año. Mientras los demás revisan sus exámenes, ves que Andrea tiene los ojos llorosos. Se levanta y pide permiso para ir al baño. Lleva 15 minutos sin volver.\n\nAl salir a buscarla, la encuentras en el corredor. Cuando le preguntas qué pasa, dice: "Es que soy una fracasada."', statement: 'Lo correcto es decirle a Andrea que 78 es una excelente nota y que está siendo muy dura consigo misma — con eso ella se calmará.', correctSwipe: 'left', rightOutcome: 'Argumentar con la percepción de Andrea en ese momento ("78 es excelente") invalida lo que ella está sintiendo y raramente funciona. Ella ya SABE intelectualmente que 78 es buena nota — el problema no es cognitivo. El problema es la carga emocional que la nota activa. Minimizar el sentimiento puede hacer que Andrea sienta que no debe sentirlo, añadiendo vergüenza a la tristeza.', leftOutcome: '✅ Correcto. El primer paso es validar, no corregir: "Veo que estás muy afectada. ¿Me puedes contar qué pasó en tu cabeza cuando viste la nota?" Escuchar sin resolver. Luego, en privado y con calma, puedes explorar juntas de dónde viene esa presión. Si el patrón persiste, este es el momento de involucrar a orientación escolar y — con cuidado — a la familia.', extra: { tip: 'El perfeccionismo extremo conectado con identidad familiar ("primera universitaria") puede derivar en ansiedad de desempeño clínica. El docente puede crear espacio seguro, pero el tratamiento de fondo puede requerir apoyo psicológico profesional.', activity: '¿Tienes un protocolo en tu escuela para identificar y derivar casos de ansiedad de desempeño? ¿A quién acudirías?' } },
        { id: 'te-m4-c8', type: 'content', title: '📚 Caso: Pedro, 10 años, alta capacidad', content: '**Pedro** termina cualquier tarea en la mitad del tiempo que sus compañeros. Cuando el grupo trabaja en ejercicios de su cuaderno, Pedro mira por la ventana. Ha preguntado varias veces "¿puedo hacer algo diferente cuando termino?" y el docente anterior le decía que repasara.\n\nEste año, Pedro empezó a hacer dibujos muy elaborados en los márgenes del cuaderno — arquitecturas imaginarias, máquinas complejas. Una vez, en clase de ciencias, propuso espontáneamente un experimento alternativo al del libro que la docente reconoció que "era más interesante que el de la guía".\n\nSus padres reportan que en casa lee libros para adultos sobre física e historia, y que últimamente dice que la escuela "es una pérdida de tiempo".', extra: { tip: 'El estudiante con alta capacidad no atendido es el más sub-servido por el sistema: no reprueba, no molesta (necesariamente), y sin embargo su potencial se desperdicia sistemáticamente. El aburrimiento crónico puede convertirse en desenganche y, eventualmente, en conducta disruptiva.', activity: '¿Tienes un "Pedro" en tu aula? ¿Qué le ofreces cuando termina antes? ¿Es suficientemente desafiante para él?' } },
        { id: 'te-m4-c9', type: 'simulation', title: '🎭 Pedro termina todo rápido y se aburre', scenario: '**Pedro** terminó la prueba de matemáticas en 8 minutos (de 40 asignados). Se acerca a tu escritorio y susurra: "Ya terminé. ¿Qué hago?"\n\nEl resto del grupo sigue trabajando. Tienes que decidir rápido.', statement: 'Lo correcto es decirle a Pedro que revise su prueba varias veces para aprovechar el tiempo restante.', correctSwipe: 'left', rightOutcome: '"Revisa" es la respuesta más fácil para el docente y la menos útil para Pedro. Si Pedro terminó en 8 minutos, revisará en 2 y volverá a pedirte algo que hacer. La revisión repetida de trabajo que ya considera correcto no es un desafío — es tiempo muerto con apariencia de productividad.', leftOutcome: '✅ Correcto. Opciones mejores que "revisa": tener preparado un desafío de extensión relacionado con el tema (un problema más complejo, una pregunta abierta), permitirle iniciar el próximo tema de forma autónoma, darle un proyecto personal de investigación acumulativo, o pedirle que diseñe una pregunta adicional para el examen. La clave es que la actividad sea genuinamente desafiante, no relleno de tiempo.', extra: { tip: 'El enriquecimiento (enrichment) no requiere tener un programa formal. Un cuaderno de "desafíos" con preguntas abiertas por tema, preparado una vez al inicio del año, puede servir como banco de actividades para Pedro durante todo el ciclo.', activity: '¿Tienes preparado algo para los estudiantes que terminan antes? Si no, ¿qué podrías preparar para la próxima semana?' } },
        { id: 'te-m4-c10', type: 'content', title: '📚 Caso: Ixchel, 8 años, bilingüe', content: '**Ixchel** habla Q\'eqchi\' como lengua materna. Aprendió español en la escuela. Cuando habla en Q\'eqchi\' con sus compañeros que comparten el idioma, usa oraciones complejas, hace chistes sofisticados y explica conceptos con claridad.\n\nEn clase, cuando la docente pregunta en español, Ixchel a veces responde correctamente pero en estructuras gramaticales que suenan "raras" en español. La docente la corrige públicamente con frecuencia.\n\nEn el examen escrito, Ixchel sacó 55/100 en comprensión lectora. Pero cuando la docente le leyó las mismas preguntas en voz alta y le permitió responder oralmente, Ixchel respondió correctamente 9 de 10 preguntas.\n\nEl expediente dice: "Dificultades en lenguaje. Comprensión lectora deficiente."', extra: { tip: 'El caso de Ixchel ilustra la diferencia entre BICS (Basic Interpersonal Communication Skills — fluencia conversacional, tarda 1-2 años) y CALP (Cognitive Academic Language Proficiency — lenguaje académico, tarda 5-7 años en una segunda lengua). Ixchel tiene BICS pero está desarrollando CALP. Eso no es deficiencia — es proceso normal de bilingüismo.', activity: '¿Cuántos de tus estudiantes están en proceso de adquisición del español académico? ¿Cómo adaptas tu evaluación para no medir el idioma cuando quieres medir el contenido?' } },
        { id: 'te-m4-c11', type: 'simulation', title: '🎭 Ixchel entiende pero no puede expresarlo en español', scenario: '**Ixchel** levanta la mano en clase de Ciencias para responder. Comienza a hablar pero mezcla estructuras del Q\'eqchi\' con el español y su respuesta resulta difícil de seguir. Algunos compañeros se ríen.\n\nLa docente anterior solía decirle: "Habla bien, en español correcto, porque aquí estamos en clase de español."', statement: 'Es correcto pedirle a Ixchel que reformule su respuesta en "español correcto" antes de continuar, para que aprenda la norma lingüística.', correctSwipe: 'left', rightOutcome: 'Corregir el código lingüístico de Ixchel en el momento en que levantó la mano y tomó el riesgo de participar envía un mensaje claro: "Tu forma de hablar no es aceptable aquí." Esto desincentiva la participación futura y asocia el aula con vergüenza lingüística. La corrección de la forma en el momento de la participación oral prioriza la gramática sobre el aprendizaje.', leftOutcome: '✅ Correcto. La respuesta más efectiva: primero, reconocer el contenido de la respuesta de Ixchel ("Muy bien, lo que Ixchel está diciendo es..."). Luego, en privado o en otro momento, trabajar la forma del español académico. Además, la risa de los compañeros requiere intervención inmediata: "En esta clase respetamos todas las formas de expresarse. Ixchel, ¿puedes continuar?"', extra: { tip: 'La corrección de errores lingüísticos en segunda lengua es más efectiva de forma implícita (el docente repite la idea con la estructura correcta) que explícita (señalar el error públicamente). La corrección explícita pública activa vergüenza, que cierra el canal de aprendizaje.', activity: '¿Cómo respondes actualmente cuando un estudiante se expresa con estructuras de su lengua materna en una clase en español? ¿Cambiarías algo?' } },
        { id: 'te-m4-c12', type: 'content', title: '🗺️ Síntesis: El mapa de decisiones del docente', content: 'Después de 5 casos, emerge un patrón de decisiones que el docente efectivo toma consistentemente:\n\n**Antes de actuar:**\n• ¿Tengo suficiente información o estoy asumiendo?\n• ¿Qué dice el contexto (familia, idioma, historia escolar)?\n• ¿La conducta es el problema o es la señal del problema real?\n\n**Al diseñar la respuesta:**\n• ¿Esta acción fortalece o debilita la relación con el estudiante?\n• ¿Estoy respondiendo a la causa o al síntoma?\n• ¿Hay algo que pueda adaptar en mi diseño para que este estudiante tenga más oportunidades de éxito?\n\n**Al evaluar el resultado:**\n• ¿Mejoró algo? ¿Cómo lo sé?\n• ¿Necesito involucrar a alguien más (familia, orientador, colega)?\n• ¿Qué aprendí de este caso para el próximo?\n\nNo existe la decisión perfecta. Existe la decisión más informada posible, tomada con intención.', extra: { tip: 'Documentar brevemente tus decisiones y resultados convierte tu práctica en investigación acción. No necesitas publicarlo — basta con que te ayude a mejorar.', activity: '¿Cuál de los 5 casos de este módulo se pareció más a tu realidad actual? ¿Qué decisión tomarías mañana?' } }
      ]
    },
    // MÓDULO 5: Estrategias para Cada Estudiante (12 tarjetas)
    {
      id: 5,
      title: '🎯 Estrategias para Cada Estudiante',
      cards: [
        { id: 'te-m5-c1', type: 'content', title: '🌈 Diferenciación: enseñar a la persona, no al grupo', content: 'La enseñanza diferenciada es el arte de ajustar el qué, el cómo y el cuándo del aprendizaje para responder a las diferencias reales entre los estudiantes.\n\n**¿Qué se puede diferenciar?**\n\n**Contenido:** ¿Todos necesitan aprender exactamente lo mismo al mismo nivel de profundidad?\n\n**Proceso:** ¿Todos necesitan llegar al aprendizaje por el mismo camino?\n\n**Producto:** ¿Todos necesitan demostrar lo aprendido de la misma manera?\n\n**Ambiente:** ¿Todos necesitan las mismas condiciones físicas y sociales para aprender?\n\n**Importante:** Diferenciación NO es dar trabajo fácil a los "débiles". Es dar el acceso correcto al mismo aprendizaje de calidad.', extra: { tip: 'Diferenciación no significa preparar 30 planes distintos. Significa tener 3-4 rutas hacia el mismo destino. Los estudiantes eligen su ruta (o el docente asigna con criterio). El destino de aprendizaje es el mismo.', activity: '¿En cuál de las cuatro dimensiones (contenido, proceso, producto, ambiente) es más fácil para ti comenzar a diferenciar?' } },
        { id: 'te-m5-c2', type: 'content', title: '♿ DUA: Diseño Universal para el Aprendizaje', content: 'El Diseño Universal para el Aprendizaje (DUA/UDL) propone diseñar las experiencias de aprendizaje desde el inicio para que sean accesibles para la mayor diversidad posible de estudiantes — en lugar de hacer adaptaciones después.\n\n**Sus tres principios fundamentales:**\n\n**1. Múltiples formas de representación** (el QUÉ del aprendizaje): ofrecer la información de maneras diversas.\n\n**2. Múltiples formas de acción y expresión** (el CÓMO): permitir distintas formas de demostrar aprendizaje.\n\n**3. Múltiples formas de compromiso** (el POR QUÉ): conectar el aprendizaje con motivaciones e intereses diversos.\n\n**La metáfora del DUA:** Un edificio con rampa no es solo para sillas de ruedas — también lo usan personas con carriolas, bicicletas y maletas. El diseño universal ayuda a todos.', extra: { tip: 'DUA no es solo para estudiantes con discapacidad. Es para Lucía (barrera lingüística), para Diego (barrera de modalidad), para Pedro (barrera de ritmo), para Marcos (barrera de motivación por la instrucción pasiva). Es decir: para casi todos.', activity: '¿Cuántas formas distintas de recibir información ofreces en una clase típica? ¿Cuántas formas de demostrar aprendizaje?' } },
        { id: 'te-m5-c3', type: 'content', title: '📺 Múltiples formas de representación', content: 'Ofrecer la información de distintas maneras asegura que más estudiantes puedan acceder a ella independientemente de su canal de aprendizaje dominante.\n\n**Estrategias prácticas:**\n• Acompaña el texto escrito con una imagen o diagrama\n• Lee en voz alta lo que escribes en la pizarra\n• Usa objetos reales o modelos cuando sea posible\n• Muestra un ejemplo antes de explicar la teoría\n• Para estudiantes con barrera lingüística, usa lengua materna como puente cuando es posible\n\n**El mínimo viable:**\nEn cada clase, ofrece el concepto principal en al menos DOS formatos distintos (visual + auditivo, o texto + ejemplo). Esto solo puede duplicar el acceso para tus estudiantes más diversos.', extra: { tip: 'Las plataformas digitales no son necesarias para múltiples representaciones. Una pizarra bien usada, objetos del entorno y trabajo oral son formas efectivas y gratuitas de diversificar la representación.', activity: 'En tu próxima clase, identifica el concepto principal y piensa: ¿cómo lo presentarías en formato visual, en formato auditivo/oral Y en formato kinestésico/manipulativo?' } },
        { id: 'te-m5-c4', type: 'content', title: '✍️ Múltiples formas de demostrar aprendizaje', content: 'El examen escrito de opción múltiple mide solo una fracción de lo que un estudiante puede saber. Ampliar las formas de demostración no es "bajar el nivel" — es abrir el canal correcto.\n\n**Formas alternativas de demostrar aprendizaje:**\n\n• **Oral:** Explicar, debatir, presentar, narrar\n• **Visual:** Dibujar, mapear, infografiar, crear línea del tiempo\n• **Kinestésico:** Construir, demostrar, actuar, simular\n• **Escrito alternativo:** Lista, poema, carta, comic\n• **Grupal:** Enseñar a otro, liderar un proyecto\n\n**Para cada unidad, ofrece al menos DOS opciones de demostración.** Los estudiantes eligen según su fortaleza, pero aprenden el mismo contenido.', extra: { tip: 'Cuando un estudiante elige cómo demostrar su aprendizaje, aumenta su motivación intrínseca (autonomía) y su probabilidad de demostrar su máximo nivel de comprensión (en lugar de su máximo nivel de escritura en español).', activity: '¿Cuándo fue la última vez que un estudiante eligió CÓMO entregar una tarea? ¿Cómo salió?' } },
        { id: 'te-m5-c5', type: 'quiz', title: '🎯 ¿Qué estrategia aplico?', question: 'Tienes una estudiante con barrera lingüística en español pero alto dominio oral en su lengua materna. ¿Qué combinación de estrategias del DUA aplicas?', options: ['Solo evaluación escrita estándar para que mejore su español', 'Representación en su lengua materna como puente + evaluación oral como alternativa al escrito', 'Ignorar la diferencia y tratar a todos igual', 'Solo actividades en su lengua materna, sin exposición al español'], correct: 1, explanation: 'El DUA propone usar la lengua materna como puente de comprensión (representación) y permitir evaluación oral como alternativa válida (expresión). Esto asegura que medimos el aprendizaje del contenido, no la barrera del idioma.' },
        { id: 'te-m5-c6', type: 'content', title: '💛 La relación docente-estudiante: el factor más poderoso', content: 'Todas las estrategias del mundo son menos efectivas sin una relación genuina.\n\nHattie (2009) identifica la **calidez del docente** y la **relación positiva docente-estudiante** entre los efectos más grandes sobre el aprendizaje.\n\n**¿Qué hace que una relación sea genuina?**\n• El docente conoce el nombre del estudiante y lo usa\n• El docente muestra interés real por la vida del estudiante (no solo sus notas)\n• El docente es consistente (no amable hoy y frío mañana)\n• El docente comete errores y los reconoce\n• El docente defiende al estudiante incluso cuando es difícil\n\n**No puedes tener 30 relaciones profundas simultáneas.** Pero puedes tener 30 relaciones donde cada persona siente que importa.', extra: { tip: 'La diferencia entre sentir que importas y no sentirlo puede ser tan pequeña como que el docente salude por tu nombre al entrar al aula. Los pequeños gestos consistentes construyen pertenencia.', activity: '¿Cuántos de tus estudiantes saludarías por nombre si los vieras en el mercado este fin de semana? ¿Qué dice eso sobre la relación?' } },
        { id: 'te-m5-c7', type: 'content', title: '✨ Diez microacciones que cambian todo', content: 'No necesitas transformar tu práctica de golpe. Estas microacciones tienen impacto desproporcionado:\n\n**1.** Saluda a cada estudiante por nombre al entrar al aula\n**2.** Aprende una palabra en la lengua materna de tus estudiantes bilingües\n**3.** Cuando un estudiante responde mal, di "gracias por intentarlo" antes de corregir\n**4.** Llama a un padre/madre para decirle algo positivo de su hijo (no solo problemas)\n**5.** Pregunta una vez por semana "¿qué es algo que aprendiste HOY que no sabías ayer?"\n**6.** Comparte tu propio error o cosa que no sabes. Muéstrales que aprender es normal\n**7.** Deja que un estudiante diferente cada día comparta algo que sabe bien\n**8.** Cuando un estudiante invisible participa, reconócelo genuinamente\n**9.** Usa "todavía no" en lugar de "no puedes": "Todavía no lo has logrado"\n**10.** Termina cada semana con: "¿Qué fue lo mejor de esta semana en clase?"', extra: { tip: 'El "todavía no" (concepto de Growth Mindset de Carol Dweck) es una de las intervenciones lingüísticas más simples y poderosas. Transforma el fracaso en proceso.', activity: '¿Cuáles de estas 10 microacciones ya haces? ¿Cuál empezarías esta semana?' } },
        { id: 'te-m5-c8', type: 'simulation', title: '🎭 Eligiendo la estrategia correcta', scenario: '**Raúl**, 14 años, acaba de llegarte derivado de otro salón. El docente anterior dice que "es imposible de manejar". En tu primera clase, Raúl se sienta al fondo, no saca cuaderno, y responde con monosílabos a tus preguntas. Cuando le pides que participe, voltea para otro lado.\n\nHay dos docentes que observan tu clase hoy como parte de una evaluación institucional.', statement: 'Con los docentes evaluadores presentes, lo más apropiado es manejar a Raúl con firmeza y disciplina visible para mostrar que controlas tu aula.', correctSwipe: 'left', rightOutcome: 'El "control visible" ante evaluadores frecuentemente se convierte en confrontación pública con el estudiante más vulnerable del aula. Eso puede "verse bien" para un observador superficial pero destruye exactamente la relación que necesitarás con Raúl a lo largo del año. Además, Raúl probablemente ha experimentado este patrón muchas veces: el docente escala para "ganar", Raúl escala de regreso, y ambos pierden.', leftOutcome: '✅ Correcto. Con Raúl en el primer día, la prioridad es no crear un incidente que destruya la relación futura. Estrategias: ignorar la no-participación inicial sin confrontar, acercarte brevemente y en voz baja durante trabajo en grupo ("¿Qué opinas tú, Raúl?"), y después de clase hablar con él en privado para escuchar su perspectiva. Los evaluadores que saben lo que hacen valoran al docente que puede manejar la complejidad humana con calma.', extra: { tip: 'El primer día con un estudiante difícil es el más importante. No para "ganar" — para no "perder". La relación con Raúl tiene años por delante. No vale la pena arriesgarla por una confrontación frente a evaluadores.', activity: '¿Has tenido la presión de "controlar" tu aula ante evaluadores a costa de la relación con un estudiante? ¿Cómo lo manejaste?' } },
        { id: 'te-m5-c9', type: 'content', title: '🌱 Creando una comunidad de aprendizaje inclusiva', content: 'Una aula inclusiva no es solo responsabilidad del docente — es una cultura que el grupo construye.\n\n**Elementos de una cultura inclusiva:**\n\n**Normas co-construidas:** Las reglas del aula las define el grupo junto al docente. Cuando el grupo creó las normas, las defiende.\n\n**El error es bienvenido:** El docente modela fallar públicamente y nombra el aprendizaje que viene del error.\n\n**Las diferencias son activos:** "Tenemos distintas fortalezas. Por eso somos un mejor equipo que cualquiera de nosotros solo."\n\n**Cero tolerancia al ridículo:** La risa ante el error de otro se atiende de inmediato, sin excepciones.\n\n**Roles rotativos:** Cada estudiante lidera algo. El liderazgo no es solo del más extrovertido.', extra: { tip: 'La cultura inclusiva se construye en los primeros 15 días del año. Cada decisión que tomas en esa ventana define las normas implícitas del aula para todo el ciclo. Invierte en esa cultura al inicio — los dividendos duran todo el año.', activity: '¿Cuál es una norma de tu aula que el grupo construyó junto contigo? ¿Cuál fue impuesta sin consulta? ¿Cuál de las dos se cumple más naturalmente?' } },
        { id: 'te-m5-c10', type: 'content', title: '📓 Seguimiento individual: simple y sostenible', content: 'Conocer a tus estudiantes requiere un sistema de seguimiento que no te consuma horas extras.\n\n**El mínimo viable de seguimiento:**\n\n**Registro de observación:** 2-3 observaciones breves por semana, en una hoja con los nombres. No un ensayo — una frase.\n\n**Conversaciones de check-in:** 5 minutos semanales con 2-3 estudiantes en rotación. "¿Cómo estás? ¿Algo difícil esta semana?"\n\n**Revisión mensual:** Una vez al mes, revisa tu lista completa. ¿Con quién no has hablado en 2 semanas? Ese estudiante necesita atención.\n\n**Señales de alerta activa:** Define 3-4 comportamientos que, al observarlos, activan una conversación inmediata contigo o derivación.\n\nNo necesitas tecnología para esto. Necesitas intención y un cuaderno.', extra: { tip: 'La metodología de "Relationship Mapping" de Search Institute propone que cada estudiante tenga al menos 1 adulto en la escuela que lo conozca bien. Tú no tienes que ser ese adulto para los 30 — pero puedes asegurarte de que ALGUNO lo sea.', activity: '¿Cuántos de tus estudiantes actuales tienen al menos un adulto en la escuela que los conoce bien? ¿Qué harías para los que no?' } },
        { id: 'te-m5-c11', type: 'content', title: '🤝 Conectar con las familias en Guatemala', content: 'La familia es el contexto donde el estudiante existe antes, durante y después del aula. Sin esa alianza, el docente trabaja con información incompleta.\n\n**Desafíos en el contexto guatemalteco:**\n• Familias que trabajan en horarios incompatibles con reuniones escolares\n• Familias que temen ser juzgadas por el sistema educativo\n• Comunidades donde la escuela y la familia tienen historias de conflicto\n• Padres con baja escolaridad que sienten que "no saben suficiente"\n\n**Estrategias de conexión:**\n• Llama o visita cuando hay algo POSITIVO, no solo cuando hay problemas\n• Ofrece horarios alternativos para reuniones (temprano, tarde, o en la comunidad)\n• Usa el idioma de la familia si es posible\n• Reconoce explícitamente el conocimiento de la familia sobre su hijo\n• Involucra a las familias como colaboradores, no como receptores de quejas', extra: { tip: '"La familia siempre tiene información que el docente necesita. El docente siempre tiene información que la familia necesita. La reunión que funciona es la que intercambia ambas, no la que transmite solo en una dirección."', activity: '¿Cuándo fue la última vez que llamaste a un padre para decirle algo positivo de su hijo? ¿Cómo reaccionaron?' } },
        { id: 'te-m5-c12', type: 'content', title: '🏆 Proyecto final: Plan de enseñanza diferenciada', content: 'Has completado el curso. Ahora tienes las herramientas para conocer a quien enseñas y actuar en consecuencia.\n\n**Tu misión final:** Diseñar un plan de enseñanza diferenciada para una unidad real de tu práctica, aplicando lo aprendido en los 5 módulos.', extra: { tip: 'Un plan diferenciado no tiene que ser perfecto desde el inicio. Lo que importa es que esté fundamentado en el conocimiento real de tus estudiantes, no en supuestos.', activity: '¿Qué es lo más importante que llevas de este curso a tu aula la próxima semana?' },
          project: {
            title: 'Mi Plan de Enseñanza Diferenciada',
            duration: '2-3 horas de planificación inicial + implementación durante 2 semanas',
            difficulty: 'Nivel avanzado',
            materials: ['Planificación de una unidad que impartirás pronto', 'Fichas de perfil de 5-8 estudiantes (del Módulo 1)', 'Lista de estrategias del DUA (Módulos 5)', 'Cuaderno de observaciones'],
            steps: [
              'Selecciona una unidad próxima. Identifica el aprendizaje esencial: ¿qué debe saber/poder hacer cada estudiante al terminar?',
              'Revisa tus perfiles de estudiantes. Identifica 4-5 estudiantes con necesidades distintas (barrera lingüística, alta capacidad, perfeccionista ansioso, kinestésico sin outlet, etc.).',
              'Diseña al menos 2 formas de representar el contenido principal (visual + oral, o texto + manipulativo).',
              'Diseña al menos 2 formas de evaluación que los estudiantes puedan elegir para demostrar su aprendizaje.',
              'Identifica 3 momentos en la unidad donde harás check-in con los estudiantes más vulnerables.',
              'Implementa el plan. Lleva notas breves cada día: ¿qué funcionó? ¿qué no? ¿quién necesita ajuste?',
              'Al final de la unidad, reflexiona: ¿qué estudiante tuvo más éxito que en unidades anteriores? ¿Por qué?'
            ],
            disciplines: ['Perfil del estudiante', 'DUA', 'Diferenciación', 'Evaluación auténtica', 'Relación docente-estudiante'],
            think: ['¿Qué es lo que mis estudiantes más diversos necesitan que yo no les he dado hasta ahora?', '¿Cuál es la barrera que más limita a más estudiantes en mi aula actualmente?', '¿Qué supuesto sobre mis estudiantes necesito cuestionar después de este curso?'],
            make: ['Unidad planificada con 2+ formas de representación', '2+ opciones de evaluación para la misma competencia', 'Fichas de perfil actualizadas de 5 estudiantes', 'Calendario de check-ins individuales de la unidad'],
            improve: ['¿Cómo involucrarías a los estudiantes en el diseño de cómo quieren aprender?', '¿Cómo compartirías este enfoque con un colega para que lo implemente también?', '¿Qué soporte necesitarías de tu dirección para implementar esto de forma sostenible?']
          }
        }
      ]
    }
  ],
  finalExam: {
    title: 'Examen Final: Conoce a Quien Enseñas',
    passingScore: 70,
    questions: [
      { id: 1, text: '¿Cuál de los cuatro perfiles básicos del aula representa el mayor riesgo de abandono escolar sin ser detectado?', options: ['El estudiante comprometido', 'El estudiante desafiante', 'El estudiante invisible o conformista', 'El estudiante perfeccionista'], correct: 2, explanation: 'El estudiante invisible o conformista no activa las alertas del sistema porque no causa problemas y pasa sus materias. Puede estar sufriendo, perdido o en proceso de desenganche sin que nadie lo note.' },
      { id: 2, text: '¿Qué describe mejor el Efecto Pigmalión en el contexto educativo?', options: ['El fenómeno donde los estudiantes imitan la conducta de su docente favorito', 'Las expectativas del docente sobre sus estudiantes tienden a convertirse en profecías autocumplidas', 'La tendencia de los estudiantes brillantes a destacar sin importar el contexto', 'Un método de evaluación basado en observación continua'], correct: 1, explanation: 'El Efecto Pigmalión (Rosenthal y Jacobson, 1968) demostró que las expectativas del docente influyen directamente en el desempeño real de los estudiantes. Expectativas altas tienden a producir más logro; expectativas bajas, lo contrario.' },
      { id: 3, text: 'Diego habla con claridad y sofisticación pero entrega páginas en blanco en exámenes escritos. ¿Cuál es la interpretación más pedagógicamente responsable?', options: ['Diego es flojo y prefiere no esforzarse', 'Hay una discrepancia entre el canal de fortaleza (oral) y el canal de evaluación (escrito) que debe explorarse', 'Diego tiene una discapacidad severa que requiere diagnóstico antes de actuar', 'Es normal que algunos estudiantes solo funcionen oralmente'], correct: 1, explanation: 'La discrepancia entre desempeño oral y escrito sugiere que el canal de evaluación no corresponde al canal de fortaleza del estudiante. El docente puede actuar de inmediato usando evaluación oral mientras se investiga más.' },
      { id: 4, text: '¿Cuál es la diferencia principal entre el modelo VARK y las inteligencias múltiples de Gardner?', options: ['VARK es para adultos, Gardner es para niños', 'VARK describe canales de preferencia para procesar información; Gardner describe tipos de aptitudes y fortalezas cognitivas más amplias', 'No hay diferencia — son el mismo modelo con distintos nombres', 'Gardner incluye solo 4 categorías mientras VARK tiene 8'], correct: 1, explanation: 'VARK se enfoca en la modalidad sensorial preferida para recibir y procesar información. Gardner propone un espectro más amplio de capacidades cognitivas que incluyen inteligencias interpersonal, naturista, musical y otras que van más allá de los canales sensoriales.' },
      { id: 5, text: 'Una estudiante termina los ejercicios en la mitad del tiempo que sus compañeros y luego mira por la ventana. ¿Cuál es la respuesta más apropiada?', options: ['Pedirle que revise su trabajo varias veces para aprovechar el tiempo', 'Tener preparada una extensión genuinamente desafiante o un proyecto autónomo para cuando termine', 'Ignorarla ya que no está causando problemas', 'Decirle que espere pacientemente a sus compañeros'], correct: 1, explanation: 'Un estudiante de alta capacidad que termina antes necesita estímulo intelectual genuino, no relleno de tiempo. "Revisa" raramente es desafiante. Una extensión real o proyecto autónomo aprovecha su capacidad y previene el desenganche.' },
      { id: 6, text: 'Marcos tiene conducta disruptiva en clase magistral pero lidera juegos complejos en el recreo. ¿Qué revela esta discrepancia?', options: ['Marcos manipula el ambiente según le conviene', 'El diseño de la clase magistral no aprovecha las inteligencias y el estilo de aprendizaje de Marcos', 'Marcos necesita medicación para el déficit de atención', 'El recreo es siempre más fácil que la clase'], correct: 1, explanation: 'El mismo estudiante puede ser "disruptivo" en un formato y "líder" en otro. Esto revela que la conducta está vinculada al diseño del ambiente, no a un defecto del estudiante. El docente puede canalizar las fortalezas de Marcos en el aula.' },
      { id: 7, text: '¿Qué es el Diseño Universal para el Aprendizaje (DUA)?', options: ['Un método para diseñar aulas físicas accesibles para sillas de ruedas', 'Un enfoque que diseña experiencias de aprendizaje accesibles para la mayor diversidad posible de estudiantes desde el inicio', 'Un programa de computadora para crear materiales educativos', 'La adaptación de la planificación solo para estudiantes con discapacidad certificada'], correct: 1, explanation: 'El DUA propone diseñar para la diversidad desde el principio, no hacer adaptaciones después. Sus tres principios son: múltiples formas de representación, de acción/expresión, y de compromiso.' },
      { id: 8, text: 'Ixchel responde correctamente cuando se le pregunta oralmente pero saca 55/100 en examen escrito. ¿Qué mide realmente ese 55?', options: ['Su comprensión del contenido evaluado', 'Una combinación de comprensión del contenido y dominio del español académico escrito', 'Su falta de esfuerzo en el examen', 'Su nivel de inteligencia general'], correct: 1, explanation: 'Cuando un estudiante bilingüe es evaluado solo en su segunda lengua y de forma escrita, la nota mezcla dos variables: comprensión del contenido Y dominio del español académico. Para medir solo el contenido, se necesitan modalidades alternativas.' },
      { id: 9, text: '¿Cuál es la intervención correcta ante el cambio brusco de comportamiento de un estudiante en un periodo de 2-4 semanas?', options: ['Reportar inmediatamente a los padres que el estudiante está fallando', 'Investigar la causa antes de actuar: conversación privada, preguntas abiertas, escucha activa', 'Ignorarlo — los estudiantes tienen altibajos normales', 'Aplicar sanciones para que retome la conducta anterior'], correct: 1, explanation: 'El cambio brusco de comportamiento es una señal de que algo ocurrió en la vida del estudiante. Antes de reportar o sancionar, el docente debe investigar con una conversación privada y genuina.' },
      { id: 10, text: '¿Qué distingue a la motivación intrínseca de la extrínseca?', options: ['La intrínseca dura más y viene del interés genuino; la extrínseca depende de recompensas o castigos externos', 'La extrínseca es siempre negativa y debe evitarse', 'La intrínseca solo funciona con estudiantes brillantes', 'No hay diferencia práctica en el aula'], correct: 0, explanation: 'La motivación intrínseca nace del interés, la curiosidad o el propósito personal. La extrínseca depende de recompensas o castigos externos. Ambas coexisten, pero la intrínseca construye aprendizaje más duradero.' },
      { id: 11, text: '¿Qué es la diferenciación en la enseñanza?', options: ['Dar trabajo más fácil a los estudiantes con dificultades', 'Ajustar el contenido, proceso, producto o ambiente para que todos accedan al mismo aprendizaje de calidad por distintas rutas', 'Crear un plan individual para cada estudiante', 'Separar al grupo por nivel de rendimiento'], correct: 1, explanation: 'Diferenciación no es reducir el nivel para algunos — es abrir múltiples rutas hacia el mismo aprendizaje de calidad. El destino es el mismo; el camino puede variar.' },
      { id: 12, text: 'Una docente llama a padres solo cuando hay problemas de conducta o notas bajas. ¿Qué impacto tiene esto sobre la alianza escuela-familia?', options: ['Ninguno — es la función normal de la comunicación escolar', 'Condiciona a los padres a asociar el contacto escolar con malas noticias, reduciendo su disposición a colaborar', 'Mejora la comunicación porque los padres están siempre informados', 'Es más eficiente que llamar sin razón'], correct: 1, explanation: 'Cuando el único contacto escuela-familia ocurre ante problemas, las familias aprenden a temerlo y evitarlo. La comunicación de logros positivos construye la alianza que permite manejar los problemas juntos cuando surgen.' },
      { id: 13, text: '¿Qué es el perfeccionismo patológico en un estudiante?', options: ['Hacer las cosas muy bien y entregar siempre de forma impecable', 'Miedo al error que paraliza el aprendizaje: evita intentar, llora ante calificaciones normales, no tolera la imperfección', 'Una virtud que debe fomentarse', 'Una señal de alta capacidad intelectual'], correct: 1, explanation: 'El perfeccionismo patológico no es una virtud — es un mecanismo de defensa ante el miedo al juicio. Paraliza la experimentación y el aprendizaje, y puede derivar en ansiedad clínica si no se atiende.' },
      { id: 14, text: 'Un estudiante dice "odio la escuela". ¿Cuál es la respuesta más pedagógicamente efectiva?', options: ['"La escuela es importante para tu futuro, tienes que valorarla."', '"¿Qué parte es la que más odias? Cuéntame." — y escuchar sin defender al sistema', '"Esa actitud no te llevará lejos."', '"Todos sienten eso a veces, es normal."'], correct: 1, explanation: 'El problema de "odio la escuela" es emocional y relacional, no cognitivo. Argumentar con razones racionales no funciona. Escuchar genuinamente — sin defender al sistema — es el primer paso para entender qué está detrás.' },
      { id: 15, text: '¿Qué significa el "todavía no" (growth mindset) cuando un estudiante fracasa?', options: ['El estudiante nunca logrará ese aprendizaje', 'El estudiante no lo ha logrado en este momento pero el camino sigue abierto', 'El docente ya no puede hacer nada más', 'El estudiante necesita repetir el grado'], correct: 1, explanation: 'El "todavía no" de Carol Dweck transforma el fracaso en proceso. No cierra la posibilidad — la mantiene abierta. Es una intervención lingüística simple con impacto profundo en la motivación y la resiliencia.' },
      { id: 16, text: 'Sofía, 9 años, es extremadamente silenciosa desde el primer día. Una colega dice "es su personalidad, así ha sido siempre". ¿Cuál es la respuesta correcta?', options: ['Respetar la timidez y no intervenir para no presionarla', 'Investigar mediante observación y una conversación privada si hay algo más detrás del silencio', 'Exigirle participar públicamente cada día para que se acostumbre', 'Derivar inmediatamente a psicología escolar'], correct: 1, explanation: 'La timidez extrema persistente puede ser señal de ansiedad, bullying previo, barrera lingüística u otra situación. El primer paso es siempre observar e indagar mediante conversación privada, no ignorar ni forzar.' },
      { id: 17, text: '¿Cuál es la diferencia entre los canales BICS y CALP en estudiantes bilingües?', options: ['BICS es lectura, CALP es escritura', 'BICS es la fluencia conversacional básica (1-2 años); CALP es el dominio del lenguaje académico (5-7 años)', 'Son distintos tipos de inteligencia lingüística', 'BICS es para primaria, CALP para secundaria'], correct: 1, explanation: 'BICS (fluencia conversacional) se desarrolla en 1-2 años en una segunda lengua. CALP (lenguaje académico) requiere 5-7 años. Ixchel puede tener BICS en español pero estar desarrollando su CALP — evaluar como si tuviera CALP penaliza su proceso normal.' },
      { id: 18, text: 'Al enfrentar a un estudiante nuevo marcado como "difícil" por docentes anteriores, ¿cuál es el primer paso correcto?', options: ['Establecer reglas claras desde el inicio para que sepa que en tu clase hay consecuencias', 'Conocerlo sin el filtro del expediente: construir relación antes de confrontar conducta', 'Llamar a los padres para comunicar las expectativas de comportamiento', 'Derivarlo a orientación antes de que cause problemas'], correct: 1, explanation: 'El primer día con un estudiante difícil es clave para construir — no destruir — la relación que hará posible el trabajo del año. El expediente contamina la percepción. La primera interacción debe ser de apertura, no de control.' },
      { id: 19, text: '¿Qué indica la investigación sobre el efecto de las expectativas del docente en el rendimiento de los estudiantes?', options: ['Las expectativas no tienen efecto medible — el rendimiento depende solo del estudiante', 'Las expectativas altas del docente correlacionan con mayor logro; las bajas, con menor logro — independientemente del "nivel" del estudiante', 'Solo importan las expectativas de los padres, no las del docente', 'Las expectativas altas presionan demasiado y reducen el rendimiento'], correct: 1, explanation: 'El Efecto Pigmalión y décadas de investigación posterior muestran que las expectativas del docente influyen en la conducta real del docente hacia el estudiante, que a su vez influye en el desempeño. Es una profecía autocumplida en ambas direcciones.' },
      { id: 20, text: 'Un plan de enseñanza diferenciada eficaz:', options: ['Requiere crear 30 planificaciones distintas, una por estudiante', 'Ofrece múltiples rutas hacia el mismo aprendizaje esencial, ajustando representación, proceso o evaluación según las necesidades reales del grupo', 'Solo es posible en grupos pequeños de menos de 15 estudiantes', 'Es responsabilidad del equipo de educación especial, no del docente de aula regular'], correct: 1, explanation: 'La diferenciación efectiva no multiplica el trabajo del docente — lo rediseña. Tres rutas hacia el mismo aprendizaje son manejables. El principio es: mismo destino, distintos caminos.' }
    ]
  }
}
,
{
    id: 'storytelling',
    title: 'Storytelling para Docentes',
    subtitle: 'El arte de contar historias para enseñar con impacto',
    icon: '🎭',
    color: '#F59E0B',
    prerequisite: null,
    status: 'available',
    durationHours: 4,
    totalCards: 50,
    modules: [
        // MÓDULO 1: El poder de las historias en el aula (10 tarjetas)
        {
            id: 1,
            title: '✨ El poder de las historias en el aula',
            cards: [
                { id: 'st-m1-c1', type: 'content', title: '🧠 ¿Qué es el storytelling y por qué funciona?', content: 'El storytelling es el arte de comunicar a través de historias con estructura, emoción y propósito. En educación, no es entretenimiento: es una herramienta neurológica. Cuando escuchamos una historia, se activan hasta 7 áreas del cerebro simultáneamente. En cambio, una lista de datos activa solo 2. Las neuronas espejo nos hacen vivir la experiencia del personaje como si fuera propia, lo que genera aprendizaje profundo y duradero.', extra: { tip: 'Las investigaciones de Uri Hasson (Princeton, 2010) demuestran que el cerebro del narrador y el del oyente se sincronizan durante una historia bien contada. Literalmente, el docente y el estudiante "piensan igual" durante esos minutos.', activity: '¿Puedes recordar un dato que aprendiste en la escuela hace 10 años? Ahora, ¿puedes recordar una historia que te contaron hace 10 años? Esa diferencia es la clave del storytelling.' } },
                { id: 'st-m1-c2', type: 'content', title: '💡 Explicar vs. narrar: la diferencia clave', content: 'Explicar transfiere información. Narrar transforma experiencias. Cuando un docente explica la fotosíntesis, lista pasos y fórmulas. Cuando narra, presenta a una hoja de árbol que lucha por sobrevivir un día nublado en el altiplano guatemalteco. La segunda versión crea una imagen mental, genera tensión y hace que el estudiante quiera saber qué pasa. La narración no reemplaza el rigor: lo potencia.', extra: { tip: 'La diferencia no es hacer la clase "más bonita". Es cambiar el mecanismo de procesamiento cerebral del estudiante: de codificación semántica (datos) a codificación episódica (experiencias), que tiene hasta 4 veces mayor retención.', activity: 'Toma un concepto que enseñarás esta semana. Escribe primero la explicación típica. Luego convierte el concepto en un personaje que tiene un problema. ¿Qué cambia?' } },
                { id: 'st-m1-c3', type: 'content', title: '🎓 Los grandes docentes son narradores', content: 'Richard Feynman, físico y Premio Nobel, era famoso por convertir la mecánica cuántica en historias de personajes curiosos que se comportaban de manera extraña. Paulo Freire enseñaba filosofía política a campesinos analfabetos usando narrativas de su propia vida cotidiana. En Guatemala, los maestros comunitarios de las comunidades mayas llevan siglos transmitiendo cosmología, matemáticas y ética a través del relato oral. La narrativa no es moderna: es el método más antiguo y efectivo de transmitir conocimiento.', extra: { tip: 'No necesitas ser Feynman. Necesitas una historia auténtica, un problema que genere tensión y una resolución que conecte con el contenido. El personaje puede ser tan simple como "un estudiante como tú que un día se preguntó...".', activity: '¿Qué docente recuerdas de tu propia educación? ¿Qué te contaba? Casi siempre, los docentes memorables contaban historias.' } },
                { id: 'st-m1-c4', type: 'content', title: '📐 Los 3 elementos de toda historia', content: 'Toda historia efectiva tiene tres elementos esenciales: un PERSONAJE (alguien con quien identificarse), un CONFLICTO (un problema, obstáculo o pregunta sin respuesta) y una RESOLUCIÓN (la transformación, el aprendizaje, el cambio). Sin personaje, no hay empatía. Sin conflicto, no hay tensión. Sin resolución, no hay cierre. En educación, el personaje puede ser un científico histórico, un estudiante ficticio, una comunidad guatemalteca, o incluso el propio concepto personificado.', extra: { tip: 'El conflicto es el corazón de la historia. Sin él, no hay razón para seguir leyendo o escuchando. En clase, el conflicto pedagógico es la pregunta que el contenido va a responder: "¿Cómo sobrevivieron los mayas sin el cero?" genera tensión. "Hoy veremos los números mayas" no la genera.', activity: 'Toma la última unidad que planificaste. ¿Tiene personaje, conflicto y resolución? ¿O solo tiene temas y actividades?' } },
                { id: 'st-m1-c5', type: 'content', title: '📊 El dato de los 22 veces', content: 'Jerome Bruner, psicólogo cognitivo de Harvard, demostró que los seres humanos recordamos hechos presentados en formato narrativo hasta 22 veces más que hechos presentados como datos aislados. Esto no es intuición: es neurociencia. La memoria episódica (historias, experiencias, emociones) tiene mayor capacidad de consolidación que la memoria semántica (datos, listas, definiciones). Cuando el contenido entra por la puerta de la historia, tiene mucho más probabilidad de quedarse.', extra: { tip: 'Esto tiene implicaciones directas para la evaluación. Si tus estudiantes "estudian y olvidan", puede ser que el contenido nunca entró por la puerta narrativa. La historia no sustituye al estudio — lo prepara.', activity: 'Piensa en la última evaluación que dieron tus estudiantes. ¿Cuánto contenido presentaste como historia vs. como información? ¿Hay correlación con los resultados?' } },
                { id: 'st-m1-c6', type: 'content', title: '🇬🇹 Guatemala: tierra de narradores', content: 'Guatemala tiene una de las tradiciones orales más ricas del mundo. Las comunidades mayas transmitieron cosmología, ética, historia y ciencia durante siglos a través del relato oral, antes de que existiera la escritura alfabética. El Popol Vuh es historia narrada. Las cofradías transmiten conocimiento ritual a través de ceremonias que son historias vividas. Los abuelos son los archivos vivos de la comunidad. El docente guatemalteco que usa storytelling no importa una técnica extranjera: recupera la pedagogía ancestral de su propio pueblo.', extra: { tip: 'En contextos bilingües mayas, la narración oral en lengua materna activa circuitos de memoria que el español no siempre puede alcanzar. Permitir que los estudiantes cuenten historias en su idioma de origen es pedagógicamente poderoso.', activity: '¿Hay algún abuelo, guía comunitario o mayora en tu comunidad que podría venir a clase a contar una historia relacionada con tu contenido? Esa es storytelling culturalmente auténtico.' } },
                { id: 'st-m1-c7', type: 'quiz', question: 'Una docente describe tres opciones para iniciar su clase sobre la Revolución de 1944 en Guatemala. ¿Cuál usa storytelling de forma más efectiva?', options: ['Escribe en el pizarrón: "Revolución de 1944: causas, desarrollo y consecuencias."', '"Hoy veremos un evento histórico muy importante para Guatemala que ocurrió en 1944."', '"Era octubre de 1944. Jacobo Árbenz, un joven militar, miraba por la ventana y se preguntaba si era demasiado tarde para cambiar su país."', '"Abran el libro en la página 87 y lean el resumen de la Revolución de 1944."'], correct: 2, explanation: 'La opción C tiene los tres elementos narrativos: personaje (Jacobo Árbenz), conflicto (¿es demasiado tarde?) y apertura emocional (la incertidumbre). Crea imagen mental, tensión y deseo de saber qué pasó. Las otras opciones anuncian información pero no generan experiencia.' },
                { id: 'st-m1-c8', type: 'quiz', question: '¿Cuál de los siguientes enfoques pedagógicos se basa principalmente en los principios del storytelling?', options: ['Dictar el resumen del tema mientras los estudiantes copian.', 'Hacer que los estudiantes memoricen definiciones y las repitan en voz alta.', 'Presentar el contenido mediante un caso real narrado con personaje, conflicto y resolución.', 'Poner un video explicativo sobre el tema y luego hacer un cuestionario.'], correct: 2, explanation: 'El storytelling pedagógico se distingue por incorporar personaje, conflicto y resolución como vehículo del contenido. No es solo "usar ejemplos" — es construir una narrativa que hace que el contenido sea la respuesta a una pregunta que el estudiante quiere responder.' },
                { id: 'st-m1-c9', type: 'quiz', question: '¿Por qué las historias son neurológicamente más efectivas que las listas de datos para el aprendizaje?', options: ['Porque son más entretenidas y los estudiantes se aburren menos.', 'Porque activan múltiples áreas cerebrales simultáneamente, incluyendo las neuronas espejo y la memoria episódica.', 'Porque los docentes las cuentan con más entusiasmo.', 'Porque son más cortas y fáciles de recordar.'], correct: 1, explanation: 'Las historias activan hasta 7 áreas cerebrales (incluyendo áreas motoras, sensoriales y emocionales) mientras que los datos activan principalmente el área del lenguaje. Las neuronas espejo crean una experiencia vicaria que la memoria episódica consolida con mucha mayor efectividad.' },
                { id: 'st-m1-c10', type: 'content', title: '🪝 El gancho: abrir clase con una historia', content: 'Durante décadas, los libros de pedagogía recomendaron iniciar la clase declarando el objetivo: "Al final de esta clase, el estudiante será capaz de...". La neurociencia del aprendizaje sugiere lo opuesto: el cerebro necesita curiosidad antes de estar dispuesto a recibir información. Un gancho narrativo crea esa curiosidad. En lugar de "Hoy aprenderemos sobre la célula", di: "En 1665, Robert Hooke miró por un microscopio primitivo y vio algo que nadie había visto antes. Lo que vio cambió todo lo que creíamos saber sobre los seres vivos."', extra: { tip: 'El gancho no tiene que ser largo. Puede ser una sola frase que genere curiosidad o una pregunta que solo la historia puede responder. Lo esencial es que el estudiante quiera saber qué pasa antes de que empiece el contenido.', activity: 'Practica reescribir el inicio de tu próxima clase. En lugar de declarar el objetivo, crea un gancho narrativo de 3-4 oraciones con personaje, situación y pregunta abierta.' } }
            ]
        },
        // MÓDULO 2: Estructura narrativa para clase (10 tarjetas)
        {
            id: 2,
            title: '📖 Estructura narrativa para clase',
            cards: [
                { id: 'st-m2-c1', type: 'content', title: '🦸 El viaje del héroe en el aprendizaje', content: 'Joseph Campbell identificó el patrón narrativo universal: el viaje del héroe. Un personaje en su mundo ordinario recibe un llamado a la aventura, enfrenta obstáculos, encuentra guías y regresa transformado. En educación, el ESTUDIANTE es el héroe. El conocimiento es la aventura. El docente es el mentor — no el protagonista. Esta inversión es fundamental: cuando el estudiante se reconoce como héroe de su propio aprendizaje, su agencia y motivación se transforman.', extra: { tip: 'En la narrativa del viaje del héroe, el mentor (Gandalf, Yoda, Dumbledore) nunca resuelve el problema por el héroe. Le da herramientas, lo guía y lo empuja a actuar. El docente que resuelve todo por sus estudiantes está robándoles el papel protagónico.', activity: '¿En tu clase, quién es el héroe habitualmente: tú o tus estudiantes? ¿Cómo podrías rediseñar una unidad para que el estudiante viva el viaje?' } },
                { id: 'st-m2-c2', type: 'content', title: '🎬 Estructura de 5 actos para la clase', content: 'Una clase narrativamente estructurada tiene 5 momentos: Acto 1 — EXPOSICIÓN: presentar el personaje y el mundo (contexto del contenido). Acto 2 — DETONANTE: el problema o pregunta que cambia todo (conflicto cognitivo). Acto 3 — DESARROLLO: la exploración, los intentos, los errores (proceso de aprendizaje). Acto 4 — CLÍMAX: el momento de comprensión, el "¡ajá!" (insight clave). Acto 5 — RESOLUCIÓN: la nueva comprensión aplicada (transferencia). Esta estructura transforma cualquier clase en una experiencia que tiene principio, nudo y desenlace.', extra: { tip: 'No todas las clases pueden tener los 5 actos completos. Pero sí pueden tener al menos 3: un conflicto inicial, un proceso de exploración y un cierre que resuelve la tensión abierta al inicio.', activity: 'Toma tu planificación de esta semana y mapea en cuál de los 5 actos está cada momento de la clase. ¿Hay actos que faltan o están subdesarrollados?' } },
                { id: 'st-m2-c3', type: 'content', title: '⚡ El arco problema-tensión-resolución', content: 'El arco narrativo más simple y versátil tiene tres momentos: PROBLEMA (algo está mal o incompleto), TENSIÓN (la incertidumbre sobre cómo resolverlo), RESOLUCIÓN (la comprensión que cierra el conflicto). Este arco funciona en cualquier asignatura. En matemáticas: "Una comunidad del Quiché necesita dividir 347 mazorcas entre 12 familias. Ninguna familia puede quedar sin maíz. ¿Cómo se hace sin que sobre nada?" El problema es claro, la tensión es real, y la división con residuos se convierte en la solución necesaria.', extra: { tip: 'La tensión no debe resolverse demasiado rápido. Es la tensión sostenida lo que mantiene el cerebro activo y buscando. Un docente que resuelve el conflicto inmediatamente pierde el poder del arco narrativo.', activity: '¿Puedes crear un arco problema-tensión-resolución para el próximo concepto que enseñarás? Escribe las tres frases que lo componen.' } },
                { id: 'st-m2-c4', type: 'content', title: '🔢 Convirtiendo cualquier contenido en narrativa', content: 'Ningún contenido curricular es "imposible de narrar". Matemáticas: la historia del matemático que necesitaba resolver el problema para salvar su aldea. Historia: narrar desde la perspectiva de un testigo que vivió el evento. Ciencias: el científico que observó algo inesperado y no pudo dormir hasta entenderlo. Literatura: hablar con los personajes del texto como si fueran reales. La clave es identificar el conflicto inherente en el contenido — siempre hay uno — y ponerlo al frente.', extra: { tip: 'Todo descubrimiento científico fue precedido por un problema que nadie había podido resolver. Toda ley matemática fue creada para responder una pregunta. Toda obra literaria surge de una tensión humana. El conflicto ya está en el contenido — el docente solo necesita visibilizarlo.', activity: 'Elige el contenido que más "aburrido" te parece de enseñar. ¿Qué conflicto real o histórico lo originó? Ese conflicto es tu historia.' } },
                { id: 'st-m2-c5', type: 'content', title: '🇬🇹 Historias guatemaltecas como ganchos', content: 'Guatemala tiene un tesoro narrativo para el aula. El Popol Vuh ofrece personajes que resuelven problemas con ingenio: los Gemelos Hunahpú e Ixbalanqué enfrentando a los señores de Xibalbá son una historia de pensamiento estratégico. Tecún Umán representa el conflicto entre identidad y poder. Sor Juana Inés de la Cruz, aunque mexicana, resuena en contextos mayas de mujeres que desafían las expectativas. Las leyendas locales de cada departamento, recolectadas de los propios estudiantes, son historias que conectan el currículo con la comunidad.', extra: { tip: 'Pedir a los estudiantes que traigan historias de sus abuelos sobre el tema que estás enseñando es una forma poderosa de storytelling culturalmente auténtico. El conocimiento indígena lleva siglos empaquetado en narrativa.', activity: '¿Qué historia del Popol Vuh o de la historia local podrías usar como gancho para un contenido de tu asignatura? Escribe el título de esa historia y el concepto al que la conectarías.' } },
                { id: 'st-m2-c6', type: 'content', title: '✍️ El mini-relato: 3 oraciones que lo cambian todo', content: 'No necesitas una historia larga para activar el poder narrativo. El mini-relato pedagógico tiene solo 3 oraciones: (1) Presenta el personaje en su situación normal. (2) Introduce el problema o la pregunta inesperada. (3) Lanza la tensión que el contenido resolverá. Ejemplo para enseñar fracciones: "La familia Pérez de San Marcos recibió una sola tortilla para repartir entre 3 hijos hambrientos. Nadie podía recibir más que los demás. ¿Cómo partirla de forma exactamente igual?" Tres oraciones. Un concepto. Una historia.', extra: { tip: 'El mini-relato es especialmente útil para docentes que sienten que "no son buenos narradores". No requiere improvisación ni dramatismo — requiere un personaje real o creíble, un problema concreto y una pregunta que el contenido responde.', activity: 'Escribe ahora un mini-relato de 3 oraciones para tu próxima clase. Personaje + problema + pregunta. Menos de 60 palabras.' } },
                { id: 'st-m2-c7', type: 'quiz', question: 'Una docente planifica su clase sobre la división con residuos usando este inicio: "La comunidad de Chajul necesita distribuir 253 bolsas de semillas entre 8 familias. Todas deben recibir lo mismo. ¿Cuántas bolsas sobran?" ¿Qué elemento narrativo está usando?', options: ['El viaje del héroe completo.', 'El arco problema-tensión-resolución con contexto guatemalteco.', 'La estructura de 5 actos completa.', 'El clímax narrativo sin exposición previa.'], correct: 1, explanation: 'La docente usa el arco problema-tensión-resolución: hay un problema concreto (distribuir semillas), una tensión (¿cuántas sobran?, implica que el número no divide exactamente) y el contenido — la división con residuos — es la resolución. El contexto guatemalteco hace el problema auténtico.' },
                { id: 'st-m2-c8', type: 'content', title: '🎭 Personificar conceptos abstractos', content: 'Un concepto abstracto se vuelve memorable cuando tiene nombre, personalidad y problema. Las fracciones pueden ser "hermanas que deben compartir exactamente igual". Los números negativos pueden ser "deudas que persiguen al protagonista". Las células pueden ser "ciudades con alcalde (núcleo), trabajadores (organelos) y muros (membrana)". En Guatemala, personificar conceptos usando animales o figuras del calendario maya (los nahuales) crea conexiones culturalmente resonantes que la clase memoriza sin esfuerzo.', extra: { tip: 'La personificación no "simplifica" el concepto — lo hace accesible. La profundidad se agrega sobre la personificación, no en lugar de ella. Primero el personaje, luego el rigor.', activity: 'Elige un concepto abstracto de tu asignatura. Dale un nombre, una personalidad y un problema. ¿Cómo cambia la forma en que lo enseñarías?' } },
                { id: 'st-m2-c9', type: 'content', title: '🔚 El cliffhanger: dejar la historia incompleta', content: 'Los mejores episodios de las series terminan en el momento de mayor tensión, justo cuando el espectador más quiere saber qué pasa. Esta técnica — el cliffhanger — es poderosa en educación. En lugar de cerrar completamente la clase, déjala en el punto de mayor tensión. "Mañana descubriremos si la comunidad logró resolver el problema..." El cerebro del estudiante seguirá procesando el conflicto después de clases — sin tarea adicional, solo con la tensión narrativa no resuelta.', extra: { tip: 'El cliffhanger pedagógico funciona mejor cuando la tensión es genuina: el estudiante realmente quiere saber la respuesta. Si el conflicto fue artificialmente construido o no conecta con su realidad, el efecto se pierde.', activity: '¿Cómo podrías terminar tu próxima clase con un cliffhanger en lugar de un cierre completo? ¿Qué pregunta dejarías sin responder hasta la siguiente sesión?' } },
                { id: 'st-m2-c10', type: 'quiz', question: 'Un docente quiere convertir el objetivo "el estudiante identificará las causas de la Independencia de Guatemala" en un gancho narrativo. ¿Cuál es la mejor versión?', options: ['"El objetivo de hoy es identificar las causas de la Independencia de Guatemala de 1821."', '"En 1821, un grupo de personas en Ciudad de Guatemala debatía en secreto si firmar un documento que podría costarles la vida o la libertad. ¿Qué los llevó a ese momento?"', '"Hoy veremos un hecho histórico muy importante: la Independencia de Guatemala."', '"Abran el libro y lean las causas de la Independencia en la página 45."'], correct: 1, explanation: 'La opción B convierte el objetivo en una historia: tiene personaje (un grupo de personas), conflicto (el riesgo de firmar), tensión (¿qué los llevó ahí?) y genera curiosidad antes de que el contenido empiece. Las causas de la Independencia se convierten en la respuesta a una pregunta que el estudiante quiere responder.' }
            ]
        },
        // MÓDULO 3: El docente como narrador (10 tarjetas)
        {
            id: 3,
            title: '🎙️ El docente como narrador',
            cards: [
                { id: 'st-m3-c1', type: 'content', title: '🔊 Voz, ritmo y pausas en la narración', content: 'La voz del docente es el instrumento principal del storytelling. Tres elementos la hacen efectiva: VOLUMEN (bajar la voz en el momento clave genera más atención que gritar), RITMO (variar la velocidad — más lento en los momentos importantes, más rápido en la acción — crea tensión y relax), y PAUSA (el silencio después de una revelación es más poderoso que cualquier palabra). Un docente que habla siempre al mismo volumen y velocidad pierde la herramienta más poderosa de la narración.', extra: { tip: 'La pausa dramática es la técnica más subutilizada en la docencia. Después de revelar el conflicto central de la clase, haz una pausa de 3 segundos. Ese silencio dice: "esto es importante, procésalo". El cerebro del estudiante llena ese silencio con pensamiento.', activity: 'Grábate narrando un párrafo de clase. ¿Cuántas veces cambias de volumen o velocidad? ¿Cuántas veces usas la pausa? Escúchalo con ojos críticos.' } },
                { id: 'st-m3-c2', type: 'content', title: '🤸 Lenguaje corporal al narrar', content: 'El cuerpo amplifica la historia. Los GESTOS deben ilustrar — mostrar el tamaño de una célula con las manos, representar el movimiento de las placas tectónicas con los brazos — no decorar. El MOVIMIENTO del docente por el espacio indica dónde está en la historia: avanzar = avanzar en el tiempo, retroceder = contexto o consecuencia. El CONTACTO VISUAL crea la ilusión de hablarle a cada estudiante individualmente. Un docente pegado al pizarrón o a sus notas pierde el 55% del poder comunicativo de la narración.', extra: { tip: 'En culturas como la guatemalteca, donde el contacto visual directo a veces tiene connotaciones de desafío o incomodidad según el contexto comunitario, el docente debe calibrar. El contacto visual suave, que va de estudiante en estudiante sin fijar la mirada, es culturalmente más apropiado.', activity: 'La próxima vez que cuentes una historia en clase, usa al menos 3 gestos físicos que ilustren el contenido. Observa si los estudiantes imitan tus gestos — es señal de que las neuronas espejo están activas.' } },
                { id: 'st-m3-c3', type: 'content', title: '🤫 El uso dramático del silencio', content: 'El silencio tiene tres usos narrativos en el aula: SILENCIO DE ANTICIPACIÓN (antes de revelar la respuesta o el giro de la historia, genera espera), SILENCIO DE PROCESAMIENTO (después de una idea importante, da tiempo al cerebro de integrar), y SILENCIO DE IMPACTO (después de una revelación emocional, honra el peso de lo que se acaba de decir). Los docentes más hábiles usan el silencio como los músicos usan el espacio entre las notas: es parte de la composición, no ausencia de ella.', extra: { tip: 'El miedo al silencio es uno de los hábitos más comunes de los docentes principiantes. El silencio se siente como fracaso o falta de contenido. En realidad, un silencio de 5 segundos bien ubicado puede ser el momento más poderoso de la clase.', activity: 'Practica esta semana: en el momento más importante de tu clase, haz una pausa de 4-5 segundos completos antes de continuar. Observa qué pasa en el aula durante ese silencio.' } },
                { id: 'st-m3-c4', type: 'content', title: '👁️ Leer el aula: ajustar la historia en tiempo real', content: 'Un gran narrador no solo cuenta — observa. Lee las señales del aula mientras narra: estudiantes que se inclinan hacia adelante (enganchados), estudiantes que miran por la ventana (perdidos), susurros que aumentan (la historia perdió tensión), silencio total (están completamente dentro de la narrativa). Estas señales son retroalimentación en tiempo real. El docente narrador ajusta: acelera, agrega un detalle inesperado, hace una pregunta directa, cambia el ejemplo por uno más cercano a la realidad del grupo.', extra: { tip: 'Las comunidades indígenas guatemaltecas tienen narradores extraordinarios — los guías espirituales, los ancianos, los contadores de historias en ceremonias — que dominan exactamente esta habilidad: leer al público y ajustar la narración. Son modelos vivos de storytelling efectivo.', activity: '¿Tienes señales claras en tu aula que te dicen cuándo la clase "perdió" al grupo? Enlista tres señales físicas que observas. ¿Qué haces actualmente cuando las detectas?' } },
                { id: 'st-m3-c5', type: 'content', title: '💜 Historias personales como herramienta pedagógica', content: 'Las historias del propio docente tienen un poder especial: muestran vulnerabilidad, crean confianza y hacen al personaje narrador (el docente) humano y alcanzable. "Cuando yo estaba en primero de básico, este problema me resultó imposible" es una historia que le dice al estudiante: "el que me enseña también luchó con esto, y lo logró". La vulnerabilidad estratégica — compartir un error, una duda, un fracaso superado — no debilita la autoridad del docente. La humaniza y la hace más creíble.', extra: { tip: 'La historia personal no debe ser el centro de la clase — es el vehículo que conduce al contenido. "Cuando yo aprendí esto, entendí que..." conecta la historia personal con el aprendizaje sin convertir la clase en autobiografía.', activity: '¿Tienes una historia personal que conecte con un contenido difícil que enseñas? Escríbela en 5 oraciones: qué problema enfrentaste, cómo te sentiste, qué hiciste, qué aprendiste, cómo conecta con lo que enseñas hoy.' } },
                { id: 'st-m3-c6', type: 'content', title: '📚 Contar historias que no viviste', content: 'No todas las historias pedagógicas tienen que ser personales. Los docentes contamos historias históricas, científicas, comunitarias y ficticias constantemente. La clave para narrar con autenticidad una historia que no viviste es la investigación de detalles sensoriales: ¿qué veía, olía, escuchaba el personaje? ¿Qué sentía en el cuerpo? ¿Qué tenía miedo de perder? Estos detalles concretos hacen que el oyente "entre" en la historia. Sin ellos, la historia suena como un resumen, no como una experiencia.', extra: { tip: 'Los detalles sensoriales específicos son la diferencia entre "Tecún Umán murió en la batalla" (resumen) y "Tecún Umán avanzó entre el humo y los gritos, con el quetzal en la cabeza y la certeza de que lo que hacía esa mañana definiría quiénes eran los kichés para siempre" (historia). El segundo activa el cerebro; el primero, no.', activity: 'Elige una figura histórica guatemalteca que debas enseñar. Investiga 3 detalles sensoriales concretos de ese momento histórico. Úsalos la próxima vez que cuentes esa historia.' } },
                { id: 'st-m3-c7', type: 'quiz', question: '¿Cuál de estas acciones representa un uso efectivo de técnicas de narración en el aula?', options: ['Leer el texto del libro en voz alta con buena pronunciación.', 'Bajar la voz al llegar al momento más tenso de la historia, hacer una pausa de 3 segundos y luego continuar.', 'Hablar más rápido para cubrir más contenido en menos tiempo.', 'Permanecer detrás del escritorio para proyectar autoridad mientras se narra.'], correct: 1, explanation: 'Bajar la voz (contraste de volumen) y la pausa dramática son técnicas de narración que crean tensión y señalan importancia. El cerebro del estudiante interpreta el contraste como "esto es lo que debo recordar". Hablar más rápido o quedarse detrás del escritorio reduce el impacto narrativo.' },
                { id: 'st-m3-c8', type: 'content', title: '🎨 Mostrar, no decir', content: 'El principio fundamental de la escritura creativa aplica perfectamente a la docencia: "Show, don\'t tell" — muestra, no digas. En lugar de decir "la pobreza en el siglo XIX era terrible", muestra: "En 1890, una familia de Ciudad de Guatemala desayunaba con agua caliente y tortillas secas, si tenía suerte, antes de caminar dos horas hasta el trabajo." El primer enunciado es un juicio. El segundo es una imagen. Las imágenes viven en el cerebro; los juicios, no.', extra: { tip: 'Transformar tus "decires" en "mostrados" es un ejercicio que mejora con la práctica. Cada vez que vayas a hacer una afirmación abstracta ("esto fue importante", "fue difícil", "cambió todo"), pregúntate: ¿cómo se veía eso? ¿Qué detalle concreto lo muestra?', activity: 'Toma tres afirmaciones de tu planificación actual. Por cada una, escribe la imagen concreta que la muestra sin decirla directamente.' } },
                { id: 'st-m3-c9', type: 'content', title: '🔁 Repetición y callback para reforzar', content: 'Los mejores narradores usan dos técnicas de refuerzo: REPETICIÓN (repetir una frase clave en momentos distintos de la historia: "como dijimos al principio...") y CALLBACK (volver al inicio al final: "¿recuerdan a Tecún Umán esta mañana? Ahora entendemos por qué hizo lo que hizo"). En educación, el callback conecta el gancho inicial con la resolución final, cerrando el círculo narrativo. El cerebro obtiene satisfacción de ese cierre — y esa satisfacción refuerza la consolidación del aprendizaje.', extra: { tip: 'El callback es especialmente poderoso porque cumple una función doble: cierra la historia narrativamente y consolida el contenido pedagógico. El estudiante siente que "cerró algo" — y ese cierre emocional ayuda a la memoria.', activity: 'Planifica el callback de tu próxima clase con gancho narrativo. ¿Cómo volverás al personaje o situación del inicio cuando el contenido esté completo?' } },
                { id: 'st-m3-c10', type: 'quiz', question: '¿Qué error de narración "rompe la inmersión" de una historia en el aula de forma más severa?', options: ['Usar un ejemplo guatemalteco en lugar de uno internacional.', 'Interrumpir la historia en el momento de mayor tensión para pasar lista o dar un anuncio administrativo.', 'Contar una historia que el docente no vivió personalmente.', 'Usar gestos mientras se narra.'], correct: 1, explanation: 'Interrumpir la tensión narrativa para asuntos administrativos destruye la inmersión. El cerebro del estudiante sale del estado de "historia" y entra al estado de "clase rutinaria" — y es difícil volver a entrar. La planificación debe proteger el arco narrativo de interrupciones predecibles.' }
            ]
        },
        // MÓDULO 4: Historias con propósito pedagógico (10 tarjetas)
        {
            id: 4,
            title: '🎯 Historias con propósito pedagógico',
            cards: [
                { id: 'st-m4-c1', type: 'content', title: '📋 Tipos de historias según el objetivo de aprendizaje', content: 'No todas las historias pedagógicas tienen el mismo propósito. HISTORIA MOTIVACIONAL: inspira acción o perseverancia ("así lo logró alguien como tú"). HISTORIA EXPLICATIVA: hace comprensible algo complejo a través de una analogía narrativa. HISTORIA CAUTIONARY (de advertencia): muestra consecuencias de una decisión sin moralizar directamente. HISTORIA DE VALORES: encarna un principio ético en un personaje que lo vive. Elegir el tipo correcto según el objetivo transforma la historia de decoración en herramienta pedagógica precisa.', extra: { tip: 'Las historias de advertencia son especialmente efectivas porque permiten al estudiante "aprender del error ajeno" sin el costo del error propio. La ficción hace seguro explorar consecuencias que en la realidad serían dolorosas.', activity: '¿Cuál de estos cuatro tipos de historia usas más frecuentemente? ¿Cuál nunca usas? ¿Qué oportunidades pedagógicas estás perdiendo con el tipo que no usas?' } },
                { id: 'st-m4-c2', type: 'content', title: '🎯 El objetivo dentro de la historia, no antes', content: 'La práctica tradicional declara el objetivo antes de la clase: "Al terminar esta sesión, el estudiante podrá identificar los tipos de suelo." La narrativa pedagógica lo embebe dentro de la historia: "La familia Tzoc de Huehuetenango perdió su cosecha tres años seguidos. El agrónomo les dijo que el problema no era la semilla ni el clima. Era el suelo. Pero ¿cómo saber qué tipo de suelo tiene tu terreno?" El objetivo (identificar tipos de suelo) sigue presente — pero ahora es la respuesta a una pregunta urgente, no un enunciado administrativo.', extra: { tip: 'Cuando el objetivo es la respuesta a una pregunta que el estudiante ya quiere responder, la motivación para aprenderlo es intrínseca. Cuando el objetivo se declara antes de la historia, el estudiante aprende "porque el docente lo dijo".', activity: 'Toma el objetivo de tu próxima clase. Construye una situación narrativa donde ese objetivo sea la solución necesaria a un problema que un personaje enfrenta.' } },
                { id: 'st-m4-c3', type: 'content', title: '🏢 Storytelling de casos reales', content: 'El case study narrativo es una de las herramientas más poderosas de la educación profesional, pero funciona igualmente bien en primaria y secundaria. Toma un problema real — de la comunidad, del país, del mundo — y lo narra con los elementos de una historia: personajes que lo viven, conflicto que lo define, decisiones que lo afectan, consecuencias que lo resuelven o complican. En Guatemala, casos como el accidente del relleno El Gallito (2015) o la crisis del agua en el río Motagua ofrecen narrativas reales, complejas y pedagógicamente ricas.', extra: { tip: 'Los casos reales tienen una ventaja sobre las historias inventadas: el estudiante puede verificar, investigar y ampliar la historia. Eso convierte el storytelling en punto de partida para la indagación, no en sustituto de ella.', activity: '¿Qué caso real de tu comunidad o de Guatemala podría servir como caso de estudio narrativo para un contenido que enseñas? Escribe el nombre del caso y el contenido al que lo conectarías.' } },
                { id: 'st-m4-c4', type: 'content', title: '📱 Storytelling digital: nuevos formatos', content: 'El storytelling no es solo oral o escrito. Los formatos digitales abren posibilidades enormes. VIDEO: cortometrajes de 2-3 minutos que narran el contenido con imagen y sonido. PODCAST: episodios de audio donde el docente o los estudiantes narran. COMIC o NOVELA GRÁFICA: historia con imágenes secuenciadas (con papel o apps gratuitas). FOTO ENSAYO: secuencia de imágenes del entorno guatemalteco que narran un proceso o un cambio. Cada formato activa diferentes canales de procesamiento y puede adaptarse a diferentes perfiles de aprendizaje.', extra: { tip: 'En contextos con acceso limitado a tecnología, el cómic en papel es igualmente poderoso que el digital. Papel, lápiz y las historias de los estudiantes son suficientes. La limitación tecnológica nunca es un obstáculo para el storytelling.', activity: '¿Cuál de estos formatos digitales (o analógicos) podrías incorporar en tu próxima unidad? ¿Qué historia contarías con ese formato?' } },
                { id: 'st-m4-c5', type: 'content', title: '👩‍🎓 El estudiante como narrador', content: 'El storytelling más poderoso ocurre cuando los estudiantes son los narradores, no solo el público. Proyectos donde los estudiantes crean y cuentan historias desarrollan comprensión profunda (deben dominar el contenido para narrarlo), comunicación (deben organizarlo para que otro lo entienda) y pensamiento crítico (deben seleccionar qué es esencial). En Guatemala, proyectos de historia oral donde estudiantes entrevistan a sus abuelos y convierten esas entrevistas en historias escritas o grabadas unen currículo, identidad cultural y habilidades del siglo XXI.', extra: { tip: 'La investigación muestra que enseñar algo a otro es la estrategia de aprendizaje con mayor retención (el método Cornell coloca el "enseñar" como la cima de la pirámide de retención). Cuando el estudiante narra, aprende más profundamente que cuando escucha.', activity: '¿Hay un proyecto en tu asignatura donde los estudiantes podrían ser los narradores? ¿Qué historia de su comunidad podría ser el vehículo del contenido curricular?' } },
                { id: 'st-m4-c6', type: 'content', title: '📝 Evaluación a través del storytelling', content: 'La evaluación también puede ser narrativa. PORTAFOLIO NARRATIVO: el estudiante escribe una historia que narra su proceso de aprendizaje durante la unidad. EXAMEN ORAL COMO HISTORIA: el estudiante explica el concepto narrándo un caso o una situación. NARRATIVA DE EVIDENCIA: el estudiante elige 3 trabajos del período y escribe por qué los eligió y qué muestran de su crecimiento. Estas formas de evaluación desarrollan metacognición, comunicación y síntesis — competencias que un examen de opción múltiple no puede medir.', extra: { tip: 'La evaluación narrativa es especialmente equitativa en contextos multilingües. Un estudiante que domina el contenido pero tiene dificultades con la escritura formal en español puede demostrar comprensión profunda a través de la narración oral en su lengua materna.', activity: '¿Podrías reemplazar uno de tus instrumentos de evaluación habituales con una forma de evaluación narrativa este período? ¿Cuál y cómo?' } },
                { id: 'st-m4-c7', type: 'quiz', question: 'Una docente quiere evaluar si sus estudiantes comprendieron el ciclo del agua. En lugar de un examen escrito, les pide que narren la historia de "una gota de agua que comienza en el lago Atitlán y viaja hasta volver al punto de partida". ¿Qué tipo de evaluación es esta?', options: ['Una actividad de relajación sin valor pedagógico.', 'Una evaluación narrativa que mide comprensión profunda del ciclo del agua a través de la síntesis y la secuencia.', 'Un juego que reemplaza irresponsablemente la evaluación formal.', 'Una evaluación solo apta para estudiantes con habilidades artísticas.'], correct: 1, explanation: 'Para narrar el viaje completo de la gota, el estudiante debe dominar la secuencia del ciclo del agua, sus etapas, los cambios de estado y los factores ambientales. La narrativa es el vehículo; la comprensión del ciclo es el contenido evaluado. Es evaluación auténtica y culturalmente contextualizada.' },
                { id: 'st-m4-c8', type: 'content', title: '🌍 Ética del storytelling: representar bien', content: 'El storytelling pedagógico tiene responsabilidades éticas. SENSIBILIDAD CULTURAL: evitar usar culturas, comunidades o grupos como "ejemplos exóticos" o como escenarios de problemas sin agencia. EVITAR ESTEREOTIPOS: no reducir a personajes guatemaltecos, indígenas o rurales a pobreza, conflicto o tragedia — sus historias también incluyen ingenuidad, resiliencia, innovación y alegría. REPRESENTAR CON DIGNIDAD: si usas una historia real, verifica que los protagonistas estarían de acuerdo con cómo los representas. La historia poderosa no explota — ilumina.', extra: { tip: 'En contextos mayas guatemaltecos, ciertas historias sagradas o ceremoniales no deben ser reproducidas fuera de su contexto ritual. Antes de usar una historia comunitaria en clase, consulta con un anciano o líder comunitario. El permiso cultural es parte de la ética del storytelling.', activity: '¿Hay alguna historia que hayas contado en clase que, revisándola ahora, podría haber sido inapropiada o estereotipante? ¿Cómo la contarías diferente hoy?' } },
                { id: 'st-m4-c9', type: 'content', title: '🎓 Adaptar la historia para diferentes edades', content: 'La misma historia puede contarse en distintos niveles de complejidad. En primaria: personajes simples, conflicto concreto, resolución rápida y emocional. En básicos: personajes con dilemas morales, conflicto que requiere razonamiento, resolución abierta a debate. En diversificado: personajes históricamente complejos, conflicto sistémico, resolución ambigua que invita al análisis crítico. La fotosíntesis puede narrarse como "la hoja que aprende a cocinar su propia comida" para primaria, o como "el mecanismo que los seres vivos desarrollaron para independizarse de depender de otros para alimentarse" para diversificado.', extra: { tip: 'El nivel de complejidad narrativa no está solo en el vocabulario — está en la complejidad moral del personaje y la ambigüedad de la resolución. Los niños pequeños necesitan resoluciones claras; los adolescentes pueden procesar (y de hecho prefieren) resoluciones ambiguas y preguntas abiertas.', activity: '¿Tienes una historia que cuentas para un grado específico? ¿Cómo la adaptarías para un grado 3 años menor o 3 años mayor que el tuyo?' } },
                { id: 'st-m4-c10', type: 'quiz', question: '¿Cuál es la diferencia entre un objetivo de aprendizaje "embebido" en una historia y uno "declarado" antes de la clase?', options: ['No hay diferencia real: el contenido es el mismo de cualquier forma.', 'El objetivo embebido convierte el contenido en la respuesta a una pregunta que el estudiante ya quiere responder; el declarado lo presenta como una tarea externa.', 'El objetivo embebido es menos riguroso porque no se enuncia explícitamente.', 'El objetivo declarado es mejor porque todos los estándares educativos lo requieren.'], correct: 1, explanation: 'Cuando el objetivo se embebe en la historia, el estudiante aprende porque quiere resolver el conflicto narrativo — y el contenido es la clave para resolverlo. Eso es motivación intrínseca. Cuando se declara antes, el estudiante aprende porque el docente lo indicó. El contenido es el mismo; la motivación y la retención son muy distintas.' }
            ]
        },
        // MÓDULO 5: Práctica y diseño de tu historia docente (10 tarjetas)
        {
            id: 5,
            title: '✏️ Práctica y diseño de tu historia docente',
            cards: [
                { id: 'st-m5-c1', type: 'content', title: '🛠️ Diseña tu historia en 20 minutos', content: 'Crear una historia pedagógica efectiva no requiere horas. En 20 minutos puedes tener un gancho narrativo completo siguiendo estos 5 pasos: (1) Elige el concepto clave de la clase. (2) Identifica el conflicto inherente en ese concepto — la pregunta que no tiene respuesta obvia. (3) Crea o elige un personaje que enfrente ese conflicto — real, histórico o ficticio. (4) Agrega un detalle sensorial concreto que ubique la historia en un lugar y tiempo específico. (5) Formula la pregunta abierta con la que terminarás el gancho y comenzará el aprendizaje.', extra: { tip: 'El tiempo de diseño se reduce con la práctica. Después de crear 10-15 historias pedagógicas, el proceso se vuelve casi automático — comienzas a ver el conflicto narrativo en cada concepto que enseñas, sin tener que buscarlo deliberadamente.', activity: 'Haz el ejercicio ahora: toma 20 minutos, elige un contenido de la próxima semana y sigue los 5 pasos. Al final, tendrás tu primer gancho narrativo diseñado.' } },
                { id: 'st-m5-c2', type: 'content', title: '📝 Plantillas narrativas para docentes', content: 'Las plantillas reducen la carga cognitiva del diseño. Tres plantillas básicas: PLANTILLA A — "En [lugar guatemalteco], [personaje] enfrentaba [problema]. Necesitaba [solución] pero no sabía cómo. Eso es exactamente lo que aprenderemos hoy." PLANTILLA B — "Cuando [personaje histórico] descubrió [fenómeno], nadie le creyó. Hasta que demostró [evidencia]. ¿Cómo lo hizo?" PLANTILLA C — "[Personaje] tenía que decidir entre [opción A] y [opción B]. Lo que eligió cambió [consecuencia]. ¿Qué habrías elegido tú?" Cada plantilla abre una clase distinta y conecta con el contenido diferente.', extra: { tip: 'Las plantillas no son camisa de fuerza — son andamiaje. Úsalas hasta que el proceso sea natural, luego abandónalas. Un docente con experiencia en storytelling ya no necesita plantillas: el ojo narrativo ve la historia directamente en el contenido.', activity: 'Usa la Plantilla A ahora para un contenido de tu asignatura. Llena los espacios con elementos de tu contexto guatemalteco específico.' } },
                { id: 'st-m5-c3', type: 'content', title: '👥 Protocolo de retroalimentación entre pares', content: 'Las historias mejoran con retroalimentación estructurada. El protocolo "Noté / Me pregunté / ¿Qué pasaría si...?" funciona así: NOTÉ: describe lo que observaste en la historia sin juzgar ("Noté que el personaje no tenía nombre específico"). ME PREGUNTÉ: formula una curiosidad genuina ("Me pregunté qué sentía el personaje en ese momento"). ¿QUÉ PASARÍA SI...?: sugiere una variación sin imponerla ("¿Qué pasaría si el conflicto ocurriera en una comunidad guatemalteca específica?"). Este protocolo da retroalimentación útil sin destruir la historia original.', extra: { tip: 'Este mismo protocolo puede usarse con los estudiantes para dar retroalimentación a las historias que crean entre ellos. Enseña el protocolo explícitamente — los estudiantes lo aplican de forma más efectiva cuando conocen la estructura.', activity: 'Comparte tu gancho narrativo diseñado en la tarjeta anterior con un colega usando este protocolo. ¿Qué mejorarías después de escuchar su retroalimentación?' } },
                { id: 'st-m5-c4', type: 'content', title: '📚 Tu biblioteca de historias', content: 'Los docentes narradores construyen, con el tiempo, una biblioteca personal de historias pedagógicas. Organízala por: ASIGNATURA (matemáticas, ciencias, historia, etc.), PROPÓSITO (motivacional, explicativa, cautionary, de valores), NIVEL (primaria, básicos, diversificado) y CONTEXTO CULTURAL (guatemalteco, universal, local de tu comunidad). Una biblioteca de 30-40 historias bien organizadas te permite iniciar cualquier clase con un gancho narrativo apropiado en menos de 2 minutos de preparación.', extra: { tip: 'Las mejores fuentes para tu biblioteca: historias de tus propios estudiantes (con su permiso), relatos de ancianos de la comunidad, noticias locales narradas como caso, tu propia historia de aprendizaje de ese concepto, y adaptaciones del Popol Vuh u otras tradiciones orales guatemaltecas.', activity: '¿Cuántas historias pedagógicas tienes actualmente "en tu repertorio"? Anótalas. ¿En qué áreas tu biblioteca está vacía?' } },
                { id: 'st-m5-c5', type: 'content', title: '❓ Las preguntas de los estudiantes como semillas de historias', content: 'Las mejores historias pedagógicas a veces nacen de las preguntas de los propios estudiantes. "¿Por qué tenemos que aprender esto?" es una pregunta que contiene exactamente el conflicto narrativo que necesitas: ¿para qué sirve realmente este conocimiento? "¿Esto le pasó a alguien de verdad?" es la invitación a contar una historia real. "¿Qué habría pasado si...?" es un cliffhanger que el estudiante está ofreciendo gratuitamente. Escuchar las preguntas con oído narrativo transforma la gestión del aula en cocreación de historias.', extra: { tip: 'Cuando un estudiante hace una pregunta que no puedes responder inmediatamente, esa es la mejor semilla de historia: "Esa pregunta es tan buena que voy a construir una historia para responderla la próxima clase." Y cúmplelo. Eso enseña que las preguntas tienen valor real.', activity: '¿Cuáles son las 3 preguntas más frecuentes que tus estudiantes hacen sobre tu asignatura? ¿Qué historia podría responder cada una de esas preguntas?' } },
                { id: 'st-m5-c6', type: 'content', title: '🗓️ Planificación narrativa de unidad', content: 'El storytelling no es solo para una clase: puede estructurar una unidad entera. La narrativa de unidad funciona así: la unidad tiene un PERSONAJE central (puede ser un científico, un personaje histórico, una comunidad guatemalteca), un CONFLICTO que se desarrolla a lo largo de las semanas (el problema que el contenido resuelve progresivamente) y una RESOLUCIÓN que llega en la última clase cuando el aprendizaje completo está disponible. Cada clase es un capítulo. El cliffhanger de cada capítulo conecta con la siguiente clase.', extra: { tip: 'En una unidad narrativa de 4 semanas, el docente puede presentar en la primera clase un problema sin resolver (el conflicto de la unidad) y no dar la solución hasta la última semana. Las semanas intermedias son el proceso de aprendizaje que lleva a esa resolución. El estudiante aprende motivado por querer saber el final.', activity: 'Toma tu próxima unidad. ¿Qué conflicto podría iniciarla? ¿Qué personaje lo vive? ¿Qué resolución llega en la última clase? Esboza los capítulos de la narrativa de unidad.' } },
                { id: 'st-m5-c7', type: 'quiz', question: 'Una docente comparte su gancho narrativo con un colega usando el protocolo "Noté / Me pregunté / ¿Qué pasaría si...?". El colega dice: "Noté que el conflicto se resuelve muy rápido en tu historia, en la segunda oración." ¿Qué debería hacer la docente con este feedback?', options: ['Ignorarlo: el protocolo no permite críticas directas.', 'Agradecer la observación y considerar extender la tensión del conflicto antes de ofrecer la resolución.', 'Defender su historia explicando por qué la resolución rápida es intencional.', 'Cambiar completamente la historia para que el colega quede satisfecho.'], correct: 1, explanation: 'El protocolo "Noté" es una observación descriptiva que da información útil sin juzgar. La resolución prematura del conflicto es efectivamente un riesgo narrativo: si la tensión no se sostiene lo suficiente, el cerebro no se involucra. La docente debe considerar cómo extender la tensión para que el conflicto "duela" un poco más antes de resolverse.' },
                { id: 'st-m5-c8', type: 'content', title: '🏘️ Historias que construyen comunidad de aula', content: 'Las historias compartidas crean identidad de grupo. Cuando el aula tiene sus propias historias — "¿recuerdan cuando don Pedro nos contó sobre la cosecha?" o "¿recuerdan la historia de la gota de agua que empezó en el Atitlán?" — esas referencias compartidas se convierten en el pegamento cultural del grupo. Los docentes que narran regularmente construyen aulas con memoria colectiva, y esa memoria colectiva es el tejido de la comunidad de aprendizaje. En Guatemala, donde la tradición oral comunitaria es central, esta práctica reconecta la escuela con la cultura.', extra: { tip: 'Las historias de aula más poderosas son las que el grupo creó o vivió junto. Una historia que "pasó en esta aula" tiene un peso emocional y mnemónico que ninguna historia externa puede igualar.', activity: '¿Qué historias tiene tu aula actual? ¿Hay momentos compartidos, experiencias de clase o proyectos que ya se han convertido en referencias comunes del grupo? Nómbralos.' } },
                { id: 'st-m5-c9', type: 'content', title: '🌿 La espina de la historia (Story Spine)', content: 'La "story spine" o espina de la historia es una técnica de improvisación teatral adaptada para el aula. Tiene 7 frases conector que generan una historia completa: "Había una vez..." (personaje y mundo), "Cada día..." (rutina, lo normal), "Hasta que un día..." (el detonante), "Por eso..." (primera consecuencia), "Hasta que finalmente..." (clímax y resolución), "Y desde entonces..." (el mundo transformado). Esta técnica puede usarse para crear historias pedagógicas, como actividad de cierre de clase o como proyecto de escritura narrativa.', extra: { tip: 'La story spine es especialmente útil para estudiantes que "no saben qué escribir". La estructura les da el andamiaje para construir una historia completa sin partir de cero. También puede adaptarse con personajes del Popol Vuh o de la historia guatemalteca.', activity: 'Completa ahora una story spine sobre un concepto de tu asignatura. Usa los 7 conectores y llena cada uno con detalles de tu contexto guatemalteco.' } },
                { id: 'st-m5-c10', type: 'quiz', question: 'Usas la "story spine" para planificar un gancho sobre la fotosíntesis. ¿Cuál de estas versiones sigue correctamente la estructura?', options: ['"La fotosíntesis es el proceso por el cual las plantas producen su alimento usando luz solar, agua y dióxido de carbono."', '"Había una vez una hoja de maíz en Quetzaltenango. Cada día absorbía luz del sol y agua de la lluvia. Hasta que un día llegó una semana sin sol. Por eso, la hoja tuvo que buscar una manera de sobrevivir. Hasta que finalmente encontró reservas en su tallo. Y desde entonces, las plantas aprendieron a guardar energía para los días oscuros."', '"La planta es verde porque tiene clorofila. La clorofila absorbe luz y produce glucosa."', '"Hoy estudiaremos la fotosíntesis, que es muy importante para entender cómo crecen las plantas."'], correct: 1, explanation: 'La opción B sigue exactamente la estructura de la story spine: personaje (hoja de maíz en Quetzaltenango), rutina (absorber sol y agua), detonante (semana sin sol), consecuencia (buscar solución), resolución (reservas en el tallo) y transformación (aprendieron a guardar energía). El contenido científico —fotosíntesis y almacenamiento de energía— está embebido en la narrativa.' }
            ]
        }
    ]
},
// ══════════════════════════════════════════════════
// RUTA: DOCENTE CREATIVO
// ══════════════════════════════════════════════════
// CURSO: creatividad
{
    id: 'creatividad',
    title: 'Despertando la Creatividad',
    subtitle: 'Herramientas para cultivar el pensamiento creativo en tu aula',
    icon: '💡',
    color: '#E83C8D',
    prerequisite: [],
    status: 'available',
    durationHours: 4,
    totalCards: 50,
    modules: [
        {
            id: 1,
            title: "💡 Módulo 1: ¿Qué es la creatividad y por qué importa?",
            cards: [
                {
                    id: 1,
                    type: "content",
                    title: "¿Qué entendemos por creatividad?",
                    content: "La creatividad es la capacidad de generar ideas nuevas y útiles. No es un don exclusivo de artistas o genios: es una habilidad que todos los seres humanos poseemos y que puede desarrollarse con práctica y condiciones adecuadas.",
                    extra: "En Guatemala, muchos docentes subestiman su propia creatividad porque la asocian solo con el arte. En realidad, adaptar una clase con pocos recursos ya es un acto creativo."
                },
                {
                    id: 2,
                    type: "content",
                    title: "Mitos sobre la creatividad",
                    content: "Mito 1: 'La creatividad es innata, o la tienes o no.' Mito 2: 'Solo los artistas son creativos.' Mito 3: 'La creatividad no tiene lugar en matemáticas o ciencias.' Los tres son falsos. La investigación demuestra que la creatividad puede aprenderse y enseñarse en cualquier área.",
                    extra: "Sir Ken Robinson afirma que los sistemas educativos tradicionales 'matan' la creatividad al priorizar la memorización sobre la exploración. ¿Reconoces algún patrón así en tu contexto?"
                },
                {
                    id: 3,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál de las siguientes afirmaciones sobre la creatividad es CORRECTA?",
                    options: [
                        "La creatividad es un talento innato que no se puede desarrollar.",
                        "Solo las personas que trabajan en artes son creativas.",
                        "La creatividad es una habilidad que cualquier persona puede desarrollar con práctica.",
                        "La creatividad no tiene aplicación en materias como matemáticas."
                    ],
                    correct: 2,
                    explanation: "La creatividad es una habilidad humana universal que puede cultivarse. La investigación en neurociencia y educación confirma que todos podemos volvernos más creativos con las condiciones y prácticas adecuadas."
                },
                {
                    id: 4,
                    type: "content",
                    title: "¿Por qué la creatividad importa hoy?",
                    content: "El Foro Económico Mundial identifica la creatividad como una de las tres habilidades más importantes para el siglo XXI. En un mundo donde la inteligencia artificial puede realizar tareas rutinarias, la capacidad de generar ideas originales, resolver problemas nuevos y adaptarse se vuelve esencial.",
                    extra: "Para tus estudiantes guatemaltecos, la creatividad no es un lujo: es una herramienta de resiliencia ante contextos cambiantes y recursos limitados."
                },
                {
                    id: 5,
                    type: "content",
                    title: "Creatividad y educación STEAM",
                    content: "STEAM integra Ciencias, Tecnología, Ingeniería, Arte y Matemáticas precisamente porque reconoce que el pensamiento creativo es el puente entre disciplinas. Un estudiante que aprende a crear no solo acumula conocimiento: aprende a transformarlo.",
                    extra: "Ejemplo local: un estudiante que diseña un sistema de riego con materiales reciclados está aplicando ciencias, ingeniería Y creatividad al mismo tiempo."
                },
                {
                    id: 6,
                    type: "content",
                    title: "Creatividad vs. originalidad",
                    content: "Ser creativo no significa inventar algo desde cero. Significa combinar ideas existentes de maneras nuevas y útiles. Picasso decía: 'Los buenos artistas copian, los grandes artistas roban' —en el sentido de que transforman e integran influencias en algo propio.",
                    extra: "En el aula: no necesitas inventar actividades completamente nuevas. Puedes tomar una estrategia conocida y adaptarla a tu contexto, tu grupo y tu objetivo."
                },
                {
                    id: 7,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "Según el Foro Económico Mundial, ¿por qué la creatividad es tan importante para el siglo XXI?",
                    options: [
                        "Porque reemplaza la necesidad de conocimiento técnico.",
                        "Porque permite a las personas generar ideas originales y adaptarse ante un mundo cambiante.",
                        "Porque es la única habilidad que los robots no pueden aprender.",
                        "Porque es más importante que la lectura y la escritura."
                    ],
                    correct: 1,
                    explanation: "En un mundo donde la automatización realiza tareas rutinarias, la creatividad —la capacidad de generar ideas originales, resolver problemas nuevos y adaptarse— se convierte en una ventaja humana fundamental."
                },
                {
                    id: 8,
                    type: "content",
                    title: "El ciclo creativo",
                    content: "La creatividad rara vez es un destello repentino. Generalmente sigue un ciclo: 1) Preparación (absorber información y experiencias), 2) Incubación (dejar que las ideas 'reposent'), 3) Iluminación (el momento 'eureka'), 4) Verificación (evaluar y perfeccionar la idea).",
                    extra: "Implicación para el aula: dar tiempo y espacio es parte de enseñar creatividad. No todo debe resolverse en 45 minutos."
                },
                {
                    id: 9,
                    type: "content",
                    title: "Creatividad colectiva",
                    content: "Aunque imaginamos la creatividad como algo individual, gran parte de la innovación ocurre en grupos. Pixar, por ejemplo, tiene procesos sistemáticos de retroalimentación colectiva. En el aula, crear condiciones para que los estudiantes piensen juntos es tan valioso como el trabajo individual.",
                    extra: "Una dinámica sencilla: al terminar un proyecto, organiza una 'galería de ideas' donde los grupos presenten sus soluciones y los demás dejen comentarios positivos en notas adhesivas."
                },
                {
                    id: 10,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es el orden correcto de las etapas del ciclo creativo?",
                    options: [
                        "Iluminación → Preparación → Incubación → Verificación",
                        "Preparación → Incubación → Iluminación → Verificación",
                        "Verificación → Preparación → Iluminación → Incubación",
                        "Incubación → Iluminación → Preparación → Verificación"
                    ],
                    correct: 1,
                    explanation: "El ciclo creativo comienza con la Preparación (acumular experiencias e información), sigue con la Incubación (procesamiento inconsciente), luego viene la Iluminación (la idea surge) y finalmente la Verificación (se evalúa y perfecciona la idea)."
                }
            ]
        },
        {
            id: 2,
            title: "🧠 Módulo 2: El cerebro creativo: cómo funciona",
            cards: [
                {
                    id: 11,
                    type: "content",
                    title: "Neurociencia básica de la creatividad",
                    content: "Durante décadas se creyó que la creatividad residía en el hemisferio derecho del cerebro. Hoy sabemos que es mucho más complejo: la creatividad involucra múltiples redes neuronales que trabajan en conjunto, especialmente la Red de Modo Predeterminado (asociada con la imaginación) y la Red de Control Ejecutivo (que evalúa ideas).",
                    extra: "No necesitas ser neurocientífico para aplicar esto: lo importante es saber que la creatividad requiere tanto libertad para explorar COMO capacidad para evaluar y refinar ideas."
                },
                {
                    id: 12,
                    type: "content",
                    title: "Pensamiento divergente",
                    content: "El pensamiento divergente es la capacidad de generar MUCHAS ideas posibles ante un problema o estímulo. Es la fase 'abierta' de la creatividad: no juzgamos, no descartamos, solo generamos. El objetivo es la cantidad y variedad, no la calidad inmediata.",
                    extra: "Ejemplo de actividad: 'Listemos 20 usos posibles para un clip.' No hay respuestas malas. Esta es la esencia del brainstorming."
                },
                {
                    id: 13,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Qué caracteriza principalmente al pensamiento divergente?",
                    options: [
                        "Encontrar la única respuesta correcta a un problema.",
                        "Evaluar críticamente cada idea antes de aceptarla.",
                        "Generar la mayor cantidad posible de ideas sin juzgarlas.",
                        "Seguir un proceso lógico paso a paso."
                    ],
                    correct: 2,
                    explanation: "El pensamiento divergente se trata de generar múltiples ideas posibles sin juzgarlas de inmediato. Es la fase 'abierta' de la creatividad donde la cantidad y variedad de ideas importan más que su calidad inicial."
                },
                {
                    id: 14,
                    type: "content",
                    title: "Pensamiento convergente",
                    content: "El pensamiento convergente es el complemento del divergente: es la capacidad de EVALUAR y SELECCIONAR entre las ideas generadas para elegir la más adecuada. Es el pensamiento que analiza, compara, critica constructivamente y llega a soluciones.",
                    extra: "La creatividad productiva necesita AMBOS tipos de pensamiento. Primero abrimos (divergente), luego cerramos (convergente). El error común es converger demasiado pronto, descartando ideas antes de explorarlas."
                },
                {
                    id: 15,
                    type: "content",
                    title: "El papel de las emociones en la creatividad",
                    content: "Las emociones positivas —curiosidad, alegría, sorpresa— amplían nuestra capacidad de generar ideas (lo que los psicólogos llaman 'broaden and build'). El estrés crónico y el miedo al error, por el contrario, bloquean la creatividad al activar respuestas defensivas en el cerebro.",
                    extra: "Implicación directa para el aula: un ambiente emocionalmente seguro no es 'bonito tener', es condición necesaria para que emerja la creatividad de tus estudiantes."
                },
                {
                    id: 16,
                    type: "content",
                    title: "La importancia del juego",
                    content: "Estudios en neurociencia muestran que el juego activa las mismas redes cerebrales que la creatividad. Cuando jugamos, bajamos la guardia, exploramos sin miedo al fracaso y combinamos elementos de maneras inesperadas. El juego no es lo opuesto del trabajo serio: es su precursor.",
                    extra: "En el aula guatemalteca: incorporar elementos lúdicos no significa perder el tiempo. Una actividad de 5 minutos de juego libre puede desbloquear 40 minutos de trabajo creativo profundo."
                },
                {
                    id: 17,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Qué efecto tienen las emociones positivas como la curiosidad y la alegría sobre la creatividad?",
                    options: [
                        "La reducen porque distraen del pensamiento lógico.",
                        "No tienen ningún efecto sobre la capacidad creativa.",
                        "La amplifican al abrir la mente a más posibilidades.",
                        "La bloquean porque generan demasiada energía."
                    ],
                    correct: 2,
                    explanation: "Las emociones positivas amplían nuestra capacidad de generar ideas (teoría 'broaden and build'). Por eso un ambiente emocionalmente seguro y positivo en el aula es condición necesaria para que emerja la creatividad."
                },
                {
                    id: 18,
                    type: "content",
                    title: "Incubación: el poder de descansar",
                    content: "Cuando parece que 'no se nos ocurre nada', puede ser que nuestro cerebro necesita tiempo para procesar en segundo plano. La fase de incubación ocurre cuando dejamos de esforzarnos conscientemente —durante un paseo, al bañarnos, al dormir— y el inconsciente trabaja en las conexiones.",
                    extra: "Estrategia práctica: si tus estudiantes están atascados en un problema creativo, anímalos a 'dejarlo reposar' y volver en 10 minutos. Con frecuencia, la solución aparece en ese intervalo."
                },
                {
                    id: 19,
                    type: "content",
                    title: "Conexiones inesperadas: la clave de la creatividad",
                    content: "Investigadores como Sarnoff Mednick propusieron que la creatividad es esencialmente la capacidad de hacer conexiones remotas entre conceptos que normalmente no se asocian. Las personas más creativas tienen una red mental más amplia y son más capaces de conectar ideas distantes.",
                    extra: "Actividad para el aula: 'Analogías forzadas'. Pide a tus estudiantes que expliquen cómo la fotosíntesis se parece a una cocina, o cómo una célula es como una escuela. El ejercicio de conectar lo distante entrena la mente creativa."
                },
                {
                    id: 20,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Qué es la 'incubación' en el proceso creativo?",
                    options: [
                        "Una técnica para generar ideas rápidamente bajo presión.",
                        "El período en que el cerebro procesa ideas inconscientemente mientras descansamos.",
                        "Una estrategia para evaluar críticamente las ideas generadas.",
                        "El momento de presentar las ideas al grupo."
                    ],
                    correct: 1,
                    explanation: "La incubación es la fase en que dejamos de esforzarnos conscientemente en un problema y el cerebro sigue procesando en segundo plano. Ocurre durante descansos, paseos o el sueño, y con frecuencia produce los 'momentos eureka'."
                }
            ]
        },
        {
            id: 3,
            title: "🛠️ Módulo 3: Técnicas para despertar la creatividad",
            cards: [
                {
                    id: 21,
                    type: "content",
                    title: "Brainstorming: la tormenta de ideas",
                    content: "El brainstorming, creado por Alex Osborn en los años 40, es la técnica más conocida para generar ideas. Sus reglas básicas son: 1) No criticar ninguna idea durante la generación, 2) Buscar cantidad antes que calidad, 3) Construir sobre las ideas de otros, 4) Permitir ideas inusuales o exageradas.",
                    extra: "Variante para el aula: 'Brainwriting'. En lugar de decir las ideas en voz alta, cada estudiante las escribe en papel y los pasa al siguiente. Esto reduce la presión de hablar en público y produce más ideas en grupos tímidos."
                },
                {
                    id: 22,
                    type: "content",
                    title: "SCAMPER: preguntas que transforman",
                    content: "SCAMPER es un acrónimo de preguntas para modificar ideas existentes: Sustituir, Combinar, Adaptar, Modificar/Magnificar, Proponer otros usos, Eliminar, Reorganizar/Invertir. Se aplica tomando cualquier objeto, proceso o concepto y haciéndole cada una de estas preguntas.",
                    extra: "Ejemplo: toma una silla de salón. ¿Qué podría sustituirse? (las patas por ruedas). ¿Qué se podría combinar? (con una mochila). ¿Cómo adaptarla para niños con discapacidad motora? SCAMPER genera docenas de ideas en minutos."
                },
                {
                    id: 23,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "En la técnica SCAMPER, ¿qué representa la letra 'A'?",
                    options: [
                        "Ampliar",
                        "Asociar",
                        "Adaptar",
                        "Agregar"
                    ],
                    correct: 2,
                    explanation: "En SCAMPER, la 'A' representa Adaptar: preguntarte cómo podrías adaptar el objeto, proceso o idea a otro contexto, uso o grupo de personas. Es una de las preguntas más poderosas para generar variantes creativas."
                },
                {
                    id: 24,
                    type: "content",
                    title: "Mapas mentales",
                    content: "Los mapas mentales, popularizados por Tony Buzan, son diagramas que parten de una idea central y se ramifican hacia conceptos relacionados. Imitan la forma en que el cerebro asocia ideas y permiten visualizar conexiones que no son evidentes en listas lineales.",
                    extra: "Para el aula: un mapa mental creado entre todos en el pizarrón antes de un proyecto es una excelente herramienta de activación. Empieza con la pregunta central en el medio y pide que cada quien agregue una rama con lo que sabe o quiere explorar."
                },
                {
                    id: 25,
                    type: "content",
                    title: "Pensamiento lateral de De Bono",
                    content: "Edward de Bono acuñó el término 'pensamiento lateral' para describir la capacidad de resolver problemas desde ángulos inesperados, en lugar de seguir el camino lógico obvio. Sus herramientas incluyen los '6 Sombreros para Pensar', que asignan roles de pensamiento diferentes a los miembros de un grupo.",
                    extra: "Los 6 sombreros: Blanco (datos), Rojo (emociones), Negro (riesgos), Amarillo (optimismo), Verde (creatividad), Azul (proceso). Usarlos en una discusión de clase garantiza que se exploren todos los ángulos de un problema."
                },
                {
                    id: 26,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "En la técnica de los '6 Sombreros para Pensar' de De Bono, ¿qué representa el sombrero VERDE?",
                    options: [
                        "Pensar en los riesgos y peligros de una idea.",
                        "Analizar los datos y hechos disponibles.",
                        "Expresar emociones e intuiciones sobre el tema.",
                        "Generar ideas creativas y alternativas nuevas."
                    ],
                    correct: 3,
                    explanation: "El sombrero verde representa el pensamiento creativo: generar nuevas ideas, alternativas y posibilidades sin juzgarlas. Es el sombrero de la creatividad y la innovación dentro de la dinámica de los 6 sombreros."
                },
                {
                    id: 27,
                    type: "content",
                    title: "La técnica del 'Sí, y...'",
                    content: "Tomada del teatro de improvisación, la regla 'Sí, y...' consiste en aceptar lo que dice tu compañero (sí) y añadir algo nuevo encima (y). Esto crea cadenas de ideas donde cada aportación construye sobre la anterior, sin bloqueos ni juicios.",
                    extra: "Contrástala con la trampa del 'Sí, pero...': cada vez que decimos 'pero', estamos bloqueando la idea anterior. En el aula, practicar 'Sí, y...' entrena la escucha activa y la construcción colaborativa."
                },
                {
                    id: 28,
                    type: "content",
                    title: "El método de la pregunta poderosa",
                    content: "Las preguntas creativas transforman la forma en que vemos un problema. En lugar de '¿Cómo puedo enseñar fracciones?', pregunta '¿Cómo podrían MIS ESTUDIANTES descubrir las fracciones por sí mismos?' El simple cambio de perspectiva en la pregunta genera respuestas completamente distintas.",
                    extra: "Técnica: el '¿Y si...?' creativo. ¿Y si no hubiera pizarrón? ¿Y si la clase fuera al revés (estudiantes enseñan)? ¿Y si tuviéramos que explicar este tema a niños de 5 años? Cada pregunta abre un universo de posibilidades."
                },
                {
                    id: 29,
                    type: "content",
                    title: "Restricciones como motor creativo",
                    content: "Paradójicamente, las restricciones pueden potenciar la creatividad. Cuando tenemos recursos ilimitados, la mente divaga; cuando hay restricciones claras, la mente se enfoca y busca soluciones ingeniosas dentro de esos límites. Esta es la lógica del haiku, del Twitter o del diseño con presupuesto limitado.",
                    extra: "Para el aula guatemalteca: la falta de recursos no es un obstáculo para la creatividad, puede ser su mejor detonador. 'Con solo papel periódico y cinta adhesiva, construyan un puente que soporte 500 gramos.' El reto limitado activa la ingeniosidad."
                },
                {
                    id: 30,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Por qué las RESTRICCIONES pueden potenciar la creatividad?",
                    options: [
                        "Porque reducen el número de ideas que se pueden generar.",
                        "Porque obligan a la mente a encontrar soluciones ingeniosas dentro de límites definidos.",
                        "Porque eliminan la necesidad de pensamiento divergente.",
                        "Porque hacen que la actividad sea más fácil de completar."
                    ],
                    correct: 1,
                    explanation: "Las restricciones enfocan la mente y la obligan a ser ingeniosa dentro de límites específicos. Paradójicamente, tener recursos o posibilidades ilimitadas puede inhibir la creatividad, mientras que las restricciones claras la activan."
                }
            ]
        },
        {
            id: 4,
            title: "🏫 Módulo 4: Ambientes creativos en el aula",
            cards: [
                {
                    id: 31,
                    type: "content",
                    title: "¿Qué es un ambiente creativo?",
                    content: "Un ambiente creativo es el conjunto de condiciones físicas, emocionales y relacionales que hacen posible que las personas generen y compartan ideas. No depende solo del espacio físico: una sala sin ventanas puede ser altamente creativa si hay confianza, apertura y propósito.",
                    extra: "Las cuatro dimensiones de un ambiente creativo: 1) Seguridad emocional, 2) Estímulo sensorial adecuado, 3) Tiempo y espacio para explorar, 4) Recursos y materiales accesibles."
                },
                {
                    id: 32,
                    type: "content",
                    title: "El error como parte del aprendizaje",
                    content: "En ambientes creativos, el error no es un fracaso sino información. Thomas Edison probó más de 1,000 materiales antes de encontrar el filamento correcto para la bombilla. La pregunta no es '¿Lo hiciste bien?' sino '¿Qué aprendiste de lo que no funcionó?'",
                    extra: "Herramienta práctica: el 'Muro de los Errores Gloriosos'. Dedica un espacio en tu aula donde los estudiantes peguen notas sobre un error que cometieron y qué les enseñó. Normaliza el error como parte del proceso."
                },
                {
                    id: 33,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la actitud más adecuada hacia el error en un ambiente creativo de aprendizaje?",
                    options: [
                        "El error debe evitarse a toda costa porque genera malos hábitos.",
                        "El error es aceptable solo si ocurre en actividades artísticas.",
                        "El error es fuente de información y parte natural del proceso de aprendizaje.",
                        "El error debe corregirse de inmediato para no reforzarlo."
                    ],
                    correct: 2,
                    explanation: "En ambientes creativos, el error es visto como información valiosa, no como fracaso. Esta mentalidad ('growth mindset') permite que los estudiantes tomen riesgos intelectuales y exploren con mayor profundidad."
                },
                {
                    id: 34,
                    type: "content",
                    title: "La organización del espacio físico",
                    content: "Aunque no siempre podemos cambiar la arquitectura de nuestro salón, sí podemos modificar la disposición del mobiliario. Las mesas en isla favorecen la colaboración; las paredes con espacio para exhibir trabajos comunican que las ideas de los estudiantes son valiosas; los rincones de exploración invitan a la autonomía.",
                    extra: "Pequeño cambio, gran impacto: si tu aula tiene mesas fijas, puedes girar tu posición y la de los estudiantes, crear zonas en el suelo con cojines para brainstorming, o designar una pared como 'pizarrón de ideas' con papel periódico."
                },
                {
                    id: 35,
                    type: "content",
                    title: "Preguntas que abren vs. preguntas que cierran",
                    content: "Las preguntas que hacemos determinan el tipo de pensamiento que invitamos. Preguntas cerradas ('¿Cuál es la capital de Guatemala?') tienen una sola respuesta correcta. Preguntas abiertas ('¿Cómo crees que el clima afecta la cultura de un país?') invitan a explorar, opinar y crear.",
                    extra: "Reto para esta semana: cuenta cuántas preguntas cerradas y abiertas haces en una clase típica. Luego, intenta transformar tres preguntas cerradas en abiertas. Observa cómo cambia la dinámica."
                },
                {
                    id: 36,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál de las siguientes es una pregunta ABIERTA que promueve el pensamiento creativo?",
                    options: [
                        "¿En qué año se firmó el acuerdo de paz en Guatemala?",
                        "¿Cuántos lados tiene un triángulo?",
                        "¿De qué color es el cielo?",
                        "¿Cómo crees que cambiaría Guatemala si todos tuviéramos acceso a internet?"
                    ],
                    correct: 3,
                    explanation: "La pregunta sobre cómo cambiaría Guatemala con acceso universal a internet es abierta: no tiene una sola respuesta correcta, invita a explorar, imaginar y argumentar. Ese tipo de preguntas activan el pensamiento creativo y crítico."
                },
                {
                    id: 37,
                    type: "content",
                    title: "El tiempo como recurso creativo",
                    content: "La creatividad necesita tiempo. Cuando los estudiantes (y los docentes) están permanentemente en modo de 'urgencia', el cerebro no puede hacer las conexiones lentas que producen ideas genuinamente creativas. Google tiene famosa su regla del 20%: los empleados pueden dedicar el 20% de su tiempo a proyectos propios.",
                    extra: "Adaptación para el aula: reserva 10 minutos semanales de 'tiempo libre de exploración'. Pueden dibujar, construir, escribir o simplemente pensar. Ese tiempo aparentemente 'perdido' nutre la creatividad durante el resto de la semana."
                },
                {
                    id: 38,
                    type: "content",
                    title: "Proyectos creativos interdisciplinares",
                    content: "Los proyectos que cruzan fronteras entre materias estimulan conexiones creativas. Un proyecto de 'diseño de una ciudad del futuro' puede involucrar matemáticas (geometría, proporciones), ciencias (energía sostenible), lenguaje (argumentación), sociales (convivencia) y arte (representación visual).",
                    extra: "Punto de partida sencillo: elige un problema real de tu comunidad (basura, agua, transporte) y diseña con tu grado un proyecto que lo aborde desde varias materias. El contexto real multiplica la motivación."
                },
                {
                    id: 39,
                    type: "content",
                    title: "Evaluación en ambientes creativos",
                    content: "La evaluación tradicional (examen, nota numérica) puede frenar la creatividad si los estudiantes sienten que ser diferentes o arriesgarse tiene costo. Los portafolios, las rúbricas que valoran el proceso (no solo el producto) y la autoevaluación son herramientas más compatibles con ambientes creativos.",
                    extra: "Rúbrica creativa sencilla: evalúa 1) ¿El estudiante intentó algo nuevo?, 2) ¿Puede explicar su proceso?, 3) ¿Aprendió de lo que no funcionó? Estas preguntas valoran la mentalidad creativa, no solo el resultado final."
                },
                {
                    id: 40,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Por qué los portafolios son más compatibles con ambientes creativos que los exámenes tradicionales?",
                    options: [
                        "Porque son más fáciles de calificar para el docente.",
                        "Porque eliminan la necesidad de evaluar a los estudiantes.",
                        "Porque permiten valorar el proceso creativo y la evolución del estudiante, no solo el producto final.",
                        "Porque los estudiantes prefieren no hacer exámenes."
                    ],
                    correct: 2,
                    explanation: "Los portafolios documentan el proceso creativo a lo largo del tiempo: muestran borradores, errores, revisiones y aprendizajes. Esto los hace mucho más ricos para evaluar la creatividad que un examen que solo captura un momento final."
                }
            ]
        },
        {
            id: 5,
            title: "🌟 Módulo 5: El docente como modelo creativo",
            cards: [
                {
                    id: 41,
                    type: "content",
                    title: "El docente creativo: más que técnicas",
                    content: "Enseñar creatividad no es solo aplicar técnicas: es encarnarla. Los estudiantes aprenden más de lo que VEN que de lo que escuchan. Un docente que admite no saber la respuesta, que experimenta frente a su clase, que celebra las ideas inusuales, está modelando una mentalidad creativa con más poder que cualquier manual.",
                    extra: "Pregunta de reflexión: ¿Cuándo fue la última vez que intentaste algo nuevo en tu clase, aunque no estuvieras seguro del resultado? La respuesta dice mucho sobre qué modelo eres para tus estudiantes."
                },
                {
                    id: 42,
                    type: "content",
                    title: "Autoliderazgo creativo docente",
                    content: "El autoliderazgo creativo implica tomar responsabilidad de tu propio desarrollo como pensador y creador. Implica cultivar hábitos como: leer fuera de tu área, buscar experiencias nuevas, cuestionar tus rutinas pedagógicas, conectar con otros docentes para cruzar ideas y reflexionar regularmente sobre tu práctica.",
                    extra: "Hábito de 5 minutos: al terminar cada semana, anota una cosa que hiciste igual que siempre y una cosa que intentaste diferente. Con el tiempo, este pequeño registro se convierte en un mapa de tu crecimiento creativo."
                },
                {
                    id: 43,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Qué significa que un docente sea 'modelo creativo' para sus estudiantes?",
                    options: [
                        "Que domina todas las técnicas de creatividad y las aplica perfectamente.",
                        "Que tiene un título en artes o diseño creativo.",
                        "Que experimenta, admite sus dudas y celebra las ideas inusuales frente a sus estudiantes.",
                        "Que prepara clases muy elaboradas y visualmente atractivas."
                    ],
                    correct: 2,
                    explanation: "Ser modelo creativo significa encarnar la mentalidad creativa: atreverse a experimentar, admitir incertidumbre y celebrar las ideas diferentes. Los estudiantes aprenden más de los comportamientos que observan que de las instrucciones que reciben."
                },
                {
                    id: 44,
                    type: "content",
                    title: "Superar el miedo al ridículo",
                    content: "Uno de los mayores inhibidores de la creatividad docente es el miedo a verse poco profesional, a que las actividades 'no funcionen' o a perder autoridad. Pero la autoridad real no viene de parecer infalible: viene de la confianza que construimos cuando somos auténticos y cuando los estudiantes ven que nos atrevemos.",
                    extra: "Ejercicio de coraje creativo: escoge una actividad que nunca hayas intentado (role play, sketch teatral, experimento casero) y hazla el próximo lunes. Sin importar cómo salga, procésala con tus estudiantes: '¿Qué salió bien? ¿Qué haríamos diferente?'"
                },
                {
                    id: 45,
                    type: "content",
                    title: "Comunidades de práctica creativa",
                    content: "El docente creativo no trabaja solo. Las comunidades de práctica —grupos de docentes que se reúnen regularmente para compartir estrategias, co-diseñar clases y darse retroalimentación— multiplican la capacidad creativa individual. Una buena idea compartida se vuelve cinco ideas mejores.",
                    extra: "Primer paso: identifica a dos o tres colegas en tu escuela con quienes puedas reunirte 30 minutos al mes para compartir 'lo que funcionó'. No necesitas una estructura formal: basta con la conversación honesta y el compromiso de regresar."
                },
                {
                    id: 46,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es un beneficio clave de las comunidades de práctica creativa entre docentes?",
                    options: [
                        "Permiten que los docentes deleguen su planificación a otros.",
                        "Multiplican las ideas al compartir y construir sobre las experiencias de colegas.",
                        "Eliminan la necesidad de formación individual continua.",
                        "Garantizan que todas las clases sigan el mismo formato creativo."
                    ],
                    correct: 1,
                    explanation: "Las comunidades de práctica multiplican la creatividad: cuando los docentes comparten estrategias y se dan retroalimentación, una idea se transforma y mejora colectivamente. La creatividad colaborativa supera a la individual."
                },
                {
                    id: 47,
                    type: "content",
                    title: "Fuentes de inspiración para el docente",
                    content: "Los docentes creativos nutren su imaginación constantemente: leen libros fuera de su área, visitan museos o mercados artesanales, escuchan podcasts, observan cómo aprenden los niños fuera de la escuela, experimentan con nuevas recetas, practican un hobby. La creatividad pedagógica se alimenta de una vida rica en experiencias.",
                    extra: "Lista de inspiración práctica para contexto guatemalteco: explorar los textiles mayas y sus patrones geométricos, conocer la historia de inventores guatemaltecos, visitar comunidades con saberes ancestrales. La cultura local es una fuente inagotable."
                },
                {
                    id: 48,
                    type: "content",
                    title: "El diario creativo docente",
                    content: "Llevar un diario de práctica creativa es una herramienta poderosa de autoliderazgo. No tiene que ser literario: puede incluir bocetos, listas de ideas, preguntas sin respuesta, fragmentos de conversaciones con estudiantes que te sorprendieron, actividades que quieres probar.",
                    extra: "Formato mínimo viable: un cuaderno simple. Cada semana, responde tres preguntas: ¿Qué probé de nuevo? ¿Qué aprendí de mis estudiantes esta semana? ¿Qué quiero intentar la próxima?"
                },
                {
                    id: 49,
                    type: "content",
                    title: "Tu plan de creatividad para el aula",
                    content: "Al completar este curso, es momento de comprometerte con acciones concretas. Un plan creativo no necesita ser perfecto: necesita ser tuyo. Elige una técnica que aplicarás esta semana, un cambio en el ambiente de tu aula que harás este mes, y una comunidad de práctica que buscarás construir este trimestre.",
                    extra: "Recuerda: la creatividad no es un destino, es una práctica. Cada pequeña decisión de hacer algo diferente acumula una cultura de creatividad en tu aula que transforma vidas."
                },
                {
                    id: 50,
                    type: "quiz",
                    title: "✅ Reflexión final del curso",
                    question: "¿Cuál de las siguientes afirmaciones resume mejor el mensaje central de este curso?",
                    options: [
                        "La creatividad es un talento que algunos docentes tienen y otros no.",
                        "Para ser creativo, un docente necesita muchos recursos materiales y tecnológicos.",
                        "La creatividad es una habilidad que cualquier docente puede cultivar y que transforma el aprendizaje cuando se modela y se practica conscientemente.",
                        "La creatividad en el aula consiste principalmente en hacer actividades artísticas."
                    ],
                    correct: 2,
                    explanation: "Este curso sostiene que la creatividad es una habilidad universal, cultivable, que va mucho más allá del arte. Cuando un docente la práctica conscientemente —usando técnicas, creando ambientes seguros y modelándola con su propia actitud— transforma profundamente la experiencia de aprendizaje de sus estudiantes."
                }
            ]
        }
    ]
},
// CURSO: herramientas-tec
{
    id: 'herramientas-tec',
    title: 'Herramientas Tecnológicas para Docentes',
    subtitle: 'Integra la tecnología con sentido pedagógico en tu aula',
    icon: '💻',
    color: '#4A90D9',
    prerequisite: [],
    status: 'available',
    durationHours: 4,
    totalCards: 45,
    modules: [
        {
            id: 1,
            title: "🎯 Módulo 1: Tecnología con propósito pedagógico",
            cards: [
                {
                    id: 1,
                    type: "content",
                    title: "Tecnología no es magia: es una herramienta",
                    content: "Usar tecnología en el aula no garantiza aprendizaje. Un video proyectado sin reflexión o un Kahoot sin discusión posterior son tan poco efectivos como una clase magistral sin participación. La diferencia la hace el propósito pedagógico: ¿para qué usas esta herramienta? ¿Qué aprenderán tus estudiantes con ella?",
                    extra: "Pregunta clave antes de usar cualquier herramienta tecnológica: '¿Podría lograr el mismo objetivo de aprendizaje sin esta tecnología?' Si la respuesta es sí, quizás la tecnología no está añadiendo valor real."
                },
                {
                    id: 2,
                    type: "content",
                    title: "El modelo SAMR: cuatro niveles de integración",
                    content: "El modelo SAMR (creado por Ruben Puentedura) describe cuatro niveles de uso de tecnología en educación: Sustitución (la tecnología reemplaza al cuaderno sin cambiar la tarea), Aumento (añade funciones útiles), Modificación (rediseña la tarea), Redefinición (permite tareas imposibles sin tecnología).",
                    extra: "Ejemplo: Sustitución = escribir en Google Docs en lugar de cuaderno. Redefinición = colaborar en tiempo real con estudiantes de otra escuela en un mismo documento. El objetivo es moverse gradualmente hacia la Redefinición."
                },
                {
                    id: 3,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "Según el modelo SAMR, ¿cuál de los siguientes usos representa el nivel más ALTO de integración tecnológica?",
                    options: [
                        "El estudiante escribe su tarea en Google Docs en lugar de cuaderno.",
                        "El estudiante usa el corrector automático de Google Docs para revisar su texto.",
                        "El estudiante crea un blog multilingüe en colaboración con estudiantes de otro país.",
                        "El estudiante busca información en internet para hacer su tarea."
                    ],
                    correct: 2,
                    explanation: "Crear un blog colaborativo con estudiantes de otro país es Redefinición: es una tarea completamente nueva que sería imposible sin tecnología. Los otros ejemplos representan Sustitución o Aumento, niveles más básicos del modelo SAMR."
                },
                {
                    id: 4,
                    type: "content",
                    title: "Conectividad en Guatemala: realidad y soluciones",
                    content: "No todos los contextos guatemaltecos tienen acceso estable a internet. Es esencial conocer la realidad de tu aula: ¿Cuántos estudiantes tienen smartphone en casa? ¿Hay WiFi en la escuela? Las estrategias tecnológicas deben adaptarse a estas condiciones, no ignorarlas.",
                    extra: "Soluciones para conectividad limitada: muchas herramientas tienen modo offline (Google Docs, Canva). Se pueden preparar actividades en el aula con una sola computadora o tablet proyectada. Las apps ligeras consumen menos datos. El whatsapp grupal puede funcionar como plataforma básica de comunicación."
                },
                {
                    id: 5,
                    type: "content",
                    title: "Taxonomía de Bloom y tecnología",
                    content: "La Taxonomía de Bloom revisada describe niveles de pensamiento desde recordar (bajo) hasta crear (alto). La tecnología puede apoyar todos los niveles: videos para recordar, cuestionarios para comprender, simulaciones para aplicar, foros para analizar, rúbricas digitales para evaluar y herramientas maker para crear.",
                    extra: "Trampa común: la mayoría de los usos tecnológicos en el aula se quedan en los niveles bajos (recordar, comprender). El reto es usar la tecnología para que los estudiantes lleguen a los niveles altos: analizar, evaluar y crear."
                },
                {
                    id: 6,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "Un docente pide a sus estudiantes que graben un video explicando un concepto científico con sus propias palabras y analogías. ¿En qué nivel de la Taxonomía de Bloom se ubica esta actividad?",
                    options: [
                        "Recordar",
                        "Comprender",
                        "Aplicar",
                        "Crear"
                    ],
                    correct: 3,
                    explanation: "Crear un video explicativo con analogías propias es un nivel de Creación (el más alto de la Taxonomía de Bloom): el estudiante no solo recuerda o comprende, sino que produce algo nuevo que sintetiza y comunica el conocimiento de manera original."
                },
                {
                    id: 7,
                    type: "content",
                    title: "Planificación tecnológica: el plan B siempre",
                    content: "La tecnología falla. El proyector no enciende, el WiFi se cae, la plataforma está en mantenimiento. El docente tecnológicamente competente no es el que nunca tiene problemas técnicos: es el que siempre tiene un plan B y puede continuar la clase sin perder el objetivo de aprendizaje.",
                    extra: "Lista de verificación pre-clase: 1) ¿Revisé el equipo con anticipación? 2) ¿Tengo los materiales descargados o en caché? 3) ¿Sé cómo continuar la clase si la tecnología falla? Si respondiste sí a las tres, estás listo."
                },
                {
                    id: 8,
                    type: "content",
                    title: "Derechos digitales de los estudiantes",
                    content: "Al integrar tecnología, los docentes debemos proteger los derechos digitales de los estudiantes: privacidad de sus datos, protección de su imagen, uso ético de sus producciones. Antes de publicar fotos o trabajos de estudiantes en internet, siempre se requiere consentimiento informado de padres y tutores.",
                    extra: "Regla de oro: no compartas fotos, nombres completos ni información personal de menores en redes sociales o plataformas públicas. Usa iniciales o seudónimos cuando compartas trabajos de estudiantes en línea."
                },
                {
                    id: 9,
                    type: "content",
                    title: "Inclusión digital: tecnología para todos",
                    content: "La tecnología puede ampliar la brecha educativa si solo beneficia a quienes tienen acceso. Un docente inclusivo diseña actividades donde la tecnología es el medio, no el requisito. Siempre piensa: ¿qué pasa con el estudiante que no tiene dispositivo en casa? ¿Cómo participa plenamente?",
                    extra: "Estrategia: el trabajo en equipos con roles rotativos (un equipo, una tablet) garantiza que todos participen. Las actividades tecnológicas en el aula durante el horario escolar son más equitativas que las tareas tecnológicas para casa."
                },
                {
                    id: 10,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la práctica más adecuada para proteger los derechos digitales de los estudiantes?",
                    options: [
                        "Publicar fotos de actividades del aula en redes sociales para mostrar el trabajo de la clase.",
                        "Solicitar consentimiento informado de padres antes de publicar imágenes o trabajos de estudiantes en línea.",
                        "Usar los nombres completos de los estudiantes en todas las plataformas digitales.",
                        "Compartir los correos electrónicos de los estudiantes con otras plataformas educativas."
                    ],
                    correct: 1,
                    explanation: "Siempre se requiere consentimiento informado de padres o tutores antes de publicar fotos, nombres o trabajos de estudiantes menores de edad en línea. Esta es una obligación ética y legal del docente."
                },
                {
                    id: 11,
                    type: "content",
                    title: "El docente como curador de tecnología",
                    content: "Existen miles de herramientas educativas digitales. No es posible —ni necesario— usarlas todas. El docente efectivo actúa como curador: selecciona pocas herramientas, las domina bien y las usa con propósito claro. Mejor dominar tres herramientas que conocer superficialmente treinta.",
                    extra: "Principio de economía tecnológica: elige herramientas que sean gratuitas, intuitivas, estables y que sirvan para múltiples propósitos. Canva, Google Classroom y Kahoot son buenos ejemplos: versátiles, gratuitos y con curvas de aprendizaje cortas."
                },
                {
                    id: 12,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es el enfoque más efectivo para integrar herramientas tecnológicas en el aula?",
                    options: [
                        "Usar la mayor cantidad posible de herramientas diferentes para mantener el interés.",
                        "Dominar pocas herramientas seleccionadas con criterio pedagógico y usarlas con propósito claro.",
                        "Usar solo las herramientas más recientes y de última generación.",
                        "Dejar que los estudiantes elijan qué herramientas usar sin guía del docente."
                    ],
                    correct: 1,
                    explanation: "La efectividad no viene de usar muchas herramientas, sino de usar pocas bien. Dominar a fondo herramientas seleccionadas permite al docente usarlas con más confianza, creatividad y propósito pedagógico claro."
                }
            ]
        },
        {
            id: 2,
            title: "🎨 Módulo 2: Herramientas para crear y presentar",
            cards: [
                {
                    id: 13,
                    type: "content",
                    title: "Canva para Educación: tu aliado visual",
                    content: "Canva es una plataforma de diseño gráfico gratuita (con versión Education ampliada) que permite crear presentaciones, infografías, carteles, videos cortos y materiales didácticos sin conocimientos de diseño profesional. Tiene miles de plantillas y es muy intuitiva.",
                    extra: "Canva for Education ofrece funciones premium gratuitas para docentes: puedes crear una clase, asignar proyectos de diseño a estudiantes, comentar sus trabajos y compartir plantillas. Regístrate con tu correo institucional en canva.com/education."
                },
                {
                    id: 14,
                    type: "content",
                    title: "Canva en el aula: más allá del cartel",
                    content: "Más allá de carteles, con Canva puedes crear: presentaciones interactivas, líneas de tiempo visuales, mapas conceptuales, newsletters para padres, rúbricas visuales, tarjetas de vocabulario, portadas de portafolios digitales y videos cortos con narración.",
                    extra: "Actividad práctica: pide a tus estudiantes que creen una 'infografía de una página' sobre el tema que están estudiando. Deben incluir datos clave, ilustraciones y un dato sorprendente. Canva hace que esta tarea sea accesible para cualquier edad."
                },
                {
                    id: 15,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál de las siguientes NO es una funcionalidad de Canva para Educación?",
                    options: [
                        "Crear presentaciones visuales con plantillas.",
                        "Asignar proyectos de diseño a estudiantes y comentar sus trabajos.",
                        "Realizar videoconferencias en tiempo real con toda la clase.",
                        "Diseñar infografías y materiales didácticos visuales."
                    ],
                    correct: 2,
                    explanation: "Canva no es una plataforma de videoconferencias. Su función principal es el diseño gráfico: crear presentaciones, infografías, videos cortos y materiales visuales. Para videoconferencias, se usan herramientas como Google Meet o Zoom."
                },
                {
                    id: 16,
                    type: "content",
                    title: "Genially: presentaciones que cobran vida",
                    content: "Genially es una plataforma para crear presentaciones interactivas, infografías animadas, escape rooms educativos, mapas interactivos y gamificaciones. A diferencia de una presentación estática, los contenidos en Genially pueden tener botones, videos incrustados, sonidos y rutas de navegación no lineales.",
                    extra: "Caso de uso poderoso: crear un 'escape room virtual' sobre el tema de la clase donde los estudiantes resuelven enigmas para 'salir'. Es altamente motivador y trabaja comprensión, resolución de problemas y trabajo en equipo. Genially tiene plantillas de escape room listas para personalizar."
                },
                {
                    id: 17,
                    type: "content",
                    title: "Google Slides: colaboración en tiempo real",
                    content: "Google Slides permite que varios estudiantes trabajen simultáneamente en la misma presentación desde dispositivos diferentes. Cada persona edita en tiempo real, puede comentar el trabajo de otros y el docente puede ver el progreso desde su cuenta. Es parte de Google Workspace for Education, gratuito para escuelas.",
                    extra: "Dinámica colaborativa: asigna a cada grupo de estudiantes una diapositiva de una presentación colectiva. El resultado final es un producto del grupo completo. Esta estrategia desarrolla responsabilidad individual y aprendizaje cooperativo al mismo tiempo."
                },
                {
                    id: 18,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la ventaja principal de usar Google Slides frente a PowerPoint tradicional en el aula?",
                    options: [
                        "Tiene más plantillas de diseño disponibles.",
                        "Permite la colaboración en tiempo real desde diferentes dispositivos sin necesidad de enviar archivos.",
                        "Funciona sin conexión a internet en todos los dispositivos.",
                        "Solo el docente puede editar la presentación, lo que evita errores."
                    ],
                    correct: 1,
                    explanation: "La ventaja clave de Google Slides es la colaboración en tiempo real: múltiples usuarios pueden editar simultáneamente desde cualquier dispositivo, sin necesidad de enviar archivos por correo. Esto transforma las presentaciones en herramientas de trabajo colaborativo."
                },
                {
                    id: 19,
                    type: "content",
                    title: "Videos educativos: crear con propósito",
                    content: "Los docentes pueden crear sus propios videos educativos cortos (3-7 minutos) con herramientas sencillas como Loom (grabación de pantalla con webcam), CapCut (edición móvil) o incluso la cámara del smartphone. Un buen video educativo no necesita producción Hollywood: necesita claridad, brevedad y conexión con el aprendizaje.",
                    extra: "Regla de los 3 minutos: los videos de menos de 3 minutos tienen tasas de visualización completa mucho más altas. Si tienes mucho que explicar, divide en partes. Un video de 3 minutos bien diseñado enseña más que uno de 20 minutos donde los estudiantes pierden el hilo."
                },
                {
                    id: 20,
                    type: "content",
                    title: "Curación de contenido digital",
                    content: "Curar contenido significa seleccionar, organizar y compartir recursos digitales de calidad (videos, artículos, imágenes) relacionados con los temas de clase. Herramientas como Wakelet o simplemente una carpeta de Google Drive compartida permiten crear 'colecciones de recursos' que los estudiantes pueden explorar con autonomía.",
                    extra: "Antes de compartir cualquier recurso digital con estudiantes, verifica: 1) ¿El contenido es apropiado para la edad? 2) ¿La fuente es confiable? 3) ¿Tiene licencia Creative Commons o permiso de uso? 4) ¿Está en un idioma accesible para tus estudiantes?"
                },
                {
                    id: 21,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la duración óptima recomendada para un video educativo que maximice la atención de los estudiantes?",
                    options: [
                        "Más de 30 minutos para cubrir el tema completo.",
                        "Entre 15 y 20 minutos, como una clase magistral.",
                        "Menos de 3 a 7 minutos, dividiendo temas largos en partes.",
                        "No importa la duración si el contenido es interesante."
                    ],
                    correct: 2,
                    explanation: "Los videos de 3 a 7 minutos tienen tasas de visualización completa mucho más altas. La atención decae significativamente después de ese tiempo. Para temas largos, es mejor crear series de videos cortos que un solo video extenso."
                },
                {
                    id: 22,
                    type: "content",
                    title: "Mentimeter: audiencias que participan",
                    content: "Mentimeter es una herramienta para crear presentaciones interactivas donde la audiencia responde en tiempo real desde sus dispositivos. Permite nubes de palabras, preguntas de opción múltiple, escalas de opinión y clasificaciones. Es ideal para activaciones, encuestas rápidas y cierre de clase.",
                    extra: "Uso creativo: al inicio de clase, proyecta una nube de palabras con la pregunta '¿Qué palabra asocias con el tema de hoy?' Los estudiantes responden desde sus teléfonos y la nube aparece en tiempo real. Es un activador de conocimiento previo visualmente impactante."
                },
                {
                    id: 23,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿En qué momento de la clase es más útil usar Mentimeter para crear una nube de palabras?",
                    options: [
                        "Al final del examen como actividad de celebración.",
                        "Durante la clase magistral para ilustrar conceptos.",
                        "Al inicio de clase para activar conocimiento previo de manera visual y participativa.",
                        "Solo en clases virtuales, no en presencial."
                    ],
                    correct: 2,
                    explanation: "La nube de palabras de Mentimeter es especialmente poderosa al inicio de clase: activa el conocimiento previo, hace visible lo que los estudiantes ya saben, genera curiosidad y permite al docente ajustar su clase según las respuestas en tiempo real."
                }
            ]
        },
        {
            id: 3,
            title: "📊 Módulo 3: Evaluación formativa digital",
            cards: [
                {
                    id: 24,
                    type: "content",
                    title: "¿Qué es la evaluación formativa?",
                    content: "La evaluación formativa es la que ocurre DURANTE el proceso de aprendizaje (no solo al final) con el objetivo de informar al docente y al estudiante sobre el progreso y ajustar la enseñanza. A diferencia de la evaluación sumativa (calificación final), la formativa sirve para mejorar, no para juzgar.",
                    extra: "Pregunta clave de la evaluación formativa: '¿Qué ajuste en mi enseñanza necesito hacer HOY, basándome en lo que acabo de observar?' Las herramientas digitales hacen posible obtener esa información al instante, de todo el grupo."
                },
                {
                    id: 25,
                    type: "content",
                    title: "Kahoot: gamificación de la evaluación",
                    content: "Kahoot es una plataforma de cuestionarios en tiempo real donde los estudiantes compiten respondiendo preguntas en sus dispositivos. La competencia, el tiempo limitado y el marcador visible generan alta motivación. Es excelente para repasos, verificación de comprensión y activaciones.",
                    extra: "Kahoot sin smartphone: si tus estudiantes no tienen dispositivos individuales, puedes jugar en equipos donde un representante por equipo responde en un solo dispositivo. También puedes exportar el Kahoot como hoja de trabajo impresa para uso sin internet."
                },
                {
                    id: 26,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es el principal propósito pedagógico de usar Kahoot en el aula?",
                    options: [
                        "Reemplazar los exámenes escritos tradicionales.",
                        "Verificar la comprensión de manera gamificada y obtener retroalimentación inmediata sobre el aprendizaje.",
                        "Calificar a los estudiantes de manera objetiva y sin sesgo.",
                        "Premiar a los estudiantes más inteligentes de la clase."
                    ],
                    correct: 1,
                    explanation: "Kahoot es principalmente una herramienta de evaluación formativa gamificada: verifica comprensión de manera entretenida y proporciona retroalimentación inmediata tanto al docente como a los estudiantes. No es una herramienta de calificación sumativa."
                },
                {
                    id: 27,
                    type: "content",
                    title: "Quizizz: evaluación a tu ritmo",
                    content: "Quizizz es similar a Kahoot pero con una diferencia clave: los estudiantes responden a su propio ritmo, sin la presión del tiempo colectivo. Esto reduce la ansiedad y permite que cada estudiante complete el cuestionario cuando esté listo. El docente ve los resultados en tiempo real y puede identificar qué preguntas presentaron mayor dificultad.",
                    extra: "Función 'Lección' de Quizizz: puedes intercalar diapositivas explicativas entre las preguntas. Si la mayoría de estudiantes falla una pregunta, aparece automáticamente una diapositiva de revisión. Es evaluación y enseñanza en el mismo instrumento."
                },
                {
                    id: 28,
                    type: "content",
                    title: "Padlet: el muro colaborativo digital",
                    content: "Padlet es un tablero digital donde los estudiantes pueden publicar notas, imágenes, videos, audios y enlaces. Funciona como un mural colaborativo virtual. Los docentes lo usan para lluvias de ideas colectivas, portafolios grupales, murales temáticos y reflexiones de cierre.",
                    extra: "Actividad con Padlet: 'El mural de lo que aprendimos'. Al finalizar una unidad, cada estudiante publica en el Padlet una cosa que aprendió, una pregunta que aún tiene y una foto o dibujo relacionado con el tema. El resultado es una síntesis visual del aprendizaje del grupo."
                },
                {
                    id: 29,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la diferencia principal entre Kahoot y Quizizz?",
                    options: [
                        "Kahoot es gratuito y Quizizz es de pago.",
                        "Kahoot solo funciona en computadoras y Quizizz en teléfonos.",
                        "En Quizizz los estudiantes responden a su propio ritmo, mientras en Kahoot todos responden al mismo tiempo bajo presión.",
                        "Quizizz no muestra los resultados al docente en tiempo real."
                    ],
                    correct: 2,
                    explanation: "La diferencia clave es el ritmo: Kahoot es sincrónico (todos al mismo tiempo, con presión de tiempo colectivo), mientras Quizizz es a ritmo propio (cada estudiante avanza cuando está listo). Esto hace a Quizizz más inclusivo para estudiantes que necesitan más tiempo."
                },
                {
                    id: 30,
                    type: "content",
                    title: "Socrative: evaluación inteligente",
                    content: "Socrative es una plataforma de evaluación formativa que permite cuestionarios, preguntas de salida (exit tickets) y la función 'Space Race' (competencia grupal visual). Su panel de docente muestra en tiempo real el porcentaje de respuestas correctas por pregunta, facilitando identificar conceptos que necesitan repaso.",
                    extra: "Exit ticket digital con Socrative: en los últimos 5 minutos de clase, lanza una pregunta de cierre: '¿Qué fue lo más importante que aprendiste hoy?' o '¿Qué pregunta te quedó sin responder?' Las respuestas aparecen al instante y guían la planificación de la siguiente clase."
                },
                {
                    id: 31,
                    type: "content",
                    title: "Google Forms: el instrumento más versátil",
                    content: "Google Forms permite crear formularios de evaluación gratuitos con múltiples tipos de pregunta: opción múltiple, escala Likert, texto corto, texto largo, carga de archivos y secciones ramificadas (distintas preguntas según la respuesta anterior). Los resultados se organizan automáticamente en Google Sheets.",
                    extra: "Uso avanzado: activa la corrección automática en Forms. Cuando los estudiantes envíen una autoevaluación o cuestionario de práctica, recibirán retroalimentación inmediata con la explicación de cada respuesta. Cero tiempo de corrección para el docente."
                },
                {
                    id: 32,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Qué ventaja ofrece la corrección automática de Google Forms frente a la corrección manual?",
                    options: [
                        "La corrección automática es más justa porque elimina el sesgo del docente.",
                        "Los estudiantes reciben retroalimentación inmediata y el docente ahorra tiempo de corrección.",
                        "Google Forms solo permite preguntas de opción múltiple que son más objetivas.",
                        "La corrección automática mejora la calificación de todos los estudiantes."
                    ],
                    correct: 1,
                    explanation: "La corrección automática permite que los estudiantes reciban retroalimentación inmediata (saben qué acertaron y qué no, con explicaciones) y el docente no invierte tiempo en corregir manualmente. Esto libera tiempo para actividades de mayor impacto."
                },
                {
                    id: 33,
                    type: "content",
                    title: "Rúbricas digitales con Google Forms",
                    content: "Puedes usar Google Forms para crear rúbricas de evaluación digitales donde el docente registra el nivel de desempeño de cada estudiante en varios criterios. Las respuestas se consolidan automáticamente en una hoja de cálculo, facilitando el análisis del desempeño grupal.",
                    extra: "Herramienta especializada: Doctopus y Goobric (extensiones de Google) permiten adjuntar rúbricas de Forms directamente a trabajos de Google Docs de los estudiantes. El docente califica directamente en el documento y el estudiante recibe la retroalimentación al instante."
                },
                {
                    id: 34,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál herramienta es más apropiada para que un docente recoja reflexiones escritas y abiertas de sus estudiantes al finalizar una unidad?",
                    options: [
                        "Kahoot, porque permite preguntas abiertas.",
                        "Google Forms con preguntas de texto largo o Padlet con publicaciones libres.",
                        "Quizizz, porque los estudiantes responden a su propio ritmo.",
                        "Socrative Space Race, porque genera competencia grupal."
                    ],
                    correct: 1,
                    explanation: "Para recoger reflexiones escritas abiertas, Google Forms con preguntas de texto largo o Padlet son las opciones más adecuadas. Kahoot y Quizizz están diseñados principalmente para preguntas cerradas de opción múltiple, no para reflexiones elaboradas."
                }
            ]
        },
        {
            id: 4,
            title: "🤝 Módulo 4: Colaboración y seguridad digital",
            cards: [
                {
                    id: 35,
                    type: "content",
                    title: "Google Classroom: el centro de operaciones",
                    content: "Google Classroom es una plataforma de gestión del aprendizaje (LMS) gratuita que permite organizar clases, publicar materiales, asignar tareas, dar retroalimentación y comunicarse con estudiantes y padres. Funciona como un aula virtual que complementa el espacio físico.",
                    extra: "Para empezar con Classroom: crea una clase, invita a tus estudiantes con el código de clase, y publica tu primera tarea. La curva de aprendizaje es muy corta (1-2 horas) y el impacto en la organización de materiales es inmediato. Disponible con cuenta Google institucional o personal."
                },
                {
                    id: 36,
                    type: "content",
                    title: "Jamboard: la pizarra colaborativa digital",
                    content: "Jamboard (de Google) es una pizarra digital colaborativa donde varios usuarios pueden escribir, pegar notas adhesivas, insertar imágenes y dibujar simultáneamente. Es ideal para lluvias de ideas grupales, organizadores gráficos colaborativos y síntesis visuales en tiempo real.",
                    extra: "Actividad: 'La pizarra de los 4 cuadrantes'. Divide el Jamboard en 4 secciones: Lo que sé, Lo que quiero saber, Lo que aprendí, Preguntas que aún tengo. Cada estudiante pega sus notas adhesivas en los cuadrantes correspondientes. Es la versión digital del clásico KWL."
                },
                {
                    id: 37,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la función principal de Google Classroom en el aula?",
                    options: [
                        "Crear presentaciones animadas e interactivas.",
                        "Realizar videoconferencias con estudiantes.",
                        "Gestionar materiales, tareas, retroalimentación y comunicación del aula en una plataforma integrada.",
                        "Diseñar cuestionarios gamificados para evaluación."
                    ],
                    correct: 2,
                    explanation: "Google Classroom es un LMS (Sistema de Gestión del Aprendizaje): su función es centralizar la gestión del aula —materiales, tareas, calificaciones, retroalimentación y comunicación— en una sola plataforma integrada y gratuita."
                },
                {
                    id: 38,
                    type: "content",
                    title: "Miro básico: colaboración visual avanzada",
                    content: "Miro es una pizarra colaborativa en línea con capacidades más avanzadas que Jamboard: permite crear mapas mentales, diagramas de flujo, tableros Kanban, líneas de tiempo y plantillas de design thinking. Su versión gratuita incluye 3 tableros ilimitados.",
                    extra: "Uso en proyectos: si tus estudiantes están desarrollando un proyecto complejo, Miro les permite visualizar todas las etapas del proceso, asignar responsabilidades con tarjetas de color y mantener un registro visual del avance. Es especialmente útil para proyectos STEAM que cruzan varias disciplinas."
                },
                {
                    id: 39,
                    type: "content",
                    title: "¿Qué es la seguridad digital?",
                    content: "La seguridad digital abarca las prácticas para proteger la información, la privacidad y la identidad en entornos digitales. Para los docentes, implica proteger tanto su propia información como la de sus estudiantes, y enseñar a los jóvenes a navegar el mundo digital de manera segura y responsable.",
                    extra: "Las tres amenazas más comunes en entornos educativos: 1) Phishing (correos falsos que roban contraseñas), 2) Contraseñas débiles o compartidas, 3) Publicación accidental de información personal de menores. Conocerlas es el primer paso para prevenirlas."
                },
                {
                    id: 40,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Qué es el 'phishing' en el contexto de la seguridad digital?",
                    options: [
                        "Un virus que destruye los archivos del dispositivo.",
                        "Una técnica para piratear software educativo.",
                        "Un engaño mediante correos o mensajes falsos que buscan robar contraseñas o información personal.",
                        "Una forma de spam publicitario en redes sociales."
                    ],
                    correct: 2,
                    explanation: "El phishing consiste en correos, mensajes o sitios web falsos que imitan ser legítimos (un banco, una plataforma educativa, una institución) para engañar al usuario y robar sus contraseñas o información personal. Reconocer estas señales es esencial para la seguridad digital."
                },
                {
                    id: 41,
                    type: "content",
                    title: "Contraseñas seguras: la primera línea de defensa",
                    content: "Una contraseña segura tiene al menos 12 caracteres, combina letras mayúsculas y minúsculas, números y símbolos, y no usa información personal (nombre, fecha de nacimiento). Nunca se comparte —ni con colegas— y se cambia regularmente.",
                    extra: "Técnica de la frase de contraseña: en lugar de una palabra difícil de recordar, usa una frase corta con modificaciones: 'MiClase2024!' es más segura y más fácil de recordar que 'xK9#pL2'. Activa la verificación en dos pasos en todas tus cuentas educativas."
                },
                {
                    id: 42,
                    type: "content",
                    title: "Ciudadanía digital: más que seguridad",
                    content: "La ciudadanía digital abarca el conjunto de derechos y responsabilidades que tenemos como usuarios del entorno digital: respetar los derechos de autor, verificar la información antes de compartirla, tratar a otros con respeto en línea, proteger la privacidad propia y ajena, y usar la tecnología de manera ética.",
                    extra: "Los 9 elementos de la ciudadanía digital (Mike Ribble): acceso digital, comercio digital, comunicación digital, alfabetización digital, etiqueta digital, ley digital, derechos y responsabilidades digitales, salud y bienestar digital, y seguridad digital. ¿Cuál trabajas más con tus estudiantes?"
                },
                {
                    id: 43,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "Un estudiante encuentra una imagen en internet y quiere usarla en su presentación escolar. ¿Cuál es la acción más correcta de ciudadanía digital?",
                    options: [
                        "Usarla sin problemas porque está en internet y es pública.",
                        "Verificar si tiene licencia Creative Commons o permiso de uso libre, y si es así, usarla citando la fuente.",
                        "Copiar la imagen y cambiarle los colores para que sea 'diferente'.",
                        "Descargarla y usarla sin citar la fuente porque es para uso educativo."
                    ],
                    correct: 1,
                    explanation: "El hecho de que una imagen esté en internet no significa que sea de libre uso. Lo correcto es verificar la licencia (buscar imágenes con licencia Creative Commons), y siempre citar la fuente. Esto enseña respeto a los derechos de autor desde edades tempranas."
                },
                {
                    id: 44,
                    type: "content",
                    title: "Inteligencia Artificial en la educación: lo básico",
                    content: "Las herramientas de Inteligencia Artificial (como ChatGPT, Gemini o Copilot) son una realidad en el mundo de tus estudiantes. Como docente, es importante entender qué pueden hacer (generar texto, resumir, explicar, traducir) y qué limitaciones tienen (pueden inventar datos, no tienen criterio ético propio, requieren supervisión).",
                    extra: "Enfoque pedagógico: en lugar de prohibir la IA, enséñala con criterio. Actividad: compara la respuesta de una IA sobre un tema histórico guatemalteco con fuentes verificadas. ¿En qué coincide? ¿Qué errores o simplificaciones tiene? Esto desarrolla pensamiento crítico y alfabetización en IA."
                },
                {
                    id: 45,
                    type: "quiz",
                    title: "✅ Reflexión final del curso",
                    question: "¿Cuál es la afirmación que mejor resume el enfoque de integración tecnológica de este curso?",
                    options: [
                        "Usar la mayor cantidad de herramientas tecnológicas posibles garantiza mejor aprendizaje.",
                        "La tecnología debe reemplazar completamente los métodos de enseñanza tradicionales.",
                        "La tecnología es una herramienta poderosa cuando se selecciona con criterio, se usa con propósito pedagógico claro y se combina con buenas prácticas de seguridad y ciudadanía digital.",
                        "Los docentes solo deben usar tecnología si tienen capacitación certificada en cada herramienta."
                    ],
                    correct: 2,
                    explanation: "Este curso sostiene que la tecnología no es magia ni sustituto de la buena pedagogía: es una herramienta poderosa cuando se elige con criterio, se usa con propósito claro de aprendizaje y se acompaña de responsabilidad digital. El docente que integra tecnología con estos principios transforma su práctica de manera sostenible."
                }
            ]
        }
    ]
}
,
// ══════════════════════════════════════════════════
// RUTA: METODOLOGÍAS ACTIVAS
// ══════════════════════════════════════════════════
// CURSO: m-learning
{
    id: 'm-learning',
    title: 'Mobile Learning · Aprender con el Celular',
    subtitle: 'Convierte el smartphone en una herramienta poderosa de aprendizaje para tu aula',
    icon: '📱',
    color: '#F59E0B',
    prerequisite: [],
    status: 'available',
    durationHours: 3,
    totalCards: 40,
    modules: [

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 1 — ¿Qué es el m-learning y por qué importa?
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 1,
            title: "📱 Módulo 1: ¿Qué es el m-learning y por qué importa?",
            cards: [
                {
                    id: 1,
                    type: "content",
                    title: "📱 ¿Qué es el m-learning?",
                    content: "El m-learning (aprendizaje móvil) es cualquier proceso educativo que ocurre a través de dispositivos portátiles: celulares, tabletas o lectores electrónicos. No es solo usar el celular en clase, es integrar el dispositivo como una herramienta pedagógica con intención clara.",
                    extra: "La UNESCO define el m-learning como 'el aprendizaje que aprovecha la movilidad del aprendiz y ocurre en cualquier lugar y momento'. En Guatemala, donde el celular llega antes que la computadora, esto es una gran oportunidad."
                },
                {
                    id: 2,
                    type: "content",
                    title: "📊 Los números que no puedes ignorar",
                    content: "En Guatemala, más del 70% de los hogares tienen acceso a un teléfono celular, frente a menos del 20% que tiene computadora. Tus estudiantes ya llevan en el bolsillo un dispositivo de aprendizaje: solo falta darte permiso de usarlo.",
                    extra: "Dato clave: en áreas rurales guatemaltecas, el celular suele ser el único dispositivo con acceso a internet en el hogar. Ignorarlo como herramienta pedagógica es desperdiciar el recurso tecnológico más democratizado del país."
                },
                {
                    id: 3,
                    type: "content",
                    title: "🔄 Del 'guarda el celular' al 'saca el celular'",
                    content: "Durante años, el celular fue el enemigo del aula. El m-learning propone lo contrario: convertir ese dispositivo inevitable en un aliado pedagógico. El cambio no está en el tecnología, está en la actitud del docente y en las actividades que diseña.",
                    extra: "Truco para recordarlo: si el celular es una distracción, es porque no le hemos dado una función. Una actividad bien diseñada hace que el estudiante use el celular para aprender, no para distraerse."
                },
                {
                    id: 4,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la principal ventaja del m-learning en el contexto guatemalteco?",
                    options: [
                        "Los celulares son más baratos que los libros de texto",
                        "El celular es el dispositivo tecnológico más accesible en hogares guatemaltecos",
                        "Las apps educativas funcionan mejor en celular que en computadora",
                        "El celular permite hacer exámenes en línea más fácilmente"
                    ],
                    correct: 1,
                    explanation: "La clave es la accesibilidad: más del 70% de hogares guatemaltecos tienen celular frente al 20% con computadora. El m-learning aprovecha el dispositivo que los estudiantes ya tienen, reduciendo la brecha tecnológica."
                },
                {
                    id: 5,
                    type: "content",
                    title: "🧠 Tipos de m-learning: formal e informal",
                    content: "El m-learning puede ser formal (tareas asignadas por el docente, quizzes en app) o informal (buscar información en YouTube, leer un artículo). Los mejores docentes aprovechan ambos: diseñan actividades formales y también guían el aprendizaje informal que ya ocurre.",
                    extra: "Ejemplo: cuando un estudiante busca en YouTube cómo se hace una fracción antes de dormir, eso es m-learning informal. Tu tarea es hacerlo más intencional sugiriendo qué buscar y cómo evaluar la fuente."
                },
                {
                    id: 6,
                    type: "content",
                    title: "⏱️ Microaprendizaje: aprender en pequeñas dosis",
                    content: "El m-learning funciona mejor en formato de microaprendizaje: sesiones cortas de 5 a 15 minutos. Los celulares invitan a consumir contenido en fragmentos. Como docente, puedes diseñar actividades breves pero poderosas: un video de 3 minutos, un quiz de 5 preguntas, un podcast de 8 minutos.",
                    extra: "La memoria humana retiene mejor cuando el aprendizaje está distribuido en el tiempo. Tres sesiones de 10 minutos son más efectivas que una de 30 minutos seguidos. El celular es el vehículo perfecto para esto."
                },
                {
                    id: 7,
                    type: "content",
                    title: "🌍 M-learning y aprendizaje ubicuo",
                    content: "El aprendizaje ubicuo significa que ocurre en cualquier lugar: en el bus, esperando, en casa, bajo un árbol. El celular lo hace posible. Tus estudiantes pueden aprender camino a la escuela, durante el recreo o en la tarde. El aula se extiende más allá de sus cuatro paredes.",
                    extra: "En comunidades rurales guatemaltecas donde los estudiantes caminan hasta dos horas para llegar a la escuela, el celular puede convertir ese tiempo en oportunidad de aprendizaje con contenido descargado sin conexión."
                },
                {
                    id: 8,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "¿Qué característica define mejor al microaprendizaje en el m-learning?",
                    options: [
                        "Usar aplicaciones con inteligencia artificial",
                        "Sesiones de aprendizaje cortas e intencionadas de 5 a 15 minutos",
                        "Aprender únicamente con videos animados",
                        "Estudiar sin conexión a internet"
                    ],
                    correct: 1,
                    explanation: "El microaprendizaje se caracteriza por sesiones breves e intencionadas. No depende del tipo de contenido ni de la conectividad, sino de la estructura en pequeñas dosis que el cerebro puede procesar y retener mejor."
                },
                {
                    id: 9,
                    type: "content",
                    title: "🏫 M-learning vs. e-learning: ¿cuál es la diferencia?",
                    content: "El e-learning requiere una computadora y, generalmente, una conexión estable. El m-learning es más flexible: funciona desde el celular, a veces sin internet (modo sin conexión), y en cualquier contexto. Para escuelas guatemaltecas con acceso limitado a computadoras, el m-learning es mucho más realista.",
                    extra: "No son opuestos: muchas plataformas como Khan Academy o Duolingo funcionan bien en ambos. La diferencia está en la accesibilidad y la movilidad que ofrece el celular."
                },
                {
                    id: 10,
                    type: "content",
                    title: "🚀 El rol del docente en el m-learning",
                    content: "En el m-learning, el docente deja de ser el único transmisor del conocimiento y se convierte en curador y guía. Tu rol es elegir las mejores apps, diseñar las actividades, establecer normas de uso y acompañar el proceso. El celular es la herramienta; tú sigues siendo el corazón del aprendizaje.",
                    extra: "Cita para reflexionar: 'La tecnología no reemplaza al maestro, pero el maestro que usa tecnología puede reemplazar al que no la usa.' — Adaptación del principio de Prensky."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 2 — Apps educativas para tu aula
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 2,
            title: "🛠️ Módulo 2: Apps educativas para tu aula",
            cards: [
                {
                    id: 11,
                    type: "content",
                    title: "🌐 Criterios para elegir una app educativa",
                    content: "No todas las apps son iguales. Antes de recomendar una a tus estudiantes, revisa: ¿Es gratuita o tiene versión free suficiente? ¿Funciona sin internet? ¿Está disponible en español? ¿Es apropiada para la edad? ¿Requiere datos excesivos? Prioriza las que cumplen al menos 4 de estos criterios.",
                    extra: "En Guatemala, el costo de datos móviles puede ser un obstáculo real. Apps que funcionan sin conexión o con poco uso de datos son mucho más equitativas."
                },
                {
                    id: 12,
                    type: "content",
                    title: "🟣 Duolingo: el aprendizaje de idiomas en el bolsillo",
                    content: "Duolingo es gratuito, gamificado y funciona con pocos datos. Perfecto para reforzar inglés o incluso lenguas mayas (tiene Kaqchikel en desarrollo). Sus lecciones de 5 minutos encajan perfectamente con el microaprendizaje. Puedes usarlo como tarea complementaria o como actividad de calentamiento.",
                    extra: "Actividad concreta: pide a tus estudiantes completar una lección de Duolingo cada día durante una semana y compartir su racha (streak) el viernes. Es motivador y crea hábito de estudio."
                },
                {
                    id: 13,
                    type: "content",
                    title: "🟢 Khan Academy: tu sala de clases extra",
                    content: "Khan Academy ofrece miles de lecciones en español de matemáticas, ciencias, historia y más, totalmente gratis. Su app funciona con conexión moderada y permite descargar contenido para verlo sin internet. Ideal para refuerzo escolar fuera del aula.",
                    extra: "Truco docente: crea una cuenta de clase en Khan Academy y asigna lecciones específicas. Puedes ver el progreso de cada estudiante desde tu teléfono, sin necesidad de computadora."
                },
                {
                    id: 14,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál de estas apps es más adecuada para refuerzo de matemáticas sin conexión a internet?",
                    options: [
                        "Duolingo, porque tiene ejercicios offline de álgebra",
                        "Khan Academy, porque permite descargar lecciones para ver sin internet",
                        "WhatsApp, porque se pueden enviar ejercicios en PDF",
                        "YouTube, porque los videos se guardan automáticamente"
                    ],
                    correct: 1,
                    explanation: "Khan Academy permite descargar lecciones de matemáticas y otras materias para verlas sin internet. Duolingo es ideal para idiomas, no matemáticas; WhatsApp y YouTube requieren conexión activa."
                },
                {
                    id: 15,
                    type: "content",
                    title: "📺 YouTube educativo: la clave es la curaduría",
                    content: "YouTube tiene millones de videos educativos en español: Veritasium, Kurzgesagt en Español, academia Platzi, canales de matemáticas, ciencias y más. El problema no es la falta de contenido sino el exceso. Tu rol como docente es curar: seleccionar, recomendar y contextualizar.",
                    extra: "Herramienta útil: crea una lista de reproducción de YouTube con los mejores videos de tu materia y comparte el enlace con tus estudiantes. Es gratis y toma 10 minutos hacerlo."
                },
                {
                    id: 16,
                    type: "content",
                    title: "💬 WhatsApp como herramienta pedagógica",
                    content: "WhatsApp ya está instalado en casi todos los celulares guatemaltecos. Puedes usarlo para: grupos de clase con anuncios y recursos, enviar audios explicativos cortos, compartir imágenes de problemas, recibir fotos de tareas y crear encuestas rápidas. Con normas claras, se convierte en un canal educativo eficaz.",
                    extra: "Norma sugerida para grupos de WhatsApp escolar: solo el docente puede publicar en el grupo principal; los estudiantes preguntan en un grupo aparte. Esto evita el caos y mantiene la información organizada."
                },
                {
                    id: 17,
                    type: "content",
                    title: "📝 Google Forms desde el celular",
                    content: "Google Forms permite crear cuestionarios, evaluaciones y encuestas que los estudiantes responden desde su celular. Puedes hacer un quiz de comprensión lectora, una autoevaluación o una encuesta de opinión. Los resultados llegan a tu cuenta en tiempo real, sin papel.",
                    extra: "Requiere que los estudiantes tengan cuenta de Google o compartes el formulario en modo 'sin iniciar sesión'. La segunda opción es más práctica en contextos escolares guatemaltecos."
                },
                {
                    id: 18,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "Un docente quiere recibir tareas fotográficas de sus estudiantes sin gastar dinero. ¿Cuál es la opción más práctica en Guatemala?",
                    options: [
                        "Crear una cuenta en Google Classroom para cada estudiante",
                        "Pedir que compartan fotos por WhatsApp al grupo de clase",
                        "Usar una plataforma de pago como Edmodo Premium",
                        "Solicitar que impriman las tareas y las entreguen el lunes"
                    ],
                    correct: 1,
                    explanation: "WhatsApp es la herramienta más instalada y con menor barrera de entrada en Guatemala. Recibir fotos de tareas por WhatsApp es inmediato, gratuito y no requiere que los estudiantes creen cuentas nuevas."
                },
                {
                    id: 19,
                    type: "content",
                    title: "🎙️ Apps para crear contenido: no solo consumir",
                    content: "El m-learning no es solo consumir: también puede ser crear. Apps como Anchor (podcasts), CapCut (videos cortos), o el mismo WhatsApp (notas de voz) permiten a los estudiantes producir su propio contenido de aprendizaje. Cuando enseñas a otros, aprendes el doble.",
                    extra: "Proyecto rápido: pide a tus estudiantes que graben un audio de 2 minutos explicando un concepto de la clase. Al escucharlos entre compañeros, todos repasan y se detectan errores de comprensión de forma colaborativa."
                },
                {
                    id: 20,
                    type: "content",
                    title: "🗺️ Google Maps y Earth: geografía viva",
                    content: "Google Maps y Google Earth son apps gratuitas que transforman la geografía en una experiencia interactiva. Tus estudiantes pueden explorar departamentos de Guatemala, ver imágenes satelitales de volcanes, ríos y comunidades, o medir distancias reales. Sin salir del aula, viajan a cualquier lugar del mundo.",
                    extra: "Actividad: pide a tus estudiantes que localicen su municipio en Google Earth y describan dos características geográficas que ven. Es una actividad concreta, visual y sin costo."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 3 — Diseñando actividades para dispositivos móviles
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 3,
            title: "🎨 Módulo 3: Diseñando actividades para dispositivos móviles",
            cards: [
                {
                    id: 21,
                    type: "content",
                    title: "🧩 El principio SAMR aplicado al celular",
                    content: "El modelo SAMR describe cuatro niveles de integración tecnológica: Sustitución (el celular reemplaza papel), Aumento (agrega funciones nuevas), Modificación (cambia la tarea significativamente) y Redefinición (crea algo imposible sin tecnología). Apunta siempre a los niveles superiores.",
                    extra: "Ejemplo: pedir a los estudiantes que fotografíen su tarea (Sustitución) es menos poderoso que pedirles que graben un video explicando su solución (Modificación) o que creen una infografía colaborativa (Redefinición)."
                },
                {
                    id: 22,
                    type: "content",
                    title: "🎬 Cómo diseñar un microvideo educativo",
                    content: "Un microvideo educativo tiene entre 2 y 6 minutos, una sola idea central, lenguaje sencillo y al menos una pregunta o reflexión al final. No necesitas equipo caro: el celular del docente, luz natural de una ventana y un cuaderno como fondo son suficientes para empezar.",
                    extra: "Formula para el microvideo: 1) Engancha en los primeros 10 segundos con una pregunta o dato curioso. 2) Explica el concepto con un ejemplo local. 3) Resume en una oración. 4) Deja una pregunta para pensar. ¡Listo!"
                },
                {
                    id: 23,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "Según el modelo SAMR, ¿cuál actividad representa el nivel más alto de integración del celular?",
                    options: [
                        "Fotografiar las respuestas escritas del cuaderno y enviarlas al docente",
                        "Responder un cuestionario en Google Forms en lugar de en papel",
                        "Crear un podcast colaborativo sobre un tema científico para la comunidad",
                        "Buscar la definición de una palabra en un diccionario en línea"
                    ],
                    correct: 2,
                    explanation: "Crear un podcast colaborativo para la comunidad es Redefinición: una tarea que no existiría sin la tecnología móvil. Las otras opciones son Sustitución (misma tarea, diferente formato) o Aumento (ligera mejora funcional)."
                },
                {
                    id: 24,
                    type: "content",
                    title: "🎙️ Podcasts escolares: voz para aprender",
                    content: "Un podcast escolar es una grabación de audio en la que los estudiantes explican, debaten o narran un tema. Solo necesitan el celular y la app de voz nativa. Los podcasts desarrollan habilidades de comunicación oral, investigación y síntesis. Son perfectos para idiomas, historia y ciencias sociales.",
                    extra: "Paso a paso: 1) Asigna el tema. 2) Los estudiantes investigan y escriben un guion de 3-5 minutos. 3) Graban con el celular. 4) Comparten el audio por WhatsApp. 5) El grupo escucha y comenta. Todo el proceso cabe en dos períodos de clase."
                },
                {
                    id: 25,
                    type: "content",
                    title: "📊 Formularios como herramienta de evaluación formativa",
                    content: "Usar Google Forms o Microsoft Forms como salida de clase es una estrategia poderosa: al final de cada lección, los estudiantes responden 3 preguntas desde su celular. Tú ves los resultados en tiempo real y ajustas tu próxima clase según las dudas reales, no las que supones.",
                    extra: "Las tres preguntas clave para una salida de clase: 1) ¿Qué aprendiste hoy? 2) ¿Qué no quedó claro? 3) ¿Cómo lo conectas con tu vida? En 5 minutos tienes información valiosísima sobre tu grupo."
                },
                {
                    id: 26,
                    type: "content",
                    title: "🗺️ Cacerías de pistas con el celular",
                    content: "Una cacería de pistas digital combina movimiento, investigación y tecnología. Los estudiantes reciben pistas por WhatsApp y deben buscar respuestas en internet, fotografiar elementos del entorno o resolver acertijos. Es colaborativa, activa y los estudiantes la recuerdan semanas después.",
                    extra: "Ejemplo guatemalteco: 'Encuentra y fotografía 5 plantas medicinales de tu comunidad. Busca en internet su nombre científico. Graba un audio de 1 minuto explicando para qué se usa cada una.' Todo con el celular, sin costo."
                },
                {
                    id: 27,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "¿Cuál es el principal beneficio de usar un formulario de 'salida de clase' con el celular?",
                    options: [
                        "Permite calificar automáticamente a todos los estudiantes",
                        "Reduce el tiempo que el docente dedica a preparar clases",
                        "Proporciona información en tiempo real sobre las dudas reales del grupo",
                        "Elimina la necesidad de hacer evaluaciones tradicionales"
                    ],
                    correct: 2,
                    explanation: "El valor de la salida de clase con formulario es la retroalimentación inmediata: el docente ve en tiempo real qué entendieron y qué no, y puede ajustar la siguiente clase basándose en datos reales, no suposiciones."
                },
                {
                    id: 28,
                    type: "content",
                    title: "📸 Fotografía y video como evidencia de aprendizaje",
                    content: "La cámara del celular convierte cualquier actividad práctica en evidencia documentada. Los estudiantes pueden fotografiar experimentos, grabar presentaciones, capturar sus maquetas o hacer timelapse de un proceso. Estas evidencias digitales son un portafolio poderoso de su aprendizaje.",
                    extra: "Consejo práctico: crea una carpeta compartida en Google Drive o un álbum de WhatsApp solo para evidencias del grupo. Al final del trimestre, tienes un portafolio visual completo del aprendizaje de la clase."
                },
                {
                    id: 29,
                    type: "content",
                    title: "🤝 Aprendizaje colaborativo con celular",
                    content: "El celular puede conectar a estudiantes de distintos grupos o comunidades. Dos aulas en diferentes departamentos de Guatemala pueden colaborar en un mismo proyecto: compartir datos de temperatura local, comparar costumbres de sus comunidades o co-crear un periódico digital. El celular derriba las paredes del aula.",
                    extra: "Proyecto interescolar: coordina con un docente de otro municipio. Sus estudiantes y los tuyos investigan el mismo tema desde su contexto local y comparten los resultados por WhatsApp. En un día tienen perspectivas de dos realidades guatemaltecas diferentes."
                },
                {
                    id: 30,
                    type: "content",
                    title: "📋 Plantilla de actividad móvil",
                    content: "Toda actividad de m-learning bien diseñada responde estas preguntas: ¿Qué aprenderán? (objetivo), ¿Qué harán con el celular? (tarea), ¿Cuánto tiempo tienen? (duración), ¿Cómo sabrás que aprendieron? (evaluación), ¿Qué pasa si no tienen internet? (plan B). Siempre diseña pensando en el plan B.",
                    extra: "El plan B es clave en Guatemala: si un estudiante no tiene datos ese día, ¿puede hacer la actividad de otra manera? Diseña actividades que tengan versión digital Y versión análoga, para no excluir a nadie."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 4 — Desafíos, equidad y ciudadanía digital
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 4,
            title: "🇬🇹 Módulo 4: Desafíos, equidad y ciudadanía digital",
            cards: [
                {
                    id: 31,
                    type: "content",
                    title: "⚡ El desafío de la conectividad en Guatemala",
                    content: "No todas las comunidades guatemaltecas tienen buena señal o acceso a datos. Antes de implementar m-learning, mapea tu realidad: ¿cuántos estudiantes tienen celular propio? ¿Cuántos comparten con la familia? ¿Cuántos tienen datos? ¿Cuántos tienen wifi en casa? Los datos reales guían mejores decisiones.",
                    extra: "Encuesta rápida de 5 preguntas al inicio del año te da el mapa tecnológico de tu grupo. Con esa información diseñas actividades realistas, no idealizadas. Puedes hacerla en papel y en 10 minutos."
                },
                {
                    id: 32,
                    type: "content",
                    title: "📶 Estrategias para contextos con poca conectividad",
                    content: "Cuando el internet es limitado: (1) usa apps que funcionan sin conexión como Khan Academy descargado, (2) crea grupos de WhatsApp donde el docente descarga el contenido y lo reenvía, (3) usa el modo de datos comprimidos del celular, (4) programa actividades online para cuando estén en la escuela, si hay wifi.",
                    extra: "Técnica 'descarga el jueves': pide a los estudiantes que descarguen el material educativo de la semana cuando estén en la escuela (donde hay wifi) para consumirlo sin conexión durante el fin de semana."
                },
                {
                    id: 33,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la primera acción que debe tomar un docente antes de implementar m-learning en su aula guatemalteca?",
                    options: [
                        "Comprar tabletas para todos los estudiantes",
                        "Solicitar wifi de alta velocidad al Ministerio de Educación",
                        "Hacer un diagnóstico de cuántos estudiantes tienen celular y con qué conectividad",
                        "Elegir la plataforma educativa más popular del mercado"
                    ],
                    correct: 2,
                    explanation: "Siempre parte de la realidad de tus estudiantes. Un diagnóstico previo te permite diseñar actividades que funcionen para TODOS, no solo para los que tienen mejor tecnología. Sin ese diagnóstico, corres el riesgo de excluir a quienes más necesitan apoyo."
                },
                {
                    id: 34,
                    type: "content",
                    title: "⚖️ Equidad digital: no dejar a nadie atrás",
                    content: "El m-learning puede ampliar brechas si no se diseña con equidad. Estrategias para incluir a todos: (1) actividades que pueden hacerse en celular compartido, (2) pares de trabajo donde un estudiante con celular trabaja con uno sin, (3) alternativas análogas para cada actividad digital, (4) tiempo en clase para actividades que requieren internet.",
                    extra: "Reflexión importante: una actividad de m-learning que solo puede hacer el 60% de tus estudiantes no es una buena actividad de m-learning. El diseño inclusivo no es opcional, es responsabilidad pedagógica."
                },
                {
                    id: 35,
                    type: "content",
                    title: "🛡️ Ciudadanía digital: enseñar a usar bien el celular",
                    content: "Integrar el celular al aula es también la oportunidad de enseñar ciudadanía digital: verificar fuentes antes de compartir, proteger la privacidad, comunicarse con respeto en línea, entender el tiempo de pantalla saludable. Estos son contenidos transversales que todo docente guatemalteco puede abordar.",
                    extra: "Actividad de ciudadanía digital: muestra a tus estudiantes una noticia falsa y una verdadera sobre el mismo tema. Guíalos para identificar las diferencias: ¿quién la publicó?, ¿tiene fecha?, ¿otras fuentes lo confirman? Es una lección de pensamiento crítico que también enseña periodismo."
                },
                {
                    id: 36,
                    type: "content",
                    title: "⏰ Normas de uso del celular en el aula",
                    content: "El éxito del m-learning depende de normas claras y consensuadas. Co-construye las reglas con tus estudiantes: ¿cuándo se usa el celular?, ¿para qué?, ¿qué pasa si alguien lo usa para otra cosa? Las normas co-creadas se respetan más que las impuestas. Ponlas en un cartel visible.",
                    extra: "Norma de oro: el celular se guarda cuando el docente dice 'celulares en la mesa hacia abajo' y se usa cuando dice 'saquen el celular'. Esta señal simple evita ambigüedad y reduce el uso no autorizado."
                },
                {
                    id: 37,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "¿Qué estrategia de equidad digital es más efectiva cuando algunos estudiantes no tienen celular propio?",
                    options: [
                        "Excluirlos de las actividades de m-learning y darles trabajo extra en papel",
                        "Pedir a los padres que compren un celular básico para sus hijos",
                        "Diseñar actividades en pares donde un estudiante con celular colabora con uno sin",
                        "Postponer el m-learning hasta que todos tengan dispositivo"
                    ],
                    correct: 2,
                    explanation: "El trabajo en pares es la estrategia más inclusiva e inmediata: permite que todos participen, fomenta la colaboración y no requiere recursos adicionales. Excluir o postponer viola el principio de equidad educativa."
                },
                {
                    id: 38,
                    type: "content",
                    title: "🏫 Casos reales: m-learning en aulas guatemaltecas",
                    content: "Maestra Ana, de Sololá, usa grupos de WhatsApp para enviar audios de vocabulario en español y kaqchikel. Profesor Jorge, de Chiquimula, asigna videos de Khan Academy descargados como tarea. Maestra Rosa, de Quetzaltenango, pide a sus estudiantes grabar podcasts sobre historia local. Son ejemplos reales, con celulares básicos y creatividad.",
                    extra: "Lo que tienen en común estos docentes: claridad en el objetivo pedagógico primero, tecnología después. No usan el celular por usarlo, lo usan para resolver un problema de aprendizaje concreto de sus estudiantes."
                },
                {
                    id: 39,
                    type: "content",
                    title: "📈 Cómo evaluar el éxito de tu m-learning",
                    content: "Indicadores para saber si tu m-learning funciona: ¿Los estudiantes completan más tareas que antes? ¿La comprensión mejoró en evaluaciones? ¿Participan más en clase? ¿Reportan aprender fuera del aula? ¿Las familias perciben cambios positivos? Evalúa después de 4 semanas de implementación consistente.",
                    extra: "Tip de autoevaluación docente: lleva un diario de las actividades de m-learning que haces cada semana. Anota qué funcionó, qué no y por qué. Después de un mes, tendrás un mapa claro de lo que realmente funciona en TU contexto."
                },
                {
                    id: 40,
                    type: "quiz",
                    title: "✅ Quiz final del módulo",
                    question: "¿Cuál de los siguientes indicadores es el más valioso para evaluar si el m-learning está funcionando en tu aula?",
                    options: [
                        "El número de apps instaladas en los celulares de los estudiantes",
                        "La velocidad de conexión a internet del aula",
                        "La mejora en comprensión y participación de los estudiantes",
                        "La cantidad de videos educativos disponibles en YouTube"
                    ],
                    correct: 2,
                    explanation: "El éxito del m-learning se mide en aprendizaje, no en tecnología. La cantidad de apps o la velocidad de internet son medios, no fines. Lo que importa es si los estudiantes comprenden mejor y participan más activamente en su proceso educativo."
                }
            ]
        }

    ]
},

// CURSO: flipped-classroom
{
    id: 'flipped-classroom',
    title: 'Flipped Classroom · El Aula Invertida',
    subtitle: 'Los estudiantes aprenden la teoría en casa y practican en clase contigo',
    icon: '🔄',
    color: '#8B5CF6',
    prerequisite: [],
    status: 'available',
    durationHours: 3,
    totalCards: 40,
    modules: [

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 1 — ¿Qué es el Flipped Classroom?
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 1,
            title: "🔄 Módulo 1: ¿Qué es el Flipped Classroom?",
            cards: [
                {
                    id: 1,
                    type: "content",
                    title: "🔄 La gran inversión: ¿qué significa 'invertir' el aula?",
                    content: "En una clase tradicional, el docente explica en clase y los estudiantes practican en casa (la tarea). En el aula invertida es al revés: los estudiantes aprenden el contenido nuevo en casa (con un video, podcast o lectura) y el tiempo en clase se usa para practicar, debatir y resolver dudas juntos.",
                    extra: "La lógica es poderosa: ¿para qué pasar 40 minutos explicando algo que los estudiantes pueden ver en video cuando el docente está disponible para resolver dudas en vivo? El tiempo presencial es el recurso más escaso y valioso."
                },
                {
                    id: 2,
                    type: "content",
                    title: "📚 Historia del Flipped Classroom",
                    content: "El método fue popularizado por Jonathan Bergmann y Aaron Sams, dos profesores de química de Colorado, en 2007. Comenzaron grabando sus lecciones para estudiantes que faltaban por enfermedad. Pronto descubrieron que TODOS los estudiantes preferían ver el video primero y luego practicar con el docente presente.",
                    extra: "Dato curioso: el primer 'flip' fue por accidente. Bergmann y Sams grababan clases para un estudiante ausente y descubrieron que los compañeros también pedían el video. A veces las mejores innovaciones pedagógicas nacen de resolver un problema concreto."
                },
                {
                    id: 3,
                    type: "content",
                    title: "🧠 La ciencia detrás del aula invertida",
                    content: "El flipped classroom se apoya en la taxonomía de Bloom: los niveles cognitivos bajos (recordar, comprender) se logran en casa con el video. Los niveles altos (analizar, evaluar, crear) se trabajan en clase con la guía del docente. Así, el tiempo presencial se usa para lo que más necesita al maestro.",
                    extra: "Metáfora que funciona: imagina que el video es el 'libro de texto multimedia'. El libro siempre fue para leer en casa; el aula era para resolver dudas. El flipped classroom simplemente actualiza esa lógica con tecnología."
                },
                {
                    id: 4,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la característica principal que diferencia el aula invertida de la clase tradicional?",
                    options: [
                        "En el aula invertida no hay tareas para casa",
                        "El docente explica los conceptos nuevos mediante videos que los estudiantes ven antes de clase",
                        "Los estudiantes enseñan la clase en lugar del docente",
                        "Se eliminan las evaluaciones escritas"
                    ],
                    correct: 1,
                    explanation: "La inversión clave es dónde ocurre la instrucción directa: en el aula invertida, los estudiantes acceden al contenido nuevo (generalmente en video) ANTES de clase, y el tiempo presencial se dedica a práctica, discusión y proyectos con el docente disponible."
                },
                {
                    id: 5,
                    type: "content",
                    title: "✅ Beneficios pedagógicos del aula invertida",
                    content: "Beneficios comprobados: (1) los estudiantes pueden pausar y repetir la explicación las veces que necesiten, (2) el tiempo en clase es más activo y menos pasivo, (3) el docente puede atender individualmente mientras los demás trabajan, (4) los estudiantes llegan a clase con preguntas reales, no hipotéticas.",
                    extra: "Beneficio para el docente: en el aula invertida, dejas de dar la misma explicación 5 veces (una por sección) y la das una vez en video. El tiempo que ganas lo inviertes en atención personalizada, que es donde realmente marcas diferencia."
                },
                {
                    id: 6,
                    type: "content",
                    title: "⚖️ Clase tradicional vs. Aula invertida: comparación honesta",
                    content: "Clase tradicional: docente explica (30-35 min), estudiantes practican en casa solos, sin apoyo. Aula invertida: estudiantes ven video en casa (10-15 min), clase se usa para practicar CON el docente presente. La diferencia es quién está disponible cuando el estudiante más necesita ayuda.",
                    extra: "Crítica justa al aula invertida: requiere que los estudiantes sean disciplinados para ver el video antes de clase. Si no lo hacen, llegan sin base y la dinámica falla. Por eso, la motivación y el seguimiento son parte del diseño, no extras."
                },
                {
                    id: 7,
                    type: "content",
                    title: "🎯 ¿Para qué materias funciona mejor?",
                    content: "El flipped classroom funciona especialmente bien en materias con mucha instrucción directa: matemáticas, ciencias, gramática, historia. Funciona menos para habilidades que requieren práctica guiada simultánea (instrumentos musicales, educación física, artes manuales). En Guatemala, matemáticas y ciencias son los casos de uso más frecuentes.",
                    extra: "No tienes que invertir TODA la clase. Puedes empezar con 1 tema por semana en formato flipped y el resto de la semana enseñar de forma tradicional. Empieza pequeño, ajusta y escala."
                },
                {
                    id: 8,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "Según la taxonomía de Bloom aplicada al flipped classroom, ¿qué tipos de actividades se diseñan para el tiempo presencial en clase?",
                    options: [
                        "Recordar y comprender: copiar definiciones y memorizar fórmulas",
                        "Solo actividades de evaluación sumativa (exámenes)",
                        "Analizar, evaluar y crear: debatir, resolver problemas complejos, crear proyectos",
                        "Ver el video nuevamente en grupo para verificar que todos lo entendieron"
                    ],
                    correct: 2,
                    explanation: "El tiempo presencial en el aula invertida se reserva para los niveles cognitivos altos de Bloom: analizar, evaluar y crear. Los niveles básicos (recordar y comprender) se trabajan con el video en casa. Así el docente guía cuando más se necesita."
                },
                {
                    id: 9,
                    type: "content",
                    title: "👥 El rol del docente cambia, no desaparece",
                    content: "En el aula invertida, el docente no es reemplazado por el video. Su rol se transforma: de expositor a facilitador. En clase, en lugar de hablar al frente, el docente circula, observa, pregunta, aclara, desafía y apoya a quien lo necesita. Es un rol más exigente y más gratificante.",
                    extra: "Muchos docentes que prueban el aula invertida reportan que se sienten más conectados con sus estudiantes porque pasan el tiempo de clase interactuando uno a uno, en lugar de hablar a 30 estudiantes a la vez."
                },
                {
                    id: 10,
                    type: "content",
                    title: "🚀 ¿Por dónde empezar? El primer flip",
                    content: "Para tu primer flip: elige un tema que ya explicas bien (no uno nuevo para ti). Graba un video de 8 minutos con tu celular. Compártelo por WhatsApp el día anterior a la clase. Diseña una actividad de 30 minutos para hacer en clase. Evalúa qué pasó y ajusta. ¡Ya hiciste tu primer aula invertida!",
                    extra: "El primer video no tiene que ser perfecto. Un video auténtico con el docente real, aunque sea informal, genera más conexión que una producción elaborada. Tus estudiantes quieren escucharte a TI explicar, no a un desconocido en alta definición."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 2 — Cómo crear tu contenido en video
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 2,
            title: "🎬 Módulo 2: Cómo crear tu contenido en video",
            cards: [
                {
                    id: 11,
                    type: "content",
                    title: "📱 El celular es suficiente para grabar tu clase",
                    content: "No necesitas una cámara profesional, estudio de grabación ni software caro. El celular del docente, en modo horizontal, con buena luz natural y el docente hablando directamente a cámara, produce un video educativo de calidad suficiente. La pedagogía es más importante que la producción.",
                    extra: "Configuración mínima para empezar: celular en modo horizontal, apoyado en una pila de libros o un vaso, frente a una ventana (la luz natural es la mejor), sin ruido ambiental, y tú en cuadro explicando. Costo: Q0."
                },
                {
                    id: 12,
                    type: "content",
                    title: "⏱️ La regla de los 10 minutos",
                    content: "Los videos educativos más efectivos duran entre 6 y 10 minutos. Estudios del MIT muestran que el engagement cae drásticamente después de los 6 minutos. Si tu tema necesita más tiempo, divide en dos videos. Un video de 8 minutos bien diseñado es mejor que uno de 20 minutos.",
                    extra: "Truco de estructura: 1 min de introducción y gancho, 6-7 min de explicación del concepto con ejemplo, 1 min de resumen y pregunta para reflexionar. Esa estructura de 3 partes hace que el video fluya y sea memorable."
                },
                {
                    id: 13,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la duración óptima recomendada para un video de aula invertida?",
                    options: [
                        "30 a 45 minutos, equivalente a un período de clase completo",
                        "Menos de 2 minutos para mantener la atención",
                        "Entre 6 y 10 minutos, con una sola idea central",
                        "Más de 20 minutos para cubrir el tema con profundidad"
                    ],
                    correct: 2,
                    explanation: "Los estudios muestran que el engagement baja drásticamente después de 6 minutos. Entre 6 y 10 minutos es el rango óptimo: suficiente para explicar con profundidad, corto para mantener la atención. Si el tema es largo, divídelo en varios videos cortos."
                },
                {
                    id: 14,
                    type: "content",
                    title: "🎙️ El audio importa más que la imagen",
                    content: "Los estudiantes toleran imagen imperfecta pero no toleran audio malo. Antes de preocuparte por la imagen, asegura que tu voz se escuche clara. Graba en un cuarto sin eco (las habitaciones con ropa amortiguan el sonido), habla cerca del celular y evita grabar cerca de ventiladores o carreteras.",
                    extra: "Prueba de audio: graba 30 segundos y escúchalo con audífonos. Si tu voz se escucha clara y no hay eco fuerte, estás listo. Si suena como cueva, muévete a una habitación más pequeña con más objetos (libros, ropa)."
                },
                {
                    id: 15,
                    type: "content",
                    title: "✍️ Guion vs. improvisación: encuentra tu estilo",
                    content: "Algunos docentes prefieren un guion completo (más preciso, menos natural), otros hablan con bullet points (más fluido) y otros improvisan (más auténtico pero puede irse por las ramas). Para empezar, escribe los 3-5 puntos clave que quieres cubrir y habla a cámara con esos puntos de referencia. Es el balance perfecto.",
                    extra: "Los errores pequeños son humanos y aceptables. No tienes que repetir el video entero si dices 'ehh' o te equivocas en algo menor. Tus estudiantes valoran la autenticidad más que la perfección técnica."
                },
                {
                    id: 16,
                    type: "content",
                    title: "📊 Videos con presentación: pantalla compartida",
                    content: "Otra opción es grabar tu pantalla mientras explicas una presentación de diapositivas. En Android puedes usar DU Recorder (gratis); en iPhone usa la función nativa de grabación de pantalla. Así tus estudiantes ven las diapositivas Y te escuchan explicar. Ideal para matemáticas con fórmulas o ciencias con diagramas.",
                    extra: "Para matemáticas, hay una opción aún más simple: graba tu mano escribiendo en papel mientras explicas. Muchos docentes exitosos de YouTube usan exactamente eso. Un cuaderno, un marcador y tu voz: pedagogía pura."
                },
                {
                    id: 17,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "¿Qué aspecto técnico tiene mayor impacto en la calidad de un video educativo según los expertos?",
                    options: [
                        "La resolución de imagen (Full HD vs. 4K)",
                        "Los efectos de transición y animaciones en las diapositivas",
                        "La claridad del audio: que la voz se escuche limpia y sin eco",
                        "El fondo del video (debe ser un fondo liso y profesional)"
                    ],
                    correct: 2,
                    explanation: "El audio es el elemento más crítico de un video educativo. Los estudiantes pueden aprender con imagen de menor calidad, pero un audio malo (eco, ruido, voz baja) hace que abandonen el video inmediatamente. Prioriza el sonido sobre cualquier otro aspecto técnico."
                },
                {
                    id: 18,
                    type: "content",
                    title: "📤 Cómo compartir el video con tus estudiantes",
                    content: "Opciones para compartir tu video: (1) YouTube no listado (solo quienes tienen el enlace lo ven), (2) WhatsApp directo al grupo de clase, (3) Google Drive con enlace compartido, (4) Telegram (permite archivos grandes). Para Guatemala, WhatsApp es el canal más eficiente porque todos lo tienen instalado.",
                    extra: "YouTube no listado es la mejor opción si el video es largo (+50 MB) porque no ocupa espacio en el celular del estudiante y lo puede ver sin descargarlo. Crea tu canal de YouTube docente y empieza a subir tus lecciones."
                },
                {
                    id: 19,
                    type: "content",
                    title: "❓ Preguntas integradas en el video",
                    content: "El video más poderoso no es solo explicativo: incluye preguntas que obligan al estudiante a pausar y pensar. Di en el video: 'Pausa aquí y escribe tu respuesta antes de continuar'. Esta técnica de pausa activa convierte el video pasivo en una experiencia de aprendizaje activa.",
                    extra: "Puedes ir más lejos con EdPuzzle: una herramienta gratuita que te permite insertar preguntas directamente en el timeline del video de YouTube. El estudiante no puede avanzar sin responder. Los docentes ven qué respondió cada estudiante."
                },
                {
                    id: 20,
                    type: "content",
                    title: "🗂️ Organiza tu biblioteca de videos",
                    content: "Con el tiempo, acumularás videos de tus mejores explicaciones. Organízalos en playlists de YouTube por unidad o tema. Ese banco de videos es invaluable: lo puedes reutilizar año tras año, compartir con colegas, y los estudiantes lo usan para repasar antes de exámenes. Es una inversión que crece con el tiempo.",
                    extra: "Tip de productividad: graba dos o tres videos el mismo día que te sientes inspirado. Así construyes tu biblioteca más rápido. Muchos docentes dedican los sábados en la mañana a grabar los videos de la semana siguiente."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 3 — Diseñando las actividades presenciales
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 3,
            title: "🧠 Módulo 3: Diseñando las actividades presenciales",
            cards: [
                {
                    id: 21,
                    type: "content",
                    title: "🎯 El tiempo de clase es oro: úsalo bien",
                    content: "Si los estudiantes ya vieron el video, el tiempo de clase NO debe usarse para repetir la explicación. Úsalo para: resolver dudas específicas (no generales), trabajar en problemas difíciles en equipo, debatir ideas, crear productos o presentar proyectos. El docente facilita, no repite.",
                    extra: "Regla práctica: si puedes hacer una actividad sin el docente presente, probablemente no pertenece al tiempo de clase. El tiempo presencial es el recurso más escaso; úsalo para lo que NO puede hacerse solo."
                },
                {
                    id: 22,
                    type: "content",
                    title: "📋 La 'entrada de clase': verificar que vieron el video",
                    content: "Empieza cada clase flipped con una entrada de 5 minutos: 2 o 3 preguntas rápidas sobre el video que vieron. Sirve para saber quién lo vio, identificar las dudas más comunes y activar el conocimiento previo. Puede ser en papel, en un formulario de Google o de forma oral.",
                    extra: "La entrada de clase también tiene un efecto motivador: los estudiantes saben que al llegar a clase se verificará si vieron el video, lo cual aumenta el cumplimiento. No es para calificar, es para diagnosticar."
                },
                {
                    id: 23,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Para qué sirve la 'entrada de clase' en el aula invertida?",
                    options: [
                        "Para calificar a los estudiantes que no vieron el video",
                        "Para repetir la explicación del video a quienes no lo vieron",
                        "Para verificar la comprensión del video e identificar dudas comunes antes de la actividad",
                        "Para que los estudiantes copien notas del video en su cuaderno"
                    ],
                    correct: 2,
                    explanation: "La entrada de clase es diagnóstica, no punitiva. Su función es que el docente sepa qué entendieron, qué no, y cuáles son las dudas más frecuentes, para organizar mejor el tiempo de clase. No se usa para castigar a quienes no vieron el video."
                },
                {
                    id: 24,
                    type: "content",
                    title: "🤝 Aprendizaje colaborativo en el tiempo presencial",
                    content: "El aula invertida libera tiempo para trabajo en equipo: grupos de 3-4 estudiantes resuelven problemas juntos, crean productos, investigan o debaten. El docente circula, observa y facilita. Los estudiantes aprenden de sus pares tanto como del docente. Este es el verdadero valor del tiempo presencial.",
                    extra: "Estructura de trabajo en equipo que funciona: (1) cada estudiante intenta el problema solo por 3 minutos, (2) el equipo compara respuestas y resuelve discrepancias, (3) presentan su solución al grupo. Esta secuencia garantiza que todos piensen antes de copiar."
                },
                {
                    id: 25,
                    type: "content",
                    title: "💬 El debate socrático: pensar en voz alta",
                    content: "El debate socrático es una conversación estructurada donde el docente solo hace preguntas (nunca da respuestas directas) y los estudiantes defienden sus ideas con argumentos del video y sus propias reflexiones. Desarrolla pensamiento crítico, comunicación oral y comprensión profunda. Perfecto para historia, ciencias sociales y ética.",
                    extra: "Pregunta inicial típica: '¿Están de acuerdo con lo que dice el video? ¿Alguien tiene una perspectiva diferente?' Luego el docente solo guía con preguntas: '¿Por qué dices eso? ¿Qué evidencia tienes? ¿Cómo responde el grupo?' El docente habla menos del 20% del tiempo."
                },
                {
                    id: 26,
                    type: "content",
                    title: "🔬 Estaciones de aprendizaje en el aula invertida",
                    content: "Divide el aula en 3-4 estaciones con diferentes actividades: una para práctica individual, otra para trabajo en equipo, una de lectura complementaria y una donde el docente atiende a quienes tienen más dudas. Los grupos rotan cada 10-12 minutos. El docente atiende profundamente al grupo más pequeño.",
                    extra: "Las estaciones transforman una clase de 30 estudiantes en grupos de 7-8 con atención casi personalizada. El docente en la estación de 'clínica de dudas' puede atender de forma profunda a los estudiantes que más lo necesitan."
                },
                {
                    id: 27,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "¿Cuál de estas actividades es la más adecuada para el tiempo presencial en el aula invertida?",
                    options: [
                        "El docente explica el tema desde el inicio sin mencionar el video",
                        "Los estudiantes ven el video en clase porque no tienen internet en casa",
                        "Equipos de estudiantes resuelven problemas complejos mientras el docente circula y apoya",
                        "Los estudiantes copian en su cuaderno los puntos clave del video"
                    ],
                    correct: 2,
                    explanation: "El tiempo presencial debe usarse para actividades que requieren la presencia del docente y la colaboración entre pares: resolver problemas, debatir, crear. Repetir la explicación o copiar notas desperdicia el tiempo más valioso del día de clase."
                },
                {
                    id: 28,
                    type: "content",
                    title: "🛠️ Proyectos como actividad presencial estrella",
                    content: "Los proyectos breves en clase (de 1 a 3 períodos) son la actividad presencial ideal del aula invertida: los estudiantes aplican lo que aprendieron en el video para crear algo concreto. Un cartel, una maqueta, una infografía, una presentación, un experimento. El video da el marco teórico; la clase es el taller.",
                    extra: "Proyecto de una clase: después del video sobre ecosistemas, cada equipo crea una infografía de 1 página sobre el ecosistema de su comunidad. En 35 minutos investigan, diseñan y presentan. El docente evalúa en tiempo real mientras circula."
                },
                {
                    id: 29,
                    type: "content",
                    title: "📊 Diferenciación instruccional en el aula invertida",
                    content: "El aula invertida facilita la atención a la diversidad: mientras la mayoría trabaja en la actividad principal, el docente puede sentarse 10 minutos con el grupo que más necesita apoyo para reexplicar el concepto con otra estrategia. O puede asignar actividades de extensión más complejas a estudiantes avanzados. Cada quien avanza a su ritmo.",
                    extra: "Truco para diferenciación: diseña la actividad presencial en 3 niveles de dificultad (básico, estándar, extendido). Los estudiantes eligen el nivel según su comprensión. Esta autonomía es en sí misma un aprendizaje metacognitivo valioso."
                },
                {
                    id: 30,
                    type: "content",
                    title: "⏰ Planificación del tiempo en clase invertida",
                    content: "Estructura sugerida para un período de 45 minutos: 5 min de entrada de clase (verificar video), 5 min de aclaración de dudas comunes, 30 min de actividad principal (individual o en equipo), 5 min de cierre y reflexión. Esta distribución maximiza el tiempo activo de los estudiantes.",
                    extra: "El cierre de clase es tan importante como la entrada. En los últimos 5 minutos pregunta: '¿Qué aprendiste hoy? ¿Qué sigues sin entender? ¿Dónde usarías esto?' Este metacognición mejora la transferencia del aprendizaje a largo plazo."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 4 — Desafíos reales y soluciones prácticas
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 4,
            title: "🇬🇹 Módulo 4: Desafíos reales y soluciones prácticas",
            cards: [
                {
                    id: 31,
                    type: "content",
                    title: "🏠 El gran desafío: ¿qué pasa si no tienen internet en casa?",
                    content: "Este es el desafío número uno del aula invertida en Guatemala. Soluciones prácticas: (1) enviar el video por WhatsApp para verlo descargado sin wifi, (2) usar el recreo o tiempo libre en la escuela para ver el video si hay wifi, (3) prestar una tarjeta de datos recargada para los estudiantes sin acceso, (4) crear grupos de estudio donde un estudiante con acceso comparte el video con quienes no tienen.",
                    extra: "Estrategia comprobada: el video enviado por WhatsApp se descarga con wifi escolar el viernes y se ve el fin de semana sin internet. Un video de 8 minutos en calidad media ocupa entre 30 y 80 MB: perfectamente manejable."
                },
                {
                    id: 32,
                    type: "content",
                    title: "📵 Estudiantes que no vieron el video: ¿qué hago?",
                    content: "Inevitablemente, algunos estudiantes llegarán a clase sin ver el video. Estrategias: (1) inicio de clase: 10 minutos en el rincón de 'ponerse al día' con auriculares mientras el resto trabaja, (2) compañero tutor: un estudiante que sí vio explica brevemente al que no, (3) actividad alternativa diferente que se conecta al tema sin el video previo.",
                    extra: "Clave pedagógica: no repitas el video completo para 2 o 3 estudiantes en detrimento del 90% que sí lo vio. El sistema no puede ajustarse siempre al mínimo. Diseña soluciones para el individuo sin sacrificar al grupo."
                },
                {
                    id: 33,
                    type: "quiz",
                    title: "✅ Comprobemos lo aprendido",
                    question: "¿Cuál es la estrategia más efectiva para un estudiante guatemalteco sin internet en casa que necesita ver el video del aula invertida?",
                    options: [
                        "Pedirle que no participe en la actividad de clase hasta que vea el video",
                        "Repetir la explicación del video en clase para que no se pierda nada",
                        "Enviar el video por WhatsApp para que se descargue en la escuela y lo vea sin internet",
                        "Eliminar el aula invertida y volver al modelo tradicional"
                    ],
                    correct: 2,
                    explanation: "Enviar el video por WhatsApp permite descargarlo con wifi escolar y verlo sin internet en casa. Esta solución es simple, gratuita y respeta la dignidad del estudiante sin excluirlo ni penalizarlo por su situación de conectividad."
                },
                {
                    id: 34,
                    type: "content",
                    title: "👪 Resistencia de padres y directores: cómo comunicarlo",
                    content: "Algunos padres y directores pueden ver el aula invertida con desconfianza: '¿el maestro ya no da clase?' Comunica el método con claridad: 'El video es la tarea nueva: ver una explicación en lugar de copiar ejercicios. La clase la usamos para practicar juntos con mi acompañamiento directo.' Invita a los padres a ver un video para que entiendan.",
                    extra: "Carta corta para padres de familia: 'En esta clase probaremos el aula invertida: los estudiantes verán un video corto antes de cada clase para aprender el tema nuevo. En clase practicarán con mi apoyo. Si tienen preguntas, con gusto les explico.' Simple, claro, sin tecnicismos."
                },
                {
                    id: 35,
                    type: "content",
                    title: "😰 'No tengo tiempo para grabar videos': solución realista",
                    content: "Grabar todos los videos desde cero es agotador. Alternativas: (1) usa videos de Khan Academy o YouTube que ya explican el tema, (2) comparte videos con colegas de tu misma materia (2 docentes graban 2 videos cada uno y se los intercambian), (3) graba solo los temas más difíciles y usa recursos existentes para los básicos.",
                    extra: "Modelo sostenible: si eres docente de matemáticas, tal vez ya existe en YouTube el video perfecto para tu clase. Usarlo no es trampa, es curaduría. Tu valor agregado está en la actividad presencial que diseñas, no en ser el actor del video."
                },
                {
                    id: 36,
                    type: "content",
                    title: "📊 Evaluación en el aula invertida: ¿cómo hacerlo?",
                    content: "En el aula invertida, la evaluación es continua y diversa: la entrada de clase (diagnóstica), la observación durante las actividades (formativa), los productos de los proyectos (sumativa). El docente evalúa mientras circula, no solo en el examen del viernes. Esto da una imagen más completa del aprendizaje real.",
                    extra: "Herramienta práctica: usa una rúbrica sencilla de 3 criterios para evaluar la actividad presencial: participación, comprensión del concepto y calidad del producto. En 2 minutos calificas a un equipo de 4 mientras circula. Al final de clase tienes notas de todos."
                },
                {
                    id: 37,
                    type: "quiz",
                    title: "🎯 Pon a prueba tu comprensión",
                    question: "Un docente nuevo en aula invertida no tiene tiempo de grabar todos sus videos. ¿Cuál es la recomendación más práctica?",
                    options: [
                        "Abandonar el método hasta tener tiempo de grabar todos los videos",
                        "Curar videos de YouTube o Khan Academy para los temas básicos y grabar solo los más difíciles",
                        "Grabar un video de 45 minutos que cubra todo el tema de una vez",
                        "Pedir a los estudiantes que busquen sus propios videos sin orientación"
                    ],
                    correct: 1,
                    explanation: "La curaduría de videos existentes (YouTube, Khan Academy) es perfectamente válida y sostenible. El valor del docente no está en ser actor de video sino en seleccionar el mejor contenido y diseñar las actividades presenciales. Grabar solo donde se agrega valor único es la estrategia más eficiente."
                },
                {
                    id: 38,
                    type: "content",
                    title: "🏆 Casos de éxito en Guatemala: docentes que lo aplican",
                    content: "Profesor Carlos, de Huehuetenango: graba videos de matemáticas con su celular y los manda por WhatsApp. Sus estudiantes llegaron a resolver el doble de problemas en clase. Maestra Lucía, de Escuintla: usa videos de Khan Academy para ciencias. Ahora tiene 30 minutos libres en clase para experimentos que antes no podía hacer.",
                    extra: "El patrón en todos los casos exitosos guatemaltecos: empezaron con 1 tema en formato flipped, lo probaron por 3 semanas, ajustaron y luego expandieron. Ninguno comenzó con todo el currículo invertido. La paciencia y la iteración son parte del método."
                },
                {
                    id: 39,
                    type: "content",
                    title: "🌱 Cómo escalar el aula invertida gradualmente",
                    content: "Plan de implementación gradual: Semana 1-2: prueba con 1 lección (un video + una actividad). Semana 3-4: aplica en una unidad completa. Mes 2: incorpora a toda la materia de manera flexible. Mes 3: comparte tu experiencia con colegas. La escalada gradual reduce el riesgo y permite aprender del proceso.",
                    extra: "Indicador clave de éxito a las 4 semanas: ¿los estudiantes llegan a clase con preguntas específicas del video? Si es así, lo están viendo y pensando. Eso es exactamente lo que busca el aula invertida. Celebra ese logro antes de seguir escalando."
                },
                {
                    id: 40,
                    type: "quiz",
                    title: "✅ Quiz final del módulo",
                    question: "¿Cuál es la señal más clara de que el aula invertida está funcionando en tu grupo?",
                    options: [
                        "Los estudiantes memorizan perfectamente el contenido del video",
                        "No hay ningún estudiante que deje de ver los videos",
                        "Los estudiantes llegan a clase con preguntas específicas y el tiempo presencial es más activo",
                        "El docente ya no tiene que preparar clases porque el video lo explica todo"
                    ],
                    correct: 2,
                    explanation: "La señal más valiosa del aula invertida exitosa es que los estudiantes llegan con preguntas específicas (indicio de que vieron y procesaron el video) y que el tiempo de clase es activo y colaborativo. Eso significa que la inversión está funcionando: el conocimiento entra antes y la clase se usa para profundizar."
                }
            ]
        }

    ]
}
,
// ═══════════════════════════════════════════════════════════════════════════════
//  CURSOS: ABV — Aprendizaje Basado en Videos
//          MICRO-LEARNING — Aprender en Pequeñas Dosis
//  Programa de Formación Docente — Guatemala
// ═══════════════════════════════════════════════════════════════════════════════

// CURSO: abv
{
    id: 'abv',
    title: 'Aprendizaje Basado en Videos',
    subtitle: 'Usa el video como herramienta pedagógica poderosa en tu aula',
    icon: '🎬',
    color: '#10B981',
    prerequisite: [],
    status: 'available',
    durationHours: 3,
    totalCards: 35,
    modules: [

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 1 — El video en el aprendizaje: ciencia y pedagogía (9 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 1,
            title: "🧠 Módulo 1: El video en el aprendizaje: ciencia y pedagogía",
            cards: [
                {
                    id: 1,
                    type: "content",
                    title: "🎬 El video no es solo entretenimiento",
                    content: "Durante décadas se pensó que los videos en clase eran un 'descanso' del aprendizaje real. La investigación actual demuestra lo contrario: el video activa simultáneamente los canales visual y auditivo del cerebro, lo que duplica la retención de información respecto a leer un texto solo.",
                    extra: "Un estudio del MIT encontró que los estudiantes retienen hasta el 65% de la información vista en video, frente al 10% de la lectura pasiva. En Guatemala, donde muchos estudiantes son aprendices visuales y kinestésicos, esto es especialmente relevante."
                },
                {
                    id: 2,
                    type: "content",
                    title: "🧩 Cómo aprende el cerebro con videos",
                    content: "La Teoría de la Codificación Dual de Richard Mayer explica que el cerebro humano procesa la información por dos canales: el verbal (palabras) y el no verbal (imágenes y movimiento). Cuando ambos canales trabajan juntos —como en un video bien diseñado— el aprendizaje es más profundo y duradero.",
                    extra: "Esto se llama 'efecto multimedia'. No todos los videos aprovechan este principio: un video con texto que se lee en voz alta mientras aparece en pantalla satura los canales y reduce el aprendizaje."
                },
                {
                    id: 3,
                    type: "content",
                    title: "⏱️ La duración importa mucho",
                    content: "La investigación de Philip Guo (MIT, 2014) analizó 6.9 millones de visualizaciones en cursos en línea y encontró que la atención cae drásticamente después de los 6 minutos. Los videos de 0-3 minutos tienen el mayor nivel de atención. Los mejores videos educativos son breves y enfocados en un solo concepto.",
                    extra: "Regla práctica: si un video dura más de 8 minutos, busca si hay uno más corto sobre el mismo tema. Si no existe, planifica pausas activas cada 5-6 minutos durante la reproducción."
                },
                {
                    id: 4,
                    type: "quiz",
                    title: "✅ Quiz: Teoría de la Codificación Dual",
                    question: "Según la Teoría de la Codificación Dual, ¿por qué los videos bien diseñados favorecen el aprendizaje?",
                    options: [
                        "Porque entretienen a los estudiantes y los mantienen atentos",
                        "Porque activan simultáneamente el canal verbal y el no verbal del cerebro",
                        "Porque reducen el trabajo del docente en clase",
                        "Porque son más fáciles de evaluar que los textos"
                    ],
                    correct: 1,
                    explanation: "La Teoría de la Codificación Dual de Mayer establece que el aprendizaje es más efectivo cuando se activan a la vez el canal verbal (palabras) y el no verbal (imágenes/movimiento). Los videos bien diseñados logran exactamente eso."
                },
                {
                    id: 5,
                    type: "content",
                    title: "📺 Tipos de videos educativos",
                    content: "Existen varios formatos de video educativo, cada uno con propósitos distintos: (1) Tutoriales: muestran un proceso paso a paso. (2) Documentales: exploran un tema con profundidad y contexto. (3) Videos de proceso: muestran cómo se hace algo en tiempo real. (4) Screencasts: grabaciones de pantalla para explicar software o pasos digitales. (5) Animaciones: ideales para conceptos abstractos o invisibles.",
                    extra: "En el aula guatemalteca, los tutoriales y videos de proceso son especialmente útiles en ciencias y matemáticas, donde ver el 'cómo se hace' paso a paso refuerza la comprensión."
                },
                {
                    id: 6,
                    type: "content",
                    title: "🎭 Animaciones para conceptos abstractos",
                    content: "Las animaciones permiten visualizar lo que no se puede ver: el movimiento de los átomos, el ciclo del agua, cómo funciona el corazón o el recorrido de una ley en el Congreso. Para estudiantes guatemaltecos que tienen acceso limitado a laboratorios o museos, las animaciones compensan esa brecha experiencial.",
                    extra: "Canales como 'Kurzgesagt' (en inglés) y 'Smile and Learn' (en español) producen animaciones educativas de alta calidad. Muchos videos de Smile and Learn están disponibles gratuitamente en YouTube."
                },
                {
                    id: 7,
                    type: "content",
                    title: "🖥️ Screencasts: explica lo que haces en pantalla",
                    content: "Un screencast es la grabación de lo que ocurre en tu pantalla mientras explicas con tu voz. Es ideal para enseñar a usar aplicaciones, plataformas educativas o herramientas digitales. No requiere edición sofisticada: bastan herramientas como Loom, OBS Studio o incluso la función de grabación de pantalla del celular.",
                    extra: "Como docente, puedes grabar screencasts para que tus estudiantes revisen los pasos de una tarea o el uso de una aplicación cuantas veces necesiten, sin depender de que tú repitas la explicación."
                },
                {
                    id: 8,
                    type: "quiz",
                    title: "✅ Quiz: Tipos de video",
                    question: "Un docente quiere mostrar a sus estudiantes cómo realizar una operación matemática paso a paso. ¿Qué tipo de video sería más apropiado?",
                    options: [
                        "Un documental sobre la historia de las matemáticas",
                        "Una animación sobre conceptos abstractos",
                        "Un tutorial que muestre el proceso paso a paso",
                        "Un screencast de una página web de ejercicios"
                    ],
                    correct: 2,
                    explanation: "Los tutoriales son el formato ideal para mostrar procesos paso a paso, como la resolución de operaciones matemáticas. Su estructura secuencial guía al estudiante desde el inicio hasta el resultado."
                },
                {
                    id: 9,
                    type: "content",
                    title: "🇬🇹 El video en el contexto guatemalteco",
                    content: "En Guatemala, el video tiene un impacto especial: muchos estudiantes tienen acceso a YouTube desde sus celulares, incluso sin internet fijo en casa. Además, el aprendizaje visual es culturalmente significativo en comunidades donde la tradición oral e iconográfica (arte, tejidos, murales) es central. El video conecta con esa forma de aprender.",
                    extra: "Dato: según la ENCOVI 2021, más del 60% de los hogares guatemaltecos tienen acceso a smartphones. Esto significa que YouTube puede ser un canal educativo accesible para la mayoría de tus estudiantes fuera del aula."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 2 — Seleccionar y usar videos en clase (9 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 2,
            title: "🔍 Módulo 2: Seleccionar y usar videos en clase",
            cards: [
                {
                    id: 10,
                    type: "content",
                    title: "✅ Criterios para seleccionar un buen video",
                    content: "No todos los videos de YouTube son confiables o pedagógicamente adecuados. Antes de usar un video en clase, evalúa: (1) Fuente: ¿quién lo produjo? ¿Es una institución educativa, científica o un creador reconocido? (2) Fecha: ¿es información actualizada? (3) Rigor: ¿cita fuentes o presenta datos verificables? (4) Lenguaje: ¿es adecuado para la edad de tus estudiantes?",
                    extra: "Prefiere videos producidos por universidades, museos, organismos internacionales (como la OPS, UNESCO, UNICEF) o canales con historial verificable. Evita videos sin autoría clara o con afirmaciones sensacionalistas."
                },
                {
                    id: 11,
                    type: "content",
                    title: "⏳ La duración ideal según el nivel educativo",
                    content: "La duración adecuada de un video varía según la edad: Primaria (6-11 años): videos de 2-4 minutos. Básicos (12-15 años): videos de 4-7 minutos. Diversificado y adultos: videos de 6-10 minutos, con pausas. Superar estos tiempos sin planificar pausas activas reduce significativamente la atención y el aprendizaje.",
                    extra: "Truco guatemalteco: si el video está en inglés y tus estudiantes no lo manejan, busca si tiene subtítulos en español automáticos o si existe una versión doblada. YouTube ofrece subtítulos automáticos traducidos que, aunque imperfectos, funcionan para videos claros."
                },
                {
                    id: 12,
                    type: "quiz",
                    title: "✅ Quiz: Criterios de selección",
                    question: "¿Cuál de los siguientes criterios es MENOS relevante al seleccionar un video educativo para clase?",
                    options: [
                        "La fuente o institución que produjo el video",
                        "Que el video tenga muchas vistas y 'me gusta'",
                        "Que la información esté actualizada y sea verificable",
                        "Que el lenguaje sea adecuado para la edad de los estudiantes"
                    ],
                    correct: 1,
                    explanation: "El número de vistas o 'me gusta' no garantiza la calidad educativa de un video. Un video puede ser viral por razones de entretenimiento sin ofrecer información correcta o pedagógicamente adecuada. Siempre prioriza la fuente, el rigor y la pertinencia."
                },
                {
                    id: 13,
                    type: "content",
                    title: "🔮 Antes del video: activar predicciones",
                    content: "Una técnica poderosa es pedir a los estudiantes que predigan el contenido del video antes de verlo. Por ejemplo: 'Este video trata sobre la fotosíntesis. ¿Qué creen que necesita una planta para fabricar su alimento?' Las predicciones activan el conocimiento previo y crean una 'pregunta mental' que el video responde.",
                    extra: "Puedes hacer esto oralmente, en tarjetas de papel o en un chat de grupo de WhatsApp. Cuando el video confirma o corrige una predicción, el cerebro registra esa información con más fuerza que si la hubiera recibido pasivamente."
                },
                {
                    id: 14,
                    type: "content",
                    title: "⏸️ Durante el video: pausas reflexivas",
                    content: "Las pausas planificadas durante el video transforman la experiencia pasiva en activa. Detén el video en momentos clave y pregunta: '¿Qué acaba de pasar?' '¿Por qué creen que ocurre esto?' '¿Esto les recuerda algo que vieron antes?' Estas micro-reflexiones consolidan el aprendizaje en tiempo real.",
                    extra: "Planifica pausas cada 3-5 minutos. Antes de reproducir el video, avisa a los estudiantes que habrá paradas para pensar juntos. Esto los mantiene en estado de alerta activa durante toda la reproducción."
                },
                {
                    id: 15,
                    type: "content",
                    title: "💬 Después del video: preguntas que profundizan",
                    content: "Las mejores preguntas post-video no preguntan '¿qué dijo el video?' sino que invitan a pensar: '¿Están de acuerdo con lo que presentó el video? ¿Por qué?' '¿Qué preguntas les surgieron?' '¿Cómo se conecta esto con lo que vivimos en Guatemala?' Estas preguntas desarrollan pensamiento crítico.",
                    extra: "Técnica '3-2-1': pide a cada estudiante que anote 3 cosas que aprendió, 2 que le sorprendieron y 1 pregunta que le quedó. Es rápido, efectivo y funciona desde tercero primaria hasta diversificado."
                },
                {
                    id: 16,
                    type: "quiz",
                    title: "✅ Quiz: Pausas reflexivas",
                    question: "¿Cuál es el principal beneficio pedagógico de hacer pausas durante la reproducción de un video?",
                    options: [
                        "Permite que los estudiantes descansen y recarguen energía",
                        "Transforma la experiencia pasiva de ver en aprendizaje activo",
                        "Reduce el tiempo total que el docente necesita para cubrir el tema",
                        "Evita que los estudiantes se distraigan con el celular"
                    ],
                    correct: 1,
                    explanation: "Las pausas reflexivas transforman la experiencia pasiva (solo ver) en aprendizaje activo. Al detenerse y preguntar, los estudiantes procesan, conectan y consolidan la información en lugar de simplemente recibirla."
                },
                {
                    id: 17,
                    type: "content",
                    title: "📋 La guía de visualización: estructura tu clase con video",
                    content: "Una guía de visualización es una hoja sencilla que el estudiante completa mientras ve el video. Puede incluir: espacio para anotar 3 ideas principales, una pregunta abierta para responder al final, o un organizador gráfico que completan con pausas. Este instrumento sencillo aumenta dramáticamente la retención.",
                    extra: "No necesita ser elaborada. Puede ser media hoja de cuaderno con el título del video, tres renglones para ideas y una pregunta final. Lo importante es que el estudiante sepa que debe estar atento y tiene una tarea mientras ve."
                },
                {
                    id: 18,
                    type: "content",
                    title: "🔁 El video como recurso para repasar",
                    content: "Una ventaja única del video sobre la clase magistral: se puede repetir. Comparte el enlace del video con tus estudiantes para que lo revean en casa, lo muestren a sus familias o lo usen para estudiar antes de una evaluación. En contextos guatemaltecos con datos móviles limitados, descarga el video con anticipación usando herramientas como 'yt-dlp' o compártelo por WhatsApp.",
                    extra: "Puedes crear una lista de reproducción privada en YouTube con todos los videos de tu curso y compartir el enlace con tus estudiantes. Así tienen un 'banco de recursos' organizado y gratuito disponible en todo momento."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 3 — Crear tus propios videos educativos (9 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 3,
            title: "📱 Módulo 3: Crear tus propios videos educativos",
            cards: [
                {
                    id: 19,
                    type: "content",
                    title: "🎙️ Por qué crear tus propios videos",
                    content: "Cuando un docente crea su propio video, conecta el contenido con la realidad local de sus estudiantes: usa ejemplos de la comunidad, habla en el idioma familiar (incluso puede usar palabras en idiomas mayas), y adapta el ritmo a lo que sus estudiantes necesitan. Un video tuyo, aunque sencillo, supera en pertinencia a cualquier producción internacional.",
                    extra: "No necesitas equipo profesional. Miles de docentes en Latinoamérica crean contenido educativo valioso solo con su celular, buena iluminación natural y un guión de 5 oraciones."
                },
                {
                    id: 20,
                    type: "content",
                    title: "📝 El guión: tu mejor aliado",
                    content: "Antes de grabar, escribe un guión breve. No necesita ser palabra por palabra; puede ser una lista de puntos: (1) Saludo y tema, (2) ¿Por qué importa esto?, (3) Explicación del concepto con un ejemplo, (4) Resumen de 2-3 ideas clave, (5) Pregunta o tarea para el estudiante. Un guión de este tipo puede escribirse en 10 minutos y salvará tu grabación.",
                    extra: "Guión de bolsillo: escribe tus 5 puntos en un papel y pégalo detrás del celular mientras grabas. Puedes mirarlo discretamente sin que se note demasiado. Es una técnica sencilla usada por muchos youtubers educativos."
                },
                {
                    id: 21,
                    type: "quiz",
                    title: "✅ Quiz: Ventajas del video docente",
                    question: "¿Cuál es la principal ventaja de que un docente guatemalteco cree su propio video educativo frente a usar uno de YouTube?",
                    options: [
                        "Los videos propios siempre tienen mejor calidad de imagen",
                        "El docente puede adaptar el contenido al contexto local y la realidad de sus estudiantes",
                        "Los videos propios se pueden subir a YouTube y ganar suscriptores",
                        "El Ministerio de Educación exige que los docentes produzcan su propio material"
                    ],
                    correct: 1,
                    explanation: "La principal ventaja es la pertinencia contextual: un video propio puede usar ejemplos locales, hablar en el idioma o dialecto familiar, y adaptarse exactamente a lo que los estudiantes de esa comunidad necesitan. Eso no lo puede hacer ningún video internacional."
                },
                {
                    id: 22,
                    type: "content",
                    title: "💡 Iluminación y audio: los dos factores clave",
                    content: "La calidad de un video educativo depende principalmente del audio y la iluminación, no de la resolución de la cámara. Para audio: graba en un espacio tranquilo, sin ruido de tráfico o viento. Para iluminación: usa luz natural de frente (frente a una ventana), nunca con la ventana detrás de ti. Estas dos mejoras hacen que cualquier video sea profesional.",
                    extra: "Prueba de audio antes de grabar: graba 30 segundos y escúchalos con audífonos. Si escuchas tu voz clara y sin eco fuerte, estás listo. Si hay mucho eco, coloca ropa, cortinas o cojines alrededor para absorber el sonido."
                },
                {
                    id: 23,
                    type: "content",
                    title: "📐 Encuadre y posición de la cámara",
                    content: "Para videos donde apareces tú explicando: coloca el celular a la altura de los ojos (nunca desde abajo). Usa la regla de tercios: no te posiciones exactamente al centro, sino ligeramente a un lado. Deja espacio entre tu cabeza y el borde superior del encuadre. Esto hace que el video se vea más profesional sin ningún esfuerzo adicional.",
                    extra: "Si hablas frente a una pizarra o material físico: asegúrate de que el material sea visible y legible. Prueba filmando, revisando el video y ajustando la posición antes de grabar la versión final."
                },
                {
                    id: 24,
                    type: "content",
                    title: "🛠️ Herramientas para grabar y editar",
                    content: "Para grabar: la cámara de tu celular es suficiente. Para editar de forma sencilla, estas apps son gratuitas y fáciles de usar: (1) CapCut: edición intuitiva, subtítulos automáticos, ideal para principiantes. (2) InShot: recorta, une clips y agrega música. (3) Canva Video: plantillas para videos explicativos. Para screencasts: Loom (desde computadora) o la grabación de pantalla nativa del celular.",
                    extra: "Si nunca has editado video, empieza con CapCut. Tiene tutoriales en español dentro de la misma app y una curva de aprendizaje muy amigable. En 2 horas puedes producir tu primer video educativo editado."
                },
                {
                    id: 25,
                    type: "quiz",
                    title: "✅ Quiz: Calidad de video",
                    question: "Si tienes que elegir entre mejorar la cámara de tu celular o mejorar el audio de tus videos educativos, ¿qué recomienda la buena práctica?",
                    options: [
                        "Mejorar la cámara, porque la imagen es lo primero que nota el espectador",
                        "Ambos son igualmente importantes y deben mejorarse al mismo tiempo",
                        "Mejorar el audio, porque un video con imagen regular pero audio claro funciona bien",
                        "Ninguno: los estudiantes aceptan cualquier calidad si el docente es bueno"
                    ],
                    correct: 2,
                    explanation: "El audio es el factor más crítico en un video educativo. Los espectadores toleran imágenes de menor calidad, pero abandonan un video con audio malo o inaudible. Invierte primero en mejorar el ambiente de grabación para un buen sonido."
                },
                {
                    id: 26,
                    type: "content",
                    title: "🔒 Privacidad y uso responsable al publicar",
                    content: "Antes de publicar un video donde aparecen estudiantes, obtén el consentimiento escrito de sus padres o encargados. Si publicas en YouTube, puedes configurar el video como 'no listado' (solo accesible con el enlace) para compartirlo con tus estudiantes sin exponerlo al público general. Nunca publiques videos de menores sin autorización expresa.",
                    extra: "Alternativa segura: graba solo materiales donde apareces tú explicando, sin incluir el rostro o voz de estudiantes. Así puedes compartir libremente sin preocupaciones de privacidad."
                },
                {
                    id: 27,
                    type: "content",
                    title: "🚀 Tu primer video en 5 pasos",
                    content: "Sigue este proceso para tu primera producción: (1) Elige un concepto pequeño que puedas explicar en 3 minutos. (2) Escribe 5 puntos clave en un papel. (3) Graba en un lugar tranquilo con luz natural de frente. (4) Revisa el audio y la imagen. Si está aceptable, no perfecciones más: publícalo. (5) Comparte con un colega de confianza para recibir retroalimentación antes de usarlo con estudiantes.",
                    extra: "El perfeccionismo es el mayor obstáculo para crear contenido. Tu primer video no tiene que ser perfecto, tiene que existir. Con cada video mejorarás naturalmente."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 4 — Evaluación y canales recomendados (8 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 4,
            title: "📊 Módulo 4: Evaluación y canales recomendados",
            cards: [
                {
                    id: 28,
                    type: "content",
                    title: "📏 ¿Cómo evaluar el aprendizaje a través de videos?",
                    content: "La evaluación del aprendizaje basado en video debe ir más allá de 'vieron el video'. Estrategias efectivas: (1) Cuestionarios post-video con preguntas de comprensión y análisis. (2) Mapas conceptuales construidos después de ver. (3) Ensayos breves de opinión. (4) Debates o discusiones estructuradas basadas en el contenido. (5) Proyectos donde los estudiantes crean su propio video respondiendo a lo aprendido.",
                    extra: "La evaluación más poderosa es pedir a los estudiantes que enseñen el concepto: 'Explica con tus propias palabras lo que aprendiste del video'. Si pueden explicarlo, lo aprendieron."
                },
                {
                    id: 29,
                    type: "content",
                    title: "🎯 Rúbricas para evaluar videos creados por estudiantes",
                    content: "Cuando los estudiantes crean videos como evidencia de aprendizaje, necesitas una rúbrica clara. Evalúa: (1) Precisión del contenido: ¿es correcto lo que explican? (2) Claridad: ¿se entiende la explicación? (3) Uso de ejemplos: ¿ilustran con ejemplos concretos? (4) Organización: ¿tiene inicio, desarrollo y cierre? La producción técnica es secundaria.",
                    extra: "Comparte la rúbrica ANTES de que empiecen a grabar. Cuando los estudiantes conocen los criterios, su producción mejora significativamente y el proceso se convierte en un aprendizaje en sí mismo."
                },
                {
                    id: 30,
                    type: "quiz",
                    title: "✅ Quiz: Evaluación con video",
                    question: "Un docente pide a sus estudiantes que graben un video explicando el proceso de la fotosíntesis. ¿Qué criterio debería tener más peso en la evaluación?",
                    options: [
                        "La calidad visual y de audio del video",
                        "La duración del video (que cumpla con el tiempo asignado)",
                        "La precisión y claridad del contenido explicado",
                        "El número de efectos visuales y música de fondo"
                    ],
                    correct: 2,
                    explanation: "En la evaluación de videos educativos creados por estudiantes, la precisión y claridad del contenido siempre tiene mayor peso que la producción técnica. El objetivo es evaluar el aprendizaje del tema, no las habilidades de edición."
                },
                {
                    id: 31,
                    type: "content",
                    title: "📺 YouTube como canal educativo: organízalo",
                    content: "YouTube puede ser un caos o una biblioteca organizada: depende de ti. Crea una cuenta de YouTube exclusivamente para tus recursos docentes. Organiza tus videos favoritos en listas de reproducción por grado, materia o unidad. Comparte solo el enlace de la lista con tus estudiantes. Así tendrán acceso a recursos curados, no al algoritmo general de YouTube.",
                    extra: "Activa el 'Modo restringido' de YouTube para filtrar contenido inapropiado. En la cuenta del colegio o en los dispositivos del aula, este ajuste se puede configurar para que siempre esté activo."
                },
                {
                    id: 32,
                    type: "content",
                    title: "🌟 Canales en español recomendados: ciencias",
                    content: "Para ciencias naturales y exactas: (1) Veritasium en Español: fenómenos científicos con experimentos. (2) Ciencia y Más: biología, química y física de forma visual. (3) Khan Academy en Español: matemáticas y ciencias con explicaciones graduadas. (4) Cosmos: Carl Sagan y Neil deGrasse Tyson con subtítulos en español. (5) TED-Ed en Español: ideas científicas en menos de 10 minutos.",
                    extra: "Khan Academy en Español es especialmente valiosa: es gratuita, sin anuncios, cubre todos los niveles desde primaria hasta bachillerato y tiene ejercicios interactivos que complementan los videos."
                },
                {
                    id: 33,
                    type: "content",
                    title: "📚 Canales en español recomendados: humanidades",
                    content: "Para historia, lengua, arte y ciencias sociales: (1) Crash Course en Español: historia universal con animaciones. (2) Academia Play: historia y cultura en videos cortos. (3) El Orden Mundial: geopolítica y actualidad. (4) Date un Vlog: historia de forma entretenida. (5) Yulay: exploración cultural y geográfica. Para Guatemala específicamente: el canal del INGUAT y el Archivo General de Centroamérica tienen material valioso.",
                    extra: "Busca también documentales de la BBC en español disponibles en YouTube. Son rigurosos, bien producidos y abordan temas de historia universal con perspectiva latinoamericana en muchos casos."
                },
                {
                    id: 34,
                    type: "quiz",
                    title: "✅ Quiz: Organización de YouTube",
                    question: "¿Cuál es la mejor práctica para compartir videos de YouTube con estudiantes de primaria?",
                    options: [
                        "Dar acceso libre a YouTube para que cada estudiante busque lo que necesita",
                        "Crear listas de reproducción curadas con los videos seleccionados y compartir solo ese enlace",
                        "Descargar todos los videos y copiarlos en memorias USB para cada estudiante",
                        "Proyectar los videos en clase sin que los estudiantes tengan acceso al enlace"
                    ],
                    correct: 1,
                    explanation: "Las listas de reproducción curadas permiten compartir recursos seleccionados sin exponer a los estudiantes al algoritmo general de YouTube, que puede recomendar contenido inapropiado. Es la práctica más segura y pedagógicamente organizada."
                },
                {
                    id: 35,
                    type: "content",
                    title: "🏁 Tu plan de acción: primeros pasos",
                    content: "Para empezar a usar videos educativos de forma efectiva esta semana: (1) Identifica un tema de tu próxima clase y busca un video de menos de 6 minutos en YouTube. (2) Evalúalo con los criterios aprendidos en este curso. (3) Prepara 3 preguntas para discutir después del video. (4) Úsalo en clase con al menos una pausa reflexiva. (5) Reflexiona: ¿qué funcionó? ¿qué cambiarías? Así empieza la mejora continua.",
                    extra: "No esperes tener todo perfecto para empezar. Un video bien seleccionado con tres buenas preguntas al final ya transforma una clase. La práctica constante y la reflexión son lo que convierte a un docente en experto en ABV."
                }
            ]
        }
    ]
},

// CURSO: micro-learning
{
    id: 'micro-learning',
    title: 'Micro-learning: Aprender en Pequeñas Dosis',
    subtitle: 'Diseña cápsulas de aprendizaje de 2 a 10 minutos que realmente funcionan',
    icon: '⚡',
    color: '#6366F1',
    prerequisite: [],
    status: 'available',
    durationHours: 3,
    totalCards: 35,
    modules: [

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 1 — ¿Qué es el micro-learning y por qué funciona? (9 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 1,
            title: "⚡ Módulo 1: ¿Qué es el micro-learning y por qué funciona?",
            cards: [
                {
                    id: 1,
                    type: "content",
                    title: "⚡ ¿Qué es el micro-learning?",
                    content: "El micro-learning es una estrategia educativa que organiza el aprendizaje en cápsulas breves y enfocadas de 2 a 10 minutos, cada una dedicada a un solo concepto o habilidad. A diferencia de las clases largas, cada cápsula tiene un objetivo claro, un formato específico y termina con una acción concreta que el estudiante puede realizar de inmediato.",
                    extra: "El término viene del inglés 'microlearning', pero el concepto es tan antiguo como los refranes y los proverbios: pequeñas dosis de sabiduría diseñadas para ser recordadas fácilmente. Lo nuevo es aplicarlo con intención pedagógica y herramientas digitales."
                },
                {
                    id: 2,
                    type: "content",
                    title: "🧠 La curva del olvido de Ebbinghaus",
                    content: "En 1885, el psicólogo alemán Hermann Ebbinghaus demostró que olvidamos el 50% de lo aprendido en la primera hora, el 70% en 24 horas y hasta el 90% en una semana, si no repasamos. Este fenómeno se llama la 'curva del olvido' y explica por qué las clases largas sin repetición son poco efectivas.",
                    extra: "El micro-learning combate la curva del olvido de dos formas: (1) Reparte el aprendizaje en pequeñas dosis que se pueden revisar frecuentemente. (2) Cada cápsula termina con una acción o reflexión que consolida la memoria antes de que ocurra el olvido."
                },
                {
                    id: 3,
                    type: "content",
                    title: "🔋 Memoria de trabajo: por qué menos es más",
                    content: "La memoria de trabajo es la 'pantalla mental' donde procesamos información consciente. Su capacidad es limitada: el psicólogo George Miller demostró que solo podemos manejar 7 (±2) elementos a la vez. Una clase densa de 45 minutos con 15 conceptos nuevos satura esta capacidad. Una cápsula de 5 minutos con 1-2 conceptos la respeta.",
                    extra: "Cuando la memoria de trabajo se satura, el cerebro empieza a 'botar' información para hacer espacio. Por eso, al final de una clase larga y densa, los estudiantes recuerdan el principio y el final, pero poco del medio. El micro-learning diseña para esta limitación."
                },
                {
                    id: 4,
                    type: "quiz",
                    title: "✅ Quiz: Curva del olvido",
                    question: "Según la curva del olvido de Ebbinghaus, ¿qué porcentaje aproximado de lo aprendido olvidamos en las primeras 24 horas sin repasar?",
                    options: [
                        "Aproximadamente el 20%",
                        "Aproximadamente el 40%",
                        "Aproximadamente el 70%",
                        "Aproximadamente el 90%"
                    ],
                    correct: 2,
                    explanation: "Ebbinghaus demostró que olvidamos aproximadamente el 70% de la información nueva en las primeras 24 horas si no ocurre ningún repaso. Este dato fundamenta la necesidad de estrategias como el micro-learning, que distribuyen y repiten el aprendizaje en el tiempo."
                },
                {
                    id: 5,
                    type: "content",
                    title: "🎯 Atención sostenida: el límite real",
                    content: "Estudios de neurociencia muestran que la atención sostenida de alta calidad dura entre 10 y 20 minutos en adultos, y menos en niños y adolescentes. Después, la atención 'colapsa' aunque la persona siga físicamente presente. El micro-learning trabaja dentro de esta ventana natural de atención en lugar de luchar contra ella.",
                    extra: "En el contexto escolar guatemalteco, donde muchos estudiantes llegan a clase con fatiga, hambre o preocupaciones familiares, la ventana de atención real puede ser incluso más corta. El micro-learning es una respuesta pedagógica realista a este contexto."
                },
                {
                    id: 6,
                    type: "content",
                    title: "📱 Por qué el micro-learning encaja con la vida digital",
                    content: "Los estudiantes actuales consumen contenido en TikTok, YouTube Shorts, Instagram Reels: todos formatos de 15 segundos a 3 minutos. No es que tengan 'menos atención'; es que están habituados a formatos densos y breves. El micro-learning no lucha contra esto: lo aprovecha para la educación.",
                    extra: "Un estudio de Software Advice encontró que el 58% de empleados y estudiantes prefieren aprender en módulos de menos de 10 minutos. Diseñar para esta preferencia no es 'bajar el nivel', es ser pedagógicamente inteligente."
                },
                {
                    id: 7,
                    type: "content",
                    title: "🇬🇹 Micro-learning en el aula guatemalteca",
                    content: "En Guatemala, el micro-learning tiene sentido práctico adicional: muchos docentes tienen períodos de 45 minutos compartidos entre contenido, disciplina y logística. Una secuencia de 3 cápsulas de 8 minutos con 5 minutos de actividad cada una cubre exactamente ese período. Además, las cápsulas pueden compartirse por WhatsApp para estudiantes que faltaron.",
                    extra: "El micro-learning también funciona para la formación continua de docentes: una cápsula de 5 minutos por semana sobre una estrategia pedagógica es más sostenible que un taller de 8 horas cada semestre."
                },
                {
                    id: 8,
                    type: "quiz",
                    title: "✅ Quiz: Memoria de trabajo",
                    question: "¿Cuántos elementos puede manejar la memoria de trabajo humana de forma simultánea, según George Miller?",
                    options: [
                        "Entre 3 y 5 elementos",
                        "Entre 7 y 9 elementos (7 ± 2)",
                        "Entre 12 y 15 elementos",
                        "Depende completamente de la persona y no hay un límite general"
                    ],
                    correct: 1,
                    explanation: "George Miller estableció en su influyente artículo de 1956 que la memoria de trabajo puede manejar 7 (±2) elementos a la vez, es decir entre 5 y 9 piezas de información. Superar este límite satura la capacidad de procesamiento y reduce el aprendizaje."
                },
                {
                    id: 9,
                    type: "content",
                    title: "✨ El principio clave: un concepto, una cápsula",
                    content: "La regla de oro del micro-learning es: una cápsula, un objetivo, una acción. Cada unidad de aprendizaje responde a una sola pregunta o enseña una sola habilidad. Este principio parece sencillo, pero rompe con la tradición educativa que mezcla varios conceptos en una misma clase.",
                    extra: "Ejercicio de reflexión: piensa en tu próxima clase. ¿Cuántos conceptos distintos planeas enseñar? Si son más de 3, es candidata perfecta para convertirse en una secuencia de micro-cápsulas en lugar de una clase tradicional."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 2 — Diseñando micro-cápsulas efectivas (9 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 2,
            title: "🎨 Módulo 2: Diseñando micro-cápsulas efectivas",
            cards: [
                {
                    id: 10,
                    type: "content",
                    title: "🏗️ La anatomía de una micro-cápsula",
                    content: "Toda micro-cápsula efectiva tiene tres partes: (1) Gancho (0-30 segundos): una pregunta, dato sorprendente o problema que activa la curiosidad. (2) Núcleo (el 80% del tiempo): la explicación del único concepto, con un ejemplo concreto. (3) Cierre-acción (últimos 30 segundos): qué puede hacer el estudiante ahora mismo con lo aprendido.",
                    extra: "El cierre-acción es lo que diferencia el micro-learning del simple 'contenido breve'. La acción puede ser: responder una pregunta, probar algo, reflexionar sobre su práctica, o buscar un ejemplo en su entorno."
                },
                {
                    id: 11,
                    type: "content",
                    title: "🎯 Cómo redactar un objetivo específico para tu cápsula",
                    content: "Un buen objetivo de micro-cápsula empieza con un verbo de acción observable y se puede lograr en el tiempo de la cápsula. Ejemplos malos: 'Entender la fotosíntesis' (demasiado amplio). Ejemplos buenos: 'Identificar los tres ingredientes que necesita la fotosíntesis' o 'Distinguir entre respiración celular y fotosíntesis usando un ejemplo'.",
                    extra: "Pregunta de verificación: ¿Puedes saber si el estudiante logró el objetivo en 30 segundos de conversación o con una pregunta directa? Si la respuesta es sí, el objetivo es suficientemente específico para una micro-cápsula."
                },
                {
                    id: 12,
                    type: "quiz",
                    title: "✅ Quiz: Anatomía de la micro-cápsula",
                    question: "¿Qué elemento de la micro-cápsula la diferencia del simple contenido breve y asegura que el aprendizaje sea activo?",
                    options: [
                        "El gancho inicial que activa la curiosidad",
                        "La calidad visual del material utilizado",
                        "El cierre con una acción concreta que el estudiante puede realizar",
                        "La duración exacta de la cápsula (ni más ni menos de 5 minutos)"
                    ],
                    correct: 2,
                    explanation: "El cierre-acción es el elemento que transforma una cápsula de información en una cápsula de aprendizaje. Pedir al estudiante que haga algo con lo aprendido (responder, probar, reflexionar) consolida el conocimiento y lo hace aplicable."
                },
                {
                    id: 13,
                    type: "content",
                    title: "🖼️ Formatos de micro-cápsulas",
                    content: "El micro-learning no tiene un solo formato. Puedes usar: (1) Video corto de 2-5 minutos. (2) Infografía de una sola página con 5-7 datos clave. (3) Audio o podcast de 3-8 minutos (ideal para desplazamientos). (4) Tarjeta didáctica digital (como las de esta plataforma). (5) Texto con imagen: una pantalla de contenido más una pregunta. Elige el formato según el concepto y los recursos disponibles.",
                    extra: "Regla de oro del formato: el formato debe servir al concepto, no al revés. Un concepto que requiere ver movimiento (como una célula dividiéndose) pide video. Un concepto que requiere comparar datos pide infografía. Un concepto que requiere escuchar un modelo de pronunciación pide audio."
                },
                {
                    id: 14,
                    type: "content",
                    title: "✍️ Escribir para micro-learning: el arte de la brevedad",
                    content: "Escribir micro-contenido es más difícil que escribir largo: requiere eliminar todo lo que no es esencial. Técnica de los tres pasos: (1) Escribe lo que quieres decir sin limitación. (2) Subraya solo las ideas que el estudiante NECESITA para el objetivo. (3) Elimina todo lo demás. Lo que queda es el núcleo de tu micro-cápsula.",
                    extra: "Si una idea importante no cabe en la cápsula, no la comprimas: crea otra cápsula para ella. Comprimir demasiado produce textos densos e ilegibles. La solución siempre es dividir, no comprimir."
                },
                {
                    id: 15,
                    type: "content",
                    title: "🔑 El ejemplo concreto: el corazón de cada cápsula",
                    content: "Todo concepto abstracto necesita al menos un ejemplo concreto y local. En Guatemala: cuando expliques fracciones, usa ejemplos de comida típica (mitad de un tamal, un cuarto de tortilla). Cuando expliques ecosistemas, usa ejemplos del altiplano, la costa o el Petén. El ejemplo concreto es lo que ancla el concepto en la memoria.",
                    extra: "Investigación sobre pedagogía culturalmente pertinente muestra que los estudiantes guatemaltecos retienen hasta 40% más cuando los ejemplos se conectan con su contexto familiar inmediato: comida, mercado, naturaleza local, vida comunitaria."
                },
                {
                    id: 16,
                    type: "quiz",
                    title: "✅ Quiz: Objetivos de micro-cápsula",
                    question: "¿Cuál de los siguientes es un objetivo ADECUADO para una micro-cápsula de aprendizaje?",
                    options: [
                        "Comprender la historia completa de la Revolución de Octubre de 1944 en Guatemala",
                        "Identificar dos causas principales que motivaron la Revolución de Octubre",
                        "Valorar la importancia de los movimientos sociales para la democracia",
                        "Estudiar el contexto político, económico y social de Guatemala en la primera mitad del siglo XX"
                    ],
                    correct: 1,
                    explanation: "Identificar dos causas específicas es un objetivo acotado, verificable y alcanzable en el tiempo de una micro-cápsula. Los otros objetivos son demasiado amplios o abstractos para una sola cápsula de 2-10 minutos."
                },
                {
                    id: 17,
                    type: "content",
                    title: "🔁 La repetición espaciada: refuerza sin aburrir",
                    content: "La repetición espaciada es la práctica de revisar la misma información en intervalos crecientes: hoy, mañana, en 3 días, en una semana, en un mes. El micro-learning es ideal para implementarla: una cápsula de 2 minutos de repaso el día siguiente consolida el aprendizaje mejor que estudiar el mismo tema por 20 minutos una sola vez.",
                    extra: "Puedes implementar repetición espaciada de forma sencilla: al inicio de cada clase, dedica 3 minutos a revisar lo de ayer. Una pregunta oral o una tarjeta de repaso es suficiente. Este 'micro-repaso' al inicio de cada sesión transforma la retención de tus estudiantes."
                },
                {
                    id: 18,
                    type: "content",
                    title: "🧩 De la cápsula al concepto complejo: planificación en capas",
                    content: "Un concepto complejo se puede enseñar en micro-capas: Día 1: ¿Qué es? (definición y ejemplo). Día 2: ¿Cómo funciona? (proceso o mecanismo). Día 3: ¿Por qué importa? (aplicación y relevancia). Día 4: ¿Cómo lo uso yo? (práctica guiada). Día 5: Repaso integrador. Así, en 5 cápsulas de 5-8 minutos, has cubierto un concepto complejo con profundidad real.",
                    extra: "Este enfoque en capas es especialmente útil para conceptos científicos abstractos, gramática compleja o procesos matemáticos de varios pasos. Cada capa debe ser comprensible por sí sola, pero también conectar con las capas anteriores."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 3 — Herramientas y canales para micro-learning (9 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 3,
            title: "🛠️ Módulo 3: Herramientas y canales para micro-learning",
            cards: [
                {
                    id: 19,
                    type: "content",
                    title: "📊 Infografías como micro-cápsulas visuales",
                    content: "Una infografía bien diseñada puede transmitir en 30 segundos lo que un texto tarda 5 minutos. Para crear infografías educativas: (1) Un solo tema por infografía. (2) Máximo 7 datos o puntos. (3) Jerarquía visual clara: el dato más importante, más grande. (4) Herramientas gratuitas: Canva (con plantillas educativas), Piktochart o Adobe Express.",
                    extra: "Para docentes guatemaltecos sin mucho tiempo: Canva tiene plantillas educativas en español que se pueden adaptar en 15 minutos. Descarga la app en tu celular y puedes crear infografías en cualquier momento libre."
                },
                {
                    id: 20,
                    type: "content",
                    title: "🎵 Audios educativos: el micro-learning para el oído",
                    content: "Los audios son cápsulas perfectas para temas que requieren escuchar: pronunciación de idiomas, lectura en voz alta de textos literarios, explicaciones para estudiantes con dificultades de lectura, o contenido para escuchar durante el desplazamiento. Herramientas gratuitas: Anchor (ahora Spotify for Podcasters), grabaciones de voz en WhatsApp, o la grabadora nativa del celular.",
                    extra: "Los audios son especialmente valiosos para comunidades guatemaltecas con alta diversidad lingüística: puedes crear versiones de tus micro-cápsulas en español y en el idioma maya de tu comunidad, haciendo el contenido realmente accesible para todos."
                },
                {
                    id: 21,
                    type: "quiz",
                    title: "✅ Quiz: Selección de formato",
                    question: "Un docente quiere enseñar la diferencia entre 'b' y 'v' en español a estudiantes de segundo primaria. ¿Qué formato de micro-cápsula sería más efectivo?",
                    options: [
                        "Una infografía con la diferencia visual entre las dos letras",
                        "Un texto escrito con las reglas ortográficas de uso",
                        "Un audio con ejemplos de palabras con 'b' y 'v' para escuchar y repetir",
                        "Un video de dibujos animados sobre el abecedario"
                    ],
                    correct: 2,
                    explanation: "Aprender a distinguir sonidos requiere escucharlos, no solo verlos. Un audio con ejemplos claros de palabras con 'b' y 'v' activa el canal auditivo de aprendizaje, que es el más adecuado para este objetivo. El video podría funcionar si combina audio con visuales del movimiento de la boca."
                },
                {
                    id: 22,
                    type: "content",
                    title: "💬 WhatsApp como canal de micro-learning",
                    content: "WhatsApp es la plataforma más usada en Guatemala, presente en prácticamente todos los hogares con smartphone. Úsalo para micro-learning: (1) Notas de voz de 2-3 minutos con una explicación. (2) Imágenes de infografías con una pregunta reflexiva. (3) Videos cortos del docente explicando un concepto. (4) Preguntas del día para reflexionar. Todo esto puede enviarse al grupo de clase.",
                    extra: "Protocolo de uso responsable: establece desde el inicio las normas del grupo (solo contenido educativo, respeto mutuo, sin reenvíos externos). Informa a los padres sobre el propósito del grupo. Usa listas de difusión en lugar de grupos si prefieren que los estudiantes no se comuniquen entre sí."
                },
                {
                    id: 23,
                    type: "content",
                    title: "🌟 Stickers educativos en WhatsApp",
                    content: "Los stickers personalizados son un recurso micro-learning poco explorado. Puedes crear packs de stickers con: reglas gramaticales ilustradas, fórmulas matemáticas, vocabulario con imagen, líneas de tiempo en miniatura. Herramientas: WhatsApp Sticker Maker (app gratuita) o Canva (que exporta en formato de sticker).",
                    extra: "Los stickers educativos funcionan como 'recordatorios visuales' que los estudiantes ven en su vida cotidiana de WhatsApp. Un estudiante que usa stickers de gramática cuando chatea está reforzando reglas de forma completamente natural."
                },
                {
                    id: 24,
                    type: "content",
                    title: "🃏 Tarjetas didácticas digitales",
                    content: "Las tarjetas didácticas (flashcards) digitales son la forma más clásica de micro-learning. Plataformas como Quizlet, Anki y Brainscape permiten crear colecciones de tarjetas con pregunta y respuesta que el estudiante repasa con repetición espaciada automática. Son ideales para vocabulario, fórmulas, fechas históricas y conceptos de definición.",
                    extra: "Anki es completamente gratuita (app móvil y web) y usa un algoritmo de repetición espaciada muy sofisticado. Quizlet tiene una versión gratuita con funciones suficientes para uso escolar. Ambas tienen colecciones de tarjetas ya creadas en español que puedes usar directamente."
                },
                {
                    id: 25,
                    type: "quiz",
                    title: "✅ Quiz: WhatsApp educativo",
                    question: "¿Cuál de las siguientes es una práctica recomendada al usar WhatsApp para micro-learning con estudiantes?",
                    options: [
                        "Agregar a todos los contactos del colegio al mismo grupo para mayor alcance",
                        "Enviar mensajes a cualquier hora del día para aprovechar todos los momentos",
                        "Establecer normas claras del grupo e informar a los padres sobre su propósito",
                        "Reenviar contenido de otros grupos para diversificar los recursos"
                    ],
                    correct: 2,
                    explanation: "Las normas claras y la comunicación con las familias son fundamentales para el uso responsable de WhatsApp en educación. Sin estas bases, el grupo puede perder su propósito educativo o generar problemas de privacidad y convivencia digital."
                },
                {
                    id: 26,
                    type: "content",
                    title: "🎬 Videos cortos como micro-cápsulas",
                    content: "TikTok, YouTube Shorts y los Reels de Instagram han popularizado el video de menos de 3 minutos. Como docente puedes usar estos formatos: graba explicaciones de 60-90 segundos de un concepto clave, con un ejemplo visual y una pregunta al final. No necesitas publicarlos en redes: puedes enviarlos directamente por WhatsApp o almacenarlos en Google Drive.",
                    extra: "Técnica del 'video reels pedagógico': graba de pie, en vertical (como una foto de celular), con texto sobreimpreso mostrando los puntos clave mientras hablas. CapCut y InShot permiten agregar estos textos de forma muy sencilla."
                },
                {
                    id: 27,
                    type: "content",
                    title: "🗂️ Organiza tu banco de micro-cápsulas",
                    content: "Conforme crees micro-cápsulas, necesitas organizarlas para reutilizarlas. Estrategia sencilla: crea una carpeta en Google Drive con subcarpetas por grado y materia. Usa nombres descriptivos: '5to_primaria_fracciones_que_es.mp4'. Comparte la carpeta con colegas del mismo grado para construir un banco colectivo de recursos.",
                    extra: "Un banco colectivo de micro-cápsulas entre docentes del mismo colegio puede ahorrarte horas de trabajo: si tu colega ya creó una cápsula excelente sobre el sistema respiratorio, puedes usarla directamente o adaptarla, en lugar de crearla desde cero."
                }
            ]
        },

        // ══════════════════════════════════════════════════════════════════════
        //  MÓDULO 4 — Secuencias y evaluación del micro-aprendizaje (8 tarjetas)
        // ══════════════════════════════════════════════════════════════════════
        {
            id: 4,
            title: "📈 Módulo 4: Secuencias y evaluación del micro-aprendizaje",
            cards: [
                {
                    id: 28,
                    type: "content",
                    title: "🔗 Cómo encadenar cápsulas: la secuencia de aprendizaje",
                    content: "Las micro-cápsulas son más poderosas cuando se encadenan en una secuencia con lógica pedagógica. Tipos de secuencias: (1) Lo simple a lo complejo: empieza con el concepto básico y avanza gradualmente. (2) Lo concreto a lo abstracto: empieza con un ejemplo tangible y llega al principio general. (3) Problema-solución: presenta el problema primero, luego las cápsulas que lo resuelven.",
                    extra: "Analogía guatemalteca: una secuencia de micro-cápsulas es como un tejido maya. Cada hilo (cápsula) es completo por sí solo, pero el patrón completo (la secuencia) revela el diseño total. Cada cápsula debe tener sentido sola Y contribuir al conjunto."
                },
                {
                    id: 29,
                    type: "content",
                    title: "🗓️ Planificando una secuencia semanal",
                    content: "Ejemplo de secuencia semanal para un concepto complejo como 'La célula': Lunes: ¿Qué es la célula? (definición + ejemplo cotidiano). Martes: Las partes de la célula (membrana, núcleo, citoplasma). Miércoles: Diferencias entre célula animal y vegetal. Jueves: ¿Cómo se reproduce la célula? Viernes: Mini-evaluación + repaso. Cinco cápsulas de 5-7 minutos equivalen a 25-35 minutos de aprendizaje concentrado y efectivo.",
                    extra: "Esta secuencia puede funcionar como actividad de inicio de clase (7 minutos) o como tarea diaria enviada por WhatsApp. En ambos casos, el aprendizaje se distribuye en el tiempo respetando la curva del olvido de Ebbinghaus."
                },
                {
                    id: 30,
                    type: "quiz",
                    title: "✅ Quiz: Secuencias de micro-learning",
                    question: "¿Cuál es la principal ventaja de organizar las micro-cápsulas en una secuencia pedagógica en lugar de usarlas de forma aislada?",
                    options: [
                        "Las secuencias son más fáciles de crear que las cápsulas individuales",
                        "Permiten construir conceptos complejos distribuyendo el aprendizaje en el tiempo",
                        "Evitan que los estudiantes tengan que interactuar con el contenido fuera del aula",
                        "Reducen la necesidad de evaluar cada cápsula por separado"
                    ],
                    correct: 1,
                    explanation: "La secuencia pedagógica permite construir conceptos complejos de forma gradual, distribuyendo el aprendizaje en el tiempo y aprovechando la curva del olvido para reforzar en los momentos óptimos. Esto es imposible con cápsulas aisladas sin conexión entre sí."
                },
                {
                    id: 31,
                    type: "content",
                    title: "📊 Cómo evaluar el micro-learning: estrategias rápidas",
                    content: "La evaluación del micro-learning debe ser tan ágil como el contenido. Estrategias de evaluación breve: (1) Una pregunta de verificación al final de cada cápsula (oral o escrita, 1 minuto). (2) 'Ticket de salida': en una tarjeta, el estudiante escribe una cosa que aprendió y una pregunta que le quedó. (3) Mini-quiz de 3 preguntas al final de la semana. (4) Autoevaluación: '¿Puedo explicar esto a un compañero? Sí / No / Más o menos'.",
                    extra: "El 'ticket de salida' es una de las estrategias de evaluación formativa más investigadas y efectivas. Tarda menos de 2 minutos, da información valiosa al docente sobre lo que se comprendió y lo que no, y activa la metacognición del estudiante."
                },
                {
                    id: 32,
                    type: "content",
                    title: "📱 Seguimiento digital del aprendizaje",
                    content: "Herramientas gratuitas para hacer seguimiento del micro-learning: (1) Google Forms: envía el mini-quiz como formulario y las respuestas se organizan automáticamente en una hoja de cálculo. (2) Kahoot o Quizizz: evaluación gamificada de 5-10 preguntas en 5 minutos. (3) Mentimeter: preguntas en tiempo real con visualización de respuestas. (4) Poll Everywhere: encuestas y preguntas rápidas para grupos grandes.",
                    extra: "Google Forms es la herramienta más accesible en Guatemala: es completamente gratuita, funciona bien con datos móviles limitados, y los resultados permiten identificar rápidamente qué conceptos necesitan más atención antes de avanzar."
                },
                {
                    id: 33,
                    type: "quiz",
                    title: "✅ Quiz: Evaluación formativa",
                    question: "¿Qué es un 'ticket de salida' en el contexto del micro-learning?",
                    options: [
                        "Un certificado que el estudiante recibe al completar todas las cápsulas de una secuencia",
                        "Una tarjeta o nota breve donde el estudiante escribe qué aprendió y qué pregunta le quedó",
                        "Un código QR que permite al docente registrar la asistencia digital de los estudiantes",
                        "Una evaluación sumativa de 20 preguntas al finalizar la unidad"
                    ],
                    correct: 1,
                    explanation: "El ticket de salida es una estrategia de evaluación formativa rápida: el estudiante escribe en 2 minutos qué aprendió y qué duda le quedó. Informa al docente sobre la comprensión real del grupo y activa la metacognición del estudiante."
                },
                {
                    id: 34,
                    type: "content",
                    title: "🏆 Indicadores de éxito del micro-learning",
                    content: "¿Cómo saber si tu secuencia de micro-learning está funcionando? Indicadores cualitativos: los estudiantes hacen preguntas más profundas, los estudiantes pueden explicar el concepto a otros, los errores en las evaluaciones disminuyen. Indicadores cuantitativos: participación en los quizzes, resultados de los tickets de salida, calificaciones en evaluaciones formales.",
                    extra: "El indicador más honesto: pregúntate si un estudiante que faltó una semana puede ponerse al día usando solo las micro-cápsulas. Si la respuesta es sí, tu secuencia tiene suficiente claridad y autoexplicación."
                },
                {
                    id: 35,
                    type: "content",
                    title: "🚀 Tu plan de micro-learning: empieza esta semana",
                    content: "Para implementar micro-learning esta semana: (1) Identifica un concepto que tus estudiantes encuentran difícil. (2) Diseña 3 cápsulas de 5-7 minutos: qué es, cómo funciona, para qué sirve. (3) Elige un formato para cada una (video, audio o infografía). (4) Crea la primera cápsula hoy. (5) Compártela mañana. Evalúa con un ticket de salida. (6) Mejora la siguiente cápsula con lo que aprendiste. El micro-learning también es iterativo.",
                    extra: "Recuerda: el objetivo no es la perfección técnica, sino el aprendizaje de tus estudiantes. Una nota de voz de 5 minutos enviada por WhatsApp esta noche puede ser tu primera micro-cápsula. ¡El momento para empezar es ahora!"
                }
            ]
        }
    ]
}
]; // end allCourses

const courseData = allCourses[0]; // backward compat — STEAM es el curso por defecto

// ============================================================
// EXAMEN MAESTRO — "Docente del Siglo XXI"
// 40 preguntas: mezcla de los 5 cursos + preguntas exclusivas de síntesis
// Se eligen 30 al azar cada intento. Mínimo para aprobar: 75%
// ============================================================
const MASTER_EXAM = {
    title: '🎓 Examen Final — Docente del Siglo XXI',
    passingScore: 75,
    questions: [
        // ── STEAM (integración curricular) ──
        { id:'mx01', course:'steam',         text: '¿Qué diferencia fundamentalmente a STEAM de una enseñanza disciplinar separada?', options:['Que STEAM usa más tecnología','Que STEAM integra disciplinas para resolver problemas del mundo real','Que STEAM elimina las matemáticas','Que STEAM es solo para secundaria'], correct:1, explanation:'La integración es la clave: los estudiantes no aprenden Ciencia, Tecnología, Ingeniería, Artes y Matemáticas por separado, sino aplicadas juntas ante problemas auténticos.' },
        { id:'mx02', course:'steam',         text: 'Un docente STEAM eficaz diseña situaciones de aprendizaje donde:', options:['Los estudiantes copian procedimientos del pizarrón','El producto final integra al menos dos disciplinas de forma auténtica','Solo participan estudiantes con habilidades artísticas','El docente resuelve el problema y los alumnos lo reproducen'], correct:1, explanation:'La autenticidad y la integración real son el sello distintivo de STEAM. Sin ambas, es STEM disfrazado.' },
        { id:'mx03', course:'steam',         text: '¿Cuál es el rol de las Artes en STEAM según Yakman?', options:['Decorar los proyectos científicos','Aportar creatividad, diseño y pensamiento estético que amplía las soluciones posibles','Reemplazar la tecnología en aulas sin recursos','Solo aplicar en actividades extracurriculares'], correct:1, explanation:'Las Artes no adornan STEAM: son el componente que libera la creatividad necesaria para innovar. Sin ellas, las soluciones técnicas carecen de humanidad y estética.' },
        { id:'mx04', course:'abp',           text: 'En ABP, ¿qué hace que una Pregunta Guía sea realmente efectiva?', options:['Que tenga una respuesta correcta única','Que provenga del libro de texto oficial','Que sea abierta, auténtica y conectada al mundo real del estudiante','Que pueda resolverse en una clase'], correct:2, explanation:'Una buena Pregunta Guía genera curiosidad sostenida porque no tiene respuesta simple ni única. Conecta el contenido escolar con problemas reales.' },
        { id:'mx05', course:'abp',           text: '¿Por qué la reflexión final ("debriefing") es crítica en un proyecto ABP?', options:['Permite poner nota al producto','Consolida el aprendizaje, identifica qué funcionó y qué cambiar en el próximo ciclo','Reemplaza la evaluación sumativa','Es opcional si el tiempo es limitado'], correct:1, explanation:'Sin reflexión, el ABP se convierte en "hacer cosas". El debriefing convierte la experiencia en aprendizaje transferible.' },
        { id:'mx06', course:'abp',           text: 'La evaluación en ABP debe centrarse principalmente en:', options:['El producto final únicamente','El proceso de aprendizaje, las competencias demostradas y el producto como evidencia','La nota del examen al final del proyecto','Cuántas horas trabajó el equipo'], correct:1, explanation:'En ABP el proceso es tan importante como el producto. Las rúbricas deben capturar competencias como colaboración, investigación y pensamiento crítico, no solo el resultado.' },
        { id:'mx07', course:'design-thinking', text: '¿Por qué el Design Thinking comienza siempre con la fase de empatía?', options:['Por tradición metodológica','Porque sin entender a las personas que viven el problema, cualquier solución es una suposición','Para cumplir con el protocolo formal','Porque es la fase más sencilla'], correct:1, explanation:'La empatía garantiza que resuelves el problema real, no el que asumes que existe. Sin ella, brillantes soluciones pueden ser completamente irrelevantes.' },
        { id:'mx08', course:'design-thinking', text: 'En Design Thinking, el prototipo rápido tiene como objetivo principal:', options:['Crear el producto final para presentar','Fallar rápido y barato para aprender antes de invertir más recursos','Impresionar a los evaluadores','Sustituir la investigación de campo'], correct:1, explanation:'"Falla rápido, aprende rápido" es el principio del prototipado. Un prototipo en 30 minutos que revela problemas vale más que semanas de planificación.' },
        { id:'mx09', course:'evaluacion',    text: '¿Qué distingue la evaluación formativa de la sumativa?', options:['La formativa tiene nota y la sumativa no','La formativa sucede durante el aprendizaje para mejorarlo; la sumativa al final para certificarlo','Son sinónimos con nombres diferentes','La sumativa es más importante para el docente'], correct:1, explanation:'La evaluación formativa es un proceso continuo de retroalimentación que ajusta la enseñanza en tiempo real. La sumativa certifica qué se logró. Ambas son necesarias y complementarias.' },
        { id:'mx10', course:'evaluacion',    text: 'Una rúbrica analítica eficaz:', options:['Solo describe el nivel máximo de desempeño','Describe niveles progresivos de desempeño para cada criterio, permitiendo retroalimentación específica','Es demasiado compleja para compartir con estudiantes','Reemplaza la observación del docente'], correct:1, explanation:'La rúbrica analítica desglosa el desempeño por criterios. Al compartirla antes de la actividad, se convierte en guía de aprendizaje, no solo en herramienta de calificación.' },
        { id:'mx11', course:'evaluacion',    text: 'La autoevaluación y coevaluación son valiosas porque:', options:['Reducen el trabajo del docente','Desarrollan metacognición y responsabilidad sobre el propio aprendizaje','Son menos precisas que la evaluación docente','Solo funcionan con estudiantes universitarios'], correct:1, explanation:'Cuando los estudiantes evalúan su propio trabajo y el de sus pares con criterios claros, desarrollan la capacidad de monitorear y ajustar su propio aprendizaje — habilidad clave del siglo XXI.' },
        { id:'mx12', course:'tipos-estudiantes', text: 'El Efecto Pigmalión en educación demuestra que:', options:['Los estudiantes con coeficiente alto siempre rinden mejor','Las expectativas del docente influyen directamente en el rendimiento del estudiante','Solo los padres influyen en el desempeño académico','La genética determina el rendimiento escolar'], correct:1, explanation:'Las expectativas altas o bajas del docente modifican su comportamiento hacia el estudiante, que a su vez modifica el rendimiento. Es una profecía autocumplida que el docente puede usar conscientemente.' },
        { id:'mx13', course:'tipos-estudiantes', text: '¿Qué implica realmente "diferenciación pedagógica" en el aula?', options:['Crear un plan de clase diferente para cada estudiante','Ofrecer múltiples rutas hacia el mismo aprendizaje esencial, ajustando representación, proceso o producto','Separar a los estudiantes por nivel de habilidad','Dar más tarea a quienes terminan rápido'], correct:1, explanation:'Diferenciación no es caos ni multiplicar el trabajo. Es diseñar 2-3 rutas hacia el mismo destino de aprendizaje. Mismo objetivo, distintos caminos y ritmos.' },

        // ── SÍNTESIS INTERDISCIPLINAR (preguntas exclusivas del examen maestro) ──
        { id:'mx20', course:'maestro', text: 'Un docente quiere integrar STEAM y ABP en una misma unidad. El primer paso correcto es:', options:['Buscar materiales en internet sobre STEAM','Definir un problema auténtico de la comunidad que requiera soluciones que integren ciencia, tecnología, arte y matemáticas','Pedir a los estudiantes que elijan el tema','Organizar los grupos de trabajo'], correct:1, explanation:'La convergencia de STEAM y ABP comienza siempre con un problema auténtico bien formulado. Sin ese ancla, la integración disciplinar queda forzada.' },
        { id:'mx21', course:'maestro', text: 'Cuando un docente aplica Design Thinking para diseñar una rúbrica, está usando la metodología para:', options:['Decorar el documento de evaluación','Empatizar con los estudiantes para crear criterios que realmente guíen el aprendizaje, no solo califiquen','Reducir el tiempo de corrección','Cumplir con el requerimiento administrativo'], correct:1, explanation:'Design Thinking aplicado a la evaluación parte de la empatía: ¿qué necesita el estudiante saber para mejorar? Eso transforma una rúbrica de instrumento de control a herramienta de aprendizaje.' },
        { id:'mx22', course:'maestro', text: 'La relación entre conocer los perfiles de aprendizaje (Tipos de Estudiantes) y ABP es que:', options:['Son metodologías incompatibles','Conocer los perfiles permite diseñar proyectos con roles diferenciados donde cada estudiante aporta desde su fortaleza','Los perfiles solo importan en la evaluación final','ABP elimina la necesidad de conocer a los estudiantes'], correct:1, explanation:'El ABP es más poderoso cuando los roles del proyecto se asignan considerando las fortalezas de cada perfil. Un estudiante visual puede liderar la presentación; uno kinestésico, el prototipo.' },
        { id:'mx23', course:'maestro', text: 'Un docente del siglo XXI integra metodologías innovadoras porque:', options:['Está de moda y las autoridades lo exigen','Las investigaciones muestran que el aprendizaje activo, contextualizado y diferenciado produce comprensión más profunda y duradera','Es más fácil que la enseñanza tradicional','Los estudiantes lo piden en las encuestas'], correct:1, explanation:'La base es investigativa, no de moda. Décadas de neurociencia y pedagogía confirman que aprender haciendo, en contexto real, con retroalimentación oportuna, produce aprendizaje que dura.' },
        { id:'mx24', course:'maestro', text: '¿Cuál es el hilo conductor que conecta STEAM, ABP, Design Thinking y Evaluación Formativa?', options:['Todos usan tecnología digital','Todos centran el aprendizaje en el estudiante, parten de problemas reales y evalúan competencias, no solo contenidos','Todos requieren laboratorios o talleres especializados','Todos fueron creados en Estados Unidos'], correct:1, explanation:'El paradigma de aprendizaje activo, centrado en el estudiante y orientado a competencias es la raíz común. Son metodologías distintas de una misma visión educativa del siglo XXI.' },
        { id:'mx25', course:'maestro', text: 'En un proyecto integrador, la evaluación más auténtica mide:', options:['Cuánto memorizó el estudiante','La capacidad de aplicar conocimientos de múltiples disciplinas para resolver un problema real con calidad','La velocidad con que terminó el proyecto','Si siguió las instrucciones exactas del docente'], correct:1, explanation:'La evaluación auténtica pide al estudiante que haga lo que haría un profesional: resolver problemas reales con los conocimientos adquiridos. Eso es transferencia de aprendizaje.' },
        { id:'mx26', course:'maestro', text: 'Cuando un docente diseña una experiencia de aprendizaje con STEAM, ¿qué pregunta debe hacerse primero?', options:['¿Qué actividad es más entretenida?','¿Qué problema real del contexto de mis estudiantes puedo usar para que integren ciencia, arte, matemáticas y tecnología de forma significativa?','¿Qué materiales tengo disponibles?','¿Cuánto tiempo me toma preparar esto?'], correct:1, explanation:'El diseño pedagógico STEAM empieza por el problema auténtico, no por el recurso ni la actividad. El contexto real del estudiante es el punto de partida.' },
        { id:'mx27', course:'maestro', text: 'La metacognición en el estudiante se desarrolla mejor cuando:', options:['El docente da retroalimentación al final del semestre','El estudiante reflexiona regularmente sobre qué aprendió, cómo lo aprendió y qué le falta, con apoyo del docente','El estudiante solo estudia para el examen','El docente corrige todos los errores inmediatamente'], correct:1, explanation:'La metacognición requiere práctica reflexiva regular. "¿Qué aprendí hoy? ¿Cómo lo aprendí? ¿Qué me cuesta?" son preguntas que, repetidas, forman estudiantes autorregulados.' },
        { id:'mx28', course:'maestro', text: 'Un ambiente de aula que favorece la innovación pedagógica tiene como característica fundamental:', options:['Silencio total para concentrarse','Confianza psicológica: los estudiantes pueden intentar, equivocarse y preguntar sin miedo al ridículo','Competencia constante entre estudiantes por mejores notas','Reglas muy estrictas de comportamiento'], correct:1, explanation:'La seguridad psicológica (Amy Edmondson) es la condición base para el aprendizaje profundo, la creatividad y la colaboración. Sin ella, los estudiantes se protegen en lugar de arriesgarse a aprender.' },
        { id:'mx29', course:'maestro', text: 'La educación del siglo XXI prioriza en sus graduados:', options:['Dominio enciclopédico de hechos y fechas','Capacidad de aprender, desaprender y reaprender; pensamiento crítico, colaboración, comunicación y creatividad (las 4C)','Obediencia y seguimiento de instrucciones','Especialización temprana en una sola disciplina'], correct:1, explanation:'En un mundo donde el conocimiento se duplica cada 2 años, la capacidad de aprender continuamente vale más que cualquier contenido específico. Las 4C son las competencias que perduran.' },
        { id:'mx30', course:'maestro', text: 'Un docente que aplica retroalimentación formativa efectiva:', options:['Espera el examen final para decir qué estuvo mal','Da retroalimentación específica, oportuna y accionable durante el proceso, cuando el estudiante aún puede usar la información para mejorar','Solo corrige los trabajos con nota sin comentarios','Prefiere la retroalimentación grupal para ahorrar tiempo'], correct:1, explanation:'La retroalimentación efectiva tiene tres condiciones: específica (qué exactamente), oportuna (cuando aún sirve) y accionable (qué puede hacer el estudiante para mejorar). Sin las tres, pierde su poder.' },
        { id:'mx31', course:'maestro', text: 'El portafolio de aprendizaje como herramienta de evaluación es valioso porque:', options:['Es más fácil de calificar que un examen','Muestra la evolución del pensamiento del estudiante a lo largo del tiempo y desarrolla la capacidad de seleccionar y reflexionar sobre su propio trabajo','Reemplaza todos los demás tipos de evaluación','Solo sirve para estudiantes con habilidades artísticas'], correct:1, explanation:'El portafolio captura algo que ningún examen puede: el proceso de crecimiento. Al seleccionar qué incluir y por qué, el estudiante ejercita juicio y metacognición.' },
        { id:'mx32', course:'maestro', text: 'Integrar las inteligencias múltiples de Gardner en la planificación significa:', options:['Identificar la inteligencia dominante y solo enseñar por esa vía','Ofrecer múltiples entradas al mismo concepto — visual, verbal, kinestésica, musical — para que más estudiantes lo comprendan','Etiquetar a cada estudiante con su tipo de inteligencia','Hacer actividades diferentes para cada grupo de inteligencia'], correct:1, explanation:'Gardner no propone etiquetar ni separar. Propone que el mismo concepto se pueda abordar desde múltiples representaciones, ampliando el acceso al aprendizaje para más estudiantes.' },
        { id:'mx33', course:'maestro', text: '¿Qué papel juega el error en una pedagogía innovadora?', options:['El error es señal de que el estudiante no estudió suficiente','El error es información valiosa sobre el proceso de aprendizaje y punto de partida para la retroalimentación','El error debe evitarse a toda costa en el aula','El error solo importa en materias como matemáticas'], correct:1, explanation:'En neurociencia del aprendizaje, el error activa exactamente los circuitos cerebrales necesarios para la consolidación. Un aula que teme el error, suprime el aprendizaje profundo.' },
        { id:'mx34', course:'maestro', text: 'La colaboración efectiva en el aula (trabajo en equipo auténtico) requiere:', options:['Que el más hábil haga la mayor parte del trabajo','Interdependencia positiva: que cada miembro necesite a los demás para lograr el objetivo común','Que todos hagan exactamente lo mismo','Competencia entre grupos para motivar la productividad'], correct:1, explanation:'La interdependencia positiva (Johnson & Johnson) es la condición que transforma grupos en equipos. Si un miembro puede "desconectarse" sin afectar el resultado, no hay colaboración real.' },
        { id:'mx35', course:'maestro', text: 'Un docente reflexivo del siglo XXI se diferencia porque:', options:['Aplica las mismas estrategias durante toda su carrera porque le funcionan','Observa sistemáticamente el efecto de su enseñanza en el aprendizaje real de sus estudiantes y ajusta su práctica basándose en evidencia','Solo reflexiona al final del año escolar','Delega la reflexión pedagógica a los coordinadores académicos'], correct:1, explanation:'La práctica reflexiva (Schön) es el hábito que separa a los docentes que mejoran de los que se estancan. Observar, analizar, ajustar — ciclo continuo, no evento anual.' },
        { id:'mx36', course:'maestro', text: 'La pregunta más importante que un docente del siglo XXI puede hacerse al planificar es:', options:['¿Cuántos contenidos puedo cubrir esta semana?','¿Qué evidencia me mostrará que mis estudiantes realmente comprendieron y pueden aplicar lo que enseñé?','¿Cómo termino el programa antes del examen nacional?','¿Qué actividad ocupa mejor el tiempo de clase?'], correct:1, explanation:'Planificar desde la evidencia (diseño hacia atrás, Wiggins & McTighe) garantiza que la enseñanza tenga foco real. La cobertura de contenidos sin comprensión profunda es movimiento sin aprendizaje.' },
        { id:'mx37', course:'maestro', text: 'El aprendizaje socioemocional (SEL) en el aula importa para la innovación pedagógica porque:', options:['Las emociones interfieren con el aprendizaje cognitivo','Las investigaciones muestran que la regulación emocional, la empatía y las relaciones positivas son condiciones que habilitan el aprendizaje cognitivo profundo','El SEL es responsabilidad del psicólogo, no del docente de área','Solo aplica en educación inicial'], correct:1, explanation:'Neurocientíficamente, el aprendizaje ocurre cuando el cerebro está en estado de apertura, no de amenaza. El SEL crea las condiciones emocionales para que el aprendizaje cognitivo sea posible.' },
        { id:'mx38', course:'maestro', text: 'Cuando un docente adapta su metodología según las necesidades emergentes del grupo, está practicando:', options:['Improvisación irresponsable','Enseñanza responsiva: ajustar la instrucción basándose en la evidencia de comprensión que observa en tiempo real','Falta de planificación','Una excepción que no debe repetirse'], correct:1, explanation:'La enseñanza responsiva es la expresión práctica de la evaluación formativa. El plan es el punto de partida, no la camisa de fuerza. Los docentes expertos se desvían del plan cuando la evidencia lo justifica.' },
        { id:'mx39', course:'maestro', text: 'La equidad educativa en el aula innovadora significa:', options:['Dar exactamente lo mismo a todos los estudiantes','Dar a cada estudiante lo que necesita específicamente para lograr los mismos estándares de aprendizaje de alta calidad','Bajar las expectativas para los estudiantes con dificultades','Dar más recursos a quienes rinden más'], correct:1, explanation:'Equidad no es igualdad: es justicia. Dar lo mismo a quien necesita más es perpetuar la desigualdad. La diferenciación pedagógica es la herramienta de equidad por excelencia.' },
        { id:'mx40', course:'maestro', text: '¿Qué define al "Docente del Siglo XXI" por encima de dominar metodologías específicas?', options:['Saber usar herramientas digitales avanzadas','La disposición permanente a aprender, experimentar, reflexionar y adaptar su práctica en función del aprendizaje real de sus estudiantes','Tener un máster o posgrado en educación','Seguir exactamente los programas curriculares oficiales'], correct:1, explanation:'Las metodologías cambian; la mentalidad de aprendizaje permanente no. El docente del siglo XXI no es quien domina las últimas técnicas, sino quien nunca deja de aprender de su propia práctica y de sus estudiantes.' }
    ]
};