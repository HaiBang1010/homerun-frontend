import { cn } from '@/lib/utils'

type BrandLogoProps = {
  /** Figma sizes: 88×41 header, 200×92 footer. */
  width?: number
  height?: number
  className?: string
}

/** Homerun logo, exported from Figma node 14615:16888. */
export function BrandLogo({ width = 88, height = 41, className }: BrandLogoProps) {
  return (
    <img
      src="/images/home/logo-homerun.svg"
      alt="Homerun"
      width={width}
      height={height}
      style={{ width, height }}
      className={cn('block', className)}
    />
  )
}
