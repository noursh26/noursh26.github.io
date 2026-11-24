import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight, ArrowDown } from '@phosphor-icons/react'
import { useLang } from '../i18n'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { categories, projects, projectHref, screenshots } from './data'
import type { Project } from './types'
import { getShot, Handset, label, tintProps, tintStyle, Window } from './frames'
import type { Lang } from './frames'
import { stories } from './directory.config'
import { useDirectoryMotion } from './useDirectoryMotion'
import './projects.css'
import './directory.css'

type T = { ar: string; en: string }
const t = (en: string, ar: string): T => ({ en, ar })

const copy = {
  eyebrow: t('All projects', 'كل المشاريع'),
  title: t('Every product, told as a story.', 'كل منتج، يُروى كقصة.'),
  lede: t(
    'Ordered the way I would show you in person: the biggest first, then the products, the brand sites, and what else I have built. Every screen is a real capture with demonstration data.',
    'مرتبة كما أعرضها عليك وجهاً لوجه: الأكبر أولاً، ثم المنتجات، ثم المواقع التعريفية، ثم ما بنيته أيضاً. كل شاشة لقطة حقيقية ببيانات تجريبية.',
  ),
  begin: t('Start with the flagship', 'ابدأ بالمشروع الأكبر'),
  chapters: {
    flagship: t('Flagship', 'الأكبر'),
    featured: t('Products', 'المنتجات'),
    landing: t('Landing pages', 'صفحات الهبوط'),
    more: t('Also built', 'أعمال أخرى'),
  },
  flagEyebrow: t('Flagship · my biggest project', 'المشروع الأكبر'),
  productsTitle: t('Products people work in every day.', 'منتجات يعمل الناس داخلها كل يوم.'),
  productsLede: t(
    'Scroll through each one: the screens change as you read, the way the product is actually used.',
    'مرّر داخل كل منتج: تتبدل الشاشات وأنت تقرأ، بالترتيب الذي يُستخدم به فعلاً.',
  ),
  landingsTitle: t('Brand sites, each with its own pace.', 'مواقع تعريفية، لكل منها إيقاعها.'),
  landingsLede: t('Designed and built from scratch, one story per brand.', 'مصممة ومبنية من الصفر، لكل علامة قصتها.'),
  moreTitle: t('Also built.', 'وبنيت أيضاً.'),
  moreLede: t('Systems and side projects behind the main work.', 'أنظمة ومشاريع جانبية خلف العمل الرئيسي.'),
  open: t('Case study', 'تفاصيل المشروع'),
  visit: t('See the site', 'شاهد الموقع'),
  built: t('Built with', 'التقنيات'),
  inProgress: t('In progress · side project', 'قيد التنفيذ · مشروع جانبي'),
  dark: t('Dark mode', 'الوضع الليلي'),
  demo: t('Actual interface · demo data', 'واجهة فعلية · بيانات تجريبية'),
  screens: t('screens', 'شاشة'),
}

