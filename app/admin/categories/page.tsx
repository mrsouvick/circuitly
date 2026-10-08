'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Cpu,
  Layers,
  Sparkles,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Category } from '@/types';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#00E5A0');
  const [icon, setIcon] = useState('Cpu');

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
      toast.error('Failed to load live categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setColor('#00E5A0');
    setIcon('Cpu');
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setColor(cat.color);
    setIcon(cat.icon);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error('Name and slug are required');
      return;
    }

    const payload: Partial<Category> = {
      name,
      slug,
      description,
      icon,
      color,
      order_index: editingCategory?.order_index || categories.length + 1,
    };
    if (editingCategory?.id) {
      payload.id = editingCategory.id;
    }

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await loadCategories();
        setModalOpen(false);
        toast.success(
          editingCategory ? `Category "${name}" updated!` : `Category "${name}" created!`
        );
      } else {
        toast.error('Failed to save category');
      }
    } catch {
      toast.error('Network error saving category');
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success(`Category "${catName}" deleted from database`);
      } else {
        toast.error('Failed to delete category');
      }
    } catch {
      toast.error('Network error deleting category');
    }
  };

  const columns: Column<Category>[] = [
    {
      header: 'Color & Icon',
      cell: (item) => (
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${item.color}20`, color: item.color }}
          >
            <Cpu className="h-4 w-4" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">{item.color}</span>
        </div>
      ),
    },
    {
      header: 'Name',
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
        <div className="flex items-center gap-1.5">
          <Button
            onClick={() => openEditModal(item)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Edit category"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            onClick={() => handleDelete(item.id, item.name)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            title="Delete category"
          >
            <Trash2 className="h-3.5 w-3.5" />
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
            Curriculum Categories
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Organize hardware tutorials by sub-domains: Basics, Sensors, Displays, Motors, IoT, and Robotics.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="mint" size="sm" className="gap-2 shadow-md">
          <Plus className="h-4 w-4" />
          <span>New Category</span>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        searchKey="name"
        searchPlaceholder="Filter categories by name..."
        pageSize={10}
      />

      {/* Create / Edit Category Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Category'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Category Name *</label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingCategory) setSlug(slugify(e.target.value));
              }}
              placeholder="e.g. Wireless Telemetry"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">URL Slug *</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="wireless-telemetry"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Description</label>
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of hardware concepts in this category..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Accent Color</label>
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
              <label className="text-xs font-semibold text-muted-foreground">Lucide Icon Identifier</label>
              <Input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Cpu, Activity, Wifi..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="mint" size="sm" className="gap-1.5 shadow-md">
              <Save className="h-3.5 w-3.5" />
              <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
