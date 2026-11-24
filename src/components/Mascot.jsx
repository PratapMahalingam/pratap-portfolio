// Floating "squad buddy" that comments on each part of the page as it
// scrolls into view. Lines always show in a speech bubble; with Sound ON
// they are also read aloud through the browser's Web Speech API
// (SpeechSynthesis), so there is no server or audio file involved.
// Sound starts OFF: browsers only allow speech after a user gesture,
// and the toggle click is that gesture.
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX, X } from 'lucide-react'
import { mascotLines } from '../data/mascot.js'

const INTRO_DELAY_MS = 2000 // let the intro screen finish first
const GAP_MS = 450 // pause between consecutive lines
const LINGER_MS = 1400 // bubble stays this long after the last line

const speechSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

// Reading time for the silent bubble: ~3 words a second, 2.6 s minimum.
const readMs = (text) => Math.max(2600, text.split(/\s+/).length * 330 + 1200)

// Middle band of the viewport; a target counts as "seen" once it overlaps it.
function inView(item) {
  const el = document.querySelector(item.selector)
  if (!el) return false
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight || 800
  return r.height > 0 && r.top < vh * 0.72 && r.bottom > vh * 0.28
}

// Prefer the most natural-sounding English voice the device offers.
// Which voices exist depends entirely on the visitor's OS and browser.
function pickVoice() {
  const voices = window.speechSynthesis.getVoices().filter((v) => /^en([-_]|$)/i.test(v.lang))
  if (!voices.length) return null
  const score = (v) => {
    const n = v.name.toLowerCase()
    let s = 0
    if (/natural|neural|online|premium|enhanced/.test(n)) s += 4
    if (/google/.test(n)) s += 2
    if (/samantha|daniel|karen|moira|aria|jenny|guy|ava|serena|libby|ryan/.test(n)) s += 2
    if (/en[-_]us/i.test(v.lang)) s += 1
    if (/compact|espeak|novelty|whisper|zarvox|bad news|bells|bubbles|cellos|trinoids/.test(n)) s -= 6
    return s
  }
  return [...voices].sort((a, b) => score(b) - score(a))[0]
}

