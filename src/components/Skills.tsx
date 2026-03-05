import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const groups = [
  { label: "Frontend",       items: skills.frontend, color: "#0071e3" },
  { label: "Mobile",         items: skills.mobile,   color: "#1c7d3c" },
  { label: "Backend",        items: skills.backend,  color: "#5856d6" },
  { label: "Tools & DevOps", items: skills.tools,    color: "#ff9500" },
  { label: "Core Skills",    items: skills.core,     color: "#ff3b30" },
];

export default function Skills() {
  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          tag="Skills & Expertise"
          title="A comprehensive toolkit for modern product development"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: gi * 0.07 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: g.color }}
                />
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {g.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium border"
                    style={{
                      borderColor: `${g.color}22`,
                      color: g.color,
                      background: `${g.color}0a`,
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
