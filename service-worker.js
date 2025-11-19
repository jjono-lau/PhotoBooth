const CACHE_NAME = "photo-booth-shell-v2";
const CORE_ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./camera.png"].map(
  (path) => new URL(path, self.registration.scope).toString(),
);
const SHELL_FALLBACK = new URL("./index.html", self.registration.scope).toString();

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((oldKey) => caches.delete(oldKey)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(
      (cachedResponse) =>
        cachedResponse ||
        fetch(event.request).catch(() => caches.match(SHELL_FALLBACK)),
    ),
  );
});
