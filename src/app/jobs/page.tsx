import { AppShell } from "@/components/AppShell";
import { JobExplorer, type JobCardData } from "@/components/jobs/JobExplorer";
import { connectDB } from "@/lib/db";
import { Job } from "@/models/Job";

export const dynamic = "force-dynamic";

type JobRow = {
  _id: { toString(): string };
  title?: string | null;
  companyId?: {
    name?: string | null;
  } | null;
  location?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  remote?: boolean | null;
  experience?: string | null;
  skills?: string[] | null;
  deadline?: Date | string | null;
};

async function getJobs(): Promise<JobCardData[]> {
  const fallback: JobCardData[] = [
    { id: "demo-job-1", title: "Senior Java Engineer", company: "Nebula Works", location: "Remote", salaryMin: 120000, salaryMax: 165000, remote: true, experience: "4+ years", skills: ["Java", "Spring", "MongoDB"], matchScore: 91, deadline: "2026-06-30" },
    { id: "demo-job-2", title: "AI Product Engineer", company: "Cortex Labs", location: "Bengaluru", salaryMin: 105000, salaryMax: 150000, remote: false, experience: "3+ years", skills: ["Python", "AI", "React"], matchScore: 86, deadline: "2026-07-12" },
    { id: "demo-job-3", title: "DevOps Platform Engineer", company: "CloudMint", location: "Remote", salaryMin: 98000, salaryMax: 142000, remote: true, experience: "2+ years", skills: ["AWS", "Docker", "Kubernetes"], matchScore: 79, deadline: "2026-07-05" }
  ];
  try {
    await connectDB();
    const rows = await Job.find({ status: "OPEN" }).populate("companyId").sort({ createdAt: -1 }).limit(40).lean<JobRow[]>();
    if (!rows.length) return fallback;
    return rows.map((row) => ({
      id: row._id.toString(),
      title: row.title ?? "Untitled role",
      company: row.companyId?.name ?? "CareerDock Partner",
      location: row.location ?? "Remote",
      salaryMin: row.salaryMin ?? 0,
      salaryMax: row.salaryMax ?? 0,
      remote: row.remote ?? false,
      experience: row.experience ?? "Not specified",
      skills: row.skills ?? [],
      matchScore: 82,
      deadline: row.deadline ? new Date(row.deadline).toISOString().slice(0, 10) : "Open"
    }));
  } catch {
    return fallback;
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[.24em] text-cyan">Job search</p>
          <h1 className="mt-2 text-4xl font-black">Skill matched openings</h1>
        </div>
        <JobExplorer jobs={jobs} />
      </section>
    </AppShell>
  );
}
