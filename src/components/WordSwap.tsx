import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ease, useReducedMotion } from '../hooks'

/* Cycles words through the headline's line mask: the old one leaves by the top while the next rises from
   below, so the line is never empty. */
export function WordSwap({ words, run = true, interval = 2600, onSwap }: { words: string[]; run?: boolean; interval?: number; onSwap?: () => void }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const swapped = useRef(onSwap)
  swapped.current = onSwap

  useEffect(() => {
    if (reduce || !run) return
    const id = setInterval(() => { setI(n => (n + 1) % words.length); swapped.current?.() }, interval)
    return () => clearInterval(id)
  }, [words.length, interval, reduce, run])

  return (
    <span className="swap">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.em
          key={words[i]}
          initial={{ y: '112%' }}
          animate={{ y: 0 }}
          exit={{ y: '-112%' }}
          transition={{ duration: 0.7, ease }}
        >
          {words[i]}.
        </motion.em>
      </AnimatePresence>
    </span>
  )
}
