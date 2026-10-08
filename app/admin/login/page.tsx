'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { LoginSchema, LoginFormData } from '@/lib/validations/auth';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';
  const errorParam = searchParams.get('error');

  const { signInAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(
    errorParam === 'forbidden' 
      ? 'Access Denied: You tried to access the Administrative Console without an active Admin role.'
      : null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await signInAdmin(data.email, data.password);

      if (!result.success) {
        setAuthError(result.error || 'Authentication rejected. Administrator clearance required.');
        toast.error('Admin Access Denied', {
          description: result.error || 'Invalid credentials or missing administrator privileges.',
        });
        return;
      }

      toast.success('Admin clearance granted', {
        description: 'Welcome to Circuitly Control Center.',
      });
      router.push(redirectTo);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'System authentication error';
      setAuthError(msg);
      toast.error('Authentication Error', { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06070b] p-4 text-slate-100 selection:bg-[#00E5A0] selection:text-black">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00E5A0]/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand & Security Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#00E5A0]/20 to-emerald-950/40 border border-[#00E5A0]/30 shadow-lg shadow-[#00E5A0]/10">
            <ShieldCheck className="h-8 w-8 text-[#00E5A0]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              <span>Circuitly</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-widest font-mono">
                Admin Portal
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Restricted Control Plane &bull; Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 text-slate-300">
            <p className="font-semibold text-amber-300">High Security Zone</p>
            <p className="text-slate-400 leading-relaxed">
              All administrative sessions, modifications, and IP telemetry are audited in the system logs. Student accounts cannot authenticate here.
            </p>
          </div>
        </div>

        {/* Dynamic Error Alert */}
        {authError && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-red-200">
              <p className="font-bold text-red-400 uppercase tracking-wider">Access Denied</p>
              <p className="leading-relaxed">{authError}</p>
            </div>
          </div>
        )}

        {/* Admin Login Card */}
        <Card className="border-slate-800 bg-[#0d0f18]/80 shadow-2xl backdrop-blur-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white flex items-center justify-between">
              <span>Admin Authentication</span>
              <Lock className="h-4 w-4 text-[#00E5A0]" />
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Verify your administrative credentials to continue to the backend
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Administrator Email</span>
                  <span className="text-[10px] text-slate-500 font-mono">role: admin</span>
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="admin@circuitly.io"
                    className="bg-black/40 border-slate-700/80 text-white placeholder:text-slate-600 focus-visible:ring-[#00E5A0]"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Admin Password</label>
                  <span className="text-[10px] text-slate-500 font-mono">SSL Encrypted</span>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="bg-black/40 border-slate-700/80 text-white placeholder:text-slate-600 focus-visible:ring-[#00E5A0]"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#00E5A0] hover:bg-[#00c98c] text-black font-semibold shadow-lg shadow-[#00E5A0]/20 gap-2 mt-2 transition-all"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Clearance...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    <span>Authorize & Enter Admin Panel</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-slate-800/60 py-3.5 bg-black/20">
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Are you a student or maker?</span>
              <Link href="/login" className="text-[#00E5A0] font-semibold hover:underline">
                Go to Student Portal &rarr;
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-[#00E5A0]" /> PostgreSQL RLS Active
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-[#00E5A0]" /> Audit Logging
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#06070b]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00E5A0] border-t-transparent" />
            <p className="text-xs text-slate-400 font-mono">Initializing Secure Admin Portal...</p>
          </div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
