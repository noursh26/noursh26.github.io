/* Arabic copy follows the same clear, professional voice as the English:
   concrete capabilities, concise sentences, and no unsupported claims. */

export const nav = [
  { id: 'profile', label: 'عني', no: '01' },
  { id: 'method', label: 'كيف أعمل', no: '02' },
  { id: 'build', label: 'ماذا أبني', no: '03' },
  { id: 'work', label: 'أعمال مختارة', no: '04' },
  { id: 'principles', label: 'ما أؤمن به', no: '05' },
  { id: 'difference', label: 'لماذا معي', no: '06' },
  { id: 'invitation', label: 'لنبدأ مشروعك', no: '07' },
]

export const hero = {
  lines: ['منتجات ذكاء اصطناعي.', 'من الفكرة إلى الإطلاق.', 'أنا نور الدين.'],
  cue: 'تعرّف عليّ',
}

/* Stack names stay Latin — they are product names, not copy. */
export const marquee = [
  'وكلاء ذكاء اصطناعي.',
  'استرجاع المعرفة RAG.',
  'تطوير متكامل.',
  'DevOps.',
  'Docker. CI/CD.',
  'أدوات تناسب المنتج.',
  'Claude API.',
  'العربية من الأساس.',
]

export const profile = {
  no: '01',
  kicker: 'عني',
  panels: [
    {
      no: '01',
      title: ['منتجك.', 'مسؤوليتي.'],
      text: 'أحوّل أفكار المنتجات إلى برمجيات تعمل، من البنية والواجهة إلى الإطلاق والمتابعة.',
      image: 'assets/profile/p1-engineer.webp',
    },
    {
      no: '02',
      title: ['الأداة المناسبة.', 'شريك تقني واحد.'],
      text: 'Laravel وNext.js وNestJS وReact وFlutter. أختار التقنية وفق مستخدمي المنتج واحتياجاته وخطة نموّه.',
      image: 'assets/profile/p2-fullstack.webp',
    },
    {
      no: '03',
      title: ['عربية بطبيعتها.', 'وإنجليزية بعناية.'],
      text: 'أصمّم العربية والإنجليزية معاً، مع اتجاه قراءة طبيعي وخطوط واضحة ودعم دقيق لواجهات RTL.',
      image: 'assets/profile/p3-arabic.webp',
    },
    {
      no: '04',
      title: ['ذكاء اصطناعي هادف.', 'للاستخدام الفعلي.'],
      text: 'وكلاء ذكيون واسترجاع معرفة وميزات LLM مرتبطة بسير عمل حقيقي، مع تقييم للجودة ومراقبة للتشغيل.',
      image: 'assets/profile/p4-ai.webp',
    },
    {
      no: '05',
      title: ['عن بُعد.', 'بتواصل واضح.'],
      text: 'من القطيفة، سوريا، أعمل مع عملاء حول العالم. أولويات واضحة، وتغييرات قابلة للمراجعة، وتقدّم يمكنك متابعته.',
      image: 'assets/profile/p5-remote.webp',
    },
  ],
  cta: 'اكتشف طريقة عملي',
  ctaTarget: 'method',
}

export const method = {
  no: '02',
  kicker: 'كيف أعمل',
  title: 'من أول حديث إلى منتج يعمل.',
  steps: ([
    {
      no: '01', title: 'أفهم.',
      text: 'نحدّد لمن نبني المنتج، وما المشكلة التي يحلّها، وكيف يبدو نجاح الإصدار الأول.',
      image: 'assets/method/m1-listen.webp',
    },
    {
      no: '02', title: 'أخطّط.',
      text: 'أضع خريطة البيانات والتكاملات والصلاحيات ومسار النشر، لتدعم البنية ما يأتي بعدها.',
      image: 'assets/method/m2-architect.webp',
    },
    {
      no: '03', title: 'أبني.',
      text: 'إصدارات صغيرة قابلة للمراجعة تبقي العمل واضحاً. تجرّب المنتج وتشارك ملاحظاتك أثناء بنائه.',
      image: 'assets/method/m3-build.webp',
    },
    {
      no: '04', title: 'أطلق. وأتابع.',
      text: 'أتولّى النشر، وأراجع التجربة الحيّة، وأتابع المشكلات التي يكشفها الاستخدام الفعلي.',
      image: 'assets/method/m4-ship.webp',
    },
  ] as { no: string; title: string; text: string; image: string; crop?: Record<string, string> }[]),
  hint: 'مرّر لاستكشاف الخطوات',
}

export const statement = {
  lines: ['غاية واضحة.', 'بناء مدروس.', 'ومنتج جاهز', 'للعالم الحقيقي.'],
  foot: 'نفهم المشكلة. نبني الأساس المناسب. ونتعلّم من المنتج عندما يبدأ الناس باستخدامه.',
}

