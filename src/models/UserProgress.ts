import { model, models, Schema } from "mongoose";

const userProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    roadmapId: { type: Schema.Types.ObjectId, ref: "Roadmap", required: true, index: true },
    completedNodeIds: [Schema.Types.ObjectId],
    badges: [String],
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActivityAt: Date
  },
  { timestamps: true }
);

userProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

export const UserProgress = models.UserProgress || model("UserProgress", userProgressSchema);
