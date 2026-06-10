"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/config/schema";

/**
 * Work-grid card. When `project.image` is null an abstract cover is
 * generated from the project's `palette` — so the demo ships with zero
 * stock photos and buyers replace covers by dropping files into /public
 * and setting the path.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [from, to] = project.palette;

  const card = (
    <article
      className={`group border-line bg-surface relative h-full overflow-hidden rounded-[var(--radius)] border`}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={
              project.wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `radial-gradient(120% 140% at 20% 0%, ${from} 0%, ${to} 65%, ${to} 100%)`,
            }}
          >
            {/* Orbit motif */}
            <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full opacity-40">
              <ellipse
                cx="200"
                cy="125"
                rx="150"
                ry="50"
                fill="none"
                stroke="white"
                strokeWidth="0.75"
                transform="rotate(-18 200 125)"
              />
              <circle cx="320" cy="80" r="4" fill="white" />
            </svg>
            <span className="font-heading absolute right-5 bottom-4 text-7xl font-bold text-white/15 select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-3 p-6">
        <div className="text-muted flex items-center justify-between text-xs tracking-wide uppercase">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-heading text-xl font-bold tracking-tight md:text-2xl">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">{project.description}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border-line text-muted rounded-full border px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open case study: ${project.title}`}
          className="absolute inset-0"
        >
          <span className="sr-only">{project.title}</span>
        </a>
      ) : null}
    </article>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={project.wide ? "md:col-span-2" : ""}
    >
      {card}
    </motion.div>
  );
}
