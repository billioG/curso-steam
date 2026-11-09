# Yo Aprendo · Formación docente

Plataforma web (PWA) de formación continua para docentes: 27 cursos cortos organizados en rutas, con tarjetas interactivas, exámenes, diplomas verificables, seguimiento para coordinadores y patrocinio de certificados por fundaciones.

- **Producción:** https://yoaprendo.online (GitHub Pages, rama `main`)
- **Panel de administración:** `admin.html` · **coordinadores:** `coordinator.html` · **colegios:** `colegios.html`
- **Información para colegios:** `para-colegios/` (landing y propuesta imprimible)

> Las reglas de trabajo del repositorio (ramas, convenciones de contenido, notas de seguridad) están en [`CLAUDE.md`](CLAUDE.md). Léelo antes de contribuir.

## Cómo está hecho

| Capa | Qué usa |
|---|---|
| Interfaz | HTML + JavaScript sin framework; `tailwind.css` compilado (no el CDN) |
| App | PWA con Service Worker (`sw.js`), funciona sin conexión una vez instalada |
| Datos y usuarios | Supabase: Postgres con RLS, autenticación, storage y Edge Functions (Deno) |
| Pagos | Recurrente (certificados de pago) y patrocinios (fundaciones) |
| IA | Groq a través de `groq-proxy` y las funciones de evaluación (la llave nunca va en el navegador) |

## Estructura

```
index.html · app.js          App de los docentes (lógica principal)
data.js · course_*.js        Contenido: cursos, tarjetas, módulos y exámenes
admin.html · admin.js        Panel de administración (incluye Patrocinios)
coordinator.html             Panel de coordinadores
patrocinios.js               Gestión de patrocinadores (panel admin)
sw.js                        Service Worker: subir steam-vXX en cada despliegue
migrations/                  SQL de Supabase (idempotente) y migrations/tests/
migrations/exam-bank/        Banco de preguntas del servidor (generado desde data.js)
supabase-functions/          Edge Functions y SETUP.md (guía de puesta en marcha)
scripts/                     Sincronización de datos y pruebas
recursos/                    Guías y plantillas descargables por curso
contenido-video/             Contenido de los cursos en Markdown, para producir video
para-colegios/               Landing y propuesta para colegios
tasks/ · AUDITORIA_*.md      Planes y auditorías
```

## Ejecutar en local

No hay paso de compilación para la app. Sirve la carpeta como sitio estático:

```bash
python3 -m http.server 8000
# abre http://localhost:8000/index.html
```

El Service Worker cachea agresivamente: en desarrollo usa una ventana privada o «Application → Clear storage» en las herramientas del navegador.

Si cambias clases de Tailwind en `index.html`, `app.js`, `iconos.js` o `ilustraciones.js`, regenera el CSS:

```bash
npx tailwindcss@3 -i ./tailwind-input.css -o ./tailwind.css --config ./tailwind.config.js --minify
```

## Despliegue

1. **Backend primero** (SQL en el SQL Editor de Supabase y funciones en Edge Functions), siguiendo [`supabase-functions/SETUP.md`](supabase-functions/SETUP.md).
2. **Después, la app:** trabaja en una rama (`feat/…`, `fix/…`, `chore/…`), abre un PR hacia `main` y súbele la versión a `sw.js`. GitHub Pages publica al hacer merge.

Si cambias tarjetas, rutas o preguntas de examen, hay copias que regenerar para las funciones aisladas:

```bash
node scripts/sync-course-totals.mjs   # totales de tarjetas (weekly-stats)
node scripts/sync-cert-rules.mjs      # ids de tarjetas y rutas (certificados y examen)
node scripts/sync-exam-bank.mjs       # banco de preguntas → migrations/exam-bank/*.sql
```

Todos aceptan `--check` para verificar sin escribir. Después de regenerar, vuelve a desplegar las funciones o pega el SQL que cambió.

## Pruebas

No necesitan red ni Supabase real (usan Node, una base en memoria o un Postgres local):

```bash
node scripts/test-cert-rules.mjs          # reglas antifraude de certificados
node scripts/test-exam-grading.mjs        # sorteo y calificación de exámenes
node scripts/test-exam-function.mjs       # función `exam` completa contra una base en memoria
node scripts/test-recurrente-webhook.mjs  # webhook de pagos con eventos firmados
node scripts/test-cron-guard.mjs          # candado de las funciones de cron
```

Las pruebas SQL (`migrations/tests/*.test.sql`) se ejecutan en un Postgres de prueba: las instrucciones están al inicio de cada archivo.

## Seguridad en pocas líneas

- Las llaves (Resend, Groq, Recurrente, service role) viven solo en los *secrets* de Supabase, nunca en el repositorio.
- Los exámenes finales y el examen maestro se califican en el servidor; los certificados de pago y los patrocinados validan esas notas.
- Las funciones de cron solo aceptan la service role key (o `CRON_SECRET`).
- El repositorio es público: no es posible ocultar las respuestas que están en `data.js`. Los límites conocidos están en `CLAUDE.md`.

## Contenido

Los cursos se escriben en español neutro con tuteo, sin depender de un país. Las convenciones (rigor de las cifras, ejemplos rotulados, fuentes en `fuentes.html`) están en `CLAUDE.md`.

---

Contacto: contacto@yoaprendo.online
