import {
  INITIAL_CATEGORIES,
  INITIAL_TUTORIALS,
  INITIAL_PATHS,
  INITIAL_BADGES,
  INITIAL_SHOWCASES,
  Category,
  Tutorial,
  LearningPath,
  Badge,
  Showcase,
} from '@/lib/seedData';

// In-memory runtime data cache initialized from seed data
let categories = [...INITIAL_CATEGORIES];
let tutorials = [...INITIAL_TUTORIALS];
let paths = [...INITIAL_PATHS];
let badges = [...INITIAL_BADGES];
let showcases = [...INITIAL_SHOWCASES];

export interface TutorialFilters {
  category?: string;
  difficulty?: string;
  query?: string;
  sort?: 'popular' | 'newest' | 'shortest';
  limit?: number;
}

export const DataStore = {
  // Categories
  getCategories: (): Category[] => {
    return [...categories].sort((a, b) => a.order_index - b.order_index);
  },

  getCategoryBySlug: (slug: string): Category | undefined => {
    return categories.find((c) => c.slug === slug);
  },

  saveCategory: (category: Category) => {
    const index = categories.findIndex((c) => c.id === category.id);
    if (index >= 0) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    return category;
  },

  deleteCategory: (id: string) => {
    categories = categories.filter((c) => c.id !== id);
  },

  // Tutorials
  getTutorials: (filters?: TutorialFilters): Tutorial[] => {
    let result = [...tutorials].filter((t) => t.is_published);

    if (filters?.category) {
      const cat = categories.find((c) => c.slug === filters.category);
      if (cat) {
        result = result.filter((t) => t.category_id === cat.id);
      }
    }

    if (filters?.difficulty && filters.difficulty !== 'all') {
      result = result.filter((t) => t.difficulty === filters.difficulty);
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.components.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (filters?.sort === 'popular') {
      result.sort((a, b) => b.views_count - a.views_count);
    } else if (filters?.sort === 'shortest') {
      result.sort((a, b) => a.time_estimate - b.time_estimate);
    } else {
      // Default to newest
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    if (filters?.limit) {
      result = result.slice(0, filters.limit);
    }

    return result;
  },

  getAllTutorialsAdmin: (): Tutorial[] => {
    return [...tutorials].sort(
      (a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime()
    );
  },

  getTutorialBySlug: (slug: string): Tutorial | undefined => {
    return tutorials.find((t) => t.slug === slug);
  },

  getTutorialById: (id: string): Tutorial | undefined => {
    return tutorials.find((t) => t.id === id);
  },

  incrementTutorialViews: (id: string) => {
    const tut = tutorials.find((t) => t.id === id);
    if (tut) {
      tut.views_count += 1;
    }
  },

  incrementTutorialCompletions: (id: string) => {
    const tut = tutorials.find((t) => t.id === id);
    if (tut) {
      tut.completions_count += 1;
    }
  },

  saveTutorial: (tut: Tutorial) => {
    const index = tutorials.findIndex((t) => t.id === tut.id);
    if (index >= 0) {
      tutorials[index] = { ...tut, updated_at: new Date().toISOString() };
    } else {
      tutorials.unshift({ ...tut, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    }
    return tut;
  },

  deleteTutorial: (id: string) => {
    tutorials = tutorials.filter((t) => t.id !== id);
  },

  // Learning Paths
  getPaths: (): LearningPath[] => {
    return [...paths];
  },

  getPathBySlug: (slug: string): LearningPath | undefined => {
    return paths.find((p) => p.slug === slug);
  },

  savePath: (path: LearningPath) => {
    const index = paths.findIndex((p) => p.id === path.id);
    if (index >= 0) {
      paths[index] = path;
    } else {
      paths.push(path);
    }
    return path;
  },

  // Badges
  getBadges: (): Badge[] => {
    return [...badges];
  },

  saveBadge: (badge: Badge) => {
    const index = badges.findIndex((b) => b.id === badge.id);
    if (index >= 0) {
      badges[index] = badge;
    } else {
      badges.push(badge);
    }
    return badge;
  },

  // Showcases
  getShowcases: (status?: string): Showcase[] => {
    if (status && status !== 'all') {
      return showcases.filter((s) => s.status === status);
    }
    return showcases.filter((s) => s.status === 'approved' || s.status === 'featured');
  },

  getAllShowcasesAdmin: (): Showcase[] => {
    return [...showcases];
  },

  saveShowcase: (showcase: Showcase) => {
    const index = showcases.findIndex((s) => s.id === showcase.id);
    if (index >= 0) {
      showcases[index] = showcase;
    } else {
      showcases.unshift(showcase);
    }
    return showcase;
  },

  updateShowcaseStatus: (id: string, status: Showcase['status'], reason?: string) => {
    const item = showcases.find((s) => s.id === id);
    if (item) {
      item.status = status;
      if (reason) {
        // reason recorded
      }
    }
  },

  deleteShowcase: (id: string) => {
    showcases = showcases.filter((s) => s.id !== id);
  },

  // Admin Overview Stats
  getAdminStats: () => {
    const totalUsers = 12480;
    const publishedTutorials = tutorials.filter((t) => t.is_published).length;
    const draftTutorials = tutorials.filter((t) => !t.is_published).length;
    const totalShowcases = showcases.length;
    const pendingShowcases = showcases.filter((s) => s.status === 'pending').length;
    const activeUsers7d = 3420;
    const activeUsers30d = 8900;
    const totalCompletions = tutorials.reduce((acc, t) => acc + t.completions_count, 0);

    return {
      totalUsers,
      totalTutorials: tutorials.length,
      publishedTutorials,
      draftTutorials,
      totalShowcases,
      pendingShowcases,
      activeUsers7d,
      activeUsers30d,
      totalCompletions,
    };
  },
};
