'use client';

import React from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProgress } from '@/hooks/useProgress';
import { INITIAL_TUTORIALS, INITIAL_BADGES } from '@/lib/seedData';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const { user } = useAuth();
  const { progress } = useProgress();

  const completedTutorials = INITIAL_TUTORIALS.filter((t) =>
    progress.completedTutorials.includes(t.id)
  );

  const bookmarkedTutorials = INITIAL_TUTORIALS.filter((t) =>
    progress.bookmarks.includes(t.id)
  );

  const continueTutorials = INITIAL_TUTORIALS.slice(0, 3);
  const recommendedTutorials = INITIAL_TUTORIALS.slice(3, 6);

  const userBadges = INITIAL_BADGES.slice(0, 4);

  return (
    <div className="container py-8 space-y-8">
      {/* 1. WELCOME HEADER & STREAK BANNER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl border border-border/80 bg-gradient-to-r from-card/80 via-card/50 to-primary/5 p-6 md:p-8 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-semibold tracking-wider text-primary">
              Student Workshop
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Welcome back, {user?.full_name || 'Maker'}! 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            You are making steady progress on your Arduino embedded systems curriculum.
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
                {user?.streak_count || 7}
              </span>
              <span className="text-xs font-bold text-muted-foreground">Days</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Coding Streak</p>
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
            <span>+2 this month</span>
          </div>
        </Card>

        <Card className="p-5 border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Quiz Accuracy</span>
            <Award className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">94%</p>
          <p className="text-[11px] text-muted-foreground">Across all knowledge checks</p>
        </Card>

        <Card className="p-5 border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Hands-On Build Time</span>
            <Clock className="h-4 w-4 text-sky-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">4.5 hrs</p>
          <p className="text-[11px] text-muted-foreground">Breadboard & firmware coding</p>
        </Card>

        <Card className="p-5 border-border/80 bg-card/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Bookmarks Saved</span>
            <Bookmark className="h-4 w-4 text-[#FF6B6B]" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">
            {bookmarkedTutorials.length}
          </p>
          <p className="text-[11px] text-muted-foreground">Queued for weekend lab</p>
        </Card>
      </div>

      {/* 3. CONTINUE LEARNING SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Continue Learning</h2>
          </div>
          <Link href="/tutorials" className="text-xs text-primary hover:underline">
            View All Tutorials →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {continueTutorials.map((tut, i) => {
            const stepCount = tut.steps.length;
            const completedCount = progress.completedSteps[tut.id]?.length || (i === 0 ? 5 : 2);
            const percent = Math.min(100, Math.round((completedCount / stepCount) * 100));

            return (
              <div
                key={tut.id}
                className="rounded-2xl border border-border/80 bg-card/60 p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono text-primary font-semibold">
                      In Progress
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{percent}%</span>
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
                  <Progress value={percent} indicatorColor="bg-primary" />
                  <Link href={`/tutorials/${tut.slug}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Resume Step {completedCount + 1} of {stepCount}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BADGES EARNED & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Earned */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Badges Earned</h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {userBadges.length} of {INITIAL_BADGES.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {userBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-border/80 bg-card/40 space-y-2 hover:border-primary/40 transition-colors"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner"
                  style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                >
                  <Sparkles className="h-6 w-6" />
                </div>
                <h4 className="text-xs font-bold text-foreground">{badge.name}</h4>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
          <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-4">
            <div className="flex items-start gap-3 text-xs">
              <div className="h-2 w-2 rounded-full bg-[#00E5A0] mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Completed Blink LED</p>
                <p className="text-muted-foreground text-[11px]">100% quiz score achieved • 2 hrs ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs">
              <div className="h-2 w-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Earned &ldquo;First Blink&rdquo; Badge</p>
                <p className="text-muted-foreground text-[11px]">Added to public profile • Yesterday</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs">
              <div className="h-2 w-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Simulated HC-SR04 Sonar</p>
                <p className="text-muted-foreground text-[11px]">Wokwi test run completed • 2 days ago</p>
              </div>
            </div>
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
