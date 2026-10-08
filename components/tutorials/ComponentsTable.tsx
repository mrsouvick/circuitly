import React from 'react';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { ComponentItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export function ComponentsTable({ components }: { components: ComponentItem[] }) {
  const totalCost = components.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Required Hardware & BOM</h3>
        <span className="text-sm font-semibold text-primary">
          Total Estimated: {formatPrice(totalCost)}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component / Part</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
              <TableHead className="text-right">Vendor Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                <TableCell className="text-center font-mono">{item.quantity}x</TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  {formatPrice(item.price)}
                </TableCell>
                <TableCell className="text-right font-mono font-semibold text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </TableCell>
                <TableCell className="text-right">
                  {item.buy_url ? (
                    <a
                      href={item.buy_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <span>Buy</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">Stocked</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
