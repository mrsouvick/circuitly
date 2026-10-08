import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured or is demo placeholder, pass through
  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes('dummy') ||
    supabaseKey.includes('dummy')
  ) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options as any)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // 1. Dedicated Admin Login Route (/admin/login)
  if (path === '/admin/login') {
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return response;
  }

  // 2. Protected Admin Console Routes (/admin/*)
  if (path.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = new URL('/admin/login', request.url);
      redirectUrl.searchParams.set('redirectTo', path);
      return NextResponse.redirect(redirectUrl);
    }

    // Verify role in profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      // Not an admin: redirect strictly to admin login with forbidden parameter
      const redirectUrl = new URL('/admin/login', request.url);
      redirectUrl.searchParams.set('error', 'forbidden');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Protected Student Routes (/dashboard, /settings, /showcase/new)
  const userProtectedRoutes = ['/dashboard', '/settings', '/showcase/new'];
  const isUserProtected = userProtectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isUserProtected && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', path);
    return NextResponse.redirect(redirectUrl);
  }

  // 4. Student Auth Routes when already logged in
  const authRoutes = ['/login', '/signup', '/forgot-password'];
  if (authRoutes.some((route) => path.startsWith(route)) && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
