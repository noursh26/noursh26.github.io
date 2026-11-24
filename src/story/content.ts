/* Home page copy, in both languages. Voice: plain, specific, first person.
   ✏️ The "story.chapters" entries are yours to rewrite — add years, places,
   the first thing you built. Keep each `text` to one or two sentences. */

type T = { en: string; ar: string }
const t = (en: string, ar: string): T => ({ en, ar })

export type IconKey =
  | 'pin' | 'browsers' | 'database' | 'phone' | 'robot' | 'rocket'
  | 'offline' | 'devices' | 'halfMoon' | 'buildings'
  | 'grid' | 'lightning' | 'trophy' | 'medal'
  | 'search' | 'store' | 'fork' | 'chats' | 'book' | 'chart'
  | 'kanban' | 'timer' | 'flow' | 'pool' | 'path' | 'wrench'
  | 'books' | 'sparkle' | 'bookmarks' | 'servers' | 'translate' | 'cloud'
  | 'compass' | 'code' | 'folder' | 'table' | 'key' | 'wifi'

export const hero = {
  eyebrow: t('Product engineer · Al-Qatifa, Syria', 'مهندس منتجات · القطيفة، سوريا'),
  lede: t(
    'I design, build and ship Arabic-first products — business systems, phone-first apps and AI features — from the database to the last pixel.',
    'أصمم وأبني وأطلق منتجات عربية أولاً — أنظمة أعمال وتطبيقات للهاتف وميزات ذكاء اصطناعي — من قاعدة البيانات حتى آخر بكسل.',
  ),
  cta: t('See the work', 'شاهد الأعمال'),
  cta2: t('Get in touch', 'تواصل معي'),
  lineupLabel: t('Real screens from five of my products', 'شاشات حقيقية من خمسة من منتجاتي'),
  // Left to right as shown; pos 0 is the flagship in the middle.
  lineup: [
    { id: 'lego', shot: 'mobile-02', pos: -2 },
    { id: 'relinka', shot: 'mobile-01', pos: -1 },
    { id: 'almustfa', shot: 'mobile-05', pos: 0 },
    { id: 'nirso', shot: 'mobile-03', pos: 1 },
    { id: 'fahrast', shot: 'mobile-02', pos: 2 },
  ],
}

