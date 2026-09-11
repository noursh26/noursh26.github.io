/* All page copy in one place. Voice rules from the design system:
   short declarative sentences, terminal full stops, numbered sections,
   no superlatives, no emoji, no exclamation marks. */

export const nav = [
  { id: 'profile', label: 'The profile', no: '01' },
  { id: 'method', label: 'How I work', no: '02' },
  { id: 'build', label: 'What I build', no: '03' },
  { id: 'work', label: 'Selected work', no: '04' },
  { id: 'principles', label: 'Principles', no: '05' },
  { id: 'difference', label: 'Why me', no: '06' },
  { id: 'invitation', label: 'Start a project', no: '07' },
]

export const hero = {
  lines: ['Software that works,', 'built end to end,', 'by Nour Aldeen.'],
  cue: 'Read the profile',
}

export const marquee = [
  'Laravel 12.',
  'Livewire 3.',
  'Flutter.',
  'MySQL. Redis.',
  'Docker. CI/CD.',
  'Claude API.',
  'Tailwind CSS.',
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
      title: ['First-year engineer,', 'already shipping.'],
      text: 'A computer engineering student who prefers production code to lecture slides.',
      image: 'assets/profile/p1-engineer.webp',
    },
    {
      no: '02',
      title: ['Full-stack,', 'for real.'],
      text: 'Laravel backends, Livewire front ends, Flutter apps — and the VPS they all run on.',
      image: 'assets/profile/p2-fullstack.webp',
    },
    {
      no: '03',
      title: ['Arabic-native,', 'English-fluent.'],
      text: 'RTL interfaces and Arabic products built first-class, never as an afterthought.',
      image: 'assets/profile/p3-arabic.webp',
    },
    {
      no: '04',
      title: ['AI inside', 'the workflow.'],
      text: 'Claude-powered features inside the products — and AI-assisted delivery around them.',
      image: 'assets/profile/p4-ai.webp',
    },
    {
      no: '05',
      title: ['Remote, async,', 'accountable.'],
      text: 'Working from Al-Qatifa, Syria — for clients anywhere. Progress you can read in the repo.',
      image: 'assets/profile/p5-remote.webp',
    },
  ],
  cta: 'See how I work',
  ctaTarget: 'method',
}

export const method = {
  no: '02',
  kicker: 'How I work',
  title: 'Four moves. One connected system.',
  steps: ([
    {
      no: '01', title: 'I listen.',
      text: 'The project starts from the outcome, not the feature list. We ask why until we reach it.',
      image: 'assets/method/m1-listen.webp',
    },
    {
      no: '02', title: 'I architect.',
      text: 'Schema, tenancy, queues, deploy target — decided before the first line of code.',
      image: 'assets/method/m2-architect.webp',
    },
    {
      no: '03', title: 'I build.',
      text: 'In small, reviewable commits. You watch the product grow, not a status report.',
      image: 'assets/method/m3-build.webp',
    },
    {
      no: '04', title: 'I ship and stay.',
      text: 'DNS to Docker to the last bugfix — the work ends when it runs, not when it demos.',
      image: 'assets/method/m4-ship.webp',
    },
  ] as { no: string; title: string; text: string; image: string; crop?: Record<string, string> }[]),
  hint: 'Scroll to deal the cards',
}

export const statement = {
  lines: ['I write software', 'the way it should', 'be built — measured,', 'and meant to last.'],
  foot: 'Discovery before code, deployment as part of the job. The order is a condition, not a preference.',
}

export const build = {
  no: '03',
  kicker: 'What I build',
  /* On the dial the picture does the talking: a name and a single line each. */
  units: [
    { no: '01', name: 'SaaS Platforms',     line: 'Multi-tenant products that bill and scale.', image: 'assets/units/unit-saas.webp' },
    { no: '02', name: 'Mobile Apps',        line: 'Flutter apps that feel native.',             image: 'assets/units/unit-mobile.webp' },
    { no: '03', name: 'APIs & Backends',    line: 'The layer everything else stands on.',       image: 'assets/units/unit-api.webp' },
    { no: '04', name: 'Dashboards',         line: 'Admin panels people actually use.',          image: 'assets/units/unit-dashboard.webp' },
    { no: '05', name: 'Landing Pages',      line: 'First impressions that convert.',            image: 'assets/units/unit-landing.webp' },
    { no: '06', name: 'AI Agents',          line: 'Products with a brain wired in.',            image: 'assets/units/unit-ai.webp' },
    { no: '07', name: 'E-commerce',         line: 'Stores, wallets, and checkout that closes.', image: 'assets/units/unit-commerce.webp' },
  ],
}

