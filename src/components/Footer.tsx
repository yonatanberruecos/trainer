'use client';

import Link from 'next/link';
import { useI18n } from '../app/context/I18nProvider';

export default function Footer() {
  const { t } = useI18n();

  const linkClass =
    'flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all duration-200 p-2 sm:p-3 group';

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 h-20 md:h-[120px] flex items-center justify-center z-50"
      style={{
        background: '#09090f',
        borderTop: '1px solid rgba(0, 255, 135, 0.12)',
      }}
    >
      <nav className="flex justify-around items-center w-full max-w-4xl px-2 sm:px-4">
        <Link href="/privacy" className={linkClass}>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs font-medium text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200">
            {t('footer.privacy')}
          </span>
        </Link>

        <a href="#" className={linkClass}>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          <span className="text-xs font-medium text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200">
            {t('footer.data')}
          </span>
        </a>

        <Link href="/privacy?tab=terms" className={linkClass}>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-medium text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200">
            {t('footer.terms')}
          </span>
        </Link>

        <a href="#" className={linkClass}>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium text-[#8888a0] group-hover:text-[#00ff87] transition-colors duration-200">
            {t('footer.about')}
          </span>
        </a>
      </nav>
    </footer>
  );
}
