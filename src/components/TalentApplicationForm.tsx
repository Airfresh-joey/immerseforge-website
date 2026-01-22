import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, AlertCircle, ChevronRight, ChevronLeft, User, FileText, Briefcase, Camera, MapPin, Upload, X } from 'lucide-react';

// Formspree form ID for BA applications
const FORMSPREE_FORM_ID = 'mpqqeyrn';

// Step definitions
const STEPS = [
  { id: 1, title: 'Register', icon: User },
  { id: 2, title: 'Profile', icon: FileText },
  { id: 3, title: 'Skills', icon: Briefcase },
  { id: 4, title: 'Experience', icon: Briefcase },
  { id: 5, title: 'Photos', icon: Camera },
  { id: 6, title: 'Work Areas', icon: MapPin },
  { id: 7, title: 'Complete', icon: Check },
];

// Skills options
const SKILLS_OPTIONS = [
  'Acting', 'Alcohol Certification (TIPS/TAM)', 'Bartending', 'Auto/Automotive Experience',
  'Bilingual - Spanish', 'Bilingual - Other', 'Brand Ambassador', 'Cashier/POS Experience',
  'Costume Character', 'Customer Service', 'Data Entry', 'Demo/Sampling',
  'DJ', 'Emcee/Host', 'Event Setup/Teardown', 'Field Manager',
  'Fitness - Athletic', 'Fitness - Yoga/Pilates', 'Food Handler Permit', 'Fundraising',
  'Golf Knowledge', 'Hospitality', 'Lead Generation', 'Marketing - Digital',
  'Marketing - Guerrilla', 'Marketing - Street Team', 'Model - Commercial', 'Model - Fashion',
  'Model - Fit', 'Model - Parts', 'Model - Promo', 'Model - Trade Show',
  'Photographer', 'Product Specialist', 'Public Speaking', 'Retail Experience',
  'Sales', 'Social Media', 'Spokesmodel', 'Sports Knowledge',
  'Survey/Research', 'Tech Savvy', 'Tour Guide', 'Trade Show Experience',
  'VR/AR Experience', 'Video Production', 'Warehouse', 'Wine/Spirits Knowledge'
];

// US States
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Major cities by region
const WORK_AREAS: Record<string, string[]> = {
  'West Coast': ['Los Angeles', 'San Francisco', 'San Diego', 'Seattle', 'Portland', 'Las Vegas', 'Phoenix', 'Denver'],
  'East Coast': ['New York City', 'Boston', 'Philadelphia', 'Washington DC', 'Miami', 'Atlanta', 'Charlotte', 'Baltimore'],
  'Midwest': ['Chicago', 'Detroit', 'Minneapolis', 'Milwaukee', 'Cleveland', 'Indianapolis', 'Columbus', 'Kansas City'],
  'South': ['Dallas', 'Houston', 'Austin', 'San Antonio', 'Nashville', 'New Orleans', 'Tampa', 'Orlando'],
  'Other': ['Nationwide - Will Travel', 'Remote/Virtual Events Only']
};

interface FormData {
  applicationType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  height: string;
  tshirtSize: string;
  pantsSize: string;
  shoeSize: string;
  tattoos: string;
  howDidYouHear: string;
  referredBy: string;
  yearsExperience: string;
  personality: string;
  vehicle: string;
  skills: string[];
  promoExperience: string;
  managementExperience: string;
  otherExperience: string;
  previousBrands: string;
  headshot: File | null;
  fullBodyPhoto: File | null;
  additionalPhotos: File[];
  resume: File | null;
  instagram: string;
  workAreas: string[];
  willingToTravel: string;
}

const initialFormData: FormData = {
  applicationType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  height: '',
  tshirtSize: '',
  pantsSize: '',
  shoeSize: '',
  tattoos: '',
  howDidYouHear: '',
  referredBy: '',
  yearsExperience: '',
  personality: '',
  vehicle: '',
  skills: [],
  promoExperience: '',
  managementExperience: '',
  otherExperience: '',
  previousBrands: '',
  headshot: null,
  fullBodyPhoto: null,
  additionalPhotos: [],
  resume: null,
  instagram: '',
  workAreas: [],
  willingToTravel: '',
};

const inputClassName = "w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors";
const labelClassName = "block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2";

