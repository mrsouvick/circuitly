import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { TroubleshootingItem } from '@/types';

export function TroubleshootingList({ items }: { items: TroubleshootingItem[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
        No troubleshooting issues reported for this circuit.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <AlertCircle className="h-5 w-5 text-amber-400" />
        <h3 className="text-lg font-bold text-foreground">Common Gotchas & Diagnostics</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-2 hover:border-border transition-colors"
          >
            <div className="flex items-start gap-2.5">
              <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <h4 className="text-sm font-semibold text-foreground leading-snug">
                {item.question}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground pl-6 leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
