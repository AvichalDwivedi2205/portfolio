import { motion } from 'motion/react'
import type { ComponentProps } from 'react'
import { ease } from '../hooks'

type Props = ComponentProps<typeof motion.div> & { delay?: number }

export function Reveal({ delay = 0, children, ...rest }: Props) {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
