import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

/** Marketing button: pill shape, 16px text. Sizes differ too much from `ui/button`. */
const brandButtonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap outline-none transition-all duration-150 select-none focus-visible:ring-3 focus-visible:ring-brand/40 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-hover',
        light: 'bg-white text-neutral-800 hover:bg-neutral-100',
        dark: 'bg-neutral-800 text-white hover:bg-neutral-700',
        outline:
          'border border-neutral-300 bg-white text-neutral-800 hover:border-brand hover:text-brand',
        quiet: 'text-white hover:bg-white/10',
      },
      shape: {
        pill: 'rounded-full',
        rounded: 'rounded-md',
      },
      size: {
        sm: 'h-9 px-4 type-body',
        md: 'h-10 px-4 type-p-ui',
        lg: 'h-12 px-6 type-p-ui',
        icon: 'size-10 rounded-full px-0',
      },
    },
    defaultVariants: { variant: 'primary', shape: 'pill', size: 'md' },
  },
)

type BrandButtonProps = ComponentProps<'button'> &
  VariantProps<typeof brandButtonVariants> & { asChild?: boolean }

export function BrandButton({
  className,
  variant,
  shape,
  size,
  asChild = false,
  ...props
}: BrandButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp className={cn(brandButtonVariants({ variant, shape, size }), className)} {...props} />
  )
}
