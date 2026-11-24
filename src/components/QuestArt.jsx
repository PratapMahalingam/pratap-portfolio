// Original illustrations for each quest card (inline SVG, animated with CSS keyframes in QuestArt.css).
import { useEffect, useRef } from 'react'
import './QuestArt.css'

const sec = (s) => `${s.toFixed(3)}s`

// radar sweep: wedge leading edge starts 60deg clockwise from "up" and turns once every 6s
const SWEEP_S = 6
function sweepDelay(cx, cy) {
  const deg = (Math.atan2(cx - 200, 120 - cy) * 180) / Math.PI
  return (((deg - 60) % 360) + 360) % 360 / 360 * SWEEP_S
}

function Aviation({ svgRef }) {
  const blips = [[140, 80], [262, 150], [230, 62], [120, 160]]
  return (
    <svg ref={svgRef} viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="qa-av-bg" cx="0.5" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#3fb6ff" />
          <stop offset="0.55" stopColor="#1546d6" />
          <stop offset="1" stopColor="#0a1c6e" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="url(#qa-av-bg)" />
      <g className="qa-radar" fill="none" stroke="#9fe6ff" strokeOpacity="0.35">
        <circle cx="200" cy="120" r="40" />
        <circle cx="200" cy="120" r="80" />
        <circle cx="200" cy="120" r="120" />
        <path d="M200 0 V220 M60 120 H340" />
      </g>
      <path className="qa-sweep" d="M200 120 L200 0 A120 120 0 0 1 304 60 Z" fill="#7fe3ff" opacity="0.18" />
      {/* data points: each lights up as the sweep passes over it */}
      {blips.map(([x, y], i) => {
        const d = { animationDelay: sec(sweepDelay(x, y)) }
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="none" stroke="#ffd23d" strokeWidth="2" className="qa-av-ring" style={d} />
            <circle cx={x} cy={y} r="4" fill="#ffd23d" className="qa-av-blip" style={d} />
          </g>
        )
      })}
      {/* original stylised plane */}
      <g className="qa-plane" transform="translate(200 116) rotate(-18)">
        <path d="M-70 0 Q-60 -9 40 -7 Q66 -6 74 0 Q66 6 40 7 Q-60 9 -70 0Z" fill="#ffffff" stroke="#0a0d2a" strokeWidth="3" />
        <path d="M-6 -6 L-34 -52 L-18 -52 L22 -6Z" fill="#e8f1ff" stroke="#0a0d2a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M-6 6 L-34 52 L-18 52 L22 6Z" fill="#c9dcff" stroke="#0a0d2a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M-64 -2 L-76 -26 L-66 -26 L-50 -3Z" fill="#2fd3ff" stroke="#0a0d2a" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="56" cy="-1" r="3" fill="#0a1c6e" />
        <circle cx="44" cy="-1" r="3" fill="#0a1c6e" />
      </g>
      <path d="M20 200 L80 170 L130 182 L190 150 L250 160 L310 120 L380 130" fill="none" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.6" />
      <path d="M20 200 L80 170 L130 182 L190 150 L250 160 L310 120 L380 130" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" pathLength="1" className="qa-travel qa-av-trace" />
    </svg>
  )
}

