import { useState } from "react";
import { ArrowRight, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import { motion } from "framer-motion";

// ← Replace with your actual first name
const DISPLAY_NAME = "Developer";

const socials = [
  { icon: Github,   href: "https://github.com",   label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com",  label: "LinkedIn" },
  { icon: Twitch,   href: "https://twitch.tv",     label: "Twitch" },
  { icon: Youtube,  href: "https://youtube.com",   label: "YouTube" },
];

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background flex flex-col">

      {/* ── Subtle Apple-style background orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-[800px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, #f0f0f2 0%, transparent 65%)", opacity: 0.9 }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, #e8e8ea 0%, transparent 65%)", opacity: 0.6 }}
        />
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 flex-1 flex flex-col">

        {/* 3-col grid on desktop, stacked on mobile */}
        <div className="flex-1 section-container grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:items-end pt-24 lg:pt-20 gap-y-8 lg:gap-y-0">

          {/* ── LEFT: badge · headline · socials ── */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left lg:pb-16 gap-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glass availability badge */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-medium text-foreground"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for Work
            </span>

            {/* Headline */}
            <h1 className="text-[2.4rem] sm:text-[2.9rem] lg:text-[2.8rem] font-bold tracking-[-0.035em] leading-[1.06] text-foreground">
              Full-Stack &amp; Mobile<br />
              Developer based<br />
              in [Your City]
            </h1>

            {/* Social icons — glass pills */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-foreground transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── CENTER: floating portrait (z-20 so it overlaps name) ── */}
          <motion.div
            className="relative z-20 order-1 lg:order-2 flex justify-center items-end"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {photoMissing ? (
              <div
                className="w-[260px] h-[360px] sm:w-[300px] sm:h-[420px] lg:w-[320px] lg:h-[560px] rounded-[2.5rem] flex items-center justify-center p-6 text-center"
                style={{ background: "#f5f5f7" }}
              >
                <p className="text-[13px] text-muted leading-relaxed">
                  Add <span className="text-foreground font-medium">public/portrait.png</span>
                  <br />with background removed
                </p>
              </div>
            ) : (
              <img
                src="/portrait2.png"
                alt="Professional portrait"
                className="h-[340px] sm:h-[460px] lg:h-[68vh] lg:max-h-[660px] w-auto object-contain object-bottom"
                style={{
                  filter: "drop-shadow(0 32px 72px rgba(0,0,0,0.13)) drop-shadow(0 8px 24px rgba(0,0,0,0.07))",
                }}
                onError={() => setPhotoMissing(true)}
              />
            )}
          </motion.div>

          {/* ── RIGHT: bio · CTA ── */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-end lg:text-right lg:pb-16 gap-5 order-3"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Bio — glass card on mobile, bare on desktop */}
            <p className="max-w-[260px] sm:max-w-[280px] lg:max-w-[220px] text-[14px] sm:text-[15px] text-muted leading-[1.6] tracking-tight">
              Full-stack and mobile engineer with 3+ years shipping cross-platform
              applications for web, mobile, and desktop. I turn ideas into products people actually love.
            </p>

            {/* Primary CTA — glass-tinted black pill */}
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2.5 text-white text-[14px] font-medium px-5 py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "#1d1d1f",
                boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12)",
              }}
            >
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
              See my works
            </a>

            {/* Ghost link */}
            <a
              href="#contact"
              className="text-[13px] text-muted/70 hover:text-foreground transition-colors tracking-tight"
            >
              Get in touch →
            </a>
          </motion.div>
        </div>

        {/* ── Large display name — sits behind the portrait (z-10) ── */}
        <motion.div
          className="relative z-10 section-container overflow-hidden select-none pointer-events-none -mt-6 sm:-mt-10 lg:-mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-bold text-foreground leading-[0.82] tracking-[-0.04em]"
            style={{ fontSize: "clamp(5.5rem, 19vw, 20rem)" }}
          >
            {DISPLAY_NAME}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
