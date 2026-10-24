import { useState } from 'react'
import { takes } from '../data'
import { complete } from '../game/store'
import { Split } from './Split'
import { Reveal } from './Reveal'

export function Takes() {
  const [flipped, setFlipped] = useState<number[]>([])
  const flip = (i: number) => {
    setFlipped(f => (f.includes(i) ? f.filter(x => x !== i) : [...f, i]))
    complete('flip')
  }
  return (
    <section id="takes" className="wrap" data-tip="takes">
      <div className="head">
        <Split text="Hot takes." />
        <span className="note-tag hand">tap to flip · opinions I've paid for</span>
      </div>
      <div className="takes">
        {takes.map((t, i) => (
          <Reveal key={t.q} className={`take ${flipped.includes(i) ? 'flipped' : ''}`} delay={i * 0.08}
            style={{ ['--c' as string]: `var(--${t.hue})`, ['--cd' as string]: `var(--${t.hue}-d)`, ['--cl' as string]: `var(--${t.hue}-l)` }}>
            <button className="in" onClick={() => flip(i)} aria-pressed={flipped.includes(i)} data-cur="flip">
              <span className="face front"><span className="q">{t.q}</span><span className="flip hand">flip me →</span></span>
              <span className="face back"><span className="a">{t.a}</span><span className="flip mono">{t.src}</span></span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
