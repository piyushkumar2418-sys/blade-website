import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic info
  const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
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
