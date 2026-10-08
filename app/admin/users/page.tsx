'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  ShieldCheck,
  Ban,
  CheckCircle,
  Download,
  KeyRound,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Profile, UserRole } from '@/types';
import { toast } from 'sonner';

const SAMPLE_USERS: Profile[] = [
  {
    id: 'u-1',
    username: 'circuit_admin',
    full_name: 'Lead Instructor (Admin)',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
    bio: 'Lead Platform Instructor',
    role: 'admin',
    status: 'active',
    streak_count: 30,
    last_active_at: new Date().toISOString(),
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'u-2',
    username: 'elena_rostova',
    full_name: 'Elena Rostova',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=elena',
    bio: 'High school robotics team captain',
    role: 'user',
    status: 'active',
    streak_count: 14,
    last_active_at: new Date().toISOString(),
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'u-3',
    username: 'marcus_vance',
    full_name: 'Marcus Vance',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=marcus',
    bio: 'Maker community lead',
    role: 'moderator',
    status: 'active',
    streak_count: 8,
    last_active_at: new Date().toISOString(),
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'u-4',
    username: 'spam_bot99',
    full_name: 'Crypt0 Spammer',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=spambot',
    bio: 'Automated referral promoter',
    role: 'user',
    status: 'banned',
    streak_count: 0,
    last_active_at: '2024-02-10T00:00:00Z',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
  },
  {
    id: 'u-5',
    username: 'alex_rivera',
    full_name: 'Alex Rivera',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=alex',
    bio: 'Physics undergraduate',
    role: 'user',
    status: 'active',
    streak_count: 5,
    last_active_at: new Date().toISOString(),
    created_at: '2024-02-12T00:00:00Z',
    updated_at: '2024-02-12T00:00:00Z',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>(SAMPLE_USERS);

  const handleRoleChange = (id: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    toast.success(`Role changed to ${newRole}`);
  };

  const handleToggleBan = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'banned' : 'active';
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: nextStatus as Profile['status'] } : u))
    );
    toast.success(nextStatus === 'banned' ? 'User banned from platform' : 'User unbanned');
  };

  const handleImpersonate = (username: string) => {
    toast.success(`Session impersonation initialized for @${username}`);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Username', 'FullName', 'Role', 'Status', 'Streak'];
    const rows = users.map((u) => [
      u.id,
      u.username,
      `"${u.full_name || ''}"`,
      u.role,
      u.status,
      u.streak_count,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'circuitly_users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported users CSV!');
  };

  const columns: Column<Profile>[] = [
    {
      header: 'Student User',
      accessorKey: 'full_name',
      sortable: true,
      cell: (item) => (
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.avatar_url || ''}
            alt=""
            className="h-8 w-8 rounded-xl bg-secondary border border-border"
          />
          <div>
            <Link
              href={`/u/${item.username}`}
              target="_blank"
              className="font-bold text-foreground hover:text-primary transition-colors text-xs"
            >
              {item.full_name || item.username}
            </Link>
            <p className="text-[11px] font-mono text-muted-foreground">@{item.username}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (item) => (
        <Select
          value={item.role}
          onChange={(e) => handleRoleChange(item.id, e.target.value as UserRole)}
          className="h-7 w-28 text-xs py-0.5"
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </Select>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (item) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            item.status === 'active'
              ? 'bg-[#00E5A0]/15 text-[#00E5A0] border border-[#00E5A0]/30'
              : 'bg-destructive/20 text-destructive border border-destructive/30'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: 'Streak',
      accessorKey: 'streak_count',
      sortable: true,
      cell: (item) => (
        <span className="font-mono text-xs font-semibold text-orange-400">
          {item.streak_count} days
        </span>
      ),
    },
    {
      header: 'Joined',
      accessorKey: 'created_at',
      sortable: true,
      cell: (item) => (
        <span className="text-xs text-muted-foreground font-mono">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <Button
            onClick={() => handleToggleBan(item.id, item.status)}
            variant="ghost"
            size="sm"
            className={`h-7 px-2 text-xs ${
              item.status === 'active'
                ? 'text-destructive hover:bg-destructive/10'
                : 'text-[#00E5A0] hover:bg-[#00E5A0]/10'
            }`}
          >
            {item.status === 'active' ? 'Ban' : 'Unban'}
          </Button>
          <Button
            onClick={() => handleImpersonate(item.username)}
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            title="Impersonate for debugging"
          >
            <KeyRound className="h-3 w-3" />
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
            User Accounts & Roles
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage student permissions, assign moderator/admin credentials, and moderate active status.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchKey="username"
        searchPlaceholder="Filter students by username..."
        pageSize={8}
        onExportCSV={exportCSV}
      />
    </div>
  );
}
