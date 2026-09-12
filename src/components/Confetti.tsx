import { useEffect, useRef } from 'react'

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number; va: number; l: number }
const COLORS = ['#c8ff3d', '#ff4d9d', '#5ea0ff', '#ff8a3d', '#f4f1ea']

/* Imperative confetti: `fire` prop is a counter; each increment = one burst. */
export function Confetti({ fire }: { fire: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const parts = useRef<P[]>([])
  const raf = useRef(0)

  useEffect(() => {
    const cv = ref.current!
    const fit = () => { cv.width = innerWidth; cv.height = innerHeight }
    fit(); addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    if (!fire) return
    const cv = ref.current!, cx = cv.getContext('2d')!
    for (let i = 0; i < 160; i++) parts.current.push({
      x: cv.width / 2, y: cv.height * 0.25, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 1.1) * 28,
      r: Math.random() * 7 + 4, c: COLORS[i % COLORS.length], a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, l: 1,
    })
    document.body.animate([{ filter: 'hue-rotate(0)' }, { filter: 'hue-rotate(360deg)' }], { duration: 1400, easing: 'ease-in-out' })
    const tick = () => {
      cx.clearRect(0, 0, cv.width, cv.height)
      for (const p of parts.current) {
        p.vy += 0.7; p.x += p.vx; p.y += p.vy; p.vx *= 0.98; p.a += p.va; p.l -= 0.008
        cx.save(); cx.globalAlpha = Math.max(p.l, 0); cx.translate(p.x, p.y); cx.rotate(p.a); cx.fillStyle = p.c
        cx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); cx.restore()
      }
      parts.current = parts.current.filter(p => p.l > 0 && p.y < cv.height + 50)
      if (parts.current.length) raf.current = requestAnimationFrame(tick)
    }
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick)
  }, [fire])

  return <canvas ref={ref} className="confetti" aria-hidden />
}
