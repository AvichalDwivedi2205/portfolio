import { Cursor } from './components/Cursor'
import { Progress } from './components/Progress'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Interview } from './components/Interview'
import { Work } from './components/Work'
import { Designs } from './components/Designs'
import { Research } from './components/Research'
import { Takes } from './components/Takes'
import { Experience } from './components/Experience'
import { Awards } from './components/Awards'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Confetti } from './components/Confetti'
import { BuddyDock } from './components/BuddyDock'
import { QuestBoard } from './components/QuestBoard'
import { Toasts } from './components/Toasts'

export default function App() {
  return (
    <>
      <Progress />
      <Cursor />
      <Confetti />
      <Nav />
      <main id="top">
        <div className="wrap"><Hero /></div>
        <Marquee />
        <Interview />
        <Work />
        <Designs />
        <Research />
        <Takes />
        <Experience />
        <Awards />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BuddyDock />
      <QuestBoard />
      <Toasts />
    </>
  )
}
