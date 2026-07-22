// src/components/OutlineMarquee.jsx
// OSOS "FLEXIBLE"-style banner: stacked rows of giant repeated outline
// text that drift horizontally in alternating directions, scrubbed by
// scroll (position IS the timeline — reverse scroll reverses the drift).
// Modular: drop <OutlineMarquee text="TrakID" /> into any section.
// Uses .text-outline / .text-outline-bright from index.css.

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function OutlineMarquee({
  text,
  rows = 3,
  brightRow = 1,          // which row gets the brighter stroke (-1 for none)
  repeat = 6,
  className = '',
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const rowEls = el.querySelectorAll('.om-row');
    const tweens = [...rowEls].map((row, i) =>
      gsap.fromTo(
        row,
        { xPercent: i % 2 ? -14 : -2 },
        {
          xPercent: i % 2 ? -2 : -14,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      )
    );

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [prefersReducedMotion]);

  const line = Array(repeat).fill(text).join(' · ');

  return (
    <div ref={ref} className={`overflow-hidden select-none pointer-events-none ${className}`} aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className={`om-row whitespace-nowrap font-display font-bold uppercase leading-[0.92] tracking-tight text-[13vw] md:text-[9vw] ${
            i === brightRow ? 'text-outline-bright' : 'text-outline'
          }`}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
