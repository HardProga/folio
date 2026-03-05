import { useState } from "react";
import { ArrowDown, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";

const socials = [
  { icon: Github,   href: "https://github.com",   label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com",  label: "LinkedIn" },
  { icon: Twitch,   href: "https://twitch.tv",     label: "Twitch" },
  { icon: Youtube,  href: "https://youtube.com",   label: "YouTube" },
];

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden py-20">
      <div className="relative z-10 section-container">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">

          {/* ── Left: Text ── */}
          <div className="text-center lg:text-left">

            {/* Overline badge */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-[11px] text-muted tracking-wide mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                Mobile &amp; Software Engineer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="text-[2.6rem] sm:text-[3.8rem] xl:text-[5rem] font-bold tracking-[-0.048em] leading-[0.94] mb-6 text-foreground"
            >
              Building Apps
              <br />
              <span className="text-accent">People Actually</span>
              <br />
              Use.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="text-[15px] sm:text-[17px] text-muted max-w-xl lg:max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed tracking-[-0.01em]"
            >
              Full-stack and mobile engineer with 3+ years shipping cross-platform
              applications for web, mobile, and desktop. I also stream for fun.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-10"
            >
              <a href="#portfolio" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">Get in Touch</a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-black/[0.06] transition-all duration-200"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D + Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <HeroScene />

            {/* Profile photo card */}
            <div className="glass-card p-3.5">
              {photoMissing ? (
                <div className="h-[200px] rounded-[14px] border border-dashed border-black/[0.1] bg-surface flex items-center justify-center text-center px-6">
                  <p className="text-[13px] text-muted">
                    Add your image as{" "}
                    <span className="text-foreground font-medium">public/selfie.jpg</span>{" "}
                    to show your portrait.
                  </p>
                </div>
              ) : (
                <img
                  src="/selfie.jpg"
                  alt="Profile selfie"
                  className="h-[200px] w-full rounded-[14px] object-cover"
                  onError={() => setPhotoMissing(true)}
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a href="#stats" className="inline-block animate-bounce">
            <ArrowDown size={16} className="text-muted/40" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
