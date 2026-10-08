import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const POSTS = [
  {
    slug: 'why-real-compilable-code-matters',
    title: 'Why 70% of Online Arduino Tutorials Fail Beginners (And How to Fix It)',
    excerpt: 'Examining common pitfalls in maker documentation: omitted libraries, wrong baud rates, floating pins, and how compilable testing changes everything.',
    date: 'Oct 4, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80',
    tag: 'Pedagogy',
  },
  {
    slug: 'demystifying-i2c-bus',
    title: 'Demystifying the I2C Bus: Pullups, Clock Stretching & Address Collisions',
    excerpt: 'How two wires (SDA & SCL) manage communications across hundreds of sensors, displays, and real-time clocks on modern microcontrollers.',
    date: 'Sep 28, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    tag: 'Hardware Deep Dive',
  },
  {
    slug: 'wokwi-vs-physical-breadboarding',
    title: 'In-Browser Circuit Simulation: Wokwi vs Real Breadboard Prototypes',
    excerpt: 'When to simulate, when to probe with an oscilloscope, and how virtual hardware speeds up early firmware prototyping.',
    date: 'Sep 15, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tag: 'Simulation',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="container max-w-5xl py-12 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-mono font-semibold uppercase text-primary tracking-wider">
          Circuitly Labs Insights
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Hardware & Firmware Blog</h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Deep dives into embedded systems, microcontroller architecture, sensor physics, and educational pedagogy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POSTS.map((post) => (
          <Card
            key={post.slug}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border-border/80 bg-card/60 transition-all hover:border-primary/40 hover:-translate-y-1"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white border border-white/20">
                  {post.tag}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Read Article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
