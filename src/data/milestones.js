// ─────────────────────────────────────────────────────────────
// BATTLE PASS — education, training & experience milestones.
// Source: resume. `type` describes WHAT the milestone is, so that
// virtual experiences / training are never presented as employment.
// Order is roughly chronological; the SRM BBA has no year on the
// resume, so none is shown.
// ─────────────────────────────────────────────────────────────

export const milestones = [
  {
    id: 'srm',
    org: 'SRM Institute of Science and Technology',
    title: 'BBA — Finance & Business Analytics',
    date: 'Undergraduate degree',
    type: 'Degree',
    icon: 'GraduationCap',
    facts: ['GPA: 7.91/10'],
    detail:
      'Undergraduate degree in Finance & Business Analytics — the foundation for the finance and analytics work that follows.',
  },
  {
    id: 'internshala',
    org: 'Internshala',
    title: 'Product Management Training Programme',
    date: 'Jun – Jul 2023',
    type: 'Training programme',
    icon: 'Compass',
    facts: [
      'Researched users, competitors and product needs to identify potential improvements and prioritise observations.',
      'Mapped user journeys and documented requirements and exploratory test findings for sample product workflows.',
    ],
  },
  {
    id: 'forage',
    org: 'J.P. Morgan via Forage',
    title: 'Investment Banking Virtual Experience',
    date: 'Jul 2023',
    type: 'Virtual experience programme',
    icon: 'Landmark',
    facts: [
      'Built an Excel three-statement financial model linking operating assumptions, financial forecasts and scenario analysis.',
      'Reviewed financial performance and valuation inputs to assess investment-related questions and model outcomes.',
      'Prepared investment research materials communicating the key financial assumptions and analysis in presentation format.',
    ],
  },
  {
    id: 'mtu',
    org: 'Michigan Technological University',
    title: 'Graduate coursework in Health Informatics',
    date: '2024 · one semester',
    type: 'Graduate coursework — degree not completed',
    icon: 'BookOpen',
    facts: ['One semester of graduate coursework', 'GPA: 4.0/4.0', 'Not a completed degree'],
  },
  {
    id: 'dataiku',
    org: 'Dataiku',
    title: 'Machine Learning & Core Designer Practitioner',
    date: 'May 2026',
    type: 'Certification',
    icon: 'BadgeCheck',
    facts: ['Dataiku Machine Learning & Core Designer Practitioner certification.'],
  },
  {
    id: 'middlesex',
    org: 'Middlesex University Dubai',
    title: 'MBA — Artificial Intelligence & Business Analytics',
    date: '2026 · Merit',
    type: 'Degree',
    icon: 'GraduationCap',
    facts: [
      'Completed 2026 with Merit.',
      'MBA dissertation: Economics of Cybercrime (see Quests).',
    ],
  },
  {
    id: 'tokyo',
    org: 'Matsuo-Iwasawa Lab, University of Tokyo (GCI World)',
    title: 'Data Science & AI Trainee',
    date: 'Sep 2026 – Present',
    type: 'Training programme · current',
    icon: 'Brain',
    current: true,
    facts: [
      'Prepare and clean analytical datasets while checking completeness, consistency and suitability for modelling exercises.',
      'Apply statistical reasoning and model assessment to interpret results, compare patterns and review analytical outputs.',
      'Explain findings and limitations through documented assumptions, data-quality checks and concise technical summaries.',
    ],
  },
  {
    id: 'mercor',
    org: 'Mercor — Project Odin',
    title: 'AI Research Contributor',
    date: 'Oct 2026 – Present',
    type: 'Experience · current',
    icon: 'Bot',
    current: true,
    facts: [
      'Evaluate AI-generated research material for factual accuracy, clarity and consistency; flag unsupported statements and gaps in reasoning.',
      'Validate source-backed findings and organise multi-step research outputs against quality criteria to support reliable evaluation.',
      'Write structured research documentation recording assumptions, checks and reproducible workflows for reviewers.',
    ],
  },
]

export const milestoneById = Object.fromEntries(milestones.map((m) => [m.id, m]))
