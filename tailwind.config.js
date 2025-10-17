/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        home: {
          DEFAULT: 'hsl(var(--home-shadow))',
        },
        linkedin: {
          DEFAULT: 'hsl(var(--linkedin))',
        },
        facebook: {
          DEFAULT: 'hsl(var(--facebook))',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'meteor-effect': 'meteor 5s linear infinite',
      },
      fontFamily: {
        "Carattere": `"Carattere", serif`,
      },
      backgroundImage: {
        'radial-primary-1': 'radial-gradient(circle at 60%, hsl(var(--primary)) 40%, transparent 30%)',
        'radial-primary-2': 'radial-gradient(circle at 10%, hsl(var(--primary)) 10%, transparent 50%)',
        'radial-secondary-1': 'radial-gradient(circle at 60%, hsl(var(--secondary)) 40%, transparent 30%)',
      },
      blur: {
        20: '20px',
        60: '60px',
        100: '100px',
      },
      width: {
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '80vw': '80vw',
        '90vw': '90vw',
      },
      height: {
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '80vh': '80vh',
      },
      maxWidth: {
        '60dvw': '60dvw',
        'prose-10': '10ch',
        'prose-20': '20ch',
        'prose-30': '30ch',
        'prose-40': '40ch',
        'prose-50': '50ch',
        'prose-60': '60ch',
      },
      minHeight: {
        '300px': '300px',
      },
      maxHeight: {
        '500px': '500px',
      },
      padding: {
        xxs: '0.125em',
      },
      rotate: {
        60: '60deg',
      },
      scale: {
        99: '0.99',
        98: '0.98',
        95: '0.95',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
