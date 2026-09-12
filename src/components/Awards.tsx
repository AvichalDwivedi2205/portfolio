import { motion } from 'motion/react'
import { awards } from '../data'
import { bouncy } from '../hooks'

export function Awards() {
  return (
    <section className="wrap" style={{ paddingTop: 0 }}>
      <div className="awards">
        {awards.map((a, i) => {
          const inner = (
            <>
              <div className="trophy" aria-hidden>🏆</div>
              <div>
                <div className="an">{a.n}</div>
                <div className="ad">{a.d}</div>
              </div>
              <div className="as mono">{a.s}</div>
            </>
          )
          return (
            <motion.div
              key={a.n}
              className="award"
              initial={{ opacity: 0, y: 24, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -4, rotate: i % 2 ? -1 : 1 }}
              transition={{ ...bouncy, delay: i * 0.07 }}
            >
              {a.href ? <a href={a.href} target="_blank" rel="noopener" data-cur="open" className="award-in">{inner}</a> : <div className="award-in">{inner}</div>}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
