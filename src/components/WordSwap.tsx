import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '../hooks'

/* Cycles words with a quiet fade + slide. Every word sits hidden in the same grid cell, so the box is as wide as the widest one and layout never jumps. */
export function WordSwap({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI(n => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce])

  return (
    <span className="scr">
      {words.map(w => <span key={w} className="scr-ghost" aria-hidden>{w}</span>)}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="scr-word"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
