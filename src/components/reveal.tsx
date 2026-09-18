import type { CSSProperties, ElementType, ReactNode } from 'react'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay, in ms. */
  delay?: number
  as?: ElementType
}

/** Fades a block up when scrolled into view, once. */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
      className={cn('reveal-init', inView && 'reveal-in', className)}
    >
      {children}
    </Tag>
  )
}
