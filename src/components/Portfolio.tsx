import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { projects } from "@/lib/data";
import { useInView } from "@/lib/useInView";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Portfolio() {
  const featured = projects.slice(0, 6);
  const { ref, visible } = useInView();

  return (
    <section id="portfolio" className="py-28 relative" ref={ref}>
      <div className="orb orb-green w-[450px] h-[450px] right-0 top-40 animate-pulse-slow" />

      <div className="mx-auto max-w-[1120px] px-6 relative z-10">
        <SectionHeading tag="Selected Work" title="My Amazing Work" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <div
              key={p.title}
              className={`transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <ProjectCard {...p} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/works"
            className="btn-secondary group"
          >
            See All Projects
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
