import type { RefObject } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../story/gsap'

/* Every scroll moment on /projects/, in one place. Same rules as the home page:
   scrubbed motion is linear (the scrollbar is the clock), reveals run once,
   transform / opacity / clip-path only, and reduced motion keeps the content
   with no travel and no pinning. */

export function useDirectoryMotion(scope: RefObject<HTMLElement | null>, lang: string) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const q = (sel: string, el: ParentNode = root) => Array.from(el.querySelectorAll<HTMLElement>(sel))
      const one = (sel: string) => root.querySelector<HTMLElement>(sel)
      const mm = gsap.matchMedia()

      /* Chapter bar: the chip for the chapter you are in. A state, so always on. */
      const chips = q('[data-chip]')
      const mark = (id: string) =>
        chips.forEach((c) => {
          const on = c.dataset.chip === id
          c.classList.toggle('is-on', on)
          // On a narrow bar, keep the current chapter in view without moving the page.
          const bar = c.closest('ol')
          if (on && bar && bar.scrollWidth > bar.clientWidth) {
            const li = c.parentElement!
            bar.scrollTo({ left: li.offsetLeft - (bar.clientWidth - li.offsetWidth) / 2, behavior: 'smooth' })
          }
        })
      ;(['flagship', 'featured', 'landing', 'more'] as const).forEach((id) => {
        const els = q(`[data-chapter="${id}"]`)
        if (!els.length) return
        ScrollTrigger.create({
          trigger: els[0],
          endTrigger: els[els.length - 1],
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && mark(id),
        })
      })

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          wide: '(min-width: 900px)',
          tall: '(min-height: 640px)',
        },
        (ctx) => {
          const { motion, wide, tall } = ctx.conditions as Record<string, boolean>
          if (!motion) return
          root.classList.add('has-motion')
          const pinned = wide && tall
          if (pinned) root.classList.add('is-pinned')
          ScrollTrigger.refresh()

          /* Intro: lines rise from a mask, then the rest settles in. */
          gsap.from(q('.dir-intro [data-fade]'), { y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.15 })
          q('[data-split]').forEach((el) => {
            SplitText.create(el, {
              type: 'lines',
              mask: 'lines',
              linesClass: 'split-line',
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.1,
                  ease: 'expo.out',
                  stagger: 0.09,
                  scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                }),
            })
          })

          /* 1. Flagship: the window starts filling the screen and settles into its frame;
                three phones rise in around it, then the story underneath fades up. */
          const flag = one('.dflag')
          if (flag && pinned) {
            const desk = flag.querySelector('.dflag__desk')!
            const fill = () => {
              const r = (desk as HTMLElement).getBoundingClientRect()
              return Math.min(2.2, Math.max(1.1, window.innerWidth / r.width, window.innerHeight / r.height))
            }
            gsap
              .timeline({
                scrollTrigger: { trigger: flag, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
              })
              .fromTo(desk, { scale: fill, yPercent: 8 }, { scale: 1, yPercent: 0, ease: 'none', duration: 0.45 }, 0)
              .from(q('.dflag__head > *', flag), { autoAlpha: 0, y: -30, stagger: 0.03, ease: 'none', duration: 0.2 }, 0.25)
              .from(q('.dflag__phone--a, .dflag__phone--c', flag), { yPercent: 70, autoAlpha: 0, ease: 'none', duration: 0.3 }, 0.32)
              .from(q('.dflag__phone--b', flag), { yPercent: 90, autoAlpha: 0, ease: 'none', duration: 0.3 }, 0.38)
              .from(q('.dflag__foot > *', flag), { y: 40, autoAlpha: 0, stagger: 0.04, ease: 'none', duration: 0.2 }, 0.62)
              .to({}, { duration: 0.15 })
          } else if (flag) {
            gsap.from(q('.dflag__stage > *', flag), {
              y: 50, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08,
              scrollTrigger: { trigger: flag, start: 'top 75%', once: true },
            })
          }

          /* 2. Product chapters: the card grows into place, then — pinned — each
                screen wipes up over the last while its feature lights up beside it. */
          q('.pchap').forEach((chap, ci, all) => {
            const card = chap.querySelector('.pchap__card')!
            const steps = q('.pchap__steps li', chap)
            const caps = q('.pchap__caption span', chap)
            const desk = q('.pchap__desk .dscreen', chap)
            const phone = q('.pchap__phone:not(.pchap__phone--side) .dscreen', chap)
            const n = Math.max(desk.length, phone.length)
            const show = (i: number) => {
              steps.forEach((el, k) => el.classList.toggle('is-on', k === i))
              caps.forEach((el, k) => el.classList.toggle('is-on', k === i))
            }

            if (!pinned) {
              gsap.from(q('.pchap__stage > *', chap), {
                y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
                scrollTrigger: { trigger: chap, start: 'top 80%', once: true },
              })
              return
            }

            gsap.fromTo(card, { scale: 0.9, borderRadius: 48 }, {
              scale: 1, borderRadius: 28, ease: 'none',
              scrollTrigger: { trigger: chap, start: 'top bottom', end: 'top top', scrub: true },
            })
            gsap.from(q('.pchap__phone', chap), {
              yPercent: 18, ease: 'none',
              scrollTrigger: { trigger: chap, start: 'top bottom', end: 'top top', scrub: true },
            })

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: chap,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self) => show(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
              },
            })
            for (let i = 1; i < n; i++) {
              const at = i - 0.35
              if (desk[i]) tl.fromTo(desk[i], { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', duration: 0.5 }, at)
              if (phone[i]) tl.fromTo(phone[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 0.5 }, at + 0.08)
            }
            tl.to({}, { duration: 0.35 }, n - 0.35)
            q('.pchap__bar i', chap).forEach((bar, i) => {
              tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, i)
            })

            /* As the next chapter slides over, this one recedes. */
            const next = all[ci + 1]
            if (next) {
              gsap
                .timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } })
                .to(card, { scale: 0.92, ease: 'none' }, 0)
                .to(chap.querySelector('.pchap__veil'), { opacity: 1, ease: 'none' }, 0)
            }
          })

          /* 3. Landing cards stack; the one underneath steps back. */
          const cards = q('.lcard')
          cards.forEach((c, i) => {
            gsap.from(c.querySelector('.lcard__phone'), {
              yPercent: 24, ease: 'none',
              scrollTrigger: { trigger: c, start: 'top bottom', end: 'top 30%', scrub: true },
            })
            const next = cards[i + 1]
            if (!next || !pinned) return
            gsap
              .timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true } })
              .to(c.querySelector('.lcard__inner'), { scale: 0.94, ease: 'none' }, 0)
              .to(c.querySelector('.lcard__veil'), { opacity: 1, ease: 'none' }, 0)
          })

          /* 4. Also built: each screen opens from a smaller frame as it arrives. */
          q('.mrow').forEach((row) => {
            const media = row.querySelector<HTMLElement>('.mrow__media')
            if (media) {
              gsap.fromTo(
                media,
                { clipPath: 'inset(14% 12% 14% 12% round 24px)' },
                { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 35%', scrub: true } },
              )
              gsap.fromTo(media.querySelector('img'), { scale: 1.12 }, {
                scale: 1, ease: 'none', scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 35%', scrub: true },
              })
            }
            gsap.from(q('.mrow__copy > *', row), {
              y: 20, autoAlpha: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05,
              scrollTrigger: { trigger: row, start: 'top 80%', once: true },
            })
          })

          return () => root.classList.remove('has-motion', 'is-pinned')
        },
      )

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    },
    { scope, dependencies: [lang], revertOnUpdate: true },
  )
}
