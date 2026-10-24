import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import { played } from '../../game/store'
import { Stage, Try } from './Stage'

const NW = 118, NH = 46, CW = 150, CH = 92
const nodes = [
  { id: 'yt', label: '▶ youtube', sub: 'hook breakdown', fx: 0.03, fy: 0.06 },
  { id: 'pdf', label: 'pdf', sub: 'brand guide', fx: 0.03, fy: 0.42 },
  { id: 'voice', label: 'voice note', sub: '“neon, retro”', fx: 0.22, fy: 0.76 },
]

function Edge({ ax, ay, bx, by }: { ax: MotionValue<number>; ay: MotionValue<number>; bx: MotionValue<number>; by: MotionValue<number> }) {
  const d = useTransform([ax, ay, bx, by], ([x1, y1, x2, y2]: number[]) => {
    const sx = x1 + NW, sy = y1 + NH / 2, ex = x2, ey = y2 + CH / 2, mx = (sx + ex) / 2
    return `M${sx} ${sy} C${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`
  })
  return <motion.path d={d} stroke="var(--moss-d)" strokeWidth="2.5" strokeDasharray="6 6" fill="none" className="edge" />
}

/* Drag nodes and the wires follow, entirely in motion values. */
export function LatchGridPlay() {
  const box = useRef<HTMLDivElement>(null)
  const [answer, setAnswer] = useState(false)
  const xs = [useMotionValue(0), useMotionValue(0), useMotionValue(0)]
  const ys = [useMotionValue(0), useMotionValue(0), useMotionValue(0)]
  const cx = useMotionValue(0), cy = useMotionValue(0)

  useLayoutEffect(() => {
    const r = box.current!.getBoundingClientRect()
    nodes.forEach((n, i) => { xs[i].set(n.fx * r.width); ys[i].set(n.fy * r.height) })
    cx.set(r.width - CW - r.width * 0.04); cy.set(r.height * 0.22)
  }, [])

  return (
    <Stage label="workspace / content-creator-kit" onReset={answer ? () => setAnswer(false) : undefined}>
      <div className="lg" ref={box}>
        <svg className="lg-wires" aria-hidden>{nodes.map((n, i) => <Edge key={n.id} ax={xs[i]} ay={ys[i]} bx={cx} by={cy} />)}</svg>
        {nodes.map((n, i) => (
          <motion.div key={n.id} className="lgn" style={{ x: xs[i], y: ys[i], width: NW, height: NH }}
            drag dragConstraints={box} dragElastic={0.05} dragMomentum={false} whileDrag={{ scale: 1.05, zIndex: 4 }} data-cur="drag">
            <b className="mono">{n.label}</b><span>{n.sub}</span>
          </motion.div>
        ))}
        <motion.div className="lgn hub" style={{ x: cx, y: cy, width: CW, height: CH }}
          drag dragConstraints={box} dragElastic={0.05} dragMomentum={false} whileDrag={{ scale: 1.04, zIndex: 4 }} data-cur="drag">
          <b className="mono">latchgrid chat</b>
          <span>{answer ? '3 thumbnail ideas from the hook, in your brand colors, with the neon retro vibe.' : 'connected to 3 nodes'}</span>
        </motion.div>
      </div>
      {!answer && <div className="stage-act"><Try>drag the nodes</Try><button className="btn sm moss" onClick={() => { setAnswer(true); played('latchgrid') }} data-cur="ask">Ask the canvas</button></div>}
    </Stage>
  )
}
