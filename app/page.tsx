import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/config/site.config";

export default function Home() {
  return (
    <main>
      <Hero />
      {siteConfig.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="border-line flex min-h-screen items-center justify-center border-t"
        >
          <div className="text-center">
            <p className="text-muted text-sm tracking-widest uppercase">{section.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-bold">{section.title}</h2>
            <p className="text-muted mt-2">Section scaffold — built out in Phase 3</p>
          </div>
        </section>
      ))}
    </main>
  );
}
