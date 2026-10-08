'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cpu, ArrowRight, Eye, EyeOff, Mail, Lock, User, AtSign, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/shared/Logo';
import { SignupSchema, SignupFormData } from '@/lib/validations/auth';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const { signUpStudent } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const res = await signUpStudent(data.email, data.password, data.fullName, data.username);
      if (!res.success) {
        toast.error('Signup Failed', { description: res.error || 'Could not create account.' });
        return;
      }
      if (res.requiresEmailVerification) {
        toast.success('Registration successful! Check your email to verify your account.');
        router.push('/login');
        return;
      }
      toast.success('Account created successfully! Welcome to Circuitly 🚀');
      router.push('/dashboard');
    } catch {
      toast.error('Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/api/auth/callback?next=/dashboard`,
        },
      });
      if (error) {
        toast.error('Google Sign In Failed', { description: error.message });
      }
    } catch {
      toast.error('An unexpected error occurred with Google Sign In');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 py-12 bg-[#FAFBFC]">
      <div className="w-full max-w-[440px] space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2.5 group">
            <Logo size={42} />
            <span className="text-2xl font-extrabold tracking-tight text-[#0F172A]">Circuitly</span>
          </Link>
          <div className="pt-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-heading">
              Create your maker account
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Start building physical computing circuits with interactive simulations
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-7 sm:p-8 shadow-sm">
          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            disabled={googleLoading || loading}
            className="w-full h-11 border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] rounded-[10px] text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-none mb-6"
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
            <span>{googleLoading ? 'Connecting...' : 'Continue with Google'}</span>
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-[#94A3B8] font-medium tracking-wider">
                Or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <Input
                  placeholder="Ada Lovelace"
                  className="pl-10 h-10 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:ring-[#2563EB]"
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-rose-500 font-medium">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Username</label>
              <div className="relative">
                <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <Input
                  placeholder="ada_maker"
                  className="pl-10 h-10 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:ring-[#2563EB]"
                  {...register('username')}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-rose-500 font-medium">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <Input
                  type="email"
                  placeholder="ada@domain.edu"
                  className="pl-10 h-10 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:ring-[#2563EB]"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  className="pl-10 pr-10 h-10 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:ring-[#2563EB]"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-[10px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 gap-2 mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#2563EB] hover:underline ml-1">
              Log in
            </Link>
          </div>
        </div>

        {/* Feature badge pill */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#64748B]">
          <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>100% Free • No credit card required • Instant simulator access</span>
        </div>
      </div>
    </div>
  );
}
