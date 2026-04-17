"use client";

import { motion } from "framer-motion";
import { Code, Layout, Cpu, Smartphone } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Project Completed", value: "20+" },
  { label: "Global Clients", value: "10+" },
];

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Redux"],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Backend Development",
    icon: Code,
    skills: ["Node.js", "Express", "MongoDB", "SQL", "REST APIs"],
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "IoT & Real-Time Systems",
    icon: Cpu,
    skills: ["MQTT", "UDP", "RFID", "ANPR", "Raspberry Pi"],
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Cloud & DevOps",
    icon: Smartphone,
    skills: ["Azure AD", "AWS", "Play Store Deployment", "CI/CD"],
    color: "bg-pink-500/10 text-pink-600",
  },
];

export function About() {
  return (
    <section id="about" className="py-32 bg-white/50 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16">
          <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-3">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Designing with Purpose, <br/>Building with Passion.</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              Full Stack Developer with 3 years of experience building scalable web, mobile, and real-time systems. 
              Strong expertise in React.js, React Native, Node.js, and MongoDB.
            </p>
            <p className="text-lg text-secondary/80 mb-12 leading-relaxed">
              Hands-on experience in IoT-based architectures, MQTT/UDP communication, and enterprise-grade monitoring systems 
              deployed in production environments including Kempegowda International Airport.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-secondary/60 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {skillCategories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-secondary/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
