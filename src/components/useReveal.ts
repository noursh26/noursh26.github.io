import { useEffect } from 'react'

/** Fades `.reveal` elements in once as they enter the viewport. Re-scans when `key`
 *  changes so elements mounted later (a language switch, a filter) are picked up.
 *  Without IntersectionObserver, everything is shown at once. */
export function useReveal(key: unknown) {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'))
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
