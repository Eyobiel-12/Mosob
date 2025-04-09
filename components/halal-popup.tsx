"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

export default function HalalPopup() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenHalalPopup")
    if (hasSeenPopup) {
      setIsOpen(false)
    } else {
      // Set a flag in sessionStorage to remember that the user has seen the popup
      sessionStorage.setItem("hasSeenHalalPopup", "true")
    }
  }, [])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-sm border border-gold-500"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.jpeg"
                alt="Mosob Asmara Logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-neutral-900">100% Halal Certified</h3>
              <p className="text-sm text-neutral-600 mt-1">
                All our food is prepared according to Islamic dietary laws
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 