function Cyber({ svgRef }) {
  const circuits = ['M0 50 H90 L110 70 H160', 'M0 170 H70 L95 145 H150', 'M400 40 H310 L290 60 H245', 'M400 180 H320 L300 160 H250']
  const glyphs = [[60, 110, '$'], [330, 100, '$'], [300, 210, '%'], [40, 215, '%'], [370, 160, '$'], [20, 60, '$']]
  return (
    <svg ref={svgRef} viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="qa-cy-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a0f7a" />
          <stop offset="0.6" stopColor="#5d1ab8" />
          <stop offset="1" stopColor="#21064d" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#qa-cy-bg)" />
      {/* falling currency glyphs, behind the shield */}
      <g fill="#ffd98a" fontFamily="Anton, Impact, sans-serif" fontSize="22">
        {glyphs.map(([x, y, g], i) => (
          <text key={i} x={x} y="0" opacity="0.7" className="qa-cy-fall" style={{ transform: `translateY(${y}px)`, animationDelay: sec(-i * 1.37), animationDuration: sec(7 + (i % 3) * 1.4) }}>
            {g}
          </text>
        ))}
      </g>
      <g stroke="#ffb02e" strokeOpacity="0.55" strokeWidth="2" fill="none" className="qa-circuit">
        {circuits.map((d) => <path key={d} d={d} />)}
      </g>
      {/* packets running along the traces into the shield */}
      <g stroke="#ffe2a6" strokeWidth="3" strokeLinecap="round" fill="none">
        {circuits.map((d, i) => (
          <path key={d} d={d} pathLength="1" className="qa-travel qa-cy-packet" style={{ animationDelay: sec(i * 0.6) }} />
        ))}
      </g>
      <g fill="#ffb02e">
        {[[160, 70], [150, 145], [245, 60], [250, 160]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" className="qa-pulse" style={{ animationDelay: sec(i * 0.6 + 0.9) }} />
        ))}
      </g>
      {/* shield + padlock */}
      <g transform="translate(200 112)">
      <g className="qa-shield">
        <path d="M0 -84 L64 -60 Q66 20 0 84 Q-66 20 -64 -60Z" fill="#7a2cff" stroke="#0a0d2a" strokeWidth="4" />
        <path d="M0 -70 L50 -51 Q52 14 0 66 Q-52 14 -50 -51Z" fill="#a259ff" />
        <path d="M0 -70 L50 -51 Q52 14 0 66 Q-52 14 -50 -51Z" fill="#ffffff" className="qa-cy-glint" />
        <rect x="-26" y="-8" width="52" height="42" rx="7" fill="#ffb02e" stroke="#0a0d2a" strokeWidth="4" />
        <path d="M-16 -8 V-24 Q0 -44 16 -24 V-8" fill="none" stroke="#0a0d2a" strokeWidth="6" />
        <circle cx="0" cy="10" r="5" fill="#0a0d2a" />
        <rect x="-2.5" y="12" width="5" height="12" fill="#0a0d2a" />
      </g>
      </g>
    </svg>
  )
}

function Finance({ svgRef }) {
  const candles = [
    [40, 150, 120, 170, 'd'],
    [72, 130, 100, 150, 'u'],
    [104, 140, 110, 158, 'd'],
    [136, 112, 84, 130, 'u'],
    [168, 120, 96, 136, 'd'],
    [200, 96, 66, 112, 'u'],
    [232, 100, 78, 116, 'u'],
    [264, 78, 50, 96, 'u'],
    [296, 84, 60, 98, 'd'],
    [328, 60, 34, 76, 'u'],
  ]
  return (
    <svg ref={svgRef} viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="qa-fi-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1d05" />
          <stop offset="1" stopColor="#120c02" />
        </linearGradient>
        <linearGradient id="qa-fi-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe58a" />
          <stop offset="1" stopColor="#d68b00" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#qa-fi-bg)" />
      <g stroke="#ffd36a" strokeOpacity="0.12">
        {[40, 80, 120, 160, 200].map((y) => (
          <path key={y} d={`M0 ${y} H400`} />
        ))}
      </g>
      {candles.map(([x, open, high, low, dir], i) => (
        <g key={i} className="qa-candle" style={{ '--d': `${i * 0.08}s` }}>
          <g className="qa-fi-tick" style={{ animationDelay: sec(-i * 0.45) }}>
            <path d={`M${x} ${high} V${low + 20}`} stroke="#ffd36a" strokeWidth="2" />
            <rect x={x - 8} y={dir === 'u' ? open - 10 : open} width="16" height="26" rx="2" fill={dir === 'u' ? 'url(#qa-fi-gold)' : '#6b4a12'} stroke="#ffd36a" strokeWidth="1.5" />
          </g>
        </g>
      ))}
      <path d="M30 168 C120 150 200 110 360 40" fill="none" stroke="#fff6d6" strokeWidth="3" strokeDasharray="6 6" className="qa-fi-trend" />
      {/* original "beta" medallion */}
      <g transform="translate(330 168)">
        <g className="qa-fi-coin">
          <circle r="34" fill="url(#qa-fi-gold)" stroke="#0a0d2a" strokeWidth="4" />
          <circle r="26" fill="none" stroke="#7a4b00" strokeWidth="2" />
          <text y="11" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="30" fill="#3a2400">β</text>
        </g>
      </g>
    </svg>
  )
}


