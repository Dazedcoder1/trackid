// src/sections/05-WatchedOver/WatchedOver.jsx
// CHAPTER FIVE — THE DAY, WATCHED OVER (scroll-driven rebuild)
// The payoff of Chapter Two, now told BY the scroll: the section pins
// (desktop) and scrolling walks the day forward moment by moment — the
// dot on the map moves as you move. Scroll back and the day rewinds.
// Clicking a moment scrolls you to its point in the day via Lenis.
// Mobile: no pin, same scroll-derived progress in normal flow.

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing } from 'lucide-react';
import { COPY } from '../../content/copy';
import { fadeUp, EASE } from '../../motion/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ChapterMarker from '../../components/ChapterMarker';
import MapScene from './MapScene';

const { watchedOver } = COPY.story;
const EVENTS = watchedOver.events;
const WRAPPER_VH = 300; // scroll length of the pinned day

export default function WatchedOver() {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll position → which moment of the day we're in
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      const idx = Math.min(EVENTS.length - 1, Math.floor(p * EVENTS.length));
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Clicking a moment = scrolling to its band in the pinned day
  const jumpTo = (i) => {
    const el = wrapperRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const target = top + ((i + 0.5) / EVENTS.length) * total;
    if (window.lenis) window.lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const activeEvent = EVENTS[activeIndex];

  return (
    <section
      id="watched-over"
      ref={wrapperRef}
      className="relative bg-parchment"
      style={{ height: `${WRAPPER_VH}vh` }}
    >
      <div className="lg:sticky lg:top-0 lg:h-screen overflow-hidden flex items-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 70% 45%, rgba(168,28,75,0.10) 0%, transparent 70%)',
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-6 py-20 lg:py-0">
          <div className="flex flex-col items-center text-center mb-10 lg:mb-12">
            <ChapterMarker className="mb-8">{watchedOver.marker}</ChapterMarker>
            <motion.h2
              {...fadeUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-tight max-w-3xl mb-4"
            >
              {watchedOver.headline}
            </motion.h2>
            <motion.p
              {...fadeUp}
              className="font-body text-sm md:text-base text-slate max-w-xl leading-relaxed"
            >
              {watchedOver.subhead}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            {/* THE TIMELINE — scroll moves the day; click scrolls to a moment */}
            <motion.div {...fadeUp} className="lg:col-span-2 flex flex-col">
              {EVENTS.map((event, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={event.time}
                    type="button"
                    onClick={() => jumpTo(i)}
                    className="group relative flex gap-5 text-left focus:outline-none"
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1.5 w-3 h-3 rounded-full border transition-all duration-500 flex-shrink-0 ${
                          isActive
                            ? 'bg-gold border-gold shadow-[0_0_14px_rgba(201,166,107,0.6)]'
                            : i < activeIndex
                              ? 'bg-gold/40 border-gold/40'
                              : 'bg-transparent border-white/25 group-hover:border-gold/50'
                        }`}
                      />
                      {i < EVENTS.length - 1 && (
                        <span className="w-px flex-1 bg-gradient-to-b from-white/20 to-white/5" />
                      )}
                    </div>

                    <div
                      className={`pb-6 transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-45 group-hover:opacity-75'
                      }`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-premium text-gold tabular-nums">
                        {event.time}
                      </span>
                      <h3 className="font-display text-base md:text-lg font-semibold text-ink mt-1 mb-1">
                        {event.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="font-body text-sm text-slate leading-relaxed max-w-xs overflow-hidden"
                          >
                            {event.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* THE MAP + SOS */}
            <motion.div {...fadeUp} className="lg:col-span-3 flex flex-col gap-5">
              <div className="glass-card rounded-[28px] p-3 md:p-4">
                <MapScene
                  activeState={activeEvent.state}
                  labels={watchedOver.mapLabels}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              <div className="glass-card glass-card-hover rounded-3xl px-6 py-5 flex items-start gap-4">
                <div className="glass-icon w-10 h-10 flex-shrink-0">
                  <BellRing className="w-4 h-4 text-alert" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink mb-1">
                    {watchedOver.sos.label}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-slate leading-relaxed">
                    {watchedOver.sos.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
