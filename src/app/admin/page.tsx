import { Activity, BriefcaseBusiness, CheckCircle2, Clock3, Users, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { AdminCharts } from "@/components/charts/AdminCharts";
import { RoadmapStudio } from "@/components/admin/RoadmapStudio";
import { connectDB } from "@/lib/db";
import { Application } from "@/models/Application";
import { Job } from "@/models/Job";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

async function getAdminData() {
  const fallback = {
    kpis: { totalUsers: 12840, hrUsers: 426, seekers: 11890, activeUsers: 6204, totalJobs: 864, applications: 5230, interviews: 342, successRate: 24 },
    growth: [
      { name: "Mon", users: 120, jobs: 24, applications: 210 },
      { name: "Tue", users: 180, jobs: 36, applications: 260 },
      { name: "Wed", users: 290, jobs: 48, applications: 440 },
      { name: "Thu", users: 370, jobs: 61, applications: 570 },
      { name: "Fri", users: 480, jobs: 74, applications: 730 }
    ]
  };

  try {
    await connectDB();
    const [totalUsers, hrUsers, seekers, activeUsers, totalJobs, applications, interviews] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "HR" }),
      User.countDocuments({ role: "SEEKER" }),
      User.countDocuments({ activeAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) } }),
      Job.countDocuments(),
      Application.countDocuments(),
      Application.countDocuments({ stage: "INTERVIEWING" })
    ]);
    return {
      ...fallback,
      kpis: { totalUsers, hrUsers, seekers, activeUsers, totalJobs, applications, interviews, successRate: applications ? Math.round((interviews / applications) * 100) : 0 }
    };
  } catch {
    return fallback;
  }
}

export default async function AdminPage() {
  const { kpis, growth } = await getAdminData();
  const cards = [
    { label: "Total Users", value: kpis.totalUsers, icon: Users },
    { label: "HR Users", value: kpis.hrUsers, icon: UserRoundCheck },
    { label: "Job Seekers", value: kpis.seekers, icon: Activity },
    { label: "Active Users", value: kpis.activeUsers, icon: CheckCircle2 },
    { label: "Jobs", value: kpis.totalJobs, icon: BriefcaseBusiness },
    { label: "Applications", value: kpis.applications, icon: Clock3 },
    { label: "Interviews", value: kpis.interviews, icon: UserRoundCheck },
    { label: "Success Rate", value: `${kpis.successRate}%`, icon: CheckCircle2 }
  ];

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[.24em] text-cyan">Admin dashboard</p>
          <h1 className="mt-2 text-4xl font-black">Platform command center</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.label}>
              <card.icon className="h-5 w-5 text-cyan" />
              <p className="mt-4 text-sm text-white/50">{card.label}</p>
              <p className="mt-1 text-3xl font-black">{card.value}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6"><AdminCharts data={growth} /></div>
        <div className="mt-6"><RoadmapStudio /></div>
      </section>
    </AppShell>
  );
}
