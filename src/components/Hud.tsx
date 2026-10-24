import { levels, quests } from '../data'
import { levelOf, openBoard, toggleTheme, useGame, useUi } from '../game/store'
import { Coin, Icon } from './Icon'

export function Hud() {
  const xp = useGame(s => s.xp), coins = useGame(s => s.coins), done = useGame(s => s.done.length)
  const lv = levelOf(xp), from = levels[lv].at, to = levels[lv + 1]?.at
  const pct = to ? (xp - from) / (to - from) : 1
  const C = 2 * Math.PI * 15

  return (
    <button className="hud" onClick={() => openBoard('quests')} data-cur="quests" aria-label={`Level ${lv + 1} ${levels[lv].name}, ${coins} coins, ${done} of ${quests.length} quests. Open quest board`}>
      <span className="hud-lv">
        <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden>
          <circle cx="19" cy="19" r="15" fill="var(--sun)" stroke="var(--sun-d)" strokeWidth="3" />
          <circle cx="19" cy="19" r="15" fill="none" stroke="var(--coral)" strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - pct)} transform="rotate(-90 19 19)" className="hud-ring" />
        </svg>
        <b>{lv + 1}</b>
      </span>
      <span className="hud-meta">
        <span className="hud-name">{levels[lv].name}</span>
        <span className="hud-q">{done}/{quests.length} quests</span>
      </span>
      <span className="hud-coins" key={coins}><Coin size={18} />{coins}</span>
    </button>
  )
}

export function ThemeToggle() {
  const theme = useUi(s => s.theme)
  return (
    <button className="theme-btn" onClick={toggleTheme} data-cur={theme === 'day' ? 'night' : 'day'} aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'}`}>
      <Icon name={theme === 'day' ? 'moon' : 'sun'} size={19} />
    </button>
  )
}
