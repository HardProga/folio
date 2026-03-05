import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Portfolio() {
  const featured = projects.slice(0, 6);

  return (
    <section id="portfolio" className="section-shell">
      <div className="section-container">
        <SectionHeading tag="Selected Work" title="Projects I'm proud of" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.07 }}
            >
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/works" className="btn-secondary group">
            See All Projects
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
