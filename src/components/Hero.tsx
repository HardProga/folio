import { useState } from "react";
import { ArrowRight, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DISPLAY_NAME = "Emmanuel";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitch, href: "https://twitch.tv", label: "Twitch" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

// Custom easing for that premium Apple-like smoothness
const customEase = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#fcfcfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      
      {/* ── Background gradient orbs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-16 w-[85vw] h-[80vh] rounded-full bg-[radial-gradient(ellipse_at_20%_20%,_#ebebed_0%,_transparent_68%)]" />
        <div className="absolute -bottom-20 -right-20 w-[60vw] h-[55vh] rounded-full bg-[radial-gradient(ellipse_at_80%_80%,_#e4e4e6_0%,_transparent_65%)]" />
      </div>

      {/* ── Film grain overlay ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── Portrait: Z-10 (Behind the name) ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 origin-bottom"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: customEase }}
      >
        {photoMissing ? (
          <div className="w-[280px] h-[420px] sm:w-[340px] sm:h-[520px] flex items-center justify-center p-8 text-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/50 backdrop-blur-sm mb-10">
            <p className="text-xs text-neutral-400 leading-relaxed">
              Add <span className="text-neutral-800 font-medium">public/portrait2.png</span>
              <br />with background removed
            </p>
          </div>
        ) : (
          <img
            src="/portrait2.png"
            alt="Portrait"
            className="h-[82svh] sm:h-[88svh] lg:h-[92svh] max-h-[940px] w-auto object-contain object-bottom drop-shadow-[0_20px_48px_rgba(0,0,0,0.09)]"
            onError={() => setPhotoMissing(true)}
          />
        )}
      </motion.div>

      {/* ── Display name: Z-20 (IN FRONT of image) ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden pointer-events-none select-none flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
      >
        <div className="w-full max-w-[1400px] px-6 lg:px-12 flex justify-center lg:justify-start">
          <p
            className="font-extrabold pb-10 text-neutral-900 leading-[0.82] tracking-[-0.05em] whitespace-nowrap mix-blend-overlay opacity-90"
            style={{ fontSize: "clamp(5.5rem, 18vw, 20rem)" }}
          >
            {DISPLAY_NAME}
          </p>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════
          DESKTOP layout (Z-30)
      ═══════════════════════════════════ */}
      <div className="hidden lg:block absolute inset-0 z-30 pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto h-full relative px-12">
          <div className="absolute top-1/2 -translate-y-[55%] left-12 right-12 grid grid-cols-2 gap-16 pointer-events-auto">
            
            {/* Left: role + headline + socials */}
            <motion.div
              className="flex flex-col gap-5 max-w-[380px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: customEase }}
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-3">
                <span className="text-neutral-300">01</span>
                <span className="inline-block w-6 h-[1.5px] bg-neutral-200" />
                Mobile & Software Engineer
              </p>

              <h1 className="text-[2.8rem] xl:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-neutral-900">
                Full-Stack &<br />
                Mobile Developer<br />
                <span className="text-neutral-400 font-medium">based in Enugu</span>
              </h1>

              <div className="flex items-center gap-2 mt-2">
                {socials.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 bg-white/70 backdrop-blur-md border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:text-black hover:bg-white transition-colors duration-300"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right: bio + CTA */}
            <motion.div
              className="flex flex-col gap-6 items-end text-right ml-auto max-w-[280px]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: customEase }}
            >
              <p className="text-[15px] xl:text-[16px] text-neutral-600 leading-[1.7] tracking-tight">
                Full-stack and mobile engineer with 3+ years shipping cross-platform applications. I turn ideas into products people actually love.
              </p>

              <div className="flex flex-col items-end gap-3">
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 text-white text-[14px] font-medium px-5 py-3 rounded-full bg-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition-shadow duration-300"
                >
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight size={13} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                  See my works
                </motion.a>

                <a href="#contact" className="text-[12px] tracking-wide text-neutral-400 hover:text-neutral-900 transition-colors duration-300 mr-2">
                  Get in touch →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════
          MOBILE layout (Z-30)
      ═══════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 z-30 pointer-events-none flex flex-col justify-between pt-24 pb-12 px-6">
        
        {/* TOP: Role + Headline */}
        <motion.div
          className="flex flex-col gap-3 pointer-events-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-2">
            <span className="text-neutral-300">01</span>
            <span className="inline-block w-4 h-[1.5px] bg-neutral-200" />
            Software Engineer
          </p>
          <h1 className="text-[2.2rem] sm:text-[2.75rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-neutral-900 drop-shadow-sm">
            Full-Stack &<br />
            Mobile Developer
          </h1>
        </motion.div>

        {/* BOTTOM: Bio + CTA + Socials */}
        <motion.div
          className="flex flex-col gap-5 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
        >
          <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-[1.6] max-w-[260px] bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-sm">
            3+ years shipping apps for web, mobile & desktop. Products people love.
          </p>
          
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#portfolio"
              whileTap={{ scale: 0.96 }}
              className="flex-1 inline-flex items-center justify-center gap-2 text-white text-[14px] font-medium px-4 py-3.5 rounded-full bg-neutral-900 shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
            >
              <ArrowRight size={14} strokeWidth={2} />
              See my works
            </motion.a>
            
            <div className="flex items-center gap-2">
              {socials.slice(0, 2).map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center text-neutral-700 bg-white/80 backdrop-blur-md border border-black/5 shadow-sm active:scale-95 transition-transform"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="hidden lg:flex absolute right-8 bottom-12 z-30 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-neutral-400" style={{ writingMode: "vertical-lr" }}>
          Scroll
        </p>
        <div className="w-[2px] h-10 bg-gradient-to-b from-neutral-300 to-transparent rounded-full overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-neutral-800 rounded-full"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>

    </section>
  );
}