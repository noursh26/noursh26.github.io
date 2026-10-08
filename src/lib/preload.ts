/** Only the first screen belongs behind the curtain. Later sections load as
 * they approach the viewport; a slow font or image must never lock the site. */
const MAX_WAIT = 6_000

type Progress = (fraction: number) => void

export async function preloadAll(onProgress: Progress, lang: 'en' | 'ar'): Promise<void> {
  const controller = new AbortController()
  const images = Array.from(document.querySelectorAll<HTMLImageElement>(
    '.hero img, .nav img, .preloader img, .dx-shot:first-child img',
  ))
  const family = lang === 'ar' ? 'Alexandria' : 'Manrope'
  const fontJobs = document.fonts
    ? [400, 600, 700].map(weight => document.fonts.load(`${weight} 1rem "${family}"`).catch(() => {}))
    : []
  const total = images.length + fontJobs.length || 1
  let done = 0
  const tick = () => {
    done += 1
    if (!controller.signal.aborted) onProgress(Math.min(done / total, 1))
  }
  onProgress(0)

  const imageJobs = images.map(async img => {
    if (!img.complete) {
      await new Promise<void>(resolve => {
        const finish = () => {
          img.removeEventListener('load', finish)
          img.removeEventListener('error', finish)
          controller.signal.removeEventListener('abort', finish)
          resolve()
        }
        img.addEventListener('load', finish, { once: true })
        img.addEventListener('error', finish, { once: true })
        controller.signal.addEventListener('abort', finish, { once: true })
      })
    }
    if (!controller.signal.aborted) await img.decode?.().catch(() => {})
    tick()
  })
  let timer: ReturnType<typeof setTimeout> | undefined
  const deadline = new Promise<void>(resolve => {
    timer = setTimeout(resolve, MAX_WAIT)
  })
  await Promise.race([
    Promise.all([...imageJobs, ...fontJobs.map(job => job.then(tick))]),
    deadline,
  ])
  clearTimeout(timer)
  controller.abort()
  onProgress(1)
}
