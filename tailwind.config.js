/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#FBBF24",
        background: "#F3F4F6",
        text: "#111827",
        accent: "#10B981",
        light: {
          100: "#D6C6FF",
          200: "A8B5DB",
          300: "#7A84B7",
        },
        dark : {
          100: '#221f3d',
          200: '#0f0d23'
        }
      },
    },
  },
  plugins: [],
}