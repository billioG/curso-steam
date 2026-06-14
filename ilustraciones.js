// ============================================================
// ILUSTRACIONES Y TEMAS POR MÓDULO — Multi-curso
// ============================================================

// Ilustraciones y temas por curso. Se seleccionan en renderCard según currentCourseId.

// ── ABP: colores verdes / construcción ──
const ABP_THEME = {
    1: { primary: '#2BA848', soft: '#E6F1E6' },
    2: { primary: '#1a8f7a', soft: '#E0F5F1' },
    3: { primary: '#0D7A5E', soft: '#DCF5EE' },
    4: { primary: '#4CAF50', soft: '#F1F8E9' },
    5: { primary: '#388E3C', soft: '#E8F5E9' },
};
const ABP_ILLUSTRATIONS = {
    // Módulo 1 — ¿Qué es ABP?: Planta creciendo
    1: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <line x1="40" y1="72" x2="40" y2="30" stroke-width="2.5"/>
        <path d="M40 50 C40 50 20 45 16 28 C28 26 40 36 40 50Z" stroke-width="2.5" fill="rgba(255,255,255,0.2)"/>
        <path d="M40 40 C40 40 60 35 64 18 C52 16 40 26 40 40Z" stroke-width="2.5" fill="rgba(255,255,255,0.15)"/>
        <path d="M28 72 Q40 68 52 72" stroke-width="2.5"/>
        <circle cx="40" cy="18" r="5" stroke-width="2.2" fill="rgba(255,255,255,0.2)"/>
    </svg>`,
    // Módulo 2 — Fases: Ciclo de flechas
    2: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="40" cy="40" r="22" stroke-width="2.2" stroke-dasharray="6 4"/>
        <path d="M40 18 L44 26 L36 26 Z" fill="white" stroke="none"/>
        <path d="M62 40 L54 44 L54 36 Z" fill="white" stroke="none"/>
        <path d="M40 62 L36 54 L44 54 Z" fill="white" stroke="none"/>
        <path d="M18 40 L26 36 L26 44 Z" fill="white" stroke="none"/>
        <circle cx="40" cy="40" r="8" stroke-width="2.5"/>
    </svg>`,
    // Módulo 3 — Diseño: Lápiz y regla
    3: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 62 L22 46 L46 22 L58 34 L34 58 Z" stroke-width="2.5"/>
        <path d="M22 46 L34 58" stroke-width="2"/>
        <path d="M46 22 L58 34" stroke-width="2"/>
        <line x1="18" y1="62" x2="28" y2="62" stroke-width="2.5"/>
        <circle cx="52" cy="16" r="4" stroke-width="2.2" fill="rgba(255,255,255,0.25)"/>
        <line x1="56" y1="20" x2="62" y2="26" stroke-width="2.5"/>
    </svg>`,
    // Módulo 4 — Evaluación: Rúbrica con check
    4: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <rect x="14" y="10" width="52" height="60" rx="7" stroke-width="2.5"/>
        <line x1="24" y1="28" x2="56" y2="28" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
        <line x1="24" y1="40" x2="56" y2="40" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
        <line x1="24" y1="52" x2="56" y2="52" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
        <path d="M25 28 L29 32 L36 24" stroke-width="2.5" fill="none"/>
        <path d="M25 40 L29 44 L36 36" stroke-width="2.5" fill="none"/>
        <circle cx="28" cy="52" r="2.5" fill="rgba(255,255,255,0.6)" stroke="none"/>
    </svg>`,
    // Módulo 5 — Guatemala: Quetzal
    5: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="40" cy="30" rx="13" ry="16" stroke-width="2.5"/>
        <path d="M32 44 C32 44 20 58 24 70 C32 64 40 58 40 58" stroke-width="2.5" fill="rgba(255,255,255,0.15)"/>
        <path d="M48 44 C48 44 60 58 56 70 C48 64 40 58 40 58" stroke-width="2.5" fill="rgba(255,255,255,0.1)"/>
        <circle cx="35" cy="26" r="2.5" fill="rgba(255,255,255,0.8)" stroke="none"/>
        <path d="M38 34 Q40 38 42 34" stroke-width="2" fill="none"/>
        <line x1="40" y1="14" x2="40" y2="8" stroke-width="2.5"/>
        <path d="M37 8 Q40 4 43 8" stroke-width="2" fill="none"/>
    </svg>`,
};

// ── Design Thinking: rosa/magenta ──
const DT_THEME = {
    1: { primary: '#E83C8D', soft: '#FDE1F0' },
    2: { primary: '#C2185B', soft: '#FCE4EC' },
    3: { primary: '#AD1457', soft: '#FCE4EC' },
    4: { primary: '#D81B60', soft: '#FDE1F0' },
};
const DT_ILLUSTRATIONS = {
    // Módulo 1 — ¿Qué es DT?: Ojo / perspectiva
    1: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 40 C8 40 22 14 40 14 C58 14 72 40 72 40 C72 40 58 66 40 66 C22 66 8 40 8 40 Z" stroke-width="2.5"/>
        <circle cx="40" cy="40" r="12" stroke-width="2.5"/>
        <circle cx="40" cy="40" r="5" fill="rgba(255,255,255,0.7)" stroke="none"/>
        <line x1="40" y1="14" x2="40" y2="20" stroke-width="2"/>
        <line x1="40" y1="60" x2="40" y2="66" stroke-width="2"/>
    </svg>`,
    // Módulo 2 — Empatizar/Definir: Corazón + lupa
    2: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path d="M40 64 C40 64 12 46 12 28 C12 18 20 12 28 14 C33 15 38 20 40 24 C42 20 47 15 52 14 C60 12 68 18 68 28 C68 46 40 64 40 64Z" stroke-width="2.5" fill="rgba(255,255,255,0.15)"/>
        <circle cx="55" cy="20" r="8" stroke-width="2.2"/>
        <line x1="61" y1="26" x2="68" y2="33" stroke-width="2.5"/>
    </svg>`,
    // Módulo 3 — Idear/Prototipar: Bombilla con engranaje
    3: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path d="M40 8 C27 8 18 17 18 28 C18 37 24 44 32 48 L32 56 Q32 58 34 58 H46 Q48 58 48 56 L48 48 C56 44 62 37 62 28 C62 17 53 8 40 8Z" stroke-width="2.5"/>
        <line x1="33" y1="59" x2="47" y2="59" stroke-width="2.5"/>
        <line x1="35" y1="64" x2="45" y2="64" stroke-width="2.5"/>
        <path d="M37 64 Q40 70 43 64" stroke-width="2"/>
        <circle cx="40" cy="31" r="7" stroke-width="2" stroke="rgba(255,255,255,0.7)"/>
        <path d="M37 31 L39 33 L44 28" stroke-width="2" fill="none" stroke="rgba(255,255,255,0.9)"/>
    </svg>`,
    // Módulo 4 — DT en aula: Personas conectadas
    4: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="20" cy="22" r="9" stroke-width="2.5"/>
        <path d="M8 50 C8 40 32 40 32 50 L32 56 L8 56 Z" stroke-width="2.5" fill="rgba(255,255,255,0.1)"/>
        <circle cx="60" cy="22" r="9" stroke-width="2.5"/>
        <path d="M48 50 C48 40 72 40 72 50 L72 56 L48 56 Z" stroke-width="2.5" fill="rgba(255,255,255,0.1)"/>
        <line x1="32" y1="25" x2="48" y2="25" stroke-width="2" stroke-dasharray="3 3"/>
        <circle cx="40" cy="25" r="4" stroke-width="2" fill="rgba(255,255,255,0.3)"/>
    </svg>`,
};

// ── Evaluación: naranja/ámbar ──
const EV_THEME = {
    1: { primary: '#E9A037', soft: '#FDF3E3' },
    2: { primary: '#F57C00', soft: '#FFF3E0' },
    3: { primary: '#E65100', soft: '#FBE9E7' },
    4: { primary: '#FF8F00', soft: '#FFF8E1' },
};
const EV_ILLUSTRATIONS = {
    // Módulo 1 — Evaluación auténtica: Diploma/estrella
    1: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="16" width="60" height="42" rx="7" stroke-width="2.5"/>
        <line x1="20" y1="30" x2="60" y2="30" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
        <line x1="20" y1="40" x2="50" y2="40" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
        <circle cx="55" cy="62" r="10" stroke-width="2.5" fill="rgba(255,255,255,0.15)"/>
        <path d="M55 54 L57 59 L62 59 L58 63 L60 68 L55 64 L50 68 L52 63 L48 59 L53 59 Z" fill="rgba(255,255,255,0.8)" stroke="none"/>
    </svg>`,
    // Módulo 2 — Rúbricas: Tabla
    2: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="14" width="60" height="52" rx="7" stroke-width="2.5"/>
        <line x1="10" y1="30" x2="70" y2="30" stroke-width="2"/>
        <line x1="10" y1="46" x2="70" y2="46" stroke-width="2"/>
        <line x1="32" y1="14" x2="32" y2="66" stroke-width="2"/>
        <line x1="54" y1="14" x2="54" y2="66" stroke-width="2"/>
        <path d="M17 37 L21 41 L27 33" stroke-width="2.5" fill="none"/>
        <path d="M38 37 L42 41 L48 33" stroke-width="2.5" fill="none"/>
        <circle cx="61" cy="37" r="3" fill="rgba(255,255,255,0.6)" stroke="none"/>
        <path d="M17 54 L21 58 L27 50" stroke-width="2.5" fill="none"/>
    </svg>`,
    // Módulo 3 — Portafolios: Carpeta
    3: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 28 L8 66 Q8 70 12 70 L68 70 Q72 70 72 66 L72 28 Q72 24 68 24 L40 24 L34 16 L12 16 Q8 16 8 20 Z" stroke-width="2.5" fill="rgba(255,255,255,0.1)"/>
        <line x1="18" y1="40" x2="62" y2="40" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
        <line x1="18" y1="50" x2="62" y2="50" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
        <line x1="18" y1="60" x2="45" y2="60" stroke-width="2" stroke="rgba(255,255,255,0.5)"/>
    </svg>`,
    // Módulo 4 — Coevaluación: Dos personas con flechas
    4: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="20" cy="20" r="9" stroke-width="2.5"/>
        <path d="M8 46 C8 36 32 36 32 46" stroke-width="2.5" fill="rgba(255,255,255,0.1)"/>
        <circle cx="60" cy="20" r="9" stroke-width="2.5"/>
        <path d="M48 46 C48 36 72 36 72 46" stroke-width="2.5" fill="rgba(255,255,255,0.1)"/>
        <path d="M34 28 C38 24 42 24 46 28" stroke-width="2" fill="none"/>
        <path d="M46 24 L46 29 L41 26 Z" fill="white" stroke="none"/>
        <path d="M46 52 C42 56 38 56 34 52" stroke-width="2" fill="none"/>
        <path d="M34 56 L34 51 L39 54 Z" fill="white" stroke="none"/>
    </svg>`,
};

// ── Tipos de Estudiantes: violeta / personas ──
const TE_THEME = {
    1: { primary: '#7C3AED', soft: '#EDE9FE' },
    2: { primary: '#6D28D9', soft: '#E8E0FB' },
    3: { primary: '#9333EA', soft: '#F3E8FF' },
    4: { primary: '#7E22CE', soft: '#F5F3FF' },
    5: { primary: '#5B21B6', soft: '#EDEDFF' },
};
const TE_ILLUSTRATIONS = {
    // Módulo 1 — Mapa del aula: Grupo de personas
    1: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="40" cy="22" r="8" stroke-width="2.2" fill="rgba(255,255,255,0.15)"/>
        <path d="M24 56 C24 44 56 44 56 56" stroke-width="2.2"/>
        <circle cx="18" cy="30" r="5.5" stroke-width="2" fill="rgba(255,255,255,0.1)"/>
        <path d="M8 56 C8 47 28 47 28 56" stroke-width="2"/>
        <circle cx="62" cy="30" r="5.5" stroke-width="2" fill="rgba(255,255,255,0.1)"/>
        <path d="M52 56 C52 47 72 47 72 56" stroke-width="2"/>
    </svg>`,
    // Módulo 2 — Estilos de aprendizaje: Cerebro con rayos
    2: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path d="M40 14 C28 14 18 22 18 34 C18 42 22 48 30 52 L30 64 L50 64 L50 52 C58 48 62 42 62 34 C62 22 52 14 40 14Z" stroke-width="2.2" fill="rgba(255,255,255,0.1)"/>
        <line x1="40" y1="30" x2="40" y2="52" stroke-width="1.5" stroke-dasharray="3 2"/>
        <path d="M32 28 L36 36 L30 36 L36 46" stroke-width="2.2"/>
        <path d="M48 28 L44 36 L50 36 L44 46" stroke-width="2.2"/>
    </svg>`,
    // Módulo 3 — Perfiles emocionales: Corazón y mente
    3: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <path d="M40 62 L16 40 C10 34 10 24 20 20 C28 17 34 22 40 30 C46 22 52 17 60 20 C70 24 70 34 64 40 Z" stroke-width="2.2" fill="rgba(255,255,255,0.15)"/>
        <circle cx="40" cy="24" r="6" stroke-width="2" fill="rgba(255,255,255,0.1)"/>
        <line x1="40" y1="30" x2="40" y2="40" stroke-width="1.8"/>
    </svg>`,
    // Módulo 4 — Casos de estudio: Lupa sobre persona
    4: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="36" cy="36" r="20" stroke-width="2.5" fill="rgba(255,255,255,0.1)"/>
        <line x1="50" y1="50" x2="66" y2="66" stroke-width="3" stroke-linecap="round"/>
        <circle cx="36" cy="30" r="5" stroke-width="2" fill="rgba(255,255,255,0.15)"/>
        <path d="M24 46 C24 38 48 38 48 46" stroke-width="2"/>
    </svg>`,
    // Módulo 5 — Estrategias: Rompecabezas de personas
    5: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <rect x="12" y="12" width="24" height="24" rx="4" stroke-width="2.2" fill="rgba(255,255,255,0.1)"/>
        <rect x="44" y="12" width="24" height="24" rx="4" stroke-width="2.2" fill="rgba(255,255,255,0.1)"/>
        <rect x="12" y="44" width="24" height="24" rx="4" stroke-width="2.2" fill="rgba(255,255,255,0.1)"/>
        <rect x="44" y="44" width="24" height="24" rx="4" stroke-width="2.2" fill="rgba(255,255,255,0.1)"/>
        <circle cx="24" cy="21" r="3.5" stroke-width="1.8" fill="rgba(255,255,255,0.2)"/>
        <circle cx="56" cy="21" r="3.5" stroke-width="1.8" fill="rgba(255,255,255,0.2)"/>
        <path d="M18 28 C18 24 30 24 30 28" stroke-width="1.8"/>
        <path d="M50 28 C50 24 62 24 62 28" stroke-width="1.8"/>
        <line x1="24" y1="50" x2="24" y2="62" stroke-width="2"/>
        <line x1="16" y1="56" x2="32" y2="56" stroke-width="2"/>
        <line x1="56" y1="50" x2="56" y2="62" stroke-width="2"/>
        <line x1="48" y1="56" x2="64" y2="56" stroke-width="2"/>
    </svg>`,
};

