import type { CSSProperties, ReactNode } from 'react'

export const shot = (project: string, name: string) => `/assets/projects/${project}/${name}.webp`

type PhoneProps = {
  src?: string
  alt?: string
  eager?: boolean
  className?: string
  style?: CSSProperties
  /** Stacked screens for a device that changes what it shows. */
  children?: ReactNode
  /** Drawn above the screen but not clipped by it (callouts). */
  overlay?: ReactNode
}

/** A neutral phone: the bezel and corner radius scale with its own width (container units). */
export function Phone({ src, alt = '', eager, className = '', style, children, overlay }: PhoneProps) {
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="phone__body">
        <div className="phone__screen">
          {children ?? (
            <img
              src={src}
              alt={alt}
              width={390}
              height={844}
              loading={eager ? 'eager' : 'lazy'}
              fetchPriority={eager ? 'high' : undefined}
              decoding="async"
            />
          )}
        </div>
        {overlay && <div className="phone__overlay">{overlay}</div>}
      </div>
    </div>
  )
}

type BrowserProps = { src: string; host: string; alt?: string; className?: string }

/** A quiet browser window: grey controls, the site's name in the address bar. */
export function Browser({ src, host, alt = '', className = '' }: BrowserProps) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots"><i /><i /><i /></span>
        <span className="browser__url" dir="ltr">{host}</span>
      </div>
      <img src={src} alt={alt} width={1440} height={1000} loading="lazy" decoding="async" />
    </div>
  )
}
