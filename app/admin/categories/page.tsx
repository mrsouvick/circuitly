'use client';

import React, { useState } from 'react';
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
import { DataStore } from '@/lib/data/store';
import { Category } from '@/types';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(DataStore.getCategories());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#00E5A0');
  const [icon, setIcon] = useState('Cpu');

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error('Name and slug are required');
      return;
    }

    const payload: Category = {
      id: editingCategory?.id || 'cat-' + Date.now(),
      name,
      slug,
      description,
      icon,
      color,
      order_index: editingCategory?.order_index || categories.length + 1,
    };

    DataStore.saveCategory(payload);
    setCategories(DataStore.getCategories());
    setModalOpen(false);
    toast.success(
      editingCategory
        ? `Category "${name}" updated!`
        : `Category "${name}" created!`
    );
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Are you sure you want to delete category "${catName}"?`)) {
      DataStore.deleteCategory(id);
      setCategories(DataStore.getCategories());
      toast.success(`Category "${catName}" deleted`);
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
