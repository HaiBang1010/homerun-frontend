import { useEffect, useState } from 'react'

/** Reports once the page has scrolled past `offset` px. */
export function useScrolled(offset = 80) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset)

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [offset])

  return scrolled
}
