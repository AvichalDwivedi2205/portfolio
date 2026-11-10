import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { links } from '../data'
import { ease, useCopy } from '../hooks'
import { lockScroll } from '../scroll'
import { Icon } from './Icon'
import { Roll, UBtn } from './ui'

const mailto = `mailto:${links.email}?subject=${encodeURIComponent('Hi Avichal, saw your portfolio')}`
const socials = [
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'GitHub', href: links.github },
  { label: 'X / Twitter', href: links.x },
]

/* Contact panel that slides in from the right. mailto does nothing for people without a desktop mail app,
   so the address is always one click from the clipboard too. */
export function TalkPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, copy] = useCopy(links.email)

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => { lockScroll(false); removeEventListener('keydown', onKey) }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="tp" data-theme="light">
          <motion.div className="tp-veil" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
          <motion.aside
            className="tp-panel" role="dialog" aria-modal="true" aria-label="Contact Avichal" data-lenis-prevent
            initial={{ x: '104%' }} animate={{ x: 0 }} exit={{ x: '104%' }} transition={{ duration: 0.8, ease }}
          >
            <button className="tp-x" onClick={onClose} aria-label="Close"><Icon name="close" size={14} stroke={2} /></button>

            <div className="tp-head">
              <span className="label"><i className="sq" />Say hi</span>
              <h2>Let’s build something that <em>talks back.</em></h2>
              <p className="small">Remote. Async-friendly. Overlaps US/EU hours. Replies in hours, not days.</p>
            </div>

            <div className="tp-mail">
              <span className="mono">Email</span>
              <button onClick={copy} aria-label={`Copy ${links.email}`}>
                <span>{links.email}</span>
                <span className="mono tp-copy" aria-live="polite">{copied ? <><Icon name="check" size={12} stroke={2.6} /> Copied</> : 'Copy'}</span>
              </button>
              <UBtn href={mailto} cur="mail">Open in your mail app</UBtn>
            </div>

            <div className="tp-links">
              <span className="mono">Elsewhere</span>
              {socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener"><Roll text={s.label} /><span aria-hidden>↗</span></a>)}
            </div>

            <div className="tp-foot">
              <span className="small">Hiring for an AI team? Perfect.</span>
              <UBtn href={links.resume}>Read the résumé</UBtn>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
