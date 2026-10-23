const CACHE_NAME = 'seg-resident-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/build/icon.ico',
  '/manifest.webmanifest',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request).catch(() => new Response('Offline', { status: 503, statusText: 'Offline' })))
  );
});
