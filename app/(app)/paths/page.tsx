'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Route, Clock, BookOpen, CheckCircle, ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DifficultyBadge } from '@/components/shared/DifficultyBadge';
import { INITIAL_PATHS, INITIAL_TUTORIALS, LearningPath, Tutorial } from '@/lib/seedData';

export default function PathsIndexPage() {
  const [pathsList, setPathsList] = useState<LearningPath[]>(INITIAL_PATHS);
  const [tutorialsList, setTutorialsList] = useState<Tutorial[]>(INITIAL_TUTORIALS);

  useEffect(() => {
    async function loadPaths() {
      try {
        const [pRes, tRes] = await Promise.all([
          fetch('/api/admin/paths'),
          fetch('/api/admin/tutorials'),
        ]);
        if (pRes.ok) {
          const pJson = await pRes.json();
          if (pJson.success && Array.isArray(pJson.data) && pJson.data.length > 0) {
            setPathsList(pJson.data);
          }
        }
        if (tRes.ok) {
          const tJson = await tRes.json();
          if (tJson.success && Array.isArray(tJson.data) && tJson.data.length > 0) {
            setTutorialsList(tJson.data);
          }
        }
      } catch (err) {
        // Fallback
      }
    }
    loadPaths();
  }, []);

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase font-mono font-semibold text-primary tracking-wider">
          Structured Mastery
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          Curated Learning Paths
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Step-by-step sequential curricula engineered to guide you from breadboard basics all the way to autonomous robotics and internet telemetry.
        </p>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pathsList.map((path) => {
          const tutorialsInPath = tutorialsList.filter((t) =>
            path.tutorial_ids.includes(t.id)
          );
          const totalHours = Math.round(
            tutorialsInPath.reduce((acc, t) => acc + t.time_estimate, 0) / 60
          );

          return (
            <Card
              key={path.id}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border-border/80 bg-card/60 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={path.cover_image}
                    alt={path.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <DifficultyBadge difficulty={path.difficulty} />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {path.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
                    <span className="flex items-center gap-1.5 font-medium">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      {path.tutorial_ids.length} Projects
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5 text-sky-400" />
                      ~{totalHours} Hours
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Award className="h-3.5 w-3.5 text-amber-400" />
                      Certificate
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link href={`/paths/${path.slug}`}>
                  <Button variant="outline" className="w-full gap-2 justify-between">
                    <span>Start This Path</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
