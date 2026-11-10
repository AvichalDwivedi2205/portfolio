import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { marquee } from '../data'
import { useReducedMotion } from '../hooks'

const wrap = (min: number, max: number, v: number) => min + ((((v - min) % (max - min)) + (max - min)) % (max - min))

/* A marquee that idles sideways and takes its speed and direction from how the page is being scrolled. */
function BigMarquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 3], { clamp: false })
  const x = useTransform(base, v => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const b = boost.get()
    if (b < 0) dir.current = -1
    else if (b > 0) dir.current = 1
    base.set(base.get() - dir.current * (1 + Math.abs(b)) * 2.2 * (Math.min(delta, 50) / 1000))
  })

  const row = (hidden: boolean) => (
    <div className="mq-row" aria-hidden={hidden}>
      {items.map(m => <span key={m}>{m}<i>✦</i></span>)}
    </div>
  )
  return (
    <div className="mq">
      <motion.div className="mq-track" style={{ x }}>{row(false)}{row(true)}</motion.div>
    </div>
  )
}

/* Pinned for a little over a screen. The next section is pulled up over the pin in CSS and rolls in
   over it behind a wave crest (see Facts). */
export function Signal() {
  return (
    <section className="sig" data-theme="dark">
      <div className="sig-pin">
        <div className="wrap sig-top">
          <span className="label">Focused on the hard part:<br />the moment a human answers back.</span>
        </div>
        <BigMarquee items={marquee} />
        <div className="wrap sig-bot">
          <span className="label">✦ From prompt to production.</span>
        </div>
      </div>
    </section>
  )
}
