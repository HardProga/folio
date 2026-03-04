import { useEffect, useRef } from "react";

interface Disposable {
  dispose: () => void;
}

interface MeshLike {
  rotation: { x: number; y: number };
}

interface CameraLike {
  position: { z: number };
  aspect: number;
  updateProjectionMatrix: () => void;
}

interface RendererLike extends Disposable {
  domElement: HTMLCanvasElement;
  setPixelRatio: (ratio: number) => void;
  setSize: (width: number, height: number) => void;
  render: (scene: unknown, camera: unknown) => void;
}

interface LightLike {
  position: { set: (x: number, y: number, z: number) => void };
}

interface ThreeNamespace {
  Scene: new () => { add: (object: unknown) => void };
  PerspectiveCamera: new (
    fov: number,
    aspect: number,
    near: number,
    far: number,
  ) => CameraLike;
  WebGLRenderer: new (params: { antialias: boolean; alpha: boolean }) => RendererLike;
  IcosahedronGeometry: new (radius: number, detail: number) => Disposable;
  MeshPhysicalMaterial: new (params: Record<string, unknown>) => Disposable;
  Mesh: new (geometry: unknown, material: unknown) => MeshLike;
  PointLight: new (color: string, intensity: number, distance?: number) => LightLike;
  AmbientLight: new (color: string, intensity: number) => unknown;
}

declare global {
  interface Window {
    THREE?: ThreeNamespace;
  }
}

const THREE_CDN = "https://unpkg.com/three@0.181.1/build/three.min.js";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    let frameId = 0;

    const initScene = () => {
      const THREE = window.THREE;
      if (!THREE || !mountNode) return undefined;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        mountNode.clientWidth / mountNode.clientHeight,
        0.1,
        100,
      );
      camera.position.z = 4;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      mountNode.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.3, 10);
      const material = new THREE.MeshPhysicalMaterial({
        color: "#7fc5ff",
        roughness: 0.15,
        metalness: 0.75,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const lightA = new THREE.PointLight("#ffffff", 28, 40);
      lightA.position.set(3.5, 3.5, 4.5);
      scene.add(lightA);

      const lightB = new THREE.PointLight("#bf5af2", 22, 30);
      lightB.position.set(-3, -2, 3);
      scene.add(lightB);

      scene.add(new THREE.AmbientLight("#5ea8ff", 0.45));

      const onResize = () => {
        if (!mountNode) return;
        camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      };

      window.addEventListener("resize", onResize);

      const animate = () => {
        mesh.rotation.x += 0.0035;
        mesh.rotation.y += 0.005;
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };
      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        window.cancelAnimationFrame(frameId);
        geometry.dispose();
        material.dispose();
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
      script.onload = () => {
        destroy = initScene();
      };
      mountNode.appendChild(script);

      return () => {
        destroy?.();
        if (script.parentNode === mountNode) {
          mountNode.removeChild(script);
        }
      };
    }

    destroy = initScene();

    return () => {
      destroy?.();
    };
  }, []);

  return (
    <div className="h-[260px] sm:h-[320px] w-full rounded-[28px] glass-card overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
