'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, DollarSign, Eye, Bookmark, CheckCircle2 } from 'lucide-react';
import { DifficultyBadge } from '@/components/shared/DifficultyBadge';
import { Tutorial } from '@/types';
import { formatMinutes, formatPrice } from '@/lib/utils';
import { useProgress } from '@/hooks/useProgress';

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const { isBookmarked, toggleBookmark, isTutorialCompleted } = useProgress();
  const bookmarked = isBookmarked(tutorial.id);
  const completed = isTutorialCompleted(tutorial.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#CBD5E1] hover:shadow-lg hover:-translate-y-1">
      {/* Thumbnail Banner with rounded-t-[15px] and inner padding */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F1F5F9]">
        <Image
          src={tutorial.hero_image}
          alt={tutorial.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <DifficultyBadge difficulty={tutorial.difficulty} />
          {completed && (
            <span className="flex items-center gap-1 rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-semibold text-[#059669] border border-[#A7F3D0] shadow-sm">
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </span>
          )}
        </div>

        {/* Bookmark quick button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(tutorial.id);
          }}
          className={`absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-[8px] backdrop-blur-md transition-all duration-200 ${
            bookmarked
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-white/80 text-[#0F172A] hover:bg-white shadow-sm'
          }`}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark tutorial'}
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
        <div className="space-y-2">
          <Link href={`/tutorials/${tutorial.slug}`}>
            <h3 className="text-base font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#2563EB] transition-colors duration-200">
              {tutorial.title}
            </h3>
          </Link>
          <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
            {tutorial.description}
          </p>
        </div>

        {/* Meta Stats Bar */}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3.5 text-xs text-[#64748B]">
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1 font-medium" title="Time estimate">
              <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
              {formatMinutes(tutorial.time_estimate)}
            </span>
            <span className="flex items-center gap-1 font-medium text-[#059669]" title="Estimated component cost">
              <DollarSign className="h-3.5 w-3.5 text-[#059669]" />
              {formatPrice(tutorial.cost_estimate)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#94A3B8]" title="Views">
            <Eye className="h-3.5 w-3.5" />
            <span>{tutorial.views_count.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
