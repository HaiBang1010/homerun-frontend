import { request } from '@/lib/api-client'

import type { CreatePostInput, Post } from '../types'

export function fetchPosts(params?: { limit?: number }) {
  return request<Post[]>({
    url: '/posts',
    method: 'GET',
    params: { _limit: params?.limit ?? 10 },
  })
}

export function fetchPost(id: number) {
  return request<Post>({ url: `/posts/${id}`, method: 'GET' })
}

export function createPost(input: CreatePostInput) {
  return request<Post>({ url: '/posts', method: 'POST', data: input })
}
