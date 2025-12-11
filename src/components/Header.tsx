'use client'

import { useState, useEffect } from 'react';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
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
    <header style={{ padding: '20px 40px' }} className="flex justify-between items-center">
      <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>{t('header.title')}</h1>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        
        {isAuthenticated && (
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform ${
            isLoggingOut
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoggingOut ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('header.loggingOut')}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {t('header.logout')}
            </>
          )}
        </button>
        )}
      </div>
    </header>
  );
}
