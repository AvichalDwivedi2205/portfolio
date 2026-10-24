import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { played } from '../../game/store'
import { Icon } from '../Icon'
import { Stage, Try } from './Stage'

const reports = [
  { who: 'Maya Chen', ch: 'X', t: 'Every photo from my phone gets rejected.' },
  { who: 'Oliver Park', ch: 'Chat', t: "My 3 MB photo won't upload, but the app says up to 5 MB." },
  { who: 'Aisha Patel', ch: 'Email', t: 'Upload returns HTTP 413.' },
]
const tones = {
  Friendly: 'Hey Maya! So sorry about that. Photos over 1 MB were hitting a server limit. The fix is live, so give it another go and tell us how it looks.',
  Professional: "Hi Maya, thanks for flagging this. Uploads over 1 MB were rejected by a server limit. We've deployed and verified a fix; your photos should upload normally now.",
  Short: 'Fixed! Photos up to 5 MB upload again. Thanks for the heads up, Maya.',
}
type Tone = keyof typeof tones

/* Three complaints become one issue, one on-brand reply, one approved fix. */
export function CuePlay() {
  const [step, setStep] = useState(0)
  const [tone, setTone] = useState<Tone>('Friendly')
  const next = () => setStep(s => { if (s === 2) played('cue'); return s + 1 })

  return (
    <Stage
      label="cue · bloom workspace · inbox"
      status={<span className={`pill-s ${step === 3 ? 'ok' : ''}`}>{['3 new reports', 'issue opened', 'waiting for you', 'resolved'][step]}</span>}
      onReset={step ? () => { setStep(0); setTone('Friendly') } : undefined}
    >
      <div className="cue">
        <AnimatePresence mode="popLayout" initial={false}>
          {step === 0 && reports.map((r, i) => (
            <motion.div key={r.who} layout className="rep" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 + i * -10, scale: 0.6 }} transition={{ type: 'spring', stiffness: 380, damping: 28, delay: i * 0.04 }}>
              <span className="av">{r.who.split(' ').map(w => w[0]).join('')}</span>
              <span><b>{r.who}</b> <em className="mono">{r.ch}</em><br />{r.t}</span>
            </motion.div>
          ))}
          {step >= 1 && (
            <motion.div key="iss" layout className="iss" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 360, damping: 24 }}>
              <div className="iss-t"><b>ISS-14</b> Photo uploads over 1 MB fail with HTTP 413</div>
              <div className="iss-m mono">3 reports · X, chat, email · evidence: proxy body limit 1m</div>
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div key="draft" layout className="draft" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <div className="draft-h mono"><span>reply to Maya · on X</span>
                <span className="tones">{(Object.keys(tones) as Tone[]).map(t => <button key={t} className={t === tone ? 'on' : ''} onClick={() => setTone(t)} disabled={step === 3}>{t}</button>)}</span>
              </div>
              <AnimatePresence mode="wait"><motion.p key={tone} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>{tones[tone]}</motion.p></AnimatePresence>
              <div className="iss-m mono">fix by codex · raise limit to 5 MB · commit 3f9a2c1</div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="ok" layout className="okline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Icon name="check" size={18} stroke={3} /> Approved by you · customer scenario passed on the deployed build · 3 replies sent in their own channels
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {step < 3 && (
        <div className="stage-act">
          {step === 0 && <Try />}
          <button className="btn sm rose" onClick={next} data-cur="go">
            {['Group into one issue', 'Draft on-brand replies', 'Approve draft & fix'][step]}
          </button>
        </div>
      )}
    </Stage>
  )
}
