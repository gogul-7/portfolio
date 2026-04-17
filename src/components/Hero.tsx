"use client";

import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import Image from "next/image";
import { ArrowRight, Code2, Link, Mail, X } from "lucide-react";

const techTags = [
  "React.js", "React Native", "Node.js", "MongoDB", "MQTT", "IoT", "Azure AD", "TypeScript"
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-6">
              Available for work
            </span>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Gogul<br />
              <span className="text-gray-400">Krishna</span>
              <span className="text-purple-500">.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              I build scalable web, mobile, and real-time IoT systems with expertise in React.js, Node.js, and enterprise-grade monitoring solutions.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contact"
                className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all flex items-center gap-2 group shadow-lg shadow-purple-200"
              >
                Let&apos;s Talk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm"
              >
                View Projects
              </a>
            </div>

            <div className="flex items-center gap-6">
              {[
                { Icon: Code2, href: "https://github.com", label: "GitHub" },
                { Icon: Link, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: X, href: "https://x.com", label: "X/Twitter" },
                { Icon: Mail, href: "mailto:gogul@example.com", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4, color: "#8B5CF6" }}
                  className="text-gray-400 transition-all"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
              {/* Central profile image */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative w-48 h-48 md:w-60 md:h-60">
                  <div className="absolute inset-0 rounded-full animate-border-spin" style={{
                    background: "conic-gradient(from 0deg, #8B5CF6, #6D28D9, #4C1D95, transparent, #8B5CF6)",
                    padding: "4px",
                  }}>
                    <div className="w-full h-full rounded-full bg-white" />
                  </div>
                  {/* Inner image */}
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-white border border-gray-100 z-10">
                    <Image
                      src={logo}
                      alt="Gogul Krishna"
                      width={100}
                      height={100}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Glow behind */}
                  <div className="absolute inset-0 rounded-full animate-pulse-glow -z-10" />
                </div>
              </div>

              {/* Orbiting Tech Tags */}
              {techTags.map((tag, i) => {
                const angle = (360 / techTags.length) * i;
                const rad = (angle * Math.PI) / 180;
                const radius = 170;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);

                return (
                  <motion.div
                    key={tag}
                    className="absolute left-1/2 top-1/2"
                    style={{ x, y }}
                    animate={{ y: [y, y - 8, y] }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="px-3 py-1.5 bg-white/80 backdrop-blur-md border border-white/60 shadow-md rounded-full text-xs font-semibold text-gray-600 whitespace-nowrap -translate-x-1/2 -translate-y-1/2 block">
                      {tag}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
