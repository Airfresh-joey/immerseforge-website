import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Crown, Star, Wine, Shield, MapPin } from 'lucide-react';
import { Link } from 'wouter';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
    {children}
  </span>
);

export const VIPEvents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'VIP Events & Exclusive Experiences | ImmerseForge';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create unforgettable VIP experiences for your most valuable clients and partners. ImmerseForge produces exclusive events, luxury retreats, and premium brand moments in Los Angeles, New York, Aspen, and destinations worldwide.');
    }
  }, []);

  const benefits = [
    { icon: Crown, title: 'White-Glove Service', desc: 'Every detail curated to exceed expectations' },
    { icon: Star, title: 'Exclusive Access', desc: 'Unique venues, experiences, and moments money can\'t buy' },
    { icon: Wine, title: 'Premium Hospitality', desc: 'World-class catering, accommodations, and amenities' },
    { icon: Shield, title: 'Complete Discretion', desc: 'Privacy and security for high-profile guests' },
  ];

  const services = [
    'Executive retreats & incentive trips',
    'Influencer & celebrity experiences',
    'Private launch events',
    'Client appreciation dinners',
    'Luxury brand journeys',
    'Exclusive venue buyouts',
    'Concierge & hospitality services',
    'Private transportation & logistics',
  ];

  const destinations = [
    'Los Angeles', 'New York', 'Miami', 'Aspen', 'Napa Valley', 'Las Vegas',
    'Scottsdale', 'Park City', 'The Hamptons', 'Palm Beach', 'Malibu', 'Cabo'
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/case-studies/apple-vip.jpg"
            alt="VIP Event"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199, 123, 53, 0.15) 0%, transparent 60%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block font-mono text-copper text-sm tracking-[0.3em] mb-6">
              PREMIUM BRAND MOMENTS
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 leading-[0.95]">
              VIP <GradientText>EXPERIENCES</GradientText>
            </h1>
            <p className="text-xl text-cream/60 max-w-2xl mx-auto mb-10">
              Elevate your most important relationships with exclusive experiences
              that turn clients into advocates and partners into champions.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-8 py-4 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                PLAN YOUR VIP EVENT
                <ArrowRight size={18} />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-charcoal/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
                Experiences Beyond Expectation
              </h2>
              <p className="text-cream/60 text-lg mb-6 leading-relaxed">
                Your most valuable relationships deserve experiences that reflect their importance.
                We create bespoke VIP moments that strengthen bonds, reward loyalty, and create
                memories that last a lifetime.
              </p>
              <p className="text-cream/60 text-lg leading-relaxed">
                From intimate executive dinners to multi-day luxury retreats, every VIP experience
                we produce is meticulously planned and flawlessly executed. We handle the details
                so you can focus on what matters - building relationships.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="p-6 bg-charcoal border border-copper/10 rounded-sm">
                  <benefit.icon className="text-copper mb-4" size={28} />
                  <h3 className="font-display text-cream text-lg mb-2">{benefit.title}</h3>
                  <p className="text-cream/50 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
                VIP Experience Services
              </h2>
              <p className="text-cream/60 text-lg">
                White-glove service for your most discerning guests
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-charcoal/30 border border-copper/10 rounded-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle className="text-copper flex-shrink-0" size={20} />
                  <span className="text-cream">{service}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-24 bg-charcoal/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="text-copper" size={24} />
              <span className="font-mono text-copper text-sm tracking-wider">PREMIER DESTINATIONS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Exclusive Venues Worldwide
            </h2>
            <p className="text-cream/60 text-lg mb-12">
              We produce VIP experiences in the world's most sought-after
              destinations with access to exclusive venues.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {destinations.map((destination, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-charcoal border border-copper/20 rounded-sm text-cream/80 text-sm"
                >
                  {destination}
                </span>
              ))}
              <span className="px-4 py-2 bg-copper/20 border border-copper/40 rounded-sm text-copper text-sm font-semibold">
                + Worldwide
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Create Something Extraordinary
            </h2>
            <p className="text-cream/60 text-lg mb-10">
              Let's design a VIP experience your guests will never forget.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-10 py-5 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                START PLANNING
                <ArrowRight size={18} />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
