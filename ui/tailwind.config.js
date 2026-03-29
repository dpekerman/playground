/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  corePlugins: {
    // Disable Tailwind's base reset — Angular Material provides its own normalize.
    // Keeping preflight causes button/link/typography conflicts with Material.
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
