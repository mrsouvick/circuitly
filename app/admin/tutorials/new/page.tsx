'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TutorialForm } from '@/components/admin/TutorialForm';

export default function NewTutorialPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/tutorials"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Tutorials List</span>
      </Link>

      <TutorialForm />
    </div>
  );
}
