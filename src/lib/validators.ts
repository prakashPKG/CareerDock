import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "SEEKER", "HR"]),
  phone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  skills: z.array(z.string()).default([])
});

export const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  requirements: z.array(z.string()).default([]),
  skills: z.array(z.string()).min(1),
  salaryMin: z.number().min(0).default(0),
  salaryMax: z.number().min(0).default(0),
  location: z.string().default("Remote"),
  remote: z.boolean().default(true),
  experience: z.string().default("Any"),
  deadline: z.coerce.date()
});

export const roadmapSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  language: z.string().min(2),
  description: z.string().min(10),
  nodes: z.array(z.string()).default([])
});
