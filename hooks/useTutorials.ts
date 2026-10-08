'use client';

import { useQuery } from '@tanstack/react-query';
import { DataStore, TutorialFilters } from '@/lib/data/store';

export function useTutorials(filters?: TutorialFilters) {
  return useQuery({
    queryKey: ['tutorials', filters],
    queryFn: async () => {
      // Simulate micro network latency for smooth UI feel
      await new Promise((res) => setTimeout(res, 50));
      return DataStore.getTutorials(filters);
    },
  });
}

export function useTutorial(slug: string) {
  return useQuery({
    queryKey: ['tutorial', slug],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 50));
      const tutorial = DataStore.getTutorialBySlug(slug);
      if (tutorial) {
        DataStore.incrementTutorialViews(tutorial.id);
      }
      return tutorial;
    },
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return DataStore.getCategories();
    },
  });
}
