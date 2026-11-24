// What the site actually shows, after the showcase rules (docs/project-gallery/SHOWCASE_RULES.md).
import fs from 'node:fs'
const dir = 'src/portfolio/curation'
export const hiddenScreens = new Set()
if (fs.existsSync(dir))
  for (const f of fs.readdirSync(dir))
    for (const e of JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8')).exclude)
      hiddenScreens.add(`/assets/projects/${f.slice(0, -5)}/${e.file}.webp`)
export const shownShots = (shots) => shots.filter((s) => !hiddenScreens.has(s.file))
export const shownProjects = (projects, shots) => {
  const shown = shownShots(shots)
  return projects.filter((p) => shown.some((s) => s.project === p.id))
}
