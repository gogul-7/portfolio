"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Link, Mail, MapPin, Phone, X } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "gogulcp3@gmail.com", link: "mailto:gogulcp3@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9037403283", link: "tel:+919037403283" },
  { icon: MapPin, label: "Location", value: "Bangalore, India", link: "#" },
];

const socialLinks = [
  { icon: Code2, label: "GitHub", link: "https://github.com/gogul-7" },
  { icon: Link, label: "LinkedIn", link: "https://www.linkedin.com/in/gogul-krishna-a1288226b/" },
  { icon: X, label: "Twitter / X", link: "https://x.com/gogulkrishnak" },
];

export function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col mb-16 items-center text-center">
            <span className="text-purple-600 font-semibold tracking-wider text-sm uppercase mb-3">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Let&apos;s Work Together.
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              Have a project in mind or want to discuss a new opportunity? Feel free to reach out through any of these channels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {info.label}
                </h3>
                <p className="font-bold text-lg text-gray-600 group-hover:text-purple-600 transition-colors">
                  {info.value}
                </p>
              </motion.a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all flex items-center gap-3 font-bold text-gray-600 hover:text-purple-600 group"
              >
                <social.icon className="w-5 h-5" />
                {social.label}
                <ArrowUpRight className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
