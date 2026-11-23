import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, BriefcaseBusiness, ChevronRight, Sparkles } from 'lucide-react'
import { modes } from '../data/modes.js'
import { resolveRef } from '../lib/registry.js'
import { scrollToSection, useApp } from '../lib/AppContext.jsx'
import Icon from '../lib/Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function PlayModes() {
  const { modeId, setModeId, openRef } = useApp()
  const mode = modes.find((m) => m.id === modeId)

  return (
    <section id="play" className="section section--play" aria-labelledby="play-title">
      <SectionHead
        id="play-title"
        kicker="Play" plain="Career paths"
        title="Select your mode"
        intro="Each mode is a real career direction I'm targeting. Pick one to see the roles, the skills it uses and the work that backs it up."
      />

      <div className="mode-grid" role="tablist" aria-label="Career modes">
        {modes.map((m) => {
          const selected = m.id === modeId
          return (
            <motion.button
              key={m.id}
              role="tab"
              aria-selected={selected}
              aria-controls="mode-panel"
              className={`mode-card theme-${m.theme} ${selected ? 'is-selected' : ''}`}
              onClick={() => setModeId(m.id)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              layout
            >
              <span className="mode-num">Mode {m.number}</span>
              <span className="mode-icon">
                <Icon name={m.icon} size={42} strokeWidth={2.2} />
              </span>
              <span className="mode-title">{m.title}</span>
              {selected && (
                <motion.span className="mode-selected-tag" layoutId="mode-tag">
                  Selected
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode.id}
          id="mode-panel"
          role="tabpanel"
          className={`mode-panel panel theme-${mode.theme}`}
          initial={{ opacity: 0, x: 60, skewX: -4 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          exit={{ opacity: 0, x: -60, skewX: 4 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mode-panel-hero">
            <div className="mode-panel-icon">
              <Icon name={mode.icon} size={64} strokeWidth={2} />
            </div>
            <div>
              <p className="eyebrow">Mode {mode.number} · Career direction</p>
              <h3 className="mode-panel-title">{mode.title}</h3>
              <p className="mode-panel-tag">{mode.tagline}</p>
            </div>
          </div>

          <div className="mode-panel-cols">
            <div>
              <h4 className="mini-head">
                <BriefcaseBusiness size={16} /> Roles I'm interested in
              </h4>
              <ul className="role-list">
                {mode.roles.map((r, i) => (
                  <motion.li key={r} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    {r}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mini-head">
                <Sparkles size={16} /> Relevant skills
              </h4>
              <ul className="chip-list">
                {mode.skills.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              <h4 className="mini-head">Featured experience &amp; projects</h4>
              <ul className="ref-list">
                {mode.featured.map((id) => {
                  const ref = resolveRef(id)
                  if (!ref) return null
                  return (
                    <li key={id}>
                      <button className="ref-btn" onClick={() => openRef(id, ref.kind)}>
                        <span className="ref-tag">{ref.tag}</span>
                        <b>{ref.label}</b>
                        <small>{ref.sub}</small>
                        <ChevronRight size={18} className="ref-arrow" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="mode-panel-actions">
            <button className="btn btn--yellow" onClick={() => scrollToSection('quests')}>
              Go to quests <ChevronRight size={20} strokeWidth={3} />
            </button>
            <button className="btn btn--ghost" onClick={() => scrollToSection('lobby')}>
              <ArrowUp size={18} /> Return to lobby
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
