'use client'

import { useState, useEffect } from 'react';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useI18n } from '../app/context/I18nProvider';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 md:px-10 w-full"
      style={{
        background: '#09090f',
        borderBottom: '1px solid rgba(0, 255, 135, 0.12)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <Image
          src="/trainix.png"
          alt="Trainix"
          width={120}
          height={40}
          className="object-contain"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.3))' }}
          priority
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <LanguageSwitcher />

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform ${
              isLoggingOut
                ? 'cursor-not-allowed opacity-50'
                : 'hover:scale-[1.02] active:scale-[0.98]'
            }`}
            style={
              isLoggingOut
                ? { background: 'rgba(255,255,255,0.08)', color: '#8888a0', border: '1px solid rgba(255,255,255,0.07)' }
                : {
                    background: 'rgba(255, 60, 60, 0.12)',
                    color: '#ff6b6b',
                    border: '1px solid rgba(255, 60, 60, 0.25)',
                  }
            }
          >
            {isLoggingOut ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="hidden sm:inline">{t('header.loggingOut')}</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">{t('header.logout')}</span>
              </>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
