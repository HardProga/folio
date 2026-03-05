import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Blog() {
  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading tag="Blog" title="Recent Posts" />

        <div className="max-w-2xl mx-auto divide-y divide-black/[0.06]">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              className="group flex items-center justify-between gap-4 py-4 cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              <h3 className="text-[14px] font-medium text-foreground tracking-[-0.01em] truncate flex-1 min-w-0">
                {post.title}
              </h3>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-muted">{post.date}</span>
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="text-muted/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
