import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that require authentication
    if (path.startsWith("/admin")) {
        const token = request.cookies.get("admin_token")?.value;

        // Allow access to login page
        if (path === "/admin/login") {
            // If already logged in, redirect to dashboard
            if (token) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            return NextResponse.next();
        }

        // Require token for all other admin pages
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
