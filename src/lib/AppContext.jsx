import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { modes } from '../data/modes.js'

const Ctx = createContext(null)

function initialReduce() {
  try {
    const saved = localStorage.getItem('pm-reduce-motion')
    if (saved !== null) return saved === '1'
  } catch {
    /* storage unavailable */
  }
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = document.documentElement.classList.contains('reduce-motion')
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (history.replaceState) history.replaceState(null, '', id === 'lobby' ? ' ' : `#${id}`)
}

export function AppProvider({ children }) {
  const [reduceMotion, setReduceMotion] = useState(initialReduce)
  const [openQuestId, setOpenQuestId] = useState(null)
  const [activeMilestoneId, setActiveMilestoneId] = useState('mercor')
  const [modeId, setModeId] = useState(modes[0].id)
  const [dropOpen, setDropOpen] = useState(false)
  const [questTrack, setQuestTrack] = useState('all')

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion)
    try {
      localStorage.setItem('pm-reduce-motion', reduceMotion ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [reduceMotion])

  // Open a quest briefing or jump to a Battle Pass milestone.
  const openRef = useCallback((id, kind) => {
    if (kind === 'quest') {
      setOpenQuestId(id)
    } else {
      setOpenQuestId(null)
      setActiveMilestoneId(id)
      requestAnimationFrame(() => scrollToSection('battlepass'))
    }
  }, [])

  const value = useMemo(
    () => ({
      reduceMotion,
      toggleMotion: () => setReduceMotion((r) => !r),
      openQuestId,
      openQuest: setOpenQuestId,
      closeQuest: () => setOpenQuestId(null),
      activeMilestoneId,
      setActiveMilestoneId,
      modeId,
      setModeId,
      openRef,
      dropOpen,
      questTrack,
      setQuestTrack,
      openDrop: () => setDropOpen(true),
      closeDrop: () => setDropOpen(false),
    }),
    [reduceMotion, openQuestId, activeMilestoneId, modeId, openRef, dropOpen, questTrack],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useApp = () => useContext(Ctx)
