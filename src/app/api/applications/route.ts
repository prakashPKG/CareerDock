import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { skillMatch } from "@/lib/utils";
import { Application } from "@/models/Application";
import { Job } from "@/models/Job";
import { Resume } from "@/models/Resume";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const filter = session.user.role === "SEEKER" ? { seekerId: session.user.id } : {};
  const applications = await Application.find(filter).populate("jobId seekerId resumeId").sort({ createdAt: -1 }).lean();
  return NextResponse.json({ applications });
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "SEEKER") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const { jobId, coverLetter } = await request.json();
  const job = await Job.findById(jobId).lean() as { _id: unknown; skills?: string[] } | null;
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  const resume = await Resume.findOne({ userId: session.user.id }).sort({ createdAt: -1 }).lean() as { _id: unknown; extractedSkills?: string[] } | null;
  const match = skillMatch(resume?.extractedSkills ?? [], job.skills ?? []);
  const application = await Application.create({
    jobId,
    seekerId: session.user.id,
    resumeId: resume?._id,
    coverLetter,
    matchScore: match.score,
    aiSummary: `Candidate matches ${match.score}% of requested skills. Missing: ${match.missing.join(", ") || "none"}.`
  });
  return NextResponse.json({ application }, { status: 201 });
}
