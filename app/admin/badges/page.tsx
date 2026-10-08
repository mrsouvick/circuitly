'use client';

import React, { useState, useEffect } from 'react';
import { Award, Plus, Edit2, Sparkles, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Badge } from '@/types';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminBadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#00E5A0');
  const [threshold, setThreshold] = useState(1);

  const loadBadges = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/badges');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setBadges(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load badges:', err);
      toast.error('Failed to load live badges');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const openCreate = () => {
    setEditingBadge(null);
    setName('');
    setSlug('');
    setDescription('');
    setColor('#00E5A0');
    setThreshold(1);
    setModalOpen(true);
  };

  const openEdit = (b: Badge) => {
    setEditingBadge(b);
    setName(b.name);
    setSlug(b.slug);
    setDescription(b.description);
    setColor(b.color);
    setThreshold(b.requirement_rule.threshold);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error('Badge name and slug are required');
      return;
    }

    const payload: Partial<Badge> = {
      name,
      slug,
      description,
      icon: 'Sparkles',
      color,
      requirement_rule: {
        type: 'tutorials_completed',
        threshold: Number(threshold),
      },
    };
    if (editingBadge?.id) {
      payload.id = editingBadge.id;
    }

    try {
      const res = await fetch('/api/admin/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await loadBadges();
        setModalOpen(false);
        toast.success(editingBadge ? `Badge "${name}" updated!` : `Badge "${name}" created!`);
      } else {
        toast.error('Failed to save badge');
      }
    } catch {
      toast.error('Network error saving badge');
    }
  };

  const columns: Column<Badge>[] = [
    {
      header: 'Badge Icon',
      cell: (item) => (
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl shadow-inner"
          style={{ backgroundColor: `${item.color}20`, color: item.color }}
        >
          <Sparkles className="h-5 w-5" />
        </div>
      ),
    },
    {
      header: 'Badge Name',
      accessorKey: 'name',
      sortable: true,
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-bold text-foreground text-xs sm:text-sm">{item.name}</p>
          <p className="text-[11px] font-mono text-muted-foreground">/{item.slug}</p>
        </div>
      ),
    },
    {
      header: 'Requirement Rule',
      cell: (item) => (
        <span className="font-mono text-xs text-primary">
          Complete {item.requirement_rule.threshold} {item.requirement_rule.type.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (item) => (
        <p className="text-xs text-muted-foreground line-clamp-1 max-w-sm">
          {item.description}
        </p>
      ),
    },
    {
      header: 'Actions',
      cell: (item) => (
        <Button
          onClick={() => openEdit(item)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Student Achievement Badges
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure gamification rewards automatically dispatched upon hardware milestone completion.
          </p>
        </div>

        <Button onClick={openCreate} variant="mint" size="sm" className="gap-2 shadow-md">
          <Plus className="h-4 w-4" />
          <span>New Badge</span>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={badges}
        searchKey="name"
        searchPlaceholder="Filter badges..."
        pageSize={10}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogHeader>
          <DialogTitle>{editingBadge ? `Edit Badge: ${editingBadge.name}` : 'Create Achievement Badge'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Badge Name *</label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingBadge) setSlug(slugify(e.target.value));
              }}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Slug</label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Threshold (Projects)</label>
              <Input
                type="number"
                min={1}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-9 w-9 rounded-lg border border-border cursor-pointer bg-transparent"
              />
              <Input value={color} onChange={(e) => setColor(e.target.value)} className="h-9 font-mono text-xs" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Description</label>
            <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="mint" size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" />
              <span>{editingBadge ? 'Update Badge' : 'Create Badge'}</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
