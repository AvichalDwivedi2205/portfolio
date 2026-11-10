import { motion } from 'motion/react'
import { awards, clients, facts } from '../data'
import { ease } from '../hooks'
import { Count, Crest, Rule, R, Words } from './ui'

const flip = (i: number) => ({
  initial: { opacity: 0, y: 90, rotateX: 28, rotateY: (i - 1) * -14 },
  whileInView: { opacity: 1, y: 0, rotateX: 0, rotateY: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 1.3, ease, delay: i * 0.12 },
})

export function Facts() {
  return (
    <section className="facts" id="facts" data-theme="light">
      <Crest />
      <div className="wrap">
        <div className="facts-hd">
          <Words text="The receipts." />
          <R as="p" className="small" delay={0.15}>Numbers I can back up,<br />from work that shipped.</R>
        </div>

        <div className="cards">
          <motion.article className="card dark" {...flip(0)}>
            <span className="label">Hackathons</span>
            <ul className="card-list">
              {awards.map(a => (
                <li key={a.n}>
                  <b>{a.n}</b>
                  <span>{a.d}</span>
                  <span className="mono">{a.s}</span>
                </li>
              ))}
            </ul>
            <div className="card-foot">
              <p className="small">{facts.prizes.note}</p>
              <span className="num"><Count {...facts.prizes} /></span>
            </div>
          </motion.article>

          <motion.article className="card plain" {...flip(1)}>
            <span className="label">Open source</span>
            <div className="card-mid">
              <i className="disc" aria-hidden />
              <span className="num"><Count {...facts.stars} /></span>
            </div>
            <p className="small">{facts.stars.note}</p>
          </motion.article>

          <motion.article className="card dark alt" {...flip(2)}>
            <span className="label right">In production</span>
            <div className="meter" aria-hidden>{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * -0.23}s` }} />)}</div>
            <div className="card-foot">
              <p className="small">{facts.debug.note}</p>
              <span className="num"><Count {...facts.debug} /></span>
            </div>
          </motion.article>
        </div>

        <ul className="strip">
          {facts.strip.map((f, i) => (
            <R as="li" key={f.note} delay={i * 0.08}>
              <span className="num sm"><Count {...f} /></span>
              <span className="small">{f.note}</span>
            </R>
          ))}
        </ul>

        <div className="clients">
          <R as="span" className="label">Shipped with</R>
          <R className="clients-row" delay={0.1}>
            {clients.map(c => <span key={c}>{c}</span>)}
          </R>
        </div>
        <Rule at="center" />
      </div>
    </section>
  )
}
