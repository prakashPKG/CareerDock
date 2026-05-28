import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const user = await User.findById(session.user.id).populate("resumeId companyId").lean();
  return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const allowed = ["firstName", "lastName", "phone", "country", "city", "education", "experience", "skills", "socials"];
  const update = Object.fromEntries(Object.entries(body).filter(([key]) => allowed.includes(key)));
  const user = await User.findByIdAndUpdate(session.user.id, update, { new: true }).lean();
  return NextResponse.json({ user });
}
