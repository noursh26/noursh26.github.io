/* All page copy in one place. Voice rules from the design system:
   short declarative sentences, terminal full stops, numbered sections,
   no superlatives, no emoji, no exclamation marks. */

export const nav = [
  { id: 'profile', label: 'The profile', no: '01' },
  { id: 'method', label: 'How I work', no: '02' },
  { id: 'build', label: 'What I ship', no: '03' },
  { id: 'work', label: 'Selected work', no: '04' },
  { id: 'principles', label: 'Principles', no: '05' },
  { id: 'difference', label: 'Why me', no: '06' },
  { id: 'invitation', label: 'Start a project', no: '07' },
]

export const hero = {
  lines: ['AI products.', 'Built end to end.', 'By Nour Aldeen.'],
  cue: 'Read the profile',
}

export const marquee = [
  'AI Agents.',
  'RAG Pipelines.',
  'Full-Stack.',
  'DevOps.',
  'Docker. CI/CD.',
  'Any framework.',
  'Claude API.',
  'Arabic RTL, first class.',
]

/* The diagnosis section becomes the personal profile: five full-screen panels,
   one claim each, the photograph carrying the weight. */
export const profile = {
  no: '01',
  kicker: 'The profile',
  panels: [
    {
      no: '01',
      title: ['Your product.', 'My responsibility.'],
      text: 'I turn product ideas into working software — from architecture and interface to deployment and ongoing care.',
      image: 'assets/profile/p1-engineer.webp',
    },
    {
      no: '02',
      title: ['The right stack.', 'One technical partner.'],
      text: 'Laravel, Next.js, NestJS, React, or Flutter. I choose the stack around your users, constraints, and plans for growth.',
      image: 'assets/profile/p2-fullstack.webp',
    },
    {
      no: '03',
      title: ['Arabic-native,', 'English-fluent.'],
      text: 'Arabic and English interfaces designed together, with native reading flow, clear typography, and careful RTL support.',
      image: 'assets/profile/p3-arabic.webp',
    },
    {
      no: '04',
      title: ['AI with purpose.', 'Built for real use.'],
      text: 'Agents, retrieval, and LLM features connected to real workflows, with evaluation and monitoring built in.',
      image: 'assets/profile/p4-ai.webp',
    },
    {
      no: '05',
      title: ['Remote, async,', 'accountable.'],
      text: 'Based in Al-Qatifa, Syria. Working remotely with clear priorities, reviewable changes, and visible progress.',
      image: 'assets/profile/p5-remote.webp',
    },
  ],
  cta: 'See how I work',
  ctaTarget: 'method',
}

export const method = {
  no: '02',
  kicker: 'How I work',
  title: 'From first conversation to a working product.',
  steps: ([
    {
      no: '01', title: 'Understand.',
      text: 'We define who the product serves, what it needs to solve, and what a successful first release looks like.',
      image: 'assets/method/m1-listen.webp',
    },
    {
      no: '02', title: 'Plan.',
      text: 'I map the data, integrations, access rules, and deployment path, so the foundation supports what comes next.',
      image: 'assets/method/m2-architect.webp',
    },
    {
      no: '03', title: 'Build.',
      text: 'Small, reviewable releases keep the work visible. You can try the product and give feedback as it takes shape.',
      image: 'assets/method/m3-build.webp',
    },
    {
      no: '04', title: 'Launch. Support.',
      text: 'I handle deployment, check the live experience, and help resolve the issues that only real use reveals.',
      image: 'assets/method/m4-ship.webp',
    },
  ] as { no: string; title: string; text: string; image: string; crop?: Record<string, string> }[]),
  hint: 'Scroll to deal the cards',
}

export const statement = {
  lines: ['A clear purpose.', 'A thoughtful build.', 'A product ready', 'for the real world.'],
  foot: 'Understand the problem. Build the right foundation. Learn from the product once people use it.',
}

