import Image from "next/image";
import { siteConfig } from "@/config/site.config";

/**
 * Static stand-in for the 3D stage on low-power / reduced-motion
 * devices. Uses `hero.poster` when configured, otherwise a CSS orbit
 * motif tinted by the theme accent — never a blank hero, never jank.
 */
export function HeroPoster() {
  const poster = siteConfig.hero.poster;

  if (poster) {
    return (
      <div className="absolute inset-0">
        <Image src={poster} alt="" fill priority className="object-cover" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(90% 70% at 70% 30%, color-mix(in srgb, var(--accent) 22%, transparent) 0%, transparent 60%)",
      }}
    >
      <svg viewBox="0 0 1440 900" className="h-full w-full opacity-60" preserveAspectRatio="xMidYMid slice">
        <ellipse
          cx="900"
          cy="380"
          rx="430"
          ry="150"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.2"
          opacity="0.55"
          transform="rotate(-18 900 380)"
        />
        <ellipse
          cx="900"
          cy="380"
          rx="520"
          ry="190"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.6"
          opacity="0.35"
          transform="rotate(-18 900 380)"
        />
        <circle cx="900" cy="380" r="120" fill="var(--accent)" opacity="0.16" />
        <circle cx="1255" cy="255" r="7" fill="var(--accent)" opacity="0.9" />
        <circle cx="585" cy="520" r="4" fill="var(--accent)" opacity="0.6" />
      </svg>
    </div>
  );
}
