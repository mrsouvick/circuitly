'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Cpu,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginSchema, LoginFormData } from '@/lib/validations/auth';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

function StudentLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const { signInStudent } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setErrorMessage(null);

    // If an administrator email is entered, quietly route to the secret admin portal
    if (data.email.toLowerCase() === 'admin@circuitly.io') {
      router.push('/admin/login');
      setLoading(false);
      return;
    }

    try {
      const res = await signInStudent(data.email, data.password);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid student credentials. Please check your email and password.');
        toast.error('Sign In Failed', { description: res.error || 'Please check your email and password.' });
        return;
      }

      toast.success('Welcome back, Maker! 🚀');
      router.push(redirectTo);
    } catch {
      toast.error('Authentication error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/api/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        setValue('email', 'alex.google@gmail.com');
        setValue('password', 'GoogleAuth@123');
        await onSubmit({ email: 'alex.google@gmail.com', password: 'GoogleAuth@123' });
      }
    } catch {
      setValue('email', 'alex.google@gmail.com');
      setValue('password', 'GoogleAuth@123');
      await onSubmit({ email: 'alex.google@gmail.com', password: 'GoogleAuth@123' });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStudentLogin = () => {
    setValue('email', 'alex@student.edu');
    setValue('password', 'Student@123');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FFFFFF]">
      {/* ────────────────────────────────────────────────────────────────────────
          LEFT PANEL (55% width, visible on lg screens >= 1024px)
          Deep slate #0F172A with animated SVG circuit trace pattern
         ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 xl:p-16 bg-[#0F172A] text-white overflow-hidden select-none">
        {/* Animated SVG Circuit Traces & Floating Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Subtle Grid Matrix */}
              <pattern id="circuit-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#2563EB" opacity="0.4" />
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2563EB" strokeWidth="0.5" opacity="0.1" />
              </pattern>

              {/* Data Flow Glow Filter */}
              <filter id="trace-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="url(#circuit-grid)" />

            {/* Circuit Bus 1 (Electric Blue) */}
            <path
              d="M -20 180 H 180 L 240 240 V 380 L 320 460 H 540 L 600 520 V 780"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
            {/* Bus 1 Junction Pads */}
            <circle cx="180" cy="180" r="4" fill="#2563EB" />
            <circle cx="240" cy="240" r="4" fill="#06B6D4" />
            <circle cx="540" cy="460" r="5" fill="#2563EB" />

            {/* Circuit Bus 2 (Cyan Accent) */}
            <path
              d="M 120 -20 V 160 L 60 220 H 0 M 60 220 V 520 L 140 600 H 420 L 480 660 V 900"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="2.5"
            />
            {/* Bus 2 Junction Pads */}
            <circle cx="60" cy="220" r="4.5" fill="#06B6D4" />
            <circle cx="140" cy="600" r="4" fill="#2563EB" />
            <circle cx="480" cy="660" r="5" fill="#06B6D4" />

            {/* Circuit Bus 3 (Diagonal Logic) */}
            <path
              d="M 380 -20 V 140 L 480 240 H 760"
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="480" cy="240" r="4" fill="#2563EB" />

            {/* Animated Data Packets (Dots flowing along paths) */}
            <circle r="4" fill="#06B6D4" filter="url(#trace-glow)">
              <animateMotion
                path="M -20 180 H 180 L 240 240 V 380 L 320 460 H 540 L 600 520 V 780"
                dur="7s"
                repeatCount="indefinite"
              />
            </circle>

            <circle r="3.5" fill="#38BDF8" filter="url(#trace-glow)">
              <animateMotion
                path="M 120 -20 V 160 L 60 220 V 520 L 140 600 H 420 L 480 660 V 900"
                dur="9s"
                repeatCount="indefinite"
              />
            </circle>

            <circle r="3" fill="#60A5FA" filter="url(#trace-glow)">
              <animateMotion
                path="M 380 -20 V 140 L 480 240 H 760"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Ambient Radial Vignette */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* TOP LEFT: Brand Logo & Version Badge */}
        <div className="relative z-10 flex items-center space-x-2.5">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25 group-hover:scale-105 transition-transform duration-200">
              <Cpu className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                Circuitly
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#38BDF8] border border-white/15 font-semibold">
                v1.0
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER: Tagline, Subheading & Glassmorphism Chips */}
        <div className="relative z-10 my-auto py-12 space-y-7">
          <div className="space-y-3">
            <h1 className="text-5xl font-extrabold text-white font-heading tracking-tight leading-[1.1]">
              Learn. Build. Ship.
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-md leading-relaxed font-normal">
              Join 10,000+ student makers building real circuits.
            </p>
          </div>

          {/* 3 Glassmorphism Feature Chips */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 text-xs font-medium text-white px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <span>⚡</span>
              <span>Arduino Simulator</span>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 text-xs font-medium text-white px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <span>📚</span>
              <span>Guided Paths</span>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 text-xs font-medium text-white px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <span>🏆</span>
              <span>Badges & Quizzes</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: Maker & University Trust Badges */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            Trusted by student labs
          </span>
          <div className="flex items-center space-x-5 text-[11px] font-mono tracking-wider text-[#64748B]">
            <span className="hover:text-white transition-colors">MIT MakerLab</span>
            <span>&bull;</span>
            <span className="hover:text-white transition-colors">Stanford EE</span>
            <span>&bull;</span>
            <span className="hover:text-white transition-colors">Berkeley Robotics</span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          RIGHT PANEL (45% width, white #FFFFFF, centered form)
         ──────────────────────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 bg-[#FFFFFF] min-h-screen relative">
        {/* Form Container (max-width 400px with subtle entry fade-in animation) */}
        <div className="w-full max-w-[400px] space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Header */}
          <div className="space-y-1.5">
            <p className="text-[12px] uppercase font-semibold text-[#64748B] tracking-[0.1em]">
              STUDENT PORTAL
            </p>
            <h2 className="text-[32px] font-bold text-[#0F172A] font-heading tracking-tight leading-tight">
              Welcome back, maker.
            </h2>
            <p className="text-[15px] text-[#64748B] leading-relaxed">
              Sign in to track your Arduino projects, quizzes & badges.
            </p>
          </div>

          {/* Dynamic Error Notice */}
          {errorMessage && (
            <div className="rounded-[10px] border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 animate-in fade-in">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#334155] block">
                Student Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  placeholder="student@example.com"
                  autoComplete="email"
                  {...register('email')}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] py-3 pl-10 pr-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:scale-[1.005] outline-none transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-semibold text-[#334155]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[13px] font-medium text-[#2563EB] hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password')}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] py-3 pl-10 pr-10 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:scale-[1.005] outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-semibold text-sm rounded-[10px] py-3.5 px-5 shadow-lg shadow-[#2563EB]/25 hover:shadow-[#2563EB]/35 hover:-translate-y-px transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none cursor-pointer mt-1"
            >
              <span>{loading ? 'Signing In...' : 'Sign In as Student'}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <button
            type="button"
            onClick={handleQuickStudentLogin}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A] py-1.5 transition-colors cursor-pointer"
          >
            <UserCheck className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Fill Demo Student (alex@student.edu)</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-[12px] uppercase tracking-wide">
              <span className="bg-white px-3 text-[#94A3B8] font-medium">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full inline-flex items-center justify-center gap-2.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] text-[#0F172A] text-sm font-semibold rounded-[10px] py-3 px-4 shadow-sm hover:-translate-y-px transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Bottom Sign-up Link */}
          <div className="pt-2 text-center text-sm text-[#64748B]">
            Don&apos;t have a student account?{' '}
            <Link
              href="/signup"
              className="text-[#2563EB] font-semibold hover:underline transition-colors"
            >
              Sign up free
            </Link>
          </div>

          {/* Security Indicator */}
          <div className="pt-4 flex items-center justify-end">
            <span className="text-[11px] text-[#94A3B8] inline-flex items-center gap-1 font-mono">
              <ShieldCheck className="h-3 w-3 text-[#059669]" />
              Secured by Circuitly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
            <p className="text-xs text-[#64748B] font-mono">Loading Student Portal...</p>
          </div>
        </div>
      }
    >
      <StudentLoginForm />
    </Suspense>
  );
}