export const build = {
  no: '03',
  kicker: 'What I ship',
  /* On the dial the picture does the talking: a name and a single line each. */
  units: [
    { no: '01', name: 'AI Agents',          line: 'Agents and retrieval connected to your workflows.',          image: 'assets/units/unit-ai.webp' },
    { no: '02', name: 'SaaS Platforms',     line: 'Tenancy, subscriptions, and a foundation for growth.', image: 'assets/units/unit-saas.webp' },
    { no: '03', name: 'Mobile Apps',        line: 'Considered Flutter experiences for everyday use.',             image: 'assets/units/unit-mobile.webp' },
    { no: '04', name: 'APIs & Backends',    line: 'Reliable data, permissions, and integrations.',       image: 'assets/units/unit-api.webp' },
    { no: '05', name: 'Dashboards',         line: 'Clear views of complex day-to-day operations.',          image: 'assets/units/unit-dashboard.webp' },
    { no: '06', name: 'E-commerce',         line: 'Connected storefronts, orders, wallets, and checkout.', image: 'assets/units/unit-commerce.webp' },
    { no: '07', name: 'Landing Pages',      line: 'A clear story and a purposeful path to contact.',            image: 'assets/units/unit-landing.webp' },
  ],
}

export const work = {
  no: '04',
  kicker: 'Selected work',
  title: 'Ideas turned into working products.',
  lede: 'AI platforms, business systems, and Arabic-first experiences.',
  items: [
    {
      no: '01', title: 'Estratijiya AI.',
      text: 'Multi-tenant SaaS giving every company an AI customer-service agent — widget, WhatsApp, Telegram, on a RAG knowledge base.',
      image: 'assets/work/w4-estratijiya.webp',
    },
    {
      no: '02', title: 'SalesFlow AI.',
      text: 'A sales workspace connecting leads, deals, quotes, and live channels, with AI agents supporting the workflow across tenants.',
      image: 'assets/work/w1-salesflow.webp',
    },
    {
      no: '03', title: 'Relinka.',
      text: 'An encrypted document workspace with AI classification, data extraction, semantic search, and MCP access for connected agents.',
      image: 'assets/work/w7-relinka.webp',
    },
    {
      no: '04', title: 'Fahrast AI.',
      text: 'An Arabic reading and research platform bringing books and manuscripts into one environment for intelligent search and discovery.',
      image: 'assets/work/w8-fahrast.webp',
    },
    {
      no: '05', title: 'Alkhyr.',
      text: 'A complete platform for charity work — campaigns, beneficiaries, subscriptions, printed cards, the whole operation.',
      image: 'assets/work/w9-alkhyr.webp',
    },
    {
      no: '06', title: 'm3aak.com.',
      text: 'A multi-role e-commerce platform — stores, digital wallets, and orders with live delivery tracking, fully RTL.',
      image: 'assets/work/w2-m3aak.webp',
    },
    {
      no: '07', title: 'Almustfa.',
      text: 'An end-to-end system for Quran memorization circles — recitation logging, gamified points, and a reward market with QR student cards.',
      image: 'assets/work/w10-almustfa.webp',
    },
    {
      no: '08', title: 'Global Football AI.',
      text: 'Professional football education, AI performance analysis and certifications — web platform and Android app.',
      image: 'assets/work/w11-gfaa.webp',
    },
    {
      no: '09', title: 'WISP.',
      text: 'A full ISP operations system — subscriptions, billing, installs, maintenance, inventory, accounting, and payroll.',
      image: 'assets/work/w12-wisp.webp',
    },
    {
      no: '10', title: 'NIRSO.',
      text: 'The internal operations system for Petravex — one central identity, projects and automation, and a document archive.',
      image: 'assets/work/w13-nirso.webp',
    },
    {
      no: '11', title: 'Arkani.',
      text: 'A Muslim companion app in Flutter: prayer times, adhkar, mosque finder, push notifications.',
      image: 'assets/work/w3-arkani.webp',
    },
    {
      no: '12', title: 'Maash.art.',
      text: 'A cinematic, bilingual portfolio for a master furniture draftsman — scroll and it draws itself.',
      image: 'assets/work/w6-maash.webp',
    },
  ],
  close: 'One technical partner, from the first decision to the live product.',
}

