import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 背景色：温暖的米色
        canvas: {
          DEFAULT: "#FFFBF5", 
          subtle: "#F5F0E6",
        },
        // 品牌主色：糖果粉
        brand: {
          pink: "#FF6B8B",
          "pink-shade": "#D94A6A", // 按钮阴影
          blue: "#4CC9F0",
          "blue-shade": "#2AA6CD",
        },
        // 功能色
        action: {
          green: "#58CC02",
          "green-shade": "#46A302",
          yellow: "#FFC800",
          "yellow-shade": "#DFA800",
        },
        // 文字色
        ink: {
          DEFAULT: "#4B4C53",
          light: "#777777",
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;