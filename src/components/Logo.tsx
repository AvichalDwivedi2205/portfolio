/* The mark: an A whose crossbar is a three-bar level meter. The legs are the letter, the bars are the voice. */
export function Mark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={`mark ${className}`} width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden>
      <path className="mark-legs" d="M4.5 27.5 16 5l11.5 22.5" pathLength={1} strokeWidth="3" strokeMiterlimit="8" />
      <path className="mark-bar" d="M11.9 27.5V23" strokeWidth="2.4" />
      <path className="mark-bar mid" d="M16 27.5v-11" strokeWidth="2.4" />
      <path className="mark-bar" d="M20.1 27.5V23" strokeWidth="2.4" />
    </svg>
  )
}

export function Logo({ size = 26 }: { size?: number }) {
  return (
    <span className="logo">
      <Mark size={size} />
      <span className="logo-word">avichal</span>
    </span>
  )
}
