import { motion } from 'motion/react'
import { projects, type Project } from '../data'
import { Split } from './Split'
import { plays } from './play'

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M8 7h9v9" /></svg>
)

function Card({ p }: { p: Project }) {
  const Play = p.play ? plays[p.play] : null
  return (
    <motion.article
      className={`proj ${p.size}`}
      style={{ ['--c' as string]: `var(--${p.hue})`, ['--cd' as string]: `var(--${p.hue}-d)`, ['--cl' as string]: `var(--${p.hue}-l)` }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
    >
      <div className="ptext">
        <div className="ptop">
          <div className="cat mono">{p.cat}</div>
          <div className="num">{p.num}</div>
        </div>
        <h3>{p.title} <em>{p.tagline}</em></h3>
        <p>{p.body}</p>
        <div className="chips">{p.chips.map(c => <span key={c} className="chip">{c}</span>)}</div>
        <div className="links">
          <a className="go" href={p.href} target="_blank" rel="noopener" data-cur={p.cur}>{p.cta} <Arrow /></a>
          {p.demo && <a className="go" href={p.demo} target="_blank" rel="noopener" data-cur="demo">Watch demo <Arrow /></a>}
          {p.repo && <a className="go repo" href={p.repo} target="_blank" rel="noopener" data-cur="repo">Source <Arrow /></a>}
        </div>
      </div>
      {Play && <Play />}
    </motion.article>
  )
}

export function Work() {
  return (
    <section id="work" className="wrap" data-tip="work">
      <div className="head">
        <Split text="Stuff I shipped." />
        <span className="note-tag hand">08 products · 0 slide decks · every card is playable</span>
      </div>
      <div className="work">{projects.map(p => <Card key={p.id} p={p} />)}</div>
    </section>
  )
}
