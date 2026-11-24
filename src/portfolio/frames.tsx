import type { CSSProperties, ReactNode } from 'react'
import { screenshots } from './data'
import type { Project, Shot } from './types'
import { stories } from './directory.config'

/* Shared by the directory and the case pages: device frames, screen lookup
   and the tint each product brings from its own screens. */

export type Lang = 'ar' | 'en'

const shotMap = new Map(screenshots.map((s) => [s.file, s]))
export const getShot = (id: string, name: string) => shotMap.get(`/assets/projects/${id}/${name}.webp`)
export const label = (s: Shot | undefined, lang: Lang) => (s ? (lang === 'ar' ? s.label : s.labelEn) : '')

export function luminance(hex: string) {
  const [r, g, b] = hex.replace('#', '').match(/.{2}/g)!.map((v) => {
    const n = parseInt(v, 16) / 255
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
  })
  return r * 0.2126 + g * 0.7152 + b * 0.0722
}

const colours = (p: Project) =>
  stories[p.id]?.tint || { bg: p.palette.background, fg: p.palette.foreground, accent: p.palette.accent }

/* A light product gets a deep version of its ink in dark mode; a dark product stays dark. */
export function tintStyle(p: Project): CSSProperties {
  const c = colours(p)
  const dark = luminance(c.bg) < 0.2
  return {
    '--tint': dark ? c.bg : `light-dark(${c.bg}, color-mix(in srgb, ${c.fg} 22%, #060607))`,
    '--ink': dark ? c.fg : `light-dark(${c.fg}, color-mix(in srgb, ${c.bg} 92%, #fff))`,
    '--hue': c.accent,
    colorScheme: dark ? 'dark' : undefined,
  } as CSSProperties
}

export function tintProps(p: Project, extra: Record<string, string | number> = {}) {
  return {
    style: { ...tintStyle(p), ...extra } as CSSProperties,
    'data-dark': luminance(colours(p).bg) < 0.2 ? '' : undefined,
  }
}

export function Window({ host, children, className = '' }: { host: string; children: ReactNode; className?: string }) {
  return (
    <div className={`browser dwindow ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots"><i /><i /><i /></span>
        <span className="browser__url" dir="ltr">{host}</span>
      </div>
      <div className="dwindow__screen">{children}</div>
    </div>
  )
}

export function Handset({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__body">
        <div className="phone__screen">{children}</div>
      </div>
    </div>
  )
}
