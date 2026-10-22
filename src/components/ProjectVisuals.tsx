"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectVisual } from "@/lib/data";

const mint = "#5ef2c8";
const violet = "#8b7cff";

/** Airport floor plan: zones fill and trolleys glide between RFID readers. */
function TimsVisual() {
  const zones = [
    { x: 20, y: 20, w: 150, h: 90, label: "Zone A", fill: 0.72 },
    { x: 180, y: 20, w: 200, h: 90, label: "Zone B", fill: 0.4 },
    { x: 20, y: 120, w: 100, h: 140, label: "Zone C", fill: 0.9 },
    { x: 130, y: 120, w: 250, h: 140, label: "Departures", fill: 0.55 },
  ];
  const paths = [
    "M60 70 L250 70 L250 190 L330 190",
    "M70 220 L70 160 L200 160 L200 60",
    "M340 230 L170 230 L170 80 L100 80",
  ];

  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" role="img" aria-label="Animated airport floor plan with trolleys moving between zones">
      {zones.map((z, i) => (
        <g key={z.label}>
          <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
          <motion.rect
            x={z.x}
            y={z.y + z.h}
            width={z.w}
            rx="10"
            fill={i === 2 ? violet : mint}
            fillOpacity={0.12}
            initial={{ height: 0, y: z.y + z.h }}
            whileInView={{ height: z.h * z.fill, y: z.y + z.h - z.h * z.fill }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
          <text x={z.x + 12} y={z.y + 22} fill="rgba(238,240,244,0.6)" fontSize="11" fontFamily="var(--font-inter)">
            {z.label}
          </text>
        </g>
      ))}
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(94,242,200,0.15)" strokeDasharray="3 5" />
          <circle r="5" fill={i === 1 ? violet : mint}>
            <animateMotion dur={`${6 + i * 2}s`} repeatCount="indefinite" path={d} rotate="auto" />
          </circle>
          <circle r="11" fill={i === 1 ? violet : mint} opacity="0.2">
            <animateMotion dur={`${6 + i * 2}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {[
        [250, 70],
        [200, 160],
        [170, 230],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="4" fill="#06070a" stroke={mint} strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="4" fill="none" stroke={mint}>
            <animate attributeName="r" values="4;16" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/** Parking level: slots flip between free and occupied as camera events arrive. */
function CpgsVisual() {
  const total = 24;
  const [occupied, setOccupied] = useState<boolean[]>(() =>
    Array.from({ length: total }, (_, i) => [1, 2, 5, 7, 8, 11, 14, 15, 18, 20, 21].includes(i))
  );
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setOccupied((prev) => {
        const next = [...prev];
        const i = Math.floor(Math.random() * total);
        next[i] = !next[i];
        return next;
      });
    }, 900);
    return () => clearInterval(t);
  }, [reduce]);

  const free = occupied.filter((o) => !o).length;

  return (
    <div className="flex h-full w-full flex-col justify-center gap-5 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">Level 2 · Camera feed</span>
        <span className="flex items-baseline gap-2 rounded-lg bg-black/60 px-3 py-1.5 font-mono text-sm ring-1 ring-white/10">
          <span className="text-muted">FREE</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={free}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="font-bold tabular-nums text-primary"
            >
              {String(free).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {occupied.map((taken, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.025, duration: 0.4 }}
            className="relative aspect-[3/4] overflow-hidden rounded-md bg-white/[0.03] ring-1 ring-white/[0.06]"
          >
            <motion.div
              animate={{ opacity: taken ? 1 : 0, y: taken ? "0%" : "-40%" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute inset-[18%] rounded-[4px] bg-violet/70"
            />
            <motion.span
              animate={{ backgroundColor: taken ? "#ef4444" : mint }}
              className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Number plate under a scanning beam, recognised character by character. */
const plates = ["KA 05 MX 4821", "KA 01 AB 7730", "KL 07 CE 2210"];

function AnprVisual() {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const reduce = useReducedMotion();
  const plate = plates[index];

  useEffect(() => {
    if (reduce) return;
    if (shown < plate.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 110);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % plates.length);
      setShown(0);
    }, 2200);
    return () => clearTimeout(t);
  }, [shown, plate, reduce]);

  const visible = reduce ? plate.length : shown;
  const done = visible >= plate.length;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-6">
      <div className="relative w-full max-w-[300px] [--scan-distance:72px]">
        <div className="relative overflow-hidden rounded-xl bg-[#f5f5f0] px-4 py-5 text-center ring-4 ring-black/40">
          <p className="whitespace-nowrap font-mono text-xl font-bold tracking-[0.08em] text-[#111] sm:text-2xl">{plate}</p>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 animate-scan bg-primary shadow-[0_0_20px_4px_rgba(94,242,200,0.7)]" />
        </div>
        {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "left-0 bottom-0 border-b-2 border-l-2", "right-0 bottom-0 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute -m-3 h-5 w-5 border-primary ${c}`} />
        ))}
      </div>
      <div className="w-full max-w-[300px] rounded-xl bg-black/50 p-4 font-mono text-xs ring-1 ring-white/10">
        <p className="text-muted">
          read: <span className="text-foreground">{plate.slice(0, visible)}</span>
          {!done && <span className="animate-blink text-primary">▌</span>}
        </p>
        <motion.p animate={{ opacity: done ? 1 : 0.25 }} className="mt-1 text-muted">
          match: <span className={done ? "text-primary" : ""}>{done ? "98.6% · gate opens" : "searching…"}</span>
        </motion.p>
      </div>
    </div>
  );
}

export function ProjectVisualView({ type }: { type: ProjectVisual }) {
  if (type === "tims") return <TimsVisual />;
  if (type === "cpgs") return <CpgsVisual />;
  return <AnprVisual />;
}
