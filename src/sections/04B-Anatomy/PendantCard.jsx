import { motion } from "framer-motion";

import { ASSETS } from "../../content/assets";
import { fadeUp } from "../../motion/variants";

export default function PendantCard({ item }) {
  const image =
    ASSETS.pendants[item.id]?.heroImage ||
    ASSETS.pendants.classicTeardrop.heroImage;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-gold/20
        bg-white/70
        backdrop-blur
        p-10
        shadow-sm
        transition-all
        duration-300
        hover:border-gold/50
        hover:shadow-2xl
      "
    >
      {/* Background Glow */}

      <div className="absolute right-6 top-6 h-64 w-64 rounded-full bg-gold/15 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image */}

      <div className="relative flex justify-center py-10">

        <motion.img
          animate={{
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src={image}
          alt={item.name}
          className="relative z-10 w-[250px] lg:w-[280px] transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Annotation */}

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute left-0 top-8"
        >
          <div className="flex items-center gap-3">

            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {item.motifNotes[0].title}
            </span>

            <div className="h-px w-12 bg-gold/40" />

          </div>
        </motion.div>

        {/* Bottom Annotation */}

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute right-0 bottom-10 text-right"
        >
          <div className="flex items-center justify-end gap-3">

            <div className="h-px w-12 bg-gold/40" />

            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {item.motifNotes[1].title}
            </span>

          </div>
        </motion.div>

      </div>

      {/* Name */}

      <h3 className="mt-8 font-display text-4xl text-ink leading-tight">
        {item.name}
      </h3>

      {/* Description */}

      <p className="mt-5 leading-8 text-slate text-lg">
        {item.description}
      </p>

      {/* Motifs */}

      <div className="mt-10 space-y-6">

        {item.motifNotes.map((note) => (
          <div
            key={note.title}
            className="flex items-start gap-4"
          >
            <div className="mt-2 h-2 w-2 rounded-full bg-gold" />

            <div>

              <p className="font-display text-lg text-ink">
                {note.title}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate">
                {note.description}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* Bottom Line */}

      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Footer */}

<div className="mt-8 flex items-center justify-between border-t border-gold/15 pt-6">

  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
    Craft Collection
  </span>

  <span className="font-body text-sm text-slate">
    Designed for Everyday Protection
  </span>

</div>

    </motion.article>
  );
}