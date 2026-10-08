import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'mint' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none';

    const variants = {
      default:
        'bg-[#2563EB] text-white shadow-sm hover:bg-[#1D4ED8] hover:-translate-y-px hover:shadow-md',
      destructive:
        'bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:-translate-y-px hover:shadow-md',
      outline:
        'border border-[#E2E8F0] bg-white text-[#0F172A] shadow-sm hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:-translate-y-px hover:shadow-sm',
      secondary:
        'bg-[#F1F5F9] text-[#0F172A] shadow-sm hover:bg-[#E2E8F0] hover:-translate-y-px',
      ghost:
        'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]',
      link:
        'text-[#2563EB] underline-offset-4 hover:underline',
      mint:
        'bg-[#2563EB] text-white shadow-sm hover:bg-[#1D4ED8] hover:-translate-y-px hover:shadow-md',
      accent:
        'bg-[#06B6D4] text-white shadow-sm hover:bg-[#0891B2] hover:-translate-y-px hover:shadow-md',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 rounded-[8px] px-3 text-xs',
      lg: 'h-12 rounded-[10px] px-6 text-base font-semibold',
      icon: 'h-9 w-9 rounded-[10px]',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
