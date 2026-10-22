"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { Magnetic, Reveal, SplitHeading, ease } from "./ui/motion";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SplitHeading text="Let's build something live." className="text-[clamp(3rem,8.5vw,7.5rem)]" />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-foreground/80">
            Have a project in mind, a system that needs to talk in real time, or a role to fill? My inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-5 text-lg font-semibold text-background active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <Mail className="relative h-5 w-5" />
              <span className="relative">{profile.email}</span>
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy email address"
            className="relative grid h-16 w-16 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 transition-colors hover:bg-white/[0.1] active:scale-90"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "done" : "copy"}
                initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? <Check className="h-5 w-5 text-primary" /> : <Copy className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-10 whitespace-nowrap rounded-lg bg-foreground px-3 py-1 text-xs font-semibold text-background"
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a
            href={profile.phoneHref}
            className="flex items-center gap-2 rounded-full px-5 py-4 text-foreground/80 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" /> {profile.phone}
          </a>
        </Reveal>

        <ul className="mt-24">
          {socials.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between overflow-hidden border-t border-white/[0.08] py-6 sm:py-8"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03] transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <span className="relative font-display text-4xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-4 sm:text-6xl">
                  {s.label}
                </span>
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-white/[0.06] transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-background sm:h-16 sm:w-16">
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
