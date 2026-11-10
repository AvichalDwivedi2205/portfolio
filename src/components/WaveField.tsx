import { useEffect, useRef } from 'react'

type Pulse = { x: number; y: number; t: number; power: number }

const ACCENT = '#ff6a3d'

/* The hero background: a field of signal lines that drifts on its own, bends away from the pointer,
   and carries a shockwave when you press and hold. One line is the voice: it gets the accent colour,
   a ripple that comes and goes like speech, and a burst each time the headline says a new word (`signal:say`). Canvas 2D, a few thousand points a frame. */
export function WaveField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const host = cv.parentElement!
    const ctx = cv.getContext('2d')!
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, on: 0, want: 0, held: 0 }
    const pulses: Pulse[] = []
    let w = 0, h = 0, raf = 0, visible = true, kick = 0

    const resize = () => {
      const r = cv.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (still) draw(performance.now())
    }

    function draw(now: number) {
      const t = (now - t0) / 1000
      ctx.clearRect(0, 0, w, h)

      ptr.x += (ptr.tx - ptr.x) * 0.12
      ptr.y += (ptr.ty - ptr.y) * 0.12
      ptr.on += (ptr.want - ptr.on) * 0.08
      const charge = ptr.held ? Math.min(1, (now - ptr.held) / 1100) : 0
      while (pulses.length && t - pulses[0].t > 2.6) pulses.shift()

      const lines = w < 700 ? 20 : 32
      const voice = Math.round(lines * 0.56)
      const top = h * 0.34, bottom = h * 1.03
      const step = Math.max(6, w / 120)
      const ripple = 64 * Math.min(1, Math.max(0.36, w / 1100)) // fewer, wider ripples on a narrow screen
      const amp = (Math.min(1, w / 1100) * 0.55 + 0.45) * Math.min(1.45, Math.max(1, h / 800))
      kick *= 0.962
      const reach = 160, reach2 = reach * reach
      /* speech-like envelope for the voice line: bursts with pauses between them */
      const talk = Math.max(0, Math.sin(t * 1.1)) * Math.max(0, Math.sin(t * 2.7 + 1)) + 0.12

      for (let i = 0; i < lines; i++) {
        const u = i / (lines - 1)
        const y0 = top + u * (bottom - top)
        ctx.beginPath()
        for (let x = -step; x <= w + step; x += step) {
          const nx = x / w
          const env = 0.3 + 0.7 * Math.exp(-((nx - 0.66) ** 2) / 0.07)
          let y = y0
            + Math.sin(nx * 5.2 + t * 0.5 + u * 3.1) * 22 * env * amp
            + Math.sin(nx * 11.7 - t * 0.75 + u * 7.3) * 9 * env * amp
            + Math.sin(nx * 2.1 + t * 0.22 - u * 1.7) * 24 * amp
          /* the voice line ripples like speech; a spoken word (kick) spills into its neighbours */
          const dv = Math.abs(i - voice)
          const say = dv === 0 ? 9 * talk + 26 * kick : dv <= 4 ? 15 * kick * (1 - dv / 5) : 0
          if (say > 0.05) y += Math.sin(nx * ripple - t * 7 - dv * 0.7) * say * env * amp

          const dx = x - ptr.x, dy = y - ptr.y
          const near = Math.exp(-(dx * dx + dy * dy) / reach2) * ptr.on
          if (near > 0.002) y += (dy / (Math.abs(dy) + 26)) * near * (44 + charge * 30)

          for (const p of pulses) {
            const age = t - p.t
            const k = Math.hypot(x - p.x, y0 - p.y) - age * 560
            y += Math.sin(k * 0.05) * Math.exp(-(k * k) / 9000) * Math.max(0, 1 - age / 2.6) * p.power * 34
          }
          if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.lineWidth = 1
        ctx.strokeStyle = i === voice ? ACCENT : `rgba(216,216,216,${(0.12 + 0.24 * u).toFixed(3)})`
        ctx.globalAlpha = i === voice ? 0.9 : 1
        ctx.stroke()
      }

      if (charge > 0.02) {
        ctx.beginPath()
        ctx.arc(ptr.x, ptr.y, 14 + charge * 46, 0, Math.PI * 2)
        ctx.strokeStyle = ACCENT
        ctx.globalAlpha = 0.25 + charge * 0.6
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      if (visible) draw(now)
      raf = requestAnimationFrame(loop)
    }

    const at = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top] as const
    }
    const move = (e: PointerEvent) => {
      const [x, y] = at(e)
      if (!ptr.want) { ptr.x = x; ptr.y = y }
      ptr.tx = x; ptr.ty = y; ptr.want = 1
    }
    const leave = () => { ptr.want = 0; ptr.held = 0 }
    const down = (e: PointerEvent) => {
      if ((e.target as Element).closest('a,button')) return
      move(e)
      ptr.held = performance.now()
    }
    const up = () => {
      if (!ptr.held) return
      const power = 0.45 + Math.min(1, (performance.now() - ptr.held) / 1100) * 1.1
      pulses.push({ x: ptr.tx, y: ptr.ty, t: (performance.now() - t0) / 1000, power })
      if (pulses.length > 5) pulses.shift()
      ptr.held = 0
    }

    const say = () => { kick = 1 }

    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    vis.observe(cv)
    resize()

    if (!still) {
      raf = requestAnimationFrame(loop)
      host.addEventListener('pointermove', move, { passive: true })
      host.addEventListener('pointerleave', leave)
      host.addEventListener('pointerdown', down)
      addEventListener('pointerup', up)
      addEventListener('pointercancel', leave)
      addEventListener('signal:say', say)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); vis.disconnect()
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      host.removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
      removeEventListener('pointercancel', leave)
      removeEventListener('signal:say', say)
    }
  }, [])

  return <canvas ref={ref} className="wave" aria-hidden />
}
