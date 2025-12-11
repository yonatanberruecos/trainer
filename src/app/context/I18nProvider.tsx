'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, getCurrentLocale, setStoredLocale, getNestedTranslation } from '../../../lib/i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  translations: any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations when locale changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const dictionary = await import(`../../../locales/${locale}/common.json`);
        setTranslations(dictionary.default || dictionary);
      } catch (error) {
        console.error(`Failed to load translations for locale: ${locale}`, error);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  // Initialize locale from localStorage or browser on mount
  useEffect(() => {
    const initialLocale = getCurrentLocale();
    setLocaleState(initialLocale);
  }, []);

  // Function to change locale
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
    // Update document lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations) return key;
    return getNestedTranslation(translations, key);
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translations }}>
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook to use i18n context
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
