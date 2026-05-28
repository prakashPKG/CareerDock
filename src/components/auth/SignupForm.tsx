"use client";

import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Role } from "@/types";

function strength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  return score;
}

export function SignupForm() {
  const [role, setRole] = useState<Role>("SEEKER");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const score = useMemo(() => strength(password), [password]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const skills = String(form.get("skills") ?? "")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, role, password, skills })
    });
    setLoading(false);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setMessage(data.error ?? "Signup failed.");
      return;
    }
    setMessage("Account created. Verification email queued.");
    await signIn("credentials", {
      email: String(form.get("email")),
      password,
      callbackUrl: role === "HR" ? "/hr" : "/career-world"
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <section className="glass flex min-h-[32rem] items-center justify-center rounded-lg p-6">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mx-auto mb-8 h-48 w-48 rounded-full border border-cyan/30 bg-cyan/10 shadow-neon" />
            <p className="text-sm uppercase tracking-[.25em] text-cyan">{role === "HR" ? "Company tower forming" : "Career road opening"}</p>
            <h1 className="mt-3 text-4xl font-black">Create your CareerDock identity</h1>
            <p className="mt-4 text-white/60">Profile, resume, role, and skill data become the base for AI matching and roadmap recommendations.</p>
          </motion.div>
        </section>

        <form onSubmit={submit} className="glass rounded-lg p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.2em] text-mint">Signup</p>
              <h2 className="text-3xl font-black">Profile details</h2>
            </div>
            <div className="flex rounded-md border border-white/10 bg-white/5 p-1">
              {(["SEEKER", "HR"] as Role[]).map((item) => (
                <button key={item} type="button" onClick={() => setRole(item)} className={`h-9 rounded px-4 text-sm font-bold ${role === item ? "bg-cyan text-slate-950" : "text-white/60"}`}>
                  {item === "SEEKER" ? "Job Seeker" : "HR"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {["firstName", "lastName", "dob", "gender", "phone", "country", "city", "education", "experience", "linkedin", "github", "portfolio", "email"].map((name) => (
              <label key={name} className="block">
                <span className="mb-2 block text-sm capitalize text-white/65">{name.replace(/([A-Z])/g, " $1")}</span>
                <input name={name} type={name === "email" ? "email" : name === "dob" ? "date" : "text"} required={["firstName", "lastName", "email"].includes(name)} className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm text-white/65">Skills</span>
              <input name="skills" placeholder="React, Java, Python, MongoDB" className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-white/65">Password</span>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
              <span className="mt-2 block h-2 rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-cyan" style={{ width: `${score}%` }} />
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-white/65">Confirm password</span>
              <input value={confirm} onChange={(event) => setConfirm(event.target.value)} type="password" required className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none focus:border-cyan" />
            </label>
            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-cyan/40 bg-cyan/5 text-center md:col-span-2">
              <UploadCloud className="mb-2 h-6 w-6 text-cyan" />
              <span className="text-sm text-white/70">Upload resume PDF or DOCX</span>
              <input name="resume" type="file" accept=".pdf,.doc,.docx" className="sr-only" />
            </label>
          </div>

          {message ? <p className="mt-4 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">{message}</p> : null}
          <Button loading={loading} className="mt-6 w-full" type="submit">Create account</Button>
        </form>
      </div>
    </main>
  );
}
