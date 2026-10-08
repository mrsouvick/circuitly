'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  Sparkles,
  MessageSquare,
  Award,
  Plus,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/admin/StatsCard';
import { DataStore } from '@/lib/data/store';
import { INITIAL_TUTORIALS } from '@/lib/seedData';
import { DifficultyBadge } from '@/components/shared/DifficultyBadge';

// Sample chart telemetry data
const SIGNUP_DATA = [
  { day: 'Day 1', signups: 120 },
  { day: 'Day 5', signups: 180 },
  { day: 'Day 10', signups: 240 },
  { day: 'Day 15', signups: 310 },
  { day: 'Day 20', signups: 290 },
  { day: 'Day 25', signups: 420 },
  { day: 'Day 30', signups: 530 },
];

const COMPLETION_DATA = [
  { name: 'Mon', completions: 45 },
  { name: 'Tue', completions: 72 },
  { name: 'Wed', completions: 88 },
  { name: 'Thu', completions: 64 },
  { name: 'Fri', completions: 95 },
  { name: 'Sat', completions: 140 },
  { name: 'Sun', completions: 165 },
];

const PAGEVIEW_DATA = [
  { time: '00:00', views: 820 },
  { time: '04:00', views: 410 },
  { time: '08:00', views: 1650 },
  { time: '12:00', views: 2840 },
  { time: '16:00', views: 3200 },
  { time: '20:00', views: 3890 },
];

const DIFFICULTY_PIE = [
  { name: 'Beginner', value: 8, color: '#00E5A0' },
  { name: 'Intermediate', value: 7, color: '#FFB84D' },
  { name: 'Advanced', value: 5, color: '#FF6B6B' },
];

export default function AdminDashboardPage() {
  const stats = DataStore.getAdminStats();
  const topTutorials = [...INITIAL_TUTORIALS]
    .sort((a, b) => b.views_count - a.views_count)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Overview Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Platform Command Center
          </h1>
          <p className="text-xs text-muted-foreground">
            Real-time telemetry, moderation queues, student engagement, and curriculum management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/tutorials/new">
            <Button variant="mint" size="sm" className="gap-1.5 shadow-md">
              <Plus className="h-4 w-4" />
              <span>New Tutorial</span>
            </Button>
          </Link>
          <Link href="/admin/showcase">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Review Showcases ({stats.pendingShowcases})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value={stats.totalUsers.toLocaleString()}
          change="+18.4%"
          isPositive={true}
          description="vs last month"
          icon={Users}
          color="#38bdf8"
        />
        <StatsCard
          title="Tutorials Catalog"
          value={stats.totalTutorials}
          description={`${stats.publishedTutorials} published, ${stats.draftTutorials} drafts`}
          icon={BookOpen}
          color="#00E5A0"
        />
        <StatsCard
          title="Active Students (7d)"
          value={stats.activeUsers7d.toLocaleString()}
          change="+8.2%"
          isPositive={true}
          description="engaged weekly"
          icon={Award}
          color="#a855f7"
        />
        <StatsCard
          title="Completions Logged"
          value={stats.totalCompletions.toLocaleString()}
          change="+24.1%"
          isPositive={true}
          description="100% finished"
          icon={CheckCircle2}
          color="#FF6B6B"
        />
      </div>

      {/* 4 RECHARTS DATA VISUALIZATION PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Line Chart: User Signups (30 Days) */}
        <Card className="border-border/80 bg-card/60 p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>New Student Signups (Last 30 Days)</span>
              <span className="text-xs font-mono text-primary">+530 this month</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SIGNUP_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232334" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11121c',
                    borderColor: '#2e3048',
                    borderRadius: '0.75rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="signups"
                  stroke="#00E5A0"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#00E5A0' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 2. Bar Chart: Tutorial Completions Per Day */}
        <Card className="border-border/80 bg-card/60 p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Tutorial Completions per Day</span>
              <span className="text-xs font-mono text-amber-400">Peak: Weekends</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPLETION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232334" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11121c',
                    borderColor: '#2e3048',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="completions" fill="#FFB84D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. Area Chart: Page Views Telemetry */}
        <Card className="border-border/80 bg-card/60 p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Real-Time Traffic & Simulator Loads</span>
              <span className="text-xs font-mono text-sky-400">12,810 views today</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PAGEVIEW_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#232334" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11121c',
                    borderColor: '#2e3048',
                    borderRadius: '0.75rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#38bdf8"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4. Pie Chart: Tutorials by Difficulty */}
        <Card className="border-border/80 bg-card/60 p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Curriculum Difficulty Breakdown</span>
              <span className="text-xs font-mono text-muted-foreground">20 Total Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DIFFICULTY_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DIFFICULTY_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11121c',
                    borderColor: '#2e3048',
                    borderRadius: '0.75rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="flex justify-center gap-6 text-xs text-muted-foreground pt-2">
            {DIFFICULTY_PIE.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 font-medium">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* TOP TUTORIALS TABLE & ACTIVITY QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Tutorials */}
        <Card className="lg:col-span-2 border-border/80 bg-card/60 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Top Performing Tutorials</h3>
            <Link href="/admin/tutorials" className="text-xs text-primary hover:underline flex items-center gap-1">
              <span>Manage all</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {topTutorials.map((tut, idx) => (
              <div
                key={tut.id}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-muted-foreground font-bold w-4">#{idx + 1}</span>
                  <div>
                    <Link
                      href={`/admin/tutorials/${tut.id}/edit`}
                      className="font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {tut.title}
                    </Link>
                    <div className="flex items-center gap-2 pt-0.5">
                      <DifficultyBadge difficulty={tut.difficulty} />
                      <span className="text-[11px] text-muted-foreground">
                        {tut.time_estimate} mins
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {tut.views_count.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-[#00E5A0]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {tut.completions_count.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Moderation Queue Alert Card */}
        <Card className="border-border/80 bg-card/60 p-5 space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Moderation Queue</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>Showcase Submissions</span>
                <span className="text-amber-400 font-mono">1 Pending</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                &ldquo;Digital Spirit Level Inclinometer&rdquo; by @precision_tools
              </p>
              <Link href="/admin/showcase" className="text-primary hover:underline block pt-1 font-semibold">
                Review & Approve →
              </Link>
            </div>

            <div className="p-3 rounded-xl border border-border/40 bg-secondary/20 space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>Flagged Comments</span>
                <span className="text-muted-foreground font-mono">0 Queued</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Spam filter is active with zero outstanding flags.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
