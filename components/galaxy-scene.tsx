"use client"

// Disable Troika WASM font loader – prevents “WebAssembly compilation aborted” errors
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.TROIKA_DISABLE_WASM = true
}

import { useState } from "react"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Sphere, Box, Torus } from "@react-three/drei"
import type * as THREE from "three"

const projects = [
  {
    id: "uba-website",
    name: "UBA College Website",
    type: "planet",
    position: [4, 2, -2],
    color: "#00ff88",
    size: 0.8,
    description: "Dynamic website showcasing rural development projects under UBA initiative",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    link: "https://uba.stvincentngp.edu.in/",
    github: "https://github.com/Mrsam2/uba-website",
  },
  {
    id: "vector-lab",
    name: "Vector-Lab Website",
    type: "planet",
    position: [-3, 1, 3],
    color: "#ff6b6b",
    size: 0.7,
    description: "Responsive corporate website showcasing IT solutions and digital services",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Firebase"],
    link: "https://web1.vectorlab.in/site2/",
    github: "https://github.com/Mrsam2/vector-lab",
  },
  {
    id: "gram-arogya",
    name: "Gram Arogya Seva App",
    type: "star",
    position: [2, -3, 1],
    color: "#4ecdc4",
    size: 0.6,
    description: "Telemedicine app for rural healthcare with appointment booking and virtual consultations",
    tech: ["Flutter", "Firebase", "Dart"],
    link: "https://github.com/Mrsam2/Gram-Arogya-Seva-App",
    github: "https://github.com/Mrsam2/Gram-Arogya-Seva-App",
  },
  {
    id: "infinity-event",
    name: "Infinity Event Website",
    type: "asteroid",
    position: [-2, 3, -1],
    color: "#ffd93d",
    size: 0.5,
    description: "Professional website for major technical event organized by college department",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://infinity2024.vercel.app/",
    github: "https://github.com/Mrsam2/infinity-event",
  },
  {
    id: "insight-event",
    name: "Insight Event Website",
    type: "asteroid",
    position: [3, -1, -3],
    color: "#a8e6cf",
    size: 0.5,
    description: "Professional website for major cultural event organized by college department",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://infinity-event2024.vercel.app/",
    github: "https://github.com/Mrsam2/insight-event",
  },
]

const skills = [
  { name: "React.js", position: [1, 4, 2], color: "#61dafb", proficiency: 0.8 },
  { name: "Python", position: [-4, 0, 1], color: "#3776ab", proficiency: 0.9 },
  { name: "Flutter", position: [0, -4, -2], color: "#02569b", proficiency: 0.7 },
  { name: "JavaScript", position: [5, 1, 0], color: "#f7df1e", proficiency: 0.8 },
  { name: "Node.js", position: [-1, 2, 4], color: "#339933", proficiency: 0.6 },
  { name: "Firebase", position: [2, 0, 3], color: "#ffca28", proficiency: 0.7 },
]

function CelestialObject({ project, onClick }: { project: any; onClick: (project: any) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005

      // Floating animation
      meshRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime + project.position[0]) * 0.2
    }
  })

  const geometry = useMemo(() => {
    switch (project.type) {
      case "planet":
        return <Sphere args={[project.size, 32, 32]} />
      case "star":
        return <Box args={[project.size, project.size, project.size]} />
      case "asteroid":
        return <Torus args={[project.size * 0.6, project.size * 0.3, 8, 16]} />
      default:
        return <Sphere args={[project.size, 32, 32]} />
    }
  }, [project.type, project.size])

  return (
    <group position={project.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(project)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        {geometry}
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Project name label */}
      <Text
        position={[0, project.size + 0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        visible={hovered}
      >
        {project.name}
      </Text>

      {/* Orbital ring for planets */}
      {project.type === "planet" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[project.size + 0.3, 0.02, 8, 32]} />
          <meshBasicMaterial color={project.color} opacity={0.3} transparent />
        </mesh>
      )}
    </group>
  )
}

function SkillConstellation({ skill }: { skill: any }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.02
      // Pulsing effect based on proficiency
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 * skill.proficiency
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={skill.position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.1 * skill.proficiency, 16, 16]} />
        <meshBasicMaterial color={skill.color} />
      </mesh>
      <Text position={[0, 0.3, 0]} fontSize={0.15} color={skill.color} anchorX="center" anchorY="middle">
        {skill.name}
      </Text>
    </group>
  )
}

export default function GalaxyScene({
  onProjectClick,
  isMobile = false,
}: { onProjectClick: (project: any) => void; isMobile?: boolean }) {
  // Adjust project positions for mobile
  const mobileProjects = projects.map((project) => ({
    ...project,
    position: isMobile
      ? [project.position[0] * 0.7, project.position[1] * 0.7, project.position[2] * 0.7]
      : project.position,
    size: isMobile ? project.size * 0.8 : project.size,
  }))

  const mobileSkills = skills.map((skill) => ({
    ...skill,
    position: isMobile ? [skill.position[0] * 0.6, skill.position[1] * 0.6, skill.position[2] * 0.6] : skill.position,
  }))

  return (
    <>
      {/* Central Sun (Personal Brand) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[isMobile ? 0.8 : 1, 32, 32]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.5} />
      </mesh>

      <Text
        position={[0, isMobile ? -1.2 : -1.5, 0]}
        fontSize={isMobile ? 0.2 : 0.3}
        color="#ff6b35"
        anchorX="center"
        anchorY="middle"
      >
        SAURABH WANKHEDE
      </Text>

      {/* Projects as celestial objects */}
      {mobileProjects.map((project) => (
        <CelestialObject key={project.id} project={project} onClick={onProjectClick} />
      ))}

      {/* Skills constellation */}
      {mobileSkills.map((skill, index) => (
        <SkillConstellation key={index} skill={skill} />
      ))}

      {/* Connecting lines between related projects - simplified for mobile */}
      {!isMobile && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={projects.length * 2}
              array={new Float32Array(projects.flatMap((p) => [0, 0, 0, ...p.position]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#333" opacity={0.2} transparent />
        </lineSegments>
      )}
    </>
  )
}
