import type { Config } from "tailwindcss";

const config: Config = {
darkMode: ["class"],
content: [
"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
extend: {
	colors: {
		background: 'hsl(var(--background))',
		foreground: 'hsl(var(--foreground))',
		card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		},
		popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		},
		primary: {
			'50': '#fcfcfc',
			'100': '#f1f1f2',
			'200': '#e0e0e2',
			'300': '#c7c7cc',
			'400': '#a8a8af',
			'500': '#82828b',
			'600': '#57575f',
			'700': '#27272a',
			'800': '#111113',
			'900': '#040405',
			'950': '#000000'
		},
		secondary: {
			'50':  '#f7f7fe',
      		'100': '#e7e8fd',
      		'200': '#cdd0fc',
      		'300': '#afb3fa',
      		'400': '#8c90f8',
      		'500': '#4548f5',
      		'600': '#3739c4',
      		'700': '#2b2c99',
      		'800': '#1e1f6b',
      		'900': '#131443',
      		'950': '#0a0a26',
		},
		muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		},
		accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		},
		destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		},
		border: 'hsl(var(--border))',
		input: 'hsl(var(--input))',
		ring: 'hsl(var(--ring))',
		chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))'
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
		}
	}
}
},
plugins: [require("tailwindcss-animate")],
};
export default config;
