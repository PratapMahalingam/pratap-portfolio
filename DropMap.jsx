import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Crosshair, MapPin, RotateCcw, Wind, X } from 'lucide-react'
import Airship from './Airship.jsx'
import { dropZones } from '../data/dropZones.js'
import { C, clampToIsland, islandPath, shallowsPath } from '../lib/island.js'
import { scrollToSection, useApp } from '../lib/AppContext.jsx'

const FLIGHT_SECONDS = 13 // time for the ship to cross the map
const MAX_GLIDE = 360 // furthest you can glide from the jump point (map units = metres)
const DOORS_RADIUS = 470 // doors open while the ship is this close to the centre
const OUT = '#0a0d2a'

const lerp = (a, b, t) => a + (b - a) * t
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
const easeOut = (p) => 1 - Math.pow(1 - p, 3)

function newPath() {
  const th = Math.random() * Math.PI * 2
  const off = (Math.random() - 0.5) * 260
  const dx = Math.cos(th), dy = Math.sin(th)
  const px = -dy, py = dx
  return {
    a: { x: C - dx * 720 + px * off, y: C - dy * 720 + py * off },
    b: { x: C + dx * 720 + px * off, y: C + dy * 720 + py * off },
    deg: (th * 180) / Math.PI,
  }
}

function makeState(reduce) {
  return {
    phase: reduce ? 'pick' : 'boarding', // pick | boarding | flying | gliding | landed
    countdown: 3,
    t: 0,
    path: newPath(),
    from: null,
    to: null,
    player: null,
    elapsed: 0,
    dur: 1,
    result: null,
  }
}

const shipAt = (s) => ({ x: lerp(s.path.a.x, s.path.b.x, s.t), y: lerp(s.path.a.y, s.path.b.y, s.t) })

function nearestZone(pt) {
  let best = dropZones[0], bd = Infinity
  for (const z of dropZones) {
    const d = dist(pt, z)
    if (d < bd) { bd = d; best = z }
  }
  return { zone: best, d: Math.round(bd) }
}

/* ─── static island artwork (memoised) ─────────────────────── */
const buildingOffsets = [
  [-34, -20, 22, 16], [-8, -30, 18, 18], [16, -18, 24, 16], [-30, 4, 18, 20],
  [-6, 0, 20, 14], [20, 6, 16, 18], [-14, 22, 22, 14], [12, 26, 18, 12],
]
const roofs = ['#e8e3d6', '#c9d4ff', '#ffd9a8', '#f4f6ff', '#d7c7ff', '#bfe8ff']

