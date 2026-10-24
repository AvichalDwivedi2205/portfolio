import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { WordSwap } from './WordSwap'
import { Stickers } from './Stickers'
import { Magnetic } from './Magnetic'
import { Sky } from './Sky'
import { SkyStars } from './SkyStars'
import { StarterQuests } from './StarterQuests'
import { Buddy, useLory } from './Buddy'
import { links, loryChat, loryHints, scrambleWords } from '../data'
import { complete, react, useGame } from '../game/store'
import { ease } from '../hooks'

const up = (d: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay: d } })

type Doodle = { x: string; y: string; k: 'spark' | 'dot' | 'ring' | 'plus'; c: string; s: number; wide?: boolean }
const doodles: Doodle[] = [
  { x: '-3.5%', y: '12%', k: 'spark', c: 'coral', s: 26 },
  { x: '-2.5%', y: '52%', k: 'ring', c: 'sky', s: 18, wide: true },
  { x: '-4%', y: '84%', k: 'plus', c: 'lav', s: 18, wide: true },
  { x: '45%', y: '4%', k: 'spark', c: 'sun', s: 30 },
  { x: '50%', y: '40%', k: 'dot', c: 'rose', s: 12, wide: true },
  { x: '50.5%', y: '74%', k: 'spark', c: 'moss', s: 22, wide: true },
  { x: '96%', y: '3.5%', k: 'plus', c: 'coral', s: 20 },
  { x: '101.5%', y: '46%', k: 'spark', c: 'lav', s: 24, wide: true },
  { x: '100.5%', y: '88%', k: 'dot', c: 'sun', s: 14, wide: true },
]
const shape = (k: Doodle['k']) => ({
  spark: <path d="M12 1c.8 6 4.9 10.2 11 11-6.1.8-10.2 5-11 11-.8-6-4.9-10.2-11-11 6.1-.8 10.2-5 11-11z" fill="currentColor" stroke="var(--out)" strokeWidth="1.6" strokeLinejoin="round" />,
  dot: <circle cx="12" cy="12" r="9" fill="currentColor" stroke="var(--out)" strokeWidth="2.4" />,
  ring: <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="4" />,
  plus: <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />,
}[k])

function Doodles() {
  return (
    <div className="doodles" aria-hidden>
      {doodles.map((d, i) => (
        <svg key={i} className={`dd ${d.wide ? 'wide' : ''}`} viewBox="0 0 24 24" width={d.s} height={d.s}
          style={{ left: d.x, top: d.y, color: `var(--${d.c})`, animationDelay: `${(i % 4) * -1.3}s` }}>{shape(d.k)}</svg>
      ))}
    </div>
  )
}

/* Hero Lory: tapping says hi, pops hearts, and the bubble always points at the next thing to do. */
function HeroLory() {
  const lory = useLory()
  const done = useGame(s => s.done), stars = useGame(s => s.stars.length), chest = useGame(s => s.chest)
  const [chat, setChat] = useState(-1)
  const [hearts, setHearts] = useState<number[]>([])
  const hid = useRef(0)

  const line = !done.includes('hello') ? loryHints.hello
    : !done.includes('sticker') ? loryHints.sticker
    : stars < 3 ? loryHints.stars(stars)
    : !chest ? loryHints.chest
    : chat >= 0 ? loryChat[chat % loryChat.length] : loryHints.next

  const pet = () => {
    complete('hello')
    react('wave', 1400)
    if (chest) setChat(c => c + 1)
    const id = ++hid.current
    setHearts(h => [...h.slice(-5), id])
    setTimeout(() => setHearts(h => h.filter(x => x !== id)), 1100)
  }

  return (
    <div className="hero-lory">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={line} className="bubble" initial={{ opacity: 0, y: 6, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }}>
          {line}
        </motion.div>
      </AnimatePresence>
      <div className="lory-wrap">
        {hearts.map(id => (
          <svg key={id} className="heart" viewBox="0 0 24 24" width="24" height="24" aria-hidden style={{ ['--dx' as string]: `${((id * 37) % 60) - 30}px` }}>
            <path d="M12 21C5 16.2 2.5 12.6 2.5 9 2.5 6.2 4.7 4 7.4 4c1.9 0 3.6 1 4.6 2.6C13 5 14.7 4 16.6 4c2.7 0 4.9 2.2 4.9 5 0 3.6-2.5 7.2-9.5 12z" fill="var(--rose)" stroke="var(--out)" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        ))}
        <Buddy size={140} {...lory} onClick={pet} label="Lory, your guide. Tap to say hi" />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <header className="hero" id="hero" data-tip="top">
      <Doodles />
      <div className="hero-copy">
        <motion.div className="kicker" {...up(0)}>
          <span className="p1">P1</span><span>Avichal Dwivedi</span> <b>BITS Pilani '27</b> <span className="hand">ships from India, works in your timezone</span>
        </motion.div>
        <motion.h1 className="disp" {...up(0.08)}>
          <span className="w">I</span> <span className="w">build</span> <span className="w">AI</span><br />
          <span className="w">that</span> <WordSwap words={scrambleWords} />
        </motion.h1>
        <motion.p className="sub" {...up(0.16)}>
          Voice agents with manners, multi-agent workspaces where humans stay in charge, and post-training that <b>moves the benchmark</b>. Shipped at Expedia, Siemens Energy, Agnikul Cosmos, DRDO and a <b>100K+★</b> open-source runtime, plus <b>six products</b> of my own.
        </motion.p>
        <motion.div className="ctas" {...up(0.24)}>
          <Magnetic className="btn" href="#work" data-cur="go">Play with the work</Magnetic>
          <Magnetic className="btn sec" href="#chat" data-cur="chat">Interview me</Magnetic>
          <Magnetic className="btn ghost" href={links.resume} target="_blank" rel="noopener" onClick={() => complete('resume')}>Resume ↗</Magnetic>
        </motion.div>
        <motion.div {...up(0.32)}><StarterQuests /></motion.div>
      </div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.1 }}>
        <Sky />
        <Stickers />
        <SkyStars />
        <HeroLory />
      </motion.div>
      <a className="scroll-cue" href="#chat" aria-label="Scroll to start"><span className="mouse"><i /></span><span className="hand">scroll to start</span></a>
    </header>
  )
}