/* ── Almostfa: the flagship, told while the phone stays in view ── */
export const flagship = {
  id: 'almustfa',
  eyebrow: t('Flagship · my biggest project', 'المشروع الأكبر'),
  name: t('Almostfa', 'المصطفى'),
  title: t('A whole Quran circle, run from one phone.', 'حلقة تحفيظ كاملة، من هاتف واحد.'),
  intro: t(
    'Teachers record recitations and points in seconds, even without a connection. Students follow a daily program and a weekly race. Supervisors see the whole picture.',
    'يسجّل الأستاذ التسميع والنقاط في ثوانٍ، حتى دون اتصال. ويتابع الطالب برنامجه اليومي وسباق الأسبوع. ويرى المشرف الصورة كاملة.',
  ),
  facts: [
    { icon: 'offline' as IconKey, text: t('Works offline, syncs later', 'يعمل دون اتصال ويزامن لاحقاً') },
    { icon: 'devices' as IconKey, text: t('Web and Android from one codebase', 'ويب وأندرويد من شيفرة واحدة') },
    { icon: 'halfMoon' as IconKey, text: t('Light and dark', 'وضع فاتح وداكن') },
    { icon: 'buildings' as IconKey, text: t('Each course’s data kept apart', 'بيانات كل دورة معزولة عن غيرها') },
  ],
  steps: [
    {
      shot: 'mobile-01', icon: 'grid' as IconKey,
      title: t('The circle at a glance', 'الحلقة في نظرة'),
      text: t(
        'Today’s recitations, attendance and points — and an alert for every student who hasn’t recited in a week.',
        'تسميع اليوم والحضور والنقاط — وتنبيه بكل طالب لم يُسمّع منذ أسبوع.',
      ),
      callout: { x: 62, y: 44, label: t('Who needs attention', 'من يحتاج متابعة') },
    },
    {
      shot: 'mobile-02', icon: 'lightning' as IconKey,
      title: t('A whole circle in one pass', 'حلقة كاملة دفعة واحدة'),
      text: t(
        'The quick-add basket: pick students, then record recitation, points and deductions together.',
        'سلة الإضافة السريعة: اختر الطلاب، ثم سجّل التسميع والنقاط والخصومات معاً.',
      ),
      callout: { x: 50, y: 64, label: t('Points in one tap', 'النقاط بضغطة') },
    },
    {
      shot: 'mobile-07', icon: 'trophy' as IconKey,
      title: t('A program students want to open', 'برنامج يحب الطالب فتحه'),
      text: t(
        'Daily tasks, a level and a streak at the top — and a weekly race with a podium below.',
        'مهام يومية ومستوى وتتابع في الأعلى — وسباق أسبوعي بمنصة تتويج في الأسفل.',
      ),
      callout: { x: 50, y: 72, label: t('Weekly race', 'سباق الأسبوع') },
    },
    {
      shot: 'mobile-05', icon: 'medal' as IconKey,
      title: t('Progress worth celebrating', 'تقدّم يستحق الاحتفال'),
      text: t(
        'Seven days in a row earns a badge. Small rewards keep memorisation steady.',
        'سبعة أيام متتالية تمنح شارة. مكافآت صغيرة تجعل الحفظ ثابتاً.',
      ),
      callout: { x: 50, y: 38, label: t('New badge', 'شارة جديدة') },
    },
  ],
  coda: {
    shot: 'desktop-01',
    title: t('The same system on a big screen.', 'النظام نفسه على الشاشة الكبيرة.'),
    text: t(
      'Supervisors get rankings, alerts and every circle in one view — from the same codebase as the phone app.',
      'يرى المشرف الترتيب والتنبيهات وكل الحلقات في شاشة واحدة — من الشيفرة نفسها التي يعمل بها تطبيق الهاتف.',
    ),
  },
  stack: ['Laravel', 'React 19', 'TanStack Query', 'Tailwind CSS', 'Capacitor', 'MariaDB'],
}

/* ── The next six, each on its own colour, sampled from its screens ── */
export type Panel = {
  id: string
  kind: T
  name: T
  title: T
  text: T
  desk: string
  phone: string
  points: { icon: IconKey; text: T }[]
  stack: string[]
  host: string
}

export const more = {
  eyebrow: t('More products', 'منتجات أخرى'),
  title: t('From local markets to AI agents.', 'من الأسواق المحلية إلى وكلاء الذكاء الاصطناعي.'),
  lede: t(
    '18 products and 175 screens, captured from the running apps with demonstration data. Six of them, in the order I’d show you:',
    '18 منتجاً و175 شاشة التُقطت من التطبيقات وهي تعمل، ببيانات تجريبية. هذه ستة منها، بالترتيب الذي أعرضها به:',
  ),
  open: t('Case study', 'تفاصيل المشروع'),
  built: t('Built with', 'التقنيات'),
}

