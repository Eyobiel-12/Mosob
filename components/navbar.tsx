"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Facebook, Instagram, Menu } from "lucide-react"
import { TikTokIcon } from "@/components/ui/custom-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/context"
import { useValidatedTranslations } from "@/lib/i18n/use-validated-translations"
import { motion } from "framer-motion"
import { Playfair_Display } from "next/font/google"
import Image from "next/image"

// For enhanced typography
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, language } = useValidatedTranslations("Navbar", [
    "nav.home",
    "nav.menu",
    "nav.about",
    "nav.gallery",
    "nav.contact",
    "nav.reserveTable"
  ])
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    try {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    } catch (error) {
      console.error("Error setting up scroll listener:", error)
    }
  }, [])

  // Default routes in English to avoid hydration mismatch
  const routes = [
    {
      name: mounted ? t("nav.home") : "Home",
      path: "/",
    },
    {
      name: mounted ? t("nav.menu") : "Menu",
      path: "/menu",
    },
    {
      name: mounted ? t("nav.about") : "About",
      path: "/about",
    },
    {
      name: mounted ? t("nav.gallery") : "Gallery",
      path: "/gallery",
    },
    {
      name: mounted ? t("nav.contact") : "Contact",
      path: "/contact",
    },
  ]

  // Luxury logo implementation
  const Logo = () => (
    <div className="relative group">
      <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105">
        <Image
          src="/logo.jpeg"
          alt="Mosob Asmara Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="absolute inset-0 border border-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-8",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center gap-4 z-10">
          <Logo />
          <span
            className={cn(
              `${playfair.className} text-2xl font-bold transition-colors duration-300 tracking-wider`,
              isScrolled ? "text-neutral-900" : "text-white",
            )}
          >
            Mosob Asmara
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-gold-500 relative group",
                pathname === route.path
                  ? isScrolled
                    ? "text-gold-500"
                    : "text-gold-500"
                  : isScrolled
                    ? "text-neutral-700"
                    : "text-white",
              )}
            >
              {route.name}
              <span
                className={cn(
                  "absolute -bottom-2 left-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full",
                  pathname === route.path && "w-full",
                )}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Tablet Navigation - Simplified */}
        <nav className="hidden md:flex lg:hidden items-center gap-6">
          {routes.slice(0, 3).map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-gold-500 relative group",
                pathname === route.path
                  ? isScrolled
                    ? "text-gold-500"
                    : "text-gold-500"
                  : isScrolled
                    ? "text-neutral-700"
                    : "text-white",
              )}
            >
              {route.name}
              <span
                className={cn(
                  "absolute -bottom-2 left-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full",
                  pathname === route.path && "w-full",
                )}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitcher variant="minimal" className={isScrolled ? "text-neutral-700" : "text-white"} />

          <Button
            asChild
            className={cn(
              "hidden md:flex rounded-none px-6 py-5 text-sm tracking-widest uppercase transition-all duration-300",
              isScrolled
                ? "bg-gold-500 hover:bg-gold-600 text-black hover:shadow-md"
                : "bg-transparent border border-white text-white hover:bg-white/10",
            )}
          >
            <Link href="/booking">{mounted ? t("nav.reserveTable") : "Reserve a Table"}</Link>
          </Button>

          {/* Mobile Menu Button with Habesha-inspired design */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "md:hidden transition-all duration-300",
                  isScrolled
                    ? "border-neutral-300 text-neutral-800"
                    : "border-white/50 text-white hover:border-gold-500",
                )}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-0 bg-white/95 backdrop-blur-sm p-0 w-full sm:w-80">
              <div className="flex flex-col h-full">
                {/* Habesha-inspired decorative header */}
                <div className="bg-gold-500/10 p-8 border-b border-gold-500/20">
                  <div className="flex items-center mb-6">
                    <Logo />
                    <span className={`${playfair.className} text-2xl font-bold text-neutral-900`}>Mosob Asmara</span>
                  </div>
                  <p className="text-sm text-neutral-600">Experience authentic Habesha cuisine in an elegant setting</p>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-auto py-8 px-6">
                  <nav className="flex flex-col gap-6">
                    {routes.map((route, index) => (
                      <motion.div
                        key={route.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={route.path}
                          className={cn(
                            `group flex items-center py-2 ${playfair.className} text-xl transition-colors hover:text-gold-500`,
                            pathname === route.path ? "text-gold-500" : "text-neutral-700",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          {route.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-neutral-100">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: routes.length * 0.1 }}
                  >
                    <LanguageSwitcher className="w-full justify-between mb-6" />
                  </motion.div>
                  
                  {/* Social Media Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (routes.length + 0.5) * 0.1 }}
                    className="flex justify-center space-x-6 mb-6"
                  >
                    <Link href="https://www.facebook.com/share/15kztU56XB/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-gold-500 transition-colors duration-300">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="https://www.instagram.com/mosob_asmara?igsh=MXNvY3FoMXYwZzkwcA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-gold-500 transition-colors duration-300">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="https://www.tiktok.com/@asmaramos?_t=ZN-8v5VphrIBDa&_r=1" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-gold-500 transition-colors duration-300">
                      <TikTokIcon className="h-5 w-5" />
                      <span className="sr-only">TikTok</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (routes.length + 1) * 0.1 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-gold-500 hover:bg-gold-600 text-black rounded-none px-8 py-6 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href="/booking">{mounted ? t("nav.reserveTable") : "Reserve a Table"}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

