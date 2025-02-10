// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mb': {'min': '375px', 'max': '500px'}
      }
    },
  },
  plugins: [],
};
