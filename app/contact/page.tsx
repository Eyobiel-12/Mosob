import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mosob Asmara. Contact us for reservations, inquiries, or feedback about our authentic Habesha cuisine and dining experience.",
}

export default function ContactPage() {
  return <ContactPageClient />
}

