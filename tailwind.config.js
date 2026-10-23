/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Modern Emerald & Deep Teal Palette
          primary: '#059669', // Vibrant trustworthy emerald
          'primary-dark': '#047857',
          'primary-light': '#10B981',
          'primary-soft': '#ECFDF5',
          'primary-hover': '#047857',
          
          // Festive Saffron / Amber Accent
          amber: '#F59E0B',
          'amber-dark': '#D97706',
          'amber-light': '#FBBF24',
          'amber-soft': '#FFFBEB',
          
          // Legacy Orange mapping
          orange: '#EA580C',
          'orange-dark': '#C2410C',
          'orange-light': '#FB923C',
          'orange-soft': '#FFF7ED',
          
          // High-contrast modern slate neutrals
          charcoal: '#0F172A', // Slate-900
          'charcoal-soft': '#334155', // Slate-700
          taupe: '#64748B', // Slate-500
          sand: '#E2E8F0', // Slate-200
          'sand-light': '#F8FAFC', // Slate-50
          surface: '#FFFFFF',
          card: '#FFFFFF',
          yellow: '#F59E0B',
          'yellow-soft': '#FEF3C7',
          green: '#10B981',
          'green-soft': '#D1FAE5',
          olive: '#059669',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 1px 3px -1px rgba(15, 23, 42, 0.04)',
        'elevated': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'floating': '0 20px 35px -8px rgba(15, 23, 42, 0.12), 0 10px 15px -5px rgba(15, 23, 42, 0.05)',
        'glow': '0 0 25px -5px rgba(5, 150, 105, 0.25)',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '10px',
        'lg': '14px',
        'xl': '18px',
        '2xl': '24px',
        '3xl': '32px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '104': '1.04',
      },
    },
  },
  plugins: [],
};
