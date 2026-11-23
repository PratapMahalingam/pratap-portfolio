import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Map as MapIcon, Menu, Pause, Play, X } from 'lucide-react'
import { scrollToSection, useApp } from '../lib/AppContext.jsx'
import { profile } from '../data/profile.js'

export const TABS = [
  { id: 'lobby', label: 'Lobby', plain: 'Home' },
  { id: 'play', label: 'Play', plain: 'Career paths' },
  { id: 'quests', label: 'Quests', plain: 'Projects' },
  { id: 'battlepass', label: 'Battle Pass', plain: 'Experience' },
  { id: 'locker', label: 'Locker', plain: 'Skills' },
  { id: 'profile', label: 'Profile', plain: 'About' },
  { id: 'squad', label: 'Squad Up', plain: 'Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState('lobby')
  useEffect(() => {
    const els = TABS.map((t) => document.getElementById(t.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export default function NavBar() {
  const active = useActiveSection()
  const { reduceMotion, toggleMotion, openDrop } = useApp()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    if (open) {
      // wait until the menu has closed and body scrolling is restored
      setOpen(false)
      document.body.style.overflow = ''
      setTimeout(() => scrollToSection(id), 60)
    } else {
      scrollToSection(id)
    }
  }

  return (
    <header className="nav">
      <button className="nav-brand" onClick={() => go('lobby')} aria-label="Back to lobby">
        <span className="brand-badge">PM</span>
        <span className="brand-name">
          {profile.firstName}
          <b>{profile.lastName}</b>
        </span>
      </button>

      <nav className="nav-tabs" aria-label="Sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`nav-tab ${active === t.id ? 'is-active' : ''}`}
            aria-current={active === t.id ? 'true' : undefined}
            onClick={() => go(t.id)}
          >
            <span>{t.label}</span>
            <small className="nav-plain">{t.plain}</small>
            {active === t.id && <motion.i layoutId="tab-hl" className="tab-hl" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
          </button>
        ))}
      </nav>

      <div className="nav-tools">
        <button className="icon-btn icon-btn--drop" onClick={openDrop} aria-label="Open the drop map">
          <MapIcon size={18} />
          <span className="icon-btn-label">Drop in</span>
        </button>
        <button
          className="icon-btn"
          onClick={toggleMotion}
          aria-pressed={reduceMotion}
          aria-label="Reduce motion"
          title={reduceMotion ? 'Motion reduced — click to enable animations' : 'Reduce motion'}
        >
          {reduceMotion ? <Play size={18} /> : <Pause size={18} />}
          <span className="icon-btn-label">{reduceMotion ? 'Motion off' : 'Motion on'}</span>
        </button>
        <a className="icon-btn icon-btn--yellow" href={profile.resume.href} download={profile.resume.downloadName} aria-label="Download resume (PDF)">
          <Download size={18} />
          <span className="icon-btn-label">Resume</span>
        </a>
        <button className="icon-btn nav-burger" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Game menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-head">
              <span className="eyebrow">Game menu</span>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu" autoFocus>
                <X size={22} />
              </button>
            </div>
            <ul>
              {TABS.map((t, i) => (
                <motion.li
                  key={t.id}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <button className={`mm-item ${active === t.id ? 'is-active' : ''}`} onClick={() => go(t.id)}>
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    {t.label}
                    <em>{t.plain}</em>
                  </button>
                </motion.li>
              ))}
            </ul>
            <button
              className="btn btn--blue btn--block mm-drop"
              onClick={() => {
                setOpen(false)
                openDrop()
              }}
            >
              <MapIcon size={20} /> Drop in (map)
            </button>
            <a className="btn btn--yellow btn--block" href={profile.resume.href} download={profile.resume.downloadName}>
              <Download size={20} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
