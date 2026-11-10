export type IconName = 'check' | 'reset' | 'close' | 'play'

const paths: Record<IconName, string> = {
  check: 'M5 12.5l4.5 4.5L19 7',
  reset: 'M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5',
  close: 'M6 6l12 12M18 6 6 18',
  play: 'M8 5.5v13l10.5-6.5z',
}

export function Icon({ name, size = 20, stroke = 2.2, fill = false }: { name: IconName; size?: number; stroke?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[name]} />
    </svg>
  )
}
