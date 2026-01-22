import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, AlertCircle, ChevronRight, ChevronLeft, User, FileText, Briefcase, Camera, MapPin } from 'lucide-react';

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
const WORK_AREAS = {
  'West Coast': ['Los Angeles', 'San Francisco', 'San Diego', 'Seattle', 'Portland', 'Las Vegas', 'Phoenix', 'Denver'],
  'East Coast': ['New York City', 'Boston', 'Philadelphia', 'Washington DC', 'Miami', 'Atlanta', 'Charlotte', 'Baltimore'],
  'Midwest': ['Chicago', 'Detroit', 'Minneapolis', 'Milwaukee', 'Cleveland', 'Indianapolis', 'Columbus', 'Kansas City'],
  'South': ['Dallas', 'Houston', 'Austin', 'San Antonio', 'Nashville', 'New Orleans', 'Tampa', 'Orlando'],
  'Other': ['Nationwide - Will Travel', 'Remote/Virtual Events Only']
};

interface FormData {
  // Step 1: Register
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Step 2: Profile
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;

  // Physical
  height: string;
  tshirtSize: string;
  pantsSize: string;
  shoeSize: string;
  tattoos: string;

  // About
  howDidYouHear: string;
  referredBy: string;
  yearsExperience: string;
  personality: string;
  vehicle: string;

  // Step 3: Skills
  skills: string[];

  // Step 4: Experience
  promoExperience: string;
  managementExperience: string;
  otherExperience: string;
  previousBrands: string;

  // Step 5: Photos
  photoLinks: string;
  instagram: string;

  // Step 6: Work Areas
  workAreas: string[];
  willingToTravel: string;
}

const initialFormData: FormData = {
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
  photoLinks: '',
  instagram: '',
  workAreas: [],
  willingToTravel: '',
};

