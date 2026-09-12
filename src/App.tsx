import { useState } from 'react'
import { Cursor } from './components/Cursor'
import { Progress } from './components/Progress'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Interview } from './components/Interview'
import { Work } from './components/Work'
import { Research } from './components/Research'
import { Brag } from './components/Brag'
import { Takes } from './components/Takes'
import { Experience } from './components/Experience'
import { Awards } from './components/Awards'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Confetti } from './components/Confetti'

export default function App() {
  const [fire, setFire] = useState(0)
  return (
    <>
      <div className="grain" aria-hidden />
      <Progress />
      <Cursor />
      <Confetti fire={fire} />
      <Nav onSecret={() => setFire(f => f + 1)} />
      <main id="top">
        <div className="wrap"><Hero /></div>
        <Marquee />
        <Interview />
        <Work />
        <Research />
        <Brag />
        <Takes />
        <Experience />
        <Awards />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
