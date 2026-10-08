import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET() {
  const stats = DataStore.getAdminStats();
  return NextResponse.json({ success: true, data: stats });
}
