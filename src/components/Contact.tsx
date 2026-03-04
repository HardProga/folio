"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="orb orb-green w-[500px] h-[500px] right-0 -bottom-40 animate-pulse-slow" />
      <div className="orb orb-purple w-[400px] h-[400px] -left-20 top-0 animate-pulse-slow" />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        <motion.div
          className="glass-card p-10 sm:p-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-4">
            Get in Touch
          </h2>
          <p className="text-3xl sm:text-5xl font-bold gradient-text mb-4">
            Let&apos;s Work Together
          </p>
          <p className="text-muted text-base mb-10 max-w-lg mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create
            something amazing together.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-full glass text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/40 transition-colors bg-transparent"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              <Send size={14} />
              Send
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
