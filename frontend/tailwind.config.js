/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'slide-left': 'slide-left .3s ease-in',
			},
			keyframes: {
				'slide-left': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0%)' },
				},
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [],
};
