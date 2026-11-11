import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useFinePointer, useReducedMotion } from '../hooks'
import { useUi } from './ui'

/* The first portrait artwork, unchanged. Perspective and lighting are image effects,
   not a reconstructed head, facial animation, or a rotatable 3D mesh. */
export function HeroPortrait() {
  const figure = useRef<HTMLElement>(null)
  const stage = useRef<HTMLButtonElement>(null)
  const pulseTimer = useRef(0)
  const systemReducedMotion = useReducedMotion()
  const reduce = systemReducedMotion || (import.meta.env.DEV && new URLSearchParams(window.location.search).get('motion') === 'reduce')
  const finePointer = useFinePointer()
  const { loaded } = useUi()
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const [energized, setEnergized] = useState(false)
  const [pulseId, setPulseId] = useState(0)
  const [explore, setExplore] = useState(false)
  const enabled = !reduce && !paused
  const running = loaded && enabled && visible && pageVisible
  const { scrollYProgress } = useScroll({ target: figure, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, finePointer ? 70 : 24])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    const visibility = () => setPageVisible(document.visibilityState === 'visible')
    observer.observe(figure.current!)
    visibility()
    document.addEventListener('visibilitychange', visibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      clearTimeout(pulseTimer.current)
    }
  }, [])

  useEffect(() => {
    const node = stage.current!
    let frame = 0, x = 0, y = 0
    const reset = () => {
      cancelAnimationFrame(frame)
      node.style.setProperty('--portrait-x', '0deg')
      node.style.setProperty('--portrait-y', '0deg')
      node.style.setProperty('--portrait-shift', '0px')
      node.style.setProperty('--light-x', '35%')
      node.style.setProperty('--light-y', '25%')
    }
    if (!running || !finePointer) { reset(); return }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = node.getBoundingClientRect()
      x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5))
      y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5))
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node.style.setProperty('--portrait-x', `${-y * 14}deg`)
        node.style.setProperty('--portrait-y', `${x * 24}deg`)
        node.style.setProperty('--portrait-shift', `${x * 24}px`)
        node.style.setProperty('--light-x', `${(x + 0.5) * 100}%`)
        node.style.setProperty('--light-y', `${(y + 0.5) * 100}%`)
      })
    }
    node.addEventListener('pointermove', move, { passive: true })
    node.addEventListener('pointerleave', reset)
    node.addEventListener('pointercancel', reset)
    return () => {
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', reset)
      node.removeEventListener('pointercancel', reset)
      reset()
    }
  }, [running, finePointer])

  const pulse = () => {
    setPulseId(id => id + 1)
    setEnergized(true)
    clearTimeout(pulseTimer.current)
    pulseTimer.current = window.setTimeout(() => setEnergized(false), 1400)
    if (running) dispatchEvent(new Event('signal:say'))
  }

  return (
    <figure ref={figure} className={`hero-portrait ${running ? 'is-running' : ''} ${enabled ? '' : 'is-still'} ${energized ? 'is-energized' : ''} ${explore ? 'is-exploring' : ''}`}
      data-portrait-motion={running ? 'running' : enabled ? 'paused' : 'still'} data-portrait-pulse={pulseId}>
      <motion.div className="portrait-scroll" style={enabled ? { y, scale, rotate } : { y: 0, scale: 1, rotate: 0 }}>
        <button ref={stage} className="portrait-stage" onClick={pulse} aria-label="Send a pulse through the portrait" aria-describedby="portrait-hint">
          <span className="portrait-orbit" aria-hidden><i /></span>
          <span className="portrait-orbit portrait-orbit-secondary" aria-hidden><i /></span>
          {energized && running && <span key={pulseId} className="portrait-shock" aria-hidden />}
          <span className="portrait-entrance">
            <span className="portrait-art">
              <motion.span className="portrait-response" animate={running && energized ? { y: -14, rotate: -2, scale: 1.045 } : running && explore ? { y: -5, rotate: 3, scale: 0.95 } : { y: 0, rotate: 0, scale: 1 }} transition={enabled ? { type: 'spring', stiffness: 180, damping: 15 } : { duration: 0 }}>
                <span className="portrait-float">
                  <img src="/portraits/avichal-sculpture.webp" srcSet="/portraits/avichal-sculpture-small.webp 480w, /portraits/avichal-sculpture.webp 840w" sizes="(max-width:760px) 280px, 480px"
                    width="840" height="1120" alt="Avichal's original charcoal and silver sculptural portrait, with sunglasses and an orange rim light. A 3D-styled image."
                    fetchPriority="high" decoding="async" draggable={false} />
                  <span className="portrait-light" aria-hidden />
                </span>
              </motion.span>
            </span>
          </span>
        </button>
      </motion.div>
      <figcaption className="portrait-caption mono">
        <span><i className="sq" aria-hidden />The human behind the AI.</span>
        {!reduce && <button className="portrait-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play portrait animation' : 'Pause portrait animation'}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
            {paused ? <path d="M3 1.5 10 6 3 10.5Z" /> : <path d="M2 1.5h2.5v9H2zm5.5 0H10v9H7.5z" />}
          </svg>
        </button>}
      </figcaption>
      <p className="portrait-hint mono" id="portrait-hint">{!enabled ? 'Tap to light up the portrait.' : finePointer ? 'Move to look around. Tap to send a pulse.' : 'Tap the portrait to send a pulse.'}</p>
      <div className="portrait-actions mono">
        <button onClick={pulse}><span aria-hidden>⌁</span> Send a pulse</button>
        <button onClick={() => setExplore(!explore)} aria-expanded={explore} aria-controls="portrait-paths">{explore ? 'Close' : 'Explore my work'} <span aria-hidden>{explore ? '−' : '↗'}</span></button>
      </div>
      <div id="portrait-paths" className="portrait-paths" hidden={!explore}>
        <a href="#work"><span className="mono">01 / Build</span><strong>AI products</strong><span aria-hidden>↗</span></a>
        <a href="#research"><span className="mono">02 / Experiment</span><strong>Research & evals</strong><span aria-hidden>↗</span></a>
        <a href="#about"><span className="mono">03 / Meet</span><strong>Behind the work</strong><span aria-hidden>↗</span></a>
      </div>
      <span className="sr-only" role="status">{energized ? 'Portrait lit up.' : ''}</span>
    </figure>
  )
}
