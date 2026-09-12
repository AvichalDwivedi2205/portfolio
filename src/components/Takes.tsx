import { takes } from '../data'
import { Split } from './Split'
import { Reveal } from './Reveal'

export function Takes() {
  return (
    <section id="takes" className="wrap">
      <div className="head">
        <Split text="Hot takes." />
        <span className="tag mono">hover to flip · opinions I've paid for</span>
      </div>
      <div className="takes">
        {takes.map((t, i) => (
          <Reveal key={t.q} className="take" delay={i * 0.08}>
            <div className="in">
              <div className="face front"><div className="q">{t.q}</div><div className="flip mono">flip →</div></div>
              <div className="face back"><p>{t.a}</p><div className="flip mono">{t.src}</div></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
