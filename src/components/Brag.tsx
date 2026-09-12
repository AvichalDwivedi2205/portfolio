import { motion } from 'motion/react'
import { brags } from '../data'
import { bouncy } from '../hooks'

export function Brag() {
  return (
    <section className="wrap" style={{ paddingTop: 20 }}>
      <div className="brag">
        {brags.map((b, i) => (
          <motion.div
            key={b.l}
            className="b"
            style={{ background: b.bg }}
            initial={{ opacity: 0, scale: 0.7, rotate: b.rot * 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: b.rot }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ rotate: 0, scale: 1.06 }}
            transition={{ ...bouncy, delay: i * 0.06 }}
          >
            {b.n}<small>{b.l}</small>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
