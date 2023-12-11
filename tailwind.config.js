/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "featured-bg":
          "url('https://manh-nextjs-ecommerce.s3.amazonaws.com/1702289207863.jpg')",
      }),
      fontFamily: {
        "roboto-slab": ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [],
};
