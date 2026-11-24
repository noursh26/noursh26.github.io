import { projectShots } from './data'
import type { Project, Tour } from './types'

/* One JSON file per product in ./tours. A product without one still gets a
   walk-through built from its screen labels and features. */
const files = import.meta.glob<Tour>('./tours/*.json', { eager: true, import: 'default' })
const byId = new Map(Object.entries(files).map(([path, tour]) => [path.slice(8, -5), tour]))

const num = (file: string) => file.match(/(desktop|mobile)-\d+/)![0]

export function tourOf(p: Project): Tour {
  const found = byId.get(p.id)
  if (found) return found
  const shots = projectShots(p.id)
  const desks = shots.filter((s) => s.device === 'desktop')
  const phones = shots.filter((s) => s.device === 'mobile')
  const lead = desks.length ? desks : phones
  return {
    facts: [],
    intro: p.solution,
    screens: lead.map((s, i) => {
      const phone = desks.length ? phones.find((m) => m.labelEn === s.labelEn) || phones[i] : s
      return {
        desk: desks.length ? num(s.file) : undefined,
        phone: phone ? num(phone.file) : undefined,
        kicker: { ar: p.name, en: p.name },
        title: { ar: s.label, en: s.labelEn },
        body: p.features[i] || p.summary,
        points: [],
      }
    }),
    engineering: [{ title: { ar: 'التحدي', en: 'The hard part' }, body: p.challenge }],
  }
}
