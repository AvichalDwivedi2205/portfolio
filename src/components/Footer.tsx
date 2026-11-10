import type { CSSProperties } from 'react'
import { links } from '../data'
import { useClock, useCopy, useReveal } from '../hooks'
import { Rule, R, Roll, UBtn, Words, useUi } from './ui'

const socials = [
  { label: 'GitHub', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'X / Twitter', href: links.x },
]

export function Footer() {
  const { openTalk } = useUi()
  const time = useClock()
  const [copied, copy] = useCopy(links.email)
  const word = useReveal<HTMLDivElement>()

  return (
    <footer className="ft" id="contact" data-theme="dark">
      <div className="wrap">
        <div className="ft-top">
          <Words className="big" text="Ready to build something that *talks* *back?*" />
          <R as="span" className="label dim" delay={0.2}>IST → {time}</R>
        </div>

        <R className="ft-cta" delay={0.1}>
          <UBtn onClick={openTalk} cur="hi">Say hi</UBtn>
          <UBtn href={links.resume}>Read the résumé</UBtn>
        </R>

        <div className="ft-rule"><Rule at="right" /></div>

        <div className="ft-grid">
          <R>
            <span className="label dim">Enquiries</span>
            <button className="ft-mail" onClick={copy} aria-label={`Copy ${links.email}`} data-cur="copy">
              <Roll text={links.email} />
            </button>
            <span className="mono dim" aria-live="polite">{copied ? 'Copied to clipboard' : 'Click to copy'}</span>
          </R>
          <R delay={0.08}>
            <span className="label dim">Elsewhere</span>
            {socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener"><Roll text={s.label} /></a>)}
          </R>
          <R delay={0.16}>
            <span className="label dim">Availability</span>
            <p>Remote. Async-friendly. Overlaps US/EU hours. Replies in hours, not days.</p>
          </R>
        </div>

        <div className="ft-word" ref={word} aria-hidden>
          {[...'avichal'].map((c, i) => <span key={i} style={{ ['--i' as string]: i } as CSSProperties}>{c}</span>)}
        </div>

        <div className="ft-bot label dim">
          <span>©Avichal Dwivedi 2026</span>
          <span className="ft-mid">Runs on cold brew and gradient descent.</span>
          <a href="#top"><Roll text="Back to top ↑" /></a>
        </div>
      </div>
    </footer>
  )
}
