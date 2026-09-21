import { X } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { PLAN_DETAILS, type PlanBullet } from '@/features/home/data/plan-details'
import { PLAN_DISCOUNT, type Plan } from '@/features/home/data/plans'

function Bullet({ bullet }: { bullet: PlanBullet }) {
  return (
    <li>
      {bullet.text}
      {bullet.strong && <strong className="font-bold text-brand">{bullet.strong}</strong>}
      {bullet.tail}
      {bullet.children && (
        <ul className="mt-0 list-disc ps-6">
          {bullet.children.map((child) => (
            <li key={child}>{child}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

/** "Chi tiết gói" modal — Figma nodes 14470:2497 / 14470:2936 / 14470:3375. */
export function PlanDetailDialog({
  plan,
  open,
  onOpenChange,
}: {
  plan: Plan | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const detail = plan ? PLAN_DETAILS[plan.id] : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        // Keeps shadcn's 16px mobile gutter, which a bare `max-w` would drop.
        className="flex max-h-[min(932px,calc(100svh-4rem))] w-full max-w-[calc(100%-2rem)] flex-col gap-4 overflow-hidden rounded-[20px] bg-white px-6 py-4 text-ink-900 shadow-figma-lg ring-0 sm:max-w-159 dark:bg-white dark:text-ink-900"
      >
        {plan && detail && (
          <>
            <div className="flex shrink-0 items-center justify-between">
              <DialogTitle className="type-h3 font-semibold tracking-[-0.144px] text-ink-800">
                Chi tiết gói
              </DialogTitle>
              <DialogClose
                aria-label="Đóng"
                className="rounded-full outline-none transition-opacity duration-150 focus-visible:ring-3 focus-visible:ring-brand/40 hover:opacity-70"
              >
                <X className="size-7 text-ink-800" />
              </DialogClose>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pb-2">
              <div className="flex shrink-0 flex-col gap-5 rounded-2xl bg-ink-50 p-3">
                <div className="flex flex-col gap-2">
                  <p className={`type-h3 font-semibold tracking-[-0.144px] ${plan.nameColor}`}>
                    {plan.name}
                  </p>
                  <p className="flex flex-wrap items-end gap-1">
                    <span className="type-h2 font-semibold tracking-[-0.225px] text-ink-800">
                      {detail.priceRange}
                    </span>
                    <span className="type-h4 font-semibold tracking-[-0.1px] text-ink-400">
                      VND /tháng
                    </span>
                  </p>
                </div>

                <DialogDescription className="type-p-ui text-ink-500">
                  {detail.description}
                </DialogDescription>

                <button
                  type="button"
                  className="w-full rounded-full border border-ink-300 bg-white px-4 py-2 type-body font-medium text-ink-800 transition-colors duration-200 hover:border-brand hover:text-brand"
                >
                  Xem trên bản đồ
                </button>

                <p className="type-p-ui text-ink-400">{PLAN_DISCOUNT}</p>
              </div>

              <hr className="shrink-0 border-ink-300" />

              {detail.sections.map((section) => (
                <section key={section.title} className="flex shrink-0 flex-col gap-2">
                  <h3 className="type-large font-semibold text-ink-800">{section.title}</h3>
                  <ul className="list-disc ps-6 type-p-ui text-ink-500">
                    {section.bullets.map((bullet) => (
                      <Bullet key={bullet.text + (bullet.strong ?? '')} bullet={bullet} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
