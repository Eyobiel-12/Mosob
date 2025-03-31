import type { Metadata } from "next"
import GalleryPageClient from "./GalleryPageClient"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore our visual gallery showcasing the authentic Habesha dining experience at Mosob Asmara. View our elegant interior, exquisite dishes, and cultural ambiance.",
}

export default function GalleryPage() {
  return <GalleryPageClient />
}

