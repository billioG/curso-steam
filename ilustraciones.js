// ============================================================
// ILUSTRACIONES Y TEMAS POR MÓDULO — Paleta oficial STEEAM
// ============================================================

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
