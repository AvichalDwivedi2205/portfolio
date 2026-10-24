import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { played } from '../../game/store'
import { Stage, Try } from './Stage'

const workers = [
  { id: 'architect', engine: 'codex', token: 40, x: 4, y: 6, hue: 'moss', note: 'done' },
  { id: 'frontend', engine: 'claude', token: 42, x: 52, y: 4, hue: 'lav', note: 'lease #42' },
  { id: 'qa', engine: 'claude', token: 41, x: 30, y: 56, hue: 'rose', note: 'stale lease' },
]

/* Fencing tokens in one picture: the current lease writes, the stale one bounces. */
export function GuildPlay() {
  const box = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'idle' | 'run' | 'done'>('idle')
  const run = () => {
    setPhase('run')
    setTimeout(() => { setPhase('done'); played('guild') }, 1300)
  }

  return (
    <Stage
      label="team run · cinemaverse · region src/app.tsx"
      status={<span className={`pill-s ${phase === 'done' ? 'ok' : ''}`}>{phase === 'idle' ? 'runner paired' : phase === 'run' ? 'running' : '1 committed · 1 rejected'}</span>}
      onReset={phase === 'done' ? () => setPhase('idle') : undefined}
    >
      <div className="gcanvas" ref={box}>
        <div className="region mono">reserved · src/app.tsx · token 42</div>
        {workers.map(w => (
          <motion.div
            key={w.id}
            className={`gw ${w.id === 'qa' ? 'stale' : ''} ${phase === 'done' && w.id === 'qa' ? 'bounced' : ''}`}
            style={{ left: `${w.x}%`, top: `${w.y}%`, ['--c' as string]: `var(--${w.hue})`, ['--cd' as string]: `var(--${w.hue}-d)` }}
            drag dragConstraints={box} dragElastic={0.12} dragMomentum={false} whileDrag={{ scale: 1.06, zIndex: 5 }} data-cur="drag"
          >
            <div className="gwh mono"><span>{w.id}</span><span>{w.engine}</span></div>
            <div className="gbar"><motion.i initial={false} animate={{ scaleX: w.id === 'architect' ? 1 : phase === 'idle' ? (w.id === 'frontend' ? 0.4 : 0.15) : w.id === 'frontend' ? 1 : 0.15 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} /></div>
            <div className="gst mono">token {w.token} · {w.note}</div>
          </motion.div>
        ))}
      </div>
      <div className="glog mono">
        {phase === 'done' ? (
          <>
            <div className="ok">frontend · token 42 → write src/app.tsx · committed</div>
            <div className="no">qa · token 41 → write src/app.tsx · rejected, stale token (current 42)</div>
          </>
        ) : <div>{phase === 'run' ? 'frontend and qa both trying to write…' : 'drag the workers around, then run the job'}</div>}
      </div>
      {phase === 'idle' && <div className="stage-act"><Try /><button className="btn sm lav" onClick={run} data-cur="run">Run the job</button></div>}
    </Stage>
  )
}
