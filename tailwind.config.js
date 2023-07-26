/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require("@mui/material/colors");
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	important: "#root",
	theme: {
		extend: {
			colors: { ...colors },
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
