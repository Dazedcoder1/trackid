// src/components/WipeReveal.jsx
// OSOS red-wipe section transition, in brand colors. A full-bleed color
// panel covers the wrapped section and sweeps away as it scrolls into
// view — scroll-scrubbed, so scrolling back sweeps it closed again.
// Modular: wrap any section in App.jsx —
//   <WipeReveal><TheInvitation /></WipeReveal>
// Reduced motion: the panel simply isn't rendered.

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function WipeReveal({
  children,
  panelClass = 'bg-accentDeep',
  className = '',
}) {
  const ref = useRef(null);
  const panelRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    const panel = panelRef.current;
    if (!el || !panel) return;

    const tween = gsap.fromTo(
      panel,
      { xPercent: 0 },
      {
        xPercent: 101,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 12%',
          scrub: 0.5,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      {!prefersReducedMotion && (
        <div
          ref={panelRef}
          className={`absolute inset-0 z-30 pointer-events-none ${panelClass}`}
          style={{ willChange: 'transform' }}
        />
      )}
    </div>
  );
}
