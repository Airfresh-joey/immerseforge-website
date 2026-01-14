import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import type { WebsiteContent } from '../hooks/useWebsiteContent';

interface AboutProps {
  content: WebsiteContent;
}

// Capability to route mapping
const capabilityRoutes: Record<string, string> = {
  'Brand Activations': '/services/brand-activations',
  'Trade Show Production': '/services/trade-show-production',
  'Pop-Up Experiences': '/services/pop-up-experiences',
  'VIP Events': '/services/vip-events',
  'Product Launches': '/services/product-launches',
  'Festival Activations': '/services/festival-activations',
  'Experiential Campaigns': '/services/experiential-campaigns',
  'Brand Ambassador Programs': '/services/brand-ambassador-programs',
};

export const About = ({ content }: AboutProps) => {
  const { about } = content.pages;

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-sm uppercase tracking-wider text-copper mb-4">
              {about.label}
            </p>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-8">
              {about.title}
            </h1>
            <blockquote className="text-2xl md:text-3xl font-serif italic text-cream-muted leading-relaxed">
              "{about.quote}"
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Forge Method */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              {about.forgeMethod.title}
            </h2>
            <p className="text-lg text-cream-muted leading-relaxed">
              {about.forgeMethod.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-12 text-center">
              Our Capabilities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {about.capabilities.map((capability: string, index: number) => {
                const route = capabilityRoutes[capability] || '/services/brand-activations';
                return (
                  <Link key={index} href={route}>
                    <motion.div
                      className="group p-6 bg-charcoal-light border border-copper/20 hover:border-copper/40 hover:bg-copper/5 transition-all text-center cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -3 }}
                    >
                      <span className="font-mono text-sm text-cream group-hover:text-copper transition-colors">
                        {capability}
                      </span>
                      <ArrowRight className="w-4 h-4 text-copper mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-display text-cream mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Forge Masters
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {about.leadership.map((leader: any, index: number) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Avatar Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-charcoal-medium to-black mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-copper/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-7xl font-display text-copper/30">
                      {leader.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="mb-2">
                  <div className="inline-block px-3 py-1 bg-copper/10 border border-copper/30 mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-copper">
                      {leader.nickname}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-display text-cream mb-1">
                  {leader.name}
                </h3>

                <p className="font-mono text-sm uppercase tracking-wider text-cream-muted mb-4">
                  {leader.title}
                </p>

                <p className="text-cream-muted leading-relaxed">
                  {leader.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-cream-muted mb-8">
              Let's discuss how we can forge an unforgettable experience for your brand.
            </p>
            <a
              href={`mailto:${content.site.contact.email}`}
              className="bg-copper hover:bg-copper-light text-black font-mono text-sm uppercase tracking-wider px-8 py-4 transition-colors inline-block"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
