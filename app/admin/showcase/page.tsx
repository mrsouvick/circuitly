'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  CheckCircle,
  XCircle,
  Star,
  Trash2,
  Eye,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Showcase } from '@/types';
import { toast } from 'sonner';

export default function AdminShowcaseModerationPage() {
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<Showcase | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadShowcases = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/showcases');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setShowcases(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load showcases:', err);
      toast.error('Failed to load live showcases');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadShowcases();
  }, []);

  const filtered = showcases.filter((s) => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const handleUpdateStatus = async (id: string, newStatus: Showcase['status']) => {
    try {
      const res = await fetch('/api/admin/showcases', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setShowcases((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
        toast.success(`Showcase status updated to ${newStatus} in database`);
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Network error updating status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this showcase post permanently from database?')) return;
    try {
      const res = await fetch(`/api/admin/showcases?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setShowcases((prev) => prev.filter((s) => s.id !== id));
        toast.success('Showcase removed from database');
      } else {
        toast.error('Failed to delete showcase');
      }
    } catch {
      toast.error('Network error deleting showcase');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Showcase Moderation Queue
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Review community student project submissions, feature outstanding hardware on the landing page, or reject spam.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border/60 text-xs">
          {['all', 'pending', 'approved', 'featured', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-card text-foreground font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between overflow-hidden border-border/80 bg-card/60">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'featured'
                        ? 'bg-[#00E5A0] text-black'
                        : item.status === 'approved'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : item.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-destructive/20 text-destructive border border-destructive/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.user?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + item.id}
                    alt=""
                    className="h-5 w-5 rounded-full"
                  />
                  <span className="font-semibold text-foreground">
                    {item.user?.full_name || 'Maker Student'}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    @{item.user?.username || 'maker'}
                  </span>
                </div>

                <h3 className="font-bold text-foreground text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-border/40 flex items-center justify-between mt-3 text-xs">
              <Button
                onClick={() => setPreviewItem(item)}
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </Button>

              <div className="flex items-center gap-1">
                {item.status !== 'approved' && (
                  <Button
                    onClick={() => handleUpdateStatus(item.id, 'approved')}
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs text-[#00E5A0] border-[#00E5A0]/40"
                    title="Approve post"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                  </Button>
                )}
                {item.status !== 'featured' && (
                  <Button
                    onClick={() => handleUpdateStatus(item.id, 'featured')}
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs text-amber-400 border-amber-400/40"
                    title="Feature on homepage"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                )}
                {item.status !== 'rejected' && (
                  <Button
                    onClick={() => handleUpdateStatus(item.id, 'rejected')}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10"
                    title="Reject"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Dialog */}
      {previewItem && (
        <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
          <DialogHeader>
            <DialogTitle>{previewItem.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-xs">
            <div className="relative h-60 w-full rounded-xl overflow-hidden border border-border">
              <Image src={previewItem.image_url} alt="" fill className="object-cover" />
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-muted-foreground">Author:</span>
              <p className="text-foreground">
                {previewItem.user?.full_name || 'Maker Student'} (@{previewItem.user?.username || 'maker'})
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-muted-foreground">Project Description:</span>
              <p className="text-foreground leading-relaxed">{previewItem.description}</p>
            </div>

            {previewItem.code && (
              <div className="space-y-1">
                <span className="font-semibold text-muted-foreground">Code Attached:</span>
                <pre className="p-3 bg-secondary/80 rounded-xl font-mono text-[11px] overflow-x-auto text-emerald-200">
                  {previewItem.code}
                </pre>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setPreviewItem(null)}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
