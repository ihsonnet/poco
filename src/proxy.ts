import { NextResponse, type NextRequest } from 'next/server';

const COMING_SOON_PATH = '/coming-soon';
const HOME_PATH = '/';
const ENABLED_VALUES = new Set(['1', 'true', 'on', 'yes']);

function isComingSoonModeEnabled() {
  return ENABLED_VALUES.has((process.env.COMING_SOON_MODE ?? '').toLowerCase());
}

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const comingSoonModeEnabled = isComingSoonModeEnabled();

  if (pathname === COMING_SOON_PATH) {
    if (comingSoonModeEnabled) {
      return NextResponse.next();
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = HOME_PATH;
    return NextResponse.redirect(redirectUrl);
  }

  if (!comingSoonModeEnabled || isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = COMING_SOON_PATH;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)']
};
