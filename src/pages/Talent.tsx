import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Calendar, DollarSign, Briefcase, MapPin, Star, Sparkles, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { TalentApplicationForm } from '../components/TalentApplicationForm';
import { Link } from 'wouter';
import type { WebsiteContent } from '../hooks/useWebsiteContent';

interface TalentProps {
  content: WebsiteContent;
}

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {isInView ? count : 0}{suffix}
    </span>
  );
};

import React from 'react';

const positions = [
  {
    id: 1,
    title: 'Brand Ambassadors',
    subtitle: 'The Face of the Brand',
    description: 'Represent top-tier brands at events, trade shows, and activations. Engage audiences, demonstrate products, and create memorable interactions.',
    icon: Star,
    requirements: ['Excellent communication skills', 'Professional appearance', 'Reliable & punctual', 'Event experience preferred'],
    pay: '$25-50/hr'
  },
  {
    id: 2,
    title: 'Event Staff',
    subtitle: 'Behind the Scenes',
    description: 'Support production and logistics for large-scale activations. Setup, teardown, crowd management, and ensuring flawless execution.',
    icon: Users,
    requirements: ['Physical stamina', 'Team player', 'Problem solver', 'Flexible schedule'],
    pay: '$20-35/hr'
  },
  {
    id: 3,
    title: 'Experiential Specialists',
    subtitle: 'Tech & Innovation',
    description: 'Lead interactive experiences including VR/AR demos, tech activations, and specialized product demonstrations for discerning audiences.',
    icon: Sparkles,
    requirements: ['Tech-savvy', 'Quick learner', 'Public speaking skills', 'Previous demo experience'],
    pay: '$35-75/hr'
  }
];

const benefits = [
  { icon: DollarSign, title: 'Competitive Pay', description: '$20-75/hr based on role and experience' },
  { icon: Calendar, title: 'Flexible Schedule', description: 'Work when you want, where you want' },
  { icon: Briefcase, title: 'Top Brands', description: 'Work with Fortune 500 companies' },
  { icon: Zap, title: 'Growth', description: 'Training, development & advancement' },
  { icon: MapPin, title: 'Travel', description: 'Opportunities across 15+ markets' },
  { icon: Star, title: 'Community', description: 'Join a team of 1,000+ professionals' }
];

const stats = [
  { value: 1000, suffix: '+', label: 'Trained Professionals' },
  { value: 15, suffix: '+', label: 'Markets Nationwide' },
  { value: 100, suffix: '+', label: 'Events Per Year' },
  { value: 50, suffix: '+', label: 'Brand Partners' }
];

