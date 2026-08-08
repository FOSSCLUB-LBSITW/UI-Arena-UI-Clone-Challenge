/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        swiggy: {
          orange: "#FC8019",
          orangeDark: "#E2711D",
          dark: "#282C3F",
          gray: "#686B78",
          lightGray: "#F8F8F8",
          border: "#E9E9EB",
          green: "#48C479",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
