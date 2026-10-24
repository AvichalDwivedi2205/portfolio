import { useEffect, useRef } from 'react'
import { useUi } from '../game/store'

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number; va: number; l: number; round: boolean }
const COLORS = ['#FF8A4C', '#5DBB7E', '#6FB2F2', '#A88BF0', '#FFC23D', '#FF7FA8']

/* Imperative confetti: fires on every `burst` bump in the ui store. */
export function Confetti() {
  const fire = useUi(s => s.burst)
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
    if (!fire || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cv = ref.current!, cx = cv.getContext('2d')!
    for (let i = 0; i < 140; i++) parts.current.push({
      x: cv.width / 2, y: cv.height * 0.3, vx: (Math.random() - 0.5) * 28, vy: (Math.random() - 1.1) * 26,
      r: Math.random() * 7 + 5, c: COLORS[i % COLORS.length], a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, l: 1, round: i % 3 === 0,
    })
    const tick = () => {
      cx.clearRect(0, 0, cv.width, cv.height)
      for (const p of parts.current) {
        p.vy += 0.7; p.x += p.vx; p.y += p.vy; p.vx *= 0.98; p.a += p.va; p.l -= 0.008
        cx.save(); cx.globalAlpha = Math.max(p.l, 0); cx.translate(p.x, p.y); cx.rotate(p.a); cx.fillStyle = p.c
        if (p.round) { cx.beginPath(); cx.arc(0, 0, p.r / 2, 0, Math.PI * 2); cx.fill() } else cx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
        cx.restore()
      }
      parts.current = parts.current.filter(p => p.l > 0 && p.y < cv.height + 50)
      if (parts.current.length) raf.current = requestAnimationFrame(tick)
    }
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick)
  }, [fire])

  return <canvas ref={ref} className="confetti" aria-hidden />
}
