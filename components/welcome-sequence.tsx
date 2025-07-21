"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Rocket, Zap, Code, Star } from "lucide-react"

interface WelcomeSequenceProps {
  onComplete: () => void
}

export default function WelcomeSequence({ onComplete }: WelcomeSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showText, setShowText] = useState(false)

  const steps = [
    { icon: Rocket, text: "Initializing XdpSam Portfolio...", color: "#ff6b35" },
    { icon: Zap, text: "Loading XdpSam Galaxy Systems...", color: "#4ecdc4" },
    { icon: Code, text: "Compiling Project Universe...", color: "#45b7d1" },
    { icon: Star, text: "Welcome to XdpSam's Code Galaxy!", color: "#ffd93d" },
  ]

  /* ---------- timing logic ---------- */
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep((p) => p + 1), 1500)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  /* ---------- render ---------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* twinkling stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => {
          const w = typeof window !== "undefined" ? window.innerWidth : 1920
          const h = typeof window !== "undefined" ? window.innerHeight : 1080

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ x: Math.random() * w, y: Math.random() * h, opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY as number,
                delay: Math.random() * 2,
              }}
            />
          )
        })}
      </div>

      {/* animated icon & text */}
      <div className="z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div
              className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${steps[currentStep].color}20`,
                border: `3px solid ${steps[currentStep].color}`,
              }}
            >
              {(() => {
                const Icon = steps[currentStep].icon
                return <Icon className="h-12 w-12" style={{ color: steps[currentStep].color }} />
              })()}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showText && (
            <motion.div
              key={`text-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-white"
            >
              <h2 className="mb-2 text-2xl font-bold">{steps[currentStep].text}</h2>

              {/* progress bar */}
              <div className="mx-auto h-2 w-64 overflow-hidden rounded-full bg-gray-800">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: steps[currentStep].color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <p className="mt-4 text-sm text-gray-400">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
