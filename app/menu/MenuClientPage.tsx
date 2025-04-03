"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useValidatedTranslations } from "@/lib/i18n/use-validated-translations"

// Menu data extracted from the provided images
const foodMenu = {
  appetizers: [
    { name: "Brisin/Linzen Soep", description: "Lentil soup with spring onions, fresh tomatoes and curry", price: "€6.00" },
    { name: "Duba/Pompoen (Soep)", description: "Pumpkin with onions, garlic and Mosob Asmara spices", price: "€6.00" },
    {
      name: "Bamia/Okra (Soep)",
      description: "Okra soup seasoned with traditional Mosob Asmara herbs",
      price: "€6.00",
    },
  ],
  meatDishes: [
    {
      name: "Zigni",
      description: "Beef hot and rich in spices",
      price: "€16.50",
    },
    {
      name: "Derho",
      description: "Chicken legs in red spicy sauce, rich in herbs",
      price: "€16.50",
    },
    {
      name: "Bamia Siga",
      description: "Okra (tropical vegetable) with beef pieces in light tomato sauce, onion and various Mosob Asmara herbs",
      price: "€16.50",
    },
    {
      name: "Beg Alicha",
      description: "Lamb bone in curry sauce, pepper and potato",
      price: "€20.00",
    },
    {
      name: "Tessbi (Wit of Rood)",
      description: "Mild/mildly spiced beef fried hard with butter until dry and served in a dish",
      price: "€17.50",
    },
    {
      name: "Kilwa (Wit of Rood)",
      description: "Cut into pieces and gently fried beef with butter on the fire with red onions, rosemary and fresh peppers and various herbs served in a dish",
      price: "€17.50",
    },
    {
      name: "Tibsi",
      description: "Tender veal, hand-cut and sautéed with traditional Mosob Asmara herbs and spices",
      price: "€20.00",
    },
    {
      name: "Gored Gored",
      description: "Lamb boiled with butter and spicy pepper",
      price: "€20.00",
    },
    {
      name: "Shek La",
      description: "Long sliced lamb, baked on the fire with butter, red onions and rosemary",
      price: "€20.00",
    },
    {
      name: "Zelzel Tibsi",
      description: "Thinly sliced premium beef, expertly prepared to enhance its natural flavors",
      price: "€20.00",
    },
    {
      name: "Ma Mix Vlees",
      description: "Combination of 3 meat dishes (choose from numbers 1,2 and 3or 6)",
      price: "€45.50",
    },
  ],
  fishDishes: [
    {
      name: "Assa / Vis",
      description: "Fish fillet chopped in pieces, tomatoes,spring onion and thyme",
      price: "€20.00",
    },
    {
      name: "Gamba Saus",
      description: "Shrimp in tasty curry saus",
      price: "€20.00",
    },
  ],
  vegetarianDishes: [
    {
      name: "Shiro",
      description: "Sprouted peas in red sauce, garlic, coriander and traditional spices",
      price: "€20.00",
    },
    {
      name: "Doeba",
      description: "Pumpkin sauce with traditional Mosob Asmara spices",
      price: "€15.00",
    },
    {
      name: "Temtemo/Ades",
      description: "Lentil sauce with onions, tomatoes and other traditional Mosob Asmara spices",
      price: "€15.00",
    },
    {
      name: "Alicha",
      description: "Mild/softly spiced, mixed vegetables with green beans, carrots, garlic and potatoes served in the Mosob Asmara dish",
      price: "€15.00",
    },
    {
      name: "Spinazie",
      description: "Fresh spinach cooked in olive oil with onion, garlic and paprika",
      price: "€15.00",
    },
    {
      name: "Selsi of Okra Selsi",
      description: "Selsi, fresh onions in red sauce with different Mosob Asmara spices",
      price: "€15.00",
    },
    {
      name: "Ma-Special Bami",
      description: "Onions and garlic peppers, chicken meat and egg",
      price: "€16.50",
    },
    {
      name: "Ma Pasta Spinazie",
      description: "Fresh spinach fried in olive oil with tomatoes and garlic and creme",
      price: "€16.50",
    },
    {
      name: "Ma Mix Vegetarisch",
      description: "Combination of max. 3 Mosob Asmara vegetarian dishes (15,16 and 17 or 18 and 19)",
      price: "€43.50",
    },
  ],
  desserts: [
    {
      name: "Honing IJs",
      description: "Different kinds of ice cream with honey & nuts",
      price: "€5.00",
    },
    {
      name: "Ma-IJs",
      description: "Various types of ice cream, fresh mango base pistachios and delicious homemade dressing",
      price: "€5.00",
    },
    {
      name: "Ma Dream",
      description: "Roasted linseed, dates, yogurt and bee honey",
      price: "€5.00",
    },
  ],
}