export const panels: Panel[] = [
  {
    id: 'lego', host: 'legodesigns',
    kind: t('Pool design app', 'تطبيق تصميم المسابح'),
    name: t('Lego Designs', 'ليجو ديزاين'),
    title: t('Design the pool, then follow it being built.', 'صمّم مسبحك، ثم تابع تنفيذه.'),
    text: t(
      'Customers browse finished pools, configure their own step by step and follow the build — plus maintenance, subscriptions and an equipment store, in a Flutter app and on the web.',
      'يتصفح العميل مسابح منفّذة، ويصمم مسبحه خطوة بخطوة ويتابع التنفيذ — مع الصيانة والاشتراكات ومتجر المعدات، في تطبيق Flutter وعلى الويب.',
    ),
    desk: 'desktop-02', phone: 'mobile-02',
    points: [
      { icon: 'pool', text: t('Step-by-step pool configuration', 'تصميم المسبح خطوة بخطوة') },
      { icon: 'path', text: t('Build tracking, stage by stage', 'متابعة التنفيذ مرحلة بمرحلة') },
      { icon: 'wrench', text: t('Maintenance, subscriptions and an equipment store', 'صيانة واشتراكات ومتجر معدات') },
    ],
    stack: ['Flutter', 'Dart', 'Laravel', 'Livewire'],
  },
  {
    id: 'fahrast', host: 'fahrast.ai',
    kind: t('AI library', 'مكتبة بالذكاء الاصطناعي'),
    name: t('Fahrast AI', 'فهرست AI'),
    title: t('The heritage library, catalogued and connected.', 'مكتبة التراث، مفهرسة ومترابطة.'),
    text: t(
      'A catalog of the Islamic heritage: books, authors and narrators, searchable and linked to each other, with a personal library for every reader.',
      'فهرس للتراث الإسلامي: كتب ومؤلفون ورواة، قابلة للبحث ومترابطة، مع مكتبة شخصية لكل قارئ.',
    ),
    desk: 'desktop-02', phone: 'mobile-02',
    points: [
      { icon: 'books', text: t('A catalog of books, authors and narrators', 'كتالوج للكتب والمؤلفين والرواة') },
      { icon: 'bookmarks', text: t('A personal library with shelves', 'مكتبة شخصية برفوف') },
    ],
    stack: ['Laravel', 'Livewire', 'MariaDB'],
  },
  {
    id: 'nirso', host: 'nirso',
    kind: t('Team workspace', 'مساحة عمل للفرق'),
    name: t('NIRSO', 'نيرسو'),
    title: t('A workspace that follows how the team works.', 'مساحة عمل تتبع طريقة عمل فريقك.'),
    text: t(
      'Projects and tasks as lists, boards, timelines, calendars and tables, with time tracking, goals, forms and automations built in.',
      'المشاريع والمهام كقوائم ولوحات ومخطط زمني وتقويم وجداول، مع تسجيل الوقت والأهداف والنماذج والأتمتة.',
    ),
    desk: 'desktop-03', phone: 'mobile-01',
    points: [
      { icon: 'kanban', text: t('The same tasks in five views, one click apart', 'المهام نفسها بخمس طرق عرض، بضغطة واحدة') },
      { icon: 'timer', text: t('Time tracking, goals and team workload', 'تسجيل الوقت والأهداف وأعباء الفريق') },
      { icon: 'flow', text: t('Forms and automations inside every list', 'نماذج وأتمتة داخل كل قائمة') },
    ],
    stack: ['Next.js', 'TypeScript', 'Drizzle', 'PostgreSQL'],
  },
  {
    id: 'relinka', host: 'relinka',
    kind: t('Document workspace', 'مساحة مستندات'),
    name: t('Relinka', 'ريلينكا'),
    title: t('Connected files. A workspace you can understand.', 'ملفات مترابطة. مساحة يمكن فهمها.'),
    text: t(
      'An Arabic drive for a company’s folders and files, with every file encrypted, every workspace kept apart and a trash that can be undone.',
      'مساحة عربية لمجلدات الشركة وملفاتها، كل ملف فيها مشفّر، وكل مساحة عمل معزولة عن غيرها، وسلة محذوفات يمكن التراجع عنها.',
    ),
    desk: 'desktop-01', phone: 'mobile-03',
    points: [
      { icon: 'folder', text: t('Folders, recent files and a trash with restore', 'مجلدات وملفات حديثة وسلة محذوفات مع الاستعادة') },
      { icon: 'key', text: t('Every file encrypted with its own key', 'كل ملف مشفّر بمفتاحه الخاص') },
      { icon: 'buildings', text: t('Four workspace roles, each company kept apart', 'أربعة أدوار في المساحة، وكل شركة معزولة عن غيرها') },
    ],
    stack: ['React', 'TypeScript', 'TanStack Router', 'Zod'],
  },
  {
    id: 'estratijiya-ai', host: 'estratijiya.ai',
    kind: t('AI agent platform', 'منصة وكلاء ذكاء اصطناعي'),
    name: t('Estratijiya AI', 'استراتيجيا AI'),
    title: t('Every conversation, with the customer’s context.', 'كل محادثة، ومعها سياق العميل.'),
    text: t(
      'Customer conversations next to the customer’s profile, a knowledge library the agent cites in its answers, team roles and a usage budget for every workspace.',
      'محادثات العملاء بجانب ملف العميل، ومكتبة معرفة يستشهد بها الوكيل في إجاباته، وأدوار للفريق وميزانية استخدام لكل مساحة عمل.',
    ),
    desk: 'desktop-02', phone: 'mobile-02',
    points: [
      { icon: 'chats', text: t('An inbox linked to customer profiles and lead scores', 'صندوق محادثات مرتبط بملفات العملاء وتقييمهم') },
      { icon: 'book', text: t('Answers that cite the knowledge library', 'إجابات تستشهد بمكتبة المعرفة') },
      { icon: 'chart', text: t('Usage, cost and budget per workspace', 'الاستخدام والتكلفة والميزانية لكل مساحة') },
    ],
    stack: ['Next.js', 'TypeScript', 'Drizzle', 'PostgreSQL', 'pgvector'],
  },
  {
    id: 'foxtech', host: 'foxtech',
    kind: t('ISP operations', 'تشغيل مزود إنترنت'),
    name: t('FoxTech', 'فوكس تك'),
    title: t('Subscribers, teams and finance in one panel.', 'المشترك والفريق والمالية، في لوحة واحدة.'),
    text: t(
      'Everything an internet provider runs on: subscribers and plans, installations in the field, inventory across warehouses, expenses, payroll and books that balance.',
      'كل ما يعمل عليه مزوّد الإنترنت: المشتركون والباقات، والتركيب في الميدان، والمخزون بين المستودعات، والمصروفات والرواتب، ودفاتر محاسبية متوازنة.',
    ),
    desk: 'desktop-01', phone: 'mobile-01',
    points: [
      { icon: 'wifi', text: t('Subscribers, plans and collections', 'المشتركون والباقات والتحصيل') },
      { icon: 'wrench', text: t('Installation and maintenance queues', 'طوابير التركيب والصيانة') },
      { icon: 'chart', text: t('Inventory, expenses and journal records', 'المخزون والمصروفات والقيود') },
    ],
    stack: ['React', 'TypeScript', 'Laravel', 'REST API'],
  },
]

