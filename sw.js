const scope = self.registration.scope;
const prefix = 'daily-adhkar-shell:' + scope + ':';
const cacheName = prefix + '3';
const shell = new Set(
  ['./', './index.html', './adhkar.html', './manifest.webmanifest', './icon-192.png', './icon-512.png']
    .map(path => new URL(path, scope).href)
);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([...shell])));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(prefix) && key !== cacheName).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  url.search = '';
  url.hash = '';
  if (request.method !== 'GET' || !shell.has(url.href)) return;

  const response = fetch(request);
  event.waitUntil(response.then(async result => {
    if (!result.ok) return;
    const copy = result.clone();
    const cache = await caches.open(cacheName);
    await cache.put(url.href, copy);
  }).catch(() => {}));
  event.respondWith(response.catch(async () => {
    const cache = await caches.open(cacheName);
    return (await cache.match(url.href)) || Response.error();
  }));
});
