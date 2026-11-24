import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowDown, Check } from '@phosphor-icons/react'
import { useLang } from '../i18n'
import { categories, projects, projectHref, projectShots, projectCover } from './data'
import type { Project, Shot, Tour } from './types'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { stories } from './directory.config'
import { getShot, Handset, label, tintProps, Window } from './frames'
import { tourOf } from './tours'
import { roleSets } from './roles'
import { useCaseMotion } from './useCaseMotion'
import './projects.css'
import './directory.css'
import './case.css'

function accentInk(hex: string) {
  const channels = hex
    .replace('#', '')
    .match(/.{2}/g)!
    .map((v) => {
      const n = parseInt(v, 16) / 255
      return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
    })
  const luminance =
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  return 1.05 / (luminance + 0.05) >= 4.5 ? '#ffffff' : '#000000'
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      className={`project-arrow ${back ? 'is-back' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12h16M14 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCta() {
  const { lang } = useLang()
  return (
    <section className="project-cta">
      <div className="wrap project-cta__inner">
        <h2>{lang === 'ar' ? 'عندك فكرة تستحق البناء؟' : 'Have something to build?'}</h2>
        <a className="btn btn--primary" href="/#contact">
          {lang === 'ar' ? 'تواصل معي' : 'Get in touch'}
        </a>
      </div>
    </section>
  )
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Nour Aldeen Shehadea`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
  }, [title, description])
}