export const work = {
  no: '04',
  kicker: 'Selected work',
  title: 'What actually shipped.',
  lede: 'Real products. Real users. Real uptime.',
  items: [
    {
      no: '01', title: 'Estratijiya AI.',
      text: 'Multi-tenant SaaS giving every company an AI customer-service agent — widget, WhatsApp, Telegram, on a RAG knowledge base.',
      image: 'assets/work/w4-estratijiya.webp',
    },
    {
      no: '02', title: 'SalesFlow AI.',
      text: 'A multi-tenant sales CRM run by AI agents — leads, deals, quotes, and live channels in one dashboard.',
      image: 'assets/work/w1-salesflow.webp',
    },
    {
      no: '03', title: 'Relinka.',
      text: 'A multi-tenant encrypted archive — Drive-like storage, AI classification and extraction, semantic search, and an MCP endpoint for agents.',
      image: 'assets/work/w7-relinka.webp',
    },
    {
      no: '04', title: 'Fahrast AI.',
      text: 'An Arabic platform aggregating thousands of books and manuscripts inside an intelligent reading and search environment.',
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
  close: 'And all of this — shipped solo. From one laptop.',
}

export const principles = {
  no: '05',
  kicker: 'What I believe',
  lines: [
    'Every product is a system.',
    'Every system should be measured.',
    'Every interface should read naturally — in both directions.',
    'Every build should survive its first deploy.',
  ],
  values: ['Clarity', 'Craft', 'Ownership', 'Momentum', 'Reliability', 'Honesty'],
}

export const difference = {
  no: '06',
  kicker: 'Why me',
  title: 'Built for the work after the brief.',
  rows: [
    { title: 'End to end, actually.', text: 'Schema to deploy to DNS — nothing in between is yours to carry.', image: 'assets/difference/d1-endtoend.webp' },
    { title: 'Two languages, first class.', text: 'Arabic RTL and English LTR, designed as equals.', image: 'assets/difference/d2-bilingual.webp' },
    { title: 'AI inside, not bolted on.', text: 'Claude API features where they return value — and AI tooling in how I deliver.', image: 'assets/difference/d3-ai.webp' },
    { title: 'Design that ships.', text: 'Interfaces built to the standard of the sites you admire, not the default admin template.', image: 'assets/difference/d4-design.webp' },
    { title: 'Ops included.', text: 'Docker, CI, and the server it runs on come with the build.', image: 'assets/difference/d5-ops.webp' },
    { title: 'A number before. A number after.', text: 'Progress measured in shipped commits and working features.', image: 'assets/difference/d6-measure.webp' },
  ],
}

export const invitation = {
  no: '07',
  kicker: 'Start here',
  title: 'One turn. One conversation.',
  lede: 'Not sure where to start? Turn the dial — whatever it stops on is a reasonable first step. Claim it and we begin there.',
  hint: 'Drag the dial, or press to turn it.',
  prizes: [
    { label: 'Discovery Call', detail: '30 minutes on what you are trying to build, and whether I am the right hands for it.' },
    { label: 'MVP Build', detail: 'The smallest version of the product that can carry real users.' },
    { label: 'Landing Page', detail: 'A first impression that converts — designed, built, and deployed.' },
    { label: 'Rescue Mission', detail: 'A project that stalled, audited and put back on its feet.' },
    { label: 'Automation', detail: 'The manual work inside your business, turned into a system.' },
    { label: 'Retainer', detail: 'A steady pair of hands on your product, month after month.' },
  ],
  claim: 'Start the conversation',
  again: 'Turn again',
}

export const contact = {
  no: '08',
  kicker: 'Your next move',
  title: 'Start with a message.',
  text: 'Tell me what you are building. I will tell you how I would approach it.',
  email: 'nour@nour.email',
  cta: 'Email me',
  github: 'https://github.com/noursh26',
  site: 'https://noursh.pro',
  location: 'Al-Qatifa, Syria — remote worldwide',
}

/* Chrome and microcopy — the strings that live in components rather than
   sections. */
export const ui = {
  docTitle: 'Nour Aldeen Shehadea — Code with direction.',
  preloaderWord: 'Code with direction.',
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
  yours: 'Yours',
  turning: 'Turning…',
  spinDial: 'Turn the dial',
  mailtoSubject: 'Project inquiry — {prize}',
  mailtoBody: 'I turned the dial and it stopped on {prize}.\n\nWhat I am building:\nTimeline:\n',
  footerLine: ['Your product.', 'Built and shipped.'],
  copyright: '© {year} NOUR ALDEEN SHEHADEA · AL-QATIFA',
  tagline: 'Code with direction. كود له وجهة.',
}
