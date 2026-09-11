/* Arabic mirror of content.ts — same shape, same voice rules:
   short declaratives, terminal full stops, numbered sections,
   no superlatives, no emoji, no exclamation marks. */

export const nav = [
  { id: 'profile', label: 'الملف', no: '01' },
  { id: 'method', label: 'كيف أعمل', no: '02' },
  { id: 'build', label: 'ماذا أبني', no: '03' },
  { id: 'work', label: 'أعمال مختارة', no: '04' },
  { id: 'principles', label: 'مبادئي', no: '05' },
  { id: 'difference', label: 'لماذا أنا', no: '06' },
  { id: 'invitation', label: 'ابدأ مشروعاً', no: '07' },
]

export const hero = {
  lines: ['برمجيات تعمل،', 'من الألف إلى الياء،', 'على يد نور الدين.'],
  cue: 'اقرأ الملف',
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
  'عربي RTL، من الطراز الأول.',
]

export const profile = {
  no: '01',
  kicker: 'الملف',
  panels: [
    {
      no: '01',
      title: ['طالب سنة أولى،', 'يشحن مثل المحترفين.'],
      text: 'طالب هندسة حاسوب يفضّل كود الإنتاج على شرائح المحاضرات.',
      image: 'assets/profile/p1-engineer.webp',
    },
    {
      no: '02',
      title: ['فل ستاك،', 'فعلياً.'],
      text: 'خلفيات Laravel، واجهات Livewire، تطبيقات Flutter — والخادم الذي تعمل عليه كلها.',
      image: 'assets/profile/p2-fullstack.webp',
    },
    {
      no: '03',
      title: ['عربي أصيل،', 'إنجليزي بطلاقة.'],
      text: 'واجهات RTL ومنتجات عربية تُبنى من الطراز الأول، لا كفكرة لاحقة.',
      image: 'assets/profile/p3-arabic.webp',
    },
    {
      no: '04',
      title: ['ذكاء اصطناعي', 'داخل سير العمل.'],
      text: 'ميزات مدعومة بـ Claude داخل المنتجات — وتسليم مدعوم بالذكاء الاصطناعي حولها.',
      image: 'assets/profile/p4-ai.webp',
    },
    {
      no: '05',
      title: ['عن بُعد، غير متزامن،', 'ومسؤول.'],
      text: 'أعمل من القطيفة، سوريا — لعملاء في أي مكان. تقدّم تقرؤه من المستودع.',
      image: 'assets/profile/p5-remote.webp',
    },
  ],
  cta: 'شاهد كيف أعمل',
  ctaTarget: 'method',
}

export const method = {
  no: '02',
  kicker: 'كيف أعمل',
  title: 'أربع خطوات. نظام واحد متصل.',
  steps: ([
    {
      no: '01', title: 'أصغي.',
      text: 'يبدأ المشروع من النتيجة، لا من قائمة الميزات. نسأل لماذا حتى نصل إليها.',
      image: 'assets/method/m1-listen.webp',
    },
    {
      no: '02', title: 'أصمّم البنية.',
      text: 'المخطط، تعدد المستأجرين، الطوابير، هدف النشر — تُحسم قبل أول سطر كود.',
      image: 'assets/method/m2-architect.webp',
    },
    {
      no: '03', title: 'أبني.',
      text: 'بكوميتات صغيرة قابلة للمراجعة. تشاهد المنتج يكبر، لا تقرير حالة.',
      image: 'assets/method/m3-build.webp',
    },
    {
      no: '04', title: 'أشحن وأبقى.',
      text: 'من DNS إلى Docker إلى آخر إصلاح — ينتهي العمل حين يعمل، لا حين يُعرض.',
      image: 'assets/method/m4-ship.webp',
    },
  ] as { no: string; title: string; text: string; image: string; crop?: Record<string, string> }[]),
  hint: 'مرّر لتوزيع البطاقات',
}

export const statement = {
  lines: ['أكتب البرمجيات', 'كما يجب', 'أن تُبنى — مُقاسة،', 'ومصنوعة لتدوم.'],
  foot: 'الاستكشاف قبل الكود، والنشر جزء من المهمة. الترتيب شرط، لا تفضيل.',
}

