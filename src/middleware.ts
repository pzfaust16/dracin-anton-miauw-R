import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protected routes
    // Protected routes - pastikan semuanya tercakup dengan benar
    const protectedRoutes = ["/dashboard", "/affiliate", "/profile"];

    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Auth routes
    const authRoutes = ["/login", "/register"];
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Ambil token dari cookie (sesuaikan nama cookie dengan BetterAuth Anda)
    // Updated to check for secure cookie as well
    const token = request.cookies.get("better-auth.session_token")?.value || 
                  request.cookies.get("__Secure-better-auth.session_token")?.value;

    console.log("Middleware check:", {
        pathname,
        isProtectedRoute,
        isAuthRoute,
        hasToken: !!token,
    });

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
