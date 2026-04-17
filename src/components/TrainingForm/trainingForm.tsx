'use client'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '../../app/context/I18nProvider';

interface ItrainingFormProps {
    onSubmitForm: (data: any) => void
}

export default function TrainingForm({ onSubmitForm }: ItrainingFormProps) {
    const { t } = useI18n();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        clearErrors,
        trigger
    }: any = useForm({ reValidateMode: 'onChange' });

    const [showConditionalField, setShowConditionalField] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
    const totalSteps = 3;

    const onSubmit = (data: any) => onSubmitForm(data);

    const watchShowExtraField = watch('haveillnes', '');

    useEffect(() => {
        setShowConditionalField(watchShowExtraField === 'YES');
    }, [watchShowExtraField]);

    const handleFocus = (fieldName: string) => {
        setFocusedField(fieldName);
        clearErrors(fieldName);
    };

    const handleBlur = () => setFocusedField(null);

    const validateCurrentStep = async () => {
        let fields: string[] = [];
        if (currentStep === 1) fields = ['workout', 'preference', 'objective'];
        else if (currentStep === 2) fields = ['days', 'hours', 'gender', 'height', 'weight', 'dob'];
        else if (currentStep === 3) {
            fields = ['pob', 'haveillnes'];
            if (showConditionalField) fields.push('illness');
        }
        return trigger(fields);
    };

    const nextStep = async () => {
        const isValid = await validateCurrentStep();
        if (isValid && currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const getStepProgress = () => (currentStep / totalSteps) * 100;

    const handleRadioChange = (fieldName: string, value: string) => {
        setSelectedValues(prev => ({ ...prev, [fieldName]: value }));
        setValue(fieldName, value);
        clearErrors(fieldName);
    };

    const isSelected = (fieldName: string, value: string) =>
        selectedValues[fieldName] === value || watch(fieldName) === value;

    /* ── shared style helpers ── */
    const inputClass = (field: string) =>
        `w-full px-4 py-4 pl-12 rounded-xl text-base font-medium transition-all duration-300 focus:outline-none border-2 ${
            focusedField === field
                ? 'border-[#00ff87] shadow-[0_0_0_3px_rgba(0,255,135,0.15)]'
                : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.15)]'
        }`;

    const radioCardClass = (fieldName: string, value: string) =>
        `flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
            isSelected(fieldName, value)
                ? 'border-[#00ff87] shadow-[0_0_0_3px_rgba(0,255,135,0.12)]'
                : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,255,135,0.3)]'
        }`;

    const radioCardStyle = (fieldName: string, value: string): React.CSSProperties =>
        isSelected(fieldName, value)
            ? { background: 'rgba(0, 255, 135, 0.08)' }
            : { background: '#1a1a26' };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,135,0.07) 0%, #09090f 60%)' }}
        >
            <div className="w-full max-w-lg">

                {/* Logo */}
                <div className="text-center mb-6">
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
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#f0f0f5' }}>
                        {t('trainingForm.title')}
                    </h1>
                    <p className="text-base" style={{ color: '#8888a0' }}>
                        {t('trainingForm.subtitle')}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-6 mb-1">
                        <div className="flex justify-between text-xs mb-2" style={{ color: '#8888a0' }}>
                            <span>{t('trainingForm.stepOf')} {currentStep} / {totalSteps}</span>
                            <span>{Math.round(getStepProgress())}% {t('trainingForm.complete')}</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                            <div
                                className="h-2 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${getStepProgress()}%`,
                                    background: 'linear-gradient(90deg, #00ff87 0%, #00d4ff 100%)',
                                    boxShadow: '0 0 10px rgba(0, 255, 135, 0.5)',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Form card */}
                <div
                    className="rounded-3xl p-5 sm:p-8"
                    style={{
                        background: '#111118',
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* ── Step 1: Experience & Goals ── */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <StepHeader
                                    title={t('trainingForm.step1Title')}
                                    subtitle={t('trainingForm.step1Subtitle')}
                                />

                                {/* Workout Experience */}
                                <FieldGroup label={t('trainingForm.workoutExperience')} error={errors.workout ? t('trainingForm.workoutRequired') : ''}>
                                    {[
                                        { value: 'JUNIOR', label: t('trainingForm.beginner'), icon: '🌱', desc: t('trainingForm.beginnerDesc') },
                                        { value: 'INTERMEDIATE', label: t('trainingForm.intermediate'), icon: '💪', desc: t('trainingForm.intermediateDesc') },
                                        { value: 'ADVANCED', label: t('trainingForm.advanced'), icon: '🏆', desc: t('trainingForm.advancedDesc') },
                                    ].map((opt) => (
                                        <RadioCard
                                            key={opt.value}
                                            icon={opt.icon}
                                            label={opt.label}
                                            desc={opt.desc}
                                            selected={isSelected('workout', opt.value)}
                                            onClick={() => handleRadioChange('workout', opt.value)}
                                            inputProps={{ ...register('workout', { required: true }), value: opt.value, onChange: () => handleRadioChange('workout', opt.value) }}
                                        />
                                    ))}
                                </FieldGroup>

                                {/* Training Preference */}
                                <FieldGroup label={t('trainingForm.trainingPreference')} error={errors.preference ? t('trainingForm.preferenceRequired') : ''}>
                                    {[
                                        { value: 'IN', label: t('trainingForm.gym'), icon: '🏋️', desc: t('trainingForm.gymDesc') },
                                        { value: 'OUT', label: t('trainingForm.homeOutdoor'), icon: '🏠', desc: t('trainingForm.homeOutdoorDesc') },
                                    ].map((opt) => (
                                        <RadioCard
                                            key={opt.value}
                                            icon={opt.icon}
                                            label={opt.label}
                                            desc={opt.desc}
                                            selected={isSelected('preference', opt.value)}
                                            onClick={() => handleRadioChange('preference', opt.value)}
                                            inputProps={{ ...register('preference', { required: true }), value: opt.value, onChange: () => handleRadioChange('preference', opt.value) }}
                                        />
                                    ))}
                                </FieldGroup>

                                {/* Primary Goal */}
                                <FieldGroup label={t('trainingForm.primaryGoal')} error={errors.objective ? t('trainingForm.objectiveRequired') : ''}>
                                    {[
                                        { value: 'LOSS', label: t('trainingForm.weightLoss'), icon: '🔥', desc: t('trainingForm.weightLossDesc') },
                                        { value: 'BUILD', label: t('trainingForm.buildMuscle'), icon: '💪', desc: t('trainingForm.buildMuscleDesc') },
                                        { value: 'FLEXIBILITY', label: t('trainingForm.flexibility'), icon: '🧘', desc: t('trainingForm.flexibilityDesc') },
                                    ].map((opt) => (
                                        <RadioCard
                                            key={opt.value}
                                            icon={opt.icon}
                                            label={opt.label}
                                            desc={opt.desc}
                                            selected={isSelected('objective', opt.value)}
                                            onClick={() => handleRadioChange('objective', opt.value)}
                                            inputProps={{ ...register('objective', { required: true }), value: opt.value, onChange: () => handleRadioChange('objective', opt.value) }}
                                        />
                                    ))}
                                </FieldGroup>
                            </div>
                        )}

                        {/* ── Step 2: Personal Details ── */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <StepHeader
                                    title={t('trainingForm.step2Title')}
                                    subtitle={t('trainingForm.step2Subtitle')}
                                />

                                {/* Training Days */}
                                <div>
                                    <FieldLabel>{t('trainingForm.trainingDays')}</FieldLabel>
                                    <div className="relative">
                                        <input
                                            type="number" min="1" max="7"
                                            placeholder={t('trainingForm.trainingDaysPlaceholder')}
                                            {...register('days', { required: true, min: 1, max: 7 })}
                                            onFocus={() => handleFocus('days')}
                                            onBlur={handleBlur}
                                            className={inputClass('days')}
                                            style={{ background: '#1a1a26', color: '#f0f0f5' }}
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
                                    </div>
                                    <FieldError show={!!errors.days}>{t('trainingForm.daysRequired')}</FieldError>
                                </div>

                                {/* Training Minutes */}
                                <div>
                                    <FieldLabel>{t('trainingForm.trainingMinutes')}</FieldLabel>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder={t('trainingForm.trainingMinutesPlaceholder')}
                                            {...register('hours', { required: true })}
                                            onFocus={() => handleFocus('hours')}
                                            onBlur={handleBlur}
                                            className={inputClass('hours')}
                                            style={{ background: '#1a1a26', color: '#f0f0f5' }}
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">⏱️</span>
                                    </div>
                                    <FieldError show={!!errors.hours}>{t('trainingForm.hoursRequired')}</FieldError>
                                </div>

                                {/* Gender */}
                                <FieldGroup label={t('trainingForm.gender')} error={errors.gender ? t('trainingForm.genderRequired') : ''}>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: 'MALE', label: t('trainingForm.male'), icon: '👨' },
                                            { value: 'FEMALE', label: t('trainingForm.female'), icon: '👩' },
                                        ].map((opt) => (
                                            <div key={opt.value}>
                                                <input type="radio" value={opt.value}
                                                    {...register('gender', { required: true })}
                                                    className="sr-only"
                                                    onChange={() => handleRadioChange('gender', opt.value)}
                                                />
                                                <div
                                                    onClick={() => handleRadioChange('gender', opt.value)}
                                                    className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                        isSelected('gender', opt.value)
                                                            ? 'border-[#00ff87] shadow-[0_0_0_3px_rgba(0,255,135,0.12)]'
                                                            : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,255,135,0.3)]'
                                                    }`}
                                                    style={isSelected('gender', opt.value) ? { background: 'rgba(0,255,135,0.08)' } : { background: '#1a1a26' }}
                                                >
                                                    <span className="text-3xl mb-2">{opt.icon}</span>
                                                    <span className="font-semibold text-sm" style={{ color: '#f0f0f5' }}>{opt.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </FieldGroup>

                                {/* Height & Weight */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <FieldLabel>{t('trainingForm.height')}</FieldLabel>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.01"
                                                placeholder={t('trainingForm.heightPlaceholder')}
                                                {...register('height', { required: true })}
                                                onFocus={() => handleFocus('height')}
                                                onBlur={handleBlur}
                                                className={inputClass('height')}
                                                style={{ background: '#1a1a26', color: '#f0f0f5' }}
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📏</span>
                                        </div>
                                        <FieldError show={!!errors.height}>{t('trainingForm.heightRequired')}</FieldError>
                                    </div>
                                    <div>
                                        <FieldLabel>{t('trainingForm.weight')}</FieldLabel>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder={t('trainingForm.weightPlaceholder')}
                                                {...register('weight', { required: true })}
                                                onFocus={() => handleFocus('weight')}
                                                onBlur={handleBlur}
                                                className={inputClass('weight')}
                                                style={{ background: '#1a1a26', color: '#f0f0f5' }}
                                            />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">⚖️</span>
                                        </div>
                                        <FieldError show={!!errors.weight}>{t('trainingForm.weightRequired')}</FieldError>
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div className="max-w-[325px] sm:max-w-none">
                                    <FieldLabel>{t('trainingForm.dateOfBirth')}</FieldLabel>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            {...register('dob', { required: true })}
                                            onFocus={() => handleFocus('dob')}
                                            onBlur={handleBlur}
                                            className={inputClass('dob')}
                                            style={{ background: '#1a1a26', color: '#f0f0f5', colorScheme: 'dark' }}
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🎂</span>
                                    </div>
                                    <FieldError show={!!errors.dob}>{t('trainingForm.dobRequired')}</FieldError>
                                </div>
                            </div>
                        )}

                        {/* ── Step 3: Health & Preferences ── */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <StepHeader
                                    title={t('trainingForm.step3Title')}
                                    subtitle={t('trainingForm.step3Subtitle')}
                                />

                                {/* Target Body Part */}
                                <div>
                                    <FieldLabel>{t('trainingForm.targetBodyPart')}</FieldLabel>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder={t('trainingForm.targetBodyPartPlaceholder')}
                                            {...register('pob')}
                                            onFocus={() => handleFocus('pob')}
                                            onBlur={handleBlur}
                                            className={inputClass('pob')}
                                            style={{ background: '#1a1a26', color: '#f0f0f5' }}
                                        />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🎯</span>
                                    </div>
                                    <FieldError show={!!errors.pob}>{t('trainingForm.pobRequired')}</FieldError>
                                </div>

                                {/* Health Conditions */}
                                <FieldGroup label={t('trainingForm.healthConditions')} error={errors.haveillnes ? t('trainingForm.selectionRequired') : ''}>
                                    {[
                                        { value: 'NO', label: t('trainingForm.noLimitations'), icon: '✅', desc: t('trainingForm.noLimitationsDesc') },
                                        { value: 'YES', label: t('trainingForm.yesLimitations'), icon: '⚠️', desc: t('trainingForm.yesLimitationsDesc') },
                                    ].map((opt) => (
                                        <RadioCard
                                            key={opt.value}
                                            icon={opt.icon}
                                            label={opt.label}
                                            desc={opt.desc}
                                            selected={isSelected('haveillnes', opt.value)}
                                            onClick={() => handleRadioChange('haveillnes', opt.value)}
                                            inputProps={{ ...register('haveillnes', { required: true }), value: opt.value, onChange: () => handleRadioChange('haveillnes', opt.value) }}
                                        />
                                    ))}
                                </FieldGroup>

                                {/* Conditional: describe conditions */}
                                {showConditionalField && (
                                    <div>
                                        <FieldLabel>{t('trainingForm.describeConditions')}</FieldLabel>
                                        <div className="relative">
                                            <textarea
                                                rows={4}
                                                placeholder={t('trainingForm.conditionsPlaceholder')}
                                                {...register('illness', { required: true })}
                                                onFocus={() => handleFocus('illness')}
                                                onBlur={handleBlur}
                                                className={`${inputClass('illness')} resize-none`}
                                                style={{ background: '#1a1a26', color: '#f0f0f5' }}
                                            />
                                            <span className="absolute left-4 top-4 text-lg">📝</span>
                                        </div>
                                        <FieldError show={!!errors.illness}>{t('trainingForm.conditionDetailsRequired')}</FieldError>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between pt-4">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-80"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        color: '#8888a0',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                    }}
                                >
                                    ← {t('trainingForm.previous')}
                                </button>
                            ) : (
                                <div />
                            )}

                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="ml-auto px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                    style={{
                                        background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                                        color: '#09090f',
                                        boxShadow: '0 0 20px rgba(0, 255, 135, 0.35)',
                                    }}
                                >
                                    {t('trainingForm.nextStep')} →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="ml-auto px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                    style={{
                                        background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
                                        color: '#09090f',
                                        boxShadow: '0 0 28px rgba(0, 255, 135, 0.4)',
                                    }}
                                >
                                    🚀 {t('trainingForm.getMyRoutine')}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer note */}
                <div className="mt-6 text-center">
                    <p className="text-xs" style={{ color: '#8888a0' }}>
                        🔒 {t('trainingForm.securityNotice')}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Sub-components ── */

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="text-center mb-2">
            <h2 className="text-xl font-bold mb-1" style={{ color: '#f0f0f5' }}>{title}</h2>
            <p className="text-sm" style={{ color: '#8888a0' }}>{subtitle}</p>
        </div>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="block text-sm font-semibold mb-2" style={{ color: '#8888a0' }}>
            {children}
        </label>
    );
}

function FieldError({ show, children }: { show: boolean; children: React.ReactNode }) {
    if (!show) return null;
    return <p className="text-xs mt-1.5" style={{ color: '#ff6b6b' }}>{children}</p>;
}

function FieldGroup({ label, error, children }: { label: string; error: string; children: React.ReactNode }) {
    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <div className="space-y-3">{children}</div>
            {error && <FieldError show>{error}</FieldError>}
        </div>
    );
}

function RadioCard({
    icon,
    label,
    desc,
    selected,
    onClick,
    inputProps,
}: {
    icon: string;
    label: string;
    desc: string;
    selected: boolean;
    onClick: () => void;
    inputProps: any;
}) {
    return (
        <div className="relative">
            <input type="radio" className="sr-only" {...inputProps} />
            <div
                onClick={onClick}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selected
                        ? 'border-[#00ff87] shadow-[0_0_0_3px_rgba(0,255,135,0.12)]'
                        : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,255,135,0.3)]'
                }`}
                style={selected ? { background: 'rgba(0, 255, 135, 0.08)' } : { background: '#1a1a26' }}
            >
                <span className="text-2xl mr-4 flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: '#f0f0f5' }}>{label}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#8888a0' }}>{desc}</div>
                </div>
                {/* Selected indicator */}
                {selected && (
                    <div
                        className="flex-shrink-0 ml-3 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)' }}
                    >
                        <svg className="w-3 h-3" style={{ color: '#09090f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}
