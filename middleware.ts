import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the authentication token from cookies
    const authToken = request.cookies.get('__session')?.value;

    // Define routes
    const protectedRoutes = ['/dashboard'];
    const authRoutes = ['/login'];

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Create a response that we can modify
    const response = NextResponse.next();

    // Add cache control headers to prevent browser caching of protected pages
    if (isProtectedRoute || isAuthRoute) {
        response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
    }

    // If user is not authenticated and trying to access protected route
    if (isProtectedRoute && !authToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        const redirectResponse = NextResponse.redirect(url);
        redirectResponse.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
        return redirectResponse;
    }

    // If user is authenticated and trying to access auth routes
    if (isAuthRoute && authToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        const redirectResponse = NextResponse.redirect(url);
        redirectResponse.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
        return redirectResponse;
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_static|favicon.ico|sitemap.xml).*)',
    ],
};