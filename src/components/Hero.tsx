import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Github, Linkedin, Twitch, Youtube } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DISPLAY_NAME = "Emmanuel";
const LETTERS = DISPLAY_NAME.split("");
const THREE_CDN = "https://unpkg.com/three@0.181.1/build/three.min.js";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitch, href: "https://twitch.tv", label: "Twitch" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const customEase = [0.16, 1, 0.3, 1];

// Gold palette matching the site's #1d1d1f charcoal
const GOLD = { r: 200, g: 160, b: 55 };  // #c8a037
const DARK = { r: 26,  g: 26,  b: 29  };  // ~#1a1a1d

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// Apply lightning style directly to a DOM span — zero React re-renders
function applyLetterStyle(el: HTMLSpanElement, intensity: number) {
  if (intensity < 0.008) {
    el.style.mixBlendMode = "overlay";
    el.style.color = "#1a1a1d";
    el.style.opacity = "0.9";
    el.style.textShadow = "none";
    return;
  }
  const t = intensity;
  const t2 = t * t; // quadratic for dramatic glow curve
  const r = Math.round(lerp(DARK.r, GOLD.r, t));
  const g = Math.round(lerp(DARK.g, GOLD.g, t));
  const b = Math.round(lerp(DARK.b, GOLD.b, t));
  el.style.mixBlendMode = "normal";
  el.style.color = `rgb(${r},${g},${b})`;
  el.style.opacity = String(0.9 + 0.1 * t);
  el.style.textShadow = [
    `0 0 ${Math.round(14 * t2)}px rgba(${GOLD.r},${GOLD.g},${GOLD.b},${t2.toFixed(2)})`,
    `0 0 ${Math.round(40 * t2)}px rgba(${GOLD.r},${GOLD.g},${GOLD.b},${(t2 * 0.6).toFixed(2)})`,
    `0 0 ${Math.round(100 * t2)}px rgba(${GOLD.r},${GOLD.g},${GOLD.b},${(t2 * 0.28).toFixed(2)})`,
    `0 0 ${Math.round(180 * t2)}px rgba(255,220,100,${(t2 * 0.12).toFixed(2)})`,
  ].join(",");
}

