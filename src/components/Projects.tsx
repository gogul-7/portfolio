"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects } from "@/lib/data";
import { ProjectVisualView } from "./ProjectVisuals";
import { Reveal, SplitHeading, SpotlightCard } from "./ui/motion";

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Earlier cards shrink and dim slightly as later ones stack on top of them
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.05]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - index - 1) * 0.25]);
  const flip = index % 2 === 1;

  return (
    <div className="lg:sticky" style={{ top: `calc(7rem + ${index * 28}px)` }}>
      <motion.article style={{ scale }} className="relative origin-top">
        <SpotlightCard color={flip ? "139, 124, 255" : "94, 242, 200"} className="shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)]">
          <div className={`grid lg:min-h-[480px] lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="flex flex-col p-7 sm:p-10">
              <p className="font-display text-sm font-semibold text-primary">{project.short}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 leading-relaxed text-foreground/75">{project.description}</p>

              <ul className="mt-6 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-foreground/90">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-primary" aria-hidden>
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-primary/15 hover:text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative m-2 min-h-[300px] overflow-hidden rounded-[1.25rem] bg-[#090b10]">
              <div className="grid-bg opacity-60 [mask-image:none]" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <ProjectVisualView type={project.visual} />
              </div>
              <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-foreground/80 ring-1 ring-white/10 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                In production
              </span>
            </div>
          </div>
        </SpotlightCard>
        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-background"
        />
      </motion.article>
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SplitHeading text="Systems running in the real world." className="max-w-3xl text-5xl sm:text-7xl" />
          <Reveal delay={0.2}>
            <p className="max-w-xs text-lg leading-relaxed text-muted">
              Three production systems, from airport trolleys to car parks that read your number plate.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="space-y-8 lg:space-y-[18vh]">
          {projects.map((project, i) => (
            <ProjectCard key={project.short} project={project} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
