import type { ReactNode } from 'react'

export type RouteMeta = {
  title?: string
  nav?: boolean
}

type RouteBase = {
  element?: ReactNode
  errorElement?: ReactNode
  meta?: RouteMeta
}


export type IndexRoute = RouteBase & {
  index: true
  path?: never
  children?: never
}

export type LayoutRoute = RouteBase & {
  index?: false
  path?: string
  children: [AppRoute, ...AppRoute[]]
}

export type PageRoute = RouteBase & {
  index?: false
  path: string
  children?: never
}

export type AppRoute = IndexRoute | LayoutRoute | PageRoute
