import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DISPLAY_NAME = "Emmanuel";
const LETTERS = DISPLAY_NAME.split("");

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitch, href: "https://twitch.tv", label: "Twitch" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

// Custom easing for that premium Apple-like smoothness
const customEase = [0.16, 1, 0.3, 1];

// Stable particles (computed once at module level)
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: (i * 7.3 + 3) % 100,
  size: ((i * 1.7 + 1.5) % 2.5) + 1.2,
  duration: ((i * 2.1 + 5) % 8) + 6,
  delay: (i * 1.3) % 6,
  opacity: ((i * 0.06 + 0.06) % 0.2) + 0.06,
}));

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  // ── Mouse parallax values ──────────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 28, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 28, damping: 22 });
  const portraitX = useTransform(springX, [-1, 1], [-16, 16]);
  const portraitY = useTransform(springY, [-1, 1], [-7, 7]);

  // ── Cursor glow ────────────────────────────────────────────────
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const smoothCX = useSpring(cursorX, { stiffness: 90, damping: 28 });
  const smoothCY = useSpring(cursorY, { stiffness: 90, damping: 28 });

  // ── Lightning letter sequence ──────────────────────────────────
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    let alive = true;
    let idx = 0;

    const flash = () => {
      if (!alive) return;
      if (idx < LETTERS.length) {
        setActiveLetter(idx);
        idx++;
        tid = setTimeout(flash, 155);
      } else {
        setActiveLetter(null);
        idx = 0;
        tid = setTimeout(flash, 2600); // pause between runs
      }
    };

    tid = setTimeout(flash, 1600); // initial delay
    return () => {
      alive = false;
      clearTimeout(tid);
    };
  }, []);

  // ── Mouse handler ──────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set((e.clientX - rect.width / 2) / (rect.width / 2));
      rawY.set((e.clientY - rect.height / 2) / (rect.height / 2));
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    },
    [rawX, rawY, cursorX, cursorY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <section
      className="relative h-[100svh] overflow-hidden bg-[#fcfcfc] text-neutral-900 selection:bg-neutral-900 selection:text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background gradient orbs (animated) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-16 w-[85vw] h-[80vh] rounded-full"
          style={{ background: "radial-gradient(ellipse at 20% 20%, #ebebed 0%, transparent 68%)" }}
          animate={{ x: [0, 18, -10, 0], y: [0, -12, 9, 0], scale: [1, 1.04, 0.97, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-[60vw] h-[55vh] rounded-full"
          style={{ background: "radial-gradient(ellipse at 80% 80%, #e4e4e6 0%, transparent 65%)" }}
          animate={{ x: [0, -14, 8, 0], y: [0, 10, -8, 0], scale: [1, 0.96, 1.03, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
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

      {/* ── Cursor glow ── */}
      <motion.div
        className="absolute z-[1] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          x: smoothCX,
          y: smoothCY,
          translateX: "-50%",
          translateY: "-50%",
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, rgba(160,170,255,0.10) 0%, rgba(180,190,255,0.04) 45%, transparent 70%)",
        }}
      />

      {/* ── Floating ambient particles ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-neutral-500"
            style={{
              left: `${p.x}%`,
              bottom: -8,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{ y: [0, -Math.round(window?.innerHeight ?? 900) - 20] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ── Portrait: Z-10 (Behind the name) + mouse parallax ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 origin-bottom"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: customEase }}
        style={{ x: portraitX, y: portraitY }}
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

      {/* ── Display name: Z-20 (IN FRONT of image) + lightning letters ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden pointer-events-none select-none flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
      >
        <div className="w-full max-w-[1400px] px-6 lg:px-12 flex justify-center lg:justify-start">
          <p
            className="font-extrabold pb-10 leading-[0.82] tracking-[-0.05em] whitespace-nowrap"
            style={{ fontSize: "clamp(5.5rem, 18vw, 20rem)" }}
          >
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  mixBlendMode: activeLetter === i ? "normal" : "overlay",
                  color: activeLetter === i ? "#b0bcff" : "#1a1a1a",
                  opacity: activeLetter === i ? 1 : 0.9,
                  textShadow:
                    activeLetter === i
                      ? "0 0 20px rgba(150,170,255,1), 0 0 60px rgba(130,150,255,0.75), 0 0 120px rgba(110,130,255,0.4)"
                      : "none",
                  transition: "text-shadow 0.1s ease, color 0.1s ease, opacity 0.1s ease",
                }}
              >
                {letter}
              </span>
            ))}
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
                {socials.map(({ icon: Icon, href, label }) => (
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
