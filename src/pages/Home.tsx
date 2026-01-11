import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Compass, Users, Play, Quote } from 'lucide-react';
import type { WebsiteContent } from '../hooks/useWebsiteContent';
import { useRef } from 'react';

// Ember particle component
const Ember = ({ delay, left, bottom }: { delay: number; left: string; bottom: string }) => (
  <div
    className="ember"
    aria-hidden="true"
    style={{
      left,
      bottom,
      animationDelay: `${delay}s`,
    }}
  />
);

interface HomeProps {
  content: WebsiteContent;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Layers,
  Sparkles,
  Compass,
  Users,
};

export const Home = ({ content }: HomeProps) => {
  const { home } = content.pages;
  const heroBackground = content.assets?.images?.hero_background;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="overflow-hidden bg-black">
      {/* Hero Section - Full Screen Cinematic */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          {heroBackground && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/${heroBackground})` }}
            />
          )}
          {/* Layered Overlays for Depth */}
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(at 20% 80%, rgba(199, 123, 53, 0.2) 0%, transparent 50%),
                radial-gradient(at 80% 20%, rgba(244, 166, 56, 0.1) 0%, transparent 50%),
                radial-gradient(at 50% 50%, transparent 0%, rgba(5, 5, 5, 0.4) 100%)
              `
            }}
          />
        </motion.div>

        {/* Floating Ember Particles */}
        <Ember delay={0} left="10%" bottom="20%" />
        <Ember delay={2} left="30%" bottom="10%" />
        <Ember delay={4} left="50%" bottom="30%" />
        <Ember delay={1} left="70%" bottom="15%" />
        <Ember delay={3} left="85%" bottom="25%" />
        <Ember delay={5} left="20%" bottom="40%" />
        <Ember delay={6} left="60%" bottom="5%" />
        <Ember delay={7} left="45%" bottom="45%" />
        <Ember delay={2.5} left="75%" bottom="35%" />
        <Ember delay={4.5} left="15%" bottom="8%" />

        {/* Hero Content - Centered */}
        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="font-mono text-xs tracking-[0.4em] text-copper uppercase">
              {home.hero.tagline}
            </span>
          </motion.div>

          {/* Main Title - Large Centered Split */}
          <div className="mb-6">
            <div className="overflow-hidden">
              <motion.h1
                className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-display tracking-[0.05em] text-cream leading-[0.9]"
                initial={{ y: 150 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.25, 0.1, 0, 1]
                }}
              >
                IMMERSE
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-display tracking-[0.05em] text-copper leading-[0.9]"
                initial={{ y: 150 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.45,
                  ease: [0.25, 0.1, 0, 1]
                }}
              >
                FORGE
              </motion.h1>
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-cream/60 font-serif italic mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            We forge experiences that live in memory.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-cream/40 uppercase mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {home.hero.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <a
              href="#contact"
              className="group relative bg-copper hover:bg-copper-light text-black font-mono text-sm tracking-wider px-10 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              <span>{home.hero.cta}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.span
            className="font-mono text-[10px] tracking-[0.4em] text-cream/40 uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-copper to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Client Logo Bar */}
      {home.clients && (
        <section className="py-16 border-y border-white/5 bg-charcoal/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.4em] text-cream/40 uppercase mb-8">
                {home.clients.label}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {home.clients.logos.map((logo: string, index: number) => (
                  <motion.span
                    key={logo}
                    className="font-display text-xl md:text-2xl text-cream/20 hover:text-cream/50 transition-colors duration-300 cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {logo}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Manifesto Section */}
      {home.manifesto && (
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/20 to-black" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-8 block">
                  {home.manifesto.label}
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-cream mb-8 leading-[1.1]">
                  {home.manifesto.title}
                </h2>
                <p className="text-xl md:text-2xl text-cream/60 leading-relaxed max-w-4xl">
                  {home.manifesto.description}
                </p>
              </motion.div>

              {/* Manifesto Stats */}
              <motion.div
                className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {home.manifesto.stats.map((stat: { value: string; label: string }, index: number) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="text-3xl md:text-5xl font-display text-copper mb-2">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Work Section */}
      <section id="work" className="py-32 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-4 block">
                {home.featured?.label || "RECENT OBSESSIONS"}
              </span>
              <h2 className="text-5xl md:text-7xl font-display text-cream">
                {home.featured?.title || "Work That Haunts"}
              </h2>
            </div>
            <a
              href="/work"
              className="group flex items-center gap-2 text-cream/60 hover:text-copper transition-colors mt-6 md:mt-0"
            >
              <span className="font-mono text-sm tracking-wider">View All Work</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </a>
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(home.featured?.projects || []).slice(0, 3).map((project: any, index: number) => (
              <motion.div
                key={project.id}
                className={`group relative overflow-hidden ${index === 0 ? 'lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`relative ${index === 0 ? 'aspect-[21/9]' : 'aspect-video'} overflow-hidden bg-charcoal-light`}>
                  {project.image && (
                    <img
                      src={`/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Project Info Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-copper uppercase mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display text-cream mb-2">
                      {project.title}
                    </h3>
                    <p className="text-cream/60 max-w-lg mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    {project.result && (
                      <p className="font-mono text-xs text-copper/80">
                        {project.result}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-4 block">
              CAPABILITIES
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-cream">
              What We Forge
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {home.services.map((service: any, index: number) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  className="group relative p-8 md:p-12 bg-charcoal/50 hover:bg-charcoal border-l-2 border-transparent hover:border-copper transition-all duration-500"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 flex items-center justify-center border border-copper/20 group-hover:border-copper/60 group-hover:bg-copper/5 transition-all duration-500">
                        {Icon && <Icon className="text-copper" size={28} />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mb-2">
                        {service.subtitle}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display text-cream mb-4 group-hover:text-copper transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-cream/50 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <span className="font-mono text-xs text-copper/60">
                        {service.stats}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-black to-charcoal border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {home.stats.map((stat: any, index: number) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-7xl font-display text-copper mb-3">
                  {stat.value}{stat.suffix}
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-cream/40 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-copper/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="w-16 h-16 text-copper/20 mx-auto mb-8" />
            <blockquote className="text-2xl md:text-4xl font-serif italic text-cream leading-relaxed mb-8">
              "{home.quote.text}"
            </blockquote>
            <div>
              <p className="font-display text-xl text-copper">{home.quote.author}</p>
              <p className="font-mono text-sm text-cream/40 tracking-wider">
                {home.quote.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-4 block">
              {home.process.label}
            </span>
            <h2 className="text-5xl md:text-7xl font-display text-cream">
              {home.process.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {home.process.steps.map((step: any, index: number) => (
              <motion.div
                key={step.number}
                className="relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Step Number */}
                <div className="text-[120px] font-display text-copper/10 leading-none mb-4 group-hover:text-copper/20 transition-colors">
                  {step.number}
                </div>
                {/* Content */}
                <div className="relative -mt-16 pl-4 border-l border-copper/30">
                  <h3 className="text-2xl font-display text-cream mb-3 group-hover:text-copper transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-cream/50 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-cream mb-6">
              {home.cta?.title || "Ready to Become Unforgettable?"}
            </h2>
            <p className="text-xl md:text-2xl text-cream/50 mb-4 max-w-2xl mx-auto">
              {home.cta?.subtitle || "We take on 12 projects per year. Make yours one of them."}
            </p>
            {home.cta?.note && (
              <p className="font-mono text-xs text-copper/60 mb-12">
                {home.cta.note}
              </p>
            )}
            <a
              href={`mailto:${content.site.contact.email}`}
              className="group relative inline-flex items-center justify-center gap-3 bg-copper hover:bg-copper-light text-black font-mono tracking-wider px-12 py-5 text-lg transition-all duration-300"
            >
              <span>{home.cta?.buttonText || "START THE CONVERSATION"}</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
