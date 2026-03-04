"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "20+",
    label: "Projects Shipped",
    description: "Successful launches across web, mobile, and desktop",
  },
  {
    number: "10+",
    label: "Happy Clients",
    description: "From startups to established businesses",
  },
  {
    number: "3+",
    label: "Years Experience",
    description: "Continuous learning and growth in the field",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="py-32 relative">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-3">
            By the Numbers
          </h2>
          <p className="text-muted text-base">
            Impact and achievements over the years
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-5xl sm:text-6xl font-bold gradient-text-accent mb-3">
                {stat.number}
              </div>
              <div className="text-foreground font-medium mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-muted">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
