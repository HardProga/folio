import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export default function Works() {
  const [active, setActive] = useState<string>("ALL");

  const filtered =
    active === "ALL"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="pt-16 pb-28 min-h-screen">
      <div className="mx-auto max-w-[1120px] px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-[2.5rem] sm:text-[3.25rem] font-bold tracking-[-0.04em] text-foreground mb-4 leading-tight">
            My Work
          </h1>
          <p className="text-muted text-[15px] max-w-md mx-auto">
            A collection of projects I've designed and developed
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-[12px] font-medium tracking-[0.02em] transition-all duration-200 cursor-pointer ${
                active === cat
                  ? "bg-foreground text-white"
                  : "glass text-muted hover:text-foreground hover:bg-black/[0.05]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-[14px]">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
