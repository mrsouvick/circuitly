import { NextResponse, type NextRequest } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET() {
  const tutorials = DataStore.getAllTutorialsAdmin();
  return NextResponse.json({ success: true, data: tutorials });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const saved = DataStore.saveTutorial(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Invalid request payload';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
  }
}