export function TalentApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const validateStep = (step: number): boolean => {
    setErrorMessage('');

    switch (step) {
      case 1:
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
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.join(', '),
          workAreas: formData.workAreas.join(', '),
          _subject: `New BA Application: ${formData.firstName} ${formData.lastName}`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSubmitStatus('success');
        setCurrentStep(STEPS.length);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to submit. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input field component
  const InputField = ({ label, name, type = 'text', required = false, placeholder = '', ...props }: any) => (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
        {label} {required && <span className="text-copper">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name as keyof FormData] as string}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors"
        {...props}
      />
    </div>
  );

  // Select field component
  const SelectField = ({ label, name, options, required = false, placeholder = 'Select...' }: any) => (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
        {label} {required && <span className="text-copper">*</span>}
      </label>
      <select
        name={name}
        value={formData[name as keyof FormData] as string}
        onChange={handleInputChange}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-copper/50 focus:outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="" className="bg-charcoal">{placeholder}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="bg-charcoal">{opt}</option>
        ))}
      </select>
    </div>
  );

  // Textarea field component
  const TextareaField = ({ label, name, required = false, placeholder = '', rows = 3 }: any) => (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
        {label} {required && <span className="text-copper">*</span>}
      </label>
      <textarea
        name={name}
        value={formData[name as keyof FormData] as string}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors resize-none"
      />
    </div>
  );

  // Progress bar
  const ProgressBar = () => (
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
  );

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-display text-cream mb-6">Let's Get Started</h3>
            <p className="text-cream/60 mb-6">Enter your basic information to create your profile.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" required placeholder="John" />
              <InputField label="Last Name" name="lastName" required placeholder="Smith" />
              <InputField label="Email" name="email" type="email" required placeholder="john@example.com" />
              <InputField label="Phone" name="phone" type="tel" required placeholder="(555) 123-4567" />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-display text-cream mb-6">Your Profile</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Date of Birth" name="dateOfBirth" type="date" />
              <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Non-Binary', 'Prefer not to say']} />
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="font-mono text-xs uppercase tracking-wider text-copper mb-4">Location</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField label="Address" name="address" placeholder="123 Main St" />
                </div>
                <InputField label="City" name="city" required placeholder="Los Angeles" />
                <SelectField label="State" name="state" required options={US_STATES} />
                <InputField label="Zipcode" name="zipcode" placeholder="90001" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="font-mono text-xs uppercase tracking-wider text-copper mb-4">Physical Details</p>
              <div className="grid md:grid-cols-4 gap-4">
                <InputField label="Height" name="height" placeholder="5'10&quot;" />
                <SelectField label="T-Shirt Size" name="tshirtSize" options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']} />
                <SelectField label="Pants Size" name="pantsSize" options={['24', '26', '28', '30', '32', '34', '36', '38', '40', '42']} />
                <InputField label="Shoe Size" name="shoeSize" placeholder="10" />
              </div>
              <div className="mt-4">
                <SelectField label="Do you have visible tattoos?" name="tattoos" options={['None', 'Yes - can be covered', 'Yes - cannot be covered']} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="font-mono text-xs uppercase tracking-wider text-copper mb-4">About You</p>
              <div className="grid md:grid-cols-2 gap-6">
                <SelectField
                  label="How did you hear about us?"
                  name="howDidYouHear"
                  options={['Indeed', 'LinkedIn', 'Instagram', 'Facebook', 'Google', 'Referral', 'Job Fair', 'Other']}
                />
                <InputField label="If referred, by who?" name="referredBy" placeholder="Name of referrer" />
                <SelectField
                  label="Years in promotions/events"
                  name="yearsExperience"
                  options={['None - Just starting', 'Less than 1 year', '1-2 years', '3-5 years', '5+ years']}
                />
                <InputField label="Vehicle (Make/Model/Year)" name="vehicle" placeholder="Toyota Camry 2020" />
              </div>
              <div className="mt-4">
                <TextareaField
                  label="Tell us about your personality"
                  name="personality"
                  placeholder="Describe yourself - are you outgoing, energetic, detail-oriented?"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
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

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-display text-cream mb-2">Your Experience</h3>
            <p className="text-cream/60 mb-6">Tell us about your relevant experience.</p>

            <TextareaField
              label="Promotional / Brand Ambassador Experience"
              name="promoExperience"
              placeholder="Describe events you've worked, brands you've represented, responsibilities..."
              rows={4}
            />

            <TextareaField
              label="Management / Leadership Experience"
              name="managementExperience"
              placeholder="Have you managed teams, led events, trained staff?"
              rows={3}
            />

            <TextareaField
              label="Other Relevant Experience"
              name="otherExperience"
              placeholder="Hospitality, retail, customer service, performing arts, etc."
              rows={3}
            />

            <TextareaField
              label="Previous Brands / Companies"
              name="previousBrands"
              placeholder="Nike, Red Bull, Apple, Samsung, etc."
              rows={2}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-display text-cream mb-2">Photos & Social Media</h3>
            <p className="text-cream/60 mb-6">Share your portfolio and social presence.</p>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-cream/50 mb-2">
                Photo Links <span className="text-copper">*</span>
              </label>
              <textarea
                name="photoLinks"
                value={formData.photoLinks}
                onChange={handleInputChange}
                placeholder="Paste links to your photos (Google Drive, Dropbox, portfolio website)&#10;&#10;Example:&#10;https://drive.google.com/...&#10;https://instagram.com/yourhandle"
                rows={4}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:border-copper/50 focus:outline-none transition-colors resize-none"
              />
              <p className="text-cream/30 text-xs mt-2">Please include at least 2 professional headshots/full body photos</p>
            </div>

            <InputField
              label="Instagram Handle"
              name="instagram"
              placeholder="@yourhandle"
            />
          </div>
        );

      case 6:
        return (
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

            <SelectField
              label="Willing to travel?"
              name="willingToTravel"
              options={['Local only (within 50 miles)', 'Regional (within state)', 'National (will fly)', 'International']}
            />
          </div>
        );

      case 7:
        return submitStatus === 'success' ? (
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
              <p className="text-cream font-medium">{formData.firstName} {formData.lastName}</p>
              <p className="text-cream/60 text-sm">{formData.email}</p>
              <p className="text-cream/60 text-sm">{formData.city}, {formData.state}</p>
              <p className="text-cream/60 text-sm mt-2">{formData.skills.length} skills selected</p>
              <p className="text-cream/60 text-sm">{formData.workAreas.length} work areas selected</p>
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
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-white/5 rounded-lg p-6 md:p-10">
        <ProgressBar />

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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

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
