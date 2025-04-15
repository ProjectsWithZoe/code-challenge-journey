const CACHE_NAME = "v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// Install event
self.addEventListener("install", (event) => {
  console.log("[SW] Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("[SW] Serving from cache:", event.request.url);
        return cachedResponse;
      }

      console.log("[SW] Fetching from network:", event.request.url);
      return fetch(event.request).catch((err) => {
        console.error("[SW] Network error:", err);
      });
    })
  );
});
