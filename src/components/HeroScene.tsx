import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Minimal Three.js type shims ── */
interface Disposable { dispose: () => void; }
interface Vec3 { set(x: number, y: number, z: number): void; }
interface Euler { x: number; y: number; z: number; }
interface Object3D { rotation: Euler; }
interface MeshLike extends Object3D { position: Vec3; }
interface CameraLike {
  position: Vec3;
  aspect: number;
  updateProjectionMatrix(): void;
}
interface RendererLike extends Disposable {
  domElement: HTMLCanvasElement;
  setPixelRatio(r: number): void;
  setSize(w: number, h: number): void;
  setClearColor(color: number, alpha: number): void;
  render(scene: unknown, camera: unknown): void;
}
interface LightLike { position: Vec3; }
interface SceneLike {
  add(...objs: unknown[]): void;
  rotation: Euler;
}
interface ThreeNamespace {
  Scene: new () => SceneLike;
  PerspectiveCamera: new (fov: number, aspect: number, near: number, far: number) => CameraLike;
  WebGLRenderer: new (p: { antialias: boolean; alpha: boolean }) => RendererLike;
  IcosahedronGeometry: new (r: number, d: number) => Disposable;
  TorusGeometry: new (r: number, tube: number, rs: number, ts: number) => Disposable;
  MeshPhysicalMaterial: new (p: Record<string, unknown>) => Disposable;
  MeshBasicMaterial: new (p: Record<string, unknown>) => Disposable;
  Mesh: new (geo: unknown, mat: unknown) => MeshLike;
  PointLight: new (color: string | number, intensity: number, distance?: number) => LightLike;
  DirectionalLight: new (color: string | number, intensity: number) => LightLike;
  AmbientLight: new (color: string | number, intensity: number) => unknown;
}

declare global {
  interface Window { THREE?: ThreeNamespace; }
}

const THREE_CDN = "https://unpkg.com/three@0.181.1/build/three.min.js";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    let frameId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const initScene = () => {
      const THREE = window.THREE;
      if (!THREE || !mountNode) return undefined;

      const scene = new THREE.Scene();
      const w = mountNode.clientWidth;
      const h = mountNode.clientHeight;

      const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0xffffff, 1);
      mountNode.appendChild(renderer.domElement);

      /* Main sphere — dark charcoal with metallic sheen */
      const sphereGeo = new THREE.IcosahedronGeometry(1.35, 10);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: 0x1d1d1f,
        roughness: 0.22,
        metalness: 0.88,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        reflectivity: 1,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      scene.add(sphere);

      /* Orbital ring 1 — Apple blue */
      const ringGeo1 = new THREE.TorusGeometry(2.1, 0.018, 6, 80);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x0071e3,
        transparent: true,
        opacity: 0.55,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = 1.1;
      ring1.rotation.y = 0.4;
      scene.add(ring1);

      /* Orbital ring 2 — muted gray */
      const ringGeo2 = new THREE.TorusGeometry(2.7, 0.012, 6, 80);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xaeaeb2,
        transparent: true,
        opacity: 0.35,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.x = 0.5;
      ring2.rotation.z = 0.8;
      scene.add(ring2);

      /* Lights */
      const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
      keyLight.position.set(4, 4, 4);
      scene.add(keyLight);

      const fillLight = new THREE.PointLight(0x0071e3, 2.5, 20);
      fillLight.position.set(-3.5, 1, 3);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight(0xe8e8ed, 2, 15);
      rimLight.position.set(0, -2.5, -3);
      scene.add(rimLight);

      scene.add(new THREE.AmbientLight(0xfafafa, 0.4));

      const onResize = () => {
        if (!mountNode) return;
        camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        sphere.rotation.x += 0.0028;
        sphere.rotation.y += 0.004;
        ring1.rotation.z += 0.006;
        ring2.rotation.z -= 0.004;
        scene.rotation.x += (-mouseY * 0.18 - scene.rotation.x) * 0.05;
        scene.rotation.y += (mouseX * 0.18 - scene.rotation.y) * 0.05;
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };
      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        window.cancelAnimationFrame(frameId);
        sphereGeo.dispose();
        sphereMat.dispose();
        ringGeo1.dispose();
        ringMat1.dispose();
        ringGeo2.dispose();
        ringMat2.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mountNode) {
          mountNode.removeChild(renderer.domElement);
        }
      };
    };

    let destroy: undefined | (() => void);

    if (!window.THREE) {
      const script = document.createElement("script");
      script.src = THREE_CDN;
      script.async = true;
      script.onload = () => { destroy = initScene(); };
      document.head.appendChild(script);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        destroy?.();
      };
    }

    destroy = initScene();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      destroy?.();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15 }}
      className="animate-float h-[260px] sm:h-[310px] w-full rounded-[24px] overflow-hidden shadow-xl shadow-black/[0.08]"
      style={{ background: "#ffffff" }}
    >
      <div ref={mountRef} className="w-full h-full" />
    </motion.div>
  );
}
