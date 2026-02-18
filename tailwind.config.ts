import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Color scheme backgrounds
    'bg-navy',
    'bg-cream',
    'bg-terracotta',
    // Color scheme text - all variants for proper contrast
    'text-navy',
    'text-navy/80',
    'text-navy/70',
    'text-navy/60',
    'text-cream',
    'text-cream/90',
    'text-cream/95',
    'text-terracotta',
    // Color scheme borders
    'border-navy/5',
    'border-navy/10',
    'border-navy/20',
    'border-cream/10',
    'border-cream/20',
    'border-terracotta/20',
    // Color scheme backgrounds for cards
    'bg-navy/70',
    'bg-cream/95',
    'bg-white',
    'bg-terracotta/10',
    'bg-navy/10',
    'bg-navy/20',
    'bg-cream/20',
  ],
  theme: {
  	extend: {
  		colors: {
  			terracotta: {
  				DEFAULT: '#ba5b3e',
  				dark: '#9c4c34',
  				light: '#cf7359'
  			},
  			cream: {
  				DEFAULT: '#f2ebd7',
  				dark: '#e8dfc8'
  			},
  			navy: {
  				DEFAULT: '#470606',
  				light: '#6b1a1a'
  			},
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
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		fontFamily: {
  			serif: [
  				'var(--font-prata)',
  				'Georgia',
  				'serif'
  			],
  			sans: [
  				'var(--font-dm-sans)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'display-lg': [
  				'3.5rem',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.02em'
  				}
  			],
  			'display-md': [
  				'3rem',
  				{
  					lineHeight: '1.15',
  					letterSpacing: '-0.02em'
  				}
  			],
  			'heading-lg': [
  				'2rem',
  				{
  					lineHeight: '1.25',
  					letterSpacing: '-0.01em'
  				}
  			],
  			'heading-md': [
  				'1.5rem',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '-0.01em'
  				}
  			],
  			'heading-sm': [
  				'1.25rem',
  				{
  					lineHeight: '1.4'
  				}
  			],
  			'body-lg': [
  				'1.125rem',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			'body-md': [
  				'1rem',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			'body-sm': [
  				'0.875rem',
  				{
  					lineHeight: '1.5'
  				}
  			]
  		},
  		spacing: {
  			'section-sm': '3rem',
  			'section-md': '5rem',
  			'section-lg': '7rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'fade-in': 'fade-in 0.6s ease-out',
  			'slide-up': 'slide-up 0.6s ease-out',
  			'scale-in': 'scale-in 0.4s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'slide-up': {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
