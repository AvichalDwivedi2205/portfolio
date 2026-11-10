import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer } from '../hooks'

type Mode = { label: string; link: boolean }

/* A dot that tracks the pointer exactly and a disc that trails it. The disc grows over links and
   carries a word over anything tagged with data-cur. Both blend in difference mode. */
export function Cursor() {
  const fine = useFinePointer()
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 })
  const [mode, setMode] = useState<Mode>({ label: '', link: false })
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (!fine) return
    const root = document.documentElement
    root.classList.add('has-cursor')
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e: PointerEvent) => {
      const t = e.target as Element
      const label = t.closest<HTMLElement>('[data-cur]')?.dataset.cur ?? ''
      const link = !!t.closest('a,button,[role=button],input,label')
      setMode(m => (m.label === label && m.link === link ? m : { label, link }))
    }
    const press = () => setDown(true), release = () => setDown(false)
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerover', over, { passive: true })
    addEventListener('pointerdown', press)
    addEventListener('pointerup', release)
    return () => {
      root.classList.remove('has-cursor')
      removeEventListener('pointermove', move)
      removeEventListener('pointerover', over)
      removeEventListener('pointerdown', press)
      removeEventListener('pointerup', release)
    }
  }, [fine, x, y])

  if (!fine) return null
  const state = mode.label ? 'word' : mode.link ? 'link' : ''
  return (
    <>
      <motion.div className={`cur-dot ${state ? 'off' : ''}`} style={{ x, y }} />
      <motion.div className={`cur-disc ${state} ${down ? 'down' : ''}`} style={{ x: rx, y: ry }}><span>{mode.label}</span></motion.div>
    </>
  )
}
