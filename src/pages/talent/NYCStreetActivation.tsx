import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';
import { TalentApplicationForm } from '../../components/TalentApplicationForm';
import { useEffect, useRef } from 'react';

export function NYCStreetActivation() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'NYC Street Activation - Brand Ambassador | ImmerseForge';
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-copper/15 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-2 bg-copper/20 border border-copper/40 rounded-full text-copper text-sm font-mono uppercase">NYC</span>
              <span className="px-4 py-2 bg-copper/20 border border-copper/40 rounded-full text-copper text-sm font-mono uppercase">Feb 14-15, 2025</span>
              <span className="px-4 py-2 bg-copper/20 border border-copper/40 rounded-full text-copper text-sm font-mono uppercase">$240 Flat Rate</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6">
              BRAND AMBASSADOR<br />
              <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
                NYC STREET ACTIVATION
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cream/70 max-w-2xl mx-auto mb-10 font-serif">
              Luxury Streetwear Brand Launch Activation
            </p>
            <motion.button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-copper hover:bg-copper-light text-black font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Quick Details */}
      <section className="py-12 border-y border-white/5 bg-charcoal/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Calendar, label: 'Dates', value: 'Feb 14-15, 2025' },
              { icon: Clock, label: 'Shift', value: '4 hours/day' },
              { icon: MapPin, label: 'Location', value: 'Manhattan, Brooklyn, Queens' },
              { icon: DollarSign, label: 'Pay', value: '$240 flat rate' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-8 h-8 text-copper mx-auto mb-3" />
                <div className="text-sm font-mono uppercase tracking-wider text-cream/50 mb-1">
                  {item.label}
                </div>
                <div className="text-lg text-cream font-display">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display text-cream mb-6">What You'll Do</h2>
              <p className="text-cream/70 text-lg leading-relaxed mb-12">
                Represent a premium clothing brand in a high-energy NYC street campaign. You'll distribute branded tote bags, engage pedestrians with authentic conversations, and drive QR code sign-ups to the brand's exclusive online platform. This is hands-on, culture-forward marketing—not flyering.
              </p>

              <h2 className="text-3xl md:text-4xl font-display text-cream mb-6">Who We're Looking For</h2>
              <div className="space-y-4 mb-12">
                {[
                  { title: 'Experienced', desc: 'Previous street team, brand ambassador, or experiential marketing work' },
                  { title: 'Confident Communicator', desc: 'Comfortable approaching strangers in busy NYC environments' },
                  { title: 'Brand-Aligned', desc: 'Polished, personable, and able to deliver talking points naturally' },
                  { title: 'Reliable', desc: 'Punctual, detail-oriented, and committed to both days' },
                  { title: 'Physically Ready', desc: 'Able to stand and walk for extended periods' },
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-charcoal/30 border border-white/5 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-copper flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-cream font-semibold">{req.title}:</span>
                      <span className="text-cream/70 ml-2">{req.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-copper/10 border border-copper/30 rounded-lg mb-12">
                <h3 className="text-xl font-display text-cream mb-4">Important Information</h3>
                <ul className="space-y-3 text-cream/70">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-copper rounded-full"></span>
                    <span><strong className="text-copper">Mandatory Prep:</strong> Virtual training call on February 10</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-copper rounded-full"></span>
                    <span><strong className="text-copper">Required:</strong> Return all remaining materials at end of activation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-copper rounded-full"></span>
                    <span><strong className="text-copper">Start Time:</strong> 11:00 AM–12:00 PM (confirmed week of)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-copper rounded-full"></span>
                    <span><strong className="text-copper">Payment:</strong> Within 7 days of activation completion</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} id="apply" className="py-24 bg-charcoal/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-copper mb-4">
              Apply Now
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-4">
              Join This Activation
            </h2>
            <p className="text-cream/60 max-w-xl mx-auto">
              Fill out the form below or email your resume to{' '}
              <a href="mailto:crew@immerseforge.com" className="text-copper hover:underline">
                crew@immerseforge.com
              </a>
            </p>
          </motion.div>

          <TalentApplicationForm />
        </div>
      </section>
    </div>
  );
}
