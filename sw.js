const CACHE_NAME = "ravn-pwa-v1";
const ASSETS = [
  "./",
  "./index.html"
];

// Installer SW og legg i cache
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

// Aktiver og rydd gamle cacher
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Network-first for HTML, cache-first for andre assets
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const isHTML = req.headers.get("accept")?.includes("text/html");
  e.respondWith(
    (async () => {
      if (isHTML) {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(req)) || (await cache.match("./index.html"));
        }
      } else {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);
        return cached || fetch(req).then((res) => {
          if (res.ok && req.method === "GET") cache.put(req, res.clone());
          return res;
        });
      }
    })()
  );
});
