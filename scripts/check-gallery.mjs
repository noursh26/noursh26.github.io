import fs from 'node:fs'
import assert from 'node:assert/strict'
const projects = JSON.parse(fs.readFileSync('src/portfolio/projects.json')),
  shots = JSON.parse(fs.readFileSync('src/portfolio/screenshots.json')),
  compact = JSON.parse(
    fs.readFileSync('src/portfolio/screenshots.compact.json'),
  )
assert.equal(projects.length, 33)
assert.equal(new Set(projects.map((p) => p.id)).size, 33)
assert.equal(shots.length, 690)
assert.equal(compact.length, shots.length)
const files = new Set(),
  images = new Set()
for (const p of projects) {
  assert(/^[a-z0-9-]+$/.test(p.id))
  for (const k of ['summary', 'headline', 'problem', 'solution', 'challenge'])
    for (const lang of ['ar', 'en'])
      assert(p[k][lang]?.trim(), `${p.id} missing ${k}.${lang}`)
  assert(
    p.features.length >= 4 && p.flow.length >= 3,
    `${p.id} incomplete story`,
  )
  for (const device of ['desktop', 'mobile'])
    assert(
      shots.filter((s) => s.project === p.id && s.device === device).length >=
        10,
      `${p.id} needs 10 ${device} captures`,
    )
}
for (let i = 0; i < shots.length; i++) {
  const s = shots[i]
  assert(projects.some((p) => p.id === s.project))
  assert.equal(s.revisionKind, 'local-source-snapshot')
  assert(/^[a-f0-9]{64}$/.test(s.sourceSha256))
  assert(
    !images.has(s.project + ':' + s.device + ':' + s.sourceSha256),
    `Repeated source image: ${s.file}`,
  )
  images.add(s.project + ':' + s.device + ':' + s.sourceSha256)
  for (const k of ['file', 'thumbnail']) {
    assert(s[k].startsWith(`/assets/projects/${s.project}/`))
    assert(!files.has(s[k]), `Duplicate path ${s[k]}`)
    files.add(s[k])
    const bytes = fs.readFileSync('public' + s[k])
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
  }
  for (const k of Object.keys(compact[i])) assert.equal(compact[i][k], s[k])
}
for (const p of projects) {
  const file = `dist/projects/${p.id}/index.html`
  if (fs.existsSync('dist')) {
    const html = fs.readFileSync(file, 'utf8')
    assert(html.includes(`https://nourx.tech/projects/${p.id}/`))
    assert(html.includes('application/ld+json'))
  }
}
console.log(
  `PASS: ${projects.length} complete bilingual stories, ${shots.length} unique source captures, ${files.size} WebP assets, and direct static project routes.`,
)
