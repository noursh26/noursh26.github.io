/* Arabic mirror of content.ts — written in Levantine, not translated MSA:
   short declaratives, terminal full stops, numbered sections,
   no superlatives, no emoji, no exclamation marks. */

export const nav = [
  { id: 'profile', label: 'عني', no: '01' },
  { id: 'method', label: 'كيف بشتغل', no: '02' },
  { id: 'build', label: 'شو ببني', no: '03' },
  { id: 'work', label: 'شغلي', no: '04' },
  { id: 'principles', label: 'بشو بؤمن', no: '05' },
  { id: 'difference', label: 'ليش أنا', no: '06' },
  { id: 'invitation', label: 'نبدأ مشروعك', no: '07' },
]

export const hero = {
  lines: ['برامج بتشتغل،', 'من الألف للياء،', 'على إيد نور الدين.'],
  cue: 'اقرأ عني',
}

/* Stack names stay Latin — they are product names, not copy. */
export const marquee = [
  'Laravel 12.',
  'Livewire 3.',
  'Flutter.',
  'MySQL. Redis.',
  'Docker. CI/CD.',
  'Claude API.',
  'Tailwind CSS.',
  'عربي RTL، من أساسو.',
]

export const profile = {
  no: '01',
  kicker: 'عني',
  panels: [
    {
      no: '01',
      title: ['طالب سنة أولى،', 'وبشحن متل المحترفين.'],
      text: 'بدرس هندسة حاسوب، بس بفضّل الكود اللي بينزل إنتاج على شرايح المحاضرات.',
      image: 'assets/profile/p1-engineer.webp',
    },
    {
      no: '02',
      title: ['فل ستاك،', 'وعالطبيعة.'],
      text: 'باك إند بـ Laravel، واجهات Livewire، تطبيقات Flutter — والسيرفر اللي كله شغال عليه.',
      image: 'assets/profile/p2-fullstack.webp',
    },
    {
      no: '03',
      title: ['عربي لغتي،', 'وإنجليزي تمام.'],
      text: 'واجهات RTL ومنتجات عربية بتنبني كإنها الأصل، مو إضافة بالآخر.',
      image: 'assets/profile/p3-arabic.webp',
    },
    {
      no: '04',
      title: ['ذكاء اصطناعي', 'جوا الشغل.'],
      text: 'ميزات Claude جوا المنتج نفسو — والتسليم حولها مدعوم ذكاء اصطناعي كمان.',
      image: 'assets/profile/p4-ai.webp',
    },
    {
      no: '05',
      title: ['عن بُعد،', 'ومسؤول.'],
      text: 'بشتغل من القطيفة، سوريا — مع عملاء بأي بلد. بتتابع التقدم من الكوميتات.',
      image: 'assets/profile/p5-remote.webp',
    },
  ],
  cta: 'شوف كيف بشتغل',
  ctaTarget: 'method',
}

export const method = {
  no: '02',
  kicker: 'كيف بشتغل',
  title: 'أربع خطوات. نظام واحد مربوط ببعضو.',
  steps: ([
    {
      no: '01', title: 'بسمع.',
      text: 'المشروع بيبدأ من النتيجة، مو من لائحة ميزات. بنسأل ليش لحتى نوصل عليها.',
      image: 'assets/method/m1-listen.webp',
    },
    {
      no: '02', title: 'برسم البنية.',
      text: 'السكيما، تعدد الشركات، الطوابير، هدف النشر — بتنحسم قبل أول سطر كود.',
      image: 'assets/method/m2-architect.webp',
    },
    {
      no: '03', title: 'ببني.',
      text: 'كوميتات صغيرة بتنراجع بسهولة. بتشوف المنتج عم يكبّر قدامك، مو تقرير حالة.',
      image: 'assets/method/m3-build.webp',
    },
    {
      no: '04', title: 'بشحن وبضل.',
      text: 'من الـ DNS للـ Docker لآخر بَغ — الشغل بيخلص لما يشتغل، مو لما ينعرض.',
      image: 'assets/method/m4-ship.webp',
    },
  ] as { no: string; title: string; text: string; image: string; crop?: Record<string, string> }[]),
  hint: 'مرّر لتوزّع البطاقات',
}

export const statement = {
  lines: ['بكتب البرامج', 'متل ما لازم', 'تنبني — مدروسة،', 'ومعمولة لتعيش.'],
  foot: 'الفهم قبل الكود، والنشر جزء من المهمة. الترتيب شرط، مو تفضيل.',
}

