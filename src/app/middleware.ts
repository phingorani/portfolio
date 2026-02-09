import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(request: Request) {
  const session = await auth();
  
  const { pathname } = new URL(request.url);
  
  if ((pathname.startsWith('/chatbot') || pathname.startsWith('/api/chat')) && !session) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }
  
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data: blob:; connect-src 'self' http://192.168.1.38; font-src 'self' data:; object-src 'none'; media-src 'self'; frame-src 'none'; base-uri 'self';"
  );
  
  return response;
}

export const config = {
  matcher: ['/chatbot', '/api/chat'],
};