/* All home-page copy. Voice: plain, specific, first person. No slogans,
   no superlatives, no claims the work on this page does not show. */

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'build', label: 'What I build' },
  { id: 'approach', label: 'Approach' },
  { id: 'about', label: 'About' },
]

export const hero = {
  eyebrow: 'Nour Aldeen Shehadea · Product engineer',
  title: ['I build software', 'people use every day.'],
  lede: 'Business systems, mobile apps and AI features — designed, built and deployed by one engineer, in Arabic and English.',
  primary: 'See the work',
  secondary: 'Get in touch',
}

export const deck = {
  label: 'Real screens from products I built',
  hint: 'Drag or swipe to browse',
  prev: 'Previous screen',
  next: 'Next screen',
  open: 'Open {name}',
}

export const facts = [
  { value: '23', label: 'products in the gallery' },
  { value: '490', label: 'real screens captured' },
  { value: '2', label: 'languages, designed together' },
  { value: '1', label: 'engineer, design to deploy' },
]

export const work = {
  eyebrow: 'Selected work',
  title: 'Products, not mockups.',
  lede: 'Every screen here comes from the running application with demonstration data.',
  all: 'All 23 projects',
  view: 'View project',
}

export const build = {
  eyebrow: 'What I build',
  title: 'From the database to the last pixel.',
  items: [
    { title: 'Business systems', text: 'Accounting, operations and CRM workspaces where every number can be traced to its record.' },
    { title: 'Mobile apps', text: 'Flutter and React apps for everyday use, including offline work and Android releases.' },
    { title: 'AI features', text: 'Agents, retrieval and assistants wired into a real workflow, with cost and quality in view.' },
    { title: 'APIs and backends', text: 'Laravel and NestJS services with clear permissions, tenancy and integrations.' },
    { title: 'Arabic-first interfaces', text: 'Right-to-left layouts and typography designed as carefully as the English.' },
    { title: 'Deployment', text: 'Docker, CI/CD and servers set up as part of the build, not after it.' },
  ],
}

export const approach = {
  eyebrow: 'Approach',
  title: 'Small releases you can try.',
  steps: [
    { title: 'Understand', text: 'Who uses it, what they need to get done, and what a good first release looks like.' },
    { title: 'Plan', text: 'Data, roles, integrations and the deployment path, so the foundation holds what comes next.' },
    { title: 'Build', text: 'Working features in short cycles. You use the product while it takes shape.' },
    { title: 'Ship and support', text: 'I deploy it, watch it in real use, and fix what only real use reveals.' },
  ],
}

export const about = {
  eyebrow: 'About',
  title: 'One person responsible for the whole product.',
  paragraphs: [
    'I’m Nour Aldeen, a product engineer based in Al-Qatifa, Syria. I take products from an idea to a running system: the data model, the interface, the API and the server it runs on.',
    'Most of what I build is used in Arabic first, so right-to-left is never an afterthought. I work remotely, in small reviewable steps, and I stay with a product after launch.',
  ],
  facts: [
    { k: 'Based in', v: 'Al-Qatifa, Syria' },
    { k: 'Works', v: 'Remotely, worldwide' },
    { k: 'Languages', v: 'Arabic, English' },
    { k: 'Stack', v: 'Laravel · React · Next.js · NestJS · Flutter' },
  ],
}

export const contact = {
  eyebrow: 'Contact',
  title: 'Have something to build?',
  lede: 'Tell me what it is, who it’s for and when you need it. I reply to every message.',
  email: 'nour@nour.email',
  copy: 'Copy email',
  copied: 'Copied',
  github: 'https://github.com/noursh26',
  githubLabel: 'GitHub',
}

export const ui = {
  docTitle: 'Nour Aldeen Shehadea — Product engineer',
  skipLink: 'Skip to content',
  home: 'Home',
  projects: 'Projects',
  contact: 'Contact',
  menu: 'Menu',
  close: 'Close',
  mainNav: 'Main',
  langSwitch: 'العربية',
  langSwitchShort: 'ع',
  langLabel: 'اقرأ بالعربية',
  name: 'Nour Aldeen',
  copyright: '© {year} Nour Aldeen Shehadea',
  location: 'Al-Qatifa, Syria',
}
