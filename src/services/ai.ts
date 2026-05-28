import OpenAI from "openai";
import { skillMatch } from "@/lib/utils";

const skillDictionary = ["Java", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "MongoDB", "AWS", "Docker", "Kubernetes", "AI", "ML", "DevOps", "Cyber Security", "Data Science"];

export function extractSkills(text: string) {
  const lower = text.toLowerCase();
  return skillDictionary.filter((skill) => lower.includes(skill.toLowerCase()));
}

export async function embedProfile(text: string) {
  if (!process.env.OPENAI_API_KEY) return [];
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text.slice(0, 7000)
  });
  return response.data[0]?.embedding ?? [];
}

export function scoreCandidate(resumeSkills: string[], jobSkills: string[], roadmapCompletion = 0) {
  const match = skillMatch(resumeSkills, jobSkills);
  const compatibility = Math.round(match.score * 0.72 + roadmapCompletion * 0.28);
  return { ...match, compatibility };
}
