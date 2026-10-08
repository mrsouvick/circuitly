export type UserRole = 'user' | 'moderator' | 'admin';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ShowcaseStatus = 'pending' | 'approved' | 'featured' | 'rejected';

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  status: 'active' | 'banned';
  streak_count: number;
  last_active_at: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface ComponentItem {
  name: string;
  quantity: number;
  price: number;
  buy_url: string;
}

export interface StepItem {
  order: number;
  title: string;
  description: string;
  image_url: string;
}

export interface TroubleshootingItem {
  question: string;
  answer: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  category?: Category;
  difficulty: DifficultyLevel;
  time_estimate: number;
  cost_estimate: number;
  hero_image: string;
  circuit_diagram: string;
  learning_outcomes: string[];
  prerequisites: string[];
  components: ComponentItem[];
  code: string;
  steps: StepItem[];
  troubleshooting: TroubleshootingItem[];
  quiz: QuizItem[];
  views_count: number;
  completions_count: number;
  is_published: boolean;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  difficulty: DifficultyLevel;
  tutorial_ids: string[];
  tutorials?: Tutorial[];
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  tutorial_id: string;
  completed_steps: number[];
  is_completed: boolean;
  completed_at: string | null;
  last_step: number;
  quiz_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  tutorial_id: string;
  created_at: string;
  tutorial?: Tutorial;
}

export interface Showcase {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  image_url: string;
  code?: string;
  components: ComponentItem[];
  status: ShowcaseStatus;
  likes_count: number;
  rejection_reason?: string | null;
  created_at: string;
  updated_at?: string;
  user?: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
}

export interface Comment {
  id: string;
  user_id: string;
  tutorial_id?: string;
  showcase_id?: string;
  parent_id?: string | null;
  content: string;
  is_approved: boolean;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
  user?: Profile;
  replies?: Comment[];
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  requirement_rule: {
    type: string;
    threshold: number;
    category?: string;
  };
  created_at?: string;
  awarded_at?: string;
}

export interface AuditLog {
  id: string;
  admin_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, unknown>;
  created_at: string;
  admin?: Profile;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  logo_url: string;
  contact_email: string;
  announcement_banner: string;
  announcement_active: boolean;
  enable_signup: boolean;
  enable_showcase: boolean;
  enable_simulator: boolean;
  enable_comments: boolean;
}
