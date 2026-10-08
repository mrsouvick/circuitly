'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TutorialForm } from '@/components/admin/TutorialForm';
import { DataStore } from '@/lib/data/store';

export default function EditTutorialPage() {
  const params = useParams();
  const id = params?.id as string;

  const tutorial = DataStore.getTutorialById(id);

  if (!tutorial) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/tutorials"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Tutorials List</span>
      </Link>

      <TutorialForm initialTutorial={tutorial} isEditing={true} />
    </div>
  );
}
