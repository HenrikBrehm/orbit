import type { ServicesSection } from "@/config/schema";
import { siteConfig } from "@/config/site.config";
import { SERVICE_ICONS } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "./SectionShell";

export function Services({ section }: { section: ServicesSection }) {
  return (
    <SectionShell
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.services.map((service, i) => {
          const Icon = SERVICE_ICONS[service.icon];
          return (
            <Reveal key={service.title} delay={i * 0.08} className="h-full">
              <div className="group border-line bg-surface hover:border-accent/60 flex h-full flex-col gap-4 rounded-[var(--radius)] border p-6 transition-colors duration-300">
                <span className="bg-accent/10 text-accent flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-heading text-lg font-bold">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
