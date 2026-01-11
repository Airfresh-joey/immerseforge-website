import { useState, useEffect } from 'react';

export interface WebsiteContent {
  site: {
    name: string;
    tagline: string;
    description: string;
    subheadline: string;
    contact: {
      email: string;
      location: string;
    };
    social: {
      instagram: string;
      linkedin: string;
      twitter: string;
    };
  };
  pages: {
    home: any;
    work: any;
    about: any;
  };
  assets: {
    images: Record<string, string>;
    videos: Record<string, string>;
  };
  design: {
    colors: Record<string, string>;
    fonts: Record<string, string>;
  };
  navigation: Array<{ label: string; href: string }>;
  footer: {
    services: string[];
    company: string[];
    legal: string[];
  };
}

export const useWebsiteContent = () => {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/website-content.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load website content');
        }
        return response.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { content, loading, error };
};
