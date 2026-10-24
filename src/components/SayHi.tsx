import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { links } from '../data'
import { closeHi, complete, openHi, useUi } from '../game/store'
import { useMedia } from '../hooks'
import { Buddy, useLory } from './Buddy'
import { Icon } from './Icon'

const mailto = `mailto:${links.email}?subject=${encodeURIComponent('Hi Avichal, saw your portfolio')}`

/* mailto does nothing for people without a desktop mail app, so the address is always one tap from the clipboard too. */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  const copy = async () => {
    try { await navigator.clipboard.writeText(links.email) } catch {
      const t = Object.assign(document.createElement('textarea'), { value: links.email })
      document.body.append(t); t.select(); document.execCommand('copy'); t.remove()
    }
    complete('hi')
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }
  return [copied, copy] as const
}

export function SayHiButton() {
  return (
    <button className="btn hi-btn" onClick={openHi} data-cur="hi!" aria-haspopup="dialog">
      <Icon name="mail" size={18} stroke={2.4} /><span>Say hi</span>
    </button>
  )
}

/* Desktop: a card under the nav button. Phone: a bottom sheet you can swipe away. */
export function SayHiSheet() {
  const open = useUi(s => s.hi)
  const phone = useMedia('(max-width: 600px)')
  const lory = useLory()
  const [copied, copy] = useCopyEmail()
  const hi = () => complete('hi')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeHi() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  const motionProps = phone
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' }, drag: 'y' as const, dragConstraints: { top: 0, bottom: 0 }, dragElastic: { top: 0, bottom: 0.6 },
        onDragEnd: (_: unknown, i: { offset: { y: number }; velocity: { y: number } }) => { if (i.offset.y > 90 || i.velocity.y > 500) closeHi() } }
    : { initial: { opacity: 0, y: -12, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -8, scale: 0.97 } }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="hi-veil" className="hi-veil" onClick={closeHi} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div key="hi-sheet" className="hi-sheet" role="dialog" aria-modal="true" aria-label="Contact Avichal"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }} {...motionProps}>
            <span className="hi-grab" aria-hidden />
            <div className="hi-head">
              <Buddy size={58} {...lory} mood="wave" follow={false} />
              <div>
                <span className="hand">replies in hours, not days</span>
                <b>Say hi to Avichal</b>
                <small>Remote · async-friendly · overlaps US/EU hours</small>
              </div>
              <button className="qb-x" onClick={closeHi} aria-label="Close"><Icon name="close" size={18} stroke={2.6} /></button>
            </div>
            <a className="btn hi-mail" href={mailto} onClick={hi} data-cur="mail"><Icon name="mail" size={20} stroke={2.4} /> Email me</a>
            <button className={`hi-copy ${copied ? 'done' : ''}`} onClick={copy} aria-label={`Copy ${links.email}`}>
              <span className="mono">{links.email}</span>
              <span className="hi-copy-b">{copied ? <><Icon name="check" size={14} stroke={3} /> Copied</> : 'Copy'}</span>
            </button>
            <div className="hi-socials">
              <a className="btn sm sec" href={links.linkedin} target="_blank" rel="noopener" onClick={hi}>LinkedIn</a>
              <a className="btn sm sec" href={links.x} target="_blank" rel="noopener" onClick={hi}>X</a>
              <a className="btn sm sec" href={links.github} target="_blank" rel="noopener" onClick={hi}>GitHub</a>
            </div>
            <div className="hi-foot">
              <span>Hiring for an AI team? Perfect.</span>
              <a href={links.resume} target="_blank" rel="noopener" onClick={() => complete('resume')}>Resume ↗</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
