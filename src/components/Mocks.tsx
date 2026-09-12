import { motion } from 'motion/react'

const DELAYS = [0, .1, .2, .3, .4, .5, .4, .3, .2, .1, .05, .25, .45, .65, .45, .25, .05, .15, .35, .55]
const lines = [
  { who: 'aperture', t: 'You moved the queue off Redis. What broke first?' },
  { who: 'candidate', t: 'Consumer lag. We acked before the write committed. Lost ~2% of jobs on crash.' },
  { who: 'aperture', t: 'How did you make that visible before it happened again?' },
]

/* Fake live voice interview: CSS bars + staggered transcript. */
export function ApertureMock() {
  return (
    <div className="live" style={{ transform: 'translateZ(30px)' }}>
      <div className="hdr mono"><span>interview · backend eng · #0412</span><span className="rec"><i />rec 04:12</span></div>
      <div className="bars" aria-hidden>{DELAYS.map((d, i) => <i key={i} style={{ animationDelay: `${d}s` }} />)}</div>
      <div className="tr">
        {lines.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.9, duration: 0.5 }}>
            <b className={l.who === 'candidate' ? 'me' : ''}>{l.who}</b><span>{l.t}</span>
          </motion.div>
        ))}
      </div>
      <div className="sc">
        <div><small>skill depth</small><strong>8.4</strong></div>
        <div><small>ownership</small><strong>9.1</strong></div>
        <div><small>resume</small><strong className="hl">✓</strong></div>
      </div>
    </div>
  )
}

const workers = [
  { role: 'architect', engine: 'codex', state: 'done', pct: 100, x: 6, y: 8, c: 'var(--lime)' },
  { role: 'frontend', engine: 'claude', state: 'running', pct: 62, x: 52, y: 4, c: 'var(--purple)' },
  { role: 'api', engine: 'codex', state: 'running', pct: 38, x: 10, y: 54, c: 'var(--blue)' },
  { role: 'qa', engine: 'claude', state: 'queued', pct: 0, x: 56, y: 58, c: 'var(--fg3)' },
]

/* Guild: multi-agent canvas with reserved regions + job states. */
export function GuildMock() {
  return (
    <div className="live canvas guild" style={{ transform: 'translateZ(30px)' }}>
      <div className="hdr mono"><span>team run · cinemaverse · 4 jobs</span><span className="rec" style={{ color: 'var(--purple)' }}><i style={{ background: 'var(--purple)' }} />runner paired</span></div>
      <div className="gcanvas">
        <svg className="gedges" viewBox="0 0 400 200" fill="none" strokeWidth="1.5" aria-hidden>
          <motion.path d="M150 45 C 190 45, 190 40, 220 40" stroke="var(--fg3)" strokeDasharray="4 5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: .5 }} />
          <motion.path d="M85 80 C 85 110, 90 120, 90 130" stroke="var(--fg3)" strokeDasharray="4 5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: .7 }} />
          <motion.path d="M200 165 C 220 165, 225 160, 240 160" stroke="var(--fg3)" strokeDasharray="4 5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: .9 }} />
        </svg>
        {workers.map((w, i) => (
          <motion.div
            key={w.role}
            className={`gw ${w.state}`}
            style={{ left: `${w.x}%`, top: `${w.y}%`, ['--c' as string]: w.c }}
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + i * 0.12 }}
          >
            <div className="gwh mono"><span>{w.role}</span><span className="geng">{w.engine}</span></div>
            <div className="gbar"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: w.pct / 100 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] }} /></div>
            <div className="gst mono">{w.state}{w.state === 'running' && <i className="gdot" />}</div>
          </motion.div>
        ))}
        <div className="gcur" aria-hidden><span>you</span></div>
      </div>
    </div>
  )
}

/* LatchGrid: nodes on a grid with drawn connectors. */
export function CanvasMock() {
  return (
    <div className="live canvas">
      <svg viewBox="0 0 400 220" width="100%" fill="none" strokeWidth="2">
        <motion.path d="M110 70 C 160 70, 160 130, 210 130" stroke="var(--orange)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: .3 }} />
        <motion.path d="M290 130 C 320 130, 320 60, 350 60" stroke="var(--fg3)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: .6 }} />
        <motion.path d="M70 110 C 70 180, 200 180, 210 150" stroke="var(--fg3)" strokeDasharray="4 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: .9 }} />
        <rect x="30" y="40" width="80" height="60" rx="10" fill="var(--bg2)" stroke="var(--fg)" /><text x="70" y="75" fill="var(--fg2)" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle">▶ yt</text>
        <rect x="210" y="110" width="80" height="60" rx="10" fill="var(--orange)" stroke="var(--bg)" /><text x="250" y="145" fill="var(--bg)" fontFamily="Bricolage Grotesque" fontWeight="800" fontSize="13" textAnchor="middle">chat</text>
        <rect x="330" y="30" width="60" height="60" rx="30" fill="var(--bg2)" stroke="var(--fg)" /><text x="360" y="65" fill="var(--fg2)" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle">pdf</text>
        <rect x="40" y="150" width="70" height="44" rx="10" fill="var(--bg2)" stroke="var(--fg)" /><text x="75" y="177" fill="var(--fg2)" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle">🎙 note</text>
      </svg>
    </div>
  )
}
