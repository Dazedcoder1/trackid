# TrakID Landing Page — Section-by-Section Build Spec

> **Before reading this document, read `00-PHASE-0-PROCESS.md` and open `phase-0-reference.html` in a browser.** This spec assumes you have already seen the real colors, type pairing, divider motif, and the live Fork reference section. Every instruction below ("use the accent color," "match the card hover pattern") refers directly to what's shown there — if you haven't looked at it yet, stop and do that first.
>
> Every section below tells you (1) what the user sees and feels, (2) exactly how to build it, (3) what files you touch, and (4) who on the team owns it. Nothing here is decorative — if a section says "use `bg-accent`," that is the literal Tailwind class to type, not a suggestion to pick "something blue-ish." Never hardcode a color, font, or spacing value inside a component. Every visual property comes from `tailwind.config.js` (see Setup doc), which is wired directly to Phase 0's tokens. This is what lets us swap the entire brand identity later by editing one config file instead of touching every component.

## Team Roles (referenced throughout this doc as owners)


---

## Global Rules (apply to every section, no exceptions)

1. **No arbitrary Tailwind values, no inline styles, no raw hex/px in component files.** Every color, font, spacing, and radius is a named class from `tailwind.config.js` (`bg-accent`, `font-display`, `p-8`, etc.) — the exact set shown in `phase-0-reference.html`. If a value you need isn't in the config, ask the design lead to add it there first; don't reach for `bg-[#3a3a3a]` as a shortcut.
2. **Every animated property must respect `prefers-reduced-motion`.** All Framer Motion components check `useReducedMotion()` (from `framer-motion` itself, re-exported via our own `/src/hooks/useReducedMotion.js` wrapper) before animating; if true, render the final state directly with no transition. This is implemented once, globally — every section consumes the shared variants, nobody re-implements the check.
3. **Every section is its own component folder** under `/src/sections/`, e.g. `/src/sections/01-Hero/`. Each folder contains the component (`.jsx`) and nothing else — no CSS Module files. Styling is Tailwind classes directly in JSX; motion is imported from `/src/motion/variants.js`.
4. **Mobile-first.** Build the small-screen layout first, then enhance upward using Tailwind's `md:` / `lg:` breakpoint prefixes. WebGL/heavy animation sections must have a lighter mobile fallback (static image or simplified motion) — performance budget on mobile is non-negotiable for a "feels expensive" site, because jank reads as cheap instantly.
5. **All copy lives in `/src/content/copy.js`**, never typed directly into JSX. This means swapping language, tone, or finalizing real founder bios later is a content-file edit, not a code edit.
6. **All imagery/3D model paths live in `/src/content/assets.js`**, referencing files in `/public/assets/`. Same reasoning — swap the pendant render later without touching component logic.
7. **All Framer Motion transitions import from `/src/motion/variants.js`** (the `EASE` curve and `fadeUp` variant shown live in Phase 0). Nobody writes an ad-hoc `transition={{ duration: 0.5 }}` inline — if the variant you need doesn't exist yet, add it to that shared file with a clear name, don't inline it.

---

## SECTION 01 — The Awakening (Hero)

**Owner:** [Manan] (WebGL + cursor logic) with [Khyati] (typography layout, lighting/material art direction)

### What the user experiences
Full-viewport. A single jewelry pendant (The Classic Teardrop — silver/sapphire) floats center-stage, rotating slowly on its own, alone, no human figure. As the user moves their mouse, light catches the sapphire facets and the pendant subtly tilts toward the cursor (parallax, not literal dragging). Oversized minimal wordmark "TrakID" sits behind or beside it. One line of copy beneath. A sound toggle, top corner. A quiet "scroll" cue at the bottom. No CTA button anywhere in this section — the object has to do all the work.

### Reference mapping
- **Rolex**: one object, full-bleed, reverent negative space, no competing CTAs
- **ning-h.com**: rotating 3D hero object, ambient motion before any interaction
- **visitmonaco.com**: cursor-reactive parallax/lighting response
- **monolithstudio.com**: minimal oversized wordmark, sound toggle, passive scroll cue instead of a button

