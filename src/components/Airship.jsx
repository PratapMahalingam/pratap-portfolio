// Original "drop ship": a small airship with a gondola. Faces +x.
const OUT = '#0a0d2a'

export default function Airship({ idPrefix = 'ship', className = '', ...svgProps }) {
  const g = (n) => `${idPrefix}-${n}`
  return (
    <svg viewBox="0 0 200 120" className={`airship ${className}`} aria-hidden="true" {...svgProps}>
      <defs>
        <linearGradient id={g('env')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a77bff" />
          <stop offset="0.55" stopColor="#6b2bd9" />
          <stop offset="1" stopColor="#3a1fb0" />
        </linearGradient>
      </defs>
      {/* tail fins */}
      <path d="M34 50 L8 24 L28 24 L50 46Z" fill="#ffd23d" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 68 L8 94 L28 94 L50 72Z" fill="#ffc61a" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      {/* propeller */}
      <g className="ship-prop">
        <ellipse cx="14" cy="59" rx="3.5" ry="17" fill="#e8f1ff" stroke={OUT} strokeWidth="2" />
      </g>
      <circle cx="20" cy="59" r="5" fill="#2fd3ff" stroke={OUT} strokeWidth="2.5" />
      {/* ropes + gondola */}
      <path d="M86 88 L82 100 M118 88 L122 100" stroke={OUT} strokeWidth="2.5" />
      <rect x="74" y="98" width="56" height="17" rx="6" fill="#1b2a6b" stroke={OUT} strokeWidth="3" />
      <rect x="82" y="102" width="9" height="7" rx="2" fill="#2fd3ff" />
      <rect x="97" y="102" width="9" height="7" rx="2" fill="#2fd3ff" />
      <rect x="112" y="102" width="9" height="7" rx="2" fill="#ffd23d" />
      {/* envelope */}
      <ellipse cx="102" cy="59" rx="78" ry="34" fill={`url(#${g('env')})`} stroke={OUT} strokeWidth="4" />
      <path d="M26 59 H178" stroke="#ffd23d" strokeWidth="7" />
      <path d="M26 59 H178" stroke={OUT} strokeWidth="1.5" strokeOpacity="0.3" />
      <ellipse cx="114" cy="42" rx="46" ry="9" fill="#ffffff" opacity="0.25" />
      <circle cx="140" cy="59" r="14" fill="#2fd3ff" stroke={OUT} strokeWidth="3" />
      <text x="140" y="65" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="16" fill={OUT}>
        PM
      </text>
    </svg>
  )
}
