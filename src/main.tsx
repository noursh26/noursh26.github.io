import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import { LangProvider } from './i18n'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/geist-mono/wght.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css'
import './styles.css'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <Router />
    </LangProvider>
  </StrictMode>,
)
