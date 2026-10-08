'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  TrendingUp,
  Activity,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProgress } from '@/hooks/useProgress';
import { INITIAL_TUTORIALS, INITIAL_BADGES, Tutorial, Badge } from '@/lib/seedData';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const { user } = useAuth();
  const { progress, isLoaded } = useProgress();
  const [tutorials, setTutorials] = useState<Tutorial[]>(INITIAL_TUTORIALS);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const [tutRes, badgeRes] = await Promise.all([
          fetch('/api/admin/tutorials'),
          fetch('/api/admin/badges'),
        ]);
        if (tutRes.ok) {
          const tJson = await tutRes.json();
          if (tJson.success && Array.isArray(tJson.data) && tJson.data.length > 0) {
            setTutorials(tJson.data);
          }
        }
        if (badgeRes.ok) {
          const bJson = await badgeRes.json();
          if (bJson.success && Array.isArray(bJson.data) && bJson.data.length > 0) {
            setBadges(bJson.data);
          }
        }
      } catch (err) {
        // Fallback to static seed data
      }
    }
    loadCatalog();
  }, []);

  // 1. Real Completed Tutorials
  const completedTutorials = tutorials.filter((t) =>
    progress.completedTutorials.includes(t.id)
  );

  // 2. Real Bookmarked Tutorials
  const bookmarkedTutorials = tutorials.filter((t) =>
    progress.bookmarks.includes(t.id)
  );

  // 3. Real In-Progress Tutorials
  const inProgressTutorials = tutorials.filter(
    (t) =>
      progress.completedSteps[t.id] &&
      progress.completedSteps[t.id].length > 0 &&
      !progress.completedTutorials.includes(t.id)
  );

  // If no in-progress projects, show initial suggested tutorials to begin
  const displayContinue = inProgressTutorials.length > 0
    ? inProgressTutorials.slice(0, 3)
    : tutorials.slice(0, 3);

  // 4. Real Quiz Accuracy
  const quizScoresList = Object.values(progress.quizScores || {});
  const averageQuizAccuracy =
    quizScoresList.length > 0
      ? Math.round(
          quizScoresList.reduce((acc, score) => acc + score, 0) / quizScoresList.length
        )
      : 0;

  // 5. Real Hands-On Build Time
  const totalMinutesBuilt = completedTutorials.reduce(
    (acc, t) => acc + (t.time_estimate || 0),
    0
  );
  const buildTimeFormatted =
    totalMinutesBuilt >= 60
      ? `${(totalMinutesBuilt / 60).toFixed(1)} hrs`
      : `${totalMinutesBuilt} mins`;

  // 6. Real Badges Unlocked
  const unlockedBadges = badges.filter(
    (b) => completedTutorials.length >= (b.requirement_rule?.threshold || 1)
  );

  // Recommended next tutorials: not completed, beginner or intermediate
  const recommendedTutorials = tutorials
    .filter((t) => !progress.completedTutorials.includes(t.id))
    .slice(0, 3);

  return (
    <div className="container py-8 space-y-8">
      {/* 1. WELCOME HEADER & STREAK BANNER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl border border-border/80 bg-gradient-to-r from-card/80 via-card/50 to-primary/5 p-6 md:p-8 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-semibold tracking-wider text-primary">
              Student Lab & Workbench
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Welcome back, {user?.full_name || user?.username || 'Maker'}! 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            {completedTutorials.length > 0
              ? `You have completed ${completedTutorials.length} hardware project${completedTutorials.length > 1 ? 's' : ''}. Keep up the momentum!`
              : 'Start your first circuit simulation tutorial below to begin earning maker badges.'}
          </p>
        </div>

        {/* Streak Counter Pill */}
        <div className="flex items-center gap-3 bg-[#0d0f17] border border-orange-500/30 px-5 py-3 rounded-2xl shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
            <Flame className="h-6 w-6 fill-current animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-orange-400">
                {user?.streak_count || 1}
              </span>
              <span className="text-xs font-bold text-muted-foreground">
                {(user?.streak_count || 1) === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">Active Streak</p>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Completed Projects</span>
            <BookOpen className="h-4 w-4 text-[#00E5A0]" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">
            {completedTutorials.length}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#00E5A0]">
            <TrendingUp className="h-3 w-3" />
            <span>
              {completedTutorials.length > 0
                ? `${completedTutorials.length} verified builds`
                : 'Ready to start'}
            </span>
          </div>
        </Card>

        <Card className="p-5 border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Quiz Accuracy</span>
            <Award className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">
            {quizScoresList.length > 0 ? `${averageQuizAccuracy}%` : '—'}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {quizScoresList.length > 0
              ? `Across ${quizScoresList.length} knowledge check${quizScoresList.length > 1 ? 's' : ''}`
              : 'Pass quizzes to track score'}
          </p>
        </Card>

        <Card className="p-5 border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Hands-On Build Time</span>
            <Clock className="h-4 w-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">
            {totalMinutesBuilt > 0 ? buildTimeFormatted : '0 mins'}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {totalMinutesBuilt > 0 ? 'Firmware coding & testing' : 'Start your first build'}
          </p>
        </Card>

        <Card className="p-5 border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Bookmarks Saved</span>
            <Bookmark className="h-4 w-4 text-[#FF6B6B]" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">
            {bookmarkedTutorials.length}
          </p>
          <p className="text-[11px] text-muted-foreground">Queued for workbench lab</p>
        </Card>
      </div>

      {/* 3. CONTINUE LEARNING SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              {inProgressTutorials.length > 0 ? 'Continue Learning' : 'Jump Into A Project'}
            </h2>
          </div>
          <Link href="/tutorials" className="text-xs text-primary hover:underline">
            View All Tutorials ({tutorials.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayContinue.map((tut) => {
            const stepCount = Array.isArray(tut.steps) ? tut.steps.length : 5;
            const completedCount = progress.completedSteps[tut.id]?.length || 0;
            const percent = Math.min(100, Math.round((completedCount / stepCount) * 100));
            const hasStarted = completedCount > 0;

            return (
              <div
                key={tut.id}
                className="rounded-2xl border border-border/80 bg-card/60 p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono text-primary font-semibold">
                      {hasStarted ? 'In Progress' : 'Recommended'}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {hasStarted ? `${percent}%` : `${tut.time_estimate || 20}m`}
                    </span>
                  </div>
                  <Link href={`/tutorials/${tut.slug}`}>
                    <h3 className="font-bold text-foreground line-clamp-1 hover:text-primary transition-colors">
                      {tut.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tut.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Progress value={hasStarted ? percent : 0} indicatorColor="bg-primary" />
                  <Link href={`/tutorials/${tut.slug}`}>
                    <Button variant={hasStarted ? 'default' : 'outline'} size="sm" className="w-full text-xs">
                      {hasStarted
                        ? `Resume Step ${completedCount + 1} of ${stepCount}`
                        : 'Start Tutorial →'}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BADGES EARNED & REAL ACTIVITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Earned */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Badges & Achievements</h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {unlockedBadges.length} of {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.slice(0, 8).map((badge) => {
              const isUnlocked = completedTutorials.length >= (badge.requirement_rule?.threshold || 1);

              return (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-colors space-y-2 ${
                    isUnlocked
                      ? 'border-border/80 bg-card/60 hover:border-primary/40'
                      : 'border-border/40 bg-card/20 opacity-60'
                  }`}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner relative"
                    style={{
                      backgroundColor: isUnlocked ? `${badge.color}25` : '#1f293720',
                      color: isUnlocked ? badge.color : '#6b7280',
                    }}
                  >
                    {isUnlocked ? (
                      <Sparkles className="h-6 w-6" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-foreground">{badge.name}</h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {isUnlocked
                      ? badge.description
                      : `Complete ${badge.requirement_rule?.threshold || 1} project${(badge.requirement_rule?.threshold || 1) > 1 ? 's' : ''} to unlock`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Your Lab Activity</h2>
          <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-4">
            {completedTutorials.length > 0 ? (
              completedTutorials.slice(0, 3).map((tut) => (
                <div key={tut.id} className="flex items-start gap-3 text-xs">
                  <div className="h-2 w-2 rounded-full bg-[#00E5A0] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Completed {tut.title}</p>
                    <p className="text-muted-foreground text-[11px]">
                      {progress.quizScores[tut.id]
                        ? `${progress.quizScores[tut.id]}% quiz score`
                        : 'Verified build'} • Logged in database
                    </p>
                  </div>
                </div>
              ))
            ) : inProgressTutorials.length > 0 ? (
              inProgressTutorials.slice(0, 3).map((tut) => (
                <div key={tut.id} className="flex items-start gap-3 text-xs">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Building {tut.title}</p>
                    <p className="text-muted-foreground text-[11px]">
                      {progress.completedSteps[tut.id]?.length || 0} steps completed
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 space-y-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="text-xs font-semibold text-foreground">No completed projects yet</p>
                <p className="text-[11px] text-muted-foreground">
                  Pick any Arduino tutorial below to start your maker journey!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. RECOMMENDED NEXT TUTORIALS */}
      <div className="space-y-4 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Recommended for Your Skill Level</h2>
          <Link href="/tutorials">
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedTutorials.map((tut) => (
            <TutorialCard key={tut.id} tutorial={tut} />
          ))}
        </div>
      </div>
    </div>
  );
}
