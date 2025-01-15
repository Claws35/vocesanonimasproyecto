export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Agrega tu fuente personalizada
        benguiat: ['"itc-benguiat"', "serif"],
        karol: ['"karol-sans"', "sans-serif"],
      },
    },
  },
  plugins: [
    // ...
  ],
};
