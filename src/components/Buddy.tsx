import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ItemId } from '../data'
import { levelOf, stageOf, useGame, useUi, type Mood } from '../game/store'
import { useFinePointer } from '../hooks'

const OUT = 'var(--out)', SW = 5

type Props = { size?: number; mood?: Mood; stage?: number; wear?: ItemId[]; follow?: boolean; className?: string; onClick?: () => void; label?: string }

/* Lory: a robot astronaut in the same chunky-outline style as Remi's companions.
   Stage 0 bare bot, 1 adds the glass helmet, 2 adds the jetpack. Eyes track the pointer via springs (no re-render). */
export function Buddy({ size = 120, mood = 'happy', stage = 0, wear = [], follow = true, className = '', onClick, label = 'Lory' }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const fine = useFinePointer()
  const [hover, setHover] = useState(false)
  const ex = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ey = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })

  useEffect(() => {
    if (!follow || !fine) return
    const move = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.32)
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260)
      ex.set((dx / d) * 7 * k); ey.set((dy / d) * 5 * k)
    }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [follow, fine, ex, ey])

  const m: Mood = hover && mood === 'happy' ? 'wave' : mood
  const has = (i: ItemId) => wear.includes(i)
  const helmet = stage >= 1, jet = stage >= 2
  const hatLift = helmet ? -44 : 0
  /* the viewBox grows upward for hats and helmets so the body keeps the same scale */
  const top = has('party') ? (helmet ? -74 : -56) : helmet ? -20 : -14
  const vh = 236 - top

  return (
    <svg
      ref={ref}
      className={`buddy ${className}`}
      width={size} height={(size * vh) / 224} viewBox={`-12 ${top} 224 ${vh}`}
      role={onClick ? 'button' : 'img'} aria-label={label} tabIndex={onClick ? 0 : undefined}
      onClick={onClick} onKeyDown={e => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick() } }}
      onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}
      data-cur={onClick ? 'hi!' : undefined}
    >
      <ellipse cx="100" cy="226" rx="52" ry="7" fill={OUT} opacity=".14" className="bud-shadow" />
      <g className="bud-bob">
        {jet && (
          <g>
            <path className="bud-flame" d="M47 176 Q55 210 63 176Z" fill="var(--coral)" />
            <path className="bud-flame" d="M137 176 Q145 210 153 176Z" fill="var(--coral)" />
            <path className="bud-flame" d="M51 176 Q55 194 59 176Z" fill="var(--sun)" />
            <path className="bud-flame" d="M141 176 Q145 194 149 176Z" fill="var(--sun)" />
            <rect x="42" y="122" width="26" height="56" rx="12" fill="var(--sun)" stroke={OUT} strokeWidth={SW} />
            <rect x="132" y="122" width="26" height="56" rx="12" fill="var(--sun)" stroke={OUT} strokeWidth={SW} />
          </g>
        )}
        {has('cape') && <path className="bud-cape" d="M74 124C88 118 112 118 126 124L148 206C118 216 82 216 52 206Z" fill="var(--rose)" stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />}

        <rect x="78" y="180" width="18" height="30" rx="9" fill="var(--bot)" stroke={OUT} strokeWidth={SW} />
        <rect x="104" y="180" width="18" height="30" rx="9" fill="var(--bot)" stroke={OUT} strokeWidth={SW} />
        <rect x="45" y="128" width="18" height="42" rx="9" transform="rotate(22 54 132)" fill="var(--bot)" stroke={OUT} strokeWidth={SW} />

        <rect x="62" y="114" width="76" height="76" rx="30" fill="var(--bot)" stroke={OUT} strokeWidth={SW} />
        <rect x="83" y="135" width="34" height="27" rx="9" fill="var(--screen)" stroke={OUT} strokeWidth={4} />
        <path className="bud-heart" d="M100 156C92 150.5 89 146.5 92 143C94.5 140.3 98.5 141 100 144C101.5 141 105.5 140.3 108 143C111 146.5 108 150.5 100 156Z" fill="var(--rose)" />

        <g>
          <circle cx="36" cy="74" r="11" fill="var(--lav)" stroke={OUT} strokeWidth={SW} />
          <circle cx="164" cy="74" r="11" fill="var(--lav)" stroke={OUT} strokeWidth={SW} />
          <path d="M100 30V6" stroke={OUT} strokeWidth={SW} strokeLinecap="round" />
          {has('star')
            ? <path className="bud-star" d="M100 -12l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3L100 11.6l-9.3 4.9 1.8-10.3-7.5-7.3 10.4-1.5z" fill="var(--sun)" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
            : <circle cx="100" cy="2" r="8.5" fill="var(--sun)" stroke={OUT} strokeWidth={4.5} />}
          <rect x="36" y="26" width="128" height="94" rx="46" fill="var(--bot)" stroke={OUT} strokeWidth={SW} />
          <rect x="52" y="42" width="96" height="62" rx="28" fill="var(--screen)" />
          <path d="M62 56Q65 48 76 46" stroke="#fff" strokeOpacity=".28" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="64" cy="89" rx="6.5" ry="4" fill="var(--rose)" opacity=".8" />
          <ellipse cx="136" cy="89" rx="6.5" ry="4" fill="var(--rose)" opacity=".8" />
          <motion.g style={{ x: ex, y: ey }}>
            {has('shades') ? (
              <g>
                <rect x="63" y="59" width="33" height="21" rx="9" fill="#120E22" stroke="var(--sun)" strokeWidth="3.5" />
                <rect x="104" y="59" width="33" height="21" rx="9" fill="#120E22" stroke="var(--sun)" strokeWidth="3.5" />
                <path d="M96 67H104" stroke="var(--sun)" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M69 65l6-3M110 65l6-3" stroke="#fff" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ) : (
              <g className={m === 'sleepy' ? '' : 'bud-eyes'}>
                {m === 'sleepy' ? (
                  <>
                    <path d="M73 71Q82 65 91 71" stroke="var(--eye)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <path d="M109 71Q118 65 127 71" stroke="var(--eye)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  </>
                ) : m === 'wow' ? (
                  <>
                    <ellipse cx="82" cy="69" rx="9.5" ry="12" fill="var(--eye)" /><circle cx="85" cy="64" r="3" fill="#fff" />
                    <ellipse cx="118" cy="69" rx="9.5" ry="12" fill="var(--eye)" /><circle cx="121" cy="64" r="3" fill="#fff" />
                  </>
                ) : m === 'think' ? (
                  <>
                    <ellipse cx="84" cy="64" rx="7" ry="8.5" fill="var(--eye)" />
                    <ellipse cx="120" cy="64" rx="7" ry="8.5" fill="var(--eye)" />
                  </>
                ) : (
                  <>
                    <ellipse cx="82" cy="70" rx="8" ry="10" fill="var(--eye)" />
                    <ellipse cx="118" cy="70" rx="8" ry="10" fill="var(--eye)" />
                  </>
                )}
              </g>
            )}
          </motion.g>
          {m === 'wow'
            ? <ellipse cx="100" cy="90" rx="5.5" ry="6.5" fill="var(--eye)" />
            : m === 'think'
              ? <path d="M93 90H107" stroke="var(--eye)" strokeWidth="4.5" strokeLinecap="round" />
              : m === 'sleepy'
                ? <path d="M95 89Q100 92 105 89" stroke="var(--eye)" strokeWidth="4" strokeLinecap="round" fill="none" />
                : <path d="M89 86Q100 96 111 86" stroke="var(--eye)" strokeWidth="4.5" strokeLinecap="round" fill="none" />}
        </g>

        {has('scarf') && (
          <g>
            <rect x="112" y="116" width="17" height="36" rx="7" transform="rotate(-14 120 118)" fill="var(--coral)" stroke={OUT} strokeWidth={SW} />
            <rect x="58" y="110" width="84" height="18" rx="9" fill="var(--coral)" stroke={OUT} strokeWidth={SW} />
            <path d="M74 115v8M88 115v8M102 115v8M116 115v8" stroke="var(--coral-d)" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        <g className={`bud-arm ${m === 'wave' ? 'waving' : ''}`}>
          <rect x="137" y="128" width="18" height="42" rx="9" transform="rotate(-22 146 132)" fill="var(--bot)" stroke={OUT} strokeWidth={SW} />
        </g>

        {helmet && (
          <g>
            <ellipse cx="100" cy="66" rx="86" ry="80" fill="var(--glass)" stroke={OUT} strokeWidth={SW} />
            <path d="M36 44Q48 8 88 -4" stroke="#fff" strokeOpacity=".9" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="70" r="3.5" fill="#fff" opacity=".9" />
            <rect x="50" y="128" width="100" height="18" rx="9" fill="var(--lav)" stroke={OUT} strokeWidth={SW} />
          </g>
        )}

        {has('party') && (
          <g transform={`translate(0 ${hatLift})`}>
            <path d="M76 34L100 -16L124 34Z" fill="var(--lav)" stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
            <path d="M86 14l6 4M104 2l6 4M96 26l8 4" stroke="var(--sun)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="-18" r="7.5" fill="var(--sun)" stroke={OUT} strokeWidth={4} />
          </g>
        )}

        {m === 'sleepy' && <text className="bud-z" x="158" y="8" fontFamily="Fredoka" fontWeight="600" fontSize="26" fill="var(--ink2)">z</text>}
      </g>
    </svg>
  )
}

/* Live props: level-driven stage, purchased outfit, store mood. */
export function useLory() {
  const stage = useGame(s => stageOf(levelOf(s.xp)))
  const wear = useGame(s => s.wear)
  const mood = useUi(s => s.mood)
  return { stage, wear, mood }
}
