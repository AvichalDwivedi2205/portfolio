import { links } from '../data'
import { Split } from './Split'
import { Reveal } from './Reveal'
import { Magnetic } from './Magnetic'

export function Contact() {
  return (
    <section id="contact" className="contact wrap">
      <Reveal className="mono" style={{ color: 'var(--fg3)', marginBottom: 20 }}>hiring for an ai team? cool.</Reveal>
      <Split text="SAY HI." hoverPop />
      <Reveal><p>Remote. Async-friendly. Overlaps US/EU hours. Replies in hours, not days.</p></Reveal>
      <Reveal className="ctas" delay={0.1}>
        <Magnetic className="btn primary" href={`mailto:${links.email}`} data-cur="mail">Email me</Magnetic>
        <Magnetic className="btn ghost" href={links.x} target="_blank" rel="noopener">X</Magnetic>
        <Magnetic className="btn ghost" href={links.linkedin} target="_blank" rel="noopener">LinkedIn</Magnetic>
        <Magnetic className="btn ghost" href={links.github} target="_blank" rel="noopener">GitHub</Magnetic>
        <Magnetic className="btn ghost" href={links.resume} target="_blank" rel="noopener">Resume</Magnetic>
      </Reveal>
      <Reveal delay={0.2}><a className="mail" href={`mailto:${links.email}`}>{links.email}</a></Reveal>
    </section>
  )
}