export const principles = {
  no: '05',
  kicker: 'What I believe',
  lines: [
    'Every product is a system.',
    'Useful feedback guides the next release.',
    'AI should solve a practical problem.',
    'Good interfaces read naturally in both directions.',
  ],
  values: ['Clarity', 'Craft', 'Ownership', 'Momentum', 'Reliability', 'Honesty'],
}

export const difference = {
  no: '06',
  kicker: 'Why me',
  title: 'A partner for the whole product.',
  rows: [
    { title: 'One point of ownership.', text: 'Architecture, interface, backend, and deployment stay connected through one technical partner.', image: 'assets/difference/d1-endtoend.webp' },
    { title: 'Two languages. Equal care.', text: 'Arabic RTL and English LTR, designed as equals.', image: 'assets/difference/d2-bilingual.webp' },
    { title: 'AI with a clear role.', text: 'Agents, RAG, and automation are chosen for a specific workflow, with quality and operating cost in view.', image: 'assets/difference/d3-ai.webp' },
    { title: 'Care in every interface.', text: 'Readable layouts, responsive behavior, and deliberate interactions make the product easier to use.', image: 'assets/difference/d4-design.webp' },
    { title: 'Deployment is part of delivery.', text: 'Docker, CI/CD, and server configuration are part of the build, alongside the code they keep running.', image: 'assets/difference/d5-ops.webp' },
    { title: 'Progress you can review.', text: 'Small releases, working features, and clear priorities give you something concrete to review.', image: 'assets/difference/d6-measure.webp' },
  ],
}

export const invitation = {
  no: '07',
  kicker: 'Start here',
  title: 'One turn. One conversation.',
  lede: 'Explore a starting point with the dial, then tell me what you need. We will choose the right scope together.',
  hint: 'Drag the dial, or press to turn it.',
  prizes: [
    { label: 'Discovery Call', detail: 'A 30-minute conversation about your idea, priorities, and whether we are a good fit.' },
    { label: 'MVP Build', detail: 'The smallest version of the product that can carry real users.' },
    { label: 'Landing Page', detail: 'A focused page that explains your offer and makes the next step clear — designed, built, and deployed.' },
    { label: 'Rescue Mission', detail: 'A project that stalled, audited and put back on its feet.' },
    { label: 'Automation', detail: 'The manual work inside your business, turned into a system.' },
    { label: 'AI Pilot', detail: 'A two-week paid pilot — an AI feature shipped into your product, measured.' },
  ],
  claim: 'Start the conversation',
  again: 'Turn again',
}

export const contact = {
  no: '08',
  kicker: 'Your next move',
  title: 'Start with a message.',
  text: 'Share your idea, the challenge, and your timeline. We can map out a practical next step.',
  email: 'nour@nour.email',
  cta: 'Email me',
  github: 'https://github.com/noursh26',
  site: 'https://nourx.tech',
  location: 'Al-Qatifa, Syria — remote worldwide',
}

/* Chrome and microcopy — the strings that live in components rather than
   sections. */
export const ui = {
  docTitle: 'Nour Aldeen Shehadea — AI products, shipped.',
  preloaderWord: 'Products with direction.',
  skipLink: 'Skip to content',
  menuOpen: 'Menu',
  menuClose: 'Close',
  menuAria: 'Menu',
  langSwitch: 'عربي',
  getInTouch: 'Get in touch',
  based: 'Based',
  explore: 'Explore',
  startConversation: 'Start a conversation',
  seeTheCode: 'See the code on GitHub',
  scrollCue: 'Scroll to the profile',
  statementAria: 'Where we begin',
  dialAria: 'A dial of six working sessions',
  valuesAria: 'Our values',
  goCursor: 'Go',
  yours: 'A starting point',
  turning: 'Turning…',
  spinDial: 'Turn the dial',
  mailtoSubject: 'Project inquiry — {prize}',
  mailtoBody: 'I turned the dial and it stopped on {prize}.\n\nWhat I am building:\nTimeline:\n',
  footerLine: ['Your product.', 'Built and shipped.'],
  copyright: '© {year} NOUR ALDEEN SHEHADEA · AL-QATIFA',
  tagline: 'Products with direction. منتجات لها وجهة.',
}
