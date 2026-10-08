'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/admin/DataTable';
import { DifficultyBadge } from '@/components/shared/DifficultyBadge';
import { Tutorial } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/seedData';
import { toast } from 'sonner';

export default function AdminTutorialsListPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTutorials = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/tutorials');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTutorials(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load tutorials:', err);
      toast.error('Failed to load live tutorials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTutorials();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete tutorial "${title}" from the database?`)) return;
    try {
      const res = await fetch(`/api/admin/tutorials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTutorials((prev) => prev.filter((t) => t.id !== id));
        toast.success(`Deleted "${title}"`);
      } else {
        toast.error('Failed to delete tutorial');
      }
    } catch {
      toast.error('Network error deleting tutorial');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/tutorials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !currentStatus }),
      });
      if (res.ok) {
        setTutorials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, is_published: !currentStatus } : t))
        );
        toast.success(!currentStatus ? 'Tutorial published live' : 'Tutorial converted to draft');
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Network error updating status');
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Slug', 'Difficulty', 'Views', 'Completions', 'Published'];
    const rows = tutorials.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.slug,
      t.difficulty,
      t.views_count,
      t.completions_count,
      t.is_published,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'circuitly_tutorials.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported tutorials CSV!');
  };

  const columns: Column<Tutorial>[] = [
    {
      header: 'Thumbnail',
      cell: (item) => (
        <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-muted">
          <Image src={item.hero_image} alt={item.title} fill className="object-cover" />
        </div>
      ),
    },
    {
      header: 'Title & Category',
      accessorKey: 'title',
      sortable: true,
      cell: (item) => {
        const cat = INITIAL_CATEGORIES.find((c) => c.id === item.category_id);
        return (
          <div className="space-y-0.5">
            <Link
              href={`/admin/tutorials/${item.id}/edit`}
              className="font-bold text-foreground hover:text-primary transition-colors text-xs sm:text-sm line-clamp-1"
            >
              {item.title}
            </Link>
            <span className="text-[11px] text-muted-foreground">{cat?.name || 'General'}</span>
          </div>
        );
      },
    },
    {
      header: 'Difficulty',
      accessorKey: 'difficulty',
      sortable: true,
      cell: (item) => <DifficultyBadge difficulty={item.difficulty} />,
    },
    {
      header: 'Status',
      accessorKey: 'is_published',
      sortable: true,
      cell: (item) => (
        <button
          onClick={() => handleTogglePublish(item.id, item.is_published)}
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-colors ${
            item.is_published
              ? 'bg-[#00E5A0]/15 text-[#00E5A0] border-[#00E5A0]/30 hover:bg-destructive/15 hover:text-destructive hover:border-destructive/30'
              : 'bg-muted text-muted-foreground border-border hover:bg-primary/20 hover:text-primary'
          }`}
          title="Click to toggle publish status"
        >
          {item.is_published ? 'Published' : 'Draft'}
        </button>
      ),
    },
    {
      header: 'Views',
      accessorKey: 'views_count',
      sortable: true,
      cell: (item) => <span className="font-mono text-xs">{item.views_count.toLocaleString()}</span>,
    },
    {
      header: 'Completions',
      accessorKey: 'completions_count',
      sortable: true,
      cell: (item) => (
        <span className="font-mono text-xs text-[#00E5A0]">
          {item.completions_count.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <Link href={`/tutorials/${item.slug}`} target="_blank">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="View live page">
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href={`/admin/tutorials/${item.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Edit tutorial">
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            onClick={() => handleDelete(item.id, item.title)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            title="Delete tutorial"
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
            Manage Tutorials
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Create, edit, review, and organize curriculum projects for the Circuitly platform.
          </p>
        </div>

        <Link href="/admin/tutorials/new">
          <Button variant="mint" size="sm" className="gap-2 shadow-md">
            <Plus className="h-4 w-4" />
            <span>New Tutorial</span>
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={tutorials}
        searchKey="title"
        searchPlaceholder="Filter tutorials by title..."
        pageSize={8}
        onExportCSV={exportCSV}
      />
    </div>
  );
}
