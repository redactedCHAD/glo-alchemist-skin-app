'use client';

import { useState } from 'react';
import { FormData } from '@/types';
import { getRecommendation } from '@/data/recommendations';
import { PerformanceOptimizer, SkipToMain } from '@/components/PerformanceOptimizer';
import { GloAlchemistLogo, HeroImage } from '@/components/ImageComponents';

interface FormErrors {
  [key: string]: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    skinType: '', 
    concern: '', 
    outcome: '', 
    routine: '', 
    condition: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.skinType) {
      newErrors.skinType = 'Please select your skin type';
    }

    if (!formData.concern) {
      newErrors.concern = 'Please select your primary concern';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubmitted(true);
    }
    
    setIsSubmitting(false);
  };

  const renderResult = () => {
    const recommendation = getRecommendation(formData.concern);
    
    return recommendation ? (
      <div className="space-y-8">
        {/* Success Animation */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 shadow-lg animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Complete!</h2>
          <p className="text-gray-600">Here are your personalized recommendations</p>
        </div>

        {/* Results Card */}
        <section 
          className="card-hover bg-white/90 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-2xl border border-orange-100"
          role="region"
          aria-labelledby="recommendation-title"
        >
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 id="recommendation-title" className="text-3xl font-bold gradient-text mb-2">
                {recommendation.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{recommendation.desc}</p>
            </div>
          </div>

          {/* User Info Summary */}
          <div className="bg-orange-50/50 rounded-2xl p-6 mb-8">
            <h4 className="font-bold text-gray-800 mb-4">Your Profile Summary:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>
                <p className="font-semibold text-gray-800">{formData.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Skin Type:</span>
                <p className="font-semibold text-gray-800 capitalize">{formData.skinType}</p>
              </div>
              <div>
                <span className="text-gray-500">Concern:</span>
                <p className="font-semibold text-gray-800 capitalize">{formData.concern}</p>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-semibold text-gray-800 truncate">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Ready to transform your skin? Book your free consultation with our specialists!
            </p>
            <a 
              href="https://thegloalchemist.com/book" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="Book free consultation - opens in new window"
            >
              <button className="btn-primary px-8 py-4 rounded-xl font-bold text-lg text-white">
                <span className="flex items-center">
                  📅 Book Your Free Consultation
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </button>
            </a>
          </div>
        </section>

        {/* Start Over Button */}
        <div className="text-center">
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', skinType: '', concern: '', outcome: '', routine: '', condition: '' });
              setErrors({});
            }}
            className="text-orange-600 hover:text-orange-700 font-semibold underline transition-colors"
          >
            ← Start Over with New Analysis
          </button>
        </div>
      </div>
    ) : (
      <div 
        className="card-hover bg-red-50/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-red-200"
        role="alert"
        aria-live="polite"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-700 mb-4">No matching recommendation found. Please check your inputs and try again.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <PerformanceOptimizer />
      <SkipToMain />
      <main id="main-content" className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" role="main">
        <div className="max-w-7xl mx-auto">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <GloAlchemistLogo className="mx-auto mb-6" width={300} height={120} />
          </div>

          {/* Hero Section with Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
                Personalized
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl">Skin Analysis</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover your perfect skincare routine with our expert analysis. 
                Answer a few questions and get personalized recommendations tailored just for you.
              </p>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Expert Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Personalized Results</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Free Consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Professional Care</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative">
                <HeroImage className="w-full h-full" />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute top-1/4 -left-8 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                <div className="absolute bottom-1/4 -right-8 w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center animate-bounce" style={{animationDelay: '1.5s'}}>
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {!submitted ? (
            <div className="max-w-4xl mx-auto">
              <div className="card-hover bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border border-orange-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold gradient-text mb-3">Let's Analyze Your Skin</h2>
                  <p className="text-gray-600 text-lg">Tell us about your skin so we can provide the best recommendations</p>
                </div>
                
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  role="form"
                  aria-label="Skin analysis questionnaire"
                  noValidate
                >
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Your Name *
                  </label>
                  <input 
                    id="name"
                    className={`input-field w-full p-4 rounded-xl text-gray-800 placeholder-gray-400 ${
                      errors.name ? 'border-red-400 bg-red-50/50' : ''
                    }`}
                    type="text" 
                    name="name" 
                    value={formData.name}
                    placeholder="Enter your full name" 
                    onChange={handleChange} 
                    required 
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-500 font-medium" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Your Email *
                  </label>
                  <input 
                    id="email"
                    className={`input-field w-full p-4 rounded-xl text-gray-800 placeholder-gray-400 ${
                      errors.email ? 'border-red-400 bg-red-50/50' : ''
                    }`}
                    type="email" 
                    name="email" 
                    value={formData.email}
                    placeholder="Enter your email address" 
                    onChange={handleChange} 
                    required 
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-500 font-medium" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="skinType" className="block text-sm font-semibold text-gray-700">
                      Your Skin Type *
                    </label>
                    <select 
                      id="skinType"
                      className={`input-field w-full p-4 rounded-xl text-gray-800 ${
                        errors.skinType ? 'border-red-400 bg-red-50/50' : ''
                      }`}
                      name="skinType" 
                      value={formData.skinType}
                      onChange={handleChange} 
                      required
                      aria-invalid={errors.skinType ? 'true' : 'false'}
                      aria-describedby={errors.skinType ? 'skinType-error' : undefined}
                    >
                      <option value="">Select your skin type</option>
                      <option value="oily">🌟 Oily</option>
                      <option value="dry">💧 Dry</option>
                      <option value="combo">⚖️ Combination</option>
                      <option value="sensitive">🌸 Sensitive</option>
                    </select>
                    {errors.skinType && (
                      <p id="skinType-error" className="text-sm text-red-500 font-medium" role="alert">
                        {errors.skinType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="concern" className="block text-sm font-semibold text-gray-700">
                      Primary Concern *
                    </label>
                    <select 
                      id="concern"
                      className={`input-field w-full p-4 rounded-xl text-gray-800 ${
                        errors.concern ? 'border-red-400 bg-red-50/50' : ''
                      }`}
                      name="concern" 
                      value={formData.concern}
                      onChange={handleChange} 
                      required
                      aria-invalid={errors.concern ? 'true' : 'false'}
                      aria-describedby={errors.concern ? 'concern-error' : undefined}
                    >
                      <option value="">Select your primary concern</option>
                      <option value="acne">🔴 Acne / Breakouts</option>
                      <option value="wrinkles">⏰ Wrinkles / Aging</option>
                      <option value="texture">✨ Texture / Tone</option>
                      <option value="hair">🪒 Unwanted Hair</option>
                    </select>
                    {errors.concern && (
                      <p id="concern-error" className="text-sm text-red-500 font-medium" role="alert">
                        {errors.concern}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="outcome" className="block text-sm font-semibold text-gray-700">
                    What do you want to achieve? 🎯
                  </label>
                  <input 
                    id="outcome"
                    className="input-field w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" 
                    type="text" 
                    name="outcome" 
                    value={formData.outcome}
                    placeholder="e.g., Clear skin, reduce fine lines, even skin tone..." 
                    onChange={handleChange} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="routine" className="block text-sm font-semibold text-gray-700">
                      Current Routine <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input 
                      id="routine"
                      className="input-field w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" 
                      type="text" 
                      name="routine" 
                      value={formData.routine}
                      placeholder="Cleanser, moisturizer, etc." 
                      onChange={handleChange} 
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="condition" className="block text-sm font-semibold text-gray-700">
                      Special Conditions
                    </label>
                    <input 
                      id="condition"
                      className="input-field w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" 
                      type="text" 
                      name="condition" 
                      value={formData.condition}
                      placeholder="Pregnancy, allergies, etc." 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`btn-primary w-full py-4 px-8 rounded-xl font-bold text-lg text-white ${
                      isSubmitting 
                        ? 'loading-pulse cursor-not-allowed' 
                        : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Your Skin...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        ✨ Get My Personalized Recommendations
                      </span>
                    )}
                  </button>
                </div>
                </form>
              </div>
            </div>
          ) : (
            renderResult()
          )}
        </div>
      </main>
    </>
  );
}