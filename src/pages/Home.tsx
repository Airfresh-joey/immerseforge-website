import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Compass, Users, Quote, ChevronDown, Star } from 'lucide-react';
import type { WebsiteContent } from '../hooks/useWebsiteContent';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';

// Ember particle component
const Ember = ({ delay, left, bottom, size = 4 }: { delay: number; left: string; bottom: string; size?: number }) => (
  <div
    className="ember"
    aria-hidden="true"
    style={{
      left,
      bottom,
      width: size,
      height: size,
      animationDelay: `${delay}s`,
    }}
  />
);

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// Magnetic button component
const MagneticButton = ({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
};

// Gradient text component
const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-gradient-to-r from-copper via-amber to-copper bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
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

// Service to route mapping
const serviceRoutes: Record<string, string> = {
  'BRAND ACTIVATIONS': '/services/brand-activations',
  'EXPERIENTIAL PRODUCTION': '/services/experiential-campaigns',
  'VIP EXPERIENCES': '/services/vip-events',
  'BRAND AMBASSADORS': '/services/brand-ambassador-programs',
};

export const Home = ({ content }: HomeProps) => {
  const { home } = content.pages;
  const heroBackground = content.assets?.images?.hero_background;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

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
          <div className="absolute inset-0 bg-black/75" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 80%, rgba(199, 123, 53, 0.25) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(244, 166, 56, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5, 5, 5, 0.5) 100%)
              `
            }}
          />
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(199, 123, 53, 0.4) 0%, transparent 70%)',
              left: '10%',
              top: '20%',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(244, 166, 56, 0.5) 0%, transparent 70%)',
              right: '15%',
              bottom: '30%',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Floating Ember Particles - More of them */}
        <Ember delay={0} left="5%" bottom="15%" size={3} />
        <Ember delay={1.5} left="15%" bottom="25%" size={5} />
        <Ember delay={3} left="25%" bottom="8%" size={4} />
        <Ember delay={0.5} left="35%" bottom="35%" size={3} />
        <Ember delay={2} left="45%" bottom="12%" size={6} />
        <Ember delay={4} left="55%" bottom="28%" size={4} />
        <Ember delay={1} left="65%" bottom="18%" size={5} />
        <Ember delay={2.5} left="75%" bottom="32%" size={3} />
        <Ember delay={3.5} left="85%" bottom="22%" size={4} />
        <Ember delay={5} left="92%" bottom="10%" size={5} />
        <Ember delay={4.5} left="8%" bottom="40%" size={4} />
        <Ember delay={6} left="50%" bottom="45%" size={3} />
        <Ember delay={5.5} left="70%" bottom="5%" size={5} />

        {/* Hero Content - Centered */}
        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Top Label with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Star className="w-3 h-3 text-copper" />
              <span className="font-mono text-xs tracking-[0.3em] text-copper uppercase">
                {home.hero.tagline}
              </span>
              <Star className="w-3 h-3 text-copper" />
            </span>
          </motion.div>

          {/* Main Title - Large Centered Split with Glow */}
          <div className="mb-8 relative">
            {/* Glow effect behind text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-32 bg-copper/10 blur-[100px] rounded-full" />
            </div>

            <motion.div
              className="overflow-hidden"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.4,
                ease: [0.25, 0.1, 0, 1]
              }}
            >
              <img
                src="/images/hero-logo.png"
                alt="ImmerseForge - Experiential Studio"
                className="w-full max-w-3xl lg:max-w-4xl mx-auto"
                width="896"
                height="200"
                fetchPriority="high"
              />
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-cream/70 font-serif italic mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            We forge experiences that live in memory.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-cream/40 uppercase mb-14 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Premium experiential design • Immersive brand activations • Unforgettable moments
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <MagneticButton
              href="#contact"
              className="group relative bg-gradient-to-r from-copper to-amber text-black font-mono text-sm tracking-wider px-10 py-4 inline-flex items-center justify-center gap-3 overflow-hidden rounded-sm"
            >
              <span className="relative z-10 font-semibold">{home.hero.cta}</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
              <div className="absolute inset-0 bg-gradient-to-r from-amber to-copper opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
            <MagneticButton
              href="#work"
              className="group border border-cream/20 hover:border-copper/50 text-cream font-mono text-sm tracking-wider px-10 py-4 inline-flex items-center justify-center gap-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-sm"
            >
              <span>View Our Work</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.span
            className="font-mono text-[10px] tracking-[0.4em] text-cream/30 uppercase"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="text-copper/60" size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Client Logo Bar - Marquee Style */}
      {home.clients && (
        <section className="py-12 border-y border-white/5 bg-gradient-to-r from-black via-charcoal/30 to-black overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <motion.p
              className="font-mono text-[10px] tracking-[0.4em] text-cream/30 uppercase text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {home.clients.label}
            </motion.p>
          </div>
          <div className="relative">
            <motion.div
              className="flex gap-16 whitespace-nowrap"
              animate={{ x: [0, -1920] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...home.clients.logos, ...home.clients.logos, ...home.clients.logos].map((logo: string, index: number) => (
                <span
                  key={index}
                  className="font-display text-2xl md:text-3xl text-cream/15 hover:text-copper/50 transition-colors duration-500 cursor-default"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Manifesto Section - Enhanced */}
      {home.manifesto && (
        <section className="py-40 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/10 to-black" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-copper/5 rounded-full blur-[150px] translate-x-1/2" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
              >
                <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-6 block">
                  {home.manifesto.label}
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-cream mb-10 leading-[1.05]">
                  {home.manifesto.title.split(',').map((part: string, i: number) => (
                    <span key={i}>
                      {i === 1 ? <GradientText>{part}</GradientText> : part}
                      {i === 0 && ','}
                    </span>
                  ))}
                </h2>
                <p className="text-lg md:text-xl text-cream/50 leading-relaxed max-w-4xl">
                  {home.manifesto.description}
                </p>
              </motion.div>

              {/* Manifesto Stats - Animated Counters */}
              <motion.div
                className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {home.manifesto.stats.map((stat: { value: string; label: string }, index: number) => (
                  <motion.div
                    key={index}
                    className="text-center md:text-left group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-4xl md:text-6xl font-display mb-3">
                      <GradientText>
                        <AnimatedCounter
                          value={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                          suffix={stat.value.includes('%') ? '%' : stat.value.includes('+') ? '+' : ''}
                        />
                      </GradientText>
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase group-hover:text-cream/60 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Work Section - Premium Grid */}
      <section id="work" className="py-40 bg-gradient-to-b from-black via-charcoal/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-4 block">
                {home.featured?.label || "SELECTED WORK"}
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-cream">
                {home.featured?.title || "Results That Speak"}
              </h2>
            </div>
            <motion.a
              href="/work"
              className="group flex items-center gap-3 text-cream/50 hover:text-copper transition-colors mt-8 md:mt-0 font-mono text-sm tracking-wider"
              whileHover={{ x: 5 }}
            >
              <span>View All Work</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </motion.a>
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(home.featured?.projects || []).slice(0, 3).map((project: any, index: number) => (
              <motion.div
                key={project.id}
                className={`group relative overflow-hidden rounded-lg ${index === 0 ? 'lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
              >
                <div className={`relative ${index === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'} overflow-hidden bg-charcoal`}>
                  {project.image && (
                    <motion.img
                      src={`/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Glassmorphism Card on Hover */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-copper/20 backdrop-blur-sm border border-copper/30 font-mono text-[10px] tracking-[0.2em] text-copper uppercase mb-4">
                        {project.category}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-3 group-hover:text-copper transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-cream/60 max-w-xl mb-4 line-clamp-2 text-sm md:text-base">
                        {project.description}
                      </p>
                      {project.result && (
                        <p className="font-mono text-xs text-copper/80 tracking-wide">
                          {project.result}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Card Grid */}
      <section id="services" className="py-40 bg-black relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-copper/5 rounded-full blur-[200px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-4 block">
              CAPABILITIES
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-cream">
              What We <GradientText>Forge</GradientText>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {home.services.map((service: any, index: number) => {
              const Icon = iconMap[service.icon];
              const serviceRoute = serviceRoutes[service.title] || '/services/brand-activations';
              return (
                <Link key={service.id} href={serviceRoute}>
                  <motion.div
                    className="group relative p-8 md:p-10 rounded-lg bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-white/5 hover:border-copper/30 transition-all duration-500 overflow-hidden cursor-pointer h-full"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <motion.div
                          className="w-14 h-14 flex items-center justify-center rounded-lg bg-copper/10 border border-copper/20 group-hover:bg-copper/20 group-hover:border-copper/40 transition-all duration-500"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          {Icon && <Icon className="text-copper" size={24} />}
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mb-2">
                          {service.subtitle}
                        </div>
                        <h3 className="text-xl md:text-2xl font-display text-cream mb-3 group-hover:text-copper transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-cream/50 leading-relaxed text-sm mb-4">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center gap-2 font-mono text-xs text-copper/70 group-hover:text-copper transition-colors">
                          <span className="w-8 h-[1px] bg-copper/50 group-hover:w-12 transition-all" />
                          {service.stats}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Large Numbers */}
      <section className="py-32 bg-gradient-to-b from-black via-charcoal/30 to-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(199,123,53,0.1)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {home.stats.map((stat: any, index: number) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-7xl lg:text-8xl font-display mb-4">
                  <GradientText>
                    <AnimatedCounter
                      value={parseFloat(stat.value)}
                      suffix={stat.suffix}
                    />
                  </GradientText>
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-cream/40 uppercase group-hover:text-cream/60 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - Glassmorphism */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper/5 rounded-full blur-[200px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glassmorphism Card */}
            <div className="relative p-10 md:p-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <Quote className="w-12 h-12 text-copper/30 mb-8" />
              <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-cream leading-snug mb-10">
                "{home.quote.text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-copper to-amber flex items-center justify-center">
                  <span className="font-display text-black text-lg">
                    {home.quote.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg text-copper">{home.quote.author}</p>
                  <p className="font-mono text-xs text-cream/40 tracking-wider">
                    {home.quote.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section - Timeline Style */}
      <section className="py-40 bg-gradient-to-b from-black to-charcoal/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-copper uppercase mb-4 block">
              {home.process.label}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-cream">
              {home.process.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-copper/30 to-transparent" />

            {home.process.steps.map((step: any, index: number) => (
              <motion.div
                key={step.number}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Step Number with Glow */}
                <div className="relative mb-8">
                  <div className="text-[100px] md:text-[120px] font-display leading-none">
                    <GradientText className="opacity-20 group-hover:opacity-40 transition-opacity">
                      {step.number}
                    </GradientText>
                  </div>
                  {/* Dot indicator */}
                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-copper/50 group-hover:bg-copper transition-colors" />
                </div>

                {/* Content */}
                <div className="relative -mt-12 pl-6 border-l-2 border-copper/20 group-hover:border-copper/50 transition-colors">
                  <h3 className="text-2xl font-display text-cream mb-4 group-hover:text-copper transition-colors">
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

      {/* Final CTA Section - Impactful */}
      <section id="contact" className="py-40 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199, 123, 53, 0.15) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display text-cream mb-8 leading-[0.95]">
                Ready to Create Something{' '}
                <GradientText>Unforgettable</GradientText>?
              </h2>
            </motion.div>
            <p className="text-xl md:text-2xl text-cream/50 mb-6 max-w-2xl mx-auto">
              {home.cta?.subtitle || "Let's discuss how we can bring your brand vision to life."}
            </p>
            {home.cta?.note && (
              <p className="font-mono text-xs text-copper/60 mb-14 tracking-wider">
                {home.cta.note}
              </p>
            )}
            <MagneticButton
              href={`mailto:${content.site.contact.email}`}
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-copper via-amber to-copper text-black font-mono font-semibold tracking-wider px-14 py-6 text-lg rounded-sm overflow-hidden"
            >
              <span className="relative z-10">{home.cta?.buttonText || "START THE CONVERSATION"}</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={22} />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber via-copper to-amber"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
