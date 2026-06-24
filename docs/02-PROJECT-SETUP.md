# TrakID Landing Page — Project Setup & Architecture

> Read this before running a single command. This document is the source of truth for how the project is structured, what gets installed, and — most importantly — **how we keep the entire visual identity swappable** without ever touching component code.
>
> **This document assumes Phase 0 is already done.** If you haven't read `00-PHASE-0-PROCESS.md` and opened `phase-0-reference.html` in a browser, stop and do that first — everything below ports what's shown there into a real, enforced project config.

---

## 1. Tech Stack & Why

| Tool | Purpose | Why this, not an alternative |
|---|---|---|
| **Vite + React 18** | Build tool + UI library | Fast dev server, no SSR complexity we don't need for a single landing page. Next.js would add routing/server overhead with zero benefit here. |
| **Tailwind CSS** | Styling | Configured with our exact token names (see Section 2). This is the enforcement mechanism: an off-token value shows up as ugly arbitrary-value syntax (`bg-[#3a3a3a]`) that's trivially easy to catch in review, which is more reliable in a 6-person team than trusting everyone to remember a CSS variable name correctly. |
| **Framer Motion** | Fade-ins, hover states, layout transitions | Idiomatic React — declarative `variants` and `whileInView` props instead of imperative timeline calls. Used for every section EXCEPT the WebGL hero/reveal. Far gentler learning curve for the two team members new to React, since they're not learning a second animation API on top of React itself. |
| **GSAP + ScrollTrigger** | Scroll-scrubbed 3D sequences | Still the better tool specifically for frame-accurate, pinned, scrubbed timelines — used ONLY in Section 01 (Hero) and Section 02 (Reveal). Not used anywhere else; don't reach for it by default. |
| **Lenis** | Smooth scroll | Pairs natively with GSAP ScrollTrigger, gives the "weighted" premium scroll feel across the whole page. |
| **React Three Fiber + drei + Three.js** | 3D pendant hero & reveal | Declarative Three.js inside React, keeps the WebGL scene a normal-looking component tree. |
| **lucide-react** | Icon set | One consistent icon library across the whole site — no mixing icon styles from different sources. |
| **React Context (built-in)** | Track state (Institutional vs Family) | The only piece of cross-section shared state we have; doesn't justify Redux/Zustand. |

We are deliberately **not** using a meta-framework or a state management library — both would add complexity this single-page project doesn't need. We ARE using a CSS framework (Tailwind) — see the correction in `00-PHASE-0-PROCESS.md`'s closing section for why this differs from earlier guidance.

---

## 2. The Global Token System (read this twice)

This is the single most important architectural decision in the whole project, because it answers your original requirement: **"if we need to change the file and assets we can only change these files and they get replaced without breaking the UI/UX."**

### The rule
**No component file ever contains a literal color, font-family, font-size, spacing value, or arbitrary Tailwind value.** Every one of those is a named Tailwind class, defined once in `tailwind.config.js`, sourced directly from `phase-0-reference.html`. Copy, paths, and assets live in their own JS files, same principle.

If a developer ever types `className="bg-[#1a1a2e]"` or reaches for an inline `style={{ fontFamily: 'Playfair Display' }}`, that's a bug — flag it in code review, full stop.

### `tailwind.config.js` — ported directly from Phase 0, not retyped from memory

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:        '#0E1116',   // primary text, dark surfaces
        parchment:  '#F7F5F0',   // default page background
        stone:      '#E8E6E0',   // secondary surfaces, cards
        slate:      '#6B7378',   // secondary text, captions
        accent:     '#9DB4C7',   // sapphire — semantic brand accent
        accentDeep: '#5C7691',   // darker accent, eyebrows/links on light bg
        gold:       '#C9A66B',   // rose-gold — rare, institutional accent
        safe:       '#4C7A63',   // "safe zone" state — muted sage, NEVER stock green
        alert:      '#A6553E',   // "SOS" state — muted brick, NEVER stock red
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],   // headlines + wordmark ONLY
        body:    ['Inter', 'sans-serif'], // all paragraph copy, nav, buttons
        mono:    ['JetBrains Mono', 'monospace'], // specs, eyebrows, captions ONLY
      },
    },
  },
  plugins: [],
};
```

**Why `accent` is a separate name from a hypothetical future color literal matters:** components reference `accent` — the *semantic* role — never a literal gem-color name. If the brand identity shifts next year, you change one hex value in this config and every section updates automatically. Components never know or care what the actual color value is.

### `src/index.css` — Tailwind directives plus the one hand-written rule

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* The ONE custom CSS rule in the entire project — the signature teardrop
   divider, copied verbatim from phase-0-reference.html. Every section
   boundary uses this. Do not invent a second divider style. */
.divider-teardrop {
  display: flex;
  align-items: center;
}
.divider-teardrop::before,
.divider-teardrop::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, currentColor, transparent);
  opacity: 0.35;
}
.divider-teardrop .bullet {
  width: 7px;
  height: 9px;
  margin: 0 14px;
  border-radius: 50% 50% 50% 4%;
  background: currentColor;
  opacity: 0.6;
  flex-shrink: 0;
}
```

