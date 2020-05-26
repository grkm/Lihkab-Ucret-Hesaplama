const staticCacheName = 'site-static';
const assets = [
	'/',
	'/index.html',
	'/js/app.js',
	'/css/bootstrap.css',
	'/css/style.css',
	'/css/bootstrap.js',
	'/css/popper.min.js',
	'/css/tooltip.min.js',
	'/css/jquery-3.4.0.slim.min.js',
	'/icon-384x384.png',
	'/manifest.json',
	'/img/icons'
];

// install event
// self.addEventListener('install', evt => {
// 	console.log('service worker installed');
// 	evt.waitUntil(
// 		caches.open(staticCacheName).then(cache => {
// 			console.log('caching shell assets');
// 			cache.addAll(assets);
// 		})
// 	);
// });

// // activate event
// self.addEventListener('activate', evt => {
// 	console.log('service worker activated');
// });

// // fetch event
// self.addEventListener('fetch', evt => {
// 	console.log('fetch event', evt);
// 	evt.respondWith(
// 		caches.match(evt.request).then(cacheRes => {
// 			return cacheRes || fetch(evt.request);
// 		})
// 	);
// });


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
