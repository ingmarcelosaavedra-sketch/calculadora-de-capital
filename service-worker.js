const CACHE_NAME = 'capital-calculator-v1';
const urlsToCache = [
  '/capital_calculator.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la respuesta de la caché si se encuentra
        if (response) {
          return response;
        }
        // De lo contrario, busca la respuesta en la red
        return fetch(event.request);
      })
  );
});
