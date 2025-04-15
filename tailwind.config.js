/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{ts,jsx}",
	  "./components/**/*.{ts,jsx}",
	  "./app/**/*.{js,jsx}",
	  "./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
	  container: {
		center: true,
		padding: '2rem',
		screens: {
		  '2xl': '1400px'
		}
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
		  },
		  sidebar: {
			DEFAULT: 'hsl(var(--sidebar-background))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))'
		  },
		  // Custom colors for our mental health app
		  teal: {
			DEFAULT: '#4AC6B7',
			50: '#E8F7F5',
			100: '#C5EBE7',
			200: '#9ADFD9',
			300: '#70D3CB',
			400: '#4AC6B7',
			500: '#34A99B',
			600: '#288A7F',
			700: '#1D6A62',
			800: '#154F49',
			900: '#0D3430',
		  },
		  blue: {
			DEFAULT: '#6BB5FF',
			50: '#F0F7FF',
			100: '#D6E9FF',
			200: '#ADD1FF',
			300: '#8FC3FF',
			400: '#6BB5FF',
			500: '#3897FF',
			600: '#0074FF',
			700: '#005ECC',
			800: '#004999',
			900: '#003366',
		  },
		  lavender: {
			DEFAULT: '#9B87F5',
			50: '#F5F2FE',
			100: '#E5DEFF',
			200: '#C7BAFD',
			300: '#B19AFC',
			400: '#9B87F5',
			500: '#7D64EF',
			600: '#5B3EEA',
			700: '#3415D0',
			800: '#27109D',
			900: '#1A0B69',
		  },
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
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
		  },
		  'pulse-gentle': {
			'0%, 100%': {
			  opacity: 1,
			},
			'50%': {
			  opacity: 0.8,
			},
		  },
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out',
		  'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		}
	  }
	},
	plugins: [require("tailwindcss-animate")],
  }
  