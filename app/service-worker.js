// This file is intentionally without code.
// It's present so that service worker registration will work when serving from the 'app' directory.
// The version of service-worker.js that's present in the 'dist' directory is automatically
// generated by the 'generate-service-worker' gulp task, and contains code to precache resources.

const cacheName = 'siss_cache-v1.1';
const dataCacheName = 'siss_data-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/scripts/main.js',
    '/scripts/login.js',
    '/styles/main.css',
    '/styles/login.css',
    '/images/bgLogin.jpg',
    '/images/hamburger.svg',
    '/images/logo.gif'
];

self.addEventListener('install', function(e) {
    //console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching App Shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    //console.log('[ServiceWorker] Fetch', e.request.url);
    // var dataUrl = 'http://saudeservicosbeta.barueri.sp.gov.br/SaudeAPI/api/v1/agenda/historico';
    // if (e.request.url.indexOf(dataUrl) > -1) {
    //     e.respondWith(
    //         caches.open(dataCacheName).then(function(cache) {
    //             return fetch(e.request).then(function(response) {
    //                 cache.put(e.request.url, response.clone());
    //                 return response;
    //             });
    //         })
    //     );
    // } else {
    //     e.respondWith(
    //         caches.match(e.request).then(function(response) {
    //             return response || fetch(e.request);
    //         })
    //     );
    // }
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});