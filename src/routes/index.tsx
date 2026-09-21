import { Suspense, type ReactNode } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { Skeleton } from '@/components/ui/skeleton'
import type { AppRoute, LayoutRoute } from '@/types/route'

import { routes } from './config'

function PageFallback() {
  return (
    <div className="container-hr space-y-4 py-8">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>
}

function hasChildren(route: AppRoute): route is LayoutRoute {
  return Array.isArray(route.children) && route.children.length > 0
}

function buildRoute(route: AppRoute): RouteObject {
  const { meta, children, element, ...rest } = route
  const built: RouteObject = { ...rest }

  if (meta) built.handle = meta

  if (hasChildren(route)) {
    if (element) built.element = element
    built.children = route.children.map(buildRoute)
  } else if (element) {
    built.element = withSuspense(element)
  }

  return built
}

export function buildRoutes(list: AppRoute[]): RouteObject[] {
  return list.map(buildRoute)
}

export const router = createBrowserRouter(buildRoutes(routes))
