module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      roboto: ['"Roboto"'],
      poppins: ['"Poppins"'],
      title: ['"Fredoka One"'],
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover", "focus"],
      fontFamily: ["hover", "focus"],
      fontWeight: ["hover", "focus", "group-hover"],
      scale: ["active", "group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
