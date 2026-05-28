import { model, models, Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    fileUrl: { type: String, required: true },
    fileName: String,
    provider: { type: String, enum: ["cloudinary", "s3", "local"], default: "cloudinary" },
    parsedText: String,
    extractedSkills: [{ type: String, index: true }],
    strengths: [String],
    weaknesses: [String],
    atsScore: { type: Number, default: 0 },
    embedding: [Number]
  },
  { timestamps: true }
);

export const Resume = models.Resume || model("Resume", resumeSchema);
