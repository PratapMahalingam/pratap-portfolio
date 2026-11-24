// ─────────────────────────────────────────────────────────────
// PROFILE DATA — single source of truth for identity & contact.
// Every fact here comes from Pratap_Mahalingam_Resume.pdf.
// Edit freely; components read from these exports only.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Pratap Mahalingam',
  firstName: 'Pratap',
  lastName: 'Mahalingam',
  headline: 'Data & AI | Finance & Investment Research | Business Operations',
  tagline: 'Turning Data, Finance & AI Into Better Decisions',
  location: 'Dubai',

  // Shown in the lobby "player card". Keep these factual.
  playerCard: [
    { label: 'Player', value: 'Pratap Mahalingam' },
    { label: 'Academic qualification', value: 'MBA — AI & Business Analytics' },
    { label: 'Professional focus', value: 'Finance / Business / Data / AI' },
    { label: 'Career status', value: 'Open to Opportunities', status: true },
    {
      label: 'Preferred opportunities',
      value: 'Dubai, UAE and eligible international or remote roles',
    },
  ],

  bio:
    'Pratap Mahalingam is an early-career business, finance and analytics professional with an MBA in Artificial Intelligence & Business Analytics and a BBA in Finance & Business Analytics. His experience includes AI research evaluation, data science training, financial modelling and academic research projects. He is interested in applying analytical thinking to practical problems in business, finance, technology and research.',

  // Phone number is intentionally NOT included anywhere on the site.
  contact: {
    email: 'pratapmvc@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pratap-mahalingam-1b5180281/',
    // Set to null to hide the GitHub button.
    github: 'https://github.com/PratapMahalingam',
  },

  // Your photo for the Profile section. Put the image in /public (e.g. public/photo.jpg)
  // and set photo: 'photo.jpg'. While null, the original illustrated avatar is shown.
  photo: null,

  // Put the PDF in /public with this exact file name to replace it.
  resume: {
    href: './Pratap_Mahalingam_Resume.pdf',
    downloadName: 'Pratap_Mahalingam_Resume.pdf',
  },
}

// Colours for the original lobby avatar. This is a stylised character,
// not a likeness — change these to make it feel more like you.
export const avatarPalette = {
  skin: '#c98a5e',
  skinShade: '#a96d45',
  hair: '#1d1630',
  blazer: '#1b2a6b',
  blazerShade: '#121d4f',
  blazerLight: '#2a3f94',
  shirt: '#e9f4ff',
  tie: null, // e.g. '#ffb800' to add a tie; null = open collar
  trousers: '#2a2440',
  trousersShade: '#1c1830',
  shoes: '#f4f6ff',
  shoeAccent: '#2fd3ff',
  tablet: '#0e1633',
  accent: '#2fd3ff',
}
