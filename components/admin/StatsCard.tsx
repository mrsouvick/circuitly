import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: string;
  description?: string;
}

export function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  color = '#00E5A0',
  description,
}: StatsCardProps) {
  return (
    <Card className="p-5 border-border/80 bg-card/60 shadow-sm transition-all hover:border-primary/40">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-1 mt-3">
        <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">
          {value}
        </h3>
        {(change || description) && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {change && (
              <span
                className={`flex items-center font-semibold font-mono ${
                  isPositive ? 'text-[#00E5A0]' : 'text-destructive'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 mr-1" />
                )}
                {change}
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}
