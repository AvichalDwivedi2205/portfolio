import { motion, useScroll, useSpring } from 'motion/react'

export function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  return <motion.div className="progress" style={{ scaleX }} />
}
