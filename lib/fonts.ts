import { Inter, Manrope, Sora, Space_Grotesk, Syne } from "next/font/google";
import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import type { FontId } from "@/config/schema";

/**
 * Font registry. next/font requires literal, module-level calls, so the
 * template bundles these five self-hosted families and the config picks
 * by id (`theme.fonts.heading` / `theme.fonts.body`).
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-space-grotesk",
});
const sora = Sora({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-sora" });
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-manrope",
});
const syne = Syne({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-syne" });

export const FONTS: Record<FontId, NextFontWithVariable> = {
  inter,
  "space-grotesk": spaceGrotesk,
  sora,
  manrope,
  syne,
};
