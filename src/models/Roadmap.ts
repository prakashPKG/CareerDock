import { model, models, Schema } from "mongoose";

const roadmapNodeSchema = new Schema(
  {
    title: { type: String, required: true },
    level: { type: String, enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "PROJECTS", "INTERVIEW_PREP", "JOBS"] },
    order: { type: Number, default: 0 },
    parentId: { type: Schema.Types.ObjectId },
    skills: [String],
    videos: [String],
    resources: [String],
    pdfs: [String],
    codingExercises: [String],
    interviewQuestions: [String],
    projects: [String]
  },
  { timestamps: true }
);

const roadmapSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    language: { type: String, required: true, index: true },
    description: String,
    nodes: [roadmapNodeSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    published: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

export const Roadmap = models.Roadmap || model("Roadmap", roadmapSchema);
