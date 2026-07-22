// src/sections/06-TheInvitation/TheInvitation.jsx
// CHAPTER SEVEN — THE BEGINNING (centered two-phase pinned stage)
// Layout rule: the stage shows exactly ONE centered composition at a
// time, swapped in place — no stacking, no off-center text, no gaps:
//   Phase A — the headline assembles dead-center ("choice." on gold),
//             then lifts away completely
//   Phase B — the two path cards sweep into the same center spot,
//             the prompt fades in, a gold thread draws down toward
//             the form; everything holds until the unpin
// The form follows in normal flow (forms never fight the scroll).
// Reduced motion: static layout, no pin.

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COPY } from '../../content/copy';
import { fadeUp, EASE } from '../../motion/variants';
import ChapterMarker from '../../components/ChapterMarker';
import FormField from '../06A-InstitutionalAsk/FormField';
import { FAMILY_FORM_FIELDS, INSTITUTIONAL_FORM_FIELDS } from '../../content/formSchema';
import { submitLead } from '../../services/leadSubmission';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { invitation } = COPY.story;

const AUDIENCES = {
  family:      { copy: invitation.audiences.family,      fields: FAMILY_FORM_FIELDS },
  institution: { copy: invitation.audiences.institution, fields: INSTITUTIONAL_FORM_FIELDS },
};

const STAGE_VH = 280;

