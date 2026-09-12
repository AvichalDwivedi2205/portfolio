import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks'

/*
 * Pointer-reactive bar waveform. Perf notes:
 * - DPR capped at 1.5, 64 bars, fillRect only
 * - rAF loop only runs while the canvas is on screen
 * - pointer position lerped so the response is smooth, not jittery
 */
export function Wave() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const cv = ref.current
    if (!cv || reduce) return
    const cx = cv.getContext('2d')!
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    let W = 0, H = 0, t = 0, raf = 0, visible = false
    const target = { x: 0.5, y: 0.5 }, cur = { x: 0.5, y: 0.5 }

    const resize = () => {
      const r = cv.getBoundingClientRect()
      W = cv.width = Math.round(r.width * dpr)
      H = cv.height = Math.round(r.height * dpr)
    }
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = (e.clientY - r.top) / r.height
    }
    const N = 64
    const draw = () => {
      if (!visible) return
      t += 0.012
      cur.x += (target.x - cur.x) * 0.08
      cur.y += (target.y - cur.y) * 0.08
      cx.clearRect(0, 0, W, H)
      const gap = W / N, w = gap * 0.45
      for (let i = 0; i < N; i++) {
        const x = i / N, d = x - cur.x
        const env = Math.exp(-d * d * 14) * (1.2 - cur.y) + 0.15
        const h = (Math.sin(x * 9 + t * 2) * 0.5 + Math.sin(x * 23 - t * 3) * 0.25 + Math.sin(x * 4 + t) * 0.35) * env * H * 0.28 + H * 0.02
        cx.globalAlpha = 0.35 + env * 0.5
        cx.fillStyle = i % 7 === 0 ? '#ff4d9d' : '#c8ff3d'
        cx.fillRect(i * gap + gap * 0.27, H * 0.5 - h / 2, w, Math.abs(h) + 2)
      }
      raf = requestAnimationFrame(draw)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) }
    })

    resize()
    io.observe(cv)
    const parent = cv.parentElement!
    parent.addEventListener('pointermove', onMove, { passive: true })
    addEventListener('resize', resize)
    return () => {
      io.disconnect(); cancelAnimationFrame(raf)
      parent.removeEventListener('pointermove', onMove); removeEventListener('resize', resize)
    }
  }, [reduce])

  return <canvas ref={ref} className="wave" aria-hidden />
}
