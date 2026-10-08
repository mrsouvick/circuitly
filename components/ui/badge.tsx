import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'mint' | 'amber' | 'coral' | 'blue';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-[#2563EB] text-white shadow-sm',
    secondary: 'border-[#E2E8F0] bg-[#F1F5F9] text-[#0F172A]',
    destructive: 'border-transparent bg-red-100 text-red-700',
    outline: 'text-[#0F172A] border-[#E2E8F0] bg-white',
    mint: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
    amber: 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]',
    coral: 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
    blue: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
