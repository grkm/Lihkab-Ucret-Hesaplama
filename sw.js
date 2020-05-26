var cacheName = 'pwa-practice-7'
var filesToCache = [
    '/',
    '/index.html',
    '/smooth-scroll.js',
    '/app.js',
    '/bo.css',
    '/manifest.json',
    '/images',
]

self.addEventListener('install', async e => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assets);
    return self.skipWaiting();
});



self.addEventListener('activate', e => {
    self.clients.claim().then(r => {
        console.log("service worker activated");
    });
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(staticCacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(staticCacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}
self.addEventListener('fetch', function (e) {
    console.log(e.request);
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            return response || fetch(e.request)
        })
    )
})
