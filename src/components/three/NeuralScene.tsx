import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../lib/capabilities';

const BLUE = new THREE.Color('#007BA7');
const ROSE = new THREE.Color('#FF2D95');

function NeuralNetwork({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const { positions, links, colors } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const nodeColors: number[] = [];
    const rings = 5;
    const perRing = 18;
    for (let ring = 0; ring < rings; ring += 1) {
      const latitude = -1.05 + (ring / (rings - 1)) * 2.1;
      const radius = Math.cos(latitude) * 2.1;
      for (let i = 0; i < perRing; i += 1) {
        const longitude = (i / perRing) * Math.PI * 2 + ring * 0.17;
        nodes.push(new THREE.Vector3(radius * Math.cos(longitude), Math.sin(latitude) * 2.1, radius * Math.sin(longitude)));
        const color = BLUE.clone().lerp(ROSE, (ring + i / perRing) / rings);
        nodeColors.push(color.r, color.g, color.b);
      }
    }

    const linePositions: number[] = [];
    nodes.forEach((node, index) => {
      const next = (index + 1) % nodes.length;
      const across = (index + perRing) % nodes.length;
      linePositions.push(node.x, node.y, node.z, nodes[next].x, nodes[next].y, nodes[next].z);
      linePositions.push(node.x, node.y, node.z, nodes[across].x, nodes[across].y, nodes[across].z);
    });
    return { positions: new Float32Array(nodes.flatMap((node) => [node.x, node.y, node.z])), links: new Float32Array(linePositions), colors: new Float32Array(nodeColors) };
  }, []);

  useFrame((_state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += (pointer.y * 0.18 - group.current.rotation.x) * delta * 1.2;
    group.current.rotation.z += (pointer.x * 0.12 - group.current.rotation.z) * delta * 1.2;
  });

  return (
    <group ref={group} scale={0.9}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[links, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#007BA7" transparent opacity={0.28} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.075} vertexColors transparent opacity={0.96} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
      <mesh>
        <sphereGeometry args={[2.08, 32, 32]} />
        <meshBasicMaterial color="#007BA7" transparent opacity={0.025} wireframe blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <NeuralNetwork reduced={reduced} />
      <EffectComposer enabled={!reduced}>
        <Bloom intensity={0.75} luminanceThreshold={0.22} luminanceSmoothing={0.7} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

export default function NeuralScene() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute right-[-8%] top-[12%] hidden h-[560px] w-[560px] opacity-90 md:block">
      <div className="absolute inset-1/4 rounded-full bg-cyan/10 blur-[90px]" />
      <Scene reduced={reduced} />
    </div>
  );
}
