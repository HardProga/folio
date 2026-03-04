"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function Portfolio() {
  const featured = projects.slice(0, 6);

  return (
    <section id="portfolio" className="py-32 relative">
      <div className="orb orb-green w-[400px] h-[400px] right-0 top-40 animate-pulse-slow" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-3">
            Selected Work
          </h2>
          <p className="text-3xl sm:text-4xl font-bold gradient-text">
            My Amazing Work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-card overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `radial-gradient(circle at 70% 30%, ${project.color}, transparent 60%)`,
                  }}
                />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="text-2xl font-bold text-foreground/90">
                    {project.title}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs text-muted">{project.year}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass text-sm font-medium text-foreground/90 hover:bg-white/10 transition-all duration-300 group"
          >
            See All Projects
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
