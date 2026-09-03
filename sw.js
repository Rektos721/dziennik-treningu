/* Dziennik Sztangi - service worker.
   App shell cached on install so the page opens with zero signal.
   Bump CACHE when index.html changes, otherwise the old copy wins. */
var CACHE = "dziennik-v7";
var SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Tapping the rest-over popup should put you back in the app, not open
   a second copy of it. Reuse a live window if there is one. */
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (ws) {
      for (var i = 0; i < ws.length; i++) {
        if ("focus" in ws[i]) return ws[i].focus();
      }
      return self.clients.openWindow ? self.clients.openWindow("./") : null;
    })
  );
});

/* Network-first, cache fallback: online you always get the newest build,
   offline (the gym) you get the cached shell instead of a dinosaur. */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) {
        return hit || caches.match("./index.html");
      });
    })
  );
});
