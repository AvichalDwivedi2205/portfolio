import { useEffect, useState } from 'react'

export function useMedia(query: string) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && matchMedia(query).matches)
  useEffect(() => {
    const mq = matchMedia(query)
    const fn = () => setM(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return m
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')

/* spring presets */
export const snappy = { type: 'spring', stiffness: 400, damping: 30, mass: 0.6 } as const
export const bouncy = { type: 'spring', stiffness: 300, damping: 14 } as const
export const ease = [0.2, 0.8, 0.2, 1] as const
