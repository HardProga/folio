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
    <section className="relative h-[100svh] overflow-hidden bg-background">

      {/* ── Background gradient orbs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -left-16 w-[85vw] h-[80vh] rounded-full"
          style={{ background: "radial-gradient(ellipse at 20% 20%, #ebebed 0%, transparent 68%)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[60vw] h-[55vh] rounded-full"
          style={{ background: "radial-gradient(ellipse at 80% 80%, #e4e4e6 0%, transparent 65%)" }}
        />
      </div>

      {/* ── Film grain overlay — premium texture ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── Portrait: bottom-anchored, behind the name (z-10) ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {photoMissing ? (
          <div className="w-[280px] h-[420px] sm:w-[340px] sm:h-[520px] flex items-center justify-center p-8 text-center">
            <p className="text-[12px] text-muted leading-relaxed">
              Add <span className="text-foreground font-medium">public/portrait2.png</span>
              <br />with background removed
            </p>
          </div>
        ) : (
          <img
            src="/portrait2.png"
            alt="Portrait"
            className="h-[82svh] sm:h-[88svh] lg:h-[92svh] max-h-[940px] w-auto object-contain object-bottom"
            style={{
              filter:
                "drop-shadow(0 0 0 transparent) drop-shadow(0 20px 48px rgba(0,0,0,0.09)) drop-shadow(0 6px 18px rgba(0,0,0,0.06))",
            }}
            onError={() => setPhotoMissing(true)}
          />
        )}
      </motion.div>

      {/* ── Display name: IN FRONT of image (z-20) ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden pointer-events-none select-none"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.15, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-container">
          <p
            className="font-bold text-foreground leading-[0.82] tracking-[-0.048em] whitespace-nowrap"
            style={{ fontSize: "clamp(5.5rem, 20vw, 22rem)" }}
          >
            {DISPLAY_NAME}
          </p>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════
          DESKTOP text columns (z-30)
      ═══════════════════════════════════ */}
      <div className="hidden lg:block absolute inset-0 z-30 pointer-events-none">
        <div className="section-container h-full pointer-events-none">
          <div className="absolute top-1/2 -translate-y-[55%] left-0 right-0 section-container">
            <div className="grid grid-cols-2 gap-16 pointer-events-auto">

              {/* Left: role + headline + socials */}
              <motion.div
                className="flex flex-col gap-[1.1rem] max-w-[340px]"
                initial={{ opacity: 0, x: -22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted/70 flex items-center gap-2">
                  <span className="text-muted/30">01</span>
                  <span className="inline-block w-5 h-px bg-muted/30" />
                  Mobile &amp; Software Engineer
                </p>

                <h1 className="text-[2.65rem] xl:text-[3rem] font-bold tracking-[-0.036em] leading-[1.04] text-foreground">
                  Full-Stack &amp;<br />
                  Mobile Developer<br />
                  based in [City]
                </h1>

                <div className="flex items-center gap-1.5 mt-0.5">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-muted hover:text-foreground transition-colors duration-200"
                      style={{
                        background: "rgba(255,255,255,0.72)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
                      }}
                    >
                      <Icon size={13} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Right: bio + CTA */}
              <motion.div
                className="flex flex-col gap-5 items-end text-right ml-auto max-w-[260px]"
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[14px] xl:text-[15px] text-muted leading-[1.68] tracking-tight">
                  Full-stack and mobile engineer with 3+ years shipping cross-platform
                  applications. I turn ideas into products people actually love.
                </p>

                <a
                  href="#portfolio"
                  className="group inline-flex items-center gap-2 text-white text-[13.5px] font-medium px-[18px] py-[11px] rounded-full transition-all duration-200 hover:scale-[1.025] active:scale-[0.975]"
                  style={{
                    background: "#1d1d1f",
                    boxShadow: "0 4px 22px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="w-[22px] h-[22px] rounded-full bg-white/12 flex items-center justify-center">
                    <ArrowRight size={11} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                  See my works
                </a>

                <a
                  href="#contact"
                  className="text-[11.5px] tracking-[0.02em] text-muted/50 hover:text-foreground transition-colors duration-200"
                >
                  Get in touch →
                </a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════
          MOBILE layout (z-30)
      ═══════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 z-30 pointer-events-none flex flex-col">

        {/* TOP ZONE: role + headline */}
        <motion.div
          className="pt-[80px] px-6 flex flex-col gap-2 pointer-events-auto"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[9.5px] font-semibold tracking-[0.16em] uppercase text-muted/60 flex items-center gap-2">
            <span className="text-muted/30">01</span>
            <span className="inline-block w-4 h-px bg-muted/30" />
            Mobile &amp; Software Engineer
          </p>
          <h1 className="text-[2rem] sm:text-[2.45rem] font-bold tracking-[-0.035em] leading-[1.06] text-foreground">
            Full-Stack &amp;<br />
            Mobile Developer
          </h1>
        </motion.div>

        {/* SPACER — portrait visible through here */}
        <div className="flex-1" />

        {/* BOTTOM ZONE: bio + CTA + socials */}
        <motion.div
          className="px-6 pb-[5.5rem] sm:pb-[6.5rem] flex flex-col gap-3 pointer-events-auto"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[12.5px] text-muted leading-[1.65] max-w-[230px]">
            3+ years shipping apps for web, mobile &amp; desktop. Products people love.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-1.5 text-white text-[13px] font-medium px-4 py-[10px] rounded-full"
              style={{
                background: "#1d1d1f",
                boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
              }}
            >
              <ArrowRight size={11} strokeWidth={2} />
              See my works
            </a>
            <div className="flex items-center gap-1.5">
              {socials.slice(0, 3).map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-muted"
                  style={{
                    background: "rgba(255,255,255,0.76)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <Icon size={12} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Vertical scroll indicator — desktop right edge ── */}
      <motion.div
        className="hidden lg:flex absolute right-7 bottom-10 z-30 flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        aria-hidden="true"
      >
        <p
          className="text-[8.5px] font-semibold tracking-[0.2em] uppercase text-muted/35"
          style={{ writingMode: "vertical-lr" }}
        >
          Scroll
        </p>
        <div className="w-px h-9 bg-gradient-to-b from-black/18 to-transparent" />
      </motion.div>

    </section>
  );
}
