import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DISPLAY_NAME = "Emmanuel";
const LETTERS = DISPLAY_NAME.split("");
const THREE_CDN = "https://unpkg.com/three@0.181.1/build/three.min.js";

const socials = [
  { icon: Github,   href: "https://github.com",  label: "GitHub"   },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitch,   href: "https://twitch.tv",    label: "Twitch"   },
  { icon: Youtube,  href: "https://youtube.com",  label: "YouTube"  },
];

const customEase = [0.16, 1, 0.3, 1];

// ── Sparkle (glint) helpers ───────────────────────────────────────
interface Glint {
  x: number; y: number;
  size: number;
  alpha: number;   // current opacity 0-1
  rising: boolean;
  speed: number;   // per-frame delta
}

function drawGlint(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) {
  ctx.save();
  ctx.lineCap = "round";

  // Soft halo
  const halo = ctx.createRadialGradient(x, y, 0, x, y, size * 2.8);
  halo.addColorStop(0,   `rgba(255,248,210,${(alpha * 0.55).toFixed(2)})`);
  halo.addColorStop(0.45,`rgba(240,210,100,${(alpha * 0.18).toFixed(2)})`);
  halo.addColorStop(1,   "rgba(200,170,60,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, size * 2.8, 0, Math.PI * 2);
  ctx.fill();

  // Long cross arms (vertical + horizontal)
  ctx.strokeStyle = `rgba(255,255,235,${alpha.toFixed(2)})`;
  ctx.shadowColor  = `rgba(255,230,120,${alpha.toFixed(2)})`;
  ctx.shadowBlur   = 7;
  ctx.lineWidth    = 1.4;
  ctx.beginPath(); ctx.moveTo(x, y - size * 1.4); ctx.lineTo(x, y + size * 1.4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - size * 1.4, y); ctx.lineTo(x + size * 1.4, y); ctx.stroke();

  // Short diagonal arms
  const d = size * 0.55;
  ctx.lineWidth  = 0.7;
  ctx.shadowBlur = 4;
  ctx.beginPath(); ctx.moveTo(x - d, y - d); ctx.lineTo(x + d, y + d); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + d, y - d); ctx.lineTo(x - d, y + d); ctx.stroke();

  // Bright centre dot
  ctx.fillStyle  = `rgba(255,255,255,${alpha.toFixed(2)})`;
  ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  // Refs
  const sectionRef      = useRef<HTMLElement>(null);
  const threeMount      = useRef<HTMLDivElement>(null);
  const sparkleCanvas   = useRef<HTMLCanvasElement>(null);
  const letterRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const glints          = useRef<Glint[]>([]);
  const sparkleRaf      = useRef<number>(0);
  const threeMouseRef   = useRef({ x: 0, y: 0 });

  // Cursor gold glow
  const cursorX  = useMotionValue(-400);
  const cursorY  = useMotionValue(-400);
  const smoothCX = useSpring(cursorX, { stiffness: 80, damping: 26 });
  const smoothCY = useSpring(cursorY, { stiffness: 80, damping: 26 });

  // ── Three.js particle cloud ─────────────────────────────────────
  useEffect(() => {
    const mount = threeMount.current;
    if (!mount) return;
    let frameId = 0;
    let destroy: (() => void) | undefined;

    const initThree = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE = (window as any).THREE;
      if (!THREE || !mount) return undefined;

      const W = mount.clientWidth, H = mount.clientHeight;
      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
      camera.position.set(0, 0, 7);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const COUNT = 140;
      const positions = new Float32Array(COUNT * 3);
      const colors    = new Float32Array(COUNT * 3);

      let seed = 42;
      const rng = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (rng() - 0.5) * 14;
        positions[i * 3 + 1] = (rng() - 0.5) * 8;
        positions[i * 3 + 2] = (rng() - 0.5) * 6;
        const roll = rng();
        if      (roll < 0.45) { colors[i*3]=0.12; colors[i*3+1]=0.12; colors[i*3+2]=0.13; }
        else if (roll < 0.80) { colors[i*3]=0.78; colors[i*3+1]=0.63; colors[i*3+2]=0.22; }
        else                  { colors[i*3]=0.95; colors[i*3+1]=0.86; colors[i*3+2]=0.56; }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));
      const mat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.55, sizeAttenuation: true });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const vel = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT * 3; i++) vel[i] = (rng() - 0.5) * 0.0006;

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      let t = 0;
      const animate = () => {
        t += 0.0005;
        const pos = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          pos[i*3]   += vel[i*3];   pos[i*3+1] += vel[i*3+1]; pos[i*3+2] += vel[i*3+2];
          if (pos[i*3]   >  7) pos[i*3]   = -7; if (pos[i*3]   < -7) pos[i*3]   =  7;
          if (pos[i*3+1] >  4) pos[i*3+1] = -4; if (pos[i*3+1] < -4) pos[i*3+1] =  4;
          if (pos[i*3+2] >  3) pos[i*3+2] = -3; if (pos[i*3+2] < -3) pos[i*3+2] =  3;
        }
        geo.attributes.position.needsUpdate = true;
        const mx = threeMouseRef.current.x, my = threeMouseRef.current.y;
        scene.rotation.y  += ( mx * 0.22 - scene.rotation.y)  * 0.04;
        scene.rotation.x  += (-my * 0.12 - scene.rotation.x)  * 0.04;
        points.rotation.y  = t * 0.6;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(frameId);
        geo.dispose(); mat.dispose(); renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    };

    if (!(window as any).THREE) {
      const script = document.createElement("script");
      script.src = THREE_CDN; script.async = true;
      script.onload = () => { destroy = initThree(); };
      document.head.appendChild(script);
    } else {
      destroy = initThree();
    }
    return () => destroy?.();
  }, []);

  // ── Sparkle canvas rAF loop ─────────────────────────────────────
  useEffect(() => {
    const canvas  = sparkleCanvas.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = section.clientWidth; canvas.height = section.clientHeight; };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      glints.current = glints.current.filter(g => g.alpha > 0);
      for (const g of glints.current) {
        if (g.rising) {
          g.alpha += g.speed;
          if (g.alpha >= 1) { g.alpha = 1; g.rising = false; }
        } else {
          g.alpha -= g.speed * 0.65; // fade slower than rise
        }
        drawGlint(ctx, g.x, g.y, g.size * g.alpha, g.alpha);
      }
      sparkleRaf.current = requestAnimationFrame(tick);
    };
    sparkleRaf.current = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(sparkleRaf.current); window.removeEventListener("resize", resize); };
  }, []);

  // ── Sparkle spawner ─────────────────────────────────────────────
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    let alive = true;

    const spawn = () => {
      if (!alive || !sectionRef.current) return;
      const sRect = sectionRef.current.getBoundingClientRect();
      const validEls = letterRefs.current.filter(Boolean);
      if (validEls.length === 0) { tid = setTimeout(spawn, 300); return; }

      const el = validEls[Math.floor(Math.random() * validEls.length)]!;
      const lRect = el.getBoundingClientRect();

      glints.current.push({
        x:      lRect.left - sRect.left + lRect.width  * (0.08 + Math.random() * 0.84),
        y:      lRect.top  - sRect.top  + lRect.height * (0.10 + Math.random() * 0.72),
        size:   4 + Math.random() * 7,     // 4–11 px radius
        alpha:  0,
        rising: true,
        speed:  0.035 + Math.random() * 0.04, // ~25-45 frames to peak
      });

      tid = setTimeout(spawn, 160 + Math.random() * 480);
    };

    tid = setTimeout(spawn, 900);
    return () => { alive = false; clearTimeout(tid); };
  }, []);

  // ── SVG water turbulence animation ─────────────────────────────
  useEffect(() => {
    const el = document.getElementById("hero-turb");
    if (!el) return;
    let tick = 0, rafId: number;
    const animate = () => {
      tick += 0.004;
      const bfx = (0.013 + Math.sin(tick)        * 0.006).toFixed(5);
      const bfy = (0.019 + Math.cos(tick * 0.74) * 0.007).toFixed(5);
      el.setAttribute("baseFrequency", `${bfx} ${bfy}`);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Mouse handler ───────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      threeMouseRef.current = {
        x: (e.clientX - rect.width  / 2) / (rect.width  / 2),
        y: (e.clientY - rect.height / 2) / (rect.height / 2),
      };
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    },
    [cursorX, cursorY],
  );

  const handleMouseLeave = useCallback(() => {
    threeMouseRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-[#fcfcfc] text-neutral-900 selection:bg-neutral-900 selection:text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background gradient orbs (slow drift) ── */}
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

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── SVG filter defs (invisible) ── */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="hero-liquid" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feTurbulence
              id="hero-turb"
              type="turbulence"
              baseFrequency="0.013 0.019"
              numOctaves="4"
              seed="9"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="55"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Liquid water blob — right side background ── */}
      <div
        className="absolute right-0 top-0 h-full z-[1] pointer-events-none overflow-hidden"
        style={{ width: "52%" }}
        aria-hidden="true"
      >
        {/* Outer large blob */}
        <div
          style={{
            position: "absolute",
            right: "-12%",
            top: "4%",
            width: "92%",
            height: "90%",
            background:
              "radial-gradient(ellipse at 38% 45%, rgba(208,224,236,0.50) 0%, rgba(190,212,228,0.30) 45%, rgba(170,198,218,0.10) 68%, transparent 85%)",
            filter: "url(#hero-liquid)",
            borderRadius: "42% 58% 52% 48% / 48% 42% 58% 52%",
          }}
        />
        {/* Inner brighter core */}
        <div
          style={{
            position: "absolute",
            right: "2%",
            top: "18%",
            width: "65%",
            height: "62%",
            background:
              "radial-gradient(ellipse at 42% 50%, rgba(220,232,242,0.40) 0%, rgba(200,218,232,0.22) 55%, transparent 80%)",
            filter: "url(#hero-liquid)",
            borderRadius: "55% 45% 48% 52% / 52% 55% 45% 48%",
          }}
        />
      </div>

      {/* ── Three.js 3D particle cloud ── */}
      <div
        ref={threeMount}
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Cursor gold glow ── */}
      <motion.div
        className="absolute z-[2] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          x: smoothCX, y: smoothCY,
          translateX: "-50%", translateY: "-50%",
          width: 360, height: 360,
          background:
            "radial-gradient(circle, rgba(200,160,55,0.07) 0%, rgba(200,160,55,0.025) 45%, transparent 70%)",
        }}
      />

      {/* ── Portrait: no scale, no tilt — clean entry ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 origin-bottom"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
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

      {/* ── "Emmanuel" — Z-20, letters with glint canvas on top ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden pointer-events-none select-none flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
      >
        <div className="w-full max-w-[1400px] px-6 lg:px-12 flex justify-center lg:justify-start">
          <p
            className="font-extrabold pb-10 leading-[0.82] tracking-[-0.05em] whitespace-nowrap mix-blend-overlay opacity-90"
            style={{ fontSize: "clamp(5.5rem, 18vw, 20rem)", color: "#1a1a1d" }}
          >
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={(el) => { letterRefs.current[i] = el; }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </span>
            ))}
          </p>
        </div>
      </motion.div>

      {/* ── Sparkle / glint canvas (above text, below content) ── */}
      <canvas
        ref={sparkleCanvas}
        className="absolute inset-0 z-[21] pointer-events-none"
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════
          DESKTOP layout (Z-30)
      ═══════════════════════════════════ */}
      <div className="hidden lg:block absolute inset-0 z-30 pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto h-full relative px-12">
          <div className="absolute top-1/2 -translate-y-[55%] left-12 right-12 grid grid-cols-2 gap-16 pointer-events-auto">

            {/* Left */}
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
                    key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 bg-white/70 backdrop-blur-md border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:text-black hover:bg-white transition-colors duration-300"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right */}
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
                  href="#portfolio" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
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
        <motion.div
          className="flex flex-col gap-3 pointer-events-auto"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-2">
            <span className="text-neutral-300">01</span>
            <span className="inline-block w-4 h-[1.5px] bg-neutral-200" />
            Software Engineer
          </p>
          <h1 className="text-[2.2rem] sm:text-[2.75rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-neutral-900 drop-shadow-sm">
            Full-Stack &<br />Mobile Developer
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-5 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
        >
          <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-[1.6] max-w-[260px] bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-sm">
            3+ years shipping apps for web, mobile & desktop. Products people love.
          </p>
          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#portfolio" whileTap={{ scale: 0.96 }}
              className="flex-1 inline-flex items-center justify-center gap-2 text-white text-[14px] font-medium px-4 py-3.5 rounded-full bg-neutral-900 shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
            >
              <ArrowRight size={14} strokeWidth={2} /> See my works
            </motion.a>
            <div className="flex items-center gap-2">
              {socials.slice(0, 2).map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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
