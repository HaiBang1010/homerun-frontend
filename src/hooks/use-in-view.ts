import { useEffect, useRef, useState } from 'react'

type Options = {
  /** Fire once, then disconnect. */
  once?: boolean
  threshold?: number
  rootMargin?: string
}

/** Reports when an element enters the viewport. Without IntersectionObserver it counts as visible. */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, inView }
}
