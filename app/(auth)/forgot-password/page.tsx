'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cpu, ArrowLeft, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ForgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations/auth';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async () => {
    setSubmitted(true);
    toast.success('Password reset instructions dispatched to your email.');
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00E5A0] text-black">
              <Cpu className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">Circuitly</span>
          </Link>
          <p className="text-sm text-muted-foreground">Account Recovery</p>
        </div>

        <Card className="border-border/80 bg-card/60 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Reset your password</CardTitle>
            <CardDescription>
              We will send you a secure link to reset your account password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Registered Email</label>
                  <Input type="email" placeholder="you@domain.com" {...register('email')} />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <Button type="submit" variant="mint" className="w-full h-10">
                  Send Recovery Link
                </Button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00E5A0]/20 text-[#00E5A0]">
                  <MailCheck className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground">Check your inbox</h4>
                <p className="text-xs text-muted-foreground">
                  If an account exists for that email, we have dispatched a password reset link.
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="justify-center border-t border-border/40 py-4 text-xs">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to login</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