### `src/motion/variants.js` — the shared Framer Motion vocabulary

```js
// The ONE easing curve used everywhere. Weight, not bounce.
export const EASE = [0.22, 1, 0.36, 1];

// The default scroll-reveal pattern — import this, don't write a new one per section.
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: EASE },
};

// Stagger container for groups of fadeUp children (e.g. the spec grid, pendant cards)
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true, margin: '-80px' },
};
```

If a section needs a motion pattern that doesn't exist here, add it to this file with a clear name — never write an inline `transition={{ ... }}` with ad-hoc numbers inside a component.

### `assets.js` — every image, 3D model, and video path

```js
// src/content/assets.js
// Swap a file? Change ONE path here. Never write a raw /public/... path inline in a component.
export const ASSETS = {
  pendants: {
    classicTeardrop: {
      model3d: '/assets/models/classic-teardrop.glb',
      heroImage: '/assets/images/classic-teardrop-hero.png',
      thumbnail: '/assets/images/classic-teardrop-thumb.png',
    },
    sweetheartFiligree: {
      model3d: null, // not yet built — PendantCard falls back to thumbnail
      heroImage: '/assets/images/sweetheart-filigree-hero.png',
      thumbnail: '/assets/images/sweetheart-filigree-thumb.png',
    },
    // ...wiseOwl, pathFinder follow the same shape
  },
  exploded: {
    shellOuter: '/assets/images/exploded-shell-outer.png',
    pcb: '/assets/images/exploded-pcb.png',
    battery: '/assets/images/exploded-battery.png',
    shellInner: '/assets/images/exploded-shell-inner.png',
  },
  brand: {
    logoMark: '/assets/brand/trakid-logo.svg',
    soundOnIcon: '/assets/icons/sound-on.svg',
    soundOffIcon: '/assets/icons/sound-off.svg',
  },
};
```

### `copy.js` — same principle, for text

```js
// src/content/copy.js
export const COPY = {
  hero: {
    wordmark: 'TrakID',
    tagline: 'Beautiful enough to wear. Smart enough to never lose.', // TBD, placeholder
  },
  fork: {
    institutionalTitle: 'Schools & Institutions',
    institutionalSubtitle: 'Placeholder — pilot programme framing TBD',
    familyTitle: 'A Pendant, Not a Gadget',
    familySubtitle: 'Placeholder — gifting framing TBD',
  },
  // ...every section's text lives here, structured by section
};
```

---

## 3. Folder Structure

