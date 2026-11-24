import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, PlayCircle, Star } from 'lucide-react'
import { quests, questTracks } from '../data/quests.js'
import { modes } from '../data/modes.js'
import { useApp } from '../lib/AppContext.jsx'
import QuestArt from './QuestArt.jsx'
import SectionHead from './SectionHead.jsx'

export default function QuestBoard() {
  const { openQuest, modeId, questTrack, setQuestTrack } = useApp()
  const mode = modes.find((m) => m.id === modeId)
  const [hover, setHover] = useState(null)
  const shown = quests.filter((q) => questTrack === 'all' || q.track === questTrack)

  return (
    <section id="quests" className="section section--quests" aria-labelledby="quests-title">
      <SectionHead
        id="quests-title"
        kicker="Quests"
        plain="Projects"
        title="Quest board"
        intro={`${quests.length} real projects, presented as missions. Each card shows the tools and one key result; open a quest for the full briefing.`}
      />

      <div className="quest-toolbar">
        <div className="quest-tabs" role="tablist" aria-label="Filter projects">
          {questTracks.map((t) => {
            const count = t.id === 'all' ? quests.length : quests.filter((q) => q.track === t.id).length
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={questTrack === t.id}
                className={`quest-tab ${questTrack === t.id ? 'is-active' : ''}`}
                onClick={() => setQuestTrack(t.id)}
              >
                {t.label} <small>{count}</small>
              </button>
            )
          })}
        </div>
        <p className="mode-hint">
          <Star size={16} /> Gold border = matches mode <b>{mode.title}</b>
        </p>
      </div>

      <motion.div className="quest-grid" layout>
        <AnimatePresence mode="popLayout">
          {shown.map((q) => {
            const relevant = mode.featured.includes(q.id)
            const demo = q.links.find((l) => l.kind === 'video')
            return (
              <motion.article
                key={q.id}
                data-quest={q.id}
                layout
                className={`quest-card quest--${q.theme} ${relevant ? 'is-relevant' : ''}`}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: hover === q.id ? -8 : 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHover(q.id)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="quest-art">
                  <QuestArt theme={q.theme} />
                  <span className="quest-num">Quest {q.number}</span>
                  {relevant && <span className="quest-flag">Mode match</span>}
                </div>
                <div className="quest-body">
                  <p className="quest-kind">{q.kind}</p>
                  <h3 className="quest-title">{q.title}</h3>
                  <p className="quest-mission">{q.mission}</p>
                  <div className="quest-result">
                    <span>Key result</span>
                    <b>{q.stats[0].value}</b>
                    <small>{q.stats[0].label}</small>
                  </div>
                  <ul className="quest-tools" aria-label="Tools used">
                    {q.skills.slice(0, 4).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="quest-actions">
                    <button className="btn btn--yellow" onClick={() => openQuest(q.id)} aria-haspopup="dialog">
                      Open briefing <ChevronRight size={20} strokeWidth={3} />
                    </button>
                    {demo && (
                      <a className="btn btn--ghost" href={demo.href} target="_blank" rel="noopener noreferrer">
                        <PlayCircle size={18} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
