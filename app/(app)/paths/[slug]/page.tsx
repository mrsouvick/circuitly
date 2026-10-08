'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Route,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DifficultyBadge } from '@/components/shared/DifficultyBadge';
import { INITIAL_PATHS, INITIAL_TUTORIALS } from '@/lib/seedData';
import { useProgress } from '@/hooks/useProgress';
import { formatMinutes } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function PathDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const path = INITIAL_PATHS.find((p) => p.slug === slug);
  const { isTutorialCompleted } = useProgress();

  if (!path) {
    return notFound();
  }

  const tutorials = path.tutorial_ids
    .map((id) => INITIAL_TUTORIALS.find((t) => t.id === id))
    .filter(Boolean);

  const completedCount = tutorials.filter((t) => t && isTutorialCompleted(t.id)).length;
  const percent = Math.round((completedCount / tutorials.length) * 100);

  const handleClaimCertificate = () => {
    if (percent < 100) {
      toast.error(`Complete all ${tutorials.length} projects to unlock your Maker Certificate.`);
      return;
    }
    toast.success('Certificate issued and verified on your public profile! 🏆');
  };

  return (
    <div className="container py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/paths" className="hover:text-foreground">Learning Paths</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium truncate">{path.title}</span>
      </nav>

      {/* Header Banner */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={path.difficulty} />
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
            {tutorials.length} Projects Track
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          {path.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          {path.description}
        </p>

        {/* Progress Tracker Bar */}
        <div className="space-y-2 pt-2 border-t border-border/40 max-w-xl">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground">Curriculum Completion</span>
            <span className="text-primary font-mono font-bold">
              {completedCount} / {tutorials.length} Completed ({percent}%)
            </span>
          </div>
          <Progress value={percent} indicatorColor="bg-primary" />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={handleClaimCertificate}
            variant={percent === 100 ? 'mint' : 'outline'}
            size="sm"
            className="gap-2"
          >
            <Award className="h-4 w-4" />
            <span>{percent === 100 ? 'Claim Verified Certificate' : 'Certificate Locked'}</span>
          </Button>
        </div>
      </div>

      {/* Sequential Tutorials Roadmap */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Route className="h-5 w-5 text-primary" />
          <span>Curriculum Steps</span>
        </h2>

        <div className="space-y-4">
          {tutorials.map((tut, index) => {
            if (!tut) return null;
            const completed = isTutorialCompleted(tut.id);

            return (
              <div
                key={tut.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-5 transition-all ${
                  completed
                    ? 'border-[#00E5A0]/40 bg-[#00E5A0]/5'
                    : 'border-border/80 bg-card/40 hover:border-primary/40 hover:bg-card/70'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                      completed
                        ? 'bg-[#00E5A0] text-black shadow-md'
                        : 'bg-secondary text-muted-foreground border border-border'
                    }`}
                  >
                    {completed ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DifficultyBadge difficulty={tut.difficulty} />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatMinutes(tut.time_estimate)}
                      </span>
                    </div>
                    <Link href={`/tutorials/${tut.slug}`}>
                      <h3 className="font-bold text-foreground text-base hover:text-primary transition-colors">
                        {tut.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-xl">
                      {tut.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <Link href={`/tutorials/${tut.slug}`}>
                    <Button variant={completed ? 'secondary' : 'outline'} size="sm" className="w-full sm:w-auto gap-2">
                      <span>{completed ? 'Review Project' : 'Start Project'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
