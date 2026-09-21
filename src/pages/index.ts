import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('./home-page').then((m) => ({ default: m.HomePage })),
)

export const PostsPage = lazy(() =>
  import('./posts-page').then((m) => ({ default: m.PostsPage })),
)

export const NotFoundPage = lazy(() =>
  import('./not-found-page').then((m) => ({ default: m.NotFoundPage })),
)
