import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { levels, quests, shop, trophies } from '../data'
import { buy, closeBoard, levelOf, resetGame, setTab, toggleWear, useGame, useUi, type Tab } from '../game/store'
import { snappy } from '../hooks'
import { Buddy, useLory } from './Buddy'
import { Coin, Icon } from './Icon'

const tabs: { id: Tab; label: string }[] = [
  { id: 'quests', label: 'Quests' },
  { id: 'wardrobe', label: 'Wardrobe' },
  { id: 'trophies', label: 'Trophies' },
]

function Quests() {
  const done = useGame(s => s.done)
  const order = [...quests].sort((a, b) => Number(done.includes(a.id)) - Number(done.includes(b.id)))
  return (
    <ul className="qlist">
      {order.map(q => {
        const ok = done.includes(q.id)
        return (
          <motion.li layout key={q.id} className={`qrow ${ok ? 'ok' : ''}`} style={{ ['--c' as string]: `var(--${q.hue})`, ['--cl' as string]: `var(--${q.hue}-l)`, ['--cd' as string]: `var(--${q.hue}-d)` }} transition={snappy}>
            <span className="qic"><Icon name={ok ? 'check' : q.icon} size={18} stroke={2.6} /></span>
            <span className="qtx"><b>{q.title}</b><small>{q.hint}</small></span>
            <span className="qrw">{ok ? <em>done</em> : <><span>+{q.xp} XP</span><span><Coin size={13} />{q.coins}</span></>}</span>
          </motion.li>
        )
      })}
    </ul>
  )
}

function Wardrobe() {
  const coins = useGame(s => s.coins), owned = useGame(s => s.owned), wear = useGame(s => s.wear)
  return (
    <div className="shop">
      {shop.map(it => {
        const has = owned.includes(it.id), on = wear.includes(it.id), short = it.price - coins
        return (
          <div key={it.id} className={`item ${on ? 'on' : ''}`}>
            <div className="ithumb"><Buddy size={70} wear={[it.id]} follow={false} label={it.name} /></div>
            <b>{it.name}</b>
            <small>{it.note}</small>
            {has
              ? <button className="btn xs sec" onClick={() => toggleWear(it.id)}>{on ? 'Take off' : 'Wear'}</button>
              : <button className="btn xs" disabled={short > 0} onClick={() => buy(it.id)}><Coin size={14} />{short > 0 ? `${short} more` : it.price}</button>}
          </div>
        )
      })}
    </div>
  )
}

function Trophies() {
  const done = useGame(s => s.done)
  return (
    <>
      <div className="tlabel mono">Avichal's shelf</div>
      <div className="tgrid">
        {trophies.map(t => (
          <div key={t.l} className="troph" style={{ ['--c' as string]: `var(--${t.hue})`, ['--cd' as string]: `var(--${t.hue}-d)` }}>
            <b>{t.n}</b><small>{t.l}</small>
          </div>
        ))}
      </div>
      <div className="tlabel mono">Your badges · {done.length}/{quests.length}</div>
      <div className="bgrid">
        {quests.map(q => {
          const ok = done.includes(q.id)
          return (
            <span key={q.id} className={`badge ${ok ? 'ok' : ''}`} title={ok ? q.title : 'Locked'} style={{ ['--c' as string]: `var(--${q.hue})`, ['--cd' as string]: `var(--${q.hue}-d)` }}>
              <Icon name={ok ? q.icon : 'lock'} size={18} stroke={2.4} />
            </span>
          )
        })}
      </div>
    </>
  )
}

export function QuestBoard() {
  const open = useUi(s => s.board), tab = useUi(s => s.tab)
  const xp = useGame(s => s.xp), coins = useGame(s => s.coins)
  const lory = useLory()
  const lv = levelOf(xp), from = levels[lv].at, to = levels[lv + 1]?.at

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeBoard() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="veil" className="qb-veil" onClick={closeBoard} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside key="board" className="qb" role="dialog" aria-modal="true" aria-label="Quest board"
            initial={{ x: '108%' }} animate={{ x: 0 }} exit={{ x: '108%' }} transition={{ type: 'spring', stiffness: 320, damping: 34 }}>
            <div className="qb-head">
              <Buddy size={84} {...lory} />
              <div className="qb-who">
                <span className="hand">level {lv + 1}</span>
                <b>{levels[lv].name}</b>
                <span className="bar"><i style={{ transform: `scaleX(${to ? (xp - from) / (to - from) : 1})` }} /></span>
                <small>{to ? `${to - xp} XP to ${levels[lv + 1].name}` : 'Max level. Legend.'}</small>
              </div>
              <span className="pill"><Coin size={16} />{coins}</span>
              <button className="qb-x" onClick={closeBoard} aria-label="Close"><Icon name="close" size={18} stroke={2.6} /></button>
            </div>
            <div className="seg" role="tablist">
              {tabs.map(t => (
                <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>{t.label}</button>
              ))}
            </div>
            <div className="qb-body">
              {tab === 'quests' && <Quests />}
              {tab === 'wardrobe' && <Wardrobe />}
              {tab === 'trophies' && <Trophies />}
            </div>
            <button className="qb-reset" onClick={() => { if (confirm('Reset all quests, coins and outfits?')) resetGame() }}>
              <Icon name="reset" size={14} /> reset progress
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
