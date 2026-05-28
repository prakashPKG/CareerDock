import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { jobSchema } from "@/lib/validators";
import { Job } from "@/models/Job";

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const skills = searchParams.get("skills")?.split(",").filter(Boolean) ?? [];
  const query: Record<string, unknown> = { status: "OPEN" };
  if (q) query.$text = { $search: q };
  if (skills.length) query.skills = { $in: skills };
  const jobs = await Job.find(query).sort({ createdAt: -1 }).limit(50).lean();
  return NextResponse.json({ jobs });
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "HR") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const payload = jobSchema.parse(await request.json());
  const job = await Job.create({ ...payload, createdBy: session.user.id });
  return NextResponse.json({ job }, { status: 201 });
}
