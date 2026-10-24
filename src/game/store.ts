import { useSyncExternalStore } from 'react'
import { chestCoins, levels, quests, shop, starter, type ItemId, type PlayId, type QuestId } from '../data'

/* Two tiny external stores: `game` is persisted progress, `ui` is session-only chrome state.
   useSyncExternalStore + selectors means a coin change re-renders the HUD, not the page. */

type Game = { xp: number; coins: number; done: QuestId[]; owned: ItemId[]; wear: ItemId[]; played: PlayId[]; stars: number[]; chest: boolean }
export type Mood = 'happy' | 'wow' | 'wave' | 'think' | 'sleepy'
export type Toast = { id: number; kind: 'quest' | 'level' | 'buy' | 'chest'; title: string; sub: string }
export type Tab = 'quests' | 'wardrobe' | 'trophies'
type Ui = { board: boolean; hi: boolean; tab: Tab; toasts: Toast[]; mood: Mood; burst: number; say: { id: number; text: string } | null; theme: 'day' | 'night' }

const KEY = 'av-game-v1', THEME = 'av-theme'
const fresh: Game = { xp: 0, coins: 10, done: [], owned: [], wear: [], played: [], stars: [], chest: false }

function load(): Game {
  try {
    const s: Game = { ...fresh, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }
    return { ...s, done: s.done.filter(id => quests.some(q => q.id === id)) }
  } catch { return fresh }
}
const initialTheme = (): Ui['theme'] => (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'night' ? 'night' : 'day')

function createStore<T>(init: T, persist?: (s: T) => void) {
  let s = init
  const subs = new Set<() => void>()
  return {
    get: () => s,
    set(patch: Partial<T>) { s = { ...s, ...patch }; persist?.(s); subs.forEach(f => f()) },
    sub(f: () => void) { subs.add(f); return () => { subs.delete(f) } },
  }
}

const game = createStore<Game>(load(), s => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* private mode */ } })
const ui = createStore<Ui>({ board: false, hi: false, tab: 'quests', toasts: [], mood: 'happy', burst: 0, say: null, theme: initialTheme() })

export const useGame = <R,>(sel: (s: Game) => R) => useSyncExternalStore(game.sub, () => sel(game.get()))
export const useUi = <R,>(sel: (s: Ui) => R) => useSyncExternalStore(ui.sub, () => sel(ui.get()))

export const levelOf = (xp: number) => levels.reduce((n, l, i) => (xp >= l.at ? i : n), 0)
/* 0-1 bare bot, 2-3 helmet, 4+ helmet and jetpack */
export const stageOf = (level: number) => (level >= 4 ? 2 : level >= 2 ? 1 : 0)

let toastId = 0, moodTimer = 0, sayTimer = 0, sayId = 0

function toast(t: Omit<Toast, 'id'>) {
  const id = ++toastId
  ui.set({ toasts: [...ui.get().toasts, { ...t, id }] })
  setTimeout(() => ui.set({ toasts: ui.get().toasts.filter(x => x.id !== id) }), 3400)
}

export function react(mood: Mood, ms = 1800) {
  clearTimeout(moodTimer)
  ui.set({ mood })
  moodTimer = window.setTimeout(() => ui.set({ mood: 'happy' }), ms)
}

export function wake() {
  if (ui.get().mood !== 'sleepy') return
  clearTimeout(moodTimer)
  ui.set({ mood: 'happy' })
}

export function say(text: string, ms = 5200) {
  clearTimeout(sayTimer)
  ui.set({ say: { id: ++sayId, text } })
  sayTimer = window.setTimeout(() => ui.set({ say: null }), ms)
}

export const burst = () => ui.set({ burst: ui.get().burst + 1 })

const growth = ['', '', 'Lory got a helmet.', 'Halfway to the stars.', 'Lory got a jetpack!', 'Captain on deck. You found almost everything.']

export function complete(id: QuestId) {
  const s = game.get()
  if (s.done.includes(id)) return
  const q = quests.find(x => x.id === id)!
  const before = levelOf(s.xp)
  game.set({ done: [...s.done, id], xp: s.xp + q.xp, coins: s.coins + q.coins })
  toast({ kind: 'quest', title: q.title, sub: `+${q.xp} XP · +${q.coins} coins` })
  react('wow')
  const after = levelOf(game.get().xp)
  if (after > before) {
    setTimeout(() => {
      toast({ kind: 'level', title: `Level ${after + 1}: ${levels[after].name}`, sub: growth[after] || 'Keep exploring.' })
      burst()
    }, 600)
  }
}

export function played(id: PlayId) {
  const s = game.get()
  if (!s.played.includes(id)) game.set({ played: [...s.played, id] })
  complete('demo1')
  if (game.get().played.length >= 3) complete('demo3')
}

export function catchStar(i: number) {
  const s = game.get()
  if (s.stars.includes(i)) return
  game.set({ stars: [...s.stars, i], coins: s.coins + 2 })
  react('wow', 900)
  if (game.get().stars.length >= 3) complete('stars')
}

export const starterDone = (done: QuestId[]) => starter.every(q => done.includes(q.id))

export function claimChest() {
  const s = game.get()
  if (s.chest || !starterDone(s.done)) return
  game.set({ chest: true, coins: s.coins + chestCoins })
  toast({ kind: 'chest', title: 'Starter chest opened', sub: `+${chestCoins} coins. The wardrobe is open.` })
  react('wave', 1600)
  burst()
}

export function buy(id: ItemId) {
  const s = game.get(), item = shop.find(x => x.id === id)!
  if (s.owned.includes(id) || s.coins < item.price) return false
  game.set({ coins: s.coins - item.price, owned: [...s.owned, id], wear: [...s.wear, id] })
  toast({ kind: 'buy', title: `${item.name} unlocked`, sub: 'Lory is wearing it now.' })
  react('wave')
  complete('shop')
  return true
}

export function toggleWear(id: ItemId) {
  const s = game.get()
  if (!s.owned.includes(id)) return
  game.set({ wear: s.wear.includes(id) ? s.wear.filter(x => x !== id) : [...s.wear, id] })
}

export function resetGame() {
  game.set({ ...fresh })
  ui.set({ toasts: [] })
}

export function openBoard(tab: Tab = ui.get().tab) { ui.set({ board: true, hi: false, tab }) }
export const closeBoard = () => ui.set({ board: false })
export const openHi = () => ui.set({ hi: true, board: false })
export const closeHi = () => ui.set({ hi: false })
export const setTab = (tab: Tab) => ui.set({ tab })

export function toggleTheme() {
  const theme = ui.get().theme === 'day' ? 'night' : 'day'
  document.documentElement.dataset.theme = theme
  try { localStorage.setItem(THEME, theme) } catch { /* private mode */ }
  ui.set({ theme })
  if (theme === 'night') complete('night')
}
