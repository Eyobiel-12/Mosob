"use client"

import { BookingForm } from "@/components/booking-form"
import Image from "next/image"
import { motion } from "framer-motion"

export default function BookingPageClient() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/e83fa486-399d-4c1f-8f08-75d0167ddfb3.jpg"
          alt="Mosob Asmara Reservations"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-gold-500 font-serif text-lg tracking-widest uppercase mb-4">Your Experience Awaits</h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Reserve a Table</h1>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-50 p-10"
          >
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Reservation Details</h2>
            <BookingForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Opening Hours</h2>
            <div className="mb-12">
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="font-medium">Monday - Tuesday</span>
                <span className="text-gold-500">16:00 - 00:00</span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="font-medium">Wednesday</span>
                <span className="text-gold-500">Closed</span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="font-medium">Thursday</span>
                <span className="text-gold-500">16:00 - 00:00</span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="font-medium">Friday - Saturday</span>
                <span className="text-gold-500">16:00 - 03:00</span>
              </div>
              <div className="flex justify-between py-3 border-b border-neutral-200">
                <span className="font-medium">Sunday</span>
                <span className="text-gold-500">16:00 - 00:00</span>
              </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Contact Information</h2>
            <div className="mb-12">
              <div className="mb-6">
                <p className="font-medium text-neutral-900 mb-2">Address:</p>
                <p className="text-neutral-700">
                  <a href="https://g.co/kgs/F86oxsM" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                    Van der Pekstraat 85
                    <br />
                    1031CT Amsterdam
                  </a>
                </p>
              </div>
              <div className="mb-6">
                <p className="font-medium text-neutral-900 mb-2">Phone:</p>
                <p className="text-neutral-700">
                  <a href="tel:+31627475282" className="hover:text-gold-500 transition-colors">+31 6 27475282</a> / <a href="tel:+31642227462" className="hover:text-gold-500 transition-colors">+31 6 42227462</a>
                </p>
              </div>
              <div>
                <p className="font-medium text-neutral-900 mb-2">Email:</p>
                <p className="text-neutral-700">
                  <a href="mailto:asmaramosob@gmail.com" className="hover:text-gold-500 transition-colors">asmaramosob@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="https://res.cloudinary.com/tf-lab/image/upload/w_1920,c_fill,q_auto,f_auto/restaurant/073fa10c-e7c1-43cf-9af7-33b264e0d24d/fbc27731-2e9b-4a0c-8dbe-b77025c2d2f3.jpg"
                alt="Restaurant Interior"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

