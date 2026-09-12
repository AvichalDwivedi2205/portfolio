import { motion } from 'motion/react'
import { experience } from '../data'
import { Split } from './Split'

export function Experience() {
  return (
    <section id="xp" className="wrap">
      <div className="head">
        <Split text="Receipts." />
        <span className="tag mono">jobs, labs, and classified rooms</span>
      </div>
      <div className="xp">
        {experience.map((x, i) => (
          <motion.div
            key={i}
            className="xrow"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }}
            whileHover={{ x: 14 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <div className="yr mono">{x.yr}</div>
            <div>
              <h4>
                {x.role}{' '}
                {x.href ? <a href={x.href} target="_blank" rel="noopener" className="orglink"><span>{x.org} ↗</span></a> : <span>{x.org}</span>}
              </h4>
              <p>{x.body}</p>
            </div>
            <div className="loc mono">{x.loc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
