import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lightweight WebGL backdrop for the hero: a wireframe icosahedron cluster and
 * a soft particle shell. Rotates toward the cursor with eased interpolation.
 * Rendering pauses when the hero is off-screen or the tab is hidden.
 * Loaded lazily and only on capable desktop devices (see useRich3D).
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return; // WebGL failed — CSS backdrop remains
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const violet = new THREE.Color('#FF2D95');
    const cyan = new THREE.Color('#007BA7');

    // Geometric object
    const group = new THREE.Group();
    scene.add(group);

    const outer = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.3, 1)),
      new THREE.LineBasicMaterial({ color: violet, transparent: true, opacity: 0.34 }),
    );
    const inner = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.25, 0)),
      new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.55 }),
    );
    const vertsGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const verts = new THREE.Points(
      vertsGeo,
      new THREE.PointsMaterial({ color: '#FF2D95', size: 0.06, transparent: true, opacity: 0.85, sizeAttenuation: true }),
    );
    group.add(outer, inner, verts);

    // Particle shell
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 6;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(p) * Math.cos(t);
      positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(p) - 2;
      tmp.copy(violet).lerp(cyan, Math.random());
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(particles);

    // Layout: object sits to the right on wide screens
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.position.x = w > 1100 ? 2.6 : 1.6;
      group.position.y = 0.1;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer → target rotation
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // Pause when hidden
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) loop();
    });
    io.observe(mount);
    const onVis = () => {
      if (!document.hidden) loop();
    };
    document.addEventListener('visibilitychange', onVis);

    const clock = new THREE.Clock();
    let raf = 0;
    function loop() {
      cancelAnimationFrame(raf);
      if (!visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      current.x += (target.x - current.x) * 0.045;
      current.y += (target.y - current.y) * 0.045;

      group.rotation.y = t * 0.08 + current.x * 0.55;
      group.rotation.x = t * 0.04 + current.y * 0.35;
      inner.rotation.y = -t * 0.22;
      inner.rotation.z = t * 0.12;
      particles.rotation.y = t * 0.012 + current.x * 0.08;
      particles.rotation.x = current.y * 0.05;
      camera.position.x = current.x * 0.35;
      camera.position.y = -current.y * 0.25;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | undefined;
        mat?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />;
}