export const build = {
  no: '03',
  kicker: 'ماذا أبني',
  units: [
    { no: '01', name: 'منصات SaaS',       line: 'منتجات متعددة المستأجرين تُفوتر وتتوسع.', image: 'assets/units/unit-saas.webp' },
    { no: '02', name: 'تطبيقات جوال',      line: 'تطبيقات Flutter تبدو أصيلة.',            image: 'assets/units/unit-mobile.webp' },
    { no: '03', name: 'واجهات وخلفيات',    line: 'الطبقة التي يقف عليها كل شيء.',          image: 'assets/units/unit-api.webp' },
    { no: '04', name: 'لوحات تحكم',        line: 'لوحات إدارة يستخدمها الناس فعلاً.',      image: 'assets/units/unit-dashboard.webp' },
    { no: '05', name: 'صفحات هبوط',        line: 'انطباعات أولى تُحوّل.',                 image: 'assets/units/unit-landing.webp' },
    { no: '06', name: 'وكلاء ذكاء',        line: 'منتجات بعقل مدمج.',                      image: 'assets/units/unit-ai.webp' },
    { no: '07', name: 'تجارة إلكترونية',   line: 'متاجر ومحافظ ودفع يُتم الصفقة.',        image: 'assets/units/unit-commerce.webp' },
  ],
}

export const work = {
  no: '04',
  kicker: 'أعمال مختارة',
  title: 'ما شُحن فعلاً.',
  lede: 'منتجات حقيقية. مستخدمون حقيقيون. تشغيل حقيقي.',
  items: [
    {
      no: '01', title: 'Estratijiya AI.',
      text: 'منصة SaaS متعددة المستأجرين تمنح كل شركة وكيل خدمة عملاء ذكي — ودجت وواتساب وتيليغرام، على قاعدة معرفة RAG.',
      image: 'assets/work/w4-estratijiya.webp',
    },
    {
      no: '02', title: 'SalesFlow AI.',
      text: 'CRM مبيعات متعدد الشركات تديره وكلاء ذكاء اصطناعي — عملاء وصفقات وعروض أسعار وقنوات حية في لوحة واحدة.',
      image: 'assets/work/w1-salesflow.webp',
    },
    {
      no: '03', title: 'Relinka.',
      text: 'أرشيف مشفّر متعدد الشركات — تخزين بواجهة تشبه Drive، تصنيف واستخراج بالذكاء الاصطناعي، بحث دلالي، ونقطة MCP للوكلاء.',
      image: 'assets/work/w7-relinka.webp',
    },
    {
      no: '04', title: 'Fahrast AI.',
      text: 'منصة عربية تجمع آلاف الكتب والمخطوطات في بيئة قراءة وبحث ذكية.',
      image: 'assets/work/w8-fahrast.webp',
    },
    {
      no: '05', title: 'Alkhyr.',
      text: 'منصة متكاملة لإدارة الجمعيات الخيرية — حملات ومستفيدون واشتراكات وبطاقات مطبوعة، العملية كاملة.',
      image: 'assets/work/w9-alkhyr.webp',
    },
    {
      no: '06', title: 'm3aak.com.',
      text: 'منصة تجارة إلكترونية متعددة الأدوار — متاجر ومحافظ رقمية وطلبات بتتبع توصيل مباشر، بواجهة عربية RTL.',
      image: 'assets/work/w2-m3aak.webp',
    },
    {
      no: '07', title: 'Almustfa.',
      text: 'نظام متكامل لإدارة الحلقات القرآنية — تسجيل تسميع ونقاط تحفيزية وسوق مكافآت ببطاقات QR للطلاب.',
      image: 'assets/work/w10-almustfa.webp',
    },
    {
      no: '08', title: 'Global Football AI.',
      text: 'تعليم كروي احترافي وتحليل أداء بالذكاء الاصطناعي وشهادات — منصة ويب وتطبيق أندرويد.',
      image: 'assets/work/w11-gfaa.webp',
    },
    {
      no: '09', title: 'WISP.',
      text: 'نظام متكامل لإدارة مزود خدمة الإنترنت — اشتراكات وفوترة وتركيبات وصيانة ومخزون ومحاسبة ورواتب.',
      image: 'assets/work/w12-wisp.webp',
    },
    {
      no: '10', title: 'NIRSO.',
      text: 'نظام الإدارة الداخلي لشركة Petravex — هوية مركزية واحدة، ومشاريع وأتمتة، وأرشيف مستندات.',
      image: 'assets/work/w13-nirso.webp',
    },
    {
      no: '11', title: 'Arkani.',
      text: 'تطبيق رفيق للمسلم بـ Flutter: مواقيت الصلاة، أذكار، مكتشف مساجد، إشعارات.',
      image: 'assets/work/w3-arkani.webp',
    },
    {
      no: '12', title: 'Maash.art.',
      text: 'بورتفوليو سينمائي ثنائي اللغة لرسّام أثاث بارع — مرّر فيرسم نفسه.',
      image: 'assets/work/w6-maash.webp',
    },
  ],
  close: 'وكل هذا — شُحن منفرداً. من لابتوب واحد.',
}

