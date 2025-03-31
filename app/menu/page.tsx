import type { Metadata } from "next"
import MenuClientPage from "./MenuClientPage"

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore our exquisite Habesha cuisine at Mosob Asmara. Our menu features authentic Eritrean dishes prepared with the finest ingredients.",
}

export default function MenuPage() {
  return <MenuClientPage />
}

