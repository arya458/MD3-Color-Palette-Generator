const CACHE_NAME = 'md3-palette-cache-v1';
const urlsToCache = [
  'https://arya458.github.io/MD3-Color-Palette-Generator/',
  'https://arya458.github.io/MD3-Color-Palette-Generator/index.html',
  'https://arya458.github.io/MD3-Color-Palette-Generator/css/style.css',
  'https://arya458.github.io/MD3-Color-Palette-Generator/js/main.js',
  'https://arya458.github.io/MD3-Color-Palette-Generator/js/utils.js',
  'https://arya458.github.io/MD3-Color-Palette-Generator/js/types.js',
];

// Install SW and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate SW and clean old caches if any
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// Intercept fetch requests and serve cached content if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if available, else fetch from network
      return response || fetch(event.request);
    })
  );
});
