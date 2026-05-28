export type Role = "ADMIN" | "SEEKER" | "HR";
export type ApplicationStage = "APPLIED" | "SCREENING" | "INTERVIEWING" | "OFFERED" | "REJECTED";
export type RoadmapLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PROJECTS" | "INTERVIEW_PREP" | "JOBS";

export type MetricPoint = {
  name: string;
  users?: number;
  jobs?: number;
  applications?: number;
  value?: number;
};