function BuddyFace({ talking }) {
  return (
    <svg className={`buddy-face ${talking ? 'is-talking' : ''}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="buddy-shell" cx="0.38" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#4b7dff" />
          <stop offset="0.55" stopColor="#2a1599" />
          <stop offset="1" stopColor="#12064d" />
        </radialGradient>
        <linearGradient id="buddy-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1550" />
          <stop offset="1" stopColor="#05061f" />
        </linearGradient>
      </defs>
      {/* antenna */}
      <path d="M50 14 V4" stroke="#0a0d2a" strokeWidth="4" strokeLinecap="round" />
      <circle className="buddy-antenna" cx="50" cy="5" r="4.5" fill="#ffe14d" stroke="#0a0d2a" strokeWidth="2" />
      {/* ear pods */}
      <rect x="4" y="44" width="10" height="20" rx="4" fill="#ffe14d" stroke="#0a0d2a" strokeWidth="3" />
      <rect x="86" y="44" width="10" height="20" rx="4" fill="#ffe14d" stroke="#0a0d2a" strokeWidth="3" />
      {/* head */}
      <circle cx="50" cy="54" r="40" fill="url(#buddy-shell)" stroke="#0a0d2a" strokeWidth="4" />
      <path d="M24 34 Q34 22 50 20" stroke="#fff" strokeOpacity="0.35" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* visor */}
      <rect x="20" y="38" width="60" height="38" rx="17" fill="url(#buddy-visor)" stroke="#2fd3ff" strokeWidth="2.5" />
      {/* eyes */}
      <g className="buddy-eyes" fill="#2fd3ff">
        <rect x="33" y="47" width="9" height="12" rx="4.5" />
        <rect x="58" y="47" width="9" height="12" rx="4.5" />
      </g>
      {/* mouth */}
      <rect className="buddy-mouth" x="42" y="64" width="16" height="5" rx="2.5" fill="#ffe14d" />
    </svg>
  )
}

export default function Mascot() {
  const [soundOn, setSoundOn] = useState(false)
  const [line, setLine] = useState(null)
  const [talking, setTalking] = useState(false)

  const soundRef = useRef(false)
  const lineRef = useRef(null)
  const queue = useRef([])
  const busy = useRef(false)
  const said = useRef(new Set())
  const timer = useRef(0)
  const token = useRef(0) // invalidates callbacks from an interrupted line
  const voice = useRef(null)
  const ready = useRef(false)

  const show = (item) => {
    lineRef.current = item
    setLine(item)
  }

  const clearTimer = () => clearTimeout(timer.current)

  const stopSpeech = () => {
    if (speechSupported) window.speechSynthesis.cancel()
  }

  // Present one line: bubble always, voice only when sound is on.
  const present = useCallback((item) => {
    const my = ++token.current
    clearTimer()
    busy.current = true
    said.current.add(item.id)
    show(item)
    setTalking(true)

    let finished = false
    const finish = () => {
      if (finished || my !== token.current) return
      finished = true
      setTalking(false)
      clearTimer()
      timer.current = setTimeout(() => {
        if (my !== token.current) return
        if (!advance()) {
          timer.current = setTimeout(() => {
            if (my === token.current) show(null)
          }, LINGER_MS)
        }
      }, GAP_MS)
    }

    if (soundRef.current && speechSupported) {
      const synth = window.speechSynthesis
      if (synth.speaking || synth.pending) synth.cancel()
      const u = new SpeechSynthesisUtterance(item.text)
      if (!voice.current) voice.current = pickVoice()
      if (voice.current) {
        u.voice = voice.current
        u.lang = voice.current.lang
      } else {
        u.lang = 'en-US'
      }
      u.rate = 1
      u.pitch = 1
      u.onend = finish
      u.onerror = finish
      synth.speak(u)
      // Safety net: some browsers occasionally never fire onend.
      timer.current = setTimeout(finish, readMs(item.text) * 2 + 3000)
    } else {
      timer.current = setTimeout(finish, readMs(item.text))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Take the next queued line that is still on screen. Lines the visitor
  // scrolled straight past are dropped (and can fire again on return).
  const advance = useCallback(() => {
    while (queue.current.length) {
      const item = queue.current.shift()
      if (inView(item)) {
        present(item)
        return true
      }
    }
    busy.current = false
    return false
  }, [present])

  const scan = useCallback(() => {
    if (!ready.current) return
    for (const item of mascotLines) {
      if (said.current.has(item.id)) continue
      if (queue.current.some((q) => q.id === item.id)) continue
      if (inView(item)) queue.current.push(item)
    }
    if (!busy.current) advance()
  }, [advance])

  // The most relevant line right now: the one showing, else the last
  // target on screen (used when sound is switched on or the buddy is tapped).
  const currentLine = () => {
    if (lineRef.current) return lineRef.current
    const visible = mascotLines.filter(inView)
    return visible[visible.length - 1] || mascotLines[0]
  }

  // Scroll watcher (rAF-throttled) plus a delayed first scan for the hero line.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        scan()
      })
    }
    const start = setTimeout(() => {
      ready.current = true
      scan()
    }, INTRO_DELAY_MS)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      clearTimeout(start)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scan])

  // Voices load asynchronously in Chrome; stop talking when the tab is hidden.
  useEffect(() => {
    if (!speechSupported) return
    const synth = window.speechSynthesis
    const onVoices = () => {
      voice.current = pickVoice()
    }
    onVoices()
    synth.addEventListener?.('voiceschanged', onVoices)
    const onHide = () => {
      if (document.hidden) synth.cancel()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => {
      synth.removeEventListener?.('voiceschanged', onVoices)
      document.removeEventListener('visibilitychange', onHide)
      synth.cancel()
      clearTimer()
    }
  }, [])

  const toggleSound = () => {
    const next = !soundOn
    soundRef.current = next
    setSoundOn(next)
    if (next) {
      // Speak inside the click handler so the browser treats it as user-initiated.
      present(currentLine())
    } else {
      token.current++
      stopSpeech()
      setTalking(false)
      clearTimer()
      const my = token.current
      timer.current = setTimeout(() => {
        if (my !== token.current) return
        if (!advance()) show(null)
      }, readMs(lineRef.current?.text || ''))
    }
  }

  const replay = () => present(currentLine())

  const dismiss = () => {
    token.current++
    stopSpeech()
    clearTimer()
    setTalking(false)
    busy.current = false
    show(null)
  }

  return (
    <aside className="buddy" aria-label="Portfolio guide">
      <AnimatePresence>
        {line && (
          <motion.div
            key={line.id}
            className="buddy-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.22 }}
          >
            <p>{line.text}</p>
            <button className="buddy-close" onClick={dismiss} aria-label="Hide speech bubble">
              <X size={14} strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="buddy-dock">
        {speechSupported && (
          <button
            className={`buddy-sound ${soundOn ? 'is-on' : ''}`}
            onClick={toggleSound}
            aria-pressed={soundOn}
            title={soundOn ? 'Turn the guide voice off' : 'Turn the guide voice on'}
          >
            {soundOn ? <Volume2 size={16} strokeWidth={2.5} /> : <VolumeX size={16} strokeWidth={2.5} />}
            <span>Sound {soundOn ? 'ON' : 'OFF'}</span>
          </button>
        )}
        <button className="buddy-avatar" onClick={replay} aria-label="Replay the guide's line">
          <BuddyFace talking={talking} />
        </button>
      </div>
    </aside>
  )
}
