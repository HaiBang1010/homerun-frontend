import { RootLayout } from '@/layouts/root-layout'
import { HomePage, NotFoundPage, PostsPage } from '@/pages'

import type { AppRoute } from '@/types/route'

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, meta: { title: 'Trang chủ', nav: true } },
      { path: 'posts', element: <PostsPage />, meta: { title: 'Bài viết', nav: true } },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
