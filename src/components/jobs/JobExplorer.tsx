"use client";

import { useMemo, useState } from "react";
import { Bookmark, BriefcaseBusiness, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { toCurrency } from "@/lib/utils";

export type JobCardData = {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  remote: boolean;
  experience: string;
  skills: string[];
  matchScore: number;
  deadline: string;
};

export function JobExplorer({ jobs }: { jobs: JobCardData[] }) {
  const [query, setQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [applying, setApplying] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const haystack = `${job.title} ${job.company} ${job.skills.join(" ")}`.toLowerCase();
      return haystack.includes(query.toLowerCase()) && (!remoteOnly || job.remote);
    });
  }, [jobs, query, remoteOnly]);

  async function apply(jobId: string) {
    setApplying(jobId);
    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, coverLetter: "Generated from CareerDock profile." })
    }).catch(() => null);
    setApplying("");
  }

  return (
    <div className="space-y-5">
      <div className="glass flex flex-col gap-3 rounded-lg p-4 md:flex-row md:items-center">
        <div className="flex h-11 flex-1 items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3">
          <Search className="h-4 w-4 text-cyan" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search role, skill, company" className="flex-1 bg-transparent outline-none" />
        </div>
        <label className="flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/70">
          <input type="checkbox" checked={remoteOnly} onChange={(event) => setRemoteOnly(event.target.checked)} className="accent-cyan" />
          Remote only
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((job) => (
          <Card key={job.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-cyan">{job.company}</p>
                <h2 className="mt-1 text-xl font-black">{job.title}</h2>
              </div>
              <span className="rounded-md bg-mint px-3 py-1 text-sm font-black text-slate-950">{job.matchScore}%</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/60">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
              <span className="flex items-center gap-1"><BriefcaseBusiness className="h-4 w-4" /> {job.experience}</span>
              <span>{toCurrency(job.salaryMin)} - {toCurrency(job.salaryMax)}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill) => <span key={skill} className="rounded bg-white/10 px-2 py-1 text-xs text-white/70">{skill}</span>)}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-white/45">Deadline {job.deadline}</p>
              <div className="flex gap-2">
                <Button variant="ghost" className="h-10 px-3" aria-label="Save job"><Bookmark className="h-4 w-4" /></Button>
                <Button loading={applying === job.id} className="h-10" onClick={() => apply(job.id)}>Apply</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
