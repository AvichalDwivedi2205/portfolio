import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { played } from '../../game/store'
import { Stage, Try } from './Stage'

const BARS = [0, .1, .2, .3, .4, .5, .4, .3, .2, .1, .05, .25, .45, .65, .45, .25, .05, .15, .35, .55]
const answers = [
  { a: 'Consumer lag. We acked before the write committed and lost about 2% of jobs on crash.', s: [8.6, 9.1], v: 'strong signal', f: 'Good. How did you make that visible before it happened again?' },
  { a: 'Honestly? Nothing. It went smoothly.', s: [3.4, 4.2], v: 'probe deeper', f: 'Nothing ever breaks in a migration. What were you watching?' },
  { a: "The intern's laptop.", s: [1.2, 2.0], v: 'red flag', f: "Bold. Let's talk about blameless postmortems." },
]

export function AperturePlay() {
  const [pick, setPick] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (pick === null) return
    const t = setTimeout(() => { setDone(true); played('aperture') }, 1100)
    return () => clearTimeout(t)
  }, [pick])

  const ans = pick === null ? null : answers[pick]
  const speaking = pick === null || !done

  return (
    <Stage
      label="interview · backend eng · #0412"
      status={<span className="rec"><i />rec 04:12</span>}
      onReset={pick === null ? undefined : () => { setPick(null); setDone(false) }}
    >
      <div className={`bars ${speaking ? '' : 'calm'}`} aria-hidden>{BARS.map((d, i) => <i key={i} style={{ animationDelay: `${d}s` }} />)}</div>
      <div className="tr">
        <div><b>aperture</b><span>You moved the queue off Redis. What broke first?</span></div>
        <AnimatePresence>
          {ans && <motion.div key="me" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}><b className="me">you</b><span>{ans.a}</span></motion.div>}
          {ans && done && <motion.div key="f" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}><b>aperture</b><span>{ans.f}</span></motion.div>}
        </AnimatePresence>
      </div>
      {pick === null ? (
        <div className="answers">
          <Try>you're the candidate. answer!</Try>
          {answers.map((x, i) => <button key={i} className="ans" onClick={() => setPick(i)} data-cur="answer">{x.a}</button>)}
        </div>
      ) : (
        <div className="sc">
          {(['skill depth', 'ownership'] as const).map((k, i) => (
            <div key={k}>
              <small>{k}</small>
              <strong>{done ? ans!.s[i].toFixed(1) : '…'}</strong>
              <span className="bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: done ? ans!.s[i] / 10 : 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} /></span>
            </div>
          ))}
          <div className={`verdict ${pick === 0 ? 'good' : pick === 2 ? 'bad' : ''}`}><small>verdict</small><strong>{done ? ans!.v : '…'}</strong></div>
        </div>
      )}
    </Stage>
  )
}
