// ─────────────────────────────────────────────────────────────
// LOCKER — skills as items. No proficiency %, levels or years.
// `evidence` lists quest/milestone ids where the skill appears on
// the resume. Skills listed on the resume without a specific project
// have an empty evidence list and are labelled honestly in the UI.
// ─────────────────────────────────────────────────────────────

export const lockerCategories = [
  {
    id: 'finance',
    title: 'Finance',
    theme: 'gold',
    items: [
      { name: 'Three-statement financial modelling', icon: 'FileSpreadsheet', evidence: ['forage'] },
      { name: 'Forecasting', icon: 'ChartLine', evidence: ['forage', 'cybercrime'] },
      { name: 'Scenario analysis', icon: 'Layers', evidence: ['forage'] },
      { name: 'Investment research', icon: 'Search', evidence: ['sony', 'forage'] },
      { name: 'CAPM', icon: 'Scale', evidence: ['sony'] },
      { name: 'KPI reporting', icon: 'Gauge', evidence: [] },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    theme: 'blue',
    items: [
      { name: 'Python', icon: 'Code2', evidence: ['eeg', 'allen'] },
      { name: 'SQL', icon: 'Database', evidence: [] },
      { name: 'Excel', icon: 'Table', evidence: ['forage'] },
      { name: 'Power BI', icon: 'ChartPie', evidence: [] },
      { name: 'Tableau', icon: 'ChartColumn', evidence: [] },
      { name: 'Dataiku', icon: 'Waypoints', evidence: ['flightguard', 'dataiku'] },
      { name: 'Data validation', icon: 'ClipboardCheck', evidence: ['cybercrime', 'tokyo'] },
      { name: 'Regression', icon: 'Sigma', evidence: ['cybercrime'] },
    ],
  },
  {
    id: 'business',
    title: 'Business',
    theme: 'green',
    items: [
      { name: 'Requirements documentation', icon: 'FileText', evidence: ['internshala'] },
      { name: 'Process mapping', icon: 'Workflow', evidence: [] },
      { name: 'Competitor research', icon: 'Target', evidence: ['internshala'] },
      { name: 'Business presentations', icon: 'Presentation', evidence: ['forage', 'sony'] },
      { name: 'User journey mapping', icon: 'Route', evidence: ['internshala'] },
    ],
  },
  {
    id: 'research',
    title: 'Research & AI',
    theme: 'purple',
    items: [
      { name: 'AI output evaluation', icon: 'Bot', evidence: ['mercor'] },
      { name: 'Source validation', icon: 'CheckCheck', evidence: ['mercor'] },
      { name: 'Research documentation', icon: 'BookOpen', evidence: ['mercor', 'tokyo'] },
      { name: 'Model assessment', icon: 'ScanSearch', evidence: ['tokyo', 'flightguard'] },
      { name: 'Statistical reasoning', icon: 'FlaskConical', evidence: ['tokyo', 'cybercrime'] },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    theme: 'pink',
    items: [
      { name: 'LightGBM', icon: 'Layers', evidence: ['kepler'] },
      { name: 'scikit-learn', icon: 'Code2', evidence: [] },
      { name: 'Ridge & logistic regression', icon: 'Sigma', evidence: ['proteingym', 'eeg'] },
      { name: 'Classification', icon: 'Target', evidence: ['kepler', 'eeg'] },
      { name: 'ROC-AUC', icon: 'ChartLine', evidence: ['kepler', 'eeg'] },
      { name: 'Grouped cross-validation', icon: 'CheckCheck', evidence: ['kepler', 'proteingym', 'eeg'] },
      { name: 'Data leakage prevention', icon: 'ShieldCheck', evidence: ['kepler'] },
      { name: 'Feature engineering', icon: 'Workflow', evidence: ['eeg'] },
      { name: 'SHAP / explainable AI', icon: 'ScanSearch', evidence: ['kepler'] },
      { name: 'ESM-2 protein embeddings', icon: 'Dna', evidence: ['proteingym'] },
    ],
  },
  {
    id: 'science',
    title: 'Scientific Research',
    theme: 'green',
    items: [
      { name: 'Computational neuroscience', icon: 'Brain', evidence: ['microns', 'motor', 'eeg', 'morphology'] },
      { name: 'Connectomics', icon: 'Network', evidence: ['microns'] },
      { name: 'Bioinformatics', icon: 'Dna', evidence: ['proteingym', 'allen'] },
      { name: 'EEG signal processing', icon: 'Activity', evidence: ['eeg'] },
      { name: 'Neural spike-train analysis', icon: 'AudioWaveform', evidence: ['motor'] },
      { name: 'Neuron morphology analysis', icon: 'GitBranch', evidence: ['morphology'] },
      { name: 'Gene expression analysis', icon: 'Microscope', evidence: ['allen'] },
      { name: 'Statistical hypothesis testing', icon: 'FlaskConical', evidence: ['microns', 'morphology', 'allen'] },
      { name: 'Permutation testing', icon: 'Shuffle', evidence: ['microns', 'eeg'] },
    ],
  },
  {
    id: 'libs',
    title: 'Research Libraries & APIs',
    theme: 'blue',
    items: [
      { name: 'MNE-Python', icon: 'Activity', evidence: ['eeg'] },
      { name: 'Allen SDK', icon: 'Database', evidence: ['allen'] },
      { name: 'PyNWB', icon: 'FileText', evidence: [] },
      { name: 'DANDI client', icon: 'Database', evidence: [] },
      { name: 'navis', icon: 'GitBranch', evidence: [] },
      { name: 'NeuroMorpho.Org REST API', icon: 'Waypoints', evidence: ['morphology'] },
    ],
  },
  {
    id: 'cert',
    title: 'Certification',
    theme: 'cyan',
    items: [
      {
        name: 'Dataiku Machine Learning & Core Designer Practitioner',
        short: 'Dataiku ML & Core Designer',
        icon: 'BadgeCheck',
        date: 'May 2026',
        evidence: ['dataiku'],
      },
    ],
  },
]
