import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      primary: 'var(--primary-color)',
      'text-color': 'var(--text-color)',
      'text-color-secondary': 'var(--text-color-secondary)',
      'surface-card': 'var(--surface-card)',
      'surface-border': 'var(--surface-border)',
      'surface-overlay': 'var(--surface-overlay)',
      'surface-a': 'var(--surface-a)',
      'surface-b': 'var(--surface-b)',
      'surface-c': 'var(--surface-c)',
      'surface-d': 'var(--surface-d)',
      'primary-color-text': 'var(--primary-color-text)',
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
    },
  },
  plugins: [],
}
export default config
