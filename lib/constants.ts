export const SITE_CONFIG = {
  name: 'Circuitly',
  tagline: 'From Zero to Maker — Learn Arduino by Building',
  description: 'Interactive Arduino project tutorial platform for students, makers, and embedded engineers.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://circuitly.netlify.app',
  ogImage: '/og-image.png',
  author: 'Circuitly Labs',
  links: {
    github: 'https://github.com/mrsouvick/circuitly',
    discord: 'https://discord.gg/circuitly',
    twitter: 'https://twitter.com/circuitly_io',
  },
};

export const DIFFICULTY_LEVELS = [
  { label: 'Beginner', value: 'beginner', color: '#059669' },
  { label: 'Intermediate', value: 'intermediate', color: '#FFB84D' },
  { label: 'Advanced', value: 'advanced', color: '#FF6B6B' },
] as const;

export const NAV_LINKS = [
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/paths', label: 'Learning Paths' },
  { href: '/simulator', label: 'Simulator' },
  { href: '/showcase', label: 'Showcase' },
];

export const ADMIN_NAV_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/tutorials', label: 'Tutorials', icon: 'BookOpen' },
  { href: '/admin/categories', label: 'Categories', icon: 'FolderTree' },
  { href: '/admin/paths', label: 'Learning Paths', icon: 'Route' },
  { href: '/admin/showcase', label: 'Showcase Mod', icon: 'Sparkles' },
  { href: '/admin/users', label: 'Users', icon: 'Users' },
  { href: '/admin/comments', label: 'Comments', icon: 'MessageSquare' },
  { href: '/admin/badges', label: 'Badges', icon: 'Award' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/admin/settings', label: 'Settings', icon: 'Settings' },
];
