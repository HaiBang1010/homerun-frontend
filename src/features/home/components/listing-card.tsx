import { Heart, MapPin } from 'lucide-react'
import { useState } from 'react'

import { TIER_STYLE, type Listing } from '@/features/home/data/listings'
import { cn } from '@/lib/utils'

/** Property card — Figma node 14470:1745. */
export function ListingCard({ listing }: { listing: Listing }) {
  const [liked, setLiked] = useState(false)
  const tier = TIER_STYLE[listing.tier]

  return (
    <article className="group flex h-110 flex-col overflow-hidden rounded-[20px] bg-white shadow-figma-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0px_14px_24px_-6px_rgba(0,0,0,0.14)]">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-neutral-100">
        <img
          src={listing.image}
          alt={listing.name}
          loading="lazy"
          width={640}
          height={427}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <img
          src="/images/home/listings/card-gradient.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full object-cover"
        />

        <span
          className={cn(
            'absolute bottom-3 left-4 rounded-full px-3 type-p-ui font-medium text-white',
            tier.badge,
          )}
        >
          {tier.label}
        </span>

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? `Bỏ lưu ${listing.name}` : `Lưu ${listing.name}`}
          className="absolute top-3 right-3 grid place-items-center rounded-full bg-white p-2.5 shadow-figma-md outline-none transition-transform duration-150 focus-visible:ring-3 focus-visible:ring-brand/40 hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              'size-5 transition-colors duration-200',
              liked ? 'fill-brand text-brand' : 'text-neutral-800',
            )}
          />
        </button>
      </div>

      <div className="flex shrink-0 flex-col gap-6 py-4">
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-1">
            <h3 className="truncate type-h4 font-semibold tracking-[-0.1px] text-neutral-800">
              {listing.name}
            </h3>
            <p className="flex items-center gap-2 type-p-ui text-neutral-500">
              <MapPin aria-hidden className="size-4.5 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </p>

            <p className="flex items-baseline gap-2">
              <span className="type-large font-semibold text-brand">{listing.price}</span>
              <span aria-hidden className="h-3 w-px self-center bg-neutral-300" />
              <span className="type-p-ui text-neutral-500">
                {listing.area} m<sup className="text-[10.32px]">2</sup>
              </span>
            </p>
          </div>

          {/* Amenity strip, exported from Figma as one asset. */}
          <img
            src="/images/home/listings/amenities.svg"
            alt="Wifi, máy giặt, giường, an ninh"
            width={168}
            height={24}
            className="h-6 w-42"
          />
        </div>

        <div className="px-4">
          <button
            type="button"
            className="w-full rounded-full border border-neutral-300 px-4 py-2 type-body font-medium text-neutral-800 transition-colors duration-200 hover:border-brand hover:text-brand"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </article>
  )
}
