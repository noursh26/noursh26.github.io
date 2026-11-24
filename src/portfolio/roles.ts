import type { Copy } from './types'

/* Products where the same app looks different for each person using it.
   Shown on the case page as phones side by side, one per role. */
export type Role = { phone: string; who: Copy; title: Copy; body: Copy }
export type RoleSet = { title: Copy; lede: Copy; roles: Role[] }

export const roleSets: Record<string, RoleSet> = {
  almustfa: {
    title: { en: 'One app, a screen for every role.', ar: 'تطبيق واحد، وشاشة لكل دور.' },
    lede: {
      en: 'Managers, supervisors, teachers, assistants and students all open the same app. The same person can teach in one circle and study in another, and every screen follows the role they hold there.',
      ar: 'المدير والمشرف والأستاذ والمساعد والطالب يفتحون التطبيق نفسه. وقد يكون الشخص أستاذاً في حلقة وطالباً في أخرى، فتتبع كل شاشة الدور الذي يحمله فيها.',
    },
    roles: [
      {
        phone: 'mobile-02',
        who: { en: 'Teacher', ar: 'الأستاذ' },
        title: { en: 'Records a recitation in a few taps.', ar: 'يسجّل التسميع ببضع لمسات.' },
        body: {
          en: 'Picks students in the quick-add basket and logs recitations, points and attendance from inside the circle.',
          ar: 'يختار الطلاب من سلة الإضافة السريعة، ويسجّل التسميع والنقاط والحضور من داخل الحلقة.',
        },
      },
      {
        phone: 'mobile-07',
        who: { en: 'Student', ar: 'الطالب' },
        title: { en: 'Knows what today asks of them.', ar: 'يعرف ما عليه اليوم.' },
        body: {
          en: 'A daily program with streaks, levels and badges, and a weekly race against the rest of the circle.',
          ar: 'برنامج يومي بتتابع ومستويات وأوسمة، وسباق أسبوعي مع بقية الحلقة.',
        },
      },
      {
        phone: 'mobile-08',
        who: { en: 'Supervisor', ar: 'المشرف' },
        title: { en: 'Sees who needs support.', ar: 'يرى من يحتاج دعماً.' },
        body: {
          en: 'Reviews the program board, the rankings and every record across the circles they oversee.',
          ar: 'يراجع لوحة البرنامج والترتيب وكل سجل في الحلقات التي يشرف عليها.',
        },
      },
    ],
  },
}
