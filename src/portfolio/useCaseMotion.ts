import type { RefObject } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../story/gsap'

/* Every scroll moment on a case page. Same rules as the rest of the site:
   scrubbed motion is linear (the scrollbar is the clock), reveals run once,
   transform / opacity / clip-path only. State changes (which screen the tour
   shows, which section the bar marks) run with or without reduced motion;
   only the travel is dropped. */

export function useCaseMotion(scope: RefObject<HTMLElement | null>, lang: string) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const q = (sel: string, el: ParentNode = root) => Array.from(el.querySelectorAll<HTMLElement>(sel))
      const one = (sel: string) => root.querySelector<HTMLElement>(sel)
      const rtl = document.documentElement.dir === 'rtl'
      const mm = gsap.matchMedia()

      /* Section bar: mark the part of the story you are in. */
      const links = q('[data-nav]')
      links.forEach((a) => {
        const target = document.getElementById(a.dataset.nav!)
        if (!target) return
        ScrollTrigger.create({
          trigger: target,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => a.classList.toggle('is-on', self.isActive),
        })
      })

      /* The tour: the step you are reading decides the screens. */
      mm.add('(min-width: 900px)', () => {
        const stage = one('.ctour__stage')
        const steps = q('.tstep')
        if (!stage || !steps.length) return
        const desk = q('.ctour__desk .tshot', stage)
        const phone = q('.ctour__phone .tshot', stage)
        const handset = stage.querySelector<HTMLElement>('.ctour__phone')
        const count = stage.querySelector<HTMLElement>('[data-count]')
        const hasPhone = new Set(phone.map((p) => p.dataset.step))
        const hasDesk = new Set(desk.map((d) => d.dataset.step))
        const show = (i: number) => {
          steps.forEach((s, k) => s.classList.toggle('is-on', k === i))
          for (const img of [...desk, ...phone]) {
            const k = Number(img.dataset.step)
            img.classList.toggle('is-shown', k <= i)
            // Fetch the next screen before it is needed.
            if (k <= i + 2 && img instanceof HTMLImageElement && img.loading === 'lazy') img.loading = 'eager'
          }
          // A desktop-only screen: the phone steps aside rather than showing the wrong thing.
          handset?.classList.toggle('is-away', desk.length > 0 && !hasPhone.has(String(i)))
          // A phone-only screen in a desktop product: the window steps back and the phone leads.
          stage.classList.toggle('is-phone-lead', desk.length > 0 && !hasDesk.has(String(i)))
          if (count) count.textContent = String(i + 1).padStart(2, '0')
        }
        show(0)
        steps.forEach((step, i) =>
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => self.isActive && show(i),
          }),
        )
      })

      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 900px)' },
        (ctx) => {
          const { motion, wide } = ctx.conditions as Record<string, boolean>
          if (!motion) return
          root.classList.add('has-motion')

          /* 1. Hero: copy rises, the window opens from a smaller frame, the phone follows. */
          gsap.from(q('.chero [data-rise]'), { y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.07, delay: 0.1 })
          const heroDesk = one('.chero__desk')
          const heroPhone = one('.chero__phone:not(.chero__phone--start)')
          if (heroDesk) {
            gsap.fromTo(heroDesk, { clipPath: 'inset(9% 8% 9% 8% round 28px)', y: 50 }, {
              clipPath: 'inset(0% 0% 0% 0% round 12px)', y: 0, duration: 1.5, ease: 'expo.out', delay: 0.2,
            })
            gsap.from(heroDesk.querySelector('img'), { scale: 1.12, duration: 1.8, ease: 'expo.out', delay: 0.2 })
          }
          if (heroPhone) gsap.from(heroPhone, { yPercent: 30, autoAlpha: 0, duration: 1.4, ease: 'expo.out', delay: 0.45 })
          const hero = one('.chero')
          if (hero && wide) {
            gsap
              .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
              .to(heroDesk, { yPercent: -6, ease: 'none' }, 0)
              .to(heroPhone, { yPercent: -22, ease: 'none' }, 0)
              .to(q('.chero__phone--start'), { yPercent: -14, ease: 'none' }, 0)
              .to(q('.chero__copy'), { yPercent: 10, autoAlpha: 0.2, ease: 'none' }, 0)
          }

          /* 2. Headings rise line by line out of a mask. */
          q('[data-split]').forEach((el) => {
            SplitText.create(el, {
              type: 'lines',
              mask: 'lines',
              linesClass: 'split-line',
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.09,
                  scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                }),
            })
          })

          /* 3. The problem statement reads itself in, word by word. */
          q('[data-read]').forEach((el) => {
            el.classList.add('is-reading')
            SplitText.create(el, {
              type: 'words',
              autoSplit: true,
              onSplit: (self) =>
                gsap.fromTo(self.words, { opacity: 0.16 }, {
                  opacity: 1, ease: 'none', stagger: 0.1,
                  scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
                }),
            })
          })

          /* 4. Plain blocks settle in once. */
          q('[data-rise-scroll], .cfacts li').forEach((el) =>
            gsap.from(el, {
              y: 28, autoAlpha: 0, duration: 0.9, ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
          )

          /* 5. Tour: the devices grow into place as the tour arrives. Narrow screens
                get each step's own screens rising in instead. */
          const stage = one('.ctour__devices')
          if (stage && wide) {
            gsap.fromTo(stage, { scale: 0.88, yPercent: 6 }, {
              scale: 1, yPercent: 0, ease: 'none',
              scrollTrigger: { trigger: '.ctour', start: 'top bottom', end: 'top top', scrub: true },
            })
          } else {
            q('.tstep__media').forEach((m) =>
              gsap.from(m.children, {
                y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
                scrollTrigger: { trigger: m, start: 'top 85%', once: true },
              }),
            )
          }

          /* 5b. Roles: three phones rise into a row, the middle one a step ahead. */
          const roleList = one('.croles__list')
          if (roleList && wide) {
            const items = q('.crole', roleList)
            gsap
              .timeline({ scrollTrigger: { trigger: roleList, start: 'top bottom', end: 'top 30%', scrub: true } })
              .from(items.map((r) => r.querySelector('.crole__phone')), { yPercent: (i) => [36, 22, 36][i] ?? 30, ease: 'none' }, 0)
              .from(items.map((r) => r.querySelector('.crole__copy')), { y: 40, autoAlpha: 0, ease: 'none', stagger: 0.08 }, 0.3)
          }
          const flank = one('.chero__phone--start')
          if (flank) gsap.from(flank, { yPercent: 36, autoAlpha: 0, duration: 1.4, ease: 'expo.out', delay: 0.55 })

          /* 6. The rail: rows drift in opposite directions while the section passes. */
          q('.crail__row').forEach((row, r) => {
            const span = () => Math.max(0, row.scrollWidth - document.documentElement.clientWidth) * 0.6
            // Forward is toward the end of the row: left in English, right in Arabic.
            const end = () => (rtl ? 1 : -1) * span()
            const odd = r % 2 === 1
            gsap.fromTo(row, { x: () => (odd ? end() : 0) }, {
              x: () => (odd ? 0 : end()),
              ease: 'none',
              scrollTrigger: { trigger: '.crail', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
            })
          })

          /* 7. Engineering notes arrive in a short cascade. */
          const notes = q('[data-note]')
          gsap.set(notes, { y: 28, autoAlpha: 0 })
          ScrollTrigger.batch(notes, {
            start: 'top 88%',
            once: true,
            onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 }),
          })

          /* 8. The next project opens from a smaller frame. */
          const card = one('.cnext__card')
          if (card) {
            const reveal = { trigger: card, start: 'top 95%', end: 'top 45%', scrub: true }
            gsap.fromTo(card, { clipPath: 'inset(6% 5% 6% 5% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', scrollTrigger: reveal })
            const media = card.querySelector('.cnext__media > *')
            if (media) gsap.from(media, { yPercent: 18, ease: 'none', scrollTrigger: reveal })
          }

          return () => root.classList.remove('has-motion')
        },
      )

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    },
    { scope, dependencies: [lang], revertOnUpdate: true },
  )
}
