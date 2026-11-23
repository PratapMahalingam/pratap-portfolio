import { motion } from 'framer-motion'

export default function SectionHead({ id, kicker, plain, title, intro }) {
  return (
    <motion.header
      className="section-head"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      <span className="kicker">
        {kicker}
        {plain && <span className="kicker-plain">{plain}</span>}
      </span>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </motion.header>
  )
}
