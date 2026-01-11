import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import type { WebsiteContent } from '../hooks/useWebsiteContent';

interface LayoutProps {
  children: ReactNode;
  content: WebsiteContent;
}

export const Layout = ({ children, content }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header siteName={content.site.name} navigation={content.navigation} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer
        siteName={content.site.name}
        tagline={content.site.tagline}
        contact={content.site.contact}
        social={content.site.social}
        footer={content.footer}
      />
    </div>
  );
};