// Función que retorna el theme e ilustración del módulo activo según el curso
function getCourseThemeAndIllus(courseId, moduleIndex) {
    switch(courseId) {
        case 'abp':
            return {
                theme: ABP_THEME[moduleIndex] || { primary: '#2BA848', soft: '#E6F1E6' },
                illus: ABP_ILLUSTRATIONS[moduleIndex] || ABP_ILLUSTRATIONS[1]
            };
        case 'design-thinking':
            return {
                theme: DT_THEME[moduleIndex] || { primary: '#E83C8D', soft: '#FDE1F0' },
                illus: DT_ILLUSTRATIONS[moduleIndex] || DT_ILLUSTRATIONS[1]
            };
        case 'evaluacion':
            return {
                theme: EV_THEME[moduleIndex] || { primary: '#E9A037', soft: '#FDF3E3' },
                illus: EV_ILLUSTRATIONS[moduleIndex] || EV_ILLUSTRATIONS[1]
            };
        case 'tipos-estudiantes':
            return {
                theme: TE_THEME[moduleIndex] || { primary: '#7C3AED', soft: '#EDE9FE' },
                illus: TE_ILLUSTRATIONS[moduleIndex] || TE_ILLUSTRATIONS[1]
            };
        default:
            return {
                theme: MODULE_THEME[moduleIndex] || { primary: '#0097A7', soft: '#E0F7FA' },
                illus: MODULE_ILLUSTRATIONS[moduleIndex] || ''
            };
    }
}

