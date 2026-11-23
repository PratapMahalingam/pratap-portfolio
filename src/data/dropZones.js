// ─────────────────────────────────────────────────────────────
// DROP MAP — named locations on the original island map.
// Each location opens a part of the portfolio when you land there.
// x / y are map coordinates on a 1000 × 1000 grid (centre = 500,500).
// `go` is either { section: '<section id>' } or { quest: '<quest id>' }.
// ─────────────────────────────────────────────────────────────

export const dropZones = [
  {
    id: 'mesa',
    name: 'Mission Mesa',
    x: 500,
    y: 470,
    go: { section: 'play' },
    blurb: 'Career modes: the five directions I’m targeting, with roles, skills and backing work.',
  },
  {
    id: 'airfield',
    name: 'FlightGuard Airfield',
    x: 300,
    y: 305,
    go: { quest: 'flightguard' },
    blurb: 'Quest 01: aviation incident analytics on 3,000+ records across 15 variables.',
  },
  {
    id: 'citadel',
    name: 'Cyber Citadel',
    x: 705,
    y: 300,
    go: { quest: 'cybercrime' },
    blurb: 'Quest 02: my MBA dissertation on the economics of cybercrime (22,000+ breach records validated).',
  },
  {
    id: 'exchange',
    name: 'Equity Exchange',
    x: 715,
    y: 630,
    go: { quest: 'sony' },
    blurb: 'Quest 03: academic equity research on Sony Group using CAPM and benchmarking.',
  },
  {
    id: 'peaks',
    name: 'Progress Peaks',
    x: 300,
    y: 640,
    go: { section: 'battlepass' },
    blurb: 'Battle Pass: education, training, certification and current experience.',
  },
  {
    id: 'lagoon',
    name: 'Locker Lagoon',
    x: 505,
    y: 240,
    go: { section: 'locker' },
    blurb: 'Locker: my skills and the work each one is used in.',
  },
  {
    id: 'point',
    name: 'Profile Point',
    x: 215,
    y: 470,
    go: { section: 'profile' },
    blurb: 'Player profile: about me, education, experience and certification.',
  },
  {
    id: 'lab',
    name: 'Neuro Lab',
    x: 415,
    y: 375,
    go: { section: 'quests', track: 'science' },
    blurb: 'Research quests: connectome, spike-train, neuron morphology and brain gene-expression analyses.',
  },
  {
    id: 'observatory',
    name: 'Model Observatory',
    x: 795,
    y: 440,
    go: { section: 'quests', track: 'ml' },
    blurb: 'Machine learning quests: Kepler exoplanet vetting, ProteinGym and EEG movement decoding.',
  },
  {
    id: 'shores',
    name: 'Squad Shores',
    x: 530,
    y: 775,
    go: { section: 'squad' },
    blurb: 'Squad up: email, LinkedIn, GitHub and resume.',
  },
]
