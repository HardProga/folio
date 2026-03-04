import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { skills } from "@/lib/data";

const allSkills = [
  ...skills.frontend,
  ...skills.mobile,
  ...skills.backend,
  ...skills.tools,
  ...skills.core,
];

const infoCards = [
  { icon: MapPin, label: "Location", value: "Accra, Ghana" },
  { icon: Briefcase, label: "Experience", value: "3+ Years" },
  { icon: GraduationCap, label: "Focus", value: "Full-Stack & Mobile" },
];

export default function About() {
  return (
    <section className="pt-28 pb-32 relative min-h-screen">
      <div className="orb orb-green w-[600px] h-[600px] -right-48 top-20 animate-pulse-slow" />
      <div className="orb orb-blue w-[500px] h-[500px] -left-48 bottom-40 animate-pulse-slow" />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        {/* Avatar + header */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent/30 to-green/30 p-[2px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text-accent tracking-[-0.02em]">
                GO
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-[3.25rem] font-bold text-foreground tracking-[-0.04em] mb-3 leading-tight">
            George Oti-Adjei
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-8 font-medium">
            Mobile &amp; Software Engineer
          </p>
          <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto leading-relaxed font-light tracking-[-0.01em]">
            Building performant, cross-platform applications from Accra, Ghana
          </p>
        </div>

        {/* Bio */}
        <div className="glass-card p-10 sm:p-14 mb-8 animate-fade-up-1">
          <p className="text-[16px] text-foreground/80 leading-[1.7] mb-6">
            I'm a Mobile and Software Engineer based in Accra, Ghana, with 3+
            years of experience building cross-platform applications and
            full-stack systems that serve real users.
          </p>
          <p className="text-[15px] text-muted leading-[1.7] mb-6">
            I specialise in turning ideas into shipped products — working across
            mobile (Flutter, React Native), web (React, Next.js, Astro),
            backend (Node.js, Go), and desktop (Wails). From concept to
            deployment, I handle the full stack.
          </p>
          <p className="text-[15px] text-muted leading-[1.7]">
            When I'm not coding, I stream development sessions on Twitch and
            TikTok, sharing the process and connecting with the dev community.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-up-2">
          {infoCards.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card p-6 text-center">
              <Icon
                size={18}
                strokeWidth={1.5}
                className="mx-auto text-accent mb-3"
              />
              <div className="text-[10px] text-muted uppercase tracking-[0.15em] mb-1">
                {label}
              </div>
              <div className="text-foreground font-medium text-[14px] tracking-[-0.01em]">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* All skills */}
        <div className="glass-card p-10 animate-fade-up-3">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium mb-6 text-center">
            Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full glass text-[11px] font-medium text-muted hover:text-foreground hover:bg-white/[0.08] transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
