import { motion } from 'motion/react'
import { skills } from '../data'

export function Skills() {
  return (
    <section className="wrap" style={{ paddingTop: 0 }}>
      <div className="skills">
        {Object.entries(skills).map(([group, items], gi) => (
          <div key={group} className="sgroup">
            <div className="sname mono">{group}</div>
            <div className="chips">
              {items.map((s, i) => (
                <motion.span
                  key={s}
                  className="chip skill"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: i % 2 ? 2 : -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: gi * 0.05 + i * 0.02 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
