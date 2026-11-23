import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Crosshair, ExternalLink, FlaskConical, PlayCircle, Target, Wrench, X } from 'lucide-react'
import { questById } from '../data/quests.js'
import { useApp } from '../lib/AppContext.jsx'
import QuestArt from './QuestArt.jsx'

const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function QuestBriefing() {
  const { openQuestId, closeQuest } = useApp()
  const q = openQuestId ? questById[openQuestId] : null
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!q) return
    lastFocus.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeRef.current?.focus(), 50)
    const onKey = (e) => e.key === 'Escape' && closeQuest()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id])

  return (
    <AnimatePresence>
      {q && (
        <motion.div
          className="briefing-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && closeQuest()}
        >
          <motion.div
            className={`briefing quest--${q.theme}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="briefing-title"
            initial={{ y: 60, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="briefing-top">
              <div className="briefing-art">
                <QuestArt theme={q.theme} />
              </div>
              <div className="briefing-scan" aria-hidden="true" />
              <div className="briefing-heading">
                <p className="eyebrow">Mission briefing · Quest {q.number}</p>
                <h2 id="briefing-title">{q.title}</h2>
                <p className="briefing-sub">{q.subtitle}</p>
              </div>
              <button ref={closeRef} className="icon-btn briefing-close" onClick={closeQuest} aria-label="Close briefing">
                <X size={22} />
              </button>
            </div>

            <motion.div className="briefing-body" variants={stagger} initial="initial" animate="animate">
              <motion.p className="briefing-kind" variants={item}>
                {q.kind}
                {q.note && <span> · {q.note}</span>}
              </motion.p>

              <div className="briefing-cols">
                <motion.div className="brief-block" variants={item}>
                  <h3>
                    <Crosshair size={18} /> Problem
                  </h3>
                  <p>{q.problem}</p>
                </motion.div>
                <motion.div className="brief-block" variants={item}>
                  <h3>
                    <Target size={18} /> Objective
                  </h3>
                  <p>{q.objective}</p>
                </motion.div>
              </div>

              <motion.div className="brief-block" variants={item}>
                <h3>
                  <Wrench size={18} /> Methods
                </h3>
                <ul className="chip-list">
                  {q.methods.map((m) => (
                    <li key={m} className="chip">
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="brief-block brief-block--outcomes" variants={item}>
                <h3>
                  <CheckCircle2 size={18} /> Verified outcomes
                </h3>
                <ul className="outcome-list">
                  {q.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="brief-block" variants={item}>
                <h3>
                  <FlaskConical size={18} /> Skills used
                </h3>
                <ul className="chip-list">
                  {q.skills.map((s) => (
                    <li key={s} className="chip chip--solid">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="briefing-actions" variants={item}>
                {q.links.map((l) => (
                  <a key={l.href} className="btn btn--yellow" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.kind === 'video' ? <PlayCircle size={20} /> : <ExternalLink size={20} />} {l.label}
                  </a>
                ))}
                <button className="btn btn--ghost" onClick={closeQuest}>
                  <ArrowLeft size={18} /> Return to quest board
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
