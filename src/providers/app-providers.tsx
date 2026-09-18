import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, type ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { useTheme } from '@/hooks/use-theme'
import { setAuthTokenGetter, setUnauthorizedHandler } from '@/lib/api-client'
import { env } from '@/lib/env'
import { queryClient } from '@/lib/query-client'
import { useAuthStore } from '@/stores/auth-store'

setAuthTokenGetter(() => useAuthStore.getState().token)

export function AppProviders({ children }: { children: ReactNode }) {
  useTheme()

  useEffect(() => {
    setUnauthorizedHandler(() => {
      useAuthStore.getState().logout()
      queryClient.clear()
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
      {/* Moved left: by default the devtools button covers and blocks the chatbot button. */}
      {env.isDev && <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />}
    </QueryClientProvider>
  )
}
