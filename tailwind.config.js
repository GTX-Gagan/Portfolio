/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#07070B', 2: '#0D1016', 3: '#141923' },
        violet: { DEFAULT: '#FF2D95', soft: '#FF2D95' },
        cyan: { DEFAULT: '#007BA7' },
        fog: { DEFAULT: '#E7EEF2', 2: '#A9BAC3', 3: '#71818B' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '1180px' },
    },
  },
  plugins: [],
};
