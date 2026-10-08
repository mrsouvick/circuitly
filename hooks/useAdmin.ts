'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { DataStore } from '@/lib/data/store';
import { toast } from 'sonner';

export function useAdmin() {
  const { user, isAdmin } = useAuth();

  const logAction = (action: string, entityType: string, entityId: string, details: Record<string, unknown> = {}) => {
    console.log(`[AUDIT LOG] ${action} on ${entityType}:${entityId} by admin ${user?.username}`, details);
  };

  const deleteTutorial = async (id: string, title: string) => {
    if (!isAdmin) {
      toast.error('Unauthorized: Admin access required');
      return false;
    }
    try {
      await fetch(`/api/admin/tutorials?id=${id}`, { method: 'DELETE' });
    } catch {
      // fallback
    }
    DataStore.deleteTutorial(id);
    logAction('DELETE_TUTORIAL', 'tutorial', id, { title });
    toast.success(`Tutorial "${title}" deleted`);
    return true;
  };

  const updateShowcaseStatus = async (id: string, status: 'approved' | 'featured' | 'rejected', title: string) => {
    if (!isAdmin) {
      toast.error('Unauthorized: Admin access required');
      return false;
    }
    try {
      await fetch('/api/admin/showcases', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
    } catch {
      // fallback
    }
    DataStore.updateShowcaseStatus(id, status);
    logAction('MODERATE_SHOWCASE', 'showcase', id, { status, title });
    toast.success(`Showcase status updated to ${status}`);
    return true;
  };

  return {
    isAdmin,
    logAction,
    deleteTutorial,
    updateShowcaseStatus,
  };
}
