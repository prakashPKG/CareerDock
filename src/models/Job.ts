import { model, models, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: { type: String, required: true, index: "text" },
    description: { type: String, required: true },
    requirements: [String],
    skills: [{ type: String, index: true }],
    salaryMin: Number,
    salaryMax: Number,
    location: { type: String, index: true },
    remote: { type: Boolean, default: true, index: true },
    experience: String,
    deadline: Date,
    status: { type: String, enum: ["OPEN", "CLOSED", "DRAFT"], default: "OPEN", index: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", index: true },
    roadmapId: { type: Schema.Types.ObjectId, ref: "Roadmap" }
  },
  { timestamps: true }
);

jobSchema.index({ title: "text", description: "text", skills: "text" });
jobSchema.index({ status: 1, remote: 1, deadline: 1 });

export const Job = models.Job || model("Job", jobSchema);
