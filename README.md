# Pratap Mahalingam — Career Lobby

An interactive portfolio for **Pratap Mahalingam**, styled as an original battle-royale-style game lobby.
Career directions are **game modes**, projects are **quests**, education and experience form a **Battle Pass**, skills are **Locker** items and contact details sit under **Squad Up**.

All artwork (avatar, quest illustrations, lobby scene, icons for brand links) is original SVG/CSS.
No third-party game assets, logos or characters are used. The site is not affiliated with any game publisher.

## Tech stack

| Purpose | Tool |
|---|---|
| Framework | React 19 + Vite 8 (JavaScript) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Fonts | Self-hosted via `@fontsource` (Anton, Barlow, Barlow Condensed), so no external font requests |
| Styling | Plain CSS (`src/styles.css`) |
| Backend | None. It is a fully static site. |

Requires **Node.js 20.19+ or 22.12+**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Editing content

All portfolio text lives in `src/data/`, and components only read from these files.

| File | What it controls |
|---|---|
| `src/data/profile.js` | Name, headline, tagline, lobby player card, bio, email/LinkedIn/GitHub, resume path, **avatar colours** |
| `src/data/modes.js` | PLAY: the 5 career modes (roles, skills, featured items) |
| `src/data/quests.js` | QUESTS: projects (problem, objective, methods, outcomes, links) and the filter tracks |
| `src/data/dropZones.js` | DROP MAP: named locations on the island and which section each opens |
| `src/data/milestones.js` | BATTLE PASS: education, training, certification and experience |
| `src/data/locker.js` | LOCKER: skill items and the project/experience each one links to |

`featured` (modes) and `evidence` (locker) reference ids from `quests.js` or `milestones.js`.
Clicking one opens the quest briefing or jumps to the Battle Pass tier.

- **Your photo:** put it in `public/` (e.g. `public/photo.jpg`) and set `photo: 'photo.jpg'` in `profile.js`. Until then the Profile shows the illustrated avatar.
- **Project links:** add GitHub or demo links to a project's `links` array in `quests.js`, e.g. `{ label: 'GitHub', href: 'https://github.com/...', kind: 'code' }`.
- **Hide GitHub:** set `contact.github` to `null` in `profile.js`.
- **Avatar:** it is a stylised original character, not a likeness. Change `avatarPalette` in `profile.js` (skin, hair, blazer, etc.) or edit `src/components/Avatar.jsx`.

## Replacing the resume PDF

The download buttons point to `public/Pratap_Mahalingam_Resume.pdf`.
Replace that file and keep the same name, or change `resume.href` / `resume.downloadName` in `profile.js`.

> The PDF in `public/` is a copy of the resume with the phone number removed (true redaction, not a white box), so it is safe to publish. If you replace it, remove the number from the new copy as well.

## Project structure

```
public/
  Pratap_Mahalingam_Resume.pdf
  favicon.svg
src/
  main.jsx, App.jsx, styles.css
  data/            ← editable content
  lib/             ← app state (AppContext), icon map, id registry
  components/
    NavBar.jsx        top tabs + mobile game menu + motion toggle
    Lobby.jsx         homepage lobby (LobbyScene.jsx = background)
    Avatar.jsx        original SVG character with idle animation
    PlayModes.jsx     career mode selection
    QuestBoard.jsx    project cards (QuestArt.jsx = illustrations)
    QuestBriefing.jsx mission briefing dialog
    BattlePass.jsx    progression track + expandable details
    Locker.jsx        skills grid + evidence panel
    Profile.jsx       about / education / experience / certifications
    SquadUp.jsx       contact screen
```

## Accessibility & motion

- A **Motion on/off** toggle sits in the top bar and is remembered per browser. It defaults to the OS "reduce motion" setting.
- No audio and no loading screen.
- Dialogs close with `Esc`, and all controls are real buttons or links that can be reached by keyboard.

## Deploy: GitHub → Vercel

1. Create an empty GitHub repository, e.g. `pratap-portfolio`.
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/pratap-portfolio.git
   git push -u origin main
   ```
3. Go to <https://vercel.com/new>, import the repository and keep the detected settings (Framework **Vite**, build `npm run build`, output `dist`). These are also pinned in `vercel.json`.
4. Click **Deploy**. Every later push to `main` redeploys automatically.
5. Optional: add a custom domain under *Project → Settings → Domains*.

Alternative without GitHub: `npm i -g vercel`, then run `vercel` (preview) and `vercel --prod` from this folder.
