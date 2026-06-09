import type { ColorTokens } from "@/config/schema";
import { siteConfig } from "@/config/site.config";

/** Maps config color tokens to the CSS custom properties Tailwind consumes. */
const VAR_MAP: Record<keyof ColorTokens, string> = {
  background: "--background",
  surface: "--surface",
  text: "--text",
  muted: "--muted",
  accent: "--accent",
  accentContrast: "--accent-contrast",
  border: "--border",
};

function cssVarsFor(tokens: ColorTokens): string {
  return (Object.keys(VAR_MAP) as Array<keyof ColorTokens>)
    .map((key) => `${VAR_MAP[key]}:${tokens[key]};`)
    .join("");
}

/**
 * CSS for both theme modes, generated from the config and injected
 * server-side in the root layout — switching mode is just flipping the
 * `data-theme` attribute on <html>; recoloring the site is editing
 * `theme.colors` in site.config.ts.
 */
export function themeCss(): string {
  const { colors, radius } = siteConfig.theme;
  return [
    `:root{--radius:${radius};}`,
    `:root[data-theme="dark"]{${cssVarsFor(colors.dark)}}`,
    `:root[data-theme="light"]{${cssVarsFor(colors.light)}}`,
  ].join("\n");
}
