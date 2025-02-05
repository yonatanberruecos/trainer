// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from 'aws-amplify/auth';

export async function middleware(req: NextRequest) {
  try {
    // Try to get the authenticated user
    await getCurrentUser();
    console.log('getuser')
    return NextResponse.next();
  } catch {
    // If no user is authenticated, redirect to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/fit'], // Protect all routes under /protected-route
};
