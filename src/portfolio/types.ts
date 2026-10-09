export type Copy = { ar: string; en: string }
export type Category = 'business' | 'ai' | 'mobile' | 'commerce' | 'brand' | 'developer'
export type Project = {
  id: string
  name: string
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
  repo: string
  revision: string
  route: string
  capturedAt: string
  fixture: string
}
