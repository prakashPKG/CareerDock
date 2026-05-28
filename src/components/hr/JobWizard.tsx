"use client";

import { useState } from "react";
import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function JobWizard() {
  const [skill, setSkill] = useState("Java");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      requirements: String(form.get("requirements")).split("\n").filter(Boolean),
      skills: [skill, ...String(form.get("skills")).split(",").map((item) => item.trim()).filter(Boolean)],
      salaryMin: Number(form.get("salaryMin")),
      salaryMax: Number(form.get("salaryMax")),
      location: form.get("location"),
      remote: form.get("remote") === "on",
      experience: form.get("experience"),
      deadline: form.get("deadline")
    };
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setMessage(response.ok ? `${skill} roadmap linked to job post.` : "Job save failed.");
  }

  return (
    <form onSubmit={submit} className="glass rounded-lg p-5">
      <div className="mb-5 flex items-center gap-3">
        <WandSparkles className="h-5 w-5 text-cyan" />
        <h2 className="text-xl font-black">Job creation workspace</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="title" placeholder="Job title" required className="h-11 rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <input name="location" placeholder="Location" defaultValue="Remote" className="h-11 rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <input name="salaryMin" type="number" placeholder="Salary min" defaultValue={90000} className="h-11 rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <input name="salaryMax" type="number" placeholder="Salary max" defaultValue={150000} className="h-11 rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <select value={skill} onChange={(event) => setSkill(event.target.value)} className="h-11 rounded-md border border-white/10 bg-panel px-3 outline-none">
          {["Java", "JavaScript", "Python", "AI/ML", "DevOps", "Cloud Computing"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <input name="skills" placeholder="Extra skills, comma separated" className="h-11 rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <input name="experience" placeholder="Experience" defaultValue="2-5 years" className="h-11 rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <input name="deadline" type="date" required className="h-11 rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
        <textarea name="description" placeholder="Description" required className="min-h-28 rounded-md border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan md:col-span-2" />
        <textarea name="requirements" placeholder="Requirements, one per line" className="min-h-24 rounded-md border border-white/10 bg-white/5 p-3 outline-none focus:border-cyan md:col-span-2" />
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm text-white/65">
        <input name="remote" type="checkbox" defaultChecked className="accent-cyan" />
        Remote option
      </label>
      {message ? <p className="mt-4 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">{message}</p> : null}
      <Button className="mt-5">Publish job</Button>
    </form>
  );
}
