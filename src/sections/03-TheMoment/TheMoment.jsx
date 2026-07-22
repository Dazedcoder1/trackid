// src/sections/03-TheMoment/TheMoment.jsx
// CHAPTER TWO — THE MOMENT (centered, gap-free pinned sequence)
// Layout rule: ONE composition, dead-center of the viewport at all
// times — clock on top, the current line directly beneath it, chip
// below. Lines swap in the same center slot with zero dead zones in
// the schedule, so every scrolled pixel shows text + the clock.
//   Step 1 — clock at 3:30, "The bell rang at 3:30." assembles
//   Step 2 — clock TICKS 3:30 → 3:42 (gold ring fills), silent chip
//   Step 3 — "It's 3:42, and she isn't home yet." ("home" on pink)
//   Step 4 — "Twelve minutes is nothing." — struck through live
//   Step 5 — "Twelve minutes is everything." on gold, holds to unpin
// Reduced motion: static stacked layout, no pin.

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { COPY } from '../../content/copy';
import { fadeUp } from '../../motion/variants';
import ChapterMarker from '../../components/ChapterMarker';
import { KineticParagraph } from '../../components/Kinetic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { moment } = COPY.story;

const STAGE_VH = 360;
const RING_R = 120;
const RING_C = 2 * Math.PI * RING_R;

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const band = (p, a, b) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// THE TIMER OWNS THE SCREEN: the first half of the pin is the wait —
// the clock ticking 3:30 → 3:42 with your scroll. Only after time
// completes do the remaining lines play, then the section scrolls up.
// [inStart, inEnd, outStart, outEnd] — the last line never exits.
const LINE_BANDS = [
  [0.02, 0.10, 0.16, 0.22],   // "The bell rang at 3:30." — then the wait
  [0.54, 0.63, 0.67, 0.72],   // after the timer completes
  [0.72, 0.79, 0.84, 0.88],
  [0.88, 0.96, 1.10, 1.20],
];

const STICKER_CLASS = {
  gold:  'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] bg-gold text-parchment -rotate-2 shadow-[0_6px_24px_rgba(201,166,107,0.35)]',
  pink:  'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] bg-accentDeep text-ink rotate-2 shadow-[0_6px_24px_rgba(168,28,75,0.35)]',
  ghost: 'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] glass-card text-slate -rotate-1',
};

const LINES = moment.lines.map((segments) =>
  segments.flatMap((seg) => seg.t.split(' ').map((w) => ({ w, sticker: seg.sticker })))
);

