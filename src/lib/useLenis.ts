import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduced } from './motion'

let lenisInstance: Lenis | null = null

export const getLenis = () => lenisInstance

/** One smooth-scroll engine for the whole page, driven off the GSAP ticker so
 *  ScrollTrigger and Lenis never fight over the frame. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled || reduced()) return

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
    })
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}

export function scrollTo(target: string) {
  const el = document.querySelector(target)
  if (!el) return
  const lenis = getLenis()
  const complete = () => {
    if (el instanceof HTMLElement) {
      if (!el.hasAttribute('tabindex')) el.tabIndex = -1
      el.focus({ preventScroll: true })
    }
  }
  complete()
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(el as HTMLElement, { duration: 1.1 })
  }
  else {
    el.scrollIntoView({ behavior: reduced() ? 'instant' : 'smooth' })
  }
}
