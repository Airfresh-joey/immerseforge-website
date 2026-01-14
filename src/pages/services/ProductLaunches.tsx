import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Rocket, Megaphone, Video, BarChart3, MapPin } from 'lucide-react';
import { Link } from 'wouter';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
    {children}
  </span>
);

export const ProductLaunches = () => {
  useEffect(() => {
    document.title = 'Product Launch Events & Brand Reveals | ImmerseForge';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Launch your product with impact. ImmerseForge produces memorable product launch events, brand reveals, and go-to-market activations in Los Angeles, New York, San Francisco, and cities nationwide.');
    }
  }, []);

  const benefits = [
    { icon: Rocket, title: 'Launch Day Impact', desc: 'Create buzz that carries your product into the market' },
    { icon: Megaphone, title: 'Media & Influencer', desc: 'Strategic guest lists that amplify your message' },
    { icon: Video, title: 'Content Capture', desc: 'Professional documentation for ongoing marketing' },
    { icon: BarChart3, title: 'Measurable Results', desc: 'Track impressions, engagement, and conversions' },
  ];

  const services = [
    'Product reveal events & brand unveilings',
    'Press & media launch events',
    'Influencer preview experiences',
    'Retail launch activations',
    'Virtual & hybrid product launches',
    'Demo stations & hands-on experiences',
    'Launch party production',
    'Go-to-market activation campaigns',
  ];

  const markets = [
    'Los Angeles', 'New York', 'San Francisco', 'Austin', 'Chicago', 'Seattle',
    'Miami', 'Boston', 'Denver', 'Atlanta', 'Dallas', 'Las Vegas'
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
              LAUNCH EVENT PRODUCTION
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 leading-[0.95]">
              PRODUCT <GradientText>LAUNCHES</GradientText>
            </h1>
            <p className="text-xl text-cream/60 max-w-2xl mx-auto mb-10">
              Give your product the debut it deserves. We create launch experiences
              that generate buzz, drive media coverage, and accelerate market entry.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-8 py-4 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                PLAN YOUR LAUNCH
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
                Launch with Maximum Impact
              </h2>
              <p className="text-cream/60 text-lg mb-6 leading-relaxed">
                A great product deserves a great launch. We produce launch events that
                capture attention, generate media coverage, and create the momentum your
                product needs to succeed in the market.
              </p>
              <p className="text-cream/60 text-lg leading-relaxed">
                From intimate press previews to large-scale consumer reveals, we handle
                every aspect of your product launch - venue selection, production design,
                media coordination, and flawless day-of execution.
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
                Full-Service Launch Production
              </h2>
              <p className="text-cream/60 text-lg">
                Everything you need to make your product launch unforgettable
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
              <span className="font-mono text-copper text-sm tracking-wider">LAUNCH MARKETS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Launch Anywhere
            </h2>
            <p className="text-cream/60 text-lg mb-12">
              We produce product launches in key markets nationwide, with local
              expertise and national reach.
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
                + Any Market
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
              Ready for Liftoff?
            </h2>
            <p className="text-cream/60 text-lg mb-10">
              Let's create a launch that puts your product in the spotlight.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-10 py-5 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GET A FREE QUOTE
                <ArrowRight size={18} />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
