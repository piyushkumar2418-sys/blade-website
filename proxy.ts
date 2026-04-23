import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for Edge
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // Maximum requests per window
const ipCache = new Map<string, { count: number, lastReset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const data = ipCache.get(ip) || { count: 0, lastReset: now };
  
  if (now - data.lastReset > RATE_LIMIT_WINDOW) {
    data.count = 1;
    data.lastReset = now;
    ipCache.set(ip, data);
    return true;
  }
  
  data.count++;
  ipCache.set(ip, data);
  return data.count <= MAX_REQUESTS;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic info
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';

  // Security Check: Rate Limiting
  if (ip !== 'unknown' && !checkRateLimit(ip)) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referrer = request.headers.get('referer') || 'direct';
  
  // Geo info (Vercel specific)
  const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  const region = request.headers.get('x-vercel-ip-country-region') || 'unknown';
  const city = request.headers.get('x-vercel-ip-city') || 'unknown';

  const trackData = {
    ip,
    userAgent,
    path: pathname,
    referrer,
    country,
    region,
    city
  };

  // Fire and forget the tracking request
  // Use absolute URL for the API call
  const origin = request.nextUrl.origin;
  
  // We use fetch in the background. In production environments like Vercel,
  // we might need to use event.waitUntil to ensure the fetch completes.
  // For standard Next.js, this background fetch is usually fine.
  fetch(`${origin}/api/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trackData),
  }).catch(err => {
    // Silently fail to not interrupt user experience
    console.error('Tracking failed:', err);
  });

  return NextResponse.next();
}

// Ensure middleware only runs on page routes, not assets or APIs
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
