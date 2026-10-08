-- ====================================================================
-- Circuitly - Complete Database Schema Migration
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Clean types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE showcase_status AS ENUM ('pending', 'approved', 'featured', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role user_role DEFAULT 'user' NOT NULL,
    status TEXT DEFAULT 'active' NOT NULL CHECK (status IN ('active', 'banned')),
    streak_count INTEGER DEFAULT 0 NOT NULL,
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    order_index INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. TUTORIALS TABLE
CREATE TABLE IF NOT EXISTS tutorials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    difficulty difficulty_level NOT NULL DEFAULT 'beginner',
    time_estimate INTEGER NOT NULL, -- in minutes
    cost_estimate NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    hero_image TEXT NOT NULL,
    circuit_diagram TEXT,
    learning_outcomes JSONB DEFAULT '[]'::jsonb NOT NULL,
    prerequisites JSONB DEFAULT '[]'::jsonb NOT NULL,
    components JSONB DEFAULT '[]'::jsonb NOT NULL,
    code TEXT NOT NULL,
    steps JSONB DEFAULT '[]'::jsonb NOT NULL,
    troubleshooting JSONB DEFAULT '[]'::jsonb NOT NULL,
    quiz JSONB DEFAULT '[]'::jsonb NOT NULL,
    views_count INTEGER DEFAULT 0 NOT NULL,
    completions_count INTEGER DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. LEARNING PATHS TABLE
CREATE TABLE IF NOT EXISTS learning_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    difficulty difficulty_level DEFAULT 'beginner' NOT NULL,
    tutorial_ids UUID[] DEFAULT ARRAY[]::UUID[] NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    tutorial_id UUID REFERENCES tutorials(id) ON DELETE CASCADE NOT NULL,
    completed_steps INTEGER[] DEFAULT ARRAY[]::INTEGER[] NOT NULL,
    is_completed BOOLEAN DEFAULT false NOT NULL,
    completed_at TIMESTAMPTZ,
    last_step INTEGER DEFAULT 0 NOT NULL,
    quiz_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, tutorial_id)
);

-- 8. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    tutorial_id UUID REFERENCES tutorials(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, tutorial_id)
);

-- 9. SHOWCASES TABLE
CREATE TABLE IF NOT EXISTS showcases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    code TEXT,
    components JSONB DEFAULT '[]'::jsonb NOT NULL,
    status showcase_status DEFAULT 'approved' NOT NULL,
    likes_count INTEGER DEFAULT 0 NOT NULL,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. SHOWCASE LIKES TABLE
CREATE TABLE IF NOT EXISTS showcase_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    showcase_id UUID REFERENCES showcases(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, showcase_id)
);

-- 11. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    tutorial_id UUID REFERENCES tutorials(id) ON DELETE CASCADE,
    showcase_id UUID REFERENCES showcases(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT true NOT NULL,
    is_flagged BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. BADGES TABLE
CREATE TABLE IF NOT EXISTS badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    requirement_rule JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. USER BADGES TABLE
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
    awarded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, badge_id)
);

-- 14. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 16. REPORTS TABLE
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('showcase', 'comment', 'user')),
    entity_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 17. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- INDEXES
-- ====================================================================

