const CACHE_NAME = "chargewise-shell-v1";
const APP_ROOT = self.registration.scope;
const APP_SHELL = ["", "manifest.webmanifest", "app-icon.svg", "icon-192.png", "icon-512.png", "favicon.svg"]
  .map((path) => new URL(path, APP_ROOT).href);
const PRIVATE_API_PATHS = ["/rest/v1/", "/auth/v1/", "/realtime/v1/", "/storage/v1/", "/functions/v1/"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("chargewise-shell-") && key !== CACHE_NAME)
        .map((key) => caches.delete(key)),
    )),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (PRIVATE_API_PATHS.some((path) => url.pathname.startsWith(path))) return;
  const appPath = new URL(APP_ROOT).pathname;
  if (!url.pathname.startsWith(appPath)) return;
  const appRelativePath = url.pathname.slice(appPath.length);
  const isNavigation = request.mode === "navigate";
  const isStaticAsset = appRelativePath.startsWith("assets/") ||
    ["manifest.webmanifest", "app-icon.svg", "icon-192.png", "icon-512.png", "favicon.svg"].includes(appRelativePath);
  if (!isNavigation && !isStaticAsset) return;

  if (isNavigation) {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) {
        event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(APP_ROOT, response.clone())));
      }
      return response;
    }).catch(async () => (await caches.match(APP_ROOT)) || Response.error()));
    return;
  }

  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
    }
    return response;
  })));
});