export default function TheMoment() {
  const prefersReducedMotion = useReducedMotion();

  const wrapRef = useRef(null);
  const minuteRef = useRef(null);
  const clockPulseRef = useRef(null);
  const ringRef = useRef(null);
  const chipRef = useRef(null);
  const strikeRef = useRef(null);
  const numeralRef = useRef(null);
  const lineRefs = useRef([]);
  const wordRefs = useRef(LINES.map(() => []));

  useEffect(() => {
    if (prefersReducedMotion) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = clamp01(-rect.top / total);

      // THE WAIT — the timer is the whole screen from 8% to 50% of the
      // pin: minutes tick with every scrolled pixel, the ring fills.
      const tick = band(p, 0.08, 0.50);
      const minutes = 30 + Math.round(tick * 12);
      if (minuteRef.current) minuteRef.current.textContent = String(minutes).padStart(2, '0');
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = (RING_C * (1 - tick)).toFixed(1);
      }
      // the clock leans in while ticking, settles once time completes,
      // and pulses at the moment it lands on 3:42
      const emphasis = band(p, 0.08, 0.14) * (1 - band(p, 0.50, 0.58));
      const pulse = band(p, 0.50, 0.54) * (1 - band(p, 0.56, 0.62));
      if (clockPulseRef.current) {
        clockPulseRef.current.style.transform = `scale(${(1 + emphasis * 0.12 + pulse * 0.06).toFixed(3)})`;
      }

      // The silent-phone chip rides the whole ticking stretch
      const chip = band(p, 0.12, 0.18) * (1 - band(p, 0.44, 0.50));
      if (chipRef.current) {
        chipRef.current.style.opacity = chip.toFixed(3);
        chipRef.current.style.transform = `translateY(${((1 - chip) * 12).toFixed(1)}px)`;
      }

      // The lines — same center slot, gap-free handoffs
      LINES.forEach((words, li) => {
        const [a, b, c, d] = LINE_BANDS[li];
        const inT = band(p, a, b);
        const outT = band(p, c, d);
        const cont = lineRefs.current[li];
        if (cont) {
          cont.style.opacity = (inT * (1 - outT)).toFixed(3);
          cont.style.transform = `translate(-50%, calc(-50% + ${(-outT * 36).toFixed(1)}px))`;
          cont.style.visibility = inT > 0 && outT < 1 ? 'visible' : 'hidden';
        }
        const step = (b - a) / (words.length + 3);
        words.forEach((_, wi) => {
          const w = wordRefs.current[li][wi];
          if (!w) return;
          const ws = a + wi * step;
          const t = band(p, ws, ws + step * 3.5);
          w.style.transform = `translateY(${((1 - t) * 110).toFixed(1)}%)`;
          w.style.opacity = t.toFixed(3);
        });
      });

      // The strike across "nothing."
      const strike = band(p, 0.79, 0.84);
      if (strikeRef.current) {
        strikeRef.current.style.transform = `scaleX(${strike.toFixed(3)})`;
      }

      if (numeralRef.current) {
        numeralRef.current.style.transform = `translate(-50%, ${(p * -80).toFixed(1)}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [prefersReducedMotion]);

  const staticMode = prefersReducedMotion;

  const renderLine = (words, li, extra = '') => (
    <div
      key={li}
      ref={(el) => { lineRefs.current[li] = el; }}
      style={staticMode ? undefined : { opacity: 0 }}
      className={
        (staticMode
          ? 'relative mx-auto text-center mb-10 '
          : 'absolute left-1/2 top-1/2 w-full text-center ') +
        'font-display font-bold text-3xl md:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.15] ' +
        extra
      }
    >
      {words.map(({ w, sticker }, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-[0.1em]">
          <span
            ref={(el) => { wordRefs.current[li][wi] = el; }}
            style={staticMode ? undefined : { opacity: 0 }}
            className={`relative inline-block ${sticker ? STICKER_CLASS[sticker] : ''}`}
          >
            {w}
            {li === 2 && sticker === 'ghost' && (
              <span
                ref={strikeRef}
                style={staticMode ? undefined : { transform: 'scaleX(0)' }}
                className="absolute left-[8%] right-[8%] top-1/2 h-[3px] bg-slate origin-left rounded-full"
              />
            )}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section id="the-moment" className="relative bg-parchment overflow-hidden">
      {/* ============ THE PINNED TWELVE MINUTES ============ */}
      <div
        ref={wrapRef}
        className="relative"
        style={staticMode ? undefined : { height: `${STAGE_VH}vh` }}
      >
        <div className={`${staticMode ? 'relative py-32' : 'sticky top-0 h-screen'} overflow-hidden`}>
          {/* Cold ambience */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 32%, rgba(30,20,40,0.6) 0%, transparent 70%)',
            }}
          />
          <span
            ref={numeralRef}
            aria-hidden
            className="absolute top-12 left-1/2 -translate-x-1/2 font-display font-bold text-[36vw] md:text-[22vw] leading-none text-ink/[0.035] pointer-events-none select-none"
          >
            02
          </span>
          <div aria-hidden className="absolute top-[28%] -left-24 w-72 h-72 rounded-full bg-accentDeep/10 blur-[100px] pointer-events-none" />
          <div aria-hidden className="absolute bottom-[14%] -right-20 w-80 h-80 rounded-full bg-gold/8 blur-[110px] pointer-events-none" />

          {/* ONE centered composition: marker → clock → line slot → chip */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
            <ChapterMarker className="mb-5 md:mb-7">{moment.marker}</ChapterMarker>

            <span className="glass-card inline-block rounded-full px-5 py-2 -rotate-3 font-mono text-[10px] md:text-xs uppercase tracking-premium text-slate mb-5 md:mb-7">
              {moment.day}
            </span>

            {/* The clock — compact, so the line below stays center-stage */}
            <div className="scale-[0.68] md:scale-90 -my-8 md:-my-4">
              <div ref={clockPulseRef} className="relative flex items-center justify-center">
                <svg
                  className="absolute -rotate-90"
                  width={RING_R * 2 + 20}
                  height={RING_R * 2 + 20}
                  viewBox={`0 0 ${RING_R * 2 + 20} ${RING_R * 2 + 20}`}
                  aria-hidden
                >
                  <circle
                    cx={RING_R + 10} cy={RING_R + 10} r={RING_R}
                    fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5"
                  />
                  <circle
                    ref={ringRef}
                    cx={RING_R + 10} cy={RING_R + 10} r={RING_R}
                    fill="none" stroke="rgba(201,166,107,0.75)" strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={staticMode ? 0 : RING_C}
                  />
                </svg>
                <div
                  className="font-display font-bold text-6xl md:text-7xl text-ink tracking-tight tabular-nums leading-none select-none"
                  style={{ padding: '70px 0' }}
                >
                  3:<span ref={minuteRef}>{staticMode ? '42' : '30'}</span>
                  <span className="font-mono text-lg md:text-xl text-slate ml-3 align-middle">PM</span>
                </div>
              </div>
            </div>

            {/* THE LINE SLOT — always dead-center under the clock */}
            <div className={staticMode ? 'w-full max-w-4xl mt-10' : 'relative w-full max-w-5xl h-[7.5rem] md:h-[9rem] mt-6 md:mt-8'}>
              {LINES.map((words, li) => renderLine(words, li))}
            </div>

            {/* The silent phone */}
            <div
              ref={chipRef}
              style={staticMode ? undefined : { opacity: 0 }}
              className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2.5 mt-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate/60 animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-premium text-slate">
                {moment.chip}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============ THE TURN — normal flow after the pin ============ */}
      <div className="relative max-w-4xl mx-auto px-6 pb-32 md:pb-44 pt-8 flex flex-col items-center text-center">
        <KineticParagraph
          text={moment.resolution}
          accents={moment.resolutionAccents}
          className="font-display text-2xl md:text-4xl font-semibold text-ink leading-snug max-w-3xl mb-14"
        />
        <motion.p
          {...fadeUp}
          className="font-mono text-[11px] md:text-xs uppercase tracking-kicker text-gold/80"
        >
          {moment.bridge}
        </motion.p>
      </div>
    </section>
  );
}
