import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import { LangProvider } from './i18n'
import './styles.css'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <Router />
    </LangProvider>
  </StrictMode>,
)
