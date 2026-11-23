import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, FileText } from 'lucide-react'
import { lockerCategories } from '../data/locker.js'
import { resolveRef } from '../lib/registry.js'
import { useApp } from '../lib/AppContext.jsx'
import Icon from '../lib/Icon.jsx'
import SectionHead from './SectionHead.jsx'

export default function Locker() {
  const { openRef } = useApp()
  const [catId, setCatId] = useState(lockerCategories[0].id)
  const cat = lockerCategories.find((c) => c.id === catId)
  const [itemName, setItemName] = useState(cat.items[0].name)
  const item = cat.items.find((i) => i.name === itemName) || cat.items[0]

  const pickCat = (c) => {
    setCatId(c.id)
    setItemName(c.items[0].name)
  }

  return (
    <section id="locker" className="section section--locker" aria-labelledby="locker-title">
      <SectionHead
        id="locker-title"
        kicker="Locker" plain="Skills"
        title="Skills loadout"
        intro="Tools and skills from my resume. Select any item to see where it was used. No made-up proficiency scores."
      />

      <div className="locker">
        <div className="locker-cats" role="tablist" aria-label="Skill categories">
          {lockerCategories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === catId}
              className={`locker-cat theme-${c.theme} ${c.id === catId ? 'is-active' : ''}`}
              onClick={() => pickCat(c)}
            >
              {c.title}
              <small>{c.items.length}</small>
            </button>
          ))}
        </div>

        <motion.ul className="locker-grid" key={cat.id} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
          {cat.items.map((it) => (
            <motion.li key={it.name} variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}>
              <button
                className={`locker-item theme-${cat.theme} ${it.name === item.name ? 'is-active' : ''}`}
                onClick={() => setItemName(it.name)}
                aria-pressed={it.name === item.name}
              >
                <span className="locker-item-icon">
                  <Icon name={it.icon} size={54} strokeWidth={1.9} />
                </span>
                <span className="locker-item-name">{it.short || it.name}</span>
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <AnimatePresence mode="wait">
          <motion.aside
            key={cat.id + item.name}
            className={`locker-detail panel theme-${cat.theme}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            aria-live="polite"
          >
            <span className="locker-detail-icon">
              <Icon name={item.icon} size={56} strokeWidth={1.8} />
            </span>
            <p className="eyebrow">{cat.title}</p>
            <h3>{item.name}</h3>
            {item.date && <p className="locker-date">Awarded {item.date}</p>}

            <h4 className="mini-head">Where it's used</h4>
            {item.evidence.length ? (
              <ul className="ref-list">
                {item.evidence.map((id) => {
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
            ) : (
              <p className="locker-note">
                <FileText size={16} /> Listed in the skills section of my resume; not tied to a specific project there.
              </p>
            )}
          </motion.aside>
        </AnimatePresence>
      </div>
    </section>
  )
}
