import type { WorkSection } from "@/config/schema";
import { siteConfig } from "@/config/site.config";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionShell } from "./SectionShell";

export function Work({ section }: { section: WorkSection }) {
  return (
    <SectionShell
      id={section.id}
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {siteConfig.projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}
