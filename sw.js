const staticCacheName = 'site-static';
const assets = [
	'/',
    '/index.html',
	'/ayarlar.html',
	'/hakkinda.html',
    '/iletisim.html',
    '/kullanim.html',
    '/backup.json',
    '/ornek.json',
	'/readme.md',
    '/js/app.js',
    '/js/hesaplamalar.js',
    '/js/backup.js',
	'/js/bootstrap.bundle.min.js',
	'/js/popper.min.js',
	'/js/tooltip.min.js',
    '/js/jquery-3.5.1.slim.min.js',
    '/js/bootstrap-table.min.js',
    '/js/bootstrap-table-tr-TR.js',
	'/css/bootstrap.css',
    '/css/style.css',
    '/css/bootstrap-table.min.css',
	'/css/jquery.mCustomScrollbar.min.css',
	'/img/icons/icon-384x384.png',
	'/manifest.json',
    '/img/icons',
    '/img/splash'
];

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
