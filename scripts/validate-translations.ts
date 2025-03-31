import fs from 'fs';
import path from 'path';
import { translations, Language } from '../lib/i18n/translations';

// Key translation entries by component for validation
const componentTranslations = {
  'HomePage': [
    "home.hero.subtitle",
    "home.hero.title",
    "home.hero.description",
    "home.hero.exploreMenu",
    "home.hero.reserveTable",
    "home.hero.discoverMore",
    "home.about.subtitle",
    "home.about.title",
    "home.about.description1",
    "home.about.description2",
    "home.about.philosophy",
    "home.menu.subtitle",
    "home.menu.title",
    "home.experience.subtitle",
    "home.experience.title",
    "home.experience.description",
    "home.experience.reserve",
    "home.testimonials.subtitle",
    "home.testimonials.title",
    "home.testimonials.quote1",
    "home.testimonials.author1",
    "home.testimonials.title1",
    "home.testimonials.quote2",
    "home.testimonials.author2",
    "home.testimonials.title2",
    "home.testimonials.quote3",
    "home.testimonials.author3",
    "home.testimonials.title3",
  ],
  'Navbar': [
    "nav.home",
    "nav.menu",
    "nav.about",
    "nav.gallery",
    "nav.contact",
    "nav.reserveTable"
  ],
  'Footer': [
    "footer.description",
    "footer.contact",
    "footer.hours",
    "footer.newsletter",
    "footer.newsletterDescription",
    "footer.emailPlaceholder",
    "footer.subscribe",
    "footer.rights",
    "footer.privacy",
    "footer.terms",
    "nav.menu",
    "menu.categories.appetizers",
    "menu.categories.meat",
    "menu.categories.vegetarian",
    "menu.categories.fish",
    "menu.categories.desserts"
  ],
  'AboutPage': [
    "about.welcome.title",
    "about.welcome.description",
    "about.services.title",
    "about.services.sides",
    "about.services.food",
    "about.services.drinks",
    "about.faq.title",
    "about.faq.hours",
    "about.faq.hoursDetails",
    "about.faq.kids",
    "about.faq.kidsAnswer",
    "about.faq.reservation",
    "about.faq.reservationAnswer",
    "about.faq.halal",
    "about.faq.halalAnswer"
  ],
  'MenuPage': [
    "menu.categories.appetizers",
    "menu.categories.meat",
    "menu.categories.vegetarian",
    "menu.categories.fish",
    "menu.categories.desserts",
    "menu.categories.drinks"
  ]
};

const supportedLanguages = Object.keys(translations) as Language[];

// Function to validate if a translation key exists in all languages
function validateTranslationKey(key: string): { valid: boolean; missingIn: Language[] } {
  const missingIn: Language[] = [];
  
  for (const lang of supportedLanguages) {
    // Using a recursive function to navigate deeply nested objects
    const getValue = (obj: any, path: string): any => {
      const parts = path.split('.');
      let current = obj;
      
      for (const part of parts) {
        if (current === undefined || current === null || typeof current !== 'object') {
          return undefined;
        }
        current = current[part];
      }
      
      return current;
    };
    
    const value = getValue(translations[lang], key);
    if (value === undefined) {
      missingIn.push(lang);
    }
  }
  
  return {
    valid: missingIn.length === 0,
    missingIn
  };
}

// Validate all components and generate a report
function validateAllComponents() {
  const report: Record<string, {
    totalKeys: number;
    missingKeys: Record<Language, string[]>;
    validPercentage: Record<Language, number>;
  }> = {};
  
  let allValid = true;
  
  for (const [component, keys] of Object.entries(componentTranslations)) {
    const componentReport = {
      totalKeys: keys.length,
      missingKeys: {} as Record<Language, string[]>,
      validPercentage: {} as Record<Language, number>
    };
    
    // Initialize missing keys arrays for each language
    for (const lang of supportedLanguages) {
      componentReport.missingKeys[lang] = [];
    }
    
    for (const key of keys) {
      const validation = validateTranslationKey(key);
      
      if (!validation.valid) {
        allValid = false;
        for (const lang of validation.missingIn) {
          componentReport.missingKeys[lang].push(key);
        }
      }
    }
    
    // Calculate valid percentage for each language
    for (const lang of supportedLanguages) {
      const missingCount = componentReport.missingKeys[lang].length;
      componentReport.validPercentage[lang] = ((keys.length - missingCount) / keys.length) * 100;
    }
    
    report[component] = componentReport;
  }
  
  return {
    allValid,
    report
  };
}

// Run validation and generate report
function main() {
  console.log('Starting translation validation...');
  const { allValid, report } = validateAllComponents();
  
  console.log('\n=== TRANSLATION VALIDATION REPORT ===\n');
  
  for (const [component, data] of Object.entries(report)) {
    console.log(`\n📄 Component: ${component}`);
    console.log(`   Total keys: ${data.totalKeys}`);
    
    let componentHasIssues = false;
    
    for (const lang of supportedLanguages) {
      const missingCount = data.missingKeys[lang].length;
      if (missingCount > 0) {
        componentHasIssues = true;
        console.log(`   ❌ Language: ${lang.toUpperCase()} - ${data.validPercentage[lang].toFixed(1)}% complete`);
        console.log(`      Missing keys: ${data.missingKeys[lang].join(', ')}`);
      } else {
        console.log(`   ✅ Language: ${lang.toUpperCase()} - 100% complete`);
      }
    }
    
    if (!componentHasIssues) {
      console.log('   ✅ All translations are valid for this component');
    }
  }
  
  console.log('\n=== SUMMARY ===');
  if (allValid) {
    console.log('✅ All translations are valid across all components and languages!');
  } else {
    console.log('❌ Some translations are missing. Please fix the issues listed above.');
  }
}

// Run the script
main(); 