```
trakid-landing/
├── public/
│   └── assets/
│       ├── models/          # .glb 3D files
│       ├── images/           # product photography, renders
│       ├── brand/              # logo, favicon
│       └── icons/                # custom SVG icons not covered by lucide-react
│
├── docs/
│   ├── phase-0-reference.html         # the visual reference — keep in repo permanently
│   ├── 00-PHASE-0-PROCESS.md
│   ├── 01-SECTION-SPEC.md
│   └── 02-PROJECT-SETUP.md             # this file
│
├── src/
│   ├── main.jsx                          # app entry, mounts <App />
│   ├── App.jsx                            # top-level layout: renders sections in order, wraps in TrackProvider
│   │
│   ├── index.css                            # Tailwind directives + .divider-teardrop (Section 2 above)
│   │
│   ├── motion/
│   │   └── variants.js                        # shared Framer Motion EASE / fadeUp / staggerContainer
│   │
│   ├── content/
│   │   ├── copy.js                              # ALL text content
│   │   ├── assets.js                              # ALL file paths
│   │   └── formSchema.js                            # form field definitions
│   │
│   ├── context/
│   │   └── TrackContext.jsx                           # institutional/family track shared state
│   │
│   ├── hooks/
│   │   ├── useReducedMotion.js                          # thin wrapper, single source of truth
│   │   └── useScrollScrub.js                              # shared GSAP ScrollTrigger wrapper (Sections 01/02 only)
│   │
│   ├── services/
│   │   └── leadSubmission.js                                # stub for form submission, swapped later
│   │
│   ├── components/                                            # truly shared, cross-section UI atoms only
│   │   ├── Button.jsx
│   │   ├── SectionWrapper.jsx                                   # consistent padding/max-width wrapper
│   │   ├── Divider.jsx                                            # wraps the .divider-teardrop markup
│   │   └── SoundToggle.jsx
│   │
│   └── sections/
│       ├── 01-Hero/
│       │   ├── Hero.jsx
│       │   ├── PendantScene.jsx
│       │   └── useCursorParallax.js
│       ├── 02-Reveal/
│       ├── 03-Fork/
│       ├── 04A-ComplianceCase/
│       ├── 05A-EngineeringCredibility/
│       ├── 06A-InstitutionalAsk/
│       ├── 04B-Anatomy/
│       ├── 05B-PeaceOfMind/
│       ├── 06B-Invitation/
│       └── 07-Closing/
│
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

**Rule of thumb for "does this go in `/components` or inside a section folder?"** — if it's used by more than one section (a Button, the Divider, the SoundToggle), it lives in `/src/components`. If it only ever appears in one section, it lives inside that section's own folder. Don't pre-emptively "componentize" things into the shared folder before a second use case actually exists.

**Note the `docs/` folder** — `phase-0-reference.html` and all three planning docs live in the repo permanently, not just during setup. Anyone unsure what a hover state should feel like, or which class to use, opens that file and looks, instead of guessing or pinging the lead.

---

## 4. package.json — dependencies to install

```json
{
  "name": "trakid-landing",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.11.9",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.114.0",
    "three": "^0.169.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.13",
    "lucide-react": "^0.453.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.2",
    "vite": "^5.4.8",
    "tailwindcss": "^3.4.14",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-plugin-react": "^7.37.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "prettier": "^3.3.3"
  }
}
```

### Install commands (run in order)
```bash
npm create vite@latest trakid-landing -- --template react
cd trakid-landing
npm install framer-motion gsap lenis @react-three/fiber @react-three/drei three lucide-react
npm install -D tailwindcss postcss autoprefixer eslint eslint-plugin-react eslint-plugin-react-hooks prettier
npx tailwindcss init -p
```

The last command generates `tailwind.config.js` and `postcss.config.js` — then paste in the config block from Section 2 above, replacing the generated defaults.

> **GSAP licensing note:** GSAP's core and the ScrollTrigger plugin are free for this kind of commercial use under current GSAP licensing (GSAP became fully free for all use, including commercial, in 2025 under Webflow's stewardship) — confirm current terms at gsap.com before shipping, but no paid club membership is required to use ScrollTrigger anymore.

---

## 5. GitHub Repo Setup

```bash
# 1. Create the repo on GitHub first (web UI or `gh repo create`), then:
git init
git add .
git commit -m "chore: initial Vite + React + Tailwind scaffold"
git branch -M main
git remote add origin https://github.com/<org>/trakid-landing.git
git push -u origin main
```

### Branching convention
- `main` — always deployable, protected, no direct pushes
- `dev` — integration branch, everyone merges here first
- Feature branches: `feature/01-hero`, `feature/03-fork`, `feature/06a-institutional-form` — **name the branch after the section number**, matching the section spec doc, so anyone can match a PR to its spec instantly

### Suggested `.gitignore` essentials
```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

### PR rule
Every PR description must link back to its section in `01-SECTION-SPEC.md` and confirm: *"Uses only Tailwind classes from tailwind.config.js, motion variants from /src/motion/variants.js, copy.js, and assets.js — no arbitrary values, no inline styles, no ad-hoc transitions."* [REACT-LEAD] reviews every PR against that one checklist item before anything else.

---

## 6. Build Order for the Team (do this, in this order)

1. **Phase 0 — whole team, ~30 minutes:** Everyone opens `phase-0-reference.html` together and walks through it with [DESIGNER]. No code is written in this step. See `00-PHASE-0-PROCESS.md` for the full walkthrough.
2. **Phase 1 — [REACT-LEAD] alone, ~1 day:** Scaffold the project exactly per Section 3's folder structure. Write `tailwind.config.js` and `src/index.css` (ported verbatim from Phase 0, not retyped from memory), `src/motion/variants.js`, `copy.js` and `assets.js` (placeholder content, final key structure), and the two shared hooks. Push to `dev`. Nobody else starts until this merges.
3. **Phase 2 — parallel work:**
   - [DESIGNER] + [REACT-NEW-1] → Section 07 (Closing) first as a warm-up, then 04B (Anatomy)
   - [REACT-NEW-2] → Section 05A (Engineering Credibility), then 06B (Invitation)
   - [REACT-MID] → Section 03 (Fork), then 06A (Institutional Ask)
   - [REACT-LEAD] → Section 01 (Hero) and 02 (Reveal) — the highest-risk, highest-skill work — then floats to review everyone else's PRs and build 05B (Peace of Mind)
4. **Phase 3 — integration pass:** once all sections exist, [REACT-LEAD] assembles them in `App.jsx` in final order, checks scroll-handoff between sections (does Lenis scroll smoothly across section boundaries? does the Fork's smooth-scroll-to-track actually land correctly?).
5. **Phase 4 — polish pass:** full team, mobile responsiveness sweep, reduced-motion test sweep, Lighthouse performance check.

This order front-loads the riskiest technical work (WebGL hero, scroll-scrub reveal) to the start, so if something in that area needs to change architecturally, it's discovered in week one, not week three — and front-loads the *visual alignment* work even earlier than that, so nobody writes a line of component code against a guess.
