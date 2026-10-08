'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/providers/AuthProvider';

export interface ProgressState {
  completedSteps: Record<string, number[]>; // tutorialId -> step numbers
  completedTutorials: string[]; // tutorialIds
  bookmarks: string[]; // tutorialIds
  quizScores: Record<string, number>; // tutorialId -> score
}

const STORAGE_KEY = 'circuitly-user-progress';

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressState>({
    completedSteps: {},
    completedTutorials: [],
    bookmarks: [],
    quizScores: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial load from localStorage (instant, client-side)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sanitize any previous demo artifacts
        const cleanTutorials = (parsed.completedTutorials || []).filter(
          (id: string) => id !== 'tut-1' && id !== 'tut-2' && id !== 'tut-3'
        );
        const cleanBookmarks = (parsed.bookmarks || []).filter(
          (id: string) => id !== 'tut-3' && id !== 'tut-6'
        );
        setProgress({
          completedSteps: parsed.completedSteps || {},
          completedTutorials: cleanTutorials,
          bookmarks: cleanBookmarks,
          quizScores: parsed.quizScores || {},
        });
      }
    } catch {
      // ignore JSON parse error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Sync with Supabase when logged in
  useEffect(() => {
    if (!user?.id) return;
    const supabase = createClient();

    async function fetchUserProgress() {
      try {
        const [progRes, bmRes] = await Promise.all([
          supabase.from('user_progress').select('*').eq('user_id', user!.id),
          supabase.from('bookmarks').select('tutorial_id').eq('user_id', user!.id),
        ]);

        const dbCompleted: string[] = [];
        const dbSteps: Record<string, number[]> = {};
        const dbScores: Record<string, number> = {};

        if (progRes.data) {
          for (const row of progRes.data) {
            if (row.is_completed) dbCompleted.push(row.tutorial_id);
            if (row.completed_steps) dbSteps[row.tutorial_id] = row.completed_steps;
            if (row.quiz_score !== null && row.quiz_score !== undefined) {
              dbScores[row.tutorial_id] = row.quiz_score;
            }
          }
        }

        const dbBookmarks = bmRes.data?.map((b) => b.tutorial_id) || [];

        setProgress((prev) => {
          const merged: ProgressState = {
            completedTutorials: Array.from(new Set([...prev.completedTutorials, ...dbCompleted])),
            bookmarks: Array.from(new Set([...prev.bookmarks, ...dbBookmarks])),
            completedSteps: { ...prev.completedSteps, ...dbSteps },
            quizScores: { ...prev.quizScores, ...dbScores },
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        });
      } catch (err) {
        console.error('Error fetching Supabase progress:', err);
      }
    }

    fetchUserProgress();
  }, [user?.id]);

  const saveProgress = useCallback((newProgress: ProgressState) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      // quota or private browsing
    }
  }, []);

  const toggleStep = useCallback(
    async (tutorialId: string, stepOrder: number) => {
      const currentSteps = progress.completedSteps[tutorialId] || [];
      const isCompleted = currentSteps.includes(stepOrder);
      const updatedSteps = isCompleted
        ? currentSteps.filter((s) => s !== stepOrder)
        : [...currentSteps, stepOrder];

      const updated = {
        ...progress,
        completedSteps: {
          ...progress.completedSteps,
          [tutorialId]: updatedSteps,
        },
      };

      saveProgress(updated);

      if (user?.id) {
        try {
          const supabase = createClient();
          await supabase.from('user_progress').upsert(
            {
              user_id: user.id,
              tutorial_id: tutorialId,
              completed_steps: updatedSteps,
              last_step: stepOrder,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,tutorial_id' }
          );
        } catch (err) {
          console.error('Failed to sync step to Supabase:', err);
        }
      }
    },
    [progress, saveProgress, user?.id]
  );

  const isStepCompleted = useCallback(
    (tutorialId: string, stepOrder: number) => {
      return (progress.completedSteps[tutorialId] || []).includes(stepOrder);
    },
    [progress.completedSteps]
  );

  const toggleBookmark = useCallback(
    async (tutorialId: string) => {
      const isBookmarked = progress.bookmarks.includes(tutorialId);
      const updatedBookmarks = isBookmarked
        ? progress.bookmarks.filter((id) => id !== tutorialId)
        : [...progress.bookmarks, tutorialId];

      const updated = {
        ...progress,
        bookmarks: updatedBookmarks,
      };

      saveProgress(updated);
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!');

      if (user?.id) {
        try {
          const supabase = createClient();
          if (isBookmarked) {
            await supabase
              .from('bookmarks')
              .delete()
              .eq('user_id', user.id)
              .eq('tutorial_id', tutorialId);
          } else {
            await supabase.from('bookmarks').insert({
              user_id: user.id,
              tutorial_id: tutorialId,
            });
          }
        } catch (err) {
          console.error('Failed to sync bookmark to Supabase:', err);
        }
      }
    },
    [progress, saveProgress, user?.id]
  );

  const isBookmarked = useCallback(
    (tutorialId: string) => {
      return progress.bookmarks.includes(tutorialId);
    },
    [progress.bookmarks]
  );

  const markTutorialComplete = useCallback(
    async (tutorialId: string) => {
      if (progress.completedTutorials.includes(tutorialId)) return;

      const updated = {
        ...progress,
        completedTutorials: [...progress.completedTutorials, tutorialId],
      };

      saveProgress(updated);
      toast.success('Congratulations! Project marked as completed 🏆');

      if (user?.id) {
        try {
          const supabase = createClient();
          await supabase.from('user_progress').upsert(
            {
              user_id: user.id,
              tutorial_id: tutorialId,
              is_completed: true,
              completed_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,tutorial_id' }
          );

          // Increment tutorial completions count
          await supabase.rpc('increment_tutorial_completions', { tut_id: tutorialId });
        } catch (err) {
          console.error('Failed to sync completion to Supabase:', err);
        }
      }
    },
    [progress, saveProgress, user?.id]
  );

  const saveQuizScore = useCallback(
    async (tutorialId: string, score: number) => {
      const updated = {
        ...progress,
        quizScores: {
          ...progress.quizScores,
          [tutorialId]: score,
        },
      };
      saveProgress(updated);

      if (user?.id) {
        try {
          const supabase = createClient();
          await supabase.from('user_progress').upsert(
            {
              user_id: user.id,
              tutorial_id: tutorialId,
              quiz_score: score,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,tutorial_id' }
          );
        } catch (err) {
          console.error('Failed to sync quiz score to Supabase:', err);
        }
      }
    },
    [progress, saveProgress, user?.id]
  );

  const isTutorialCompleted = useCallback(
    (tutorialId: string) => {
      return progress.completedTutorials.includes(tutorialId);
    },
    [progress.completedTutorials]
  );

  return {
    progress,
    isLoaded,
    toggleStep,
    isStepCompleted,
    toggleBookmark,
    isBookmarked,
    markTutorialComplete,
    isTutorialCompleted,
    saveQuizScore,
  };
}
