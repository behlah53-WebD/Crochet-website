/* Loom & Love Atelier - Progressive Web App Service Worker */

const CACHE_NAME = "loom-and-love-pwa-v1";

const OFFLINE_FALLBACK_URL = "/offline.html";

const PRECACHE_ASSETS = [
  OFFLINE_FALLBACK_URL,
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon.svg",
  "/favicon.ico",
];

// Install: Pre-cache offline page and core brand assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: Safe, Next.js-optimized caching strategy
self.addEventListener("fetch", (event) => {
  // 1. Only handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);

  // 2. Ignore non-HTTP/HTTPS schemes (e.g. chrome-extension://)
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // 3. Strict Network-Only for dynamic Next.js data, APIs, auth & admin
  // This guarantees zero stale cart, product, user, auth, or checkout data
  const isApi = url.pathname.startsWith("/api/");
  const isAdmin = url.pathname.startsWith("/admin");
  const isNextData = url.pathname.startsWith("/_next/data/");
  const isNextRsc = url.searchParams.has("_rsc");

  if (isApi || isAdmin || isNextData || isNextRsc) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 4. HTML Navigation Requests: Network-First with Offline Fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Cache successful navigation page for offline reading
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Try serving cached page if previously visited
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Otherwise serve graceful Loom & Love offline fallback
          const offlinePage = await caches.match(OFFLINE_FALLBACK_URL);
          return offlinePage || new Response("Offline", { status: 503, statusText: "Offline" });
        })
    );
    return;
  }

  // 5. Static Assets (JS, CSS chunks, fonts, images): Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:png|jpg|jpeg|svg|webp|gif|woff2?|ico|css|js)$/i.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 6. Default Network fallback
  event.respondWith(fetch(event.request));
});
