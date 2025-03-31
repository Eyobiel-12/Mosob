"use client"

import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { TikTokIcon } from "@/components/ui/custom-icons"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import { useValidatedTranslations } from "@/lib/i18n/use-validated-translations"
import { useState, useEffect } from "react"
import { Playfair_Display } from "next/font/google"
import Image from "next/image"

// For enhanced typography
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export default function Footer() {
  const { t, language } = useValidatedTranslations("Footer", [
    "footer.description",
    "footer.contact",
    "footer.hours",
    "footer.newsletter",
    "footer.newsletterDescription",
    "footer.emailPlaceholder",
    "footer.subscribe",
    "footer.rights",
    "footer.privacy",
    "footer.terms",
    "nav.menu",
    "menu.categories.appetizers",
    "menu.categories.meat",
    "menu.categories.vegetarian",
    "menu.categories.fish",
    "menu.categories.desserts",
    "booking.hours.mondayTuesday",
    "booking.hours.wednesday",
    "booking.hours.thursday",
    "booking.hours.fridaySaturday",
    "booking.hours.sunday",
    "booking.hours.mondayTuesdayTime",
    "booking.hours.wednesdayTime",
    "booking.hours.thursdayTime",
    "booking.hours.fridaySaturdayTime",
    "booking.hours.sundayTime"
  ])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Habesha-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full -translate-x-1/3 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 relative z-10">
        {/* Top section with logo and social links */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          {/* Luxury logo implementation */}
          <div className="mb-4 relative group">
            <div className="relative w-20 h-20 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo.jpeg"
                alt="Mosob Asmara Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute inset-0 border border-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border border-gold-500/30 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border border-gold-500/30 rounded-full"></div>
          </div>

          <h3 className={`${playfair.className} text-3xl font-bold mb-6 tracking-wide`}>Mosob Asmara</h3>
          <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-8"></div>
          <p className="mb-8 text-neutral-400 leading-relaxed max-w-xl mx-auto">
            {mounted
              ? t("footer.description")
              : "Experience the finest Habesha cuisine in an elegant setting. Our attentive staff awaits to guide you through a memorable dining journey."}
          </p>
          <div className="flex space-x-6">
            <Link href="https://www.facebook.com/share/15kztU56XB/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold-500 transition-colors duration-300">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://www.instagram.com/mosob_asmara?igsh=MXNvY3FoMXYwZzkwcA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold-500 transition-colors duration-300">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://www.tiktok.com/@asmaramos?_t=ZN-8v5VphrIBDa&_r=1" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold-500 transition-colors duration-300">
              <TikTokIcon className="h-5 w-5" />
              <span className="sr-only">TikTok</span>
            </Link>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-neutral-800 pt-16">
          <div className="lg:col-span-1">
            <h3 className={`${playfair.className} text-xl font-bold mb-8 tracking-wide`}>
              {mounted ? t("footer.contact") : "Contact"}
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gold-500/10 p-2 rounded-full mr-3 mt-1">
                  <MapPin className="h-4 w-4 text-gold-500" />
                </div>
                <p className="text-neutral-400">
                  <a href="https://g.co/kgs/F86oxsM" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                    Van der Pekstraat 85
                    <br />
                    1031CT Amsterdam
                  </a>
                </p>
              </div>
              <div className="flex items-center">
                <div className="bg-gold-500/10 p-2 rounded-full mr-3">
                  <Phone className="h-4 w-4 text-gold-500" />
                </div>
                <p className="text-neutral-400">
                  <a href="tel:+31627475282" className="hover:text-gold-500 transition-colors">+31 6 27475282</a> / <a href="tel:+31642227462" className="hover:text-gold-500 transition-colors">+31 6 42227462</a>
                </p>
              </div>
              <div className="flex items-center">
                <div className="bg-gold-500/10 p-2 rounded-full mr-3">
                  <Mail className="h-4 w-4 text-gold-500" />
                </div>
                <p className="text-neutral-400">
                  <a href="mailto:asmaramosob@gmail.com" className="hover:text-gold-500 transition-colors">asmaramosob@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className={`${playfair.className} text-xl font-bold mb-8 tracking-wide`}>
              {mounted ? t("footer.hours") : "Hours"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span>{mounted ? t("booking.hours.mondayTuesday") : "Monday - Tuesday"}</span>
                <span className="text-gold-500">{mounted ? t("booking.hours.mondayTuesdayTime") : "16:00 - 00:00"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span>{mounted ? t("booking.hours.wednesday") : "Wednesday"}</span>
                <span className="text-gold-500">{mounted ? t("booking.hours.wednesdayTime") : "Closed"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span>{mounted ? t("booking.hours.thursday") : "Thursday"}</span>
                <span className="text-gold-500">{mounted ? t("booking.hours.thursdayTime") : "16:00 - 00:00"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span>{mounted ? t("booking.hours.fridaySaturday") : "Friday - Saturday"}</span>
                <span className="text-gold-500">{mounted ? t("booking.hours.fridaySaturdayTime") : "16:00 - 03:00"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{mounted ? t("booking.hours.sunday") : "Sunday"}</span>
                <span className="text-gold-500">{mounted ? t("booking.hours.sundayTime") : "16:00 - 00:00"}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className={`${playfair.className} text-xl font-bold mb-8 tracking-wide`}>
              {mounted ? t("nav.menu") : "Menu"}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/menu"
                  className="text-neutral-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {mounted ? t("menu.categories.appetizers") : "Appetizers"}
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-neutral-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {mounted ? t("menu.categories.meat") : "Meat Dishes"}
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-neutral-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {mounted ? t("menu.categories.vegetarian") : "Vegetarian"}
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-neutral-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {mounted ? t("menu.categories.fish") : "Fish Dishes"}
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-neutral-400 hover:text-gold-500 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {mounted ? t("menu.categories.desserts") : "Desserts"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className={`${playfair.className} text-xl font-bold mb-8 tracking-wide`}>
              {mounted ? t("footer.newsletter") : "Newsletter"}
            </h3>
            <p className="mb-6 text-neutral-400">
              {mounted
                ? t("footer.newsletterDescription")
                : "Subscribe to receive updates on special events and seasonal menus."}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={mounted ? t("footer.emailPlaceholder") : "Your email"}
                className="bg-neutral-800 border-0 text-white px-4 py-3 w-full focus:ring-gold-500 focus:border-gold-500"
              />
              <button className="bg-gold-500 text-black px-6 py-3 hover:bg-gold-600 transition-colors duration-300 uppercase tracking-wider text-sm font-medium">
                {mounted ? t("footer.subscribe") : "Subscribe"}
              </button>
            </div>

            {/* Habesha-inspired decorative element */}
            <div className="mt-8 relative">
              <div className="w-full h-24 border border-gold-500/20 rounded-sm overflow-hidden">
                <Image
                  src="/botom.jpeg"
                  alt="Habesha pattern"
                  fill
                  className="object-cover opacity-30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500">
              &copy; {new Date().getFullYear()} Mosob Asmara. {mounted ? t("footer.rights") : "All rights reserved."}
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0 text-neutral-500">
              <Link href="/privacy" className="hover:text-gold-500 transition-colors duration-300">
                {mounted ? t("footer.privacy") : "Privacy Policy"}
              </Link>
              <Link href="/terms" className="hover:text-gold-500 transition-colors duration-300">
                {mounted ? t("footer.terms") : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

