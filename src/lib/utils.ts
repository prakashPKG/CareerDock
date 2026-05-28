import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function skillMatch(resumeSkills: string[], jobSkills: string[]) {
  const resumeSet = new Set(resumeSkills.map((skill) => skill.toLowerCase()));
  const matches = jobSkills.filter((skill) => resumeSet.has(skill.toLowerCase()));
  const score = jobSkills.length ? Math.round((matches.length / jobSkills.length) * 100) : 0;
  return { score, matches, missing: jobSkills.filter((skill) => !resumeSet.has(skill.toLowerCase())) };
}
