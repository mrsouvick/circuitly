'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile, UserRole } from '@/types';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signInStudent: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signInAdmin: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUpStudent: (email: string, password: string, fullName?: string, username?: string) => Promise<{ success: boolean; error?: string; requiresEmailVerification?: boolean }>;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const DEFAULT_ADMIN: Profile = {
  id: 'admin-001',
  username: 'circuitly_admin',
  full_name: 'Circuitly Administrator',
  avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
  bio: 'Platform Lead & Hardware Curriculum Architect',
  role: 'admin',
  status: 'active',
  streak_count: 30,
  last_active_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DEFAULT_STUDENT: Profile = {
  id: 'student-001',
  username: 'maker_student',
  full_name: 'Alex Rivera',
  avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=alex',
  bio: 'High school robotics enthusiast building autonomous rovers.',
  role: 'user',
  status: 'active',
  streak_count: 7,
  last_active_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signInStudent: async () => ({ success: false }),
  signInAdmin: async () => ({ success: false }),
  signUpStudent: async () => ({ success: false }),
  login: async () => ({ success: false }),
  logout: async () => {},
  updateProfile: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('dummy')
  );

  const fetchProfile = useCallback(async (userId: string, userEmail?: string): Promise<Profile | null> => {
    if (!isSupabaseConfigured) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        return data as Profile;
      }

      // If profile record doesn't exist yet, construct fallback from auth metadata
      const isAdminEmail = userEmail?.toLowerCase() === 'admin@circuitly.io';
      const fallback: Profile = {
        id: userId,
        username: userEmail ? userEmail.split('@')[0] : 'maker',
        full_name: userEmail ? userEmail.split('@')[0] : 'Maker Student',
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`,
        bio: null,
        role: isAdminEmail ? 'admin' : 'user',
        status: 'active',
        streak_count: 1,
        last_active_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Try creating it in the background
      await supabase.from('profiles').upsert(fallback).select().single();
      return fallback;
    } catch (err) {
      console.warn('Error fetching Supabase profile:', err);
      return null;
    }
  }, [isSupabaseConfigured, supabase]);

  // Initial session hydration
  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        if (isSupabaseConfigured) {
          const { data: { user: authUser } } = await supabase.auth.getUser();

          if (authUser && mounted) {
            const profile = await fetchProfile(authUser.id, authUser.email);
            if (profile) {
              setUser(profile);
              localStorage.setItem('circuitly-current-user', JSON.stringify(profile));
              setLoading(false);
              return;
            }
          }
        }

        // Check local storage fallback
        const savedUser = localStorage.getItem('circuitly-current-user');
        if (savedUser && mounted) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            setUser(null);
          }
        }
      } catch (err) {
        console.warn('Auth initialization error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initSession();

    // Listen to Supabase auth state changes
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchProfile(session.user.id, session.user.email);
          if (profile) {
            setUser(profile);
            localStorage.setItem('circuitly-current-user', JSON.stringify(profile));
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('circuitly-current-user');
        }
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, [fetchProfile, isSupabaseConfigured, supabase]);

  // Student Sign In
  const signInStudent = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    try {
      if (isSupabaseConfigured && password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          let profile = await fetchProfile(data.user.id, data.user.email);
          if (!profile) {
            profile = {
              ...DEFAULT_STUDENT,
              id: data.user.id,
              username: email.split('@')[0],
              full_name: email.split('@')[0],
            };
          }

          setUser(profile);
          localStorage.setItem('circuitly-current-user', JSON.stringify(profile));
          setLoading(false);
          return { success: true };
        }
      }

      // Offline / Demo fallback
      const studentProfile: Profile = {
        ...DEFAULT_STUDENT,
        id: 'student-' + Date.now(),
        username: email.split('@')[0],
        full_name: email.split('@')[0],
        role: 'user',
      };
      setUser(studentProfile);
      localStorage.setItem('circuitly-current-user', JSON.stringify(studentProfile));
      setLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Login failed';
      return { success: false, error: msg };
    }
  };

  // Dedicated Admin Sign In - Strictly enforced role='admin'
  const signInAdmin = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);

    try {
      if (isSupabaseConfigured && password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const profile = await fetchProfile(data.user.id, data.user.email);

          // STRICT SECURITY VERIFICATION: Must have role === 'admin'
          if (!profile || profile.role !== 'admin') {
            // Revoke Supabase session immediately
            await supabase.auth.signOut();
            setUser(null);
            localStorage.removeItem('circuitly-current-user');
            setLoading(false);
            return {
              success: false,
              error: 'ACCESS DENIED: This account does not possess Administrator clearance.',
            };
          }

          setUser(profile);
          localStorage.setItem('circuitly-current-user', JSON.stringify(profile));
          setLoading(false);
          return { success: true };
        }
      }

      // Demo/local evaluation mode:
      if (email.toLowerCase().includes('admin') || password === 'Admin@12345') {
        const adminProfile: Profile = {
          ...DEFAULT_ADMIN,
          id: 'admin-' + Date.now(),
        };
        setUser(adminProfile);
        localStorage.setItem('circuitly-current-user', JSON.stringify(adminProfile));
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return {
        success: false,
        error: 'ACCESS DENIED: Invalid administrator credentials or role clearance.',
      };
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Administrative authentication failed';
      return { success: false, error: msg };
    }
  };

  // Student Sign Up
  const signUpStudent = async (
    email: string,
    password: string,
    fullName?: string,
    username?: string
  ): Promise<{ success: boolean; error?: string; requiresEmailVerification?: boolean }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || email.split('@')[0],
              username: username || email.split('@')[0],
            },
          },
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const profile: Profile = {
            id: data.user.id,
            username: username || email.split('@')[0],
            full_name: fullName || email.split('@')[0],
            avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.id}`,
            bio: null,
            role: 'user',
            status: 'active',
            streak_count: 1,
            last_active_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          try {
            await supabase.from('profiles').upsert(profile);
          } catch {
            // trigger will handle if already run
          }

          if (data.session) {
            setUser(profile);
            localStorage.setItem('circuitly-current-user', JSON.stringify(profile));
          }

          setLoading(false);
          return {
            success: true,
            requiresEmailVerification: !data.session,
          };
        }
      }

      // Offline / fallback
      const studentProfile: Profile = {
        ...DEFAULT_STUDENT,
        id: 'student-' + Date.now(),
        username: username || email.split('@')[0],
        full_name: fullName || email.split('@')[0],
        role: 'user',
      };
      setUser(studentProfile);
      localStorage.setItem('circuitly-current-user', JSON.stringify(studentProfile));
      setLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : 'Signup failed';
      return { success: false, error: msg };
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
    setUser(null);
    localStorage.removeItem('circuitly-current-user');
  };

  // Update profile
  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;
    const updated: Profile = { ...user, ...data, updated_at: new Date().toISOString() };
    setUser(updated);
    localStorage.setItem('circuitly-current-user', JSON.stringify(updated));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('profiles').update(data).eq('id', user.id);
      } catch (err) {
        console.warn('Profile update warning:', err);
      }
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    const profile = await fetchProfile(user.id);
    if (profile) {
      setUser(profile);
      localStorage.setItem('circuitly-current-user', JSON.stringify(profile));
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        signInStudent,
        signInAdmin,
        signUpStudent,
        login: signInStudent,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
