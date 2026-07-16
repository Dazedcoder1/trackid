export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:        '#FFFFFF',   // Pure white for major typography
        parchment:  '#050205',   // The Void (Deep true black for main background)
        stone:      '#130611',   // Deep plum fallback for solid surfaces
        slate:      '#A1A1AA',   // Muted silver for body paragraphs
        accent:     '#FFFFFF',   // Pure white for icons/action points
        accentDeep: '#A81C4B',   // The Deep Premium Pink for ambient glowing
        gold:       '#C9A66B',   // Retained for metallic jewelry accents
        safe:       '#34D399',   
        alert:      '#F87171',   
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'], 
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        kicker: '.35em',
        premium: '.15em',
      }
    },
  },
  plugins: [],
};