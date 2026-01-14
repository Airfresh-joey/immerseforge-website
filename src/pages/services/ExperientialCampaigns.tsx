import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Globe, Layers, Target, TrendingUp, MapPin } from 'lucide-react';
import { Link } from 'wouter';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-copper via-amber to-copper-light bg-clip-text text-transparent">
    {children}
  </span>
);

export const ExperientialCampaigns = () => {
  useEffect(() => {
    document.title = 'Experiential Marketing Campaigns | ImmerseForge';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Launch integrated experiential marketing campaigns that drive real results. ImmerseForge creates multi-market, multi-touchpoint brand campaigns across Los Angeles, New York, Chicago, and nationwide.');
    }
  }, []);

  const benefits = [
    { icon: Globe, title: 'Multi-Market Reach', desc: 'Coordinated campaigns across multiple cities and regions' },
    { icon: Layers, title: 'Integrated Approach', desc: 'Seamless blend of physical and digital touchpoints' },
    { icon: Target, title: 'Strategic Targeting', desc: 'Precision audience segmentation and activation' },
    { icon: TrendingUp, title: 'Scalable Impact', desc: 'Campaigns designed to grow with your objectives' },
  ];

  const services = [
    'Multi-market campaign strategy',
    'Integrated experiential planning',
    'Mobile marketing tours',
    'Sampling & trial programs',
    'Street team deployments',
    'Guerrilla marketing tactics',
    'Digital-physical integration',
    'Campaign analytics & optimization',
  ];

  const markets = [
    'Los Angeles', 'New York', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'
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
              INTEGRATED MARKETING
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 leading-[0.95]">
              EXPERIENTIAL <GradientText>CAMPAIGNS</GradientText>
            </h1>
            <p className="text-xl text-cream/60 max-w-2xl mx-auto mb-10">
              Go beyond single events. We design and execute integrated experiential
              campaigns that build brand momentum across markets and touchpoints.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-8 py-4 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                START YOUR CAMPAIGN
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
                Campaigns That Scale
              </h2>
              <p className="text-cream/60 text-lg mb-6 leading-relaxed">
                One great activation can create a moment. A strategic campaign creates
                movement. We design experiential marketing campaigns that work together -
                each touchpoint building on the last to create compounding brand impact.
              </p>
              <p className="text-cream/60 text-lg leading-relaxed">
                From national mobile tours to coordinated multi-city activations, we
                provide the strategy, production, and execution to take your experiential
                marketing to the next level. Every element is designed to work harder
                and deliver measurable results.
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
                Campaign Services
              </h2>
              <p className="text-cream/60 text-lg">
                Comprehensive experiential campaign solutions from strategy to execution
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
              <span className="font-mono text-copper text-sm tracking-wider">CAMPAIGN MARKETS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Nationwide Campaign Reach
            </h2>
            <p className="text-cream/60 text-lg mb-12">
              We execute coordinated campaigns across all major US markets with
              local teams and national consistency.
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
                + 200 More Markets
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
              Ready to Launch a Campaign?
            </h2>
            <p className="text-cream/60 text-lg mb-10">
              Let's build an experiential marketing campaign that moves the needle.
            </p>
            <Link href="/contact">
              <motion.a
                className="inline-flex items-center gap-3 bg-gradient-to-r from-copper to-amber text-black font-mono font-semibold tracking-wider px-10 py-5 rounded-sm hover:from-amber hover:to-copper transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GET A CAMPAIGN PROPOSAL
                <ArrowRight size={18} />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
