import { Bricolage_Grotesque, DM_Sans, Fraunces, Inter, Newsreader, Space_Grotesk } from "next/font/google";

// Mockup fonts, self-hosted at build time by next/font (no request goes to Google from the browser).
// Each direction puts its pair on its own wrapper; tokens.css reads the variables.
// After the client picks, keep the winning pair and delete the rest.

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--f-fraunces", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--f-newsreader", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--f-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--f-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--f-bricolage", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], axes: ["opsz"], variable: "--f-dm-sans", display: "swap" });

export const directionFonts = {
  a: `${fraunces.variable} ${newsreader.variable}`,
  b: `${spaceGrotesk.variable} ${inter.variable}`,
  c: `${bricolage.variable} ${dmSans.variable}`,
};
