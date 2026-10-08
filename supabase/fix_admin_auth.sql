-- ====================================================================
-- Circuitly: Fix Admin Auth & Profiles RLS (Run in Supabase SQL Editor)
-- ====================================================================

-- 1. Remove recursive policy on profiles
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow insert on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for profiles" ON public.profiles;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow insert on profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- 2. Update trigger to safely handle errors without aborting auth.users insert
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
    role = EXCLUDED.role,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);

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
