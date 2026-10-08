import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log('[Resend Webhook Event]:', payload.type, payload.data?.email);
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: true });
  }
}
