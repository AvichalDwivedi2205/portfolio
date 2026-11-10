import { createContext, Fragment, useContext, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ease, useReveal } from '../hooks'

/* Page-level state every section can read: has the preloader lifted, and how to open the contact panel. */
export const Ui = createContext<{ loaded: boolean; openTalk: () => void }>({ loaded: true, openTalk: () => {} })
export const useUi = () => useContext(Ui)

const idx = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

/* Viewfinder bracket for the corners of a frame. Pass tl, tr, bl or br. */
export const Corner = ({ at }: { at: 'tl' | 'tr' | 'bl' | 'br' }) => (
  <svg className={`corner ${at}`} width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" aria-hidden>
    <path d="M.5 11V.5H11" />
  </svg>
)
export const Corners = () => <><Corner at="tl" /><Corner at="tr" /><Corner at="bl" /><Corner at="br" /></>

export const Arrow = ({ diag = false }: { diag?: boolean }) => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
    <path d={diag ? 'M2.5 9.5l7-7M4 2.5h5.5V8' : 'M1 6h10M7 2l4 4-4 4'} />
  </svg>
)

/* Hover text swap: each letter rolls out the top while its twin rolls in from below. */
export function Roll({ text }: { text: string }) {
  const chars = [...text].map((c, i) => <span key={i} style={idx(i)}>{c === ' ' ? ' ' : c}</span>)
  return (
    <span className="roll">
      <span className="sr">{text}</span>
      <span className="roll-a" aria-hidden>{chars}</span>
      <span className="roll-b" aria-hidden>{chars}</span>
    </span>
  )
}

type BtnProps = { children: string; href?: string; onClick?: () => void; cur?: string; className?: string }

/* The underlined mono button. External links get a diagonal arrow and open in a new tab. */
export function UBtn({ children, href, onClick, cur, className = '' }: BtnProps) {
  const ext = !!href && /^https?:/.test(href)
  const inner = (
    <>
      <span className="ubtn-t"><Roll text={children} /></span>
      <span className="ubtn-a" aria-hidden><Arrow diag={ext} /><Arrow diag={ext} /></span>
      <i className="ubtn-l" aria-hidden />
    </>
  )
  const cls = `ubtn ${className}`
  return href
    ? <a className={cls} href={href} onClick={onClick} data-cur={cur} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>{inner}</a>
    : <button className={cls} onClick={onClick} data-cur={cur}>{inner}</button>
}

/* Hairline that draws itself across. The three-bar level meter from the logo stands on it. */
export function Rule({ at = 'left' }: { at?: 'left' | 'center' | 'right' }) {
  const ref = useReveal<HTMLDivElement>()
  return <div ref={ref} className={`rule rule-${at}`} aria-hidden><i /><span className="rule-m"><b /><b /><b /></span></div>
}

/* Heading that rises word by word out of a mask. `*word*` sets a word in the serif italic. */
export function Words({ text, as: Tag = 'h2', className = '' }: { text: string; as?: 'h2' | 'h3' | 'p'; className?: string }) {
  const ref = useReveal<HTMLHeadingElement>()
  return (
    <Tag ref={ref} className={`words ${className}`} aria-label={text.replace(/\*/g, '')}>
      {text.split(' ').map((w, i) => {
        const em = /^\*.*\*[.,?!]?$/.test(w)
        const word = w.replace(/\*/g, '')
        return <Fragment key={i}><span className="w" aria-hidden><span style={idx(i)}>{em ? <em>{word}</em> : word}</span></span>{' '}</Fragment>
      })}
    </Tag>
  )
}

/* Generic fade-and-rise block. */
export function R({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'p' | 'span' | 'li' }) {
  const ref = useReveal<HTMLDivElement>()
  return <Tag ref={ref as never} className={`r ${className}`} style={{ ['--d' as string]: `${delay}s` } as CSSProperties}>{children}</Tag>
}

export function SectionHead({ label, title, note }: { label: string; title: string; note?: ReactNode }) {
  return (
    <div className="shead">
      <R as="span" className="label shead-label"><i className="sq" />{label}</R>
      <Words text={title} />
      {note && <R as="span" className="label dim shead-note" delay={0.2}>{note}</R>}
    </div>
  )
}

/* Number that counts up once, the first time it is seen. */
export function Count({ to, decimals = 0, prefix = '', suffix = '' }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration: 1.8, ease,
      onUpdate: v => { if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}` },
    })
    return () => c.stop()
  }, [inView, to, decimals, prefix, suffix])
  return <span ref={ref} className="count">{`${prefix}${(0).toFixed(decimals)}${suffix}`}</span>
}

const TW = 1440, TH = 400, TN = 48

/* Outline of a body of colour whose surface is a wave. At p = 0 it sits below the box, at p = 1 it has
   flooded it; in between the surface rolls as it climbs. */
function tide(p: number) {
  const level = TH * (1.12 - p * 1.3)
  const a = TH * 0.09
  let d = `M0 ${TH}`
  for (let i = 0; i <= TN; i++) {
    const x = i / TN
    const y = level + a * (0.65 * Math.sin(x * 7.85 + p * 5) + 0.35 * Math.sin(x * 16.3 - p * 8.3 + 1))
    d += `L${(x * TW).toFixed(1)} ${y.toFixed(1)}`
  }
  return `${d}L${TW} ${TH}Z`
}

/* The leading edge of a section that slides over the one before it: a crest that keeps rolling as it travels. */
function crest(p: number) {
  const a = TH * 0.3
  let d = `M0 ${TH}`
  for (let i = 0; i <= TN; i++) {
    const x = i / TN
    const y = TH * 0.52 + a * (0.65 * Math.sin(x * 7.85 + p * 7) + 0.35 * Math.sin(x * 16.3 - p * 11 + 1))
    d += `L${(x * TW).toFixed(1)} ${y.toFixed(1)}`
  }
  return `${d}L${TW} ${TH}Z`
}

export function Tide({ p, shape = tide }: { p: MotionValue<number>; shape?: (p: number) => string }) {
  const d = useTransform(p, shape)
  return (
    <svg className="tide" viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="none" aria-hidden>
      <motion.path d={d} />
    </svg>
  )
}

export function Crest() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return <div ref={ref} className="crest" aria-hidden><Tide p={scrollYProgress} shape={crest} /></div>
}

export function Seam({ to }: { to: 'light' | 'dark' }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })
  return <div ref={ref} className={`seam to-${to}`} aria-hidden><Tide p={scrollYProgress} /></div>
}
