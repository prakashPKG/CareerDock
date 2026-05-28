import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const roleHome: Record<string, string> = {
  ADMIN: "/admin",
  HR: "/hr",
  SEEKER: "/career-world"
};

const protectedPrefixes = ["/dashboard", "/admin", "/hr", "/career-world", "/jobs", "/profile", "/notifications", "/applied-jobs", "/saved-jobs", "/learning"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = String(token?.role ?? "");

  if (!token && protectedPrefixes.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") return NextResponse.redirect(new URL(roleHome[role] ?? "/career-world", req.url));
  if (pathname.startsWith("/hr") && role !== "HR") return NextResponse.redirect(new URL(roleHome[role] ?? "/career-world", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
