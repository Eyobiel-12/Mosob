import { useEffect } from 'react';
import { useTranslation } from './translations';
import { useLanguage } from './context';
import { validateComponentTranslations } from '../utils';
import type { TranslationKey } from './translations';

/**
 * A hook that validates all required translations are available for a component
 * and logs warnings if any are missing.
 * 
 * @param componentName The name of the component (for logging)
 * @param requiredKeys Array of translation keys required by the component
 * @returns The translation function and current language
 */
export function useValidatedTranslations(
  componentName: string,
  requiredKeys: TranslationKey[]
) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  useEffect(() => {
    // Validate translations on mount and language change
    const validation = validateComponentTranslations(requiredKeys, language);
    
    if (!validation.isValid) {
      console.warn(
        `[${componentName}] Missing translations for language "${language}":`,
        validation.missing
      );
    }
  }, [componentName, language, requiredKeys]);
  
  return { t, language };
} 