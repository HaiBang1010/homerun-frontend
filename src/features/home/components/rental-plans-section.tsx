import { useState } from 'react'

import { Reveal } from '@/components/reveal'
import { PlanDetailDialog } from '@/features/home/components/plan-detail-dialog'
import { PLANS, PLAN_DISCOUNT, PLAN_NOTES, type Plan } from '@/features/home/data/plans'
import { staggerDelay } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** "Tùy Chọn Thuê Linh Hoạt" section — Figma node 14470:1905. */
export function RentalPlansSection() {
  // Kept while closing so the modal does not flash empty.
  const [selected, setSelected] = useState<Plan | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <section className="bg-ink-100 pt-12 pb-16">
      <div className="container-hr">
        <Reveal className="mx-auto flex max-w-190.75 flex-col gap-2 text-center">
          <h2 className="type-h2 font-semibold tracking-[-0.225px] text-ink-800">
            Tùy Chọn Thuê Linh Hoạt
          </h2>
          <p className="type-large font-semibold text-ink-400">
            Các gói dịch vụ được thiết kế riêng cho mọi nhu cầu
          </p>
        </Reveal>

        <ul className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <Reveal
              as="li"
              key={plan.id}
              delay={staggerDelay(index)}
              // Figma tablet: 3 equal cards in 2 columns, none spanning a full row.
              className="relative"
            >
              <div
                className={cn(
                  'flex h-full flex-col gap-5 bg-white p-5 transition-all duration-200',
                  plan.featured
                    ? 'rounded-[20px] border border-brand drop-shadow-[0px_4px_3px_rgba(250,89,2,0.06),0px_10px_7.5px_rgba(250,89,2,0.1)]'
                    : 'rounded-2xl shadow-container hover:-translate-y-1',
                )}
              >
                <div className="flex flex-col gap-2">
                  <h3
                    className={cn(
                      'type-h3 font-semibold tracking-[-0.144px]',
                      plan.nameColor,
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p className="flex flex-wrap items-end gap-1">
                    <span className="type-h2 font-semibold tracking-[-0.225px] text-ink-800">
                      {plan.price}
                    </span>
                    <span className="type-h4 font-semibold tracking-[-0.1px] text-ink-400">
                      VND /tháng
                    </span>
                  </p>
                </div>

                <p className="flex-1 type-p-ui text-ink-500">{plan.description}</p>

                <button
                  type="button"
                  onClick={() => {
                    setSelected(plan)
                    setOpen(true)
                  }}
                  className="w-full rounded-full border border-ink-300 px-4 py-2 type-body font-medium text-ink-800 transition-colors duration-200 hover:border-brand hover:text-brand"
                >
                  Xem chi tiết
                </button>

                <p className="type-p-ui text-brand">{PLAN_DISCOUNT}</p>
              </div>

              {plan.featured && (
                <span className="absolute -top-3.25 right-6 rounded-full bg-brand px-3 type-p-ui font-medium text-white">
                  Phổ biến nhất
                </span>
              )}
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex flex-col type-body text-ink-500">
          {PLAN_NOTES.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </Reveal>
      </div>

      <PlanDetailDialog plan={selected} open={open} onOpenChange={setOpen} />
    </section>
  )
}