function Gallery({ project, phoneOnly = false }: { project: Project; phoneOnly?: boolean }) {
  const { lang } = useLang()
  const all = projectShots(project.id).filter((s) => !phoneOnly || s.device === 'mobile')
  const [device, setDevice] = useState<'desktop' | 'mobile'>(phoneOnly ? 'mobile' : 'desktop')
  const [index, setIndex] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const shots = all.filter((s) => s.device === device)
  const current = shots[index] || shots[0]
  const label = (s: Shot) => (lang === 'ar' ? s.label : s.labelEn)
  const step = (direction: number) =>
    setIndex((i) => (i + direction + shots.length) % shots.length)
  const open = () => {
    trigger.current = document.activeElement as HTMLElement
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    dialog.current?.close()
    document.body.style.overflow = ''
    trigger.current?.focus()
  }
  useEffect(
    () => () => {
      document.body.style.overflow = ''
    },
    [],
  )
  return (
    <section className="case-gallery" id="screens">
      <div className="case-gallery__heading">
        <div>
          <h2>{lang === 'ar' ? 'انظر عن قرب.' : 'Look closer.'}</h2>
          <p>
            {lang === 'ar'
              ? 'اختر أي شاشة وافتحها بحجمها الكامل. كلها واجهات فعلية ببيانات تجريبية.'
              : 'Pick any screen and open it full size. All are actual interfaces with demonstration data.'}
          </p>
        </div>
        <div
          className="case-gallery__tabs"
          role="tablist"
          aria-label={lang === 'ar' ? 'نوع الجهاز' : 'Device type'}
        >
          {(phoneOnly ? (['mobile'] as const) : (['desktop', 'mobile'] as const)).map((d) => (
            <button
              id={`tab-${d}`}
              key={d}
              role="tab"
              aria-selected={device === d}
              aria-controls="gallery-panel"
              tabIndex={device === d ? 0 : -1}
              onClick={() => {
                setDevice(d)
                setIndex(0)
              }}
              onKeyDown={(e) => {
                if (
                  ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)
                ) {
                  e.preventDefault()
                  const next =
                    e.key === 'Home'
                      ? 'desktop'
                      : e.key === 'End'
                        ? 'mobile'
                        : d === 'desktop'
                          ? 'mobile'
                          : 'desktop'
                  setDevice(next)
                  setIndex(0)
                  document.getElementById(`tab-${next}`)?.focus()
                }
              }}
            >
              <span>
                {d === 'desktop'
                  ? lang === 'ar'
                    ? 'الكمبيوتر'
                    : 'Desktop'
                  : lang === 'ar'
                    ? 'الجوال'
                    : 'Mobile'}
              </span>
              <span>{all.filter((s) => s.device === d).length}</span>
            </button>
          ))}
        </div>
      </div>
      {current && (
        <div
          role="tabpanel"
          id="gallery-panel"
          aria-labelledby={`tab-${device}`}
          className={`case-gallery__panel is-${device}`}
        >
          <div className="case-gallery__stage">
            <button
              className="gallery-step is-prev"
              aria-label={lang === 'ar' ? 'الشاشة السابقة' : 'Previous screen'}
              onClick={() => step(-1)}
            >
              <Arrow back />
            </button>
            <button
              className="case-gallery__image"
              onClick={open}
              aria-label={`${lang === 'ar' ? 'تكبير' : 'Enlarge'} ${label(current)}`}
            >
              <img
                src={current.file}
                alt={label(current)}
                width={current.width}
                height={current.height}
                decoding="async"
              />
            </button>
            <button
              className="gallery-step is-next"
              aria-label={lang === 'ar' ? 'الشاشة التالية' : 'Next screen'}
              onClick={() => step(1)}
            >
              <Arrow />
            </button>
          </div>
          <div className="case-gallery__thumbnails">
            {shots.map((s, i) => (
              <button
                key={s.file}
                aria-label={label(s)}
                aria-pressed={index === i}
                onClick={() => setIndex(i)}
              >
                <img
                  src={s.thumbnail}
                  alt=""
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
          <div className="case-gallery__caption">
            <p aria-live="polite">
              <span dir="ltr">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(shots.length).padStart(2, '0')}
              </span>{' '}
              — {label(current)}
            </p>
            <button onClick={open}>
              {lang === 'ar' ? 'تكبير الشاشة' : 'Enlarge screen'}
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <dialog
        ref={dialog}
        className="screenshot-dialog"
        aria-label={lang === 'ar' ? 'معاينة الشاشة' : 'Screenshot viewer'}
        onClose={() => {
          document.body.style.overflow = ''
          trigger.current?.focus()
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault()
            step((e.key === 'ArrowRight') !== (lang === 'ar') ? 1 : -1)
          }
        }}
      >
        <div className="screenshot-dialog__bar">
          <p>{current && label(current)}</p>
          <button
            onClick={close}
            aria-label={lang === 'ar' ? 'إغلاق المعاينة' : 'Close viewer'}
            autoFocus
          >
            ×
          </button>
        </div>
        <div className="screenshot-dialog__body">
          <button
            onClick={() => step(-1)}
            aria-label={lang === 'ar' ? 'الشاشة السابقة' : 'Previous screen'}
          >
            <Arrow back />
          </button>
          {current && (
            <img
              src={current.file}
              alt={label(current)}
              width={current.width}
              height={current.height}
            />
          )}
          <button
            onClick={() => step(1)}
            aria-label={lang === 'ar' ? 'الشاشة التالية' : 'Next screen'}
          >
            <Arrow />
          </button>
        </div>
        <p className="screenshot-dialog__count" dir="ltr">
          {index + 1} / {shots.length}
        </p>
      </dialog>
    </section>
  )
}

type T = { ar: string; en: string }
const t = (en: string, ar: string): T => ({ en, ar })
const caseCopy = {
  skip: t('Skip to content', 'انتقل إلى المحتوى'),
  contents: t('Project contents', 'محتويات المشروع'),
  all: t('All projects', 'كل المشاريع'),
  overview: t('Overview', 'الفكرة'),
  tour: t('Tour', 'الجولة'),
  hood: t('Under the hood', 'من الداخل'),
  screens: t('Screens', 'الشاشات'),
  takeTour: t('Take the tour', 'ابدأ الجولة'),
  flagship: t('Flagship · my biggest project', 'المشروع الأكبر'),
  inProgress: t('In progress · side project', 'قيد التنفيذ · مشروع جانبي'),
  demo: t('Actual interface · demo data', 'واجهة فعلية · بيانات تجريبية'),
  problem: t('The problem', 'المشكلة'),
  answer: t('The answer', 'الحل'),
  day: t('How it is used', 'كيف يُستخدم'),
  tourTitle: t('A walk through every screen.', 'جولة في كل شاشة.'),
  tourLede: t(
    'Scroll slowly. Each screen comes up as you read what it does.',
    'مرّر على مهل. تظهر كل شاشة وأنت تقرأ ما تفعله.',
  ),
  hoodTitle: t('How it is built.', 'كيف بُني.'),
  railTitle: t('Every screen, desktop and phone.', 'كل الشاشات، على الكمبيوتر والجوال.'),
  next: t('Next project', 'المشروع التالي'),
  of: t('of', 'من'),
}

type Step = Tour['screens'][number]

/** Desktop and phone screens stacked in their frames; the motion hook shows them in turn. */
function TourStage({ project, steps }: { project: Project; steps: Step[] }) {
  const host = stories[project.id]?.host || project.id
  const hasDesk = steps.some((s) => s.desk)
  const img = (name: string | undefined, i: number, kind: string) => {
    const shot = name ? getShot(project.id, name) : undefined
    if (!shot) return null
    return (
      <img
        key={`${kind}-${i}`}
        className={`tshot ${i === 0 ? 'is-shown' : ''}`}
        data-step={i}
        src={shot.file}
        alt=""
        width={shot.width}
        height={shot.height}
        loading={i < 2 ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }
  return (
    <div className={`ctour__stage ${hasDesk ? '' : 'is-phones'}`} aria-hidden="true">
      <div className="ctour__devices">
        {hasDesk && <Window host={host} className="ctour__desk">{steps.map((s, i) => img(s.desk, i, 'd'))}</Window>}
        {steps.some((s) => s.phone) && (
          <Handset className="ctour__phone">{steps.map((s, i) => img(s.phone, i, 'p'))}</Handset>
        )}
      </div>
      <p className="ctour__count" dir="ltr">
        <b data-count>01</b> / {String(steps.length).padStart(2, '0')}
      </p>
    </div>
  )
}

function StepMedia({ project, step, lang }: { project: Project; step: Step; lang: 'ar' | 'en' }) {
  const d = step.desk ? getShot(project.id, step.desk) : undefined
  const m = step.phone ? getShot(project.id, step.phone) : undefined
  return (
    <div className={`tstep__media ${d ? '' : 'is-phone'}`}>
      {d && (
        <Window host={stories[project.id]?.host || project.id}>
          <img className="dscreen is-first" src={d.file} alt={label(d, lang)} width={d.width} height={d.height} loading="lazy" decoding="async" />
        </Window>
      )}
      {m && (
        <Handset className="tstep__phone">
          <img src={m.file} alt={d ? '' : label(m, lang)} width={m.width} height={m.height} loading="lazy" decoding="async" />
        </Handset>
      )}
    </div>
  )
}

export function ProjectCase({ id }: { id: string }) {
  const { lang } = useLang()
  const project = projects.find((p) => p.id === id)
  const scope = useRef<HTMLDivElement>(null)
  usePageMeta(
    project?.name || (lang === 'ar' ? 'المشروع غير موجود' : 'Project not found'),
    project?.summary[lang] || '',
  )
  useCaseMotion(scope, lang)
  if (!project)
    return (
      <div className="projects-site">
        <SiteHeader page="case" />
        <main className="project-not-found">
          <h1>{lang === 'ar' ? 'المشروع غير موجود.' : 'Project not found.'}</h1>
          <a href="/projects/">
            {lang === 'ar' ? 'تصفح كل المشاريع' : 'Browse all projects'}
            <Arrow />
          </a>
        </main>
        <ProjectCta />
        <SiteFooter />
      </div>
    )

  const tour = tourOf(project)
  const steps = tour.screens
  const shots = projectShots(id)
  const desk = steps.every((s) => !s.desk) ? undefined : projectCover(project)
  const phone = projectCover(project, 'mobile')
  const host = stories[id]?.host || id
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const nextDesk = projectCover(next)
  const nextPhone = projectCover(next, 'mobile')
  const kind = categories.find((c) => c.id === project.category)?.label
  const eyebrow =
    project.tier === 'flagship' ? caseCopy.flagship[lang] : kind?.[lang]
  const roles = roleSets[id]
  const phoneOnly = steps.every((s) => !s.desk)
  const flankName = project.tier === 'flagship' ? stories[id]?.phone.find((n) => n !== phone?.file.match(/mobile-\d+/)?.[0]) : undefined
  const flankPhone = flankName ? getShot(id, flankName) : undefined
  const rows = [shots.filter((s) => s.device === 'desktop' && !phoneOnly), shots.filter((s) => s.device === 'mobile')].filter((r) => r.length >= 4)

  return (
    <div
      ref={scope}
      className={`projects-site case-page case ${project.theme === 'dark' ? 'case-page--dark' : ''} case--${project.tier}`}
      style={
        {
          '--project-bg': project.palette.background,
          '--project-fg': project.palette.foreground,
          '--project-accent': project.palette.accent,
          '--accent-ink': accentInk(project.palette.accent),
        } as CSSProperties
      }
    >
      <a className="skip-link" href="#case-main">{caseCopy.skip[lang]}</a>
      <SiteHeader page="case" />
      <nav className="case-nav" aria-label={caseCopy.contents[lang]}>
        <strong><bdi>{project.name}</bdi></strong>
        <div>
          <a href="#overview" data-nav="overview">{caseCopy.overview[lang]}</a>
          <a href="#tour" data-nav="tour">{caseCopy.tour[lang]}</a>
          <a href="#details" data-nav="details">{caseCopy.hood[lang]}</a>
          <a href="#screens" data-nav="screens">{caseCopy.screens[lang]}</a>
        </div>
      </nav>
      <main id="case-main" key={lang}>
        {/* 1. Hero: the product in its own colours; the window opens as you scroll. */}
        <section className="chero" {...tintProps(project)}>
          <div className="chero__copy">
            <a className="chero__back" href="/projects/" data-rise>
              <Arrow back />
              {caseCopy.all[lang]}
            </a>
            <p className="chero__eyebrow" data-rise>
              <bdi className="chero__name">{project.name}</bdi>
              {eyebrow && <span>{eyebrow}</span>}
              {project.status === 'in-progress' && <span className="case-status">{caseCopy.inProgress[lang]}</span>}
            </p>
            <h1 data-split>{project.headline[lang]}</h1>
            <p className="chero__lede" data-rise>{project.summary[lang]}</p>
            <div className="chero__actions" data-rise>
              <a className="chero__cta" href="#tour">
                {caseCopy.takeTour[lang]}
                <ArrowDown size={16} weight="bold" />
              </a>
              <p className="chero__stack" dir="ltr">{project.stack.slice(0, 4).join(' · ')}</p>
            </div>
          </div>
          <div className={`chero__stage ${desk ? '' : 'is-phones'}`}>
            {desk && (
              <Window host={host} className="chero__desk">
                <img
                  className="dscreen is-first"
                  src={desk.file}
                  alt={`${project.name}, ${label(desk, lang)}`}
                  width={desk.width}
                  height={desk.height}
                  fetchPriority="high"
                />
              </Window>
            )}
            {flankPhone && (
              <Handset className="chero__phone chero__phone--start">
                <img src={flankPhone.file} alt="" width={flankPhone.width} height={flankPhone.height} />
              </Handset>
            )}
            {phone && (
              <Handset className="chero__phone">
                <img src={phone.file} alt={desk ? '' : `${project.name}, ${label(phone, lang)}`} width={phone.width} height={phone.height} />
              </Handset>
            )}
            <p className="chero__note">{caseCopy.demo[lang]}</p>
          </div>
        </section>

        {/* 2. What it is, in a few facts and one statement that reads itself in. */}
        <section className="cintro" id="overview">
          {tour.facts.length > 0 && (
            <ul className="cfacts">
              {tour.facts.map((f) => (
                <li key={f.label.en}>
                  <b dir="auto">{f.value}</b>
                  <span>{f.label[lang]}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="cintro__kicker">{caseCopy.problem[lang]}</p>
          <p className="cintro__statement" data-read>{project.problem[lang]}</p>
          <div className="cintro__cols">
            <div data-rise-scroll>
              <p className="cintro__kicker">{caseCopy.answer[lang]}</p>
              <p className="cintro__body">{tour.intro[lang]}</p>
              <p className="cintro__body">{project.solution[lang]}</p>
            </div>
            <div data-rise-scroll>
              <p className="cintro__kicker">{caseCopy.day[lang]}</p>
              <ol className="cflow">
                {project.flow.map((f, i) => (
                  <li key={f.en}>
                    <span dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                    <p>{f[lang]}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {roles && (
          <section className="croles" aria-labelledby="croles-title">
            <header className="croles__head">
              <h2 id="croles-title" data-split>{roles.title[lang]}</h2>
              <p data-rise-scroll>{roles.lede[lang]}</p>
            </header>
            <ol className="croles__list">
              {roles.roles.map((r) => {
                const shot = getShot(id, r.phone)
                return (
                  <li key={r.phone} className="crole">
                    <Handset className="crole__phone">
                      {shot && <img src={shot.file} alt={label(shot, lang)} width={shot.width} height={shot.height} loading="lazy" decoding="async" />}
                    </Handset>
                    <div className="crole__copy">
                      <p className="crole__who">{r.who[lang]}</p>
                      <h3>{r.title[lang]}</h3>
                      <p>{r.body[lang]}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )}

        {/* 3. The tour: one step per screen, the devices stay put and change with you. */}
        <section className="ctour" id="tour" aria-labelledby="ctour-title">
          <header className="ctour__head">
            <h2 id="ctour-title" data-split>{caseCopy.tourTitle[lang]}</h2>
            <p data-rise-scroll>{caseCopy.tourLede[lang]}</p>
          </header>
          <div className="ctour__body">
            <TourStage project={project} steps={steps} />
            <ol className="ctour__steps">
              {steps.map((s, i) => (
                <li key={i} className={`tstep ${i === 0 ? 'is-on' : ''}`} data-tstep={i}>
                  <StepMedia project={project} step={s} lang={lang} />
                  <div className="tstep__copy">
                    <p className="tstep__kicker">
                      <span dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                      {s.kicker[lang]}
                    </p>
                    <h3>{s.title[lang]}</h3>
                    <p className="tstep__body">{s.body[lang]}</p>
                    {s.points.length > 0 && (
                      <ul className="tstep__points">
                        {s.points.map((pt) => (
                          <li key={pt.en}>
                            <Check size={16} weight="bold" aria-hidden="true" />
                            <span>{pt[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Every screen at once, drifting past as you scroll. */}
        {rows.length > 0 && <section className="crail" aria-label={caseCopy.railTitle[lang]}>
          <h2 className="crail__title" data-split>{caseCopy.railTitle[lang]}</h2>
          {rows.map((row, r) => (
            <div key={r} className={`crail__row ${row[0].device === 'mobile' ? 'is-phones' : ''}`} data-row={r} aria-hidden="true">
              {[...row, ...row.slice(0, 3)].map((s, i) => (
                <img key={`${s.file}-${i}`} src={s.thumbnail} alt="" width={s.width} height={s.height} loading="lazy" decoding="async" />
              ))}
            </div>
          ))}
        </section>}

        {/* 5. Under the hood. */}
        <section className="chood" id="details" aria-labelledby="chood-title">
          <div className="chood__intro">
            <h2 id="chood-title" data-split>{caseCopy.hoodTitle[lang]}</h2>
            <p>{project.challenge[lang]}</p>
            <div className="case-stack" dir="ltr">
              {project.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
          <ol className="chood__notes">
            {tour.engineering.map((n, i) => (
              <li key={n.title.en} data-note>
                <span dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                <h3>{n.title[lang]}</h3>
                <p>{n.body[lang]}</p>
              </li>
            ))}
          </ol>
        </section>

        <Gallery project={project} phoneOnly={phoneOnly} />

        {/* 6. The next story, in its own colours. */}
        <nav className="cnext" aria-label={caseCopy.next[lang]}>
          <a href={projectHref(next.id)} className="cnext__card" {...tintProps(next)}>
            <span className="cnext__copy">
              <span className="cnext__label">{caseCopy.next[lang]}</span>
              <strong><bdi>{next.name}</bdi></strong>
              <span className="cnext__headline">{next.headline[lang]}</span>
              <span className="cnext__go"><Arrow /></span>
            </span>
            <span className="cnext__media" aria-hidden="true">
              {nextDesk ? (
                <Window host={stories[next.id]?.host || next.id}>
                  <img className="dscreen is-first" src={nextDesk.thumbnail} alt="" width={nextDesk.width} height={nextDesk.height} loading="lazy" />
                </Window>
              ) : nextPhone ? (
                <Handset>
                  <img src={nextPhone.thumbnail} alt="" width={nextPhone.width} height={nextPhone.height} loading="lazy" />
                </Handset>
              ) : null}
            </span>
          </a>
          <a className="cnext__all" href="/projects/">
            <Arrow back />
            {caseCopy.all[lang]}
          </a>
        </nav>
      </main>
      <ProjectCta />
      <SiteFooter />
    </div>
  )
}
