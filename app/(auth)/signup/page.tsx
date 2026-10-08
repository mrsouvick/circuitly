'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cpu, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SignupSchema, SignupFormData } from '@/lib/validations/auth';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const { signUpStudent } = useAuth();
  const [loading, setLoading] = useState(false);

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
          <p className="text-sm text-muted-foreground">
            Create your free account and start building physical circuits today.
          </p>
        </div>

        <Card className="border-border/80 bg-card/60 shadow-xl backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>Free forever for students & makers</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                <Input placeholder="Ada Lovelace" {...register('fullName')} />
                {errors.fullName && (
                  <p className="text-xs text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Username</label>
                <Input placeholder="ada_maker" {...register('username')} />
                {errors.username && (
                  <p className="text-xs text-destructive">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                <Input type="email" placeholder="ada@domain.edu" {...register('email')} />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Password</label>
                <Input type="password" placeholder="••••••••" {...register('password')} />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="mint"
                disabled={loading}
                className="w-full h-10 shadow-md gap-2"
              >
                <span>{loading ? 'Creating Account...' : 'Get Started'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-border/40 py-4 text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="ml-1 font-semibold text-primary hover:underline">
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
