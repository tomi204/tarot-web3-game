/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			'custom-blue-dark': '#0C1D2D',
			'custom-blue-medium': '#425492',
			'custom-blue-light': '#306A9A',
		},
		animation: {
			gradient: 'gradient 6s ease infinite',
		  },
		keyframes: {
			gradient: {
			'0%, 100%': { backgroundPosition: '0% 50%' },
			'50%': { backgroundPosition: '100% 50%' },
			},
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
