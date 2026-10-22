"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal, SplitHeading, SpotlightCard, ease } from "./ui/motion";

const spans = ["lg:col-span-2", "", "", "lg:col-span-2", "lg:col-span-3"];

function SignalRings() {
  return (
    <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-56 w-56">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-primary/40"
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 3.6, delay: i * 1.2, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
          <SplitHeading text="The stack, end to end." className="text-5xl sm:text-7xl" />
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-muted lg:justify-self-end">
              Everything between the sensor and the screen: devices, protocols, services, and the interfaces people
              use every day.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08} className={cn(spans[i], i === 4 && "sm:col-span-2")}>
              <SpotlightCard className="h-full">
                <div className="relative h-full overflow-hidden p-7 sm:p-9">
                  {group.category === "IoT & Real-time" && <SignalRings />}
                  <h3 className="relative font-display text-3xl font-semibold tracking-tight">{group.category}</h3>
                  <p className="relative mt-2 max-w-sm text-muted">{group.blurb}</p>
                  <ul className="relative mt-8 flex flex-wrap gap-2">
                    {group.skills.map((skill, j) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 + j * 0.05, ease }}
                        whileHover={{ y: -3 }}
                        className="cursor-default rounded-xl bg-white/[0.05] px-4 py-2 text-sm font-medium text-foreground/85 ring-1 ring-white/[0.06] transition-colors hover:bg-primary/10 hover:text-primary hover:ring-primary/30"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
