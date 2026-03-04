import { useInView } from "@/lib/useInView";
import SectionHeading from "./SectionHeading";

const stats = [
  { number: "20+", label: "Projects Shipped", sub: "Across web, mobile, and desktop" },
  { number: "10+", label: "Happy Clients", sub: "From startups to established businesses" },
  { number: "3+", label: "Years Experience", sub: "Continuous learning and growth" },
];

export default function Stats() {
  const { ref, visible } = useInView();

  return (
    <section id="stats" className="section-shell relative" ref={ref}>
      <div className="section-container">
        <SectionHeading tag="By the Numbers" title="Impact and achievements over the years" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`glass-card p-10 text-center transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] gradient-text-accent mb-2">
                {s.number}
              </div>
              <div className="text-foreground font-medium text-[15px] mb-1">
                {s.label}
              </div>
              <div className="text-xs text-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
