import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ComponentProps, PointerEvent } from 'react'
import { useFinePointer } from '../hooks'

type Props = ComponentProps<typeof motion.a> & { strength?: number }

/* Button that leans toward the pointer. Pure motion values: no re-render per frame. */
export function Magnetic({ strength = 0.2, children, ...rest }: Props) {
  const fine = useFinePointer()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 350, damping: 22, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 350, damping: 22, mass: 0.5 })

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength * 1.4)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.a {...rest} style={{ x: sx, y: sy, ...rest.style }} onPointerMove={onMove} onPointerLeave={reset} whileTap={{ scale: 0.96 }}>
      {children}
    </motion.a>
  )
}
