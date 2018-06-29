workbox.skipWaiting();
workbox.clientsClaim();
// Cache static
workbox.routing.registerRoute(
  /\.(?:js|css|json)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static'
  })
);

workbox.routing.registerRoute(
  'https://api-maps.yandex.ru/2.1/?lang=en_US',
  workbox.strategies.staleWhileRevalidate(),
);

// Precache html files
workbox.precaching.precacheAndRoute([{
    url: '/',
    revision: '1',
  },
  {
    url: '/restaurant/',
    revision: '2',
  }
]);

// Cache requested images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'img',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);


const queue = new workbox.backgroundSync.Queue('syncQueue');

self.addEventListener('fetch', (event) => {
  // Clone the request to ensure it's save to read when
  // adding to the Queue.
  const promiseChain = fetch(event.request.clone())
    .catch((err) => {
      return queue.addRequest(event.request);
    });

  event.waitUntil(promiseChain);

});
