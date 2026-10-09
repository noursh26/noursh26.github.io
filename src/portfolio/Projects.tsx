import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useLang } from '../i18n'
import { categories, projects, projectHref, projectShots } from './data'
import type { Project, Shot } from './types'
import './projects.css'

function Arrow({ back = false }: { back?: boolean }) {
  return <svg className={`project-arrow ${back ? 'is-back' : ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Header() {
  const { lang, setLang } = useLang()
  return <header className="projects-header">
    <a href="/" aria-label={lang === 'ar' ? 'نور الدين — الرئيسية' : 'Nour Aldeen — home'}><img src="/assets/brand/lockup-en-reversed.png" alt="Nour Aldeen Shehadea" width="160" height="55" /></a>
    <nav aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}><a href="/">{lang === 'ar' ? 'الرئيسية' : 'Home'}</a><a href="/projects/" aria-current="page">{lang === 'ar' ? 'المشاريع' : 'Projects'}</a></nav>
    <button className="project-language" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} lang={lang === 'ar' ? 'en' : 'ar'}>{lang === 'ar' ? 'EN' : 'عربي'}</button>
  </header>
}

function Footer() {
  const { lang } = useLang()
  return <footer className="projects-footer"><div><h2>{lang === 'ar' ? 'عندك فكرة تستحق البناء؟' : 'An idea worth building?'}</h2><p>{lang === 'ar' ? 'لنحوّلها إلى منتج حقيقي معاً.' : 'Let’s turn it into a working product.'}</p></div><a href="/#invitation">{lang === 'ar' ? 'تواصل معي' : 'Start a conversation'}<Arrow /></a></footer>
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Nour Aldeen Shehadea`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

function ProjectPreview({ project, eager = false }: { project: Project; eager?: boolean }) {
  const { lang } = useLang()
  const shots = projectShots(project.id)
  const cover = shots.find(s => s.device === 'desktop') || shots[0]
  return <article className="project-preview" style={{ '--project-bg': project.palette.background, '--project-fg': project.palette.foreground, '--project-accent': project.palette.accent } as CSSProperties}>
    <a href={projectHref(project.id)} className="project-preview__link">
      <div className={`project-preview__media project-preview__media--${project.layout}`}>
        {cover && <img src={cover.file} alt={`${project.name} — ${lang === 'ar' ? cover.label : cover.labelEn}`} width={cover.width} height={cover.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />}
      </div>
      <div className="project-preview__copy"><h2 dir="auto">{project.name}</h2><p>{project.summary[lang]}</p><span className="project-preview__open">{lang === 'ar' ? 'تفاصيل المشروع' : 'Explore project'}<Arrow /></span></div>
    </a>
  </article>
}

export function ProjectsDirectory() {
  const { lang } = useLang()
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const term = query.trim().toLocaleLowerCase()
  const filtered = projects.filter(p => (category === 'all' || p.category === category) && `${p.name} ${p.summary.ar} ${p.summary.en} ${p.stack.join(' ')}`.toLocaleLowerCase().includes(term))
  usePageMeta(lang === 'ar' ? 'المشاريع' : 'Projects', lang === 'ar' ? 'مشاريع نور الدين شحادة: تفاصيل المنتجات، البنية التقنية، وشاشات فعلية ببيانات تجريبية.' : 'Nour Aldeen’s projects: product stories, architecture, and actual interface captures with demo data.')
  return <div className="projects-site"><a className="skip-link" href="#projects-main">{lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a><Header />
    <main id="projects-main"><section className="projects-intro"><h1>{lang === 'ar' ? <>منتجات لها <em>قصة.</em></> : <>Products with <em>a story.</em></>}</h1><p>{lang === 'ar' ? 'من أنظمة الأعمال إلى تطبيقات الحياة اليومية. استكشف الفكرة، التفاصيل، والشاشات الفعلية لكل مشروع.' : 'From business systems to everyday apps. Explore the thinking, the details, and the actual screens behind each project.'}</p></section>
      <section className="project-index" aria-label={lang === 'ar' ? 'معرض المشاريع' : 'Project directory'}><div className="project-index__tools"><label className="project-search"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" /></svg><span className="sr-only">{lang === 'ar' ? 'ابحث عن مشروع' : 'Search projects'}</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={lang === 'ar' ? 'ابحث عن مشروع' : 'Search projects'} /></label><div className="project-filters" aria-label={lang === 'ar' ? 'مجال المشروع' : 'Project category'}>{categories.map(c => <button key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{c.label[lang]}</button>)}</div></div>
        <p className="project-results" role="status" aria-live="polite">{lang === 'ar' ? `${filtered.length} مشروع` : `${filtered.length} projects`}</p>
        {filtered.length ? <div className="project-index__grid">{filtered.map((p, i) => <ProjectPreview key={p.id} project={p} eager={i < 2} />)}</div> : <div className="project-empty"><h2>{lang === 'ar' ? 'لا يوجد مشروع بهذا البحث.' : 'No projects match your search.'}</h2><button onClick={() => { setQuery(''); setCategory('all') }}>{lang === 'ar' ? 'عرض كل المشاريع' : 'Show all projects'}</button></div>}
      </section></main><Footer /></div>
}

function Gallery({ project }: { project: Project }) {
  const { lang } = useLang()
  const all = projectShots(project.id)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [index, setIndex] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const shots = all.filter(s => s.device === device)
  const current = shots[index] || shots[0]
  const label = (s: Shot) => lang === 'ar' ? s.label : s.labelEn
  const step = (direction: number) => setIndex(i => (i + direction + shots.length) % shots.length)
  const open = () => { dialog.current?.showModal(); document.body.style.overflow = 'hidden' }
  const close = () => { dialog.current?.close(); document.body.style.overflow = ''; trigger.current?.focus() }
  useEffect(() => () => { document.body.style.overflow = '' }, [])
  return <section className="case-gallery" id="screens"><div className="case-gallery__heading"><div><h2>{lang === 'ar' ? 'داخل المشروع.' : 'Inside the product.'}</h2><p>{lang === 'ar' ? 'شاشات فعلية ببيانات تجريبية.' : 'Actual interfaces. Demonstration data.'}</p></div><div className="case-gallery__tabs" role="tablist" aria-label={lang === 'ar' ? 'نوع الجهاز' : 'Device type'}>{(['desktop', 'mobile'] as const).map(d => <button id={`tab-${d}`} key={d} role="tab" aria-selected={device === d} aria-controls="gallery-panel" tabIndex={device === d ? 0 : -1} onClick={() => { setDevice(d); setIndex(0) }} onKeyDown={e => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = d === 'desktop' ? 'mobile' : 'desktop'; setDevice(next); setIndex(0); document.getElementById(`tab-${next}`)?.focus() } }}><span>{d === 'desktop' ? (lang === 'ar' ? 'الكمبيوتر' : 'Desktop') : (lang === 'ar' ? 'الجوال' : 'Mobile')}</span><span>{all.filter(s => s.device === d).length}</span></button>)}</div></div>
    {current && <div role="tabpanel" id="gallery-panel" aria-labelledby={`tab-${device}`} className={`case-gallery__panel is-${device}`}><div className="case-gallery__stage"><button className="gallery-step is-prev" aria-label={lang === 'ar' ? 'الشاشة السابقة' : 'Previous screen'} onClick={() => step(-1)}><Arrow back /></button><button className="case-gallery__image" ref={trigger} onClick={open} aria-label={`${lang === 'ar' ? 'تكبير' : 'Enlarge'} ${label(current)}`}><img src={current.file} alt={label(current)} width={current.width} height={current.height} decoding="async" /></button><button className="gallery-step is-next" aria-label={lang === 'ar' ? 'الشاشة التالية' : 'Next screen'} onClick={() => step(1)}><Arrow /></button></div><div className="case-gallery__thumbnails">{shots.map((s, i) => <button key={s.file} aria-label={label(s)} aria-pressed={index === i} onClick={() => setIndex(i)}><img src={s.thumbnail} alt="" width={s.width} height={s.height} loading="lazy" decoding="async" /></button>)}</div><div className="case-gallery__caption"><p aria-live="polite"><span dir="ltr">{String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}</span> — {label(current)}</p><button onClick={open}>{lang === 'ar' ? 'تكبير الشاشة' : 'Enlarge screen'}<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" stroke="currentColor" strokeWidth="1.5" /></svg></button></div></div>}
    <dialog ref={dialog} className="screenshot-dialog" aria-label={lang === 'ar' ? 'معاينة الشاشة' : 'Screenshot viewer'} onClose={() => { document.body.style.overflow = ''; trigger.current?.focus() }} onClick={e => { if (e.target === e.currentTarget) close() }} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1) } }}><div className="screenshot-dialog__bar"><p>{current && label(current)}</p><button onClick={close} aria-label={lang === 'ar' ? 'إغلاق المعاينة' : 'Close viewer'} autoFocus>×</button></div><div className="screenshot-dialog__body"><button onClick={() => step(-1)} aria-label={lang === 'ar' ? 'الشاشة السابقة' : 'Previous screen'}><Arrow back /></button>{current && <img src={current.file} alt={label(current)} width={current.width} height={current.height} />}<button onClick={() => step(1)} aria-label={lang === 'ar' ? 'الشاشة التالية' : 'Next screen'}><Arrow /></button></div><p className="screenshot-dialog__count">{index + 1} / {shots.length}</p></dialog>
  </section>
}

