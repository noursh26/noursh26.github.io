import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd(),
  dist = path.join(root, 'dist')
const projects = JSON.parse(
  fs.readFileSync('src/portfolio/projects.json', 'utf8'),
)
const shots = JSON.parse(
  fs.readFileSync('src/portfolio/screenshots.json', 'utf8'),
)
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const origin = 'https://nourx.tech'
const escape = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  )
const entries = [
  {
    route: '/',
    title: 'Nour Aldeen Shehadea — AI products, shipped.',
    description:
      'AI agents, SaaS platforms, business systems, and Arabic-first interfaces, built from architecture to launch.',
    image: '/assets/brand/lockup-en-reversed.png',
    name: 'Nour Aldeen Shehadea',
  },
  {
    route: '/projects/',
    title: 'Projects — Nour Aldeen Shehadea',
    description:
      'Explore 33 product stories and 690 original interface captures, with desktop and mobile demonstration data.',
    image: shots[0].file,
    name: 'Projects',
  },
  ...projects.map((p) => ({
    route: `/projects/${p.id}/`,
    title: `${p.name} — Nour Aldeen Shehadea`,
    description: p.summary.en,
    image: shots.find(
      (s) =>
        s.project === p.id &&
        s.device === 'desktop' &&
        s.file.endsWith(
          `desktop-${String(p.presentation.desktopCover).padStart(2, '0')}.webp`,
        ),
    ).file,
    name: p.name,
    project: p,
  })),
]
for (const entry of entries) {
  const url = origin + entry.route
  const structured = entry.project
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: entry.name,
        description: entry.description,
        url,
        image: origin + entry.image,
        author: {
          '@type': 'Person',
          name: 'Nour Aldeen Shehadea',
          url: origin,
        },
        inLanguage: ['ar', 'en'],
      }
    : null
  const tags = `<link rel="canonical" href="${url}" /><meta property="og:type" content="website" /><meta property="og:title" content="${escape(entry.title)}" /><meta property="og:description" content="${escape(entry.description)}" /><meta property="og:url" content="${url}" /><meta property="og:image" content="${origin + entry.image}" /><meta name="twitter:card" content="summary_large_image" />${structured ? '<script type="application/ld+json">' + JSON.stringify(structured).replace(/</g, '\\u003c') + '</script>' : ''}`
  const page = html
    .replace(/<title>.*?<\/title>/s, `<title>${escape(entry.title)}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escape(entry.description)}" />`,
    )
    .replace('</head>', tags + '</head>')
  const dir = path.join(dist, entry.route)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), page)
}
const error = html
  .replace(
    /<title>.*?<\/title>/s,
    '<title>Page not found — Nour Aldeen Shehadea</title>',
  )
  .replace('</head>', '<meta name="robots" content="noindex" /></head>')
fs.writeFileSync(path.join(dist, '404.html'), error)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    entries.map((e) => `<url><loc>${origin + e.route}</loc></url>`).join('') +
    '</urlset>\n',
)
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
)
fs.writeFileSync(path.join(dist, '.nojekyll'), '')
console.log(
  `Generated ${entries.length} static entry points, metadata, sitemap and 404 page.`,
)
