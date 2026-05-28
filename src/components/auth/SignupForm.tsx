"use client";

import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { CalendarDays, Camera, ChevronDown, Search, UploadCloud, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Role } from "@/types";

const countryCities: Record<string, string[]> = {
  India: ["Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Pune"],
  "United States": ["Austin", "Boston", "Chicago", "New York", "San Francisco", "Seattle"],
  Canada: ["Calgary", "Montreal", "Ottawa", "Toronto", "Vancouver"],
  "United Kingdom": ["Birmingham", "Bristol", "London", "Manchester"],
  Australia: ["Brisbane", "Melbourne", "Perth", "Sydney"],
  Germany: ["Berlin", "Frankfurt", "Hamburg", "Munich"],
  Singapore: ["Central", "Jurong East", "Tampines", "Woodlands"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah"]
};

const genderOptions = ["Female", "Male", "Non-binary", "Prefer not to say"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function strength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  return score;
}

function RequiredMark() {
  return <span className="ml-1 text-rose">*</span>;
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="mb-2 block text-sm text-white/65">
      {children}
      {required ? <RequiredMark /> : null}
    </span>
  );
}

function TextField({
  name,
  label,
  type = "text",
  required,
  placeholder
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none transition focus:border-cyan focus:bg-white/10"
      />
    </label>
  );
}

function SearchableSelect({
  name,
  label,
  options,
  value,
  onChange,
  required,
  disabled,
  placeholder = "Select"
}: {
  name: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <label className="relative block">
      <FieldLabel required={required}>{label}</FieldLabel>
      <input name={name} value={value} readOnly className="sr-only" />
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 text-left outline-none transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={value ? "text-white" : "text-white/35"}>{value || placeholder}</span>
        <ChevronDown className="h-4 w-4 text-white/45" />
      </button>
      {open ? (
        <div className="absolute z-30 mt-2 w-full rounded-md border border-white/10 bg-panel p-2 shadow-2xl">
          <div className="mb-2 flex h-9 items-center gap-2 rounded border border-white/10 bg-white/5 px-2">
            <Search className="h-3.5 w-3.5 text-cyan" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm outline-none" autoFocus />
          </div>
          <div className="max-h-44 overflow-y-auto">
            {filtered.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                  setQuery("");
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm text-white/75 hover:bg-cyan/15 hover:text-white"
              >
                {option}
              </button>
            ))}
            {!filtered.length ? <p className="px-3 py-2 text-sm text-white/45">No options found</p> : null}
          </div>
        </div>
      ) : null}
    </label>
  );
}

function DateOfBirthField({ required }: { required?: boolean }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, index) => String(currentYear - 16 - index));
  const days = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, "0"));
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const isoDate = day && month && year ? `${year}-${String(months.indexOf(month) + 1).padStart(2, "0")}-${day}` : "";
  const selectClass = "h-10 w-full appearance-none rounded-md border border-white/10 bg-panel px-3 pr-8 text-sm outline-none transition focus:border-cyan";

  function SelectShell({ children }: { children: React.ReactNode }) {
    return (
      <span className="relative block min-w-0">
        {children}
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
      </span>
    );
  }

  return (
    <div className="block">
      <FieldLabel required={required}>DOB</FieldLabel>
      <input name="dob" value={isoDate} readOnly className="sr-only" />
      <div className="grid grid-cols-[3.2rem_minmax(5.25rem,1fr)_minmax(7.25rem,1.45fr)] gap-2 rounded-lg border border-white/10 bg-white/5 p-2">
        <div className="flex items-center justify-center rounded-md bg-cyan/10 text-cyan">
          <CalendarDays className="h-5 w-5" />
        </div>
        <SelectShell>
          <select value={month} onChange={(event) => setMonth(event.target.value)} className={selectClass} required={required}>
            <option value="">Month</option>
            {months.map((item) => <option key={item}>{item}</option>)}
          </select>
        </SelectShell>
        <div className="grid grid-cols-2 gap-2">
          <SelectShell>
            <select value={day} onChange={(event) => setDay(event.target.value)} className={selectClass} required={required}>
              <option value="">Day</option>
              {days.map((item) => <option key={item}>{item}</option>)}
            </select>
          </SelectShell>
          <SelectShell>
            <select value={year} onChange={(event) => setYear(event.target.value)} className={selectClass} required={required}>
              <option value="">Year</option>
              {years.map((item) => <option key={item}>{item}</option>)}
            </select>
          </SelectShell>
        </div>
      </div>
    </div>
  );
}

