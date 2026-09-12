import { useRef } from 'react'
import { motion } from 'motion/react'
import { stickers } from '../data'

/* Draggable sticker pile. Motion handles pointer capture + momentum on the compositor. */
export function Stickers() {
  const bounds = useRef<HTMLDivElement>(null)
  const drag = {
    drag: true,
    dragConstraints: bounds,
    dragElastic: 0.18,
    dragTransition: { power: 0.25, timeConstant: 180 },
    whileDrag: { scale: 1.07, zIndex: 20, boxShadow: '2px 2px 0 rgba(0,0,0,.6)' },
    whileHover: { scale: 1.03 },
    transition: { type: 'spring', stiffness: 400, damping: 26 },
  } as const

  return (
    <div className="cluster" ref={bounds}>
      <motion.div className="polaroid" data-cur="drag" style={{ rotate: -7 }} {...drag} initial={{ opacity: 0, y: 40, rotate: -14 }} animate={{ opacity: 1, y: 0, rotate: -7 }}>
        <div className="img">
          <img src="/portrait.jpg" alt="Avichal Dwivedi" />
        </div>
        <div className="cap">avichal, 2026 ✌</div>
      </motion.div>

      {stickers.map((s, i) => (
        <motion.div
          key={s.text}
          className={`stk ${s.color}`}
          data-cur="drag"
          style={{ left: s.x, top: s.y, rotate: s.rot }}
          {...drag}
          initial={{ opacity: 0, scale: 0.6, rotate: s.rot + 20 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rot, transition: { type: 'spring', stiffness: 260, damping: 16, delay: 0.15 + i * 0.07 } }}
        >
          {s.text}<small>{s.sub}</small>
        </motion.div>
      ))}

      <div className="hint mono">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11V6a2 2 0 1 1 4 0v5M13 11V8a2 2 0 1 1 4 0v4M17 12a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L4 14a2 2 0 1 1 3.4-2L9 14" /></svg>
        stickers are draggable. go on.
      </div>
    </div>
  )
}
