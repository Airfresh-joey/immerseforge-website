import { Instagram, Twitter } from 'lucide-react';
import { Link } from 'wouter';

interface FooterProps {
  siteName: string;
  tagline: string;
  contact: {
    email: string;
    location: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  footer: {
    services: string[];
    company: string[];
    legal: string[];
  };
}

// Service to route mapping
const serviceRoutes: Record<string, string> = {
  'Brand Activations': '/services/brand-activations',
  'Experiential Production': '/services/experiential-campaigns',
  'VIP Experiences': '/services/vip-events',
  'Brand Ambassadors': '/services/brand-ambassador-programs',
};

// Company link mapping
const companyRoutes: Record<string, string> = {
  'About': '/about',
  'Our Work': '/work',
  'Talent': '/talent',
  'Contact': '/contact',
};

export const Footer = ({ siteName, tagline, contact, social, footer }: FooterProps) => {
  return (
    <footer className="bg-charcoal border-t border-copper/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-display tracking-wider text-cream mb-2">
              {siteName}
            </h3>
            <p className="text-cream-muted text-sm mb-6">{tagline}</p>
            <div className="flex space-x-4">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream hover:text-copper transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream hover:text-copper transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-copper mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {footer.services.map((service) => {
                const route = serviceRoutes[service] || '/services/brand-activations';
                return (
                  <li key={service}>
                    <Link href={route} className="text-cream-muted hover:text-cream transition-colors text-sm">
                      {service}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-copper mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footer.company.map((item) => {
                const route = companyRoutes[item] || '/';
                return (
                  <li key={item}>
                    <Link href={route} className="text-cream-muted hover:text-cream transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-copper mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="text-cream-muted text-sm">{contact.location}</li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-cream-muted hover:text-cream transition-colors text-sm"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-copper/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream-muted text-sm">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footer.legal.map((item) => (
              <a
                key={item}
                href="#"
                className="text-cream-muted hover:text-cream transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
