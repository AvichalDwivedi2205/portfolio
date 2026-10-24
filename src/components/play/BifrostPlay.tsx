import { useEffect, useRef, useState } from 'react'
import { played } from '../../game/store'
import { Stage, Try } from './Stage'

const agents = ['coordinator', 'research', 'risk', 'execution', 'verifier', 'settlement']
const COST = 2.4

/* Missions under a budget: below cost, the verifier vetoes before anything settles. */
export function BifrostPlay() {
  const [budget, setBudget] = useState(1.5)
  const [at, setAt] = useState(-1)
  const [result, setResult] = useState<'veto' | 'settled' | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const launch = () => {
    setResult(null)
    const veto = COST > budget
    const last = veto ? 4 : 5
    for (let i = 0; i <= last; i++) timers.current.push(window.setTimeout(() => setAt(i), i * 380))
    timers.current.push(window.setTimeout(() => { setResult(veto ? 'veto' : 'settled'); played('bifrost') }, last * 380 + 300))
  }
  const reset = () => { timers.current.forEach(clearTimeout); setAt(-1); setResult(null) }
  const running = at >= 0 && !result

  return (
    <Stage label="mission #BF-0192 · buy compute credits" onReset={at >= 0 && !running ? reset : undefined}>
      <div className="bif">
        <label className="budget">
          <span className="mono">budget</span>
          <input type="range" min={0.5} max={5} step={0.1} value={budget} disabled={running} onChange={e => { setBudget(+e.target.value); reset() }} />
          <b>{budget.toFixed(1)} SOL</b>
        </label>
        <div className="mono est">estimated spend {COST.toFixed(1)} SOL</div>
        <div className="agents">
          {agents.map((a, i) => (
            <span key={a} className={`ag ${i <= at ? 'lit' : ''} ${result === 'veto' && i === 4 ? 'veto' : ''} ${result === 'veto' && i === 5 ? 'skip' : ''}`}>{a}</span>
          ))}
        </div>
        {result === 'veto' && <p className="noline">Veto. Execution would spend {COST.toFixed(1)} SOL against a {budget.toFixed(1)} SOL budget. Nothing settled.</p>}
        {result === 'settled' && <p className="okline">Settled · receipt BF-0192 · {COST.toFixed(1)} of {budget.toFixed(1)} SOL · verifier signed</p>}
      </div>
      {at < 0 && <div className="stage-act"><Try>set a budget</Try><button className="btn sm sun" onClick={launch} data-cur="launch">Launch mission</button></div>}
    </Stage>
  )
}
