import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '../hooks'

const wipe = [0.76, 0, 0.24, 1] as const

/* Ticker wipe: outgoing word exits up, incoming enters from below, both clipped to the line. */
export function WordSwap({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI(n => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce])

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a))

  return (
    <span className="scr">
      <span className="scr-ghost" aria-hidden>{longest}</span>
      <span className="scr-mask">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[i]}
            className="scr-word"
            initial={reduce ? false : { y: '115%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-115%' }}
            transition={{ duration: 0.55, ease: wipe }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
