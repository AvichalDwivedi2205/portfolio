import type { IconName } from '../data'

const paths: Record<IconName, string> = {
  wave: 'M9 11V6a2 2 0 1 1 4 0v5M13 11V8a2 2 0 1 1 4 0v4M17 12a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L4 14a2 2 0 1 1 3.4-2L9 14M3 6.5 5 5M2.5 10H5',
  drag: 'M9 11V6a2 2 0 1 1 4 0v5M13 11V8a2 2 0 1 1 4 0v4M17 12a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L4 14a2 2 0 1 1 3.4-2L9 14',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3',
  play: 'M8 5.5v13l10.5-6.5z',
  bolt: 'M13 2 4.5 13.5H11L10 22l8.5-11.5H12z',
  flame: 'M12 22c3.9 0 7-2.8 7-6.8 0-3.6-2.4-5.6-3.8-8.7-.9 1.9-2 2.8-3.4 3C11.6 7 11.4 4.4 9.4 2.5 8.6 6.6 5 9.3 5 15.2 5 19.2 8.1 22 12 22z',
  palette: 'M12 3a9 9 0 0 0 0 18c1.4 0 2-1 2-2 0-1.2-1-1.6-1-2.6 0-.9.8-1.4 1.8-1.4H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3zM7.5 11.5h.01M10 7.5h.01M15 7.5h.01',
  moon: 'M20 14.5A8.5 8.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  key: 'M8 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM10.9 12.1 19 4M16 7l2.5 2.5M14 9l2 2',
  bag: 'M5 8h14l-1.2 12.5H6.2zM9 8V6.5a3 3 0 0 1 6 0V8',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  mail: 'M3.5 6.5h17v11h-17zM3.5 7.5l8.5 6 8.5-6',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H5.5a2.8 2.8 0 0 0 2.8 3.6M16 6h2.5a2.8 2.8 0 0 1-2.8 3.6M12 13v4M8 20.5h8M9.5 17h5',
  check: 'M5 12.5l4.5 4.5L19 7',
  lock: 'M6.5 11h11v9.5h-11zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  close: 'M6 6l12 12M18 6 6 18',
  reset: 'M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5',
}

export function Icon({ name, size = 20, stroke = 2.2, fill = false }: { name: IconName; size?: number; stroke?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[name]} />
    </svg>
  )
}

export function Coin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="coin">
      <circle cx="12" cy="12" r="9.5" fill="var(--sun)" stroke="var(--sun-d)" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
      <path d="M12 8.2l1.1 2.3 2.5.3-1.8 1.7.5 2.5L12 13.8 9.7 15l.5-2.5-1.8-1.7 2.5-.3z" fill="#fff" />
    </svg>
  )
}