const HEADLINE_WORDS = invitation.headlineKinetic.flatMap((seg) =>
  seg.t.split(' ').map((w) => ({ w, sticker: seg.sticker }))
);

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const band = (p, a, b) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export default function TheInvitation() {
  const prefersReducedMotion = useReducedMotion();

  // ---- form state ----
  const [audience, setAudience] = useState('family');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  // ---- stage refs ----
  const stageWrapRef = useRef(null);
  const phaseARef = useRef(null);
  const phaseBRef = useRef(null);
  const wordRefs = useRef([]);
  const numeralRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const promptRef = useRef(null);
  const threadRef = useRef(null);
  const formAnchorRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = stageWrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = clamp01(-rect.top / total);

      // PHASE A — headline assembles instantly on arrival, centered
      wordRefs.current.forEach((w, i) => {
        if (!w) return;
        const start = i * 0.012;
        const t = band(p, start, start + 0.06);
        w.style.transform = `translateY(${((1 - t) * 110).toFixed(1)}%)`;
        w.style.opacity = t.toFixed(3);
      });
      const aOut = band(p, 0.18, 0.30);
      if (phaseARef.current) {
        phaseARef.current.style.opacity = (1 - aOut).toFixed(3);
        phaseARef.current.style.transform = `translateY(${(-aOut * 9).toFixed(2)}vh)`;
        phaseARef.current.style.visibility = aOut >= 1 ? 'hidden' : 'visible';
      }

      // PHASE B — the choice takes the same center spot
      const bIn = band(p, 0.28, 0.40);
      if (phaseBRef.current) {
        phaseBRef.current.style.opacity = bIn.toFixed(3);
        phaseBRef.current.style.visibility = bIn <= 0 ? 'hidden' : 'visible';
      }
      const lc = band(p, 0.28, 0.44);
      if (leftCardRef.current) {
        leftCardRef.current.style.transform = `translateX(${((1 - lc) * -120).toFixed(1)}%) rotate(${(-14 + lc * 11).toFixed(1)}deg)`;
      }
      const rc = band(p, 0.32, 0.48);
      if (rightCardRef.current) {
        rightCardRef.current.style.transform = `translateX(${((1 - rc) * 120).toFixed(1)}%) rotate(${(14 - rc * 11).toFixed(1)}deg)`;
      }
      const pr = band(p, 0.52, 0.62);
      if (promptRef.current) {
        promptRef.current.style.opacity = pr.toFixed(3);
        promptRef.current.style.transform = `translateY(${((1 - pr) * 20).toFixed(1)}px)`;
      }
      const th = band(p, 0.68, 0.84);
      if (threadRef.current) {
        threadRef.current.style.transform = `scaleY(${th.toFixed(3)})`;
        threadRef.current.style.opacity = th > 0 ? '1' : '0';
      }

      if (numeralRef.current) {
        numeralRef.current.style.transform = `translate(-50%, ${(p * -70).toFixed(1)}px)`;
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

  const choosePath = (key) => {
    if (key !== audience) {
      setAudience(key);
      setFormData({});
      setErrors({});
      setStatus('idle');
    }
    const el = formAnchorRef.current;
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: -40 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fields } = AUDIENCES[audience];
    const nextErrors = {};
    fields.forEach((field) => {
      if (field.required && !String(formData[field.name] ?? '').trim()) {
        nextErrors[field.name] = invitation.errorRequired;
      }
    });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setStatus('submitting');
    await submitLead({ audience, ...formData });
    setStatus('success');
  };

  const { copy, fields } = AUDIENCES[audience];
  const staticMode = prefersReducedMotion;

  const pathCard = (key, ref) => {
    const c = AUDIENCES[key].copy;
    const isFamily = key === 'family';
    return (
      <button
        type="button"
        ref={ref}
        onClick={() => choosePath(key)}
        className={`group glass-card glass-card-hover rounded-[24px] px-7 py-7 md:px-9 md:py-9 text-left w-full md:w-[330px] pointer-events-auto ${
          isFamily
            ? 'border-gold/30 hover:border-gold/60'
            : 'border-accentDeep/40 hover:border-accentDeep/70'
        }`}
      >
        <span className={`font-mono text-[10px] uppercase tracking-kicker ${isFamily ? 'text-gold' : 'text-accentDeep'}`}>
          {isFamily ? 'Path One' : 'Path Two'}
        </span>
        <h3 className="font-display text-xl md:text-2xl font-bold text-ink mt-2.5 mb-2.5 tracking-tight">
          {c.label}
        </h3>
        <p className="font-body text-xs md:text-sm text-slate leading-relaxed mb-4">
          {c.subtitle}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-premium text-ink/60 group-hover:text-ink transition-colors duration-300">
          Choose this path →
        </span>
      </button>
    );
  };

  return (
    <section id="the-invitation" className="relative bg-parchment">

      {/* ================= THE CHOICE — pinned, centered ================= */}
      <div
        ref={stageWrapRef}
        className="relative"
        style={staticMode ? undefined : { height: `${STAGE_VH}vh` }}
      >
        <div className={`${staticMode ? 'relative py-32' : 'sticky top-0 h-screen'} overflow-hidden`}>
          {/* Ambience */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 50% at 50% 45%, rgba(168,28,75,0.13) 0%, transparent 70%)',
            }}
          />
          <span
            ref={numeralRef}
            aria-hidden
            className="absolute top-10 left-1/2 -translate-x-1/2 font-display font-bold text-[34vw] md:text-[20vw] leading-none text-ink/[0.035] pointer-events-none select-none"
          >
            07
          </span>

          {/* Marker stays put at the top of the stage */}
          <div className="absolute top-14 md:top-16 inset-x-0 flex justify-center z-20">
            <ChapterMarker>{invitation.marker}</ChapterMarker>
          </div>

          {/* PHASE A — the headline, dead-center */}
          <div
            ref={phaseARef}
            className={`${staticMode ? 'relative pt-16 pb-10' : 'absolute inset-0'} z-10 flex items-center justify-center px-6`}
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-ink tracking-tight leading-[1.12] max-w-4xl text-center">
              {HEADLINE_WORDS.map(({ w, sticker }, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-[0.1em]">
                  <span
                    ref={(el) => { wordRefs.current[i] = el; }}
                    style={staticMode ? undefined : { opacity: 0 }}
                    className={`inline-block ${
                      sticker === 'gold'
                        ? 'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] bg-gold text-parchment -rotate-2 shadow-[0_6px_24px_rgba(201,166,107,0.35)]'
                        : ''
                    }`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* PHASE B — the choice, in the same center spot */}
          <div
            ref={phaseBRef}
            style={staticMode ? undefined : { opacity: 0, visibility: 'hidden' }}
            className={`${staticMode ? 'relative pb-10' : 'absolute inset-0'} z-10 flex flex-col items-center justify-center px-6`}
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-8 w-full max-w-3xl">
              {pathCard('family', leftCardRef)}
              {pathCard('institution', rightCardRef)}
            </div>

            <p
              ref={promptRef}
              style={staticMode ? undefined : { opacity: 0 }}
              className="font-body text-sm md:text-base text-slate mt-8 md:mt-10 text-center"
            >
              {invitation.subhead}
            </p>

            <span
              ref={threadRef}
              style={staticMode ? undefined : { opacity: 0, transform: 'scaleY(0)' }}
              className="mt-6 w-px h-14 md:h-16 origin-top bg-gradient-to-b from-gold via-gold/60 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* ================= THE FORM — normal flow ================= */}
      <div ref={formAnchorRef} className="relative max-w-3xl mx-auto px-6 pb-32 md:pb-40 pt-8">
        <motion.div {...fadeUp} className="flex justify-center mb-12">
          <div className="glass-card rounded-full p-1.5 flex gap-1">
            {Object.entries(AUDIENCES).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (key === audience) return;
                  setAudience(key);
                  setFormData({});
                  setErrors({});
                  setStatus('idle');
                }}
                className={`relative rounded-full px-6 md:px-8 py-2.5 font-mono text-[11px] md:text-xs uppercase tracking-premium transition-colors duration-300 ${
                  audience === key ? 'text-parchment' : 'text-slate hover:text-ink'
                }`}
              >
                {audience === key && (
                  <motion.span
                    layoutId="audience-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="relative">{value.copy.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="glass-card rounded-[28px] p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={audience + status}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {status === 'success' ? (
                <div className="text-center py-10">
                  <p className="font-display text-2xl text-ink mb-3">{copy.successMessage}</p>
                  <p className="font-body text-sm text-slate">{copy.headline}</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-3">
                      {copy.headline}
                    </h3>
                    <p className="font-body text-sm md:text-base text-slate leading-relaxed">
                      {copy.subtitle}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {fields.map((field) => (
                      <FormField
                        key={field.name}
                        field={field}
                        value={formData[field.name]}
                        error={errors[field.name]}
                        onChange={handleChange}
                      />
                    ))}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full rounded-3xl bg-gold text-parchment font-mono text-xs uppercase tracking-premium py-5 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,166,107,0.35)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {status === 'submitting' ? '…' : copy.submitLabel}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
