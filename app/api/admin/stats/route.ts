import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createAdminClient();

    // 1. Profiles (users)
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // 2. Tutorials
    const { data: tutorials, count: totalTutorials } = await supabase
      .from('tutorials')
      .select('id, is_published, completions_count, views_count');

    const publishedTutorials = tutorials?.filter((t) => t.is_published).length || 0;
    const draftTutorials = (totalTutorials || 0) - publishedTutorials;
    const totalCompletionsCount = tutorials?.reduce((acc, t) => acc + (t.completions_count || 0), 0) || 0;

    // 3. Showcases
    const { data: showcases, count: totalShowcases } = await supabase
      .from('showcases')
      .select('id, status');

    const pendingShowcases = showcases?.filter((s) => s.status === 'pending').length || 0;

    // 4. User Progress completions
    const { count: userCompletions } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('is_completed', true);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { count: activeUsers7d } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_active_at', sevenDaysAgo);

    const { count: activeUsers30d } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_active_at', thirtyDaysAgo);

    const stats = {
      totalUsers: totalUsers || 0,
      totalTutorials: totalTutorials || 0,
      publishedTutorials,
      draftTutorials,
      totalShowcases: totalShowcases || 0,
      pendingShowcases,
      activeUsers7d: activeUsers7d || totalUsers || 0,
      activeUsers30d: activeUsers30d || totalUsers || 0,
      totalCompletions: Math.max(totalCompletionsCount, userCompletions || 0),
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to fetch admin stats';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
