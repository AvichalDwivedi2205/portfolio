import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer } from '../hooks'

export function Cursor() {
  const fine = useFinePointer()
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!fine) return
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cur]')
      setLabel(t?.dataset.cur ?? '')
    }
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerover', over, { passive: true })
    return () => { removeEventListener('pointermove', move); removeEventListener('pointerover', over) }
  }, [fine, x, y])

  if (!fine) return null
  return (
    <>
      <motion.div className="cursor" style={{ x, y }} />
      <motion.div className={`cursor-ring${label ? ' big' : ''}`} style={{ x: rx, y: ry }}>{label}</motion.div>
    </>
  )
}
