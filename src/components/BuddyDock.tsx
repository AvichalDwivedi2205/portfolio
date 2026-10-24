import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { tips } from '../data'
import { complete, openBoard, react, say, useUi, wake } from '../game/store'
import { Buddy, useLory } from './Buddy'

export function greetLory() {
  complete('hello')
  react('wave', 1400)
  openBoard()
}

/* Docked Lory: appears once the hero (with the big Lory) scrolls away, comments on each section once. */
export function BuddyDock() {
  const lory = useLory()
  const line = useUi(s => s.say)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.15 })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const seen = new Set<string>()
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        const key = (e.target as HTMLElement).dataset.tip
        if (!e.isIntersecting || !key || seen.has(key) || !tips[key]) continue
        seen.add(key)
        say(tips[key], matchMedia('(max-width: 600px)').matches ? 3200 : 5200)
      }
    }, { rootMargin: '-40% 0px -55% 0px' })
    document.querySelectorAll('[data-tip]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let t = 0
    const arm = () => {
      clearTimeout(t)
      t = window.setTimeout(() => react('sleepy', 120_000), 30_000)
    }
    const onAct = () => { wake(); arm() }
    arm()
    addEventListener('pointermove', onAct, { passive: true })
    addEventListener('scroll', onAct, { passive: true })
    addEventListener('keydown', onAct)
    return () => { clearTimeout(t); removeEventListener('pointermove', onAct); removeEventListener('scroll', onAct); removeEventListener('keydown', onAct) }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="dock" initial={{ y: 160, rotate: 12 }} animate={{ y: 0, rotate: 0 }} exit={{ y: 160, rotate: 12 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <AnimatePresence>
            {line && (
              <motion.div key={line.id} className="bubble dock-say" initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 26 }}>
                {line.text}
              </motion.div>
            )}
          </AnimatePresence>
          <Buddy size={96} {...lory} onClick={greetLory} label="Lory, your guide. Open quests" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
