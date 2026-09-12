import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { interview } from '../data'
import { Split } from './Split'
import { useReducedMotion } from '../hooks'

type Phase = 'hidden' | 'typing' | 'shown'

export function Interview() {
  const box = useRef<HTMLDivElement>(null)
  const inView = useInView(box, { once: true, amount: 0.25 })
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase[]>(() => interview.map(() => 'hidden'))

  useEffect(() => {
    if (!inView) return
    if (reduce) { setPhase(interview.map(() => 'shown')); return }
    const timers: number[] = []
    let delay = 0
    interview.forEach((m, i) => {
      timers.push(setTimeout(() => setPhase(p => p.map((v, j) => (j === i ? 'typing' : v))), delay))
      delay += 600 + Math.min(m.html.length * 4, 900)
      timers.push(setTimeout(() => setPhase(p => p.map((v, j) => (j === i ? 'shown' : v))), delay))
      delay += 450
    })
    return () => timers.forEach(clearTimeout)
  }, [inView, reduce])

  return (
    <section id="chat" className="wrap">
      <div className="head">
        <Split text="The interview." />
        <span className="tag mono">Conducted by an AI I built</span>
      </div>
      <div className="chat" ref={box}>
        {interview.map((m, i) => phase[i] !== 'hidden' && (
          <motion.div
            key={i}
            className={`msg ${m.who}`}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          >
            <div className="av">{m.who === 'ai' ? 'ap' : 'av'}</div>
            <motion.div className="bub" layout transition={{ layout: { type: 'spring', stiffness: 300, damping: 26 } }}>
              {phase[i] === 'typing'
                ? <span className="typing"><i /><i /><i /></span>
                : <span dangerouslySetInnerHTML={{ __html: m.html }} />}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
