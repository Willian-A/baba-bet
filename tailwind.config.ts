import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      text: {
        50: "#e7eafd",
        100: "#d0d5fb",
        200: "#a1abf7",
        300: "#7181f4",
        400: "#4257f0",
        500: "#132cec",
        600: "#0f24bd",
        700: "#0b1b8e",
        800: "#08125e",
        900: "#04092f",
        950: "#020418",
      },
      background: {
        50: "#eff0f6",
        100: "#dfe0ec",
        200: "#bec1da",
        300: "#9ea3c7",
        400: "#7d84b5",
        500: "#5d65a2",
        600: "#4a5182",
        700: "#383d61",
        800: "#252841",
        900: "#131420",
        950: "#090a10",
        transparent: "#000000BF",
      },
      primary: {
        50: "#eeeef6",
        100: "#ddddee",
        200: "#bbbbdd",
        300: "#9999cc",
        400: "#7777bb",
        500: "#5555aa",
        600: "#444488",
        700: "#333366",
        800: "#222244",
        900: "#111122",
        950: "#090911",
      },
      secondary: {
        50: "#eee8fd",
        100: "#ddd0fb",
        200: "#bba1f7",
        300: "#9972f3",
        400: "#7743ef",
        500: "#5514eb",
        600: "#4410bc",
        700: "#330c8d",
        800: "#22085e",
        900: "#11042f",
        950: "#080217",
      },
      accent: {
        50: "#f2e8fd",
        100: "#e4d0fb",
        200: "#c9a1f7",
        300: "#ae72f3",
        400: "#9343ef",
        500: "#7814eb",
        600: "#6010bc",
        700: "#480c8d",
        800: "#30085e",
        900: "#18042f",
        950: "#0c0217",
      },
      success: {
        50: "#f1faea",
        100: "#e2f6d5",
        200: "#c6ecac",
        300: "#a9e382",
        400: "#8cd959",
        500: "#6fd02f",
        600: "#59a626",
        700: "#437d1c",
        800: "#2d5313",
        900: "#162a09",
        950: "#0b1505",
      },
      error: {
        50: "#fbe9eb",
        100: "#f8d3d8",
        200: "#f0a8b0",
        300: "#e97c89",
        400: "#e15161",
        500: "#da253a",
        600: "#ae1e2e",
        700: "#831623",
        800: "#570f17",
        900: "#2c070c",
        950: "#160406",
      },
      link: {
        50: "#e5f1ff",
        100: "#cce4ff",
        200: "#99c9ff",
        300: "#66adff",
        400: "#3392ff",
        500: "#0077ff",
        600: "#005fcc",
        700: "#004799",
        800: "#003066",
        900: "#001833",
        950: "#000c1a",
      },
      disabled: {
        900: "#bbb9bf",
        950: "#8e8c93",
      },
    },
  },
  plugins: [],
};
export default config;
