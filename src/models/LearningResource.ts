import { model, models, Schema } from "mongoose";

const learningResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["VIDEO", "ARTICLE", "PDF", "PROJECT", "EXERCISE"], required: true },
    url: String,
    roadmapId: { type: Schema.Types.ObjectId, ref: "Roadmap", index: true },
    skill: { type: String, index: true },
    difficulty: String
  },
  { timestamps: true }
);

export const LearningResource = models.LearningResource || model("LearningResource", learningResourceSchema);
