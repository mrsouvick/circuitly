'use client';

import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Shield,
  Mail,
  Sliders,
  Megaphone,
  Save,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  // General State
  const [siteName, setSiteName] = useState('Circuitly');
  const [tagline, setTagline] = useState('From Zero to Maker — Learn Arduino by Building');
  const [contactEmail, setContactEmail] = useState('hello@circuitly.io');

  // Feature Toggles
  const [enableSimulator, setEnableSimulator] = useState(true);
  const [enableShowcase, setEnableShowcase] = useState(true);
  const [enableComments, setEnableComments] = useState(true);
  const [enableQuizzes, setEnableQuizzes] = useState(true);

  // Announcement Banner
  const [announcementText, setAnnouncementText] = useState('🎉 Welcome to Circuitly 1.0 — Free open-access Arduino project tutorials are live!');
  const [announcementActive, setAnnouncementActive] = useState(true);

  // Email & Resend
  const [senderName, setSenderName] = useState('Circuitly Labs');
  const [resendApiKey, setResendApiKey] = useState('re_live_94819482018471928471');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Site configuration saved and updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-3xl font-extrabold text-foreground">
          Platform Administration Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage system metadata, SEO parameters, feature flags, transactional email gateways, and global announcements.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-secondary/60 p-1 rounded-2xl w-full justify-start overflow-x-auto">
          <TabsTrigger value="general" className="text-xs gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            General & SEO
          </TabsTrigger>
          <TabsTrigger value="features" className="text-xs gap-1.5">
            <Sliders className="h-3.5 w-3.5" />
            Feature Flags
          </TabsTrigger>
          <TabsTrigger value="announcements" className="text-xs gap-1.5">
            <Megaphone className="h-3.5 w-3.5" />
            Announcement Banner
          </TabsTrigger>
          <TabsTrigger value="email" className="text-xs gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            Email (Resend)
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: General */}
        <TabsContent value="general" className="pt-4 space-y-4">
          <Card className="border-border/80 bg-card/60 p-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Platform Name</label>
                  <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Support Email</label>
                  <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Tagline</label>
                <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Default OpenGraph Meta Image</label>
                <Input defaultValue="/og-image.png" />
              </div>

              <Button type="submit" variant="mint" size="sm" className="gap-2 shadow-md">
                <Save className="h-4 w-4" />
                <span>Save General Settings</span>
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 2: Feature Flags */}
        <TabsContent value="features" className="pt-4 space-y-4">
          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-base">Module Toggles</CardTitle>
              <CardDescription>Enable or disable subsystems in real-time across the platform.</CardDescription>
            </CardHeader>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Wokwi Simulator Engine</h4>
                  <p className="text-xs text-muted-foreground">Allows students to simulate circuits inside their browser.</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableSimulator}
                  onChange={(e) => setEnableSimulator(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Maker Showcase Gallery</h4>
                  <p className="text-xs text-muted-foreground">Permits students to submit hardware photographs and code.</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableShowcase}
                  onChange={(e) => setEnableShowcase(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Threaded Tutorial Comments</h4>
                  <p className="text-xs text-muted-foreground">Enables peer troubleshooting questions underneath tutorials.</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableComments}
                  onChange={(e) => setEnableComments(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Interactive Knowledge Quizzes</h4>
                  <p className="text-xs text-muted-foreground">Enables 5-question multiple choice quizzes on tutorials.</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableQuizzes}
                  onChange={(e) => setEnableQuizzes(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </div>
            </div>

            <Button onClick={handleSave} variant="mint" size="sm" className="gap-2 shadow-md">
              <Save className="h-4 w-4" />
              <span>Update Feature Flags</span>
            </Button>
          </Card>
        </TabsContent>

        {/* Tab 3: Announcements */}
        <TabsContent value="announcements" className="pt-4 space-y-4">
          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-base">Site-Wide Banner Announcement</CardTitle>
              <CardDescription>Broadcast important messages, release notes, or maintenance notifications.</CardDescription>
            </CardHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground">Banner Active Status</label>
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Announcement Text</label>
                <Textarea
                  rows={2}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                />
              </div>

              <Button onClick={handleSave} variant="mint" size="sm" className="gap-2 shadow-md">
                <Save className="h-4 w-4" />
                <span>Save Banner</span>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 4: Email */}
        <TabsContent value="email" className="pt-4 space-y-4">
          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-base">Resend Email Gateway Configuration</CardTitle>
              <CardDescription>Transactional emails: welcome notices, password resets, and weekly digests.</CardDescription>
            </CardHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Sender Name</label>
                  <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">From Address</label>
                  <Input defaultValue="hello@circuitly.io" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Resend API Key</label>
                <Input
                  type="password"
                  value={resendApiKey}
                  onChange={(e) => setResendApiKey(e.target.value)}
                />
              </div>

              <Button onClick={handleSave} variant="mint" size="sm" className="gap-2 shadow-md">
                <Save className="h-4 w-4" />
                <span>Save Email Gateway</span>
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
