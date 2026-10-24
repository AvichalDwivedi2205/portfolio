import { AnimatePresence, motion } from 'motion/react'
import { useUi } from '../game/store'
import { Coin, Icon } from './Icon'

export function Toasts() {
  const toasts = useUi(s => s.toasts)
  return (
    <div className="toasts" aria-live="polite">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id} layout className={`toast ${t.kind}`}
            initial={{ opacity: 0, y: -40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            <span className="tic">{t.kind === 'quest' ? <Coin size={24} /> : <Icon name={t.kind === 'level' ? 'star' : t.kind === 'chest' ? 'chest' : 'bag'} size={20} stroke={2.4} />}</span>
            <span><b>{t.kind === 'quest' ? `Quest complete · ${t.title}` : t.title}</b><small>{t.sub}</small></span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
