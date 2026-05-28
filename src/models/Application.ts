import { model, models, Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    seekerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    resumeId: { type: Schema.Types.ObjectId, ref: "Resume" },
    coverLetter: String,
    aiSummary: String,
    stage: {
      type: String,
      enum: ["APPLIED", "SCREENING", "INTERVIEWING", "OFFERED", "REJECTED"],
      default: "APPLIED",
      index: true
    },
    matchScore: { type: Number, default: 0 },
    notes: [{ body: String, authorId: { type: Schema.Types.ObjectId, ref: "User" }, createdAt: Date }],
    rating: { type: Number, min: 0, max: 5 }
  },
  { timestamps: true }
);

applicationSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1, stage: 1, matchScore: -1 });

export const Application = models.Application || model("Application", applicationSchema);
