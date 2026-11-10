import { useEffect, useRef, useState } from 'react'
import { lockScroll } from '../scroll'
import { Mark } from './Logo'

const CAPTION = ['Hi,', 'I’m', 'Avichal.']
const MID = 60 // the line's resting y inside its svg, which is 120 tall
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

type Phase = 'load' | 'out' | 'open'

/* Intro: a sound check. One signal line crosses the screen and a playhead records along it, drawing a
   waveform as it goes while the caption above transcribes a greeting. At 100 the line settles flat and
   the screen parts along it: the line is at the height of the hero's voice line, so it reads as the same
   signal carrying on. The count holds at 99 until the webfonts are in, so nothing is revealed in a
   fallback font. */
export function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [n, setN] = useState(0)
  const [phase, setPhase] = useState<Phase>('load')
  const live = useRef<SVGPathElement>(null)
  const head = useRef<HTMLDivElement>(null)
  const cb = useRef({ onReveal, onDone })
  cb.current = { onReveal, onDone }

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = reduce ? 500 : 2600
    const settle = reduce ? 0 : 520
    const start = performance.now()
    const timers: number[] = []
    let raf = 0, fonts = !document.fonts, last = -1, doneAt = 0
    document.fonts?.ready.then(() => { fonts = true })
    lockScroll(true)

    const finish = () => {
      setPhase('out')
      timers.push(window.setTimeout(() => { setPhase('open'); cb.current.onReveal() }, settle))
      timers.push(window.setTimeout(() => { lockScroll(false); cb.current.onDone() }, settle + (reduce ? 300 : 1500)))
    }

    const trace = (now: number, pr: number, calm: number) => {
      const w = innerWidth
      const hx = pr * w
      const t = (now - start) / 1000
      let d = `M0 ${MID}`
      for (let x = 4; x < hx; x += 4) {
        /* loud in bursts, like speech, and loudest where it was just recorded */
        const burst = 0.2 + 0.8 * Math.abs(Math.sin(x * 0.011 + 1.3) * Math.sin(x * 0.027))
        const fresh = 0.3 + 0.7 * Math.exp(-(hx - x) / (w * 0.3))
        d += `L${x} ${(MID + Math.sin(x * 0.085 - t * 9) * 30 * burst * fresh * calm).toFixed(1)}`
      }
      live.current?.setAttribute('d', `${d}L${hx.toFixed(1)} ${MID}`)
      if (head.current) head.current.style.transform = `translateX(${hx.toFixed(1)}px)`
    }

    const tick = (now: number) => {
      const el = now - start
      let pr = easeInOut(Math.min(1, el / total))
      if (pr >= 1 && !fonts && el < 5000) pr = 0.99
      const v = Math.round(pr * 100)
      if (v !== last) { last = v; setN(v) }
      if (pr >= 1 && !doneAt) { doneAt = now; finish() }
      const calm = doneAt ? Math.max(0, 1 - (now - doneAt) / Math.max(1, settle * 0.8)) : 1
      trace(now, pr, reduce ? 0 : calm)
      if (!doneAt || calm > 0) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      lockScroll(false)
    }
  }, [])

  const said = CAPTION.filter((_, i) => n >= 14 + i * 24).length

  return (
    <div className={`pl is-${phase}`} role="status" aria-label="Loading">
      <div className="pl-top" aria-hidden>
        <div className="pl-meta label">
          <span><i className="pl-dot" />Sound check</span>
          <span>Avichal Dwivedi · Portfolio ’26</span>
        </div>
        <div className="pl-center">
          <Mark size={84} />
          <p className="pl-cap">
            {CAPTION.map((w, i) => <span key={w} className={i === said - 1 ? 'on cur' : i < said ? 'on' : ''}>{w}</span>)}
          </p>
        </div>
      </div>
      <div className="pl-bot" aria-hidden>
        <span className="mono">input · 48 kHz · mono</span>
        <span className="mono">{n < 100 ? 'recording' : 'signal locked'}</span>
      </div>

      <div className="pl-line" aria-hidden>
        <svg><path className="pl-track" d={`M0 ${MID}H9999`} /><path className="pl-live" ref={live} /></svg>
        <div className="pl-head" ref={head}>
          <span className="mono">{String(n).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  )
}
