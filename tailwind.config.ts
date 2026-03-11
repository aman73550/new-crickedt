import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 60-30-10 Color Rule
        // 60% Primary - Deep Navy Blue (backgrounds)
        primary: {
          DEFAULT: '#0A1628',
          50: '#E8EBF0',
          100: '#C5CCD8',
          200: '#9EA9BE',
          300: '#7786A4',
          400: '#596B91',
          500: '#3B517D',
          600: '#354A75',
          700: '#2D406A',
          800: '#263660',
          900: '#1A2D4A',
          950: '#0A1628',
        },
        // 30% Secondary - Electric Teal (accents, interactive)
        secondary: {
          DEFAULT: '#00D9FF',
          50: '#E6FCFF',
          100: '#B3F5FF',
          200: '#80EEFF',
          300: '#4DE7FF',
          400: '#1AE0FF',
          500: '#00D9FF',
          600: '#00AED9',
          700: '#0082B3',
          800: '#00578C',
          900: '#002B66',
        },
        // 10% Accent - Vibrant Orange (CTAs, highlights)
        accent: {
          DEFAULT: '#FF6B35',
          50: '#FFF0EB',
          100: '#FFD6C7',
          200: '#FFBCA3',
          300: '#FFA27F',
          400: '#FF885B',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#CC4A21',
          800: '#B23917',
          900: '#99290D',
        },
        // Semantic colors
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        // Team colors for cricket
        team: {
          batting: '#10B981',
          bowling: '#EF4444',
          neutral: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-secondary': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 107, 53, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0A1628 0%, #1A2D4A 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #00D9FF 0%, #0082B3 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
