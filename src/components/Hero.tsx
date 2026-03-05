import { useState } from "react";
import { ArrowDown, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Github,   href: "https://github.com",   label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com",  label: "LinkedIn" },
  { icon: Twitch,   href: "https://twitch.tv",     label: "Twitch" },
  { icon: Youtube,  href: "https://youtube.com",   label: "YouTube" },
];

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24">
      <div className="relative z-10 section-container flex flex-col items-center text-center">

        {/* ── Top: Professional Portrait ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto mb-16"
        >
          {/* Portrait container */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-surface aspect-[16/9] flex items-center justify-center">
            {photoMissing ? (
              <div className="p-8 text-center">
                <p className="text-[15px] text-muted">
                  Add your professional image as{" "}
                  <span className="text-foreground font-medium">public/portrait.png</span>
                </p>
              </div>
            ) : (
              <img
                src="/portrait.png"
                alt="Professional studio portrait"
                className="w-full h-full object-cover object-top"
                onError={() => setPhotoMissing(true)}
              />
            )}
          </div>
        </motion.div>

        {/* ── Bottom: Copy & CTAs ── */}
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Overline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-foreground text-white text-[11px] font-semibold tracking-[0.08em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              Mobile &amp; Software Engineer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-6 text-foreground"
          >
            Building Apps <br />
            People Actually Use.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[17px] sm:text-[21px] text-muted max-w-2xl mx-auto mb-10 leading-relaxed tracking-tight"
          >
            Full-stack and mobile engineer with 3+ years shipping cross-platform
            applications for web, mobile, and desktop. I also stream for fun.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto"
          >
            <a href="#portfolio" className="btn-primary w-full sm:w-auto px-8 py-3.5 text-[15px]">View My Work</a>
            <a href="#contact" className="btn-secondary w-full sm:w-auto px-8 py-3.5 text-[15px]">Get in Touch</a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-black/[0.06] transition-all duration-300"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
        >
          <a href="#stats" className="inline-block animate-bounce p-2">
            <ArrowDown size={20} className="text-muted/40 hover:text-foreground transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}