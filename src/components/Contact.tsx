import { links } from '../data'
import { complete } from '../game/store'
import { Split } from './Split'
import { Reveal } from './Reveal'
import { Magnetic } from './Magnetic'

export function Contact() {
  const hi = () => complete('hi')
  return (
    <section id="contact" className="contact wrap" data-tip="contact">
      <Reveal className="hand" style={{ fontSize: 30, color: 'var(--coral-d)', marginBottom: 12 }}>hiring for an ai team? cool.</Reveal>
      <Split text="SAY HI." hoverPop />
      <Reveal><p>Remote. Async-friendly. Overlaps US/EU hours. Replies in hours, not days.</p></Reveal>
      <Reveal className="ctas" delay={0.1}>
        <Magnetic className="btn" href={`mailto:${links.email}`} data-cur="mail" onClick={hi}>Email me</Magnetic>
        <Magnetic className="btn sec" href={links.x} target="_blank" rel="noopener" onClick={hi}>X</Magnetic>
        <Magnetic className="btn sec" href={links.linkedin} target="_blank" rel="noopener" onClick={hi}>LinkedIn</Magnetic>
        <Magnetic className="btn sec" href={links.github} target="_blank" rel="noopener" onClick={hi}>GitHub</Magnetic>
        <Magnetic className="btn sec" href={links.resume} target="_blank" rel="noopener" onClick={() => complete('resume')}>Resume</Magnetic>
      </Reveal>
      <Reveal delay={0.2}><a className="mail" href={`mailto:${links.email}`} onClick={hi}>{links.email}</a></Reveal>
    </section>
  )
}
