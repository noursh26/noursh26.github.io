import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import * as en from './content'
import * as ar from './content.ar'

export type Lang = 'en' | 'ar'
export type Content = typeof en

const DICTS: Record<Lang, Content> = { en, ar }

type LangState = { lang: Lang; setLang: (l: Lang) => void; content: Content }

const LangCtx = createContext<LangState>({ lang: 'en', setLang: () => {}, content: en })

const stored = (): Lang | null => {
  try {
    const v = localStorage.getItem('lang')
    return v === 'ar' || v === 'en' ? v : null
  } catch {
    return null
  }
}

const applyDocument = (lang: Lang) => {
  const el = document.documentElement
  el.lang = lang
  el.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => unknown }

/** Language lives here only: document dir/lang, the dictionary, and the stored preference.
 *  Switching happens in place; where supported it cross-fades with a view transition. */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const l = stored() ?? (navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en')
    applyDocument(l)
    return l
  })

  const setLang = useCallback((l: Lang) => {
    try { localStorage.setItem('lang', l) } catch { /* private mode */ }
    const commit = () => flushSync(() => { applyDocument(l); setLangState(l) })
    const doc = document as ViewTransitionDoc
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (doc.startViewTransition && !reduce) doc.startViewTransition(commit)
    else commit()
  }, [])

  useLayoutEffect(() => {
    applyDocument(lang)
    if (window.location.pathname === '/') document.title = DICTS[lang].ui.docTitle
  }, [lang])

  const value = useMemo<LangState>(() => ({ lang, setLang, content: DICTS[lang] }), [lang, setLang])
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)
export const useContent = () => useContext(LangCtx).content
