// src/sections/03-TheMoment/TheMoment.jsx
// CHAPTER TWO — THE MOMENT (complete redesign: the minute rail)
// No pin, no phases — the twelve minutes are a vertical timeline the
// scroll draws downward, always full, always centered:
//   · intro line cascades in ("minutes" on gold)
//   · four minute-beats — 3:30 → 3:34 → 3:38 → 3:42 — each one a
//     timestamp + a thought that assembles word-by-word (scroll-scrubbed),
//     connected by a gold rail that draws itself between them
//   · the beats escalate in size; 3:42 lands biggest, "home" on pink
//   · the twist: "nothing." gets struck through live, then
//     "everything." takes its place on gold
//   · the resolution paragraph brightens word-by-word, then the bridge
// Zero blank space by construction — the section is as tall as its
// content. Reduced motion: everything renders static.

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COPY } from '../../content/copy';
import { fadeUp, EASE } from '../../motion/variants';
import ChapterMarker from '../../components/ChapterMarker';
import { KineticLine, KineticParagraph } from '../../components/Kinetic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const { moment } = COPY.story;

// Escalating type scale for the four beats — 3:42 lands biggest
const BEAT_SIZES = [
  'text-2xl md:text-4xl',
  'text-2xl md:text-4xl',
  'text-3xl md:text-5xl',
  'text-4xl md:text-6xl lg:text-7xl',
];

const STICKER_CLASS = {
  gold:  'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] bg-gold text-parchment -rotate-2 shadow-[0_6px_24px_rgba(201,166,107,0.35)]',
  pink:  'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] bg-accentDeep text-ink rotate-2 shadow-[0_6px_24px_rgba(168,28,75,0.35)]',
  ghost: 'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] glass-card text-slate -rotate-1',
};

// A rail segment that draws itself downward as it scrolls into view,
// with a small gold comet riding its tip.
function RailSegment({ tall = false }) {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const cometRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrap, start: 'top 92%', end: 'top 52%', scrub: 0.5 },
    });
    tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0);
    tl.fromTo(
      cometRef.current,
      { top: '0%', opacity: 1 },
      { top: '100%', opacity: 0.9, ease: 'none' },
      0
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={wrapRef} aria-hidden className={`relative mx-auto ${tall ? 'h-20 md:h-28' : 'h-14 md:h-20'}`}>
      <span
        ref={lineRef}
        style={prefersReducedMotion ? undefined : { transform: 'scaleY(0)' }}
        className="block w-px h-full origin-top bg-gradient-to-b from-gold/60 via-gold/25 to-white/10"
      />
      {!prefersReducedMotion && (
        <span
          ref={cometRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_12px_rgba(201,166,107,0.9),0_0_28px_rgba(201,166,107,0.4)]"
          style={{ top: 0 }}
        />
      )}
    </div>
  );
}