export function ProjectCase({ id }: { id: string }) {
  const { lang } = useLang()
  const project = projects.find(p => p.id === id)
  usePageMeta(project?.name || (lang === 'ar' ? 'المشروع غير موجود' : 'Project not found'), project?.summary[lang] || '')
  if (!project) return <div className="projects-site"><Header /><main className="project-not-found"><h1>{lang === 'ar' ? 'المشروع غير موجود.' : 'Project not found.'}</h1><a href="/projects/">{lang === 'ar' ? 'تصفح كل المشاريع' : 'Browse all projects'}<Arrow /></a></main><Footer /></div>
  const shots = projectShots(id)
  const desktop = shots.find(s => s.device === 'desktop')
  const mobile = shots.find(s => s.device === 'mobile')
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return <div className={`projects-site case-page case-page--${project.layout} case-page--${id}`} style={{ '--project-bg': project.palette.background, '--project-fg': project.palette.foreground, '--project-accent': project.palette.accent } as CSSProperties}><a className="skip-link" href="#case-main">{lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a><Header /><main id="case-main">
    <section className="case-hero"><div className="case-hero__copy"><a className="case-hero__back" href="/projects/"><Arrow back />{lang === 'ar' ? 'كل المشاريع' : 'All projects'}</a><h1>{project.headline[lang]}</h1><p>{project.summary[lang]}</p><a className="case-hero__cta" href="#screens">{lang === 'ar' ? 'استكشف الشاشات' : 'Explore the screens'}<Arrow /></a><p className="case-hero__stack" dir="ltr">{project.stack.slice(0, 3).join(' · ')}</p></div><div className="case-hero__media">{desktop && <img className="case-hero__desktop" src={desktop.file} alt={`${project.name} — ${lang === 'ar' ? desktop.label : desktop.labelEn}`} width={desktop.width} height={desktop.height} fetchPriority="high" />}{mobile && <img className="case-hero__mobile" src={mobile.file} alt={`${project.name} — ${lang === 'ar' ? mobile.label : mobile.labelEn}`} width={mobile.width} height={mobile.height} />}<p>{lang === 'ar' ? 'واجهة فعلية · بيانات تجريبية' : 'Actual interface · Demo data'}</p></div></section>
    <section className="case-overview"><div><span className="case-section-no">01</span><h2>{lang === 'ar' ? 'المشكلة التي يحلها.' : 'The problem it solves.'}</h2><p>{project.problem[lang]}</p><p>{project.solution[lang]}</p></div><div><span className="case-section-no">02</span><h2>{lang === 'ar' ? 'كيف تعمل التجربة.' : 'How the experience works.'}</h2><ol className="case-flow">{project.flow.map((step, i) => <li key={step.en}><span>{String(i + 1).padStart(2, '0')}</span><p>{step[lang]}</p></li>)}</ol></div></section>
    <Gallery project={project} />
    <section className="case-details"><div className="case-details__intro"><span className="case-section-no">03</span><h2>{lang === 'ar' ? 'التفاصيل التي تصنع الفرق.' : 'The details that matter.'}</h2><p>{project.challenge[lang]}</p></div><ul className="case-features">{project.features.map((f, i) => <li key={f.en}><span>{String(i + 1).padStart(2, '0')}</span><p>{f[lang]}</p></li>)}</ul></section>
    <section className="case-architecture"><h2>{lang === 'ar' ? 'بنية تستوعب التعقيد.' : 'Built to handle the complexity.'}</h2><div className="case-stack" dir="ltr">{project.stack.map(s => <span key={s}>{s}</span>)}</div><p>{lang === 'ar' ? 'تمت مراجعة وصف المشروع من مستودعاته. لقطات المعرض من الواجهة الأصلية ضمن بيئة عرض محلية.' : 'This project story was checked against its repositories. Gallery images show the original interfaces in a local demonstration environment.'}</p></section>
    <nav className="case-next" aria-label={lang === 'ar' ? 'المشاريع الأخرى' : 'More projects'}><a href="/projects/"><Arrow back />{lang === 'ar' ? 'كل المشاريع' : 'All projects'}</a><a href={projectHref(next.id)}><span>{lang === 'ar' ? 'المشروع التالي' : 'Next project'}<strong dir="auto">{next.name}</strong></span><Arrow /></a></nav>
  </main><Footer /></div>
}
