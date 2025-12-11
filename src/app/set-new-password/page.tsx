'use client';

import { useState } from 'react';
import { confirmResetPassword } from 'aws-amplify/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '../context/I18nProvider';

export default function SetNewPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const emailFromParams = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    email: emailFromParams,
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (error) setError('');

    // Validate passwords when either password field changes
    if (name === 'newPassword' || name === 'confirmPassword') {
      validatePasswords(
        name === 'newPassword' ? value : formData.newPassword,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
    }
  };

  const validatePasswords = (newPassword: string, confirmPassword: string) => {
    const errors: string[] = [];

    // Check password requirements
    if (newPassword && newPassword.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    // if (newPassword && !/[A-Z]/.test(newPassword)) {
    //   errors.push('Password must contain at least one uppercase letter');
    // }
    // if (newPassword && !/[a-z]/.test(newPassword)) {
    //   errors.push('Password must contain at least one lowercase letter');
    // }
    // if (newPassword && !/[0-9]/.test(newPassword)) {
    //   errors.push('Password must contain at least one number');
    // }
    // if (newPassword && !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
    //   errors.push('Password must contain at least one special character');
    // }

    // Check if passwords match
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    setPasswordErrors(errors);
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await confirmResetPassword({
        username: formData.email,
        confirmationCode: formData.code,
        newPassword: formData.newPassword
      });

      // Success - redirect to login with success message
      router.push(`/login?message=${encodeURIComponent(t('setNewPassword.passwordResetSuccess'))}`);
    } catch (error: any) {
      console.error('Password reset confirmation error:', error);

      // Handle specific error types
      if (error.name === 'CodeMismatchException') {
        setError('Invalid verification code. Please check your email and try again.');
      } else if (error.name === 'ExpiredCodeException') {
        setError('Verification code has expired. Please request a new password reset.');
      } else if (error.name === 'InvalidPasswordException') {
        setError('Password does not meet requirements. Please check the password criteria.');
      } else {
        setError(error.message || 'Failed to reset password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.email.trim() &&
      formData.code.trim() &&
      formData.newPassword.trim() &&
      formData.confirmPassword.trim() &&
      passwordErrors.length === 0 &&
      formData.newPassword === formData.confirmPassword
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('setNewPassword.title')}</h1>
          <p className="text-gray-600">{t('setNewPassword.subtitle')}</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('forgotPassword.emailLabel')}</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder={t('forgotPassword.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                    focusedField === 'email'
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/25'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Verification Code Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('setNewPassword.verificationCode')}</label>
              <div className="relative">
                <input
                  name="code"
                  type="text"
                  placeholder={t('setNewPassword.verificationCodePlaceholder')}
                  value={formData.code}
                  onChange={handleChange}
                  onFocus={() => handleFocus('code')}
                  onBlur={handleBlur}
                  maxLength={6}
                  className={`w-full px-4 py-3 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                    focusedField === 'code'
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/25'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Check your email for the 6-digit verification code.
              </p>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('setNewPassword.newPassword')}</label>
              <div className="relative">
                <input
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder={t('setNewPassword.newPasswordPlaceholder')}
                  value={formData.newPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('newPassword')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 pl-12 pr-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                    focusedField === 'newPassword'
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/25'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
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

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('setNewPassword.confirmPassword')}</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t('setNewPassword.confirmPasswordPlaceholder')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 pl-12 pr-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                    focusedField === 'confirmPassword'
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/25'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
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

            {/* Password Requirements */}
            {passwordErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Password Requirements</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {passwordErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Password Requirements Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Password Requirements</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>At least 6 characters long</li>
                      {/* <li>One uppercase letter (A-Z)</li>
                      <li>One lowercase letter (a-z)</li>
                      <li>One number (0-9)</li>
                      <li>One special character (!@#$%^&*)</li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                isLoading || !isFormValid()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('setNewPassword.resettingPassword')}
                </div>
              ) : (
                t('setNewPassword.resetPassword')
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Didn't receive the code?{' '}
              <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200">
                Request new code
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {t('forgotPassword.rememberPassword')}{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200">{t('setNewPassword.backToLogin')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
