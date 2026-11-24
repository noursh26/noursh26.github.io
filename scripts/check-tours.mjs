// Case-page tours: every screen exists, every screenshot is explained, no filler words.
import fs from 'node:fs'
import assert from 'node:assert/strict'
const projects = JSON.parse(fs.readFileSync('src/portfolio/projects.json', 'utf8'))
const shots = JSON.parse(fs.readFileSync('src/portfolio/screenshots.json', 'utf8'))
const banned = /\b(seamless|robust|cutting-edge|empower|revolutioni[sz]e|elevate|unlock|effortless|intuitive|game-changer|next-level|harness|streamline)\w*|at your fingertips|—|!/i
// Screens hidden by the showcase rules (docs/project-gallery/SHOWCASE_RULES.md).
const hidden = new Set()
const dir = 'src/portfolio/curation'
if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) {
  const c = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'))
  for (const e of c.exclude) {
    assert(e.reason && e.reason.length > 3, `${f}: ${e.file} needs a reason`)
    hidden.add(`${f.slice(0, -5)}/${e.file}`)
  }
}
let count = 0
const problems = []
// Hand-picked screens elsewhere on the site: each chunk starting at `id: '<project>'`
// (or a `<project>: {` key) owns the screen names inside it.
for (const file of ['src/portfolio/directory.config.ts', 'src/portfolio/roles.ts', 'src/story/content.ts']) {
  const text = fs.readFileSync(file, 'utf8')
  const ids = new Set(projects.map((p) => p.id))
  const re = /(?:id:\s*'([\w-]+)'|^\s*'?([\w-]+)'?:\s*\{)|'((?:desktop|mobile)-\d+)'/gm
  let current = null
  for (const m of text.matchAll(re)) {
    const id = m[1] || m[2]
    if (id && ids.has(id)) current = id
    else if (m[3] && current && hidden.has(`${current}/${m[3]}`)) problems.push(`${file}: ${current}/${m[3]} is hidden`)
  }
}
for (const p of projects) {
  const file = `src/portfolio/tours/${p.id}.json`
  if (!fs.existsSync(file)) { problems.push(`${p.id}: no tour`); continue }
  const t = JSON.parse(fs.readFileSync(file, 'utf8'))
  const names = new Set(shots.filter((s) => s.project === p.id).map((s) => s.file.match(/(desktop|mobile)-\d+/)[0]))
  const used = new Set()
  for (const s of t.screens) {
    for (const n of [s.desk, s.phone].filter(Boolean)) {
      if (!names.has(n)) problems.push(`${p.id}: unknown screen ${n}`)
      if (hidden.has(`${p.id}/${n}`)) problems.push(`${p.id}: tour uses hidden ${n}`)
      used.add(n)
    }
  }
  // A phone-only product leaves its desktop captures out (they are the phone UI stretched).
  const phoneOnly = t.screens.every((s) => !s.desk)
  for (const n of names) if (!used.has(n) && !hidden.has(`${p.id}/${n}`) && !(phoneOnly && n.startsWith('desktop'))) problems.push(`${p.id}: ${n} not in tour`)
  const walk = (v, path) => {
    if (typeof v === 'string') { const m = v.match(banned); if (m) problems.push(`${p.id} ${path}: "${m[0]}"`) }
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`)
  }
  walk(t, '')
  for (const key of ['facts', 'screens', 'engineering']) assert(Array.isArray(t[key]), `${p.id}: ${key}`)
  count++
}
console.log(problems.length ? problems.join('\n') : `PASS: ${count} tours, ${hidden.size} screens hidden by the showcase rules`)
process.exitCode = problems.some((x) => !x.endsWith('no tour')) ? 1 : 0

// The screen count quoted on the site must match what the site actually shows.
const shown = shots.length - [...hidden].filter((h) => shots.some((s) => s.file === `/assets/projects/${h}.webp`)).length
for (const file of ['src/story/content.ts', 'src/content.ts', 'src/content.ar.ts', 'scripts/prepare-project-routes.mjs']) {
  const text = fs.readFileSync(file, 'utf8')
  for (const m of text.matchAll(/(\d{3})(?= screens|'\s*,\s*label|\s*شاشة| original interface)/g))
    if (Number(m[1]) !== shown) { console.log(`${file}: says ${m[1]} screens, the site shows ${shown}`); process.exitCode = 1 }
}
