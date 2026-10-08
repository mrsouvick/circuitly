import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to fetch user profiles';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, role, status } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = { updated_at: new Date().toISOString() };
    if (role !== undefined) updatePayload.role = role;
    if (status !== undefined) updatePayload.status = status;

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update user';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
