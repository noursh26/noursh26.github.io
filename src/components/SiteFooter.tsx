import { useLang } from '../i18n'
import { BrandMark, LangToggle } from './SiteHeader'

export function SiteFooter() {
  const { content } = useLang()
  const { ui, contact } = content
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="nav__brand footer__brand" href="/" aria-label={`${ui.name} — ${ui.home}`}>
          <BrandMark />
          <span>{ui.name}</span>
        </a>
        <nav className="footer__links" aria-label={ui.mainNav}>
          <a href="/projects/">{ui.projects}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.githubLabel}</a>
          <LangToggle />
        </nav>
        <p className="footer__legal">
          <span>{ui.copyright.replace('{year}', String(new Date().getFullYear()))}</span>
          <span>{ui.location}</span>
        </p>
      </div>
    </footer>
  )
}
