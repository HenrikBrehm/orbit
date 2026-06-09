import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Shared section chrome: anchor, eyebrow, title, optional intro, then
 * the section body. Keeps every section visually consistent.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string | null;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase">{eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {title}
          </h2>
          {intro ? <p className="text-muted mt-5 max-w-xl text-lg">{intro}</p> : null}
        </Reveal>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
