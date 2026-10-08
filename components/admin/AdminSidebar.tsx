'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Route,
  Sparkles,
  Users,
  MessageSquare,
  Award,
  BarChart3,
  Settings,
  Cpu,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';

const ADMIN_SECTIONS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tutorials', label: 'Tutorials', icon: BookOpen },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/paths', label: 'Learning Paths', icon: Route },
  { href: '/admin/showcase', label: 'Showcase Mod', icon: Sparkles },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/comments', label: 'Comments', icon: MessageSquare },
  { href: '/admin/badges', label: 'Badges', icon: Award },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'relative hidden md:flex flex-col border-r border-border/80 bg-[#0c0d14] transition-all duration-300 z-30 select-none min-h-screen',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
        <Link href="/admin" className="flex items-center space-x-2.5 group">
          <Logo size={34} />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                Circuitly
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/20 text-primary border border-primary/30">
                  ADMIN
                </span>
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {ADMIN_SECTIONS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all',
                isActive
                  ? 'bg-primary/15 text-primary border border-primary/30 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Back to Public Web Store */}
      <div className="p-3 border-t border-border/60">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'w-full text-xs text-muted-foreground hover:text-foreground gap-2 justify-start h-9',
              collapsed && 'px-2 justify-center'
            )}
          >
            <ArrowUpRight className="h-4 w-4 text-primary" />
            {!collapsed && <span>Exit to Public Site</span>}
          </Button>
        </Link>
      </div>
    </aside>
  );
}
