'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeBlock({
  code,
  filename = 'sketch.ino',
  language = 'cpp',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy code');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.ino') ? filename : `${filename}.ino`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${link.download}!`);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-[#0d0e15] text-white shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#12131c] px-4 py-2.5">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <div className="flex items-center pl-3 text-xs font-mono text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 mr-1.5 text-primary" />
            {filename}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 text-xs text-muted-foreground hover:text-white hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </>
            )}
          </Button>

          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="h-8 px-2.5 text-xs border-white/10 text-muted-foreground hover:text-white hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5 mr-1 text-emerald-400" />
            Download .ino
          </Button>
        </div>
      </div>

      {/* Code lines container */}
      <div className="overflow-x-auto p-4 text-xs sm:text-sm font-mono leading-relaxed max-h-[500px]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                <td className="w-10 select-none pr-4 text-right text-muted-foreground/40 font-mono text-xs">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-emerald-100/90 font-mono">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
