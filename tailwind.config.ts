import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        BAL: "#241773",
        CIN: "#FB4F14",
        CLE: "#311D00",
        PIT: "#FFB612",
        BUF: "#00338D",
        MIA: "#008E97",
        NE: "#002244",
        NYJ: "#125740",
        HOU: "#03202F",
        IND: "#002C5F",
        JAC: "#101820",
        TEN: "#0C2340",
        DEN: "#FB4F14",
        KC: "#E31837",
        LV: "#000000",
        LAC: "#0080C6",
        CHI: "#0B162A",
        DET: "#0076B6",
        GB: "#203731",
        MIN: "#4F2683",
        DAL: "#003594",
        NYG: "#0B2265",
        PHI: "#004C54",
        WAS: "#5A1414",
        ATL: "#A71930",
        CAR: "#0085CA",
        NO: "#D3BC8D",
        TB: "#D50A0A",
        ARI: "#97233F",
        LAR: "#003594",
        SF: "#AA0000",
        SEA: "#002244",
      },
    },
  },
  plugins: [],
};
export default config;