/* ── Landing pages on a horizontal rail ── */
export const landings = {
  eyebrow: t('Landing pages', 'صفحات الهبوط'),
  title: t('Brand sites, each with its own story.', 'مواقع تعريفية، لكل منها قصتها.'),
  lede: t('Designed and built from scratch, one story per brand.', 'مصممة ومبنية من الصفر، لكل علامة قصتها.'),
  all: t('All 18 projects', 'كل المشاريع الـ18'),
  items: [
    { id: 'estratijiya', shot: 'desktop-01', host: 'estratijiya', name: t('Estratijiya', 'استراتيجيا'), text: t('A cinematic brand story told in scroll scenes.', 'قصة علامة سينمائية تُروى بمشاهد التمرير.') },
    { id: 'petravex', shot: 'desktop-01', host: 'petravex', name: t('Petravex', 'بتراڤكس'), text: t('A UAE group, from building materials to fit-out.', 'مجموعة إماراتية، من مواد البناء حتى التجهيز.') },
    { id: 'bolupinar', shot: 'desktop-03', host: 'bolupinar', name: t('Bolu Pınar', 'بولو بينار'), text: t('Turkish spring water, from the source to the table in Kuwait.', 'مياه ينابيع تركية، من المصدر حتى المائدة في الكويت.') },
    { id: 'maash', shot: 'desktop-01', host: 'maash', name: t('Maash', 'معاش'), text: t('A furniture draftsman’s portfolio, from sketch to cut-ready panels.', 'معرض مصمم أثاث، من الرسم حتى الألواح الجاهزة للقص.') },
    { id: 'dwiptech', shot: 'desktop-02', host: 'dwiptech', name: t('DWIP Tech', 'DWIP Tech'), text: t('A technology studio, introduced on one page.', 'شركة تقنية تعرّف بنفسها في صفحة واحدة.') },
  ],
}

