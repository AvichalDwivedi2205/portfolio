import { useEffect, useState, type CSSProperties } from 'react'
import { links, nav } from '../data'
import { useClock } from '../hooks'
import { lockScroll, scrollToTarget } from '../scroll'
import { Logo } from './Logo'
import { Rule, Roll, useUi } from './ui'

const socials = [
  { label: 'GitHub', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'X', href: links.x },
  { label: 'Résumé', href: links.resume },
]

/* The bar blends in difference mode, so it stays legible over the dark and the light sections alike. */
export function Header() {
  const { loaded, openTalk } = useUi()
  const [menu, setMenu] = useState(false)
  const time = useClock()

  useEffect(() => {
    if (!menu) return
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    addEventListener('keydown', onKey)
    return () => { lockScroll(false); removeEventListener('keydown', onKey) }
  }, [menu])

  /* Close first so the scroll lock is released, then travel. */
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMenu(false)
    setTimeout(() => scrollToTarget(href), 60)
  }

  return (
    <>
      <header className={`hd ${loaded ? 'in' : ''}`}>
        <a className="hd-logo" href="#top" onClick={go('#top')} aria-label="Avichal Dwivedi, back to top"><Logo /></a>
        <div className="hd-r">
          <span className="hd-clock label">IST → {time}</span>
          <button className="hbtn solid" onClick={() => { setMenu(false); openTalk() }} data-cur="hi"><Roll text="let's talk" /></button>
          <button className={`hbtn hd-menu ${menu ? 'open' : ''}`} onClick={() => setMenu(m => !m)} aria-expanded={menu} aria-controls="menu">
            <Roll text={menu ? 'Close' : 'Menu'} />
            <span className="mtr" aria-hidden><i /><i /><i /></span>
          </button>
        </div>
      </header>

      <nav id="menu" className={`menu ${menu ? 'open' : ''}`} aria-hidden={!menu} inert={!menu}>
        <div className="menu-in wrap">
          <ul className="menu-links">
            {nav.map((n, i) => (
              <li key={n.href} style={{ ['--i' as string]: i } as CSSProperties}>
                <a href={n.href} onClick={go(n.href)}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <Roll text={n.label} />
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-side">
            <div>
              <span className="label dim">Enquiries</span>
              <a href={`mailto:${links.email}`}><Roll text={links.email} /></a>
            </div>
            <div>
              <span className="label dim">Elsewhere</span>
              {socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener"><Roll text={s.label} /></a>)}
            </div>
          </div>
          <div className="menu-foot">
            <Rule at="center" />
            <div className="label dim"><span>Pilani, India</span><span>Remote · overlaps US/EU hours</span></div>
          </div>
        </div>
      </nav>
    </>
  )
}
