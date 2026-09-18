import { useEffect } from 'react'

import { useUIStore } from '@/stores/ui-store'

/** Keeps the store theme in sync with the `dark` class on <html>. */
export function useTheme() {
  const theme = useUIStore((state) => state.theme)
  const setTheme = useUIStore((state) => state.setTheme)

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && media.matches)
      root.classList.toggle('dark', isDark)
    }

    apply()
    if (theme !== 'system') return

    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme])

  return { theme, setTheme }
}
