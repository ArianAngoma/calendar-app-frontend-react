importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const {registerRoute} = workbox.routing;
const {CacheFirst, NetworkFirst} = workbox.strategies;

registerRoute(
    new RegExp('https://calendar-app-arianjs.herokuapp.com/api/auth/renew-token'),
    new NetworkFirst()
)

registerRoute(
    new RegExp('https://calendar-app-arianjs.herokuapp.com/api/events'),
    new NetworkFirst()
)

registerRoute(
    new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'),
    new CacheFirst()
)

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css'),
    new CacheFirst()
)