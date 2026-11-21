import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useLang } from '../i18n'

type Page = 'home' | 'projects' | 'case'

export function BrandMark() {
  return (
    <>
      <img className="brand-mark brand-mark--light" src="/assets/brand/mark-black-88.png" alt="" width="122" height="88" />
      <img className="brand-mark brand-mark--dark" src="/assets/brand/mark-white-88.png" alt="" width="122" height="88" />
    </>
  )
}

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, content } = useLang()
  const other = lang === 'ar' ? 'en' : 'ar'
  return (
    <button
      type="button"
      className={`lang-toggle ${className}`}
      onClick={() => setLang(other)}
      lang={other}
      aria-label={content.ui.langLabel}
      title={content.ui.langLabel}
    >
      {content.ui.langSwitch}
    </button>
  )
}

export function SiteHeader({ page }: { page: Page }) {
  const { content } = useLang()
  const { nav, ui } = content
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const sheetId = useId()
  const button = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const base = page === 'home' ? '' : '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    sheet.current?.querySelector<HTMLElement>('a,button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    const onResize = () => { if (window.innerWidth >= 900) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar wrap">
        <a className="nav__brand" href="/" aria-label={`${ui.name} — ${ui.home}`}>
          <BrandMark />
          <span>{ui.name}</span>
        </a>
        <nav className="nav__links" aria-label={ui.mainNav}>
          {nav.map((n) => (
            <a key={n.id} href={`${base}#${n.id}`}>{n.label}</a>
          ))}
          <a href="/projects/" aria-current={page === 'projects' ? 'page' : undefined}>{ui.projects}</a>
        </nav>
        <div className="nav__actions">
          <LangToggle className="nav__lang" />
          <a className="btn btn--primary btn--sm nav__cta" href={`${base}#contact`}>{ui.contact}</a>
          <button
            ref={button}
            type="button"
            className="nav__menu"
            aria-expanded={open}
            aria-controls={sheetId}
            aria-label={open ? ui.close : ui.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="nav__scrim" aria-hidden="true" onClick={close} />
      <div className="nav__sheet" id={sheetId} ref={sheet} inert={!open}>
        <nav aria-label={ui.mainNav}>
          {nav.map((n, i) => (
            <a key={n.id} href={`${base}#${n.id}`} onClick={close} style={{ '--i': i } as CSSProperties}>{n.label}</a>
          ))}
          <a href="/projects/" onClick={close} style={{ '--i': nav.length } as CSSProperties}>{ui.projects}</a>
          <a href={`${base}#contact`} onClick={close} style={{ '--i': nav.length + 1 } as CSSProperties}>{ui.contact}</a>
        </nav>
        <div className="nav__sheet-foot">
          <LangToggle />
        </div>
      </div>
    </header>
  )
}
