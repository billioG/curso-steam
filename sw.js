// ============================================================
// sw.js — Service Worker · Curso STEAM 2.0
// Estrategia: Cache-first para assets locales, Network-first para API
// ============================================================

const CACHE_VERSION  = 'steam-v24';
const CACHE_STATIC   = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC  = `${CACHE_VERSION}-dynamic`;

// Assets críticos — la app NO funciona sin estos
const CRITICAL_ASSETS = [
    './',
    './index.html',
    './app.js',
    './data.js',
    './diagnostico.js',
    './iconos.js',
    './ilustraciones.js',
    './manifest.json',
    './robot.png',
    './mbot.png',
    './logo-1bot-edoo.png',
    './firma.png',
];

// Assets secundarios — se intentan cachear pero no bloquean la instalación
const SECONDARY_ASSETS = [
    './admin.html',
    './admin.js',
    './admin-login.html',
    './verificar.html',
];

// ──────────────────────────────────────────────────────────
// INSTALL — precachear todo lo crítico
// ──────────────────────────────────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_STATIC).then(async cache => {
            // Críticos: se intentan uno por uno — si alguno falla (ej. 404 en el deploy),
            // no debe tumbar la instalación completa del Service Worker.
            await Promise.allSettled(
                CRITICAL_ASSETS.map(url =>
                    cache.add(url).catch(err => console.warn('[SW] No se pudo cachear (crítico):', url, err))
                )
            );
            // Secundarios: ignorar errores individuales
            await Promise.allSettled(
                SECONDARY_ASSETS.map(url =>
                    cache.add(url).catch(() => { /* ok si no existe */ })
                )
            );
        }).then(() => self.skipWaiting())
    );
});

// ──────────────────────────────────────────────────────────
// ACTIVATE — limpiar caches viejos
// ──────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(k => k !== CACHE_STATIC && k !== CACHE_DYNAMIC)
                    .map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// ──────────────────────────────────────────────────────────
// FETCH — estrategia por tipo de request
// ──────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // 1. Peticiones a Supabase / CDN externos → solo red, sin cachear
    if (url.origin !== self.location.origin) {
        // Para Supabase auth y realtime: dejar pasar siempre
        return;
    }

    // 2. Navegación (HTML) → Network-first con fallback a cache
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    const clone = res.clone();
                    caches.open(CACHE_STATIC).then(c => c.put(event.request, clone));
                    return res;
                })
                .catch(() => caches.match('./index.html'))
        );
        return;
    }

    // 3a. CÓDIGO local (JS / CSS / JSON) → Network-first, fallback a cache.
    //     Debe ser network-first igual que el HTML para evitar servir app.js/data.js
    //     viejos junto a un index.html nuevo (mismatch = pantalla en blanco).
    if (
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.json')
    ) {
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    if (res && res.status === 200 && res.type === 'basic') {
                        const clone = res.clone();
                        caches.open(CACHE_STATIC).then(c => c.put(event.request, clone));
                    }
                    return res;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // 3b. Imágenes locales → Cache-first (rara vez cambian), actualiza en background
    if (
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.webp')
    ) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                const network = fetch(event.request).then(res => {
                    if (res && res.status === 200 && res.type === 'basic') {
                        const clone = res.clone();
                        caches.open(CACHE_STATIC).then(c => c.put(event.request, clone));
                    }
                    return res;
                }).catch(() => null);
                return cached || network;
            })
        );
        return;
    }

    // 4. Todo lo demás → Network-first con fallback a cache dinámica
    event.respondWith(
        fetch(event.request)
            .then(res => {
                if (res && res.status === 200 && res.type === 'basic') {
                    const clone = res.clone();
                    caches.open(CACHE_DYNAMIC).then(c => c.put(event.request, clone));
                }
                return res;
            })
            .catch(() => caches.match(event.request))
    );
});

// ──────────────────────────────────────────────────────────
// MESSAGE — forzar actualización desde la app
// ──────────────────────────────────────────────────────────
self.addEventListener('message', event => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    if (event.data?.type === 'CLEAR_CACHE') {
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    }
});
