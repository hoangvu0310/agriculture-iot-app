/** @type {import('tailwindcss').Config} */
const colors = require('./src/constants/colors.ts')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {},
			colors: {
				...colors,
			},
		},
	},
	plugins: [],
}
