import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DifficultyLevel } from '@/types';

export function DifficultyBadge({ difficulty }: { difficulty: DifficultyLevel | string }) {
  const diff = difficulty.toLowerCase();

  if (diff === 'beginner') {
    return <Badge variant="mint">Beginner</Badge>;
  }
  if (diff === 'intermediate') {
    return <Badge variant="amber">Intermediate</Badge>;
  }
  if (diff === 'advanced') {
    return <Badge variant="coral">Advanced</Badge>;
  }

  return <Badge variant="outline">{difficulty}</Badge>;
}