export const build = {
  no: '03',
  kicker: 'شو ببني',
  units: [
    { no: '01', name: 'منصات SaaS',       line: 'منتجات متعددة الشركات بتفوتر وبتكبّر.',    image: 'assets/units/unit-saas.webp' },
    { no: '02', name: 'تطبيقات موبايل',    line: 'تطبيقات Flutter بتحسها طبيعية.',            image: 'assets/units/unit-mobile.webp' },
    { no: '03', name: 'واجهات وباك إند',   line: 'الطبقة اللي كل شي واقف عليها.',            image: 'assets/units/unit-api.webp' },
    { no: '04', name: 'لوحات إدارة',       line: 'لوحات العالم بتستخدمها فعلاً.',            image: 'assets/units/unit-dashboard.webp' },
    { no: '05', name: 'صفحات هبوط',        line: 'انطباع أول بيحوّل.',                      image: 'assets/units/unit-landing.webp' },
    { no: '06', name: 'وكلاء AI',          line: 'منتجات فيها عقل جواتها.',                  image: 'assets/units/unit-ai.webp' },
    { no: '07', name: 'تجارة إلكترونية',   line: 'متاجر ومحافظ ودفع بيكمّل الصفقة.',        image: 'assets/units/unit-commerce.webp' },
  ],
}

export const work = {
  no: '04',
  kicker: 'شغلي',
  title: 'اللي انشحن فعلاً.',
  lede: 'منتجات حقيقية. مستخدمين حقيقيين. تشغيل حقيقي.',
  items: [
    {
      no: '01', title: 'Estratijiya AI.',
      text: 'منصة SaaS متعددة الشركات بتعطي كل شركة وكيل خدمة عملاء ذكي — ودجت وواتساب وتيليغرام، على قاعدة معرفة RAG.',
      image: 'assets/work/w4-estratijiya.webp',
    },
    {
      no: '02', title: 'SalesFlow AI.',
      text: 'CRM مبيعات متعدد الشركات بتديرو وكلاء AI — ليدز وصفقات وعروض أسعار وقنوات حيّة بلوحة وحدة.',
      image: 'assets/work/w1-salesflow.webp',
    },
    {
      no: '03', title: 'Relinka.',
      text: 'أرشيف مشفّر متعدد الشركات — تخزين بواجهة متل Drive، تصنيف واستخراج بالـ AI، بحث دلالي، ونقطة MCP للوكلاء.',
      image: 'assets/work/w7-relinka.webp',
    },
    {
      no: '04', title: 'Fahrast AI.',
      text: 'منصة عربية بتجمع آلاف الكتب والمخطوطات ببيئة قراءة وبحث ذكية.',
      image: 'assets/work/w8-fahrast.webp',
    },
    {
      no: '05', title: 'Alkhyr.',
      text: 'نظام كامل لإدارة الجمعيات الخيرية — حملات ومستفيدين واشتراكات وبطاقات مطبوعة، العملية من أولها لآخرا.',
      image: 'assets/work/w9-alkhyr.webp',
    },
    {
      no: '06', title: 'm3aak.com.',
      text: 'منصة تجارة إلكترونية متعددة الأدوار — متاجر ومحافظ رقمية وطلبات بتتبّع توصيل مباشر، بواجهة عربية RTL.',
      image: 'assets/work/w2-m3aak.webp',
    },
    {
      no: '07', title: 'Almustfa.',
      text: 'نظام كامل لإدارة الحلقات القرآنية — تسميع ونقاط تحفيزية وسوق مكافآت ببطاقات QR للطلاب.',
      image: 'assets/work/w10-almustfa.webp',
    },
    {
      no: '08', title: 'Global Football AI.',
      text: 'تعليم كروي احترافي وتحليل أداء بالذكاء الاصطناعي وشهادات — منصة ويب وتطبيق أندرويد.',
      image: 'assets/work/w11-gfaa.webp',
    },
    {
      no: '09', title: 'WISP.',
      text: 'نظام كامل لإدارة مزوّد إنترنت — اشتراكات وفوترة وتركيبات وصيانة ومخزون ومحاسبة ورواتب.',
      image: 'assets/work/w12-wisp.webp',
    },
    {
      no: '10', title: 'NIRSO.',
      text: 'نظام الإدارة الداخلي لشركة Petravex — هوية مركزية وحدة، ومشاريع وأتمتة، وأرشيف مستندات.',
      image: 'assets/work/w13-nirso.webp',
    },
    {
      no: '11', title: 'Arkani.',
      text: 'رفيق المسلم مبني بـ Flutter: مواقيت الصلاة، أذكار، مكتشف مساجد، إشعارات.',
      image: 'assets/work/w3-arkani.webp',
    },
    {
      no: '12', title: 'Maash.art.',
      text: 'بورتفوليو سينمائي ثنائي اللغة لرسّام أثاث بارع — مرّر وبيرسم حالو.',
      image: 'assets/work/w6-maash.webp',
    },
  ],
  close: 'وكل هاد — انشحن لحالي. من لابتوب واحد.',
}

