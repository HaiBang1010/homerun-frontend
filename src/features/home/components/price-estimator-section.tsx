import { MapPin } from 'lucide-react'
import { useState } from 'react'

import { Reveal } from '@/components/reveal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AMENITY_OPTIONS,
  LOCATION_OPTIONS,
  MONTH_OPTIONS,
  PLAN_OPTIONS,
  formatVnd,
  type Option,
} from '@/features/home/data/estimator'
import { cn } from '@/lib/utils'

/** Select field — Figma: slate/300 border, radius 6, height 40. */
function Field({
  placeholder,
  options,
  value,
  onChange,
  icon,
}: {
  placeholder: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={placeholder}
        className="w-full rounded-[6px] border-slate-line bg-white px-3 type-p-ui text-neutral-900 data-[size=default]:h-10 data-placeholder:text-slate-soft dark:bg-white dark:text-neutral-900 [&_svg]:size-5"
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon}
          <SelectValue placeholder={placeholder} />
        </span>
      </SelectTrigger>
      {/*
        The stock menu takes its colour from --popover and defaults to "item-aligned",
        which overlaps the trigger. Force the Figma look and drop it below instead.
      */}
      <SelectContent
        position="popper"
        align="start"
        sideOffset={4}
        // Popper mode pins the viewport to one row tall; reset to auto.
        className="w-(--radix-select-trigger-width) min-w-(--radix-select-trigger-width) rounded-[6px] border border-slate-line bg-white p-1 text-neutral-900 shadow-figma-md ring-0 dark:bg-white dark:text-neutral-900 **:data-[position=popper]:h-auto"
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="rounded-[4px] py-2 pl-3 type-p-ui text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const EMPTY = { plan: '', amenity: '', months: '', location: '' }

/** "Bạn Sẽ Trả Chính Xác Bao Nhiêu?" section — Figma node 14470:1952. */
export function PriceEstimatorSection() {
  const [form, setForm] = useState(EMPTY)
  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const complete = Object.values(form).every(Boolean)

  // Placeholder maths until a quote API exists.
  const total = complete
    ? PLAN_OPTIONS.find((o) => o.value === form.plan)!.factor *
      MONTH_OPTIONS.find((o) => o.value === form.months)!.factor *
      AMENITY_OPTIONS.find((o) => o.value === form.amenity)!.factor *
      LOCATION_OPTIONS.find((o) => o.value === form.location)!.factor
    : 0

  return (
    <section className="relative overflow-hidden bg-neutral-50 pt-12 pb-33">
      <img
        src="/images/home/estimator-1920.jpg"
        srcSet="/images/home/estimator-960.jpg 960w, /images/home/estimator-1920.jpg 1920w"
        sizes="100vw"
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1181}
        className="absolute inset-0 size-full object-cover object-top"
      />
      <div aria-hidden className="absolute inset-0 bg-black/60" />

      <div className="container-hr relative">
        <Reveal className="mx-auto flex max-w-190.75 flex-col gap-2 text-center">
          <h2 className="type-h2 font-semibold tracking-[-0.225px] text-white">
            Bạn Sẽ Trả Chính Xác Bao Nhiêu?
          </h2>
          <p className="type-large font-semibold text-white/70">
            Không phát sinh - Không bất ngờ - Giá trị minh bạch ngay từ đầu
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14 flex justify-center">
          <form
            onSubmit={(event) => event.preventDefault()}
            // Result on top, filters below. DOM order stays filters → result for tab/screen-reader flow.
            className="flex w-full max-w-212 flex-col-reverse overflow-hidden rounded-[20px] bg-white shadow-container lg:flex-row"
          >
            <div className="flex flex-1 items-center justify-center p-6">
              <div className="flex w-full max-w-102 flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Field
                    placeholder="Loại gói"
                    options={PLAN_OPTIONS}
                    value={form.plan}
                    onChange={set('plan')}
                  />
                  <Field
                    placeholder="Tiện ích"
                    options={AMENITY_OPTIONS}
                    value={form.amenity}
                    onChange={set('amenity')}
                  />
                  <Field
                    placeholder="Số tháng"
                    options={MONTH_OPTIONS}
                    value={form.months}
                    onChange={set('months')}
                  />
                </div>
                <Field
                  placeholder="Vị trí"
                  options={LOCATION_OPTIONS}
                  value={form.location}
                  onChange={set('location')}
                  icon={<MapPin aria-hidden className="size-4.5 shrink-0 text-slate-soft" />}
                />
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col items-center justify-center gap-5 bg-neutral-100 px-6 py-6 lg:w-90">
              <div className="flex w-full flex-col items-center gap-2">
                <p className="type-p-ui font-medium text-neutral-500">Giá Tổng Ước Tính</p>
                <p className="flex items-baseline justify-center gap-1.5">
                  <span className="type-h2 font-semibold tracking-[-0.225px] text-neutral-800">
                    {formatVnd(total)}
                  </span>
                  <span className="type-h4 font-semibold tracking-[-0.1px] text-neutral-500">
                    VND
                  </span>
                </p>
              </div>

              <div className="flex w-full items-center gap-2">
                <button
                  type="submit"
                  disabled={!complete}
                  className={cn(
                    'h-10 flex-1 rounded-full bg-neutral-800 px-4 type-body font-medium whitespace-nowrap text-white transition-all duration-150 lg:w-58 lg:flex-none',
                    complete ? 'hover:bg-neutral-700 active:scale-[0.97]' : 'opacity-50',
                  )}
                >
                  Đặt gói
                </button>
                <button
                  type="button"
                  onClick={() => setForm(EMPTY)}
                  disabled={!complete}
                  className={cn(
                    'h-10 flex-1 rounded-full border border-neutral-300 bg-white px-4 type-body font-medium whitespace-nowrap text-neutral-800 transition-all duration-150',
                    complete ? 'hover:border-brand hover:text-brand active:scale-[0.97]' : 'opacity-50',
                  )}
                >
                  Bỏ lọc
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
