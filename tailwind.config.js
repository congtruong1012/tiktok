module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(254, 44, 85, 1)",
      },
      boxShadow: {
        pri: "rgb(0 0 0 / 12%) 0px 4px 16px",
      },
      animation: {
        spinner: "spinner 1s linear infinite",
      },
      keyframes: {
        spinner: {
          "0%": { transform: "translateY(-50%) rotate(0)" },
          "100%": { transform: "translateY(-50%) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
