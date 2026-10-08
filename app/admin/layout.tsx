'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldAlert, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !isAdmin && !isLoginPage) {
      // If not authenticated as admin, automatically redirect to admin login
      router.push(`/admin/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [loading, isAdmin, isLoginPage, pathname, router]);

  // If on admin login page, render without sidebar or admin header
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07070c]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
          <p className="text-xs text-muted-foreground font-mono">Verifying Administrative Clearance...</p>
        </div>
      </div>
    );
  }

  // If user is not an admin, render unauthorized shield with quick access to Admin Login
  if (!isAdmin) {
    return (
      <div className="flex min-h-[85vh] flex-col items-center justify-center p-4 text-center space-y-4 bg-[#07070c]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-lg shadow-destructive/10">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Admin Authorization Required</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          You are currently signed in as &ldquo;{user?.username || 'Guest'}&rdquo; with role &ldquo;{user?.role || 'user'}&rdquo;.
          This area is strictly restricted to platform administrators with verified database clearance.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Platform</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#07070c]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
