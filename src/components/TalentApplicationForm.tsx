import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  city: string;
  availability: string[];
  experienceYears: string;
  previousBrands: string;
  skills: string[];
  instagram: string;
  portfolioLink: string;
  whyJoin: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  city: '',
  availability: [],
  experienceYears: '',
  previousBrands: '',
  skills: [],
  instagram: '',
  portfolioLink: '',
  whyJoin: ''
};

const positionOptions = [
  'Brand Ambassador',
  'Event Staff',
  'Experiential Specialist',
  'Team Lead',
  'Other'
];

const availabilityOptions = [
  'Weekdays',
  'Weekends',
  'Evenings',
  'Flexible'
];

const skillOptions = [
  'Promotional Marketing',
  'Product Demonstration',
  'Public Speaking',
  'Bilingual (Spanish)',
  'Bilingual (Other)',
  'Photography',
  'Social Media',
  'Tech/VR/AR',
  'Hospitality',
  'Sales'
];

// Formspree form ID for talent applications
// Create a new form at formspree.io and replace this ID
const FORMSPREE_FORM_ID = 'mlggdrdr';

export function TalentApplicationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'availability' | 'skills', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone number');
      return false;
    }
    if (!formData.position) {
      setErrorMessage('Please select a position');
      return false;
    }
    if (!formData.city.trim()) {
      setErrorMessage('Please enter your city/market');
      return false;
    }
    if (!formData.whyJoin.trim()) {
      setErrorMessage('Please tell us why you want to join ImmerseForge');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          city: formData.city,
          availability: formData.availability.join(', '),
          experienceYears: formData.experienceYears,
          previousBrands: formData.previousBrands,
          skills: formData.skills.join(', '),
          instagram: formData.instagram,
          portfolioLink: formData.portfolioLink,
          whyJoin: formData.whyJoin,
          _subject: `New BA Application: ${formData.fullName} - ${formData.position}`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSubmitStatus('success');
        setFormData(initialFormData);
      } else {
        console.error('Form submission failed:', data);
        setSubmitStatus('error');
        setErrorMessage('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-copper" />
        </div>
        <h3 className="text-3xl font-display text-cream mb-4">Application Received!</h3>
        <p className="text-cream/60 mb-8 font-serif">
          Thank you for your interest in joining ImmerseForge. Our talent team will review your application and reach out if there's a good fit.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="font-mono text-sm uppercase tracking-wider text-copper hover:text-copper-light transition-colors"
        >
          Submit Another Application
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-white/5 rounded-lg p-8 md:p-12">

        {/* Error Banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personal Information */}
        <div className="mb-10">
          <h3 className="text-xl font-display text-cream mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center text-sm text-copper">1</span>
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Full Name <span className="text-copper">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Email <span className="text-copper">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Phone <span className="text-copper">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                City / Market <span className="text-copper">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
                placeholder="Los Angeles, CA"
              />
            </div>
          </div>
        </div>

        {/* Position & Experience */}
        <div className="mb-10">
          <h3 className="text-xl font-display text-cream mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center text-sm text-copper">2</span>
            Position & Experience
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Position Interest <span className="text-copper">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-copper/50 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-charcoal">Select a position...</option>
                {positionOptions.map(option => (
                  <option key={option} value={option} className="bg-charcoal">{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                min="0"
                max="50"
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
                placeholder="2"
              />
            </div>
          </div>

          {/* Availability */}
          <div className="mt-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-3">
              Availability
            </label>
            <div className="flex flex-wrap gap-3">
              {availabilityOptions.map(option => (
                <label
                  key={option}
                  className={`px-4 py-2 rounded-full border cursor-pointer transition-all ${
                    formData.availability.includes(option)
                      ? 'bg-copper/20 border-copper text-copper'
                      : 'border-white/10 text-cream/60 hover:border-copper/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.availability.includes(option)}
                    onChange={() => handleCheckboxChange('availability', option)}
                    className="hidden"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-3">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(option => (
                <label
                  key={option}
                  className={`px-3 py-1.5 rounded-full border cursor-pointer transition-all text-sm ${
                    formData.skills.includes(option)
                      ? 'bg-copper/20 border-copper text-copper'
                      : 'border-white/10 text-cream/60 hover:border-copper/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(option)}
                    onChange={() => handleCheckboxChange('skills', option)}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Previous Brands */}
          <div className="mt-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
              Previous Brands / Companies Worked With
            </label>
            <textarea
              name="previousBrands"
              value={formData.previousBrands}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors resize-none"
              placeholder="Nike, Apple, Red Bull, etc."
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mb-10">
          <h3 className="text-xl font-display text-cream mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-copper/20 flex items-center justify-center text-sm text-copper">3</span>
            Additional Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Instagram Handle
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
                placeholder="@yourhandle"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Portfolio / Headshot Link
              </label>
              <input
                type="url"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
                placeholder="https://drive.google.com/..."
              />
              <p className="text-cream/30 text-xs mt-1">Google Drive, Dropbox, or portfolio link</p>
            </div>
          </div>

          {/* Why Join */}
          <div className="mt-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
              Why do you want to join ImmerseForge? <span className="text-copper">*</span>
            </label>
            <textarea
              name="whyJoin"
              value={formData.whyJoin}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about yourself and what excites you about experiential marketing..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 bg-copper hover:bg-copper-light disabled:bg-copper/50 text-black font-mono text-sm uppercase tracking-wider px-10 py-4 transition-all duration-300"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </motion.button>

          <p className="mt-4 text-xs text-cream/40">
            By submitting, you agree to our privacy policy and consent to being contacted about opportunities.
          </p>
        </div>
      </div>
    </motion.form>
  );
}
