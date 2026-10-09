import rawProjects from './projects.json'
import rawScreenshots from './screenshots.compact.json'
import type { Category, Copy, Project, Shot } from './types'

export const projects = rawProjects as Project[]
export const screenshots = rawScreenshots as Shot[]
export const projectHref = (id: string) => `/projects/${id}/`
export const projectShots = (id: string) =>
  screenshots.filter((s) => s.project === id)
export const categories: { id: Category | 'all'; label: Copy }[] = [
  { id: 'all', label: { ar: 'الكل', en: 'All' } },
  { id: 'business', label: { ar: 'أنظمة الأعمال', en: 'Business systems' } },
  { id: 'ai', label: { ar: 'ذكاء اصطناعي', en: 'AI products' } },
  { id: 'mobile', label: { ar: 'تطبيقات الجوال', en: 'Mobile apps' } },
  { id: 'commerce', label: { ar: 'تجارة وحجوزات', en: 'Commerce & booking' } },
  { id: 'brand', label: { ar: 'مواقع وهوية', en: 'Brand websites' } },
  { id: 'developer', label: { ar: 'أدوات التطوير', en: 'Developer tools' } },
]

export const projectCover = (
  project: Project,
  device: 'desktop' | 'mobile' = 'desktop',
) => {
  const shots = projectShots(project.id).filter((s) => s.device === device)
  return (
    shots[
      (device === 'desktop'
        ? project.presentation.desktopCover
        : project.presentation.mobileCover) - 1
    ] || shots[0]
  )
}