/* ── About ── */
export const story = {
  eyebrow: t('About', 'عني'),
  title: t('My story', 'قصتي'),
  intro: t(
    'I like products that disappear into someone’s day — a teacher marking a whole circle in ten seconds, a shop owner who never has to learn what a database is. I take an idea all the way: data, interface, server. Then I stay after launch to fix what only real people find.',
    'أحب المنتجات التي تذوب في يوم صاحبها — أستاذ يسجّل حلقة كاملة في عشر ثوانٍ، وصاحب محل لا يحتاج أن يعرف ما هي قاعدة البيانات. آخذ الفكرة حتى آخرها: البيانات والواجهة والخادم. ثم أبقى بعد الإطلاق لأصلح ما لا يكتشفه إلا الناس.',
  ),
  facts: [
    { k: t('Based in', 'المكان'), v: t('Al-Qatifa, Syria', 'القطيفة، سوريا') },
    { k: t('Works', 'العمل'), v: t('Remotely, worldwide', 'عن بُعد، مع أي بلد') },
    { k: t('Languages', 'اللغات'), v: t('Arabic, English', 'العربية، الإنجليزية') },
    { k: t('Stack', 'التقنيات'), v: t('Laravel · React · Next.js · NestJS · Flutter', 'Laravel · React · Next.js · NestJS · Flutter') },
  ],
  chapters: [
    {
      icon: 'pin' as IconKey,
      tag: t('Home', 'البداية'),
      title: t('Al-Qatifa, Syria', 'القطيفة، سوريا'),
      text: t('Where I live and work. Everything on this page was built from here.', 'هنا أعيش وأعمل. كل ما في هذه الصفحة بُني من هنا.'),
    },
    {
      icon: 'browsers' as IconKey,
      tag: t('First pages', 'أول الصفحات'),
      title: t('Websites that tell a story', 'مواقع تحكي قصة'),
      text: t(
        'Brand sites — from a UAE building group to a Turkish water brand in Kuwait — taught me pacing, motion and how a page should feel.',
        'مواقع لعلامات تجارية — من مجموعة بناء إماراتية إلى علامة مياه تركية في الكويت — علّمتني الإيقاع والحركة وكيف يجب أن تُحسّ الصفحة.',
      ),
    },
    {
      icon: 'database' as IconKey,
      tag: t('Systems', 'الأنظمة'),
      title: t('Software that runs a business', 'برمجيات تدير عملاً كاملاً'),
      text: t(
        'Accounting, ISP operations and team workspaces — where every number has to trace back to its record.',
        'محاسبة وتشغيل مزودي إنترنت ومساحات عمل للفرق — حيث يجب أن يعود كل رقم إلى سجله.',
      ),
    },
    {
      icon: 'phone' as IconKey,
      tag: t('Phone-first', 'الهاتف أولاً'),
      title: t('Arabic apps people open daily', 'تطبيقات عربية تُفتح كل يوم'),
      text: t(
        'Almostfa runs whole Quran circles from one phone — offline, in light and dark, on the web and Android.',
        'المصطفى يدير حلقات القرآن من هاتف واحد — دون اتصال، بوضعين فاتح وداكن، على الويب وأندرويد.',
      ),
    },
    {
      icon: 'robot' as IconKey,
      tag: t('AI', 'الذكاء الاصطناعي'),
      title: t('Agents inside real workflows', 'وكلاء داخل سير عمل حقيقي'),
      text: t(
        'AI that works inside the product and respects its permissions, like the NIRSO assistant that works with a team’s tasks over MCP.',
        'ذكاء اصطناعي يعمل داخل المنتج ويحترم صلاحياته، مثل مساعد نيرسو الذي يتعامل مع مهام الفريق عبر MCP.',
      ),
    },
    {
      icon: 'rocket' as IconKey,
      tag: t('Now', 'الآن'),
      title: t('Building the next one', 'أبني المنتج التالي'),
      text: t('Working remotely with teams anywhere, in small releases you can try as they take shape.', 'أعمل عن بُعد مع فرق من أي مكان، بإصدارات صغيرة تجربها وهي تتشكل.'),
    },
  ],
}

