"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

// Menu data extracted from the provided images
const foodMenu = {
  appetizers: [
    { name: "Brisin/Linzen Soep", description: "Lentil soup with onions, fresh tomatoes and curry", price: "€6.00" },
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
      description:
        "Prime beef tenderloin simmered in a complex berbere spice blend, finished with clarified butter and fresh herbs",
      price: "€16.50",
    },
    {
      name: "Derho",
      description: "Free-range chicken legs delicately braised in a vibrant red sauce infused with aromatic herbs",
      price: "€16.50",
    },
    {
      name: "Bamia Siga",
      description:
        "Tender beef medallions with heirloom okra in a light tomato essence, perfumed with our signature herb blend",
      price: "€16.50",
    },
    {
      name: "Beg Alicha",
      description: "Succulent lamb slowly simmered in an aromatic herb sauce, accompanied by heritage potatoes",
      price: "€17.50",
    },
    {
      name: "Tessbi (Wit of Rood)",
      description:
        "Dry-aged beef, lightly spiced and pan-seared to perfection with Ethiopian butter until delicately crisp",
      price: "€17.50",
    },
    {
      name: "Kilwa (Wit of Rood)",
      description:
        "Premium lamb medallions gently seared with clarified butter, red chilies, fresh rosemary and a medley of peppers",
      price: "€17.50",
    },
    {
      name: "Tibsi",
      description: "Tender veal, hand-cut and sautéed with traditional Mosob Asmara herbs and spices",
      price: "€20.00",
    },
    {
      name: "Gored Gored",
      description:
        "Lamb medallions delicately cooked with Ethiopian butter, infused with aromatic spices and finished with a touch of pepper",
      price: "€20.00",
    },
    {
      name: "Shek La",
      description:
        "Prime cuts of lamb, slow-roasted over an open flame with butter, caramelized red onions and fresh rosemary",
      price: "€20.00",
    },
    {
      name: "Zelzel Tibsi",
      description: "Thinly sliced premium beef, expertly prepared to enhance its natural flavors",
      price: "€20.00",
    },
    {
      name: "Mix Vlees",
      description:
        "A curated selection of three signature meat preparations, offering a journey through Eritrean culinary traditions",
      price: "€16.50",
    },
  ],
  fishDishes: [
    {
      name: "Assa Avis",
      description: "Delicate fish fillets, gently sautéed with vine-ripened tomatoes, sweet onions and aromatic thyme",
      price: "€20.00",
    },
    {
      name: "Gamba Saus",
      description: "Wild-caught shrimp in a velvety curry sauce, balanced with subtle spices and fresh herbs",
      price: "€20.00",
    },
  ],
  vegetarianDishes: [
    {
      name: "Shiro",
      description:
        "Velvety puree of heirloom legumes, simmered with garlic, coriander and our house-blended Mosob Asmara spices",
      price: "€15.00",
    },
    {
      name: "Duba",
      description: "Organic pumpkin slow-cooked in a rich sauce with traditional Mosob Asmara spice blend",
      price: "€15.00",
    },
    {
      name: "Temtemades",
      description:
        "Artisanal lentils in a fragrant sauce with vine-ripened tomatoes, garlic and our signature spice blend",
      price: "€15.00",
    },
    {
      name: "Alicha",
      description:
        "Garden-fresh vegetables delicately spiced and sautéed with green beans, heirloom carrots and heritage potatoes",
      price: "€15.00",
    },
    {
      name: "Spinazie",
      description:
        "Tender spinach leaves sautéed with cold-pressed olive oil, vine-ripened tomatoes, garlic and aromatic pepper",
      price: "€15.00",
    },
    {
      name: "Selsi of Okra Selsi",
      description:
        "Heirloom okra gently braised in a vibrant red sauce with our proprietary blend of Mosob Asmara spices",
      price: "€15.00",
    },
    {
      name: "Ma Pasta Spinazie",
      description:
        "Fresh spinach sautéed in extra virgin olive oil with vine-ripened tomatoes, garlic and a touch of cream",
      price: "€15.00",
    },
    {
      name: "Ma-Special Bami",
      description: "Tender spinach leaves sautéed with premium olive oil, sweet tomatoes and a delicate garlic cream",
      price: "€15.00",
    },
    {
      name: "Ma Mix Vegetarisch",
      description:
        "A thoughtfully curated selection of three vegetarian specialties, showcasing the diversity of Eritrean plant-based cuisine",
      price: "€13.50",
    },
  ],
  desserts: [
    {
      name: "Honing IJs",
      description: "Artisanal ice cream selection drizzled with wild honey and toasted nuts",
      price: "€5.00",
    },
    {
      name: "Ma-IJs",
      description: "House-made ice cream with fresh mango, pistachios and our signature dressing",
      price: "€5.00",
    },
    {
      name: "Ma Dream",
      description: "Toasted linseed with Medjool dates, organic yogurt and wild honey",
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
            <h2 className="text-gold-500 font-serif text-lg tracking-widest uppercase mb-4">Culinary Excellence</h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Menu</h1>
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
              Food Menu
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="text-lg font-serif py-3 data-[state=active]:text-gold-500 data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none"
            >
              Drinks Menu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="mt-6">
            <div className="grid gap-16">
              <div className="relative">
                <div className="hidden md:block">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu-2-standard.jpg-kOrET33rB3VIs28cDixkA5JFBCYMdB.jpeg"
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
                            ? "Meat"
                            : category === "fishDishes"
                              ? "Fish"
                              : category === "vegetarianDishes"
                                ? "Vegetarian"
                                : category.charAt(0).toUpperCase() + category.slice(1)}
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
                          Appetizers
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.appetizers.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500">{item.price}</span>
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
                          Meat Dishes
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.meatDishes.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500">{item.price}</span>
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
                          Fish Dishes
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.fishDishes.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500">{item.price}</span>
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
                          Vegetarian Dishes
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.vegetarianDishes.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500">{item.price}</span>
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
                          Desserts
                        </h2>
                        <div className="grid gap-8">
                          {foodMenu.desserts.map((item, index) => (
                            <div key={index} className="border-b border-neutral-100 pb-6">
                              <div className="flex justify-between mb-2">
                                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                                <span className="font-medium text-gold-500">{item.price}</span>
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
                              ? "Soft Drinks"
                              : category === "hotDrinks"
                                ? "Hot Drinks"
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
                          Whisky
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.whisky.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Similar blocks for other drink categories */}
                    {selectedDrinkCategory === "beers" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
                          Beers
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.beers.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
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
                          Spirits
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.spirits.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
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
                          Cognac
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.cognac.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
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
                          Rum
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.rum.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
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
                          Wines
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.wines.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
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
                          Soft Drinks
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.softDrinks.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
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
                          Hot Drinks
                        </h2>
                        <div className="grid gap-4">
                          {drinksMenu.hotDrinks.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-neutral-100 pb-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-medium text-gold-500">{item.price}</span>
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

