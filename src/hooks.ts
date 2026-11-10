import { useEffect, useRef, useState } from 'react'

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

export const ease = [0.22, 1, 0.36, 1] as const
export const easeIO = [0.76, 0, 0.24, 1] as const

/* One shared observer adds `.in` the first time an element scrolls into view. CSS does the rest. */
let io: IntersectionObserver | null = null
const observer = () => (io ??= new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue
    e.target.classList.add('in')
    io!.unobserve(e.target)
  }
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }))

export function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    observer().observe(el)
    return () => observer().unobserve(el)
  }, [])
  return ref
}

/* India time for the header and footer. */
export function useClock() {
  const [t, setT] = useState('--:--')
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }))
    tick()
    const id = setInterval(tick, 20_000)
    return () => clearInterval(id)
  }, [])
  return t
}

export function useCopy(text: string) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try { await navigator.clipboard.writeText(text) } catch {
      const t = Object.assign(document.createElement('textarea'), { value: text })
      document.body.append(t); t.select(); document.execCommand('copy'); t.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }
  return [copied, copy] as const
}
