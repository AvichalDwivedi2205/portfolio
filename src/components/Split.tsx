import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = { text: string; className?: string; hoverPop?: boolean; children?: ReactNode }

/* Heading that springs in letter by letter when scrolled into view. */
export function Split({ text, className = '', hoverPop = false }: Props) {
  return (
    <motion.h2
      className={`disp ${className}`}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.04 }}
      aria-label={text}
    >
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          className="ch"
          aria-hidden
          variants={{ hide: { opacity: 0, y: 40, rotate: 6 }, show: { opacity: 1, y: 0, rotate: 0 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          whileHover={hoverPop ? { y: -20, rotate: -8, scale: 1.1, color: 'var(--lime)', transition: { type: 'spring', stiffness: 400, damping: 12 } } : undefined}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </motion.h2>
  )
}
