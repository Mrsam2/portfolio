"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, User, Briefcase, Mail, Settings } from "lucide-react"

export default function NavigationHUD() {
  const navItems = [
    { icon: Home, label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { icon: User, label: "About", action: () => console.log("Navigate to about") },
    { icon: Briefcase, label: "Projects", action: () => console.log("Navigate to projects") },
    { icon: Mail, label: "Contact", action: () => window.open("mailto:Swankhede228@gmail.com", "_blank") },
    { icon: Settings, label: "Settings", action: () => console.log("Open settings") },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30"
    >
      <div className="bg-black/80 backdrop-blur-md border border-gray-700 rounded-full p-2 space-y-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={item.action}
            className="w-10 h-10 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
            title={item.label}
          >
            <item.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>
    </motion.div>
  )
}
