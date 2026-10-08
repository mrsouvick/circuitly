'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { DataStore } from '@/lib/data/store';

interface ProgressState {
  completedSteps: Record<string, number[]>; // tutorialId -> step numbers
  completedTutorials: string[]; // tutorialIds
  bookmarks: string[]; // tutorialIds
  quizScores: Record<string, number>; // tutorialId -> score
}

const STORAGE_KEY = 'circuitly-user-progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({
    completedSteps: {},
    completedTutorials: ['tut-1'],
    bookmarks: ['tut-3', 'tut-6'],
    quizScores: { 'tut-1': 100 },
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        // use initial
      }
    }
  }, []);

  const saveProgress = (newProgress: ProgressState) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const toggleStep = (tutorialId: string, stepOrder: number) => {
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
  };

  const isStepCompleted = (tutorialId: string, stepOrder: number) => {
    return (progress.completedSteps[tutorialId] || []).includes(stepOrder);
  };

  const toggleBookmark = (tutorialId: string) => {
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
  };

  const isBookmarked = (tutorialId: string) => {
    return progress.bookmarks.includes(tutorialId);
  };

  const markTutorialComplete = (tutorialId: string) => {
    if (progress.completedTutorials.includes(tutorialId)) return;

    const updated = {
      ...progress,
      completedTutorials: [...progress.completedTutorials, tutorialId],
    };

    saveProgress(updated);
    DataStore.incrementTutorialCompletions(tutorialId);
    toast.success('Congratulations! Tutorial marked as completed 🏆');
  };

  const saveQuizScore = (tutorialId: string, score: number) => {
    const updated = {
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [tutorialId]: score,
      },
    };
    saveProgress(updated);
  };

  const isTutorialCompleted = (tutorialId: string) => {
    return progress.completedTutorials.includes(tutorialId);
  };

  return {
    progress,
    toggleStep,
    isStepCompleted,
    toggleBookmark,
    isBookmarked,
    markTutorialComplete,
    isTutorialCompleted,
    saveQuizScore,
  };
}
