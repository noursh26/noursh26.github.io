import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useLang } from './i18n'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { Deck } from './components/Deck'
import { useReveal } from './components/useReveal'
import { CheckIcon, Chevron, CopyIcon, GithubIcon, MailIcon } from './components/icons'
import { projectCover, projectHref, projects } from './portfolio/data'
import type { Project } from './portfolio/types'

const FEATURED = ['estratijiya-ai', 'almustfa', 'fahrast', 'accountant', 'salesflow', 'arkani', 'm3aak']

const d = (i: number) => ({ '--d': `${i * 0.06}s` }) as CSSProperties

function WorkCard({ p, wide = false }: { p: Project; wide?: boolean }) {
  const { lang, content } = useLang()
  const desktop = projectCover(p)
  const phone = projectCover(p, 'mobile')
  const phoneFirst = p.layout === 'mobile'
  return (
    <a
      href={projectHref(p.id)}
      className={`work-card reveal ${wide ? 'work-card--wide' : ''} ${phoneFirst ? 'work-card--phone' : ''}`}
      style={{ '--card-bg': p.palette.background, '--card-fg': p.palette.foreground, '--card-accent': p.palette.accent } as CSSProperties}
    >
      <span className="work-card__copy">
        <span className="work-card__name"><bdi>{p.name}</bdi></span>
        <span className="work-card__text">{p.summary[lang]}</span>
        <span className="work-card__more">{content.work.view}<Chevron /></span>
      </span>
      <span className="work-card__media" aria-hidden="true">
        {!phoneFirst && desktop && (
          <img className="work-card__desktop" src={desktop.file} alt="" width={desktop.width} height={desktop.height} loading="lazy" decoding="async" />
        )}
        {phone && (wide || phoneFirst) && (
          <img className="work-card__phone" src={phone.file} alt="" width={phone.width} height={phone.height} loading="lazy" decoding="async" />
        )}
      </span>
    </a>
  )
}

function CopyEmail({ email }: { email: string }) {
  const { content } = useLang()
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = email
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* nothing else to try */ }
      ta.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button type="button" className={`btn btn--quiet copy-btn ${copied ? 'is-copied' : ''}`} onClick={copy}>
      <span className="copy-btn__icon" aria-hidden="true">
        <CopyIcon className="copy-btn__a" />
        <CheckIcon className="copy-btn__b" />
      </span>
      <span aria-live="polite">{copied ? content.contact.copied : content.contact.copy}</span>
    </button>
  )
}

export default function App() {
  const { lang, content } = useLang()
  const { hero, facts, work, build, approach, about, contact, ui } = content
  useReveal(lang)
  const featured = FEATURED.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => !!p)

  return (
    <div className="site">
      <a className="skip-link" href="#main">{ui.skipLink}</a>
      <SiteHeader page="home" />

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero__inner">
            <p className="t-eyebrow hero__eyebrow reveal">{hero.eyebrow}</p>
            <h1 id="hero-title" className="t-display hero__title reveal" style={d(1)}>
              <span>{hero.title[0]}</span> <span className="hero__title-2">{hero.title[1]}</span>
            </h1>
            <p className="t-lede hero__lede reveal" style={d(2)}>{hero.lede}</p>
            <div className="hero__actions reveal" style={d(3)}>
              <a className="btn btn--primary" href="#work">{hero.primary}</a>
              <a className="link" href="#contact">{hero.secondary}<Chevron /></a>
            </div>
          </div>
          <div className="reveal" style={d(4)}>
            <Deck />
          </div>
        </section>

        <section className="facts" aria-label={hero.eyebrow}>
          <dl className="wrap facts__grid">
            {facts.map((f, i) => (
              <div className="facts__item reveal" style={d(i)} key={i}>
                <dt className="facts__label">{f.label}</dt>
                <dd className="facts__value" dir="ltr">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <header className="section__head">
              <p className="t-eyebrow reveal">{work.eyebrow}</p>
              <h2 id="work-title" className="t-title reveal" style={d(1)}>{work.title}</h2>
              <p className="t-lede reveal" style={d(2)}>{work.lede}</p>
            </header>
            <div className="work__grid">
              {featured.map((p, i) => <WorkCard key={p.id} p={p} wide={i === 0} />)}
            </div>
            <p className="work__all reveal">
              <a className="btn btn--quiet" href="/projects/">{work.all}<Chevron /></a>
            </p>
          </div>
        </section>

        <section className="section build" id="build" aria-labelledby="build-title">
          <div className="wrap">
            <header className="section__head">
              <p className="t-eyebrow reveal">{build.eyebrow}</p>
              <h2 id="build-title" className="t-title reveal" style={d(1)}>{build.title}</h2>
            </header>
            <ul className="build__grid">
              {build.items.map((b, i) => (
                <li className="build__item reveal" style={d(i % 3)} key={i}>
                  <h3 className="t-headline">{b.title}</h3>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section approach" id="approach" aria-labelledby="approach-title">
          <div className="wrap">
            <header className="section__head">
              <p className="t-eyebrow reveal">{approach.eyebrow}</p>
              <h2 id="approach-title" className="t-title reveal" style={d(1)}>{approach.title}</h2>
            </header>
            <ol className="approach__steps">
              {approach.steps.map((st, i) => (
                <li className="approach__step reveal" style={d(i)} key={i}>
                  <span className="approach__no" dir="ltr">{i + 1}</span>
                  <h3 className="t-headline">{st.title}</h3>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="wrap about__grid">
            <header className="about__head">
              <p className="t-eyebrow reveal">{about.eyebrow}</p>
              <h2 id="about-title" className="t-title reveal" style={d(1)}>{about.title}</h2>
            </header>
            <div className="about__body">
              {about.paragraphs.map((p, i) => <p className="about__p reveal" style={d(i)} key={i}>{p}</p>)}
              <dl className="about__facts reveal">
                {about.facts.map((f, i) => (
                  <div key={i}>
                    <dt>{f.k}</dt>
                    <dd><bdi>{f.v}</bdi></dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="contact__card reveal">
              <p className="t-eyebrow">{contact.eyebrow}</p>
              <h2 id="contact-title" className="t-title">{contact.title}</h2>
              <p className="t-lede contact__lede">{contact.lede}</p>
              <a className="contact__email" href={`mailto:${contact.email}`} dir="ltr">{contact.email}</a>
              <div className="contact__actions">
                <a className="btn btn--primary" href={`mailto:${contact.email}`}><MailIcon className="btn__icon" />{ui.contact}</a>
                <CopyEmail email={contact.email} />
                <a className="btn btn--quiet" href={contact.github} target="_blank" rel="noopener noreferrer"><GithubIcon className="btn__icon" />{contact.githubLabel}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
