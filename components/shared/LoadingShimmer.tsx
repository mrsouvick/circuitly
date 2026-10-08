import React from 'react';
import { cn } from '@/lib/utils';

export function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-secondary/60 animate-shimmer',
        className
      )}
    />
  );
}

export function TutorialCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-4 shadow-sm">
      <Shimmer className="h-44 w-full rounded-xl" />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Shimmer className="h-5 w-20 rounded-full" />
          <Shimmer className="h-4 w-16 rounded-md" />
        </div>
        <Shimmer className="h-6 w-3/4 rounded-md" />
        <Shimmer className="h-4 w-full rounded-md" />
        <Shimmer className="h-4 w-2/3 rounded-md" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <Shimmer className="h-4 w-24 rounded-md" />
        <Shimmer className="h-4 w-16 rounded-md" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-border/40">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Shimmer className="h-5 w-full max-w-[120px] rounded-md" />
        </td>
      ))}
    </tr>
  );
}
