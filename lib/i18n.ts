// i18n utility functions for locale management

export type Locale = 'en' | 'es';

const LOCALE_STORAGE_KEY = 'trainer-locale';

/**
 * Detects the browser's preferred language
 * @returns 'en' or 'es' based on browser language
 */
export function detectBrowserLanguage(): Locale {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.toLowerCase();
  
  // Check if browser language is Spanish
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  
  // Default to English
  return 'en';
}

/**
 * Gets the stored locale from localStorage
 * @returns stored locale or null if not found
 */
export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'en' || stored === 'es') {
    return stored;
  }
  
  return null;
}

/**
 * Stores the locale in localStorage
 * @param locale - The locale to store
 */
export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

/**
 * Gets the current locale - checks localStorage first, then browser language
 * @returns The current locale
 */
export function getCurrentLocale(): Locale {
  const stored = getStoredLocale();
  if (stored) return stored;
  
  return detectBrowserLanguage();
}

/**
 * Helper to access nested translation keys
 * @param obj - Translation object
 * @param path - Dot-separated path (e.g., 'login.email')
 * @returns The translation value or the key if not found
 */
export function getNestedTranslation(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Return key if translation not found
    }
  }
  
  return typeof current === 'string' ? current : path;
}
