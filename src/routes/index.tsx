import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/layouts/root-layout'
import { Skeleton } from '@/components/ui/skeleton'

const HomePage = lazy(() =>
  import('@/pages/home-page').then((m) => ({ default: m.HomePage })),
)
const PostsPage = lazy(() =>
  import('@/pages/posts-page').then((m) => ({ default: m.PostsPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
)

function PageFallback() {
  return (
    <div className="container-hr space-y-4 py-8">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'posts', element: withSuspense(<PostsPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
