import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getErrorMessage } from '@/lib/api-client'

import type { CreatePostInput } from '../types'
import { createPost, fetchPost, fetchPosts } from './posts.api'

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params: { limit?: number }) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
}

export function usePosts(params: { limit?: number } = {}) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => fetchPosts(params),
  })
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => fetchPost(id),
    enabled: Number.isFinite(id),
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      toast.success('Đã tạo bài viết')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}