export const principles = {
  no: '05',
  kicker: 'بشو بؤمن',
  lines: [
    'كل منتج نظام.',
    'وكل نظام لازم ينقاس.',
    'وكل واجهة لازم تتقرى طبيعي — بالاتجاهين.',
    'وكل بناء لازم يعيش بعد أول نشر.',
  ],
  values: ['وضوح', 'إتقان', 'ملكية', 'زخم', 'موثوقية', 'صدق'],
}

export const difference = {
  no: '06',
  kicker: 'ليش أنا',
  title: 'مبني لبعد البريف.',
  rows: [
    { title: 'من الأول للآخر، فعلاً.', text: 'من السكيما للنشر للـ DNS — ولا شي بيناتهم رح ينزل عليك.', image: 'assets/difference/d1-endtoend.webp' },
    { title: 'لغتين، اتنيناتن أصليات.', text: 'عربي RTL وإنجليزي LTR، متصممين ند لند.', image: 'assets/difference/d2-bilingual.webp' },
    { title: 'AI جوا، مو ملزوق فوق.', text: 'ميزات Claude API وين ما بترجع قيمة — وأدوات ذكاء بكيفية التسليم.', image: 'assets/difference/d3-ai.webp' },
    { title: 'تصميم بينشحن.', text: 'واجهات بمستوى المواقع اللي بتعجبك، مو قالب اللوحات الجاهز.', image: 'assets/difference/d4-design.webp' },
    { title: 'التشغيل جزء من الصفقة.', text: 'Docker والـ CI والسيرفر اللي بيشغّل كل شي — بييجوا مع البناء.', image: 'assets/difference/d5-ops.webp' },
    { title: 'رقم قبل. رقم بعد.', text: 'التقدم بينقاس بالكوميتات المشحونة والميزات الشغالة.', image: 'assets/difference/d6-measure.webp' },
  ],
}

export const invitation = {
  no: '07',
  kicker: 'بلّش من هون',
  title: 'دورة وحدة. حديث واحد.',
  lede: 'مش متأكد من وين تبدأ؟ دوّر القرص — اللي بيوقف عليه هو أول خطوة منطقية. اطلبا ومنبدأ منها.',
  hint: 'اسحب القرص، أو كبس ليدور.',
  prizes: [
    { label: 'مكالمة تعارف', detail: 'نص ساعة عن شو بدك تبني، وإذا أنا الإيد المناسبة إله.' },
    { label: 'بناء MVP', detail: 'أصغر نسخة من منتجك بتشيل مستخدمين حقيقيين.' },
    { label: 'صفحة هبوط', detail: 'انطباع أول بيحوّل — متصممة ومبنية ومنشورة.' },
    { label: 'مهمة إنقاذ', detail: 'مشروع واقف — بنراجعو ومنرجعو يمشي على رجليه.' },
    { label: 'أتمتة', detail: 'الشغل اليدوي جوا شغلك، بيتحوّل لنظام.' },
    { label: 'عقد شهري', detail: 'إيدين ثابتين على منتجك، شهر ورا شهر.' },
  ],
  claim: 'افتح الحديث',
  again: 'دوّر مرة تانية',
}

export const contact = {
  no: '08',
  kicker: 'خطوتك الجاية',
  title: 'بلّش برسالة.',
  text: 'خبرني شو عم تبني، وبرجعلك بكيف رح اشتغل عليه.',
  email: 'nour@nour.email',
  cta: 'راسلني',
  github: 'https://github.com/noursh26',
  site: 'https://noursh.pro',
  location: 'القطيفة، سوريا — عن بُعد مع العالم',
}

export const ui = {
  docTitle: 'نور الدين شحادة — كود له وجهة.',
  preloaderWord: 'كود له وجهة.',
  skipLink: 'روح للمحتوى',
  menuOpen: 'القائمة',
  menuClose: 'سكّر',
  menuAria: 'القائمة',
  langSwitch: 'EN',
  getInTouch: 'تواصل',
  based: 'أنا بـ',
  explore: 'تفرّج',
  startConversation: 'بلّش حديث',
  seeTheCode: 'شوف الكود على GitHub',
  scrollCue: 'مرّر لتحت',
  statementAria: 'من وين نبدأ',
  dialAria: 'قرص فيه ست خيارات شغل',
  valuesAria: 'قيمي',
  goCursor: 'روح',
  yours: 'إلك',
  turning: 'عم يدور…',
  spinDial: 'دوّر القرص',
  mailtoSubject: 'استفسار عن مشروع — {prize}',
  mailtoBody: 'دوّرت القرص ووقف على {prize}.\n\nشو عم ببني:\nالتوقيت:\n',
  footerLine: ['منتجك.', 'مبني ومشحون.'],
  copyright: '© {year} نور الدين شحادة · القطيفة',
  tagline: 'كود له وجهة. Code with direction.',
}
