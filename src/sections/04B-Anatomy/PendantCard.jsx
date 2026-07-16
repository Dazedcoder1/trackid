import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus, BadgeCheck, RotateCw } from "lucide-react";

import { ASSETS } from "../../content/assets";
import { EASE, fadeUp } from "../../motion/variants";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// Three-dot cluster — a small recurring brand mark used the same way a
// jeweller's hallmark or a studio's signature dots would sit beside a title.
function BrandDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-gold" />
      <span className="h-2 w-2 rounded-full bg-ink/60" />
      <span className="h-2 w-2 rounded-full bg-safe" />
    </div>
  );
}

export default function PendantCard({ item, index = 1, total = 4 }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [showBack, setShowBack] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const image =
    ASSETS.pendants[item.id]?.heroImage ||
    ASSETS.pendants.classicTeardrop.heroImage;
  const backImage =
    ASSETS.pendants[item.id]?.backImage || image;

  function handleMouseLeave() {
    setIsHovering(false);
  }

  // Alternates the layout left-to-right on desktop based on the card's index
  const textOrderClass = index % 2 === 0 ? "lg:order-2" : "lg:order-1";
  const imageOrderClass = index % 2 === 0 ? "lg:order-1" : "lg:order-2";

  return (
    <motion.article
      ref={cardRef}
      {...fadeUp}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[32px]
        border
        border-gold/20
        bg-stone/90
        shadow-sm
        transition-[border-color,box-shadow]
        duration-300
        hover:border-gold/50
        hover:shadow-2xl
        lg:flex-row
      "
    >
      {/* ============================================================
                TEXT PANEL — name, tags, description, CTA
      ============================================================ */}
      <div className={`relative z-10 flex w-full flex-col justify-between gap-10 p-8 lg:w-1/2 lg:p-14 ${textOrderClass}`}>
        <div>
          <div className="flex items-center justify-between">
            <BrandDots />
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-slate">
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Hallmark stamp */}
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 1.8, opacity: 0, rotate: -18 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/10 px-3.5 py-2"
          >
            <BadgeCheck size={14} strokeWidth={2} className="text-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Hallmarked
            </span>
          </motion.div>

          <h3 className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink lg:text-6xl xl:text-[4rem]">
            {item.name}
          </h3>

          <p className="mt-5 max-w-lg text-lg leading-8 text-slate">{item.description}</p>

          {/* Full motif list */}
          <div className="mt-8 space-y-5">
            {(item.motifNotes || []).map((note, noteIndex) => (
              <motion.div
                key={note.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: noteIndex * 0.08, ease: EASE }}
                className="flex items-start gap-4"
              >
                <div className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gold transition-transform duration-300 group-hover:scale-125" />
                <div>
                  <p className="font-display text-lg font-medium tracking-tight text-ink">
                    {note.title}
                  </p>
                  <p className="mt-1 text-base leading-7 text-slate">{note.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Specs Accordion */}
        <div className="mt-8 border-t border-gold/20 pt-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-3 text-left w-full justify-between lg:justify-start"
          >
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-gold">
              {expanded ? "Hide specs" : "Tech specs"}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/30"
            >
              <Plus size={14} strokeWidth={2} className="text-gold" />
            </motion.span>
          </button>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider text-slate">
            {(item.specs || []).map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={false}
                animate={
                  expanded
                    ? { opacity: 1, y: 0, height: "auto" }
                    : { opacity: 0, y: shouldReduceMotion ? 0 : 6, height: 0, overflow: "hidden" }
                }
                transition={{ duration: 0.3, ease: EASE, delay: expanded ? i * 0.05 : 0 }}
                className="flex flex-col gap-1"
              >
                <dt className="text-slate">{spec.label}</dt>
                <dd className="text-ink normal-case tracking-normal text-sm font-body">
                  {spec.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* ============================================================
                IMAGE PANEL — framed product shot, interactive
      ============================================================ */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative flex h-[420px] w-full items-center justify-center overflow-hidden bg-parchment lg:h-auto lg:w-1/2 ${imageOrderClass}`}
      >
        {/* Ambient glow behind the piece */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />

        {/* Rotating bezel ring */}
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: isHovering ? 7 : 18, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(201,166,107,0.55) 12%, transparent 24%, transparent 50%, rgba(201,166,107,0.4) 62%, transparent 74%)",
              WebkitMaskImage:
                "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 2px) calc(100% - 1px), transparent 100%)",
              maskImage:
                "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 2px) calc(100% - 1px), transparent 100%)",
            }}
          />
        )}

        {/* Holographic foil sweep on hover */}
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ x: "-130%" }}
            animate={isHovering ? { x: "130%" } : { x: "-130%" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 z-20 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.5) 45%, rgba(201,166,107,0.4) 55%, transparent 80%)",
            }}
          />
        )}

        {/* Top-left annotation */}
        {item.motifNotes && item.motifNotes.length > 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute left-6 top-6 z-30 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-gold/50" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70">
              {item.motifNotes[0].title}
            </span>
          </motion.div>
        )}

        {/* Bottom-right annotation */}
        {item.motifNotes && item.motifNotes.length > 1 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute bottom-6 right-6 z-30 flex items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70">
              {item.motifNotes[1].title}
            </span>
            <div className="h-px w-8 bg-gold/50" />
          </motion.div>
        )}

        {/* 
            The pendant itself — fills almost the entire showcase.
            Uses a cross-fade to cleanly flip front-to-back, avoiding WebKit 3D nesting bugs. 
        */}
        <div className="relative flex h-full w-full items-center justify-center p-6 lg:p-10">
          <div className="relative h-full w-full">
            <motion.img
              src={image}
              alt={item.name}
              animate={{
                opacity: showBack ? 0 : 1,
                ...(shouldReduceMotion ? {} : { y: [-4, 4, -4], rotate: [-1.5, 1.5, -1.5] }),
              }}
              transition={{
                opacity: { duration: 0.4, ease: EASE },
                y: { duration: 6, repeat: Infinity, ease: EASE },
                rotate: { duration: 6, repeat: Infinity, ease: EASE },
              }}
              style={{ objectFit: "contain" }}
              className="absolute inset-0 h-full w-full drop-shadow-[0_18px_34px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105"
            />
            <motion.img
              src={backImage}
              alt={`${item.name} — reverse`}
              animate={{ opacity: showBack ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ objectFit: "contain" }}
              className="absolute inset-0 h-full w-full drop-shadow-[0_18px_34px_rgba(0,0,0,0.45)]"
            />
          </div>

          {/* Hover CTA — echoes an "open project" reveal, doubles as the flip trigger */}
          {!shouldReduceMotion && (
            <motion.button
              type="button"
              onClick={() => setShowBack((v) => !v)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHovering ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute z-40 flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full border border-gold/40 bg-ink/10 text-ink backdrop-blur-md"
              aria-label={showBack ? "Show front of pendant" : "Show back of pendant"}
            >
              <RotateCw size={16} strokeWidth={1.8} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] mt-1">
                {showBack ? "Front" : "Flip"}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
}