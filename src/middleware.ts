// src/middleware.ts (SIMULATED FOR DEVELOPMENT)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that require authentication and admin role
const PROTECTED_ADMIN_PATHS = [
  '/admin',
  '/admin/dashboard',
];

export async function middleware(request: NextRequest) {
  // For development, we're not actually checking authentication here
  // The auth checks will happen client-side in the AdminLayout component
  // This is just to maintain the routing structure we designed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};