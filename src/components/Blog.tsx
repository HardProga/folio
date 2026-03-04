"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function Blog() {
  return (
    <section className="py-32 relative">
      <div className="orb orb-blue w-[400px] h-[400px] -left-40 bottom-0 animate-pulse-slow" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-3">
            Blog
          </h2>
          <p className="text-3xl sm:text-4xl font-bold gradient-text">
            Recent Posts
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-1">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              className="group flex items-center justify-between gap-4 p-5 rounded-2xl hover:bg-white/[0.03] transition-all duration-300 cursor-pointer border border-transparent hover:border-white/[0.06]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground font-medium text-sm sm:text-base truncate group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-muted">{post.date}</span>
                <ArrowUpRight
                  size={14}
                  className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
