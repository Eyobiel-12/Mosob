"use client"

import { useLanguage } from "@/lib/i18n/context"
import { useValidatedTranslations } from "@/lib/i18n/use-validated-translations"
import Image from "next/image"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useEffect } from "react"

export default function AboutPageClient() {
  const { t, language } = useValidatedTranslations("AboutPage", [
    "about.welcome.title",
    "about.welcome.description",
    "about.services.title",
    "about.services.sides",
    "about.services.food",
    "about.services.drinks",
    "about.faq.title",
    "about.faq.hours",
    "about.faq.hoursDetails",
    "about.faq.kids",
    "about.faq.kidsAnswer",
    "about.faq.reservation",
    "about.faq.reservationAnswer",
    "about.faq.halal",
    "about.faq.halalAnswer",
    "about.team.title",
    "about.team.chef.name",
    "about.team.chef.role",
    "about.team.chef.description",
    "about.team.barman.name",
    "about.team.barman.role",
    "about.team.barman.description"
  ])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/about.jpeg"
          alt="Mosob Asmara About"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-gold-500 font-serif text-lg tracking-widest uppercase mb-4">Our Story</h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">About Us</h1>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-neutral-900">
                {mounted ? t("about.welcome.title") : "Welcome to Mosob Asmara"}
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {mounted
                  ? t("about.welcome.description")
                  : "Where the rich flavors of Eritrea come to life! We are passionate about sharing our culture and culinary traditions with our guests."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-neutral-900">
                {mounted ? t("about.team.title") : "Meet Our Team"}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src="/chef.jpeg"
                    alt={mounted ? t("about.team.chef.name") : "Azeb"}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 text-neutral-900">
                  {mounted ? t("about.team.chef.name") : "Azeb"}
                </h3>
                <p className="text-gold-500 font-medium mb-4">
                  {mounted ? t("about.team.chef.role") : "Head Chef"}
                </p>
                <p className="text-neutral-700">
                  {mounted ? t("about.team.chef.description") : "With years of experience in Eritrean cuisine, Azeb brings authentic flavors and traditional cooking techniques to every dish."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src="/bar.jpeg"
                    alt={mounted ? t("about.team.barman.name") : "Tesfit"}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 text-neutral-900">
                  {mounted ? t("about.team.barman.name") : "Tesfit"}
                </h3>
                <p className="text-gold-500 font-medium mb-4">
                  {mounted ? t("about.team.barman.role") : "Bar Manager"}
                </p>
                <p className="text-neutral-700">
                  {mounted ? t("about.team.barman.description") : "Tesfit creates the perfect atmosphere with his expertly crafted cocktails and extensive knowledge of beverages."}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/denist.jpeg"
                  alt="Traditional Eritrean Dining"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-serif font-bold mb-6 text-neutral-900">
                  {mounted ? t("about.services.title") : "Our Services"}
                </h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-medium mb-3 text-gold-500">Sides</h4>
                    <p className="text-neutral-700">
                      {mounted
                        ? t("about.services.sides")
                        : "A crispy fried or air fryer snack as an appetizer? Then sambusa is the perfect dish as a side dish!"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-medium mb-3 text-gold-500">Food</h4>
                    <p className="text-neutral-700">
                      {mounted
                        ? t("about.services.food")
                        : "Our chefs prepare both vegetarian and meat dishes from authentic Eritrean cuisine, especially for our guests."}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-medium mb-3 text-gold-500">Drinks</h4>
                    <p className="text-neutral-700">
                      {mounted
                        ? t("about.services.drinks")
                        : "With us you can not only enjoy delicious dishes, but also a selection of drinks that perfectly complement the Eritrean cuisine."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-neutral-900">
                {mounted ? t("about.faq.title") : "Frequently Asked Questions"}
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="hours">
                <AccordionTrigger className="text-lg font-medium">
                  {mounted ? t("about.faq.hours") : "What are the restaurant's opening hours?"}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="whitespace-pre-line text-neutral-700">
                    {mounted
                      ? t("about.faq.hoursDetails")
                      : "Monday: 16:00-00:00\nTuesday: 16:00-00:00\nWednesday: CLOSED\nThursday: 16:00-00:00\nFriday: 16:00-03:00\nSaturday: 16:00-03:00\nSunday: 16:00-00:00"}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="kids">
                <AccordionTrigger className="text-lg font-medium">
                  {mounted ? t("about.faq.kids") : "Is there a children's menu available?"}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-700">
                    {mounted ? t("about.faq.kidsAnswer") : "Yes, a children's menu is available."}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reservation">
                <AccordionTrigger className="text-lg font-medium">
                  {mounted ? t("about.faq.reservation") : "Is it possible to make reservations online?"}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-700">
                    {mounted
                      ? t("about.faq.reservationAnswer")
                      : "Yes, you can make reservations online on our website."}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="halal">
                <AccordionTrigger className="text-lg font-medium">
                  {mounted ? t("about.faq.halal") : "Is the food Halal?"}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-700">{mounted ? t("about.faq.halalAnswer") : "100%!"}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-neutral-900">Visit Us</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gold-500">Address</h3>
                    <p className="text-neutral-700">
                      <a href="https://g.co/kgs/F86oxsM" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                        Van der Pekstraat 85
                        <br />
                        1031CT Amsterdam
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gold-500">Phone</h3>
                    <p className="text-neutral-700">
                      <a href="tel:+31627475282" className="hover:text-gold-500 transition-colors">+31 6 27475282</a> / <a href="tel:+31642227462" className="hover:text-gold-500 transition-colors">+31 6 42227462</a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gold-500">Email</h3>
                    <p className="text-neutral-700">
                      <a href="mailto:asmaramosob@gmail.com" className="hover:text-gold-500 transition-colors">asmaramosob@gmail.com</a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gold-500">KVK Number</h3>
                    <p className="text-neutral-700">91613760</p>
                  </div>
                </div>
              </div>

              <div className="relative h-80 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.4380261294384!2d4.9211!3d52.3912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609a7e0b5c8f7%3A0x5be0c6f5e8e5a9e0!2sVan%20der%20Pekstraat%2085%2C%201031CT%20Amsterdam!5e0!3m2!1sen!2snl!4v1648226458974!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

