'use client'
import { useContext, useState } from 'react';
import { signIn, signUp } from 'aws-amplify/auth';
import { MainContext } from '../context/MainContextAppProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '../context/I18nProvider';

interface FormData {
  name: string;
  email: string;
  confirmEmail: string;
  phone: string;
  password: string;
  repeatPassword: string;
}

export default function Signup() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    password: '',
    repeatPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const { workoutData, setWorkoutData } = useContext<any>(MainContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const routineState = searchParams.get('routine_state');

  const validate = (data: FormData) => {
    const errors: { [key: string]: string } = {};

    if (data.email && data.confirmEmail && data.email !== data.confirmEmail) {
      errors.confirmEmail = t('signup.emailsDoNotMatch');
    }
    if (data.password && !/[A-Z]/.test(data.password)) {
      errors.password = t('signup.passwordMustContainCapital');
    }
    if (data.password && data.repeatPassword && data.password !== data.repeatPassword) {
      errors.repeatPassword = t('signup.passwordsDoNotMatch');
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setFormErrors(validate(updated));
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const isFormValid = () => {
    const { name, email, confirmEmail, phone, password, repeatPassword } = formData;
    return (
      name.trim() &&
      email.trim() &&
      confirmEmail.trim() &&
      phone.trim() &&
      password.trim() &&
      repeatPassword.trim() &&
      email === confirmEmail &&
      /[A-Z]/.test(password) &&
      password === repeatPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    let res = null;
    try {
      res = await signUp({
        password: formData.password,
        username: formData.email,
        options: {
          userAttributes: {
            name: formData.name,
            email: formData.email,
            phone_number: '+57' + formData.phone,
          },
        },
      });

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
    } catch (error: any) {
      console.error('Sign-up error:', error);
      setIsLoading(false);
      if (error?.__type === 'UsernameExistsException') {
        alert('User already exists. Redirecting to login page.');
        router.push('/login');
      } else {
        alert('There was an error during sign up. Please try again.');
      }
      return;
    }

    if (res?.userId) {
      try {
        const { name, email, password } = formData;

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        setWorkoutData((prev: any) => ({ ...prev, user: { name, email } }));

        if (routineState === 'save') {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts/routine`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...workoutData, user: { name, email } }),
          });
          const saved = await response.json();
          if (saved.success) {
            const { isSignedIn } = await signIn({ username: email, password });
            location.href = isSignedIn ? '/mylist' : '/login';
          } else {
            router.push('/login');
          }
        } else {
          router.push('/fit');
        }
      } catch (error) {
        console.error('Error saving the user:', error);
        router.push('/login');
      }
    }
    setIsLoading(false);
  };

  /* ── style helpers ── */
  const inputClass = (field: string, hasError?: boolean) =>
    `w-full px-4 py-3 pl-12 rounded-xl font-medium transition-all duration-300 focus:outline-none border-2 ${
      hasError
        ? 'border-[#ff6b6b] shadow-[0_0_0_3px_rgba(255,107,107,0.12)]'
        : focusedField === field
        ? 'border-[#00ff87] shadow-[0_0_0_3px_rgba(0,255,135,0.15)]'
        : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.15)]'
    }`;

  const emailsMatch =
    formData.email && formData.confirmEmail && formData.email === formData.confirmEmail;
  const emailMismatch =
    formData.email && formData.confirmEmail && formData.email !== formData.confirmEmail;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,135,0.07) 0%, #09090f 60%)' }}
    >
      <div className="w-full max-w-md">

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-5">
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
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#f0f0f5' }}>
            {t('signup.title')}
          </h1>
          <p style={{ color: '#8888a0' }}>
            {routineState === 'save' ? t('signup.saveRoutine') : t('signup.subtitle')}
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-5 sm:p-8"
          style={{
            background: '#111118',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <Field label={t('signup.fullName')}>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  placeholder={t('signup.fullNamePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={inputClass('name')}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                <FieldIcon>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </FieldIcon>
              </div>
            </Field>

            {/* Email */}
            <Field label={t('signup.email')}>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder={t('signup.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={inputClass('email')}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                <FieldIcon>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </FieldIcon>
              </div>
            </Field>

            {/* Confirm Email */}
            <Field label={t('signup.confirmEmail')}>
              <div className="relative">
                <input
                  name="confirmEmail"
                  type="email"
                  placeholder={t('signup.confirmEmailPlaceholder')}
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  onFocus={() => handleFocus('confirmEmail')}
                  onBlur={handleBlur}
                  className={inputClass('confirmEmail', !!emailMismatch)}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                {/* Left icon */}
                <FieldIcon color={emailMismatch ? '#ff6b6b' : emailsMatch ? '#00ff87' : undefined}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </FieldIcon>
                {/* Right match indicator */}
                {formData.confirmEmail && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {emailsMatch ? (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)' }}
                      >
                        <svg className="w-3 h-3" style={{ color: '#09090f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <svg className="w-5 h-5" style={{ color: '#ff6b6b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {formErrors.confirmEmail && <FieldError>{formErrors.confirmEmail}</FieldError>}
            </Field>

            {/* Phone */}
            <Field label={t('signup.phone')}>
              <div className="relative">
                <input
                  name="phone"
                  type="tel"
                  placeholder={t('signup.phonePlaceholder')}
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus('phone')}
                  onBlur={handleBlur}
                  className={inputClass('phone')}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                <FieldIcon>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </FieldIcon>
              </div>
            </Field>

            {/* Password */}
            <Field label={t('signup.password')}>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('signup.passwordPlaceholder')}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className={`${inputClass('password', !!formErrors.password)} pr-12`}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                <FieldIcon>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </FieldIcon>
                <TogglePasswordButton show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
              </div>
              {formErrors.password && <FieldError>{formErrors.password}</FieldError>}
            </Field>

            {/* Repeat Password */}
            <Field label={t('signup.repeatPassword')}>
              <div className="relative">
                <input
                  name="repeatPassword"
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder={t('signup.repeatPasswordPlaceholder')}
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('repeatPassword')}
                  onBlur={handleBlur}
                  className={`${inputClass('repeatPassword', !!formErrors.repeatPassword)} pr-12`}
                  style={{ background: '#1a1a26', color: '#f0f0f5' }}
                  required
                />
                <FieldIcon>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </FieldIcon>
                <TogglePasswordButton show={showRepeatPassword} onToggle={() => setShowRepeatPassword(!showRepeatPassword)} />
              </div>
              {formErrors.repeatPassword && <FieldError>{formErrors.repeatPassword}</FieldError>}
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-2"
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
                  {t('signup.creatingAccount')}
                </div>
              ) : (
                t('signup.createAccount')
              )}
            </button>
          </form>

          {/* Sign-in link */}
          {routineState !== 'save' && (
            <div className="mt-6 text-center">
              <p style={{ color: '#8888a0' }}>
                {t('signup.alreadyHaveAccount')}{' '}
                <Link href="/login" className="font-semibold transition-colors hover:opacity-80" style={{ color: '#00ff87' }}>
                  {t('signup.signIn')}
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Terms notice */}
        <div className="mt-5 text-center">
          <p className="text-xs" style={{ color: '#8888a0' }}>
            {t('signup.termsNotice')}{' '}
            <Link href="/privacy?tab=terms" className="hover:opacity-80 transition-opacity" style={{ color: '#00d4ff' }}>
              {t('signup.termsOfService')}
            </Link>
            {' '}{t('signup.and')}{' '}
            <Link href="/privacy" className="hover:opacity-80 transition-opacity" style={{ color: '#00d4ff' }}>
              {t('signup.privacyPolicy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#8888a0' }}>{label}</label>
      {children}
    </div>
  );
}

function FieldIcon({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg className="w-5 h-5" style={{ color: color ?? '#8888a0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: '#ff6b6b' }}>
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      {children}
    </p>
  );
}

function TogglePasswordButton({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
      style={{ color: '#8888a0' }}
    >
      {show ? (
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
  );
}