export const principles = {
  no: '05',
  kicker: 'ما أؤمن به',
  lines: [
    'كل منتج نظام.',
    'كل نظام يجب أن يُقاس.',
    'كل واجهة يجب أن تُقرأ طبيعياً — بالاتجاهين.',
    'كل بناء يجب أن ينجو من نشره الأول.',
  ],
  values: ['وضوح', 'إتقان', 'ملكية', 'زخم', 'موثوقية', 'صدق'],
}

export const difference = {
  no: '06',
  kicker: 'لماذا أنا',
  title: 'مبني لما بعد البريف.',
  rows: [
    { title: 'من البداية للنهاية، فعلاً.', text: 'من المخطط إلى النشر إلى DNS — لا شيء بينها عليك حمله.', image: 'assets/difference/d1-endtoend.webp' },
    { title: 'لغتان، من الطراز الأول.', text: 'عربي RTL وإنجليزي LTR، مصمّمتان كأنداد.', image: 'assets/difference/d2-bilingual.webp' },
    { title: 'ذكاء في الداخل، لا مضافاً.', text: 'ميزات Claude API حيث تعود بالقيمة — وأدوات ذكاء في طريقة التسليم.', image: 'assets/difference/d3-ai.webp' },
    { title: 'تصميم يُشحن.', text: 'واجهات بمعيار المواقع التي تعجبك، لا قالب اللوحات الافتراضي.', image: 'assets/difference/d4-design.webp' },
    { title: 'التشغيل مشمول.', text: 'Docker وCI والخادم الذي يعمل عليه — تأتي مع البناء.', image: 'assets/difference/d5-ops.webp' },
    { title: 'رقم قبل. رقم بعد.', text: 'التقدم يُقاس بالكوميتات المشحونة والميزات العاملة.', image: 'assets/difference/d6-measure.webp' },
  ],
}

export const invitation = {
  no: '07',
  kicker: 'ابدأ من هنا',
  title: 'دورة واحدة. محادثة واحدة.',
  lede: 'لست متأكداً من أين تبدأ؟ أدر القرص — ما يقف عليه خطوة أولى معقولة. اطلبها ونبدأ منها.',
  hint: 'اسحب القرص، أو اضغط لتدويره.',
  prizes: [
    { label: 'مكالمة استكشاف', detail: 'ثلاثون دقيقة عمّا تريد بناءه، وعمّا إذا كنت اليدين المناسبة له.' },
    { label: 'بناء MVP', detail: 'أصغر نسخة من المنتج قادرة على حمل مستخدمين حقيقيين.' },
    { label: 'صفحة هبوط', detail: 'انطباع أول يُحوّل — مصمّمة ومبنية ومنشورة.' },
    { label: 'مهمة إنقاذ', detail: 'مشروع توقّف، يُراجَع ويُعاد إلى قدميه.' },
    { label: 'أتمتة', detail: 'العمل اليدوي داخل عملك، يتحوّل إلى نظام.' },
    { label: 'عقد شهري', detail: 'يدان ثابتتان على منتجك، شهراً بعد شهر.' },
  ],
  claim: 'ابدأ المحادثة',
  again: 'أدر مجدداً',
}

export const contact = {
  no: '08',
  kicker: 'خطوتك القادمة',
  title: 'ابدأ برسالة.',
  text: 'أخبرني بما تبنيه. سأخبرك كيف سأتعامل معه.',
  email: 'nour@nour.email',
  cta: 'راسلني',
  github: 'https://github.com/noursh26',
  site: 'https://noursh.pro',
  location: 'القطيفة، سوريا — عن بُعد للعالم',
}

export const ui = {
  docTitle: 'نور الدين شحادة — كود له وجهة.',
  preloaderWord: 'كود له وجهة.',
  skipLink: 'تخطَّ إلى المحتوى',
  menuOpen: 'القائمة',
  menuClose: 'إغلاق',
  menuAria: 'القائمة',
  langSwitch: 'EN',
  getInTouch: 'تواصل',
  based: 'الموقع',
  explore: 'استكشف',
  startConversation: 'ابدأ محادثة',
  seeTheCode: 'شاهد الكود على GitHub',
  scrollCue: 'مرّر إلى الملف',
  statementAria: 'من أين نبدأ',
  dialAria: 'قرص بست جلسات عمل',
  valuesAria: 'قيمي',
  goCursor: 'اذهب',
  yours: 'لك',
  turning: 'يدور…',
  spinDial: 'أدر القرص',
  mailtoSubject: 'استفسار مشروع — {prize}',
  mailtoBody: 'أدرت القرص فوقف على {prize}.\n\nما أبنيه:\nالإطار الزمني:\n',
  footerLine: ['منتجك.', 'مبني ومشحون.'],
  copyright: '© {year} نور الدين شحادة · القطيفة',
  tagline: 'كود له وجهة. Code with direction.',
}
