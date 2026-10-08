'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cpu, ArrowLeft, MailCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ForgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations/auth';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${origin}/login`,
      });
      setSubmitted(true);
      toast.success('Password reset instructions dispatched to your email.');
    } catch {
      toast.error('Could not send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 py-12 bg-[#FAFBFC]">
      <div className="w-full max-w-[420px] space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#2563EB] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#0F172A]">Circuitly</span>
          </Link>
          <div className="pt-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] font-heading">
              Reset your password
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Enter your account email to receive recovery instructions
            </p>
          </div>
        </div>

        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-7 sm:p-8 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">Registered Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                  <Input
                    type="email"
                    placeholder="you@domain.edu"
                    className="pl-10 h-10 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:ring-[#2563EB]"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-[10px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 mt-2"
              >
                {loading ? 'Sending link...' : 'Send Recovery Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                <MailCheck className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-[#0F172A]">Check your inbox</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                If an account exists for that email, we have dispatched a password reset link with instructions.
              </p>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-[#E2E8F0] text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to log in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
