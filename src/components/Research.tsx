import { research } from '../data'
import { Arrow, R, SectionHead } from './ui'

export function Research() {
  return (
    <section className="lab" id="research" data-theme="dark">
      <div className="wrap">
        <SectionHead label="Lab notes" title="Lab notes." note={<>Post-training · RL envs<br />on-device · multi-agent</>} />
        <div className="lab-grid">
          {research.map((r, i) => (
            <R key={r.title} className="lab-cell" delay={(i % 2) * 0.1}>
              <a href={r.href} target="_blank" rel="noopener" data-cur="repo">
                <div className="lab-top">
                  <span className="mono dim">{String(i + 1).padStart(2, '0')}</span>
                  {r.badge && <span className="badge mono">{r.badge}</span>}
                </div>
                <h3>{r.title}</h3>
                <span className="label dim">{r.sub}</span>
                <p className="dim">{r.body}</p>
                <div className="lab-bot">
                  <ul className="tags">{r.stack.map(s => <li key={s}>{s}</li>)}</ul>
                  <span className="lab-go" aria-hidden><Arrow diag /></span>
                </div>
              </a>
            </R>
          ))}
        </div>
      </div>
    </section>
  )
}
