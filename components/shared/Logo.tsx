import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  roundedClassName?: string;
}

export function Logo({ size = 36, className, roundedClassName = 'rounded-[10px]' }: LogoProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105',
        roundedClassName,
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Circuitly Logo"
        width={size}
        height={size}
        priority
        className="h-full w-full object-contain"
      />
    </div>
  );
}
