import rawProjects from './projects.json'
import rawScreenshots from './screenshots.compact.json'
import type { Category, Copy, Project, Shot } from './types'
import { stories } from './directory.config'

/* Screens that fail the showcase rules (docs/project-gallery/SHOWCASE_RULES.md)
   stay in the capture archive but are never shown anywhere on the site. */
type Curation = { exclude: { file: string; reason: string }[]; tier?: Project['tier'] }
const curation = import.meta.glob<Curation>('./curation/*.json', { eager: true, import: 'default' })
export const hidden = new Set(
  Object.entries(curation).flatMap(([path, c]) =>
    c.exclude.map((e) => `/assets/projects/${path.slice(11, -5)}/${e.file}.webp`),
  ),
)
export const screenshots = (rawScreenshots as Shot[]).filter((s) => !hidden.has(s.file))
const curated = new Map(Object.entries(curation).map(([path, c]) => [path.slice(11, -5), c]))

/* A product with no screen that passes the rules is not shown at all until it is
   recaptured; a product with too few screens for a chapter can be moved down a tier. */
export const projects = (rawProjects as Project[])
  .filter((p) => screenshots.some((s) => s.project === p.id))
  .map((p) => (curated.get(p.id)?.tier ? { ...p, tier: curated.get(p.id)!.tier! } : p))
export { projectHref } from './paths'
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

/* The hero screen: the first screen the directory story picks, which is always
   one that passes the showcase rules; otherwise the first shown screen. */
export const projectCover = (
  project: Project,
  device: 'desktop' | 'mobile' = 'desktop',
) => {
  const shots = projectShots(project.id).filter((s) => s.device === device)
  const pick = stories[project.id]?.[device === 'desktop' ? 'desk' : 'phone'][0]
  return shots.find((s) => pick && s.file.endsWith(`/${pick}.webp`)) || shots[0]
}
