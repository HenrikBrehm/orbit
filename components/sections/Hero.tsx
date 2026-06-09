"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site.config";
import type { ScrollProgress } from "@/components/three/types";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

/**
 * The hero: a 200vh scroll region with a sticky full-screen stage.
 * GSAP ScrollTrigger scrubs a progress value that the R3F scene reads in
 * its render loop (camera dolly + model rotation), while the copy fades
 * out via a DOM tween.
 */
export function Hero() {
  const wrapper = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const progress = useRef<ScrollProgress>({ value: 0 });

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: wrapper.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress.current.value = self.progress;
        },
      });

      if (siteConfig.hero.scroll.fade && copy.current) {
        gsap.to(copy.current, {
          opacity: 0,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.current,
            start: "top top",
            end: "45% bottom",
            scrub: true,
          },
        });
      }
    },
    { scope: wrapper },
  );

  const { hero } = siteConfig;

  return (
    <section ref={wrapper} id="hero" className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D stage — pointer-events off so scrolling never gets trapped */}
        <div className="pointer-events-none absolute inset-0">
          <HeroCanvas progress={progress.current} />
        </div>

        {/* Copy overlay */}
        <div
          ref={copy}
          className="pointer-events-none relative z-10 flex h-full flex-col justify-end px-6 pb-28 md:px-12 lg:px-20"
        >
          {hero.badge ? (
            <span className="border-line mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs tracking-wide uppercase backdrop-blur-sm">
              <span className="bg-accent inline-block size-1.5 rounded-full" />
              {hero.badge}
            </span>
          ) : null}
          <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight">
            {hero.headline}
          </h1>
          <p className="text-muted mt-6 max-w-xl text-lg md:text-xl">{hero.subheadline}</p>
          <div className="pointer-events-auto mt-10 flex flex-wrap gap-4">
            {hero.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className={
                  cta.variant === "primary"
                    ? "bg-accent text-accent-contrast rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:scale-105"
                    : "border-line rounded-full border px-7 py-3.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-current"
                }
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="text-muted absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs tracking-widest uppercase">
          Scroll
        </div>
      </div>
    </section>
  );
}
