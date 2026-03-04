import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { useInView } from "@/lib/useInView";
import SectionHeading from "./SectionHeading";

export default function Blog() {
  const { ref, visible } = useInView();

  return (
    <section className="section-shell relative" ref={ref}>
      <div className="orb orb-blue w-[400px] h-[400px] -left-40 bottom-0 animate-pulse-slow" />

      <div className="section-container relative z-10">
        <SectionHeading tag="Blog" title="Recent Posts" />

        <div className="max-w-2xl mx-auto">
          {blogPosts.map((post, i) => (
            <div
              key={post.title}
              className={`group flex items-center justify-between gap-4 py-4 px-5 -mx-5 rounded-2xl cursor-pointer transition-all duration-500 border border-transparent hover:bg-white/[0.03] hover:border-white/[0.06] ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-[14px] font-medium text-foreground/90 tracking-[-0.01em] truncate group-hover:text-accent transition-colors duration-300 flex-1 min-w-0">
                {post.title}
              </h3>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-muted">{post.date}</span>
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="text-muted/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
