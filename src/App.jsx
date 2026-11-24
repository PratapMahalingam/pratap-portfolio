import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { AppProvider, useApp } from './lib/AppContext.jsx'
import NavBar from './components/NavBar.jsx'
import Lobby from './components/Lobby.jsx'
import PlayModes from './components/PlayModes.jsx'
import QuestBoard from './components/QuestBoard.jsx'
import QuestBriefing from './components/QuestBriefing.jsx'
import BattlePass from './components/BattlePass.jsx'
import Locker from './components/Locker.jsx'
import Profile from './components/Profile.jsx'
import SquadUp from './components/SquadUp.jsx'
import Footer from './components/Footer.jsx'
import DropMap from './components/DropMap.jsx'
import IntroScreen from './components/IntroScreen.jsx'
import Mascot from './components/Mascot.jsx'

function Shell() {
  const { reduceMotion } = useApp()

  // honour a #section link on first load
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60)
  }, [])

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
      <a className="skip-link" href="#play">Skip to career summary</a>
      <NavBar />
      <main>
        <Lobby />
        <PlayModes />
        <QuestBoard />
        <BattlePass />
        <Locker />
        <Profile />
        <SquadUp />
      </main>
      <Footer />
      <Mascot />
      <QuestBriefing />
      <DropMap />
      <IntroScreen />
    </MotionConfig>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
