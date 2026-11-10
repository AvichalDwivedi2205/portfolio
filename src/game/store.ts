import { useSyncExternalStore } from 'react'
import type { PlayId } from '../data'

/* Which project demos this visitor has pressed. Persisted so the counter in the work header survives a reload. */

const KEY = 'av-played-v1'

function load(): PlayId[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v : []
  } catch { return [] }
}

let ids = load()
const subs = new Set<() => void>()

export function played(id: PlayId) {
  if (ids.includes(id)) return
  ids = [...ids, id]
  try { localStorage.setItem(KEY, JSON.stringify(ids)) } catch { /* private mode */ }
  subs.forEach(f => f())
}

const sub = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }

export const usePlayed = () => useSyncExternalStore(sub, () => ids)
