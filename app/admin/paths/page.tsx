'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Route, Plus, Edit2, Trash2, BookOpen, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DataTable, Column } from '@/components/admin/DataTable';
import { DifficultyBadge } from '@/components/shared/DifficultyBadge';
import { LearningPath, Tutorial } from '@/types';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminPathsPage() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80');
  const [difficulty, setDifficulty] = useState<LearningPath['difficulty']>('beginner');
  const [selectedTutorialIds, setSelectedTutorialIds] = useState<string[]>([]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [pRes, tRes] = await Promise.all([
        fetch('/api/admin/paths'),
        fetch('/api/admin/tutorials'),
      ]);

      if (pRes.ok) {
        const pJson = await pRes.json();
        if (pJson.success && Array.isArray(pJson.data)) {
          setPaths(pJson.data);
        }
      }

      if (tRes.ok) {
        const tJson = await tRes.json();
        if (tJson.success && Array.isArray(tJson.data)) {
          setTutorials(tJson.data);
        }
      }
    } catch (err) {
      console.error('Failed to load paths data:', err);
      toast.error('Failed to load learning paths');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingPath(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setDifficulty('beginner');
    setSelectedTutorialIds(tutorials.slice(0, 4).map((t) => t.id));
    setModalOpen(true);
  };

  const openEditModal = (p: LearningPath) => {
    setEditingPath(p);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setCoverImage(p.cover_image);
    setDifficulty(p.difficulty);
    setSelectedTutorialIds(p.tutorial_ids || []);
    setModalOpen(true);
  };

  const toggleTutorialInPath = (id: string) => {
    setSelectedTutorialIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      toast.error('Title and slug are required');
      return;
    }

    const payload: Partial<LearningPath> = {
      title,
      slug,
      description,
      cover_image: coverImage,
      difficulty,
      tutorial_ids: selectedTutorialIds,
      is_published: true,
    };
    if (editingPath?.id) {
      payload.id = editingPath.id;
    }

    try {
      const res = await fetch('/api/admin/paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await loadData();
        setModalOpen(false);
        toast.success(editingPath ? `Path "${title}" updated!` : `Path "${title}" created!`);
      } else {
        toast.error('Failed to save learning path');
      }
    } catch {
      toast.error('Network error saving path');
    }
  };

  const columns: Column<LearningPath>[] = [
    {
      header: 'Cover',
      cell: (item) => (
        <div className="relative h-12 w-20 overflow-hidden rounded-lg bg-muted">
          <Image src={item.cover_image} alt={item.title} fill className="object-cover" />
        </div>
      ),
    },
    {
      header: 'Title & Slug',
      accessorKey: 'title',
      sortable: true,
      cell: (item) => (
        <div className="space-y-0.5">
          <p className="font-bold text-foreground text-xs sm:text-sm">{item.title}</p>
          <p className="text-[11px] font-mono text-muted-foreground">/{item.slug}</p>
        </div>
      ),
    },
    {
      header: 'Difficulty',
      accessorKey: 'difficulty',
      sortable: true,
      cell: (item) => <DifficultyBadge difficulty={item.difficulty} />,
    },
    {
      header: 'Projects Count',
      cell: (item) => (
        <span className="font-mono text-xs font-semibold text-primary">
          {item.tutorial_ids.length} tutorials
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <Button
            onClick={() => openEditModal(item)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Manage Learning Paths
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Curate sequential multi-project curricula with auto-advancement and completion credentials.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="mint" size="sm" className="gap-2 shadow-md">
          <Plus className="h-4 w-4" />
          <span>New Learning Path</span>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={paths}
        searchKey="title"
        searchPlaceholder="Filter paths by title..."
        pageSize={10}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogHeader>
          <DialogTitle>
            {editingPath ? `Edit Path: ${editingPath.title}` : 'Create New Learning Path'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Path Title *</label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!editingPath) setSlug(slugify(e.target.value));
              }}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">URL Slug *</label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Difficulty</label>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as LearningPath['difficulty'])}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Cover Image URL</label>
            <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Description</label>
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Select Tutorials checklist */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-muted-foreground">
              Select Included Projects ({selectedTutorialIds.length} chosen)
            </label>
            <div className="max-h-48 overflow-y-auto rounded-xl border border-border/80 bg-secondary/30 p-2 space-y-1.5">
              {tutorials.map((tut) => {
                const isChecked = selectedTutorialIds.includes(tut.id);
                return (
                  <label
                    key={tut.id}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleTutorialInPath(tut.id)}
                      className="h-3.5 w-3.5 rounded accent-primary"
                    />
                    <span className="font-semibold text-foreground">{tut.title}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="mint" size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" />
              <span>{editingPath ? 'Update Path' : 'Create Path'}</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
