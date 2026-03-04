import { useState } from "react";
import { projects, categories } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export default function Works() {
  const [active, setActive] = useState<string>("ALL");

  const filtered =
    active === "ALL"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="pt-28 pb-32 relative min-h-screen">
      <div className="orb orb-blue w-[600px] h-[600px] -right-48 top-20 animate-pulse-slow" />
      <div className="orb orb-purple w-[500px] h-[500px] -left-48 bottom-40 animate-pulse-slow" />

      <div className="mx-auto max-w-[1120px] px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl sm:text-[3.5rem] font-bold tracking-[-0.04em] gradient-text mb-4 leading-tight">
            My Work
          </h1>
          <p className="text-muted text-[15px] max-w-md mx-auto">
            A collection of projects I've designed and developed
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14 animate-fade-up-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.04em] transition-all duration-300 cursor-pointer ${
                active === cat
                  ? "bg-foreground text-background"
                  : "glass text-muted hover:text-foreground hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-sm">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