export function TalentApplicationForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll to top of form on step change
  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'skills' | 'workAreas', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileChange = (field: 'headshot' | 'fullBodyPhoto' | 'resume', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleMultiFileChange = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ ...prev, additionalPhotos: [...prev.additionalPhotos, ...Array.from(files)] }));
    }
  };

  const removeAdditionalPhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalPhotos: prev.additionalPhotos.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    switch (step) {
      case 1:
        if (!formData.applicationType) { setErrorMessage('Please select what you are applying for'); return false; }
        if (!formData.firstName.trim()) { setErrorMessage('First name is required'); return false; }
        if (!formData.lastName.trim()) { setErrorMessage('Last name is required'); return false; }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setErrorMessage('Valid email is required'); return false;
        }
        if (!formData.phone.trim()) { setErrorMessage('Phone number is required'); return false; }
        return true;
      case 2:
        if (!formData.city.trim()) { setErrorMessage('City is required'); return false; }
        if (!formData.state) { setErrorMessage('State is required'); return false; }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
      scrollToForm();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    scrollToForm();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Use FormData for file uploads
      const submitData = new window.FormData();

      // Add all text fields
      submitData.append('applicationType', formData.applicationType);
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('dateOfBirth', formData.dateOfBirth);
      submitData.append('gender', formData.gender);
      submitData.append('address', formData.address);
      submitData.append('city', formData.city);
      submitData.append('state', formData.state);
      submitData.append('zipcode', formData.zipcode);
      submitData.append('height', formData.height);
      submitData.append('tshirtSize', formData.tshirtSize);
      submitData.append('pantsSize', formData.pantsSize);
      submitData.append('shoeSize', formData.shoeSize);
      submitData.append('tattoos', formData.tattoos);
      submitData.append('howDidYouHear', formData.howDidYouHear);
      submitData.append('referredBy', formData.referredBy);
      submitData.append('yearsExperience', formData.yearsExperience);
      submitData.append('personality', formData.personality);
      submitData.append('vehicle', formData.vehicle);
      submitData.append('skills', formData.skills.join(', '));
      submitData.append('promoExperience', formData.promoExperience);
      submitData.append('managementExperience', formData.managementExperience);
      submitData.append('otherExperience', formData.otherExperience);
      submitData.append('previousBrands', formData.previousBrands);
      submitData.append('instagram', formData.instagram);
      submitData.append('workAreas', formData.workAreas.join(', '));
      submitData.append('willingToTravel', formData.willingToTravel);
      submitData.append('_subject', `New BA Application: ${formData.firstName} ${formData.lastName}`);

      // Add files
      if (formData.headshot) {
        submitData.append('headshot', formData.headshot);
      }
      if (formData.fullBodyPhoto) {
        submitData.append('fullBodyPhoto', formData.fullBodyPhoto);
      }
      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }
      formData.additionalPhotos.forEach((photo, index) => {
        submitData.append(`additionalPhoto_${index + 1}`, photo);
      });

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: submitData,
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSubmitStatus('success');
        setCurrentStep(STEPS.length);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to submit. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Register
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-cream mb-6">Let's Get Started</h3>
      <p className="text-cream/60 mb-6">Enter your basic information to create your profile.</p>

      {/* Application Type */}
      <div className="mb-6 p-4 bg-copper/10 border border-copper/30 rounded-lg">
        <label className={labelClassName}>What are you applying for? <span className="text-copper">*</span></label>
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          {[
            { value: 'NYC Street Activation (Feb 14-15, 2025)', label: 'NYC Street Activation', sublabel: 'Feb 14-15, 2025' },
            { value: 'Join Talent Database', label: 'Join Talent Database', sublabel: 'General Application' },
          ].map(option => (
            <label
              key={option.value}
              className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.applicationType === option.value
                  ? 'bg-copper/20 border-copper text-cream'
                  : 'border-white/10 text-cream/60 hover:border-copper/30'
              }`}
            >
              <input
                type="radio"
                name="applicationType"
                value={option.value}
                checked={formData.applicationType === option.value}
                onChange={handleInputChange}
                className="hidden"
              />
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-cream/50 mt-1">{option.sublabel}</div>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClassName}>First Name <span className="text-copper">*</span></label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" className={inputClassName} />
        </div>
        <div>
          <label className={labelClassName}>Last Name <span className="text-copper">*</span></label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Smith" className={inputClassName} />
        </div>
        <div>
          <label className={labelClassName}>Email <span className="text-copper">*</span></label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className={inputClassName} />
        </div>
        <div>
          <label className={labelClassName}>Phone <span className="text-copper">*</span></label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(555) 123-4567" className={inputClassName} />
        </div>
      </div>
    </div>
  );

  // Step 2: Profile
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-cream mb-6">Your Profile</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClassName}>Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={inputClassName} />
        </div>
        <div>
          <label className={labelClassName}>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
            <option value="" className="bg-charcoal">Select...</option>
            {['Male', 'Female', 'Non-Binary', 'Prefer not to say'].map(opt => (
              <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <p className="font-mono text-xs uppercase tracking-wider text-copper mb-4">Location</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClassName}>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St" className={inputClassName} />
          </div>
          <div>
            <label className={labelClassName}>City <span className="text-copper">*</span></label>
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Los Angeles" className={inputClassName} />
          </div>
          <div>
            <label className={labelClassName}>State <span className="text-copper">*</span></label>
            <select name="state" value={formData.state} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
              <option value="" className="bg-charcoal">Select...</option>
              {US_STATES.map(opt => (
                <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClassName}>Zipcode</label>
            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleInputChange} placeholder="90001" className={inputClassName} />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <p className="font-mono text-xs uppercase tracking-wider text-copper mb-4">Physical Details</p>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className={labelClassName}>Height</label>
            <input type="text" name="height" value={formData.height} onChange={handleInputChange} placeholder="5'10&quot;" className={inputClassName} />
          </div>
          <div>
            <label className={labelClassName}>T-Shirt Size</label>
            <select name="tshirtSize" value={formData.tshirtSize} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
              <option value="" className="bg-charcoal">Select...</option>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(opt => (
                <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClassName}>Pants Size</label>
            <select name="pantsSize" value={formData.pantsSize} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
              <option value="" className="bg-charcoal">Select...</option>
              {['24', '26', '28', '30', '32', '34', '36', '38', '40', '42'].map(opt => (
                <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClassName}>Shoe Size</label>
            <input type="text" name="shoeSize" value={formData.shoeSize} onChange={handleInputChange} placeholder="10" className={inputClassName} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClassName}>Do you have visible tattoos?</label>
          <select name="tattoos" value={formData.tattoos} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
            <option value="" className="bg-charcoal">Select...</option>
            {['None', 'Yes - can be covered', 'Yes - cannot be covered'].map(opt => (
              <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <p className="font-mono text-xs uppercase tracking-wider text-copper mb-4">About You</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClassName}>How did you hear about us?</label>
            <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
              <option value="" className="bg-charcoal">Select...</option>
              {['Indeed', 'LinkedIn', 'Instagram', 'Facebook', 'Google', 'Referral', 'Job Fair', 'Other'].map(opt => (
                <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClassName}>If referred, by who?</label>
            <input type="text" name="referredBy" value={formData.referredBy} onChange={handleInputChange} placeholder="Name of referrer" className={inputClassName} />
          </div>
          <div>
            <label className={labelClassName}>Years in promotions/events</label>
            <select name="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
              <option value="" className="bg-charcoal">Select...</option>
              {['None - Just starting', 'Less than 1 year', '1-2 years', '3-5 years', '5+ years'].map(opt => (
                <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClassName}>Vehicle (Make/Model/Year)</label>
            <input type="text" name="vehicle" value={formData.vehicle} onChange={handleInputChange} placeholder="Toyota Camry 2020" className={inputClassName} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClassName}>Tell us about your personality</label>
          <textarea name="personality" value={formData.personality} onChange={handleInputChange} placeholder="Describe yourself - are you outgoing, energetic, detail-oriented?" rows={3} className={inputClassName + " resize-none"} />
        </div>
      </div>
    </div>
  );

  // Step 3: Skills
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-cream mb-2">Skills & Qualifications</h3>
      <p className="text-cream/60 mb-6">Select all skills that apply to you.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {SKILLS_OPTIONS.map(skill => (
          <label
            key={skill}
            className={`px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${
              formData.skills.includes(skill)
                ? 'bg-copper/20 border-copper text-copper'
                : 'border-white/10 text-cream/60 hover:border-copper/30'
            }`}
          >
            <input
              type="checkbox"
              checked={formData.skills.includes(skill)}
              onChange={() => handleCheckboxChange('skills', skill)}
              className="hidden"
            />
            {skill}
          </label>
        ))}
      </div>
    </div>
  );

  // Step 4: Experience
  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-cream mb-2">Your Experience</h3>
      <p className="text-cream/60 mb-6">Tell us about your relevant experience.</p>

      <div>
        <label className={labelClassName}>Promotional / Brand Ambassador Experience</label>
        <textarea name="promoExperience" value={formData.promoExperience} onChange={handleInputChange} placeholder="Describe events you've worked, brands you've represented, responsibilities..." rows={4} className={inputClassName + " resize-none"} />
      </div>

      <div>
        <label className={labelClassName}>Management / Leadership Experience</label>
        <textarea name="managementExperience" value={formData.managementExperience} onChange={handleInputChange} placeholder="Have you managed teams, led events, trained staff?" rows={3} className={inputClassName + " resize-none"} />
      </div>

      <div>
        <label className={labelClassName}>Other Relevant Experience</label>
        <textarea name="otherExperience" value={formData.otherExperience} onChange={handleInputChange} placeholder="Hospitality, retail, customer service, performing arts, etc." rows={3} className={inputClassName + " resize-none"} />
      </div>

      <div>
        <label className={labelClassName}>Previous Brands / Companies</label>
        <textarea name="previousBrands" value={formData.previousBrands} onChange={handleInputChange} placeholder="Nike, Red Bull, Apple, Samsung, etc." rows={2} className={inputClassName + " resize-none"} />
      </div>
    </div>
  );

  // Step 5: Photos & Resume
  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-cream mb-2">Photos & Resume</h3>
      <p className="text-cream/60 mb-6">Upload your photos and resume for our team to review.</p>

      {/* Headshot Upload */}
      <div>
        <label className={labelClassName}>Headshot Photo <span className="text-copper">*</span></label>
        <div className="relative">
          {formData.headshot ? (
            <div className="flex items-center gap-3 p-4 bg-copper/10 border border-copper/30 rounded-lg">
              <Check className="w-5 h-5 text-copper" />
              <span className="text-cream flex-1 truncate">{formData.headshot.name}</span>
              <button
                type="button"
                onClick={() => handleFileChange('headshot', null)}
                className="text-cream/50 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-copper/50 transition-colors">
              <Upload className="w-8 h-8 text-cream/40 mb-2" />
              <span className="text-cream/60 text-sm">Click to upload headshot</span>
              <span className="text-cream/30 text-xs mt-1">JPG, PNG up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('headshot', e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Full Body Photo Upload */}
      <div>
        <label className={labelClassName}>Full Body Photo <span className="text-copper">*</span></label>
        <div className="relative">
          {formData.fullBodyPhoto ? (
            <div className="flex items-center gap-3 p-4 bg-copper/10 border border-copper/30 rounded-lg">
              <Check className="w-5 h-5 text-copper" />
              <span className="text-cream flex-1 truncate">{formData.fullBodyPhoto.name}</span>
              <button
                type="button"
                onClick={() => handleFileChange('fullBodyPhoto', null)}
                className="text-cream/50 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-copper/50 transition-colors">
              <Upload className="w-8 h-8 text-cream/40 mb-2" />
              <span className="text-cream/60 text-sm">Click to upload full body photo</span>
              <span className="text-cream/30 text-xs mt-1">JPG, PNG up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('fullBodyPhoto', e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Additional Photos */}
      <div>
        <label className={labelClassName}>Additional Photos (Optional)</label>
        <div className="space-y-3">
          {formData.additionalPhotos.length > 0 && (
            <div className="space-y-2">
              {formData.additionalPhotos.map((photo, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-charcoal/50 border border-white/10 rounded-lg">
                  <Camera className="w-4 h-4 text-copper" />
                  <span className="text-cream/80 text-sm flex-1 truncate">{photo.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAdditionalPhoto(index)}
                    className="text-cream/50 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center justify-center gap-2 p-4 border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-copper/50 transition-colors">
            <Upload className="w-5 h-5 text-cream/40" />
            <span className="text-cream/60 text-sm">Add more photos</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleMultiFileChange(e.target.files)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Resume Upload */}
      <div className="pt-4 border-t border-white/10">
        <label className={labelClassName}>Resume / CV</label>
        <div className="relative">
          {formData.resume ? (
            <div className="flex items-center gap-3 p-4 bg-copper/10 border border-copper/30 rounded-lg">
              <FileText className="w-5 h-5 text-copper" />
              <span className="text-cream flex-1 truncate">{formData.resume.name}</span>
              <button
                type="button"
                onClick={() => handleFileChange('resume', null)}
                className="text-cream/50 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-copper/50 transition-colors">
              <FileText className="w-8 h-8 text-cream/40 mb-2" />
              <span className="text-cream/60 text-sm">Click to upload resume</span>
              <span className="text-cream/30 text-xs mt-1">PDF, DOC, DOCX up to 5MB</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => handleFileChange('resume', e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Instagram */}
      <div className="pt-4 border-t border-white/10">
        <label className={labelClassName}>Instagram Handle</label>
        <input type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} placeholder="@yourhandle" className={inputClassName} />
      </div>
    </div>
  );

  // Step 6: Work Areas
  const renderStep6 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-cream mb-2">Work Areas</h3>
      <p className="text-cream/60 mb-6">Select the markets where you're available to work.</p>

      {Object.entries(WORK_AREAS).map(([region, cities]) => (
        <div key={region} className="mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-copper mb-3">{region}</p>
          <div className="flex flex-wrap gap-2">
            {cities.map(city => (
              <label
                key={city}
                className={`px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${
                  formData.workAreas.includes(city)
                    ? 'bg-copper/20 border-copper text-copper'
                    : 'border-white/10 text-cream/60 hover:border-copper/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.workAreas.includes(city)}
                  onChange={() => handleCheckboxChange('workAreas', city)}
                  className="hidden"
                />
                {city}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label className={labelClassName}>Willing to travel?</label>
        <select name="willingToTravel" value={formData.willingToTravel} onChange={handleInputChange} className={inputClassName + " appearance-none cursor-pointer"}>
          <option value="" className="bg-charcoal">Select...</option>
          {['Local only (within 50 miles)', 'Regional (within state)', 'National (will fly)', 'International'].map(opt => (
            <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );

  // Step 7: Complete
  const renderStep7 = () => (
    submitStatus === 'success' ? (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-copper" />
        </div>
        <h3 className="text-3xl font-display text-cream mb-4">Application Submitted!</h3>
        <p className="text-cream/60 mb-8 max-w-md mx-auto">
          Thank you for applying to join ImmerseForge. Our talent team will review your application and reach out within 48-72 hours.
        </p>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setCurrentStep(1);
            setSubmitStatus('idle');
          }}
          className="font-mono text-sm uppercase tracking-wider text-copper hover:text-copper-light transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    ) : (
      <div className="text-center py-12">
        <h3 className="text-2xl font-display text-cream mb-4">Ready to Submit?</h3>
        <p className="text-cream/60 mb-8">Review your information and submit your application.</p>

        <div className="bg-black/30 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
          <p className="text-copper font-mono text-xs uppercase mb-2">{formData.applicationType}</p>
          <p className="text-cream font-medium">{formData.firstName} {formData.lastName}</p>
          <p className="text-cream/60 text-sm">{formData.email}</p>
          <p className="text-cream/60 text-sm">{formData.city}, {formData.state}</p>
          <p className="text-cream/60 text-sm mt-2">{formData.skills.length} skills selected</p>
          <p className="text-cream/60 text-sm">{formData.workAreas.length} work areas selected</p>
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-cream/60 text-sm flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {formData.headshot ? 'Headshot uploaded' : 'No headshot'}
              {formData.fullBodyPhoto ? ' + Full body' : ''}
              {formData.additionalPhotos.length > 0 ? ` + ${formData.additionalPhotos.length} more` : ''}
            </p>
            {formData.resume && (
              <p className="text-cream/60 text-sm flex items-center gap-2 mt-1">
                <FileText className="w-4 h-4" />
                Resume uploaded
              </p>
            )}
          </div>
        </div>

        <motion.button
          onClick={handleSubmit}
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
      </div>
    )
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      case 7: return renderStep7();
      default: return null;
    }
  };

  return (
    <motion.div
      ref={formRef}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-white/5 rounded-lg p-6 md:p-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm transition-all ${
                    currentStep >= step.id
                      ? 'bg-copper text-black'
                      : 'bg-white/10 text-cream/50'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-1 ${currentStep > step.id ? 'bg-copper' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center font-mono text-sm text-copper">
            Step {currentStep}: {STEPS[currentStep - 1]?.title}
          </p>
        </div>

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

        {/* Step Content */}
        <div key={currentStep}>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < STEPS.length && submitStatus !== 'success' && (
          <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 font-mono text-sm uppercase tracking-wider px-6 py-3 transition-all ${
                currentStep === 1
                  ? 'text-cream/30 cursor-not-allowed'
                  : 'text-cream hover:text-copper'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-copper hover:bg-copper-light text-black font-mono text-sm uppercase tracking-wider px-6 py-3 transition-all"
              >
                {currentStep === STEPS.length - 2 ? 'Review' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : currentStep === STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-copper hover:bg-copper-light text-black font-mono text-sm uppercase tracking-wider px-6 py-3 transition-all"
              >
                Continue to Submit
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </motion.div>
  );
}
