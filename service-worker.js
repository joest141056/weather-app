const cacheName='weather-app-v1';
const cacheFiles=['index.html','style.css','app.js','manifest.json'];

self.addEventListener('install', e=>{
    e.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(cacheFiles)));
});

self.addEventListener('fetch', e=>{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
