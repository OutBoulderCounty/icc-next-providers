module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          darkest: "#2E1541",
          dark: "#4A2268",
          DEFAULT: "#662F90",
          light: "#803BB5",
          lightest: "#995AC9",
        },
      },
    },
    minHeight: {
      200: "200px",
      300: "300px",
      275: "275px",
      screen: "100vh",
      full: "100%",
    },
    backgroundSize: {
      "10%": "10%",
      "20%": "20%",
    },
    backgroundPosition: {
      "right-bottom-hidden": "right -2.1rem bottom -2.1rem",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
}
