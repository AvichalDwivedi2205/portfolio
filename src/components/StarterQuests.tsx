import { chestCoins, quests, starter, type Hue } from '../data'
import { claimChest, openBoard, starterDone, useGame } from '../game/store'
import { Coin, Icon } from './Icon'

const hue = (h: Hue) => ({ ['--c' as string]: `var(--${h})`, ['--cd' as string]: `var(--${h}-d)`, ['--cl' as string]: `var(--${h}-l)` })

/* Duolingo-style quest strip on the landing screen: three quick wins, then a chest you open yourself. */
export function StarterQuests() {
  const done = useGame(s => s.done), stars = useGame(s => s.stars.length), chest = useGame(s => s.chest)
  const n = starter.filter(q => done.includes(q.id)).length
  const ready = starterDone(done) && !chest

  return (
    <div className="starter">
      <div className="st-hd">
        <span className="st-t"><Icon name="star" size={15} fill stroke={0} /> Starter quests <em>{n}/3</em></span>
        <button className="st-all" onClick={() => openBoard('quests')}>all {quests.length} quests <Icon name="arrow" size={13} stroke={2.8} /></button>
      </div>
      <div className="st-row">
        {starter.map(s => {
          const q = quests.find(x => x.id === s.id)!, ok = done.includes(s.id)
          return (
            <div key={s.id} className={`sq ${ok ? 'ok' : ''}`} style={hue(q.hue)}>
              <span className="sq-ic"><Icon name={ok ? 'check' : q.icon} size={18} stroke={2.6} /></span>
              <b>{s.title}</b>
              <small>{ok ? 'done!' : s.id === 'stars' ? `${stars}/3 caught` : s.hint}</small>
            </div>
          )
        })}
        {chest
          ? (
            <a className="sq chest open" href="#work" style={hue('moss')} data-cur="go">
              <span className="sq-ic"><Icon name="arrow" size={18} stroke={2.8} /></span>
              <b>Play a demo</b><small>next quest</small>
            </a>
          )
          : (
            <button className={`sq chest ${ready ? 'ready' : ''}`} style={hue('sun')} onClick={claimChest} disabled={!ready} data-cur={ready ? 'open' : undefined}>
              <span className="sq-ic"><Icon name="chest" size={18} stroke={2.4} /></span>
              <b>Starter chest</b>
              <small>{ready ? 'tap to open!' : <><Coin size={12} /> {chestCoins} inside</>}</small>
            </button>
          )}
      </div>
      <span className="st-bar"><i style={{ transform: `scaleX(${chest ? 1 : n / 3})` }} /></span>
    </div>
  )
}
