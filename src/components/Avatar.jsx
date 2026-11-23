// Original stylised lobby avatar — pure SVG, no external assets.
// It is deliberately NOT a likeness of Pratap. Colours come from
// avatarPalette in src/data/profile.js.
import { avatarPalette as c } from '../data/profile.js'

const OUT = '#0a0d2a' // cel-shade outline colour

export default function Avatar({ className = '', idPrefix = 'av' }) {
  const g = (n) => `${idPrefix}-${n}`
  return (
    <svg
      className={`avatar ${className}`}
      viewBox="0 0 300 600"
      role="img"
      aria-label="Original illustrated avatar representing Pratap, wearing a navy blazer and holding a tablet showing a chart"
    >
      <defs>
        <linearGradient id={g('blazer')} x1="0" x2="1">
          <stop offset="0" stopColor={c.blazerLight} />
          <stop offset="0.55" stopColor={c.blazer} />
          <stop offset="1" stopColor={c.blazerShade} />
        </linearGradient>
        <linearGradient id={g('trousers')} x1="0" x2="1">
          <stop offset="0" stopColor={c.trousers} />
          <stop offset="1" stopColor={c.trousersShade} />
        </linearGradient>
        <radialGradient id={g('face')} cx="0.42" cy="0.4" r="0.7">
          <stop offset="0" stopColor={c.skin} />
          <stop offset="1" stopColor={c.skinShade} />
        </radialGradient>
        <linearGradient id={g('screen')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d3fb8" />
          <stop offset="1" stopColor="#0b1a5e" />
        </linearGradient>
        <linearGradient id={g('rim')} x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor={c.accent} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="150" cy="562" rx="92" ry="14" fill="#060827" opacity="0.45" />

      <g className="av-body">
        {/* legs */}
        <g stroke={OUT} strokeWidth="3" strokeLinejoin="round">
          <path d="M104 336 h46 l-2 196 h-40 z" fill={`url(#${g('trousers')})`} />
          <path d="M150 336 h46 l-4 196 h-40 z" fill={`url(#${g('trousers')})`} />
        </g>
        <path d="M128 360 v160" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="3" />
        <path d="M172 360 v160" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="3" />

        {/* shoes */}
        <g stroke={OUT} strokeWidth="3" strokeLinejoin="round">
          <path d="M106 526 h44 v20 q0 10 -10 10 h-50 q-10 0 -8 -10 q2 -14 24 -20z" fill={c.shoes} />
          <path d="M150 526 h44 q22 6 24 20 q2 10 -8 10 h-50 q-10 0 -10 -10z" fill={c.shoes} />
        </g>
        <path d="M92 546 h56" stroke={c.shoeAccent} strokeWidth="4" />
        <path d="M152 546 h58" stroke={c.shoeAccent} strokeWidth="4" />

        {/* left arm (viewer's left) — gentle sway */}
        <g className="av-arm-l">
          <g transform="translate(86 178) rotate(9)">
            <rect x="-16" y="0" width="32" height="150" rx="16" fill={c.blazerShade} stroke={OUT} strokeWidth="3" />
            <rect x="-15" y="138" width="30" height="12" rx="4" fill={c.shirt} stroke={OUT} strokeWidth="2.5" />
            <circle cx="0" cy="162" r="14" fill={c.skin} stroke={OUT} strokeWidth="3" />
          </g>
        </g>

        {/* torso / blazer */}
        <path
          d="M84 172 Q150 152 216 172 L226 252 L214 352 L156 352 L150 340 L144 352 L86 352 L74 252 Z"
          fill={`url(#${g('blazer')})`}
          stroke={OUT}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* rim light */}
        <path d="M200 176 L222 252 L212 346" fill="none" stroke={`url(#${g('rim')})`} strokeWidth="6" strokeLinecap="round" />
        {/* shirt */}
        <path d="M128 164 L172 164 L163 252 L150 266 L137 252 Z" fill={c.shirt} stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        {c.tie && <path d="M146 176 h8 l5 64 l-9 12 l-9 -12z" fill={c.tie} stroke={OUT} strokeWidth="2" />}
        {/* collar */}
        <path d="M128 164 L150 182 L138 194 L122 172 Z" fill="#ffffff" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M172 164 L150 182 L162 194 L178 172 Z" fill="#ffffff" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        {/* lapels */}
        <path d="M124 168 L104 186 L120 204 L147 262 Z" fill={c.blazerLight} stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M176 168 L196 186 L180 204 L153 262 Z" fill={c.blazerShade} stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        {/* pocket square + buttons */}
        <path d="M178 214 l22 -4 l2 8 l-22 4z" fill={c.accent} stroke={OUT} strokeWidth="2" />
        <circle cx="150" cy="290" r="4.5" fill="#0b1240" stroke="#ffffff" strokeOpacity="0.4" />
        <circle cx="150" cy="318" r="4.5" fill="#0b1240" stroke="#ffffff" strokeOpacity="0.4" />
        {/* lapel pin */}
        <circle cx="116" cy="204" r="5" fill="#ffd23d" stroke={OUT} strokeWidth="2" />

        {/* right arm holding a tablet */}
        <g className="av-arm-r">
          <g transform="translate(214 178) rotate(-9)">
            <rect x="-16" y="0" width="32" height="150" rx="16" fill={c.blazer} stroke={OUT} strokeWidth="3" />
            <rect x="-15" y="138" width="30" height="12" rx="4" fill={c.shirt} stroke={OUT} strokeWidth="2.5" />
          </g>
          <g transform="translate(250 344) rotate(14)">
            <rect x="-24" y="-36" width="48" height="70" rx="7" fill={c.tablet} stroke={OUT} strokeWidth="3" />
            <rect x="-19" y="-30" width="38" height="58" rx="3" fill={`url(#${g('screen')})`} />
            {/* chart on screen */}
            <rect x="-14" y="6" width="6" height="16" fill="#2fd3ff" />
            <rect x="-5" y="-2" width="6" height="24" fill="#8b5cff" />
            <rect x="4" y="-10" width="6" height="32" fill="#ffd23d" />
            <path d="M-15 -14 L-6 -20 L3 -16 L14 -26" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" className="av-screen-line" />
          </g>
          <circle cx="238" cy="340" r="14" fill={c.skin} stroke={OUT} strokeWidth="3" />
        </g>

        {/* neck */}
        <rect x="138" y="140" width="24" height="30" rx="6" fill={c.skinShade} stroke={OUT} strokeWidth="3" />

        {/* head */}
        <g className="av-head">
          <ellipse cx="107" cy="104" rx="8" ry="12" fill={c.skinShade} stroke={OUT} strokeWidth="3" />
          <ellipse cx="193" cy="104" rx="8" ry="12" fill={c.skinShade} stroke={OUT} strokeWidth="3" />
          <path
            d="M108 96 C108 142 128 156 150 156 C172 156 192 142 192 96 C192 60 174 46 150 46 C126 46 108 60 108 96 Z"
            fill={`url(#${g('face')})`}
            stroke={OUT}
            strokeWidth="3"
          />
          {/* hair */}
          <path
            d="M104 98 C96 54 124 28 156 30 C190 32 206 58 196 98 C192 82 184 70 172 66 C160 76 136 76 120 66 C112 74 108 84 104 98 Z"
            fill={c.hair}
            stroke={OUT}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M132 40 C150 34 172 38 184 52" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* brows */}
          <path d="M124 88 Q134 82 144 87" stroke={c.hair} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M156 87 Q166 82 176 88" stroke={c.hair} strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* eyes */}
          <g className="av-eyes">
            <ellipse cx="134" cy="104" rx="7.5" ry="8.5" fill="#ffffff" />
            <ellipse cx="166" cy="104" rx="7.5" ry="8.5" fill="#ffffff" />
            <circle cx="135" cy="105" r="5" fill="#2a1a10" />
            <circle cx="167" cy="105" r="5" fill="#2a1a10" />
            <circle cx="136.8" cy="103" r="1.7" fill="#ffffff" />
            <circle cx="168.8" cy="103" r="1.7" fill="#ffffff" />
          </g>
          {/* nose + smile */}
          <path d="M150 110 L146 124 L153 125" stroke={c.skinShade} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M136 134 Q150 145 164 134" stroke="#5a2a1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="124" cy="124" rx="7" ry="4" fill="#ff7a7a" opacity="0.18" />
          <ellipse cx="176" cy="124" rx="7" ry="4" fill="#ff7a7a" opacity="0.18" />
        </g>
      </g>
    </svg>
  )
}
