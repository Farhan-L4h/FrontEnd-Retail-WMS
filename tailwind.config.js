/** @type {import('tailwindcss').Config} */

import flowbite from 'flowbite/plugin';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite({
        charts: true,
    }),
    // ... other plugins
  ],
  safelist: [
    // Hapus pola safelist yang tidak cocok
    // '/^datatable-.*$/',
  ],
}