import Image from "next/image";
import type { AboutSection } from "@/config/schema";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "./SectionShell";

export function About({ section }: { section: AboutSection }) {
  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <div>
          {section.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-muted mb-5 text-lg leading-relaxed">{paragraph}</p>
            </Reveal>
          ))}

          {section.skills.length > 0 ? (
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {section.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border-line text-muted rounded-full border px-4 py-1.5 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.1} className="flex flex-col gap-8">
          <div className="border-line relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border">
            {section.portrait ? (
              <Image
                src={section.portrait}
                alt={section.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              /* Abstract panel shown until a portrait path is configured */
              <div className="from-accent/30 via-surface to-surface absolute inset-0 bg-gradient-to-br">
                <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full opacity-50">
                  <ellipse
                    cx="100"
                    cy="125"
                    rx="75"
                    ry="26"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="0.8"
                    transform="rotate(-20 100 125)"
                  />
                  <ellipse
                    cx="100"
                    cy="125"
                    rx="92"
                    ry="32"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="0.4"
                    opacity="0.6"
                    transform="rotate(-20 100 125)"
                  />
                  <circle cx="100" cy="125" r="34" fill="var(--accent)" opacity="0.25" />
                  <circle cx="158" cy="100" r="4" fill="var(--accent)" />
                </svg>
              </div>
            )}
          </div>

          {section.stats.length > 0 ? (
            <dl className="grid grid-cols-3 gap-4">
              {section.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-accent text-3xl font-bold">{stat.value}</dd>
                  <dd className="text-muted mt-1 text-xs leading-snug">{stat.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Reveal>
      </div>
    </SectionShell>
  );
}
