import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { embedProfile, extractSkills } from "@/services/ai";
import { Resume } from "@/models/Resume";
import { User } from "@/models/User";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { text, fileUrl, fileName } = await request.json();
  const extractedSkills = extractSkills(String(text));
  const atsScore = Math.min(95, 45 + extractedSkills.length * 6);
  const embedding = await embedProfile(String(text));
  await connectDB();
  const resume = await Resume.create({
    userId: session.user.id,
    fileUrl: fileUrl || "manual-entry",
    fileName,
    parsedText: text,
    extractedSkills,
    atsScore,
    embedding,
    strengths: extractedSkills.slice(0, 4),
    weaknesses: ["Quantified impact", "Project depth", "Role-specific keywords", "Leadership signals"].filter((item) => !String(text).toLowerCase().includes(item.toLowerCase())).slice(0, 4)
  });
  await User.findByIdAndUpdate(session.user.id, { resumeId: resume._id, skills: extractedSkills });
  return NextResponse.json({ resume });
}
