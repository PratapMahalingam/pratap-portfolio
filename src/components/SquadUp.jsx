import { motion } from 'framer-motion'
import { Download, Mail, Plus } from 'lucide-react'
import Avatar from './Avatar.jsx'
import { profile } from '../data/profile.js'
import { CodeGlyph, LinkedInGlyph } from '../lib/Icon.jsx'

export default function SquadUp() {
  const { email, linkedin, github } = profile.contact
  const buttons = [
    { label: 'Email me', sub: email, href: `mailto:${email}`, icon: <Mail size={26} />, cls: 'btn--yellow' },
    { label: 'LinkedIn', sub: 'in/pratap-mahalingam-1b5180281', href: linkedin, icon: <LinkedInGlyph />, cls: 'btn--blue', external: true },
    github && { label: 'GitHub', sub: 'PratapMahalingam', href: github, icon: <CodeGlyph />, cls: 'btn--purple', external: true },
    {
      label: 'Download resume',
      sub: 'PDF',
      href: profile.resume.href,
      download: profile.resume.downloadName,
      icon: <Download size={26} />,
      cls: 'btn--white',
    },
  ].filter(Boolean)

  return (
    <section id="squad" className="section section--squad" aria-labelledby="squad-title">
      <div className="squad-bg" aria-hidden="true" />
      <motion.div
        className="squad-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="kicker">
          Squad up<span className="kicker-plain">Contact</span>
        </span>
        <h2 id="squad-title" className="squad-title">
          Ready to build something together?
        </h2>
        <p className="section-intro">
          Open to graduate, junior and early-career opportunities across Finance, Business, Data, AI and Research.
        </p>

        <div className="squad-slots" aria-hidden="true">
          <div className="slot slot--filled">
            <div className="slot-art">
              <Avatar idPrefix="squad" />
            </div>
            <span>{profile.firstName}</span>
          </div>
          {[1, 2, 3].map((n) => (
            <div key={n} className="slot">
              <Plus size={34} />
              <span>Open slot</span>
            </div>
          ))}
        </div>

        <div className="squad-actions">
          {buttons.map((b) => (
            <motion.a
              key={b.label}
              className={`btn btn--squad ${b.cls}`}
              href={b.href}
              {...(b.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(b.download ? { download: b.download } : {})}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="squad-icon">{b.icon}</span>
              <span className="squad-text">
                <b>{b.label}</b>
                <small>{b.sub}</small>
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