export function SignupForm() {
  const [role, setRole] = useState<Role>("SEEKER");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const score = useMemo(() => strength(password), [password]);
  const cityOptions = country ? countryCities[country] ?? [] : [];
  const resumeRequired = role === "SEEKER";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const skills = String(form.get("skills") ?? "")
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    if (!gender || !country || !city) {
      setMessage("Please complete gender, country, and city.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    if (resumeRequired && !(form.get("resume") as File | null)?.name) {
      setMessage("Resume is required for job seekers.");
      return;
    }
    setLoading(true);
    const payload = Object.fromEntries(form.entries());
    delete payload.resume;
    delete payload.profilePhoto;
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

          <div className="mb-5 grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
            <label className="group relative grid h-24 w-24 cursor-pointer place-items-center overflow-hidden rounded-full border border-cyan/30 bg-cyan/10 shadow-neon">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                <UserCircle2 className="h-12 w-12 text-cyan" />
              )}
              <span className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center bg-void/75 text-cyan">
                <Camera className="h-4 w-4" />
              </span>
              <input
                name="profilePhoto"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  setPhotoName(file.name);
                  setPhotoPreview(URL.createObjectURL(file));
                }}
              />
            </label>
            <div>
              <FieldLabel>Profile photo</FieldLabel>
              <p className="truncate rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/55">{photoName || "PNG, JPG, or WEBP"}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField name="firstName" label="First Name" required />
            <TextField name="lastName" label="Last Name" required />
            <DateOfBirthField required />
            <SearchableSelect name="gender" label="Gender" options={genderOptions} value={gender} onChange={setGender} required placeholder="Select gender" />
            <TextField name="phone" label="Phone Number" required />
            <TextField name="email" label="Email" type="email" required />
            <SearchableSelect
              name="country"
              label="Country"
              options={Object.keys(countryCities)}
              value={country}
              onChange={(value) => {
                setCountry(value);
                setCity("");
              }}
              required
              placeholder="Search country"
            />
            <SearchableSelect name="city" label="City" options={cityOptions} value={city} onChange={setCity} required disabled={!country} placeholder={country ? "Search city" : "Select country first"} />
            <TextField name="education" label="Education" required />
            <TextField name="experience" label="Experience" />
            <TextField name="linkedin" label="LinkedIn" />
            <TextField name="github" label="GitHub" />
            <TextField name="portfolio" label="Portfolio" />
            <label className="block md:col-span-2">
              <FieldLabel required>Skills</FieldLabel>
              <input name="skills" required placeholder="React, Java, Python, MongoDB" className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none transition focus:border-cyan focus:bg-white/10" />
            </label>
            <label className="block">
              <FieldLabel required>Password</FieldLabel>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none transition focus:border-cyan focus:bg-white/10" />
              <span className="mt-2 block h-2 rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-cyan transition-all" style={{ width: `${score}%` }} />
              </span>
            </label>
            <label className="block">
              <FieldLabel required>Confirm Password</FieldLabel>
              <input value={confirm} onChange={(event) => setConfirm(event.target.value)} type="password" required className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 outline-none transition focus:border-cyan focus:bg-white/10" />
            </label>
            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-cyan/40 bg-cyan/5 text-center md:col-span-2">
              <UploadCloud className="mb-2 h-6 w-6 text-cyan" />
              <span className="text-sm text-white/70">
                Upload resume PDF or DOCX
                {resumeRequired ? <RequiredMark /> : null}
              </span>
              <input name="resume" type="file" accept=".pdf,.doc,.docx" required={resumeRequired} className="sr-only" />
            </label>
          </div>

          {message ? <p className="mt-4 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">{message}</p> : null}
          <Button loading={loading} className="mt-6 w-full" type="submit">Create account</Button>
        </form>
      </div>
    </main>
  );
}
