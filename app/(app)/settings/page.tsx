'use client';

import React, { useState } from 'react';
import {
  User,
  Settings,
  Bell,
  Globe,
  Palette,
  Trash2,
  Save,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();

  const [fullName, setFullName] = useState(user?.full_name || 'Alex Rivera');
  const [username, setUsername] = useState(user?.username || 'maker_alex');
  const [bio, setBio] = useState(user?.bio || 'High school robotics enthusiast building autonomous rovers.');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=alex');

  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [emailDigest, setEmailDigest] = useState(true);
  const [forumAlerts, setForumAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      username,
      bio,
      avatar_url: avatarUrl,
    });
    toast.success('Profile settings updated successfully!');
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to reset your local progress and start fresh?')) {
      localStorage.removeItem('circuitly-user-progress');
      toast.success('Local learning progress cleared.');
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-foreground">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your student profile, notifications, appearance, and workspace preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-secondary/60 p-1 rounded-2xl">
          <TabsTrigger value="profile" className="gap-1.5 text-xs sm:text-sm">
            <User className="h-4 w-4" />
            Profile Details
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-1.5 text-xs sm:text-sm">
            <Palette className="h-4 w-4" />
            Theme & Language
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 text-xs sm:text-sm">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Profile Details */}
        <TabsContent value="profile" className="pt-4">
          <Card className="border-border/80 bg-card/60">
            <CardHeader>
              <CardTitle>Public Maker Profile</CardTitle>
              <CardDescription>
                This information will appear on your public author card and project showcases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="flex items-center gap-4 pb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl}
                    alt="avatar preview"
                    className="h-16 w-16 rounded-2xl bg-secondary border border-border"
                  />
                  <div className="space-y-1 flex-1">
                    <label className="text-xs font-semibold text-muted-foreground">Avatar URL</label>
                    <Input
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://api.dicebear.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Username</label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Bio</label>
                  <Textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <Button type="submit" variant="mint" size="sm" className="gap-2 shadow-md">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Preferences */}
        <TabsContent value="preferences" className="pt-4 space-y-6">
          <Card className="border-border/80 bg-card/60">
            <CardHeader>
              <CardTitle>Interface Appearance</CardTitle>
              <CardDescription>Customize the visual theme of the Circuitly IDE.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Theme Color Scheme</h4>
                  <p className="text-xs text-muted-foreground">Dark mode is default for low eye fatigue.</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'dark' ? 'mint' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                  >
                    Dark Mode
                  </Button>
                  <Button
                    variant={theme === 'light' ? 'mint' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                  >
                    Light Mode
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Platform Language</h4>
                  <p className="text-xs text-muted-foreground">Select tutorial documentation language.</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={language === 'en' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setLanguage('en');
                      toast.success('Language set to English (EN)');
                    }}
                  >
                    English (EN)
                  </Button>
                  <Button
                    variant={language === 'bn' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setLanguage('bn');
                      toast.success('Language set to Bengali (BN)');
                    }}
                  >
                    বাংলা (BN)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/40 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Reset Progress Data</CardTitle>
              <CardDescription>
                Clear all step completion marks, quiz scores, and saved bookmarks from this browser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearData}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Reset Local Progress</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Notifications */}
        <TabsContent value="notifications" className="pt-4">
          <Card className="border-border/80 bg-card/60">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what updates you want sent to your inbox.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Weekly Maker Digest</h4>
                  <p className="text-xs text-muted-foreground">Every Friday with newly published tutorials.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Discussion Reply Alerts</h4>
                  <p className="text-xs text-muted-foreground">Notify when someone answers your hardware question.</p>
                </div>
                <input
                  type="checkbox"
                  checked={forumAlerts}
                  onChange={(e) => setForumAlerts(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
