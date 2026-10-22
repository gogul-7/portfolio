"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import portrait from "../assets/logo.jpg";
import { profile, socials } from "@/lib/data";
import { LiveFeed } from "./LiveFeed";
import { Magnetic, ease } from "./ui/motion";

const roles = ["real-time dashboards", "IoT pipelines", "mobile apps", "backend services"];

function AnimatedName({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.04, ease }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative my-1 block overflow-hidden font-display text-3xl tracking-tight sm:text-4xl">
      {/* Sized by the longest role so the text below never jumps */}
      <span className="invisible block whitespace-nowrap font-semibold" aria-hidden>
        {roles[0]}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="absolute left-0 top-0 whitespace-nowrap font-semibold text-primary"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle 3D tilt on the portrait
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 lg:pt-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mb-6 flex items-center gap-2 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 animate-ping-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for work
            <span className="text-white/20">/</span>
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </motion.p>

          <h1 className="font-display text-[clamp(3.5rem,11vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.05em]">
            <AnimatedName text="Gogul" delay={0.2} />
            <span className="block text-gradient">
              <AnimatedName text="Krishna" delay={0.45} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 sm:text-xl"
          >
            Full stack developer building
            <RotatingRole />
            with React, React Native and Node.js — running in production at Bengaluru&apos;s Kempegowda
            International Airport.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#contact"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-4 font-semibold text-background transition-transform active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative">Let&apos;s talk</span>
                <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                className="block rounded-full bg-white/[0.06] px-7 py-4 font-semibold text-foreground ring-1 ring-white/10 transition-colors hover:bg-white/[0.1] active:scale-95"
              >
                See the work
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-10 flex gap-6 text-sm"
          >
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-[440px] [perspective:1200px]"
        >
          <motion.div
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onPointerLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="border-beam relative aspect-[4/5] rounded-[2rem] p-px"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-1px)] bg-surface">
              <Image
                src={portrait}
                alt="Gogul Krishna sitting by a lake in Bangalore"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 90vw"
                placeholder="blur"
                className="object-cover object-[50%_30%] saturate-[0.85] contrast-[1.05] transition-transform duration-[1.5s] ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent" />
              <div className="absolute inset-0 bg-violet/10 mix-blend-color" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 1.2, ease }}
            className="absolute -bottom-10 -left-2 w-[calc(100%+1rem)] sm:-left-12 sm:w-[112%] lg:-left-10 lg:w-[108%]"
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <LiveFeed />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease }}
            className="absolute right-3 top-6 sm:-right-8 sm:top-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl bg-surface/80 px-4 py-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
            >
              <p className="font-display text-2xl font-bold leading-none">3+ yrs</p>
              <p className="mt-1 text-xs text-muted">shipping to production</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted lg:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
