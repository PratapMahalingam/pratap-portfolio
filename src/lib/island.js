// Geometry for the original island used by the drop map.
export const C = 500

// Radius of the coastline at angle `a` (radians).
export function islandR(a) {
  return 360 + 26 * Math.sin(3 * a + 1) + 18 * Math.sin(5 * a + 2) + 9 * Math.sin(9 * a + 0.5)
}

function closedCurve(points) {
  const n = points.length
  const p = (i) => points[(i + n) % n]
  let d = `M${p(0).x.toFixed(1)} ${p(0).y.toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2)
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d + 'Z'
}

function ring(scale = 1, n = 90) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    const r = islandR(a) * scale
    return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }
  })
}

export const islandPath = closedCurve(ring(1))
export const shallowsPath = closedCurve(ring(1.07))

export function clampToIsland(pt, margin = 30) {
  const dx = pt.x - C, dy = pt.y - C
  const a = Math.atan2(dy, dx)
  const max = islandR(a) - margin
  const d = Math.hypot(dx, dy)
  if (d <= max) return { ...pt, washed: false }
  return { x: C + Math.cos(a) * max, y: C + Math.sin(a) * max, washed: true }
}
