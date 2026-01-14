import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Store, Sparkles, Camera, Clock, MapPin } from 'lucide-react';
import { Link } from 'wouter';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
    {children}
  </span>
);

export const PopUpExperiences = () => {
  useEffect(() => {
    document.title = 'Pop-Up Experiences & Retail Activations | ImmerseForge';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create buzz with immersive pop-up experiences and temporary retail activations. ImmerseForge designs and produces Instagram-worthy pop-ups in Los Angeles, New York, Miami, and cities nationwide.');
    }
  }, []);

  const benefits = [
    { icon: Store, title: 'Turnkey Pop-Ups', desc: 'Full design, build, and operation of temporary brand spaces' },
    { icon: Sparkles, title: 'Instagrammable Moments', desc: 'Photo-worthy installations that drive organic social sharing' },
    { icon: Camera, title: 'Content Creation', desc: 'Built-in content opportunities for influencers and customers' },
    { icon: Clock, title: 'Flexible Duration', desc: 'From one-day activations to month-long installations' },
  ];

  const services = [
    'Custom pop-up shop design & build',
    'Location scouting & permitting',
    'Interactive brand installations',
    'Product sampling experiences',
    'Immersive photo environments',
    'Queue management & crowd flow',
    'Staffing & brand ambassador teams',
    'Real-time analytics & reporting',
  ];

  const markets = [
    'Los Angeles', 'New York', 'Miami', 'Chicago', 'Austin', 'Nashville',
    'San Francisco', 'Seattle', 'Denver', 'Portland', 'Brooklyn', 'Santa Monica'
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal" />
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
              TEMPORARY BRAND SPACES
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 leading-[0.95]">
              POP-UP <GradientText>EXPERIENCES</GradientText>
            </h1>
            <p className="text-xl text-cream/60 max-w-2xl mx-auto mb-10">
              Create buzz, drive foot traffic, and generate shareable moments with
              immersive pop-up experiences that put your brand in the spotlight.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-8 py-4 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                LAUNCH YOUR POP-UP
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
                Why Pop-Up Experiences?
              </h2>
              <p className="text-cream/60 text-lg mb-6 leading-relaxed">
                Pop-ups create urgency. Limited-time experiences drive immediate action and
                generate organic buzz that traditional retail can't match. They're the perfect
                way to test new markets, launch products, or create viral brand moments.
              </p>
              <p className="text-cream/60 text-lg leading-relaxed">
                From intimate brand lounges to large-scale experiential retail spaces, we
                handle every detail - concept development, design, fabrication, permitting,
                staffing, and teardown. You get a turnkey experience that makes headlines.
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
                Full-Service Pop-Up Production
              </h2>
              <p className="text-cream/60 text-lg">
                Everything you need to create an unforgettable temporary experience
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

      {/* Markets Section */}
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
              <span className="font-mono text-copper text-sm tracking-wider">POP-UP HOTSPOTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Prime Locations Nationwide
            </h2>
            <p className="text-cream/60 text-lg mb-12">
              We produce pop-ups in the most sought-after neighborhoods and
              high-traffic locations across the country.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {markets.map((market, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-charcoal border border-copper/20 rounded-sm text-cream/80 text-sm"
                >
                  {market}
                </span>
              ))}
              <span className="px-4 py-2 bg-copper/20 border border-copper/40 rounded-sm text-copper text-sm font-semibold">
                + Anywhere
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
              Ready to Pop Up?
            </h2>
            <p className="text-cream/60 text-lg mb-10">
              Let's create a temporary experience with permanent impact.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-10 py-5 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GET STARTED
                <ArrowRight size={18} />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
