"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children in once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...props
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Section heading whose words rise out of a mask one after another. */
export function SplitHeading({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const words = text.split(" ");
  // Observe the heading, not the words: the words start clipped by their mask,
  // so an observer on them may never report them as visible.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Tag
      ref={ref}
      className={cn("flex flex-wrap font-display font-semibold tracking-[-0.035em] leading-[0.95]", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, delay: i * 0.07, ease }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Card with a soft light that follows the cursor and a brighter edge under it. */
export function SpotlightCard({
  children,
  className,
  color = "94, 242, 200",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(${color}, 0.12), transparent 60%)`;
  const edge = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(${color}, 0.6), transparent 60%)`;

  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={cn("group relative rounded-3xl bg-white/[0.06] p-px", className)}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: edge }} />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-surface">
        <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glow }} />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

/** Pulls its child slightly toward the cursor. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up from zero when it scrolls into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-linear-to-r from-primary via-violet to-primary"
    />
  );
}

/** Fixed backdrop: drifting aurora, masked grid and a glow that trails the cursor. */
export function Backdrop() {
  const x = useSpring(-1000, { stiffness: 60, damping: 20 });
  const y = useSpring(-1000, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(94, 242, 200, 0.06), transparent 70%)`;

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full bg-violet/20 blur-[120px] animate-aurora will-change-transform" />
      <div
        className="absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-primary/10 blur-[120px] animate-aurora will-change-transform"
        style={{ animationDelay: "-6s", animationDuration: "22s" }}
      />
      <div
        className="absolute bottom-[-30%] left-[20%] h-[45vmax] w-[45vmax] rounded-full bg-blue/10 blur-[140px] animate-aurora will-change-transform"
        style={{ animationDelay: "-12s", animationDuration: "26s" }}
      />
      <div className="grid-bg" />
      <motion.div className="absolute inset-0" style={{ background: glow }} />
    </div>
  );
}
