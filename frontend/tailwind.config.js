/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'slide-left': 'slide-left .3s ease-in',
				loading: 'loading 1s infinite alternate',
			},
			keyframes: {
				'slide-left': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0%)' },
				},
				loading: {
					'0%, 100%': {
						transform: 'translateY(-1rem)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
					},
					'50%': {
						transform: 'translateY(0)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
					},
				},
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [],
};
