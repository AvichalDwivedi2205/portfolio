import { useRef } from 'react'

export function Nav({ onSecret }: { onSecret: () => void }) {
  const clicks = useRef(0)
  const onLogo = (e: React.MouseEvent) => {
    e.preventDefault()
    if (++clicks.current >= 5) { clicks.current = 0; onSecret() }
    else scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <nav>
      <div className="wrap">
        <a href="#top" className="logo" onClick={onLogo} title="click me 5 times"><span>a</span><span>v</span><span>.</span></a>
        <div className="navlinks">
          <a href="#chat">Interview</a>
          <a href="#work">Work</a>
          <a href="#research">Lab notes</a>
          <a href="#xp">Receipts</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="pill"><i />open to remote work</a>
        </div>
      </div>
    </nav>
  )
}
