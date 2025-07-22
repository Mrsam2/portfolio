"use client"

export const dynamicClient = "force-dynamic"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic" // Import dynamic
import { motion, AnimatePresence } from "framer-motion"
import ProjectModal from "@/components/project-modal"
import TerminalOverlay from "@/components/terminal-overlay"
import NavigationHUD from "@/components/navigation-hud"
import WelcomeSequence from "@/components/welcome-sequence"
import MobileMenu from "@/components/mobile-menu"
import { Button } from "@/components/ui/button"
import { Terminal, Github, Linkedin, Mail, Menu, X, Download } from "lucide-react" // Changed Bot to Download
import { useMediaQuery } from "@/hooks/use-media-query"

// Dynamically import Canvas and its children with SSR disabled
const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false })
const DynamicStars = dynamic(() => import("@react-three/drei").then((mod) => mod.Stars), { ssr: false })
const DynamicOrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), { ssr: false })
const DynamicGalaxyScene = dynamic(() => import("@/components/galaxy-scene"), { ssr: false })

export default function CosmicPortfolio() {
  // Avoid reading window during SSR
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1920
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1080

  const [selectedProject, setSelectedProject] = useState(null)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [galaxyLoaded, setGalaxyLoaded] = useState(false)
  // Removed showSplineBot state

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    const timer = setTimeout(() => {
      setGalaxyLoaded(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
  }

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Welcome Sequence */}
      <AnimatePresence>{showWelcome && <WelcomeSequence onComplete={handleWelcomeComplete} />}</AnimatePresence>

      {/* Main Galaxy Scene */}
      <div className="absolute inset-0">
        <DynamicCanvas
          camera={{
            position: [0, 0, isMobile ? 15 : 10],
            fov: isMobile ? 85 : 75,
          }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} /> {/* Increased ambient light */}
          <pointLight position={[10, 10, 10]} intensity={1.5} /> {/* Increased point light */}
          {/* Starfield – higher factor for brighter stars */}
          <DynamicStars
            radius={300}
            depth={50}
            count={isMobile ? 2000 : 5000}
            factor={6}
            saturation={0}
            fade
            speed={1}
          />
          <DynamicGalaxyScene onProjectClick={handleProjectClick} isMobile={isMobile} />
          <DynamicOrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={isMobile ? 8 : 5}
            maxDistance={isMobile ? 30 : 50}
            autoRotate={!isMobile}
            autoRotateSpeed={0.2}
            touches={{
              ONE: 2, // TOUCH.ROTATE
              TWO: 1, // TOUCH.DOLLY_PAN
            }}
          />
        </DynamicCanvas>
      </div>

      {/* Mobile Menu Toggle */}
      {isMobile && !showTerminal && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: galaxyLoaded ? 1 : 0, scale: galaxyLoaded ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-4 right-4 z-50"
        >
          <Button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="bg-black/80 backdrop-blur-md border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 w-12 h-12 rounded-full p-0"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </motion.div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && isMobile && <MobileMenu onClose={() => setShowMobileMenu(false)} />}
      </AnimatePresence>

      {/* Desktop/Tablet Navigation HUD */}
      {!isMobile && <NavigationHUD />}

      {/* Developer Info Panel - Responsive */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: galaxyLoaded ? 1 : 0, x: galaxyLoaded ? 0 : -100 }}
        transition={{ delay: 1, duration: 1 }}
        className={`absolute ${
          isMobile ? "bottom-20 left-4 right-4" : isTablet ? "top-4 left-4 max-w-xs" : "top-6 left-6 max-w-sm"
        } bg-black/90 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 ${isMobile ? "text-center" : ""}`}
      >
        <div className={`flex items-center gap-3 mb-3 ${isMobile ? "justify-center" : ""}`}>
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <img
              src="/profile-image.jpg"
              alt="Saurabh Wankhede's profile picture"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-white`}>Saurabh Wankhede</h1>
            <p className="text-cyan-400 text-sm">Developer</p>
          </div>
        </div>

        <p className={`text-gray-300 text-sm mb-4 ${isMobile ? "hidden" : ""}`}>
          Computer Engineering Student exploring the cosmos of code. Navigate through my universe of projects and
          skills.
        </p>

        <div className={`flex gap-2 ${isMobile ? "justify-center" : ""}`}>
          <Button
            size="sm"
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 bg-transparent text-xs px-2"
            onClick={() => window.open("https://github.com/Mrsam2", "_blank")}
          >
            <Github className="w-3 h-3 mr-1" />
            {isMobile ? "" : "GitHub"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 bg-transparent text-xs px-2"
            onClick={() => window.open("https://www.linkedin.com/in/saurabh-wankhede-025359202/", "_blank")}
          >
            <Linkedin className="w-3 h-3 mr-1" />
            {isMobile ? "" : "LinkedIn"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-green-500/50 text-green-400 hover:bg-green-500/20 bg-transparent text-xs px-2"
            onClick={() => window.open("mailto:Swankhede228@gmail.com", "_blank")}
          >
            <Mail className="w-3 h-3 mr-1" />
            {isMobile ? "" : "Contact"}
          </Button>
        </div>
      </motion.div>

      {/* Terminal Toggle and Download CV Button - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: galaxyLoaded ? 1 : 0, y: galaxyLoaded ? 0 : 100 }}
        transition={{ delay: 1.5, duration: 1 }}
        className={`absolute bottom-6 ${isMobile ? "left-4 right-4 flex justify-center gap-2" : "left-6 flex gap-4"}`}
      >
        <Button
          asChild
          className={`bg-black/80 backdrop-blur-md border border-purple-500/50 text-purple-400 hover:bg-purple-500/20 ${
            isMobile ? "text-xs px-3 py-2" : ""
          }`}
        >
          <a href="/Saurabh_Wankhede_Resume.pdf" download="Saurabh_Wankhede_Resume.pdf">
            <Download className={`${isMobile ? "w-3 h-3 mr-1" : "w-4 h-4 mr-2"}`} />
            {isMobile ? "Resume" : "Download CV"}
          </a>
        </Button>
        <Button
          onClick={() => setShowTerminal(!showTerminal)}
          className={`bg-black/80 backdrop-blur-md border border-green-500/50 text-green-400 hover:bg-green-500/20 ${
            isMobile ? "text-xs px-3 py-2" : ""
          }`}
        >
          <Terminal className={`${isMobile ? "w-3 h-3 mr-1" : "w-4 h-4 mr-2"}`} />
          {isMobile ? "Terminal" : showTerminal ? "Close Terminal" : "Open Terminal"}
        </Button>
      </motion.div>

      {/* Instructions - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: galaxyLoaded ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
          className={`absolute top-6 right-6 bg-black/80 backdrop-blur-md border border-yellow-500/30 rounded-lg p-4 ${
            isTablet ? "max-w-xs text-sm" : "max-w-xs"
          }`}
        >
          <h3 className="text-yellow-400 font-semibold mb-2">Navigation Guide</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• {isTablet ? "Touch" : "Click"} celestial objects to explore</li>
            <li>• {isTablet ? "Pinch/drag" : "Drag"} to rotate the galaxy</li>
            <li>• {isTablet ? "Pinch" : "Scroll"} to zoom in/out</li>
            <li>• Use terminal for command navigation</li>
          </ul>
        </motion.div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} isMobile={isMobile} />
        )}
      </AnimatePresence>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {showTerminal && <TerminalOverlay onClose={() => setShowTerminal(false)} isMobile={isMobile} />}
      </AnimatePresence>

      {/* Cosmic Particles Effect - Reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * viewportWidth,
              y: Math.random() * viewportHeight,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * viewportWidth,
              y: Math.random() * viewportHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}
