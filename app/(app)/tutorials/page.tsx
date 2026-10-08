'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { TutorialCardSkeleton } from '@/components/shared/LoadingShimmer';
import { INITIAL_CATEGORIES, INITIAL_TUTORIALS, Tutorial } from '@/lib/seedData';
import { useDebounce } from '@/hooks/useDebounce';

export default function TutorialsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'shortest'>('popular');
  const [maxCost, setMaxCost] = useState<number>(100);

  // Filter tutorials
  const filteredTutorials = useMemo(() => {
    let list: Tutorial[] = [...INITIAL_TUTORIALS];

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = INITIAL_CATEGORIES.find((c) => c.slug === selectedCategory);
      if (cat) {
        list = list.filter((t) => t.category_id === cat.id);
      }
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      list = list.filter((t) => t.difficulty === selectedDifficulty);
    }

    // Cost estimate filter
    list = list.filter((t) => t.cost_estimate <= maxCost);

    // Search query
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.components.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'popular') {
      list.sort((a, b) => b.views_count - a.views_count);
    } else if (sortBy === 'shortest') {
      list.sort((a, b) => a.time_estimate - b.time_estimate);
    } else {
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return list;
  }, [selectedCategory, selectedDifficulty, sortBy, maxCost, debouncedSearch]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('popular');
    setMaxCost(100);
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase font-mono font-semibold text-primary tracking-wider">
          Full Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          Arduino Project Tutorials
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Browse 20 comprehensive step-by-step physical computing projects. Every sketch is verified, compilable, and accompanied by complete bill-of-materials and troubleshooting guides.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-5 space-y-4 shadow-sm backdrop-blur-sm">
        {/* Search Input Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-primary" />
            <Input
              type="text"
              placeholder="Search by project name, sensor (e.g. HC-SR04, DHT11), or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-secondary/80"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'shortest')}
              className="h-10 text-xs sm:text-sm min-w-[140px]"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="shortest">Shortest Duration</option>
            </Select>

            {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
              <Button onClick={resetFilters} variant="ghost" size="sm" className="h-10 text-xs">
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Filter Pills & Selects */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/40 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
            <Filter className="h-3.5 w-3.5 text-primary" />
            <span>Category:</span>
          </div>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-black font-semibold'
                : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            All Categories
          </button>

          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-primary text-black font-semibold'
                  : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Difficulty Select Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Difficulty:</span>
            <div className="flex gap-1.5">
              {['all', 'beginner', 'intermediate', 'advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-white/10 text-foreground font-semibold border border-white/20'
                      : 'hover:text-foreground'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span>Showing {filteredTutorials.length} projects</span>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No projects match your filter"
          description="Try broadening your search query or selecting 'All Categories'."
          actionLabel="Reset All Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
