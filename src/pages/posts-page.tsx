import { useState } from 'react'
import { Loader2, Plus, RefreshCw } from 'lucide-react'

import { usePosts, useCreatePost } from '@/features/posts/api/posts.queries'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { getErrorMessage } from '@/lib/api-client'

export function PostsPage() {
  const [title, setTitle] = useState('')
  const { data, isPending, isError, error, refetch, isFetching } = usePosts({ limit: 6 })
  const createPost = useCreatePost()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return
    createPost.mutate(
      { title, body: 'Nội dung mẫu', userId: 1 },
      { onSuccess: () => setTitle('') },
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-5 py-8 md:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bài viết</h1>
          <p className="text-sm text-muted-foreground">
            Dữ liệu lấy từ API qua axios, cache bởi TanStack Query.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={isFetching ? 'size-4 animate-spin' : 'size-4'} />
          Tải lại
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 space-y-2">
          <Label htmlFor="title">Tiêu đề mới</Label>
          <Input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Nhập tiêu đề..."
          />
        </div>
        <Button type="submit" disabled={createPost.isPending || !title.trim()}>
          {createPost.isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Tạo
        </Button>
      </form>

      {isError && (
        <Card className="border-destructive/50">
          <CardContent className="text-sm text-destructive">{getErrorMessage(error)}</CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {isPending
          ? Array.from({ length: 4 }, (_, index) => (
              <Card key={index}>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </CardHeader>
              </Card>
            ))
          : data?.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="text-base capitalize">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="line-clamp-3 text-sm text-muted-foreground">
                  {post.body}
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  )
}
