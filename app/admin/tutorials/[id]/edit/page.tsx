'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { TutorialForm } from '@/components/admin/TutorialForm';
import { DataStore } from '@/lib/data/store';
import { Tutorial } from '@/types';

export default function EditTutorialPage() {
  const params = useParams();
  const id = params?.id as string;

  const [tutorial, setTutorial] = useState<Tutorial | null>(() => {
    return DataStore.getTutorialById(id) || null;
  });
  const [loading, setLoading] = useState(!tutorial);

  useEffect(() => {
    if (tutorial) return;

    async function fetchTutorial() {
      try {
        const res = await fetch('/api/admin/tutorials');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const found = json.data.find((t: Tutorial) => t.id === id);
            if (found) {
              setTutorial(found);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching tutorial:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTutorial();
  }, [id, tutorial]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
