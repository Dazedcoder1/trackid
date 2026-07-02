import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PendantScene from './PendantScene';
import SoundToggle from '../../components/SoundToggle';
import { COPY } from '../../content/copy';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const PIN_DISTANCE_VH = 550;

// Phase timings (0 to 1 scroll progress)
const PHASES = {
  scrollCue:    { start: 0.00, end: 0.04 },
  wordmark:     { start: 0.02, end: 0.15 },
  tagline:      { start: 0.04, end: 0.18 },
  pendantMove1: { start: 0.08, end: 0.33 },
  panel1:       { start: 0.34, end: 0.39 },
  panel1Exit:   { start: 0.52, end: 0.58 },
  pendantMove2: { start: 0.55, end: 0.80 },
  panel2:       { start: 0.82, end: 0.87 },
};

function phaseDuration(phase) {
  return phase.end - phase.start;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // DOM Refs
  const wrapperRef   = useRef(null);
  const sectionRef   = useRef(null);
  const wordmarkRef  = useRef(null);
  const taglineRef   = useRef(null);
  const scrollCueRef = useRef(null);
  const panelRef     = useRef(null);
  const panel2Ref    = useRef(null);

  // ── NEW: 3D Transform State (Driven by GSAP, read by R3F) ──
  const scrollTransformRef = useRef({ 
    x: 0, y: 0, z: 0, 
    rotX: 0, rotY: 0, rotZ: 0, 
    scale: 1 
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const tl = gsap.timeline();

    // 1. Text Departure
    tl.to(scrollCueRef.current, { opacity: 0, y: 12, ease: 'power2.in', duration: phaseDuration(PHASES.scrollCue) }, PHASES.scrollCue.start);
    tl.to(wordmarkRef.current, { opacity: 0, y: -20, ease: 'power2.inOut', duration: phaseDuration(PHASES.wordmark) }, PHASES.wordmark.start);
    tl.to(taglineRef.current, { opacity: 0, y: -16, ease: 'power2.inOut', duration: phaseDuration(PHASES.tagline) }, PHASES.tagline.start);

    // 2. Monolith Move 1 (Fly to Left, scale up)
    tl.to(
      scrollTransformRef.current,
      {
        x: -2.5,             // Move left in WebGL units
        y: -0.5,             // Move down
        rotY: Math.PI / 4,   // Rotate to show side profile
        rotX: 0.2,
        scale: 2.2,          // Scale up
        ease: 'power2.inOut',
        duration: phaseDuration(PHASES.pendantMove1),
      },
      PHASES.pendantMove1.start
    );

    // 3. Panel 1 Enter & Exit
    tl.fromTo(panelRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, ease: 'power2.out', duration: phaseDuration(PHASES.panel1) }, PHASES.panel1.start);
    tl.to(panelRef.current, { opacity: 0, x: 30, ease: 'power2.inOut', duration: phaseDuration(PHASES.panel1Exit) }, PHASES.panel1Exit.start);

    // 4. Monolith Move 2 (Fly to Right, scale massive)
    tl.to(
      scrollTransformRef.current,
      {
        x: 2.8,              // Move right in WebGL units
        y: 0.5,              // Move up
        rotY: -Math.PI / 3,  // Rotate opposite way
        rotX: -0.1,
        scale: 4.5,          // Massive scale
        ease: 'power2.inOut',
        duration: phaseDuration(PHASES.pendantMove2),
      },
      PHASES.pendantMove2.start
    );

    // 5. Panel 2 Enter
    tl.fromTo(panel2Ref.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, ease: 'power2.out', duration: phaseDuration(PHASES.panel2) }, PHASES.panel2.start);

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      pin: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      animation: tl,
    });

    return () => {
      scrollTrigger.kill();
      tl.kill();
    };
  }, [prefersReducedMotion]);

  const { showcase, showcaseSecondary } = COPY.hero;

  return (
    <div ref={wrapperRef} style={{ height: `${PIN_DISTANCE_VH}vh` }}>
      <section ref={sectionRef} id="hero" className="relative w-full h-screen overflow-hidden bg-ink">
        
        {/* The 3D Scene */}
        <div className="absolute inset-0">
          <PendantScene scrollTransformRef={scrollTransformRef} />
        </div>

        {/* HTML UI OVERLAYS */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between py-12 md:py-16">
          <div className="w-full px-6 flex justify-end pointer-events-auto">
            <SoundToggle />
          </div>

          <div className="flex flex-col items-center text-center">
            <h1 ref={wordmarkRef} className="font-display text-6xl md:text-8xl font-medium text-parchment mb-4 tracking-tight drop-shadow-xl">
              {COPY.hero.wordmark}
            </h1>
            <p ref={taglineRef} className="font-body text-base md:text-lg text-parchment/80 max-w-md mx-auto drop-shadow-md px-6">
              {COPY.hero.tagline}
            </p>
          </div>

          <div ref={scrollCueRef} className="flex flex-col items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-parchment/60">
              {COPY.hero.scrollCue}
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-parchment/60 to-transparent" />
          </div>
        </div>

        {/* Panel 1 */}
        <div
          ref={panelRef}
          className="absolute right-[8%] md:right-[12%] top-1/2 -translate-y-1/2 pointer-events-none max-w-xs md:max-w-sm"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-medium text-parchment mb-3 tracking-tight">{showcase.productName}</h2>
          <p className="font-body text-sm md:text-base text-parchment/70 mb-6 leading-relaxed">{showcase.description}</p>
          <div className="w-12 h-px bg-parchment/20 mb-5" />
          <div className="flex flex-col gap-2.5">
            {showcase.features.map((feature) => (
              <span key={feature} className="font-mono text-xs uppercase tracking-[0.2em] text-parchment/50">{feature}</span>
            ))}
          </div>
        </div>

        {/* Panel 2 */}
        <div
          ref={panel2Ref}
          className="absolute left-[8%] md:left-[12%] top-1/2 -translate-y-1/2 pointer-events-none max-w-xs md:max-w-sm text-left"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-medium text-parchment mb-3 tracking-tight">{showcaseSecondary.productName}</h2>
          <p className="font-body text-sm md:text-base text-parchment/70 mb-6 leading-relaxed">{showcaseSecondary.description}</p>
          <div className="w-12 h-px bg-parchment/20 mb-5" />
          <div className="flex flex-col gap-2.5">
            {showcaseSecondary.features.map((feature) => (
              <span key={feature} className="font-mono text-xs uppercase tracking-[0.2em] text-parchment/50">{feature}</span>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}