CREATE INDEX IF NOT EXISTS idx_tutorials_slug ON tutorials(slug);
CREATE INDEX IF NOT EXISTS idx_tutorials_category ON tutorials(category_id);
CREATE INDEX IF NOT EXISTS idx_tutorials_difficulty ON tutorials(difficulty);
CREATE INDEX IF NOT EXISTS idx_tutorials_published ON tutorials(is_published);
CREATE INDEX IF NOT EXISTS idx_tutorials_created ON tutorials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_tutorial ON user_progress(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_showcases_status ON showcases(status);
CREATE INDEX IF NOT EXISTS idx_comments_tutorial ON comments(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- Full-text search index on tutorials
CREATE INDEX IF NOT EXISTS idx_tutorials_fts ON tutorials USING gin(to_tsvector('english', title || ' ' || description));

-- ====================================================================
-- FUNCTIONS & TRIGGERS
-- ====================================================================

-- Helper: Check if active user is Admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Function: Increment tutorial views
CREATE OR REPLACE FUNCTION increment_views(target_tutorial_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tutorials
  SET views_count = views_count + 1
  WHERE id = target_tutorial_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get user dashboard stats
CREATE OR REPLACE FUNCTION get_user_stats(target_user_id UUID)
RETURNS TABLE (
  completed_count BIGINT,
  in_progress_count BIGINT,
  bookmarks_count BIGINT,
  badges_count BIGINT,
  streak INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM user_progress WHERE user_id = target_user_id AND is_completed = true) AS completed_count,
    (SELECT COUNT(*) FROM user_progress WHERE user_id = target_user_id AND is_completed = false) AS in_progress_count,
    (SELECT COUNT(*) FROM bookmarks WHERE user_id = target_user_id) AS bookmarks_count,
    (SELECT COUNT(*) FROM user_badges WHERE user_id = target_user_id) AS badges_count,
    (SELECT streak_count FROM profiles WHERE id = target_user_id) AS streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  assigned_role user_role := 'user';
  gen_username text;
BEGIN
  IF new.email = 'admin@circuitly.io' THEN
    assigned_role := 'admin';
  END IF;

  gen_username := COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1));

  INSERT INTO public.profiles (id, username, full_name, avatar_url, role)
  VALUES (
    new.id,
    gen_username,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/bottts/svg?seed=' || new.id),
    assigned_role
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role;
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger: Update updated_at timestamp
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_tutorials_updated_at BEFORE UPDATE ON tutorials FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_showcases_updated_at BEFORE UPDATE ON showcases FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER trg_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcase_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow insert on profiles" ON profiles FOR INSERT WITH CHECK (true);

-- Categories Policies
CREATE POLICY "Categories are readable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Only admins can insert categories" ON categories FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Only admins can update categories" ON categories FOR UPDATE USING (is_admin());
CREATE POLICY "Only admins can delete categories" ON categories FOR DELETE USING (is_admin());

-- Tutorials Policies
CREATE POLICY "Published tutorials are viewable by everyone" ON tutorials FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admins have full access to tutorials" ON tutorials FOR ALL USING (is_admin());

-- Learning Paths Policies
CREATE POLICY "Learning paths viewable by everyone" ON learning_paths FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admins have full access to paths" ON learning_paths FOR ALL USING (is_admin());

-- User Progress Policies
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Bookmarks Policies
CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Showcases Policies
CREATE POLICY "Approved showcases viewable by everyone" ON showcases FOR SELECT USING (status = 'approved' OR status = 'featured' OR auth.uid() = user_id OR is_admin());
CREATE POLICY "Authenticated users can insert showcases" ON showcases FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own showcase" ON showcases FOR UPDATE USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "Admins can delete showcases" ON showcases FOR DELETE USING (is_admin() OR auth.uid() = user_id);

-- Showcase Likes
CREATE POLICY "Likes viewable by everyone" ON showcase_likes FOR SELECT USING (true);
CREATE POLICY "Users can toggle own likes" ON showcase_likes FOR ALL USING (auth.uid() = user_id);

-- Comments Policies
CREATE POLICY "Approved comments viewable by everyone" ON comments FOR SELECT USING (is_approved = true OR auth.uid() = user_id OR is_admin());
CREATE POLICY "Authenticated users can insert comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins or owners can delete comments" ON comments FOR DELETE USING (auth.uid() = user_id OR is_admin());

-- Badges Policies
CREATE POLICY "Badges viewable by everyone" ON badges FOR SELECT USING (true);
CREATE POLICY "Admins manage badges" ON badges FOR ALL USING (is_admin());

-- User Badges Policies
CREATE POLICY "User badges viewable by everyone" ON user_badges FOR SELECT USING (true);
CREATE POLICY "System or Admin can award badges" ON user_badges FOR ALL USING (is_admin() OR auth.uid() = user_id);

-- Notifications Policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Audit Logs Policies
CREATE POLICY "Only admins can view audit logs" ON audit_logs FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (is_admin());

-- Reports Policies
CREATE POLICY "Users can insert reports" ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins can view and manage reports" ON reports FOR ALL USING (is_admin());

-- Site Settings Policies
CREATE POLICY "Site settings viewable by everyone" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Only admins can modify site settings" ON site_settings FOR ALL USING (is_admin());
