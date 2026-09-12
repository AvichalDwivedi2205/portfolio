import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { PointerEvent } from 'react'
import { projects, type Project } from '../data'
import { Split } from './Split'
import { ApertureMock, GuildMock, CanvasMock } from './Mocks'
import { useFinePointer, useReducedMotion } from '../hooks'

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M8 7h9v9" /></svg>
)

const mocks = { aperture: ApertureMock, guild: GuildMock, canvas: CanvasMock }

/* 3D tilt card driven by spring motion values (no React re-render per frame). */
function Card({ p }: { p: Project }) {
  const fine = useFinePointer(), reduce = useReducedMotion()
  const mx = useMotionValue(0.5), my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 200, damping: 22 }), sy = useSpring(my, { stiffness: 200, damping: 22 })
  const rotateX = useTransform(sy, [0, 1], [5, -5])
  const rotateY = useTransform(sx, [0, 1], [-7, 7])

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }
  const Mock = p.mock ? mocks[p.mock] : null

  return (
    <motion.article
      className={`proj ${p.size}`}
      style={{ ['--c' as string]: p.color, rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={onMove} onPointerLeave={reset}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
    >
      <div>
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
      {Mock && <Mock />}
    </motion.article>
  )
}

export function Work() {
  return (
    <section id="work" className="wrap">
      <div className="head">
        <Split text="Stuff I shipped." />
        <span className="tag mono">05 products · 0 slide decks</span>
      </div>
      <div className="work">{projects.map(p => <Card key={p.id} p={p} />)}</div>
    </section>
  )
}
