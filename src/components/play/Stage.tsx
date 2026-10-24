import type { ReactNode } from 'react'
import { Icon } from '../Icon'

type Props = { label: string; status?: ReactNode; onReset?: () => void; children: ReactNode; className?: string }

/* Shared frame for every playable card demo. */
export function Stage({ label, status, onReset, children, className = '' }: Props) {
  return (
    <div className={`stage ${className}`}>
      <div className="stage-hd">
        <span className="mono">{label}</span>
        <span className="stage-r">
          {status}
          {onReset && <button className="stage-reset" onClick={onReset} aria-label="Reset demo" data-cur="again"><Icon name="reset" size={15} stroke={2.4} /></button>}
        </span>
      </div>
      {children}
    </div>
  )
}

export const Try = ({ children = 'try it!' }: { children?: ReactNode }) => <span className="try hand">{children}</span>
