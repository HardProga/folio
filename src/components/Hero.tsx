import { useState } from "react";
import { ArrowDown, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import HeroScene from "./HeroScene";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitch, href: "https://twitch.tv", label: "Twitch" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-14">
      <div className="orb orb-blue w-[700px] h-[700px] -top-48 -right-48 animate-pulse-slow" />
      <div className="orb orb-purple w-[600px] h-[600px] -bottom-32 -left-48 animate-pulse-slow" />
      <div className="orb orb-green w-[350px] h-[350px] top-1/3 left-1/2 animate-pulse-slow" />

      <div className="relative z-10 section-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="text-center lg:text-left">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[11px] text-muted tracking-wide mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                Mobile &amp; Software Engineer
              </span>
            </div>

            <h1 className="text-[2.8rem] sm:text-[4rem] xl:text-[5.4rem] font-bold tracking-[-0.045em] leading-[0.92] mb-6 animate-fade-up-1">
              <span className="gradient-text">Building Apps</span>
              <br />
              <span className="gradient-text-accent">People Actually Use.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-xl lg:max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed tracking-[-0.01em] animate-fade-up-2">
              Full-stack and mobile engineer with 3+ years shipping cross-platform
              applications for web, mobile, and desktop. I also stream for fun.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-10 animate-fade-up-3">
              <a href="#portfolio" className="btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 animate-fade-up-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-white/[0.08] transition-all duration-300"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5 animate-fade-up-4">
            <HeroScene />
            <div className="glass-card p-4 sm:p-5">
              {photoMissing ? (
                <div className="h-[230px] rounded-2xl border border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center text-center px-6">
                  <p className="text-sm text-muted">
                    Add your image as <span className="text-foreground">public/selfie.jpg</span> (or update this path) to show your portrait.
                  </p>
                </div>
              ) : (
                <img
                  src="/selfie.jpg"
                  alt="Profile selfie"
                  className="h-[230px] w-full rounded-2xl object-cover"
                  onError={() => setPhotoMissing(true)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center animate-fade-up-5">
          <a href="#stats" className="inline-block animate-bounce">
            <ArrowDown size={18} className="text-muted/50" />
          </a>
        </div>
      </div>
    </section>
  );
}
