import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, Loader2, AlertCircle, Camera, FileText } from 'lucide-react';

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
  certifications: string;
  instagram: string;
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
  certifications: '',
  instagram: '',
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

export function TalentApplicationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const headshotInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

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

  const handleHeadshotChange = useCallback((file: File | null) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Headshot must be under 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please upload an image file');
        return;
      }
      setHeadshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeadshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setErrorMessage('');
    }
  }, []);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('Resume must be under 10MB');
        return;
      }
      setResume(file);
      setErrorMessage('');
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleHeadshotChange(e.dataTransfer.files[0]);
    }
  }, [handleHeadshotChange]);

  const removeHeadshot = () => {
    setHeadshot(null);
    setHeadshotPreview(null);
    if (headshotInputRef.current) {
      headshotInputRef.current.value = '';
    }
  };

  const removeResume = () => {
    setResume(null);
    if (resumeInputRef.current) {
      resumeInputRef.current.value = '';
    }
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
    if (!headshot) {
      setErrorMessage('Please upload a headshot');
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
      const submitData = new FormData();

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, value);
        }
      });

      // Add files
      if (headshot) {
        submitData.append('headshot', headshot);
      }
      if (resume) {
        submitData.append('resume', resume);
      }

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit application');
      }

      setSubmitStatus('success');
      setFormData(initialFormData);
      setHeadshot(null);
      setHeadshotPreview(null);
      setResume(null);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
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

          {/* Headshot Upload */}
          <div className="mt-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
              Headshot <span className="text-copper">*</span>
            </label>

            {headshotPreview ? (
              <div className="relative inline-block">
                <img
                  src={headshotPreview}
                  alt="Headshot preview"
                  className="w-32 h-32 object-cover rounded-lg border border-white/10"
                />
                <button
                  type="button"
                  onClick={removeHeadshot}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => headshotInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-copper bg-copper/10'
                    : 'border-white/10 hover:border-copper/30 hover:bg-white/5'
                }`}
              >
                <Camera className="w-10 h-10 text-cream/30 mx-auto mb-3" />
                <p className="text-cream/60 text-sm mb-1">
                  Drag & drop your headshot here, or click to browse
                </p>
                <p className="text-cream/30 text-xs">PNG, JPG up to 5MB</p>
              </div>
            )}

            <input
              ref={headshotInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleHeadshotChange(e.target.files?.[0] || null)}
              className="hidden"
            />
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

          {/* Certifications */}
          <div className="mt-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
              Certifications
            </label>
            <input
              type="text"
              name="certifications"
              value={formData.certifications}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
              placeholder="TIPS, Food Handler, CPR, etc."
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
                Resume (Optional)
              </label>
              {resume ? (
                <div className="flex items-center gap-3 p-3 bg-black/30 border border-white/10 rounded-lg">
                  <FileText className="w-5 h-5 text-copper" />
                  <span className="text-cream text-sm flex-1 truncate">{resume.name}</span>
                  <button
                    type="button"
                    onClick={removeResume}
                    className="text-cream/50 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-cream/60 hover:border-copper/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Upload Resume (PDF)</span>
                </button>
              )}
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="hidden"
              />
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