export const build = {
  no: '03',
  kicker: 'ماذا أبني',
  units: [
    { no: '01', name: 'وكلاء AI',          line: 'وكلاء واسترجاع معرفة مرتبطان بسير عملك.',              image: 'assets/units/unit-ai.webp' },
    { no: '02', name: 'منصات SaaS',        line: 'تعدد شركات واشتراكات وبنية قابلة للنمو.', image: 'assets/units/unit-saas.webp' },
    { no: '03', name: 'تطبيقات موبايل',    line: 'تجارب Flutter مدروسة للاستخدام اليومي.',        image: 'assets/units/unit-mobile.webp' },
    { no: '04', name: 'واجهات API وخوادم',   line: 'بيانات وصلاحيات وتكاملات موثوقة.',        image: 'assets/units/unit-api.webp' },
    { no: '05', name: 'لوحات إدارة',       line: 'صورة واضحة للعمليات اليومية المعقّدة.',        image: 'assets/units/unit-dashboard.webp' },
    { no: '06', name: 'تجارة إلكترونية',   line: 'متاجر وطلبات ومحافظ ومسارات دفع مترابطة.',    image: 'assets/units/unit-commerce.webp' },
    { no: '07', name: 'صفحات هبوط',        line: 'رسالة واضحة وخطوة تواصل مدروسة.',                  image: 'assets/units/unit-landing.webp' },
  ],
}

export const work = {
  no: '04',
  kicker: 'أعمال مختارة',
  title: 'أفكار أصبحت منتجات.',
  lede: 'منصات ذكاء اصطناعي وأنظمة أعمال وتجارب تبدأ بالعربية.',
  items: [
    {
      no: '01', title: 'Estratijiya AI.',
      text: 'منصة SaaS متعددة الشركات تربط وكلاء خدمة العملاء بقاعدة معرفة RAG، عبر الموقع وواتساب وتيليغرام.',
      image: 'assets/work/w4-estratijiya.webp',
    },
    {
      no: '02', title: 'SalesFlow AI.',
      text: 'مساحة مبيعات تجمع العملاء المحتملين والصفقات وعروض الأسعار وقنوات التواصل، مع وكلاء AI لدعم سير العمل.',
      image: 'assets/work/w1-salesflow.webp',
    },
    {
      no: '03', title: 'Relinka.',
      text: 'مساحة مستندات مشفّرة تضم تصنيفاً واستخراج بيانات بالذكاء الاصطناعي، وبحثاً دلالياً، ووصول MCP للوكلاء.',
      image: 'assets/work/w7-relinka.webp',
    },
    {
      no: '04', title: 'Fahrast AI.',
      text: 'منصة عربية للقراءة والبحث تجمع الكتب والمخطوطات في بيئة واحدة للاكتشاف والبحث الذكي.',
      image: 'assets/work/w8-fahrast.webp',
    },
    {
      no: '05', title: 'Alkhyr.',
      text: 'منصة لإدارة العمل الخيري تجمع الحملات والمستفيدين والاشتراكات والبطاقات المطبوعة في نظام واحد.',
      image: 'assets/work/w9-alkhyr.webp',
    },
    {
      no: '06', title: 'm3aak.com.',
      text: 'منصة تجارة إلكترونية متعددة الأدوار، تجمع المتاجر والمحافظ الرقمية والطلبات وتتبع التوصيل، بواجهة عربية RTL.',
      image: 'assets/work/w2-m3aak.webp',
    },
    {
      no: '07', title: 'Almustfa.',
      text: 'نظام لإدارة الحلقات القرآنية، يربط سجل التسميع بالنقاط التحفيزية وسوق المكافآت وبطاقات QR للطلاب.',
      image: 'assets/work/w10-almustfa.webp',
    },
    {
      no: '08', title: 'Global Football AI.',
      text: 'منصة ويب وتطبيق أندرويد للتعليم الكروي وتحليل الأداء بالذكاء الاصطناعي وإصدار الشهادات.',
      image: 'assets/work/w11-gfaa.webp',
    },
    {
      no: '09', title: 'WISP.',
      text: 'نظام تشغيل لمزوّد إنترنت يجمع الاشتراكات والفوترة والتركيب والصيانة والمخزون والمحاسبة والرواتب.',
      image: 'assets/work/w12-wisp.webp',
    },
    {
      no: '10', title: 'NIRSO.',
      text: 'نظام العمليات الداخلي لشركة Petravex، بهوية مركزية وإدارة للمشاريع والأتمتة وأرشفة المستندات.',
      image: 'assets/work/w13-nirso.webp',
    },
    {
      no: '11', title: 'Arkani.',
      text: 'تطبيق Flutter يضم مواقيت الصلاة والأذكار والبحث عن المساجد والإشعارات في تجربة واحدة.',
      image: 'assets/work/w3-arkani.webp',
    },
    {
      no: '12', title: 'Maash.art.',
      text: 'معرض أعمال سينمائي ثنائي اللغة لرسّام أثاث، تتكشّف فيه الرسومات مع التمرير.',
      image: 'assets/work/w6-maash.webp',
    },
  ],
  close: 'شريك تقني واحد، من أول قرار إلى المنتج المنشور.',
}

export const principles = {
  no: '05',
  kicker: 'ما أؤمن به',
  lines: [
    'كل منتج منظومة مترابطة.',
    'الملاحظات المفيدة توجّه الإصدار التالي.',
    'الذكاء الاصطناعي يحلّ مشكلة عملية.',
    'الواجهة الجيدة تُقرأ بطبيعية في الاتجاهين.',
  ],
  values: ['وضوح', 'إتقان', 'مسؤولية', 'تقدّم', 'موثوقية', 'صدق'],
}

