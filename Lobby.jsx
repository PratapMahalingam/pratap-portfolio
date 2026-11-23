import { motion } from 'framer-motion'
import { ChevronRight, Download, Map as MapIcon, MapPin, Radio } from 'lucide-react'
import Avatar from './Avatar.jsx'
import LobbyScene from './LobbyScene.jsx'
import { profile } from '../data/profile.js'
import { milestones } from '../data/milestones.js'
import { modes } from '../data/modes.js'
import { scrollToSection, useApp } from '../lib/AppContext.jsx'

const rise = (d = 0) => ({
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay: d, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
})

export default function Lobby() {
  const { modeId, openDrop } = useApp()
  const mode = modes.find((m) => m.id === modeId)
  const current = milestones.filter((m) => m.current)

  return (
    <section id="lobby" className="lobby" aria-label="Lobby">
      <LobbyScene />

      <div className="lobby-grid">
        {/* LEFT — identity + player card */}
        <div className="lobby-left">
          <motion.p className="eyebrow eyebrow--chip" {...rise(0.05)}>
            <MapPin size={14} /> {profile.location} · Player lobby
          </motion.p>
          <motion.h1 className="lobby-name" {...rise(0.1)}>
            <span>{profile.firstName}</span>
            <span>{profile.lastName}</span>
          </motion.h1>
          <motion.p className="lobby-headline" {...rise(0.18)}>
            {profile.headline}
          </motion.p>
          <motion.p className="lobby-tagline" {...rise(0.24)}>
            {profile.tagline}
          </motion.p>

          <motion.dl className="player-card panel" {...rise(0.32)}>
            {profile.playerCard.map((row) => (
              <div key={row.label} className="pc-row">
                <dt>{row.label}</dt>
                <dd>
                  {row.status && <i className="live-dot" aria-hidden="true" />}
                  {row.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* CENTRE — avatar on platform */}
        <div className="lobby-stage" aria-hidden="false">
          <div className="platform" aria-hidden="true">
            <i className="platform-ring r1" />
            <i className="platform-ring r2" />
            <i className="platform-disc" />
            <i className="platform-beam" />
          </div>
          <motion.div
            className="avatar-wrap"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Avatar idPrefix="lobby" />
          </motion.div>
          <div className="stage-nameplate">
            <span>{profile.name}</span>
            <small>Ready</small>
          </div>
        </div>

        {/* RIGHT — primary actions */}
        <div className="lobby-right">
          <motion.div className="panel now-playing" {...rise(0.3)}>
            <p className="eyebrow">
              <Radio size={14} /> Now active
            </p>
            <ul>
              {current.map((m) => (
                <li key={m.id}>
                  <b>{m.title}</b>
                  <span>{m.org}</span>
                  <small>{m.date}</small>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="mode-pill" {...rise(0.36)}>
            <small>Selected mode</small>
            <b>{mode.title}</b>
          </motion.div>

          <motion.button className="btn btn--yellow btn--xl drop-cta" onClick={openDrop} {...rise(0.4)}>
            <MapIcon size={28} strokeWidth={2.6} /> Drop in
          </motion.button>
          <motion.button className="btn btn--blue btn--lg" onClick={() => scrollToSection('quests')} {...rise(0.44)}>
            View projects <ChevronRight size={24} strokeWidth={3} />
          </motion.button>
          <motion.a
            className="btn btn--white btn--lg"
            href={profile.resume.href}
            download={profile.resume.downloadName}
            {...rise(0.48)}
          >
            <Download size={22} /> Download resume
          </motion.a>
        </div>
      </div>

      <button className="scroll-cue" onClick={() => scrollToSection('play')} aria-label="Scroll to career modes">
        <span />
      </button>
    </section>
  )
}
