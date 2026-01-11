import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { WebsiteContent } from '../hooks/useWebsiteContent';

interface WorkProps {
  content: WebsiteContent;
}

export const Work = ({ content }: WorkProps) => {
  const { work } = content.pages;
  const caseStudyImages = [
    content.assets?.images?.case_study_1,
    content.assets?.images?.case_study_2,
    content.assets?.images?.case_study_3,
  ];

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
              {work.label}
            </p>
            <h1 className="text-5xl md:text-7xl font-display text-cream mb-6">
              {work.title}
            </h1>
            <p className="text-lg text-cream-muted">
              A selection of immersive experiences that left their mark on memory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {work.projects.map((project: any, index: number) => {
              const projectImage = caseStudyImages[index];
              return (
              <motion.div
                key={project.id}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Project Image */}
                  <div className={`relative aspect-video overflow-hidden ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    {projectImage ? (
                      <img
                        src={`/${projectImage}`}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-charcoal to-charcoal-medium flex items-center justify-center">
                        <div className="text-copper/40 font-display text-6xl">
                          {String(project.id).padStart(2, '0')}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-copper/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="inline-block px-4 py-1 bg-copper/10 border border-copper/30 mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-copper">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-display text-cream mb-3">
                      {project.title}
                    </h2>

                    <p className="font-mono text-sm uppercase tracking-wider text-cream-muted mb-6">
                      {project.client}
                    </p>

                    <p className="text-lg text-cream-muted leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <button className="group/btn inline-flex items-center gap-2 text-copper hover:text-copper-light transition-colors">
                      <span className="font-mono text-sm uppercase tracking-wider">
                        View Case Study
                      </span>
                      <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-cream mb-6">
              Your Project Could Be Next
            </h2>
            <p className="text-lg text-cream-muted mb-8">
              Let's forge an experience that stands out from the noise.
            </p>
            <a
              href={`mailto:${content.site.contact.email}`}
              className="bg-copper hover:bg-copper-light text-black font-mono text-sm uppercase tracking-wider px-8 py-4 transition-colors inline-block"
            >
              Start a Conversation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
