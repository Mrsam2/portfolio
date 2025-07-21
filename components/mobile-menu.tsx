"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, User, Briefcase, Mail, Github, Linkedin, Terminal, Star } from "lucide-react"

interface MobileMenuProps {
  onClose: () => void
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const menuItems = [
    { icon: Home, label: "Home", action: () => console.log("Navigate to home") },
    { icon: User, label: "About", action: () => console.log("Navigate to about") },
    { icon: Briefcase, label: "Projects", action: () => console.log("Navigate to projects") },
    { icon: Mail, label: "Contact", action: () => console.log("Navigate to contact") },
  ]

  const socialItems = [
    { icon: Github, label: "GitHub", action: () => window.open("https://github.com/Mrsam2", "_blank") },
    {
      icon: Linkedin,
      label: "LinkedIn",
      action: () => window.open("https://www.linkedin.com/in/saurabh-wankhede-025359202/", "_blank"),
    },
    { icon: Mail, label: "Email", action: () => window.open("mailto:Swankhede228@gmail.com", "_blank") },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900/95 border border-cyan-500/30 rounded-2xl p-8 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Cosmic Menu</h2>
          <p className="text-gray-400 text-sm">Navigate the universe</p>
        </div>

        {/* Navigation Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left text-white hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-200"
              onClick={() => {
                item.action()
                onClose()
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm mb-4 text-center">Connect with me</p>
          <div className="flex gap-3 justify-center">
            {socialItems.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white bg-transparent"
                onClick={() => {
                  item.action()
                  onClose()
                }}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={onClose}>
            <Terminal className="w-4 h-4 mr-2" />
            Open Terminal
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
