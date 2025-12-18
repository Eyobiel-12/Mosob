# Mosob Asmara Restaurant Website

## Admin Panel

The website includes an admin panel for managing reservations and blocking dates.

### Access
- URL: `/admin`
- Default Password: `mosob2025`

### Environment Variable

To set a custom admin password, create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

If the environment variable is not set, it defaults to `mosob2025`.

**Note:** The `.env.local` file is already in `.gitignore` and will not be committed to the repository.

### Features
- View all reservations
- Edit reservation details (name, email, phone, date, time, guests, status, etc.)
- Delete reservations
- Block/unblock specific dates to prevent reservations
- Change reservation status (pending, confirmed, cancelled)

### Data Storage

**Local Development:**
- Reservations are stored in `/data/reservations.json`
- Blocked dates are stored in `/data/blocked-dates.json`
- Both files are automatically created when needed

**Production (Vercel):**
- Blocked dates use **Vercel KV** (Redis) for persistent storage
- The system automatically detects if Vercel KV environment variables are set
- Falls back to file system if KV is not configured (but file system writes don't work on serverless platforms)

**Setting up Vercel KV for Production:**
1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → KV
3. Create a new KV database
4. Vercel will automatically add the required environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
5. Redeploy your application

The blocked dates feature will automatically use KV in production when these environment variables are available.

---

# Translation Validation System

## Overview

This project includes a robust translation validation system to ensure all texts are properly translated in all supported languages. The system helps detect missing translations early, making it easier to maintain a multilingual application.

## Components

1. **useValidatedTranslations Hook** - A custom React hook (`lib/i18n/use-validated-translations.ts`) that:
   - Validates all required translations for a component at runtime
   - Logs warnings in the console when translations are missing
   - Makes it easy to define which translations a component needs

2. **Translation Validation Utility** - A helper function (`lib/utils.ts`) that checks if all required translations for a component are present.

3. **Validation Script** - A command-line script (`scripts/validate-translations.js`) that:
   - Validates all translations across all components
   - Generates a comprehensive report of missing translations
   - Identifies hardcoded strings that should be translated
   - Can be run as part of CI/CD pipelines

## How to Use

### In Components

Replace the standard `useTranslation` hook with the validated version:

```tsx
// Before
const { language } = useLanguage();
const { t } = useTranslation(language);

// After - with validation
const { t, language } = useValidatedTranslations("ComponentName", [
  "key.to.validate1",
  "key.to.validate2",
  // Add all translation keys used in the component
]);
```

### Adding New Translations

1. Add new keys to the `TranslationKey` type in `lib/i18n/translations.ts`:
   ```typescript
   export type TranslationKey =
     // ...existing keys
     | "your.new.key1"
     | "your.new.key2"
   ```

2. Add translations for all supported languages:
   ```typescript
   export const translations: Record<Language, Record<TranslationKey, string>> = {
     en: {
       // ...existing translations
       "your.new.key1": "English translation",
       "your.new.key2": "Another English translation",
     },
     nl: {
       // ...existing translations
       "your.new.key1": "Dutch translation",
       "your.new.key2": "Another Dutch translation",
     },
   }
   ```

3. Use the translations in your components with the `useValidatedTranslations` hook.

### Handling Screen Reader Accessibility

For accessibility, especially for screen readers, always:

1. Add proper aria labels and screen reader text:
   ```tsx
   <button>
     <Icon />
     <span className="sr-only">{t("button.screenReaderText")}</span>
   </button>
   ```

2. Include proper titles for dialog components:
   ```tsx
   <DialogContent>
     <DialogTitle className="sr-only">{t("dialog.title")}</DialogTitle>
     {/* Dialog content */}
   </DialogContent>
   ```

### Running Validation

To validate all translations across the application:

```bash
pnpm validate-translations
```

This will generate a detailed report showing any missing translations per component and language, as well as hardcoded strings that might need translation.

## Benefits

- Early detection of missing translations
- Clear indication of which translations are needed for each component
- Runtime validation to catch issues during development
- Comprehensive validation script for CI/CD integration
- Improved accessibility for screen reader users

## Best Practices

1. Always list all translation keys used in a component
2. Run the validation script before pushing code
3. Watch the console for translation warnings during development
4. Keep the component translation lists updated when adding new text
5. Always provide translations for screen reader text
6. Include proper aria labels and dialog titles for accessibility
7. Use the `mounted` state pattern to avoid hydration mismatches:
   ```tsx
   {mounted ? t("key.to.translate") : "Default text for SSR"}
   ``` 