import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Hue } from '../../data'
import { played } from '../../game/store'
import { Stage, Try } from './Stage'

const tiles: { id: string; label: string; hue: Hue; out: string }[] = [
  { id: 'food', label: 'Food', hue: 'coral', out: 'Masala chai + maggi from ANC · room delivery in 12 min · pay by QR' },
  { id: 'cabs', label: 'Cabs', hue: 'sun', out: 'Pilani → Jaipur Airport · Fri 6:00 · 2 seats left in the carpool' },
  { id: 'sign', label: 'Signings', hue: 'lav', out: 'Signed up: BOSM merch tee, size M · ₹450 on your SU account' },
  { id: 'exp', label: 'Expenses', hue: 'moss', out: 'This month ₹3,240 · food 68% · still under your limit' },
]

export function SuPlay() {
  const [on, setOn] = useState<string | null>(null)
  const t = tiles.find(x => x.id === on)
  return (
    <Stage label="su app · home">
      <div className="su">
        {tiles.map(x => (
          <button key={x.id} className={`su-t ${on === x.id ? 'on' : ''}`} style={{ ['--c' as string]: `var(--${x.hue})`, ['--cd' as string]: `var(--${x.hue}-d)` }}
            onClick={() => { setOn(x.id); played('suapp') }} data-cur="tap">{x.label}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {t ? <motion.p key={t.id} className="su-out" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{t.out}</motion.p>
          : <div className="stage-act"><Try>tap a tile</Try></div>}
      </AnimatePresence>
    </Stage>
  )
}
