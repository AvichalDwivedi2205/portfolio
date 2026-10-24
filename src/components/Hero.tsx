import { motion } from 'motion/react'
import { WordSwap } from './WordSwap'
import { Stickers } from './Stickers'
import { Magnetic } from './Magnetic'
import { Sky } from './Sky'
import { Buddy, useLory } from './Buddy'
import { greetLory } from './BuddyDock'
import { links, scrambleWords, tips } from '../data'
import { complete } from '../game/store'
import { ease } from '../hooks'

const up = (d: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay: d } })

export function Hero() {
  const lory = useLory()
  return (
    <header className="hero" id="hero" data-tip="top">
      <div className="hero-copy">
        <motion.div className="kicker" {...up(0)}>
          <span>Avichal Dwivedi</span> <b>BITS Pilani '27</b> <span className="hand">ships from India, works in your timezone</span>
        </motion.div>
        <motion.h1 className="disp" {...up(0.08)}>
          <span className="w">I</span> <span className="w">build</span> <span className="w">AI</span><br />
          <span className="w">that</span> <WordSwap words={scrambleWords} />
        </motion.h1>
        <motion.p className="sub" {...up(0.16)}>
          Voice agents with manners, multi-agent workspaces where humans stay in charge, and post-training runs that <b>actually move the benchmark</b>. Shipped at Expedia, Siemens Energy, Agnikul Cosmos, DRDO, and a <b>100K+★</b> open-source runtime, plus <b>six products</b> of my own and two campus apps with SUTT.
        </motion.p>
        <motion.div className="ctas" {...up(0.24)}>
          <Magnetic className="btn" href="#work" data-cur="go">Play with the work</Magnetic>
          <Magnetic className="btn sec" href="#chat" data-cur="chat">Interview me</Magnetic>
          <Magnetic className="btn ghost" href={links.resume} target="_blank" rel="noopener" onClick={() => complete('resume')}>Resume ↗</Magnetic>
        </motion.div>
      </div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.1 }}>
        <Sky />
        <Stickers />
        <div className="hero-lory">
          <div className="bubble">{tips.top}</div>
          <Buddy size={140} {...lory} onClick={greetLory} label="Lory, your guide. Open quests" />
        </div>
      </motion.div>
    </header>
  )
}