### How to build it
- **3D render**: React Three Fiber (`@react-three/fiber`) + `@react-three/drei` for helpers (`Environment`, `OrbitControls` disabled for user rotation but used internally for auto-rotate, `useGLTF` for the pendant model).
- **Model**: a `.glb`/`.gltf` 3D model of the pendant. If we don't have a real 3D model yet, [REACT-LEAD] builds a placeholder primitive (extruded teardrop shape + a sphere for the gem with a glass/refractive material) so the scene logic can be built and swapped later without touching the component — model path comes from `assets.js`, never hardcoded.
- **Material**: use `MeshPhysicalMaterial` for the silver band (metalness ~0.9, roughness ~0.2) and `MeshPhysicalMaterial` with `transmission` for the sapphire (this is what sells "expensive" — real refraction, not a flat blue texture).
- **Lighting**: one key light + `Environment` preset (e.g. `studio` or a custom HDRI later) for realistic reflections.
- **Cursor-reactive tilt**: track normalized mouse position (`-1` to `1` on both axes) in a `useEffect` + `useState`, feed into the pendant's rotation via `useFrame`, lerp toward the target rotation each frame (don't snap) for that buttery weighted feel.
- **Auto-rotation**: a slow constant rotation on the Y axis runs independently, cursor tilt is added on top, not a replacement.
- **Wordmark + copy**: plain HTML/CSS layered via absolute positioning over the canvas (a `<Canvas>` sibling `<div>`, not inside the 3D scene) — typography always stays as real DOM text, never rendered into WebGL, for accessibility and SEO.
- **Sound toggle**: simple state + `<audio>` element, muted by default (autoplay policy compliance), icon swaps on toggle.
- **Reduced motion fallback**: if `prefers-reduced-motion` is on, kill the auto-rotation and cursor-tilt; render the pendant in a single static, well-lit angle.
- **Mobile fallback**: if viewport width is below a defined breakpoint AND device is touch-only, disable cursor-parallax (no mouse) but keep the slow auto-rotation — it's cheap on a GPU and still reads as premium.

### Files involved
```
/src/sections/01-Hero/Hero.jsx
/src/sections/01-Hero/PendantScene.jsx       (the R3F <Canvas> scene)
/src/sections/01-Hero/useCursorParallax.js
/public/assets/models/classic-teardrop.glb
```

---

## SECTION 02 — The Reveal

[Harsha] (scroll-scrub logic) with [Gaurav] (supporting state/transitions)

### What the user experiences
As the user scrolls past the hero, the pendant transforms — it appears to "explode" or dissolve from the polished silver/sapphire locket into its internal engineering: PCB, GPS antenna, battery, magnetic charging pins — matching the exploded-view render we have as a reference asset. This is the "wait, THIS is a tracker?" moment. Scroll position directly drives this transformation; it should feel like the user's scroll is physically taking the pendant apart.

### Reference mapping
- **donprod.uk**: scroll-as-timeline-scrubber — scroll position maps directly to a sequence of object-state changes, not discrete jumps
- **ning-h.com**: continuous, fluid 3D transformation rather than a hard cut

### How to build it
- **GSAP ScrollTrigger with `scrub: true`** is the core mechanism. Pin the 3D canvas (`pin: true`) for the duration of this section so the camera/object stays anchored on screen while scroll progress (0→1) drives the timeline.
- Two implementation options depending on asset availability, in order of preference:
  1. **If we get a real exploded 3D model**: animate individual mesh group positions (the PCB, shell-half, battery move apart along separate axes) driven by the ScrollTrigger progress value (`onUpdate: self => { ... self.progress ... }`), feeding into R3F state.
  2. **If we only have 2D renders** (current asset situation — we have the exploded-view photo from Image 1): build this as a sequence of crossfading/morphing 2D layers (the locket image → the exploded parts image) using GSAP timeline opacity/transform tweens scrubbed to scroll. Less impressive than true 3D but fully achievable now and upgradeable later without changing the section's outer structure.
- **Decouple visual richness from logic**: write this section so the "renderer" (3D scene vs. layered images) is a swappable child component — this lets us launch with option 2 and swap to option 1 the moment a real 3D exploded model exists, with zero changes to scroll logic.
- Annotation labels ("GPS Antenna," "Battery," "PCB") fade in next to each component as it separates, positioned with absolute CSS, content pulled from `copy.js`.

