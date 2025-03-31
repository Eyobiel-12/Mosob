import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Mosob Asmara, our story, and our commitment to authentic Eritrean cuisine and hospitality.",
}

export default function AboutPage() {
  return <AboutPageClient />
}

