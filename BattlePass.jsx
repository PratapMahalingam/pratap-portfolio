import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { milestones } from '../data/milestones.js'
import { useApp } from '../lib/AppContext.jsx'
import Icon from '../lib/Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function BattlePass() {
  const { activeMilestoneId, setActiveMilestoneId } = useApp()
  const activeIndex = Math.max(0, milestones.findIndex((m) => m.id === activeMilestoneId))
  const active = milestones[activeIndex]
  const trackRef = useRef(null)

  // keep the selected tier in view inside the horizontal track
  useEffect(() => {
    const el = trackRef.current?.querySelector(`[data-id="${active.id}"]`)
    const track = trackRef.current
    if (el && track) {
      const left = el.offsetLeft - track.clientWidth / 2 + el.clientWidth / 2
      track.scrollTo({ left, behavior: document.documentElement.classList.contains('reduce-motion') ? 'auto' : 'smooth' })
    }
  }, [active.id])

  const step = (d) => {
    const next = Math.min(milestones.length - 1, Math.max(0, activeIndex + d))
    setActiveMilestoneId(milestones[next].id)
  }

  return (
    <section id="battlepass" className="section section--bp" aria-labelledby="bp-title">
      <SectionHead
        id="bp-title"
        kicker="Battle Pass" plain="Experience & education"
        title="Career progression"
        intro="Education, training and experience in roughly chronological order. Each tier says exactly what it is: a degree, coursework, a training or virtual-experience programme, a certification or a current role."
      />

      <div className="bp-shell panel">
        <div className="bp-progress" aria-hidden="true">
          <motion.i
            className="bp-progress-fill"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          <span className="bp-progress-label">
            {milestones.length} milestones · now: {milestones.filter((m) => m.current).map((m) => m.title).join(' + ')}
          </span>
        </div>

        <div className="bp-track-wrap">
          <button className="icon-btn bp-arrow" onClick={() => step(-1)} disabled={activeIndex === 0} aria-label="Previous milestone">
            <ChevronLeft size={22} />
          </button>
          <ol className="bp-track" ref={trackRef}>
            {milestones.map((m, i) => {
              const selected = m.id === active.id
              return (
                <li key={m.id} data-id={m.id}>
                  <motion.button
                    className={`bp-tier ${selected ? 'is-selected' : ''} ${m.current ? 'is-current' : ''}`}
                    onClick={() => setActiveMilestoneId(m.id)}
                    aria-expanded={selected}
                    aria-controls="bp-detail"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                  >
                    <span className="bp-tier-num">Tier {i + 1}</span>
                    <span className="bp-tier-icon">
                      <Icon name={m.icon} size={40} strokeWidth={2} />
                    </span>
                    <span className="bp-tier-title">{m.title}</span>
                    <span className="bp-tier-org">{m.org}</span>
                    <span className="bp-tier-date">{m.date}</span>
                    {m.current && <span className="bp-tier-badge">Current</span>}
                  </motion.button>
                </li>
              )
            })}
            <li aria-hidden="true">
              <div className="bp-tier bp-tier--locked">
                <span className="bp-tier-num">Next tier</span>
                <span className="bp-tier-icon">
                  <Lock size={36} />
                </span>
                <span className="bp-tier-title">Your team?</span>
                <span className="bp-tier-org">Open to opportunities</span>
              </div>
            </li>
          </ol>
          <button
            className="icon-btn bp-arrow"
            onClick={() => step(1)}
            disabled={activeIndex === milestones.length - 1}
            aria-label="Next milestone"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id="bp-detail"
            className="bp-detail"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bp-detail-head">
              <span className="bp-detail-icon">
                <Icon name={active.icon} size={30} />
              </span>
              <div>
                <p className="eyebrow">
                  Tier {activeIndex + 1} · {active.type}
                </p>
                <h3>{active.title}</h3>
                <p className="bp-detail-org">
                  {active.org} — {active.date}
                </p>
              </div>
            </div>
            {active.detail && <p className="bp-detail-text">{active.detail}</p>}
            <ul className="outcome-list">
              {active.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