export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  // ── Three.js canvas mount ──────────────────────────────────────
  const threeMount = useRef<HTMLDivElement>(null);
  const threeMouseRef = useRef({ x: 0, y: 0 });

  // ── Letter refs for direct DOM lightning ──────────────────────
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const intensities = useRef<number[]>(new Array(LETTERS.length).fill(0));
  const holdFrames = useRef<number[]>(new Array(LETTERS.length).fill(0));
  const rafId = useRef<number>(0);

  // ── Mouse for portrait 3D tilt ────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 32, damping: 24 });
  const springY = useSpring(rawY, { stiffness: 32, damping: 24 });
  const rotateY = useTransform(springX, [-1, 1], [-12, 12]);
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);

  // ── Cursor gold glow ──────────────────────────────────────────
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const smoothCX = useSpring(cursorX, { stiffness: 80, damping: 26 });
  const smoothCY = useSpring(cursorY, { stiffness: 80, damping: 26 });

  // ── Three.js particle cloud ───────────────────────────────────
  useEffect(() => {
    const mount = threeMount.current;
    if (!mount) return;
    let frameId = 0;
    let destroy: (() => void) | undefined;

    const initThree = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE = (window as any).THREE;
      if (!THREE || !mount) return undefined;

      const W = mount.clientWidth;
      const H = mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
      camera.position.set(0, 0, 7);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0); // transparent
      mount.appendChild(renderer.domElement);

      // ── Build point cloud ──
      const COUNT = 140;
      const positions = new Float32Array(COUNT * 3);
      const colors    = new Float32Array(COUNT * 3);
      const sizes     = new Float32Array(COUNT);

      // Pre-seeded "random" via simple LCG so it's stable across renders
      let seed = 42;
      const rng = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (rng() - 0.5) * 14;  // x: ±7
        positions[i * 3 + 1] = (rng() - 0.5) * 8;   // y: ±4
        positions[i * 3 + 2] = (rng() - 0.5) * 6;   // z: ±3  ← depth = 3D parallax

        const roll = rng();
        if (roll < 0.45) {
          // Dark charcoal particles
          colors[i * 3] = 0.12; colors[i * 3 + 1] = 0.12; colors[i * 3 + 2] = 0.13;
        } else if (roll < 0.80) {
          // Warm gold particles
          colors[i * 3] = 0.78; colors[i * 3 + 1] = 0.63; colors[i * 3 + 2] = 0.22;
        } else {
          // Bright champagne
          colors[i * 3] = 0.95; colors[i * 3 + 1] = 0.86; colors[i * 3 + 2] = 0.56;
        }
        sizes[i] = rng() * 0.06 + 0.025;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));

      const mat = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Very subtle ambient drift velocities
      const vel = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT * 3; i++) vel[i] = (rng() - 0.5) * 0.0006;

      // Resize
      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      // Animate
      let t = 0;
      const animate = () => {
        t += 0.0005;
        const pos = geo.attributes.position.array as Float32Array;
        // Drift each particle + wrap around
        for (let i = 0; i < COUNT; i++) {
          pos[i * 3]     += vel[i * 3];
          pos[i * 3 + 1] += vel[i * 3 + 1];
          pos[i * 3 + 2] += vel[i * 3 + 2];
          // Wrap at boundaries
          if (pos[i * 3]     >  7)  pos[i * 3]     = -7;
          if (pos[i * 3]     < -7)  pos[i * 3]     =  7;
          if (pos[i * 3 + 1] >  4)  pos[i * 3 + 1] = -4;
          if (pos[i * 3 + 1] < -4)  pos[i * 3 + 1] =  4;
          if (pos[i * 3 + 2] >  3)  pos[i * 3 + 2] = -3;
          if (pos[i * 3 + 2] < -3)  pos[i * 3 + 2] =  3;
        }
        geo.attributes.position.needsUpdate = true;

        // Scene rotation follows mouse (parallax)
        const mx = threeMouseRef.current.x;
        const my = threeMouseRef.current.y;
        scene.rotation.y += (mx * 0.22 - scene.rotation.y) * 0.04;
        scene.rotation.x += (-my * 0.12 - scene.rotation.x) * 0.04;
        // Slow auto-rotation for when mouse is idle
        points.rotation.y = t * 0.6;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(frameId);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    if (!(window as any).THREE) {
      const script = document.createElement("script");
      script.src = THREE_CDN;
      script.async = true;
      script.onload = () => { destroy = initThree(); };
      document.head.appendChild(script);
    } else {
      destroy = initThree();
    }

    return () => destroy?.();
  }, []);

  // ── Lightning rAF loop (direct DOM, zero re-renders) ──────────
  useEffect(() => {
    const FADE = 0.016; // per frame — ~62 frames / ~1s to fully fade

    const tick = () => {
      for (let i = 0; i < LETTERS.length; i++) {
        if (holdFrames.current[i] > 0) {
          holdFrames.current[i]--;
          // peak — no intensity change
        } else if (intensities.current[i] > 0) {
          intensities.current[i] = Math.max(0, intensities.current[i] - FADE);
          const el = letterRefs.current[i];
          if (el) applyLetterStyle(el, intensities.current[i]);
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // ── Random lightning scheduler ────────────────────────────────
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    let alive = true;

    const strike = (idx: number, hold = 18) => {
      intensities.current[idx] = 1.0;
      holdFrames.current[idx] = hold;
      const el = letterRefs.current[idx];
      if (el) applyLetterStyle(el, 1.0);
    };

    const rnd = (min: number, max: number) => min + Math.random() * (max - min);
    const randIdx = () => Math.floor(Math.random() * LETTERS.length);

    const schedule = () => {
      if (!alive) return;
      const roll = Math.random();

      if (roll < 0.12) {
        // ── Cascade: 3-6 letters fire in rapid succession
        const count = 3 + Math.floor(Math.random() * 4);
        const used = new Set<number>();
        for (let c = 0; c < count; c++) {
          let idx = randIdx();
          while (used.has(idx)) idx = randIdx(); // no duplicate in same burst
          used.add(idx);
          const holdTime = Math.round(rnd(12, 30));
          setTimeout(() => { if (alive) strike(idx, holdTime); }, c * rnd(55, 110));
        }
        tid = setTimeout(schedule, rnd(300, 700));

      } else if (roll < 0.30) {
        // ── Walk: current→adjacent (feels like electricity travelling)
        const start = randIdx();
        const steps = 2 + Math.floor(Math.random() * 3);
        const dir = Math.random() < 0.5 ? 1 : -1;
        for (let s = 0; s < steps; s++) {
          const idx = ((start + dir * s) + LETTERS.length) % LETTERS.length;
          setTimeout(() => { if (alive) strike(idx, Math.round(rnd(10, 22))); }, s * rnd(80, 140));
        }
        tid = setTimeout(schedule, rnd(400, 900));

      } else if (roll < 0.55) {
        // ── Double: 2 random, near-simultaneous
        strike(randIdx(), Math.round(rnd(14, 28)));
        setTimeout(() => { if (alive) strike(randIdx(), Math.round(rnd(14, 28))); }, rnd(60, 160));
        tid = setTimeout(schedule, rnd(200, 700));

      } else {
        // ── Single random strike
        strike(randIdx(), Math.round(rnd(10, 26)));
        tid = setTimeout(schedule, rnd(120, 900));
      }
    };

    tid = setTimeout(schedule, 1000);
    return () => { alive = false; clearTimeout(tid); };
  }, []);

  // ── Mouse handler ─────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.width  / 2) / (rect.width  / 2);
      const ny = (e.clientY - rect.height / 2) / (rect.height / 2);
      rawX.set(nx);
      rawY.set(ny);
      threeMouseRef.current = { x: nx, y: ny };
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    },
    [rawX, rawY, cursorX, cursorY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0); rawY.set(0);
    threeMouseRef.current = { x: 0, y: 0 };
  }, [rawX, rawY]);

  return (
    <section
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

      {/* ── Film grain overlay ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── Three.js 3D particle cloud ── */}
      <div
        ref={threeMount}
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Cursor gold glow ── */}
      <motion.div
        className="absolute z-[2] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          x: smoothCX,
          y: smoothCY,
          translateX: "-50%",
          translateY: "-50%",
          width: 360,
          height: 360,
          background:
            "radial-gradient(circle, rgba(200,160,55,0.07) 0%, rgba(200,160,55,0.025) 45%, transparent 70%)",
        }}
      />

      {/* ── Portrait: Z-10, 3D CSS tilt + behind name ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 origin-bottom"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: customEase }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1400,
        }}
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

      {/* ── "Emmanuel" — Z-20, gold lightning via direct DOM refs ── */}
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
                ref={(el) => { letterRefs.current[i] = el; }}
                style={{
                  display: "inline-block",
                  mixBlendMode: "overlay",
                  color: "#1a1a1d",
                  opacity: 0.9,
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
