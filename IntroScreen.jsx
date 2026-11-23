import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile.js'

const DURATION_MS = 1600 // guide: keep the intro under three seconds

function shouldShow() {
  if (typeof window === 'undefined') return false
  if (window.location.hash) return false // deep links go straight to the section
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  try {
    if (localStorage.getItem('pm-reduce-motion') === '1') return false
    if (sessionStorage.getItem('pm-intro-seen')) return false
    sessionStorage.setItem('pm-intro-seen', '1')
  } catch {
    /* storage blocked: show once per load */
  }
  return true
}

export default function IntroScreen() {
  const [show, setShow] = useState(shouldShow)

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), DURATION_MS)
    const skip = () => setShow(false)
    window.addEventListener('keydown', skip)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', skip)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          role="status"
          aria-label={`Loading ${profile.name}'s portfolio`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          onClick={() => setShow(false)}
        >
          <motion.span className="brand-badge intro-badge" initial={{ scale: 0.4, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}>
            PM
          </motion.span>
          <p className="intro-name">{profile.name}</p>
          <div className="intro-bar" aria-hidden="true">
            <motion.i initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: DURATION_MS / 1000 - 0.15, ease: 'easeInOut' }} />
          </div>
          <p className="intro-tip">Entering lobby…</p>
          <button className="btn btn--ghost intro-skip" onClick={() => setShow(false)}>
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
