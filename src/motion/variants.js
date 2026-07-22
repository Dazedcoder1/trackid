// The ONE easing curve used everywhere. Weight, not bounce.
export const EASE = [0.22, 1, 0.36, 1];

// The default scroll-reveal pattern — import this, don't write a new one per section.
// once: false → the story plays PERFECTLY BACKWARDS too: elements settle
// back to their initial state when they leave the viewport and replay
// their entrance when scrolled back to, in either direction.
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-80px' },
  transition: { duration: 0.6, ease: EASE },
};

// Stagger container for groups of fadeUp children (e.g. the spec grid, pendant cards)
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: false, margin: '-80px' },
};