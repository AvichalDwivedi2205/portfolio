import { motion } from 'motion/react'
import { Wave } from './Wave'
import { WordSwap } from './WordSwap'
import { Stickers } from './Stickers'
import { Magnetic } from './Magnetic'
import { scrambleWords } from '../data'
import { ease } from '../hooks'

const up = (d: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay: d } })

export function Hero() {
  return (
    <header className="hero">
      <Wave />
      <div>
        <motion.div className="kicker mono" {...up(0)}>
          Avichal Dwivedi <b>BITS Pilani '27</b> ships from India, works in your timezone
        </motion.div>
        <motion.h1 className="disp" {...up(0.08)}>
          <span className="w">I</span> <span className="w">build</span> <span className="w">AI</span><br />
          <span className="w">that</span> <WordSwap words={scrambleWords} />
        </motion.h1>
        <motion.p className="sub" {...up(0.16)}>
          Voice agents with manners, multi-agent workspaces where humans stay in charge, and post-training runs that <b>actually move the benchmark</b>. Shipped at Expedia, Siemens Energy, Agnikul Cosmos, DRDO, and a <b>67.3K★</b> open-source runtime, plus <b>five products</b> of my own.
        </motion.p>
        <motion.div className="ctas" {...up(0.24)}>
          <Magnetic className="btn primary" href="#work" data-cur="go">See the work →</Magnetic>
          <Magnetic className="btn ghost" href="#chat" data-cur="chat">Interview me</Magnetic>
        </motion.div>
      </div>
      <Stickers />
    </header>
  )
}
