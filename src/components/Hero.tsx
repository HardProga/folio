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

// ── GLSL: 3-D water vertex shader ─────────────────────────────────────────────
// Eight sine waves travel in different directions across the XY plane.
// The wave sum displaces each vertex along Z (toward the camera), and we
// compute an analytic surface normal via central finite-differences so the
// fragment shader can do proper Blinn–Phong + Fresnel shading.
const WATER_VERT = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;     // world-space cursor position

  varying vec2  vUv;
  varying float vElevation;
  varying vec3  vNormal;

  // Single Gerstner-style sine wave: direction · pos drives the phase
  float sineWave(vec2 pos, vec2 dir, float freq, float amp,
                 float speed, float phase) {
    return amp * sin(dot(normalize(dir), pos) * freq + uTime * speed + phase);
  }

  // Sum of 8 waves + an interactive mouse ripple
  float elevation(vec2 pos) {
    float e = 0.0;
    e += sineWave(pos, vec2( 1.00,  0.30), 1.50, 0.120, 1.20, 0.00);
    e += sineWave(pos, vec2(-0.70,  1.00), 2.00, 0.090, 1.50, 1.10);
    e += sineWave(pos, vec2( 0.50, -0.80), 1.20, 0.070, 0.90, 2.30);
    e += sineWave(pos, vec2(-1.00, -0.50), 2.50, 0.050, 1.80, 0.70);
    e += sineWave(pos, vec2( 0.30,  0.95), 3.50, 0.030, 2.10, 3.10);
    e += sineWave(pos, vec2(-0.80,  0.20), 1.80, 0.060, 1.10, 1.90);
    e += sineWave(pos, vec2( 0.90, -0.40), 2.80, 0.040, 1.60, 0.50);
    e += sineWave(pos, vec2(-0.40, -0.90), 3.20, 0.025, 2.30, 2.70);

    // Mouse-driven ripple — emanates from cursor in all directions
    float dist   = length(pos - uMouse);
    float ripple = exp(-dist * dist * 0.28)
                   * sin(dist * 5.5 - uTime * 3.8) * 0.14;
    e += ripple;
    return e;
  }

  void main() {
    vUv = uv;
    vec3 p = position;

    float e = elevation(p.xy);
    p.z += e;
    vElevation = e;

    // Surface normal via finite differences on the elevation field
    float eps = 0.09;
    float dx  = elevation(p.xy + vec2(eps, 0.0)) - e;
    float dy  = elevation(p.xy + vec2(0.0, eps)) - e;
    vNormal   = normalize(vec3(-dx / eps, -dy / eps, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

// ── GLSL: 3-D water fragment shader ───────────────────────────────────────────
// Palette: soft steel-blue (deep) → pale ice-blue (crests) → near-white (foam).
// Lighting: two animated light sources (Blinn–Phong), animated caustics pattern,
// Fresnel rim that makes the surface look glassy at grazing angles.
const WATER_FRAG = /* glsl */`
  uniform float uTime;

  varying vec2  vUv;
  varying float vElevation;
  varying vec3  vNormal;

  void main() {
    // Elevation mapped to [0,1]
    float t = clamp((vElevation + 0.45) / 0.90, 0.0, 1.0);

    // Water colour ramp
    vec3 colDeep    = vec3(0.38, 0.63, 0.80);   // #619ECC – deep trough
    vec3 colShallow = vec3(0.72, 0.89, 0.97);   // #B8E3F7 – mid-wave
    vec3 colFoam    = vec3(0.93, 0.97, 1.00);   // #ECF8FF – crest foam

    vec3 color = mix(colDeep, colShallow, t);

    // View direction (camera looks along -Z, so view is +Z)
    vec3 V = vec3(0.0, 0.0, 1.0);

    // --- Primary sun light (slowly drifts) ---
    vec3 L1 = normalize(vec3(
      cos(uTime * 0.11) * 0.55 + 0.35,
      sin(uTime * 0.08) * 0.40 + 0.55,
      1.60
    ));
    float diff1 = max(0.0, dot(vNormal, L1));
    vec3  H1    = normalize(L1 + V);
    float spec1 = pow(max(0.0, dot(vNormal, H1)), 110.0);

    // --- Fill light from opposite quadrant ---
    vec3 L2 = normalize(vec3(
      -cos(uTime * 0.07) * 0.45 - 0.25,
       sin(uTime * 0.10) * 0.30 + 0.50,
       1.20
    ));
    vec3  H2    = normalize(L2 + V);
    float spec2 = pow(max(0.0, dot(vNormal, H2)), 45.0);

    color += vec3(diff1 * 0.18);
    color += vec3(spec1 * 0.95);          // sharp primary glint
    color += vec3(spec2 * 0.40);          // soft fill glint

    // --- Caustics (interference of two travelling wave fronts) ---
    float ct  = uTime * 0.16;
    vec2  cuv = vUv * 9.5;
    float c1  = abs(sin(cuv.x + ct + sin(cuv.y * 0.80 + ct * 0.55)));
    float c2  = abs(sin(cuv.y * 0.85 - ct * 0.72
                     + cos(cuv.x * 0.78 + ct * 0.48)));
    float caust = pow(1.0 - min(c1, c2), 5.0);
    color += vec3(caust * 0.10, caust * 0.13, caust * 0.08);

    // --- Foam cap at crests ---
    float foam = smoothstep(0.66, 1.0, t);
    color = mix(color, colFoam, foam * 0.72);

    // --- Fresnel: surface becomes mirror-like at grazing angles ---
    float NdotV   = clamp(dot(vNormal, V), 0.0, 1.0);
    float fresnel = pow(1.0 - NdotV, 2.8);
    vec3  envCol  = mix(vec3(0.82, 0.93, 0.98), vec3(1.0), fresnel * 0.30);
    color = mix(color, envCol, fresnel * 0.55);

    // Alpha: troughs slightly transparent, crests and foam more opaque
    float alpha = mix(0.58, 0.84, t);

    gl_FragColor = vec4(color, alpha);
  }
`;

// ── Sparkle (glint) helpers ────────────────────────────────────────────────────
interface Glint {
  x: number; y: number;
  size: number;
  alpha: number;
  rising: boolean;
  speed: number;
}

function drawGlint(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number, alpha: number,
) {
  ctx.save();
  ctx.lineCap = "round";

  const halo = ctx.createRadialGradient(x, y, 0, x, y, size * 2.8);
  halo.addColorStop(0,    `rgba(255,248,210,${(alpha * 0.55).toFixed(2)})`);
  halo.addColorStop(0.45, `rgba(240,210,100,${(alpha * 0.18).toFixed(2)})`);
  halo.addColorStop(1,    "rgba(200,170,60,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, size * 2.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(255,255,235,${alpha.toFixed(2)})`;
  ctx.shadowColor  = `rgba(255,230,120,${alpha.toFixed(2)})`;
  ctx.shadowBlur   = 7;
  ctx.lineWidth    = 1.4;
  ctx.beginPath(); ctx.moveTo(x, y - size * 1.4); ctx.lineTo(x, y + size * 1.4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - size * 1.4, y); ctx.lineTo(x + size * 1.4, y); ctx.stroke();

  const d = size * 0.55;
  ctx.lineWidth  = 0.7;
  ctx.shadowBlur = 4;
  ctx.beginPath(); ctx.moveTo(x - d, y - d); ctx.lineTo(x + d, y + d); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + d, y - d); ctx.lineTo(x - d, y + d); ctx.stroke();

  ctx.fillStyle  = `rgba(255,255,255,${alpha.toFixed(2)})`;
  ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [photoMissing, setPhotoMissing] = useState(false);

  const sectionRef    = useRef<HTMLElement>(null);
  const waterMount    = useRef<HTMLDivElement>(null);
  const sparkleCanvas = useRef<HTMLCanvasElement>(null);
  const letterRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const glints        = useRef<Glint[]>([]);
  const sparkleRaf    = useRef<number>(0);
  const waterMouseRef = useRef({ x: 0, y: 0 }); // normalised −1…+1

  // Cursor gold glow
  const cursorX  = useMotionValue(-400);
  const cursorY  = useMotionValue(-400);
  const smoothCX = useSpring(cursorX, { stiffness: 80, damping: 26 });
  const smoothCY = useSpring(cursorY, { stiffness: 80, damping: 26 });

  // ── Full-screen 3-D water ─────────────────────────────────────────────────
  useEffect(() => {
    const mount = waterMount.current;
    if (!mount) return;
    let frameId = 0;
    let destroy: (() => void) | undefined;

    const initWater = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE = (window as any).THREE;
      if (!THREE || !mount) return undefined;

      const W = mount.clientWidth, H = mount.clientHeight;

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 100);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0); // transparent — CSS gradient shows through
      mount.appendChild(renderer.domElement);

      // Plane large enough to fill all viewports even at wide aspect ratios.
      // 180 × 110 segments give enough vertex density for smooth wave shapes.
      const aspect = W / H;
      const geo = new THREE.PlaneGeometry(22 * Math.max(aspect, 1), 14, 180, 110);

      const uniforms = {
        uTime:  { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0.0, 0.0) },
      };

      const mat = new THREE.ShaderMaterial({
        vertexShader:   WATER_VERT,
        fragmentShader: WATER_FRAG,
        uniforms,
        transparent: true,
        depthWrite:  false,
        side: THREE.DoubleSide,
      });

      const water = new THREE.Mesh(geo, mat);
      scene.add(water);

      // Resize handler
      const onResize = () => {
        if (!mount) return;
        const W2 = mount.clientWidth, H2 = mount.clientHeight;
        camera.aspect = W2 / H2;
        camera.updateProjectionMatrix();
        renderer.setSize(W2, H2);
      };
      window.addEventListener("resize", onResize);

      // Animation loop
      let time = 0;
      const animate = () => {
        time += 0.016;
        uniforms.uTime.value = time;

        // Pass mouse position to shader (world-space ≈ screen normalised × extent)
        uniforms.uMouse.value.x =  waterMouseRef.current.x * 9.0;
        uniforms.uMouse.value.y = -waterMouseRef.current.y * 5.5;

        // Subtle camera parallax on mouse move
        const tx =  waterMouseRef.current.x * 0.35;
        const ty = -waterMouseRef.current.y * 0.22;
        camera.position.x += (tx - camera.position.x) * 0.04;
        camera.position.y += (ty - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

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
      const script    = document.createElement("script");
      script.src      = THREE_CDN;
      script.async    = true;
      script.onload   = () => { destroy = initWater(); };
      document.head.appendChild(script);
    } else {
      destroy = initWater();
    }
    return () => destroy?.();
  }, []);

  // ── Sparkle canvas rAF loop ───────────────────────────────────────────────
  useEffect(() => {
    const canvas  = sparkleCanvas.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = section.clientWidth;
      canvas.height = section.clientHeight;
    };
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
          g.alpha -= g.speed * 0.65;
        }
        drawGlint(ctx, g.x, g.y, g.size * g.alpha, g.alpha);
      }
      sparkleRaf.current = requestAnimationFrame(tick);
    };
    sparkleRaf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(sparkleRaf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Sparkle spawner ───────────────────────────────────────────────────────
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    let alive = true;

    const spawn = () => {
      if (!alive || !sectionRef.current) return;
      const sRect    = sectionRef.current.getBoundingClientRect();
      const validEls = letterRefs.current.filter(Boolean);
      if (validEls.length === 0) { tid = setTimeout(spawn, 300); return; }

      const el    = validEls[Math.floor(Math.random() * validEls.length)]!;
      const lRect = el.getBoundingClientRect();

      glints.current.push({
        x:      lRect.left - sRect.left + lRect.width  * (0.08 + Math.random() * 0.84),
        y:      lRect.top  - sRect.top  + lRect.height * (0.10 + Math.random() * 0.72),
        size:   4 + Math.random() * 7,
        alpha:  0,
        rising: true,
        speed:  0.035 + Math.random() * 0.04,
      });

      tid = setTimeout(spawn, 160 + Math.random() * 480);
    };

    tid = setTimeout(spawn, 900);
    return () => { alive = false; clearTimeout(tid); };
  }, []);

  // ── Mouse handler ─────────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      waterMouseRef.current = {
        x: (e.clientX - rect.width  / 2) / (rect.width  / 2),
        y: (e.clientY - rect.height / 2) / (rect.height / 2),
      };
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    },
    [cursorX, cursorY],
  );

  const handleMouseLeave = useCallback(() => {
    waterMouseRef.current = { x: 0, y: 0 };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden text-neutral-900 selection:bg-white/30 selection:text-white"
      style={{
        /* Gradient shows before Three.js loads; matches water palette */
        background: "linear-gradient(135deg, #7dbdd9 0%, #a8d4ea 35%, #c4e5f4 65%, #ddf0f9 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── 3-D Water canvas (full background) ── */}
      <div
        ref={waterMount}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Film grain — keeps the water from looking too synthetic ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── Bottom demarcation fade — hero blends cleanly into sections below ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.90) 100%)",
        }}
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
            "radial-gradient(circle, rgba(255,220,100,0.10) 0%, rgba(200,160,55,0.04) 45%, transparent 70%)",
        }}
      />

      {/* ── Portrait ── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 origin-bottom"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: customEase }}
      >
        {photoMissing ? (
          <div className="w-[280px] h-[420px] sm:w-[340px] sm:h-[520px] flex items-center justify-center p-8 text-center rounded-3xl border border-dashed border-white/40 bg-white/15 backdrop-blur-sm mb-10">
            <p className="text-xs text-white/70 leading-relaxed">
              Add <span className="text-white font-medium">public/portrait2.png</span>
              <br />with background removed
            </p>
          </div>
        ) : (
          <img
            src="/portrait2.png"
            alt="Portrait"
            className="h-[82svh] sm:h-[88svh] lg:h-[92svh] max-h-[940px] w-auto object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,40,80,0.18)]"
            onError={() => setPhotoMissing(true)}
          />
        )}
      </motion.div>

      {/* ── "Emmanuel" — large watermark, blends into water via mix-blend ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden pointer-events-none select-none flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
      >
        <div className="w-full max-w-[1400px] px-6 lg:px-12 flex justify-center lg:justify-start">
          <p
            className="font-extrabold pb-10 leading-[0.82] tracking-[-0.05em] whitespace-nowrap mix-blend-overlay opacity-70"
            style={{ fontSize: "clamp(5.5rem, 18vw, 20rem)", color: "#0d2a40" }}
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

      {/* ── Sparkle canvas (above watermark, below UI) ── */}
      <canvas
        ref={sparkleCanvas}
        className="absolute inset-0 z-[21] pointer-events-none"
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════════
          DESKTOP layout  (z-30)
          ─────────────────────────────────────────────────────
          Left column: glass panel + title / role / socials
          Right column: description + CTA (semi-transparent card)
          A 1 px vertical rule visually demarcates the two zones.
      ═══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block absolute inset-0 z-30 pointer-events-none">

        {/* Glass demarcation panel — left content zone ── */}
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none"
          style={{ width: "44%" }}
          aria-hidden="true"
        >
          {/* Frosted glass backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 70%, transparent 100%)",
              backdropFilter: "blur(6px) saturate(1.4)",
              WebkitBackdropFilter: "blur(6px) saturate(1.4)",
            }}
          />
          {/* Vertical divider — glass edge effect */}
          <div
            className="absolute right-0 top-[10%] bottom-[10%]"
            style={{
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.70) 25%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.70) 75%, transparent 100%)",
              boxShadow: "1px 0 8px rgba(255,255,255,0.25)",
            }}
          />
        </div>

        <div className="w-full max-w-[1400px] mx-auto h-full relative px-12">
          <div className="absolute top-1/2 -translate-y-[55%] left-12 right-12 grid grid-cols-2 gap-16 pointer-events-auto">

            {/* Left column — title, role badge, socials */}
            <motion.div
              className="flex flex-col gap-5 max-w-[380px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: customEase }}
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 flex items-center gap-3"
                 style={{ textShadow: "0 1px 6px rgba(0,40,80,0.25)" }}>
                <span className="text-white/40">01</span>
                <span className="inline-block w-6 h-[1.5px] bg-white/35" />
                Mobile &amp; Software Engineer
              </p>

              <h1
                className="text-[2.8rem] xl:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
                style={{
                  color: "#0d2a3f",
                  textShadow: "0 2px 16px rgba(255,255,255,0.50), 0 1px 4px rgba(0,50,90,0.15)",
                }}
              >
                Full-Stack &amp;<br />
                Mobile Developer<br />
                <span style={{ color: "rgba(13,42,63,0.52)", fontWeight: 500 }}>
                  based in Enugu
                </span>
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
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      color: "rgba(13,42,63,0.75)",
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.60)",
                      boxShadow: "0 2px 10px rgba(0,50,100,0.08)",
                    }}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right column — description + CTAs (glass card) */}
            <motion.div
              className="flex flex-col gap-6 items-end text-right ml-auto max-w-[280px]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: customEase }}
            >
              <p
                className="text-[15px] xl:text-[16px] leading-[1.7] tracking-tight p-4 rounded-2xl"
                style={{
                  color: "#0d2a3f",
                  background: "rgba(255,255,255,0.45)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.60)",
                  boxShadow: "0 4px 20px rgba(0,50,100,0.06), inset 0 1px 0 rgba(255,255,255,0.80)",
                }}
              >
                Full-stack and mobile engineer with 3+ years shipping
                cross-platform applications. I turn ideas into products
                people actually love.
              </p>

              <div className="flex flex-col items-end gap-3">
                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 text-[14px] font-medium px-5 py-3 rounded-full transition-all duration-300"
                  style={{
                    color: "#0d2a3f",
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    boxShadow: "0 8px 24px rgba(0,50,100,0.12), inset 0 1px 0 rgba(255,255,255,1)",
                    border: "1px solid rgba(255,255,255,0.70)",
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(13,42,63,0.10)" }}
                  >
                    <ArrowRight
                      size={13}
                      strokeWidth={2}
                      className="group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </span>
                  See my works
                </motion.a>

                <a
                  href="#contact"
                  className="text-[12px] tracking-wide transition-colors duration-300 mr-2"
                  style={{ color: "rgba(13,42,63,0.55)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(13,42,63,0.90)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(13,42,63,0.55)")}
                >
                  Get in touch →
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE layout  (z-30)
      ═══════════════════════════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 z-30 pointer-events-none flex flex-col justify-between pt-24 pb-12 px-6">

        {/* Top — title block with glass background */}
        <motion.div
          className="flex flex-col gap-3 pointer-events-auto self-start"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.55)",
            borderRadius: "20px",
            padding: "16px 20px",
            boxShadow: "0 4px 20px rgba(0,50,100,0.08)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2"
             style={{ color: "rgba(13,42,63,0.55)" }}>
            <span style={{ color: "rgba(13,42,63,0.35)" }}>01</span>
            <span className="inline-block w-4 h-[1.5px]" style={{ background: "rgba(13,42,63,0.25)" }} />
            Software Engineer
          </p>
          <h1
            className="text-[2.2rem] sm:text-[2.75rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
            style={{ color: "#0d2a3f", textShadow: "0 1px 8px rgba(255,255,255,0.6)" }}
          >
            Full-Stack &amp;<br />Mobile Developer
          </h1>
        </motion.div>

        {/* Bottom — description + CTA + socials */}
        <motion.div
          className="flex flex-col gap-5 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
        >
          <p
            className="text-[13px] sm:text-[14px] leading-[1.6] max-w-[260px] p-3 rounded-2xl"
            style={{
              color: "#0d2a3f",
              background: "rgba(255,255,255,0.42)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.60)",
            }}
          >
            3+ years shipping apps for web, mobile &amp; desktop. Products people love.
          </p>

          <div className="flex items-center justify-between gap-4">
            <motion.a
              href="#portfolio"
              whileTap={{ scale: 0.96 }}
              className="flex-1 inline-flex items-center justify-center gap-2 text-[14px] font-medium px-4 py-3.5 rounded-full"
              style={{
                color: "#0d2a3f",
                background: "rgba(255,255,255,0.80)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 20px rgba(0,50,100,0.10)",
              }}
            >
              <ArrowRight size={14} strokeWidth={2} /> See my works
            </motion.a>

            <div className="flex items-center gap-2">
              {socials.slice(0, 2).map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                  style={{
                    color: "rgba(13,42,63,0.75)",
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.60)",
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="hidden lg:flex absolute right-8 bottom-16 z-30 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p
          className="text-[9px] font-bold tracking-[0.25em] uppercase"
          style={{ writingMode: "vertical-lr", color: "rgba(13,42,63,0.50)" }}
        >
          Scroll
        </p>
        <div
          className="w-[2px] h-10 rounded-full overflow-hidden"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.50), transparent)" }}
        >
          <motion.div
            className="w-full h-1/2 rounded-full"
            style={{ background: "rgba(13,42,63,0.55)" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>

    </section>
  );
}
