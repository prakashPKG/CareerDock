import Link from "next/link";
import { BrainCircuit, BriefcaseBusiness, GraduationCap, Trophy } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="glass grid gap-6 rounded-lg p-6 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[.24em] text-cyan">Dashboard</p>
            <h1 className="mt-3 text-4xl font-black">Career cockpit</h1>
            <p className="mt-4 max-w-2xl text-white/60">Track applications, roadmap progress, resume intelligence, and job recommendations.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/career-world"><Button>Enter 3D world</Button></Link>
              <Link href="/jobs"><Button variant="ghost">Find jobs</Button></Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["ATS Score", "88", BrainCircuit],
              ["Saved Jobs", "14", BriefcaseBusiness],
              ["Roadmap", "67%", GraduationCap],
              ["Badges", "11", Trophy]
            ].map(([label, value, Icon]) => (
              <Card key={label as string} className="p-4">
                <Icon className="h-5 w-5 text-cyan" />
                <p className="mt-3 text-sm text-white/50">{label as string}</p>
                <p className="text-3xl font-black">{value as string}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
