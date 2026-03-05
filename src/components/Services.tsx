import {
  Smartphone,
  Globe,
  Server,
  Monitor,
  GitBranch,
  MessageSquare,
} from "lucide-react";
import type { ElementType } from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, ElementType> = {
  Smartphone,
  Globe,
  Server,
  Monitor,
  GitBranch,
  MessageSquare,
};

export default function Services() {
  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          tag="What I Do"
          title="End-to-end engineering across mobile, web, backend, and desktop"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.07 }}
                className="glass-card p-7 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-accent/[0.08] flex items-center justify-center mb-5 group-hover:bg-accent/[0.14] transition-colors duration-300">
                  <Icon size={18} strokeWidth={1.5} className="text-accent" />
                </div>
                <h3 className="text-[15px] font-semibold text-foreground tracking-[-0.01em] mb-2">
                  {s.title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
