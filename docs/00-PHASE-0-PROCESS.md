# TrakID — Phase 0: How We Avoid Chaos Before Anyone Writes a Section

> Read this before opening `01-SECTION-SPEC.md`. It explains why a static reference file exists, what's in it, and the exact sequence the team follows so six people working in parallel produce ONE consistent site — not six different ones stitched together at the end.

---

## The problem we're solving

You cannot hand six people (two new to React, one designer, two solid, one lead) ten section descriptions in English and expect consistent output, even with a great spec — because "premium serif typography" and "muted sapphire accent" mean something different in every person's head until they've seen it rendered. Inconsistency at this stage isn't a discipline problem, it's an information problem: nobody has actually seen the thing yet.

**The fix: build the visual identity ONCE, as real working code, before assigning a single section.** Not a Figma mockup — static, disconnected from real code, someone still has to "translate" it into CSS later, and translation is exactly where drift creeps in — but an actual HTML file using the real Tailwind classes, the real fonts, the real color tokens, with one fully-built section inside it that everyone copies from directly.

That file is `phase-0-reference.html`, delivered alongside this document. Open it in any browser — no build step, no install, double-click and go.

---

## What `phase-0-reference.html` actually contains, in order

1. **Every color token**, swatched and labeled with its real Tailwind class name (`bg-accent`, `bg-gold`, `bg-safe`, `bg-alert`) — not a hex code you have to remember, the literal class to type. Note the muted sage/brick for safe-zone/SOS states — deliberately not stock traffic-light red/green, because raw alarm colors read as a cheap admin dashboard, not a billion-dollar safety brand.
2. **Every typography rule** — Fraunces (serif) for headlines and the wordmark ONLY, Inter (sans) for everything readable, JetBrains Mono for specs/labels/data callouts ONLY. This pairing — jewelry-catalog serif meeting engineering mono — is the brand's one signature typographic move. Shown at real size, with the exact classes to copy.
3. **The signature divider motif** — a thin gradient hairline with a teardrop-shaped bullet at center, referencing the pendant shape structurally. This is the ONE recurring divider used between every section, site-wide. Written once as a single CSS rule, reused everywhere.
4. **Motion principles** — the one shared easing curve and the one shared fade-in-up Framer Motion variant, shown as copy-pasteable code, not described in prose.
5. **Component atoms** — buttons, eyebrow labels, the card hover pattern, and the safe/SOS status pills — shown live and interactive (hover them), not just described.
6. **A fully built live reference section** — Section 03, The Fork — built with real, production-correct classes. Not a sketch standing in for the real thing; it IS the real thing. When you build your assigned section, open this side-by-side and match its patterns exactly.
7. **A "Don'ts" list** — the specific, named mistakes that cause six different "premiums" to collide (arbitrary hex values, display font on body copy, stock red/green alerts, inventing a new divider, Framer Motion's springy defaults, skipping reduced-motion). These are the actual diffs reviewers will be looking for in every PR.

---

## The sequence — what happens before any of the 10 sections get assigned

### Step 1 — Everyone reads `phase-0-reference.html` together, in one sitting
Not individually, async, whenever — together, so questions get asked once and answered once. Budget 30 minutes. The designer walks the team through it, since they can answer "can I bend this rule here?" on the spot (usually: no, and here's why).

### Step 2 — [REACT-LEAD] turns Phase 0's classes into the real project's enforced config
Before this step, Phase 0 is a reference artifact someone could still ignore. After this step, it's enforced by the build tool itself:
- Every color swatch becomes an entry in `tailwind.config.js` under `theme.extend.colors` — **identical names** (`ink`, `parchment`, `accent`, `gold`, `safe`, `alert`) to what the team already saw in Phase 0, so muscle memory carries over directly into real components.
- Every font becomes a `fontFamily` entry, same class names (`font-display`, `font-body`, `font-mono`).
- The divider motif's one hand-written CSS rule (`.divider-teardrop`) moves into `src/index.css` verbatim.
- The Framer Motion variants shown in Phase 0 become real exports in `src/motion/variants.js`.

This is what makes "no hardcoded values" enforceable instead of aspirational: if a color isn't in the config, autocomplete won't offer it, and a stray hex value shows up as ugly arbitrary-value syntax (`bg-[#3a3a3a]`) that's trivially easy to spot and reject in code review.

### Step 3 — THEN, and only then, sections get assigned per `01-SECTION-SPEC.md`
Every section's job now is: take the spec's instructions plus the patterns already proven in Phase 0, and assemble them. Nobody is making typography or color decisions at the section level anymore — that decision-making already happened, once, with everyone in the room. Section-level work becomes layout, content structure, and interaction — the part that actually should vary section to section.

---

## How to brief an LLM on this project (so this works "cold," exactly as you asked)

If you're pasting this into a fresh LLM conversation to generate a section's code, paste **all three** of these, every time, in this order:

1. This document (the Phase 0 explanation you're reading now)
2. The full source code of `phase-0-reference.html`
3. The relevant section's entry from `01-SECTION-SPEC.md`

Then say, literally: *"Match the patterns in phase-0-reference.html exactly — same color classes, same type pairing, same divider motif, same card hover pattern, same easing curve. Do not introduce new colors, fonts, or spacing values. Build [Section X] per the attached spec."*

This works because the LLM now has exactly what your interns have: a concrete, unambiguous, already-rendered example to pattern-match against, instead of an adjective ("premium," "expensive") it has to interpret alone from scratch. Adjectives are where inconsistency starts on a six-person build; a real rendered file removes the adjective entirely.

---

## Where this slots into the existing docs

```
Phase 0  ->  Everyone reviews phase-0-reference.html together, asks questions   [whole team, ~30 min]
Phase 1  ->  REACT-LEAD wires Phase 0's classes into tailwind.config.js,        [REACT-LEAD, ~1 day]
            src/index.css, src/motion/variants.js, and the shared hooks
Phase 2  ->  Parallel section build, per 01-SECTION-SPEC.md                     [whole team]
Phase 3  ->  Integration & polish                                               [whole team]
```

Nobody opens a section folder until Phase 0 has been walked through together and Phase 1 is merged to `dev`. If someone wants to change a color, a font, or the divider motif after Phase 1 is locked, the change is proposed by editing `phase-0-reference.html` first, shown to the team, and only then ported into the real config — never edited directly inside a section's component file.

---

## What changed in the tech stack, and why (per your last instruction)

We're moving from plain CSS Modules + raw GSAP to **Tailwind CSS + Framer Motion** for everything except the WebGL hero and the scroll-scrubbed Reveal sequence, which keep GSAP + ScrollTrigger (still the better tool specifically for frame-accurate, pinned, scrubbed 3D timelines).

One correction to earlier reasoning: I'd previously avoided Tailwind on the logic that utility classes scatter design decisions across files. That concern only holds if Tailwind is left unconfigured. **A Tailwind config wired to our exact token names becomes the enforcement mechanism itself** — more reliably than hand-written CSS variables, because an off-token value is visibly ugly and stands out in a diff, where a stray value in a `.module.css` file can slip through review unnoticed.

**Framer Motion** replaces raw GSAP for fade-ins, hover states, and layout transitions because it's idiomatic React — declarative `variants` and `whileInView` props, not imperative timeline calls — which matters directly for your two React beginners. Learning Framer Motion's prop-based API alongside React itself is a far gentler path than learning GSAP's imperative API at the same time.

This is reflected in the updated `01-SECTION-SPEC.md` and `02-PROJECT-SETUP.md` — both now reference Tailwind classes and Framer Motion variants rather than CSS Modules and raw GSAP tweens for anything outside the hero/reveal.
