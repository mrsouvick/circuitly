import React from 'react';
import Link from 'next/link';
import { Cpu, Users, Target, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
          <Cpu className="h-3.5 w-3.5" />
          <span>About Circuitly</span>
        </div>
        <h1 className="text-4xl font-extrabold text-foreground">
          Democratizing Physical Computing for the Next Generation of Makers
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Circuitly was founded to eliminate the frustration of incomplete code snippets, ambiguous wiring schematics, and outdated tutorials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-foreground">Our Mission</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Provide free, rigorous, accessible embedded engineering education with 100% verified compilable code and realistic browser simulations.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-foreground">Quality Guarantee</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every sketch in our curriculum has been physically compiled and tested on real ATmega328P and ESP32 silicon before release.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/60 p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-foreground">Community Driven</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Students and makers share their own adaptations, troubleshooting discoveries, and custom builds across our global community showcase.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card/40 p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Join the Movement</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Start coding physical microcontrollers today. No credit cards or complex toolchains required.
        </p>
        <Link href="/signup">
          <Button variant="mint" size="lg" className="shadow-lg">
            Start Free
          </Button>
        </Link>
      </div>
    </div>
  );
}
