import { motion } from 'framer-motion'
import { Award, Briefcase, Download, GraduationCap, Target } from 'lucide-react'
import Avatar from './Avatar.jsx'
import SectionHead from './SectionHead.jsx'
import { profile } from '../data/profile.js'
import { milestoneById } from '../data/milestones.js'
import { modes } from '../data/modes.js'
import { scrollToSection, useApp } from '../lib/AppContext.jsx'

const education = ['middlesex', 'srm', 'mtu'].map((id) => milestoneById[id])
const experience = ['mercor', 'tokyo', 'forage', 'internshala'].map((id) => milestoneById[id])

function Block({ icon: I, title, children, delay = 0 }) {
  return (
    <motion.div
      className="panel profile-block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
    >
      <h3 className="mini-head mini-head--lg">
        <I size={20} /> {title}
      </h3>
      {children}
    </motion.div>
  )
}

export default function Profile() {
  const { setModeId, setActiveMilestoneId } = useApp()

  return (
    <section id="profile" className="section section--profile" aria-labelledby="profile-title">
      <SectionHead id="profile-title" kicker="Profile" plain="About me" title="Player profile" />

      <div className="profile-layout">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, rotateY: -12 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={`profile-card-art ${profile.photo ? 'has-photo' : ''}`}>
            {profile.photo ? (
              <img src={profile.photo} alt={`Photo of ${profile.name}`} loading="lazy" />
            ) : (
              <Avatar idPrefix="profile" />
            )}
          </div>
          <div className="profile-card-info">
            <h3>{profile.name}</h3>
            <p>{profile.headline}</p>
            <span className="status-pill">
              <i className="live-dot" /> Open to opportunities
            </span>
            <a className="btn btn--yellow btn--block" href={profile.resume.href} download={profile.resume.downloadName}>
              <Download size={20} /> Download resume
            </a>
          </div>
        </motion.div>

        <div className="profile-main">
          <motion.blockquote
            className="panel profile-bio"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p>{profile.bio}</p>
          </motion.blockquote>

          <div className="profile-grid">
            <Block icon={GraduationCap} title="Education">
              <ul className="profile-list">
                {education.map((e) => (
                  <li key={e.id}>
                    <b>{e.title}</b>
                    <span>{e.org}</span>
                    <small>
                      {e.date}
                      {e.facts[0] && e.id !== 'middlesex' ? ` · ${e.facts.filter((f) => f.startsWith('GPA') || f.startsWith('Not')).join(' · ')}` : ''}
                    </small>
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={Briefcase} title="Experience & training" delay={0.05}>
              <ul className="profile-list">
                {experience.map((e) => (
                  <li key={e.id}>
                    <button
                      className="link-btn"
                      onClick={() => {
                        setActiveMilestoneId(e.id)
                        scrollToSection('battlepass')
                      }}
                    >
                      <b>{e.title}</b>
                    </button>
                    <span>{e.org}</span>
                    <small>
                      {e.date} · {e.type}
                    </small>
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={Target} title="Career interests" delay={0.1}>
              <ul className="chip-list">
                {modes.map((m) => (
                  <li key={m.id}>
                    <button
                      className="chip chip--btn"
                      onClick={() => {
                        setModeId(m.id)
                        scrollToSection('play')
                      }}
                    >
                      {m.title}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="muted">Preferred: Dubai, UAE and eligible international or remote roles.</p>
            </Block>

            <Block icon={Award} title="Certifications" delay={0.15}>
              <ul className="profile-list">
                <li>
                  <b>Dataiku Machine Learning &amp; Core Designer Practitioner</b>
                  <small>May 2026</small>
                </li>
              </ul>
            </Block>
          </div>
        </div>
      </div>
    </section>
  )
}
