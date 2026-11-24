// What the floating mascot says as each part of the page scrolls into view.
// `selector` is matched with document.querySelector; order matters when
// several targets appear at once (e.g. three quest cards in one row).
export const mascotLines = [
  {
    id: 'hero',
    selector: '#lobby',
    text: "Hey, I'm Pratap. Grab a seat — the good stuff is just below.",
  },
  {
    id: 'quests',
    selector: '#quests .section-head',
    text: 'These projects? Real data, honest math, no vibes.',
  },
  {
    id: 'fraud',
    selector: '[data-quest="fraudmonitor"]',
    text: "Fraud monitor's up here — we cut false alarms by 99.7 percent, in 0.38 milliseconds a transaction. Not bad.",
  },
  {
    id: 'rag',
    selector: '[data-quest="graphrag"]',
    text: 'BioMed RAG reads the medical papers so you don\'t have to — tested on SciFact, receipts included.',
  },
  {
    id: 'gnn',
    selector: '[data-quest="spatialgnn"]',
    text: 'Spatial GNN — graph neural nets on real brain tissue. Yes, actual brains.',
  },
  {
    id: 'battlepass',
    selector: '#battlepass',
    text: "The route so far: a Tokyo lab, Mercor, and finance roots keeping me honest.",
  },
  {
    id: 'squad',
    selector: '#squad',
    text: "Still here? Good sign. Let's build something together.",
  },
]
