import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reduced } from '../lib/motion'
import { getLenis, scrollTo } from '../lib/useLenis'
import { useContent, useLang } from '../i18n'

/** The header is deliberately almost nothing: the wordmark and one word. No
 *  ground, no blur, no rule, no counters — it floats over whatever is behind it
 *  and inverts to ink over the paper sections. Everything else lives in the
 *  overlay. */
export function Nav() {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const { nav, contact, ui } = useContent()
  const { lang, setLang } = useLang()

  /* Invert over light grounds so two white marks never sit on paper.
     Measured live rather than through a ScrollTrigger start/end pair: the
     pinned sections change the document height after this mounts, and a cached
     trigger position would be reading the wrong part of the page. */
  useLayoutEffect(() => {
    const el = header.current
    if (!el) return
    const line = 46 // the header's own centre line
    const paper = gsap.utils.toArray<HTMLElement>('[data-ground="paper"]')
    if (!paper.length) return

    let ink = false
    const check = () => {
      const next = paper.some((section) => {
        const r = section.getBoundingClientRect()
        return r.top <= line && r.bottom >= line
      })
      if (next !== ink) { ink = next; el.classList.toggle('is-ink', next) }
    }

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    ScrollTrigger.addEventListener('refresh', check)
    check()
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      ScrollTrigger.removeEventListener('refresh', check)
    }
  }, [])

  useLayoutEffect(() => {
    const el = overlay.current
    if (!el) return
    document.body.classList.toggle('is-locked', open)

    if (reduced()) { gsap.set(el, { autoAlpha: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }); return }

    const links = el.querySelectorAll('.menu__link span')
    const meta = el.querySelectorAll('.menu__meta > *')
    const tl = gsap.timeline()

    if (open) {
      gsap.set(el, { pointerEvents: 'auto', autoAlpha: 1 })
      tl.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'brand' })
        .fromTo(links, { yPercent: 118 }, { yPercent: 0, duration: 0.9, ease: 'brand', stagger: 0.06 }, '-=0.5')
        .fromTo(meta, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'brand', stagger: 0.06 }, '-=0.5')
    } else {
      gsap.set(el, { pointerEvents: 'none' })
      tl.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'brandInOut' })
        .set(el, { autoAlpha: 0 })
    }
    return () => { tl.kill() }
  }, [open])

  useEffect(() => {
    if (!open) return
    getLenis()?.stop()
    const first = overlay.current?.querySelector<HTMLAnchorElement>('a')
    // Let the visibility update paint before moving focus, including the
    // instant reduced-motion path where GSAP can sleep between frames.
    const focusTimer = window.setTimeout(() => first?.focus({ preventScroll: true }), 100)
    const keys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); return }
      if (e.key !== 'Tab') return
      const controls = [
        ...Array.from(overlay.current?.querySelectorAll<HTMLElement>('a, button') ?? []),
        toggle.current,
      ].filter((control): control is HTMLElement => control !== null)
      const index = controls.indexOf(document.activeElement as HTMLElement)
      const next = (index + (e.shiftKey ? -1 : 1) + controls.length) % controls.length
      e.preventDefault()
      controls[next]?.focus()
    }
    window.addEventListener('keydown', keys)
    return () => {
      window.clearTimeout(focusTimer)
      getLenis()?.start()
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', keys)
    }
  }, [open])

  useEffect(() => () => window.clearTimeout(navigationTimer.current), [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    window.clearTimeout(navigationTimer.current)
    navigationTimer.current = window.setTimeout(() => scrollTo(`#${id}`), open && !reduced() ? 420 : 0)
  }

  return (
    <>
      <header className="nav" ref={header}>
        <a className="nav__logo" href="#top" onClick={go('top')} aria-label="Nour Aldeen Shehadea — home" tabIndex={open ? -1 : undefined}>
          <img className="nav__logo-light" src="assets/brand/lockup-en-reversed.png" alt="Nour Aldeen Shehadea" />
          <img className="nav__logo-ink" src="assets/brand/lockup-en.png" alt="" aria-hidden="true" />
        </a>

        <div className="nav__actions">
          <button
            className="nav__menu nav__lang"
            type="button"
            lang={lang === 'en' ? 'ar' : 'en'}
            tabIndex={open ? -1 : undefined}
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          >
            {ui.langSwitch}
          </button>
          <button
            className={`nav__menu ${open ? 'is-open' : ''}`}
            type="button"
            aria-expanded={open}
            aria-controls="menu-overlay"
            ref={toggle}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? ui.menuClose : ui.menuOpen}
          </button>
        </div>
      </header>

      <div className="menu" id="menu-overlay" ref={overlay} inert={!open} role="dialog" aria-modal={open || undefined} aria-label={ui.menuAria}>
        <nav className="menu__nav" aria-label={ui.menuAria}>
          {nav.map((item) => (
            <a className="menu__link" key={item.id} href={`#${item.id}`} onClick={go(item.id)} data-cursor={ui.goCursor}>
              <em>{item.no}</em>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="menu__meta">
          <div>
            <span className="kicker">{ui.getInTouch}</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.github} target="_blank" rel="noreferrer noopener">github.com/noursh26</a>
          </div>
          <div>
            <span className="kicker">{ui.based}</span>
            <p>{contact.location.split(' — ')[0]}<br />{contact.location.split(' — ')[1]}</p>
          </div>
          <a className="btn btn--accent menu__cta" href="#invitation" onClick={go('invitation')}>
            <span>{ui.startConversation} <i className="arrow">↗</i></span>
          </a>
        </div>
      </div>
    </>
  )
}
