import type { RefObject } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from './gsap'

/* Every scroll moment on the home page, in one place.
   Rules (ui-animation › scroll-animations):
   - reveals run once and never replay on scroll-up;
   - scrubbed motion is linear with no duration: the scrollbar is the clock;
   - transform and opacity only;
   - reduced motion keeps every state change but drops the travel. */

let introPlayed = false

export function useStoryMotion(scope: RefObject<HTMLElement | null>, lang: string) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & HTMLElement>(sel))
      const one = (sel: string) => root.querySelector<HTMLElement>(sel)
      const rtl = document.documentElement.dir === 'rtl'
      const mm = gsap.matchMedia()

      /* 1. Flagship: the phone shows the step you are reading. A state change,
            so it runs with or without reduced motion (CSS drops the travel). */
      mm.add('(min-width: 900px)', () => {
        const steps = q('.flag__step')
        const screens = q('.flag__screen')
        const callouts = q('.callout')
        const dots = q('.flag__dots li')
        const show = (i: number) => {
          dots.forEach((el, k) => el.classList.toggle('is-on', k === i))
          steps.forEach((el, k) => el.classList.toggle('is-on', k === i))
          screens.forEach((el, k) => {
            el.classList.toggle('is-on', k === i)
            el.classList.toggle('is-past', k < i)
          })
          callouts.forEach((el, k) => el.classList.toggle('is-on', k === i))
        }
        show(0)
        steps.forEach((step, i) =>
          ScrollTrigger.create({
            trigger: step,
            start: 'top 58%',
            end: 'bottom 58%',
            onToggle: (self) => self.isActive && show(i),
          }),
        )
      })

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          wide: '(min-width: 900px)',
          tall: '(min-height: 700px)',
        },
        (ctx) => {
          const { motion, wide, tall } = ctx.conditions as Record<string, boolean>
          if (!motion) return
          root.classList.add('has-motion')
          const cleanups: (() => void)[] = [() => root.classList.remove('has-motion')]

          /* 2. Hero entrance — once per visit, about a second. */
          if (!introPlayed) {
            gsap
              .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => { introPlayed = true } })
              .from(q('[data-hero-fade]'), { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.07 })
              .from(q('.lineup__phone'), { yPercent: 16, autoAlpha: 0, duration: 1.4, stagger: { each: 0.07, from: 'center' } }, 0.2)
          }

          /* 3. Hero exit, scrubbed: each script drifts back toward the edge it reads from,
                the flagship phone rises a little faster than its neighbours (depth). */
          const hero = one('.hero')
          if (wide && hero) {
            gsap
              .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
              .to(q('.hero__name--latin'), { xPercent: -9, ease: 'none' }, 0)
              .to(q('.hero__name--arabic'), { xPercent: 9, ease: 'none' }, 0)
              .to(q('.lineup__item[data-pos="0"]'), { yPercent: -9, ease: 'none' }, 0)
              .to(q('.lineup__item[data-pos="-1"], .lineup__item[data-pos="1"]'), { yPercent: -4, ease: 'none' }, 0)
          }

          /* 4. Section titles rise line by line out of a mask — the few headings that open a chapter. */
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
                  scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                }),
            })
          })

          /* 5. The flagship on a big screen opens from a smaller frame as you scroll to it,
                the screen inside settling from a slight zoom (inset reveal). */
          const desk = one('.flag__desk')
          if (desk) {
            const reveal = { trigger: desk, start: 'top 92%', end: 'top 38%', scrub: true }
            gsap.fromTo(
              desk,
              { clipPath: 'inset(10% 9% 10% 9% round 28px)', y: 60 },
              { clipPath: 'inset(0% 0% 0% 0% round 12px)', y: 0, ease: 'none', scrollTrigger: reveal },
            )
            gsap.fromTo(desk.querySelector('img'), { scale: 1.14 }, { scale: 1, ease: 'none', scrollTrigger: reveal })
          }

          /* 5b. Each panel's screen settles inside its window as the panel arrives. */
          q('.panel__desk img').forEach((img) =>
            gsap.fromTo(img, { scale: 1.1 }, {
              scale: 1, ease: 'none',
              scrollTrigger: { trigger: img.closest('.panel') ?? img, start: 'top bottom', end: 'top 20%', scrub: true },
            }),
          )

          /* 6. Product panels stack: the one underneath recedes as the next slides over it. */
          if (wide && tall) {
            const panels = q('.panel')
            panels.forEach((panel, i) => {
              const phone = panel.querySelector('.panel__phone')
              if (phone) {
                gsap.from(phone, {
                  yPercent: 14,
                  ease: 'none',
                  scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 25%', scrub: true },
                })
              }
              const next = panels[i + 1]
              if (!next) return
              gsap
                .timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true } })
                .to(panel.querySelector('.panel__card'), { scale: 0.93, ease: 'none' }, 0)
                .to(panel.querySelector('.panel__veil'), { opacity: 1, ease: 'none' }, 0)
            })
          }

          /* 7. Landing pages: vertical scroll moves the rail sideways while it is pinned. */
          const rail = one('.rail')
          const track = one('.rail__track')
          if (wide && rail && track) {
            rail.classList.add('is-pinned')
            cleanups.push(() => rail.classList.remove('is-pinned'))
            const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth)
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: rail,
                  start: 'top top',
                  end: () => `+=${distance()}`,
                  pin: true,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              })
              .to(track, { x: () => (rtl ? 1 : -1) * distance(), ease: 'none' }, 0)
              .fromTo(q('.rail__progress span'), { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
          }

          /* 8. Story: the line fills as you read; each chapter lights up as you reach it. */
          const list = one('.story__list')
          const fill = one('.story__line-fill')
          if (list && fill) {
            gsap.fromTo(
              fill,
              { scaleY: 0 },
              { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 62%', end: 'bottom 62%', scrub: true } },
            )
            q('.story__item').forEach((item) =>
              ScrollTrigger.create({
                trigger: item,
                start: 'top 62%',
                onEnter: () => item.classList.add('is-passed'),
                onLeaveBack: () => item.classList.remove('is-passed'),
              }),
            )
          }

          /* 9. The About intro reads itself in: words go from faint to full as you scroll. */
          const intro = one('.story__intro')
          if (intro) {
            intro.classList.add('is-reading')
            cleanups.push(() => intro.classList.remove('is-reading'))
            SplitText.create(intro, {
              type: 'words',
              autoSplit: true,
              onSplit: (self) =>
                gsap.fromTo(self.words, { opacity: 0.18 }, {
                  opacity: 1, ease: 'none', stagger: 0.1,
                  scrollTrigger: { trigger: intro, start: 'top 82%', end: 'bottom 48%', scrub: true },
                }),
            })
          }

          /* 10. Capability cards and process steps arrive in a short cascade, once. */
          ;['.cap', '.step'].forEach((sel) => {
            const els = q(sel)
            gsap.set(els, { y: 28, autoAlpha: 0 })
            ScrollTrigger.batch(els, {
              start: 'top 88%',
              once: true,
              onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07 }),
            })
          })

          return () => cleanups.forEach((c) => c())
        },
      )

      // Web fonts change line lengths; measure again once they are in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope, dependencies: [lang], revertOnUpdate: true },
  )
}
