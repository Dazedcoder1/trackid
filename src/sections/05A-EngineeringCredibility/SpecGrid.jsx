// SpecGrid.jsx
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, EASE } from '../../motion/variants';

const cardVariant = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE },
};

const iconVariant = {
  initial: { scale: 0.6, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  transition: { duration: 0.4, ease: EASE, delay: 0.1 },
};

function SpecCard({ icon, label, index }) {
  const LucideIcon = Icons[icon];
  const isAlt = index % 2 === 0;

  return (
    <motion.div
      variants={cardVariant}
      className={`group flex flex-col items-center gap-4 p-6
        ${isAlt ? 'bg-stone' : 'bg-white'}
        border border-stone
        hover:border-accent
        hover:shadow-[0_8px_32px_rgba(157,180,199,0.2)]
        hover:-translate-y-1
        rounded-xl transition-all duration-300 cursor-default`}
    >
      {LucideIcon && (
        <motion.div
          variants={iconVariant}
          className="group-hover:-translate-y-1 transition-transform duration-300"
        >
          <LucideIcon
            size={28}
            className="text-accentDeep group-hover:text-ink transition-colors duration-300"
          />
        </motion.div>
      )}
      <span className="font-mono text-xs tracking-widest uppercase text-ink/60 group-hover:text-ink transition-colors duration-300 text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function SpecGrid({ specs }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {specs.map((spec, index) => (
        <SpecCard key={spec.label} icon={spec.icon} label={spec.label} index={index} />
      ))}
    </motion.div>
  );
}