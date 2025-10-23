'use client'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface ItrainingFormProps {
  onSubmitForm: (data: any) => void
}

export default function TrainingForm({onSubmitForm}: ItrainingFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues
    } : any = useForm();
    
    const [showConditionalField, setShowConditionalField] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedValues, setSelectedValues] = useState<{[key: string]: string}>({});
    const totalSteps = 3;

    const onSubmit = (data: any) => {
        console.log(data);
        onSubmitForm(data);
    };

    const watchShowExtraField = watch('haveillnes', '');

    useEffect(() => {
        if (watchShowExtraField === 'YES') {
            setShowConditionalField(true);
        } else {
            setShowConditionalField(false);
        }
    }, [watchShowExtraField]);

    const handleFocus = (fieldName: string) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getStepProgress = () => {
        return (currentStep / totalSteps) * 100;
    };

    const handleRadioChange = (fieldName: string, value: string) => {
        setSelectedValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
        setValue(fieldName, value);
    };

    const isSelected = (fieldName: string, value: string) => {
        return selectedValues[fieldName] === value || watch(fieldName) === value;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-6 shadow-xl">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Your Fitness Journey</h1>
                    <p className="text-gray-600 text-lg">Let's create the perfect workout routine for you</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-6 mb-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Step {currentStep} of {totalSteps}</span>
                            <span>{Math.round(getStepProgress())}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${getStepProgress()}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Step 1: Experience & Goals */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Experience & Goals</h2>
                                    <p className="text-gray-600">Tell us about your fitness background</p>
                                </div>

                                {/* Workout Experience */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Workout Experience</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'JUNIOR', label: 'Beginner', icon: '🌱', desc: 'Just starting out' },
                                            { value: 'INTERMEDIATE', label: 'Intermediate', icon: '💪', desc: '6+ months experience' },
                                            { value: 'ADVANCED', label: 'Advanced', icon: '🏆', desc: '2+ years experience' }
                                        ].map((option) => (
                                            <div key={option.value} className="relative">
                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    {...register('workout', { required: 'Workout experience is required' })}
                                                    className="sr-only"
                                                    onChange={() => handleRadioChange('workout', option.value)}
                                                />
                                                <div 
                                                    onClick={() => handleRadioChange('workout', option.value)}
                                                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                        isSelected('workout', option.value)
                                                            ? 'border-purple-500 bg-purple-100 shadow-lg shadow-purple-500/25'
                                                            : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                                    }`}
                                                >
                                                    <span className="text-2xl mr-4">{option.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">{option.label}</div>
                                                        <div className="text-sm text-gray-600">{option.desc}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.workout && (
                                        <p className="text-red-500 text-sm mt-2">{errors.workout.message}</p>
                                    )}
                                </div>

                                {/* Training Preference */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Where do you prefer to train?</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'IN', label: 'Gym', icon: '🏋️', desc: 'Full equipment access' },
                                            { value: 'OUT', label: 'Home/Outdoor', icon: '🏠', desc: 'Bodyweight & minimal equipment' }
                                        ].map((option) => (
                                            <div key={option.value} className="relative">
                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    {...register('preference', { required: 'Training preference is required' })}
                                                    className="sr-only"
                                                    onChange={() => handleRadioChange('preference', option.value)}
                                                />
                                                <div 
                                                    onClick={() => handleRadioChange('preference', option.value)}
                                                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                        isSelected('preference', option.value)
                                                            ? 'border-purple-500 bg-purple-100 shadow-lg shadow-purple-500/25'
                                                            : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                                    }`}
                                                >
                                                    <span className="text-2xl mr-4">{option.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">{option.label}</div>
                                                        <div className="text-sm text-gray-600">{option.desc}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.preference && (
                                        <p className="text-red-500 text-sm mt-2">{errors.preference.message}</p>
                                    )}
                                </div>

                                {/* Objective */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Primary Goal</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'LOSS', label: 'Weight Loss', icon: '🔥', desc: 'Burn fat & get lean' },
                                            { value: 'BUILD', label: 'Build Muscle', icon: '💪', desc: 'Gain strength & size' },
                                            { value: 'FLEXIBILITY', label: 'Flexibility', icon: '🧘', desc: 'Improve mobility & flexibility' }
                                        ].map((option) => (
                                            <div key={option.value} className="relative">
                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    {...register('objective', { required: 'Objective is required' })}
                                                    className="sr-only"
                                                    onChange={() => handleRadioChange('objective', option.value)}
                                                />
                                                <div 
                                                    onClick={() => handleRadioChange('objective', option.value)}
                                                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                        isSelected('objective', option.value)
                                                            ? 'border-purple-500 bg-purple-100 shadow-lg shadow-purple-500/25'
                                                            : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                                    }`}
                                                >
                                                    <span className="text-2xl mr-4">{option.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">{option.label}</div>
                                                        <div className="text-sm text-gray-600">{option.desc}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.objective && (
                                        <p className="text-red-500 text-sm mt-2">{errors.objective.message}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Personal Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Details</h2>
                                    <p className="text-gray-600">Help us personalize your routine</p>
                                </div>

                                {/* Training Days */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Training Days per Week</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="1"
                                            max="7"
                                            placeholder="How many days can you train?"
                                            {...register('days', { required: 'Number of days is required', min: 1, max: 7 })}
                                            onFocus={() => handleFocus('days')}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-4 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white text-lg ${
                                                focusedField === 'days' 
                                                    ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <span className="text-xl">📅</span>
                                        </div>
                                    </div>
                                    {errors.days && (
                                        <p className="text-red-500 text-sm mt-2">{errors.days.message}</p>
                                    )}
                                </div>

                                {/* Training Hours per Day */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Training Hours per Day</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0.5"
                                            max="8"
                                            step="0.5"
                                            placeholder="How many hours per training session?"
                                            {...register('hours', { required: 'Training hours is required', min: 0.5, max: 8 })}
                                            onFocus={() => handleFocus('hours')}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-4 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white text-lg ${
                                                focusedField === 'hours' 
                                                    ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <span className="text-xl">⏱️</span>
                                        </div>
                                    </div>
                                    {errors.hours && (
                                        <p className="text-red-500 text-sm mt-2">{errors.hours.message}</p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: 'MALE', label: 'Male', icon: '👨' },
                                            { value: 'FEMALE', label: 'Female', icon: '👩' }
                                        ].map((option) => (
                                            <div key={option.value} className="relative">
                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    {...register('gender', { required: 'Gender is required' })}
                                                    className="sr-only"
                                                    onChange={() => handleRadioChange('gender', option.value)}
                                                />
                                                <div 
                                                    onClick={() => handleRadioChange('gender', option.value)}
                                                    className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                        isSelected('gender', option.value)
                                                            ? 'border-purple-500 bg-purple-100 shadow-lg shadow-purple-500/25'
                                                            : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                                    }`}
                                                >
                                                    <span className="text-3xl mb-2">{option.icon}</span>
                                                    <div className="font-semibold text-gray-800">{option.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.gender && (
                                        <p className="text-red-500 text-sm mt-2">{errors.gender.message}</p>
                                    )}
                                </div>

                                {/* Height & Weight */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Height (m)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="0.01"
                                                placeholder="1.75"
                                                {...register('height', { required: 'Height is required' })}
                                                onFocus={() => handleFocus('height')}
                                                onBlur={handleBlur}
                                                className={`w-full px-4 py-4 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                                                    focusedField === 'height' 
                                                        ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                <span className="text-lg">📏</span>
                                            </div>
                                        </div>
                                        {errors.height && (
                                            <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder="70"
                                                {...register('weight', { required: 'Weight is required' })}
                                                onFocus={() => handleFocus('weight')}
                                                onBlur={handleBlur}
                                                className={`w-full px-4 py-4 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                                                    focusedField === 'weight' 
                                                        ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                                <span className="text-lg">⚖️</span>
                                            </div>
                                        </div>
                                        {errors.weight && (
                                            <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            {...register('dob', { required: 'Date of birth is required' })}
                                            onFocus={() => handleFocus('dob')}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-4 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                                                focusedField === 'dob' 
                                                    ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <span className="text-lg">🎂</span>
                                        </div>
                                    </div>
                                    {errors.dob && (
                                        <p className="text-red-500 text-sm mt-2">{errors.dob.message}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Health & Preferences */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Health & Preferences</h2>
                                    <p className="text-gray-600">Final details for your perfect routine</p>
                                </div>

                                {/* Target Body Part */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Body Part (Optional)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="e.g., Arms, Legs, Core, Full Body"
                                            {...register('pob')}
                                            onFocus={() => handleFocus('pob')}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-4 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white ${
                                                focusedField === 'pob' 
                                                    ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <span className="text-lg">🎯</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Health Conditions */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Do you have any health conditions or limitations?</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'NO', label: 'No limitations', icon: '✅', desc: 'Ready to go!' },
                                            { value: 'YES', label: 'Yes, I have limitations', icon: '⚠️', desc: 'Need to consider health conditions' }
                                        ].map((option) => (
                                            <div key={option.value} className="relative">
                                                <input
                                                    type="radio"
                                                    value={option.value}
                                                    {...register('haveillnes', { required: 'This selection is required' })}
                                                    className="sr-only"
                                                    onChange={() => handleRadioChange('haveillnes', option.value)}
                                                />
                                                <div 
                                                    onClick={() => handleRadioChange('haveillnes', option.value)}
                                                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                                        isSelected('haveillnes', option.value)
                                                            ? 'border-purple-500 bg-purple-100 shadow-lg shadow-purple-500/25'
                                                            : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                                    }`}
                                                >
                                                    <span className="text-2xl mr-4">{option.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">{option.label}</div>
                                                        <div className="text-sm text-gray-600">{option.desc}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.haveillnes && (
                                        <p className="text-red-500 text-sm mt-2">{errors.haveillnes.message}</p>
                                    )}
                                </div>

                                {/* Conditional Health Details */}
                                {showConditionalField && (
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Please describe your health conditions or limitations</label>
                                        <div className="relative">
                                            <textarea
                                                rows={4}
                                                placeholder="Please provide details about your health conditions, injuries, or physical limitations..."
                                                {...register('illness', { required: 'Health condition details are required' })}
                                                onFocus={() => handleFocus('illness')}
                                                onBlur={handleBlur}
                                                className={`w-full px-4 py-4 pl-12 bg-gray-50/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white resize-none ${
                                                    focusedField === 'illness' 
                                                        ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            />
                                            <div className="absolute left-4 top-4">
                                                <span className="text-lg">📝</span>
                                            </div>
                                        </div>
                                        {errors.illness && (
                                            <p className="text-red-500 text-sm mt-2">{errors.illness.message}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                                >
                                    Previous
                                </button>
                            )}
                            
                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="ml-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="ml-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                                >
                                    🚀 Get My Routine
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Motivational Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        🔒 Your information is secure and will only be used to create your personalized workout routine
                    </p>
                </div>
            </div>
        </div>
    );
}
