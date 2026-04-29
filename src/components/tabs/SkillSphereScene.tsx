import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Line, Stars, Text } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { domains, skills, type DomainId, type SkillImportance } from "./skillsData";
import { Group, Vector3 } from "three";

const skillsMap = new Map(skills.map((skill) => [skill.id, skill]));
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const MAX_SKILLS_PER_DOMAIN = 50;

type SkillGlobeNode = {
  skillId: string;
  skillName: string;
  importance: SkillImportance;
  domainId: DomainId;
  domainColor: string;
  normal: [number, number, number];
  pointPosition: [number, number, number];
};

const scaleVector = (vector: [number, number, number], scalar: number): [number, number, number] => [
  vector[0] * scalar,
  vector[1] * scalar,
  vector[2] * scalar,
];

const createSkillGlobeNodes = (): SkillGlobeNode[] => {
  const seenSkillIds = new Set<string>();
  const pickedSkills = domains.flatMap((domain, domainIndex) =>
    domain.highlightedSkillIds
      .slice(0, MAX_SKILLS_PER_DOMAIN)
      .map((skillId, localIndex) => {
        if (seenSkillIds.has(skillId)) return null;
        const skill = skillsMap.get(skillId);
        if (!skill) return null;
        seenSkillIds.add(skillId);
        return {
          skillId: skill.id,
          skillName: skill.name,
          importance: skill.importance,
          domainId: domain.id,
          domainColor: domain.color,
          domainIndex,
          localIndex,
        };
      })
      .filter(Boolean) as Array<{
    skillId: string;
    skillName: string;
    importance: SkillImportance;
    domainId: DomainId;
    domainColor: string;
    domainIndex: number;
    localIndex: number;
  }>
  );

  const total = pickedSkills.length;
  return pickedSkills.map((item, index) => {
    const yBase = 1 - ((index + 0.5) / total) * 2;
    const y = Math.max(-0.93, Math.min(0.93, yBase + Math.sin((index + 1.6) * 1.13) * 0.06));
    const radius = Math.sqrt(1 - y * y);
    const theta = index * GOLDEN_ANGLE + item.domainIndex * 0.44 + item.localIndex * 0.16;
    const normalVec = new Vector3(
      Math.cos(theta) * radius,
      y,
      Math.sin(theta) * radius
    ).normalize();
    const normal = normalVec.toArray() as [number, number, number];
    const pointPosition = scaleVector(normal, 1.44 + (item.localIndex % 2 === 0 ? 0.02 : -0.015));

    return {
      skillId: item.skillId,
      skillName: item.skillName,
      importance: item.importance,
      domainId: item.domainId,
      domainColor: item.domainColor,
      normal,
      pointPosition,
    };
  });
};

