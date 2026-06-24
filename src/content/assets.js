// src/content/assets.js
// Swap a file? Change ONE path here. Never write a raw /public/... path inline in a component.
export const ASSETS = {
  pendants: {
    classicTeardrop: {
      model3d: '/assets/models/classic-teardrop.glb',
      heroImage: '/assets/images/classic-teardrop-hero.png',
      thumbnail: '/assets/images/classic-teardrop-thumb.png',
    },
    sweetheartFiligree: {
      model3d: null, // not yet built — PendantCard falls back to thumbnail
      heroImage: '/assets/images/sweetheart-filigree-hero.png',
      thumbnail: '/assets/images/sweetheart-filigree-thumb.png',
    },
    // ...wiseOwl, pathFinder follow the same shape
  },
  exploded: {
    shellOuter: '/assets/images/exploded-shell-outer.png',
    pcb: '/assets/images/exploded-pcb.png',
    battery: '/assets/images/exploded-battery.png',
    shellInner: '/assets/images/exploded-shell-inner.png',
  },
  brand: {
    logoMark: '/assets/brand/trakid-logo.svg',
    soundOnIcon: '/assets/icons/sound-on.svg',
    soundOffIcon: '/assets/icons/sound-off.svg',
  },
};