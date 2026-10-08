'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, ArrowLeft, Plus, Trash2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShowcaseFormSchema, ShowcaseFormData } from '@/lib/validations/showcase';
import { useAuth } from '@/components/providers/AuthProvider';
import { DataStore } from '@/lib/data/store';
import { toast } from 'sonner';

export default function NewShowcasePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [componentsList, setComponentsList] = useState<{ name: string; quantity: number }[]>([
    { name: 'Arduino Uno R3', quantity: 1 },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShowcaseFormData>({
    resolver: zodResolver(ShowcaseFormSchema),
    defaultValues: {
      title: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      code: '',
      components: [],
    },
  });

  const addComponentRow = () => {
    setComponentsList([...componentsList, { name: '', quantity: 1 }]);
  };

  const removeComponentRow = (index: number) => {
    setComponentsList(componentsList.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ShowcaseFormData) => {
    const formattedComponents = componentsList
      .filter((c) => c.name.trim().length > 0)
      .map((c) => ({
        name: c.name,
        quantity: c.quantity,
        price: 0,
        buy_url: '',
      }));

    if (user?.id) {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { error } = await supabase.from('showcases').insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          code: data.code,
          components: formattedComponents,
          status: 'approved',
          likes_count: 0,
        });

        if (error) {
          console.error('Supabase error inserting showcase:', error);
        }
      } catch (err) {
        console.error('Error inserting showcase:', err);
      }
    }

    DataStore.saveShowcase({
      id: 'showcase-' + Date.now(),
      title: data.title,
      description: data.description,
      image_url: data.image_url,
      code: data.code,
      components: formattedComponents,
      status: 'approved',
      likes_count: 1,
      user: {
        username: user?.username || 'maker',
        full_name: user?.full_name || 'Maker Student',
        avatar_url: user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=new',
      },
      created_at: new Date().toISOString(),
    });

    toast.success('Your project was published to the Maker Showcase!');
    router.push('/showcase');
  };

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/80">
        <div className="space-y-1">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Showcase</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Submit Your Hardware Project
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Share what you built with the community. Include clear photos and wiring notes.
          </p>
        </div>
      </div>

      <Card className="border-border/80 bg-card/60 shadow-xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Project Title *
              </label>
              <Input
                placeholder="e.g. Autonomous Solar Heliostat Tracker"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Project Description *
              </label>
              <Textarea
                placeholder="Describe your design, sensors used, challenges faced, and what you learned..."
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>

            {/* Photograph URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Project Photograph URL (Unsplash or direct image link) *
              </label>
              <Input
                placeholder="https://images.unsplash.com/..."
                {...register('image_url')}
              />
              {errors.image_url && (
                <p className="text-xs text-destructive">{errors.image_url.message}</p>
              )}
            </div>

            {/* Components Repeater */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground">
                  Components Used
                </label>
                <Button
                  type="button"
                  onClick={addComponentRow}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Add Part
                </Button>
              </div>

              <div className="space-y-2">
                {componentsList.map((comp, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      placeholder="e.g. SG90 Micro Servo"
                      value={comp.name}
                      onChange={(e) => {
                        const updated = [...componentsList];
                        updated[idx].name = e.target.value;
                        setComponentsList(updated);
                      }}
                      className="h-9 text-xs flex-1"
                    />
                    <Input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={comp.quantity}
                      onChange={(e) => {
                        const updated = [...componentsList];
                        updated[idx].quantity = parseInt(e.target.value) || 1;
                        setComponentsList(updated);
                      }}
                      className="h-9 text-xs w-20"
                    />
                    {componentsList.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeComponentRow(idx)}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Arduino Code Snippet */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-muted-foreground">
                Arduino Sketch (Optional)
              </label>
              <Textarea
                placeholder="void setup() { ... } void loop() { ... }"
                rows={6}
                className="font-mono text-xs"
                {...register('code')}
              />
            </div>

            <Button type="submit" variant="mint" className="w-full h-11 gap-2 shadow-lg">
              <UploadCloud className="h-4 w-4" />
              <span>Publish Showcase Project</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
