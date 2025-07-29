/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", //// Esto le dice a Tailwind que busque clases en todos los archivos JS, TS, JSX y TSX dentro de la carpeta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};