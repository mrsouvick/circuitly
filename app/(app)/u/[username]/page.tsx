'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  User,
  Award,
  BookOpen,
  Bookmark,
  Sparkles,
  Flame,
  Calendar,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { INITIAL_TUTORIALS, INITIAL_BADGES } from '@/lib/seedData';
import { toast } from 'sonner';

export default function UserProfilePage() {
  const params = useParams();
  const username = (params?.username as string) || 'maker';

  const [following, setFollowing] = useState(false);

  const userProjects = INITIAL_TUTORIALS.slice(0, 3);
  const userBookmarks = INITIAL_TUTORIALS.slice(3, 6);
  const userBadges = INITIAL_BADGES.slice(0, 6);

  const toggleFollow = () => {
    setFollowing(!following);
    toast.success(following ? `Unfollowed @${username}` : `Following @${username}!`);
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`}
              alt={username}
              className="h-20 w-20 rounded-2xl bg-secondary border-2 border-primary/40 shadow-xl"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-foreground capitalize">
                {username.replace('_', ' ')}
              </h1>
              <p className="text-sm font-mono text-primary">@{username}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Maker since January 2024</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={toggleFollow}
              variant={following ? 'secondary' : 'mint'}
              size="sm"
              className="px-5 shadow-md"
            >
              {following ? 'Following' : 'Follow Maker'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Profile URL copied to clipboard');
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          High school robotics competitor and embedded systems enthusiast. Currently building autonomous rovers and IoT home automation sensors with Arduino Uno and ESP32.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40 text-xs sm:text-sm">
          <div>
            <span className="font-bold font-mono text-foreground">14</span>{' '}
            <span className="text-muted-foreground">Tutorials Completed</span>
          </div>
          <div>
            <span className="font-bold font-mono text-foreground">6</span>{' '}
            <span className="text-muted-foreground">Badges</span>
          </div>
          <div className="flex items-center gap-1 text-orange-400 font-bold font-mono">
            <Flame className="h-4 w-4 fill-current" />
            <span>12 Day Streak</span>
          </div>
        </div>
      </div>

      {/* Tabs: Projects, Bookmarks, Badges, Activity */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="bg-secondary/60 p-1 rounded-2xl">
          <TabsTrigger value="projects" className="gap-1.5 text-xs sm:text-sm">
            <BookOpen className="h-4 w-4" />
            Completed Projects ({userProjects.length})
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="gap-1.5 text-xs sm:text-sm">
            <Bookmark className="h-4 w-4" />
            Bookmarks ({userBookmarks.length})
          </TabsTrigger>
          <TabsTrigger value="badges" className="gap-1.5 text-xs sm:text-sm">
            <Award className="h-4 w-4" />
            Earned Badges ({userBadges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userProjects.map((tut) => (
              <TutorialCard key={tut.id} tutorial={tut} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userBookmarks.map((tut) => (
              <TutorialCard key={tut.id} tutorial={tut} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {userBadges.map((badge) => (
              <Card
                key={badge.id}
                className="flex flex-col items-center text-center p-5 space-y-3 border-border/80 bg-card/40"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner"
                  style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                >
                  <Sparkles className="h-7 w-7" />
                </div>
                <h4 className="text-xs font-bold text-foreground">{badge.name}</h4>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {badge.description}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
