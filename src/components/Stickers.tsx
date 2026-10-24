import { useRef } from 'react'
import { motion } from 'motion/react'
import { stickers } from '../data'
import { complete } from '../game/store'
import portrait from '../assets/portrait.jpg'

/* Draggable sticker pile. Motion handles pointer capture + momentum on the compositor. */
export function Stickers() {
  const bounds = useRef<HTMLDivElement>(null)
  const drag = {
    drag: true,
    dragConstraints: bounds,
    dragElastic: 0.18,
    dragTransition: { power: 0.25, timeConstant: 180 },
    whileDrag: { scale: 1.07, zIndex: 20 },
    whileHover: { scale: 1.03 },
    onDragEnd: () => complete('sticker'),
    transition: { type: 'spring', stiffness: 400, damping: 26 },
  } as const

  return (
    <div className="cluster" ref={bounds}>
      <motion.div className="polaroid" data-cur="drag" style={{ rotate: -7 }} {...drag} initial={{ opacity: 0, y: 40, rotate: -14 }} animate={{ opacity: 1, y: 0, rotate: -7 }}>
        <div className="img">
          <img src={portrait} alt="Avichal Dwivedi" />
        </div>
        <div className="cap">avichal, 2026 ✌</div>
      </motion.div>

      {stickers.map((s, i) => (
        <motion.div
          key={s.text}
          className={`stk ${s.hue}`}
          data-cur="drag"
          style={{ left: s.x, top: s.y, rotate: s.rot }}
          {...drag}
          initial={{ opacity: 0, scale: 0.6, rotate: s.rot + 20 }}
          animate={{ opacity: 1, scale: 1, rotate: s.rot, transition: { type: 'spring', stiffness: 260, damping: 16, delay: 0.15 + i * 0.07 } }}
        >
          {s.text}<small>{s.sub}</small>
        </motion.div>
      ))}

      <div className="hint hand">stickers are draggable. go on.</div>
    </div>
  )
}
