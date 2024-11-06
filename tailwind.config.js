/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        'carousel-next': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-33.3%)' },
        },
        'carousel-prev': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(33.3%)' },
        },
      },
      animation: {
        'carousel-next': 'carousel-next 0.3s ease-in-out forwards',
        'carousel-prev': 'carousel-prev 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
