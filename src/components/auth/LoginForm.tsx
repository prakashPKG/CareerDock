"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Github, KeyRound, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/ParticleField";
import type { Role } from "@/types";

const roleCopy: Record<Role, { title: string; path: string; lines: string[] }> = {
  ADMIN: {
    title: "Control room online",
    path: "/admin",
    lines: ["KPI mesh", "Roadmap editor", "Security feed"]
  },
  SEEKER: {
    title: "Career world descent",
    path: "/career-world",
    lines: ["3D paths", "Skill unlocks", "AI coach"]
  },
  HR: {
    title: "Hiring hologram ready",
    path: "/hr",
    lines: ["ATS board", "Applicant scoring", "Interview flow"]
  }
};

export function LoginForm() {
  const [email, setEmail] = useState("seeker@careerdock.ai");
  const [password, setPassword] = useState("CareerDock@123");
  const [role, setRole] = useState<Role>("SEEKER");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const active = roleCopy[role];

  const orbitItems = useMemo(() => active.lines, [active.lines]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: active.path
    });
    setLoading(false);
    if (result?.error) {
      setMessage("Access denied. Check email and password.");
      return;
    }
    setMessage("Access granted. Opening portal...");
    window.location.href = active.path;
  }

  return (
    <main className="relative grid min-h-screen overflow-hidden lg:grid-cols-[1.05fr_.95fr]">
      <ParticleField />
      <section className="grid-bg relative flex min-h-[45vh] items-center justify-center p-6 lg:min-h-screen">
        <motion.div
          key={role}
          initial={{ opacity: 0, scale: .88, rotateX: 18 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: .7 }}
          className="relative h-[22rem] w-[22rem] max-w-full"
        >
          <div className="absolute inset-8 rounded-full border border-cyan/25 shadow-neon" />
          <div className="absolute inset-16 rounded-full border border-mint/20" />
          <motion.div
            className="absolute inset-24 rounded-full bg-cyan/15 blur-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [.4, .9, .4] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          {orbitItems.map((item, index) => (
            <motion.div
              key={item}
              className="absolute left-1/2 top-1/2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16 + index * 4, ease: "linear" }}
              style={{ transformOrigin: `${index % 2 ? -86 : 92}px ${index === 2 ? 72 : -78}px` }}
            >
              {item}
            </motion.div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-cyan" />
              <h1 className="text-3xl font-black">{active.title}</h1>
              <p className="mt-3 text-sm text-white/60">CareerDock identity gate</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative flex items-center justify-center p-6">
        <form onSubmit={submit} className="glass w-full max-w-md rounded-lg p-6">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan">Secure login</p>
            <h2 className="mt-2 text-3xl font-black">Enter CareerDock</h2>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2">
            {(["SEEKER", "HR", "ADMIN"] as Role[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`h-10 rounded-md border text-xs font-bold transition ${role === item ? "border-cyan bg-cyan text-slate-950" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
              >
                {item === "SEEKER" ? "Finder" : item}
              </button>
            ))}
          </div>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm text-white/70">Email</span>
            <span className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3">
              <Mail className="h-4 w-4 text-cyan" />
              <input className="h-12 flex-1 bg-transparent outline-none" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
            </span>
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm text-white/70">Password</span>
            <span className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3">
              <KeyRound className="h-4 w-4 text-mint" />
              <input className="h-12 flex-1 bg-transparent outline-none" value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} required />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-white/60 hover:text-white" aria-label="Toggle password visibility">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </label>

          <div className="mb-5 flex items-center justify-between text-sm text-white/65">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-cyan" />
              Remember me
            </label>
            <Link href="/forgot-password" className="hover:text-cyan">Forgot password</Link>
          </div>

          {message ? <p className="mb-4 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">{message}</p> : null}

          <Button loading={loading} className="w-full" type="submit">Login</Button>

          <div className="my-5 flex items-center gap-3 text-xs text-white/40">
            <span className="h-px flex-1 bg-white/10" />
            Social login
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="ghost" onClick={() => signIn("github", { callbackUrl: active.path })}><Github className="h-4 w-4" /> GitHub</Button>
            <Button type="button" variant="ghost" onClick={() => signIn("google", { callbackUrl: active.path })}>Google</Button>
          </div>

          <p className="mt-6 text-center text-sm text-white/55">
            New here? <Link href="/signup" className="font-semibold text-cyan">Create account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
