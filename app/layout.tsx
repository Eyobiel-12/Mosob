import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/lib/i18n/context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: {
    default: "Mosob Asmara | Fine Habesha Dining Experience",
    template: "%s | Mosob Asmara",
  },
  description:
    "Experience exquisite Habesha cuisine at Mosob Asmara. Our 5-star restaurant offers authentic Eritrean dishes crafted with precision and passion.",
  keywords: [
    "Habesha restaurant",
    "Mosob Asmara",
    "Fine dining",
    "Eritrean cuisine",
    "5-star restaurant",
    "Luxury dining",
  ],
  openGraph: {
    title: "Mosob Asmara | Fine Habesha Dining Experience",
    description:
      "Experience exquisite Habesha cuisine at Mosob Asmara. Our 5-star restaurant offers authentic Eritrean dishes crafted with precision and passion.",
    url: "https://www.mosobasmara.com",
    siteName: "Mosob Asmara",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'