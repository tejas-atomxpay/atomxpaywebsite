import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import ComingSoon from './components/ComingSoon'

function RootComponent() {
  return <Outlet />
}

const rootRoute = createRootRoute({
  component: RootComponent,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ComingSoon,
})

// Catch-all: every other path also shows the Coming Soon page.
const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$',
  component: ComingSoon,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  catchAllRoute,
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
