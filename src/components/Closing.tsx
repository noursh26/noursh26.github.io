import { useLayoutEffect, useRef } from 'react'
import { gsap, maskLines, revealOnScroll, magnetic, reduced } from '../lib/motion'
import { scrollTo } from '../lib/useLenis'
import { contact, nav } from '../content'

export function Closing() {
  const root = useRef<HTMLElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)
  const mark = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      maskLines('.closing__title')
      revealOnScroll(el)
      if (reduced()) return
      gsap.fromTo('.closing__media img',
        { scale: 1.25, yPercent: -6 },
        {
          scale: 1, yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      // the footer is a sibling of this section, so it sits outside the
      // context's scope — reach it by ref rather than by selector
      if (mark.current) {
        gsap.from(mark.current, {
          yPercent: 24, autoAlpha: 0, duration: 1.2, ease: 'brand',
          scrollTrigger: { trigger: mark.current, start: 'top 96%' },
        })
      }
    }, el)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (cta.current) return magnetic(cta.current, 0.32)
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollTo(`#${id}`) }

  return (
    <>
      <section className="closing" id="contact" ref={root}>
        <div className="closing__media is-placeholder" aria-hidden="true">
          <img src="assets/generated/closing-path.webp" alt="" />
        </div>
        <div className="closing__scrim" aria-hidden="true" />

        <div className="shell closing__grid">
          <div>
            <div className="section-mark" data-reveal>
              <span className="numeral">{contact.no}</span>
              <span className="kicker">{contact.kicker}</span>
            </div>
            <h2 className="closing__title display">{contact.title}</h2>
          </div>

          <div className="closing__action">
            <p className="lede" data-reveal>{contact.text}</p>
            <a className="btn btn--accent closing__cta" href={`mailto:${contact.email}`} ref={cta}>
              <span data-magnetic-inner>{contact.cta} <i className="arrow">↗</i></span>
            </a>
            <a className="closing__alt" href={contact.github} target="_blank" rel="noreferrer noopener">
              See the code on GitHub <i className="arrow">↗</i>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer__top">
          <img className="footer__mark" src="assets/brand/lockup-en-reversed.png" alt="Nour Aldeen Shehadea" ref={mark} />
          <p className="footer__line">Your product.<br />Built and shipped.</p>
        </div>

        <div className="shell footer__grid">
          <div>
            <span className="kicker">Get in touch</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.github} target="_blank" rel="noreferrer noopener">github.com/noursh26</a>
          </div>
          <div>
            <span className="kicker">Based</span>
            <p>{contact.location}</p>
          </div>
          <div>
            <span className="kicker">Explore</span>
            {nav.slice(0, 4).map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={go(item.id)}>{item.label}</a>
            ))}
          </div>
        </div>

        <div className="shell footer__bottom">
          <span>© {new Date().getFullYear()} NOUR ALDEEN SHEHADEA · AL-QATIFA</span>
          <span>Code with direction. كود له وجهة.</span>
        </div>
      </footer>
    </>
  )
}