// Paleta oficial por disciplina STEEAM
// S - Ciencias:      #FCC30A / #FFF9E0
// T - Tecnología:    #E9A037 / #FDE7CC
// E - Emprendimiento:#07B0E4 / #E0F1F5
// E - Ingeniería:    #2BA848 / #E6F1E6
// A - Artes:         #E83C8D / #FDE1E4
// M - Matemáticas:   #E52642 / #FCD7DA

const MODULE_THEME = {
    1: { primary: '#FCC30A', soft: '#FFF9E0', name: 'Módulo 1' }, // Ciencias
    2: { primary: '#2BA848', soft: '#E6F1E6', name: 'Módulo 2' }, // Ingeniería
    3: { primary: '#07B0E4', soft: '#E0F1F5', name: 'Módulo 3' }, // Emprendimiento
    4: { primary: '#E9A037', soft: '#FDE7CC', name: 'Módulo 4' }, // Tecnología
    5: { primary: '#E83C8D', soft: '#FDE1E4', name: 'Módulo 5' }, // Artes
};

// ── Iconos STEEAM — estilo outline fino, trazo blanco, sin relleno ──

const MODULE_ILLUSTRATIONS = {

    // Módulo 1 — Ciencias: Frasco Erlenmeyer
    1: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cuello del frasco -->
        <rect x="30" y="7" width="20" height="20" rx="3" stroke-width="2.5"/>
        <!-- Tapón superior -->
        <line x1="26" y1="7" x2="54" y2="7" stroke-width="2.5"/>
        <!-- Cuerpo del frasco -->
        <path d="M30 27 L13 61 C11 67 15 72 21 72 H59 C65 72 69 67 67 61 L50 27 Z" stroke-width="2.5"/>
        <!-- Nivel de líquido -->
        <path d="M18 58 Q40 51 62 58" stroke="rgba(255,255,255,0.55)" stroke-width="2" fill="none"/>
        <!-- Burbujas -->
        <circle cx="33" cy="61" r="3.5" fill="rgba(255,255,255,0.55)" stroke="none"/>
        <circle cx="45" cy="56" r="2.5" fill="rgba(255,255,255,0.4)" stroke="none"/>
        <circle cx="54" cy="63" r="2" fill="rgba(255,255,255,0.35)" stroke="none"/>
    </svg>`,

    // Módulo 2 — Ingeniería: Engranaje
    2: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <!-- Círculo central -->
        <circle cx="40" cy="40" r="11" stroke-width="2.5"/>
        <!-- Dientes: 8 rectángulos alrededor -->
        <!-- arriba -->
        <rect x="36" y="7"  width="8" height="12" rx="2.5" stroke-width="2.5"/>
        <!-- abajo -->
        <rect x="36" y="61" width="8" height="12" rx="2.5" stroke-width="2.5"/>
        <!-- izquierda -->
        <rect x="7"  y="36" width="12" height="8" rx="2.5" stroke-width="2.5"/>
        <!-- derecha -->
        <rect x="61" y="36" width="12" height="8" rx="2.5" stroke-width="2.5"/>
        <!-- diagonal sup-der -->
        <rect x="55" y="11" width="8" height="12" rx="2.5" stroke-width="2.5" transform="rotate(45 59 17)"/>
        <!-- diagonal sup-izq -->
        <rect x="17" y="11" width="8" height="12" rx="2.5" stroke-width="2.5" transform="rotate(-45 21 17)"/>
        <!-- diagonal inf-der -->
        <rect x="55" y="57" width="8" height="12" rx="2.5" stroke-width="2.5" transform="rotate(-45 59 63)"/>
        <!-- diagonal inf-izq -->
        <rect x="17" y="57" width="8" height="12" rx="2.5" stroke-width="2.5" transform="rotate(45 21 63)"/>
    </svg>`,

    // Módulo 3 — Emprendimiento: Bombilla
    3: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cuerpo de la bombilla -->
        <path d="M40 8 C25 8 15 18 15 30 C15 40 22 48 30 53 L30 60 Q30 62 32 62 H48 Q50 62 50 60 L50 53 C58 48 65 40 65 30 C65 18 55 8 40 8 Z" stroke-width="2.5"/>
        <!-- Base - líneas -->
        <line x1="31" y1="63" x2="49" y2="63" stroke-width="2.5"/>
        <line x1="32" y1="68" x2="48" y2="68" stroke-width="2.5"/>
        <!-- Punta redondeada de la base -->
        <path d="M34 68 Q40 75 46 68" stroke-width="2.5"/>
        <!-- Filamento interior -->
        <path d="M33 45 Q40 35 47 45" stroke="rgba(255,255,255,0.65)" stroke-width="2" fill="none"/>
        <!-- Destello -->
        <line x1="40" y1="17" x2="40" y2="22" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>
        <line x1="50" y1="20" x2="47" y2="24" stroke="rgba(255,255,255,0.45)" stroke-width="1.8"/>
        <line x1="30" y1="20" x2="33" y2="24" stroke="rgba(255,255,255,0.45)" stroke-width="1.8"/>
    </svg>`,

    // Módulo 4 — Tecnología: Robot
    4: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cabeza: rect redondeado -->
        <rect x="16" y="22" width="48" height="38" rx="8" stroke-width="2.5"/>
        <!-- Antena -->
        <line x1="40" y1="22" x2="40" y2="13" stroke-width="2.5"/>
        <circle cx="40" cy="10" r="3.5" stroke-width="2.5"/>
        <!-- Ojos: doble círculo izquierdo -->
        <circle cx="29" cy="37" r="7" stroke-width="2.2"/>
        <circle cx="29" cy="37" r="3" fill="rgba(255,255,255,0.7)" stroke="none"/>
        <!-- Ojos: doble círculo derecho -->
        <circle cx="51" cy="37" r="7" stroke-width="2.2"/>
        <circle cx="51" cy="37" r="3" fill="rgba(255,255,255,0.7)" stroke="none"/>
        <!-- Boca -->
        <path d="M27 52 Q40 58 53 52" stroke-width="2.5" fill="none"/>
        <!-- Brazos laterales -->
        <rect x="5"  y="30" width="11" height="6" rx="3" stroke-width="2.2"/>
        <rect x="64" y="30" width="11" height="6" rx="3" stroke-width="2.2"/>
    </svg>`,

    // Módulo 5 — Artes: Formas geométricas superpuestas
    5: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="white" stroke-linecap="round" stroke-linejoin="round">
        <!-- Diamante (cuadrado rotado) -->
        <path d="M40 8 L62 32 L40 56 L18 32 Z" stroke-width="2.5"/>
        <!-- Rectángulo superpuesto (desplazado) -->
        <rect x="28" y="38" width="34" height="32" rx="6" stroke-width="2.5"/>
        <!-- Detalles interiores del rect -->
        <line x1="35" y1="48" x2="55" y2="48" stroke="rgba(255,255,255,0.55)" stroke-width="1.8"/>
        <line x1="35" y1="56" x2="50" y2="56" stroke="rgba(255,255,255,0.45)" stroke-width="1.8"/>
    </svg>`,
};

// Ilustración para tarjetas de quiz — trazo blanco estilo outline
const QUIZ_SVG = `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
        stroke="white" stroke-linecap="round" stroke-linejoin="round">
    <!-- Documento base -->
    <rect x="14" y="8" width="52" height="64" rx="8" stroke-width="2.5"/>
    <!-- Signo de interrogación -->
    <path d="M32 28 C32 20 48 18 48 28 C48 34 40 35 40 42" stroke-width="3" fill="none"/>
    <circle cx="40" cy="49" r="2.5" fill="white" stroke="none"/>
    <!-- Líneas decorativas abajo -->
    <line x1="22" y1="58" x2="58" y2="58" stroke="rgba(255,255,255,0.45)" stroke-width="1.8" stroke-dasharray="4 3"/>
    <line x1="22" y1="65" x2="47" y2="65" stroke="rgba(255,255,255,0.35)" stroke-width="1.8" stroke-dasharray="4 3"/>
</svg>`;
