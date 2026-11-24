/* How the directory tells each story: which screens play, in which order,
   and the address shown in the browser bar. Order of the page follows
   projects.json (biggest first); this file only picks the frames. */

type Story = {
  host: string
  /** Desktop screens that play in turn while the chapter is pinned. */
  desk: string[]
  /** Phone screens, one per desktop screen. */
  phone: string[]
  /** Extra phones beside a phone-only chapter. */
  side?: string[]
  /** Override for products whose own screens are dark. */
  tint?: { bg: string; fg: string; accent: string }
}

export const stories: Record<string, Story> = {
  almustfa: { host: 'almustfa', desk: ['desktop-01', 'desktop-05', 'desktop-08'], phone: ['mobile-01', 'mobile-02', 'mobile-07', 'mobile-05'] },
  lego: { host: 'legodesigns', desk: ['desktop-02', 'desktop-01', 'desktop-06'], phone: ['mobile-02', 'mobile-01', 'mobile-06'] },
  fahrast: {
    host: 'fahrast.ai', desk: ['desktop-02', 'desktop-04', 'desktop-08'], phone: ['mobile-02', 'mobile-04'],
    tint: { bg: '#0d1527', fg: '#f2efe8', accent: '#d9bd85' },
  },
  nirso: { host: 'nirso', desk: ['desktop-03', 'desktop-02', 'desktop-06'], phone: ['mobile-03', 'mobile-01', 'mobile-06'] },
  relinka: { host: 'relinka', desk: ['desktop-01', 'desktop-05', 'desktop-07'], phone: ['mobile-01', 'mobile-05', 'mobile-07'] },
  'estratijiya-ai': { host: 'estratijiya.ai', desk: ['desktop-02', 'desktop-03', 'desktop-08'], phone: ['mobile-02', 'mobile-08', 'mobile-05'] },
  foxtech: { host: 'foxtech', desk: ['desktop-01', 'desktop-02', 'desktop-04'], phone: ['mobile-01', 'mobile-02', 'mobile-04'] },
  m3aak: { host: 'm3aak', desk: ['desktop-01', 'desktop-03', 'desktop-05'], phone: ['mobile-01', 'mobile-03', 'mobile-05'] },
  arkani: { host: 'arkani', desk: [], phone: ['mobile-02', 'mobile-05', 'mobile-07'], side: ['mobile-10'] },
  estratijiya: { host: 'estratijiya.com', desk: ['desktop-01'], phone: ['mobile-01'] },
  petravex: { host: 'petravex.com', desk: ['desktop-01'], phone: ['mobile-01'] },
  bolupinar: { host: 'bolupinar.com', desk: ['desktop-03'], phone: ['mobile-03'] },
  maash: { host: 'maash7.art', desk: ['desktop-01'], phone: ['mobile-01'] },
  dwiptech: { host: 'dwiptech.com', desk: ['desktop-02'], phone: ['mobile-02'] },
  accountant: { host: 'accounting', desk: ['desktop-03', 'desktop-10'], phone: ['mobile-10'] },
  farahidi: {
    host: 'farahidi', desk: ['desktop-04'], phone: [],
    tint: { bg: '#15120e', fg: '#f3e9db', accent: '#d69448' },
  },
  salesflow: { host: 'salesflow', desk: ['desktop-04'], phone: [] },
  qasioun: { host: 'qasioun', desk: ['desktop-02'], phone: ['mobile-02'] },
}
