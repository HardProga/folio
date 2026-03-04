import {
  Smartphone,
  Globe,
  Server,
  Monitor,
  GitBranch,
  MessageSquare,
} from "lucide-react";
import type { ElementType } from "react";
import { services } from "@/lib/data";
import { useInView } from "@/lib/useInView";
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
  const { ref, visible } = useInView();

  return (
    <section className="section-shell relative" ref={ref}>
      <div className="orb orb-blue w-[500px] h-[500px] -right-48 top-0 animate-pulse-slow" />

      <div className="section-container relative z-10">
        <SectionHeading
          tag="What I Do"
          title="End-to-end engineering across mobile, web, backend, and desktop"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <div
                key={s.title}
                className={`glass-card p-8 group transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-accent"
                  />
                </div>
                <h3 className="text-[15px] font-semibold text-foreground tracking-[-0.01em] mb-2">
                  {s.title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