/* ─── research quests: one frame, a different motif each ─── */
const sciPalettes = {
  protein: ['#0f5b4a', '#0a2f2a', '#5ff2c0'],
  space: ['#120a3d', '#05031a', '#ffd84a'],
  connectome: ['#3a0f5e', '#14052a', '#ff7ae0'],
  eeg: ['#0b3a6e', '#061a38', '#5fe0ff'],
  spikes: ['#4a1240', '#1c0618', '#ff9f5a'],
  morphology: ['#1f4d1a', '#0a2008', '#b8ff6a'],
  genes: ['#5e3a0a', '#2a1704', '#ffcf5a'],
  fraud: ['#0d3b3a', '#041716', '#ff4d5e'],
  spatial: ['#3b1a5e', '#12062a', '#ffb3f0'],
  graphrag: ['#0a3a5e', '#04162a', '#7dffb0'],
}

function rng(seed) {
  let x = seed
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}

const mod = (a, m) => ((a % m) + m) % m

function Motif({ theme, c }) {
  const r = rng(theme.length * 97)
  switch (theme) {
    case 'protein': {
      // a turning double helix: base pairs swing through each other, rungs shrink as they turn edge-on
      const T = 3
      return (
        <g className="qa-float">
          {Array.from({ length: 14 }, (_, i) => {
            const x = 70 + i * 19
            const d = { animationDelay: sec(-(mod(0.9 * i - Math.PI / 2, 2 * Math.PI) / Math.PI) * T) }
            const y1 = 110 + Math.sin(i * 0.9) * 45
            const y2 = 110 - Math.sin(i * 0.9) * 45
            return (
              <g key={i}>
                <path d={`M${x} 65 L${x} 155`} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" className="qa-helix-rung" style={{ ...d, transform: `scaleY(${Math.abs(Math.sin(i * 0.9)).toFixed(3)})` }} />
                <circle cx={x} cy={y1} r="8" fill={c} stroke="#0a0d2a" strokeWidth="2.5" className="qa-helix-a" style={{ ...d, '--y0': `${110 - y1}px` }} />
                <circle cx={x} cy={y2} r="8" fill="#ffffff" stroke="#0a0d2a" strokeWidth="2.5" className="qa-helix-b" style={{ ...d, '--y0': `${110 - y2}px` }} />
              </g>
            )
          })}
        </g>
      )
    }
    case 'space': {
      // transit light curve repeats every 400 units so it can scroll seamlessly
      const curve = [0, 400].map((o) => `L${o + 80} 190 L${o + 90} 176 L${o + 100} 196 L${o + 110} 190`).join(' ')
      return (
        <g>
          {Array.from({ length: 40 }, (_, i) => (
            <circle
              key={i}
              cx={r() * 400}
              cy={r() * 220}
              r={r() * 1.8 + 0.4}
              fill="#ffffff"
              opacity={0.4 + r() * 0.6}
              className={i % 3 === 0 ? 'qa-twinkle' : undefined}
              style={i % 3 === 0 ? { animationDelay: sec(-i * 0.41), animationDuration: sec(2.6 + (i % 5) * 0.7) } : undefined}
            />
          ))}
          <circle cx="250" cy="110" r="44" fill={c} stroke="#0a0d2a" strokeWidth="4" />
          <circle cx="250" cy="110" r="44" fill="url(#qa-glow)" className="qa-sp-glow" />
          <g className="qa-orbit">
            <ellipse cx="250" cy="110" rx="100" ry="34" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="150" cy="110" r="12" fill="#5fe0ff" stroke="#0a0d2a" strokeWidth="3" />
          </g>
          <g className="qa-scroll-400" style={{ animationDuration: '14s' }}>
            <path d={`M0 190 ${curve} L800 190`} fill="none" stroke="#5fe0ff" strokeWidth="3" opacity="0.8" />
          </g>
        </g>
      )
    }
    case 'connectome': {
      const nodes = Array.from({ length: 16 }, () => [40 + r() * 320, 30 + r() * 160])
      const edges = []
      nodes.forEach(([x, y], i) => nodes.slice(i + 1, i + 4).forEach(([x2, y2]) => edges.push(`M${x} ${y} L${x2} ${y2}`)))
      return (
        <g>
          {edges.map((d, i) => (
            <path key={i} d={d} stroke={c} strokeOpacity="0.5" strokeWidth="2" />
          ))}
          {/* spikes travelling along a subset of connections */}
          <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
            {edges.map((d, i) =>
              i % 2 === 0 ? <path key={i} d={d} pathLength="1" className="qa-travel qa-cn-signal" style={{ animationDelay: sec(-((i * 0.73) % 5)) }} /> : null,
            )}
          </g>
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 9 : 6} fill={i % 4 === 0 ? c : '#ffffff'} stroke="#0a0d2a" strokeWidth="2.5" className="qa-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </g>
      )
    }
    case 'eeg': {
      // frequencies are chosen to complete whole cycles in 400 units, so the traces scroll without a seam
      const freqs = [5, 7, 9, 11].map((k) => (2 * Math.PI * k) / 40)
      return (
        <g>
          {[50, 95, 140, 185].map((y, k) => (
            <g key={y} className="qa-scroll-400" style={{ animationDuration: sec(9 + k * 1.5) }}>
              <path
                d={`M0 ${y} ` + Array.from({ length: 80 }, (_, i) => `L${i * 10 + 10} ${y + Math.sin((i + 1) * freqs[k]) * (8 + ((i + 1) % 40) % 7) * (k === 1 ? 1.6 : 1)}`).join(' ')}
                fill="none"
                stroke={k === 1 ? c : '#ffffff'}
                strokeOpacity={k === 1 ? 1 : 0.45}
                strokeWidth={k === 1 ? 3.5 : 2}
                strokeLinejoin="round"
              />
            </g>
          ))}
        </g>
      )
    }
    case 'spikes': {
      // a playhead sweeps the raster; each spike flares as it is read out
      const T = 5
      return (
        <g>
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: 22 }, (_, i) => {
              const late = i > 9
              if (r() > (late ? 0.65 : 0.22)) return null
              const x = 20 + i * 17 + r() * 8
              return (
                <path
                  key={`${row}-${i}`}
                  d={`M${x} ${22 + row * 21} v14`}
                  stroke={late ? c : '#ffffff'}
                  strokeOpacity={late ? 1 : 0.5}
                  strokeWidth="2.5"
                  className="qa-sk-spike"
                  style={{ animationDelay: sec((x / 400) * T), '--o': late ? 1 : 0.5 }}
                />
              )
            }),
          )}
          <path d="M190 10 V210" stroke="#ffffff" strokeOpacity="0.5" strokeDasharray="5 5" />
          <g className="qa-playhead" style={{ animationDuration: sec(T) }}>
            <rect x="-36" y="0" width="36" height="220" fill="url(#qa-trail)" />
            <path d="M0 0 V220" stroke={c} strokeOpacity="0.8" strokeWidth="2" />
          </g>
        </g>
      )
    }
    case 'morphology': {
      const branches = []
      const grow = (x, y, ang, len, depth) => {
        if (depth === 0) return
        const x2 = x + Math.cos(ang) * len
        const y2 = y + Math.sin(ang) * len
        branches.push([x, y, x2, y2, depth])
        grow(x2, y2, ang - 0.45, len * 0.72, depth - 1)
        grow(x2, y2, ang + 0.45, len * 0.72, depth - 1)
      }
      grow(200, 205, -Math.PI / 2, 52, 6)
      return (
        <g className="qa-mo-sway">
          {branches.map(([x, y, x2, y2, d], i) => (
            <path key={i} d={`M${x} ${y} L${x2} ${y2}`} stroke={c} strokeWidth={d * 1.2} strokeLinecap="round" />
          ))}
          {/* action potentials travelling out from the soma to the tips */}
          <g stroke="#ffffff" strokeLinecap="round">
            {branches.map(([x, y, x2, y2, d], i) => (
              <path key={i} d={`M${x} ${y} L${x2} ${y2}`} strokeWidth={Math.max(1.5, d * 0.7)} pathLength="1" className="qa-mo-ap" style={{ animationDelay: sec((6 - d) * 0.5) }} />
            ))}
          </g>
          <circle cx="200" cy="205" r="14" fill={c} stroke="#0a0d2a" strokeWidth="3" className="qa-mo-soma" />
        </g>
      )
    }
    case 'fraud': {
      // transactions stream along each row; a scan line sweeps right and a few nodes flag red as it passes
      const T = 6
      const passes = [
        [[0, 0], [4, 2], [8, 4]],
        [[11, 0], [2, 1], [9, 4]],
        [[6, 3], [10, 2], [1, 3]],
      ]
      const alertAt = {}
      passes.forEach((cells, p) => cells.forEach(([i, row]) => (alertAt[`${i}-${row}`] = p)))
      return (
        <g>
          {[40, 80, 120, 160, 200].map((y, row) => (
            <g key={y}>
              <path d={`M0 ${y} H400`} stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" />
              {[0, 1].map((k) => (
                <circle key={k} cx="0" cy={y} r="2.5" fill="#ffffff" className="qa-fr-txn" style={{ animationDuration: sec(4.2 + row * 0.55), animationDelay: sec(-(row * 1.3 + k * 2.4)) }} />
              ))}
              {Array.from({ length: 13 }, (_, i) => {
                const x = 16 + i * 30 + (row % 2) * 14
                const base = 0.35 + r() * 0.35
                const p = alertAt[`${i}-${row}`]
                if (p === undefined) {
                  return <rect key={i} x={x - 7} y={y - 7} width="14" height="14" rx="3" fill="#ffffff" opacity={base} />
                }
                const style = { animationDelay: sec(p * T + (x / 400) * T), animationDuration: sec(3 * T), '--o': base, '--c': c }
                return (
                  <g key={i}>
                    <rect x={x - 7} y={y - 7} width="14" height="14" rx="3" fill="none" stroke={c} strokeWidth="2" className="qa-fr-ripple" style={style} />
                    <rect
                      x={x - 7}
                      y={y - 7}
                      width="14"
                      height="14"
                      rx="3"
                      fill={p === 0 ? c : '#ffffff'}
                      opacity={p === 0 ? 1 : base}
                      stroke="#0a0d2a"
                      strokeWidth="2.5"
                      strokeOpacity={p === 0 ? 1 : 0}
                      className="qa-fr-alert"
                      style={style}
                    />
                  </g>
                )
              })}
            </g>
          ))}
          <g className="qa-fr-scan" style={{ animationDuration: sec(T) }}>
            <rect x="-56" y="0" width="56" height="220" fill="url(#qa-trail)" />
            <path d="M0 10 V210" stroke={c} strokeOpacity="0.7" strokeWidth="2" strokeDasharray="5 5" />
          </g>
        </g>
      )
    }
    case 'spatial': {
      const layers = ['#ffb3f0', '#ff7ae0', '#c45ad8', '#8a4fe0', '#5a6cf0', '#5fe0ff', '#ffffff']
      const spots = []
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 18; col++) {
          const x = 22 + col * 21 + (row % 2) * 10.5
          const y = 24 + row * 22
          const band = Math.max(0, Math.min(6, Math.floor((y + Math.sin(x / 60) * 14 - 14) / 29)))
          spots.push([x, y, band, row, col])
        }
      }
      const bandAt = (row, col) => (row < 0 || row > 8 || col < 0 || col > 17 ? null : spots[row * 18 + col][2])
      // spots that touch another layer waver between the two labels, as if the model were still deciding
      const undecided = spots.map(([, , b, row, col]) => {
        const other = [bandAt(row - 1, col), bandAt(row + 1, col), bandAt(row, col - 1), bandAt(row, col + 1)].find((n) => n !== null && n !== b)
        return other !== undefined && r() < 0.75 ? other : null
      })
      return (
        <g>
          {spots.map(([x, y], i) =>
            i % 18 < 17 ? <path key={`e${i}`} d={`M${x} ${y} L${spots[i + 1][0]} ${spots[i + 1][1]}`} stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" /> : null,
          )}
          {layers.map((_, band) => (
            <g key={band} className="qa-sg-band" style={{ animationDelay: sec(-band * 1.4) }}>
              {spots.map(([x, y, b], i) => {
                if (b !== band) return null
                const alt = undecided[i]
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="7"
                    fill={layers[b]}
                    opacity="0.9"
                    stroke="#0a0d2a"
                    strokeWidth="1.5"
                    className={alt === null ? undefined : 'qa-sg-decide'}
                    style={alt === null ? undefined : { '--f0': layers[b], '--f1': layers[alt], animationDuration: sec(9 + r() * 7), animationDelay: sec(-r() * 16) }}
                  />
                )
              })}
            </g>
          ))}
          <rect x="-160" y="0" width="160" height="220" fill="url(#qa-sheen)" className="qa-sg-sheen" />
        </g>
      )
    }
    case 'graphrag': {
      // one query document at a time: its edges draw into the entity graph, entities fire, then edges draw out to the results
      const docs = [[60, 50], [60, 110], [60, 170], [340, 50], [340, 110], [340, 170]]
      const ents = [[170, 70], [200, 130], [230, 75], [180, 185], [225, 175]]
      const links = (di) => ents.map((_, j) => j).filter((j) => (di + j) % 3 !== 1)
      const W = 3 // seconds per query
      const active = [0, 1, 2].map((q) => {
        const hit = links(q)
        const out = []
        hit.forEach((j) => [3, 4, 5].forEach((k) => links(k).includes(j) && (j + k + q) % 3 !== 2 && out.push([j, k])))
        return { q, hit, out, results: [...new Set(out.map(([, k]) => k))] }
      })
      const at = (q) => ({ animationDelay: sec(q * W), animationDuration: sec(3 * W) })
      const docBox = ([x, y]) => ({ x: x - 22, y: y - 26, width: 44, height: 52, rx: 6 })
      return (
        <g>
          {docs.map(([dx, dy], i) =>
            links(i).map((j) => (
              <path key={`${i}-${j}`} d={`M${dx} ${dy} L${ents[j][0]} ${ents[j][1]}`} stroke={c} strokeOpacity="0.4" strokeWidth="2" />
            )),
          )}
          <g stroke={c} strokeWidth="3" strokeLinecap="round" fill="none">
            {active.map(({ q, hit, out }) => (
              <g key={q}>
                {hit.map((j) => (
                  <path key={`i${j}`} d={`M${docs[q][0]} ${docs[q][1]} L${ents[j][0]} ${ents[j][1]}`} pathLength="1" className="qa-rag-in" style={at(q)} />
                ))}
                {out.map(([j, k]) => (
                  <path key={`o${j}-${k}`} d={`M${ents[j][0]} ${ents[j][1]} L${docs[k][0]} ${docs[k][1]}`} pathLength="1" className="qa-rag-out" style={at(q)} />
                ))}
              </g>
            ))}
          </g>
          {docs.map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 20} y={y - 24} width="40" height="48" rx="4" fill="#ffffff" stroke="#0a0d2a" strokeWidth="3" />
              <path d={`M${x - 12} ${y - 10} H${x + 12} M${x - 12} ${y} H${x + 12} M${x - 12} ${y + 10} H${x + 4}`} stroke="#0a3a5e" strokeOpacity="0.6" strokeWidth="2.5" />
            </g>
          ))}
          <g fill="none" stroke={c} strokeWidth="3">
            {active.map(({ q, results }) => (
              <g key={q}>
                <rect {...docBox(docs[q])} className="qa-rag-query" style={at(q)} />
                {results.map((k) => (
                  <rect key={k} {...docBox(docs[k])} className="qa-rag-result" style={at(q)} />
                ))}
              </g>
            ))}
          </g>
          {active.map(({ q, hit }) =>
            hit.map((j) => (
              <circle key={`${q}-${j}`} cx={ents[j][0]} cy={ents[j][1]} r="11" fill="none" stroke={c} strokeWidth="2.5" className="qa-rag-halo" style={at(q)} />
            )),
          )}
          {ents.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="11" fill={c} stroke="#0a0d2a" strokeWidth="3" className="qa-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </g>
      )
    }
    default:
      // expression heatmap: each cell drifts between two levels, in a slow wave across the genes
      return (
        <g>
          {Array.from({ length: 7 }, (_, row) =>
            Array.from({ length: 17 }, (_, col) => {
              const v = r()
              const o = 0.15 + v * 0.85
              return (
                <rect
                  key={`${row}-${col}`}
                  x={30 + col * 20}
                  y={30 + row * 22}
                  width="17"
                  height="19"
                  rx="3"
                  fill={c}
                  opacity={o}
                  className="qa-gx-cell"
                  style={{ '--o': o, '--o2': 0.15 + r() * 0.85, animationDelay: sec(-(col * 0.32 + row * 0.18)) }}
                />
              )
            }),
          )}
        </g>
      )
  }
}

function Science({ theme, svgRef }) {
  const [a, b, c] = sciPalettes[theme] || sciPalettes.genes
  return (
    <svg ref={svgRef} viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`qa-${theme}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id="qa-glow" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="qa-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={c} stopOpacity="0" />
          <stop offset="1" stopColor={c} stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="qa-sheen" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#qa-${theme}-bg)`} />
      <Motif theme={theme} c={c} />
    </svg>
  )
}

// Pause the keyframes while a card is scrolled out of view, so off-screen cards cost nothing.
function useOffscreenPause() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.removeAttribute('data-offscreen')
      else el.setAttribute('data-offscreen', '')
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export default function QuestArt({ theme }) {
  const svgRef = useOffscreenPause()
  if (theme === 'aviation') return <Aviation svgRef={svgRef} />
  if (theme === 'cyber') return <Cyber svgRef={svgRef} />
  if (theme === 'finance') return <Finance svgRef={svgRef} />
  return <Science theme={theme} svgRef={svgRef} />
}
