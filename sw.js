const CACHE_NAME = "steam-course-v5";

// Solo cacheamos archivos locales — los CDN externos tienen CORS y no se pueden cachear
const urlsToCache = [
    "./",
    "./index.html",
    "./app.js",
    "./data.js",
    "./manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    // No interceptar peticiones cross-origin (CDN, Supabase, etc.)
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(fetchResponse => {
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== "basic") {
                    return fetchResponse;
                }
                const responseToCache = fetchResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return fetchResponse;
            }).catch(() => caches.match("./index.html"));
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            )
        )
    );
});
