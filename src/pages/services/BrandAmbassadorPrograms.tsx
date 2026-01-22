import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, GraduationCap, Award, HeartHandshake, MapPin } from 'lucide-react';
import { Link } from 'wouter';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
    {children}
  </span>
);

export const BrandAmbassadorPrograms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Brand Ambassador Programs & Event Staffing | ImmerseForge';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional brand ambassador programs and event staffing nationwide. ImmerseForge provides trained promotional talent, product specialists, and experiential staff in Los Angeles, New York, Miami, and cities across America.');
    }
  }, []);

  const benefits = [
    { icon: Users, title: '1,000+ Trained Staff', desc: 'Pre-vetted, professional brand ambassadors ready to deploy' },
    { icon: GraduationCap, title: 'Custom Training', desc: 'Brand-specific training programs for every activation' },
    { icon: Award, title: 'Quality Guaranteed', desc: 'Rigorous standards and performance accountability' },
    { icon: HeartHandshake, title: 'True Brand Extensions', desc: 'Staff who authentically represent your brand values' },
  ];

  const services = [
    'Brand ambassador recruitment & vetting',
    'Custom training program development',
    'On-site team management',
    'Product demonstration specialists',
    'Promotional models & talent',
    'Event hosts & emcees',
    'Street team deployments',
    'Ongoing program management',
  ];

  const markets = [
    'Los Angeles', 'New York', 'Miami', 'Chicago', 'Dallas', 'Houston',
    'Atlanta', 'Boston', 'Denver', 'Seattle', 'San Francisco', 'Phoenix'
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/case-studies/formula-1.jpg"
            alt="Brand Ambassador Program"
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
              HUMAN BRAND EXTENSIONS
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 leading-[0.95]">
              BRAND <GradientText>AMBASSADORS</GradientText>
            </h1>
            <p className="text-xl text-cream/60 max-w-2xl mx-auto mb-10">
              Your brand's face in the field. We recruit, train, and deploy professional
              brand ambassadors who become authentic extensions of your brand.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-8 py-4 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                BUILD YOUR TEAM
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
                More Than Just Staff
              </h2>
              <p className="text-cream/60 text-lg mb-6 leading-relaxed">
                The people representing your brand matter. A great experiential activation
                can be undermined by unprepared staff. We provide brand ambassadors who are
                trained, professional, and genuinely invested in your brand's success.
              </p>
              <p className="text-cream/60 text-lg leading-relaxed">
                From one-day activations to ongoing ambassador programs, we handle
                recruitment, training, management, and quality assurance. Our staff
                don't just show up - they show up prepared, enthusiastic, and ready
                to represent your brand at the highest level.
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
                Ambassador Program Services
              </h2>
              <p className="text-cream/60 text-lg">
                End-to-end brand ambassador solutions for every need
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
              <span className="font-mono text-copper text-sm tracking-wider">STAFF MARKETS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Nationwide Talent Network
            </h2>
            <p className="text-cream/60 text-lg mb-12">
              We have pre-vetted brand ambassadors ready to deploy in every major
              market across the country.
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
                + 100 More Markets
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
              Ready to Staff Your Next Event?
            </h2>
            <p className="text-cream/60 text-lg mb-10">
              Let's build a brand ambassador team that truly represents your brand.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-10 py-5 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GET A STAFFING QUOTE
                <ArrowRight size={18} />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
