export type Copy = { ar: string; en: string }
export type Category =
  'business' | 'ai' | 'mobile' | 'commerce' | 'brand' | 'developer'
export type Project = {
  id: string
  name: string
  /** Where the project sits in the directory story, biggest first. */
  tier: 'flagship' | 'featured' | 'landing' | 'more'
  /** Shown as a small label: a side project still being built. */
  status?: 'in-progress'
  /** The product's own screens are dark; its pages follow. */
  theme?: 'dark'
  category: Category
  repos: string[]
  summary: Copy
  headline: Copy
  problem: Copy
  solution: Copy
  challenge: Copy
  features: Copy[]
  flow: Copy[]
  stack: string[]
  palette: { background: string; foreground: string; accent: string }
  presentation: {
    composition: string
    rhythm: 'sequence' | 'tiles' | 'panels'
    desktopCover: number
    mobileCover: number
    radius: number
    tilt: number
  }
  layout: 'workspace' | 'editorial' | 'mobile' | 'commerce' | 'developer'
}
export type Shot = {
  project: string
  file: string
  thumbnail: string
  device: 'desktop' | 'mobile'
  width: number
  height: number
  label: string
  labelEn: string
}
export type ScreenshotProvenance = Shot & {
  repo: string
  revisionKind: 'local-source-snapshot'
  sourceSha256: string
  revision: string
  route: string
  capturedAt: string
  fixture: string
}
/** The walk-through on a case page: every screen, explained in order. */
export type Tour = {
  facts: { value: string; label: Copy }[]
  intro: Copy
  screens: {
    desk?: string
    phone?: string
    kicker: Copy
    title: Copy
    body: Copy
    points: Copy[]
  }[]
  engineering: { title: Copy; body: Copy }[]
}
