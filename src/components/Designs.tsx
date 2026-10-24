import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { designs, type Design } from '../data'
import { complete } from '../game/store'
import { Split } from './Split'
import { Icon } from './Icon'

const hueVars = (d: Design) => ({ ['--c' as string]: `var(--${d.hue})`, ['--cd' as string]: `var(--${d.hue}-d)`, ['--cl' as string]: `var(--${d.hue}-l)` })

function Window({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="win">
      <div className="win-bar"><span className="dots"><i /><i /><i /></span><span className="win-url mono">{url.replace(/^https:\/\//, '').split('/')[0]}</span></div>
      <div className="win-body">{children}</div>
    </div>
  )
}

/* Remi loads its real hosted playground, but only after a click, so the page never pays for it up front. */
function Live({ d }: { d: Design }) {
  const [on, setOn] = useState(false)
  return (
    <Window url={d.href}>
      {on
        ? <iframe src={d.href} title={`${d.title} design playground`} loading="lazy" allow="fullscreen" />
        : (
          <button className="poster" onClick={() => { setOn(true); complete('studio') }} data-cur="play">
            <img src={d.poster} alt={`${d.title} design playground preview`} loading="lazy" />
            <span className="btn"><Icon name="play" size={18} fill stroke={0} /> {d.cta}</span>
          </button>
        )}
    </Window>
  )
}

function Strip({ d }: { d: Design }) {
  const row = useRef<HTMLDivElement>(null)
  const nudge = (dir: number) => { row.current?.scrollBy({ left: dir * 280, behavior: 'smooth' }); complete('studio') }
  return (
    <div className="strip-wrap">
      <div className="strip" ref={row} onWheel={() => complete('studio')} onPointerDown={() => complete('studio')}>
        {d.shots!.map((s, i) => <img key={s} src={s} alt={`${d.title} screen ${i + 1}`} loading="lazy" draggable={false} />)}
      </div>
      <div className="strip-nav">
        <button className="btn xs sec" onClick={() => nudge(-1)} aria-label="Previous screens">←</button>
        <button className="btn xs sec" onClick={() => nudge(1)} aria-label="Next screens">→</button>
      </div>
    </div>
  )
}

export function Designs() {
  return (
    <section id="designs" className="wrap" data-tip="designs">
      <div className="head">
        <Split text="Design studio." />
        <span className="note-tag hand">apps I designed · tap to play</span>
      </div>
      <div className="designs">
        {designs.map((d, i) => (
          <motion.article key={d.id} className={`dcard is-${d.kind}`} style={hueVars(d)}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24, delay: i * 0.05 }}>
            <div className="dtext">
              <div className="cat mono">{d.kind === 'live' ? 'interactive prototype' : d.kind === 'strip' ? 'store screens' : 'live product'}</div>
              <h3>{d.title}. <em>{d.tagline}</em></h3>
              <p>{d.body}</p>
              <a className="go" href={d.href} target="_blank" rel="noopener" data-cur="open" onClick={() => complete('studio')}>
                {d.kind === 'live' ? 'Open full screen' : d.cta} ↗
              </a>
            </div>
            {d.kind === 'live' && <Live d={d} />}
            {d.kind === 'shot' && <Window url={d.href}><img src={d.poster} alt={`${d.title} landing page`} loading="lazy" /></Window>}
            {d.kind === 'strip' && <Strip d={d} />}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
