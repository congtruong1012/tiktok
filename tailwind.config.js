module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /bg-[[]url/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(254, 44, 85, 1)",
        "black-900": "rgba(0,0,0,0.9)",
        "black-800": "rgba(0,0,0,0.8)",
        "black-700": "rgba(0,0,0,0.7)",
        "black-600": "rgba(0,0,0,0.6)",
        "black-500": "rgba(0,0,0,0.5)",
        "black-400": "rgba(0,0,0,0.4)",
        "black-300": "rgba(0,0,0,0.3)",
        "black-200": "rgba(0,0,0,0.2)",
        "black-100": "rgba(0,0,0,0.1)",
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
