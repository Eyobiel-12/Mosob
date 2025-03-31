import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Language, TranslationKey, translations } from "@/lib/i18n/translations"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper function to check if all required translations are available
 * @param keys The translation keys required by a component
 * @param language The current language
 * @returns An object with validation results
 */
export function validateComponentTranslations(keys: TranslationKey[], language: Language) {
  const missing: TranslationKey[] = []
  
  keys.forEach(key => {
    if (!translations[language][key]) {
      missing.push(key)
    }
  })
  
  return {
    isValid: missing.length === 0,
    missing,
    language
  }
}
