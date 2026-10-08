'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Award,
  CheckCircle,
  Users,
  Compass,
  Star,
  Zap,
  MonitorPlay,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { INITIAL_TUTORIALS } from '@/lib/seedData';

export default function LandingPage() {
  const featuredTutorials = INITIAL_TUTORIALS.slice(0, 6);

  const features = [
    {
      icon: Code2,
      title: 'Compilable Arduino C++',
      description: 'Zero pseudo-code. Every sketch has been physically tested and compiles cleanly in the Arduino IDE.',
    },
    {
      icon: MonitorPlay,
      title: 'Instant Wokwi Simulation',
      description: 'Run circuits inside your browser without buying hardware upfront. Simulate LEDs, servos, OLEDs, and ESP32s.',
    },
    {
      icon: Layers,
      title: 'Curated Learning Paths',
      description: 'Follow step-by-step master tracks designed by embedded engineers from beginner to IoT architect.',
    },
    {
      icon: CheckCircle,
      title: 'Interactive Build Checklists',
      description: 'Track your breadboard wiring step-by-step with high-resolution diagrams and persistent completion saves.',
    },
    {
      icon: Award,
      title: 'Quizzes & Hardware Badges',
      description: 'Solidify your electrical fundamentals with interactive engineering quizzes and earn showcase badges.',
    },
    {
      icon: Users,
      title: 'Global Maker Community',
      description: 'Share your custom hardware builds, get constructive code reviews, and inspect peer community showcases.',
    },
  ];

  const testimonials = [
    {
      quote: "Circuitly solved the biggest barrier for my high school robotics class: confusing pinouts and broken code snippets. The step-by-step checklists are pure gold.",
      author: "David Vance",
      title: "STEM Instructor, Austin Robotics Lab",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=david_teacher",
    },
    {
      quote: "I went from zero microcontroller experience to building my own Bluetooth robot car in two weekends. The code download and troubleshooting tabs saved me hours of frustration.",
      author: "Maya Chen",
      title: "Computer Science Sophomore",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=maya_student",
    },
    {
      quote: "The built-in Wokwi simulator allowed me to write and test firmware on my commute before soldering the components at my workbench. Brilliant experience!",
      author: "Arjun Mehta",
      title: "Embedded Systems Hobbyist",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=arjun_maker",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#E2E8F0] hero-glow-bg">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-xs font-semibold text-[#2563EB] shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
                <span>Next-Gen Arduino Education Platform</span>
              </div>

              {/* Hero Title */}
              <h1 className="hero-title">
                From <span className="text-[#2563EB]">Zero to Maker</span>
                <br />
                Learn Arduino by Building.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#64748B] max-w-[640px] leading-relaxed font-normal">
                Master microcontrollers with verified, compilable C++ sketches, full component BOMs, interactive circuit diagrams, in-browser simulations, and structured learning paths.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <span>Start Free Learning</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/tutorials">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                    <Compass className="h-4 w-4 text-[#2563EB]" />
                    <span>Browse 20+ Projects</span>
                  </Button>
                </Link>
                <Link href="/simulator">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-[10px]">
                    <Play className="h-4 w-4 text-[#06B6D4]" />
                    <span>Try Simulator</span>
                  </Button>
                </Link>
              </div>

              {/* Quick stats micro-bar */}
              <div className="flex items-center gap-6 pt-3 text-xs text-[#64748B] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#059669]" />
                  <span>100% Free & Open Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#059669]" />
                  <span>Verified Compilable C++</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Linear/Vercel Style Code Terminal */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[16px] border border-[#E2E8F0] bg-white shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#CBD5E1]" />
                      <div className="h-3 w-3 rounded-full bg-[#E2E8F0]" />
                      <div className="h-3 w-3 rounded-full bg-[#F1F5F9]" />
                    </div>
                    <span className="text-xs font-mono text-[#64748B] ml-2 font-medium">
                      HC-SR04_SonarRadar.ino
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0] flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Ready
                  </span>
                </div>

                {/* Code Body */}
                <div className="p-5 font-mono text-xs text-[#0F172A] leading-relaxed overflow-x-auto bg-[#FAFBFC]">
                  <p className="text-[#94A3B8]">// 1. Hardware Pin Configurations</p>
                  <p><span className="text-[#2563EB] font-semibold">const int</span> PIN_TRIG = <span className="text-[#0891B2]">9</span>;</p>
                  <p><span className="text-[#2563EB] font-semibold">const int</span> PIN_ECHO = <span className="text-[#0891B2]">10</span>;</p>
                  <br />
                  <p className="text-[#94A3B8]">// 2. Speed of Sound Telemetry Math</p>
                  <p><span className="text-[#7C3AED] font-semibold">void</span> <span className="text-[#0284C7] font-semibold">loop</span>() &#123;</p>
                  <p className="pl-4 text-[#0F172A]">digitalWrite(PIN_TRIG, HIGH);</p>
                  <p className="pl-4 text-[#0F172A]">delayMicroseconds(<span className="text-[#0891B2]">10</span>);</p>
                  <p className="pl-4 text-[#0F172A]">digitalWrite(PIN_TRIG, LOW);</p>
                  <p className="pl-4"><span className="text-[#2563EB] font-semibold">long</span> duration = pulseIn(PIN_ECHO, HIGH);</p>
                  <p className="pl-4"><span className="text-[#2563EB] font-semibold">float</span> cm = (duration * <span className="text-[#0891B2]">0.0343</span>) / <span className="text-[#0891B2]">2.0</span>;</p>
                  <p className="pl-4 text-[#64748B]">Serial.print(<span className="text-[#059669]">&quot;Distance: &quot;</span>);</p>
                  <p className="pl-4 text-[#64748B]">Serial.println(cm);</p>
                  <p>&#125;</p>
                </div>

                {/* Circuit Info Footer */}
                <div className="border-t border-[#E2E8F0] bg-white p-3.5 flex items-center justify-between text-xs text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#2563EB]" />
                    <span className="font-medium text-[#0F172A]">Target: ATmega328P @ 16MHz</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#059669] font-medium bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    Echo Flight: 29.1 µs/cm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (Alternates with #FFFFFF) */}
      <section className="border-b border-[#E2E8F0] bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-mono tracking-tight">10,000+</p>
              <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">Active Students</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] font-mono tracking-tight">20+</p>
              <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">Real Tutorials</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#0891B2] font-mono tracking-tight">99.8%</p>
              <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">Compile Success</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#059669] font-mono tracking-tight">100%</p>
              <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">Free & Open Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 6 FEATURE CARDS (Alternates with #FAFBFC, 96px desktop vertical spacing) */}
      <section className="py-16 md:py-24 border-b border-[#E2E8F0] bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-14">
          <div className="text-left md:text-center max-w-2xl md:mx-auto space-y-3">
            <span className="eyebrow-label text-[#2563EB]">
              Why Circuitly
            </span>
            <h2 className="section-title">
              Built Specifically for Physical Computing
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Everything you need to progress from a simple blinking LED to autonomous mobile robotics and cloud telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="circuit-card space-y-4"
                >
                  <div className="icon-wrapper-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{feat.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED TUTORIALS (Alternates with #FFFFFF) */}
      <section className="py-16 md:py-24 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="eyebrow-label text-[#2563EB]">
                Hands-On Projects
              </span>
              <h2 className="section-title">Featured Project Tutorials</h2>
              <p className="text-base text-[#64748B]">
                Step-by-step schematics with verified Arduino C++ firmware and interactive quizzes.
              </p>
            </div>
            <Link href="/tutorials">
              <Button variant="outline" size="sm" className="gap-2 border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[10px] text-[#0F172A] font-semibold">
                <span>View All 20 Tutorials</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB]" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutorials.map((tut) => (
              <TutorialCard key={tut.id} tutorial={tut} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS (Alternates with #FAFBFC) */}
      <section className="py-16 md:py-24 border-b border-[#E2E8F0] bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-14">
          <div className="text-left md:text-center max-w-xl md:mx-auto space-y-3">
            <span className="eyebrow-label text-[#2563EB]">
              Makers Love Circuitly
            </span>
            <h2 className="section-title">Student & Educator Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="circuit-card flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#0F172A] italic leading-relaxed">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-[#E2E8F0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="h-10 w-10 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#0F172A]">{test.author}</h4>
                    <p className="text-xs text-[#64748B]">{test.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION BANNER (Alternates with #FFFFFF) */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-white hero-glow-bg">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center max-w-3xl space-y-6">
          <h2 className="hero-title">
            Ready to Build Your First Circuit?
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of makers worldwide. Start with our beginner Blink LED guide or jump straight into autonomous rovers and IoT weather stations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/signup">
              <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] shadow-sm hover:shadow-md px-8">
                Start Building Free
              </Button>
            </Link>
            <Link href="/tutorials">
              <Button variant="outline" size="lg" className="rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]">
                Explore Curriculum
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
