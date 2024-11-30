/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        title: "#1E1E23",
        disable: "#A9A8AA",
        body1: "#2A3540",
        body2: "#6B7280",
        body3: "#777777",
        base: {
          bg: "#F1F4F5",
          dark: "#00316E",
        },
        primary: {
          100: "#DBE4F6",
          200: "#B0C9FA",
          500: "#0050F0",
          700: "#0148D6",
          800: "#0041BF",
        },
        error: { 50: "#FDE9E9", 500: "#EF4444" },
        attention: { 50: "#FFF9F0", 500: "#FEB241" },
        success: { 50: "#EDFAF2", 500: "#22C55E", 700: "#199145" },
        surface: {
          primary: "#F1F5F7",
          disable: "#F1F1F1",
          secondary: "#E9F0FE",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        headingLarge: ["44px", "140%"],
        heading1: ["52px", "150%"],
        heading3: ["36px", "150%"],
        heading4: ["30px", "150%"],
        "4xl": ["28px", "150%"],
        "3xl": ["24px", "150%"],
        "2xl": ["22px", "150%"],
        xl: ["20px", "150%"],
        lg: ["18px", "150%"],
        md: ["16px", "150%"],
        sm: ["14px", "150%"],
        xs: ["12px", "150%"],
      },
      fontWeight: {
        regular: "400",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        form: "2px 2px 20px 0px rgba(0, 49, 110, 0.15)",
        main: "0px 0px 8px 0px rgba(0, 49, 110, 0.15)",
        landing: "0px 0px 80px 0px rgba(145, 158, 171, 0.16)",
      },
      backgroundImage: {
        gradient: "linear-gradient(0deg, #DEE8FF 0%, #FFF 83.25%)",
      },
    },
  },
  plugins: [],
};
