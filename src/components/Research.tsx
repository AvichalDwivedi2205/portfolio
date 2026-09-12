import { motion } from 'motion/react'
import { research } from '../data'
import { Split } from './Split'

/* Compact list for research / ML / hackathon builds. Hover slides the row and lights the badge. */
export function Research() {
  return (
    <section id="research" className="wrap" style={{ paddingTop: 40 }}>
      <div className="head">
        <Split text="Lab notes." />
        <span className="tag mono">post-training · RL envs · on-device · multi-agent</span>
      </div>
      <div className="research">
        {research.map((r, i) => {
          const Tag = r.href ? motion.a : motion.div
          return (
            <Tag
              key={r.title}
              className="rrow"
              href={r.href} target={r.href ? '_blank' : undefined} rel={r.href ? 'noopener' : undefined}
              data-cur={r.href ? 'repo' : undefined}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26, delay: i * 0.04 }}
            >
              <div className="ridx mono">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="rtitle">{r.title} <span>{r.sub}</span></div>
                <p>{r.body}</p>
                <div className="chips">{r.stack.map(s => <span key={s} className="chip">{s}</span>)}</div>
              </div>
              {r.badge && <div className="rbadge">{r.badge}</div>}
            </Tag>
          )
        })}
      </div>
    </section>
  )
}
