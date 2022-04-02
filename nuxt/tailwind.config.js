module.exports = {
  content: [
    "./client/components/**/*.{js,vue,ts}",
    "./client/layouts/**/*.vue",
    "./client/pages/**/*.vue",
    "./client/plugins/**/*.{js,ts}",
    "./client/nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [
      {
        "custom-theme": {
          primary: "#5BC2E7",
          secondary: "#1DA593",
          accent: "#fed76f",
          neutral: "#1e1248",
          "base-100": "#ffffff",
          info: "#468CCE",
          success: "#4ade80",
          warning: "#fbbf24",
          error: "#f43f5e",
        },
      },
    ],
  },
};
