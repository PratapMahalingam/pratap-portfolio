// Resolves an id (quest or milestone) to display info, so that any
// component can link to "evidence" without knowing where it lives.
import { questById } from '../data/quests.js'
import { milestoneById } from '../data/milestones.js'

export function resolveRef(id) {
  const q = questById[id]
  if (q) {
    return {
      id,
      kind: 'quest',
      label: q.title,
      sub: q.subtitle,
      tag: `Quest ${q.number}`,
    }
  }
  const m = milestoneById[id]
  if (m) {
    return {
      id,
      kind: 'milestone',
      label: m.title,
      sub: m.org,
      tag: m.type,
    }
  }
  return null
}
