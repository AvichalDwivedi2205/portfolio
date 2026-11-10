import { useRef, useState } from 'react'
import { designs, type Design } from '../data'
import { useReveal } from '../hooks'
import { Icon } from './Icon'
import { R, SectionHead, UBtn } from './ui'

const kind = { live: 'Interactive prototype', shot: 'Live product', strip: 'Store screens' } as const

function Window({ url, children }: { url: string; children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className="win-wrap" ref={ref}>
      <div className="win">
        <div className="win-bar"><span className="dots"><i /><i /><i /></span><span className="mono">{url.replace(/^https:\/\//, '').split('/')[0]}</span></div>
        <div className="win-body">{children}</div>
      </div>
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
          <button className="poster" onClick={() => setOn(true)} data-cur="play" aria-label={`Load the ${d.title} prototype`}>
            <img src={d.poster} alt={`${d.title} design playground preview`} loading="lazy" />
            <span className="poster-btn"><Icon name="play" size={14} fill stroke={0} />{d.cta}</span>
          </button>
        )}
    </Window>
  )
}

/* Phone screens on a rail: drag it, or use the arrows. */
function Strip({ d }: { d: Design }) {
  const row = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const nudge = (dir: number) => row.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })

  return (
    <div className="strip-wrap">
      <div
        className="rail" ref={row} data-cur="drag"
        onPointerDown={e => { if (e.pointerType === 'mouse') drag.current = { x: e.clientX, left: row.current!.scrollLeft } }}
        onPointerMove={e => { if (drag.current) row.current!.scrollLeft = drag.current.left - (e.clientX - drag.current.x) }}
        onPointerUp={() => { drag.current = null }}
        onPointerLeave={() => { drag.current = null }}
      >
        {d.shots!.map((s, i) => <img key={s} src={s} alt={`${d.title} screen ${i + 1}`} loading="lazy" draggable={false} />)}
      </div>
      <div className="rail-nav">
        <button className="pill" onClick={() => nudge(-1)} aria-label="Previous screens">←</button>
        <button className="pill" onClick={() => nudge(1)} aria-label="Next screens">→</button>
      </div>
    </div>
  )
}

export function Designs() {
  return (
    <section className="designs" id="designs" data-theme="dark">
      <div className="wrap">
        <SectionHead label="Design studio" title="Apps I designed." note={<>Three products<br />one is playable in place</>} />
        <div className="dlist">
          {designs.map((d, i) => (
            <article key={d.id} className={`drow is-${d.kind}`}>
              <R className="drow-txt">
                <span className="mono dim">{String(i + 1).padStart(2, '0')} · {kind[d.kind]}</span>
                <h3>{d.title}. <em>{d.tagline}</em></h3>
                <p className="dim">{d.body}</p>
                <UBtn href={d.href} cur="open">{d.kind === 'live' ? 'Open full screen' : d.cta}</UBtn>
              </R>
              <div className="drow-media">
                {d.kind === 'live' && <Live d={d} />}
                {d.kind === 'shot' && <Window url={d.href}><img src={d.poster} alt={`${d.title} landing page`} loading="lazy" /></Window>}
                {d.kind === 'strip' && <Strip d={d} />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