// Word cascade with optional live strike-through — for the twist lines.
// Gold stickers get the premium shine sweep.
function CascadeLine({ segments, className = '', strike = false }) {
  const words = segments.flatMap((seg) =>
    seg.t.split(' ').map((w) => ({ w, sticker: seg.sticker }))
  );
  return (
    <p className={className}>
      {words.map(({ w, sticker }, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-[0.1em]">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            className={`relative inline-block ${sticker ? STICKER_CLASS[sticker] : ''} ${
              sticker === 'gold' ? 'sticker-shine' : ''
            }`}
          >
            {w}
            {strike && sticker === 'ghost' && (
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.45, ease: EASE, delay: words.length * 0.06 + 0.35 }}
                className="absolute left-[8%] right-[8%] top-1/2 h-[3px] bg-slate origin-left rounded-full"
              />
            )}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

export default function TheMoment() {
  return (
    <section id="the-moment" className="relative bg-parchment overflow-hidden">
      {/* Cold ambience — deliberately not the warm brand pink */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 25%, rgba(30,20,40,0.6) 0%, transparent 70%)',
        }}
      />
      <span
        aria-hidden
        className="absolute top-14 left-1/2 -translate-x-1/2 font-display font-bold text-[36vw] md:text-[20vw] leading-none text-ink/[0.035] pointer-events-none select-none"
      >
        02
      </span>
      <div aria-hidden className="absolute top-[22%] -left-24 w-72 h-72 rounded-full bg-accentDeep/10 blur-[100px] pointer-events-none" />
      <div aria-hidden className="absolute bottom-[18%] -right-20 w-80 h-80 rounded-full bg-gold/[0.07] blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-36 pb-20 md:pb-24 flex flex-col items-center text-center">
        {/* ---------- Header ---------- */}
        <ChapterMarker className="mb-10">{moment.marker}</ChapterMarker>

        <motion.span
          {...fadeUp}
          className="glass-card inline-block rounded-full px-5 py-2 -rotate-3 font-mono text-[10px] md:text-xs uppercase tracking-premium text-slate mb-8"
        >
          {moment.day}
        </motion.span>

        <KineticLine
          segments={moment.intro}
          className="font-display font-bold text-4xl md:text-6xl text-ink tracking-tight leading-[1.12] max-w-3xl mb-14 md:mb-16"
        />

        {/* ---------- The minute rail ---------- */}
        <div className="flex flex-col items-center">
          {moment.beats.map((beat, i) => (
            <div key={beat.time} className="flex flex-col items-center">
              <RailSegment tall={i === moment.beats.length - 1} />

              {/* timestamp node — glass chip with tick marks */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative flex items-center gap-3 my-4 md:my-5"
              >
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold/50" />
                <span className="relative glass-card rounded-full px-4 py-1.5 flex items-center gap-2">
                  {i === moment.beats.length - 1 && (
                    <span className="absolute -inset-1 rounded-full border border-gold/40 animate-ping" aria-hidden />
                  )}
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === moment.beats.length - 1
                        ? 'bg-gold shadow-[0_0_10px_rgba(201,166,107,0.9)]'
                        : 'bg-white/30'
                    }`}
                  />
                  <span className="font-mono text-[11px] md:text-xs uppercase tracking-kicker text-gold tabular-nums">
                    {beat.time}
                  </span>
                </span>
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold/50" />
              </motion.div>

              <div className="relative">
                {/* the 3:42 beat gets a soft bloom behind it */}
                {i === moment.beats.length - 1 && (
                  <motion.div
                    aria-hidden
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 1.1, ease: EASE }}
                    className="absolute -inset-x-24 -inset-y-12 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(168,28,75,0.16) 0%, rgba(201,166,107,0.06) 45%, transparent 75%)',
                    }}
                  />
                )}
                <KineticLine
                  segments={beat.segments}
                  className={`relative font-display font-bold text-ink tracking-tight leading-[1.15] max-w-4xl mb-2 ${BEAT_SIZES[i]}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---------- The twist ---------- */}
        <div className="mt-20 md:mt-28 flex flex-col items-center gap-6 md:gap-8">
          <CascadeLine
            segments={moment.twist.nothing}
            strike
            className="font-display font-bold text-3xl md:text-5xl text-ink tracking-tight leading-[1.15]"
          />
          <CascadeLine
            segments={moment.twist.everything}
            className="font-display font-bold text-4xl md:text-6xl text-ink tracking-tight leading-[1.15]"
          />
        </div>

        {/* ---------- The turn ---------- */}
        <div className="mt-20 md:mt-28 flex flex-col items-center">
          <KineticParagraph
            text={moment.resolution}
            accents={moment.resolutionAccents}
            className="font-display text-2xl md:text-4xl font-semibold text-ink leading-snug max-w-3xl mb-12"
          />
          <motion.p
            {...fadeUp}
            className="font-mono text-[11px] md:text-xs uppercase tracking-kicker text-gold/80"
          >
            {moment.bridge}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
