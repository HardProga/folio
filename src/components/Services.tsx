"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  Server,
  Monitor,
  GitBranch,
  MessageSquare,
} from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  Server,
  Monitor,
  GitBranch,
  MessageSquare,
};

export default function Services() {
  return (
    <section className="py-32 relative">
      <div className="orb orb-blue w-[400px] h-[400px] -right-40 top-0 animate-pulse-slow" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-3">
            What I Do
          </h2>
          <p className="text-3xl sm:text-4xl font-bold gradient-text max-w-2xl mx-auto">
            End-to-end software engineering across mobile, web, backend, and
            desktop
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                className="glass-card p-8 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-green/20 flex items-center justify-center mb-5 group-hover:from-accent/30 group-hover:to-accent-green/30 transition-all duration-300">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
