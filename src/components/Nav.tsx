import { useRef } from 'react'
import { burst, complete, react } from '../game/store'
import { Hud, ThemeToggle } from './Hud'
import { SayHiButton } from './SayHi'

export function Nav() {
  const clicks = useRef(0)
  const onLogo = (e: React.MouseEvent) => {
    e.preventDefault()
    if (++clicks.current >= 5) { clicks.current = 0; burst(); react('wow'); complete('secret') }
    else scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <nav>
      <div className="wrap">
        <a href="#top" className="logo" onClick={onLogo} title="click me 5 times"><span>a</span><span>v</span><span>.</span></a>
        <div className="navlinks">
          <a href="#chat">Interview</a>
          <a href="#work">Work</a>
          <a href="#designs">Designs</a>
          <a href="#research">Lab notes</a>
          <a href="#xp">Receipts</a>
        </div>
        <div className="navr">
          <ThemeToggle />
          <Hud />
          <SayHiButton />
        </div>
      </div>
    </nav>
  )
}
