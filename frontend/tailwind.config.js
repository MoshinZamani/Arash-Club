/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-background": "url('/src/assets/images/main.jpg')",
        "footer-background": "url('/src/assets/images/footer.jpg)",
      },
    },
  },
  plugins: [],
};
