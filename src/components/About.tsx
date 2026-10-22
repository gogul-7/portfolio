"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { stats } from "@/lib/data";
import { CountUp, Reveal, SplitHeading } from "./ui/motion";

const statement =
  "Three years of building scalable web, mobile and real-time systems — from React dashboards to the MQTT pipelines and RFID readers feeding them, running in enterprise environments like Kempegowda International Airport.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = statement.split(" ");

  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SplitHeading text="Designing with purpose, building for real time." className="text-4xl sm:text-6xl" />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
                I care about the whole path a signal takes: the device that emits it, the service that moves it, and
                the screen where someone finally makes a decision with it.
              </p>
            </Reveal>
          </div>

          <p ref={ref} className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-[2.1rem]">
            {words.map((word, i) => (
              <Word key={i} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-3xl bg-white/[0.06] sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="group relative bg-surface p-8 sm:p-10">
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              <p className="font-display text-6xl font-bold tracking-tight sm:text-7xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
