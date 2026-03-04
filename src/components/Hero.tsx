import { ArrowDown, Github, Linkedin, Twitch, Youtube } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitch, href: "https://twitch.tv", label: "Twitch" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
      {/* Orbs */}
      <div className="orb orb-blue w-[700px] h-[700px] -top-48 -right-48 animate-pulse-slow" />
      <div className="orb orb-purple w-[600px] h-[600px] -bottom-32 -left-48 animate-pulse-slow" />
      <div className="orb orb-green w-[350px] h-[350px] top-1/3 left-1/2 animate-pulse-slow" />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[11px] text-muted tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            Mobile &amp; Software Engineer
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[3.25rem] sm:text-[5rem] lg:text-[6.5rem] font-bold tracking-[-0.04em] leading-[0.92] mb-6 animate-fade-up-1">
          <span className="gradient-text">Building Apps</span>
          <br />
          <span className="gradient-text-accent">People Actually Use.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed tracking-[-0.01em] animate-fade-up-2">
          Full-stack and mobile engineer with 3+ years shipping cross-platform
          applications for web, mobile, and desktop. I also stream for fun.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 animate-fade-up-3">
          <a href="#portfolio" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
        </div>

        {/* Socials */}
        <div className="flex items-center justify-center gap-3 animate-fade-up-4">
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

        {/* Scroll indicator */}
        <div className="mt-20 animate-fade-up-5">
          <a href="#stats" className="inline-block animate-bounce">
            <ArrowDown size={18} className="text-muted/50" />
          </a>
        </div>
      </div>
    </section>
  );
}
