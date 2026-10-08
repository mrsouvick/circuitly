'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Search,
  Download,
  Trash2,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  pageSize?: number;
  onExportCSV?: () => void;
  bulkActions?: (selected: T[]) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  searchPlaceholder = 'Search records...',
  searchKey,
  pageSize = 10,
  onExportCSV,
  bulkActions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter
  const filteredData = useMemo(() => {
    if (!searchTerm || !searchKey) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((item) => {
      const val = item[searchKey];
      return val ? String(val).toLowerCase().includes(term) : false;
    });
  }, [data, searchTerm, searchKey]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      return sortOrder === 'asc' ? 1 : -1;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedData.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedItems = data.filter((d) => selectedIds.includes(d.id));

  return (
    <div className="space-y-4">
      {/* Search and Table Actions Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {searchKey && (
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-9 text-xs sm:text-sm bg-secondary/60"
            />
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {bulkActions && selectedIds.length > 0 && bulkActions(selectedItems)}

          {onExportCSV && (
            <Button
              onClick={onExportCSV}
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 text-xs"
            >
              <Download className="h-3.5 w-3.5 text-primary" />
              <span>Export CSV</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table Frame */}
      <div className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  checked={
                    paginatedData.length > 0 &&
                    paginatedData.every((d) => selectedIds.includes(d.id))
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
              </TableHead>
              {columns.map((col, idx) => (
                <TableHead key={idx}>
                  {col.sortable && col.accessorKey ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.accessorKey)}
                      className="flex items-center gap-1 font-semibold text-xs text-muted-foreground hover:text-foreground"
                    >
                      <span>{col.header}</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow key={item.id} className="hover:bg-white/[0.02]">
                  <TableCell className="w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleToggleRow(item.id)}
                      className="h-4 w-4 rounded accent-primary cursor-pointer"
                    />
                  </TableCell>
                  {columns.map((col, cIdx) => (
                    <TableCell key={cIdx}>
                      {col.cell
                        ? col.cell(item)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? '')
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-32 text-center text-muted-foreground"
                >
                  No records found matching criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Bar */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
        <span>
          Showing {(currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
        </span>

        <div className="flex items-center space-x-1.5">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="h-8 px-2"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="px-2 font-mono">
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="h-8 px-2"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
