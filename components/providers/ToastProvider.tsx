'use client';

import React from 'react';
import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: 'hsl(240, 20%, 8%)',
          border: '1px solid hsl(240, 15%, 18%)',
          color: 'hsl(0, 0%, 98%)',
          borderRadius: '0.85rem',
        },
      }}
    />
  );
}
