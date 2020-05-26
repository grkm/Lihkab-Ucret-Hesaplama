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

self.addEventListener('install', function (event) {
    console.log('Install');
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener('activate', function (e) {
    console.log('Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    return caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', function (e) {
    console.log(e.request);
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            return response || fetch(e.request)
        })
    )
})