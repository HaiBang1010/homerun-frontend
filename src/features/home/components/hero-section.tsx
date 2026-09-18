import { useState } from 'react'

import { HeroSearch } from '@/features/home/components/hero-search'
import { cn } from '@/lib/utils'

/** The design ships one background image; slides reuse it with a different framing. */
const SLIDES = [
  { objectPosition: '50% 50%', alt: '' },
  { objectPosition: '15% 60%', alt: '' },
  { objectPosition: '85% 40%', alt: '' },
  { objectPosition: '50% 90%', alt: '' },
]

/** Hero — Figma node 14470:1677 (desktop), 14470:14020 (mobile). */
export function HeroSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative h-203 w-full overflow-hidden bg-neutral-100 md:h-225">
      {SLIDES.map((slide, index) => (
        <img
          key={index}
          src="/images/home/hero-1920.jpg"
          srcSet="/images/home/hero-960.jpg 960w, /images/home/hero-1920.jpg 1920w"
          sizes="100vw"
          alt={slide.alt}
          aria-hidden={index !== active}
          fetchPriority={index === 0 ? 'high' : 'low'}
          width={1920}
          height={1280}
          style={{ objectPosition: slide.objectPosition }}
          className={cn(
            'absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out',
            index === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          )}
        />
      ))}

      <div aria-hidden className="absolute inset-0 bg-black/30" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-neutral-100/0 to-neutral-100"
      />

      <div className="container-hr absolute inset-x-0 bottom-50 flex flex-col items-center gap-8">
        <div className="flex w-full max-w-190.75 flex-col gap-3 text-center text-white text-shadow-[0px_1px_2px_rgba(0,0,0,0.06),0px_1px_3px_rgba(0,0,0,0.1)]">
          <h1 className="text-[30px] leading-9 font-semibold tracking-[-0.225px] md:text-[48px] md:leading-12 md:font-extrabold md:tracking-[-0.576px]">
            Bạn học trường nào?
          </h1>
          <p className="type-h4 font-semibold md:text-[24px] md:leading-8 md:tracking-[-0.144px]">
            Kết nối bạn với căn hộ hoàn hảo một cách dễ dàng.
          </p>
        </div>

        <form onSubmit={(event) => event.preventDefault()} className="flex w-full justify-center">
          <HeroSearch />
        </form>
      </div>

      <div
        role="tablist"
        aria-label="Chọn ảnh nền"
        className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Ảnh ${index + 1} trên ${SLIDES.length}`}
            onClick={() => setActive(index)}
            className={cn(
              'h-2.5 cursor-pointer rounded-full transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-brand/50',
              index === active ? 'w-10 bg-neutral-800' : 'w-2.5 bg-neutral-400 hover:bg-neutral-500',
            )}
          />
        ))}
      </div>
    </section>
  )
}
