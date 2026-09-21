import { MapPin, Search } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { BrandButton } from '@/components/brand-button'
import { UNIVERSITIES } from '@/features/home/data/universities'
import { normalizeVi } from '@/lib/text'
import { cn } from '@/lib/utils'

const MAX_RESULTS = 4

/** Hero search + suggestion menu — Figma nodes 14470:3419 and 14470:3426. */
export function HeroSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const results = useMemo(() => {
    const q = normalizeVi(query)
    if (!q) return []
    return UNIVERSITIES.filter((name) => normalizeVi(name).includes(q)).slice(0, MAX_RESULTS)
  }, [query])

  const showMenu = open && results.length > 0

  useEffect(() => {
    if (!showMenu) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [showMenu])

  const select = (name: string) => {
    setQuery(name)
    setOpen(false)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }
    if (!showMenu) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      select(results[activeIndex] ?? results[0])
    }
  }

  return (
    <div
      ref={rootRef}
      className="flex w-full max-w-190.75 flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-start sm:justify-center sm:gap-2"
    >
      <div className="relative w-full sm:w-110">
        <div className="flex h-12 w-full items-center gap-2 rounded-full bg-white px-5">
          <Search aria-hidden className="size-4.5 shrink-0 text-soft" />
          <input
            type="text"
            role="combobox"
            aria-expanded={showMenu}
            aria-controls={showMenu ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={showMenu ? `${listId}-${activeIndex}` : undefined}
            aria-label="Tìm trường của bạn"
            placeholder="Tìm kiếm"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
              setActiveIndex(0)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="w-full min-w-0 bg-transparent type-p-ui font-medium text-ink-900 outline-none placeholder:text-soft"
          />
        </div>

        {showMenu && (
          <ul
            id={listId}
            role="listbox"
            className="absolute inset-x-0 top-full z-10 mt-2 flex animate-in flex-col rounded-[24px] border border-line bg-white p-2 text-left duration-200 fade-in slide-in-from-top-2 drop-shadow-[0px_2px_2.5px_rgba(0,0,0,0.06),0px_4px_3px_rgba(0,0,0,0.1)]"
          >
            {results.map((name, index) => (
              <li
                key={name}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onPointerEnter={() => setActiveIndex(index)}
                onPointerDown={(event) => {
                  event.preventDefault()
                  select(name)
                }}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-[20px] px-3 py-2 transition-colors duration-150',
                  index === activeIndex && 'bg-ink-100',
                )}
              >
                <MapPin aria-hidden className="size-4.5 shrink-0 text-ink-500" />
                <span className="truncate type-p-ui text-ink-500">{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BrandButton type="submit" size="lg" className="h-12 px-6">
        Khám phá ngay
      </BrandButton>
    </div>
  )
}
