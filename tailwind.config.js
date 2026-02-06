/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: 'var(--color-bg-page)',
        surface: 'var(--color-bg-surface)',
        paper: 'var(--color-bg-paper)',   /* background/paper - primary fill */
        'surface-hover': 'var(--color-bg-surface-hover)',
        muted: 'var(--color-bg-muted)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-answered': 'var(--color-text-answered)',
        'text-inverse': 'var(--color-text-inverse)',
        border: 'var(--color-border)',
        'border-interactive': 'var(--color-border-interactive)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          muted: 'var(--color-accent-muted)',
          'muted-text': 'var(--color-accent-muted-text)',
        },
        'input-bg': 'var(--color-input-bg)',
        'progress-bg': 'var(--color-progress-bg)',
        'progress-fill': 'var(--color-progress-fill)',
      }
    },
  },
  plugins: [],
}
