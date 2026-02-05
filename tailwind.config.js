/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          dark: '#060d18',
          light: '#0f2240',
        },
        accent: {
          DEFAULT: '#7dd3fc',
          hover: '#38bdf8',
          glow: '#7dd3fc40',
        },
        silver: '#9ca3af',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'grid-flow': 'gridFlow 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px #7dd3fc40, 0 0 40px #7dd3fc20' },
          '50%': { boxShadow: '0 0 30px #7dd3fc60, 0 0 60px #7dd3fc30' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #7dd3fc08 1px, transparent 1px), linear-gradient(to bottom, #7dd3fc08 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse at center, #7dd3fc15 0%, transparent 70%)',
        'radial-glow-top': 'radial-gradient(ellipse at top, #7dd3fc10 0%, transparent 50%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
