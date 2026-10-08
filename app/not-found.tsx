import React from 'react';
import Link from 'next/link';
import { Cpu, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center p-4 text-center space-y-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-xl">
        <Cpu className="h-10 w-10 animate-bounce" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold text-foreground font-mono">404: Open Circuit</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The pin or wire you were looking for seems to have disconnected. Check your route or navigate back to the workshop workbench.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="mint" size="sm" className="gap-2 shadow-md">
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
