importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const {registerRoute} = workbox.routing;
const {CacheFirst, NetworkFirst, NetworkOnly} = workbox.strategies;
const {BackgroundSyncPlugin} = workbox.backgroundSync;

const cacheNetworkFirst = [
    '/api/auth/renew-token',
    '/api/events'
]

registerRoute(
    ({request, url}) => {
        // console.log({request, url});
        if (cacheNetworkFirst.includes(url.pathname)) return true;
        return false;
    },
    new NetworkFirst()
)

/* Referencia */
/*registerRoute(
    new RegExp('https://calendar-app-arianjs.herokuapp.com/api/auth/renew-token'),
    new NetworkFirst()
)*/

const cacheFirst = [
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css'
]

registerRoute(
    ({request, url}) => {
        // console.log({request, url});
        if (cacheFirst.includes(url.href)) return true;
        return false;
    },
    new CacheFirst()
)

/* Referencia */
/*registerRoute(
    new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'),
    new CacheFirst()
)*/

/* Post Offline */
const bgSyncPlugin = new BackgroundSyncPlugin('posts-offline', {
    maxRetentionTime: 24 * 60
});

registerRoute(
    new RegExp('https://calendar-app-arianjs.herokuapp.com/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
)

registerRoute(
    new RegExp('https://calendar-app-arianjs.herokuapp.com/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
)

registerRoute(
    new RegExp('https://calendar-app-arianjs.herokuapp.com/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
)