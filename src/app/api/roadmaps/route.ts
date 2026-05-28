import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { roadmapSchema } from "@/lib/validators";
import { Roadmap } from "@/models/Roadmap";

export async function GET() {
  await connectDB();
  const roadmaps = await Roadmap.find({ published: true }).sort({ language: 1 }).lean();
  return NextResponse.json({ roadmaps });
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const payload = roadmapSchema.parse(await request.json());
  const roadmap = await Roadmap.create({ ...payload, createdBy: session.user.id });
  return NextResponse.json({ roadmap }, { status: 201 });
}
