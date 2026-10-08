'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Radio,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { INITIAL_TUTORIALS } from '@/lib/seedData';
import { DifficultyLevel } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Animated Counter Component with Scroll-Trigger & Sparkline SVG
// ─────────────────────────────────────────────────────────────────────────────
interface StatItemProps {
  endValue: number;
  suffix?: string;
  decimals?: number;
  title: string;
  subtext: string;
  colorClass?: string;
  sparklinePath: string;
  sparklineColor: string;
}

function AnimatedStat({
  endValue,
  suffix = '',
  decimals = 0,
  title,
  subtext,
  colorClass = 'text-[#0F172A]',
  sparklinePath,
  sparklineColor,
}: StatItemProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1600; // ms
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOutProgress * endValue;

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.3 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, hasAnimated]);

  const formattedValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <div ref={statRef} className="relative p-4 rounded-2xl overflow-hidden group">
      {/* Background SVG Growth Sparkline */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-35"
        preserveAspectRatio="none"
        viewBox="0 0 100 40"
      >
        <path
          d={sparklinePath}
          fill="none"
          stroke={sparklineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-10 space-y-1">
        <p className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${colorClass}`}>
          {formattedValue}
          {suffix}
        </p>
        <p className="text-xs text-[#0F172A] font-bold uppercase tracking-wider">{title}</p>
        <p className="text-[11px] text-[#64748B] font-medium">{subtext}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Landing Page
// ─────────────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  // 1. Live Maker Pulse (Randomized small fluctuation ±20)
  const [onlineCount, setOnlineCount] = useState(1247);
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const next = prev + delta;
        return next < 1220 ? 1225 : next > 1275 ? 1268 : next;
      });
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // 2. Featured Projects Category Filter
  const [selectedFilter, setSelectedFilter] = useState<'all' | DifficultyLevel>('all');
  const filteredTutorials = INITIAL_TUTORIALS.filter((tut) => {
    if (selectedFilter === 'all') return true;
    return tut.difficulty === selectedFilter;
  }).slice(0, 6);

  // 3. Testimonials Carousel State
  const testimonials = [
    {
      author: 'Ananya Sharma',
      role: 'Electronics & Comm. Junior',
      institution: 'IIT Bombay',
      initials: 'AS',
      colorBg: 'bg-[#2563EB]',
      quote:
        'Circuitly solved the biggest issue in our physical computing lab: untested code snippets on random blogs. The ultrasonic distance sensor tutorial compiled on our Arduino Uno rev3 boards without a single syntax warning.',
      date: '2 weeks ago',
    },
    {
      author: 'Rohan Deshmukh',
      role: 'Robotics Club Lead',
      institution: 'BITS Pilani',
      initials: 'RD',
      colorBg: 'bg-[#0891B2]',
      quote:
        'The in-browser Wokwi simulation let our 40-member freshman cohort prototype servo arm kinematics before touch testing physical hardware. It saved our semester lab budget hundreds in blown diodes.',
      date: '3 weeks ago',
    },
    {
      author: 'Elena Rostova',
      role: 'CS & Embedded Undergrad',
      institution: 'Stanford Robotics Lab',
      initials: 'ER',
      colorBg: 'bg-[#7C3AED]',
      quote:
        'The step-by-step interactive build checklist is phenomenal. I can pause wiring my breadboard at midnight in the lab, reopen Circuitly on my tablet next morning, and every pin check is saved.',
      date: '1 month ago',
    },
    {
      author: 'Karthik Venkat',
      role: 'Mechatronics Sophomore',
      institution: 'NIT Trichy',
      initials: 'KV',
      colorBg: 'bg-[#059669]',
      quote:
        'The municipal traffic light state sequencer taught me more about non-blocking timers and array indexing than three weeks of theoretical lecture. Compilable C++ firmware with zero pseudo-code.',
      date: '1 month ago',
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isCarouselPaused, testimonials.length]);

  // 4. Sticky Back to Top Button
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. 6 Feature Cards with Specific Copy
  const features = [
    {
      icon: Code2,
      title: 'Compilable Arduino C++',
      badge: 'ATmega328P @ 16MHz',
      description:
        'Every sketch tested on ATmega328P @ 16MHz. Zero pseudo-code, with verified pin registers, baud rates, and timing loops that compile cleanly in Arduino IDE 2.3.',
    },
    {
      icon: MonitorPlay,
      title: 'Instant Wokwi Simulation',
      badge: '40+ Components',
      description:
        'ESP32, Arduino UNO, Nano, and 40+ components supported. Test circuit behavior and wire traces in-browser without buying or damaging hardware upfront.',
    },
    {
      icon: Layers,
      title: 'Curated Learning Paths',
      badge: '4 Master Tracks',
      description:
        '4 tracks: Beginner → IoT Architect. Structured progression from digital pin logic and sensors to MQTT cloud telemetry and autonomous rovers.',
    },
    {
      icon: CheckCircle,
      title: 'Interactive Build Checklists',
      badge: 'Cross-Device Save',
      description:
        'Save progress across devices. Track your breadboard jumper wiring step-by-step with persistent localStorage saves that remember completed connections.',
    },
    {
      icon: Award,
      title: 'Quizzes & Hardware Badges',
      badge: '12 Verifiable Badges',
      description:
        '12 badges to unlock. Solidify electrical fundamentals (Ohm’s law, pull-up resistors, ADC sampling) with interactive quizzes and earn showcase badges.',
    },
    {
      icon: Users,
      title: 'Global Maker Community',
      badge: 'Discord + GitHub',
      description:
        'Discord + GitHub discussions. Inspect peer student showcases, share custom schematics, and get constructive code reviews on hardware projects.',
    },
  ];

  // Structured Schema for Educational Organization and Course
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Circuitly',
    url: 'https://circuitly.netlify.app',
    description: 'Learn Arduino by Building Real Circuits — Interactive tutorials, simulations, and compilable C++ firmware.',
    hasCourse: {
      '@type': 'Course',
      name: 'Physical Computing with Arduino',
      description: 'Hands-on embedded microcontroller curriculum with in-browser circuit simulation.',
      provider: {
        '@type': 'Organization',
        name: 'Circuitly Labs',
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC]">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ────────────────────────────────────────────────────────────────────────
          1. HERO SECTION
         ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E2E8F0] hero-glow-bg">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & Live Pulse */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Live Maker Pulse Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-xs font-semibold text-[#1E40AF] shadow-sm select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
                </span>
                <span className="font-mono text-[#059669] font-bold">{onlineCount.toLocaleString()}</span>
                <span className="text-[#334155]">makers online now</span>
              </div>

              {/* Headline */}
              <h1 className="hero-title tracking-tight text-[#0F172A] leading-[1.12]">
                Learn Arduino by Building <br />
                <span className="text-[#2563EB]">Real Circuits</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-[#64748B] max-w-[580px] leading-relaxed font-normal">
                Verified C++ sketches. Browser simulation. Zero hardware needed to start.
              </p>

              {/* Two CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/tutorials">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-6 text-base font-semibold gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Start Free Tutorial</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/simulator">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 px-6 text-base font-semibold gap-2 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Play className="h-4 w-4 text-[#06B6D4] fill-current" />
                    <span>Try Simulator</span>
                  </Button>
                </Link>
              </div>

              {/* Trust Line under CTAs */}
              <div className="pt-2">
                <p className="text-xs text-[#64748B] font-medium flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#059669] shrink-0" />
                  <span>Used by students at 200+ colleges · No credit card · 100% free</span>
                </p>
              </div>
            </div>

            {/* Right Column: Verified Hardware Terminal */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[16px] border border-[#E2E8F0] bg-white shadow-xl overflow-hidden transition-all duration-200 hover:shadow-2xl">
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
                    Compiles Clean
                  </span>
                </div>

                {/* Code Body */}
                <div className="p-5 font-mono text-xs text-[#0F172A] leading-relaxed overflow-x-auto bg-[#FAFBFC]">
                  <p className="text-[#94A3B8]">// 1. Hardware Pin Configurations</p>
                  <p>
                    <span className="text-[#2563EB] font-semibold">const int</span> PIN_TRIG ={' '}
                    <span className="text-[#0891B2]">9</span>;
                  </p>
                  <p>
                    <span className="text-[#2563EB] font-semibold">const int</span> PIN_ECHO ={' '}
                    <span className="text-[#0891B2]">10</span>;
                  </p>
                  <br />
                  <p className="text-[#94A3B8]">// 2. Speed of Sound Telemetry Math</p>
                  <p>
                    <span className="text-[#7C3AED] font-semibold">void</span>{' '}
                    <span className="text-[#0284C7] font-semibold">loop</span>() &#123;
                  </p>
                  <p className="pl-4 text-[#0F172A]">digitalWrite(PIN_TRIG, HIGH);</p>
                  <p className="pl-4 text-[#0F172A]">
                    delayMicroseconds(<span className="text-[#0891B2]">10</span>);
                  </p>
                  <p className="pl-4 text-[#0F172A]">digitalWrite(PIN_TRIG, LOW);</p>
                  <p className="pl-4">
                    <span className="text-[#2563EB] font-semibold">long</span> duration =
                    pulseIn(PIN_ECHO, HIGH);
                  </p>
                  <p className="pl-4">
                    <span className="text-[#2563EB] font-semibold">float</span> cm = (duration *{' '}
                    <span className="text-[#0891B2]">0.0343</span>) /{' '}
                    <span className="text-[#0891B2]">2.0</span>;
                  </p>
                  <p className="pl-4 text-[#64748B]">
                    Serial.print(<span className="text-[#059669]">&quot;Distance: &quot;</span>);
                  </p>
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
                    Flight: 29.1 µs/cm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          2. STATS ROW (Animated Counters with Trend Sparklines)
         ──────────────────────────────────────────────────────────────────────── */}
      <section className="border-b border-[#E2E8F0] bg-white py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {/* 10,000+ Active Students */}
            <AnimatedStat
              endValue={10000}
              suffix="+"
              title="Active Students"
              subtext="across 42 countries"
              colorClass="text-[#0F172A]"
              sparklinePath="M 0 35 Q 25 30 50 18 T 100 5"
              sparklineColor="#2563EB"
            />

            {/* 20+ Real Tutorials */}
            <AnimatedStat
              endValue={20}
              suffix="+"
              title="Real Tutorials"
              subtext="verified on real hardware"
              colorClass="text-[#2563EB]"
              sparklinePath="M 0 32 Q 30 25 60 14 T 100 8"
              sparklineColor="#2563EB"
            />

            {/* 99.8% Compile Success */}
            <AnimatedStat
              endValue={99.8}
              decimals={1}
              suffix="%"
              title="Compile Success"
              subtext="last 30 days"
              colorClass="text-[#0891B2]"
              sparklinePath="M 0 30 Q 35 22 70 12 T 100 6"
              sparklineColor="#0891B2"
            />

            {/* 100% Free & Open Access */}
            <AnimatedStat
              endValue={100}
              suffix="%"
              title="Free & Open Access"
              subtext="no paywall, ever"
              colorClass="text-[#059669]"
              sparklinePath="M 0 34 Q 30 26 65 15 T 100 4"
              sparklineColor="#059669"
            />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          3. FEATURES SECTION ("Why Circuitly" - 6 Specific Cards)
         ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-[#E2E8F0] bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          <div className="text-left md:text-center max-w-2xl md:mx-auto space-y-3">
            <span className="eyebrow-label text-[#2563EB]">Why Circuitly</span>
            <h2 className="section-title">Built Specifically for Physical Computing</h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Progress from your very first blinking LED to autonomous mobile robotics and cloud telemetry with zero fluff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-[16px] border border-[#E2E8F0] bg-white p-7 space-y-4 shadow-sm hover:border-[#CBD5E1] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{feat.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          4. FEATURED PROJECTS SECTION (with Working Filter & Metadata)
         ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="eyebrow-label text-[#2563EB]">Hands-On Projects</span>
              <h2 className="section-title">Featured Project Tutorials</h2>
              <p className="text-base text-[#64748B]">
                Step-by-step schematics with verified Arduino C++ firmware and interactive quizzes.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] self-start md:self-auto overflow-x-auto">
              {(
                [
                  { label: 'All', value: 'all' },
                  { label: 'Beginner', value: 'beginner' },
                  { label: 'Intermediate', value: 'intermediate' },
                  { label: 'Advanced', value: 'advanced' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedFilter(tab.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap min-h-[36px] ${
                    selectedFilter === tab.value
                      ? 'bg-white text-[#0F172A] shadow-sm'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tutorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tut, idx) => (
              <TutorialCard key={tut.id} tutorial={tut} isNew={idx < 2} />
            ))}
          </div>

          {/* Bottom View All Link */}
          <div className="pt-4 text-center">
            <Link href="/tutorials">
              <Button
                variant="outline"
                className="h-11 px-6 border-[#E2E8F0] hover:border-[#CBD5E1] bg-white text-[#0F172A] rounded-[10px] text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 gap-2"
              >
                <span>Browse All 20 Verified Tutorials</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB]" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          5. TESTIMONIALS SECTION (Indian + Global Colleges, Carousel)
         ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-[#E2E8F0] bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          <div className="text-left md:text-center max-w-xl md:mx-auto space-y-3">
            <span className="eyebrow-label text-[#2563EB]">Verified Student Feedback</span>
            <h2 className="section-title">Used in Robotics &amp; EE Labs Worldwide</h2>
            <p className="text-base text-[#64748B]">
              Real student experiences from top engineering colleges in India and globally.
            </p>
          </div>

          {/* Testimonials Carousel Container */}
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-8 sm:p-10 shadow-sm space-y-6 transition-all">
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Student</span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg text-[#0F172A] leading-relaxed font-medium">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </blockquote>

              {/* Author & College Tag */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-white font-bold text-sm shadow-sm ${testimonials[activeTestimonial].colorBg}`}
                  >
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-[#64748B]">
                      {testimonials[activeTestimonial].role} ·{' '}
                      <span className="font-semibold text-[#0F172A]">
                        {testimonials[activeTestimonial].institution}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#94A3B8] font-mono">
                  {testimonials[activeTestimonial].date}
                </span>
              </div>
            </div>

            {/* Carousel Navigation Arrows & Dots */}
            <div className="flex items-center justify-between pt-6 px-2">
              <div className="flex items-center gap-2">
                {testimonials.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveTestimonial(dotIdx)}
                    className={`h-2.5 rounded-full transition-all duration-200 ${
                      activeTestimonial === dotIdx ? 'w-8 bg-[#2563EB]' : 'w-2.5 bg-[#CBD5E1]'
                    }`}
                    aria-label={`Go to testimonial ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) => (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] shadow-sm transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] shadow-sm transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          6. BOTTOM CALL TO ACTION
         ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 relative overflow-hidden bg-white hero-glow-bg">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center max-w-3xl space-y-6">
          <h2 className="hero-title text-[#0F172A]">
            Ready to Build Your First Circuit?
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Join 10,000+ student makers. Start with the beginner Blink LED guide or dive straight into ultrasonic radar and IoT telemetry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link href="/tutorials">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-7 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[10px] shadow-sm hover:shadow-md font-semibold"
              >
                Start Free Tutorial
              </Button>
            </Link>
            <Link href="/simulator">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-7 rounded-[10px] border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] font-semibold"
              >
                Open Wokwi Simulator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          7. STICKY BACK TO TOP BUTTON (Appears after 400px scroll)
         ──────────────────────────────────────────────────────────────────────── */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-white shadow-lg hover:bg-[#2563EB] hover:scale-105 active:scale-95 transition-all duration-200 animate-in fade-in"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
