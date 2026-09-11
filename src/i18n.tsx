import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollTrigger } from './lib/motion'
import * as en from './content'
import * as ar from './content.ar'

export type Lang = 'en' | 'ar'
export type Content = typeof en

const DICTS: Record<Lang, Content> = { en, ar: ar as Content }

type LangState = { lang: Lang; setLang: (l: Lang) => void; content: Content }

const LangCtx = createContext<LangState>({ lang: 'en', setLang: () => {}, content: en })

const stored = (): Lang | null => {
  try { const v = localStorage.getItem('lang'); return v === 'ar' || v === 'en' ? v : null } catch { return null }
}

/** Language lives here and nowhere else: document dir/lang, the dictionary the
 *  components read, and the preference persisted between visits. */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    stored() ?? (navigator.language?.startsWith('ar') ? 'ar' : 'en'))

  const setLang = (l: Lang) => {
    if (l === lang) return
    try {
      localStorage.setItem('lang', l)
      /* A reload is the honest switch: every GSAP pin, SplitText mask and
         Draggable dial re-measures against the new direction and copy instead
         of unmounting DOM it no longer owns. The scroll position and a flag to
         skip the door survive the reload so it lands where the reader was. */
      sessionStorage.setItem('np:instant', '1')
      sessionStorage.setItem('np:scrollY', String(window.scrollY))
      history.scrollRestoration = 'manual'
      window.location.reload()
      return
    } catch { /* private mode — fall through to the in-place switch */ }
    setLangState(l)
  }

  useEffect(() => {
    const c = DICTS[lang]
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = c.ui.docTitle
    /* Re-measure the pinned sections once the new direction and copy have
       painted — pin distances are viewport-based, so a plain refresh is all
       the layout needs. */
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [lang])

  const value = useMemo<LangState>(() => ({ lang, setLang, content: DICTS[lang] }), [lang])
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)
export const useContent = () => useContext(LangCtx).content
