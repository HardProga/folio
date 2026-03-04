"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { skills } from "@/lib/data";

export default function AboutPage() {
  const allSkills = [
    ...skills.frontend,
    ...skills.mobile,
    ...skills.backend,
    ...skills.tools,
    ...skills.core,
  ];

  return (
    <section className="pt-28 pb-32 relative min-h-screen">
      <div className="orb orb-green w-[500px] h-[500px] -right-40 top-20 animate-pulse-slow" />
      <div className="orb orb-blue w-[400px] h-[400px] -left-40 bottom-40 animate-pulse-slow" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Avatar */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent/30 to-accent-green/30 p-[2px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-3xl font-bold gradient-text-accent">
                GO
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-3">
            George Oti-Adjei
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-muted mb-8">
            Mobile &amp; Software Engineer
          </p>
          <p className="text-xl sm:text-2xl text-muted max-w-2xl mx-auto leading-relaxed font-light">
            Building performant, cross-platform applications from Accra, Ghana
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          className="glass-card p-10 sm:p-14 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            I&apos;m a Mobile and Software Engineer based in Accra, Ghana, with 3+
            years of experience building cross-platform applications and
            full-stack systems that serve real users.
          </p>
          <p className="text-base text-muted leading-relaxed mb-6">
            I specialise in turning ideas into shipped products — working across
            mobile (Flutter, React Native), web (React, Next.js, Astro),
            backend (Node.js, Go), and desktop (Wails). From concept to
            deployment, I handle the full stack.
          </p>
          <p className="text-base text-muted leading-relaxed">
            When I&apos;m not coding, I stream development sessions on Twitch and
            TikTok, sharing the process and connecting with the dev community.
          </p>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: MapPin,
              label: "Location",
              value: "Accra, Ghana",
            },
            {
              icon: Briefcase,
              label: "Experience",
              value: "3+ Years",
            },
            {
              icon: GraduationCap,
              label: "Focus",
              value: "Full-Stack & Mobile",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
            >
              <item.icon size={20} className="mx-auto text-accent mb-3" />
              <div className="text-xs text-muted uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className="text-foreground font-medium text-sm">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* All skills */}
        <motion.div
          className="glass-card p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent mb-6 text-center">
            Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full glass text-xs font-medium text-muted hover:text-foreground hover:bg-white/10 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
