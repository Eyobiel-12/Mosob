"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState, useRef, useEffect } from "react"
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, RESTAURANT_EMAIL } from "@/lib/emailjs"
import { useLanguage } from "@/lib/i18n/context"
import { useValidatedTranslations } from "@/lib/i18n/use-validated-translations"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  guests: z.string({
    required_error: "Please select number of guests.",
  }),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
})

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [mounted, setMounted] = useState(false)
  const { t, language } = useValidatedTranslations("BookingForm", [
    "booking.form.name",
    "booking.form.email",
    "booking.form.phone",
    "booking.form.date",
    "booking.form.time",
    "booking.form.guests",
    "booking.form.occasion",
    "booking.form.specialRequests",
    "booking.form.submit", 
    "booking.form.processing",
    "booking.form.selectDate",
    "booking.form.selectTime",
    "booking.form.selectGuests",
    "booking.form.selectOccasion",
    "booking.form.success.title",
    "booking.form.success.description",
    "error.form.required",
    "error.form.email",
    "error.form.phone",
    "error.form.date",
    "error.form.time",
    "error.form.guests",
    "booking.form.moreThan",
    "booking.form.person",
    "booking.form.people",
    "booking.form.occasion.birthday",
    "booking.form.occasion.anniversary",
    "booking.form.occasion.business",
    "booking.form.occasion.date",
    "booking.form.occasion.other",
    "booking.form.error.title",
    "booking.form.error.description"
  ])

  // Initialize EmailJS and set mounted state
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
    setMounted(true)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      occasion: "",
      specialRequests: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: RESTAURANT_EMAIL,
      from_name: values.name,
      from_email: values.email,
      phone: values.phone,
      date: format(values.date, "PPP"),
      time: values.time,
      guests: values.guests,
      occasion: values.occasion || "Not specified",
      special_requests: values.specialRequests || "None",
      reply_to: values.email,
    }

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text)
        toast.success(mounted ? "Reservation Request Received" : "Reservation Request Received", {
          description: mounted 
            ? `Your request for ${values.guests} on ${format(values.date, "PPP")} at ${values.time} has been sent. We'll confirm your reservation shortly via email or phone.`
            : `Your request for ${values.guests} on ${format(values.date, "PPP")} at ${values.time} has been sent. We'll confirm your reservation shortly via email or phone.`,
          duration: 5000,
          className: "bg-white text-neutral-900 border border-gold-200",
          style: {
            background: "white",
            color: "#171717",
            border: "1px solid #E5E7EB",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        })
        form.reset()
      })
      .catch((err) => {
        console.error("FAILED...", err)
        toast.error(mounted ? t("booking.form.error.title") || "Reservation Failed" : "Reservation Failed", {
          description: mounted 
            ? t("booking.form.error.description") || "There was an error processing your reservation. Please try again or contact us directly."
            : "There was an error processing your reservation. Please try again or contact us directly.",
          duration: 5000,
          className: "bg-white text-neutral-900 border border-red-200",
          style: {
            background: "white",
            color: "#171717",
            border: "1px solid #FEE2E2",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-900">{t("booking.form.name")}</FormLabel>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-900">{t("booking.form.email")}</FormLabel>
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-900">{t("booking.form.phone")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+31 6 12345678"
                    {...field}
                    className="border-neutral-300 focus:border-gold-500 focus:ring-gold-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-neutral-900">{t("booking.form.date")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal border-neutral-300 focus:border-gold-500 focus:ring-gold-500",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>{t("booking.form.selectDate")}</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        // Disable dates before today (not including today)
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        if (date < today) return true;
                        
                        // Disable Wednesdays (Wednesday is day 3, where Sunday is day 0)
                        return date.getDay() === 3;
                      }}
                      initialFocus
                      className="border-gold-200"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
                <p className="text-sm text-neutral-500 mt-1">Note: We don't take reservations on Wednesdays.</p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-900">{t("booking.form.time")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-neutral-300 focus:border-gold-500 focus:ring-gold-500">
                      <SelectValue placeholder={mounted ? t("booking.form.selectTime") : "Select a time"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "16:30",
                      "17:00",
                      "17:30",
                      "18:00",
                      "18:30",
                      "19:00",
                      "19:30",
                      "20:00",
                      "20:30",
                      "21:00",
                      "21:30",
                    ].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-900">{t("booking.form.guests")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-neutral-300 focus:border-gold-500 focus:ring-gold-500">
                      <SelectValue placeholder={mounted ? t("booking.form.selectGuests") : "Select number of guests"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((number) => (
                      <SelectItem key={number} value={number}>
                        {number === "10+" ? `${mounted ? t("booking.form.moreThan") : "More than"} 10` : `${number} ${parseInt(number) === 1 ? (mounted ? t("booking.form.person") : "person") : (mounted ? t("booking.form.people") : "people")}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occasion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-900">{t("booking.form.occasion")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-neutral-300 focus:border-gold-500 focus:ring-gold-500">
                      <SelectValue placeholder={mounted ? t("booking.form.selectOccasion") : "Select an occasion"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="birthday">{mounted ? t("booking.form.occasion.birthday") : "Birthday"}</SelectItem>
                    <SelectItem value="anniversary">{mounted ? t("booking.form.occasion.anniversary") : "Anniversary"}</SelectItem>
                    <SelectItem value="business">{mounted ? t("booking.form.occasion.business") : "Business Meal"}</SelectItem>
                    <SelectItem value="date">{mounted ? t("booking.form.occasion.date") : "Date Night"}</SelectItem>
                    <SelectItem value="other">{mounted ? t("booking.form.occasion.other") : "Other"}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-900">{t("booking.form.specialRequests")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any dietary requirements or special requests"
                  className="resize-none border-neutral-300 focus:border-gold-500 focus:ring-gold-500"
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
            className="w-full bg-gold-500 hover:bg-gold-600 text-black rounded-none py-6 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("booking.form.processing") : "Request Reservation"}
          </Button>
        </motion.div>
        <p className="text-sm text-center text-neutral-500 mt-2">
          Reservations require confirmation from our staff. You'll receive a confirmation email or call shortly.
        </p>
      </form>
    </Form>
  )
}

