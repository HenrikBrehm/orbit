import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site.config";
import { FONTS } from "@/lib/fonts";
import { themeCss } from "@/lib/theme";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const { brand, theme, seo } = siteConfig;

export const metadata: Metadata = {
  title: {
    default: seo.title,
    template: `%s — ${brand.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  metadataBase: seo.url ? new URL(seo.url) : undefined,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    siteName: brand.name,
    ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: theme.colors[theme.defaultMode].background,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headingFont = FONTS[theme.fonts.heading];
  const bodyFont = FONTS[theme.fonts.body];
  const fontCss = `:root{--font-heading-family:${headingFont.style.fontFamily};--font-body-family:${bodyFont.style.fontFamily};}`;

  return (
    <html
      lang="en"
      data-theme={theme.defaultMode}
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <head>
        {/* Config-driven theme + font tokens, rendered server-side (no FOUC) */}
        <style dangerouslySetInnerHTML={{ __html: `${themeCss()}\n${fontCss}` }} />
        {theme.allowModeToggle ? (
          /* Restore the visitor's saved mode before first paint */
          <script
            dangerouslySetInnerHTML={{
              __html: `try{var t=localStorage.getItem("orbit-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
            }}
          />
        ) : null}
      </head>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