### Files involved
```
/src/sections/02-Reveal/Reveal.jsx
/src/sections/02-Reveal/RevealScene3D.jsx     (future, when 3D model exists)
/src/sections/02-Reveal/RevealScene2D.jsx     (current — layered image version)
/src/hooks/useScrollScrub.js                  (shared GSAP ScrollTrigger wrapper)
```

---

## SECTION 03 — The Fork

**Owner:** [Harsha]

### What the user experiences
A deliberate full-stop moment. Two paths are presented with equal visual weight, styled like two precious objects laid on a velvet tray (echoing the jewelry-box presentation from our reference board): **"For Schools & Institutions"** and **"For Families."** Clicking either smooth-scrolls down into that track. Neither path looks secondary to the other.

### How to build it
- This is a **routing-via-scroll decision**, not a page navigation (we stay a single-page experience). Use React state (`const [activeTrack, setActiveTrack] = useState(null)`) at the App level (lifted to a context, see Setup doc) so the choice is known by every section below the fork.
- On click: smooth-scroll (via Lenis's `scrollTo` method) to the corresponding track's first section, AND set `activeTrack` so the visited track is visually marked / the other track can be optionally collapsed or de-emphasized after a choice is made (decide this with [DESIGNER] — simplest correct version: both tracks remain visible and scrollable, but a sticky mini-nav appears after the fork letting the user jump between "Institutions" and "Families" sections at will, rather than forcing a single path).
- Two equal-width cards, Tailwind `grid grid-cols-1 md:grid-cols-2 gap-6` (mobile stacked, desktop side-by-side) — this is the exact pattern already built in Phase 0's live Fork reference, copy it directly. Hover state: `hover:shadow-xl hover:-translate-y-1 transition-all duration-300` — the same card hover used everywhere else on the site, no JS needed for this micro-interaction.
- This is a clean, contained component — good first "real" React state task for [REACT-MID] to own end-to-end.

### Files involved
```
/src/sections/03-Fork/Fork.jsx
/src/context/TrackContext.jsx                 (shared React Context: activeTrack state)
```

---

## SECTION 04A — The Compliance Case *(Institutional Track)*

**Owner:** [Khyatti] + [Brokensmile]

### What the user experiences
A reframe, not a feature list: "A tracker a child refuses to wear protects no one." This section makes the logical case that jewelry-grade design is a *retention/compliance* solution to a real operational problem schools already have with existing trackers (kids losing them, refusing to wear visible gadget-trackers, breakage).

### How to build it
- This is a **mostly static content section** — large statement typography, one or two supporting stat-style callouts (no fake numbers — use placeholder structure with clear `// TODO: confirm stat` comments in `copy.js` until real data exists).
- Good first real component for a React beginner: static layout, no state, wrapped in a `<motion.div>` using the shared `fadeUp` variant from `/src/motion/variants.js` with `whileInView` (built once in Phase 1, reused everywhere fade-on-scroll is needed — beginners import and apply the variant, they don't write any animation logic from scratch).
- [DESIGNER] builds the static layout and typography treatment in plain JSX/Tailwind first; [REACT-NEW-1] wraps it in the shared `fadeUp` motion variant. This pairing is intentional — it's how the beginner learns React patterns against real, already-correct visual design instead of guessing at both at once.

### Files involved
```
/src/sections/04A-ComplianceCase/ComplianceCase.jsx
(imports fadeUp from /src/motion/variants.js — no new files needed)
```

---

## SECTION 05A — The Engineering Credibility *(Institutional Track)*

**Owner:** [Gaurav] (build) 

### What the user experiences
Founder/team background, technical specs (GPS/LTE, IP67 water resistance, magnetic charging, battery life — pulled directly from our existing spec icons), press logos if any exist. This is where institutional trust is built before we have case studies.

### How to build it
- **Two sub-blocks**: a founder/team bio strip (photo placeholder, name, one-line credential — all from `copy.js`, currently placeholder values you'll swap later) and a spec grid reusing the icon set from Image 1 (GPS Tracking, SOS Emergency, Safe Zone Alerts, Water Resistant, Long Battery Life, LTE Connectivity, Magnetic Charging, Compact & Durable).
- Spec grid = a simple `.map()` over an array of `{icon, label}` objects defined in `copy.js` — this is a clean, contained, genuinely beginner-appropriate React task (props, `.map()`, no complex state).
- Icons: use a consistent icon library (`lucide-react`) rather than mixed icon sources, for visual consistency — swap specific icons via a single lookup object if the brand's exact icon style needs to change later.
- Press logos (if/when they exist): simple flex row, grayscale-by-default with a CSS `filter: grayscale(1)` removed on hover — classic "as seen in" treatment, restrained, not flashy.

### Files involved
```
/src/sections/05A-EngineeringCredibility/EngineeringCredibility.jsx
/src/sections/05A-EngineeringCredibility/SpecGrid.jsx
```

---

## SECTION 06A — The Institutional Ask (Lead Form) *(Institutional Track)*

**Owner:** [Brokensmile]

### What the user experiences
A calm, confident ask — "Request a Pilot Programme" / "Talk to Our Team" — not hard-sell "Buy Now" energy. Form fields are intentionally not finalized yet; build the section to make adding/removing fields trivial.

### How to build it
- Build the form as a **schema-driven list**, not hardcoded `<input>` tags: a `formFields` array in `copy.js` (or a dedicated `formSchema.js`) defines `{ name, label, type, required }` for each field, and the component `.map()`s over it to render inputs. This is the entire point of "fields finalized later" — adding a field later means adding one object to an array, not touching JSX.
- State: a single `formData` object in `useState`, updated via one generic `handleChange(e)` function keyed by `e.target.name` — not one `useState` per field.
- Validation: simple required-field check on submit; show inline error text (from `copy.js`, not hardcoded strings) under the offending field.
- Submission: stub it as a function `submitLead(formData)` in `/src/services/leadSubmission.js` that currently just logs/resolves — this isolates the eventual real backend/CRM integration (HubSpot, a Node endpoint, whatever gets decided) to one file, one function signature, swapped later with zero component changes.
- On success: replace the form with a quiet confirmation message (no popup/modal — keep it inline, matches our restrained tone).

### Files involved
```
/src/sections/06A-InstitutionalAsk/InstitutionalAsk.jsx
/src/sections/06A-InstitutionalAsk/FormField.jsx
/src/content/formSchema.js
/src/services/leadSubmission.js
```

---

## SECTION 04B — The Anatomy / Craftsmanship *(Family Track)*

**Owner:** [Brokensmile] (visual layout) , (componentization)

### What the user experiences
The jewelry collection showcase — Classic Teardrop, Sweetheart Filigree, Wise Owl, Path Finder — presented as a curated collection. Each piece gets its own motif story (compass rose, sapphire, filigree detail) using small "Sidenote"-style annotations next to the product shot, echoing Monolith Studio's annotation pattern.

### How to build it
- Build as a **reusable `<PendantCard>` component** taking props `{ image, name, description, motifNotes }`, rendered in a `.map()` over a `collectionItems` array in `copy.js`. Four pieces today, expandable to more later without new components.
- Layout: CSS grid, 2 columns desktop / 1 column mobile. [DESIGNER] sets the exact spacing/typography rhythm; [REACT-NEW-1] wires the data-driven `.map()` around it.
- "Sidenote" annotations: small absolutely-positioned label + thin connector line (a simple CSS pseudo-element or SVG line) pointing to the relevant part of the product image — this is a nice, contained visual-detail task for the designer to spec exactly in CSS before the React beginner wires it to data.
- Hover/tap on a card: use the same `hover:shadow-xl hover:-translate-y-1 transition-all duration-300` pattern from Phase 0 — consistency with every other card on the site matters more than a unique hover here.

### Files involved
```
/src/sections/04B-Anatomy/Anatomy.jsx
/src/sections/04B-Anatomy/PendantCard.jsx
```

---

## SECTION 05B — Peace of Mind, Visualized *(Family Track)*

**Owner:** [Manan] (interactive map logic) with [Khyati] (visual styling)

### What the user experiences
Real-time GPS, Safe Zone, and SOS features demonstrated through an interactive, cursor-driven visualization rather than a static feature list — moving the mouse over a stylized map reveals safe-zone boundaries, a pulsing location pin, and a sample SOS-alert state.

### How to build it
- This does **not** need a real maps API for the initial build — a stylized, illustrated "map" (SVG or styled `<div>` background) is more on-brand (premium, custom-illustrated) than embedding a generic Google Map, and it's far lighter-weight. [DESIGNER] art-directs this illustration.
- Interaction layer: cursor position drives a soft spotlight/reveal effect over the safe-zone boundary (a radial-gradient mask following the cursor, similar logic to the Monaco-style parallax used in the hero, can literally reuse `useCursorParallax.js` with different output mapping).
- Three demo states toggled by simple buttons or auto-cycling on a timer: "Live Location," "Safe Zone Alert," "SOS Triggered" — each swaps a small set of CSS classes/animated pin states. Build as a small internal state machine (`const [demoState, setDemoState] = useState('live')`), not three separate components.
- Keep this section's complexity contained — it should feel rich but must not require a real backend or live data for the demo.

### Files involved
```
/src/sections/05B-PeaceOfMind/PeaceOfMind.jsx
/src/sections/05B-PeaceOfMind/MapIllustration.jsx
```

---

## SECTION 06B — The Invitation *(Family Track)*

**Owner:** [harsha]

### What the user experiences
"Shop the Collection" / waitlist signup, gentler and warmer than the institutional ask — with a secondary gifting angle (grandparent gifting to grandchild) as emotional support copy.

### How to build it
- Structurally near-identical to Section 06A (schema-driven form, same `submitLead` service function, same pattern) — **reuse the `FormField.jsx` component built for 06A**, do not duplicate it. This is a good lesson for the beginner: same underlying form pattern, different copy and visual treatment via props/CSS, not a second implementation.
- Difference from 06A: warmer copy register, possibly a product-variant selector (if "shop" implies choosing between the four pendant designs) — if so, a simple `<select>` or styled radio-card group bound to `formData.selectedDesign`.

### Files involved
```
/src/sections/06B-Invitation/Invitation.jsx
(reuses /src/sections/06A-InstitutionalAsk/FormField.jsx and /src/services/leadSubmission.js)
```

---

## SECTION 07 — Closing *(Shared)*

**Owner:** [Khyati] + [gaurav]

### What the user experiences
Both tracks rejoin. A final, quiet brand statement (mirrors the hero's restraint — no new pitch here). Footer with contact paths for both audiences clearly preserved, social links, legal links.

### How to build it
- Fully static section, simplest in the entire build. Good "first PR" task or a task to pair the designer with whichever beginner needs a confidence win.
- Footer link data (label + href) as an array in `copy.js`, `.map()`'d into columns — same data-driven pattern reinforced one more time.

### Files involved
```
/src/sections/07-Closing/Closing.jsx
```

---

## Cross-Section Infrastructure (build these FIRST, before any section)

**Owner:** [Manan], day one, before task assignment happens — this is Phase 1, and it cannot start until Phase 0 (see `00-PHASE-0-PROCESS.md`) has been reviewed by the whole team.

These are not optional scaffolding — every section above assumes they already exist.

1. **`tailwind.config.js`** — every color, font, and spacing value from `phase-0-reference.html`, ported in verbatim under `theme.extend`. (Full detail in Setup doc.)
2. **`/src/index.css`** — the one hand-written CSS rule, `.divider-teardrop`, copied from Phase 0, plus Tailwind's base/components/utilities directives.
3. **`/src/motion/variants.js`** — the shared `EASE` curve and `fadeUp` Framer Motion variant from Phase 0, plus any new shared variants sections need (added here, never inlined).
4. **`/src/hooks/useReducedMotion.js`** — thin wrapper around Framer Motion's own `useReducedMotion`, single source of truth for motion preference.
5. **`/src/hooks/useScrollScrub.js`** — shared GSAP ScrollTrigger wrapper, used only by Sections 01 and 02.
6. **`/src/context/TrackContext.jsx`** — shared institutional/family track state.
7. **`/src/content/copy.js`** and **`/src/content/assets.js`** — even with placeholder values, these files must exist with their final *shape* (object keys/structure) before sections are built against them, so nobody hardcodes text "just for now" and forgets to wire it up.
8. **Lenis smooth-scroll** initialized once at the App root, not per-section.

Build order for the team: **Phase 0 review → Phase 1 infrastructure → Hero → Reveal → Fork → both tracks in parallel → Closing.** Do not let anyone start a numbered section before Phase 1 is merged to `dev`.
