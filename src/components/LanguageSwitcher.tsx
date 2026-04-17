'use client';

import { useI18n } from '../app/context/I18nProvider';
import { Locale } from '../../lib/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {(['en', 'es'] as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          aria-label={lang === 'en' ? 'Switch to English' : 'Cambiar a Español'}
          className="px-2.5 py-1 rounded-lg text-sm font-semibold transition-all duration-200"
          style={
            locale === lang
              ? {
                  background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                  color: '#09090f',
                  boxShadow: '0 0 12px rgba(0, 255, 135, 0.35)',
                }
              : {
                  color: '#8888a0',
                }
          }
        >
          {lang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
        </button>
      ))}
    </div>
  );
}