const drinksMenu = {
  whisky: [
    { name: "Johnny Walker Double Black", price: "€8.00" },
    { name: "Johnny Walker Black", price: "€7.00" },
    { name: "Jack Daniels", price: "€6.50" },
    { name: "Red Label", price: "€5.50" },
    { name: "The Famous Grouse", price: "€5.50" },
    { name: "Jameson Black", price: "€5.50" },
  ],
  beers: [
    { name: "Heineken grote tap", price: "€6.50" },
    { name: "Heineken kleine tap", price: "€3.50" },
    { name: "Affligem tap", price: "€4.00" },
    { name: "Duvel fles", price: "€5.00" },
    { name: "Heineken fles 0%", price: "€3.50" },
    { name: "Ma Swa Bier", price: "€3.50" },
    { name: "Asmara Bier", price: "€4.00" },
  ],
  spirits: [
    { name: "Wodka", price: "€5.00" },
    { name: "Gordon's Gin", price: "€5.00" },
    { name: "Tequila", price: "€5.00" },
    { name: "Asmara Ouzo", price: "€5.00" },
    { name: "Asmara Dry Gin", price: "€5.00" },
  ],
  cognac: [
    { name: "Joseph Guy", price: "€5.50" },
    { name: "Jonge Jenever", price: "€6.50" },
  ],
  rum: [{ name: "Bacardi Carta", price: "€6.50" }],
  wines: [
    { name: "House Wine Selection", price: "" },
    { name: "Red/Rosé/White by Glass", price: "€4.00" },
    { name: "Carafe (½ litre)", price: "€12.00" },
    { name: "Bottle", price: "€20.00" },
  ],
  softDrinks: [
    { name: "Coca Cola", price: "€2.50" },
    { name: "Sprite", price: "€2.50" },
    { name: "Fanta Orange", price: "€2.50" },
    { name: "Coca Cola Zero", price: "€2.50" },
    { name: "Bitter Lemon", price: "€2.50" },
    { name: "Red Bull", price: "€2.50" },
    { name: "Tonic", price: "€2.50" },
    { name: "Ginger Ale", price: "€2.50" },
  ],
  hotDrinks: [
    { name: "Mosob Asmara Traditional Eritrean Coffee Ceremony", price: "€10.00" },
    { name: "Eritrean Tea", price: "€3.00" },
    { name: "Cappuccino", price: "€3.00" },
    { name: "Caffè Latte", price: "€3.00" },
    { name: "Filter Coffee", price: "€2.75" },
    { name: "Espresso", price: "€2.75" },
    { name: "Fresh Mint Tea", price: "€3.00" },
    { name: "Hot Chocolate", price: "€3.00" },
  ],
}

