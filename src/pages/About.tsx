import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const allSkills = [
  ...skills.frontend,
  ...skills.mobile,
  ...skills.backend,
  ...skills.tools,
  ...skills.core,
];

const infoCards = [
  { icon: MapPin,        label: "Location",   value: "Accra, Ghana" },
  { icon: Briefcase,     label: "Experience", value: "3+ Years" },
  { icon: GraduationCap, label: "Focus",      value: "Full-Stack & Mobile" },
];

export default function About() {
  return (
    <section className="pt-16 pb-28 min-h-screen">
      <div className="mx-auto max-w-3xl px-6">

        {/* Avatar + header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-24 mx-auto mb-7 rounded-full bg-surface border border-black/[0.06] flex items-center justify-center">
            <span className="text-xl font-bold text-accent tracking-[-0.02em]">GO</span>
          </div>
          <h1 className="text-[2.75rem] sm:text-[3.25rem] font-bold text-foreground tracking-[-0.04em] mb-3 leading-tight">
            George Oti-Adjei
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-8 font-medium">
            Mobile &amp; Software Engineer
          </p>
          <p className="text-[17px] text-muted max-w-xl mx-auto leading-relaxed font-light tracking-[-0.01em]">
            Building performant, cross-platform applications from Accra, Ghana
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="glass-card p-10 sm:p-14 mb-6"
        >
          <p className="text-[16px] text-foreground leading-[1.75] mb-6">
            I'm a Mobile and Software Engineer based in Accra, Ghana, with 3+
            years of experience building cross-platform applications and
            full-stack systems that serve real users.
          </p>
          <p className="text-[15px] text-muted leading-[1.75] mb-6">
            I specialise in turning ideas into shipped products — working across
            mobile (Flutter, React Native), web (React, Next.js, Astro),
            backend (Node.js, Go), and desktop (Wails). From concept to
            deployment, I handle the full stack.
          </p>
          <p className="text-[15px] text-muted leading-[1.75]">
            When I'm not coding, I stream development sessions on Twitch and
            TikTok, sharing the process and connecting with the dev community.
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6"
        >
          {infoCards.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card p-6 text-center">
              <Icon size={17} strokeWidth={1.5} className="mx-auto text-accent mb-3" />
              <div className="text-[10px] text-muted uppercase tracking-[0.15em] mb-1">{label}</div>
              <div className="text-foreground font-semibold text-[14px] tracking-[-0.01em]">{value}</div>
            </div>
          ))}
        </motion.div>

        {/* All skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="glass-card p-10"
        >
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-6 text-center">
            Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full glass text-[11px] font-medium text-muted hover:text-foreground hover:bg-black/[0.05] transition-all duration-200 cursor-default"
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
