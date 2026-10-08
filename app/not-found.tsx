import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center p-4 text-center space-y-6">
      <Logo size={64} roundedClassName="rounded-[18px]" className="shadow-lg animate-pulse" />

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold text-[#0F172A] font-heading">404: Open Circuit</h1>
        <p className="text-sm text-[#64748B] leading-relaxed">
          The pin or wire you were looking for seems to have disconnected. Check your route or navigate back to the workshop workbench.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button size="sm" className="gap-2 shadow-sm bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] h-9">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Workbench</span>
          </Button>
        </Link>
        <Link href="/tutorials">
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="h-4 w-4" />
            <span>Browse All Tutorials</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
