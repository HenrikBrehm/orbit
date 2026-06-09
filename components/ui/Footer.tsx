import { siteConfig } from "@/config/site.config";
import { SOCIAL_ICONS } from "@/lib/icons";

export function Footer() {
  const { brand, socials } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-line border-t px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-heading text-lg font-bold">{brand.logo.text ?? brand.name}</p>
          <p className="text-muted mt-1 text-sm">{brand.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.platform];
            return (
              <a
                key={social.platform + social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label ?? social.platform}
                className="border-line text-muted hover:text-accent hover:border-accent flex size-10 items-center justify-center rounded-full border transition-colors"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>

        <p className="text-muted text-xs">
          © {year} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
