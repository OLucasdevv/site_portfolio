/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#00D9FF', // electric-cyan
        'primary-foreground': '#0A0A0B', // near-black
        
        // Secondary Colors
        'secondary': '#8B5CF6', // rich-purple
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#39FF14', // vibrant-lime
        'accent-foreground': '#0A0A0B', // near-black
        
        // Background Colors
        'background': '#0A0A0B', // near-black
        'surface': '#1A1A1D', // elevated-surface
        
        // Text Colors
        'text-primary': '#FFFFFF', // white
        'text-secondary': '#A1A1AA', // muted-gray
        
        // Status Colors
        'success': '#10B981', // professional-green
        'success-foreground': '#FFFFFF', // white
        
        'warning': '#F59E0B', // amber-warning
        'warning-foreground': '#0A0A0B', // near-black
        
        'error': '#EF4444', // clear-red
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': 'rgba(255, 255, 255, 0.1)', // subtle-white
        'border-active': 'rgba(0, 217, 255, 0.3)', // active-cyan
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'], // headings
        'body': ['Source Sans Pro', 'system-ui', 'sans-serif'], // body-text
        'caption': ['Roboto', 'system-ui', 'sans-serif'], // captions
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'], // code-data
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'neo': '8px',
      },
      boxShadow: {
        'neo-primary': '0 4px 20px rgba(0, 217, 255, 0.15)',
        'neo-secondary': '0 2px 10px rgba(139, 92, 246, 0.1)',
        'neo-ambient': '0 1px 3px rgba(255, 255, 255, 0.05)',
        'glow-primary': '0 0 20px rgba(0, 217, 255, 0.4)',
        'glow-accent': '0 0 15px rgba(57, 255, 20, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' },
        },
      },
      backdropBlur: {
        'neo': '10px',
      },
      zIndex: {
        'navigation': '100',
        'mobile-menu': '200',
        'modal': '300',
      },
      transitionTimingFunction: {
        'neo': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'micro': '200ms',
        'component': '400ms',
        'page': '600ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}