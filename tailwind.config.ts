import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './tests/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      boxShadow: {
        soft: '0 20px 60px -30px rgba(15, 23, 42, 0.45)',
        glow: '0 0 0 1px rgba(59, 130, 246, 0.14), 0 30px 80px -30px rgba(14, 116, 144, 0.38)'
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.22) 1px, transparent 0)',
        'hero-fade':
          'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 118, 110, 0.82) 48%, rgba(14, 116, 144, 0.72) 100%)'
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)']
      }
    }
  },
  plugins: []
};

export default config;
