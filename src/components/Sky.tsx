const O = 'var(--out)'

const Cloud = ({ x, y, s, cls }: { x: number; y: number; s: number; cls: string }) => (
  <g className={`cloud ${cls}`} transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M10 40C-4 40-4 20 12 20C14 6 34 2 42 14C50 4 70 6 72 22C88 20 90 40 74 40Z" fill="var(--cloud)" />
  </g>
)

const stars = [[40, 40], [130, 22], [210, 70], [300, 30], [380, 90], [470, 48], [500, 150], [250, 140], [90, 170], [160, 110], [420, 190], [330, 200]]

/* Hero backdrop: sky gradient, sun or moon, drifting clouds, a ringed planet with a moonlet, and the home hill.
   Every animation is a CSS transform on a <g>, so it stays on the compositor. */
export function Sky() {
  return (
    <svg className="skyscene" viewBox="0 0 520 560" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--sky-top)' }} />
          <stop offset="1" style={{ stopColor: 'var(--sky-bot)' }} />
        </linearGradient>
      </defs>
      <rect width="520" height="560" fill="url(#skyg)" />

      <g className="stars">{stars.map(([x, y], i) => <circle key={i} className="tw" cx={x} cy={y} r={i % 3 ? 1.8 : 2.8} fill="#fff" style={{ animationDelay: `${(i % 5) * 0.6}s` }} />)}</g>

      <g className="sun" transform="translate(30 -14)">
        <circle cx="440" cy="84" r="46" fill="var(--sun)" opacity=".25" />
        <circle cx="440" cy="84" r="32" fill="var(--sun)" stroke={O} strokeWidth="4" />
        <path d="M428 82q4 4 8 0M444 82q4 4 8 0" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M434 94q6 5 12 0" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
      <g className="moon" transform="translate(30 -14)">
        <circle cx="440" cy="84" r="44" fill="#fff" opacity=".08" />
        <path d="M456 60a32 32 0 1 0 8 46a26 26 0 1 1-8-46z" fill="#FFF4D4" stroke={O} strokeWidth="4" />
      </g>

      <Cloud x={20} y={210} s={1.3} cls="c1" />
      <Cloud x={300} y={150} s={0.9} cls="c2" />
      <Cloud x={160} y={300} s={0.7} cls="c3" />

      <g className="planet">
        <g className="spin">
          <circle cx="505" cy="235" r="7" fill="var(--rose)" stroke={O} strokeWidth="3" />
        </g>
        <ellipse cx="455" cy="235" rx="54" ry="14" fill="none" stroke="var(--lav-d)" strokeWidth="5" />
        <circle cx="455" cy="235" r="30" fill="var(--lav)" stroke={O} strokeWidth="4" />
        <path d="M433 225q12-8 30-4" stroke="#fff" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M405 239a54 14 0 0 0 104-4" fill="none" stroke="var(--lav-d)" strokeWidth="5" />
      </g>

      <path d="M-20 452C80 404 180 420 270 436C360 452 450 410 560 430V580H-20Z" fill="var(--hill-d)" />
      <path d="M-20 470C90 430 200 452 300 462C400 472 470 440 560 452V580H-20Z" fill="var(--hill)" stroke={O} strokeWidth="5" />
      <g className="rocket">
        <path d="M78 444V402" stroke={O} strokeWidth="4" />
        <path d="M66 414l-10 14h12zM90 414l10 14H88z" fill="var(--coral)" stroke={O} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M78 368c12 10 14 30 12 52H66c-2-22 0-42 12-52z" fill="var(--bot)" stroke={O} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="78" cy="396" r="6" fill="var(--sky)" stroke={O} strokeWidth="3" />
        <rect x="58" y="440" width="40" height="8" rx="4" fill="var(--line2)" stroke={O} strokeWidth="3.5" />
      </g>
      <g>
        <path d="M318 466v-34" stroke={O} strokeWidth="4" />
        <circle cx="318" cy="420" r="18" fill="var(--moss)" stroke={O} strokeWidth="4" />
        <path d="M350 468v-20" stroke={O} strokeWidth="4" />
        <circle cx="350" cy="440" r="12" fill="var(--moss)" stroke={O} strokeWidth="4" />
      </g>
      {[[150, 476, 'var(--rose)'], [180, 488, 'var(--sun)'], [340, 482, 'var(--sky)'], [380, 474, 'var(--rose)']].map(([x, y, c], i) => (
        <circle key={i} cx={x as number} cy={y as number} r="5" fill={c as string} stroke={O} strokeWidth="2.5" />
      ))}
    </svg>
  )
}
