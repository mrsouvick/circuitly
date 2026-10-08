'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  DollarSign,
  Eye,
  CheckCircle2,
  Bookmark,
  Share2,
  Sparkles,
  Layers,
  HelpCircle,
  FileCode,
  ListOrdered,
  MessageSquare,
  Award,
  ChevronRight,
  Send,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DifficultyBadge } from '@/components/shared/DifficultyBadge';
import { CodeBlock } from '@/components/shared/CodeBlock';
import { ComponentsTable } from '@/components/tutorials/ComponentsTable';
import { StepList } from '@/components/tutorials/StepList';
import { TroubleshootingList } from '@/components/tutorials/TroubleshootingList';
import { QuizSection } from '@/components/tutorials/QuizSection';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { INITIAL_TUTORIALS, INITIAL_CATEGORIES, Tutorial } from '@/lib/seedData';
import { formatMinutes, formatPrice } from '@/lib/utils';
import { useProgress } from '@/hooks/useProgress';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';

export default function TutorialDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { user } = useAuth();

  const [tutorial, setTutorial] = useState<Tutorial | null>(() => {
    return INITIAL_TUTORIALS.find((t) => t.slug === slug) || null;
  });
  const [loading, setLoading] = useState(!tutorial);

  const { isBookmarked, toggleBookmark, markTutorialComplete, isTutorialCompleted } = useProgress();
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      id: 'c1',
      author: 'Lucas Vance',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=lucas',
      time: '2 days ago',
      text: 'Compiled on Arduino IDE 2.3 without a single hitch. The ultrasonic timing formula explanation is the clearest I have seen online.',
    },
    {
      id: 'c2',
      author: 'Sophia Chen',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=sophia',
      time: '4 days ago',
      text: 'Make sure your breadboard rails are common ground! I was scratching my head until I checked the troubleshooting section here.',
    },
  ]);

  useEffect(() => {
    if (tutorial) return;

    async function fetchTutorial() {
      try {
        const res = await fetch('/api/admin/tutorials');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const found = json.data.find((t: Tutorial) => t.slug === slug);
            if (found) {
              setTutorial(found);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load tutorial:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTutorial();
  }, [slug, tutorial]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Project URL copied to clipboard!');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const authorName = user?.full_name || user?.username || 'You (Maker)';
    const avatarUrl = user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=user_current';

    const newComment = {
      id: 'c-' + Date.now(),
      author: authorName,
      avatar: avatarUrl,
      time: 'Just now',
      text: commentText.trim(),
    };
    setCommentsList([newComment, ...commentsList]);

    if (user?.id && tutorial?.id) {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        await supabase.from('comments').insert({
          user_id: user.id,
          tutorial_id: tutorial.id,
          content: commentText.trim(),
        });
      } catch (err) {
        console.error('Failed to save comment to database:', err);
      }
    }

    setCommentText('');
    toast.success('Comment posted successfully!');
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tutorial) {
    return notFound();
  }

  const category = INITIAL_CATEGORIES.find((c) => c.id === tutorial.category_id);
  const bookmarked = isBookmarked(tutorial.id);
  const completed = isTutorialCompleted(tutorial.id);

  const relatedTutorials = INITIAL_TUTORIALS.filter(
    (t) => t.id !== tutorial.id && (t.category_id === tutorial.category_id || t.difficulty === tutorial.difficulty)
  ).slice(0, 3);

  return (
    <div className="container py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/tutorials" className="hover:text-foreground">Tutorials</Link>
        <ChevronRight className="h-3 w-3" />
        {category && (
          <>
            <span className="hover:text-foreground">{category.name}</span>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="text-foreground font-medium truncate max-w-xs">{tutorial.title}</span>
      </nav>

      {/* Hero Header Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-border/80 bg-card/40 p-6 sm:p-8 backdrop-blur-sm">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={tutorial.difficulty} />
            {category && (
              <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground border border-border">
                {category.name}
              </span>
            )}
            {completed && (
              <span className="flex items-center gap-1 rounded-full bg-[#00E5A0]/20 px-2.5 py-0.5 text-xs font-semibold text-[#00E5A0] border border-[#00E5A0]/30">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {tutorial.title}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tutorial.description}
          </p>

          {/* Quick Meta Row */}
          <div className="flex flex-wrap items-center gap-5 pt-2 text-xs sm:text-sm text-muted-foreground border-t border-border/40">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-primary" />
              {formatMinutes(tutorial.time_estimate)}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <DollarSign className="h-4 w-4 text-[#00E5A0]" />
              {formatPrice(tutorial.cost_estimate)} estimated BOM
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {tutorial.views_count.toLocaleString()} views
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              {tutorial.completions_count.toLocaleString()} completed
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button
              onClick={() => markTutorialComplete(tutorial.id)}
              variant={completed ? 'secondary' : 'mint'}
              size="sm"
              className="gap-2 shadow-md"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{completed ? 'Marked as Complete' : 'Mark as Complete'}</span>
            </Button>

            <Button
              onClick={() => toggleBookmark(tutorial.id)}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current text-[#00E5A0]' : ''}`} />
              <span>{bookmarked ? 'Bookmarked' : 'Bookmark Project'}</span>
            </Button>

            <Button onClick={handleShare} variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Hero Photograph Preview */}
        <div className="lg:col-span-5">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl border border-border shadow-xl">
            <Image
              src={tutorial.hero_image}
              alt={tutorial.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 7-Tab Navigation Container */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-12 p-1.5 bg-secondary/60 rounded-2xl">
          <TabsTrigger value="overview" className="gap-1.5 text-xs sm:text-sm">
            <Layers className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="components" className="gap-1.5 text-xs sm:text-sm">
            <DollarSign className="h-4 w-4" />
            BOM Components
          </TabsTrigger>
          <TabsTrigger value="circuit" className="gap-1.5 text-xs sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Circuit Diagram
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-1.5 text-xs sm:text-sm">
            <FileCode className="h-4 w-4" />
            Arduino C++ Code
          </TabsTrigger>
          <TabsTrigger value="steps" className="gap-1.5 text-xs sm:text-sm">
            <ListOrdered className="h-4 w-4" />
            Build Steps ({tutorial.steps.length})
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="gap-1.5 text-xs sm:text-sm">
            <HelpCircle className="h-4 w-4" />
            Troubleshooting
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-1.5 text-xs sm:text-sm">
            <Award className="h-4 w-4" />
            Quiz ({tutorial.quiz.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border/80 bg-card/60 p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Key Learning Outcomes
              </h3>
              <ul className="space-y-2.5">
                {tutorial.learning_outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[#00E5A0] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card/60 p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Prerequisites & Knowledge Base
              </h3>
              <ul className="space-y-2.5">
                {tutorial.prerequisites.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Components BOM */}
        <TabsContent value="components" className="pt-4">
          <ComponentsTable components={tutorial.components} />
        </TabsContent>

        {/* Tab 3: Circuit Diagram */}
        <TabsContent value="circuit" className="pt-4 space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Schematic & Pinout Connections</h3>
            <p className="text-sm text-muted-foreground">
              Review connection rails and pin assignments before powering on your Arduino Uno board.
            </p>
            <div className="relative h-96 w-full overflow-hidden rounded-xl border border-border bg-[#0d0e15]">
              <Image
                src={tutorial.circuit_diagram || tutorial.hero_image}
                alt={`${tutorial.title} circuit schematic diagram`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Code */}
        <TabsContent value="code" className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Firmware Sketch</h3>
              <p className="text-sm text-muted-foreground">
                Copy directly into the Arduino IDE or download as an authentic .ino sketch file.
              </p>
            </div>
          </div>
          <CodeBlock
            code={tutorial.code}
            filename={`${tutorial.slug}.ino`}
            language="cpp"
          />
        </TabsContent>

        {/* Tab 5: Steps */}
        <TabsContent value="steps" className="pt-4">
          <StepList steps={tutorial.steps} tutorialId={tutorial.id} />
        </TabsContent>

        {/* Tab 6: Troubleshooting */}
        <TabsContent value="troubleshooting" className="pt-4">
          <TroubleshootingList items={tutorial.troubleshooting} />
        </TabsContent>

        {/* Tab 7: Quiz */}
        <TabsContent value="quiz" className="pt-4">
          <QuizSection quiz={tutorial.quiz} tutorialId={tutorial.id} />
        </TabsContent>
      </Tabs>

      {/* Community Comments Section */}
      <div className="rounded-3xl border border-border/80 bg-card/40 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">
              Maker Discussion ({commentsList.length})
            </h3>
          </div>
        </div>

        {/* Add comment box */}
        <form onSubmit={handleAddComment} className="flex gap-3">
          <input
            type="text"
            placeholder="Ask a technical question about this schematic or code..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" variant="mint" size="sm" className="gap-1.5 px-4">
            <Send className="h-3.5 w-3.5" />
            <span>Post</span>
          </Button>
        </form>

        {/* Comments Feed */}
        <div className="space-y-4">
          {commentsList.map((comm) => (
            <div key={comm.id} className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={comm.avatar} alt={comm.author} className="h-9 w-9 rounded-full bg-secondary" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{comm.author}</span>
                  <span className="text-[11px] text-muted-foreground">{comm.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {comm.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tutorials Section */}
      <div className="space-y-4 pt-6 border-t border-border/40">
        <h3 className="text-xl font-bold text-foreground">Related Projects You Might Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTutorials.map((tut) => (
            <TutorialCard key={tut.id} tutorial={tut} />
          ))}
        </div>
      </div>
    </div>
  );
}
