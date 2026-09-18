import { BotMessageSquare } from 'lucide-react'
import { useState } from 'react'

import { ChatPanel } from '@/components/chat-panel'

/** Chatbot FAB — Figma node 14470:2079. Opens the chat panel and hides itself. */
export function ChatbotFab({ unread = 1 }: { unread?: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-40 lg:right-6 lg:bottom-6">
      {open ? (
        <ChatPanel onClose={() => setOpen(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={
            unread > 0 ? `Mở trợ lý Homerun, ${unread} tin nhắn chưa đọc` : 'Mở trợ lý Homerun'
          }
          className="group relative block size-14 rounded-full border border-brand bg-white shadow-figma-md outline-none transition-transform duration-200 focus-visible:ring-3 focus-visible:ring-brand/40 hover:scale-110 active:scale-95"
        >
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full border border-brand/40 animation-duration-[2.6s] group-hover:hidden"
          />
          <BotMessageSquare className="absolute top-1/2 left-1/2 size-7.5 -translate-x-1/2 -translate-y-1/2 text-brand" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-brand type-p-ui font-medium text-white">
              {unread}
            </span>
          )}
        </button>
      )}
    </div>
  )
}
