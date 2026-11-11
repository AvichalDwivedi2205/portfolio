import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { links, statement } from '../data'
import { R, Rule, UBtn } from './ui'

function FillWord({ p, range, children }: { p: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(p, range, [0.12, 1])
  const em = children.startsWith('*')
  const word = children.replace(/\*/g, '')
  return <motion.span aria-hidden style={{ opacity }}>{em ? <em>{word}</em> : word} </motion.span>
}

/* The statement starts as a ghost of itself and inks in word by word as it is scrolled through. */
function FillText({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <h2 ref={ref} className="fill" aria-label={text.replace(/\*/g, '')}>
      {words.map((w, i) => (
        <FillWord key={i} p={scrollYProgress} range={[i / words.length, Math.min(1, (i + 2) / words.length)]}>{w}</FillWord>
      ))}
    </h2>
  )
}

const spec = [
  ['Based', 'Pilani, India · IST'],
  ['Studying', 'BITS Pilani, class of ’27'],
  ['Now', 'Open source at Orca'],
  ['Hours', 'Remote, overlaps US and EU'],
]
const focus = ['Voice agents with manners', 'Multi-agent workspaces', 'Post-training and evals']

export function About() {
  return (
    <section className="about" id="about" data-theme="dark">
      <div className="wrap">
        <div className="about-top">
          <R as="span" className="label">about</R>
          <FillText text={statement} />
        </div>

        <div className="about-rule"><Rule /></div>

        <div className="about-bot">
          <R className="about-meta">
            <p className="label about-note">Full-stack: from the LiveKit room to the PyTorch loop.</p>
            <dl className="spec">
              {spec.map(([k, v]) => <div key={k}><dt className="mono dim">{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </R>

          <R className="about-copy" delay={0.1}>
            <div className="about-say">
              <p>Shipped at Expedia, Siemens Energy, Agnikul Cosmos, DRDO and a 100K+★ open-source runtime, plus six products of my own.</p>
              <p className="dim">I ship end to end and I stay on the problem until it works. 4K+ commits say I show up.</p>
              <UBtn href={links.resume}>Read the résumé</UBtn>
            </div>
            <div className="focus">
              <span className="mono dim">What I build</span>
              <ol>
                {focus.map((f, i) => <li key={f}><span className="mono dim">{String(i + 1).padStart(2, '0')}</span>{f}</li>)}
              </ol>
            </div>
          </R>
        </div>
      </div>
    </section>
  )
}
