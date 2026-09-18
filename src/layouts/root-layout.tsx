import { Outlet, useLocation } from 'react-router-dom'

import { ChatbotFab } from '@/components/chatbot-fab'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { cn } from '@/lib/utils'

/**
 * Shared shell: floating header, dark footer, fixed chatbot button.
 * Only the home page runs full-bleed under the header; others need the 80px offset.
 */
export function RootLayout() {
  const overHero = useLocation().pathname === '/'

  return (
    <div className="flex min-h-svh flex-col bg-white text-neutral-900">
      <SiteHeader overHero={overHero} />
      <main className={cn('flex-1', !overHero && 'pt-20')}>
        <Outlet />
      </main>
      <SiteFooter />
      <ChatbotFab />
    </div>
  )
}