export function Talent({ content }: TalentProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-copper/10 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-copper mb-6">
              Careers
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-cream mb-6">
              JOIN THE<br />
              <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
                FORGE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cream/70 max-w-2xl mx-auto mb-10 font-serif">
              Become part of the team that creates unforgettable brand experiences for the world's most innovative companies.
            </p>
            <motion.button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-copper hover:bg-copper-light text-black font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-copper rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-charcoal/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-display text-copper mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-mono uppercase tracking-wider text-cream/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunity */}
      <section className="py-24 bg-gradient-to-b from-copper/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-copper mb-4">
              Featured Opportunity
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-cream">
              Now Hiring
            </h2>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-lg bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-copper/30"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-copper/20 border border-copper/40 rounded-full text-copper text-xs font-mono uppercase">NYC</span>
              <span className="px-3 py-1 bg-copper/20 border border-copper/40 rounded-full text-copper text-xs font-mono uppercase">Feb 14-15</span>
              <span className="px-3 py-1 bg-copper/20 border border-copper/40 rounded-full text-copper text-xs font-mono uppercase">$240 Flat Rate</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-display text-cream mb-4">
              Brand Ambassador – NYC Street Activation
            </h3>
            <p className="text-copper font-mono text-sm mb-6">Luxury Streetwear Brand Launch Activation</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-cream/50 text-sm font-mono uppercase mb-2">Dates</p>
                <p className="text-cream">Saturday–Sunday, February 14–15</p>
              </div>
              <div>
                <p className="text-cream/50 text-sm font-mono uppercase mb-2">Shift</p>
                <p className="text-cream">4 hours per day | Start: 11:00 AM–12:00 PM</p>
              </div>
              <div>
                <p className="text-cream/50 text-sm font-mono uppercase mb-2">Location</p>
                <p className="text-cream">High-traffic Manhattan, Brooklyn, Queens</p>
              </div>
              <div>
                <p className="text-cream/50 text-sm font-mono uppercase mb-2">Compensation</p>
                <p className="text-cream">$240 flat rate (both days) | Paid within 7 days</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-display text-cream mb-4">What You'll Do</h4>
              <p className="text-cream/70 leading-relaxed">
                Represent a premium clothing brand in a high-energy NYC street campaign. You'll distribute branded tote bags, engage pedestrians with authentic conversations, and drive QR code sign-ups to the brand's exclusive online platform. This is hands-on, culture-forward marketing—not flyering.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-display text-cream mb-4">Who We're Looking For</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Experienced: Previous street team, brand ambassador, or experiential marketing work',
                  'Confident Communicator: Comfortable approaching strangers in busy NYC environments',
                  'Brand-Aligned: Polished, personable, and able to deliver talking points naturally',
                  'Reliable: Punctual, detail-oriented, and committed to both days',
                  'Physically Ready: Able to stand and walk for extended periods'
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
                    <span className="text-cream/70 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-black/30 rounded-lg mb-8">
              <p className="text-cream/70 text-sm">
                <span className="text-copper font-semibold">Mandatory:</span> Virtual training call on February 10<br />
                <span className="text-copper font-semibold">Required:</span> Return all remaining materials at end of activation
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/talent/nyc-street-activation">
                <motion.a
                  className="inline-flex items-center justify-center gap-3 bg-copper hover:bg-copper-light text-black font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply for This Position
                  <ArrowRight size={18} />
                </motion.a>
              </Link>
              <a
                href="mailto:crew@immerseforge.com?subject=NYC Street Activation Application"
                className="inline-flex items-center justify-center gap-3 border border-copper text-copper hover:bg-copper/10 font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all"
              >
                Email Application
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-copper mb-4">
              Open Positions
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-cream">
              Find Your Role
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.id}
                className="group relative p-8 rounded-lg bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-white/5 hover:border-copper/30 transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center mb-6 group-hover:bg-copper/20 transition-colors">
                  <position.icon className="w-7 h-7 text-copper" />
                </div>

                {/* Content */}
                <p className="font-mono text-xs uppercase tracking-wider text-copper/70 mb-2">
                  {position.subtitle}
                </p>
                <h3 className="text-2xl font-display text-cream mb-4">
                  {position.title}
                </h3>
                <p className="text-cream/60 mb-6 font-serif leading-relaxed">
                  {position.description}
                </p>

                {/* Requirements */}
                <div className="space-y-2 mb-6">
                  {position.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-cream/50">
                      <div className="w-1 h-1 bg-copper rounded-full" />
                      {req}
                    </div>
                  ))}
                </div>

                {/* Pay */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="font-mono text-sm text-cream/50">Pay Range</span>
                  <span className="font-mono text-lg text-copper">{position.pay}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-charcoal/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-copper mb-4">
              Why Join Us
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-cream">
              What We Offer
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="p-6 rounded-lg bg-black/30 border border-white/5 hover:border-copper/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <benefit.icon className="w-8 h-8 text-copper mb-4" />
                <h3 className="text-lg font-display text-cream mb-2">{benefit.title}</h3>
                <p className="text-sm text-cream/50 font-serif">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section ref={formRef} id="apply" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-copper mb-4">
              Start Your Journey
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-cream mb-4">
              Apply Now
            </h2>
            <p className="text-cream/60 max-w-xl mx-auto font-serif">
              Join our network of talented professionals creating unforgettable experiences across the nation.
            </p>
          </motion.div>

          <TalentApplicationForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-charcoal/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Questions? Let's Talk.
            </h2>
            <p className="text-lg text-cream/60 mb-8 max-w-xl mx-auto font-serif">
              Reach out to our talent team for more information about opportunities.
            </p>
            <a
              href={`mailto:${content.site.contact.email}`}
              className="inline-flex items-center gap-3 border border-copper text-copper hover:bg-copper hover:text-black font-mono text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300"
            >
              Contact Talent Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
