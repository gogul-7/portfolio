"use client";

import { motion } from "framer-motion";
import { Plane, Camera, Car } from "lucide-react";

const projects = [
  {
    title: "Trolley Inventory Management System (TIMS)",
    description: "RFID-based real-time trolley tracking system deployed at Kempegowda International Airport. Features centralized dashboard for live monitoring, real-time alerts, zone-based inventory tracking with interactive floor plans, and comprehensive analytics.",
    tags: ["React", "Node.js", "RFID", "Azure AD", "MongoDB"],
    icon: Plane,
  },
  {
    title: "Camera-Based Parking Guidance System (CPGS)",
    description: "Real-time parking management system using Raspberry Pi camera devices. Includes live parking slot visualization, MQTT-based communication for real-time updates, and UDP-based display systems for slot availability indicators.",
    tags: ["React", "Node.js", "MQTT", "Raspberry Pi", "UDP"],
    icon: Camera,
  },
  {
    title: "ANPR-Based Parking Management System",
    description: "Ticketless parking system using Automatic Number Plate Recognition. Features vehicle entry-exit tracking, automated tariff calculation, and a fuzzy search system for closest matching vehicle numbers with optimized backend queries.",
    tags: ["React", "Node.js", "ANPR", "MongoDB", "Fuzzy Search"],
    icon: Car,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16">
          <span className="text-purple-600 font-semibold tracking-wider text-sm uppercase mb-3">
            Production Systems
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Key Projects.</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <project.icon className="w-12 h-12 text-gray-100 group-hover:text-purple-100 transition-colors" />
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-500 leading-relaxed min-h-[100px]">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-semibold text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
                <span className="flex items-center gap-2 text-sm font-bold text-purple-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Production System
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
