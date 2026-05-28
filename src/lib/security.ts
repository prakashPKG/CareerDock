import { NextResponse } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  current.count += 1;
  if (current.count > limit) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return null;
}

export function sanitizeText(value: unknown) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim();
}