export const build = {
  eyebrow: t('What I build', 'ماذا أبني'),
  title: t('From the database to the last pixel.', 'من قاعدة البيانات حتى آخر بكسل.'),
  items: [
    { icon: 'database' as IconKey, title: t('Business systems', 'أنظمة الأعمال'), text: t('Accounting, operations and CRM where every number traces back to its record.', 'محاسبة وتشغيل وإدارة عملاء، كل رقم فيها يعود إلى سجله.') },
    { icon: 'phone' as IconKey, title: t('Mobile apps', 'تطبيقات الجوال'), text: t('Flutter and React apps for daily use, including offline work and Android releases.', 'تطبيقات Flutter وReact للاستخدام اليومي، تعمل دون اتصال وتصدر على أندرويد.') },
    { icon: 'robot' as IconKey, title: t('AI features', 'ميزات الذكاء الاصطناعي'), text: t('Agents, retrieval and assistants wired into a real workflow, with cost and quality in view.', 'وكلاء واسترجاع معرفة ومساعدون داخل سير عمل حقيقي، مع حساب التكلفة والجودة.') },
    { icon: 'servers' as IconKey, title: t('APIs and backends', 'الخوادم والواجهات البرمجية'), text: t('Laravel and NestJS services with clear permissions, tenancy and integrations.', 'خدمات Laravel وNestJS بصلاحيات واضحة وتعدد مستأجرين وتكاملات.') },
    { icon: 'translate' as IconKey, title: t('Arabic-first interfaces', 'واجهات عربية أولاً'), text: t('Right-to-left layouts and typography designed as carefully as the English.', 'تخطيط من اليمين إلى اليسار وخطوط مصممة بعناية الإنجليزية نفسها.') },
    { icon: 'cloud' as IconKey, title: t('Deployment', 'النشر والتشغيل'), text: t('Docker, CI/CD and servers set up as part of the build, not after it.', 'Docker وCI/CD والخوادم جزء من البناء، لا خطوة بعده.') },
  ],
}

export const process = {
  eyebrow: t('How I work', 'طريقة العمل'),
  title: t('Small releases you can try.', 'إصدارات صغيرة تجربها بنفسك.'),
  steps: [
    { icon: 'search' as IconKey, title: t('Understand', 'نفهم'), text: t('Who uses it, what they need to get done, and what a good first release looks like.', 'من سيستخدمه، وماذا يحتاج أن ينجز، وكيف يبدو أول إصدار جيد.') },
    { icon: 'compass' as IconKey, title: t('Plan', 'نخطط'), text: t('Data, roles, integrations and the path to production, so the foundation holds.', 'البيانات والأدوار والتكاملات وطريق النشر، حتى يتحمل الأساس ما بعده.') },
    { icon: 'code' as IconKey, title: t('Build', 'نبني'), text: t('Working features in short cycles. You use the product while it takes shape.', 'ميزات تعمل في دورات قصيرة. تستخدم المنتج وهو يتشكل.') },
    { icon: 'rocket' as IconKey, title: t('Ship and stay', 'نطلق ونبقى'), text: t('I deploy it, watch it in real use, and fix what only real use reveals.', 'أنشره، وأراقبه في الاستخدام الفعلي، وأصلح ما لا يظهر إلا مع الناس.') },
  ],
}

export const contact = {
  eyebrow: t('Contact', 'تواصل'),
  title: t('Have something to build?', 'عندك شيء تريد بناءه؟'),
  lede: t('Tell me what it is, who it’s for and when you need it. I reply to every message.', 'أخبرني ما هو، ولمن، ومتى تحتاجه. أرد على كل رسالة.'),
  email: t('Email me', 'راسلني'),
  copy: t('Copy address', 'انسخ العنوان'),
  copied: t('Copied', 'تم النسخ'),
  place: t('Al-Qatifa, Syria', 'القطيفة، سوريا'),
  time: t('local time', 'بالتوقيت المحلي'),
}
