"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { useTranslation } from "@/lib/i18n/translations"
import { motion, AnimatePresence } from "framer-motion"
import { Playfair_Display } from "next/font/google"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Define types for gallery items
type GalleryImageItem = {
  src: string;
  alt: string;
  caption: string;
  type?: "image";
}

type GalleryVideoItem = {
  src: string;
  alt: string;
  caption: string;
  type: "video";
  thumbnail: string;
}

type GalleryItem = GalleryImageItem | GalleryVideoItem;

type GalleryData = {
  [category: string]: GalleryItem[];
}

// For enhanced typography
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

// Gallery categories and images
const galleryData: GalleryData = {
  interior: [
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/e83fa486-399d-4c1f-8f08-75d0167ddfb3.jpg", 
      alt: "Restaurant Interior", 
      caption: "Our elegant dining area",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fbc27731-2e9b-4a0c-8dbe-b77025c2d2f3.jpg", 
      alt: "Private Dining Room", 
      caption: "Private dining experience",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/c561de3c-a565-4951-95f2-da6b12f61b73.jpg", 
      alt: "Bar Area", 
      caption: "Our well-stocked bar",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/255538d7-b345-4aa6-97ed-c05c67726cab.jpg", 
      alt: "Dining Space", 
      caption: "Comfortable dining environment",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/a62734fc-d567-4226-b912-d49ec9f27b4c.jpg", 
      alt: "Restaurant Seating", 
      caption: "Elegant seating arrangements",
      type: "image" 
    },
  ],
  dishes: [
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/5fc53658-2511-4592-8a2c-3e3c6688bda2.jpg", 
      alt: "Zigni Dish", 
      caption: "Zigni",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/3d3638ab-4324-40ba-b40a-364f643cb19e.jpg", 
      alt: "Injera Platter", 
      caption: "Injera",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/02329317-baea-4061-9ca7-0387cebc49fc.jpg", 
      alt: "Vegetarian Platter", 
      caption: "Vegetarian Platter",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/8d396c92-c839-4681-aac3-fcc027a57705.jpg", 
      alt: "Special Platter", 
      caption: "Mosob Special",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/a1b9e4fd-bcfc-4759-82c1-447cfaa09a51.jpg", 
      alt: "Kitfo", 
      caption: "Kitfo",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/a892bff6-6bc5-4430-8b36-6b9313ddbb6a.jpg", 
      alt: "Shiro", 
      caption: "Shiro",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/1743f830-f102-46f5-939b-e0416ba4c44c.jpg", 
      alt: "Eritrean Sampler", 
      caption: "Beyaynetu",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fec429f7-87b3-487e-b4b1-2b915d8de295.jpg", 
      alt: "Coffee Ceremony", 
      caption: "Traditional coffee ceremony",
      type: "image" 
    },
    { 
      src: "https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/faf966a9-c573-460e-bc55-d36497abff92.jpg", 
      alt: "Dessert", 
      caption: "Sweet treats to finish your meal",
      type: "image" 
    },
  ],
  events: [
    { 
      src: "/ca.jpeg", 
      alt: "Special Event", 
      caption: "Celebrating with our guests",
      type: "image" 
    },
    { 
      src: "/caa.jpeg", 
      alt: "Cultural Celebration", 
      caption: "Traditional performances",
      type: "image"
    },
    { 
      src: "/cad.jpeg", 
      alt: "Community Gathering", 
      caption: "Sharing our culture",
      type: "image"
    },
    { 
      src: "/caui.jpeg", 
      alt: "Entertainment Night", 
      caption: "Live entertainment",
      type: "image"
    },
    { 
      src: "https://youtube.com/shorts/KdqNwonIh78?feature=share", 
      alt: "Traditional Dance", 
      caption: "Authentic Eritrean dance performance",
      type: "video",
      thumbnail: "https://img.youtube.com/vi/KdqNwonIh78/maxresdefault.jpg"
    },
    { 
      src: "https://youtube.com/shorts/2I7r2kGcOoM?feature=share", 
      alt: "Cultural Music", 
      caption: "Live music at Mosob Asmara",
      type: "video",
      thumbnail: "https://img.youtube.com/vi/2I7r2kGcOoM/maxresdefault.jpg"
    },
  ],
}

