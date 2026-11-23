// Explicit icon map keeps the bundle small (no `import *`).
import {
  Award, BadgeCheck, BookOpen, Bot, Brain, Briefcase, ChartColumn, ChartLine, ChartPie,
  CheckCheck, ClipboardCheck, Code2, Compass, Database, FileSpreadsheet, FileText,
  FlaskConical, Gauge, GraduationCap, Landmark, Layers, Lightbulb, Presentation, Route,
  Scale, ScanSearch, Search, Sigma, Table, Target, TrendingUp, Waypoints, Workflow, Activity, AudioWaveform, Dna, GitBranch, Microscope, Network, ShieldCheck, Shuffle,
} from 'lucide-react'

const map = {
  Award, BadgeCheck, BookOpen, Bot, Brain, Briefcase, ChartColumn, ChartLine, ChartPie,
  CheckCheck, ClipboardCheck, Code2, Compass, Database, FileSpreadsheet, FileText,
  FlaskConical, Gauge, GraduationCap, Landmark, Layers, Lightbulb, Presentation, Route,
  Scale, ScanSearch, Search, Sigma, Table, Target, TrendingUp, Waypoints, Workflow, Activity, AudioWaveform, Dna, GitBranch, Microscope, Network, ShieldCheck, Shuffle,
}

export default function Icon({ name, ...props }) {
  const C = map[name] || Award
  return <C aria-hidden="true" {...props} />
}

// Small original glyphs for brand links (lucide v1 ships no brand icons).
export function LinkedInGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
      <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="Arial, sans-serif" fill="#0b1550">in</text>
    </svg>
  )
}

export function CodeGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  )
}
