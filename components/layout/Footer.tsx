'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Send, Heart, Github, Twitter, MessageSquare, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Omit on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Subscribed!', {
        description: 'You will receive weekly verified circuit tips every Friday.',
      });
      setEmail('');
    }, 400);
  };

  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] pt-16 pb-12 transition-colors">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E2E8F0]">
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <Logo size={36} />
              <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">Circuitly</span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed">
              From Zero to Maker — The interactive Arduino project tutorial platform empowering students, educators, and hobbyists with real hardware code and circuit simulation.
            </p>
            <div className="flex items-center space-x-2.5 pt-2">
              <a
                href="https://github.com/mrsouvick/circuitly"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="h-9 w-9 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/circuitly_io"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="h-9 w-9 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://discord.gg/circuitly"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="h-9 w-9 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/@circuitly"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="h-9 w-9 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tutorials" className="hover:text-[#2563EB] transition-colors">
                  All Tutorials
                </Link>
              </li>
              <li>
                <Link href="/paths" className="hover:text-[#2563EB] transition-colors">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-[#2563EB] transition-colors">
                  Wokwi Simulator
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="hover:text-[#2563EB] transition-colors">
                  Maker Showcase
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#2563EB] transition-colors">
                  Search Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#2563EB] transition-colors">
                  About Circuitly
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#2563EB] transition-colors">
                  Hardware Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2563EB] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#2563EB] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#2563EB] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
              Get weekly circuit tips
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Curated Arduino sketches, component teardowns, and engineering tips delivered every Friday.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 text-xs bg-white border-[#E2E8F0] focus-visible:ring-[#2563EB] rounded-[10px]"
                  required
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-10 px-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] shadow-sm text-xs font-semibold gap-1.5 shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{loading ? '...' : 'Subscribe'}</span>
                </Button>
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                No spam. Unsubscribe anytime in one click.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2025 Circuitly. All rights reserved.</p>
            <span className="hidden sm:inline text-[#CBD5E1]">•</span>
            <p className="text-[#94A3B8]">Powered by Arduino · Simulated by Wokwi</p>
          </div>
          <div className="flex items-center space-x-1.5">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for makers in India &amp; worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
