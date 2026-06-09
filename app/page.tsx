import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { siteConfig } from "@/config/site.config";
import type { Section } from "@/config/schema";

/** Sections render in the order they appear in `siteConfig.sections`. */
function renderSection(section: Section) {
  switch (section.type) {
    case "about":
      return <About key={section.id} section={section} />;
    case "work":
      return <Work key={section.id} section={section} />;
    case "services":
      return <Services key={section.id} section={section} />;
    case "contact":
      return <Contact key={section.id} section={section} />;
  }
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {siteConfig.sections.map(renderSection)}
      </main>
      <Footer />
    </>
  );
}
