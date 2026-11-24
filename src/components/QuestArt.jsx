// Original illustrations for each quest card (inline SVG).

function Aviation() {
  return (
    <svg viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
      {/* data points */}
      <g fill="#ffd23d">
        <circle cx="140" cy="80" r="4" />
        <circle cx="262" cy="150" r="4" />
        <circle cx="230" cy="62" r="4" />
        <circle cx="120" cy="160" r="4" />
      </g>
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
    </svg>
  )
}

function Cyber() {
  return (
    <svg viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="qa-cy-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a0f7a" />
          <stop offset="0.6" stopColor="#5d1ab8" />
          <stop offset="1" stopColor="#21064d" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#qa-cy-bg)" />
      <g stroke="#ffb02e" strokeOpacity="0.55" strokeWidth="2" fill="none" className="qa-circuit">
        <path d="M0 50 H90 L110 70 H160" />
        <path d="M0 170 H70 L95 145 H150" />
        <path d="M400 40 H310 L290 60 H245" />
        <path d="M400 180 H320 L300 160 H250" />
      </g>
      <g fill="#ffb02e">
        <circle cx="160" cy="70" r="5" />
        <circle cx="150" cy="145" r="5" />
        <circle cx="245" cy="60" r="5" />
        <circle cx="250" cy="160" r="5" />
      </g>
      {/* shield + padlock */}
      <g transform="translate(200 112)">
      <g className="qa-shield">
        <path d="M0 -84 L64 -60 Q66 20 0 84 Q-66 20 -64 -60Z" fill="#7a2cff" stroke="#0a0d2a" strokeWidth="4" />
        <path d="M0 -70 L50 -51 Q52 14 0 66 Q-52 14 -50 -51Z" fill="#a259ff" />
        <rect x="-26" y="-8" width="52" height="42" rx="7" fill="#ffb02e" stroke="#0a0d2a" strokeWidth="4" />
        <path d="M-16 -8 V-24 Q0 -44 16 -24 V-8" fill="none" stroke="#0a0d2a" strokeWidth="6" />
        <circle cx="0" cy="10" r="5" fill="#0a0d2a" />
        <rect x="-2.5" y="12" width="5" height="12" fill="#0a0d2a" />
      </g>
      </g>
      {/* falling currency glyphs */}
      <g fill="#ffd98a" fontFamily="Anton, Impact, sans-serif" fontSize="22" opacity="0.7">
        <text x="60" y="110">$</text>
        <text x="330" y="100">$</text>
        <text x="300" y="210">%</text>
        <text x="40" y="215">%</text>
      </g>
    </svg>
  )
}

function Finance() {
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
    <svg viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
          <path d={`M${x} ${high} V${low + 20}`} stroke="#ffd36a" strokeWidth="2" />
          <rect x={x - 8} y={dir === 'u' ? open - 10 : open} width="16" height="26" rx="2" fill={dir === 'u' ? 'url(#qa-fi-gold)' : '#6b4a12'} stroke="#ffd36a" strokeWidth="1.5" />
        </g>
      ))}
      <path d="M30 168 C120 150 200 110 360 40" fill="none" stroke="#fff6d6" strokeWidth="3" strokeDasharray="6 6" />
      {/* original "beta" medallion */}
      <g transform="translate(330 168)">
        <circle r="34" fill="url(#qa-fi-gold)" stroke="#0a0d2a" strokeWidth="4" />
        <circle r="26" fill="none" stroke="#7a4b00" strokeWidth="2" />
        <text y="11" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="30" fill="#3a2400">β</text>
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

