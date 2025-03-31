"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, languages } from "./translations"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  languages: Record<Language, string>
  isLoading: boolean
}

// Create context with default values
const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  languages,
  isLoading: true,
}

const LanguageContext = createContext<LanguageContextType>(defaultContext)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with English as default to avoid hydration mismatch
  const [language, setLanguage] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true)

    try {
      // Only run on client side
      const savedLanguage = localStorage.getItem("language") as Language | null
      if (savedLanguage && Object.keys(languages).includes(savedLanguage)) {
        setLanguage(savedLanguage)
      } else {
        // Try to detect browser language
        try {
          const browserLanguage = navigator.language.split("-")[0] as Language
          if (Object.keys(languages).includes(browserLanguage)) {
            setLanguage(browserLanguage)
          }
        } catch (error) {
          console.error("Error detecting browser language:", error)
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    try {
      // Log for debugging
      console.log(`Setting language to: ${newLanguage}`);
      
      // Validate the language is supported
      if (!Object.keys(languages).includes(newLanguage)) {
        console.error(`Unsupported language: ${newLanguage}`);
        return;
      }
      
      setLanguage(newLanguage)
      
      if (isClient) {
        try {
          localStorage.setItem("language", newLanguage)
          console.log(`Language saved to localStorage: ${newLanguage}`);
        } catch (storageError) {
          console.error("Error saving language to localStorage:", storageError);
        }
      }
    } catch (error) {
      console.error("Error setting language:", error)
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        languages,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

