import Link from "next/link";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, LayoutDashboard, Map } from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { Button } from "@/components/ui/Button";

const modules = [
  { href: "/career-world", label: "Career World", icon: Map, stat: "10 paths" },
  { href: "/jobs", label: "Find Jobs", icon: BriefcaseBusiness, stat: "AI matched" },
  { href: "/hr", label: "HR Portal", icon: BrainCircuit, stat: "ATS live" },
  { href: "/admin", label: "Admin", icon: LayoutDashboard, stat: "Analytics" }
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleField />
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[.28em] text-cyan">AI Career Roadmap & Recruitment Platform</p>
          <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">CareerDock</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Roadmaps, job matching, resume intelligence, ATS pipelines, analytics, and cinematic career exploration in one full stack platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login"><Button>Login <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/signup"><Button variant="ghost">Create account</Button></Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((item) => (
            <Link key={item.href} href={item.href} className="glass group rounded-lg p-5 transition hover:-translate-y-1 hover:border-cyan/50">
              <item.icon className="h-7 w-7 text-cyan" />
              <h2 className="mt-5 text-xl font-black">{item.label}</h2>
              <p className="mt-2 text-sm text-white/50">{item.stat}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
