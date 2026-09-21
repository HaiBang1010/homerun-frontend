import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Reveal } from '@/components/reveal'
import { ListingCard } from '@/features/home/components/listing-card'
import { LISTINGS } from '@/features/home/data/listings'
import { useMediaQuery } from '@/hooks/use-media-query'
import { staggerDelay } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Page gap = the clip area's horizontal padding, so the translate step equals its `clientWidth`. */
const SLIDE_GAP = 32

/** "Cộng Đồng Homerun Nổi Bật" section — Figma node 14470:1740. */
export function FeaturedListingsSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')
  const perPage = isDesktop ? 4 : isTablet ? 2 : 1

  // Derived, not fixed: 4 pages hard-coded would hide 8/16 items on tablet.
  const pageCount = Math.ceil(LISTINGS.length / perPage)

  const [page, setPage] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  // Percentage translateX resolves against the track width (gaps included), so measure in pixels.
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const measure = () => setStep(el.clientWidth)
    measure()

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pages = useMemo(
    () =>
      Array.from({ length: pageCount }, (_, index) =>
        LISTINGS.slice(index * perPage, index * perPage + perPage),
      ),
    [perPage, pageCount],
  )

  // Clamp during render: the breakpoint may have shrunk the page count.
  const currentPage = Math.min(page, pageCount - 1)

  const goTo = (next: number) => setPage(Math.min(Math.max(next, 0), pageCount - 1))

  return (
    <section className="bg-ink-100 pt-12 pb-16">
      <div className="container-hr">
        <Reveal className="mx-auto flex max-w-190.75 flex-col gap-2 text-center">
          <h2 className="type-h2 font-semibold tracking-[-0.225px] text-ink-800">
            Cộng Đồng Homerun Nổi Bật
          </h2>
          <p className="type-large font-semibold text-ink-400">
            Danh sách bất động sản được săn đón
          </p>
        </Reveal>

        {/* Padding widens the clip box so shadows survive; negative margin restores the layout. */}
        <div className="mt-12">
          <div ref={viewportRef} className="-mx-4 -my-10 overflow-hidden px-4 py-10">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                gap: `${SLIDE_GAP}px`,
                transform: `translateX(-${currentPage * step}px)`,
              }}
            >
              {pages.map((group, index) => (
                <div
                  key={index}
                  aria-hidden={index !== currentPage}
                  className="grid w-full shrink-0 gap-6"
                  style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}
                >
                  {group.map((listing, cardIndex) =>
                    // Later pages get their entrance from the slide transition.
                    index === 0 ? (
                      <Reveal key={listing.id} delay={staggerDelay(cardIndex, 90)}>
                        <ListingCard listing={listing} />
                      </Reveal>
                    ) : (
                      <ListingCard key={listing.id} listing={listing} />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label="Trang trước"
            className="grid place-items-center rounded-full bg-white p-2 outline-none transition-all duration-200 focus-visible:ring-3 focus-visible:ring-brand/40 disabled:opacity-50 not-disabled:shadow-xs2 not-disabled:hover:scale-110"
          >
            <ChevronLeft className="size-6 text-ink-800" />
          </button>

          {/* 16 dots do not fit one row at 335px. */}
          <div
            role="tablist"
            aria-label="Trang danh sách"
            className="flex min-w-0 flex-wrap items-center justify-center gap-2"
          >
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentPage}
                aria-label={`Trang ${index + 1} trên ${pageCount}`}
                onClick={() => goTo(index)}
                className={cn(
                  'h-2.5 cursor-pointer rounded-full transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-brand/50',
                  index === currentPage
                    ? 'w-10 bg-ink-800'
                    : 'w-2.5 bg-ink-300 hover:bg-ink-400',
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
            aria-label="Trang sau"
            className="grid place-items-center rounded-full bg-white p-2 outline-none transition-all duration-200 focus-visible:ring-3 focus-visible:ring-brand/40 disabled:opacity-50 not-disabled:shadow-xs2 not-disabled:hover:scale-110"
          >
            <ChevronRight className="size-6 text-ink-800" />
          </button>
        </div>
      </div>
    </section>
  )
}