function Motif({ theme, c }) {
  const r = rng(theme.length * 97)
  switch (theme) {
    case 'protein':
      return (
        <g className="qa-float">
          {Array.from({ length: 14 }, (_, i) => {
            const x = 70 + i * 19
            const y1 = 110 + Math.sin(i * 0.9) * 45
            const y2 = 110 - Math.sin(i * 0.9) * 45
            return (
              <g key={i}>
                <path d={`M${x} ${y1} L${x} ${y2}`} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
                <circle cx={x} cy={y1} r="8" fill={c} stroke="#0a0d2a" strokeWidth="2.5" />
                <circle cx={x} cy={y2} r="8" fill="#ffffff" stroke="#0a0d2a" strokeWidth="2.5" />
              </g>
            )
          })}
        </g>
      )
    case 'space':
      return (
        <g>
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={r() * 400} cy={r() * 220} r={r() * 1.8 + 0.4} fill="#ffffff" opacity={0.4 + r() * 0.6} />
          ))}
          <circle cx="250" cy="110" r="44" fill={c} stroke="#0a0d2a" strokeWidth="4" />
          <circle cx="250" cy="110" r="44" fill="url(#qa-glow)" />
          <g className="qa-orbit">
            <ellipse cx="250" cy="110" rx="100" ry="34" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="150" cy="110" r="12" fill="#5fe0ff" stroke="#0a0d2a" strokeWidth="3" />
          </g>
          <path d="M20 190 L80 190 L90 176 L100 196 L110 190 L380 190" fill="none" stroke="#5fe0ff" strokeWidth="3" opacity="0.8" />
        </g>
      )
    case 'connectome': {
      const nodes = Array.from({ length: 16 }, () => [40 + r() * 320, 30 + r() * 160])
      return (
        <g>
          {nodes.map(([x, y], i) =>
            nodes.slice(i + 1, i + 4).map(([x2, y2], j) => (
              <path key={`${i}-${j}`} d={`M${x} ${y} L${x2} ${y2}`} stroke={c} strokeOpacity="0.5" strokeWidth="2" />
            )),
          )}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 9 : 6} fill={i % 4 === 0 ? c : '#ffffff'} stroke="#0a0d2a" strokeWidth="2.5" className="qa-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </g>
      )
    }
    case 'eeg':
      return (
        <g>
          {[50, 95, 140, 185].map((y, k) => (
            <path
              key={y}
              className="qa-wave"
              d={`M0 ${y} ` + Array.from({ length: 40 }, (_, i) => `L${i * 10 + 10} ${y + Math.sin(i * (0.8 + k * 0.3)) * (8 + (i % 7)) * (k === 1 ? 1.6 : 1)}`).join(' ')}
              fill="none"
              stroke={k === 1 ? c : '#ffffff'}
              strokeOpacity={k === 1 ? 1 : 0.45}
              strokeWidth={k === 1 ? 3.5 : 2}
            />
          ))}
        </g>
      )
    case 'spikes':
      return (
        <g>
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: 22 }, (_, i) => {
              const late = i > 9
              if (r() > (late ? 0.65 : 0.22)) return null
              const x = 20 + i * 17 + r() * 8
              return <path key={`${row}-${i}`} d={`M${x} ${22 + row * 21} v14`} stroke={late ? c : '#ffffff'} strokeOpacity={late ? 1 : 0.5} strokeWidth="2.5" />
            }),
          )}
          <path d="M190 10 V210" stroke="#ffffff" strokeOpacity="0.5" strokeDasharray="5 5" />
        </g>
      )
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
        <g>
          {branches.map(([x, y, x2, y2, d], i) => (
            <path key={i} d={`M${x} ${y} L${x2} ${y2}`} stroke={c} strokeWidth={d * 1.2} strokeLinecap="round" />
          ))}
          <circle cx="200" cy="205" r="14" fill={c} stroke="#0a0d2a" strokeWidth="3" />
        </g>
      )
    }
    case 'fraud':
      return (
        <g>
          {[40, 80, 120, 160, 200].map((y, row) => (
            <g key={y}>
              <path d={`M0 ${y} H400`} stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" />
              {Array.from({ length: 13 }, (_, i) => {
                const x = 16 + i * 30 + (row % 2) * 14
                const flagged = (i * 7 + row * 3) % 17 === 0
                return (
                  <rect
                    key={i}
                    x={x - 7}
                    y={y - 7}
                    width="14"
                    height="14"
                    rx="3"
                    fill={flagged ? c : '#ffffff'}
                    opacity={flagged ? 1 : 0.35 + r() * 0.35}
                    stroke={flagged ? '#0a0d2a' : 'none'}
                    strokeWidth="2.5"
                    className={flagged ? 'qa-pulse' : undefined}
                  />
                )
              })}
            </g>
          ))}
          <path d="M300 10 V210" stroke={c} strokeOpacity="0.7" strokeWidth="2" strokeDasharray="5 5" />
        </g>
      )
    case 'spatial': {
      const layers = ['#ffb3f0', '#ff7ae0', '#c45ad8', '#8a4fe0', '#5a6cf0', '#5fe0ff', '#ffffff']
      const spots = []
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 18; col++) {
          const x = 22 + col * 21 + (row % 2) * 10.5
          const y = 24 + row * 22
          const band = Math.min(6, Math.floor((y + Math.sin(x / 60) * 14 - 14) / 29))
          spots.push([x, y, band])
        }
      }
      return (
        <g>
          {spots.map(([x, y], i) =>
            i % 18 < 17 ? <path key={`e${i}`} d={`M${x} ${y} L${spots[i + 1][0]} ${spots[i + 1][1]}`} stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" /> : null,
          )}
          {spots.map(([x, y, b], i) => (
            <circle key={i} cx={x} cy={y} r="7" fill={layers[Math.max(0, b)]} opacity="0.9" stroke="#0a0d2a" strokeWidth="1.5" />
          ))}
        </g>
      )
    }
    case 'graphrag': {
      const docs = [[60, 50], [60, 110], [60, 170], [340, 50], [340, 110], [340, 170]]
      const ents = [[170, 70], [200, 130], [230, 75], [180, 185], [225, 175]]
      return (
        <g>
          {docs.map(([dx, dy], i) =>
            ents
              .filter((_, j) => (i + j) % 3 !== 1)
              .map(([ex, ey], j) => (
                <path key={`${i}-${j}`} d={`M${dx} ${dy} L${ex} ${ey}`} stroke={c} strokeOpacity="0.4" strokeWidth="2" />
              )),
          )}
          {docs.map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 20} y={y - 24} width="40" height="48" rx="4" fill="#ffffff" stroke="#0a0d2a" strokeWidth="3" />
              <path d={`M${x - 12} ${y - 10} H${x + 12} M${x - 12} ${y} H${x + 12} M${x - 12} ${y + 10} H${x + 4}`} stroke="#0a3a5e" strokeOpacity="0.6" strokeWidth="2.5" />
            </g>
          ))}
          {ents.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="11" fill={c} stroke="#0a0d2a" strokeWidth="3" className="qa-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </g>
      )
    }
    default:
      return (
        <g>
          {Array.from({ length: 7 }, (_, row) =>
            Array.from({ length: 17 }, (_, col) => {
              const v = r()
              return (
                <rect key={`${row}-${col}`} x={30 + col * 20} y={30 + row * 22} width="17" height="19" rx="3" fill={c} opacity={0.15 + v * 0.85} />
              )
            }),
          )}
        </g>
      )
  }
}

function Science({ theme }) {
  const [a, b, c] = sciPalettes[theme] || sciPalettes.genes
  return (
    <svg viewBox="0 0 400 220" className="quest-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`qa-${theme}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id="qa-glow" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#qa-${theme}-bg)`} />
      <Motif theme={theme} c={c} />
    </svg>
  )
}

export default function QuestArt({ theme }) {
  if (theme === 'aviation') return <Aviation />
  if (theme === 'cyber') return <Cyber />
  if (theme === 'finance') return <Finance />
  return <Science theme={theme} />
}
