'use client';

import React, { useState } from 'react';
import { Mail, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Your message has been sent to our education team!');
  };

  return (
    <div className="container max-w-xl py-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-foreground">Contact Support & Labs</h1>
        <p className="text-sm text-muted-foreground">
          Have a question about a tutorial, classroom licensing, or custom hardware sponsorship?
        </p>
      </div>

      <Card className="border-border/80 bg-card/60 shadow-xl">
        <CardContent className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Your Name</label>
                <Input placeholder="Elena Rostova" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                <Input type="email" placeholder="elena@university.edu" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Message</label>
                <Textarea rows={4} placeholder="How can we help your robotics project or classroom?" required />
              </div>

              <Button type="submit" className="w-full gap-2 shadow-sm bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] h-10 font-semibold">
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </Button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="h-12 w-12 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] mx-auto flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground">Message Dispatched!</h3>
              <p className="text-xs text-muted-foreground">
                We typically respond within 24 hours. Keep on building!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