export default function GalleryPageClient() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState("interior")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    // Re-enable scrolling
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    const images = galleryData[activeCategory as keyof typeof galleryData]
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    const images = galleryData[activeCategory as keyof typeof galleryData]
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, activeCategory])

  return (
    <div>
      {/* Hero Section with Habesha pattern overlay */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/galari.jpeg"
          alt="Mosob Asmara Gallery"
          fill
          className="object-cover"
          priority
        />
        {/* Habesha pattern overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10 z-5"></div>

        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
              Visual Experience
            </h2>
            <h1
              className={`${playfair.className} text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight`}
            >
              Our Gallery
            </h1>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex border-b border-neutral-200">
              {Object.keys(galleryData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 text-lg font-medium transition-colors relative
                    ${activeCategory === category ? "text-gold-500" : "text-neutral-500 hover:text-neutral-800"}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid with Habesha-inspired design elements */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border border-gold-500/20 rounded-full z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 border border-gold-500/20 rounded-full z-0"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
              >
                {galleryData[activeCategory as keyof typeof galleryData].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group ${item.type === 'video' ? '' : 'cursor-pointer'} relative overflow-hidden`}
                    onClick={() => item.type !== 'video' && openLightbox(index)}
                  >
                    <div className="relative h-80 overflow-hidden">
                      {item.type === 'video' ? (
                        <div className="w-full h-full relative">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                            <a 
                              href={item.src} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-gold-500 text-white p-3 rounded-full hover:bg-gold-600 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </a>
                          </div>
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <>
                          <Image
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                          
                          {/* Habesha-inspired border decoration */}
                          <div className="absolute inset-0 border border-gold-500/0 m-6 group-hover:border-gold-500/80 transition-all duration-300"></div>
                        </>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-lg font-medium">{item.alt}</p>
                        <p className="text-sm opacity-80">{item.caption}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gold-500 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
              <span className="sr-only">Close</span>
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-10 w-10" />
              <span className="sr-only">Previous</span>
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gold-500 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-10 w-10" />
              <span className="sr-only">Next</span>
            </button>

            <div className="relative max-w-5xl max-h-[80vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
              {galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold mb-4">{galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].alt}</h3>
                    <p className="mb-6">{galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].caption}</p>
                    <a 
                      href={galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].src} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gold-500 text-white px-6 py-3 rounded hover:bg-gold-600 transition-colors inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              ) : (
                <Image
                  src={galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].src || "/placeholder.svg"}
                  alt={galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].alt}
                  fill
                  className="object-contain"
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
                <p className="text-lg font-medium">
                  {galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].alt}
                </p>
                <p className="text-sm opacity-80">
                  {galleryData[activeCategory as keyof typeof galleryData][currentImageIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cultural Experience Section */}
      <section className="py-20 bg-neutral-50 relative overflow-hidden">
        {/* Habesha-inspired decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
              Cultural Heritage
            </h2>
            <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-neutral-900 mb-6`}>
              Experience Habesha Tradition
            </h3>
            <p className="text-neutral-700 leading-relaxed">
              At Mosob Asmara, we celebrate the rich cultural heritage of Eritrea through our authentic cuisine,
              traditional coffee ceremonies, and cultural events. Immerse yourself in the vibrant traditions of Habesha
              culture with every visit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Coffee Ceremony",
                description:
                  "Experience the traditional Eritrean coffee ceremony, a ritual of hospitality and community that has been practiced for generations.",
                image: "/placeholder.svg?height=600&width=600",
              },
              {
                title: "Cultural Nights",
                description:
                  "Join us for special cultural nights featuring traditional music, dance performances, and authentic Habesha celebrations.",
                image: "/placeholder.svg?height=600&width=600",
              },
              {
                title: "Culinary Heritage",
                description:
                  "Discover the stories behind our dishes and the cultural significance of traditional Eritrean cooking techniques and ingredients.",
                image: "/placeholder.svg?height=600&width=600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-72 mb-6 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>

                  {/* Habesha-inspired decorative border */}
                  <div className="absolute inset-0 border border-gold-500/30 m-4 group-hover:m-6 transition-all duration-500"></div>
                </div>
                <h4 className={`${playfair.className} text-xl font-medium mb-3`}>{item.title}</h4>
                <div className="w-12 h-0.5 bg-gold-500 mb-4"></div>
                <p className="text-neutral-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

