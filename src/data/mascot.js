// What the floating mascot says as each part of the page scrolls into view.
// `selector` is matched with document.querySelector; order matters when
// several targets appear at once (e.g. three quest cards in one row).
export const mascotLines = [
  {
    id: 'hero',
    selector: '#lobby',
    text: "Hey, I'm Pratap. Drop in and see what I've been building.",
  },
  {
    id: 'quests',
    selector: '#quests .section-head',
    text: 'These are my projects — real data, honest results.',
  },
  {
    id: 'fraud',
    selector: '[data-quest="fraudmonitor"]',
    text: 'Fraud monitor — cut false alarms by 99.7 percent. Runs in 0.38 milliseconds.',
  },
  {
    id: 'rag',
    selector: '[data-quest="graphrag"]',
    text: 'BioMed RAG — evidence retrieval for clinical literature. Tested on SciFact.',
  },
  {
    id: 'gnn',
    selector: '[data-quest="spatialgnn"]',
    text: 'Spatial GNN — graph neural networks on actual brain tissue data.',
  },
  {
    id: 'battlepass',
    selector: '#battlepass',
    text: "Here's where I've been. Tokyo lab, Mercor, finance roots.",
  },
  {
    id: 'squad',
    selector: '#squad',
    text: "Want to build something together? Let's talk.",
  },
]