export const difference = {
  no: '06',
  kicker: 'لماذا معي',
  title: 'شريك في المنتج بكل مراحله.',
  rows: [
    { title: 'مسؤولية مترابطة.', text: 'البنية والواجهة والخادم والنشر تبقى مترابطة مع شريك تقني واحد.', image: 'assets/difference/d1-endtoend.webp' },
    { title: 'لغتان. عناية واحدة.', text: 'عربية RTL وإنجليزية LTR، بعناية متساوية في التصميم وتجربة الاستخدام.', image: 'assets/difference/d2-bilingual.webp' },
    { title: 'دور واضح للذكاء الاصطناعي.', text: 'وكلاء وRAG وأتمتة لخدمة حاجة محدّدة، مع مراعاة الجودة وتكلفة التشغيل.', image: 'assets/difference/d3-ai.webp' },
    { title: 'عناية بكل واجهة.', text: 'تخطيط واضح واستجابة للشاشات وتفاعلات مدروسة تجعل المنتج أسهل في الاستخدام.', image: 'assets/difference/d4-design.webp' },
    { title: 'النشر جزء من التسليم.', text: 'Docker وCI/CD وإعداد الخوادم جزء من البناء، إلى جانب الكود الذي تشغّله.', image: 'assets/difference/d5-ops.webp' },
    { title: 'تقدّم قابل للمراجعة.', text: 'إصدارات صغيرة وميزات تعمل وأولويات واضحة تمنحك تقدّماً ملموساً للمراجعة.', image: 'assets/difference/d6-measure.webp' },
  ],
}

export const invitation = {
  no: '07',
  kicker: 'ابدأ من هنا',
  title: 'دورة واحدة. بداية حديث.',
  lede: 'استكشف نقطة بداية عبر القرص، ثم أخبرني بما تحتاجه. نختار نطاق العمل المناسب معاً.',
  hint: 'اسحب القرص، أو اضغط لتدويره.',
  prizes: [
    { label: 'مكالمة تعارف', detail: 'حديث لمدة 30 دقيقة عن فكرتك وأولوياتك ومدى ملاءمة العمل معاً.' },
    { label: 'منتج أولي', detail: 'أصغر نسخة من منتجك يمكن أن يستخدمها أشخاص حقيقيون.' },
    { label: 'صفحة هبوط', detail: 'صفحة مركّزة توضّح عرضك والخطوة التالية، من التصميم والبناء إلى النشر.' },
    { label: 'إنقاذ مشروع', detail: 'مراجعة مشروع متعثر وتحديد ما يلزم لإعادته إلى مسار واضح.' },
    { label: 'أتمتة', detail: 'تحويل المهام اليدوية المتكررة في عملك إلى سير عمل مؤتمت.' },
    { label: 'تجربة AI', detail: 'تجربة مدفوعة لمدة أسبوعين لبناء ميزة ذكاء اصطناعي داخل منتجك وتقييمها.' },
  ],
  claim: 'لنبدأ الحديث',
  again: 'دوّر مرة أخرى',
}

export const contact = {
  no: '08',
  kicker: 'خطوتك التالية',
  title: 'البداية برسالة.',
  text: 'شارك فكرتك والتحدّي الذي تواجهه والوقت المتاح. نحدّد معاً خطوة عملية للبدء.',
  email: 'nour@nour.email',
  cta: 'راسلني',
  github: 'https://github.com/noursh26',
  site: 'https://nourx.tech',
  location: 'القطيفة، سوريا — أعمل عن بُعد حول العالم',
}

export const ui = {
  docTitle: 'نور الدين شحادة — مهندس منتجات ذكاء اصطناعي.',
  preloaderWord: 'منتجات لها وجهة.',
  skipLink: 'انتقل إلى المحتوى',
  menuOpen: 'القائمة',
  menuClose: 'إغلاق',
  menuAria: 'القائمة',
  langSwitch: 'EN',
  getInTouch: 'تواصل',
  based: 'الموقع',
  explore: 'استكشف',
  startConversation: 'لنبدأ الحديث',
  seeTheCode: 'استكشف أعمالي على GitHub',
  scrollCue: 'انتقل إلى النبذة',
  statementAria: 'من أين نبدأ',
  dialAria: 'قرص يضم ست نقاط لبدء العمل',
  valuesAria: 'قيمي',
  goCursor: 'روح',
  yours: 'نقطة بداية',
  turning: 'يدور…',
  spinDial: 'دوّر القرص',
  mailtoSubject: 'استفسار عن مشروع — {prize}',
  mailtoBody: 'استكشفت القرص واخترت {prize}.\n\nما أريد بناءه:\nالتوقيت:\n',
  footerLine: ['منتجك.', 'من الفكرة إلى الإطلاق.'],
  copyright: '© {year} نور الدين شحادة · القطيفة',
  tagline: 'منتجات لها وجهة. Products with direction.',
}
