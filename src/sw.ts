/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { Hono } from 'hono'
import { handle } from 'hono/service-worker'
import initDb from './db'
import { products } from './schema'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) {
  allowlist = [/^\/$/]
}

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist },
))

self.skipWaiting()

clientsClaim()

const app = new Hono().basePath('/sw')

app.get('/', (c) => c.json({ message: 'Hello World' }))

app.get('/products', async (c) => {
  const db = await initDb()

  try {
    const data = await db.select().from(products)

    return c.json({ data })

  } catch (error) {

    console.log('err', error)

    return c.json({ error })
  }
})

app.post('/products', async (c) => {
  const db = await initDb()

  try {
    const data = await db.insert(products).values({ name: Math.random().toString() })

    return c.json({ data })

  } catch (error) {

    console.log('err', error)

    return c.json({ error })
  }
})


self.addEventListener('fetch', handle(app))