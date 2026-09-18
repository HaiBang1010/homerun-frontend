import { Reveal } from '@/components/reveal'
import { BENEFITS } from '@/features/home/data/benefits'
import { staggerDelay } from '@/lib/motion'

/** "Tại Sao là Homerun?" section — Figma node 14470:1699. 3 columns on desktop, 2 on tablet, 1 on mobile. */
export function WhyHomerunSection() {
  return (
    <section className="bg-neutral-100 pt-12 pb-16 lg:pb-26">
      <div className="container-hr">
        <Reveal className="mx-auto flex max-w-[763px] flex-col gap-2 text-center">
          <h2 className="type-h2 font-semibold tracking-[-0.225px] text-neutral-800">
            Tại Sao là <span className="text-brand">Homerun</span>?
          </h2>
          <p className="type-large font-semibold text-neutral-400">
            Tìm kiếm căn hộ thật mệt mỏi. Đây là cách chúng tôi giúp bạn dễ dàng hơn.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-18 lg:grid-cols-3 lg:gap-y-14">
          {BENEFITS.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.title}
              delay={staggerDelay(index)}
              className="group flex gap-5"
            >
              <benefit.icon
                aria-hidden
                strokeWidth={2}
                className="size-12 shrink-0 text-black transition-colors duration-200 group-hover:text-brand"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="type-h4 font-semibold tracking-[-0.1px] text-neutral-800">
                  {benefit.title}
                </h3>
                <p className="type-p-ui text-neutral-500">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
