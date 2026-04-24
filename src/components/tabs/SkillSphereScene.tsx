import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryId, SkillCategory } from "./skillsData";
import { skillCategories } from "./skillsData";
import { Color, Group, Vector3 } from "three";

const orbitMap: Record<CategoryId, [number, number, number]> = {
  ai: [1.6, 0.4, -1.2],
  backend: [-1.5, 0.8, 1.1],
  frontend: [0.4, -1.3, 1.4],
  databases: [1.1, -0.8, -1.3],
  infra: [-1.3, -1.0, 1.0],
  languages: [0.2, 1.5, 0.9],
};

const createClusterLines = (offset: [number, number, number], color: string) => {
  const lines: Array<[number, number, number][]> = [];
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    const radius = 1.7 + (i % 3) * 0.08;
    const start = new Vector3(
      Math.cos(angle) * 1.28,
      Math.sin(angle) * 0.28,
      Math.sin(angle * 1.2) * 1.28
    );
    const end = start.clone().multiplyScalar(radius).add(new Vector3(...offset).multiplyScalar(0.12));
    lines.push([start.toArray(), end.toArray()]);
  }
  return lines;
};

function RadiatingCluster({ category, active }: { category: SkillCategory; active: boolean }) {
  const lines = useMemo(() => createClusterLines(orbitMap[category.id], category.color), [category]);
  const opacity = active ? 1 : 0.16;
  return (
    <group>
      {lines.map((segment, index) => (
        <Line
          key={`${category.id}-${index}`}
          points={segment as [number, number, number][]}
          color={category.color}
          lineWidth={active ? 2.2 : 0.8}
          transparent
          opacity={opacity}
          dashed={false}
        />
      ))}
      {lines.map((segment, index) => (
        <mesh key={`${category.id}-dot-${index}`} position={segment[1]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial emissive={new Color(category.color)} color="#111827" emissiveIntensity={active ? 0.85 : 0.32} transparent opacity={active ? 0.9 : 0.4} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleShell() {
  const points = useMemo(() => {
    const positions = [] as number[];
    for (let i = 0; i < 220; i += 1) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.85 + Math.random() * 0.5;
      positions.push(Math.cos(theta) * Math.sin(phi) * radius);
      positions.push(Math.sin(theta) * Math.sin(phi) * radius);
      positions.push(Math.cos(phi) * radius);
    }
    return new Float32Array(positions);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#7ee2ff" transparent opacity={0.45} depthWrite={false} />
    </points>
  );
}

function SkillSphere({ activeCategoryId }: { activeCategoryId: CategoryId | null }) {
  const sphereRef = useRef<Group>(null);
  const { viewport, mouse } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!sphereRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    sphereRef.current.rotation.y = elapsed * 0.12;
    sphereRef.current.rotation.x = Math.sin(elapsed / 6) * 0.08;
    sphereRef.current.position.x = mouse.x * viewport.width * 0.12;
    sphereRef.current.position.y = mouse.y * viewport.height * 0.08;
  });

  useEffect(() => {
    const handle = () => setHovered(false);
    window.addEventListener("pointerleave", handle);
    return () => window.removeEventListener("pointerleave", handle);
  }, []);

  return (
    <group ref={sphereRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshStandardMaterial
          color="#111827"
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.8}
          emissive="#0b3b58"
          emissiveIntensity={0.28}
        />
      </mesh>
      <mesh scale={[1.05, 1.05, 1.05]}>
        <icosahedronGeometry args={[1.44, 3]} />
        <meshBasicMaterial color="#7ee2ff" transparent opacity={0.12} wireframe />
      </mesh>
      <mesh scale={[1.22, 1.22, 1.22]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#31d1ff" roughness={0.9} transparent opacity={0.04} />
      </mesh>
      {skillCategories.map((category) => (
        <RadiatingCluster key={category.id} category={category} active={!activeCategoryId || activeCategoryId === category.id} />
      ))}
      <ParticleShell />
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.18, 2]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={0.9} color="#0d1220" roughness={0.2} metalness={0.9} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

export default function SkillSphereScene({ activeCategoryId }: { activeCategoryId: CategoryId | null }) {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#05070f] shadow-[0_50px_120px_rgba(0,0,0,0.45)]">
      <Canvas camera={{ position: [0, 0, 6], fov: 38 }} shadows>
        <color attach="background" args={["#05070f"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 4, 8]} intensity={1.1} color="#70d5ff" />
        <pointLight position={[-5, -2, -5]} intensity={0.35} color="#ff5ebe" />
        <Stars radius={40} depth={60} count={2500} factor={4} saturation={0.3} fade />
        <SkillSphere activeCategoryId={activeCategoryId} />
      </Canvas>
    </div>
  );
}
