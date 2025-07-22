"use client"

// Disable Troika WASM font loader – prevents “WebAssembly compilation aborted” errors
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.TROIKA_DISABLE_WASM = true
}

import { useState, useRef, Suspense } from "react" // Added Suspense
import { useFrame, useLoader } from "@react-three/fiber" // Added useLoader
import { Text } from "@react-three/drei"
import * as THREE from "three" // Import THREE for TextureLoader

const projects = [
  {
    id: "uba-website",
    name: "UBA College Website",
    type: "planet",
    position: [-4.5, 2.5, -2], // Adjusted position
    color: "#ff66aa", // Pinkish hue
    size: 1.0, // Adjusted size
    description: "Dynamic website showcasing rural development projects under UBA initiative",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    link: "https://uba.stvincentngp.edu.in/",
    github: "https://github.com/Mrsam2/uba-website",
    texturePath: "/images/planet-pink-porous.png", // New texture
  },
  {
    id: "vector-lab",
    name: "Vector-Lab Website",
    type: "planet",
    position: [4, 2, 0], // Adjusted position
    color: "#ffaa00", // Orange hue
    size: 0.9, // Adjusted size
    description: "Responsive corporate website showcasing IT solutions and digital services",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Firebase"],
    link: "https://web1.vectorlab.in/site2/",
    github: "https://github.com/Mrsam2/vector-lab",
    texturePath: "/images/planet-orange-cratered.png", // New texture
  },
  {
    id: "gram-arogya",
    name: "Gram Arogya Seva App",
    type: "planet", // Changed to planet
    position: [0, -2, 3], // Adjusted position
    color: "#00cc99", // Teal hue
    size: 0.8, // Adjusted size
    description: "Telemedicine app for rural healthcare with appointment booking and virtual consultations",
    tech: ["Flutter", "Firebase", "Dart"],
    link: "https://github.com/Mrsam2/Gram-Arogya-Seva-App",
    github: "https://github.com/Mrsam2/Gram-Arogya-Seva-App",
    texturePath: "/images/planet-teal-wavy.png", // New texture
  },
  {
    id: "infinity-event",
    name: "Infinity Event Website",
    type: "planet", // Changed to planet
    position: [3, -1, -3], // Adjusted position
    color: "#ff3399", // Deep pink hue
    size: 0.7, // Adjusted size
    description: "Professional website for major technical event organized by college department",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://infinity2024.vercel.app/",
    github: "https://github.com/Mrsam2/infinity-event",
    texturePath: "/images/planet-pink-wavy.png", // New texture
  },
  {
    id: "insight-event",
    name: "Insight Event Website",
    type: "planet", // Changed to planet
    position: [-2.5, -3.5, 1.5], // Adjusted position
    color: "#6699ff", // Blue hue
    size: 0.75, // Adjusted size
    description: "Professional website for major cultural event organized by college department",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://infinity-event2024.vercel.app/",
    github: "https://github.com/Mrsam2/insight-event",
    texturePath: "/images/planet-blue-striped.png", // New texture
  },
  // Added a placeholder for the purple cratered planet, not tied to a project in the current UI screenshot
  {
    id: "mystery-planet",
    name: "Mystery Planet",
    type: "planet",
    position: [5, -4, -1], // Example position, outside main cluster
    color: "#9933ff", // Purple hue
    size: 0.6,
    description: "A mysterious planet floating in the void.",
    tech: ["Unknown"],
    link: "#",
    github: "#",
    texturePath: "/images/planet-purple-cratered.png", // New texture
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

function CelestialObject({
  project,
  onClick,
  isMobile,
}: { project: any; onClick: (project: any) => void; isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useLoader(THREE.TextureLoader, project.texturePath) // Changed to useLoader with THREE.TextureLoader

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005 // Slower rotation
      // Floating animation - only apply if not on mobile
      if (!isMobile) {
        meshRef.current.position.y =
          project.position[1] + Math.sin(state.clock.elapsedTime + project.position[0]) * 0.05 // Subtler float
      }
    }
  })

  return (
    <group position={project.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(project)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1} // Slightly reduced hover scale
      >
        <sphereGeometry args={[project.size, 64, 64]} /> {/* Increased segments for smoother sphere */}
        <meshStandardMaterial
          map={texture} // Apply the loaded texture
          metalness={0.6} // Glossy look
          roughness={0.4} // Less rough
          emissive={project.color}
          emissiveIntensity={hovered ? 0.2 : 0.1} // Increased emissive intensity for brighter glow
        />
      </mesh>

      {/* Project name label - only show on hover */}
      <Text
        position={[0, project.size + 0.3, 0]} // Adjusted position for text
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        visible={hovered}
        material-toneMapped={false} // Prevent color shift
      >
        {project.name}
      </Text>

      {/* Orbital ring removed as per new design */}
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
      {/* Central Sun (Personal Brand) - Maintained */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[isMobile ? 0.8 : 1, 32, 32]} />
        <meshStandardMaterial color="#ff9100ff" emissive="#FFD700" emissiveIntensity={5} />
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

      {/* Projects as celestial objects with new textures */}
      {mobileProjects.map((project) => (
        <Suspense key={project.id} fallback={null}>
          {" "}
          {/* Wrap each CelestialObject in Suspense */}
          <CelestialObject project={project} onClick={onProjectClick} isMobile={isMobile} />
        </Suspense>
      ))}

      {/* Skills constellation - Maintained */}
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
