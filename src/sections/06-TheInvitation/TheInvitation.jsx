// src/sections/06-TheInvitation/TheInvitation.jsx
// CHAPTER SEVEN — THE BEGINNING (complete redesign: "two doors")
// No pin, no phases, no seams — one dense, always-full composition:
//   · kinetic headline cascades in ("choice." on gold)
//   · two doors stand side by side: For My Family / For My School
//   · the chosen door EXPANDS into the form (framer layout morph);
//     the other collapses to a slim rail you can tap to switch
// Choice and form are one thing now — picking a path physically opens
// it. Zero blank space by construction: the section is exactly as tall
// as its content.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COPY } from '../../content/copy';
import { fadeUp, EASE } from '../../motion/variants';
import ChapterMarker from '../../components/ChapterMarker';
import FormField from '../06A-InstitutionalAsk/FormField';
import { FAMILY_FORM_FIELDS, INSTITUTIONAL_FORM_FIELDS } from '../../content/formSchema';
import { submitLead } from '../../services/leadSubmission';

const { invitation } = COPY.story;

const AUDIENCES = {
  family: {
    copy: invitation.audiences.family,
    fields: FAMILY_FORM_FIELDS,
    pathLabel: 'Path One',
    accentText: 'text-gold',
    accentBorder: 'border-gold/40',
    accentGlow: 'shadow-[0_0_60px_rgba(201,166,107,0.12)]',
  },
  institution: {
    copy: invitation.audiences.institution,
    fields: INSTITUTIONAL_FORM_FIELDS,
    pathLabel: 'Path Two',
    accentText: 'text-accentDeep',
    accentBorder: 'border-accentDeep/50',
    accentGlow: 'shadow-[0_0_60px_rgba(168,28,75,0.15)]',
  },
};

const HEADLINE_WORDS = invitation.headlineKinetic.flatMap((seg) =>
  seg.t.split(' ').map((w) => ({ w, sticker: seg.sticker }))
);

const spring = { duration: 0.65, ease: EASE };

export default function TheInvitation() {
  const [audience, setAudience] = useState('family');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const switchTo = (key) => {
    if (key === audience) return;
    setAudience(key);
    setFormData({});
    setErrors({});
    setStatus('idle');
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

  return (
    <section id="the-invitation" className="relative bg-parchment overflow-hidden">
      {/* Ambience — plum depth + ghost numeral, same language as ch. 2/3 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 35%, rgba(42,17,34,0.6) 0%, transparent 72%)',
        }}
      />
      <span
        aria-hidden
        className="absolute top-10 right-2 md:right-14 font-display font-bold text-[34vw] md:text-[18vw] leading-none text-ink/[0.04] pointer-events-none select-none"
      >
        07
      </span>
      <div aria-hidden className="absolute top-[30%] -left-24 w-80 h-80 rounded-full bg-gold/[0.08] blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-36 pb-24 md:pb-32">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-16">
          <ChapterMarker className="mb-10">{invitation.marker}</ChapterMarker>

          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink tracking-tight leading-[1.12] max-w-3xl mb-6">
            {HEADLINE_WORDS.map(({ w, sticker }, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-[0.1em]">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
                  className={`inline-block ${
                    sticker === 'gold'
                      ? 'rounded-xl md:rounded-2xl px-[0.32em] py-[0.02em] bg-gold text-parchment -rotate-2 shadow-[0_6px_24px_rgba(201,166,107,0.35)]'
                      : ''
                  }`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p {...fadeUp} className="font-body text-sm md:text-base text-slate">
            {invitation.subhead}
          </motion.p>
        </div>

        {/* ---------- The two doors ---------- */}
        <motion.div
          {...fadeUp}
          className="flex flex-col lg:flex-row gap-4 md:gap-5 items-stretch"
        >
          {Object.entries(AUDIENCES).map(([key, a]) => {
            const isOpen = key === audience;
            return (
              <motion.div
                key={key}
                layout
                transition={spring}
                className={`glass-card rounded-[28px] overflow-hidden ${
                  isOpen
                    ? `flex-1 ${a.accentBorder} ${a.accentGlow}`
                    : 'lg:w-60 flex-none opacity-70 hover:opacity-100 cursor-pointer transition-opacity duration-300'
                }`}
                onClick={isOpen ? undefined : () => switchTo(key)}
              >
                {isOpen ? (
                  /* ---------- THE OPEN DOOR — the form lives inside ---------- */
                  <div className="p-7 md:p-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={key + status}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {status === 'success' ? (
                          <div className="text-center py-16">
                            <p className="font-display text-2xl md:text-3xl text-ink mb-3">
                              {a.copy.successMessage}
                            </p>
                            <p className="font-body text-sm text-slate">{a.copy.headline}</p>
                          </div>
                        ) : (
                          <>
                            <div className="mb-8">
                              <span className={`font-mono text-[10px] uppercase tracking-kicker ${a.accentText}`}>
                                {a.pathLabel} — {a.copy.label}
                              </span>
                              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tight mt-3 mb-2">
                                {a.copy.headline.split(' ').map((w, i) => (
                                  <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.24em]">
                                    <motion.span
                                      initial={{ y: '110%', opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.035 }}
                                      className="inline-block"
                                    >
                                      {w}
                                    </motion.span>
                                  </span>
                                ))}
                              </h3>
                              <p className="font-body text-sm md:text-base text-slate leading-relaxed">
                                {a.copy.subtitle}
                              </p>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6 mb-6">
                                {a.fields.map((field, i) => (
                                  <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: EASE, delay: 0.25 + i * 0.05 }}
                                    className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                                  >
                                    <FormField
                                      field={field}
                                      value={formData[field.name]}
                                      error={errors[field.name]}
                                      onChange={handleChange}
                                    />
                                  </motion.div>
                                ))}
                              </div>

                              <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full rounded-3xl bg-gold text-parchment font-mono text-xs uppercase tracking-premium py-5 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,166,107,0.35)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                              >
                                {status === 'submitting' ? '…' : a.copy.submitLabel}
                              </button>
                            </form>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  /* ---------- THE CLOSED DOOR — a slim rail, tap to open ---------- */
                  <div className="h-full flex lg:flex-col items-center justify-between gap-4 p-6 lg:py-10">
                    <span className={`font-mono text-[10px] uppercase tracking-kicker ${a.accentText} lg:[writing-mode:vertical-rl] lg:rotate-180`}>
                      {a.pathLabel}
                    </span>
                    <span className="font-display text-lg md:text-xl font-bold text-ink lg:[writing-mode:vertical-rl] lg:rotate-180 whitespace-nowrap">
                      {a.copy.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-premium text-ink/50">
                      Open →
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
