'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Heart,
  PlusCircle,
  ExternalLink,
  MessageSquare,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { INITIAL_SHOWCASES, Showcase } from '@/lib/seedData';
import { toast } from 'sonner';

export default function ShowcaseIndexPage() {
  const [showcases, setShowcases] = useState<Showcase[]>(INITIAL_SHOWCASES);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const handleLike = (id: string) => {
    const isLiked = likedIds.includes(id);
    setLikedIds(isLiked ? likedIds.filter((item) => item !== id) : [...likedIds, id]);

    setShowcases((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            likes_count: isLiked ? s.likes_count - 1 : s.likes_count + 1,
          };
        }
        return s;
      })
    );

    toast.success(isLiked ? 'Removed like' : 'Liked project!');
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-semibold text-primary tracking-wider">
              Community Gallery
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Maker Project Showcase
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore authentic Arduino hardware prototypes built by students and embedded developers worldwide.
          </p>
        </div>

        <Link href="/showcase/new">
          <Button variant="mint" className="gap-2 shadow-md">
            <PlusCircle className="h-4 w-4" />
            <span>Submit Your Project</span>
          </Button>
        </Link>
      </div>

      {/* Grid of Showcases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcases.map((item) => {
          const isLiked = likedIds.includes(item.id);

          return (
            <Card
              key={item.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border-border/80 bg-card/60 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.status === 'featured' && (
                    <div className="absolute top-3 left-3 rounded-full bg-[#00E5A0] px-2.5 py-0.5 text-[11px] font-bold text-black shadow">
                      ★ Featured
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  {/* Creator Info */}
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + item.id}
                      alt={item.user?.full_name || ''}
                      className="h-7 w-7 rounded-full bg-secondary"
                    />
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-foreground">
                        {item.user?.full_name || 'Maker Student'}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        @{item.user?.username || 'maker'}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Components Tag Pills */}
                  {item.components.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.components.map((comp, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border"
                        >
                          {comp.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between border-t border-border/40 p-4 pt-3 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1.5 font-medium transition-colors ${
                    isLiked ? 'text-[#FF6B6B]' : 'hover:text-[#FF6B6B]'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{item.likes_count}</span>
                </button>

                <span className="text-[11px] text-muted-foreground/60">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
