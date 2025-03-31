"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/context"
import { useTranslation } from "@/lib/i18n/translations"
import { motion } from "framer-motion"
import { Playfair_Display } from "next/font/google"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

// For enhanced typography
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPageClient() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      })
      form.reset()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div>
      {/* Hero Section with Habesha pattern overlay */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/about.jpeg"
          alt="Mosob Asmara Contact"
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
              Get In Touch
            </h2>
            <h1
              className={`${playfair.className} text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight`}
            >
              Contact Us
            </h1>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-8 md:p-12 border border-neutral-100 shadow-sm"
            >
              <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-neutral-900 mb-8`}>
                Send Us a Message
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-900">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="border-neutral-300 focus:border-gold-500 focus:ring-gold-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-900">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                            className="border-neutral-300 focus:border-gold-500 focus:ring-gold-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-900">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is your message about?"
                            {...field}
                            className="border-neutral-300 focus:border-gold-500 focus:ring-gold-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-900">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            className="resize-none min-h-[150px] border-neutral-300 focus:border-gold-500 focus:ring-gold-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-black rounded-none py-6 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold text-neutral-900 mb-8`}>
                Contact Information
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="bg-gold-500/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Our Location</h3>
                    <p className="text-neutral-700">
                      <a href="https://g.co/kgs/F86oxsM" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                        Van der Pekstraat 85
                        <br />
                        1031CT Amsterdam
                        <br />
                        Netherlands
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold-500/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Phone Numbers</h3>
                    <p className="text-neutral-700">
                      <a href="tel:+31627475282" className="hover:text-gold-500 transition-colors">+31 6 27475282</a>
                    </p>
                    <p className="text-neutral-700">
                      <a href="tel:+31642227462" className="hover:text-gold-500 transition-colors">+31 6 42227462</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold-500/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Email</h3>
                    <p className="text-neutral-700">
                      <a href="mailto:asmaramosob@gmail.com" className="hover:text-gold-500 transition-colors">asmaramosob@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold-500/10 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Opening Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Tuesday</span>
                        <span className="text-gold-500">16:00 - 00:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wednesday</span>
                        <span className="text-gold-500">Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thursday</span>
                        <span className="text-gold-500">16:00 - 00:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday - Saturday</span>
                        <span className="text-gold-500">16:00 - 03:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="text-gold-500">16:00 - 00:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-80 w-full overflow-hidden border border-neutral-100 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.4380261294384!2d4.9211!3d52.3912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609a7e0b5c8f7%3A0x5be0c6f5e8e5a9e0!2sVan%20der%20Pekstraat%2085%2C%201031CT%20Amsterdam!5e0!3m2!1sen!2snl!4v1648226458974!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="z-10"
                ></iframe>

                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold-500 z-0"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Habesha-inspired design */}
      <section className="py-20 bg-neutral-50 relative overflow-hidden">
        {/* Habesha-inspired decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <h2 className={`${playfair.className} text-gold-500 text-lg tracking-[0.3em] uppercase mb-4`}>
              Common Questions
            </h2>
            <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-neutral-900 mb-6`}>
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Do you take reservations?",
                answer:
                  "Yes, we highly recommend making a reservation, especially for weekends. You can book a table online through our website or call us directly.",
              },
              {
                question: "Is there parking available?",
                answer:
                  "There is street parking available near the restaurant. We also recommend public transportation as we are conveniently located near several bus and tram stops.",
              },
              {
                question: "Do you cater for private events?",
                answer:
                  "Yes, we offer catering services for private events and celebrations. Please contact us directly to discuss your specific requirements and we'll be happy to create a custom menu for your occasion.",
              },
              {
                question: "Are you wheelchair accessible?",
                answer:
                  "Yes, our restaurant is wheelchair accessible with a ramp at the entrance and accessible restrooms. Please let us know in advance if you require any special accommodations.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 border border-neutral-100 shadow-sm"
              >
                <h4 className="text-xl font-medium mb-4">{faq.question}</h4>
                <p className="text-neutral-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

