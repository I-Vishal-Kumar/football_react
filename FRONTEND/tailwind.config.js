/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#fed9ed",
        forgroundColor: "#e7bcde",
        accentColor: "#bb9cc0",
        buttonColor: "#67729d",
        textColor: "#fffbf5",
        header_background: "#001489",
      },
      height: {
        18: "60px",
        fit: "calc(100vh - 60px)",
      },
    },
  },
  plugins: [],
};
