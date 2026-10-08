'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cpu, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ResetPasswordSchema, ResetPasswordFormData } from '@/lib/validations/auth';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [complete, setComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async () => {
    setComplete(true);
    toast.success('Your password has been successfully updated!');
    setTimeout(() => {
      router.push('/login');
    }, 2000);
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
          <p className="text-sm text-muted-foreground">Set New Password</p>
        </div>

        <Card className="border-border/80 bg-card/60 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Create new password</CardTitle>
            <CardDescription>Enter a strong password with at least 6 characters</CardDescription>
          </CardHeader>

          <CardContent>
            {!complete ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">New Password</label>
                  <Input type="password" placeholder="••••••••" {...register('password')} />
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" {...register('confirmPassword')} />
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button type="submit" variant="mint" className="w-full h-10">
                  Update Password
                </Button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00E5A0]/20 text-[#00E5A0]">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground">Password Updated!</h4>
                <p className="text-xs text-muted-foreground">
                  Redirecting to login...
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="justify-center border-t border-border/40 py-4 text-xs">
            <Link href="/login" className="text-muted-foreground hover:text-foreground">
              Cancel & Return to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
