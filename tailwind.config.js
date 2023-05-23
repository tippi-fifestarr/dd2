/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        gorditas: "var(--font-gorditas)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
