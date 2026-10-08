import { MetadataRoute } from 'next';
import { INITIAL_TUTORIALS, INITIAL_PATHS } from '@/lib/seedData';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = [
    '',
    '/tutorials',
    '/paths',
    '/simulator',
    '/showcase',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const tutorialPages = INITIAL_TUTORIALS.map((t) => ({
    url: `${baseUrl}/tutorials/${t.slug}`,
    lastModified: new Date(t.updated_at || t.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const pathPages = INITIAL_PATHS.map((p) => ({
    url: `${baseUrl}/paths/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...tutorialPages, ...pathPages];
}
