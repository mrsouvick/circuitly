'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  CheckCircle,
  Trash2,
  AlertTriangle,
  Flag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface AdminComment {
  id: string;
  author: string;
  tutorialTitle: string;
  content: string;
  status: 'approved' | 'pending' | 'flagged';
  createdAt: string;
}

const INITIAL_COMMENTS: AdminComment[] = [
  {
    id: 'comm-1',
    author: 'Lucas Vance',
    tutorialTitle: 'HC-SR04 Ultrasonic Distance Sensor',
    content: 'Compiled on Arduino IDE 2.3 without a single hitch. The ultrasonic timing formula explanation is the clearest I have seen online.',
    status: 'approved',
    createdAt: '2 hours ago',
  },
  {
    id: 'comm-2',
    author: 'Sophia Chen',
    tutorialTitle: 'Blink LED: The Hello World of Physical Computing',
    content: 'Make sure your breadboard rails are common ground! I was scratching my head until I checked the troubleshooting section here.',
    status: 'approved',
    createdAt: '5 hours ago',
  },
  {
    id: 'comm-3',
    author: 'CryptoPromoBot',
    tutorialTitle: 'Traffic Light Simulator',
    content: 'Claim free crypto rewards and tokens at http://bit-scam-promo.biz/bonus today!',
    status: 'flagged',
    createdAt: '1 day ago',
  },
];

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>(INITIAL_COMMENTS);

  const handleApprove = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' } : c))
    );
    toast.success('Comment approved and published');
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    toast.success('Comment deleted');
  };

  const handleFlag = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'flagged' } : c))
    );
    toast.success('Comment marked as flagged for review');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          Comment Moderation
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Monitor questions and discussions across all 20 tutorials. Auto-detect spam and inappropriate links.
        </p>
      </div>

      <div className="space-y-4">
        {comments.map((comm) => (
          <Card
            key={comm.id}
            className={`p-5 space-y-3 border ${
              comm.status === 'flagged'
                ? 'border-destructive/40 bg-destructive/5'
                : 'border-border/80 bg-card/60'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-xs sm:text-sm">{comm.author}</span>
                <span className="text-xs text-muted-foreground">on</span>
                <span className="text-xs font-semibold text-primary">{comm.tutorialTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    comm.status === 'approved'
                      ? 'bg-[#00E5A0]/15 text-[#00E5A0]'
                      : 'bg-destructive/20 text-destructive'
                  }`}
                >
                  {comm.status}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{comm.createdAt}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed bg-secondary/30 p-3 rounded-xl border border-border/40">
              {comm.content}
            </p>

            <div className="flex items-center justify-end gap-2 pt-1">
              {comm.status !== 'approved' && (
                <Button
                  onClick={() => handleApprove(comm.id)}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs text-[#00E5A0] border-[#00E5A0]/40 gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  <span>Approve</span>
                </Button>
              )}
              {comm.status !== 'flagged' && (
                <Button
                  onClick={() => handleFlag(comm.id)}
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-amber-400 gap-1"
                >
                  <Flag className="h-3 w-3" />
                  <span>Flag</span>
                </Button>
              )}
              <Button
                onClick={() => handleDelete(comm.id)}
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-destructive hover:bg-destructive/10 gap-1"
              >
                <Trash2 className="h-3 w-3" />
                <span>Delete</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
