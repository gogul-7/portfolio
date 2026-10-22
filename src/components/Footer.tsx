"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import { ease } from "./ui/motion";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pt-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 text-sm text-muted sm:flex-row sm:items-center sm:px-8">
        <p>
          © {year} {profile.name}. Built with Next.js & Framer Motion.
        </p>
        <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-foreground">
          Back to top
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] transition-transform group-hover:-translate-y-1">
            <ArrowUp className="h-4 w-4" />
          </span>
        </a>
      </div>
      <motion.p
        aria-hidden
        initial={{ y: "40%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(238,240,244,0.22), rgba(238,240,244,0))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
        className="mt-8 select-none whitespace-nowrap text-center font-display text-[17.5vw] font-bold leading-[0.8] tracking-[-0.06em] text-transparent"
      >
        GOGUL
      </motion.p>
    </footer>
  );
}
