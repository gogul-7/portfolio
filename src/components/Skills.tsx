"use client";

import { motion } from "framer-motion";
import { Code, Database, Layout, Palette, Server, Smartphone } from "lucide-react";

const skillGroups = [
  {
    category: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    category: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "Python", "Django", "GraphQL", "Socket.io"],
    color: "bg-green-50 text-green-600",
  },
  {
    category: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle", "Firebase"],
    color: "bg-purple-50 text-purple-600",
  },
  {
    category: "Mobile & Tools",
    icon: Smartphone,
    skills: ["Flutter", "React Native", "Docker", "AWS", "Git", "Vercel"],
    color: "bg-pink-50 text-pink-600",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-20 items-center text-center">
          <span className="text-purple-600 font-semibold tracking-wider text-sm uppercase mb-3">
            Modern Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Technologies I Use.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl ${group.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <group.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-gray-400">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-500 hover:bg-purple-50 hover:border-purple-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
