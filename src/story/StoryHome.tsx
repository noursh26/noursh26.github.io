import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, Check, Clock, Copy, EnvelopeSimple, GithubLogo, MapPin } from '@phosphor-icons/react'
import { useLang } from '../i18n'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { projectHref } from '../portfolio/paths'
import { Browser, Phone, shot } from './Devices'
import { Glyph } from './Glyph'
import { useStoryMotion } from './useStoryMotion'
import * as C from './content'

type T = { en: string; ar: string }

function useT() {
  const { lang } = useLang()
  return (x: T) => x[lang]
}

/* ── Hero ─────────────────────────────────────────────────────── */

function Hero() {
  const L = useT()
  const h = C.hero
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__top">
        <p className="eyebrow" data-hero-fade>{L(h.eyebrow)}</p>
        {/* Each script sits at the edge it starts reading from, in both languages. */}
        <h1 id="hero-title" className="hero__names" dir="ltr">
          <span className="hero__name hero__name--latin" lang="en" data-hero-fade>Nour Aldeen</span>
          <span className="hero__name hero__name--arabic" lang="ar" dir="rtl" data-hero-fade>نور الدين</span>
        </h1>
        <div className="hero__row">
          <p className="hero__lede" data-hero-fade>{L(h.lede)}</p>
          <div className="hero__actions" data-hero-fade>
            <a className="btn btn--primary" href="#work">
              {L(h.cta)} <ArrowDown className="btn__icon" weight="bold" aria-hidden="true" />
            </a>
            <a className="btn btn--quiet" href="#contact">{L(h.cta2)}</a>
          </div>
        </div>
      </div>
      <div className="lineup" role="img" aria-label={L(h.lineupLabel)}>
        {h.lineup.map((p) => (
          <div className="lineup__item" data-pos={p.pos} key={p.id}>
            <div className="lineup__phone">
              <Phone src={shot(p.id, p.shot)} eager={p.pos === 0} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Flagship: Almostfa ───────────────────────────────────────── */

function Flagship() {
  const L = useT()
  const { lang } = useLang()
  const f = C.flagship
  const callouts = f.steps.map((s, i) => (
    <span
      key={i}
      className={`callout ${i === 0 ? 'is-on' : ''}`}
      style={{ '--x': `${s.callout.x}%`, '--y': `${s.callout.y}%` } as CSSProperties}
    >
      <i className="callout__dot" />
      <span className="callout__line" />
      <span className="callout__label">{L(s.callout.label)}</span>
    </span>
  ))
  return (
    <section className="flag tinted" id="work" data-project="almustfa" aria-labelledby="flag-title">
      <header className="wrap flag__head">
        <p className="eyebrow">{L(f.eyebrow)}</p>
        <h2 id="flag-title" className="flag__name">
          {L(f.name)}
          {lang === 'en' && <span className="flag__name-ar" lang="ar" dir="rtl">المصطفى</span>}
        </h2>
        <p className="flag__title" data-split>{L(f.title)}</p>
        <p className="flag__intro">{L(f.intro)}</p>
        <ul className="facts">
          {f.facts.map((x, i) => (
            <li key={i}><Glyph name={x.icon} />{L(x.text)}</li>
          ))}
        </ul>
      </header>

      <div className="wrap flag__story">
        <ol className="flag__steps">
          {f.steps.map((s, i) => (
            <li className={`flag__step ${i === 0 ? 'is-on' : ''}`} key={i}>
              <div className="flag__step-media">
                <Phone src={shot(f.id, s.shot)} alt={`${L(f.name)} — ${L(s.title)}`} />
              </div>
              <div className="flag__step-copy">
                <span className="flag__step-icon"><Glyph name={s.icon} /></span>
                <h3>{L(s.title)}</h3>
                <p>{L(s.text)}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flag__stage" aria-hidden="true">
          <ol className="flag__dots">
            {f.steps.map((_, i) => <li key={i} className={i === 0 ? 'is-on' : ''} />)}
          </ol>
          <Phone className="flag__device" overlay={callouts}>
            {f.steps.map((s, i) => (
              <img
                key={i}
                className={`flag__screen ${i === 0 ? 'is-on' : ''}`}
                src={shot(f.id, s.shot)}
                alt=""
                width={390}
                height={844}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </Phone>
        </div>
      </div>

      <div className="wrap flag__coda">
        <div className="flag__coda-copy">
          <h3>{L(f.coda.title)}</h3>
          <p>{L(f.coda.text)}</p>
          <p className="stack" dir="ltr">{f.stack.join(' · ')}</p>
          <a className="btn btn--primary" href={projectHref(f.id)}>
            {L(C.more.open)}<span className="sr-only">: {L(f.name)}</span> <ArrowUpRight className="btn__icon flip-rtl" weight="bold" aria-hidden="true" />
          </a>
        </div>
        <Browser className="flag__desk" src={shot(f.id, f.coda.shot)} host="almustfa" alt={`${L(f.name)} — ${L(f.coda.title)}`} />
      </div>
    </section>
  )
}

/* ── Five more products, stacking ─────────────────────────────── */

function More() {
  const L = useT()
  return (
    <section className="more section" aria-labelledby="more-title">
      <header className="wrap head">
        <p className="eyebrow">{L(C.more.eyebrow)}</p>
        <h2 id="more-title" className="head__title" data-split>{L(C.more.title)}</h2>
        <p className="head__lede">{L(C.more.lede)}</p>
      </header>
      <div className="wrap panels">
        {C.panels.map((p) => (
          <article className="panel" data-project={p.id} key={p.id} aria-labelledby={`panel-${p.id}`}>
            <div className="panel__card tinted">
              <div className="panel__copy">
                <p className="panel__kind">{L(p.kind)}</p>
                <h3 id={`panel-${p.id}`} className="panel__name">{L(p.name)}</h3>
                <p className="panel__title">{L(p.title)}</p>
                <p className="panel__text">{L(p.text)}</p>
                <ul className="panel__points">
                  {p.points.map((pt, i) => (
                    <li key={i}><Glyph name={pt.icon} />{L(pt.text)}</li>
                  ))}
                </ul>
                <p className="stack"><span>{L(C.more.built)}</span> <bdi dir="ltr">{p.stack.join(' · ')}</bdi></p>
                <a className="panel__link" href={projectHref(p.id)}>
                  {L(C.more.open)}<span className="sr-only">: {L(p.name)}</span> <ArrowUpRight className="btn__icon flip-rtl" weight="bold" aria-hidden="true" />
                </a>
              </div>
              <div className="panel__visual" aria-hidden="true">
                <Browser className="panel__desk" src={shot(p.id, p.desk)} host={p.host} />
                <Phone className="panel__phone" src={shot(p.id, p.phone)} />
              </div>
              <span className="panel__veil" aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ── Landing pages ────────────────────────────────────────────── */

function Landings() {
  const L = useT()
  const l = C.landings
  return (
    <section className="rail" aria-labelledby="rail-title">
      <div className="rail__inner">
        <header className="wrap head head--row">
          <div>
            <p className="eyebrow">{L(l.eyebrow)}</p>
            <h2 id="rail-title" className="head__title" data-split>{L(l.title)}</h2>
          </div>
          <p className="head__lede">{L(l.lede)}</p>
        </header>
        <ul className="rail__track">
          {l.items.map((it) => (
            <li className="rail__item" key={it.id}>
              <a className="rail__card" href={projectHref(it.id)}>
                <Browser src={shot(it.id, it.shot)} host={it.host} alt={L(it.name)} />
                <span className="rail__meta">
                  <strong>{L(it.name)}</strong>
                  <span>{L(it.text)}</span>
                </span>
              </a>
            </li>
          ))}
          <li className="rail__item rail__item--all">
            <a className="rail__all" href="/projects/">
              <span>{L(l.all)}</span>
              <ArrowUpRight className="rail__all-icon flip-rtl" weight="bold" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <div className="wrap">
          <div className="rail__progress" aria-hidden="true"><span /></div>
        </div>
      </div>
    </section>
  )
}

/* ── About ────────────────────────────────────────────────────── */

function Story() {
  const L = useT()
  const s = C.story
  return (
    <section className="story section" id="about" aria-labelledby="story-title">
      <div className="wrap story__grid">
        <div className="story__aside">
          <p className="eyebrow">{L(s.eyebrow)}</p>
          <h2 id="story-title" className="head__title">{L(s.title)}</h2>
          <p className="story__intro">{L(s.intro)}</p>
          <dl className="story__facts">
            {s.facts.map((f, i) => (
              <div key={i}>
                <dt>{L(f.k)}</dt>
                <dd><bdi>{L(f.v)}</bdi></dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="story__timeline">
          <span className="story__line" aria-hidden="true"><span className="story__line-fill" /></span>
          <ol className="story__list">
            {s.chapters.map((c, i) => (
              <li className="story__item" key={i}>
                <span className="story__icon"><Glyph name={c.icon} /></span>
                <div>
                  <p className="story__tag">{L(c.tag)}</p>
                  <h3>{L(c.title)}</h3>
                  <p>{L(c.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ── What I build, how I work ─────────────────────────────────── */

function Build() {
  const L = useT()
  return (
    <section className="section build" id="build" aria-labelledby="build-title">
      <div className="wrap">
        <header className="head">
          <p className="eyebrow">{L(C.build.eyebrow)}</p>
          <h2 id="build-title" className="head__title">{L(C.build.title)}</h2>
        </header>
        <ul className="caps">
          {C.build.items.map((b, i) => (
            <li className="cap" key={i}>
              <span className="cap__icon"><Glyph name={b.icon} /></span>
              <h3>{L(b.title)}</h3>
              <p>{L(b.text)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Process() {
  const L = useT()
  return (
    <section className="section process" id="approach" aria-labelledby="approach-title">
      <div className="wrap">
        <header className="head">
          <p className="eyebrow">{L(C.process.eyebrow)}</p>
          <h2 id="approach-title" className="head__title">{L(C.process.title)}</h2>
        </header>
        <ol className="steps">
          {C.process.steps.map((s, i) => (
            <li className="step" key={i}>
              <span className="step__head">
                <span className="step__no" dir="ltr">{i + 1}</span>
                <Glyph name={s.icon} />
              </span>
              <h3>{L(s.title)}</h3>
              <p>{L(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────────────── */

function CopyAddress({ email }: { email: string }) {
  const L = useT()
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      /* Clipboard blocked: the address is on screen and selectable. */
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button type="button" className={`btn btn--quiet copy ${copied ? 'is-copied' : ''}`} onClick={copy}>
      <span className="copy__icons" aria-hidden="true">
        <Copy className="copy__a" weight="bold" />
        <Check className="copy__b" weight="bold" />
      </span>
      <span aria-live="polite">{L(copied ? C.contact.copied : C.contact.copy)}</span>
    </button>
  )
}

const timeIn = (lang: string) =>
  new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SY-u-nu-latn' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Damascus',
  }).format(new Date())

function LocalTime() {
  const { lang } = useLang()
  const [now, setNow] = useState(() => timeIn(lang))
  useEffect(() => {
    setNow(timeIn(lang))
    const id = window.setInterval(() => setNow(timeIn(lang)), 30_000)
    return () => window.clearInterval(id)
  }, [lang])
  return <time dir="ltr">{now}</time>
}

function Contact() {
  const L = useT()
  const { content } = useLang()
  const email = content.contact.email
  const c = C.contact
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact__inner">
        <p className="eyebrow">{L(c.eyebrow)}</p>
        <h2 id="contact-title" className="contact__title" data-split>{L(c.title)}</h2>
        <p className="contact__lede">{L(c.lede)}</p>
        <a className="contact__email" href={`mailto:${email}`} dir="ltr">{email}</a>
        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${email}`}>
            <EnvelopeSimple className="btn__icon" weight="bold" aria-hidden="true" />{L(c.email)}
          </a>
          <CopyAddress email={email} />
          <a className="btn btn--quiet" href={content.contact.github} target="_blank" rel="noopener noreferrer">
            <GithubLogo className="btn__icon" weight="bold" aria-hidden="true" />GitHub
          </a>
        </div>
        <p className="contact__meta">
          <span><MapPin weight="duotone" aria-hidden="true" />{L(c.place)}</span>
          <span><Clock weight="duotone" aria-hidden="true" /><LocalTime /> {L(c.time)}</span>
        </p>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function StoryHome() {
  const { lang, content } = useLang()
  const root = useRef<HTMLDivElement>(null)
  useStoryMotion(root, lang)
  return (
    <div className="home" ref={root}>
      <a className="skip-link" href="#main">{content.ui.skipLink}</a>
      <SiteHeader page="home" />
      {/* Remount on language change: SplitText owns the heading text nodes. */}
      <main id="main" key={lang}>
        <Hero />
        <Flagship />
        <More />
        <Landings />
        <Story />
        <Build />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
