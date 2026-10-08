'use client';

import React, { useState, useMemo } from 'react';
import { Search, Hash, Clock, X, BookOpen, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { INITIAL_TUTORIALS } from '@/lib/seedData';
import { useDebounce } from '@/hooks/useDebounce';

const TRENDING_TAGS = [
  'Ultrasonic HC-SR04',
  'Servo SG90',
  'ESP8266 Wi-Fi',
  'SSD1306 OLED',
  'Blink LED',
  'Traffic Light',
  'PIR Sensor',
  'RFID RC522',
  'Stepper A4988',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Servo motor PWM',
    'ESP8266 weather',
    'HC-SR04 distance',
  ]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase().trim();
    return INITIAL_TUTORIALS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.components.some((c) => c.name.toLowerCase().includes(q))
    );
  }, [debouncedQuery]);

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    if (!recentSearches.includes(tag)) {
      setRecentSearches([tag, ...recentSearches.slice(0, 4)]);
    }
  };

  const removeRecent = (text: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== text));
  };

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      {/* Search Input Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-foreground">
          Search the Circuitly Knowledgebase
        </h1>
        <p className="text-sm text-muted-foreground">
          Find hardware tutorials, compilable Arduino sketches, and sensor documentation.
        </p>

        <div className="relative max-w-2xl mx-auto pt-4">
          <Search className="absolute left-4 top-7 h-5 w-5 text-primary" />
          <Input
            type="text"
            placeholder="Search keywords, pins, sensors, or component names..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 rounded-2xl bg-secondary/80 border-border text-base shadow-lg"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-7 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Trending & Recent Tags */}
      {!query && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Trending Searches */}
          <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5" />
              Trending Hardware Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelectTag(tag)}
                  className="rounded-xl border border-border/80 bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              Recent Searches
            </h3>
            <div className="space-y-1.5">
              {recentSearches.map((rec) => (
                <div
                  key={rec}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-secondary/40 text-xs transition-colors"
                >
                  <button
                    onClick={() => handleSelectTag(rec)}
                    className="text-foreground hover:text-primary text-left truncate flex-1"
                  >
                    {rec}
                  </button>
                  <button
                    onClick={() => removeRecent(rec)}
                    className="text-muted-foreground hover:text-foreground p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results View */}
      {query && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/80 text-sm text-muted-foreground">
            <span>
              Found <strong className="text-foreground">{searchResults.length}</strong> matching projects
            </span>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((tut) => (
                <TutorialCard key={tut.id} tutorial={tut} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-dashed border-border text-muted-foreground space-y-2">
              <BookOpen className="h-8 w-8 mx-auto text-muted-foreground/60" />
              <h3 className="font-semibold text-foreground">No matches found for &ldquo;{query}&rdquo;</h3>
              <p className="text-xs">Try searching for &quot;LED&quot;, &quot;Ultrasonic&quot;, or &quot;Servo&quot;.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
