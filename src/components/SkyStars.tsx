import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { catchStar, useGame } from '../game/store'

const spots = [{ x: '46%', y: '15%' }, { x: '36%', y: '48%' }, { x: '90%', y: '56%' }]

/* Three collectible stars tucked between the stickers. Each catch pays 2 coins; all three finish the Stargazer quest. */
export function SkyStars() {
  const caught = useGame(s => s.stars)
  const [pops, setPops] = useState<number[]>([])
  const grab = (i: number) => {
    catchStar(i)
    setPops(p => [...p, i])
    setTimeout(() => setPops(p => p.filter(x => x !== i)), 900)
  }
  return (
    <>
      {spots.map((p, i) => (
        <AnimatePresence key={i}>
          {!caught.includes(i) && (
            <motion.button
              className="skystar" style={{ left: p.x, top: p.y, animationDelay: `${i * 0.7}s` }}
              onClick={() => grab(i)} aria-label="Catch a star" data-cur="catch"
              exit={{ scale: 2.2, opacity: 0, rotate: 120, transition: { duration: 0.35 } }}
            >
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden>
                <path d="M12 2.5l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17l-5.6 2.9 1.1-6.3L2.9 9.2l6.3-.9z" fill="var(--sun)" stroke="var(--out)" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      ))}
      {pops.map(i => <span key={`pop${i}`} className="star-pop" style={{ left: spots[i].x, top: spots[i].y }}>+2</span>)}
    </>
  )
}
