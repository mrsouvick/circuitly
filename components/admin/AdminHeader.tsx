'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, ShieldCheck, ExternalLink, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';

export function AdminHeader() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Create breadcrumb from pathname
  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/80 bg-[#0c0d14]/90 px-6 backdrop-blur-md">
      {/* Breadcrumb Path */}
      <div className="flex items-center space-x-2 text-xs font-medium">
        <span className="text-muted-foreground">Admin</span>
        {segments.slice(1).map((seg, idx) => (
          <React.Fragment key={idx}>
            <span className="text-muted-foreground/40">/</span>
            <span className="capitalize text-foreground font-semibold">{seg}</span>
          </React.Fragment>
        ))}
      </div>

      {/* Right Tools */}
      <div className="flex items-center space-x-3">
        <Link href="/" target="_blank">
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <span>View Live Site</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </Link>

        {/* Notifications Icon */}
        <button
          type="button"
          className="relative rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          title="Admin notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=admin'}
            alt="admin"
            className="h-8 w-8 rounded-xl bg-secondary border border-primary/40"
          />
          <div className="hidden sm:block text-left text-xs leading-tight">
            <p className="font-bold text-foreground">{user?.full_name || 'Admin'}</p>
            <p className="text-[10px] font-mono text-primary flex items-center gap-0.5">
              <ShieldCheck className="h-2.5 w-2.5" />
              Role: {user?.role || 'admin'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
