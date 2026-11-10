import { useCallback, useEffect, useMemo, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { initScroll } from './scroll'
import { Seam, Ui } from './components/ui'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Signal } from './components/Signal'
import { Facts } from './components/Facts'
import { Work } from './components/Work'
import { Designs } from './components/Designs'
import { Interview } from './components/Interview'
import { Research } from './components/Research'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { TalkPanel } from './components/TalkPanel'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [intro, setIntro] = useState(true)
  const [talk, setTalk] = useState(false)

  useEffect(() => initScroll(), [])

  const closeTalk = useCallback(() => setTalk(false), [])
  const ui = useMemo(() => ({ loaded, openTalk: () => setTalk(true) }), [loaded])

  return (
    <MotionConfig reducedMotion="user">
      <Ui.Provider value={ui}>
        {intro && <Preloader onReveal={() => setLoaded(true)} onDone={() => setIntro(false)} />}
        <Cursor />
        <Header />
        <main>
          <Hero />
          <About />
          <Signal />
          <Facts />
          <Seam to="dark" />
          <Work />
          <Designs />
          <Seam to="light" />
          <Interview />
          <Seam to="dark" />
          <Research />
          <Experience />
        </main>
        <Footer />
        <TalkPanel open={talk} onClose={closeTalk} />
        <div className="grain" aria-hidden />
      </Ui.Provider>
    </MotionConfig>
  )
}
