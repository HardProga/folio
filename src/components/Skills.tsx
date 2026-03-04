import { skills } from "@/lib/data";
import { useInView } from "@/lib/useInView";
import SectionHeading from "./SectionHeading";

const groups = [
  { label: "Frontend", items: skills.frontend, color: "#2997ff" },
  { label: "Mobile", items: skills.mobile, color: "#30d158" },
  { label: "Backend", items: skills.backend, color: "#bf5af2" },
  { label: "Tools & DevOps", items: skills.tools, color: "#ff9f0a" },
  { label: "Core Skills", items: skills.core, color: "#ff375f" },
];

export default function Skills() {
  const { ref, visible } = useInView();

  return (
    <section className="section-shell relative" ref={ref}>
      <div className="orb orb-purple w-[500px] h-[500px] -left-48 top-20 animate-pulse-slow" />

      <div className="section-container relative z-10">
        <SectionHeading
          tag="Skills & Expertise"
          title="A comprehensive toolkit for modern product development"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, gi) => (
            <div
              key={g.label}
              className={`glass-card p-7 transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${gi * 80}ms` }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: g.color }}
                />
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/70">
                  {g.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-200 border"
                    style={{
                      borderColor: `${g.color}18`,
                      color: g.color,
                      background: `${g.color}08`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
