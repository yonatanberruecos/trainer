'use client';

import { useI18n } from '../app/context/I18nProvider';
import { Locale } from '../../lib/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
          locale === 'en'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Switch to English"
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
          locale === 'es'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Cambiar a Español"
      >
        🇪🇸 ES
      </button>
    </div>
  );
}
