"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { motion, AnimatePresence } from "framer-motion"

export default function AwardBadge() {
  const [isVisible, setIsVisible] = useState(false)

  // Add the badge CSS file via script tag and show the badge after 5 seconds
  useEffect(() => {
    // Create a link element
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://awards.infcdn.net/2024/circle_v2.css"
    // Append to the document head
    document.head.appendChild(link)

    // Show the badge after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // 5 seconds

    // Cleanup function
    return () => {
      document.head.removeChild(link)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed left-4 bottom-24 sm:left-6 sm:bottom-24 md:left-8 md:bottom-28 z-50 cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <div 
            id="circle-r-ribbon" 
            onClick={(e) => {
              // If we click on the badge but not on a link, open the restaurant page
              if (e.target instanceof Element && e.target.nodeName.toLowerCase() !== 'a') {
                window.open('https://restaurantguru.com/Mosob-Asmara-Amsterdam-2', '_blank');
                return false;
              }
            }} 
            className="shadow-xl"
          > 
            <div className="r-ribbon_ahead"> 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                width="160px" 
                height="160px" 
                viewBox="0 0 160 160"
              > 
                <defs> 
                  <path id="heading-arc" d="M 30 80 a 50 50 0 1 1 100 0"></path> 
                </defs> 
                <text className="r-ribbon_ahead-heading" fill="#000" textAnchor="middle"> 
                  <textPath startOffset="50%" xlinkHref="#heading-arc">Recommended</textPath> 
                </text> 
              </svg> 
            </div> 
            <p className="r-ribbon_year">2025</p> 
            <a 
              href="https://restaurantguru.com/Mosob-Asmara-Amsterdam-2" 
              className="r-ribbon_title" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Mosob Asmara
            </a> 
            <div className="r-ribbon_ahead r-ribbon_ahead-bottom"> 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                width="120px" 
                height="120px" 
                viewBox="0 0 120 120"
              > 
                <defs> 
                  <path id="subheading-arc" d="M 12 60 a 48 48 0 0 0 96 0"></path> 
                </defs> 
                <text className="r-ribbon_ahead-subh" fill="#000" textAnchor="middle"> 
                  <textPath startOffset="50%" xlinkHref="#subheading-arc">
                    <a 
                      href="https://restaurantguru.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Restaurant Guru
                    </a>
                  </textPath> 
                </text> 
              </svg> 
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
