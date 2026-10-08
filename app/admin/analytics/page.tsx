'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/admin/StatsCard';
import { toast } from 'sonner';

const TRAFFIC_DATA = [
  { day: 'Mon', organic: 1200, direct: 600, referral: 340 },
  { day: 'Tue', organic: 1400, direct: 720, referral: 420 },
  { day: 'Wed', organic: 1800, direct: 890, referral: 530 },
  { day: 'Thu', organic: 1650, direct: 810, referral: 480 },
  { day: 'Fri', organic: 2100, direct: 980, referral: 650 },
  { day: 'Sat', organic: 2600, direct: 1200, referral: 820 },
  { day: 'Sun', organic: 2900, direct: 1350, referral: 910 },
];

const FUNNEL_STAGES = [
  { stage: '1. Landing Page Visit', count: 48200, percent: 100 },
  { stage: '2. Create Free Account', count: 12480, percent: 25.8 },
  { stage: '3. Started 1st Tutorial', count: 9840, percent: 20.4 },
  { stage: '4. Ran Simulation', count: 7650, percent: 15.8 },
  { stage: '5. Completed 1st Project', count: 5890, percent: 12.2 },
];

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');

  const handleExport = () => {
    toast.success('Analytics report CSV exported successfully');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/80">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Platform Analytics & Telemetry
          </h1>
          <p className="text-xs text-muted-foreground">
            Active user retention, funnel drop-off rates, average build durations, and traffic sources.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-secondary/80 p-1 rounded-xl border border-border text-xs">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-lg uppercase font-semibold transition-colors ${
                  range === r
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <Button onClick={handleExport} variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5 text-primary" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Daily Active Users (DAU)"
          value="1,480"
          change="+12.5%"
          isPositive={true}
          description="today"
          icon={Users}
          color="#00E5A0"
        />
        <StatsCard
          title="Monthly Active (MAU)"
          value="12,480"
          change="+18.4%"
          isPositive={true}
          description="trailing 30d"
          icon={Activity}
          color="#38bdf8"
        />
        <StatsCard
          title="Completion Rate"
          value="74.2%"
          change="+4.1%"
          isPositive={true}
          description="from start to quiz"
          icon={TrendingUp}
          color="#FFB84D"
        />
        <StatsCard
          title="Avg. Session Length"
          value="26.4m"
          change="+2.8m"
          isPositive={true}
          description="per laboratory lab"
          icon={Clock}
          color="#a855f7"
        />
      </div>

      {/* Traffic Sources Chart */}
      <Card className="border-border/80 bg-card/60 p-6 space-y-4">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-bold flex items-center justify-between">
            <span>Weekly Inbound Traffic (Organic, Direct & Referrals)</span>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#00E5A0]">
                <span className="h-2 w-2 rounded-full bg-[#00E5A0]" /> Organic Search
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> Direct
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="h-2 w-2 rounded-full bg-purple-400" /> Referrals
              </span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TRAFFIC_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222336" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#11121c',
                  borderColor: '#2e3048',
                  borderRadius: '0.75rem',
                }}
              />
              <Area type="monotone" dataKey="organic" stackId="1" stroke="#00E5A0" fill="#00E5A0" fillOpacity={0.6} />
              <Area type="monotone" dataKey="direct" stackId="1" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
              <Area type="monotone" dataKey="referral" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel Visualization */}
      <Card className="border-border/80 bg-card/60 p-6 space-y-5">
        <h3 className="text-base font-bold text-foreground">
          Student Learning Lifecycle Funnel
        </h3>
        <p className="text-xs text-muted-foreground">
          Conversion progression from casual visitor through account activation, virtual simulation, and completed hardware build.
        </p>

        <div className="space-y-3 pt-2">
          {FUNNEL_STAGES.map((stage, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{stage.stage}</span>
                <span className="font-mono text-muted-foreground">
                  {stage.count.toLocaleString()} students ({stage.percent}%)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-secondary/80 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-sky-400 rounded-full transition-all duration-500"
                  style={{ width: `${stage.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
