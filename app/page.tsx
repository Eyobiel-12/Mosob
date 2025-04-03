"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/i18n/context"
import { useValidatedTranslations } from "@/lib/i18n/use-validated-translations"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Playfair_Display } from "next/font/google"

// For enhanced typography
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { t, language } = useValidatedTranslations("HomePage", [
    "home.hero.subtitle",
    "home.hero.title",
    "home.hero.description",
    "home.hero.exploreMenu",
    "home.hero.reserveTable",
    "home.hero.discoverMore",
    "home.about.subtitle",
    "home.about.title",
    "home.about.description1",
    "home.about.description2",
    "home.about.philosophy",
    "home.menu.subtitle",
    "home.menu.title",
    "home.experience.subtitle",
    "home.experience.title",
    "home.experience.description",
    "home.experience.reserve",
    "home.testimonials.subtitle",
    "home.testimonials.title",
    "home.testimonials.quote1",
    "home.testimonials.author1",
    "home.testimonials.title1",
    "home.testimonials.quote2",
    "home.testimonials.author2",
    "home.testimonials.title2",
    "home.testimonials.quote3",
    "home.testimonials.author3",
    "home.testimonials.title3",
    "menu.meat.derho.name",
    "menu.meat.derho.description"
  ])
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Luxury hero images
  const heroImages = [
    "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fbc27731-2e9b-4a0c-8dbe-b77025c2d2f3.jpg",
    "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fbc27731-2e9b-4a0c-8dbe-b77025c2d2f3.jpg",
    "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fbc27731-2e9b-4a0c-8dbe-b77025c2d2f3.jpg",
  ]

  useEffect(() => {
    setIsLoaded(true)
    setMounted(true)

    // Image carousel for hero section
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const scrollToContent = () => {
    try {
      document.getElementById("about-section")?.scrollIntoView({
        behavior: "smooth",
      })
    } catch (error) {
      console.error("Error scrolling to content:", error)
    }
  }

  // Use default English text for server-side rendering to avoid hydration mismatches
  const heroSubtitle = mounted ? t("home.hero.subtitle") : "Fine Habesha Cuisine"
  const heroTitle = mounted ? t("home.hero.title") : "Mosob Asmara"
  const heroDescription = mounted
    ? t("home.hero.description")
    : "A culinary journey through the rich flavors of Eritrea"
  const exploreMenu = mounted ? t("home.hero.exploreMenu") : "Explore Our Menu"
  const reserveTable = mounted ? t("home.hero.reserveTable") : "Reserve a Table"
  const discoverMore = mounted ? t("home.hero.discoverMore") : "Discover More"

  return (
    <div className="flex flex-col" suppressHydrationWarning>
      {/* Hero Section with Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex] || "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fbc27731-2e9b-4a0c-8dbe-b77025c2d2f3.jpg"}
              alt="Mosob Asmara Fine Dining"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Luxury overlay pattern */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fbc27731-2e9b-4a0c-8dbe-b77025c2d2f3.jpg')] opacity-10 z-5"></div>

        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-32 h-0.5 bg-gold-500 mx-auto mb-8"></div>
            <h2 className={`${playfair.className} text-gold-500 text-xl md:text-2xl tracking-[0.3em] uppercase mb-6`}>
              {heroSubtitle}
            </h2>
            <h1
              className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight`}
            >
              {heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light tracking-wide">
              {heroDescription}
            </p>
            <div className="w-32 h-0.5 bg-gold-500 mx-auto mt-8"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 mt-12"
          >
            <Button
              asChild
              size="lg"
              variant="default"
              className="bg-gold-500 hover:bg-gold-600 text-black rounded-none px-10 py-7 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/menu">{exploreMenu}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 rounded-none px-10 py-7 text-base tracking-widest uppercase transition-all duration-300"
            >
              <Link href="/booking">{reserveTable}</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToContent}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/80 text-sm mb-2 tracking-widest uppercase">{discoverMore}</span>
              <ChevronDown className="text-gold-500 h-6 w-6 animate-pulse" />
            </div>
          </motion.div>

          {/* Language Switcher in Hero */}
          <div className="absolute top-8 right-8">
            <LanguageSwitcher variant="prominent" className="shadow-md rounded-md" />
          </div>
        </div>
      </section>

      {/* About Section - Refined */}
      <section id="about-section" className="py-32 bg-white" ref={targetRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-0.5 bg-gold-500 mb-8"></div>
              <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
                {mounted ? t("home.about.subtitle") : "Our Story"}
              </h2>
              <h3
                className={`${playfair.className} text-3xl md:text-5xl font-bold mb-10 text-neutral-900 leading-tight`}
              >
                {mounted ? t("home.about.title") : "A Tradition of Excellence"}
              </h3>
              <p className="text-lg mb-8 text-neutral-700 leading-relaxed">
                {mounted
                  ? t("home.about.description1")
                  : "Mosob Asmara brings the refined flavors and traditions of Eritrean cuisine to discerning palates."}
              </p>
              <p className="text-lg mb-10 text-neutral-700 leading-relaxed">
                {mounted
                  ? t("home.about.description2")
                  : "Our culinary team meticulously crafts each dish using time-honored techniques and the finest ingredients."}
              </p>
              <Button
                asChild
                className="bg-gold-500 hover:bg-gold-600 text-black rounded-none px-10 py-7 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-lg"
              >
                <Link href="/about">
                  {mounted ? t("home.about.philosophy") : "Our Philosophy"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative h-[700px] w-full overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-4/5 h-4/5 z-10">
                  <Image
                    src="/about.jpeg"
                    alt="Traditional Eritrean dining"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-4/5 h-4/5 border-2 border-gold-500 z-0"></div>

                {/* Gold accent */}
                <div className="absolute bottom-10 right-10 w-20 h-20 bg-gold-500/20 z-0"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items - Luxury Version */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-8"></div>
            <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
              {mounted ? t("home.menu.subtitle") : "Culinary Excellence"}
            </h2>
            <h3 className={`${playfair.className} text-3xl md:text-5xl font-bold mb-6 text-neutral-900 leading-tight`}>
              {mounted ? t("home.menu.title") : "Signature Dishes"}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: mounted ? t("menu.meat.derho.name") : "Derho",
                description: mounted
                  ? t("menu.meat.derho.description")
                  : "Free-range chicken legs delicately braised in a vibrant red sauce infused with aromatic herbs",
                     price: "",
                image: "/derho.jpeg",
              },
              {
                name: "Mix Veganistische Mosob Asmara",
                description: "Een zorgvuldig samengestelde selectie van drie vegetarische specialiteiten, die de diversiteit van de Eritrese plantaardige keuken laat zien",
               
                image: "/mix-veganistische.jpeg",
              },
              {
                name: "Combinatie van vlees gerechten",
                description: "Een zorgvuldig samengestelde selectie van drie kenmerkende vleesbereidingen, die een reis door de Eritrese culinaire tradities biedt",
                
                image: "/denist.jpeg",
              },
            ].map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-96 mb-8 overflow-hidden">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                  {/* Elegant overlay */}
                  <div className="absolute inset-0 border border-white/10 m-4 group-hover:m-8 transition-all duration-500"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                    <p className="text-sm font-light tracking-wide leading-relaxed">{dish.description}</p>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className={`${playfair.className} text-2xl font-medium mb-3`}>{dish.name}</h4>
                  <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-3"></div>
                  <p className="text-gold-500 font-medium tracking-widest">{dish.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-black rounded-none px-10 py-7 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/menu">
                {mounted ? t("home.hero.exploreMenu") : "Explore Our Menu"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Parallax Section - Enhanced */}
      <section
        className="relative h-[80vh] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/dine.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Luxury pattern overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10"></div>

        <div className="relative h-full flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center px-4 max-w-4xl"
          >
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-8"></div>
            <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
              {mounted ? t("home.experience.subtitle") : "The Experience"}
            </h2>
            <h3 className={`${playfair.className} text-4xl md:text-6xl font-bold text-white mb-8 leading-tight`}>
              {mounted ? t("home.experience.title") : "Dine with Tradition"}
            </h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
              {mounted
                ? t("home.experience.description")
                : "Immerse yourself in the authentic Habesha dining experience."}
            </p>
            <Button
              asChild
              className="bg-gold-500 hover:bg-gold-600 text-black rounded-none px-10 py-7 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/booking">{mounted ? t("home.experience.reserve") : "Reserve Your Experience"}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Luxury Version */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-8"></div>
            <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
              {mounted ? t("home.testimonials.subtitle") : "Guest Experiences"}
            </h2>
            <h3 className={`${playfair.className} text-3xl md:text-5xl font-bold mb-6 text-neutral-900 leading-tight`}>
              {mounted ? t("home.testimonials.title") : "What Our Guests Say"}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                quote: mounted
                  ? t("home.testimonials.quote1")
                  : "Eten was super lekker, en personeel was erg vriendelijk. Als een echte Eritreeër was ik sceptisch, maar dit voelde als thuis. Daarnaast is het personeel erg enthousiast om alles over het eten uit te leggen als je vragen hebt. Zal er zeker nog een keer komen!",
                author: mounted ? t("home.testimonials.author1") : "Everbest O.",
                title: mounted ? t("home.testimonials.title1") : "7 november 2024 • 10/10",
              },
              {
                quote: mounted
                  ? t("home.testimonials.quote2")
                  : "Het eten was heerlijk gekruid. Bediening was vriendelijk en helpt je als het nodig is bij het kiezen van het menu. Met z'n allen van 1 bord eten was weer een andere ervaring dan we gewend zijn en erg leuk. Voor herhaling fatbaar.",
                author: mounted ? t("home.testimonials.author2") : "Anita L.",
                title: mounted ? t("home.testimonials.title2") : "15 augustus 2024 • 10/10",
              },
              {
                quote: mounted ? t("home.testimonials.quote3") : "Je wordt er ontvangen met een lach van oor tot oor. Reserveren is aanbevolen maar er is altijd wel een tafel vrij. Het restaurant is eenvoudig van inrichting en heeft een gezellige bar. In een hoek staan comfortabele crapauds. De geur van het exotische eten maakt je nog hongeriger dan je al bent. Op de achtergrond klinkt typisch Oostafrikaanse muziek. Wat het ook zo leuk maakt is dat in de meeste gevallen de kok zelf het eten aan tafel serveert. Op een ronde mand - mosob - liggen een aantal injerra gedrapeerd waarop de vlees- en vegetarische gerechten in zwart keramische bakjes staan. In de meeste gevallen worden de gerechten door de kok zelf aan tafel geserveerd. Van Gogh zou er een prachtig en kleurrijk schilderij van hebben gemaakt. De smaakpapillen van je tong maken de avond compleet. Kortom, dit restaurant is echt een aanwinst voor Amsterdam en omstreken.",
                author: mounted ? t("home.testimonials.author3") : "Sara d.",
                title: mounted ? t("home.testimonials.title3") : "15 augustus 2024 • 10/10",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-neutral-50 p-12 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-500 h-[500px] flex flex-col"
              >
                <div className="text-gold-500 text-6xl font-serif mb-8">"</div>
                <p className="text-neutral-700 mb-10 italic leading-relaxed text-lg overflow-y-auto flex-grow">{testimonial.quote}</p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-0.5 bg-gold-500 mr-4"></div>
                  <div>
                    <p className="font-medium text-neutral-900">{testimonial.author}</p>
                    <p className="text-neutral-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA - Luxury Version */}
      <section className="py-32 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-8"></div>
            <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
              {mounted ? t("home.reservation.subtitle") : "Join Us"}
            </h2>
            <h3 className={`${playfair.className} text-4xl md:text-6xl font-bold mb-10 leading-tight`}>
              {mounted ? t("home.reservation.title") : "Reserve Your Table"}
            </h3>
            <p className="text-xl text-white/80 mb-12 leading-relaxed tracking-wide">
              {mounted
                ? t("home.reservation.description")
                : "Experience the finest Habesha cuisine in an elegant setting."}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-black rounded-none px-12 py-8 text-lg tracking-widest uppercase transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/booking">{mounted ? t("home.reservation.cta") : "Make a Reservation"}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 