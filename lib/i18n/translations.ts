export type Language = "en" | "nl"

export const languages: Record<Language, string> = {
  en: "English",
  nl: "Nederlands",
}

export type TranslationKey =
  // Navigation
  | "nav.home"
  | "nav.menu"
  | "nav.about"
  | "nav.gallery"
  | "nav.contact"
  | "nav.reserveTable"

  // Language switcher
  | "language.switch"
  | "language.switchTo"

  // Home page
  | "home.hero.subtitle"
  | "home.hero.title"
  | "home.hero.description"
  | "home.hero.exploreMenu"
  | "home.hero.reserveTable"
  | "home.hero.discoverMore"
  | "home.about.subtitle"
  | "home.about.title"
  | "home.about.description1"
  | "home.about.description2"
  | "home.about.philosophy"
  | "home.menu.subtitle"
  | "home.menu.title"
  | "home.experience.subtitle"
  | "home.experience.title"
  | "home.experience.description"
  | "home.experience.reserve"
  | "home.testimonials.subtitle"
  | "home.testimonials.title"
  | "home.testimonials.quote1"
  | "home.testimonials.author1"
  | "home.testimonials.title1"
  | "home.testimonials.quote2"
  | "home.testimonials.author2"
  | "home.testimonials.title2"
  | "home.testimonials.quote3"
  | "home.testimonials.author3"
  | "home.testimonials.title3"
  | "home.reservation.subtitle"
  | "home.reservation.title"
  | "home.reservation.description"
  | "home.reservation.cta"

  // Menu page
  | "menu.hero.subtitle"
  | "menu.hero.title"
  | "menu.tabs.food"
  | "menu.tabs.drinks"
  | "menu.categories.appetizers"
  | "menu.categories.meat"
  | "menu.categories.fish"
  | "menu.categories.vegetarian"
  | "menu.categories.desserts"
  | "menu.categories.whisky"
  | "menu.categories.beers"
  | "menu.categories.spirits"
  | "menu.categories.cognac"
  | "menu.categories.rum"
  | "menu.categories.wines"
  | "menu.categories.softDrinks"
  | "menu.categories.hotDrinks"

  // Menu items (appetizers)
  | "menu.appetizers.brisin.name"
  | "menu.appetizers.brisin.description"
  | "menu.appetizers.duba.name"
  | "menu.appetizers.duba.description"
  | "menu.appetizers.bamia.name"
  | "menu.appetizers.bamia.description"

  // Menu items (meat dishes)
  | "menu.meat.zigni.name"
  | "menu.meat.zigni.description"
  | "menu.meat.derho.name"
  | "menu.meat.derho.description"
  | "menu.meat.bamiaSiga.name"
  | "menu.meat.bamiaSiga.description"
  | "menu.meat.begAlicha.name"
  | "menu.meat.begAlicha.description"
  | "menu.meat.tessbi.name"
  | "menu.meat.tessbi.description"
  | "menu.meat.kilwa.name"
  | "menu.meat.kilwa.description"
  | "menu.meat.tibsi.name"
  | "menu.meat.tibsi.description"
  | "menu.meat.goredGored.name"
  | "menu.meat.goredGored.description"
  | "menu.meat.shekLa.name"
  | "menu.meat.shekLa.description"
  | "menu.meat.zelzelTibsi.name"
  | "menu.meat.zelzelTibsi.description"
  | "menu.meat.mixVlees.name"
  | "menu.meat.mixVlees.description"

  // Menu items (fish dishes)
  | "menu.fish.assaAvis.name"
  | "menu.fish.assaAvis.description"
  | "menu.fish.gambaSaus.name"
  | "menu.fish.gambaSaus.description"

  // Menu items (vegetarian dishes)
  | "menu.vegetarian.shiro.name"
  | "menu.vegetarian.shiro.description"
  | "menu.vegetarian.duba.name"
  | "menu.vegetarian.duba.description"
  | "menu.vegetarian.temtemades.name"
  | "menu.vegetarian.temtemades.description"
  | "menu.vegetarian.alicha.name"
  | "menu.vegetarian.alicha.description"
  | "menu.vegetarian.spinazie.name"
  | "menu.vegetarian.spinazie.description"
  | "menu.vegetarian.selsi.name"
  | "menu.vegetarian.selsi.description"
  | "menu.vegetarian.maPastaSpinazi.name"
  | "menu.vegetarian.maPastaSpinazi.description"
  | "menu.vegetarian.maSpecialBami.name"
  | "menu.vegetarian.maSpecialBami.description"
  | "menu.vegetarian.maMixVegetarisch.name"
  | "menu.vegetarian.maMixVegetarisch.description"

  // Menu items (desserts)
  | "menu.desserts.honingIJs.name"
  | "menu.desserts.honingIJs.description"
  | "menu.desserts.maIJs.name"
  | "menu.desserts.maIJs.description"
  | "menu.desserts.maDream.name"
  | "menu.desserts.maDream.description"

  // Booking page
  | "booking.hero.subtitle"
  | "booking.hero.title"
  | "booking.form.title"
  | "booking.form.name"
  | "booking.form.email"
  | "booking.form.phone"
  | "booking.form.date"
  | "booking.form.time"
  | "booking.form.guests"
  | "booking.form.occasion"
  | "booking.form.specialRequests"
  | "booking.form.submit"
  | "booking.form.processing"
  | "booking.form.selectDate"
  | "booking.form.selectTime"
  | "booking.form.selectGuests"
  | "booking.form.selectOccasion"
  | "booking.form.person"
  | "booking.form.people"
  | "booking.form.moreThan"
  | "booking.form.occasion.birthday"
  | "booking.form.occasion.anniversary"
  | "booking.form.occasion.business"
  | "booking.form.occasion.date"
  | "booking.form.occasion.other"
  | "booking.form.success.title"
  | "booking.form.success.description"
  | "booking.form.error.title"
  | "booking.form.error.description"
  | "booking.hours.title"
  | "booking.hours.mondayTuesday"
  | "booking.hours.wednesday"
  | "booking.hours.thursday"
  | "booking.hours.fridaySaturday"
  | "booking.hours.sunday"
  | "booking.hours.mondayTuesdayTime"
  | "booking.hours.wednesdayTime"
  | "booking.hours.thursdayTime"
  | "booking.hours.fridaySaturdayTime"
  | "booking.hours.sundayTime"
  | "booking.contact.title"
  | "booking.contact.address"
  | "booking.contact.phone"
  | "booking.contact.email"

  // About page
  | "about.welcome.title"
  | "about.welcome.description"
  | "about.services.title"
  | "about.services.sides"
  | "about.services.food"
  | "about.services.drinks"
  | "about.faq.title"
  | "about.faq.hours"
  | "about.faq.hoursDetails"
  | "about.faq.kids"
  | "about.faq.kidsAnswer"
  | "about.faq.reservation"
  | "about.faq.reservationAnswer"
  | "about.faq.halal"
  | "about.faq.halalAnswer"
  | "about.visit.title"
  | "about.visit.address"
  | "about.visit.phone"
  | "about.visit.email"
  | "about.visit.kvk"
  | "about.team.title"
  | "about.team.chef.name"
  | "about.team.chef.role"
  | "about.team.chef.description"
  | "about.team.barman.name"
  | "about.team.barman.role"
  | "about.team.barman.description"

  // Footer
  | "footer.description"
  | "footer.contact"
  | "footer.hours"
  | "footer.newsletter"
  | "footer.newsletterDescription"
  | "footer.subscribe"
  | "footer.emailPlaceholder"
  | "footer.rights"
  | "footer.privacy"
  | "footer.terms"

  // Error messages
  | "error.translation"
  | "error.loading"
  | "error.form.required"
  | "error.form.email"
  | "error.form.phone"
  | "error.form.date"
  | "error.form.time"
  | "error.form.guests"
  | "error.language.switch"

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.about": "About",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.reserveTable": "Reserve a Table",

    // Language switcher
    "language.switch": "Switch language",
    "language.switchTo": "Switch to {language}",

    // Home page
    "home.hero.subtitle": "Fine Habesha Cuisine",
    "home.hero.title": "Mosob Asmara",
    "home.hero.description": "A culinary journey through the rich flavors of Eritrea",
    "home.hero.exploreMenu": "Explore Our Menu",
    "home.hero.reserveTable": "Reserve a Table",
    "home.hero.discoverMore": "Discover More",
    "home.about.subtitle": "Our Story",
    "home.about.title": "A Tradition of Excellence",
    "home.about.description1":
      "Mosob Asmara brings the refined flavors and traditions of Eritrean cuisine to discerning palates. Named after the traditional Eritrean dining table (Mosob) and the capital city of Eritrea (Asmara), our restaurant offers an unparalleled fine dining experience.",
    "home.about.description2":
      "Our culinary team meticulously crafts each dish using time-honored techniques and the finest ingredients, creating a symphony of flavors that honors our heritage while embracing modern culinary innovation.",
    "home.about.philosophy": "Our Philosophy",
    "home.menu.subtitle": "Culinary Excellence",
    "home.menu.title": "Signature Dishes",
    "home.experience.subtitle": "The Experience",
    "home.experience.title": "Dine with Tradition",
    "home.experience.description":
      "Immerse yourself in the authentic Habesha dining experience, where every meal is a celebration of culture and flavor.",
    "home.experience.reserve": "Reserve Your Experience",
    "home.testimonials.subtitle": "Guest Experiences",
    "home.testimonials.title": "What Our Guests Say",
    "home.testimonials.quote1":
      "Eten was super lekker, en personeel was erg vriendelijk. Als een echte Eritreeër was ik sceptisch, maar dit voelde als thuis. Daarnaast is het personeel erg enthousiast om alles over het eten uit te leggen als je vragen hebt. Zal er zeker nog een keer komen!",
    "home.testimonials.author1": "Everbest O.",
    "home.testimonials.title1": "7 november 2024 • 10/10",
    "home.testimonials.quote2":
      "Het eten was heerlijk gekruid. Bediening was vriendelijk en helpt je als het nodig is bij het kiezen van het menu. Met z'n allen van 1 bord eten was weer een andere ervaring dan we gewend zijn en erg leuk. Voor herhaling fatbaar.",
    "home.testimonials.author2": "Anita L.",
    "home.testimonials.title2": "15 augustus 2024 • 10/10",
    "home.testimonials.quote3":
      "Je wordt er ontvangen met een lach van oor tot oor. Reserveren is aanbevolen maar er is altijd wel een tafel vrij. Het restaurant is eenvoudig van inrichting en heeft een gezellige bar. In een hoek staan comfortabele crapauds. De geur van het exotische eten maakt je nog hongeriger dan je al bent. Op de achtergrond klinkt typisch Oostafrikaanse muziek. Wat het ook zo leuk maakt is dat in de meeste gevallen de kok zelf het eten aan tafel serveert. Op een ronde mand - mosob - liggen een aantal injerra gedrapeerd waarop de vlees- en vegetarische gerechten in zwart keramische bakjes staan. In de meeste gevallen worden de gerechten door de kok zelf aan tafel geserveerd. Van Gogh zou er een prachtig en kleurrijk schilderij van hebben gemaakt. De smaakpapillen van je tong maken de avond compleet. Kortom, dit restaurant is echt een aanwinst voor Amsterdam en omstreken.",
    "home.testimonials.author3": "Sara d.",
    "home.testimonials.title3": "15 augustus 2024 • 10/10",
    "home.reservation.subtitle": "Join Us",
    "home.reservation.title": "Reserve Your Table",
    "home.reservation.description":
      "Experience the finest Habesha cuisine in an elegant setting. Our attentive staff awaits to guide you through a memorable dining journey.",
    "home.reservation.cta": "Make a Reservation",

    // Menu page
    "menu.hero.subtitle": "Culinary Excellence",
    "menu.hero.title": "Our Menu",
    "menu.tabs.food": "Food Menu",
    "menu.tabs.drinks": "Drinks Menu",
    "menu.categories.appetizers": "Appetizers",
    "menu.categories.meat": "Meat",
    "menu.categories.fish": "Fish",
    "menu.categories.vegetarian": "Vegetarian",
    "menu.categories.desserts": "Desserts",
    "menu.categories.whisky": "Whisky",
    "menu.categories.beers": "Beers",
    "menu.categories.spirits": "Spirits",
    "menu.categories.cognac": "Cognac",
    "menu.categories.rum": "Rum",
    "menu.categories.wines": "Wines",
    "menu.categories.softDrinks": "Soft Drinks",
    "menu.categories.hotDrinks": "Hot Drinks",

    // Menu items (appetizers)
    "menu.appetizers.brisin.name": "Brisin/Linzen Soep",
    "menu.appetizers.brisin.description": "Lentil soup with onions, fresh tomatoes and curry",
    "menu.appetizers.duba.name": "Duba/Pompoen (Soep)",
    "menu.appetizers.duba.description": "Pumpkin with onions, garlic and Mosob Asmara spices",
    "menu.appetizers.bamia.name": "Bamia/Okra (Soep)",
    "menu.appetizers.bamia.description": "Okra soup seasoned with traditional Mosob Asmara herbs",

    // Menu items (meat dishes)
    "menu.meat.zigni.name": "Zigni",
    "menu.meat.zigni.description":
      "Prime beef tenderloin simmered in a complex berbere spice blend, finished with clarified butter and fresh herbs",
    "menu.meat.derho.name": "Derho",
    "menu.meat.derho.description":
      "Free-range chicken legs delicately braised in a vibrant red sauce infused with aromatic herbs",
    "menu.meat.bamiaSiga.name": "Bamia Siga",
    "menu.meat.bamiaSiga.description":
      "Tender beef medallions with heirloom okra in a light tomato essence, perfumed with our signature herb blend",
    "menu.meat.begAlicha.name": "Beg Alicha",
    "menu.meat.begAlicha.description":
      "Succulent lamb slowly simmered in an aromatic herb sauce, accompanied by heritage potatoes",
    "menu.meat.tessbi.name": "Tessbi (Wit of Rood)",
    "menu.meat.tessbi.description":
      "Dry-aged beef, lightly spiced and pan-seared to perfection with Ethiopian butter until delicately crisp",
    "menu.meat.kilwa.name": "Kilwa (Wit of Rood)",
    "menu.meat.kilwa.description":
      "Premium lamb medallions gently seared with clarified butter, red chilies, fresh rosemary and a medley of peppers",
    "menu.meat.tibsi.name": "Tibsi",
    "menu.meat.tibsi.description": "Tender veal, hand-cut and sautéed with traditional Mosob Asmara herbs and spices",
    "menu.meat.goredGored.name": "Gored Gored",
    "menu.meat.goredGored.description":
      "Lamb medallions delicately cooked with Ethiopian butter, infused with aromatic spices and finished with a touch of pepper",
    "menu.meat.shekLa.name": "Shek La",
    "menu.meat.shekLa.description":
      "Prime cuts of lamb, slow-roasted over an open flame with butter, caramelized red onions and fresh rosemary",
    "menu.meat.zelzelTibsi.name": "Zelzel Tibsi",
    "menu.meat.zelzelTibsi.description": "Thinly sliced premium beef, expertly prepared to enhance its natural flavors",
    "menu.meat.mixVlees.name": "Mix Vlees",
    "menu.meat.mixVlees.description":
      "A curated selection of three signature meat preparations, offering a journey through Eritrean culinary traditions",

    // Menu items (fish dishes)
    "menu.fish.assaAvis.name": "Assa Avis",
    "menu.fish.assaAvis.description":
      "Delicate visfilets, zachtjes gesauteerd met rijpe tomaten, zoete uien en aromatische tijm",
    "menu.fish.gambaSaus.name": "Gamba Saus",
    "menu.fish.gambaSaus.description":
      "In het wild gevangen garnalen in een fluweelzachte currysaus, in balans gebracht met subtiele kruiden en verse kruiden",

    // Menu items (vegetarian dishes)
    "menu.vegetarian.shiro.name": "Shiro",
    "menu.vegetarian.shiro.description":
      "Velvety puree of heirloom legumes, simmered with garlic, coriander and our house-blended Mosob Asmara spices",
    "menu.vegetarian.duba.name": "Duba",
    "menu.vegetarian.duba.description":
      "Organic pumpkin slow-cooked in a rich sauce with traditional Mosob Asmara spice blend",
    "menu.vegetarian.temtemades.name": "Temtemades",
    "menu.vegetarian.temtemades.description":
      "Artisanal lentils in a fragrant sauce with vine-ripened tomatoes, garlic and our signature spice blend",
    "menu.vegetarian.alicha.name": "Alicha",
    "menu.vegetarian.alicha.description":
      "Garden-fresh vegetables delicately spiced and sautéed with green beans, heirloom carrots and heritage potatoes",
    "menu.vegetarian.spinazie.name": "Spinazie",
    "menu.vegetarian.spinazie.description":
      "Tender spinach leaves sautéed with cold-pressed olive oil, vine-ripened tomatoes, garlic and aromatic pepper",
    "menu.vegetarian.selsi.name": "Selsi of Okra Selsi",
    "menu.vegetarian.selsi.description":
      "Heirloom okra gently braised in a vibrant red sauce with our proprietary blend of Mosob Asmara spices",
    "menu.vegetarian.maPastaSpinazi.name": "Ma Pasta Spinazie",
    "menu.vegetarian.maPastaSpinazi.description":
      "Fresh spinach sautéed in extra virgin olive oil with vine-ripened tomatoes, garlic and a touch of cream",
    "menu.vegetarian.maSpecialBami.name": "Ma-Special Bami",
    "menu.vegetarian.maSpecialBami.description":
      "Tender spinach leaves sautéed with premium olive oil, sweet tomatoes and a delicate garlic cream",
    "menu.vegetarian.maMixVegetarisch.name": "Ma Mix Vegetarisch",
    "menu.vegetarian.maMixVegetarisch.description":
      "A thoughtfully curated selection of three vegetarian specialties, showcasing the diversity of Eritrean plant-based cuisine",

    // Menu items (desserts)
    "menu.desserts.honingIJs.name": "Honing IJs",
    "menu.desserts.honingIJs.description": "Artisanal ice cream selection drizzled with wild honey and toasted nuts",
    "menu.desserts.maIJs.name": "Ma-IJs",
    "menu.desserts.maIJs.description": "House-made ice cream with fresh mango, pistachios and our signature dressing",
    "menu.desserts.maDream.name": "Ma Dream",
    "menu.desserts.maDream.description": "Toasted linseed with Medjool dates, organic yogurt and wild honey",

    // Booking page
    "booking.hero.subtitle": "Your Experience Awaits",
    "booking.hero.title": "Reserve a Table",
    "booking.form.title": "Reservation Details",
    "booking.form.name": "Full Name",
    "booking.form.email": "Email",
    "booking.form.phone": "Phone",
    "booking.form.date": "Date",
    "booking.form.time": "Time",
    "booking.form.guests": "Number of Guests",
    "booking.form.occasion": "Occasion (Optional)",
    "booking.form.specialRequests": "Special Requests (Optional)",
    "booking.form.submit": "Confirm Reservation",
    "booking.form.processing": "Processing...",
    "booking.form.selectDate": "Select a date",
    "booking.form.selectTime": "Select a time",
    "booking.form.selectGuests": "Select number of guests",
    "booking.form.selectOccasion": "Select an occasion",
    "booking.form.person": "person",
    "booking.form.people": "people",
    "booking.form.moreThan": "More than",
    "booking.form.occasion.birthday": "Birthday",
    "booking.form.occasion.anniversary": "Anniversary",
    "booking.form.occasion.business": "Business Meal",
    "booking.form.occasion.date": "Date Night",
    "booking.form.occasion.other": "Other",
    "booking.form.success.title": "Reservation Confirmed",
    "booking.form.success.description": "Your table has been reserved. We look forward to welcoming you!",
    "booking.form.error.title": "Reservation Failed",
    "booking.form.error.description": "There was an error processing your reservation. Please try again or contact us directly.",
    "booking.hours.title": "Opening Hours",
    "booking.hours.mondayTuesday": "Monday - Tuesday",
    "booking.hours.wednesday": "Wednesday",
    "booking.hours.thursday": "Thursday",
    "booking.hours.fridaySaturday": "Friday - Saturday",
    "booking.hours.sunday": "Sunday",
    "booking.hours.mondayTuesdayTime": "16:00 - 00:00",
    "booking.hours.wednesdayTime": "Closed",
    "booking.hours.thursdayTime": "16:00 - 00:00",
    "booking.hours.fridaySaturdayTime": "16:00 - 03:00",
    "booking.hours.sundayTime": "16:00 - 00:00",
    "booking.contact.title": "Contact Information",
    "booking.contact.address": "Address:",
    "booking.contact.phone": "Phone:",
    "booking.contact.email": "Email:",

    // About page
    "about.welcome.title": "Welcome to Mosob Asmara",
    "about.welcome.description":
      "Where the rich flavors of Eritrea come to life! We are passionate about sharing our culture and culinary traditions with our guests. Here you can enjoy authentic dishes, prepared with fresh ingredients and love according to age-old recipes passed down from generation to generation. Our cuisine is known for its unique blend of spices, fragrant stews, and the heart of our culture: injera – a light, slightly sour pancake that perfectly complements our dishes.",
    "about.services.title": "Our Services",
    "about.services.sides":
      "A crispy fried or air fryer snack as an appetizer? Then sambusa is the perfect dish as a side dish!",
    "about.services.food":
      "Our chefs prepare both vegetarian and meat dishes from authentic Eritrean cuisine, especially for our guests. These dishes are served with injera, traditional pancakes made from teff flour.",
    "about.services.drinks":
      "With us you can not only enjoy delicious dishes, but also a selection of drinks that perfectly complement the Eritrean cuisine. Try our traditional Asmara beer, an authentic Eritrean beer with a rich, full flavor. We also offer various soft drinks, coffee and tea to complete your meal.",
    "about.faq.title": "Frequently Asked Questions",
    "about.faq.hours": "What are the restaurant's opening hours?",
    "about.faq.hoursDetails":
      "Monday: 16:00-00:00\nTuesday: 16:00-00:00\nWednesday: CLOSED\nThursday: 16:00-00:00\nFriday: 16:00-03:00\nSaturday: 16:00-03:00\nSunday: 16:00-00:00",
    "about.faq.kids": "Is there a children's menu available?",
    "about.faq.kidsAnswer": "Yes, a children's menu is available.",
    "about.faq.reservation": "Is it possible to make reservations online?",
    "about.faq.reservationAnswer": "Yes, you can make reservations online on our website.",
    "about.faq.halal": "Is the food Halal?",
    "about.faq.halalAnswer": "100%!",
    "about.visit.title": "Visit Us",
    "about.visit.address": "Address",
    "about.visit.phone": "Phone",
    "about.visit.email": "Email",
    "about.visit.kvk": "KVK Number",
    "about.team.title": "Meet Our Team",
    "about.team.chef.name": "Azeb",
    "about.team.chef.role": "Head Chef",
    "about.team.chef.description": "With years of experience in Eritrean cuisine, Azeb brings authentic flavors and traditional cooking techniques to every dish.",
    "about.team.barman.name": "Tesfit",
    "about.team.barman.role": "Bar Manager",
    "about.team.barman.description": "Tesfit creates the perfect atmosphere with his expertly crafted cocktails and extensive knowledge of beverages.",

    // Footer
    "footer.description":
      "Experience the finest Habesha cuisine in an elegant setting. Our attentive staff awaits to guide you through a memorable dining journey.",
    "footer.contact": "Contact",
    "footer.hours": "Hours",
    "footer.newsletter": "Newsletter",
    "footer.newsletterDescription": "Subscribe to receive updates on special events and seasonal menus.",
    "footer.subscribe": "Subscribe",
    "footer.emailPlaceholder": "Your email",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Error messages
    "error.translation": "Translation not available",
    "error.loading": "Loading...",
    "error.form.required": "This field is required",
    "error.form.email": "Please enter a valid email address",
    "error.form.phone": "Please enter a valid phone number",
    "error.form.date": "Please select a date",
    "error.form.time": "Please select a time",
    "error.form.guests": "Please select number of guests",
    "error.language.switch": "Could not switch language. Please try again.",
  },

  nl: {
    // Navigation
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.about": "Over Ons",
    "nav.gallery": "Galerij",
    "nav.contact": "Contact",
    "nav.reserveTable": "Reserveer een Tafel",

    // Language switcher
    "language.switch": "Wissel taal",
    "language.switchTo": "Wissel naar {language}",

    // Home page
    "home.hero.subtitle": "Verfijnde Habesha Keuken",
    "home.hero.title": "Mosob Asmara",
    "home.hero.description": "Een culinaire reis door de rijke smaken van Eritrea",
    "home.hero.exploreMenu": "Ontdek Ons Menu",
    "home.hero.reserveTable": "Reserveer een Tafel",
    "home.hero.discoverMore": "Ontdek Meer",
    "home.about.subtitle": "Ons Verhaal",
    "home.about.title": "Een Traditie van Excellentie",
    "home.about.description1":
      "Mosob Asmara brengt de verfijnde smaken en tradities van de Eritrese keuken naar fijnproevers. Genoemd naar de traditionele Eritrese eettafel (Mosob) en de hoofdstad van Eritrea (Asmara), biedt ons restaurant een ongeëvenaarde fine dining ervaring.",
    "home.about.description2":
      "Ons culinaire team bereidt elk gerecht zorgvuldig met traditionele technieken en de beste ingrediënten, waardoor een symfonie van smaken ontstaat die onze erfgoed eert en tegelijkertijd moderne culinaire innovatie omarmt.",
    "home.about.philosophy": "Onze Filosofie",
    "home.menu.subtitle": "Culinaire Excellentie",
    "home.menu.title": "Signature Gerechten",
    "home.experience.subtitle": "De Ervaring",
    "home.experience.title": "Dineren met Traditie",
    "home.experience.description":
      "Dompel uzelf onder in de authentieke Habesha eetervaring, waar elke maaltijd een viering is van cultuur en smaak.",
    "home.experience.reserve": "Reserveer Uw Ervaring",
    "home.testimonials.subtitle": "Gastervaringen",
    "home.testimonials.title": "Wat Onze Gasten Zeggen",
    "home.testimonials.quote1":
      "Eten was super lekker, en personeel was erg vriendelijk. Als een echte Eritreeër was ik sceptisch, maar dit voelde als thuis. Daarnaast is het personeel erg enthousiast om alles over het eten uit te leggen als je vragen hebt. Zal er zeker nog een keer komen!",
    "home.testimonials.author1": "Everbest O.",
    "home.testimonials.title1": "7 november 2024 • 10/10",
    "home.testimonials.quote2":
      "Het eten was heerlijk gekruid. Bediening was vriendelijk en helpt je als het nodig is bij het kiezen van het menu. Met z'n allen van 1 bord eten was weer een andere ervaring dan we gewend zijn en erg leuk. Voor herhaling fatbaar.",
    "home.testimonials.author2": "Anita L.",
    "home.testimonials.title2": "15 augustus 2024 • 10/10",
    "home.testimonials.quote3":
      "Je wordt er ontvangen met een lach van oor tot oor. Reserveren is aanbevolen maar er is altijd wel een tafel vrij. Het restaurant is eenvoudig van inrichting en heeft een gezellige bar. In een hoek staan comfortabele crapauds. De geur van het exotische eten maakt je nog hongeriger dan je al bent. Op de achtergrond klinkt typisch Oostafrikaanse muziek. Wat het ook zo leuk maakt is dat in de meeste gevallen de kok zelf het eten aan tafel serveert. Op een ronde mand - mosob - liggen een aantal injerra gedrapeerd waarop de vlees- en vegetarische gerechten in zwart keramische bakjes staan. In de meeste gevallen worden de gerechten door de kok zelf aan tafel geserveerd. Van Gogh zou er een prachtig en kleurrijk schilderij van hebben gemaakt. De smaakpapillen van je tong maken de avond compleet. Kortom, dit restaurant is echt een aanwinst voor Amsterdam en omstreken.",
    "home.testimonials.author3": "Sara d.",
    "home.testimonials.title3": "15 augustus 2024 • 10/10",
    "home.reservation.subtitle": "Doe Mee",
    "home.reservation.title": "Reserveer Uw Tafel",
    "home.reservation.description":
      "Ervaar de fijnste Habesha keuken in een elegante omgeving. Ons attente personeel staat klaar om u te begeleiden door een onvergetelijke culinaire reis.",
    "home.reservation.cta": "Maak een Reservering",

    // Menu page
    "menu.hero.subtitle": "Culinaire Excellentie",
    "menu.hero.title": "Ons Menu",
    "menu.tabs.food": "Eten Menu",
    "menu.tabs.drinks": "Dranken Menu",
    "menu.categories.appetizers": "Voorgerechten",
    "menu.categories.meat": "Vlees",
    "menu.categories.fish": "Vis",
    "menu.categories.vegetarian": "Vegetarisch",
    "menu.categories.desserts": "Desserts",
    "menu.categories.whisky": "Whisky",
    "menu.categories.beers": "Bieren",
    "menu.categories.spirits": "Sterke Drank",
    "menu.categories.cognac": "Cognac",
    "menu.categories.rum": "Rum",
    "menu.categories.wines": "Wijnen",
    "menu.categories.softDrinks": "Frisdranken",
    "menu.categories.hotDrinks": "Warme Dranken",

    // Menu items (appetizers)
    "menu.appetizers.brisin.name": "Brisin/Linzen Soep",
    "menu.appetizers.brisin.description": "Linzensoep met uien, verse tomaten en curry",
    "menu.appetizers.duba.name": "Duba/Pompoen (Soep)",
    "menu.appetizers.duba.description": "Pompoen met uien, knoflook en Mosob Asmara kruiden",
    "menu.appetizers.bamia.name": "Bamia/Okra (Soep)",
    "menu.appetizers.bamia.description": "Okrasoep op smaak gebracht met traditionele Mosob Asmara kruiden",

    // Menu items (meat dishes)
    "menu.meat.zigni.name": "Zigni",
    "menu.meat.zigni.description":
      "Prime rundvlees ossenhaas gestoofde in een complexe berbere kruidenmix, afgemaakt met geklaarde boter en verse kruiden",
    "menu.meat.derho.name": "Derho",
    "menu.meat.derho.description":
      "Scharrelkippenpoten zachtjes gestoofd in een levendige rode saus met aromatische kruiden",
    "menu.meat.bamiaSiga.name": "Bamia Siga",
    "menu.meat.bamiaSiga.description":
      "Malse rundvleesmedaillons met erfgoed-okra in een lichte tomatensaus, geparfumeerd met onze kenmerkende kruidenmix",
    "menu.meat.begAlicha.name": "Beg Alicha",
    "menu.meat.begAlicha.description":
      "Sappig lamsvlees langzaam gestoofde in een aromatische kruidensaus, vergezeld van erfgoedaardappelen",
    "menu.meat.tessbi.name": "Tessbi (Wit of Rood)",
    "menu.meat.tessbi.description":
      "Dry-aged rundvlees, licht gekruid en in de pan gebakken tot perfectie met Ethiopische boter tot delicaat knapperig",
    "menu.meat.kilwa.name": "Kilwa (Wit of Rood)",
    "menu.meat.kilwa.description":
      "Premium lamsmedaillons zachtjes gebakken met geklaarde boter, rode pepers, verse rozemarijn en een mengeling van paprika's",
    "menu.meat.tibsi.name": "Tibsi",
    "menu.meat.tibsi.description":
      "Malse kalfsvlees, handgesneden en gesauteerd met traditionele Mosob Asmara kruiden en specerijen",
    "menu.meat.goredGored.name": "Gored Gored",
    "menu.meat.goredGored.description":
      "Lamsmedaillons delicaat bereid met Ethiopische boter, doordrenkt met aromatische kruiden en afgewerkt met een vleugje peper",
    "menu.meat.shekLa.name": "Shek La",
    "menu.meat.shekLa.description":
      "Beste stukken lamsvlees, langzaam geroosterd boven open vuur met boter, gekarameliseerde rode uien en verse rozemarijn",
    "menu.meat.zelzelTibsi.name": "Zelzel Tibsi",
    "menu.meat.zelzelTibsi.description":
      "Dun gesneden premium rundvlees, vakkundig bereid om de natuurlijke smaken te versterken",
    "menu.meat.mixVlees.name": "Mix Vlees",
    "menu.meat.mixVlees.description":
      "Een zorgvuldig samengestelde selectie van drie kenmerkende vleesbereidingen, die een reis door de Eritrese culinaire tradities biedt",

    // Menu items (fish dishes)
    "menu.fish.assaAvis.name": "Assa Avis",
    "menu.fish.assaAvis.description":
      "Delicate visfilets, zachtjes gesauteerd met rijpe tomaten, zoete uien en aromatische tijm",
    "menu.fish.gambaSaus.name": "Gamba Saus",
    "menu.fish.gambaSaus.description":
      "In het wild gevangen garnalen in een fluweelzachte currysaus, in balans gebracht met subtiele kruiden en verse kruiden",

    // Menu items (vegetarian dishes)
    "menu.vegetarian.shiro.name": "Shiro",
    "menu.vegetarian.shiro.description":
      "Fluweelzachte puree van erfgoedpeulvruchten, gestoofde met knoflook, koriander en onze huisgemaakte Mosob Asmara kruiden",
    "menu.vegetarian.duba.name": "Duba",
    "menu.vegetarian.duba.description":
      "Biologische pompoen langzaam gekookt in een rijke saus met traditionele Mosob Asmara kruidenmix",
    "menu.vegetarian.temtemades.name": "Temtemades",
    "menu.vegetarian.temtemades.description":
      "Ambachtelijke linzen in een geurige saus met rijpe tomaten, knoflook en onze kenmerkende kruidenmix",
    "menu.vegetarian.alicha.name": "Alicha",
    "menu.vegetarian.alicha.description":
      "Tuinverse groenten delicaat gekruid en gesauteerd met sperziebonen, erfgoedwortelen en erfgoedaardappelen",
    "menu.vegetarian.spinazie.name": "Spinazie",
    "menu.vegetarian.spinazie.description":
      "Malse spinaziebladeren gesauteerd met koudgeperste olijfolie, rijpe tomaten, knoflook en aromatische peper",
    "menu.vegetarian.selsi.name": "Selsi of Okra Selsi",
    "menu.vegetarian.selsi.description":
      "Erfgoed-okra zachtjes gestoofd in een levendige rode saus met onze eigen mix van Mosob Asmara kruiden",
    "menu.vegetarian.maPastaSpinazi.name": "Ma Pasta Spinazie",
    "menu.vegetarian.maPastaSpinazi.description":
      "Verse spinazie gesauteerd in extra vierge olijfolie met rijpe tomaten, knoflook en een vleugje room",
    "menu.vegetarian.maSpecialBami.name": "Ma-Special Bami",
    "menu.vegetarian.maSpecialBami.description":
      "Malse spinaziebladeren gesauteerd met premium olijfolie, zoete tomaten en een delicate knoflookroom",
    "menu.vegetarian.maMixVegetarisch.name": "Ma Mix Vegetarisch",
    "menu.vegetarian.maMixVegetarisch.description":
      "Een zorgvuldig samengestelde selectie van drie vegetarische specialiteiten, die de diversiteit van de Eritrese plantaardige keuken laat zien",

    // Menu items (desserts)
    "menu.desserts.honingIJs.name": "Honing IJs",
    "menu.desserts.honingIJs.description":
      "Ambachtelijke ijsselectie besprenkeld met wilde honing en geroosterde noten",
    "menu.desserts.maIJs.name": "Ma-IJs",
    "menu.desserts.maIJs.description": "Huisgemaakt ijs met verse mango, pistachenoten en onze kenmerkende dressing",
    "menu.desserts.maDream.name": "Ma Dream",
    "menu.desserts.maDream.description": "Geroosterd lijnzaad met Medjool dadels, biologische yoghurt en wilde honing",

    // Booking page
    "booking.hero.subtitle": "Uw Ervaring Wacht",
    "booking.hero.title": "Reserveer een Tafel",
    "booking.form.title": "Reserveringsdetails",
    "booking.form.name": "Volledige Naam",
    "booking.form.email": "E-mail",
    "booking.form.phone": "Telefoon",
    "booking.form.date": "Datum",
    "booking.form.time": "Tijd",
    "booking.form.guests": "Aantal Gasten",
    "booking.form.occasion": "Gelegenheid (Optioneel)",
    "booking.form.specialRequests": "Speciale Verzoeken (Optioneel)",
    "booking.form.submit": "Bevestig Reservering",
    "booking.form.processing": "Verwerken...",
    "booking.form.selectDate": "Selecteer een datum",
    "booking.form.selectTime": "Selecteer een tijd",
    "booking.form.selectGuests": "Selecteer aantal gasten",
    "booking.form.selectOccasion": "Selecteer een gelegenheid",
    "booking.form.person": "persoon",
    "booking.form.people": "personen",
    "booking.form.moreThan": "Meer dan",
    "booking.form.occasion.birthday": "Verjaardag",
    "booking.form.occasion.anniversary": "Jubileum",
    "booking.form.occasion.business": "Zakelijke Maaltijd",
    "booking.form.occasion.date": "Romantisch Diner",
    "booking.form.occasion.other": "Anders",
    "booking.form.success.title": "Reservering Bevestigd",
    "booking.form.success.description": "Uw tafel is gereserveerd. We kijken ernaar uit u te verwelkomen!",
    "booking.form.error.title": "Reservering Mislukt",
    "booking.form.error.description": "Er is een fout opgetreden bij het verwerken van uw reservering. Probeer het opnieuw of neem direct contact met ons op.",
    "booking.hours.title": "Openingstijden",
    "booking.hours.mondayTuesday": "Maandag - Dinsdag",
    "booking.hours.wednesday": "Woensdag",
    "booking.hours.thursday": "Donderdag",
    "booking.hours.fridaySaturday": "Vrijdag - Zaterdag",
    "booking.hours.sunday": "Zondag",
    "booking.hours.mondayTuesdayTime": "16:00 - 00:00",
    "booking.hours.wednesdayTime": "Gesloten",
    "booking.hours.thursdayTime": "16:00 - 00:00",
    "booking.hours.fridaySaturdayTime": "16:00 - 03:00",
    "booking.hours.sundayTime": "16:00 - 00:00",
    "booking.contact.title": "Contactinformatie",
    "booking.contact.address": "Adres:",
    "booking.contact.phone": "Telefoon:",
    "booking.contact.email": "E-mail:",

    // About page
    "about.welcome.title": "Welkom bij Mosob Asmara",
    "about.welcome.description":
      "Welkom bij Mosob Asmara, waar de rijke smaken van Eritrea tot leven komen! Wij zijn gepassioneerd over het delen van onze cultuur en culinaire tradities met onze gasten. Hier kunt u genieten van authentieke gerechten, bereid met verse ingrediënten en liefde volgens eeuwenoude recepten die van generatie op generatie zijn doorgegeven. Onze keuken staat bekend om haar unieke mix van specerijen, geurende stoofschotels, en het hart van onze cultuur: injera – een luchtige, lichtzure pannenkoek die perfect samengaat met onze gerechten.",
    "about.services.title": "Onze Diensten",
    "about.services.sides":
      "Een knapperig frituur- of airfryer hapje als aperitief? Dan is sambusa het perfecte gerecht als bijgerecht!",
    "about.services.food":
      "Onze koks bereiden zowel vegetarische als vleesgerechten uit de authentieke Eritrese keuken, speciaal voor onze gasten. Deze gerechten worden geserveerd met injera, traditionele pannenkoeken gemaakt van teff-meel.",
    "about.services.drinks":
      "Bij ons kunt u niet alleen genieten van heerlijke gerechten, maar ook van een selectie dranken die perfect aansluiten bij de Eritrese keuken. Probeer ons traditionele Asmara-bier, een authentiek Eritrees bier met een rijke, volle smaak. Daarnaast bieden we diverse frisdranken, koffie en thee om uw maaltijd compleet te maken.",
    "about.faq.title": "Veel gestelde vragen",
    "about.faq.hours": "Hoe laat is het restaurant open?",
    "about.faq.hoursDetails":
      "Maandag: 16:00-00:00\nDinsdag: 16:00-00:00\nWoensdag: GESLOTEN\nDonderdag: 16:00-00:00\nVrijdag: 16:00-03:00\nZaterdag: 16:00-03:00\nZondag: 16:00-00:00",
    "about.faq.kids": "Is er een kindermenu beschikbaar?",
    "about.faq.kidsAnswer": "Ja, er is een kindermenu beschikbaar.",
    "about.faq.reservation": "Is het mogelijk om online te reserveren?",
    "about.faq.reservationAnswer": "Ja, je kunt online reserveren op onze website.",
    "about.faq.halal": "Is het eten Halal?",
    "about.faq.halalAnswer": "100%!",
    "about.visit.title": "Bezoek Ons",
    "about.visit.address": "Adres",
    "about.visit.phone": "Telefoon",
    "about.visit.email": "E-mail",
    "about.visit.kvk": "KVK Nummer",
    "about.team.title": "Maak kennis met ons team",
    "about.team.chef.name": "Azeb",
    "about.team.chef.role": "Hoofdchef",
    "about.team.chef.description": "Met jarenlange ervaring in de Eritrese keuken brengt Azeb authentieke smaken en traditionele kooktechnieken naar elk gerecht.",
    "about.team.barman.name": "Tesfit",
    "about.team.barman.role": "Bar Manager",
    "about.team.barman.description": "Tesfit creëert de perfecte sfeer met zijn vakkundig bereide cocktails en uitgebreide kennis van dranken.",

    // Footer
    "footer.description":
      "Ervaar de fijnste Habesha keuken in een elegante omgeving. Ons attente personeel staat klaar om u te begeleiden door een onvergetelijke culinaire reis.",
    "footer.contact": "Contact",
    "footer.hours": "Openingstijden",
    "footer.newsletter": "Nieuwsbrief",
    "footer.newsletterDescription":
      "Abonneer u om updates te ontvangen over speciale evenementen en seizoensgebonden menu's.",
    "footer.subscribe": "Abonneren",
    "footer.emailPlaceholder": "Uw e-mail",
    "footer.rights": "Alle rechten voorbehouden.",
    "footer.privacy": "Privacybeleid",
    "footer.terms": "Servicevoorwaarden",

    // Error messages
    "error.translation": "Vertaling niet beschikbaar",
    "error.loading": "Laden...",
    "error.form.required": "Dit veld is verplicht",
    "error.form.email": "Voer een geldig e-mailadres in",
    "error.form.phone": "Voer een geldig telefoonnummer in",
    "error.form.date": "Selecteer een datum",
    "error.form.time": "Selecteer een tijd",
    "error.form.guests": "Selecteer aantal gasten",
    "error.language.switch": "Kon niet van taal wisselen. Probeer het opnieuw.",
  },
}

export function validateTranslations() {
  const allKeys = Object.keys(translations.en) as TranslationKey[];
  const missingInNl: TranslationKey[] = [];
  
  // Check for missing translations in Dutch
  allKeys.forEach(key => {
    if (!translations.nl[key]) {
      missingInNl.push(key);
    }
  });
  
  // Check for extra keys in Dutch that don't exist in English
  const extraInNl = Object.keys(translations.nl).filter(
    key => !translations.en[key as TranslationKey]
  );
  
  return {
    missingInNl,
    extraInNl,
    isValid: missingInNl.length === 0 && extraInNl.length === 0
  };
}

export function useTranslation(language: Language) {
  return {
    t: (key: TranslationKey) => {
      try {
        const translation = translations[language][key];
        if (!translation) {
          console.warn(`Missing translation for key: ${key} in language: ${language}`);
          // Fall back to English if translation is missing
          return translations.en[key] || key;
        }
        return translation;
      } catch (error) {
        console.error(`Translation error for key: ${key}`, error);
        return translations.en[key] || key;
      }
    },
    language,
  }
}

