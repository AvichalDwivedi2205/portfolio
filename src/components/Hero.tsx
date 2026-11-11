import { links, scrambleWords } from '../data'
import { HeroPortrait } from './HeroPortrait'
import { WaveField } from './WaveField'
import { WordSwap } from './WordSwap'
import { UBtn, useUi } from './ui'

const Pulse = () => (
  <svg className="pulse-ic" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" aria-hidden>
    <circle cx="11" cy="11" r="2" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="6" />
    <circle cx="11" cy="11" r="10" opacity=".45" />
  </svg>
)

/* Each new word in the headline is "spoken": the wave field's voice line answers with a burst. */
const say = () => dispatchEvent(new Event('signal:say'))

export function Hero() {
  const { loaded } = useUi()
  return (
    <section className={`hero ${loaded ? 'in' : ''}`} id="top" data-theme="dark">
      <WaveField />
      <div className="wrap hero-in">
        <div className="hero-top">
          <div className="hero-main">
            <p className="label hero-kicker"><i className="sq" />Avichal Dwivedi · AI engineer</p>
            <h1 aria-label="I build AI that talks back.">
              <span className="ln" aria-hidden><span>I build AI that</span></span>
              <span className="ln" aria-hidden><span><WordSwap words={scrambleWords} run={loaded} onSwap={say} /></span></span>
            </h1>
            <div className="hero-cta">
              <UBtn href="#work" cur="go">See the work</UBtn>
              <UBtn href={links.resume}>Read the résumé</UBtn>
            </div>
          </div>

          <HeroPortrait />
        </div>

        <div className="hero-bot">
          <a className="hero-scroll label" href="#about">
            <span className="scroll-ic" aria-hidden><i /></span>Scroll
          </a>
          <p className="hero-hint label" aria-hidden>
            hold to <Pulse /> pulse<br />Go on, touch the signal.
          </p>
          <div className="hero-side">
            <div className="tagbox label">
              <span>BITS Pilani<br />class of ’27</span>
              <span>Ships from India,<br />works in your timezone.</span>
            </div>
            <p>Voice agents with manners, multi-agent workspaces where humans stay in charge, and post-training that moves the benchmark.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
