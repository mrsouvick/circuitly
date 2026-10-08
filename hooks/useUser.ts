'use client';

import { useAuth } from '@/components/providers/AuthProvider';

export function useUser() {
  const { user, loading, isAdmin, login, logout, updateProfile } = useAuth();

  return {
    user,
    loading,
    isAdmin,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };
}
