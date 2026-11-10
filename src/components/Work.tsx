import { useRef, useState, type CSSProperties } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { projects, type Project } from '../data'
import { usePlayed } from '../game/store'
import { useMedia } from '../hooks'
import { scrollToTarget } from '../scroll'
import { plays } from './play'
import { Corners, R, SectionHead, UBtn } from './ui'

const N = projects.length
const name = (p: Project) => p.title.replace(/\.$/, '')
const at = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

function Links({ p }: { p: Project }) {
  return (
    <div className="wk-links">
      <UBtn href={p.href} cur={p.cur}>{p.cta}</UBtn>
      {p.demo && <UBtn href={p.demo} cur="demo">Watch demo</UBtn>}
      {p.repo && <UBtn href={p.repo} cur="repo">Source</UBtn>}
    </div>
  )
}

function Demo({ p }: { p: Project }) {
  const Play = p.play ? plays[p.play] : null
  return Play ? <Play /> : null
}

/* Desktop: the section pins while scrolling steps through the projects. The index on the left tracks where you
   are, the write-up rises in line by line, and the demo frame wipes from one project to the next. Every demo
   stays mounted, so one you played is still where you left it when you scroll back. */
function Pinned() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', v => setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N)))))

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollToTarget(top + ((i + 0.5) / N) * (el.offsetHeight - innerHeight))
  }

  const state = (i: number) => (i === active ? 'on' : i < active ? 'past' : 'next')

  return (
    <div className="wk" ref={track} style={{ ['--n' as string]: N } as CSSProperties}>
      <div className="wk-pin">
        <nav className="wk-idx" aria-label="Projects">
          <span className="wk-rail" aria-hidden><motion.i style={{ scaleY: scrollYProgress }} /></span>
          <ol>
            {projects.map((p, i) => (
              <li key={p.id} className={state(i)}>
                <button onClick={() => go(i)} aria-current={i === active ? 'true' : undefined} data-cur="view">
                  <span className="mono">{p.num}</span>
                  <span className="wk-name">{name(p)}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="wk-copy">
          <div className="wk-count" aria-hidden>
            <span className="wk-odo"><span style={at(active)}>{projects.map(p => <b key={p.id}>{p.num}</b>)}</span></span>
            <span className="mono dim">/ {String(N).padStart(2, '0')}</span>
          </div>
          <div className="wk-stack">
            {projects.map((p, i) => (
              <div key={p.id} className={`wk-txt ${state(i)}`} inert={i !== active} aria-hidden={i !== active}>
                <span className="mono dim" style={at(0)}>{p.cat}</span>
                <h3 style={at(1)}><em>{p.tagline}</em></h3>
                <p style={at(2)}>{p.body}</p>
                <ul className="tags" style={at(3)}>{p.chips.map(c => <li key={c}>{c}</li>)}</ul>
                <div style={at(4)}><Links p={p} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="wk-frame">
          <Corners />
          <div className="wk-stack">
            {projects.map((p, i) => (
              <div key={p.id} className={`wk-demo ${state(i)}`} inert={i !== active} aria-hidden={i !== active}>
                <div><Demo p={p} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Phones, tablets and short screens: no pinning. Each project is a block that rises in as it arrives. */
function Stacked() {
  return (
    <div className="wk-list">
      {projects.map(p => (
        <article key={p.id} className="wk-card">
          <R className="wk-card-hd"><span className="mono">{p.num}</span><span className="mono dim">{p.cat}</span></R>
          <R as="div" delay={0.05}><h3>{name(p)}<em>{p.tagline}</em></h3></R>
          <R as="p" delay={0.1}>{p.body}</R>
          <R delay={0.15}><ul className="tags">{p.chips.map(c => <li key={c}>{c}</li>)}</ul></R>
          <R delay={0.2}><Links p={p} /></R>
          {p.play && <R className="wk-frame" delay={0.1}><Corners /><Demo p={p} /></R>}
        </article>
      ))}
    </div>
  )
}

export function Work() {
  const n = usePlayed().length
  const pin = useMedia('(min-width: 1001px) and (min-height: 680px)')

  return (
    <section className="work" id="work" data-theme="dark">
      <div className="wrap">
        <SectionHead
          label="Selected work"
          title="Stuff I shipped."
          note={<>08 products · 0 slide decks<br />demos played {String(n).padStart(2, '0')}/08</>}
        />
        {pin ? <Pinned /> : <Stacked />}
      </div>
    </section>
  )
}