const MapBase = memo(function MapBase() {
  return (
    <g>
      <defs>
        <radialGradient id="dm-ocean" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0" stopColor="#1fb3d8" />
          <stop offset="0.6" stopColor="#1477b8" />
          <stop offset="1" stopColor="#0b3f86" />
        </radialGradient>
        <pattern id="dm-waves" width="60" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 15 Q15 5 30 15 T60 15" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="3" />
        </pattern>
        <radialGradient id="dm-grass" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#8be04e" />
          <stop offset="1" stopColor="#4fae3a" />
        </radialGradient>
        <clipPath id="dm-island">
          <path d={islandPath} />
        </clipPath>
      </defs>

      <rect width="1000" height="1000" fill="url(#dm-ocean)" />
      <rect width="1000" height="1000" fill="url(#dm-waves)" />
      <path d={shallowsPath} fill="#5fe0f0" opacity="0.55" />
      <path d={islandPath} fill="#f3dc9a" stroke="#e9c978" strokeWidth="10" />

      <g clipPath="url(#dm-island)">
        <rect width="1000" height="1000" fill="url(#dm-grass)" transform="scale(0.97) translate(15 15)" />
        {/* desert (south-east) */}
        <path d="M560 1000 L1000 1000 L1000 470 L840 480 L740 520 L640 600 Z" fill="#f2b552" />
        <path d="M640 600 L740 520 L840 480 L1000 470" fill="none" stroke="#d98f2b" strokeWidth="10" opacity="0.5" />
        {[[790, 700, 40], [660, 760, 30], [860, 600, 26], [760, 820, 34]].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="#e39a3b" />
            <circle cx={x} cy={y} r={r * 0.6} fill="#f2b552" />
          </g>
        ))}
        {/* snowy peaks (south-west) */}
        <circle cx="290" cy="660" r="150" fill="#eaf4ff" />
        <circle cx="290" cy="660" r="150" fill="none" stroke="#bcd6f5" strokeWidth="14" />
        {[[250, 610], [330, 600], [290, 690], [215, 690], [365, 690]].map(([x, y], i) => (
          <path key={i} d={`M${x - 34} ${y + 26} L${x} ${y - 30} L${x + 34} ${y + 26}Z`} fill="#9fb8dd" stroke="#6f8cc0" strokeWidth="3" />
        ))}
        {/* forests */}
        {[[380, 380, 70, 50], [640, 420, 60, 70], [600, 190, 55, 40], [180, 330, 55, 70], [420, 600, 50, 40]].map(([x, y, rx, ry], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#2f8f3a" opacity="0.8" />
        ))}
        {Array.from({ length: 60 }, (_, i) => {
          const x = 140 + ((i * 137) % 720)
          const y = 160 + ((i * 251) % 640)
          return <circle key={i} cx={x} cy={y} r="7" fill="#2b7d34" opacity="0.7" />
        })}
        {/* lake + river */}
        <ellipse cx="505" cy="232" rx="78" ry="46" fill="#2a8fe0" stroke="#bff3ff" strokeWidth="5" />
        <path d="M520 276 C560 340 470 380 520 430 S600 520 560 600 S600 760 620 1000" fill="none" stroke="#2a8fe0" strokeWidth="16" strokeLinecap="round" />
        {/* roads from the mesa */}
        <g fill="none" stroke="#d8cfae" strokeWidth="7" strokeLinecap="round" opacity="0.9">
          {dropZones.filter((z) => z.id !== 'mesa').map((z) => (
            <path key={z.id} d={`M500 470 Q${(500 + z.x) / 2 + (z.y - 470) * 0.15} ${(470 + z.y) / 2 - (z.x - 500) * 0.15} ${z.x} ${z.y}`} />
          ))}
        </g>
        {/* mesa plateau */}
        <ellipse cx="500" cy="470" rx="70" ry="52" fill="#c98a4a" stroke="#9c6430" strokeWidth="6" />
        <ellipse cx="500" cy="462" rx="56" ry="38" fill="#e0a660" />
        {/* runway */}
        <g transform="rotate(-28 300 305)">
          <rect x="240" y="292" width="140" height="26" rx="3" fill="#4a4f66" />
          <path d="M252 305 H368" stroke="#ffffff" strokeWidth="3" strokeDasharray="12 8" />
        </g>
        {/* cyber citadel tower */}
        <path d="M705 262 L738 282 L738 322 L705 342 L672 322 L672 282Z" fill="#7a2cff" stroke={OUT} strokeWidth="4" />
        <circle cx="705" cy="302" r="10" fill="#ffb02e" />
        {/* equity exchange */}
        <rect x="690" y="600" width="50" height="40" rx="4" fill="#ffd84a" stroke={OUT} strokeWidth="4" />
        <path d="M684 600 L715 580 L746 600Z" fill="#c78a00" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        {/* building clusters */}
        {dropZones.map((z, zi) =>
          buildingOffsets.map(([dx, dy, w, h], i) => (
            <rect
              key={z.id + i}
              x={z.x + dx * 1.6 + (z.id === 'mesa' ? 0 : 18)}
              y={z.y + dy * 1.4 + 30}
              width={w}
              height={h}
              rx="2"
              fill={roofs[(i + zi) % roofs.length]}
              stroke="#5a5f78"
              strokeWidth="2"
              opacity={z.id === 'mesa' && i < 3 ? 0 : 1}
            />
          )),
        )}
      </g>

      {/* grid */}
      <g stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2">
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <path d={`M${(i + 1) * 100} 0 V1000`} />
            <path d={`M0 ${(i + 1) * 100} H1000`} />
          </g>
        ))}
      </g>
      <g fill="#ffffff" fillOpacity="0.55" fontFamily="'Barlow Condensed', sans-serif" fontWeight="800" fontSize="22">
        {'ABCDEFGHIJ'.split('').map((l, i) => (
          <text key={l} x={i * 100 + 50} y="26" textAnchor="middle">{l}</text>
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <text key={i} x="12" y={i * 100 + 58}>{i + 1}</text>
        ))}
      </g>
    </g>
  )
})

