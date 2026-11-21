import { lazy, Suspense } from 'react'
import App from './App'

const Directory = lazy(() => import('./portfolio/Projects').then(m => ({ default: m.ProjectsDirectory })))
const Case = lazy(() => import('./portfolio/Projects').then(m => ({ default: m.ProjectCase })))

export default function Router() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return <App />
  return <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading" />}>
    {path === '/projects' ? <Directory /> : <Case id={path.startsWith('/projects/') ? path.slice(10) : '__not-found'} />}
  </Suspense>
}
