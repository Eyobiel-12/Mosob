"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n/translations"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface LanguageSwitcherProps {
  variant?: "default" | "minimal" | "prominent"
  className?: string
}

export function LanguageSwitcher({ variant = "default", className }: LanguageSwitcherProps) {
  const { language, setLanguage, languages, isLoading } = useLanguage()
  const { t } = useTranslation(language)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    try {
      // Log language change for debugging
      console.log(`Changing language from ${language} to ${newLanguage}`);
      
      setLanguage(newLanguage as any)
      
      // Confirm language was set correctly
      setTimeout(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage !== newLanguage) {
          console.warn(`Language mismatch! Expected: ${newLanguage}, Actual: ${savedLanguage}`);
        }
      }, 100);
    } catch (error) {
      console.error("Failed to switch language:", error)
      try {
        toast({
          title: "Error",
          description: mounted ? t("error.language.switch") : "Could not switch language. Please try again.",
          variant: "destructive",
        })
      } catch (toastError) {
        console.error("Failed to show toast:", toastError)
      }
    }
  }

  // Don't render dropdown during SSR or while loading
  if (!mounted || isLoading) {
    if (variant === "prominent") {
      return (
        <Button
          variant="default"
          className={cn(
            "bg-gold-500 hover:bg-gold-600 text-black flex items-center justify-center h-10 w-10 p-0 transition-all duration-300 hover:shadow-md",
            className,
          )}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      )
    }
    
    return (
      <Button
        variant={variant === "minimal" ? "ghost" : "outline"}
        size="sm"
        className={cn(className)}
      >
        {variant === "minimal" && <Globe className="h-5 w-5" />}
      </Button>
    )
  }

  // Minimal version
  if (variant === "minimal") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className={cn(className)}>
            <Globe className="h-5 w-5" />
            <span className="sr-only">{mounted ? t("language.switch") : "Switch language"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-neutral-200">
          {Object.entries(languages).map(([code, name]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={cn(
                "cursor-pointer transition-colors duration-200 hover:bg-neutral-100",
                language === code && "font-bold text-gold-500",
              )}
            >
              {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Prominent version
  if (variant === "prominent") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className={cn(
              "bg-gold-500 hover:bg-gold-600 text-black h-10 w-10 p-0 transition-all duration-300 hover:shadow-md",
              className,
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-neutral-200">
          {Object.entries(languages).map(([code, name]) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem
                onClick={() => handleLanguageChange(code)}
                className={cn(
                  "cursor-pointer transition-colors duration-200 hover:bg-neutral-100",
                  language === code && "font-bold text-gold-500",
                )}
              >
                {name}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Default version
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "border-neutral-200 bg-transparent hover:bg-white/10 transition-colors duration-300 h-10 w-10 p-0",
            className,
          )}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{mounted ? t("language.switch") : "Switch language"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-neutral-200">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={cn(
              "cursor-pointer transition-colors duration-200 hover:bg-neutral-100",
              language === code && "font-bold text-gold-500",
            )}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

