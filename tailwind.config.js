/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:        '#0E1116',   // primary text, dark surfaces
        parchment:  '#F7F5F0',   // default page background
        stone:      '#E8E6E0',   // secondary surfaces, cards
        slate:      '#6B7378',   // secondary text, captions
        accent:     '#9DB4C7',   // sapphire — semantic brand accent
        accentDeep: '#5C7691',   // darker accent, eyebrows/links on light bg
        gold:       '#C9A66B',   // rose-gold — rare, institutional accent
        safe:       '#4C7A63',   // "safe zone" state — muted sage, NEVER stock green
        alert:      '#A6553E',   // "SOS" state — muted brick, NEVER stock red
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],   // headlines + wordmark ONLY
        body:    ['Inter', 'sans-serif'], // all paragraph copy, nav, buttons
        mono:    ['JetBrains Mono', 'monospace'], // specs, eyebrows, captions ONLY
      },
    },
  },
  plugins: [],
};