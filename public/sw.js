import { cleanupOutdatedCaches, precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

// self.skipWaiting()
// clientsClaim()

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  {
    allowList: [/^\/$/],
    denylist: [
      /^\/api\//,
      /^\/stats\//,
      /^\/setlist\//,
      /^\/sw.js$/,
      /^\/manifest-(.*).webmanifest$/,
    ]
  },
))