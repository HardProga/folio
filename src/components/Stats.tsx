import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const stats = [
  { number: "20+", label: "Projects Shipped", sub: "Across web, mobile, and desktop" },
  { number: "10+", label: "Happy Clients", sub: "From startups to established businesses" },
  { number: "3+",  label: "Years Experience", sub: "Continuous learning and growth" },
];

export default function Stats() {
  return (
    <section id="stats" className="section-shell">
      <div className="section-container">
        <SectionHeading tag="By the Numbers" title="Impact and achievements over the years" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
              className="glass-card p-10 text-center"
            >
              <div className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] text-accent mb-2">
                {s.number}
              </div>
              <div className="text-[15px] font-semibold text-foreground mb-1">
                {s.label}
              </div>
              <div className="text-[13px] text-muted">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