// Background Particle Field
function ParticleShell({ particleColor }: { particleColor: string }) {
  const points = useMemo(() => {
    const positions = [] as number[];
    for (let i = 0; i < 300; i += 1) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.9 + Math.random() * 0.6;
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
      <pointsMaterial size={0.035} color={particleColor} transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

// Main Skill Cosmos Sphere
function SkillCosmos({ 
  activeDomainId, 
  activeSkillId,
  theme
}: { 
  activeDomainId: DomainId | null;
  activeSkillId: string | null;
  theme: "light" | "dark";
}) {
  const sphereRef = useRef<Group>(null);
  const { viewport, mouse } = useThree();
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const nodes = useMemo(() => createSkillGlobeNodes(), []);
  const isLightTheme = theme === "light";
  const coreSphereColor = isLightTheme ? "#263247" : "#111827";
  const coreSphereEmissive = isLightTheme ? "#0f4c81" : "#0b3b58";
  const wireframeColor = isLightTheme ? "#ff9b8f" : "#7ee2ff";
  const outerGlowColor = isLightTheme ? "#7ec8ff" : "#31d1ff";
  const pointBaseColor = isLightTheme ? "#081121" : "#081121";
  const labelColor = isLightTheme ? "#f8fbff" : "#f8fbff";
  const labelOutlineColor = isLightTheme ? "#0b1220" : "#041221";
  const centerColor = isLightTheme ? "#fff0f0" : "#0d1220";
  
  useFrame((state) => {
    if (!sphereRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    // Slower rotation for more elegant feel
    sphereRef.current.rotation.y = elapsed * 0.08;
    sphereRef.current.rotation.x = Math.sin(elapsed / 8) * 0.06;
    // Subtle mouse parallax
    sphereRef.current.position.x = mouse.x * viewport.width * 0.08;
    sphereRef.current.position.y = mouse.y * viewport.height * 0.05;
  });

  return (
    <group ref={sphereRef}>
      {/* Core Sphere */}
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshStandardMaterial
          color={coreSphereColor}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.75}
          emissive={coreSphereEmissive}
          emissiveIntensity={0.25}
        />
      </mesh>
      
      {/* Inner Wireframe */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <icosahedronGeometry args={[1.44, 3]} />
        <meshBasicMaterial color={wireframeColor} transparent opacity={0.1} wireframe />
      </mesh>
      
      {/* Outer Glow */}
      <mesh scale={[1.22, 1.22, 1.22]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={outerGlowColor} roughness={0.9} transparent opacity={0.03} />
      </mesh>
      
      {/* Skill dots + city-style labels */}
      {nodes.map((node) => {
        const domainVisible = !activeDomainId || activeDomainId === node.domainId;
        const isSelected = activeSkillId === node.skillId;
        const isHovered = hoveredSkillId === node.skillId;
        const emphasis = isHovered || isSelected;
        const skillVisible = !activeSkillId || isSelected;
        const opacity = domainVisible && skillVisible ? 1 : 0.18;
        const pointSize =
          node.importance === "core"
            ? emphasis ? 0.038 : 0.032
            : node.importance === "strong"
              ? emphasis ? 0.034 : 0.028
              : emphasis ? 0.03 : 0.024;
        const labelDistance = emphasis ? 1.67 : 1.6;
        const lineEndDistance = emphasis ? 1.61 : 1.54;
        const labelPosition = scaleVector(node.normal, labelDistance);
        const lineEndPosition = scaleVector(node.normal, lineEndDistance);

        return (
          <group key={node.skillId}>
            <Line
              points={[
                node.pointPosition,
                lineEndPosition,
              ] as [number, number, number][]}
              color={node.domainColor}
              lineWidth={emphasis ? 1.3 : 0.9}
              transparent
              opacity={opacity * (emphasis ? 1 : 0.72)}
            />
            <mesh position={node.pointPosition}>
              <sphereGeometry args={[pointSize, 16, 16]} />
              <meshStandardMaterial
                color={pointBaseColor}
                emissive={node.domainColor}
                emissiveIntensity={emphasis ? 1.4 : 0.95}
                transparent
                opacity={opacity}
              />
            </mesh>
            <mesh position={node.pointPosition}>
              <sphereGeometry args={[pointSize * 2.25, 14, 14]} />
              <meshBasicMaterial
                color={node.domainColor}
                transparent
                opacity={opacity * (emphasis ? 0.2 : 0.09)}
              />
            </mesh>
            <Billboard position={labelPosition}>
              <Text
                fontSize={emphasis ? 0.07 : 0.062}
                color={labelColor}
                outlineColor={labelOutlineColor}
                outlineWidth={0.004}
                anchorX="center"
                anchorY="middle"
                textAlign="center"
                maxWidth={1.4}
                fillOpacity={opacity * (emphasis ? 1 : 0.92)}
                onPointerOver={(event) => {
                  event.stopPropagation();
                  setHoveredSkillId(node.skillId);
                }}
                onPointerOut={(event) => {
                  event.stopPropagation();
                  setHoveredSkillId((current) => (current === node.skillId ? null : current));
                }}
              >
                {node.skillName.toUpperCase()}
              </Text>
            </Billboard>
          </group>
        );
      })}
      
      {/* Background Particles */}
      <ParticleShell particleColor={wireframeColor} />
      
      {/* Center Core */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.18, 2]} />
        <meshStandardMaterial 
          emissive="#ffffff" 
          emissiveIntensity={0.85} 
          color={centerColor}
          roughness={0.2} 
          metalness={0.9} 
          transparent 
          opacity={0.95} 
        />
      </mesh>
    </group>
  );
}

interface Props {
  activeDomainId: DomainId | null;
  activeSkillId: string | null;
  theme: "light" | "dark";
}

export default function SkillSphereScene({ activeDomainId, activeSkillId, theme }: Props) {
  const isLightTheme = theme === "light";
  const sceneBackground = isLightTheme ? "#101826" : "#05070f";
  const primaryLightColor = isLightTheme ? "#78d4ff" : "#70d5ff";
  const secondaryLightColor = isLightTheme ? "#ff8a80" : "#ff5ebe";
  const frameBackground = isLightTheme ? "#131d2d" : "var(--surface-muted)";

  return (
    <div
      className="relative h-[360px] w-full overflow-hidden rounded-[1.6rem] border border-[var(--border)] shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:h-[420px] md:h-[460px] lg:h-[520px] lg:rounded-[2.5rem] lg:shadow-[0_50px_120px_rgba(0,0,0,0.45)]"
      style={{ backgroundColor: frameBackground }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 38 }} shadows>
        <color attach="background" args={[sceneBackground]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[6, 4, 8]} intensity={1.1} color={primaryLightColor} />
        <pointLight position={[-5, -2, -5]} intensity={0.35} color={secondaryLightColor} />
        <Stars radius={40} depth={60} count={2500} factor={4} saturation={0.3} fade />
        <SkillCosmos activeDomainId={activeDomainId} activeSkillId={activeSkillId} theme={theme} />
      </Canvas>
    </div>
  );
}
