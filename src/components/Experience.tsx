"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "@/lib/data";
import { Reveal, SplitHeading, SpotlightCard, ease } from "./ui/motion";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SplitHeading text="Where I've built." className="text-5xl sm:text-7xl" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              From an internship in Kochi to IoT systems that run airports and car parks in Bengaluru.
            </p>
          </Reveal>
        </div>

        <div className="relative pl-8 sm:pl-12">
          <div aria-hidden className="absolute bottom-2 left-[5px] top-2 w-[2px] rounded-full bg-white/[0.06] sm:left-[9px]" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-2 left-[5px] top-2 w-[2px] origin-top rounded-full bg-linear-to-b from-primary via-violet to-primary sm:left-[9px]"
          />
        <ol ref={listRef} className="relative space-y-8">

          {experiences.map((exp, i) => (
            <li key={exp.company} className="relative">
              <motion.span
                initial={{ scale: 0.4, opacity: 0.2 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute -left-8 top-9 grid h-3 w-3 place-items-center rounded-full bg-primary shadow-[0_0_0_6px_rgba(94,242,200,0.15)] sm:-left-12 sm:h-5 sm:w-5"
              />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease }}
              >
                <SpotlightCard>
                  <div className="p-7 sm:p-10">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{exp.role}</h3>
                        <p className="mt-1 text-primary">
                          {exp.company} <span className="text-muted">· {exp.place}</span>
                        </p>
                      </div>
                      <p className="text-sm tabular-nums text-muted">{exp.period}</p>
                    </div>
                    <p className="mt-6 leading-relaxed text-foreground/80">{exp.description}</p>
                    <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {exp.details.map((d, j) => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + j * 0.06, ease }}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.div>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
