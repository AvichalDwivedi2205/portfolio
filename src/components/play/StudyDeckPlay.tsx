import { useState } from 'react'
import { played } from '../../game/store'
import { Stage, Try } from './Stage'

const courses = [
  { id: 'CS F211', name: 'DSA', day: 0, hr: 1 },
  { id: 'MATH F211', name: 'Maths III', day: 0, hr: 1 },
  { id: 'ECON F211', name: 'Econ', day: 1, hr: 2 },
  { id: 'BITS F110', name: 'Graphics', day: 2, hr: 0 },
]
const days = ['Mon', 'Tue', 'Wed'], hours = ['9', '10', '11']

/* Add sections, StudyDeck flags the clash. */
export function StudyDeckPlay() {
  const [added, setAdded] = useState<string[]>([])
  const picked = courses.filter(c => added.includes(c.id))
  const cell = (d: number, h: number) => picked.filter(c => c.day === d && c.hr === h)
  const clash = days.flatMap((_, d) => hours.map((_, h) => cell(d, h))).find(c => c.length > 1)

  const toggle = (id: string) => {
    const nx = added.includes(id) ? added.filter(x => x !== id) : [...added, id]
    setAdded(nx)
    const ps = courses.filter(c => nx.includes(c.id))
    if (nx.length >= 3 || ps.some(a => ps.some(b => a !== b && a.day === b.day && a.hr === b.hr))) played('studydeck')
  }

  return (
    <Stage label="timetable · sem 1 · 2026-27" onReset={added.length ? () => setAdded([]) : undefined}>
      <div className="sd-courses">
        {added.length === 0 && <Try>add courses</Try>}
        {courses.map(c => <button key={c.id} className={`sd-c ${added.includes(c.id) ? 'on' : ''}`} onClick={() => toggle(c.id)} data-cur="add">{added.includes(c.id) ? '✓ ' : '+ '}{c.id}</button>)}
      </div>
      <div className="sd-grid">
        <span />
        {days.map(d => <span key={d} className="mono sd-h">{d}</span>)}
        {hours.map((h, hi) => (
          <div key={h} className="sd-row">
            <span className="mono sd-h">{h}:00</span>
            {days.map((_, di) => {
              const cs = cell(di, hi)
              return <span key={di} className={`sd-cell ${cs.length > 1 ? 'clash' : cs.length ? 'full' : ''}`}>{cs.map(c => c.id.split(' ')[0]).join(' + ')}</span>
            })}
          </div>
        ))}
      </div>
      <p className={clash ? 'noline' : 'sd-note'}>{clash ? `Clash: ${clash[0].id} and ${clash[1].id} both meet Mon 10:00. Pick another section.` : `${added.length * 3} credits · no clashes`}</p>
    </Stage>
  )
}
