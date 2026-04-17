'use client';

import { useContext, useState, useEffect } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MainContext } from '../context/MainContextAppProvider';
import { useI18n } from '../context/I18nProvider';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const { setWorkoutData } = useContext<any>(MainContext);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setSuccessMessage(message);
      const url = new URL(window.location.href);
      url.searchParams.delete('message');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const { username, password } = formData;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signIn({ username, password });
      setWorkoutData((prev: any) => ({ ...prev, user: { name: '', email: username } }));
      location.href = '/mylist';
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || t('login.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => username.trim() && password.trim();

  const inputClass = (field: string) =>
    `w-full px-4 py-3 pl-12 rounded-xl font-medium transition-all duration-300 focus:outline-none ${
      focusedField === field
        ? 'border-2 border-[#00ff87] shadow-[0_0_0_3px_rgba(0,255,135,0.15)]'
        : 'border-2 border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.15)]'
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,135,0.07) 0%, #09090f 60%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/trainix.png"
              alt="Trainix"
              width={200}
              height={67}
              className="object-contain"
              style={{ filter: 'drop-shadow(0 0 16px rgba(0, 255, 135, 0.4))' }}
              priority
            />
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#f0f0f5' }}>{t('login.title')}</h1>
          <p style={{ color: '#8888a0' }}>{t('login.subtitle')}</p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-5 sm:p-8"
          style={{
            background: '#111118',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Success */}
            {successMessage && (
              <div className="rounded-xl p-4 flex gap-3" style={{ background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)' }}>
                <svg className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#00ff87' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm" style={{ color: '#00ff87' }}>{successMessage}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-xl p-4 flex gap-3" style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.25)' }}>
                <svg className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#ff6b6b' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm" style={{ color: '#ff6b6b' }}>{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#8888a0' }}>{t('login.email')}</label>
              <div className="relative">
                <input
                  name="username"
                  type="text"
                  placeholder={t('login.emailPlaceholder')}
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => handleFocus('username')}
                  onBlur={handleBlur}
                  className={inputClass('username')}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5" style={{ color: '#8888a0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#8888a0' }}>{t('login.password')}</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('login.passwordPlaceholder')}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className={`${inputClass('password')} pr-12`}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5" style={{ color: '#8888a0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: '#8888a0' }}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm font-medium transition-colors duration-200 hover:opacity-80" style={{ color: '#00ff87' }}>
                {t('login.forgotPassword')}
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              style={
                isLoading || !isFormValid()
                  ? { background: '#1a1a26', color: '#8888a0', cursor: 'not-allowed' }
                  : {
                      background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                      color: '#09090f',
                      boxShadow: '0 0 24px rgba(0, 255, 135, 0.35)',
                    }
              }
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('login.signingIn')}
                </div>
              ) : (
                t('login.signIn')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-xs" style={{ color: '#8888a0' }}>{t('login.orContinueWith')}</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: t('login.google'),
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                ),
              },
              {
                label: t('login.facebook'),
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80"
                style={{ background: '#1a1a26', color: '#8888a0', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p style={{ color: '#8888a0' }}>
              {t('login.noAccount')}{' '}
              <Link href="/signup" className="font-semibold transition-colors duration-200 hover:opacity-80" style={{ color: '#00ff87' }}>
                {t('login.signUp')}
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-5 text-center">
          <p className="text-xs" style={{ color: '#8888a0' }}>
            {t('login.termsNotice')}{' '}
            <Link href="/privacy?tab=terms" className="hover:opacity-80 transition-opacity" style={{ color: '#00d4ff' }}>{t('login.termsOfService')}</Link>
            {' '}{t('login.and')}{' '}
            <Link href="/privacy" className="hover:opacity-80 transition-opacity" style={{ color: '#00d4ff' }}>{t('login.privacyPolicy')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
