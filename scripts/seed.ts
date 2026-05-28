import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { connectDB } from "../src/lib/db";
import { Application } from "../src/models/Application";
import { Company } from "../src/models/Company";
import { Job } from "../src/models/Job";
import { Notification } from "../src/models/Notification";
import { Resume } from "../src/models/Resume";
import { Roadmap } from "../src/models/Roadmap";
import { User } from "../src/models/User";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const full = path.join(process.cwd(), file);
    if (!fs.existsSync(full)) continue;
    const lines = fs.readFileSync(full, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^"|"$/g, "");
    }
  }
  process.env.MONGODB_URI ??= "mongodb://127.0.0.1:27017/careerdock";
}

async function upsertUser(email: string, role: "ADMIN" | "HR" | "SEEKER", firstName: string, lastName: string, skills: string[] = []) {
  const passwordHash = await bcrypt.hash("CareerDock@123", 12);
  return User.findOneAndUpdate(
    { email },
    { email, role, firstName, lastName, skills, passwordHash, emailVerified: true, activeAt: new Date() },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
}

async function main() {
  loadEnv();
  await connectDB();

  const [admin, hr, seeker] = await Promise.all([
    upsertUser("admin@careerdock.ai", "ADMIN", "Admin", "Control"),
    upsertUser("hr@careerdock.ai", "HR", "Hiring", "Lead", ["ATS", "Interviewing"]),
    upsertUser("seeker@careerdock.ai", "SEEKER", "Career", "Finder", ["React", "Next.js", "TypeScript", "MongoDB", "Node.js"])
  ]);

  const company = await Company.findOneAndUpdate(
    { name: "Nebula Works" },
    { name: "Nebula Works", industry: "AI SaaS", size: "201-500", location: "Remote", hrUsers: [hr._id] },
    { new: true, upsert: true }
  );

  await User.findByIdAndUpdate(hr._id, { companyId: company._id });

  const roadmap = await Roadmap.findOneAndUpdate(
    { slug: "javascript" },
    {
      title: "JavaScript Career Roadmap",
      slug: "javascript",
      language: "JavaScript",
      description: "Beginner to advanced JavaScript, projects, interviews, and jobs.",
      createdBy: admin._id,
      published: true,
      nodes: [
        { title: "Language fundamentals", level: "BEGINNER", order: 1, skills: ["JavaScript"] },
        { title: "React and Next.js", level: "INTERMEDIATE", order: 2, skills: ["React", "Next.js"] },
        { title: "Production architecture", level: "ADVANCED", order: 3, skills: ["Testing", "Performance"] },
        { title: "Portfolio projects", level: "PROJECTS", order: 4, skills: ["Projects"] },
        { title: "Interview prep", level: "INTERVIEW_PREP", order: 5, skills: ["DSA", "System Design"] },
        { title: "Matched jobs", level: "JOBS", order: 6, skills: ["Hiring"] }
      ]
    },
    { new: true, upsert: true }
  );

  const job = await Job.findOneAndUpdate(
    { title: "Senior JavaScript Platform Engineer", companyId: company._id },
    {
      title: "Senior JavaScript Platform Engineer",
      description: "Build cinematic AI career workflows using Next.js, MongoDB, and real-time product systems.",
      requirements: ["Next.js App Router", "MongoDB", "TypeScript", "Testing"],
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "MongoDB"],
      salaryMin: 120000,
      salaryMax: 170000,
      location: "Remote",
      remote: true,
      experience: "4+ years",
      deadline: new Date("2026-07-30"),
      status: "OPEN",
      companyId: company._id,
      createdBy: hr._id,
      roadmapId: roadmap._id
    },
    { new: true, upsert: true }
  );

  const resume = await Resume.findOneAndUpdate(
    { userId: seeker._id },
    {
      userId: seeker._id,
      fileUrl: "manual-entry",
      fileName: "career-finder-resume.txt",
      parsedText: "React Next.js TypeScript MongoDB Node.js dashboard and analytics project work.",
      extractedSkills: ["React", "Next.js", "TypeScript", "MongoDB", "Node.js"],
      atsScore: 88,
      strengths: ["React", "Next.js", "MongoDB"],
      weaknesses: ["Quantified impact", "System design"]
    },
    { new: true, upsert: true }
  );

  await User.findByIdAndUpdate(seeker._id, { resumeId: resume._id });

  await Application.findOneAndUpdate(
    { jobId: job._id, seekerId: seeker._id },
    { jobId: job._id, seekerId: seeker._id, resumeId: resume._id, stage: "SCREENING", matchScore: 91, aiSummary: "Strong match on modern web platform skills." },
    { upsert: true }
  );

  await Notification.create({
    userId: seeker._id,
    type: "JOB_MATCH",
    title: "New 91% job match",
    body: "Senior JavaScript Platform Engineer is linked to your JavaScript roadmap.",
    href: "/jobs"
  });

  console.log("CareerDock seed complete.");
  console.log("Admin: admin@careerdock.ai / CareerDock@123");
  console.log("HR: hr@careerdock.ai / CareerDock@123");
  console.log("Job seeker: seeker@careerdock.ai / CareerDock@123");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
