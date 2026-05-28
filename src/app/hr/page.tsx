import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { AtsBoard, type AtsApplicant } from "@/components/ats/AtsBoard";
import { JobWizard } from "@/components/hr/JobWizard";
import { connectDB } from "@/lib/db";
import { Application } from "@/models/Application";

export const dynamic = "force-dynamic";

async function getApplicants(): Promise<AtsApplicant[]> {
  const fallback: AtsApplicant[] = [
    { id: "demo-1", name: "Aarav Sharma", role: "Java Backend Engineer", stage: "APPLIED", matchScore: 88, skills: ["Java", "Spring", "MongoDB"] },
    { id: "demo-2", name: "Maya Iyer", role: "Frontend Engineer", stage: "SCREENING", matchScore: 92, skills: ["React", "Next.js", "TypeScript"] },
    { id: "demo-3", name: "Noah Patel", role: "DevOps Engineer", stage: "INTERVIEWING", matchScore: 81, skills: ["AWS", "Docker", "Kubernetes"] },
    { id: "demo-4", name: "Sara Khan", role: "AI Engineer", stage: "OFFERED", matchScore: 94, skills: ["Python", "ML", "Data Science"] }
  ];
  try {
    await connectDB();
    const rows = await Application.find().populate("seekerId jobId").sort({ createdAt: -1 }).limit(50).lean();
    if (!rows.length) return fallback;
    return rows.map((row: any) => ({
      id: row._id.toString(),
      name: `${row.seekerId?.firstName ?? "Candidate"} ${row.seekerId?.lastName ?? ""}`.trim(),
      role: row.jobId?.title ?? "Applicant",
      stage: row.stage,
      matchScore: row.matchScore ?? 0,
      skills: row.seekerId?.skills ?? []
    }));
  } catch {
    return fallback;
  }
}

export default async function HrPage() {
  const applicants = await getApplicants();
  const stats = [
    ["Total Job Posts", 32],
    ["Total Applicants", applicants.length],
    ["Open Positions", 18],
    ["Closed Positions", 14],
    ["Interview Scheduled", applicants.filter((item) => item.stage === "INTERVIEWING").length],
    ["Hiring Analytics", "Live"]
  ];

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[.24em] text-cyan">HR portal</p>
          <h1 className="mt-2 text-4xl font-black">Recruitment operations</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {stats.map(([label, value]) => (
            <Card key={label} className="p-4">
              <p className="text-sm text-white/50">{label}</p>
              <p className="mt-2 text-2xl font-black">{value}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6"><JobWizard /></div>
        <div className="mt-6"><AtsBoard applicants={applicants} /></div>
      </section>
    </AppShell>
  );
}
