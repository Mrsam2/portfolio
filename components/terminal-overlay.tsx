"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TerminalOverlayProps {
  onClose: () => void
  isMobile?: boolean
}

interface TypingLine {
  text: string
  isTyping: boolean
  currentIndex: number
  color?: string
}

export default function TerminalOverlay({ onClose, isMobile = false }: TerminalOverlayProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<TypingLine[]>([
    { text: "Welcome to Saurabh's Portfolio Terminal v2.0.1", isTyping: false, currentIndex: 0, color: "white" },
    { text: 'Type "help" for available commands', isTyping: false, currentIndex: 0, color: "white" },
    { text: "", isTyping: false, currentIndex: 0, color: "white" },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus()
    }
  }, [isProcessing])

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    const container = terminalRef.current
    if (!container) return

    // helper
    const scrollToBottom = () => {
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }

    // schedule with rAF and fallback timeout
    requestAnimationFrame(scrollToBottom)
    const t = setTimeout(scrollToBottom, 50)

    return () => clearTimeout(t)
  }, [history])

  // Faster typing animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory]
        let hasTyping = false

        for (let i = 0; i < newHistory.length; i++) {
          const line = newHistory[i]
          if (line.isTyping && line.currentIndex < line.text.length) {
            // Much faster typing speed
            const char = line.text[line.currentIndex]
            let delay = 20 // Much faster base delay

            // Slightly slower for punctuation but still fast
            if (char === "." || char === "," || char === "!" || char === "?") {
              delay = Math.random() * 40 + 20
            } else if (char === " ") {
              delay = Math.random() * 30 + 15
            } else {
              delay = Math.random() * 25 + 10
            }

            // Higher chance to advance for faster typing
            if (Math.random() > 0.1) {
              // 90% chance to advance each tick
              newHistory[i] = {
                ...line,
                currentIndex: line.currentIndex + 1,
              }
            }
            hasTyping = true
            break // Only type one character at a time across all lines
          } else if (line.isTyping && line.currentIndex >= line.text.length) {
            // Finished typing this line
            newHistory[i] = {
              ...line,
              isTyping: false,
            }
          }
        }

        if (!hasTyping) {
          setIsProcessing(false)
        }

        return newHistory
      })
    }, 30) // Faster interval for much quicker animation

    return () => clearInterval(interval)
  }, [])

  const commands = {
    help: () => [
      { text: "Available commands:", color: "white" },
      { text: "about        - Learn about me", color: "white" },
      { text: "projects     - View my projects", color: "white" },
      { text: "skills       - See my technical skills", color: "white" },
      { text: "experience   - My work experience", color: "white" },
      { text: "contact      - How to reach me", color: "white" },
      { text: "education    - My educational background", color: "white" },
      { text: "certifications - View my certifications", color: "white" },
      { text: "leadership   - Leadership and community involvement", color: "white" },
      { text: "github       - Open GitHub profile", color: "white" },
      { text: "linkedin     - Open LinkedIn profile", color: "white" },
      { text: "instagram    - Open Instagram profile", color: "white" },
      { text: "email        - Send me an email", color: "white" },
      { text: "clear        - Clear the terminal", color: "white" },
      { text: "", color: "white" },
      { text: "Type any command to continue...", color: "white" },
      { text: "", color: "white" },
    ],
    about: () => [
      { text: "Saurabh Wankhede - Full-Stack Developer", color: "white" },
      { text: "================================", color: "white" },
      { text: "Computer Engineering student with passion for creating", color: "white" },
      { text: "innovative web and mobile applications. Currently exploring", color: "white" },
      { text: "the intersection of technology and rural development.", color: "white" },
      { text: "", color: "white" },
      { text: "Location: Tirora, Maharashtra, India", color: "white" },
      { text: "CGPA: 7.23/10", color: "white" },
      { text: "Interests: Web Development, Mobile Apps, UI/UX Design", color: "white" },
      { text: "", color: "white" },
    ],
    projects: () => [
      { text: "Active Projects in the Galaxy:", color: "white" },
      { text: "==============================", color: "white" },
      { text: "🪐 UBA College Website - Rural development showcase", color: "white" },
      { text: "🪐 Vector-Lab Website - Corporate IT solutions", color: "white" },
      { text: "⭐ Gram Arogya Seva App - Telemedicine platform", color: "white" },
      { text: "☄️ Infinity Event Website - Technical event portal", color: "white" },
      { text: "☄️ Insight Event Website - Cultural event platform", color: "white" },
      { text: "", color: "white" },
      { text: 'Use "project <name>" for detailed information', color: "white" },
      { text: "", color: "white" },
    ],
    skills: () => [
      { text: "Technical Constellation:", color: "white" },
      { text: "========================", color: "white" },
      { text: "Languages: Python ⭐⭐⭐⭐⭐ | JavaScript ⭐⭐⭐⭐", color: "white" },
      { text: "Frontend: React.js, HTML/CSS, Tailwind CSS", color: "white" },
      { text: "Backend: Node.js, PHP, Firebase", color: "white" },
      { text: "Mobile: Flutter, Dart", color: "white" },
      { text: "Database: MySQL, PostgreSQL, MongoDB, Firebase", color: "white" },
      { text: "Tools: Git, Android Studio, XAMPP, Photoshop", color: "white" },
      { text: "", color: "white" },
    ],
    experience: () => [
      { text: "Professional Journey:", color: "white" },
      { text: "=====================", color: "white" },
      { text: "🚀 VectorLab - Web Development Intern (Apr 2025 - Aug 2025)", color: "white" },
      { text: "   • Built responsive interfaces using Remix and React.js", color: "white" },
      { text: "   • Collaborated with teams on frontend optimization", color: "white" },
      { text: "   • Participated in client requirement gathering", color: "white" },
      { text: "", color: "white" },
      { text: "🌟 Unnat Bharat Abhiyan - Developer (Oct 2024 - May 2025)", color: "white" },
      { text: "   • Developed UBA SVPCET Website", color: "white" },
      { text: "   • Created Virtual Doctor Mobile Application", color: "white" },
      { text: "   • Contributed to rural development initiatives", color: "white" },
      { text: "", color: "white" },
      { text: "💻 Code Clause - Virtual Intern (Nov 2024 - Dec 2024)", color: "white" },
      { text: "   • Developed e-commerce website using HTML, CSS, JS", color: "white" },
      { text: "", color: "white" },
    ],
    education: () => [
      { text: "Academic Trajectory:", color: "white" },
      { text: "===================", color: "white" },
      { text: "🎓 B.Tech Computer Engineering (2022-Present)", color: "white" },
      { text: "   St. Vincent Pallotti College of Engineering", color: "white" },
      { text: "   CGPA: 7.23/10", color: "white" },
      { text: "", color: "white" },
      { text: "📚 Higher Secondary Certificate (2020-2021)", color: "white" },
      { text: "   Chhota Bhai Jawahar Bhai Patel College", color: "white" },
      { text: "   Percentage: 80%", color: "white" },
      { text: "", color: "white" },
      { text: "📖 Secondary School Certificate (2018-2019)", color: "white" },
      { text: "   Shahid Mishra High School", color: "white" },
      { text: "   Percentage: 69%", color: "white" },
      { text: "", color: "white" },
    ],
    certifications: () => [
      { text: "Professional Certifications:", color: "white" },
      { text: "============================", color: "white" },
      { text: "📜 Google Analytics Certification", color: "white" },
      { text: "📜 Data Analytics With Python", color: "white" },
      { text: "📜 Certified Graphic Designer", color: "white" },
      { text: "", color: "white" },
    ],
    leadership: () => [
      { text: "Leadership & Community Involvement:", color: "white" },
      { text: "===================================", color: "white" },
      { text: "🌟 ACM-SVPCE WEB COORDINATOR 2024-25", color: "white" },
      { text: "🌟 Unnat Bharat Abhiyan SVPCE Developer Team Coordinator 2024-25", color: "white" },
      { text: "🌟 Infinity Media Head - 2024", color: "white" },
      { text: "🌟 Insight Development Head 2024", color: "white" },
      { text: "", color: "white" },
    ],
    contact: () => [
      { text: "Establish Communication:", color: "white" },
      { text: "========================", color: "white" },
      { text: "📧 Email: Swankhede228@gmail.com", color: "white" },
      { text: "📱 Phone: +91 8788062498", color: "white" },
      { text: "🌍 Location: Pujaritola, Tirora, Gondia, Maharashtra", color: "white" },
      { text: "💼 LinkedIn: https://www.linkedin.com/in/saurabh-wankhede-025359202/", color: "white" },
      { text: "🐙 GitHub: https://github.com/Mrsam2", color: "white" },
      { text: "📸 Instagram: https://www.instagram.com/xdp_sam", color: "white" },
      { text: "", color: "white" },
      { text: "Always open to new opportunities and collaborations!", color: "white" },
      { text: "", color: "white" },
    ],
    clear: () => {
      setHistory([
        { text: "Terminal cleared.", isTyping: true, currentIndex: 0, color: "white" },
        { text: "", isTyping: false, currentIndex: 0, color: "white" },
      ])
      return []
    },
    github: () => {
      if (typeof window !== "undefined") {
        window.open("https://github.com/Mrsam2", "_blank")
      }
      return [{ text: "Opening GitHub profile... 🐙", color: "white" }]
    },
    linkedin: () => {
      if (typeof window !== "undefined") {
        window.open("https://www.linkedin.com/in/saurabh-wankhede-025359202/", "_blank")
      }
      return [{ text: "Opening LinkedIn profile... 💼", color: "white" }]
    },
    instagram: () => {
      if (typeof window !== "undefined") {
        window.open("https://www.instagram.com/xdp_sam?igsh=b3VyeGxlZ2p6OWY0", "_blank")
      }
      return [{ text: "Opening Instagram profile... 📸", color: "white" }]
    },
    email: () => {
      if (typeof window !== "undefined") {
        window.open("mailto:Swankhede228@gmail.com", "_blank")
      }
      return [{ text: "Opening email client... 📧", color: "white" }]
    },
  }

  const typeLines = (lines: Array<{ text: string; color: string }>) => {
    setIsProcessing(true)
    const typingLines = lines.map((line) => ({
      text: line.text,
      isTyping: true,
      currentIndex: 0,
      color: line.color,
    }))

    setHistory((prev) => [...prev, ...typingLines])
  }

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const commandLine = { text: `XdpSam@Portfolio:~$ ${cmd}`, isTyping: false, currentIndex: 0, color: "prompt" }

    setHistory((prev) => [...prev, commandLine])

    if (commands[trimmedCmd as keyof typeof commands]) {
      const output = commands[trimmedCmd as keyof typeof commands]()
      if (Array.isArray(output)) {
        // Shorter delay for faster response
        setTimeout(() => {
          typeLines(output)
        }, 100)
      }
    } else if (trimmedCmd === "") {
      // Empty command, just add prompt
      setIsProcessing(false)
    } else {
      setTimeout(() => {
        typeLines([
          { text: `Command not found: ${cmd}`, color: "white" },
          { text: 'Type "help" for available commands', color: "white" },
          { text: "", color: "white" },
        ])
      }, 100)
    }

    setCommandHistory((prev) => [...prev, cmd])
    setInput("")
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isProcessing) return // Disable input while typing

    if (e.key === "Enter") {
      handleCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  const getTextColor = (color?: string) => {
    switch (color) {
      case "prompt":
        return "text-cyan-400" // Blue/cyan for prompt
      case "command":
        return "text-green-400" // Green for commands
      case "white":
      default:
        return "text-white" // White for content
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      // Changed to inset-0 for full screen, removed fixed height
      className="fixed inset-0 bg-black backdrop-blur-md border border-gray-600 z-40 flex flex-col rounded-none"
    >
      {/* Terminal Header */}
      <div className={`flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-600 flex-shrink-0`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className={`ml-4 text-white font-mono ${isMobile ? "text-xs" : "text-sm"}`}>XdpSam@Portfolio</span>
        </div>
        <div className="flex gap-2">
          {!isMobile && (
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-700">
              <Minimize2 className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:bg-gray-700">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Terminal Content - Scrollable Area */}
      <div
        ref={terminalRef}
        className={`flex-1 overflow-y-auto font-mono ${isMobile ? "text-xs" : "text-sm"} bg-black terminal-scroll`}
        style={{ minHeight: 0 }} // Important for flex child to be scrollable
      >
        <div ref={contentRef} className="p-4">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap break-words">
              {line.isTyping ? (
                <span className={getTextColor(line.color)}>
                  {line.text.substring(0, line.currentIndex)}
                  {line.currentIndex < line.text.length && (
                    <span className="bg-green-400 text-black animate-pulse">█</span>
                  )}
                </span>
              ) : (
                <span className={getTextColor(line.color)}>{line.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="flex-shrink-0 bg-black border-t border-gray-800 p-4">
        <div className="flex items-center">
          <span className="text-cyan-400 mr-2 flex-shrink-0">XdpSam@Portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className={`flex-1 bg-transparent text-green-400 outline-none font-mono min-w-0 ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder={isProcessing ? "Processing..." : "Type a command..."}
          />
          {!isProcessing && <span className="animate-pulse bg-green-400 text-black">█</span>}
          {isProcessing && <span className="text-yellow-400 animate-spin">⟳</span>}
        </div>
      </div>
    </motion.div>
  )
}
