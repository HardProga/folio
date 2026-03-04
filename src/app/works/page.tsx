"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories } from "@/lib/data";

export default function WorksPage() {
  const [active, setActive] = useState("ALL");

  const filtered =
    active === "ALL"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="pt-28 pb-32 relative min-h-screen">
      <div className="orb orb-blue w-[500px] h-[500px] -right-40 top-20 animate-pulse-slow" />
      <div className="orb orb-purple w-[400px] h-[400px] -left-40 bottom-40 animate-pulse-slow" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold gradient-text mb-4">
            My Work
          </h1>
          <p className="text-muted text-base max-w-lg mx-auto">
            A collection of projects I&apos;ve designed and developed
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                active === cat
                  ? "bg-white text-black"
                  : "glass text-muted hover:text-foreground hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                className="glass-card overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
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
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