/* ─── the game ─────────────────────────────────────────────── */
function DropGame({ onClose, reduce, openQuest, setQuestTrack }) {
  const svgRef = useRef(null)
  const wrapRef = useRef(null)
  const g = useRef(null)
  if (g.current === null) g.current = makeState(reduce)
  const [, force] = useState(0)
  const rerender = () => force((n) => (n + 1) % 1e9)
  const [marker, setMarker] = useState(null)
  const markerRef = useRef(null)
  markerRef.current = marker

  const land = useCallback((pt, fast = false) => {
    const s = g.current
    const { zone, d } = nearestZone(pt)
    s.player = fast ? { x: zone.x, y: zone.y } : pt
    s.phase = 'landed'
    s.result = {
      zone,
      d: fast ? 0 : d,
      quality: fast ? 'Fast travel' : d < 70 ? 'Perfect drop!' : d < 160 ? 'Nice landing' : 'Landed in the wilds',
      washed: !!pt.washed,
    }
    rerender()
  }, [])

  const jump = useCallback(() => {
    const s = g.current
    if (s.phase !== 'flying') return
    const from = shipAt(s)
    const target = markerRef.current || from
    const d = dist(from, target)
    const glide = Math.min(d, MAX_GLIDE)
    const k = d === 0 ? 0 : glide / d
    let to = { x: from.x + (target.x - from.x) * k, y: from.y + (target.y - from.y) * k }
    to = clampToIsland(to)
    s.from = from
    s.to = to
    s.player = from
    s.elapsed = 0
    s.dur = 1.3 + dist(from, to) / 300
    s.phase = 'gliding'
    rerender()
  }, [])

  const restart = () => {
    g.current = makeState(reduce)
    rerender()
  }

  // game loop
  useEffect(() => {
    let raf
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const s = g.current
      if (s.phase === 'boarding') {
        s.countdown -= dt
        if (s.countdown <= 0) s.phase = 'flying'
        rerender()
      } else if (s.phase === 'flying') {
        s.t += dt / FLIGHT_SECONDS
        const ship = shipAt(s)
        const dc = dist(ship, { x: C, y: C })
        if ((s.t > 0.5 && dc > DOORS_RADIUS - 30) || s.t >= 1) {
          jump() // the ship ejects anyone still on board
        } else rerender()
      } else if (s.phase === 'gliding') {
        s.elapsed += dt
        const p = Math.min(1, s.elapsed / s.dur)
        const e = easeOut(p)
        s.player = { x: lerp(s.from.x, s.to.x, e), y: lerp(s.from.y, s.to.y, e) }
        if (p >= 1) land(s.to)
        else rerender()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [jump, land])

  // body scroll lock + keyboard
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      const isJumpKey = e.code === 'Space' || e.key === 'j' || e.key === 'J'
      // while the ship is in the air, Space / J always means "jump"
      if (isJumpKey && g.current.phase === 'flying') {
        e.preventDefault()
        e.stopPropagation()
        jump()
      }
    }
    window.addEventListener('keydown', onKey, true)
    const t = setTimeout(() => wrapRef.current?.focus({ preventScroll: true }), 30)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey, true)
    }
  }, [jump, onClose])

  const toSvg = (e) => {
    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(svg.getScreenCTM().inverse())
    return { x: Math.round(p.x), y: Math.round(p.y) }
  }

  const s = g.current
  const onMapClick = (e) => {
    wrapRef.current?.focus({ preventScroll: true })
    const pt = toSvg(e)
    if (s.phase === 'pick') land(clampToIsland(pt))
    else if (s.phase !== 'landed' && s.phase !== 'gliding') setMarker(pt)
  }
  const pickZone = (z, e) => {
    e?.stopPropagation()
    if (s.phase === 'pick') land(z, true)
    else if (s.phase !== 'landed' && s.phase !== 'gliding') setMarker({ x: z.x, y: z.y })
  }

  const enter = (zone) => {
    onClose()
    setTimeout(() => {
      if (zone.go.track) setQuestTrack(zone.go.track)
      if (zone.go.quest) {
        scrollToSection('quests')
        setTimeout(() => openQuest(zone.go.quest), 450)
      } else scrollToSection(zone.go.section)
    }, 80)
  }

  const ship = shipAt(s)
  const shipDist = dist(ship, { x: C, y: C })
  const doorsOpen = s.phase === 'flying' && shipDist < DOORS_RADIUS
  const flipped = Math.abs(((s.path.deg % 360) + 360) % 360 - 180) < 90
  const glideP = s.phase === 'gliding' ? Math.min(1, s.elapsed / s.dur) : 1
  const markerDist = marker && (s.phase === 'flying' || s.phase === 'boarding') ? Math.round(dist(ship, marker)) : null

  let status, hint
  switch (s.phase) {
    case 'pick':
      status = 'Pick a landing spot'
      hint = 'Motion is reduced, so the flight is skipped. Tap a location on the map or use the list below.'
      break
    case 'boarding':
      status = `Drop ship launching in ${Math.max(1, Math.ceil(s.countdown))}`
      hint = 'Tap the map to place a marker where you want to land. The white line is the flight path.'
      break
    case 'flying':
      status = doorsOpen ? 'Doors open — jump!' : s.t < 0.5 ? 'Doors open over the island' : 'Leaving the island…'
      hint = marker
        ? `Your glider covers up to ${MAX_GLIDE} m. Jump when the ship is close to your marker.`
        : 'No marker set: you will drop straight down. Tap the map to set one.'
      break
    case 'gliding':
      status = 'Gliding…'
      hint = `Altitude ${Math.round(400 * (1 - glideP))} m`
      break
    default:
      status = s.result?.quality
  }

  return (
    <motion.div
      className="drop-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drop-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="drop-head">
        <div>
          <span className="kicker">Drop in</span>
          <h2 id="drop-title" className="drop-title">Choose your landing</h2>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Close map and return to the lobby">
          <X size={22} />
        </button>
      </header>

      <div className="drop-layout">
        <div className="drop-map-wrap" ref={wrapRef} tabIndex={-1}>
          <svg
            ref={svgRef}
            className={`drop-map phase-${s.phase}`}
            viewBox="0 0 1000 1000"
            onClick={onMapClick}
            role="img"
            aria-label="Island map. Each named location opens a section of the portfolio."
          >
            <MapBase />

            {/* flight path */}
            {(s.phase === 'boarding' || s.phase === 'flying') && (
              <g>
                <path
                  d={`M${s.path.a.x} ${s.path.a.y} L${s.path.b.x} ${s.path.b.y}`}
                  stroke="#ffffff"
                  strokeWidth="6"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path d={`M${s.path.a.x} ${s.path.a.y} L${ship.x} ${ship.y}`} stroke="#ffe14d" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
              </g>
            )}

            {/* location labels */}
            {dropZones.map((z) => (
              <g
                key={z.id}
                className="map-poi"
                role="button"
                tabIndex={0}
                aria-label={`${z.name}: ${z.blurb}`}
                onClick={(e) => pickZone(z, e)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pickZone(z, e))}
              >
                <circle cx={z.x} cy={z.y} r="46" fill="transparent" />
                <text x={z.x} y={z.y - 34} textAnchor="middle" className="map-label">
                  {z.name.toUpperCase()}
                </text>
              </g>
            ))}

            {/* marker */}
            {marker && s.phase !== 'pick' && (
              <g transform={`translate(${marker.x} ${marker.y})`} className="map-marker">
                <circle r="26" fill="none" stroke="#ffe14d" strokeWidth="4" className="marker-ring" />
                <path d="M0 0 C-16 -22 -18 -34 -18 -40 A18 18 0 1 1 18 -40 C18 -34 16 -22 0 0Z" fill="#ffe14d" stroke={OUT} strokeWidth="4" />
                <circle cy="-40" r="7" fill={OUT} />
              </g>
            )}

            {/* glide trail + player */}
            {(s.phase === 'gliding' || s.phase === 'landed') && s.from && (
              <path d={`M${s.from.x} ${s.from.y} L${s.player.x} ${s.player.y}`} stroke="#ffe14d" strokeWidth="5" strokeDasharray="10 10" opacity="0.8" />
            )}
            {s.player && (s.phase === 'gliding' || s.phase === 'landed') && (
              <g transform={`translate(${s.player.x} ${s.player.y}) scale(${s.phase === 'gliding' ? 1.9 - glideP * 0.9 : 1})`}>
                {s.phase === 'landed' && <circle r="34" fill="none" stroke="#3ee08f" strokeWidth="5" className="land-ring" />}
                <ellipse cy="22" rx="16" ry="5" fill="#000" opacity="0.25" />
                <path d="M-26 4 L0 -14 L26 4 L0 -3Z" fill="#ffe14d" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
                <circle cy="8" r="8" fill="#2a3f94" stroke={OUT} strokeWidth="3" />
                <circle cy="-2" r="5" fill="#c98a5e" stroke={OUT} strokeWidth="2" />
              </g>
            )}

            {/* ship */}
            {(s.phase === 'boarding' || s.phase === 'flying' || s.phase === 'gliding') && (
              <g transform={`translate(${ship.x} ${ship.y}) rotate(${s.path.deg}) scale(1 ${flipped ? -1 : 1})`}>
                <ellipse cx="0" cy="44" rx="50" ry="12" fill="#000" opacity="0.18" />
                <Airship idPrefix="map-ship" x="-60" y="-36" width="120" height="72" />
              </g>
            )}
          </svg>
          {(s.phase === 'boarding' || s.phase === 'flying') && (
            <div className="map-clouds" aria-hidden="true">
              <i /> <i /> <i />
            </div>
          )}
        </div>

        <aside className="drop-hud panel">
          <p className="eyebrow">
            <Wind size={14} /> {s.phase === 'landed' ? 'Touchdown' : 'Drop status'}
          </p>
          <p className="hud-status" aria-live="polite">{status}</p>
          {hint && s.phase !== 'landed' && <p className="hud-hint">{hint}</p>}

          {(s.phase === 'boarding' || s.phase === 'flying') && (
            <>
              <div className="hud-row">
                <span>
                  <MapPin size={16} /> Marker
                </span>
                <b>{marker ? `${markerDist} m from ship` : 'Not set'}</b>
              </div>
              <button className={`btn btn--yellow btn--xl btn--block jump-btn ${doorsOpen ? 'is-ready' : ''}`} onClick={jump} disabled={!doorsOpen}>
                Jump <small>(Space)</small>
              </button>
            </>
          )}

          <AnimatePresence>
            {s.phase === 'landed' && s.result && (
              <motion.div className="land-card" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
                <p className="land-label">You landed at</p>
                <h3>{s.result.zone.name}</h3>
                {s.result.d >= 70 && (
                  <p className="hud-hint">
                    {s.result.washed ? 'Washed up on the shore. ' : ''}Nearest location, {s.result.d} m away.
                  </p>
                )}
                <p>{s.result.zone.blurb}</p>
                <button className="btn btn--yellow btn--block" onClick={() => enter(s.result.zone)}>
                  Enter {s.result.zone.name} <ChevronRight size={20} strokeWidth={3} />
                </button>
                <button className="btn btn--ghost btn--block" onClick={restart}>
                  <RotateCcw size={18} /> Drop again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="fast-travel">
            <h4 className="mini-head">
              <Crosshair size={16} /> Fast travel
            </h4>
            <ul>
              {dropZones.map((z) => (
                <li key={z.id}>
                  <button onClick={() => land(z, true)}>{z.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </motion.div>
  )
}

export default function DropMap() {
  const { dropOpen, closeDrop, reduceMotion, openQuest, setQuestTrack } = useApp()
  return (
    <AnimatePresence>
      {dropOpen && <DropGame key="drop" onClose={closeDrop} reduce={reduceMotion} openQuest={openQuest} setQuestTrack={setQuestTrack} />}
    </AnimatePresence>
  )
}