const kindOf = (p: Project) => categories.find((c) => c.id === p.category)!.label
const countOf = (id: string) => screenshots.filter((s) => s.project === id).length

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Nour Aldeen Shehadea`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

/* ── Devices with several screens stacked; motion reveals them in turn ── */

function Screens({ id, names, lang, lazy = true }: { id: string; names: string[]; lang: Lang; lazy?: boolean }) {
  return (
    <>
      {names.map((n, i) => {
        const s = getShot(id, n)
        if (!s) return null
        return (
          <img
            key={n}
            className={`dscreen ${i === 0 ? 'is-first' : ''}`}
            src={s.file}
            alt={i === 0 ? label(s, lang) : ''}
            width={s.width}
            height={s.height}
            loading={lazy && i > 0 ? 'lazy' : 'eager'}
            decoding="async"
          />
        )
      })}
    </>
  )
}

function Stack({ stack, lang }: { stack: string[]; lang: Lang }) {
  return (
    <p className="stack">
      <span>{copy.built[lang]}</span> <bdi dir="ltr">{stack.slice(0, 5).join(' · ')}</bdi>
    </p>
  )
}

function OpenLink({ p, lang, className = 'dlink' }: { p: Project; lang: Lang; className?: string }) {
  return (
    <a className={className} href={projectHref(p.id)}>
      {copy.open[lang]}
      <span className="sr-only">: {p.name}</span>
      <ArrowUpRight className="btn__icon flip-rtl" weight="bold" aria-hidden="true" />
    </a>
  )
}

/* ── 1. Flagship: the browser starts filling the screen and settles into frame ── */

function Flagship({ p, lang }: { p: Project; lang: Lang }) {
  const s = stories[p.id]
  return (
    <section className="dflag" id="flagship" data-chapter="flagship" {...tintProps(p)} aria-labelledby="dflag-title">
      <div className="dflag__sticky">
        <header className="wrap dflag__head">
          <p className="eyebrow">{copy.flagEyebrow[lang]}</p>
          <h2 id="dflag-title" className="dflag__name">
            {lang === 'ar' ? 'المصطفى' : 'Almostfa'}
            {lang === 'en' && <span lang="ar" dir="rtl">المصطفى</span>}
          </h2>
          <p className="dflag__headline">{p.headline[lang]}</p>
        </header>
        <div className="dflag__stage">
          <Window host={s.host} className="dflag__desk">
            <Screens id={p.id} names={[s.desk[0]]} lang={lang} lazy={false} />
          </Window>
          <Handset className="dflag__phone dflag__phone--a">
            <Screens id={p.id} names={[s.phone[1]]} lang={lang} />
          </Handset>
          <Handset className="dflag__phone dflag__phone--b">
            <Screens id={p.id} names={[s.phone[0]]} lang={lang} />
          </Handset>
          <Handset className="dflag__phone dflag__phone--c">
            <Screens id={p.id} names={[s.phone[2]]} lang={lang} />
          </Handset>
        </div>
        <div className="wrap dflag__foot">
          <p className="dflag__summary">{p.summary[lang]}</p>
          <ul className="dflag__features">
            {p.features.slice(0, 4).map((f) => <li key={f.en}>{f[lang]}</li>)}
          </ul>
          <div className="dflag__actions">
            <a className="btn btn--primary" href={projectHref(p.id)}>
              {copy.open[lang]} <ArrowUpRight className="btn__icon flip-rtl" weight="bold" aria-hidden="true" />
            </a>
            <Stack stack={p.stack} lang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 2. Products: pinned while three screens play and the features light up in step ── */

function Chapter({ p, lang, index }: { p: Project; lang: Lang; index: number }) {
  const s = stories[p.id]
  const phoneOnly = s.desk.length === 0
  const steps = phoneOnly ? s.phone : s.desk
  return (
    <article
      className={`pchap ${phoneOnly ? 'pchap--phone' : ''} ${index % 2 ? 'is-flipped' : ''}`}
      data-chapter="featured"
      {...tintProps(p)}
      aria-labelledby={`pchap-${p.id}`}
    >
      <div className="pchap__sticky">
        <div className="pchap__card">
          <div className="pchap__copy">
            <p className="pchap__kind">{kindOf(p)[lang]}</p>
            <h3 id={`pchap-${p.id}`} className="pchap__name"><bdi>{p.name}</bdi></h3>
            <p className="pchap__headline">{p.headline[lang]}</p>
            <p className="pchap__summary">{p.summary[lang]}</p>
            <ol className="pchap__steps">
              {steps.map((n, i) => (
                <li key={n} className={i === 0 ? 'is-on' : ''}>
                  <span className="pchap__bar" aria-hidden="true"><i /></span>
                  <span>{p.features[i]?.[lang] || label(getShot(p.id, n), lang)}</span>
                </li>
              ))}
            </ol>
            <Stack stack={p.stack} lang={lang} />
            <OpenLink p={p} lang={lang} />
          </div>
          <div className="pchap__stage" aria-hidden="true">
            {!phoneOnly && (
              <Window host={s.host} className="pchap__desk">
                <Screens id={p.id} names={s.desk} lang={lang} />
              </Window>
            )}
            <Handset className="pchap__phone">
              <Screens id={p.id} names={s.phone} lang={lang} />
            </Handset>
            {phoneOnly && (
              <>
                {(s.side || []).map((n, i) => (
                  <Handset key={n} className={`pchap__phone pchap__phone--side pchap__phone--${i ? 'l' : 'r'}`}>
                    <Screens id={p.id} names={[n]} lang={lang} />
                  </Handset>
                ))}
              </>
            )}
            <p className="pchap__caption">
              {steps.map((n, i) => (
                <span key={n} className={i === 0 ? 'is-on' : ''}>
                  <b dir="ltr">{String(i + 1).padStart(2, '0')}</b> {label(getShot(p.id, n), lang)}
                </span>
              ))}
            </p>
          </div>
          <span className="pchap__veil" aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}

/* ── 3. Landing pages: cards that stack as you scroll ── */

function Landing({ p, lang, i }: { p: Project; lang: Lang; i: number }) {
  const s = stories[p.id]
  const d = getShot(p.id, s.desk[0])
  const m = getShot(p.id, s.phone[0])
  return (
    <li className="lcard" {...tintProps(p, { '--i': i })}>
      <a className="lcard__inner" href={projectHref(p.id)}>
        <div className="lcard__meta">
          <h3><bdi>{p.name}</bdi></h3>
          <p>{p.summary[lang]}</p>
          <span className="dlink">
            {copy.open[lang]} <ArrowUpRight className="btn__icon flip-rtl" weight="bold" aria-hidden="true" />
          </span>
        </div>
        <div className="lcard__media">
          {d && (
            <Window host={s.host} className="lcard__desk">
              <img src={d.file} alt={`${p.name} — ${label(d, lang)}`} width={d.width} height={d.height} loading="lazy" decoding="async" />
            </Window>
          )}
          {m && (
            <Handset className="lcard__phone">
              <img src={m.file} alt="" width={m.width} height={m.height} loading="lazy" decoding="async" />
            </Handset>
          )}
        </div>
        <span className="lcard__veil" aria-hidden="true" />
      </a>
    </li>
  )
}

/* ── 4. Also built: rows whose screens open as they arrive ── */

function Row({ p, lang }: { p: Project; lang: Lang }) {
  const s = stories[p.id]
  const d = getShot(p.id, s.desk[0])
  const wide = p.id === 'accountant'
  return (
    <li className={`mrow ${wide ? 'mrow--wide' : ''} ${p.theme === 'dark' ? 'mrow--dark' : ''}`} {...tintProps(p)}>
      <a className="mrow__inner" href={projectHref(p.id)}>
        <div className="mrow__copy">
          <p className="pchap__kind">
            {kindOf(p)[lang]}
            {p.status === 'in-progress' && <span className="pill pill--wip">{copy.inProgress[lang]}</span>}
            {p.theme === 'dark' && <span className="pill">{copy.dark[lang]}</span>}
          </p>
          <h3><bdi>{p.name}</bdi></h3>
          <p className="mrow__headline">{p.headline[lang]}</p>
          <p className="mrow__summary">{p.summary[lang]}</p>
          {wide && (
            <ul className="mrow__features">
              {p.features.slice(0, 4).map((f) => <li key={f.en}>{f[lang]}</li>)}
            </ul>
          )}
          <Stack stack={p.stack} lang={lang} />
          <span className="dlink">
            {copy.open[lang]} <span className="dlink__count">· {countOf(p.id)} {copy.screens[lang]}</span>
            <ArrowUpRight className="btn__icon flip-rtl" weight="bold" aria-hidden="true" />
          </span>
        </div>
        {d && (
          <div className="mrow__media">
            <Window host={s.host}>
              <img src={d.file} alt={`${p.name} — ${label(d, lang)}`} width={d.width} height={d.height} loading="lazy" decoding="async" />
            </Window>
          </div>
        )}
      </a>
    </li>
  )
}

/* ── Page ── */

export function ProjectsDirectory() {
  const { lang } = useLang()
  const root = useRef<HTMLDivElement>(null)
  useDirectoryMotion(root, lang)
  usePageMeta(
    lang === 'ar' ? 'المشاريع' : 'Projects',
    lang === 'ar'
      ? 'مشاريع نور الدين شحادة مرتبة حسب الأهمية: المصطفى أولاً، ثم المنتجات والمواقع التعريفية، بشاشات فعلية ببيانات تجريبية.'
      : 'Nour Aldeen’s projects in order of importance: Almostfa first, then products and brand sites, with actual screens and demo data.',
  )
  const by = (tier: Project['tier']) => projects.filter((p) => p.tier === tier)
  const flagship = by('flagship')[0]
  const featured = by('featured')
  const landings = by('landing')
  const more = by('more')
  const chapters = [
    { id: 'flagship', n: 1 },
    { id: 'featured', n: featured.length },
    { id: 'landing', n: landings.length },
    { id: 'more', n: more.length },
  ] as const
  const anchor = { flagship: 'flagship', featured: 'products', landing: 'landings', more: 'more' }

  return (
    <div className="projects-site dir" ref={root}>
      <a className="skip-link" href="#projects-main">{lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
      <SiteHeader page="projects" />
      <nav className="dir-bar" aria-label={lang === 'ar' ? 'فصول المشاريع' : 'Project chapters'}>
        <strong>{copy.eyebrow[lang]}</strong>
        <ol>
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${anchor[c.id]}`} data-chip={c.id}>
                {copy.chapters[c.id][lang]} <span dir="ltr">{c.n}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <main id="projects-main" key={lang}>
        <section className="wrap dir-intro">
          <p className="eyebrow" data-fade>{copy.eyebrow[lang]}</p>
          <h1 data-split>{copy.title[lang]}</h1>
          <p className="dir-intro__lede" data-fade>{copy.lede[lang]}</p>
          <a className="btn btn--quiet" href="#flagship" data-fade>
            {copy.begin[lang]} <ArrowDown className="btn__icon" weight="bold" aria-hidden="true" />
          </a>
        </section>

        {flagship && <Flagship p={flagship} lang={lang} />}

        <section className="dir-chapter" id="products" aria-labelledby="products-title">
          <header className="wrap head">
            <p className="eyebrow">{copy.chapters.featured[lang]}</p>
            <h2 id="products-title" className="head__title" data-split>{copy.productsTitle[lang]}</h2>
            <p className="head__lede">{copy.productsLede[lang]}</p>
          </header>
          <div className="pchaps">
            {featured.map((p, i) => <Chapter key={p.id} p={p} lang={lang} index={i} />)}
          </div>
        </section>

        <section className="dir-chapter" id="landings" data-chapter="landing" aria-labelledby="landings-title">
          <header className="wrap head">
            <p className="eyebrow">{copy.chapters.landing[lang]}</p>
            <h2 id="landings-title" className="head__title" data-split>{copy.landingsTitle[lang]}</h2>
            <p className="head__lede">{copy.landingsLede[lang]}</p>
          </header>
          <ol className="wrap lstack">
            {landings.map((p, i) => <Landing key={p.id} p={p} lang={lang} i={i} />)}
          </ol>
        </section>

        <section className="dir-chapter" id="more" data-chapter="more" aria-labelledby="more-title">
          <header className="wrap head">
            <p className="eyebrow">{copy.chapters.more[lang]}</p>
            <h2 id="more-title" className="head__title" data-split>{copy.moreTitle[lang]}</h2>
            <p className="head__lede">{copy.moreLede[lang]}</p>
          </header>
          <ol className="wrap mrows">
            {more.map((p) => <Row key={p.id} p={p} lang={lang} />)}
          </ol>
        </section>
      </main>
      <section className="project-cta">
        <div className="wrap project-cta__inner">
          <h2>{lang === 'ar' ? 'عندك فكرة تستحق البناء؟' : 'Have something to build?'}</h2>
          <a className="btn btn--primary" href="/#contact">{lang === 'ar' ? 'تواصل معي' : 'Get in touch'}</a>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
