import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protected routes
    const isProtectedRoute = pathname.startsWith("/dashboard") ||
        pathname.startsWith("/affiliate");

    // Auth routes
    const isAuthRoute = pathname.startsWith("/login") ||
        pathname.startsWith("/register");

    // Ambil token dari cookie (sesuaikan nama cookie dengan BetterAuth Anda)
    const token = request.cookies.get("better-auth.session_token")?.value;

    // Jika tidak ada token dan akses protected route, redirect ke login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Jika ada token dan akses auth route, redirect ke dashboard
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|watch|terbaru|terpopuler|sulih-suara|detail).*)",
    ],
};