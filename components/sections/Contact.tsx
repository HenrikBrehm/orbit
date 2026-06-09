import type { ContactSection } from "@/config/schema";
import { siteConfig } from "@/config/site.config";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { SectionShell } from "./SectionShell";

export function Contact({ section }: { section: ContactSection }) {
  const { contact } = siteConfig;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="text-muted max-w-md text-lg leading-relaxed">{section.blurb}</p>
          <a
            href={`mailto:${contact.email}`}
            className="font-heading hover:text-accent mt-8 block text-2xl font-bold tracking-tight break-all transition-colors md:text-3xl"
          >
            {contact.email}
          </a>
          {contact.availability ? (
            <p className="text-muted mt-6 inline-flex items-center gap-2 text-sm">
              <span className="bg-accent inline-block size-2 animate-pulse rounded-full" />
              {contact.availability}
            </p>
          ) : null}
        </Reveal>

        {contact.form.enabled ? (
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        ) : null}
      </div>
    </SectionShell>
  );
}
