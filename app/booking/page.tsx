import type { Metadata } from "next"
import BookingPageClient from "./BookingPageClient"

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Reserve your dining experience at Mosob Asmara. Book a table for an unforgettable journey through authentic Habesha cuisine.",
}

export default function BookingPage() {
  return <BookingPageClient />
}

