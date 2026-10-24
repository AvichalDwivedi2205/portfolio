import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { played } from '../../game/store'
import { Icon } from '../Icon'
import { Stage, Try } from './Stage'

type Phase = 'broken' | 'proposed' | 'fixed' | 'undo'

const Speaker = ({ muted }: { muted: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />}
  </svg>
)

/* Inspect → propose → approve → apply → verify → approved undo. */
export function FoReachPlay() {
  const [phase, setPhase] = useState<Phase>('broken')
  const [ok, setOk] = useState(false)
  const fixed = phase === 'fixed' || phase === 'undo'
  const reset = () => { setPhase('broken'); setOk(false) }

  return (
    <Stage label="fo reach · local companion · lease 20 min" onReset={phase !== 'broken' ? reset : undefined}>
      <div className="mac">
        <div className="mac-bar">
          <span className="dots"><i /><i /><i /></span>
          <span className={`mac-out ${fixed ? 'on' : 'off'}`}><Speaker muted={!fixed} />{fixed ? 'MacBook Speakers' : 'Studio Display · muted'}</span>
        </div>
        <div className="mac-body">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {phase === 'broken' && (
                <>
                  <p className="fo"><b>Fo</b> I read your sound settings: output goes to Studio Display, and it's muted.</p>
                  <div className="stage-act"><Try>help fo out</Try><button className="btn sm sky" onClick={() => setPhase('proposed')} data-cur="ask">Ask Fo to fix it</button></div>
                </>
              )}
              {phase === 'proposed' && (
                <>
                  <p className="fo"><b>Fo</b> Proposed change: set output to MacBook Speakers. Volume and other devices stay exactly as they are.</p>
                  <label className="approve"><input type="checkbox" checked={ok} onChange={e => setOk(e.target.checked)} /> I approve this exact change</label>
                  <div className="stage-act"><button className="btn sm sky" disabled={!ok} onClick={() => { setPhase('fixed'); played('foreach') }}>Apply</button></div>
                </>
              )}
              {phase === 'fixed' && (
                <>
                  <p className="okline"><Icon name="check" size={16} stroke={3} /> Applied. Verified with a fresh read: output is MacBook Speakers, not muted.</p>
                  <div className="stage-act"><button className="btn sm sec" onClick={() => setPhase('undo')}>Undo…</button></div>
                </>
              )}
              {phase === 'undo' && (
                <>
                  <p className="fo"><b>Fo</b> Undo is a new plan: switch back to Studio Display. It needs its own yes.</p>
                  <div className="stage-act"><button className="btn sm sec" onClick={() => setPhase('fixed')}>Keep it</button><button className="btn sm sky" onClick={reset}>Approve undo</button></div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  )
}
