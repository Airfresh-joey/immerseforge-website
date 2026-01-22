import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Target, Users, TrendingUp, MapPin } from 'lucide-react';
import { Link } from 'wouter';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
    {children}
  </span>
);

export const BrandActivations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Brand Activations | Experiential Marketing Agency | ImmerseForge';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform your brand with immersive activations that drive engagement. ImmerseForge creates unforgettable brand experiences in Los Angeles, New York, Denver, and nationwide.');
    }
  }, []);

  const benefits = [
    { icon: Target, title: 'Targeted Engagement', desc: 'Reach your exact audience with precision-crafted experiences' },
    { icon: Users, title: 'Face-to-Face Connection', desc: 'Build authentic relationships between your brand and consumers' },
    { icon: TrendingUp, title: 'Measurable ROI', desc: 'Track engagement, leads, and conversions in real-time' },
    { icon: Zap, title: 'Viral Potential', desc: 'Create shareable moments that extend reach beyond the event' },
  ];

  const services = [
    'Retail activations & in-store experiences',
    'Sampling programs & product trials',
    'Interactive brand installations',
    'Mobile marketing tours',
    'Guerrilla marketing campaigns',
    'Sponsorship activations',
    'Consumer engagement events',
    'Brand ambassador programs',
  ];

  const markets = [
    'Los Angeles', 'New York', 'Denver', 'Chicago', 'Miami', 'Dallas',
    'San Francisco', 'Seattle', 'Atlanta', 'Boston', 'Phoenix', 'Las Vegas'
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/case-studies/mrbeast.jpg"
            alt="Brand Activation"
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
              EXPERIENTIAL MARKETING
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 leading-[0.95]">
              BRAND <GradientText>ACTIVATIONS</GradientText>
            </h1>
            <p className="text-xl text-cream/60 max-w-2xl mx-auto mb-10">
              Transform passive audiences into passionate brand advocates through immersive,
              memorable experiences that drive real business results.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-8 py-4 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                START YOUR ACTIVATION
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
                What is a Brand Activation?
              </h2>
              <p className="text-cream/60 text-lg mb-6 leading-relaxed">
                Brand activations are immersive marketing experiences designed to bring your brand
                to life and create meaningful connections with consumers. Unlike traditional advertising,
                activations engage multiple senses and create lasting memories that drive loyalty and advocacy.
              </p>
              <p className="text-cream/60 text-lg leading-relaxed">
                At ImmerseForge, we specialize in creating custom brand activation experiences that
                align with your marketing objectives, target audience, and brand identity. From concept
                to execution, we handle every detail to ensure flawless delivery.
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
                Our Activation Services
              </h2>
              <p className="text-cream/60 text-lg">
                End-to-end brand activation solutions tailored to your goals
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
              <span className="font-mono text-copper text-sm tracking-wider">NATIONWIDE COVERAGE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Activations Across America
            </h2>
            <p className="text-cream/60 text-lg mb-12">
              We execute brand activations in major markets nationwide, with experienced
              teams ready to bring your vision to life anywhere in the country.
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
                + More Markets
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
              Ready to Activate Your Brand?
            </h2>
            <p className="text-cream/60 text-lg mb-10">
              Let's create an unforgettable brand experience that drives results.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-10 py-5 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GET A FREE CONSULTATION
                <ArrowRight size={18} />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
