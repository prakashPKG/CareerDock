import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Notification } from "@/models/Notification";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ notifications: [], unread: 0 });
  await connectDB();
  const [notifications, unread] = await Promise.all([
    Notification.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(30).lean(),
    Notification.countDocuments({ userId: session.user.id, readAt: { $exists: false } })
  ]);
  return NextResponse.json({ notifications, unread });
}

export async function PATCH() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  await Notification.updateMany({ userId: session.user.id, readAt: { $exists: false } }, { readAt: new Date() });
  return NextResponse.json({ ok: true });
}
