import { marquee } from '../data'

/* CSS keyframe marquee: cheapest possible, runs on the compositor. */
export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marq" aria-hidden>
      <div className="track">{items.map((m, i) => <span key={i}>{m}</span>)}</div>
    </div>
  )
}
