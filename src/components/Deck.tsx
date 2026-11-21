import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent, MouseEvent, PointerEvent, WheelEvent } from 'react'
import { useLang } from '../i18n'
import { categories, projectCover, projects, projectHref } from '../portfolio/data'
import { ArrowLeft, ArrowRight } from './icons'

/* A shelf of real phone screens that behaves like a physical object:
   it tracks the pointer 1:1, projects momentum on release (Apple's decay
   projection), rubber-bands at the ends, settles on a critically damped
   spring, and can be grabbed again mid-flight from its on-screen position. */

const DECK_IDS = ['almustfa', 'estratijiya-ai', 'fahrast', 'm3aak', 'accountant', 'arkani', 'maash', 'lego', 'relinka', 'bolupinar', 'salesflow', 'petravex']

const project = (v: number, rate = 0.998) => ((v / 1000) * rate) / (1 - rate)
const rubber = (over: number, dim: number, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over))
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Deck() {
  const { lang, content } = useLang()
  const t = content.deck
  const rtl = lang === 'ar'
  const items = DECK_IDS.map((id) => projects.find((p) => p.id === id)).filter((p) => p !== undefined)

  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const thumb = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(1)

  // Mutable physics state lives outside React so frames never wait on a render.
  const s = useRef({
    x: 0, v: 0, target: 0, zeta: 1, response: 0.42,
    max: 0, snaps: [0] as number[], width: 1, raf: 0, last: 0,
    pointer: -1, startX: 0, startY: 0, startPos: 0, dragging: false, decided: false, moved: false,
    hist: [] as { t: number; x: number }[], wheelTimer: 0, rtl,
  })
  s.current.rtl = rtl

  const paint = useCallback(() => {
    const st = s.current
    if (track.current) track.current.style.transform = `translate3d(${(st.rtl ? 1 : -1) * st.x}px,0,0)`
    if (thumb.current) {
      const p = st.max > 0 ? Math.min(1, Math.max(0, st.x / st.max)) : 0
      thumb.current.style.setProperty('--p', String(p))
    }
    let best = 0
    st.snaps.forEach((sn, i) => { if (Math.abs(sn - st.x) < Math.abs(st.snaps[best] - st.x)) best = i })
    setActive((a) => (a === best ? a : best))
  }, [])

  const stop = () => { cancelAnimationFrame(s.current.raf); s.current.raf = 0 }

  const tick = useCallback((now: number) => {
    const st = s.current
    let dt = Math.min(0.064, (now - st.last) / 1000)
    st.last = now
    const omega = (2 * Math.PI) / st.response
    const k = omega * omega
    const c = 2 * st.zeta * omega
    const step = 1 / 240
    while (dt > 0) {
      const h = Math.min(step, dt)
      const a = -k * (st.x - st.target) - c * st.v
      st.v += a * h
      st.x += st.v * h
      dt -= h
    }
    if (Math.abs(st.x - st.target) < 0.25 && Math.abs(st.v) < 4) {
      st.x = st.target
      st.v = 0
      st.raf = 0
      paint()
      return
    }
    paint()
    st.raf = requestAnimationFrame(tick)
  }, [paint])

  const springTo = useCallback((target: number, velocity = 0, zeta = 1) => {
    const st = s.current
    st.target = target
    st.v = velocity
    st.zeta = zeta
    if (reduced()) { stop(); st.x = target; st.v = 0; paint(); return }
    if (!st.raf) { st.last = performance.now(); st.raf = requestAnimationFrame(tick) }
  }, [paint, tick])

  const nearest = (pos: number) => {
    const { snaps } = s.current
    return snaps.reduce((b, sn) => (Math.abs(sn - pos) < Math.abs(b - pos) ? sn : b), snaps[0])
  }

  const measure = useCallback(() => {
    const vp = viewport.current
    const tr = track.current
    if (!vp || !tr) return
    const cards = tr.querySelectorAll<HTMLElement>('.deck__card')
    if (!cards.length) return
    const gap = parseFloat(getComputedStyle(tr).columnGap) || 0
    const stepW = cards[0].offsetWidth + gap
    const max = Math.max(0, tr.scrollWidth - vp.clientWidth)
    const snaps: number[] = []
    cards.forEach((_, i) => {
      const sn = Math.min(i * stepW, max)
      if (!snaps.length || sn - snaps[snaps.length - 1] > 1) snaps.push(sn)
    })
    if (max - snaps[snaps.length - 1] > 1) snaps.push(max)
    const st = s.current
    st.max = max
    st.snaps = snaps
    st.width = vp.clientWidth
    setCount(snaps.length)
    stop()
    st.x = nearest(Math.min(Math.max(st.x, 0), max))
    st.v = 0
    st.target = st.x
    paint()
  }, [paint])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (viewport.current) ro.observe(viewport.current)
    return () => { ro.disconnect(); stop() }
  }, [measure, lang])

  // Programmatic scroll on the clipped viewport (e.g. focus) must never move it.
  useEffect(() => {
    const vp = viewport.current
    if (!vp) return
    const reset = () => { vp.scrollLeft = 0 }
    vp.addEventListener('scroll', reset)
    return () => vp.removeEventListener('scroll', reset)
  }, [])

  const toLogical = (dx: number) => (s.current.rtl ? dx : -dx)

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const st = s.current
    const wasMoving = st.raf !== 0 && Math.abs(st.v) > 30
    stop() // grab it mid-flight, from where it is on screen
    st.v = 0
    st.pointer = e.pointerId
    st.startX = e.clientX
    st.startY = e.clientY
    st.startPos = st.x
    st.dragging = false
    st.decided = false
    st.moved = wasMoving // a tap that catches a moving shelf stops it; it does not open a card
    st.hist = [{ t: e.timeStamp, x: st.x }]
  }

  const onPointerMove = (e: PointerEvent) => {
    const st = s.current
    if (e.pointerId !== st.pointer) return
    const dx = e.clientX - st.startX
    const dy = e.clientY - st.startY
    if (!st.decided) {
      if (Math.hypot(dx, dy) < 8) return
      st.decided = true
      st.dragging = Math.abs(dx) > Math.abs(dy)
      if (!st.dragging) { st.pointer = -1; return }
      st.moved = true
      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* pointer already gone */ }
    }
    if (!st.dragging) return
    const raw = st.startPos + toLogical(dx)
    st.x = raw < 0 ? -rubber(-raw, st.width) : raw > st.max ? st.max + rubber(raw - st.max, st.width) : raw
    st.hist.push({ t: e.timeStamp, x: st.x })
    if (st.hist.length > 6) st.hist.shift()
    paint()
  }

  const release = (e: PointerEvent) => {
    const st = s.current
    if (e.pointerId !== st.pointer) return
    st.pointer = -1
    if (!st.dragging) {
      if (st.x < 0 || st.x > st.max || !st.snaps.includes(st.x)) springTo(nearest(st.x))
      return
    }
    st.dragging = false
    const h = st.hist
    const first = h.find((p) => e.timeStamp - p.t < 100) ?? h[0]
    const lastP = h[h.length - 1]
    const span = (lastP.t - first.t) / 1000
    const v = span > 0.004 ? (lastP.x - first.x) / span : 0
    const target = nearest(Math.min(Math.max(st.x + project(v), 0), st.max))
    springTo(target, v, Math.abs(v) > 400 ? 0.86 : 1)
  }

  const onClickCapture = (e: MouseEvent) => {
    if (s.current.moved) { e.preventDefault(); e.stopPropagation(); s.current.moved = false }
  }

  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    const st = s.current
    stop()
    st.v = 0
    st.x = Math.min(Math.max(st.x + (st.rtl ? -e.deltaX : e.deltaX), 0), st.max)
    paint()
    window.clearTimeout(st.wheelTimer)
    st.wheelTimer = window.setTimeout(() => springTo(nearest(st.x)), 140)
  }

  const go = (dir: 1 | -1) => {
    const { snaps } = s.current
    const i = Math.min(snaps.length - 1, Math.max(0, active + dir))
    springTo(snaps[i])
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const forward = (e.key === 'ArrowRight') !== s.current.rtl
    go(forward ? 1 : -1)
  }

  // Keyboard focus on a card brings it into view.
  const onFocus = (e: FocusEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.deck__card')
    const vp = viewport.current
    if (!card || !vp) return
    const r = card.getBoundingClientRect()
    const v = vp.getBoundingClientRect()
    if (r.left >= v.left && r.right <= v.right) return
    const cards = Array.from(track.current?.querySelectorAll('.deck__card') ?? [])
    const i = cards.indexOf(card)
    const stepW = cards.length > 1 ? Math.abs((cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft) : 0
    springTo(nearest(Math.min(i * stepW, s.current.max)))
  }

  const cat = (id: string) => categories.find((c) => c.id === id)?.label[lang] ?? ''

  return (
    <section className="deck" aria-roledescription="carousel" aria-label={t.label}>
      <div
        className="deck__viewport"
        ref={viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onClickCapture={onClickCapture}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      >
        <div className="deck__track" ref={track}>
          {items.map((p, i) => {
            const shot = projectCover(p, 'mobile')
            if (!shot) return null
            return (
              <a
                key={p.id}
                className="deck__card"
                href={projectHref(p.id)}
                draggable={false}
                aria-label={t.open.replace('{name}', p.name)}
                aria-roledescription="slide"
              >
                <span className="deck__screen">
                  <img
                    src={shot.file}
                    alt={lang === 'ar' ? shot.label : shot.labelEn}
                    width={shot.width}
                    height={shot.height}
                    draggable={false}
                    decoding="async"
                    fetchPriority={i < 4 ? 'high' : 'low'}
                  />
                </span>
                <span className="deck__name"><bdi>{p.name}</bdi></span>
                <span className="deck__meta">{cat(p.category)}</span>
              </a>
            )
          })}
        </div>
      </div>
      <div className="deck__controls wrap">
        <span className="deck__progress" aria-hidden="true"><span ref={thumb} /></span>
        <span className="deck__hint t-small">{t.hint}</span>
        <div className="deck__buttons">
          <button type="button" className="round-btn" onClick={() => go(-1)} disabled={active <= 0} aria-label={t.prev}>
            {rtl ? <ArrowRight /> : <ArrowLeft />}
          </button>
          <button type="button" className="round-btn" onClick={() => go(1)} disabled={active >= count - 1} aria-label={t.next}>
            {rtl ? <ArrowLeft /> : <ArrowRight />}
          </button>
        </div>
      </div>
    </section>
  )
}
