"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const groups = [
  { label: "Frontend", items: skills.frontend, color: "#2997ff" },
  { label: "Mobile", items: skills.mobile, color: "#30d158" },
  { label: "Backend", items: skills.backend, color: "#bf5af2" },
  { label: "Tools & DevOps", items: skills.tools, color: "#ff9f0a" },
  { label: "Core Skills", items: skills.core, color: "#ff375f" },
];

export default function Skills() {
  return (
    <section className="py-32 relative">
      <div className="orb orb-purple w-[500px] h-[500px] -left-40 top-20 animate-pulse-slow" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-3">
            Skills &amp; Expertise
          </h2>
          <p className="text-3xl sm:text-4xl font-bold gradient-text">
            A comprehensive toolkit for modern product development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              className="glass-card p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium glass hover:bg-white/10 transition-colors duration-200"
                    style={{
                      borderColor: `${group.color}20`,
                      color: group.color,
                    }}
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
