"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "LIQUIDLAB INFOSYSTEMS LLP, Bengaluru",
    period: "Apr 2025 - Present",
    description: "Designing and developing end-to-end IoT-based systems integrating frontend dashboards, backend services, and hardware devices. Building scalable real-time monitoring solutions for enterprise clients.",
    details: [
      "Built scalable React dashboards for real-time asset & parking monitoring",
      "Developed Node.js backend services for high-frequency data streams",
      "Implemented MQTT-based device-to-server communication pipelines",
      "Integrated UDP communication for real-time display systems",
      "Designed APIs for RFID and ANPR-based tracking systems",
      "Implemented role-based auth using Azure Active Directory",
    ],
  },
  {
    role: "Frontend Developer",
    company: "PARKQWIK, Bengaluru",
    period: "Jun 2023 - Apr 2025",
    description: "Developed scalable web and mobile applications using React.js and React Native. Built reusable UI components and improved frontend architecture, delivering high-performance user experiences.",
    details: [
      "Deployed React Native app with 1000+ active users on Play Store",
      "Built reusable UI component library for consistent design",
      "Integrated REST APIs with optimized performance",
      "Improved application responsiveness and load times",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "LUMINAR TECHNOLAB, Kochi",
    period: "Jun 2022 - Dec 2022",
    description: "Built full-stack applications using React.js and Node.js. Worked with MongoDB and SQL databases for efficient data management and assisted in cloud deployment workflows.",
    details: [
      "Built full-stack apps with React.js and Node.js",
      "Managed MongoDB and SQL databases",
      "Assisted in AWS-based cloud deployment workflows",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16">
          <span className="text-purple-600 font-semibold tracking-wider text-sm uppercase mb-3">Work History</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Professional Experience.</h2>
        </div>

        <div className="space-y-12 max-w-4xl">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-12 border-l border-gray-200 group"
            >
              <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-purple-100 border-2 border-purple-400 group-hover:scale-125 transition-transform" />

              <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-xl transition-all">
                <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-purple-600 font-medium">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-lg text-gray-500 mb-8 leading-relaxed">{exp.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {exp.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-300 mt-2.5 shrink-0" />
                      <span className="text-gray-500 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
