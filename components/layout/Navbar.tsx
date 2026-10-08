'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Cpu,
  Search,
  BookOpen,
  Route,
  MonitorPlay,
  Sparkles,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If in admin area, admin layout provides its own sidebar & header
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/tutorials', label: 'Tutorials', icon: BookOpen },
    { href: '/paths', label: 'Learning Paths', icon: Route },
    { href: '/simulator', label: 'Simulator', icon: MonitorPlay },
    { href: '/showcase', label: 'Showcase', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md transition-all">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <Logo size={36} />
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
              Circuitly
            </span>
            <span className="hidden sm:inline-flex text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
              v1.0
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative flex items-center space-x-1.5 px-3.5 py-2 text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'text-[#2563EB] font-semibold'
                    : 'text-[#475569] hover:text-[#0F172A]'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-[#2563EB]' : 'text-[#64748B] group-hover:text-[#0F172A]')} />
                <span>{link.label}</span>
                {/* Subtle underline on hover & active */}
                <span
                  className={cn(
                    'absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-200',
                    isActive ? 'bg-[#2563EB]' : 'bg-transparent group-hover:bg-[#CBD5E1]'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Search, Actions & Profile */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Quick Search trigger */}
          <Link
            href="/search"
            className="flex items-center space-x-2 h-9 px-3 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all duration-200"
          >
            <Search className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Search tutorials...</span>
            <kbd className="hidden lg:inline-block pointer-events-none px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#64748B] bg-white rounded border border-[#E2E8F0]">
              ⌘K
            </kbd>
          </Link>

          {/* User state */}
          {user ? (
            <div className="flex items-center space-x-2 pl-2">
              {isAdmin && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2563EB]/30 text-[#2563EB] hover:bg-[#EFF6FF] font-semibold gap-1.5 h-9 rounded-[10px]"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-9 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}
                    alt="avatar"
                    className="h-5 w-5 rounded-full"
                  />
                  <span>Dashboard</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                className="h-9 w-9 rounded-[10px] text-[#64748B] hover:text-red-600 hover:bg-red-50"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2.5">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-[10px] text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="h-9 rounded-[10px] px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                >
                  Start Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 rounded-[10px] text-[#0F172A]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-[10px] text-sm font-medium',
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 rounded-[10px] text-sm text-[#64748B] hover:text-[#0F172A]"
            >
              <Search className="h-4 w-4 text-[#2563EB]" />
              <span>Search tutorials...</span>
            </Link>

            {user ? (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#2563EB] text-white rounded-[10px]">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-red-600 rounded-[10px]"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-[10px]">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px]">
                    Start Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
