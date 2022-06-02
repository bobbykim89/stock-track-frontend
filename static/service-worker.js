import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { registerRoute, Route, setDefaultHandler } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

clientsClaim()

self.skipWaiting()

setCacheNameDetails({
  prefix: 'stock-track',
  suffix: '',
  precache: 'precache',
})

precacheAndRoute(self.__WB_MANIFEST)

// Set default precache strategy for runtime resources as stale while revalidate
setDefaultHandler(
  new StaleWhileRevalidate({
    cacheName: 'runtime-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

// Register routes