export default function MenuClientPage() {
  const [selectedCategory, setSelectedCategory] = useState("appetizers")
  const [selectedDrinkCategory, setSelectedDrinkCategory] = useState("whisky")
  const [mounted, setMounted] = useState(false)
  
  const { t, language } = useValidatedTranslations("MenuPage", [
    "menu.hero.subtitle",
    "menu.hero.title", 
    "menu.tabs.food",
    "menu.tabs.drinks",
    "menu.categories.appetizers",
    "menu.categories.meat",
    "menu.categories.fish",
    "menu.categories.vegetarian",
    "menu.categories.desserts",
    "menu.categories.whisky",
    "menu.categories.beers",
    "menu.categories.spirits",
    "menu.categories.cognac",
    "menu.categories.rum",
    "menu.categories.wines",
    "menu.categories.softDrinks",
    "menu.categories.hotDrinks"
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/food.jpeg"
          alt="Mosob Asmara Menu"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-gold-500 font-serif text-lg tracking-widest uppercase mb-4">
              {mounted ? t("menu.hero.subtitle") : "Culinary Excellence"}
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {mounted ? t("menu.hero.title") : "Our Menu"}
            </h1>
            <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 md:px-6">
        <Tabs defaultValue="food" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-16">
            <TabsTrigger
              value="food"
              className="text-lg font-serif py-3 data-[state=active]:text-gold-500 data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none"
            >
              {mounted ? t("menu.tabs.food") : "Food Menu"}
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="text-lg font-serif py-3 data-[state=active]:text-gold-500 data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none"
            >
              {mounted ? t("menu.tabs.drinks") : "Drinks Menu"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="mt-6">
            <div className="grid gap-16">
              <div className="relative">
                <div className="hidden md:block">
                  <Image
                    src="/menu.jpeg"
                    alt="Mosob Asmara Food Menu"
                    width={800}
                    height={1200}
                    className="mx-auto rounded-lg shadow-lg"
                  />
                </div>

                <div className="md:hidden">
                  <div className="mb-8">
                    <div className="flex justify-center space-x-4 overflow-x-auto pb-4 mb-8">
                      {["appetizers", "meatDishes", "fishDishes", "vegetarianDishes", "desserts"].map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`whitespace-nowrap px-4 py-2 font-medium transition-colors ${
                            selectedCategory === category
                              ? "text-gold-500 border-b-2 border-gold-500"
                              : "text-neutral-500 hover:text-neutral-800"
                          }`}
                        >
                          {category === "meatDishes"
                            ? mounted ? t("menu.categories.meat") : "Meat"
                            : category === "fishDishes"
                              ? mounted ? t("menu.categories.fish") : "Fish"
                              : category === "vegetarianDishes"
                                ? mounted ? t("menu.categories.vegetarian") : "Vegetarian"
                                : category === "appetizers"
                                  ? mounted ? t("menu.categories.appetizers") : "Appetizers"
                                  : mounted ? t("menu.categories.desserts") : "Desserts"}
                        </button>
                      ))}
                    </div>

                    {selectedCategory === "appetizers" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.appetizers") : "Appetizers"}
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.appetizers.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                              </div>
                              <p className="text-neutral-600">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedCategory === "meatDishes" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.meat") : "Meat Dishes"}
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.meatDishes.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                              </div>
                              <p className="text-neutral-600">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedCategory === "fishDishes" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.fish") : "Fish Dishes"}
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.fishDishes.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                              </div>
                              <p className="text-neutral-600">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedCategory === "vegetarianDishes" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.vegetarian") : "Vegetarian Dishes"}
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.vegetarianDishes.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                              </div>
                              <p className="text-neutral-600">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedCategory === "desserts" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.desserts") : "Desserts"}
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.desserts.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                              </div>
                              <p className="text-neutral-600">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drinks" className="mt-6">
            <div className="grid gap-16">
              <div className="relative">
                <div className="hidden md:block">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu-3-standard.jpg-787D9J265tni28ubvkPVMVlQYVW8Dx.jpeg"
                    alt="Mosob Asmara Drinks Menu"
                    width={800}
                    height={1200}
                    className="mx-auto rounded-lg shadow-lg"
                  />
                </div>

                <div className="md:hidden">
                  <div className="mb-8">
                    <div className="flex justify-center space-x-4 overflow-x-auto pb-4 mb-8">
                      {["whisky", "beers", "spirits", "cognac", "rum", "wines", "softDrinks", "hotDrinks"].map(
                        (category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedDrinkCategory(category)}
                            className={`whitespace-nowrap px-4 py-2 font-medium transition-colors ${
                              selectedDrinkCategory === category
                                ? "text-gold-500 border-b-2 border-gold-500"
                                : "text-neutral-500 hover:text-neutral-800"
                            }`}
                          >
                            {category === "softDrinks"
                              ? mounted ? t("menu.categories.softDrinks") : "Soft Drinks"
                              : category === "hotDrinks"
                                ? mounted ? t("menu.categories.hotDrinks") : "Hot Drinks"
                                : category === "whisky"
                                  ? mounted ? t("menu.categories.whisky") : "Whisky"
                                  : category === "beers"
                                    ? mounted ? t("menu.categories.beers") : "Beers"
                                    : category === "spirits"
                                      ? mounted ? t("menu.categories.spirits") : "Spirits"
                                      : category === "cognac"
                                        ? mounted ? t("menu.categories.cognac") : "Cognac"
                                        : category === "rum"
                                          ? mounted ? t("menu.categories.rum") : "Rum"
                                          : category === "wines"
                                            ? mounted ? t("menu.categories.wines") : "Wines"
                                            : category.charAt(0).toUpperCase() + category.slice(1)}
                          </button>
                        ),
                      )}
                    </div>

                    {selectedDrinkCategory === "whisky" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.whisky") : "Whisky"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.whisky.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedDrinkCategory === "beers" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.beers") : "Beers"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.beers.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedDrinkCategory === "spirits" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.spirits") : "Spirits"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.spirits.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedDrinkCategory === "cognac" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.cognac") : "Cognac"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.cognac.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedDrinkCategory === "rum" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.rum") : "Rum"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.rum.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedDrinkCategory === "wines" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.wines") : "Wines"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.wines.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedDrinkCategory === "softDrinks" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.softDrinks") : "Soft Drinks"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.softDrinks.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {selectedDrinkCategory === "hotDrinks" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          {mounted ? t("menu.categories.hotDrinks") : "Hot Drinks"}
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.hotDrinks.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500 mt-1 sm:mt-0">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

