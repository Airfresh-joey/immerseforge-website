import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import type { WebsiteContent } from '../hooks/useWebsiteContent';

interface ContactProps {
  content: WebsiteContent;
}

// Animated gradient text component
const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
    {children}
  </span>
);

export const Contact = ({ content }: ContactProps) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mlggdrdr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199, 123, 53, 0.2) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block font-mono text-copper text-sm tracking-[0.3em] mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              GET IN TOUCH
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-cream mb-6 leading-[0.95]">
              LET'S <GradientText>BUILD</GradientText>
              <br />
              SOMETHING
            </h1>
            <p className="text-xl text-cream/60 max-w-2xl mx-auto">
              Ready to create an unforgettable brand experience? Tell us about your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display text-cream mb-8">
                Start the Conversation
              </h2>
              <p className="text-cream/60 text-lg mb-12 leading-relaxed">
                Whether you're planning a major brand activation, need event staffing,
                or want to discuss a custom experiential campaign, we're here to help
                bring your vision to life.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-copper/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-copper" size={20} />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-copper tracking-wider mb-1">EMAIL</h3>
                    <a
                      href={`mailto:${content.site.contact.email}`}
                      className="text-cream hover:text-copper transition-colors"
                    >
                      {content.site.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-copper/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-copper" size={20} />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-copper tracking-wider mb-1">PHONE</h3>
                    <a
                      href={`tel:${content.site.contact.phone?.replace(/[^0-9]/g, '')}`}
                      className="text-cream hover:text-copper transition-colors"
                    >
                      {content.site.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-copper/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-copper" size={20} />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-copper tracking-wider mb-1">LOCATIONS</h3>
                    <p className="text-cream">{content.site.contact.location}</p>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-16 p-8 bg-charcoal/50 border border-copper/10 rounded-sm">
                <h3 className="font-display text-xl text-cream mb-4">What Happens Next?</h3>
                <ul className="space-y-3 text-cream/60">
                  <li className="flex items-start gap-3">
                    <span className="text-copper font-mono text-sm">01</span>
                    <span>We'll review your inquiry within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-copper font-mono text-sm">02</span>
                    <span>Schedule a discovery call to discuss your vision</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-copper font-mono text-sm">03</span>
                    <span>Receive a custom proposal tailored to your needs</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {formState === 'success' ? (
                <motion.div
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-charcoal/30 border border-copper/20 rounded-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-copper/20 flex items-center justify-center mb-6">
                    <CheckCircle className="text-copper" size={40} />
                  </div>
                  <h3 className="text-2xl font-display text-cream mb-4">Message Sent!</h3>
                  <p className="text-cream/60 mb-8">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="font-mono text-sm text-copper hover:text-copper-light transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs text-cream/60 tracking-wider mb-2">
                        YOUR NAME <span className="text-copper">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="w-full bg-charcoal/50 border border-copper/20 rounded-sm px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-cream/60 tracking-wider mb-2">
                        EMAIL <span className="text-copper">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full bg-charcoal/50 border border-copper/20 rounded-sm px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs text-cream/60 tracking-wider mb-2">
                        COMPANY
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="w-full bg-charcoal/50 border border-copper/20 rounded-sm px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-cream/60 tracking-wider mb-2">
                        PROJECT BUDGET
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-charcoal/50 border border-copper/20 rounded-sm px-4 py-3 text-cream focus:outline-none focus:border-copper transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select budget range...</option>
                        <option value="Under $10k">Under $10,000</option>
                        <option value="$10k - $25k">$10,000 - $25,000</option>
                        <option value="$25k - $50k">$25,000 - $50,000</option>
                        <option value="$50k - $100k">$50,000 - $100,000</option>
                        <option value="$100k+">$100,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-cream/60 tracking-wider mb-2">
                      TELL US ABOUT YOUR PROJECT <span className="text-copper">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Describe your event, goals, timeline, and any specific requirements..."
                      className="w-full bg-charcoal/50 border border-copper/20 rounded-sm px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-copper transition-colors resize-none"
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
                      <p className="text-red-400 text-sm">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-8 py-4 rounded-sm hover:from-amber hover:to-copper transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-cream/40 text-xs">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or Additional CTA */}
      <section className="py-20 bg-charcoal/30 border-t border-copper/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-cream mb-6">
              Prefer to Talk?
            </h2>
            <p className="text-cream/60 mb-8">
              Sometimes a conversation is the best way to start. Reach out directly.
            </p>
            <a
              href={`mailto:${content.site.contact.email}`}
              className="inline-flex items-center gap-2 font-mono text-copper hover:text-copper-light transition-colors"
            >
              <Send size={18} />
              {content.site.contact.email}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
