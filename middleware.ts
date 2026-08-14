// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from 'aws-amplify/auth';

// Public routes that always render without an auth check.
// The marketing landing page lives at the root domain ("/") and must
// render on every visit, so it is explicitly listed here.
const PUBLIC_ROUTES = [
  '/', // landing page (src/app/page.tsx) — always renders under the root domain
  '/login',
  '/signup',
  '/forgot-password',
  '/set-new-password',
  '/privacy',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The root domain and other public routes always render the requested page.
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    // Try to get the authenticated user
    await getCurrentUser();
    return NextResponse.next();
  } catch {
    // If no user is authenticated, redirect to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  // Only run middleware on protected routes. The root ("/") is never matched,
  // so the landing page always renders first under the root domain.
  matcher: ['/fit'],
};
