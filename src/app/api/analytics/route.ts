import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Application } from "@/models/Application";
import { Job } from "@/models/Job";
import { User } from "@/models/User";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const [totalUsers, hrUsers, seekers, totalJobs, applications, interviews] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "HR" }),
    User.countDocuments({ role: "SEEKER" }),
    Job.countDocuments(),
    Application.countDocuments(),
    Application.countDocuments({ stage: "INTERVIEWING" })
  ]);
  return NextResponse.json({
    kpis: { totalUsers, hrUsers, seekers, totalJobs, applications, interviews, successRate: applications ? 18 : 0 },
    growth: [
      { name: "Mon", users: 12, jobs: 4, applications: 21 },
      { name: "Tue", users: 18, jobs: 6, applications: 26 },
      { name: "Wed", users: 29, jobs: 8, applications: 44 },
      { name: "Thu", users: 37, jobs: 11, applications: 57 },
      { name: "Fri", users: 48, jobs: 14, applications: 73 }
    ]
  });
}
