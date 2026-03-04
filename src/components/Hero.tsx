"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitch, Youtube } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Orbs */}
      <div className="orb orb-blue w-[600px] h-[600px] -top-40 -right-40 animate-pulse-slow" />
      <div className="orb orb-purple w-[500px] h-[500px] -bottom-20 -left-40 animate-pulse-slow" />
      <div className="orb orb-green w-[300px] h-[300px] top-1/3 left-1/2 animate-pulse-slow" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Mobile &amp; Software Engineer
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="gradient-text">Building Apps</span>
          <br />
          <span className="gradient-text-accent">People Actually Use.</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Full-stack and mobile engineer with 3+ years shipping cross-platform
          applications for web, mobile, and desktop. I also stream for fun.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a
            href="#portfolio"
            className="px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full glass text-sm font-medium text-foreground/90 hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitch, href: "https://twitch.tv" },
            { icon: Youtube, href: "https://youtube.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-white/10 transition-all duration-300"
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="#stats" className="inline-block animate-bounce">
            <ArrowDown size={20} className="text-muted" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
